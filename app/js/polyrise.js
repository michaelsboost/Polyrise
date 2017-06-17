// Global Variables
var gridCode;
function editableFunctions() {
  $(".canvas > .grid").prepend('<div class="blockbar hide"><a class="pointer dragblock hint--rounded hint--bounce hint--bottom" aria-label="Move Block" data-drag="block"><i class="fa fa-arrows-v"></i></a><a class="pointer editblock hint--rounded hint--bounce hint--bottom" aria-label="Block Parameteres" data-edit="block"><i class="fa fa-gear"></i></a><a class="pointer delblock hint--rounded hint--bounce hint--bottom-left" aria-label="Remove Block" data-del="block"><i class="fa fa-trash"></i></a></div>');
  // $(".canvas > .grid").prepend('<div class="blockbar hide"><a class="pointer dragblock hint--rounded hint--bounce hint--bottom" aria-label="Move Block" data-drag="block"><i class="fa fa-arrows-v"></i></a><a class="pointer delblock hint--rounded hint--bounce hint--bottom-left" aria-label="Remove Block" data-del="block"><i class="fa fa-trash"></i></a></div>');
  
  $(".canvas > .grid").on("click touchstart mouseover", function() {
    // $(".blockmenu").addClass("hide");
    $(".blockbar").addClass("hide");
    // $(".blockmenu").removeClass("hide");
    $(this).children().first().removeClass("hide");
    
    // $("[data-place=parameters]").css("top", $(this).children().first().offset().top + 47)
    
    return false;
  }).on("mouseout", function() {
    return false;
  });
  $("[data-edit=block]").click(function() {
    alertify.message('coming soon...');
  });
  $("[data-del=block]").click(function() {
    var removeElm = $(this).parent().parent();

    alertify.confirm("Are you sure you wish to proceed?<br><br>This cannot be undone!", function(){
      removeElm.remove();
    },
    function() {
      // User clicked cancel
    }).set('title', "Remove Block?");
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
  $("#blocktypes").val("all").trigger("change");
  $("[data-content=blocks]").animate({right: 0 + "px"}, 300);
});
$("[data-call=styles]").on("click touchstart", function() {
  $("#blocktypes").val("styles").trigger("change");
});
$("[data-call=canvas], [data-call=canvas] *").on("click touchstart touchmove", function(e) {
  $("[data-content=blocks]").animate({right: -300 + "px"}, 300);
});
$("[data-call=topbar]").on("click touchstart touchmove", function(e) {
  if ($(e.target).attr("data-toggle") === "settings") {
    return false;
  }
  
  $("[data-content=blocks]").animate({right: -300 + "px"}, 300);
});

// Open & Close Settings
$("[data-hover=settings]").hover(function() {
  $("[data-toggle=settings]").fadeIn();
});
$("[data-open=settings]").click(function() {
  $("[data-toggle=settings]").fadeToggle();
  $(".blockbar").addClass("hide");
});
$("[data-open=publish]").click(function() {
  $("[data-toggle=publish]").fadeToggle();
  $(".blockbar").addClass("hide");
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

$(".addblock img").click(function() {
  $("[data-call=canvas]").append($(this).next().val());
  editableFunctions();
});
editableFunctions();

// Export Zip File
$("[data-export=publish]").click(function() {
  if (locally.checked) {
    JSZipUtils.getBinaryContent("../assets/libraries.zip", function(err, data) {
      if(err) {
        throw err // or handle err
      }
      var YourName = sitetitle.value;
      $(".canvas .grid .blockbar").remove();
      $(".canvas .grid .blockmenu").remove();
      $(".canvas [contentEditable").addClass("editable").removeAttr("contentEditable");
      var canvasHTML = $(".canvas").html();
      $(".canvas .editable").attr("contentEditable", true);
      editableFunctions();

      var zip = new JSZip(data);

      zip.file("css/polyrise.css", "");
      zip.file("index.html", '<!DOCTYPE html>\n<html>\n  <head>\n    <title>'+sitetitle.value+'</title>\n    <meta charset="UTF-8">\n    <meta http-quiv="X-UA-Compatible" content="IE=9" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n   <meta name="viewport" content="width=device-width, initial-scale=1">\n    <link rel="apple-touch-icon"href="favicon.png">\n    <link rel="shortcut icon" href="favicon.png" type="image/x-icon">\n   <link rel="stylesheet" href="libraries/polyui/polyui.css">\n   <link rel="stylesheet" href="css/polyrise.css">\n  </head>\n  <body>\n    '+ analyticscode.value +'\n    '+ canvasHTML +'\n    \n    <script src="libraries/jquery/jquery.js"></script>\n    <script src="js/polyrise.js"></script>\n  </body>\n</html>');
      zip.file("js/polyrise.js", "");

      // Export application
      var content = zip.generate({type:"blob"});
      saveAs(content, YourName.replace(/ /g, "-").toLowerCase() + ".zip");
      endExportMSG();
      return false;
    });
  } else if (githubpages.checked) {
    alertify.message("coming soon...");
  }
});