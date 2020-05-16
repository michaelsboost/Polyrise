// Global Variables
var gridCode, faviconcode,
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
    toClose2Left   = false,
    toClose2Right  = false,
    isIcon         = false,
    transparentImg = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    defaultimg     = "data:image/jpeg;base64,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";

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
// check selector link data for buttons
$("[data-editorbar=blink]").on('click', function() {
  if ( $(".selected").is(":visible") ) {
    $('#slink').val($(".selected").attr('href'));
    $('#slinktitle').val($(".selected").attr('title'));
    if (!$(".selected").prop("target")) {
      $('#snewtab').prop('checked', false);
    } else {
      $('#snewtab').prop('checked', true);
    }
    
    $("[data-toggle=links]").trigger('click');
  }
});
// check selector link data for text
$("[data-editorbar=link]").on('click', function() {
  if ( $(".selected").is(":visible") ) {
    var selected = $(".selected").parents('a');
    $('[data-insert=link]').hide();
    
    if (selected.is(":visible")) {
      $('#slink').val(selected.attr('href'));
      $('#slinktitle').val(selected.attr('title'));
      if (!selected.prop("target")) {
        $('#snewtab').prop('checked', false);
      } else {
        $('#snewtab').prop('checked', true);
      }

      $("[data-module=links]").fadeIn();
      return false;
    } else if ($(".selected").prop('tagName').toLowerCase() === "a") {
      var selected = $(".selected");
      
      $('#slink').val(selected.attr('href'));
      $('#slinktitle').val(selected.attr('title'));
      if (!selected.prop("target")) {
        $('#snewtab').prop('checked', false);
      } else {
        $('#snewtab').prop('checked', true);
      }

      $("[data-module=links]").fadeIn();
      return false;
    } else {
      if (!window.getSelection().toString()) {
        $('[data-insert=link]').hide();

        alertify.error('Error: no anchor parent or editable selection');
        return false;
      } else {
        document.execCommand('insertHTML', false, '<a href="javascript:void(0)">'+window.getSelection().toString()+'</a>');
        editableFunctions();
        runBubbleBar();
        return false;
      }
    }
  }
  return false;
});

// change selected elements link data
$('#slink').on('keyup', function() {
  if ( $(".selected").is(":visible") ) {
    if ($(".selected").parents('a').is(":visible")) {
      var selected = $(".selected").parents('a');

      if (!this.value) {
        selected.attr('href', '');
        selected.removeAttr('href');
      } else {
        selected.attr('href', this.value);
      }
    } else if ($(".selected").prop('tagName').toLowerCase() === "a") {
      var selected = $(".selected");

      if (!this.value) {
        selected.attr('href', '');
        selected.removeAttr('href');
      } else {
        selected.attr('href', this.value);
      }
    }
  }
});
$('#snewtab').on('change', function() {
  if ($(".selected").is(":visible")) {
    if ($(".selected").parents('a').is(":visible")) {
      var selected = $(".selected").parents('a');

      if ($(this).is(':checked')) {
        selected.prop("target", "_blank");
      } else {
        selected.prop("target", "");
        selected.removeAttr("target");
      }
    } else if ($(".selected").prop('tagName').toLowerCase() === "a") {
      var selected = $(".selected");

      if ($(this).is(':checked')) {
        selected.prop("target", "_blank");
      } else {
        selected.prop("target", "");
        selected.removeAttr("target");
      }
    }
  }
});
$('#slinktitle').on('keyup', function() {
  if ( $(".selected").is(":visible") ) {
    if ($(".selected").parents('a').is(":visible")) {
      var selected = $(".selected").parents('a');

      if (!this.value) {
        selected.attr('title', '');
        selected.removeAttr('title');
      } else {
        selected.attr('title', this.value);
      }
    } else if ($(".selected").prop('tagName').toLowerCase() === "a") {
      var selected = $(".selected");

      if (!this.value) {
        selected.attr('title', '');
        selected.removeAttr('title');
      } else {
        selected.attr('title', this.value);
      }
    }
  }
});

// change selected elements link data
$('#iconlink').on('keyup', function() {
  if ( $(".selectedicon").is(":visible") ) {
    if ($(".selectedicon").parents('a').is(":visible")) {
      var selected = $(".selectedicon").parents('a');

      if (!this.value) {
        selected.attr('href', 'javascript:void(0)');
      } else {
        selected.attr('href', this.value);
      }
    }
  }
});
$('#iconnewtab').on('change', function() {
  if ($(".selectedicon").is(":visible")) {
    if ($(".selectedicon").parents('a').is(":visible")) {
      var selected = $(".selectedicon").parents('a');

      if ($(this).is(':checked')) {
        selected.prop("target", "_blank");
      } else {
        selected.prop("target", "");
        selected.removeAttr("target");
      }
    }
  }
});
$('#iconlinktitle').on('keyup', function() {
  if ( $(".selectedicon").is(":visible") ) {
    if ($(".selectedicon").parents('a').is(":visible")) {
      var selected = $(".selectedicon").parents('a');

      if (!this.value) {
        selected.attr('title', '');
        selected.removeAttr('title');
      } else {
        selected.attr('title', this.value);
      }
    }
  }
});

