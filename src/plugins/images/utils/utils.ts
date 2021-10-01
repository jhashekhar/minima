import { fabric } from 'fabric';
import Pino from 'pino';
import {
	bgStateSelector,
	canvasHeightSelector,
	canvasSelector,
	canvasWidthSelector,
	updateCanvas,
} from '../features/canvas/canvasSlice';
import {
	changeCtPosition,
	changeSelected,
} from '../features/canvas/canvasTextSlice';
import insertSideBar from '../sideBar';
import store from '../store';

let canvasParentEl: HTMLElement = null;

const logger = Pino({
	prettyPrint: { colorize: true },
});

export const targetMatch = (event: any, query: string) => {
	return event.target && event.target.matches(query);
};

export const createCanvas = () => {
	let canvas = new fabric.Canvas('canvas', {
		width: canvasWidthSelector(store.getState()),
		height: canvasHeightSelector(store.getState()),
		selection: false,
		stateful: true,
	});
	return canvas;
};

// replaces the existing canvas with a new one
export function replaceCanvasEl() {
	let parentEl = document.getElementById('canvas').parentElement;

	logger.info('BEFORE removing canvas -- parentEl: ', parentEl);

	// clean up all the child -- this will remove the canvas element too.
	while (parentEl.firstChild) {
		parentEl.removeChild(parentEl.firstChild);
	}

	// update the parent element of canvas
	canvasParentEl = parentEl;

	// Currently working on it -- will be removed in future PR
	let newC = `<canvas id="canvas" style="border: solid 1px black"></canvas>`;

	parentEl.innerHTML = newC;
}

// render the canvas with new dimensions but same objects
export function renderCanvas(c: fabric.Canvas, r = false) {
	canvasEvents(c, false);
	c.loadFromJSON(canvasSelector(store.getState()), c.renderAll.bind(c));

	if (r) return c;
}

export function canvasEvents(c: fabric.Canvas, mousePressed: Boolean) {
	c.on('mouse:move', (options: any) => {
		let lockbg = bgStateSelector(store.getState());
		if (mousePressed && lockbg === 'unfixed') {
			const delta = new fabric.Point(options.e.movementX, options.e.movementY);
			c.relativePan(delta);
			c.setCursor('grab');
			c.renderAll();
		}
	});

	c.on('mouse:down', (options: any) => {
		mousePressed = true;
	});

	c.on('mouse:up', (options: any) => {
		mousePressed = false;
		c.setCursor('default');
		c.renderAll();
		const cJSON = JSON.stringify(c);
		store.dispatch(updateCanvas(cJSON));
		console.log('MOUSE UP: ', canvasSelector(store.getState()));
	});
}

export function canvasTextEvents(text: fabric.IText) {
	text.on('selected', () => {
		store.dispatch(changeSelected(true));
		console.log('Text selected');
		insertSideBar();
	});

	text.on('deselected', () => {
		store.dispatch(changeSelected(false));
		console.log('Text deselected');
		insertSideBar();
	});

	text.on('moving', () => {
		// update the position in the store
		store.dispatch(changeCtPosition({ left: text.left, top: text.top }));
		// render the canvas
		replaceCanvasEl();
		renderCanvas(createCanvas());
	});
}

export function clearCanvas(c: fabric.Canvas) {
	c.clear();
}
