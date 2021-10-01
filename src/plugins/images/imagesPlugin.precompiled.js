(function () {
	var template = Handlebars.template,
		templates = (Handlebars.templates = Handlebars.templates || {});
	templates['imagesPlugin'] = template({
		1: function (container, depth0, helpers, partials, data) {
			var alias1 = depth0 != null ? depth0 : container.nullContext || {},
				alias2 = container.hooks.helperMissing,
				alias3 = container.escapeExpression,
				lookupProperty =
					container.lookupProperty ||
					function (parent, propertyName) {
						if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
							return parent[propertyName];
						}
						return undefined;
					};

			return (
				'      <div id="minima-card-body" class="minima-card-body">\n        <div class="minima-search-input">\n          <p>' +
				alias3(
					(
						lookupProperty(helpers, 'input') ||
						(depth0 && lookupProperty(depth0, 'input')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'searchInput') : depth0,
						{
							name: 'input',
							hash: {},
							data: data,
							loc: {
								start: { line: 9, column: 13 },
								end: { line: 9, column: 34 },
							},
						}
					)
				) +
				' ' +
				alias3(
					(
						lookupProperty(helpers, 'button') ||
						(depth0 && lookupProperty(depth0, 'button')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'searchButton') : depth0,
						{
							name: 'button',
							hash: {},
							data: data,
							loc: {
								start: { line: 9, column: 35 },
								end: { line: 9, column: 58 },
							},
						}
					)
				) +
				'</p>\n          <span>or</span>\n          ' +
				alias3(
					(
						lookupProperty(helpers, 'inputMultiple') ||
						(depth0 && lookupProperty(depth0, 'inputMultiple')) ||
						alias2
					).call(
						alias1,
						depth0 != null
							? lookupProperty(depth0, 'uploadImageInput')
							: depth0,
						{
							name: 'inputMultiple',
							hash: {},
							data: data,
							loc: {
								start: { line: 11, column: 10 },
								end: { line: 11, column: 44 },
							},
						}
					)
				) +
				'\n        </div>\n      </div>\n    </div>\n'
			);
		},
		3: function (container, depth0, helpers, partials, data) {
			var alias1 = depth0 != null ? depth0 : container.nullContext || {},
				alias2 = container.hooks.helperMissing,
				alias3 = container.escapeExpression,
				lookupProperty =
					container.lookupProperty ||
					function (parent, propertyName) {
						if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
							return parent[propertyName];
						}
						return undefined;
					};

			return (
				'    <div id="image-studio">\n      <div class="slidecontainer">\n        <p><b>Resize Canvas</b></p \n        <p>\n          Width: 100' +
				alias3(
					(
						lookupProperty(helpers, 'sliderInput') ||
						(depth0 && lookupProperty(depth0, 'sliderInput')) ||
						alias2
					).call(
						alias1,
						depth0 != null
							? lookupProperty(depth0, 'canvasWidthSlider')
							: depth0,
						{
							name: 'sliderInput',
							hash: {},
							data: data,
							loc: {
								start: { line: 22, column: 20 },
								end: { line: 22, column: 53 },
							},
						}
					)
				) +
				'900\n        </p>\n \n        <p>\n          Height: 100' +
				alias3(
					(
						lookupProperty(helpers, 'sliderInput') ||
						(depth0 && lookupProperty(depth0, 'sliderInput')) ||
						alias2
					).call(
						alias1,
						depth0 != null
							? lookupProperty(depth0, 'canvasHeightSlider')
							: depth0,
						{
							name: 'sliderInput',
							hash: {},
							data: data,
							loc: {
								start: { line: 26, column: 21 },
								end: { line: 26, column: 55 },
							},
						}
					)
				) +
				'900\n        </p>\n      </div>\n \n      <p>\n        ' +
				alias3(
					(
						lookupProperty(helpers, 'button') ||
						(depth0 && lookupProperty(depth0, 'button')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'addTextToCanvas') : depth0,
						{
							name: 'button',
							hash: {},
							data: data,
							loc: {
								start: { line: 31, column: 8 },
								end: { line: 31, column: 34 },
							},
						}
					)
				) +
				' ' +
				alias3(
					(
						lookupProperty(helpers, 'button') ||
						(depth0 && lookupProperty(depth0, 'button')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'lockBG') : depth0,
						{
							name: 'button',
							hash: {},
							data: data,
							loc: {
								start: { line: 31, column: 35 },
								end: { line: 31, column: 52 },
							},
						}
					)
				) +
				'\n      </p>\n\n	  <p>\n	  	' +
				alias3(
					(
						lookupProperty(helpers, 'button') ||
						(depth0 && lookupProperty(depth0, 'button')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'clearCanvas') : depth0,
						{
							name: 'button',
							hash: {},
							data: data,
							loc: {
								start: { line: 35, column: 4 },
								end: { line: 35, column: 26 },
							},
						}
					)
				) +
				'\n	  </p>\n    \n	  <p><strong>Text</strong></p>\n      <p>\n        ' +
				alias3(
					(
						lookupProperty(helpers, 'colorInput') ||
						(depth0 && lookupProperty(depth0, 'colorInput')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'canvasTextColor') : depth0,
						{
							name: 'colorInput',
							hash: {},
							data: data,
							loc: {
								start: { line: 40, column: 8 },
								end: { line: 40, column: 38 },
							},
						}
					)
				) +
				'\n		' +
				alias3(
					(
						lookupProperty(helpers, 'button') ||
						(depth0 && lookupProperty(depth0, 'button')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'boldText') : depth0,
						{
							name: 'button',
							hash: {},
							data: data,
							loc: {
								start: { line: 41, column: 2 },
								end: { line: 41, column: 21 },
							},
						}
					)
				) +
				'\n		' +
				alias3(
					(
						lookupProperty(helpers, 'button') ||
						(depth0 && lookupProperty(depth0, 'button')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'italicText') : depth0,
						{
							name: 'button',
							hash: {},
							data: data,
							loc: {
								start: { line: 42, column: 2 },
								end: { line: 42, column: 23 },
							},
						}
					)
				) +
				'\n		' +
				alias3(
					(
						lookupProperty(helpers, 'button') ||
						(depth0 && lookupProperty(depth0, 'button')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'underlineText') : depth0,
						{
							name: 'button',
							hash: {},
							data: data,
							loc: {
								start: { line: 43, column: 2 },
								end: { line: 43, column: 26 },
							},
						}
					)
				) +
				'\n      </p>\n \n      <label>Font family: </label>\n      <select name="font" id="canvas-text-font-family">\n        <option value="Times New Roman">Times New Roman</option>\n        <option value="Sans Serif">Sans Serif</option>\n        <option value="Comic Sans">Comic Sans</option>\n      </select>\n    </div>\n'
			);
		},
		5: function (container, depth0, helpers, partials, data) {
			var stack1,
				lookupProperty =
					container.lookupProperty ||
					function (parent, propertyName) {
						if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
							return parent[propertyName];
						}
						return undefined;
					};

			return (
				'    <div id="minima-images-container">\n      <div class="minima-image-panel">\n' +
				((stack1 = lookupProperty(helpers, 'each').call(
					depth0 != null ? depth0 : container.nullContext || {},
					depth0 != null ? lookupProperty(depth0, 'imageUrls') : depth0,
					{
						name: 'each',
						hash: {},
						fn: container.program(6, data, 0),
						inverse: container.noop,
						data: data,
						loc: {
							start: { line: 59, column: 8 },
							end: { line: 63, column: 17 },
						},
					}
				)) != null
					? stack1
					: '') +
				'      </div>\n    </div>\n'
			);
		},
		6: function (container, depth0, helpers, partials, data) {
			return (
				'        <a href="#" class="minima-images-replacer">\n          <img src=' +
				container.escapeExpression(container.lambda(depth0, depth0)) +
				' class="image-search-result" />\n        </a>\n'
			);
		},
		8: function (container, depth0, helpers, partials, data) {
			var lookupProperty =
				container.lookupProperty ||
				function (parent, propertyName) {
					if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
						return parent[propertyName];
					}
					return undefined;
				};

			return (
				'	  ' +
				container.escapeExpression(
					(
						lookupProperty(helpers, 'sliderInput') ||
						(depth0 && lookupProperty(depth0, 'sliderInput')) ||
						container.hooks.helperMissing
					).call(
						depth0 != null ? depth0 : container.nullContext || {},
						depth0 != null
							? lookupProperty(depth0, 'fontSizeForCanvasText')
							: depth0,
						{
							name: 'sliderInput',
							hash: {},
							data: data,
							loc: {
								start: { line: 69, column: 3 },
								end: { line: 69, column: 40 },
							},
						}
					)
				) +
				'\n	</div>\n'
			);
		},
		compiler: [8, '>= 4.3.0'],
		main: function (container, depth0, helpers, partials, data) {
			var stack1,
				alias1 = depth0 != null ? depth0 : container.nullContext || {},
				alias2 = container.hooks.helperMissing,
				alias3 = container.escapeExpression,
				lookupProperty =
					container.lookupProperty ||
					function (parent, propertyName) {
						if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
							return parent[propertyName];
						}
						return undefined;
					};

			return (
				'    <div id="minima-images-search-container">\n      <div class="tab">\n        ' +
				alias3(
					(
						lookupProperty(helpers, 'button') ||
						(depth0 && lookupProperty(depth0, 'button')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'searchTab') : depth0,
						{
							name: 'button',
							hash: {},
							data: data,
							loc: {
								start: { line: 3, column: 8 },
								end: { line: 3, column: 28 },
							},
						}
					)
				) +
				' ' +
				alias3(
					(
						lookupProperty(helpers, 'button') ||
						(depth0 && lookupProperty(depth0, 'button')) ||
						alias2
					).call(
						alias1,
						depth0 != null ? lookupProperty(depth0, 'studioTab') : depth0,
						{
							name: 'button',
							hash: {},
							data: data,
							loc: {
								start: { line: 3, column: 29 },
								end: { line: 3, column: 49 },
							},
						}
					)
				) +
				'\n      </div>\n\n' +
				((stack1 = lookupProperty(helpers, 'unless').call(
					alias1,
					depth0 != null ? lookupProperty(depth0, 'studioMode') : depth0,
					{
						name: 'unless',
						hash: {},
						fn: container.program(1, data, 0),
						inverse: container.noop,
						data: data,
						loc: {
							start: { line: 6, column: 6 },
							end: { line: 15, column: 15 },
						},
					}
				)) != null
					? stack1
					: '') +
				'\n' +
				((stack1 = lookupProperty(helpers, 'if').call(
					alias1,
					depth0 != null ? lookupProperty(depth0, 'studioMode') : depth0,
					{
						name: 'if',
						hash: {},
						fn: container.program(3, data, 0),
						inverse: container.noop,
						data: data,
						loc: {
							start: { line: 17, column: 4 },
							end: { line: 53, column: 11 },
						},
					}
				)) != null
					? stack1
					: '') +
				'\n\n' +
				((stack1 = lookupProperty(helpers, 'if').call(
					alias1,
					depth0 != null ? lookupProperty(depth0, 'urlsLength') : depth0,
					{
						name: 'if',
						hash: {},
						fn: container.program(5, data, 0),
						inverse: container.noop,
						data: data,
						loc: {
							start: { line: 56, column: 4 },
							end: { line: 66, column: 11 },
						},
					}
				)) != null
					? stack1
					: '') +
				'\n' +
				((stack1 = lookupProperty(helpers, 'if').call(
					alias1,
					depth0 != null
						? lookupProperty(depth0, 'selectedCanvasText')
						: depth0,
					{
						name: 'if',
						hash: {},
						fn: container.program(8, data, 0),
						inverse: container.noop,
						data: data,
						loc: {
							start: { line: 68, column: 1 },
							end: { line: 71, column: 8 },
						},
					}
				)) != null
					? stack1
					: '')
			);
		},
		useData: true,
	});
})();