// WYSIWYG Bubble Editor
function runBubbleBar() {
  // display bubble editor
  // for buttons
  $('[data-call=canvas] [class^="btn--"], [data-call=canvas] .form--btn').on("click touchstart", function(e) {
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
        if (!window.getSelection().toString()) {
          console.log("no text selected changing selected elements text's color");
          $('.chosentxtcolor').css('color', this.value);
          $('.selected').css('color', this.value);
        } else {
          document.execCommand("ForeColor", false, this.value);
        }
      }
    });
    
    return false;
  });
  $('[data-call=canvas] .fa').not('.ignorebubble').on('click', function() {
    isIcon = true;
    $('[data-action=addicon]').text('Replace Icon').hide();
    $('.currenticon h1 i').attr('class', this.className);
    $('.currenticon').show();
    
    $(this).addClass('selectedicon');
    if ($(".selectedicon").parents('a').is(":visible")) {
      var selected = $(".selectedicon").parents('a');
      
      $('#iconlink').val(selected.attr('href'));
      $('#iconlinktitle').val(selected.attr('title'));
      if (!selected.prop("target")) {
        $('#iconnewtab').prop('checked', false);
      } else {
        $('#iconnewtab').prop('checked', true);
      }
      
      $('.check4link').show();
    } else {
      $('.check4link').hide();
    }
    
    $('[data-module=icons]').fadeIn();
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
  $(".blockmenu, .blockbar").remove();
  $(".canvas > .polyriseblock").prepend('<div class="blockmenu hide"><div class="arrow"></div><div class="ascroll h100p"><div class="fl w100p" style="padding: 5px 0;"><span class="fl">Top</span> <input type="range" class="slider fr toppad" min="0" max="100" step=".1" value="0"></div><div class="fl w100p" style="padding: 5px 0;"><span class="fl">Bottom</span> <input type="range" class="slider fr btmpad" min="0" max="100" step=".1" value="0"></div><div class="fl w100p" style="padding: 5px 0;"><span class="fl">BG Color</span> <input type="hidden" class="slider fr bgcolor" value="rgb(255, 97, 97)"></div><div class="fl w100p hasbgoverlaycolor" style="padding: 5px 0;"><span class="fl">BG Overlay Color</span> <input type="hidden" class="slider fr bgoverlaycolor" value="rgb(255, 97, 97)"></div><div class="fl w100p" style="padding: 5px 0;"><span class="fl">BG Image</span> <a class="pointer fr whitetxt removebgimg"><i class="ignorebubble fa fa-times" style="font-size: 21px; margin-top: 4px;"></i></a> <img class="pointer bgimg" alt="Load Background Image" style="margin-top: 1em;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhLS0gR2VuZXJhdG9yOiBHcmF2aXQuaW8gLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iaXNvbGF0aW9uOmlzb2xhdGUiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGRlZnM+PGNsaXBQYXRoIGlkPSJfY2xpcFBhdGhfa3lybzhKOUhzbjdsYTM3RExXZ3p4SUZpR2JkdGNOMEkiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwUGF0aF9reXJvOEo5SHNuN2xhMzdETFdnenhJRmlHYmR0Y04wSSkiPjxwYXRoIGQ9IiBNIDE5Ni45NzggODIuNDg5IEwgMTczLjUxMSA4Mi40ODkgTCAyNTYgMCBMIDMzOC40ODkgODIuNDg5IEwgMzE0LjM0MyA4Mi40ODkgTCAyNTUuNjYgMjMuODA3IEwgMTk2Ljk3OCA4Mi40ODkgTCAxOTYuOTc4IDgyLjQ4OSBMIDE5Ni45NzggODIuNDg5IEwgMTk2Ljk3OCA4Mi40ODkgWiAgTSAyNDcuNDY3IDU2Ljg4OSBMIDI2NC41MzMgNTYuODg5IEwgMjY0LjUzMyAzMjkuOTU2IEwgMjQ3LjQ2NyAzMjkuOTU2IEwgMjQ3LjQ2NyA1Ni44ODkgTCAyNDcuNDY3IDU2Ljg4OSBMIDI0Ny40NjcgNTYuODg5IEwgMjQ3LjQ2NyA1Ni44ODkgWiAgTSAyMTMuNDA5IDE0Ny45MTEgTCA3My45NTYgMTQ3LjkxMSBMIDczLjk1NiA1MTIgTCA0MzguMDQ0IDUxMiBMIDQzOC4wNDQgMTQ3LjkxMSBMIDI5OC42ODQgMTQ3LjkxMSBMIDI5OC43MDUgMTY0Ljk3OCBMIDQyMC45NzggMTY0Ljk3OCBMIDQyMC45NzggNDk0LjkzMyBMIDkxLjAyMiA0OTQuOTMzIEwgOTEuMDIyIDE2NC45NzggTCAyMTMuNTI5IDE2NC45NzggTCAyMTMuNDA5IDE0Ny45MTEgTCAyMTMuNDA5IDE0Ny45MTEgTCAyMTMuNDA5IDE0Ny45MTEgTCAyMTMuNDA5IDE0Ny45MTEgWiAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0icmdiKDE1MywxNTcsMTYwKSIvPjwvZz48L3N2Zz4="></div></div></div>');
  $(".canvas > .polyriseblock").prepend('<div class="blockbar"><a class="pointer dragblock hint--rounded hint--bounce hint--bottom" aria-label="Move Block" data-drag="block"><i class="fa fa-arrows-v ignorebubble"></i></a><a class="pointer codeblock hint--rounded hint--bounce hint--bottom" aria-label="Code Editor" data-edit="code"><i class="fa fa-code ignorebubble"></i></a><a class="pointer editblock hint--rounded hint--bounce hint--bottom" aria-label="Block Parameteres" data-edit="block"><i class="fa fa-gear ignorebubble"></i></a><a class="pointer delblock hint--rounded hint--bounce hint--bottom-left" aria-label="Remove Block" data-del="block"><i class="fa fa-trash ignorebubble"></i></a></div>');
  
  $(".canvas > .polyriseblock").on("click touchstart mouseover", function(e) {
    $(".canvas > .polyriseblock").removeClass('focusedblock');
    $(this).addClass('focusedblock');
    $(".canvas > .polyriseblock").css('position', '');
    $(".canvas > .polyriseblock").css('background-attachment', '');
    this.style.position = "relative";
    $(this).css('background-attachment', 'local');
    
    if ($(this).hasClass('focusedblock')) {
      $(".canvas > .polyriseblock:not(.focusedblock)").find('.blockbar, .blockmenu').addClass("hide");
      $(this).children().first().removeClass("hide");
    } else {
      $('.blockbar, .blockmenu').addClass("hide");
//      $(this).children().first().next().removeClass("hide");
      $(this).children().first().removeClass("hide");
    }
    
    // detect padding
    if ($('.focusedblock .bg-overlay1, .focusedblock .bg-overlay2, .focusedblock .bg-overlay3').is(":visible")) {
      var str = $('.focusedblock').find('.bg-overlay1, .bg-overlay2, .bg-overlay3').css('padding-top');
    } else {
      var str = $('.focusedblock').css('padding-top');
    }
    $('.toppad').val( str.substr(0, str.length - 2) ).on('change', function() {
      if ($('.focusedblock .bg-overlay1, .focusedblock .bg-overlay2, .focusedblock .bg-overlay3').is(":visible")) {
        $('.focusedblock').find('.bg-overlay1, .bg-overlay2, .bg-overlay3').css('padding-top', this.value + "px");
      } else {
        $('.focusedblock').css('padding-top', this.value + "px");
      }
    });
    if ($('.focusedblock .bg-overlay1, .focusedblock .bg-overlay2, .focusedblock .bg-overlay3').is(":visible")) {
      str = $('.focusedblock').find('.bg-overlay1, .bg-overlay2, .bg-overlay3').css('padding-bottom');
    } else {
      str = $('.focusedblock').css('padding-bottom');
    }
    $('.btmpad').val( str.substr(0, str.length - 2) ).on('change', function() {
      if ($('.focusedblock .bg-overlay1, .focusedblock .bg-overlay2, .focusedblock .bg-overlay3').is(":visible")) {
        $('.focusedblock').find('.bg-overlay1, .bg-overlay2, .bg-overlay3').css('padding-bottom', this.value + "px");
      } else {
        $('.focusedblock').css('padding-bottom', this.value + "px");
      }
    });
    
    // color picker for background-color
    $(".bgcolor").val($('.focusedblock').css('background-color')).minicolors({
      control: "rgb",
      opacity: true,
      position: "bottom right",
      change: function(hex, opacity) {
        var color = tinycolor(hex);
        color.setAlpha(opacity);
        color = color.toRgbString();
        $('.focusedblock').css('background-color', color);
      },
      theme: 'default'
    });
    
    // detect and set the inner box-shadow for color picker
    if ($('.focusedblock').hasClass('bg-overlay3')) {
      str = $('.focusedblock').css('box-shadow');
      str.substr(0, str.length - 25);
      $('.bgoverlaycolor').val( str.substr(0, str.length - 25) ).minicolors({
        control: "rgb",
        opacity: true,
        position: "bottom right",
        change: function(hex, opacity) {
          var color = tinycolor(hex);
          color.setAlpha(opacity);
          color = color.toRgbString();
          $('.focusedblock').css('box-shadow', color + " 0px 0px 0px 1600px inset");
        },
        theme: 'default'
      });

      $('.hasbgoverlaycolor').show();
    } else {
      $('.hasbgoverlaycolor').hide();
    }
    
    // detect and set the background-image
    str = $('.focusedblock').css('background-image');
    if (str.substr(0, 3).toLowerCase() === "url") {
      var bgimgsrc = str.substr(5, str.length - 7);
      $('#parametersbgimageurl').val(bgimgsrc);
      $('#parametersdropbgimg').attr('src', bgimgsrc);
      $('.bgimg').attr('src', bgimgsrc);
    }
    
    // remove background images
    $('.focusedblock .removebgimg').on('click', function() {
      $('.focusedblock').css('background-image', 'none');
      $('.focusedblock .bgimg').attr('src', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhLS0gR2VuZXJhdG9yOiBHcmF2aXQuaW8gLS0+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0iaXNvbGF0aW9uOmlzb2xhdGUiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiI+PGRlZnM+PGNsaXBQYXRoIGlkPSJfY2xpcFBhdGhfa3lybzhKOUhzbjdsYTM3RExXZ3p4SUZpR2JkdGNOMEkiPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwUGF0aF9reXJvOEo5SHNuN2xhMzdETFdnenhJRmlHYmR0Y04wSSkiPjxwYXRoIGQ9IiBNIDE5Ni45NzggODIuNDg5IEwgMTczLjUxMSA4Mi40ODkgTCAyNTYgMCBMIDMzOC40ODkgODIuNDg5IEwgMzE0LjM0MyA4Mi40ODkgTCAyNTUuNjYgMjMuODA3IEwgMTk2Ljk3OCA4Mi40ODkgTCAxOTYuOTc4IDgyLjQ4OSBMIDE5Ni45NzggODIuNDg5IEwgMTk2Ljk3OCA4Mi40ODkgWiAgTSAyNDcuNDY3IDU2Ljg4OSBMIDI2NC41MzMgNTYuODg5IEwgMjY0LjUzMyAzMjkuOTU2IEwgMjQ3LjQ2NyAzMjkuOTU2IEwgMjQ3LjQ2NyA1Ni44ODkgTCAyNDcuNDY3IDU2Ljg4OSBMIDI0Ny40NjcgNTYuODg5IEwgMjQ3LjQ2NyA1Ni44ODkgWiAgTSAyMTMuNDA5IDE0Ny45MTEgTCA3My45NTYgMTQ3LjkxMSBMIDczLjk1NiA1MTIgTCA0MzguMDQ0IDUxMiBMIDQzOC4wNDQgMTQ3LjkxMSBMIDI5OC42ODQgMTQ3LjkxMSBMIDI5OC43MDUgMTY0Ljk3OCBMIDQyMC45NzggMTY0Ljk3OCBMIDQyMC45NzggNDk0LjkzMyBMIDkxLjAyMiA0OTQuOTMzIEwgOTEuMDIyIDE2NC45NzggTCAyMTMuNTI5IDE2NC45NzggTCAyMTMuNDA5IDE0Ny45MTEgTCAyMTMuNDA5IDE0Ny45MTEgTCAyMTMuNDA5IDE0Ny45MTEgTCAyMTMuNDA5IDE0Ny45MTEgWiAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0icmdiKDE1MywxNTcsMTYwKSIvPjwvZz48L3N2Zz4=');
    });
    
    // $("[data-place=parameters]").css("top", $(this).children().first().offset().top + 39);
  }).on("mouseout", function() {
    return false;
  });
  $("[data-edit=code]").click(function() {
    $(".editorbar").hide();
    $(".canvas .blockbar").remove();
    $(".canvas .blockmenu").remove();
    $(".canvas [contentEditable").addClass("editable").removeAttr("contentEditable");
    $(".canvas > .polyriseblock").css('position', '');
    $(".canvas > .polyriseblock").css('background-attachment', '');
    
    codeEditor.setValue('');
    codeEditor.setValue('<!-- DO NOT REMOVE THE POLYRISE CONTAINER OR CLASSES! AS YOUR POLYRISE BLOCK WILL NOT RUN PROPERLY WITHOUT THEM AS THEY\'RE REQUIRED -->\n' + document.querySelector(".focusedblock").outerHTML);

    $(".canvas .editable").attr("contentEditable", true);
    editableFunctions();
    
    $("[data-module=codeeditordialog]").fadeIn();
    
    codeEditor.setCursor(codeEditor.lineCount(), 0);
    return false;
  });
  $("[data-edit=block]").click(function() {
    $(this).parent().next().toggleClass("hide");
    $(".editorbar").hide();
    return false;
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

  $("[data-call=canvas], [data-call=canvas] *").on("click touchstart", function(e) {
    $("[data-content=blocks]").animate({right: -300 + "px"}, 300);
  });
  $("[data-open=blocks]").on("click touchstart", function() {
    $("[data-content=blocks]").animate({right: 0 + "px"}, 300);
    $(".blockmenu, .blockbar").addClass("hide");
  });

  // change image source via drag, drop and click
  $("[data-call=canvas] img").on("dragover", function(e) {
    e.preventDefault();  
    e.stopPropagation();
    
    if ($(this).hasClass('dropimg')) {
      return false;
    } else {
      $(this).addClass('dropimg');
    }
  });
  $("[data-call=canvas] img.dropimg").on("dragleave", function(e) {
    e.preventDefault();  
    e.stopPropagation();
    $('[data-call=canvas] .dropimg').removeClass('dropimg');
  });
  $("[data-call=canvas] img.dropimg").on('drop', function(e) {
    e.preventDefault();  
    e.stopPropagation();
    var files = e.target.files;
    if (!files || files.length === 0)
        files = (e.dataTransfer ? e.dataTransfer.files : e.originalEvent.dataTransfer.files);
    
    if ($(this).hasClass('bgimg')) {
      ParametersBGIMG(files);
    } else {
      Convert2Base64(files);
    }
    $('[data-call=canvas] .dropimg').removeClass('dropimg');
  });
  $("[data-call=canvas] img").on('click', function(e) {
    if ($(this).hasClass('bgimg')) {
      str = $('.focusedblock').css('background-image');
      if (str.substr(0, 3).toLowerCase() === "url") {
        var bgimgsrc = str.substr(5, str.length - 7);
        $('#parametersbgimageurl').val(bgimgsrc).trigger('keyup');
        
        $("[data-module=parametersbgimages]").fadeIn();
      } else {
        $("[data-module=parametersbgimages]").fadeIn();
      }
      return false;
    }
    
    if (this.src === transparentImg) {
      if ($('[data-call=canvas] .dropbgimgsrc').is(":visible")) {
        $('[data-call=canvas] .dropbgimgsrc').removeClass('dropimg dropbgimgsrc');
        $(this).addClass('dropbgimgsrc');
      } else {
        $(this).addClass('dropbgimgsrc');
      }
      
      var selector = $('[data-call=canvas] .dropbgimgsrc').parent();
      var str = selector.css('background-image');
      var currentbg = str.substr(5, str.length - 7);
      $('#bgimageurl').val(currentbg).trigger('keyup');
      $('#bgimgalt').val($('[data-call=canvas] .dropbgimgsrc').attr('alt')).trigger('keyup');
      
      // https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940
      
      $("[data-module=bgimages]").fadeIn();
      return false;
    }

    if ($('[data-call=canvas] .dropimg').is(":visible")) {
      $('[data-call=canvas] .dropimg').removeClass('dropimg');
      $(this).addClass('dropimg');
    } else {
      $(this).addClass('dropimg');
    }

    var selector = $('[data-call=canvas] .dropimg');
    defaultimg = selector.attr('src');
    $('#imageurl').val(selector.attr('src')).trigger('keyup');

    if (selector.parent().prop("tagName").toLowerCase() === "a") {
      $('.checkfora').show();
      var selA = selector.parent();
      $('#hyperlink').val(selA.attr('href'));
      if (!selector.parent().prop("target")) {
        $('#newtab').attr('checked', false);
      } else {
        $('#newtab').attr('checked', true);
      }
      $('#imgalt').val(selector.attr('alt')).trigger('keyup');
      $('#linktitle').val(selA.attr('title')).trigger('keyup');
    } else {
      $('.checkfora').hide();
    }

    $("[data-module=images]").fadeIn();
    return false;
  });
  $("#loadimg").on('change', function(e) {
    var file = e.target.files[0];
    Convert2Base64(file);
  });
  $("#loadbgimg").on('change', function(e) {
    var file = e.target.files[0];
    Convert2Base64BGIMG(file);
  });
  $("#parametersloadbgimg").on('change', function(e) {
    var file = e.target.files[0];
    ParametersBGIMG(file);
  });
  
  // prevent submit forms from refreshing
  $("form").submit(function(e) {
    e.preventDefault();
  });
  
  // remove background images
  $('.focusedblock .removebgimg').on('click', function() {
    $('.focusedblock').css('background-image', 'none');
  });
  
  // required by polyrise design
  $(".bg-overlay, .bg-overlay2").fadeIn();
  
  // initialize WYSIWYG Editor
  runBubbleBar();
  return false;
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
function embedfavIcon(AppImg, size) {
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
    var img = new Image();
    img.src = e.target.result;
    img.onload = function() {
      document.querySelector(".favicon").src = e.target.result;
      embedfavIcon(e.target.result, "16");
      embedfavIcon(e.target.result, "32");
      embedfavIcon(e.target.result, "180");
      embedfavIcon(e.target.result, "192");
      embedfavIcon(e.target.result, "512");
    }
  }
  reader.readAsDataURL(file);
};

// Load new fav icon by triggering loadFavIcon() Func
$("[data-load=favicon]").on("change", function(e) {
  var file = e.target.files[0];
  loadFavIcon(file);
});

// change favicon image via drag and drop
holder.ondragover = function() {
  this.className = "pointer favicon fr hover";
  return false;
}
holder.ondragend  = function() {
  this.className = "pointer favicon fr";
  return false;
}
holder.ondrop     = function(e) {
  this.className = "pointer favicon fr";
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  document.querySelector(".favicon").src = file;
  loadFavIcon(file);
}

// Convert Image to Base84
function Convert2Base64(file) {
  var reader = new FileReader;
  reader.onload = function(e) {
    $("#imageurl").val(e.target.result);
    $('.dropimg').attr('src', e.target.result);
    $('[data-call=canvas] .dropimg').removeClass('dropimg');
    return false;
  };
  reader.readAsDataURL(file);
};
function Convert2Base64BGIMG(file) {
  var reader = new FileReader;
  reader.onload = function(e) {
    $("#bgimageurl").val(e.target.result).trigger('keyup');
    $('#dropbgimgsrc').attr('src', e.target.result);
    return false;
  };
  reader.readAsDataURL(file);
};
function ParametersBGIMG(file) {
  var reader = new FileReader;
  reader.onload = function(e) {
    $("#parametersbgimageurl").val(e.target.result).trigger('keyup');
    return false;
  };
  reader.readAsDataURL(file);
};

// replace image via drag and drop
$(".dropimg, .dropbgimgsrc, #parametersdropbgimg").on("dragover", function(e) {
  e.preventDefault();  
  e.stopPropagation();
});
$(".dropimg, .dropbgimgsrc, #parametersdropbgimg").on("dragleave", function(e) {
  e.preventDefault();  
  e.stopPropagation();
});
$(".dropimg, .dropbgimgsrc").on('drop', function(e) {
  e.preventDefault();  
  e.stopPropagation();
  var files = e.target.files;
  if (!files || files.length === 0)
      files = (e.dataTransfer ? e.dataTransfer.files : e.originalEvent.dataTransfer.files);
  Convert2Base64(files);
});
$("#imageurl").on('keyup', function(e) {
  if (!this.value) {
    $('.dropimg').attr('src', defaultimg);
  } else {
    $('.dropimg').attr('src', this.value);
  }
});

// replace bg image via drag and drop
$("#parametersdropbgimg").on('drop', function(e) {
  e.preventDefault();
  e.stopPropagation();
  var files = e.target.files;
  if (!files || files.length === 0)
      files = (e.dataTransfer ? e.dataTransfer.files : e.originalEvent.dataTransfer.files);
  
  $("#parametersbgimageurl").val(files).trigger('keyup');
});
$("#bgimageurl").on('keyup', function(e) {
  var selector = $('[data-call=canvas] .dropbgimgsrc').parent();
  
  if (!this.value) {
    // set preview
    $('#dropbgimgsrc, #dropbgimg').attr('src', defaultimg);

    // apply to image
    selector.css('background-image', "url(\""+ defaultimg +"\")");
  } else {
    // set preview
    $('#dropbgimgsrc, #dropbgimg').attr('src', this.value);
    
    // apply to image
    selector.css('background-image', "url(\""+ this.value +"\")");
  }
});
$('#bgimgalt').on('keyup', function() {
  var selector = $('[data-call=canvas] .dropbgimgsrc');
  if (selector.is(":visible")) {
    var selA = selector.parent();
    selector.attr('alt', this.value);
    if (!this.value)
      selector.removeAttr("alt");
  }
});
$("#parametersbgimageurl").on('keyup', function(e) {
  if (!this.value) {
    // apply to preview
    $('#parametersdropbgimg').attr('src', defaultimg);
    $('.focusedblock .blockmenu .bgimg').attr('src', defaultimg);
    
    // apply to background
    $('.focusedblock').css('background-image', "url(\""+ defaultimg +"\")");
  } else {
    // apply to preview
    $('#parametersdropbgimg').attr('src', this.value);
    $('.focusedblock .blockmenu .bgimg').attr('src', this.value);
    
    // apply to background
    $('.focusedblock').css('background-image', "url(\""+ this.value +"\")");
  }
});

// change image link data
$('#hyperlink').on('keyup', function() {
  var selector = $('[data-call=canvas] .dropimg');
  if (selector.is(":visible")) {
    if (selector.parent().prop("tagName").toLowerCase() === "a") {
      var selA = selector.parent();
      selA.attr('href', this.value);
      if (!this.value)
        selA.attr('href', 'javascript:void(0)');
    }
  }
});
$('#newtab').on('change', function() {
  var selector = $('[data-call=canvas] .dropimg');
  if (selector.is(":visible")) {
    if (selector.parent().prop("tagName").toLowerCase() === "a") {
      var selA = selector.parent();
      if ($('#newtab').is(":checked")) {
        selA.prop("target", "_blank");
      } else {
        selA.prop("target", "");
        selA.removeAttr("target");
      }
    }
  }
});
$('#imgalt').on('keyup', function() {
  var selector = $('[data-call=canvas] .dropimg');
  if (selector.is(":visible")) {
    var selA = selector.parent();
    selector.attr('alt', this.value);
    if (!this.value)
      selector.removeAttr("alt");
  }
});
$('#linktitle').on('keyup', function() {
  var selector = $('[data-call=canvas] .dropimg');
  if (selector.is(":visible")) {
    if (selector.parent().prop("tagName").toLowerCase() === "a") {
      var selA = selector.parent();
      selA.attr('title', this.value);
      if (!this.value)
        selA.removeAttr("title");
    }
  }
});

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
$("[data-open=blocks]").on("click", function() {
  $(".focusedblock").removeClass("focusedblock");
  $("[data-content=blocks]").animate({right: 0 + "px"}, 300);
  $("[data-editorbar=close]").trigger('click');
});
$("[data-call=styles]").on("click", function() {
  $("#blocktypes").val("styles").trigger("change");
});
$("[data-call=canvas], [data-call=canvas] *").on("click touchstart", function(e) {
  $("[data-content=blocks]").animate({right: -300 + "px"}, 150);
});
$("[data-call=topbar]").on("click touchstart", function(e) {
  $("[data-content=blocks]").animate({right: -300 + "px"}, 300);
});

// Open & Close Modules
$("[data-toggle]").on('click', function() {
  if ($('.selectedicon').is(':visible')) {
    $('.selectedicon').removeClass('selectedicon');
  }
  $("[data-module=" + $(this).attr('data-toggle') +"]").fadeToggle();
  $(".blockbar").addClass("hide");
  return false;
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
    document.execCommand('insertHTML', false, '<i class="'+ $(this).find('i').attr('class') +'"></i>');
    $("[data-module=icons]").fadeOut();
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
      sitetitle.value = '';
      analyticscode.value = '';
      favicon.value = '';
      $('.favicon').attr('src', 'upload.svg');
      localStorage.clear();
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
  $(".focusedblock").removeClass("focusedblock");

  // scroll to newly added block
  $(".canvas").animate({
    scrollTop: $('.canvas').prop("scrollHeight")
  }, "slow");

  editableFunctions();
});
editableFunctions();

// Export Zip File
$("[data-open=donate]").click(function() {
  $(".donatebanner").fadeIn();
});
$("[data-export=publish]").click(function(e) {
  $(".donatebanner").fadeOut();
  
  JSZipUtils.getBinaryContent("../assets/libraries.zip", function(err, data) {
    if(err) {
      throw err // or handle err
    }
    var YourName = sitetitle.value;
    $(".canvas > .polyriseblock").removeClass('focusedblock');
    $(".canvas > .polyriseblock").css('position', '');
    $(".canvas > .polyriseblock").css('background-attachment', '');
    $(".canvas .blockbar").remove();
    $(".canvas .blockmenu").remove();
    $(".canvas [contentEditable").addClass("editable").removeAttr("contentEditable");
    var canvasHTML = $(".canvas").not( $('.blockbar, .blockmenu') ).html();

    var zip = new JSZip(data);
    
    // If no title set title
    if (!sitetitle.value) {
      sitetitle.value = "Made with Polyrise Website Builder";
    }
    
    var str = document.querySelector(".favicon").src;
    if (str.substr(str.length - 10, str.length) === "upload.svg") {
      alertify.error("Error: No favicon detected!");
      faviconcode = '';
    } else {
      faviconcode180 = '\n    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">';
      faviconcode16  = '\n    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">';
      faviconcode32  = '\n    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">';
      faviconcode192 = '\n    <link rel="icon" type="image/png" sizes="192x192" href="favicon-192x192.png">';
      faviconcode512 = '\n    <link rel="icon" type="image/png" sizes="512x512" href="favicon-512x512.png">';
      faviconcode    = faviconcode180 + faviconcode16 + faviconcode32 + faviconcode192 + faviconcode512;
      
      zip.file("apple-touch-icon.png", document.querySelector("[data-faviconsize=f180]").src.split('base64,')[1],{base64: true});
      zip.file("favicon-16x16.png", document.querySelector("[data-faviconsize=f16]").src.split('base64,')[1],{base64: true});
      zip.file("favicon-32x32.png", document.querySelector("[data-faviconsize=f32]").src.split('base64,')[1],{base64: true});
      zip.file("android-chrome-192x192.png", document.querySelector("[data-faviconsize=f192]").src.split('base64,')[1],{base64: true});
      zip.file("android-chrome-512x512.png", document.querySelector("[data-faviconsize=f512]").src.split('base64,')[1],{base64: true});
      zip.file("site.webmanifest", '{\n  "name": "'+ sitetitle.value +'",\n  "short_name": "'+ sitetitle.value +'",\n  "icons": [{\n    "src": "/android-chrome-192x192.png",\n    "sizes": "192x192",\n    "type": "image/png",\n  }, {\n    "src": "/android-chrome-512x512.png",\n    "sizes": "512x512",\n    "type": "image/png",\n  }],\n  "theme_color": "#ffffff",\n  "background_color": "#ffffff",\n  "display": "standalone"\n}');
    }
    
    // If no description set description
    if (!sitedesc.value) {
      sitedesc.value = "This site was created with Polyrise Website Builder. A free and open source website builder!";
    }
    
    // If no website url set url
    if (!siteurl.value) {
      siteurl.value = "https://michaelsboost.github.io/Polyrise";
    } else if (siteurl.value.toLowerCase().substring(0,7) !== "http://" || siteurl.value.toLowerCase().substring(0,8) !== "https://") {
      alertify.error("Error: URL MUST begin with http:// or https://");
      siteurl.value = "https://michaelsboost.github.io/Polyrise";
    } else if (siteurl.value.split(" ")) {
      alertify.error("Error: URL MUST NOT have spaces.<br>Spaces were automatically removed!");
      siteurl.value = siteurl.value.split(" ").join("");
    }
    
    socialMetaData = '\n    <meta property="og:url"         content="'+ siteurl.value +'" />    \n    <meta property="og:type"        content="website" />    \n    <meta property="og:title"       content="'+ sitetitle.value +'" />    \n    <meta property="og:description" content="'+ sitedesc.value +'" />    \n    <meta property="og:image"       content="https://raw.githubusercontent.com/michaelsboost/Polyrise/gh-pages/img/madewithpolyrise.png" />';
    
    zip.file("css/polyrise.css", cssCode.value);
    zip.file("index.html", '<!DOCTYPE html>\n<html>\n  <head>\n    <title>'+sitetitle.value+'</title>\n    <meta charset="UTF-8">\n    <meta http-quiv="X-UA-Compatible" content="IE=9" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <meta name="author" content="Polyrise Website Builder">'+ faviconcode +'\n    <link rel="stylesheet" href="libraries/polyui/polyui.css">\n    <link rel="stylesheet" href="libraries/font-awesome/font-awesome.css">\n    <link rel="stylesheet" href="libraries/lity/lity.css">\n    <link rel="stylesheet" href="libraries/animateCSS/animate.min.css">\n    <link rel="stylesheet" href="css/polyrise.css">'+ socialMetaData +'\n  </head>\n  <body>\n    '+ analyticscode.value +'\n    '+ canvasHTML +'\n    \n    <script src="libraries/jquery/jquery.js"></script>\n    <script src="libraries/lity/lity.js"></script>\n    <script src="js/polyrise.js"></script>\n  </body>\n</html>');
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

// Code editor
// Initialize Editors
var codeEditor = CodeMirror(document.getElementById("codeeditor"), {
  mode: "text/html",
  tabMode: "indent",
  styleActiveLine: true,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  foldGutter: true,
  dragDrop: true,
  lint: true,
  gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  value: '<!-- DO NOT REMOVE THE POLYRISE CONTAINER OR CLASSES! AS YOUR POLYRISE BLOCK WILL NOT RUN PROPERLY WITHOUT THEM AS THEY\'RE REQUIRED -->\n<div class="polyriseblock notgrid bg-image bg-overlay3" style="box-shadow: rgba(204, 212, 243, 0.61) 0px 0px 0px 1600px inset;padding: 4em 0;background-color: #333;">\n  <h1 class="headline-primary--grouped tc">hello world</h1>\n</div>',
  paletteHints: true
});
Inlet(codeEditor);
emmetCodeMirror(codeEditor);
function updatePreview() {
  $(".preview-editor").empty();
  var frame = document.createElement("iframe");
  frame.setAttribute("id", "preview");
  frame.setAttribute("sandbox", "allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts");
  document.querySelector(".preview-editor").appendChild(frame);
  var previewFrame = document.getElementById("preview");
  var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
  preview.open();
  htmlContent = '<!DOCTYPE html>\n<html>\n  <head>\n    <title>'+sitetitle.value+'</title>\n    <meta charset="UTF-8">\n    <meta http-quiv="X-UA-Compatible" content="IE=9" />\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <meta name="author" content="Polyrise Website Builder">\n    <link rel="stylesheet" href="../libraries/polyui/polyui.css">\n    <link rel="stylesheet" href="../libraries/font-awesome/font-awesome.css">\n    <link rel="stylesheet" href="../libraries/lity/lity.css">\n    <link rel="stylesheet" href="../css/polyrise.css"><script src=\"js/screenlog.js\"></script>\n  </head>\n  <body>\n    '+ analyticscode.value +'\n    '+ codeEditor.getValue() +'\n    \n    <script src="../libraries/jquery/jquery.js"></script>\n    <script src="../libraries/lity/lity.js"></script>\n    <script src="../js/polyrise.js"></script>\n  </body>\n</html>';
  preview.write(htmlContent);
  preview.close();
}
updatePreview();
codeEditor.on("change", function() {
  updatePreview();
});

// confirm/add code into editor
$('.confirmeditorcode').click(function() {
  $("[data-call=canvas]").append(codeEditor.getValue());
  $('.canvas').last().find("*").attr('contenteditable', true);
  $(".focusedblock").removeClass("focusedblock");

  // scroll to newly added block
  $(".canvas").animate({
    scrollTop: $('.canvas').prop("scrollHeight")
  }, "slow");

  editableFunctions();
  runBubbleBar();
});

// Focus editor whenever opened
$('[data-toggle=codeeditordialog]').click(function() {
  codeEditor.setCursor(codeEditor.lineCount(), 0);
});

// add a theme block onload for testing
//$("[data-filter=header] .addblock img")[3].click();
//$("[data-filter=header] .addblock img")[9].click();
//$("[data-filter=testimonials] .addblock img")[4].click();
//$("[data-filter=footers] .addblock img")[0].click();
//$("[data-filter=social] .addblock img")[1].click();