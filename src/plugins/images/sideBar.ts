import HBS from 'handlebars';

import {
	getUnsplashImages,
	searchPrevQueriesSelector,
	searchQuerySelector,
	searchUrlsSelector,
	updatePrevQueries,
} from './features/searchSlice';

import { studioEditModeSelector } from './features/studioSlice';
import store from './store';

const targetMatch = (event: any, query: string) => {
	return event.target && event.target.matches(query);
};

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
	uploadImageInput: { className: 'upload-image', type: 'file' },
	searchTab: { className: 'tablinks', id: 'search-tab', name: 'SearcH' },
	studioTab: { className: 'tablinks', id: 'studio-tab', name: 'Studio' },
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
	imageUrls: searchUrlsSelector(store.getState()),
	urlsLength: 0,
	studioMode: false,
};

const insertSideBar = async () => {
	let temp = `
  <div id="minima-image-plugin"></div>

  <script id="handlebars-demo" type="text/x-handlebars-template">
    <div id="minima-images-search-container">
      <div class="tab">
        {{button searchTab}} {{button studioTab}}
      </div>

      {{#unless studioMode}}
      <div id="minima-card-body" class="minima-card-body">
        <div class="minima-search-input">
          <p>{{input searchInput}} {{button searchButton}}</p>
          <span>or</span>
          {{inputMultiple uploadImageInput}}
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
        {{button addTextToCanvas}}
      </p>
    
      <p>
        <label>Text color: </label>
        {{colorInput canvasTextColor}}
      </p>
 
      <label>Font family: </label>
      <select name="font" id="canvas-text-font-family">
        <option value="Times New Roman">Times New Roman</option>
        <option value="">Sans Serif</option>
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
		let input = `<input class="${d.className}" type="${d.type}" multiple />`;
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

	let template = document.querySelector('#handlebars-demo').innerHTML;

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

	if (studioEditModeSelector(store.getState())) {
		data.studioMode = true;
	}

	let html = templateScript(data);

	document.querySelector('#minima-image-plugin').innerHTML = html;
};

export default insertSideBar;
