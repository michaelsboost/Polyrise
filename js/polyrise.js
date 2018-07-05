// Version: 0.0.1
// Polyrise, copyright (c) by Michael Schwartz and others
// Distributed under an MIT license: https://github.com/michaelsboost/Polyrise/blob/gh-pages/LICENSE
// 
// This is Polyrise (https://michaelsboost.github.io/Polyrise/), Free Mobile Website Builder Software

// Define variables
var site         = window.location;
    openInNewTab = function(url) {
      var a = document.createElement("a");
      a.target = "_blank";
      a.href = url;
      a.click();
    };

// Detect if domain is HTTP
site = site.toString();
if (site.substring(0, 7) === "http://") {
  // domain is http
  site = "http%3A//" + site.substring(7, site.length);
} else if (site.substring(0, 8) === "https://") {
  // domain is https
  site = "https%3A//" + site.substring(8, site.length);
} else {
  // cannot detect http encoding revert to Polyrise domain as default
  site = "https%3A//michaelsboost.github.io/Polyrise/";
}

// fadeIn background-overlay
$(".bg-overlay, .bg-overlay2").fadeIn();

// Share This Page
$("[data-shareTo]").on("click", function() {
  var thisAttr = $(this).attr("data-shareTo").toLowerCase();
  
  if (thisAttr === "facebook") {
    openInNewTab("https://www.facebook.com/sharer/sharer.php?u=" + site);
  } else if (thisAttr === "twitter") {
    openInNewTab("https://twitter.com/home?status=" + site);
  } else if (thisAttr === "googleplus") {
    openInNewTab("https://plus.google.com/share?url=" + site);
  } else if (thisAttr === "linkedin") {
    openInNewTab("https://www.linkedin.com/shareArticle?mini=true&url=" + site + "&title=&summary=&source=");
  } else {
    alertify.error("Unable to share, undetected social network");
  }
});