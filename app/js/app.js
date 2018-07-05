// Global Variables
var gridCode, 
    holder = document.querySelector(".favicon"),
    grabFileCode = function (url, el) {
      return $.get(url, null, function(data) {
        el.value = data;
      }, "text");
    },
    btnDefaultW  = $(".btneditorbar").width(),
    btnDefaultH  = $(".btneditorbar").height(),
    btnDefaultOH = $(".btneditorbar").outerHeight(),
    defaultW  = $(".headereditorbar").width(),
    defaultW  = $(".headereditorbar").width(),
    defaultH  = $(".headereditorbar").height(),
    defaultOH = $(".headereditorbar").outerHeight(),
    toClose2Left  = false,
    toClose2Right = false,
    isIcon        = false;

// Set Required Polyrise Code as variable to be saved
grabFileCode('../css/polyrise.css', cssCode);
grabFileCode('../js/polyrise.js', jsCode);

// wysiwyg menu actions
$(".editorbar button[data-exec]").on('click', function() {
  document.execCommand($(this).data('exec'), false, null);
  return false;
});
  
// remove selected element
$("[data-notavail]").click(function() {
  alertify.error('Error: no function for this wysiwyg action');
  console.error('Error: no function for this wysiwyg action');
  return false;
});
$("[data-editorbar=delete]").click(function() {
  if ( $(".selected").is(":visible") ) {
    $(".selected").remove();
    $(".editorbar").hide();
  }
});
// duplicate selected element
$("[data-editorbar=add]").click(function() {
  if ( $(".selected").is(":visible") ) {
    $($(".selected").clone()).insertAfter('.selected');
    runBubbleBar();
  }
});
// move element up
$("[data-editorbar=moveup]").click(function() {
  if ( $(".selected").is(":visible") ) {
    $(".selected").prev().addClass('tempclass');
    $($(".selected").clone()).insertBefore('.tempclass');
    $('.selected')[1].remove();
    $('.tempclass').removeClass('tempclass');
    
    if ($('.selected').is(":first-child")) {
      $("[data-editorbar=moveup]").hide();
      $("[data-editorbar=movedown]").show();
    }
    
    runBubbleBar();
  }
});
// move element down
$("[data-editorbar=movedown]").click(function() {
  if ( $(".selected").is(":visible") ) {
    $(".selected").next().addClass('tempclass');
    $($(".selected").clone()).insertAfter('.tempclass');
    $('.selected')[0].remove();
    $('.tempclass').removeClass('tempclass');
    
    if ($('.selected').is(":last-child")) {
      $("[data-editorbar=movedown]").hide();
      $("[data-editorbar=moveup]").show();
    }
    
    runBubbleBar();
  }
});
// move element left
$("[data-editorbar=moveleft]").click(function() {
  if ( $(".selected").is(":visible") ) {
    $(".selected").prev().addClass('tempclass');
    $($(".selected").clone()).insertBefore('.tempclass');
    $('.selected')[1].remove();
    $('.tempclass').removeClass('tempclass');
    
    if ($(".selected").is(":first-child")) {
      $("[data-editorbar=moveleft]").hide();
      $("[data-editorbar=moveright]").show();
    } else if ($(".selected").is(":last-child")) {
      $("[data-editorbar=moveleft]").show();
      $("[data-editorbar=moveright]").hide();
    } else {
      $("[data-editorbar=moveright]").show();
      $("[data-editorbar=moveleft]").show();
    }
    
    runBubbleBar();
  }
});
// move element right
$("[data-editorbar=moveright]").click(function() {
  if ( $(".selected").is(":visible") ) {
    $(".selected").next().addClass('tempclass');
    $($(".selected").clone()).insertAfter('.tempclass');
    $('.selected')[0].remove();
    $('.tempclass').removeClass('tempclass');
    
    if ($(".selected").is(":first-child")) {
      $("[data-editorbar=moveleft]").hide();
      $("[data-editorbar=moveright]").show();
    } else if ($(".selected").is(":last-child")) {
      $("[data-editorbar=moveleft]").show();
      $("[data-editorbar=moveright]").hide();
    } else {
      $("[data-editorbar=moveright]").show();
      $("[data-editorbar=moveleft]").show();
    }
    
    runBubbleBar();
  }
});
// show and align color swatches for buttons
$("[data-editorbar=buttonswatches]").click(function() {
  // first center swatches dropdown
  $('.buttonswatches').css('left', parseInt($('.chosencolor').offset().left + $('.chosencolor').width() * 1.5) + 'px');
  // now display it
  $('.buttonswatches').slideToggle();

  if ( $(".selected").is(":visible") ) {
    $('.buttonswatches').css('left', parseInt($('.chosencolor').offset().left + $('.chosencolor').width() * 1.5) + 'px');
  }
});
$(".buttonswatches button").on('click', function(e) {
  if ( $(".selected").is(":visible") ) {
    var str = this.className;
    var arr = [
      "btn--default",
      "btn--success",
      "btn--error",
      "btn--warning",
      "btn--info",
      "btn--pink",
      "btn--blue",
      "btn--red",
      "btn--yellow",
      "btn--darkbrown",
      "btn--gray",
      "btn--camo",
      "btn--white",
      "btn--white2",
      "btn--black",
      "btn--borderdefault",
      "btn--bordersuccess",
      "btn--bordererror",
      "btn--borderwarning",
      "btn--borderinfo",
      "btn--borderpink",
      "btn--borderblue",
      "btn--borderred",
      "btn--borderyellow",
      "btn--borderdarkbrown",
      "btn--bordergray",
      "btn--bordercamo",
      "btn--borderwhite",
      "btn--borderlightgray",
      "btn--borderblack",
    ];
    var remainderC = document.querySelector('.selected').className;
    
    // remove current style
    $.each(arr, function(i, v){
      $('.selected').removeClass(v);
      remainderC = document.querySelector('.selected').className;
    });
    
    // add new style
    document.querySelector('.selected').className = 'btn--' + str.substr(3, str.length) + " " + remainderC;

    // update swatch color
    $('.chosencolor').css('color', $(e.target).css('color'));

    // style has changed now hide button style swatches
    $('.buttonswatches').slideUp();
  }
});
// toggle rounded corners
$("[data-editorbar=togglecorners]").click(function() {
  if ( $(".selected").is(":visible") ) {
    $(".selected").toggleClass('noroundedcorners');

    // style has changed now hide button style swatches
    $('.buttonswatches').slideUp();
  }
});
// align color picker for txt
$("[data-editorbar=color]").click(function() {
  // first center swatches dropdown
  $('.colorpicker').css('left', parseInt($('.chosentxtcolor').offset().left + $('.chosentxtcolor').width() * 1.5) + 'px');
  // now display it
  $('.colorpicker').slideToggle();

  if ( $(".selected").is(":visible") ) {
    $('.colorpicker').css('left', parseInt($('.chosentxtcolor').offset().left + $('.chosentxtcolor').width() * 1.5) + 'px');
  }
});

