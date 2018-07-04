(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['tooltipster'], function($) {
			return (factory($));
		});
	}
	else if (typeof exports === 'object') {
		module.exports = factory(require('tooltipster'));
	}
	else {
		factory(jQuery);
	}
}(this, function($) {
	
	var pluginName = 'laa.selectableText';
	
	$.tooltipster._plugin({
		name: pluginName,
		core: {
			__init: function() {
				
				var self = this;
				
				self.__targets = [];
				
				$(document.body).on('mouseup', function(e) {
					
					// FF/Webkit : IE
					var selection = window.getSelection ?
							window.getSelection() :
							document.selection.createRange(),
						selectedText = selection.toString();
					
					if (selection.getRangeAt && selectedText !== '') {
						
						var target = null;
						
						$.each(self.__targets, function(i, t) {
							if (self.__elementContainsSelection(t.element)) {
								target = t;
								return false;
							}
						});
						
						if (target) {
							
							var $newNode = $('<span>', { class: 'tooltipster-selectedText'});
							
							try {
								
								selection.getRangeAt(0)
									.surroundContents($newNode[0]);
								
								target.options.trigger = 'custom';
								
								$newNode.tooltipster(target.options);
								
								var content = target.callback($newNode.tooltipster('instance'), selectedText);
								
								$newNode
									.tooltipster('content', content)
									.tooltipster('show');
								
								$(document.body).one('mousedown', function() {
									$newNode.contents().unwrap();
								});
							}
							catch(e) {}
						}
					}
				});
			},
			// taken from http://stackoverflow.com/questions/8339857/how-to-know-if-selected-text-is-inside-a-specific-div
			__elementContainsSelection(el) {
				var sel;
				if (window.getSelection) {
					sel = window.getSelection();
					if (sel.rangeCount > 0) {
						for (var i = 0; i < sel.rangeCount; ++i) {
							if (!this.__isOrContains(sel.getRangeAt(i).commonAncestorContainer, el)) {
								return false;
							}
						}
						return true;
					}
				} else if ( (sel = document.selection) && sel.type != "Control") {
					return this.__isOrContains(sel.createRange().parentElement(), el);
				}
				return false;
			},
			__isOrContains(node, container) {
				while (node) {
					if (node === container) {
						return true;
					}
					node = node.parentNode;
				}
				return false;
			},
			startSelectable: function(elements, callback, options) {
				
				var self = this,
					$elements = elements;
				
				options = options || {};
				
				if (typeof elements === 'string') {
					$elements = $(elements);
				}
				
				$elements.each(function(i, el) {
					
					var target = {
							element: el,
							callback: callback,
							options: options
						},
						targetIndex = null;
					
					// search if the element was already registered
					$.each(self.__targets, function(j, target) {
						
						if (target.el === el) {
							targetIndex = j;
							return false;
						}
					});
					
					// add
					if (!targetIndex) {
						self.__targets.push(target);
					}
					// replace
					else {
						self.__targets[targetIndex] = target;
					}
				});
				
				return this.__core;
			},
			stopSelectable: function(elements) {
				
				var $elements = elements;
				
				if (typeof elements === 'string') {
					$elements = $(elements);
				}
				
				this.__targets = $.grep(this.__targets, function(target, i) {
					return $.inArray(target.element, $elements) === -1;
				});
			}
		}
	});
}));
