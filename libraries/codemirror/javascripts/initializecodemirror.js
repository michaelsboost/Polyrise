  var delay;
  // Initialize CodeMirror editor
  var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
	mode: 'text/html',
	tabMode: 'indent',
	lineNumbers: true,
	lineWrapping: true
  });
  
  // Auto update Live preview
  editor.on("change", function() {
	clearTimeout(delay);
	delay = setTimeout(updatePreview, 300);
  });
  
  // Live preview
  function updatePreview() {
	var previewFrame = document.getElementById('preview');
	var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
	preview.open();
	preview.write(editor.getValue());
	preview.close();
  }
  setTimeout(updatePreview, 300);
  
 // Warning before refreshing
 /*
 window.onbeforeunload = function() {
	return false;
}
*/
 
 // Auto-scroll to the bottom of iframe
 function scrollToBottom() {
	if (stickyScroll==1) {	$('#preview').contents().scrollTop($('#preview').contents().height()); }
	else if (stickyScroll==0) { $('#preview').contents().scrollTo(0, 0); }
 }
  
  // Comment selected HTML text
  function HTMLcommentSelected() {
	var textSelected=editor.getSelection(); 
	var textReplacedBy="<!--"+	'\n'+	textSelected+	'\n'+	"-->";
	editor.replaceSelection(textReplacedBy);
  }
  
  // Comment selected JS text
  function JScommentSelected() {
	var textSelected=editor.getSelection(); 
	var textReplacedBy="/*"+	'\n'+	textSelected+	'\n'+	"*/";
	editor.replaceSelection(textReplacedBy);
  }
		
  // Get selected text	
  function getSelectedRange() {	   
	return { from: editor.getCursor(true), to: editor.getCursor(false) };
  }
  
  // Auto-format selected text
  function autoFormatSelection() {
	  var range = getSelectedRange();
	  editor.autoFormatRange(range.from, range.to);
  }
