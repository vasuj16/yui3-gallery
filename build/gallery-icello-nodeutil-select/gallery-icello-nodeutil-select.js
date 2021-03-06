YUI.add('gallery-icello-nodeutil-select', function(Y) {

'use strict';

var CB = 'contentBox',
	CHANGE = 'change',
	ITEMS = 'items',
	NAME = 'icello-nodeutil-select',
	MULTIPLE = 'multiple',
	OPTION = 'option',
	OPTION_CHECKED = 'option:checked',
	OPTIONS = 'options',
	SELECTED = 'selected',
	TEMPLATES = {
		OPTION_BY_VALUE: 'option[value="{value}"]'
	},
	VALUE = 'value',
	Lang = Y.Lang,
	Node = Y.Node,
	exists = function (v) {
		return v !== undefined && v !== null;
	},
	unselectCurrentSelected = function (that) {
		var option = that.getOptionSelected();
		if (option) {
		    option.set(SELECTED, false);
		}
	};

Y.namespace('Icello.NodeUtil');
/**
* @class Select
* @constructor
* @extends Widget
*/
Y.Icello.NodeUtil.Select = Y.Base.create(
	NAME,
	Y.Widget,
	[],
	{
		BOUNDING_TEMPLATE: '<select></select>',
		CONTENT_TEMPLATE: null,
		initializer: function () {
			this.on('change', Y.bind(function (e) {
				var optionSelected = this.getOptionSelected();
				e.optionSelected = optionSelected;
			}, this));

			if (this.get(MULTIPLE) && !this.get(CB).hasAttribute(MULTIPLE)) {
				this.get(CB).set(MULTIPLE, true);
			}
		},
		destructor: function () {
		},
		renderUI: function () {
			var that = this,
				cb = this.get(CB),
				options = this.get(OPTIONS),
				items = this.get(ITEMS);

			if (options) {
				options.each(function (option) {
					cb.appendChild(option);
				});
			}
			Y.Array.each(items, function (item) {
				that.append(item);
			});
		},
		bindUI: function () {
		},
		/** 
		* @method append
		* @param {Object} item object literal with this properties: text, value, selected (Boolean)
		*/
		append: function (item) {
			var option = Node.create('<option></option>'),
				cb = this.get(CB);

			option.setContent(item.text);

			if (exists(item.value)) {
				option.set(VALUE, item.value);
			}

			if (item.selected) {
				if (!this.get(MULTIPLE)) {
					unselectCurrentSelected(this); //needed in IE 9
				}

				option.set(SELECTED, true);
			}

			cb.append(option);
		},
		getOptionByValue: function (value) {
			var cb = this.get(CB),
				html = Lang.sub(TEMPLATES.OPTION_BY_VALUE, { value: value }),
				option = cb.one(html);

			return option;
		},
		getOptionSelected: function () {
			var cb = this.get(CB);
			return cb.one(OPTION_CHECKED);
		},
		getOptionsSelected: function () {
			var cb = this.get(CB);
			return cb.all(OPTION_CHECKED);
		},
		getValueSelected: function () {
			var cb = this.get(CB),
				option = cb.one(OPTION_CHECKED),
				v = null;

			if (option) {
				v = option.get(VALUE);
			}

			return v;
		},
		item: function (index) {
			var cb = this.get(CB),
				options = cb.all(OPTION);

			return options.item(index);
		},
		simulateChange: function (index) {
			var option = this.item(index),
				cb = this.get(CB);

			if (!this.get(MULTIPLE)) {
			    unselectCurrentSelected(this);
			}

			option.set(SELECTED, true);
			cb.simulate(CHANGE);
		},
		size: function () {
			var cb = this.get(CB);
			return cb.all(OPTION).size();
		},
		sizeSelected: function () {
			var cb = this.get(CB);
			return cb.all(OPTION_CHECKED).size();
		}
	},
	{
		ATTRS: {
			/** 
			* @attribute items
			* @type Array
			* @default []
			*/
			items: {
				value: [],
				validator: Y.Lang.isArray
			},
			multiple: {
				value: false,
				validator: Y.Lang.isBoolean,
				writeOnce: 'initOnly'
			},
			options: {}
		},
		HTML_PARSER: {
			multiple: function (srcNode) {
				return srcNode.get(MULTIPLE);
			},
			options: [OPTION]
		}
	}
);



}, '@VERSION@' ,{requires:['base-build', 'widget', 'selector-css3'], skinnable:false});
