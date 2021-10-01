import HBS from 'handlebars';
import { ctStatusSelector } from './features/canvas/canvasTextSlice';
import { gifsIdsSelector } from './features/gifSlice';

import {
	getUnsplashImages,
	searchPrevQueriesSelector,
	searchQuerySelector,
	searchUrlsSelector,
	updatePrevQueries,
} from './features/searchSlice';

import { studioEditModeSelector } from './features/studioSlice';
import { tabActiveStatusSelector } from './features/tabSlice';

import store from './store';

import { targetMatch } from './utils/utils';

let data = {
	searchInput: {
		className: 'images-search-input',
		type: 'text',
		ph: 'New York',
	},
	searchButton: {
		className: 'images-search-button',
		id: 'image-search',
		name: 'Search',
	},
	uploadImageInput: {
		className: 'upload-image',
		id: 'upload-image',
		type: 'file',
	},
	searchTab: { className: 'active', id: 'search-tab', name: 'Search' },
	studioTab: { className: '', id: 'studio-tab', name: 'Studio' },
	canvasWidthSlider: {
		className: 'slider',
		id: 'canvas-width-range',
		min: 100,
		max: 900,
		initVal: 400,
	},
	canvasHeightSlider: {
		className: 'slider',
		id: 'canvas-height-range',
		min: 100,
		max: 900,
		initVal: 400,
	},
	addTextToCanvas: {
		className: 'add-text-to-canvas',
		id: 'add-text-to-canvas',
		name: 'Add Text',
	},
	canvasTextColor: {
		className: 'canvas-text-color',
		id: 'canvas-text-color',
		type: 'color',
		value: '#ff0000',
	},
	clearCanvas: {
		className: 'clear-canvas',
		id: 'clear-canvas',
		name: 'Clear Canvas',
	},
	selectedCanvasText: false,
	fontSizeForCanvasText: {
		className: 'slider',
		id: 'canvas-text-font-size',
		min: 5,
		max: 50,
		initVal: 20,
	},
	lockBG: { className: 'lockBG', id: 'lockBG', name: 'Toggle Lock BG' },
	boldText: {
		className: 'boldText',
		id: 'boldText',
		name: 'B',
	},
	italicText: { className: 'italicText', id: 'italicText', name: 'I' },
	underlineText: { className: 'underlineText', id: 'underlineText', name: 'U' },
	fontFamily: ['Times New Roman', 'Comic Sans', 'Sans Serif'],
	exportCanvas: {
		className: 'export-canvas',
		id: 'export-canvas',
		name: 'Export Canvas',
	},
	addGif: {
		className: 'add-gif',
		id: 'add-gif',
		name: 'Add Gif',
	},
	imageUrls: searchUrlsSelector(store.getState()),
	urlsLength: 0,
	studioMode: false,
	gifsUrls: gifsIdsSelector(store.getState()),
	gifsLength: 0,
};