// WYSIWYG Bubble Editor
function runBubbleBar() {
  // display bubble editor
  // for buttons
  $('[data-call=canvas] [class^="btn--"]').on("click touchstart", function(e) {
    $(".headereditorbar").hide();
    $(".btneditorbar").show();
    isIcon = false;
    
    // check and see if color picker is visible
    if ( $(".colorpicker").is(":visible") ) {
      $('.colorpicker').slideUp();
    }
    
    // check and see if button swatches are visible
    if ( $(".buttonswatches").is(":visible") ) {
      $('.buttonswatches').slideUp();
    }
    
    // check and see if selected element is visible
    if ( $(".selected").is(":visible") ) {
      $(".selected").removeClass("selected");
    }

    $(e.target).addClass("selected");
    
    if ($(".selected").is(":first-child")) {
      $("[data-editorbar=moveleft]").hide();
      $("[data-editorbar=moveright]").show();
    } else if ($(".selected").is(":last-child")) {
      $("[data-editorbar=moveleft]").show();
      $("[data-editorbar=moveright]").hide();
    } else {
      $("[data-editorbar=moveright]").show();
      $("[data-editorbar=moveleft]").show();
    }
    
    // detect button's background
    var borderStr = $('.selected').css('border-width')
    if (borderStr.substr(0, borderStr.length - 2) === "0") {
      if ($('.chosencolor i').hasClass('fa-circle-o')) {
        $('.chosencolor i').addClass('fa-circle').removeClass('fa-circle-o');
      }
      $('.chosencolor').css('color', $('.selected').css('background-color'));
    } else {
      if ($('.chosencolor i').hasClass('fa-circle')) {
        $('.chosencolor i').addClass('fa-circle-o').removeClass('fa-circle');
      }
      $('.chosencolor').css('color', $('.selected').css('border-color'));
    }
    
    return false;
  });
  // for headers
  $('[data-call=canvas]').find('h1[contenteditable], h2[contenteditable], h3[contenteditable], h4[contenteditable], h5[contenteditable], h6[contenteditable], p[contenteditable]').not('.ignorebubble').on("click touchstart", function(e) {
    $(".headereditorbar").show();
    $(".btneditorbar").hide();
    
    // check and see if color picker is visible
    if ( $(".colorpicker").is(":visible") ) {
      $('.colorpicker').slideUp();
    }
    
    // check and see if button swatches are visible
    if ( $(".buttonswatches").is(":visible") ) {
      $('.buttonswatches').slideUp();
    }
    
    // check and see if selected element is visible
    if ( $(".selected").is(":visible") ) {
      $(".selected").removeClass("selected");
    }

    $(e.target).addClass("selected");
    
    if ($(".selected").is(":first-child")) {
      $("[data-editorbar=moveup]").hide();
      $("[data-editorbar=movedown]").show();
    } else if ($(".selected").is(":last-child")) {
      $("[data-editorbar=moveup]").show();
      $("[data-editorbar=movedown]").hide();
    } else {
      $("[data-editorbar=moveup]").show();
      $("[data-editorbar=movedown]").show();
    }
    
    // detect text's color
    var color = $('.selected').css('color');
    $('.chosentxtcolor').css('color', color);

    // add color picker onload
    $(".colorpicker").empty().append('<div class="arrow"></div><input type="text" class="picker" value="'+ color +'">');
    $(".colorpicker .picker").minicolors({
      format: 'hex',
      inline: true,
      swatches: ['#fff', '#000', '#c488fb', '#3380ff', '#ff3366', '#f7ed4a', '#59524b', '#879a9f', '#b1a374', '#333', '#b072e8', '#339dff', '#e50039', '#d2c609', '#59524b', '#617479', '#8b7d4e', '#52bab3', '#5ece7f', '#e67478', '#ff784f', '#9279c3', '#808080'],
      change: function(value, opacity) {
        $('.chosentxtcolor').css('color', this.value);
        $('.selected').css('color', this.value);
      }
    });
    
    return false;
  });
  $('[data-call=canvas] .fa').on('click', function() {
    isIcon = true;
    $('[data-action=addicon]').text('Replace Icon').hide();
    $('.currenticon h1 i').attr('class', this.className);
    $('.currenticon').show();
    $('[data-module=icons]').fadeIn();
    $(this).addClass('selectedicon');
  });
  
  // hide bubble editor
  $("[data-editorbar=close]").click(function() {
    // check and see if color picker is visible
    if ( $(".colorpicker").is(":visible") ) {
      $('.colorpicker').slideUp();
    }
    
    // check and see if button swatches are visible
    if ( $(".buttonswatches").is(":visible") ) {
      $('.buttonswatches').slideUp();
    }
    
    // check and see if selected element is visible
    if ( $(".selected").is(":visible") ) {
      $(".selected").removeClass("selected");
    }
    
    $(".editorbar").hide();
    $("[data-editorbar=moveup]").show();
    $("[data-editorbar=movedown]").show();
  });
  $('[data-call=canvas] *').not('.editorbar, .editorbar *, [class^="btn--"], h1, h2, h3, h4, h5, h6, p').on('click', function() {
    $("[data-editorbar=close]").trigger('click');
  });
  
  // disable tab key
  $('[contenteditable]').keydown(function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 9) {
      e.preventDefault();
    }
  });

  return false;
}
runBubbleBar();

