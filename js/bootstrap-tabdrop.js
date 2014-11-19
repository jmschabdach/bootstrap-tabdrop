/* =========================================================
 * bootstrap-tabdrop.js 
 * http://www.eyecon.ro/bootstrap-tabdrop
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Copyright 2014 Jose Ant. Aranda
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function( $ ) {

	var WinReszier = (function(){
		var registered = [];
		var inited = false;
		var timer;
		var resize = function(ev) {
			clearTimeout(timer);
			timer = setTimeout(notify, 100);
		};
		var notify = function() {
			for(var i=0, cnt=registered.length; i<cnt; i++) {
				registered[i].apply();
			}
		};
		return {
			register: function(fn) {
				registered.push(fn);
				if (inited === false) {
					$(window).bind('resize', resize);
					inited = true;
				}
			},
			unregister: function(fn) {
				var registeredFnIndex = registered.indexOf(fn);
				if (registeredFnIndex > -1) {
					registered.splice(registeredFnIndex, 1);
				}
			}
		}
	}());

	function updateSelection(e) {
		this.element.find('li').removeClass('active');
		$(e.currentTarget).addClass('active');
		this.layout();
	}

	var TabDrop = function(element, options) {
		this.element = $(element);
		this.options = options;
		this.dropdown = $('<li class="dropdown hide pull-right tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="display-tab"></span><b class="caret"></b></a><ul class="dropdown-menu"></ul></li>')
							.prependTo(this.element);
		if (this.element.parent().is('.tabs-below')) {
			this.dropdown.addClass('dropup');
		}
		
		var boundLayout = $.proxy(this.layout, this);
		var boundUpdateSelection = $.proxy(updateSelection, this);

		WinReszier.register(boundLayout);
		this.element.on('click', 'li:not(.tabdrop)', boundUpdateSelection);

		this.teardown = function() {
			WinReszier.unregister(boundLayout);
			this.element.off('click', 'li:not(.tabdrop)', boundUpdateSelection);
		};

		this.layout();
	};

	TabDrop.prototype = {
		constructor: TabDrop,

		layout: function() {
			var collection = [];
			var dropdown = this.dropdown;
			var options = this.options;

			function setDropdownText(text) {
				dropdown.find('a span.display-tab').html(text);
			}

			function setDropdownDefaultText(collection) {
				var text;
			    if (jQuery.isFunction(options.text)) {
			    	text = options.text(collection);
			    } else {
			    	text = options.text;
			    }
			    setDropdownText(text);
			}

			this.element
				.append(this.dropdown.find('li'))
					.append(this.dropdown.find('li'))
					.find('>li')
					.not('.tabdrop')
					.each(function(){
						if(this.offsetTop > options.offsetTop) {
							collection.push(this);
						}
					});

			if (collection.length > 0) {
				this.dropdown.removeClass('hide');

				collection = $(collection);
				this.dropdown
						.find('ul')
						.empty()
						.append(collection);

				if (this.dropdown.find('.active').length == 1) {
					this.dropdown.addClass('active');
					setDropdownText(this.dropdown.find('.active > a').html());
				} else {
					this.dropdown.removeClass('active');
					setDropdownDefaultText(collection);
				}
			} else {
				this.dropdown.addClass('hide');
			}
		}
	}

	$.fn.tabdrop = function ( option ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('tabdrop'),
				options = typeof option === 'object' && option;
			if (!data)  {
				$this.data('tabdrop', (data = new TabDrop(this, $.extend({}, $.fn.tabdrop.defaults,options))));
			}
			if (typeof option == 'string') {
				data[option]();
			}
		})
	};

	$.fn.tabdrop.defaults = {
		text: '<i class="fa fa-align-justify"></i>',
		offsetTop: 0
	};

	$.fn.tabdrop.Constructor = TabDrop;

}( window.jQuery );