const insertSideBar = async () => {
	let temp = `
  <div id="minima-image-plugin"></div>

  <script id="handlebars-images-plugin" type="text/x-handlebars-template">
    <div id="minima-images-search-container">
      <div class="tab">
	  	<ul>
        <li>{{button searchTab}}</li> 
		  	<li>{{button studioTab}}</li>
		</ul>
      </div>

      {{#unless studioMode}}
      <div id="minima-card-body" class="minima-card-body">
        <div class="minima-search-input">
          <p>{{input searchInput}} {{button searchButton}}</p>
        </div>

		<div>
		  <p>{{inputMultiple uploadImageInput}}</p>
		</div>
      </div>
    </div>
    {{/unless}}

    {{#if studioMode}}
    <div id="image-studio">
      <div class="slidecontainer">
        <p><b>Resize Canvas</b></p 
        <p>
          Width: 100{{sliderInput canvasWidthSlider}}900
        </p>
 
        <p>
          Height: 100{{sliderInput canvasHeightSlider}}900
        </p>
      </div>
 
      <p>
        {{button addTextToCanvas}} {{button lockBG}} {{button addGif}}
      </p>

	  <p>
	  	{{button clearCanvas}}
	  </p>
    
	  <p><strong>Text</strong></p>
      <p>
        {{colorInput canvasTextColor}}
		{{button boldText}}
		{{button italicText}}
		{{button underlineText}}
      </p>
 
	  <p>{{button exportCanvas}}</p>

      <label>Font family: </label>
      <select name="font" id="canvas-text-font-family">
        <option value="Times New Roman">Times New Roman</option>
        <option value="Sans Serif">Sans Serif</option>
        <option value="Comic Sans">Comic Sans</option>
      </select>
    </div>
    {{/if}}


    {{#if urlsLength}}
    <div id="minima-images-container">
      <div class="minima-image-panel">
        {{#each imageUrls}}
        <a href="#" class="minima-images-replacer">
          <img src={{this}} class="image-search-result" />
        </a>
        {{/each}}
      </div>
    </div>
    {{/if}}

	{{#if gifsLength}}
    <div id="minima-images-container">
      <div class="minima-image-panel">
        {{#each gifsUrls}}
        <a href="#" class="minima-images-replacer">
				<embed id="giphy-embed" src={{this}} width="240" height="280" class="giphy-embed" />
        </a>
        {{/each}}
      </div>
    </div>
  {{/if}}

	{{#if selectedCanvasText}}
	  {{sliderInput fontSizeForCanvasText}}
	</div>
	{{/if}}
  </script>`;

	let div = document.createElement('div');
	div.innerHTML = temp.trim();
	document.getElementsByTagName('body')[0].appendChild(div);

	HBS.registerHelper('input', (d) => {
		let input = `<input class="${d.className}" type="${d.type}" \
    placeholder="Enter your input..." />`;
		return new HBS.SafeString(input);
	});

	HBS.registerHelper('button', (d) => {
		let button = `<button class="${d.className}" id="${d.id}">${d.name}</button>`;
		return new HBS.SafeString(button);
	});

	HBS.registerHelper('inputMultiple', (d) => {
		let input = `<input class="${d.className}" id="${d.id}" type="${d.type}" multiple />`;
		return new HBS.SafeString(input);
	});

	HBS.registerHelper('sliderInput', (d) => {
		let input = `<input id="${d.id}" class="${d.className}" type="range" \
    min="${d.min}" max="${d.max}" value="${d.initVal}"/>`;
		return new HBS.SafeString(input);
	});

	HBS.registerHelper('colorInput', (d) => {
		let input = `<input type="${d.type}" id="${d.id}" class="${d.className}" \
    value="${d.value}" />`;
		return new HBS.SafeString(input);
	});

	let template = document.querySelector('#handlebars-images-plugin').innerHTML;

	let templateScript = HBS.compile(template);

	// update the state here
	document
		.getElementById('minima-image-plugin')
		.addEventListener('click', async (event) => {
			if (targetMatch(event, 'button.images-search-button')) {
				await store.dispatch(
					getUnsplashImages(searchQuerySelector(store.getState()))
				);
				data.imageUrls = searchUrlsSelector(store.getState());
				data.urlsLength = data.imageUrls.length;

				const stateQuery = searchQuerySelector(store.getState());
				const prevQueries = searchPrevQueriesSelector(store.getState());

				if (stateQuery.toLowerCase() !== prevQueries[prevQueries.length - 1]) {
					store.dispatch(updatePrevQueries(stateQuery.toLowerCase()));
				}

				let html = templateScript(data);

				document.querySelector('#minima-image-plugin').innerHTML = html;
			}
		});

	data.studioMode = studioEditModeSelector(store.getState());
	data.imageUrls = searchUrlsSelector(store.getState());
	data.urlsLength = searchUrlsSelector(store.getState()).length;
	data.gifsLength = gifsIdsSelector(store.getState()).length;

	if (data.gifsLength > 0) {
		data.gifsUrls = gifsIdsSelector(store.getState()).map((u) => {
			return 'https://giphy.com/embed/' + u;
		});

		console.log('GIF Urls: ', data.gifsUrls);
	}

	if (tabActiveStatusSelector(store.getState()) === 'search') {
		data.searchTab.className = 'active';
		data.studioTab.className = '';
	} else {
		data.searchTab.className = '';
		data.studioTab.className = 'active';
	}

	if (ctStatusSelector(store.getState())) {
		data.selectedCanvasText = true;
	}

	if (data.gifsLength > 0) {
		data.urlsLength = 0;
	}

	let html = templateScript(data);

	document.querySelector('#minima-image-plugin').innerHTML = html;
};

export default insertSideBar;
