import { fabric } from 'fabric';
import Pino from 'pino';

// local modules
import insertSideBar from './sideBar';

import { getGifs } from './apis/giphyAPI';

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
	bgStateSelector,
	updateBGState,
} from './features/canvas/canvasSlice';

// local store
import store from './store';

import {
	targetMatch,
	renderCanvas,
	createCanvas,
	canvasEvents,
	replaceCanvasEl,
	clearCanvas,
} from './utils/utils';
import text from '../text';
import {
	changeGifsStatus,
	gifsIdsSelector,
	updateGifs,
} from './features/gifSlice';
import { updateTabActiveStatus } from './features/tabSlice';

let name = 'Images';
let shiftClickEvent: MouseEvent = null;
let originalImgEl: any = null;
let currentImgSrc: string = null;
let canvasParentEl: HTMLElement = null;
let mousePressed = false;
let lCanvas: fabric.Canvas = null;
let ctProps = { bold: false, italic: false, underline: false };

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

// upload images
document.addEventListener(
	'change',
	async (event) => {
		if (targetMatch(event, 'input#upload-image')) {
			// clean up the whole deck so that the panel shows only the uploaded images
			//store.dispatch(updateUrls([]));
			logger.warn('CURRENT IMAGES: ', searchUrlsSelector(store.getState()));
			const files = Array.from((<HTMLInputElement>event.target).files).map(
				(file: any) => {
					let reader = new FileReader();

					return new Promise((resolve) => {
						reader.onload = () => resolve(reader.result);
						reader.readAsDataURL(file);
					});
				}
			);

			// once all the images are loaded update the state
			let res: any[] = await Promise.all(files);
			store.dispatch(updateUrls(res));
			logger.warn('UPLOADED IMG: ', searchUrlsSelector(store.getState()));
			if (searchUrlsSelector(store.getState()).length > 0) {
				logger.warn('load reuslts bar');
				insertSideBar();
			}
		}
	},
	false
);

document.addEventListener('change', (event) => {
	if (targetMatch(event, 'select#canvas-text-font-family')) {
		const el = document.getElementById('select#canvas-text-font-family');
		console.log('Font family event: ', (<HTMLInputElement>event.target).value);
		let text = lCanvas.getActiveObject();
		text.setOptions({ fontFamily: (<HTMLInputElement>event.target).value });
		lCanvas.renderAll();
	}
});

