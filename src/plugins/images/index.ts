import { fabric } from 'fabric';
import Pino from 'pino';

// local modules
import insertSideBar from './sideBar';

import {
	updateQuery,
	updateUrls,
	searchUrlsSelector,
} from './features/searchSlice';

import { setEditMode, studioEditModeSelector } from './features/studioSlice';
import {
	updateCanvas,
	updateCanvasWidth,
	updateCanvasHeight,
	canvasWidthSelector,
	canvasHeightSelector,
} from './features/canvas/canvasSlice';

import {
	changeCtValue,
	changeCtStatus,
	changeCtFont,
	changeCtColor,
	changeCtPosition,
	changeCtDimensions,
	changeCtScale,
	changeCtAngle,
} from './features/canvas/canvasTextSlice';

import { updateCiDims } from './features/canvas/canvasImage';

// import selectors
import { canvasSelector } from './features/canvas/canvasSlice';

import {
	ctSelector,
	ctStatusSelector,
	ctValueSelector,
	ctColorSelector,
} from './features/canvas/canvasTextSlice';

import { ciSelector } from './features/canvas/canvasImage';

// local store
import store from './store';

let name = 'Images';
let shiftClickEvent: MouseEvent = null;
let originalImgEl: any = null;
let currentImgSrc: string = null;
let canvasParentEl: HTMLElement = null;

const logger = Pino({
	prettyPrint: { colorize: true },
});

const shiftClickListener = (event: MouseEvent) => {
	if (!event.shiftKey) {
		return true;
	}

	shiftClickEvent = event;

	currentImgSrc = (<HTMLImageElement>event.target).src;
	originalImgEl = shiftClickEvent.target;

	insertSideBar();
};

// ******* Event Listeners *******
const targetMatch = (event: any, query: string) => {
	return event.target && event.target.matches(query);
};

document.addEventListener('change', (event) => {
	// event of adding query
	if (targetMatch(event, 'input.images-search-input')) {
		store.dispatch(updateQuery((<HTMLInputElement>event.target).value));
	}

	if (targetMatch(event, 'input#color')) {
		if (ctStatusSelector(store.getState())) {
			store.dispatch(changeCtColor((<HTMLInputElement>event.target).value));

			let c = new fabric.Canvas('c');

			let canvas = c.loadFromJSON(
				canvasSelector(store.getState()),
				c.renderAll.bind(c)
			);

			store.dispatch(updateCanvas(canvas.remove(canvas.getActiveObject())));

			addText(
				ctValueSelector(store.getState()),
				ctColorSelector(store.getState())
			);

			c.renderAll();
		} else {
			window.alert('Add text before changing the color!');
		}
	}
});

// added to potentially replace chooser and the shenanigans associated with it
document.addEventListener('click', (event) => {
	if (targetMatch(event, 'img.image-search-result')) {
		let img = (<HTMLImageElement>event.target).src;
		currentImgSrc = img;
		originalImgEl.src = img;
		originalImgEl.height = 240;
		originalImgEl.width = 240;
	}
});

// upload images
document.addEventListener(
	'change',
	async (event: any) => {
		if (targetMatch(event, 'input.upload-image')) {
			// clean up the whole deck so that the panel shows only the uploaded images
			store.dispatch(updateUrls(null));

			const files = Array.from(event.target.files).map((file: any) => {
				let reader = new FileReader();

				return new Promise((resolve) => {
					reader.onload = () => resolve(reader.result);
					reader.readAsDataURL(file);
				});
			});

			// once all the images are loaded update the state
			let res: any[] = await Promise.all(files);
			store.dispatch(updateUrls(res));

			if (searchUrlsSelector(store.getState()).length > 0) {
				insertSideBar();
			}
		}
	},
	false
);

// tablinks: search and studio tab
// studio portion of the function also has canvas
// initialized with the target Image
document.addEventListener('click', (event) => {
	const tablinks = document.getElementsByClassName('tablinks');

	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '');
	}

	if (targetMatch(event, 'button#search-tab')) {
		insertSideBar();
		(<HTMLButtonElement>event.target).className += ' active';
	}

	if (
		targetMatch(event, 'button#studio-tab') &&
		!studioEditModeSelector(store.getState())
	) {
		(<HTMLButtonElement>event.target).className += ' active';

		// clicked on studio then replace the image with canvas
		let cnvs: HTMLCanvasElement = document.createElement('canvas');
		cnvs.id = 'c';
		Object.assign(cnvs.style, { border: 'solid black 1px' });

		// get the target image
		let img = <HTMLDivElement>shiftClickEvent.target;
		let parentOfImg = img.parentElement;

		parentOfImg.replaceChild(cnvs, img);

		canvasParentEl = parentOfImg;

		const c = new fabric.Canvas('c', {
			width: canvasWidthSelector(store.getState()),
			height: canvasHeightSelector(store.getState()),
		});

		const i = new fabric.Image(currentImgSrc);

		fabric.Image.fromURL(currentImgSrc, (img) => {
			c.add(img);
			let cJSON = JSON.stringify(c);
			store.dispatch(updateCanvas(cJSON));

			logger.info('SERIALIZED: ', cJSON);
		});

		/*
    Another way of changing image src. The point is how can we 
    change the image while keeping the other properties like
    position, angle, scale, dimensions unchanged.

    i.setSrc(currentImgSrc, () => {
      i.set('scaleX', 0.4)
      i.set('scaleY', 0.3)
      i.center()
      i.setCoords()
      c.renderAll()
    })
    */

		logger.warn('CANVAS state 1: ', canvasSelector(store.getState()));

		store.dispatch(setEditMode(true));
		insertSideBar();

		onScalingImage(i);
	}

	if (
		targetMatch(event, 'button#add-text-to-canvas') &&
		studioEditModeSelector(store.getState())
	) {
		if (!ctStatusSelector(store.getState())) {
			addText(
				ctValueSelector(store.getState()),
				ctColorSelector(store.getState())
			);
			store.dispatch(changeCtStatus(true));
		} else {
			alert('You already added text!');
		}
	}
});