// Added blocks should be editable
function editableFunctions() {
  $(".blockbar").remove();
  $(".canvas > .polyriseblock.grid").prepend('<div class="blockbar hide"><a class="pointer dragblock hint--rounded hint--bounce hint--bottom" aria-label="Move Block" data-drag="block"><i class="fa fa-arrows-v"></i></a><a class="pointer editblock hint--rounded hint--bounce hint--bottom" aria-label="Block Parameteres" data-edit="block"><i class="fa fa-gear"></i></a><a class="pointer delblock hint--rounded hint--bounce hint--bottom-left" aria-label="Remove Block" data-del="block"><i class="fa fa-trash"></i></a></div>');
  $(".canvas > .polyriseblock.notgrid").prepend('<div class="blockbar hide" style="margin: 0;"><a class="pointer dragblock hint--rounded hint--bounce hint--bottom" aria-label="Move Block" data-drag="block"><i class="fa fa-arrows-v"></i></a><a class="pointer editblock hint--rounded hint--bounce hint--bottom" aria-label="Block Parameteres" data-edit="block"><i class="fa fa-gear"></i></a><a class="pointer delblock hint--rounded hint--bounce hint--bottom-left" aria-label="Remove Block" data-del="block"><i class="fa fa-trash"></i></a></div>');
  // $(".canvas > .grid").prepend('<div class="blockbar hide"><a class="pointer dragblock hint--rounded hint--bounce hint--bottom" aria-label="Move Block" data-drag="block"><i class="fa fa-arrows-v"></i></a><a class="pointer delblock hint--rounded hint--bounce hint--bottom-left" aria-label="Remove Block" data-del="block"><i class="fa fa-trash"></i></a></div>');
  
  $(".canvas > .polyriseblock").on("click touchstart mouseover", function() {
    // $(".blockmenu").addClass("hide");
    $(".blockbar").addClass("hide");
    // $(".blockmenu").removeClass("hide");
    $(this).children().first().removeClass("hide");
    
    $("[data-place=parameters]").css("top", $(this).children().first().offset().top + 47)
    
    return false;
  }).on("mouseout", function() {
    return false;
  });
  $("[data-edit=block]").click(function() {
    alertify.message('Edit block properties here');
    $(".editorbar").hide();
  });
  $("[data-del=block]").click(function() {
    var removeElm = $(this).parent().parent();

    alertify.confirm("Are you sure you wish to proceed?<br><br>This cannot be undone!", function(){
      removeElm.remove();
    },
    function() {
      // User clicked cancel
    }).set('title', "Remove Block?");
    $(".editorbar").hide();
  });
  
  $("[data-call=canvas]").sortable({
    handle: $("[data-drag=block]"),
    placeholder: "sort-placer",
    cursor: "move"
  });

  $("[data-call=canvas], [data-call=canvas] *").on("click touchstart touchmove", function(e) {
    $("[data-content=blocks]").animate({right: -300 + "px"}, 300);
  });
  $("[data-open=blocks]").on("click touchstart", function() {
    $("[data-content=blocks]").animate({right: 0 + "px"}, 300);
    $(".blockbar").addClass("hide");
  });
  
  // required by polyrise design
  $(".bg-overlay, .bg-overlay2").fadeIn();
  
  // initialize WYSIWYG Editor
  runBubbleBar();
}

