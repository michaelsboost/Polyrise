/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	config.skin = 'moono-dark';

	config.language = 'en';
	
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// Toolbar groups configuration.
	config.toolbarGroups = [
		{ name: 'basicstyles', groups: [ 'basicstyles' ] },
		{ name: 'paragraph', groups: [ 'list', 'blocks', 'align', 'bidi' ] },
		{ name: 'links' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' }
	];

	// add extra plugins
	// config.extraPlugins = 'mbr-button';
	config.extraPlugins = 'mobirise';

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Styles,Underline,Subscript,Superscript,Strike,Anchor,RemoveFormat';

	// remove context menu and paragraph red line
	config.removePlugins = 'tabletools,liststyle,contextmenu,magicline';
	
	config.linkShowAdvancedTab = false
	config.linkShowTargetTab = false

	config.title = false;

	// no remove classnames and other component attributes
	config.allowedContent = true;

	// insert the clipboard content as plain text
	config.forcePasteAsPlainText = true;

	// Set the most common block elements.
	// config.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre';

	// Simplify the dialog windows.
	// config.removeDialogTabs = 'image:advanced;link:advanced';
};