// tablinks: search and studio tab
// studio portion of the function also has canvas
// initialized with the target Image
document.addEventListener('click', (event) => {
	if (targetMatch(event, 'img.image-search-result')) {
		let img = (<HTMLImageElement>event.target).src;
		currentImgSrc = img;
		originalImgEl.src = img;
		originalImgEl.height = 240;
		originalImgEl.width = 240;
	}

	// click on a image result
	if (
		targetMatch(event, 'img.image-search-result') &&
		studioEditModeSelector(store.getState())
	) {
		// get the image
		let img = (<HTMLImageElement>event.target).src;
		currentImgSrc = img;
		// remove old canvas Element
		replaceCanvasEl();
		// render new canvas with same setting but only diff image
		let c = createCanvas();
		renderCanvas(c);
		fabric.Image.fromURL(currentImgSrc, (i) => {
			c.backgroundImage = i;
			c.renderAll();
			lCanvas = c;
		});
	}

	if (
		targetMatch(event, 'button#search-tab') &&
		studioEditModeSelector(store.getState())
	) {
		store.dispatch(setEditMode(false));
		(<HTMLButtonElement>event.target).className = 'active';
		document.getElementById('studio-tab').className = '';
		store.dispatch(updateTabActiveStatus('search'));
		insertSideBar();
	}

	if (
		targetMatch(event, 'button#studio-tab') &&
		!studioEditModeSelector(store.getState())
	) {
		(<HTMLButtonElement>event.target).className = 'active';
		document.getElementById('search-tab').className = '';
		store.dispatch(updateTabActiveStatus('studio'));

		// clicked on studio then replace the image with canvas
		if (!document.getElementById('canvas')) {
			let canvas: HTMLCanvasElement = document.createElement('canvas');
			canvas.id = 'canvas';
			Object.assign(canvas.style, { border: 'solid black 1px' });

			// get the target image
			let img = <HTMLDivElement>shiftClickEvent.target;
			let parentOfImg = img.parentElement;

			parentOfImg.replaceChild(canvas, img);

			canvasParentEl = parentOfImg;

			const c = createCanvas();

			fabric.Image.fromURL(
				currentImgSrc,
				(i) => {
					//i.crossOrigin = 'anonymous';
					c.backgroundImage = i;
					c.renderAll();
					lCanvas = c;
					let cJSON = JSON.stringify(c);
					store.dispatch(updateCanvas(cJSON));

					logger.info('SERIALIZED: ', cJSON);
				},
				{ crossOrigin: 'anonymous' }
			);

			// I think devs haven't declared the type of events here, so going with
			// any, maybe there's a chance for OSS contribution
			canvasEvents(c, mousePressed);
		}
		store.dispatch(setEditMode(true));
		insertSideBar();
	}

	if (
		targetMatch(event, 'button#add-text-to-canvas') &&
		studioEditModeSelector(store.getState())
	) {
		let text = new fabric.IText('Your Text', {
			top: 10,
			left: 40,
		});

		lCanvas.add(text);
		//text.bringToFront();

		lCanvas.renderAll();

		canvasEvents(lCanvas, mousePressed);

		store.dispatch(updateCanvas(JSON.stringify(lCanvas)));
	}

	if (
		targetMatch(event, 'button#clear-canvas') &&
		studioEditModeSelector(store.getState())
	) {
		replaceCanvasEl();
		let c = createCanvas();
		clearCanvas(c);
		store.dispatch(updateCanvas(JSON.stringify(c)));
	}

	if (targetMatch(event, 'button#lockBG')) {
		console.log('FIX BACKGROUND');
		if (bgStateSelector(store.getState()) === 'fixed') {
			console.log('BG IS FIXED!');
			store.dispatch(updateBGState('unfixed'));
		} else {
			console.log('BG IS UNFIXED');
			store.dispatch(updateBGState('fixed'));
		}
	}

	if (targetMatch(event, 'button#boldText')) {
		let text = lCanvas.getActiveObject();
		if (!ctProps.bold) {
			text.setOptions({ fontWeight: 'bold' });
			lCanvas.renderAll();
			ctProps.bold = true;
		} else {
			text.setOptions({ fontWeight: '' });
			lCanvas.renderAll();
			ctProps.bold = false;
		}
	}

	if (targetMatch(event, 'button#italicText')) {
		let text = lCanvas.getActiveObject();
		if (!ctProps.italic) {
			text.setOptions({ fontStyle: 'italic' });
			lCanvas.renderAll();
			ctProps.italic = true;
		} else {
			text.setOptions({ fontStyle: '' });
			lCanvas.renderAll();
			ctProps.italic = false;
		}
	}

	if (targetMatch(event, 'button#underlineText')) {
		let text = lCanvas.getActiveObject();
		if (!ctProps.underline) {
			text.setOptions({ underline: true });
			lCanvas.renderAll();
			ctProps.underline = true;
		} else {
			text.setOptions({ underline: '' });
			lCanvas.renderAll();
			ctProps.underline = false;
		}
	}

	if (targetMatch(event, 'button#export-canvas')) {
		let dataUrl = lCanvas.toDataURL({
			format: 'jpeg',
		});

		let a = document.createElement('a');
		a.href = dataUrl;
		a.download = 'image.jpeg';
		a.click();

		logger.info(dataUrl);
	}

	if (targetMatch(event, 'button#add-gif')) {
		let gifs: string[] = [];
		getGifs.data.forEach((d) => {
			//console.log(d);
			gifs.push(d.id.toString());
		});

		store.dispatch(updateGifs(gifs));
		store.dispatch(changeGifsStatus(true));
		//logger.info(gifsIdsSelector(store.getState()));
		insertSideBar();
	}

	if (targetMatch(event, 'embed#giphy-embed')) {
		event.preventDefault();
		console.log('Gif clicked');
	}
});

document.addEventListener('input', (event) => {
	// event of adding query
	if (targetMatch(event, 'input.images-search-input')) {
		store.dispatch(updateQuery((<HTMLInputElement>event.target).value));
	}

	if (
		targetMatch(event, 'input#canvas-text-color') &&
		lCanvas.getActiveObject()
	) {
		let text = lCanvas.getActiveObject();
		text.setOptions({ fill: (<HTMLInputElement>event.target).value });
		lCanvas.renderAll();
		logger.warn(lCanvas.getActiveObject());
		logger.warn(typeof text);
		store.dispatch(updateCanvas(JSON.stringify(lCanvas)));
	}

	if (targetMatch(event, 'input#canvas-width-range')) {
		const el = document.getElementById('canvas-width-range');

		store.dispatch(updateCanvasWidth((<HTMLInputElement>el).value));
		replaceCanvasEl();
		renderCanvas(createCanvas());
	}

	if (targetMatch(event, 'input#canvas-height-range')) {
		const el = document.getElementById('canvas-height-range');

		store.dispatch(updateCanvasHeight((<HTMLInputElement>el).value));
		replaceCanvasEl();
		renderCanvas(createCanvas());
	}
});

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
function fontFamily(fontFamily: any): any {
	throw new Error('Function not implemented.');
}