document.addEventListener('input', (event) => {
	if (targetMatch(event, 'input#canvas-width-range')) {
		const p = document.getElementById('canvas-width-range');

		store.dispatch(updateCanvasWidth((<HTMLInputElement>p).value));
		replaceCanvas();
		renderCanvas();
	}

	if (targetMatch(event, 'input#canvas-height-range')) {
		const p = document.getElementById('canvas-height-range');

		replaceCanvas();
		store.dispatch(updateCanvasHeight((<HTMLInputElement>p).value));
		renderCanvas();
	}
});

// replaces the existing canvas with a new one
function replaceCanvas() {
	let parentEl = document.getElementById('c').parentElement;

	logger.info('BEFORE removing canvas -- parentEl: ', parentEl);

	// clean up all the child -- this will remove the canvas element too.
	while (parentEl.firstChild) {
		parentEl.removeChild(parentEl.firstChild);
	}

	// update the parent element of canvas
	canvasParentEl = parentEl;

	// Currently working on it -- will be removed in next PR
	let newC = `<canvas id="c" style="border: solid 1px black"></canvas>`;

	parentEl.innerHTML = newC;
}

// render the canvas with new dimensions but same objects
function renderCanvas(r = false) {
	const c = new fabric.Canvas('c', {
		width: canvasWidthSelector(store.getState()),
		height: canvasHeightSelector(store.getState()),
	});

	c.loadFromJSON(canvasSelector(store.getState()), c.renderAll.bind(c));

	if (r) return c;
}

// ADD TEXT
function addText(txt: string, color: string) {
	let ct = ctSelector(store.getState());

	const c = new fabric.Canvas('c', {
		width: canvasWidthSelector(store.getState()),
		height: canvasHeightSelector(store.getState()),
	});

	const text = new fabric.IText(txt, {
		left: ct.position.left,
		top: ct.position.top,
		fill: color,
		width: ct.dimension.width,
		height: ct.dimension.height,
		angle: ct.angle,
	});

	c.loadFromJSON(canvasSelector(store.getState()), c.renderAll.bind(c));

	// TODO: Issue 2 -- adding text to canvas -- will be fixed in next PR
	/*
  c.add(text)
  c.bringToFront(text)
  c.setActiveObject(text)

  store.dispatch(updateCanvas(JSON.stringify(c)))
  //store.dispatch(
      updateCanvas(canvasSelector(store.getState()).setActiveObject(text)))

  textEventListeners(text)
  */
}

function onScalingImage(i: fabric.Image) {
	i.on('scaling', () => {
		store.dispatch(
			updateCiDims({
				width: i.width * i.scaleX,
				height: i.height * i.scaleY,
			})
		);

		let img = ciSelector(store.getState());

		logger.info(
			'Current Image height and width: ',
			i.get('width'),
			i.get('height')
		);
	});
}

function textEventListeners(t: fabric.IText) {
	t.on('scaling', () => {
		store.dispatch(changeCtDimensions({ width: t.width, height: t.height }));
		store.dispatch(changeCtPosition({ top: t.top, left: t.left }));
		store.dispatch(changeCtScale({ scaleX: t.scaleX, scaleY: t.scaleY }));

		let txt = ctSelector(store.getState());

		logger.info(
			'Current Text height and width: ',
			txt.dimension.height,
			txt.dimension.width
		);
	});

	t.on('moving', () => {
		store.dispatch(changeCtPosition({ left: t.left, top: t.top }));
		let txt = ctSelector(store.getState());
		logger.info(
			'Moving Text top and left: ',
			txt.position.left,
			txt.position.top
		);
	});

	t.on('rotating', () => {
		store.dispatch(changeCtPosition({ left: t.left, top: t.top }));
		store.dispatch(changeCtAngle(t.angle));

		let txt = ctSelector(store.getState());
		logger.info(
			'Rotating Text: ',
			txt.position.left,
			txt.position.top,
			txt.angle
		);
	});

	t.on('editing:exited', () => {
		store.dispatch(changeCtValue(t.text));
	});
}

let enable = () => {
	Array.from(document.querySelectorAll('img')).forEach(function (img) {
		img.addEventListener('click', shiftClickListener);
	});
};

let disable = () => {
	Array.from(document.querySelectorAll('img')).forEach(function (img) {
		img.removeEventListener('click', shiftClickListener);
	});
};

export default { name, enable, disable };