// AlertifyJS Global Defaults
alertify.defaults = {
  // dialogs defaults
  autoReset:true,
  basic:false,
  closable:true,
  closableByDimmer:true,
  frameless:false,
  maintainFocus:true, // <== global default not per instance, applies to all dialogs
  maximizable:true,
  modal:true,
  movable:true,
  moveBounded:false,
  overflow:true,
  padding: true,
  pinnable:true,
  pinned:true,
  preventBodyShift:false, // <== global default not per instance, applies to all dialogs
  resizable:true,
  startMaximized:false,
  transition:'pulse',

  // notifier defaults
  notifier:{
    // auto-dismiss wait time (in seconds)  
    delay:5,
    // default position
    position:'bottom-left',
    // adds a close button to notifier messages
    closeButton: false
  },

  // language resources 
  glossary:{
    // dialogs default title
    title:'AlertifyJS',
    // ok button text
    ok: 'OK',
    // cancel button text
    cancel: 'Cancel'            
  },

  // theme settings
  theme:{
    // class name attached to prompt dialog input textbox.
    input:'ajs-input',
    // class name attached to ok button
    ok:'ajs-ok',
    // class name attached to cancel button 
    cancel:'ajs-cancel'
  }
};

// Image Container for favicon
var newFaviconContainer = document.createElement("div");
newFaviconContainer.style.display = "none";
newFaviconContainer.setAttribute("data-favicon", "container");
document.body.appendChild(newFaviconContainer);
var faviconContainer = document.querySelector("[data-favicon=container]");

