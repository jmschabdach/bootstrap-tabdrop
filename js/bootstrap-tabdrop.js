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

!function ($) {

	var WinResizer = (function () {
		var registered = [];
		var inited = false;
		var timer;
		var resize = function (ev) {
			clearTimeout(timer);
			timer = setTimeout(notify, 100);
		};
		var notify = function () {
			for (var i = 0, cnt = registered.length; i < cnt; i++) {
				registered[i].apply();
			}
		};
		return {
			register: function (fn) {
				registered.push(fn);
				if (inited === false) {
					$(window).bind('resize', resize);
					inited = true;
				}
			},
			unregister: function (fn) {
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

	var TabDrop = function (element, options) {
		this.element = $(element);
		this.options = options;
		this.dropdown = $('<li class="dropdown hide pull-right tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="display-tab"></span><b class="caret"></b></a><ul class="dropdown-menu"></ul></li>')
			.prependTo(this.element);
		if (this.element.parent().is('.tabs-below')) {
			this.dropdown.addClass('dropup');
		}

		var boundLayout = $.proxy(this.layout, this);
		var boundUpdateSelection = $.proxy(updateSelection, this);

		WinResizer.register(boundLayout);
		this.element.on('click', 'li:not(.tabdrop)', boundUpdateSelection);

		this.teardown = function () {
			WinResizer.unregister(boundLayout);
			this.element.off('click', 'li:not(.tabdrop)', boundUpdateSelection);
		};

		this.layout();
	};

	TabDrop.prototype = {
		constructor: TabDrop,

		layout: function () {
			var self = this;
			var collection = [];

			function setDropdownText(text) {
				self.dropdown.find('a span.display-tab').html(text);
			}

			function setDropdownDefaultText(collection) {
				var text;
				if (jQuery.isFunction(self.options.text)) {
					text = self.options.text(collection);
				} else {
					text = self.options.text;
				}
				setDropdownText(text);
			}

			function checkOffsetAndPush(recursive) {
				self.element.find('> li:not(.tabdrop)')
					.each(function () {
						if (this.offsetTop > self.options.offsetTop) {
							collection.push(this);
						}
					});

				if (collection.length > 0) {
					if (!recursive) {
						self.dropdown.removeClass('hide');
						self.dropdown.find('ul').empty();
					}
					self.dropdown.find('ul').prepend(collection);

					if (self.dropdown.find('.active').length == 1) {
						self.dropdown.addClass('active');
						setDropdownText(self.dropdown.find('.active > a').html());
					} else {
						self.dropdown.removeClass('active');
						setDropdownDefaultText(collection);
					}

					collection = [];
					checkOffsetAndPush(true);
				} else {
					if (!recursive) {
						self.dropdown.addClass('hide');
					}
				}
			}

			self.element.append(self.dropdown.find('li'));
			checkOffsetAndPush();
		}
	};

	$.fn.tabdrop = function (option) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('tabdrop'),
				options = typeof option === 'object' && option;
			if (!data) {
				options = $.extend({}, $.fn.tabdrop.defaults, options);
				data = new TabDrop(this, options);
				$this.data('tabdrop', data);
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

}(window.jQuery);
