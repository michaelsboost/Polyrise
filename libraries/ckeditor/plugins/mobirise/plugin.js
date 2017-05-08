
(function(){

    // polyfill: https://goo.gl/AXjqIZ
    if (!Function.prototype.bind){
        Function.prototype.bind = function(oThis){
            if (typeof this !== 'function')
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            var aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function(){},
            fBound = function(){
                return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        };
    }

    // polyfill: https://goo.gl/YzOPlu
    if (!Array.prototype.forEach){
        Array.prototype.forEach = function (callback, thisArg){
            var T, k;
            if (this == null) throw new TypeError(' this is null or not defined');
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
            if (arguments.length > 1) T = thisArg;
            k = 0;
            while (k < len){
                var kValue;
                if (k in O){
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }

    CKEDITOR.on('instanceCreated', function(event){
        var editor = event.editor, element = editor.element;
        if (element.is('a')){
            editor.on('configLoaded', function(){                
                editor.config.removePlugins = 'basicstyles';                
                editor.config.toolbar = [
                    {name : 'tools', items : [' cke_button__link']}
                ];
                if (null !== element.data('app-list-item')){
                    editor.config.toolbar = [
                        {name : 'tools', items : [' cke_button__link', 'Clone']},
                        {name : 'remove', items : ['Remove']}
                    ];
                }
                element.setStyles(CKEDITOR.tools.cssVendorPrefix('user-drag', 'none'));
                if (element.hasClass('btn')){
                    element.setStyles(CKEDITOR.tools.cssVendorPrefix('user-select', 'text'));
                    editor.config.toolbar.splice(1, 0, {name : 'style', items : ['Button style']});
                }
                if (element.hasAttribute('data-app-activator'))
                    editor.config.toolbar.splice(1, 0, {name : 'activator', items : ['Active']});
            });
        }
    });

    CKEDITOR.on('currentInstance', function(event){
        if (event.sender.currentInstance){
            var editor  = event.sender.currentInstance,
                element = editor.element;
            if (element.hasAttribute('data-app-activator')){
                var active = CKEDITOR.plugins.mobirise.getListItemForActivation(element).hasClass('active');
                editor.getCommand('mbr_activator').setState(active ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
            }
        }
    });

    ['a'].forEach(function(tag){
        if (tag in CKEDITOR.dtd.$editable) return;
        CKEDITOR.dtd.$editable[tag] = 1;
        for (var nodes = CKEDITOR.document.getElementsByTag(tag), i = 0, count = nodes.count(); i < count; i++){
            var item = nodes.getItem(i);
            if ('true' == item.getAttribute('contenteditable'))
                CKEDITOR.inline(item);
        }
    });

})();

CKEDITOR.plugins.add('mobirise', {

    requires : 'link,richcombo',
    iconSet  : 'clone,clone-rtl,remove,remove-rtl',
    
    onLoad : function(){
        CKEDITOR.plugins.link._getSelectedLink = CKEDITOR.plugins.link.getSelectedLink;
        CKEDITOR.plugins.link.getSelectedLink = function(editor){
            if (editor.element.is('a')) return editor.element;
            return CKEDITOR.plugins.link._getSelectedLink(editor);
        };
        var iconsFolder = this.path + 'icons/';
        if ('moono-dark' == CKEDITOR.skin.name) iconsFolder += CKEDITOR.skin.name + '/';
        if (CKEDITOR.env.hidpi) iconsFolder += 'hidpi/';
        this.iconSet.split(',').forEach(function(icon){
            CKEDITOR.skin.addIcon(icon, iconsFolder + icon + '.png'); 
        });
        CKEDITOR.addCss(
            '.cke_button__active_icon { display: none; }' +
            '.cke_button__active_label { display: inline; padding-left: 0; }'
        );
    },

    init : function(editor){

        if (editor.element.is('a')){
            
            editor.insertHtml = CKEDITOR.plugins.mobirise.insertHtmlReplace.bind(editor);
            editor.config.clipboard_defaultContentType = 'text';

            editor.element.on('click', function(event){
                event.data.preventDefault(true);
            });

            editor.element.on('drop', function(event){
                event.data.preventDefault(true);
            });

            editor.on('blur', function(){
                if ('' == editor.element.getHtml() || '<br>' == editor.element.getHtml()){
                    var item = CKEDITOR.plugins.mobirise.getListItem(editor.element);
                    if (item && item.getParent().find(editor.element.getName() + '[data-app-list-item]').count() > 1){
                        item.remove();
                        editor.destroy();
                        editor = null;
                    } else editor.element.setHtml('#');
                }
            });

            editor.on('key', function(event){
                if (13 == event.data.keyCode || CKEDITOR.SHIFT + 13 == event.data.keyCode)
                    event.cancel();
            });

            // ignore firefox hotkeys =(
            if (CKEDITOR.env.gecko){
                editor.on('key', function(event){
                    var keyMap = {
                        48 : '0',
                        49 : '1',
                        50 : '2',
                        54 : '6',
                        57 : '9',
                        88 : 'x',
                        90 : 'z',
                        96 : '0',
                        97 : '1',
                        98 : '2',
                        102 : '6',
                        105 : '9'
                    };
                    if (event.data.keyCode in keyMap){
                        event.cancel();
                        editor.insertHtml(keyMap[event.data.keyCode]);
                    }
                });                
            }

            editor.addCommand('mbr_clone', {
                exec : function(editor){
                    var item = CKEDITOR.plugins.mobirise.getListItem(editor.element), newItem = item.clone(true);
                    newItem.insertAfter(item);
                    (new CKEDITOR.dom.node(document.createTextNode(' '))).insertAfter(item);
                    if (!newItem.isEditable()) newItem = newItem.find(editor.element.getName() + '[data-app-list-item]').getItem(0);
                    if ('' === newItem.data('app-activator') && null !== newItem.data('app-list-item'))
                        CKEDITOR.plugins.mobirise.getListItemForActivation(newItem).removeClass('active');
                    newItem.setAttribute('class', newItem.getAttribute('class').replace(/\bcke_\S*\s*/g, ''));
                    CKEDITOR.inline(newItem).on('instanceReady', function(){
                        this.focus();
                        var range    = this.getSelection().getRanges()[0],
                            element  = this.element,
                            newRange = new CKEDITOR.dom.range(range.document);
                        newRange.setStart(element.getChild(0), 0);
                        newRange.setEnd(
                            element.getChild(0),
                            CKEDITOR.plugins.mobirise.htmlspecialchars_decode(element.$.innerHTML).length
                        );
                        newRange.select();
                    });
                }
            });

            editor.addCommand('mbr_remove', {
                exec : function(editor){
                    var item = CKEDITOR.plugins.mobirise.getListItem(editor.element),
                        parent    = item.getParent(),
                        selector  = editor.element.getName() + '[data-app-list-item]',
                        isElement = function(node){ return node.type == CKEDITOR.NODE_ELEMENT; },
                        otherItem = item.getNext(isElement) || item.getPrevious(isElement);
                    item.remove();
                    if (otherItem){
                        if (!otherItem.isEditable()) otherItem = otherItem.find(selector).getItem(0);
                        if (otherItem.getEditor) otherItem.getEditor().focus();
                    } else if (parent.hasClass('group') || 'p' == parent.getName()) parent.remove();
                    editor.destroy();
                    editor = null;
                }
            });

            editor.addCommand('mbr_activator', {
                exec : function(editor){
                    var item = CKEDITOR.plugins.mobirise.getListItemForActivation(editor.element);
                    var active = item.hasClass('active');
                    if (!active && !editor.element.data('app-activator') && null !== editor.element.data('app-list-item')){
                        for (var nodes = item.getParent().find(' > *'), i = 0, count = nodes.count(); i < count; i++)
                            nodes.getItem(i).removeClass('active');
                    }
                    item[ (active ? 'remove' : 'add') + 'Class' ]('active');
                    editor.getCommand('mbr_activator').setState(active ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_ON);
                }
            });

            if (editor.ui.addButton){
                
                editor.ui.addButton(' cke_button__link', {
                    label   : editor.lang.link.toolbar.replace(/^.+?\//, ''),
                    command : 'link',
                    toolbar : 'mbr_link'
                });
                
                editor.ui.addButton('Clone', {
                    label   : 'Add',
                    command : 'mbr_clone',
                    toolbar : 'mbr_clone'
                });
                
                editor.ui.addButton('Remove', {
                    label   : 'Remove',
                    command : 'mbr_remove',
                    toolbar : 'mbr_remove'
                });

                editor.ui.addRichCombo('Button style', {
                
                    label   : 'Style',
                    toolbar : 'mbr_button_style',
                    
                    panel : {
                        css : [ CKEDITOR.skin.getPath('editor') ].concat(
                            editor.config.contentsCss,
                            this.path + 'css/richcombo.css'
                        ),
                        multiSelect : false,
                        attributes  : {'aria-label': 'Button style'}
                    },

                    init : function(){
                        this.startGroup('Style');
                        CKEDITOR.plugins.mobirise.buttonStyles.forEach(function(item){
                            this.add(item, item);
                        }, this);
                    },

                    onClick : function(value){
                        editor.focus();
                        if (value != this.getValue()){
                            editor.element.removeClass('btn-' + this.getValue().toLowerCase());
                            editor.element.addClass('btn-' + value.toLowerCase());
                            this.setValue(value);
                        }
                    },

                    refresh : function(){
                        var result, reg = '\\bbtn-(' + CKEDITOR.plugins.mobirise.buttonStyles.join('|') + ')\\b';
                        if (result = (new RegExp(reg, 'i')).exec(editor.element.getAttribute('class')))
                            this.setValue(result[1].charAt(0).toUpperCase() + result[1].slice(1));
                    }
                    
                });

                editor.ui.addButton('Active', {
                    label   : 'Active',
                    command : 'mbr_activator',
                    toolbar : 'mbr_activator'
                });

            }

            if (null !== editor.element.data('app-list-item')){
                editor.setKeystroke([
                    [CKEDITOR.ALT + 45, 'mbr_clone'],  // ALT + INSERT
                    [CKEDITOR.ALT + (CKEDITOR.env.webkit ? 187 : 61), 'mbr_clone'],  // ALT + "+"
                    [CKEDITOR.ALT + 46, 'mbr_remove']  // ALT + DELETE
                ]);
            }

            if (null !== editor.element.data('app-activator'))
                editor.setKeystroke(CKEDITOR.ALT + 65, 'mbr_activator');  // ALT + A

        }

    }

} );

CKEDITOR.plugins.mobirise = {

    buttonStyles : [
        'Default',
        'Primary',
        'Success',
        'Info',
        'Warning',
        'Danger',
        'Link'
    ],

    htmlspecialchars : function(str){
        return str.replace(/&|<|>| /g, function(found){
            switch (found){
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case ' ': return '&nbsp;';
            }
            return found;
        });
    },

    htmlspecialchars_decode : function(str){
        return str.replace(/&(lt|gt|amp|nbsp);/ig, function(str, found){
            switch (found){
                case 'lt':   return '<';
                case 'gt':   return '>';
                case 'amp':  return '&';
                case 'nbsp': return ' ';
            }
            return str;
        });
    },

    // source: http://goo.gl/mjLrXz
    getCaret : function(element){
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if ('undefined' != typeof(win.getSelection)){
            sel = win.getSelection();
            if (sel.rangeCount > 0){
                var range = win.getSelection().getRangeAt(0);
                var preCaretRange = range.cloneRange();
                preCaretRange.selectNodeContents(element);
                preCaretRange.setEnd(range.endContainer, range.endOffset);
                caretOffset = preCaretRange.toString().length;
            }
        } else if ((sel = doc.selection) && 'Control' != sel.type){
            var textRange = sel.createRange();
            var preCaretTextRange = doc.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint('EndToEnd', textRange);
            caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
    },

    insertHtmlReplace : function(text){
        var editor = this;
        editor.focus();
        editor.fire('saveSnapshot');
        var selection = editor.getSelection(),
            range     = selection.getRanges()[0],
            element   = range.root,
            content   = element.$.innerHTML,
            caret     = CKEDITOR.plugins.mobirise.getCaret(element.$),
            selectionLength = selection.getSelectedText().length;
        text = text.replace(/<[^>]*>/g, '').replace(/[<>]/g, '').replace(/\s+/g, ' ');
        if (selectionLength) caret = Math.max(0, caret - selectionLength);
        if (content){            
            text    = CKEDITOR.plugins.mobirise.htmlspecialchars_decode(text);
            content = CKEDITOR.plugins.mobirise.htmlspecialchars_decode(content);
            content = content.slice(0, caret) + text + content.slice(caret + selectionLength);
            element.$.innerHTML = CKEDITOR.plugins.mobirise.htmlspecialchars(content);
        } else {
            element.$.innerHTML = text;
            text = CKEDITOR.plugins.mobirise.htmlspecialchars_decode(text);
        }
        var newRange = new CKEDITOR.dom.range(range.document);
        newRange.setStart(element.getChild(0), caret + text.length);
        newRange.select();
        setTimeout(function(){
            editor.fire('saveSnapshot');
        }, 0);
    },

    getListItem : function(element, path){
        var item = element, path = path || item.data('app-list-item');
        if (null === path) return null;
        switch (path){
            case 'parent parent': item = item.getParent();
            case 'parent': item = item.getParent(); break;
        }
        return item;
    },

    getListItemForActivation : function(element){
        return this.getListItem(element, element.data('app-activator'));
    }

};