// Loads and Converts Image To Base64
function embedImage(AppImg, size) {
  faviconContainer.innerHTML = '<div data-favicon="holder"></div>';
  
  // Load images
  var favicon_img = new Image();
  favicon_img.crossOrigin = "Anonymous";
  favicon_img.src = AppImg;
  favicon_img.onload = function() {
    var favicon_canvas = document.createElement("canvas");
    favicon_canvas.width = size;
    favicon_canvas.height = size;
    var favicon_ctx = favicon_canvas.getContext("2d");
    favicon_ctx.clearRect(0, 0, size, size);
    favicon_ctx.drawImage(this, 0, 0, size, size);
    var favicon_dataURL = favicon_canvas.toDataURL("image/png");
    var favicon_image = document.createElement("img");
    favicon_image.crossOrigin = "Anonymous";
    favicon_image.setAttribute("data-faviconsize", "f" + size);
    favicon_image.src = favicon_dataURL;

    // Image Container for WebDGap
    faviconContainer.appendChild(favicon_image);
  };
}

function loadFavIcon(file) {
  var reader = new FileReader();

  reader.onload = function(e) {
    document.querySelector(".favicon").src = e.target.result;
    embedImage(e.target.result, "32");
  }
  reader.readAsDataURL(file);
};

// Load new fav icon by triggering loadFavIcon() Func
$("[data-load=favicon]").on("change", function(e) {
  var file = e.target.files[0];
  loadFavIcon(file);
});

// Drag and drop image load
holder.ondragover = function() {
  this.className = "pointer favicon fr hover";
  return false;
}
holder.ondragend = function() {
  this.className = "pointer favicon fr";
  return false;
}
holder.ondrop = function(e) {
  this.className = "pointer favicon fr";
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  loadFavIcon(file);
}

// Style Filter for Content Blocks
$("#blocktypes option").each(function() {
  $(this).text(this.value);
});
$("#blocktypes").resizeselect();
$("#blocktypes").on("change", function() {
  $(".block-container [data-filter]").addClass("hide");
  $(".block-container [data-filter="+ this.value +"]").removeClass("hide");

  if (this.value === "all")
    $(".block-container [data-filter]").removeClass("hide");
    return false
});

// Open & Close Blocks
$(".blockbar").addClass("hide");
$("[data-open=blocks]").on("click touchstart", function() {
  $("[data-content=blocks]").animate({right: 0 + "px"}, 300);
  $("[data-editorbar=close]").trigger('click');
});
$("[data-call=styles]").on("click touchstart", function() {
  $("#blocktypes").val("styles").trigger("change");
});
$("[data-call=canvas], [data-call=canvas] *").on("click touchstart touchmove", function(e) {
  $("[data-content=blocks]").animate({right: -300 + "px"}, 150);
});
$("[data-call=topbar]").on("click touchstart touchmove", function(e) {
  $("[data-content=blocks]").animate({right: -300 + "px"}, 300);
});

// Open & Close Modules
$("[data-toggle]").on('click', function() {
  if ($('.selectedicon').is(':visible')) {
    $('.selectedicon').removeClass('selectedicon');
  }
  $("[data-module=" + $(this).attr('data-toggle') +"]").fadeToggle();
  $(".blockbar").addClass("hide");
});

