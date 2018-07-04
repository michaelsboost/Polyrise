# tooltipster-selectableText

A [Tooltipster](http://iamceege.github.io/tooltipster/) plugin to make a tooltip appear when you select / highlight a text. MIT license

Demo: https://jsfiddle.net/5xqqmrt6/41/

##Installation

Include the plugin file in your page AFTER the Tooltipster file.

```html
<html>
    <head>
        ...
        <script type="text/javascript" src="tooltipster/dist/js/tooltipster.bundle.min.js"></script>
        <script type="text/javascript" src="tooltipster-selectableText/tooltipster-selectableText.js"></script>
    </head>
</html>
```

## Usage

Once the plugin is included in the page, there are two new Tooltipster core methods you can use: `startSelectable` and `stopSelectable`. The first one is in the form:

```javascript
$.tooltipster.startSelectable(
	selector || jQuery collection,
	function(instance, selectedText) {
		return contentToDisplayInTheTooltip;
	},
	options
);
```

where `instance` is the instance of the tooltip which is about to be displayed and `options` is an object with your options for that tooltip (see Tooltipster's documentation). Just like any other Tooltipster tooltip, `contentToDisplayInTheTooltip` can be a string or HTML (check the documentation). The second method is in the form:

```javascript
$.tooltipster.stopSelectable(selector || jQuery collection);
```

The selected text will be wrapped in a span that has a `.tooltipster-selectedText` class. So if you want to highlight it in yellow, you can write in your CSS:

```css
.tooltipster-selectedText {
	background: yellow;
}
```

## Limitations

This plugin works well on plain text. When you want to select cross-paragraphs text or partial HTML tags, it will not work because of how the native `surroundContents` method works. Also, the text is randomly unselected (in Chrome at least) when we wrap it in a span. If you want to make this plugin better with a PR, help is welcome.

## Example

```javascript
$.tooltipster.startSelectable(
	'p',
	function(instance, selectedText) {
		return translateInGerman(selectedText);
	},
	{ animation: 'slide' }
);
```

Or:

```javascript
$.tooltipster.startSelectable(
	$('#myelement').next(),
	function(instance, selectedText) {
		
		// some kind of asynchronous task
		setTimeout(function() {
			instance.content('My tooltip content');
		}, 2000);
	
		return $('<span><img src="spinner.gif" /> Loading...</span>');
	}
);
```

And later:

```javascript
$.tooltipster.stopSelectable('p');
```

Thanks to @macmessa and @yairneumann11 for suggesting this plugin.