// Search icons
$("#searchicons").on("keyup", function(e) {
  if (!this.value) {
    $("#icons button").removeClass('hide');
  } else {
    $("#icons button").addClass('hide');
    $("#icons button i span:contains('"+ this.value +"')").parent().parent().removeClass('hide');
  }
});
// Add new icon
$(".iconmodule button").on('click', function() {
  if (isIcon) {
    $('.currenticon h1 i').attr('class', $(this).find('i').attr('class'));
    $('.selectedicon').attr('class', $(this).find('i').attr('class'));
    $("[data-module=icons]").fadeOut();
  } else {
    // document.execCommand('insertHTML');
  }
});

// Drag/Drop/Sort Canvas Blocks
/*
$(".addblock img").draggable({
  start: function() {
    gridCode = $(this).next().val();
    console.log(gridCode)
  },
  helper: function() {
    return $(this).next().clone().appendTo("[data-call=canvas]").css({
      "zIndex": 5
    }).show();
  },
  cursor: "move",
  containment: "document"
});
$("[data-call=canvas]").droppable({
  drop: function(evt, ui) {
    ui.draggable.css({
      top: 0,
      left: 0
    });
    $(this).append(gridCode);
    reloadFunctions();
  }
});
*/

// Add a new block
$(".addblock img").click(function() {
  if ($(this).hasClass("newdoc")) {
    alertify.confirm("Are you sure you wish to proceed?<br><br>This cannot be undone!", function(){
      $("[data-call=canvas]").empty();
    },
    function() {
      // User clicked cancel
    }).set('title', "Start a blank design?");
    return false;
  } else if ($(this).hasClass("comingsoon")) {
    alertify.error("Sorry: This block is not yet available...");
    return false;
  }
  
  $("[data-call=canvas]").append($(this).next().val());
  editableFunctions();
});
editableFunctions();

// Export Zip File
$("[data-open=donate]").click(function() {
  var str = document.querySelector(".favicon").src;
  
  if (str.substr(str.length - 10, str.length) === "upload.svg") {
    alertify.error("Error: No favicon detected!");
    return false;
  }
  
  $(".donatebanner").fadeIn();
});
$("[data-export=publish]").click(function(e) {
  $(".donatebanner").fadeOut();
  
  JSZipUtils.getBinaryContent("../assets/libraries.zip", function(err, data) {
    if(err) {
      throw err // or handle err
    }
    var YourName = sitetitle.value;
    $(".canvas .grid .blockbar").remove();
    $(".canvas .grid .blockmenu").remove();
    $(".canvas [contentEditable").addClass("editable").removeAttr("contentEditable");
    var canvasHTML = $(".canvas:not(.blockbar)").html();

    var zip = new JSZip(data);
    
    zip.file("favicon.png", document.querySelector("[data-faviconsize=f32]").src.split('base64,')[1],{base64: true});
    zip.file("css/polyrise.css", cssCode.value);
    zip.file("index.html", '<!DOCTYPE html>\n<html>\n  <head>\n    <title>'+sitetitle.value+'</title>\n    <meta charset="UTF-8">\n    <meta http-quiv="X-UA-Compatible" content="IE=9" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="apple-touch-icon" href="favicon.png">\n    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">\n    <link rel="stylesheet" href="libraries/polyui/polyui.css">\n    <link rel="stylesheet" href="libraries/font-awesome/font-awesome.css">\n    <link rel="stylesheet" href="libraries/lity/lity.css">\n    <link rel="stylesheet" href="css/polyrise.css">\n  </head>\n  <body>\n    '+ analyticscode.value +'\n    '+ canvasHTML +'\n    \n    <script src="libraries/jquery/jquery.js"></script>\n    <script src="libraries/lity/lity.js"></script>\n    <script src="js/polyrise.js"></script>\n  </body>\n</html>');
    zip.file("js/polyrise.js", jsCode.value);

    // Export application
    var content = zip.generate({type:"blob"});
    saveAs(content, YourName.replace(/ /g, "-").toLowerCase() + ".zip");
    alertify.success("Your website was saved successfully.");
    
    $(".canvas .editable").attr("contentEditable", true);
    editableFunctions();
    return false;
  });
});

// add a theme block onload for testing
$("[data-filter=header] .addblock img")[4].click();