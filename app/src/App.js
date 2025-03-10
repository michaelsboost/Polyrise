// Function for reactive state management
function createProxy(target, callback, path = '') {
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  return new Proxy(target, {
    get(obj, prop) {
      const fullPath = path ? `${path}.${String(prop)}` : String(prop);
      const value = obj[prop];
      return createProxy(value, callback, fullPath);
    },

    set(obj, prop, value) {
      const fullPath = path ? `${path}.${String(prop)}` : String(prop);
      const oldValue = obj[prop];

      // Handle object comparison
      if (typeof value === 'object' && value !== null) {
        if (JSON.stringify(oldValue) !== JSON.stringify(value)) {
          obj[prop] = createProxy(value, callback, fullPath);
          callback(fullPath, oldValue, value);
        }
      } else {
        // Handle primitive value comparison
        if (oldValue !== value) {
          obj[prop] = value;
          callback(fullPath, oldValue, value);
        }
      }

      return true;
    },

    deleteProperty(obj, prop) {
      const fullPath = path ? `${path}.${String(prop)}` : String(prop);
      const oldValue = obj[prop];
      delete obj[prop];
      callback(fullPath, oldValue, undefined);
      return true;
    }
  });
}

// Keep project and data in the global scope
let app = {
  name: 'Polyrise',
  summary: "Free Mobile Website Builder!",
  description: "Design with Freedom, Build with Power. Free for personal and commercial use.",
  author: {
    name: 'Michael Schwartz',
    href: 'https://michaelsboost.com/',
    src: 'imgs/author.jpg'
  },
  version: '1.0.4',
  url: 'https://github.com/michaelsboost/Polyrise/',
  license: 'https://github.com/michaelsboost/Polyrise/blob/gh-pages/LICENSE'
}
let p = {
  name: "App name",
  version: "0.0.1",
  title: "An attractive title",
  description: "The most attractive description ever!",
  author: "Polyrise",
  url: "https://michaelsboost.com/",
  meta: "",
  libraries: [],
  css: {
    "rootVariables": {},
    "styles": {},
    "animations": {},
    "breakpoints": {}
  },
  components: [],
  html: [],
  logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iNTEyIgogICBoZWlnaHQ9IjUxMiIKICAgdmlld0JveD0iMCAwIDEzNS40NjY2NiAxMzUuNDY2NjciCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzEiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMKICAgICBpZD0iZGVmczEiIC8+PGcKICAgICBpZD0iZzI0Ij48cGF0aAogICAgICAgaWQ9InBhdGgyMiIKICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtmaWxsOiMxMzNhZDQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjk2LjE3NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQiCiAgICAgICBkPSJNIDkuNTgyODc3NSw2Ny43MzMzMzIgViAxMzUuMjAwNTMgTCAyNS4zODc1OTcsMTI2LjAzMTA3IFYgMTA2Ljk2MDQgNjcuNzMzMzMyIFogbSA4NS45Njg5MTE1LDAgLTU3Ljc2OTA4MywzMi4yOTcyNTggdiAxOC44MTA3MyBMIDEyNS44ODIyNCw2Ny43MzMzMzIgWiIgLz48cGF0aAogICAgICAgc3R5bGU9ImRpc3BsYXk6aW5saW5lO2ZpbGw6IzA0YTJmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MTQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kIgogICAgICAgaWQ9InBhdGgyMyIKICAgICAgIGQ9Im0gNDkuNTY4NTI3LDM1LjgxOTU1MyAtMTYuOTcwNDc4LDkuNzk3OTEgMCwtMTkuNTk1ODIgeiIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDIuMjE3MjY1MiwwLDAsMi4xNDcwMjkzLC0zNC40OTUyNjksLTkuMjYyMTYyKSIgLz48cGF0aAogICAgICAgaWQ9InBhdGgyNCIKICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtmaWxsOiM4NjAwZWY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjk2LjE3NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQiCiAgICAgICBkPSJNIDkuNTgyODc3NSwwLjI2NjEzMzYyIFYgNjcuNzMzMzMyIEggMjUuMzg3NTk3IFYgNDIuODU2ODE1IDI4LjMyNjk1MyBsIDcwLjMyNTkzOSwzOS4zMTU5NDYgLTAuMTYxNzQ3LDAuMDkwNDMgaCAzMC4zMzA0NTEgbCAwLjAwMiwtMC4wMDEgeiIgLz48L2c+PC9zdmc+Cg==",
  lang: "en",
  dark: true,
  previewDark: true,
  pwa: false,
  activePanel: 'layers'
};
window.generateId = () => {
  let id = '';
  while (!/^[a-zA-Z]/.test(id)) {
    id = Math.random().toString(36).substr(2, 9);
  }
  return id;
}
let d = {
  doNotRender: null,
  shiftKey: null,
  cmdKey: null,
  iframeSize: null,
  commandPalette: false,
  selectedSize: 'none',
  selectedLayerIds: [],
  replaceCurrentSelection: null,
  settings: null,
  searchLibKey: null,
  idMap: null,
  clipboard: null,
  history: [],
  historyIndex: -1,
  componentsVisible: true,
  canvasCollapsed: null,
  rootVarsCollapsed: null,
  stylesCollapsed: null,
  stylePropsCollapsed: null,
  stylePseudosCollapsed: null,
  pseudosSelectorIndex: 0,
  breakpointKey: null,
  pseudosSelector: null,
  propsCollapsed: null,
  stylesPropTarget: "base",
  stylesTarget: null,
  animationTarget: null,
  animationKeyframe: null,
  canUseQuickCommands: null,
  cssQuickCommands: {},
  increment: 1,
  chosenFramework: '',
  frameworks: {
    'alpine.js': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"
      ],
      meta: ''
    },
    'algolia.js': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/algoliasearch@4.17.0/dist/algoliasearch.umd.js"
      ],
      meta: ''
    },
    'animate.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      ],
      meta: ''
    },
    'anime js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"
      ],
      meta: ''
    },
    'aos': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css",
        "https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"
      ],
      meta: ''
    },
    'apex charts js': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/apexcharts@3.40.0/dist/apexcharts.min.css",
        "https://cdn.jsdelivr.net/npm/apexcharts@3.40.0/dist/apexcharts.min.js"
      ],
      meta: ''
    },
    'barba.js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/barba.js/2.9.7/barba.min.js"
      ],
      meta: ''
    },
    'bootstrap 5': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"
      ],
      meta: ''
    },
    'bulm css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css",
        "https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/css/bulma-extensions.min.css",
        "https://cdn.jsdelivr.net/npm/bulma-extensions@6.2.7/js/bulma-extensions.min.js"
      ],
      meta: ''
    },
    'chakra-ui': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/@chakra-ui/react@2.0.0/dist/chakra-ui.min.css"
      ],
      meta: ''
    },
    'chart js': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/chart.js"
      ],
      meta: ''
    },
    'chartist': {
      libraries: [
        "https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css",
        "https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"
      ],
      meta: ''
    },
    'd3': {
      libraries: [
        "https://d3js.org/d3.v7.min.js"
      ],
      meta: ''
    },
    'echarts': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/echarts/5.3.3/echarts.min.js"
      ],
      meta: ''
    },
    'file-saver': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"
      ],
      meta: ''
    },
    'foundation': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.3/css/foundation.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.3/js/foundation.min.js"
      ],
      meta: ''
    },
    'fullpage.js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/4.0.11/fullpage.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/4.0.11/fullpage.min.js"
      ],
      meta: ''
    },
    'granim': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/granim/2.0.0/granim.min.js"
      ],
      meta: ''
    },
    'google charts': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/google-charts@2.0.0/dist/googleCharts.min.js"
      ],
      meta: ''
    },
    'gsap': {
      libraries: [
        "https://unpkg.com/gsap@3/dist/gsap.min.js"
      ],
      meta: ''
    },
    'half moon': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/Halfmoon/1.0.4/css/halfmoon.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/Halfmoon/1.0.4/js/halfmoon.min.js"
      ],
      meta: ''
    },
    'hint css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/hint.css/3.0.0/hint.min.css"
      ],
      meta: ''
    },
    'jszip': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
      ],
      meta: ''
    },
    'leaflet': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"
      ],
      meta: ''
    },
    'locomotive-scroll': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/locomotive-scroll/4.1.4/locomotive-scroll.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/locomotive-scroll/4.1.4/locomotive-scroll.min.js"
      ],
      meta: ''
    },
    'lodash': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
      ],
      meta: ''
    },
    'masonry js': {
      libraries: [
        "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"
      ],
      meta: ''
    },
    'materialize': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
      ],
      meta: ''
    },
    'milligram css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.min.css"
      ],
      meta: ''
    },
    'moment js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"
      ],
      meta: ''
    },
    'pattern css': {
      libraries: [
        "https://unpkg.com/pattern.css@1.0.0/dist/pattern.min.css"
      ],
      meta: ''
    },
    'pico.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/picocss/2.0.6/pico.min.css",
        "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
      ],
      meta: ''
    },
    'primer css': {
      libraries: [
        "https://unpkg.com/@primer/css@^20.2.4/dist/primer.css"
      ],
      meta: ''
    },
    'popper js': {
      libraries: [
        "https://unpkg.com/@popperjs/core@2.11.7/dist/umd/popper.min.js"
      ],
      meta: ''
    },
    'pure.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/pure/2.0.6/pure-min.css"
      ],
      meta: ''
    },
    'raisin css': {
      libraries: [
        "https://cdn.jsdelivr.net/gh/tretapey/raisincss@1.1.1/raisin.min.css"
      ],
      meta: ''
    },
    'raphael js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/raphael/2.3.0/raphael.min.js"
      ],
      meta: ''
    },
    'semantic ui': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.2/semantic.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.2/semantic.min.js"
      ],
      meta: ''
    },
    'skeleton css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css"
      ],
      meta: ''
    },
    'spectre.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.9/spectre.min.css"
      ],
      meta: ''
    },
    'stimulus': {
      libraries: [
        "https://cdn.jsdelivr.net/npm/@hotwired/stimulus@3.1.0/dist/stimulus.umd.js",
        "https://cdn.jsdelivr.net/npm/@hotwired/stimulus-loading@1.0.0/dist/stimulus-loading.umd.js"
      ],
      meta: ''
    },
    'swiper': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/9.1.2/swiper-bundle.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/9.1.2/swiper-bundle.min.js"
      ],
      meta: ''
    },
    'tachyons': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.12.0/tachyons.min.css"
      ],
      meta: ''
    },
    'tailwind css': {
      libraries: [
        "https://michaelsboost.com/TailwindCSSMod/tailwind-mod-noreset.min.js"
      ],
      meta: ''
    },
    'three.js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r148/three.min.js"
      ],
      meta: ''
    },
    'tippy js': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/tippy.js/6.3.7/tippy-bundle.umd.min.js"
      ],
      meta: ''
    },
    'uikit': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.17.2/css/uikit.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.17.2/js/uikit.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.17.2/js/uikit-icons.min.js"
      ],
      meta: ''
    },
    'vivus': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/vivus/0.4.6/vivus.min.js"
      ],
      meta: ''
    },
    'water.css': {
      libraries: [
        "https://cdnjs.cloudflare.com/ajax/libs/water.css/2.1.1/water.min.css"
      ],
      meta: ''
    }
  },
  defaultValues: {
    "animation": "none",
    "animation-delay": "0s",
    "animation-duration": "0s",
    "aspect-ratio": "auto",
    "background": "#000000",
    "background-color": "#000000",
    "border-width": "0px",
    "bottom": "auto",
    "clip": "auto",
    "color": "#000000",
    "column-count": "auto",
    "column-width": "auto",
    "columns": "auto",
    "default": "", // A generic default value for other cases
    "flex": "0 1 auto",
    "flex-grow": "0",
    "flex-shrink": "1",
    "font-size": "16px",
    "font-size-adjust": "none",
    "font-stretch": "normal",
    "font-weight": "400",
    "grid-column": "auto",
    "grid-row": "auto",
    "height": "auto",
    "left": "auto",
    "letter-spacing": "normal",
    "line-height": "normal",
    "margin": "0px",
    "max-height": "none",
    "max-lines": "none",
    "max-width": "none",
    "min-height": "0px",
    "min-width": "0px",
    "object-fit": "contain",
    "object-position": "center",
    "opacity": "1",
    "order": "0",
    "overflow": "visible",
    "padding": "0px",
    "perspective": "none",
    "right": "auto",
    "rotate": "0deg",
    "scale": "1",
    "skew": "0deg",
    "text-align": "left",
    "text-decoration": "none",
    "text-indent": "0px",
    "text-transform": "none",
    "top": "auto",
    "transform": "none",
    "transition": "all 0.3s ease",
    "transition-delay": "0s",
    "transition-duration": "0.3s",
    "translate": "0px",
    "visibility": "visible",
    "white-space": "normal",
    "width": "auto",
    "z-index": "1",
  
    // Fixed value properties
    "position": "static",
    "display": "block",
    "overflow": "visible",
    "visibility": "visible",
    "float": "none",
    "clear": "none",
    "white-space": "normal",
    "flex-direction": "row",
    "justify-content": "flex-start",
    "align-items": "stretch",
    "align-content": "stretch",
    "flex-wrap": "nowrap",
    "background-attachment": "scroll",
    "background-clip": "border-box",
    "background-repeat": "repeat",
    "background-size": "auto",
    "border-style": "none",
    "border-width": "medium",
    "border-collapse": "separate",
    "caption-side": "top",
    "cursor": "auto",
    "direction": "ltr",
    "empty-cells": "show",
    "list-style-type": "disc",
    "list-style-position": "outside",
    "table-layout": "auto",
    "text-align": "left",
    "text-decoration-line": "none",
    "text-decoration-style": "solid",
    "text-transform": "none",
    "unicode-bidi": "normal",
    "vertical-align": "baseline",
    "word-break": "normal",
    "writing-mode": "horizontal-tb",
    "align-self": "auto",
    "align-tracks": "normal",
    "appearance": "auto",
    "backface-visibility": "visible",
    "box-sizing": "content-box",
    "column-fill": "balance",
    "column-span": "none",
    "flex-basis": "auto",
    "flex-grow": "0",
    "flex-shrink": "1",
    "font-style": "normal",
    "font-variant": "normal",
    "font-weight": "normal",
    "hyphens": "none",
    "image-rendering": "auto",
    "isolation": "auto",
    "line-break": "auto",
    "mask-type": "luminance",
    "mix-blend-mode": "normal",
    "object-fit": "contain",
    "overflow-anchor": "auto",
    "overscroll-behavior": "auto",
    "page-break-after": "auto",
    "page-break-before": "auto",
    "page-break-inside": "auto",
    "pointer-events": "auto",
    "resize": "none",
    "scroll-behavior": "auto",
    "text-orientation": "mixed",
    "text-overflow": "clip",
    "touch-action": "auto",
    "transform-style": "flat",
    "user-select": "auto",
    "word-wrap": "normal",
  },  
  cssFixedValueProperties: {
    "position": ["static", "relative", "absolute", "fixed", "sticky", "inherit", "initial", "revert", "revert-layer", "unset"],
    "display": ["block", "inline", "inline-block", "flex", "grid", "inline-flex", "inline-grid", "none", "inherit", "initial", "revert", "revert-layer", "unset"],
    "overflow": ["visible", "hidden", "clip", "scroll", "auto", "inherit", "initial", "revert", "revert-layer", "unset"],
    "visibility": ["visible", "hidden", "collapse", "inherit", "initial", "revert", "revert-layer", "unset"],
    "float": ["left", "right", "none", "inline-start", "inline-end", "inherit", "initial", "revert", "revert-layer", "unset"],
    "clear": ["none", "left", "right", "both", "inline-start", "inline-end", "inherit", "initial", "revert", "revert-layer", "unset"],
    "white-space": ["normal", "nowrap", "pre", "pre-wrap", "pre-line", "break-spaces", "inherit", "initial", "revert", "revert-layer", "unset"],
    "flex-direction": ["row", "row-reverse", "column", "column-reverse", "inherit", "initial", "revert", "revert-layer", "unset"],
    "justify-content": ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "start", "end", "left", "right", "inherit", "initial", "revert", "revert-layer", "unset"],
    "align-items": ["stretch", "flex-start", "flex-end", "center", "baseline", "first baseline", "last baseline", "start", "end", "self-start", "self-end", "inherit", "initial", "revert", "revert-layer", "unset"],
    "align-content": ["stretch", "flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly", "start", "end", "baseline", "first baseline", "last baseline", "inherit", "initial", "revert", "revert-layer", "unset"],
    "flex-wrap": ["nowrap", "wrap", "wrap-reverse", "inherit", "initial", "revert", "revert-layer", "unset"],
    "background-attachment": ["scroll", "fixed", "local", "inherit", "initial", "revert", "revert-layer", "unset"],
    "background-clip": ["border-box", "padding-box", "content-box", "text", "inherit", "initial", "revert", "revert-layer", "unset"],
    "background-repeat": ["repeat", "repeat-x", "repeat-y", "no-repeat", "space", "round", "inherit", "initial", "revert", "revert-layer", "unset"],
    "background-size": ["auto", "cover", "contain", "inherit", "initial", "revert", "revert-layer", "unset"],
    "border-style": ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "inherit", "initial", "revert", "revert-layer", "unset"],
    "border-width": ["thin", "medium", "thick", "inherit", "initial", "revert", "revert-layer", "unset"],
    "border-collapse": ["collapse", "separate", "inherit", "initial", "revert", "revert-layer", "unset"],
    "caption-side": ["top", "bottom", "block-start", "block-end", "inline-start", "inline-end", "inherit", "initial", "revert", "revert-layer", "unset"],
    "cursor": ["auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", "inherit", "initial", "revert", "revert-layer", "unset"],
    "direction": ["ltr", "rtl", "inherit", "initial", "revert", "revert-layer", "unset"],
    "empty-cells": ["show", "hide", "inherit", "initial", "revert", "revert-layer", "unset"],
    "list-style-type": ["disc", "circle", "square", "decimal", "decimal-leading-zero", "lower-roman", "upper-roman", "lower-greek", "lower-alpha", "lower-latin", "upper-alpha", "upper-latin", "armenian", "georgian", "inherit", "initial", "revert", "revert-layer", "unset"],
    "list-style-position": ["inside", "outside", "inherit", "initial", "revert", "revert-layer", "unset"],
    "table-layout": ["auto", "fixed", "inherit", "initial", "revert", "revert-layer", "unset"],
    "text-align": ["center", "end", "justify", "left", "right", "start", "inherit", "initial", "revert", "revert-layer", "unset"],
    "text-decoration-line": ["none", "underline", "overline", "line-through", "blink", "inherit", "initial", "revert", "revert-layer", "unset"],
    "text-decoration-style": ["solid", "double", "dotted", "dashed", "wavy", "inherit", "initial", "revert", "revert-layer", "unset"],
    "text-transform": ["none", "capitalize", "uppercase", "lowercase", "full-width", "full-size-kana", "inherit", "initial", "revert", "revert-layer", "unset"],
    "unicode-bidi": ["normal", "embed", "bidi-override", "isolate", "isolate-override", "plaintext", "inherit", "initial", "revert", "revert-layer", "unset"],
    "vertical-align": ["baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom", "inherit", "initial", "revert", "revert-layer", "unset"],
    "word-break": ["normal", "break-all", "keep-all", "break-word", "inherit", "initial", "revert", "revert-layer", "unset"],
    "writing-mode": ["horizontal-tb", "vertical-rl", "vertical-lr", "sideways-rl", "sideways-lr", "inherit", "initial", "revert", "revert-layer", "unset"],
    "align-self": ["auto", "stretch", "flex-start", "flex-end", "center", "baseline", "first baseline", "last baseline", "start", "end", "self-start", "self-end", "inherit", "initial", "revert", "revert-layer", "unset"],
    "align-tracks": ["normal", "start", "center", "end", "stretch", "baseline", "first baseline", "last baseline", "inherit", "initial", "revert", "revert-layer", "unset"],
    "appearance": ["none", "auto", "inherit", "initial", "revert", "revert-layer", "unset"],
    "backface-visibility": ["visible", "hidden", "inherit", "initial", "revert", "revert-layer", "unset"],
    "box-sizing": ["content-box", "border-box", "inherit", "initial", "revert", "revert-layer", "unset"],
    "column-fill": ["auto", "balance", "balance-all", "inherit", "initial", "revert", "revert-layer", "unset"],
    "column-span": ["none", "all", "inherit", "initial", "revert", "revert-layer", "unset"],
    "flex-basis": ["auto", "fill", "max-content", "min-content", "fit-content", "content", "inherit", "initial", "revert", "revert-layer", "unset"],
    "flex-grow": ["inherit", "initial", "revert", "revert-layer", "unset"],
    "flex-shrink": ["inherit", "initial", "revert", "revert-layer", "unset"],
    "font-style": ["normal", "italic", "oblique", "inherit", "initial", "revert", "revert-layer", "unset"],
    "font-variant": ["normal", "small-caps", "inherit", "initial", "revert", "revert-layer", "unset"],
    "font-weight": ["normal", "bold", "bolder", "lighter","inherit", "initial", "revert", "revert-layer", "unset", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
    "hyphens": ["none", "manual", "auto", "inherit", "initial", "revert", "revert-layer", "unset"],
    "image-rendering": ["auto", "crisp-edges", "pixelated", "inherit", "initial", "revert", "revert-layer", "unset"],
    "isolation": ["auto", "isolate", "inherit", "initial", "revert", "revert-layer", "unset"],
    "line-break": ["auto", "loose", "normal", "strict", "anywhere", "inherit", "initial", "revert", "revert-layer", "unset"],
    "mask-type": ["luminance", "alpha", "inherit", "initial", "revert", "revert-layer", "unset"],
    "mix-blend-mode": ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "inherit", "initial", "revert", "revert-layer", "unset"],
    "object-fit": ["fill", "contain", "cover", "none", "scale-down", "inherit", "initial", "revert", "revert-layer", "unset"],
    "overflow-anchor": ["auto", "none", "inherit", "initial", "revert", "revert-layer", "unset"],
    "overscroll-behavior": ["auto", "contain", "none", "inherit", "initial", "revert", "revert-layer", "unset"],
    "page-break-after": ["auto", "always", "avoid", "left", "right", "inherit", "initial", "revert", "revert-layer", "unset"],
    "page-break-before": ["auto", "always", "avoid", "left", "right", "inherit", "initial", "revert", "revert-layer", "unset"],
    "page-break-inside": ["auto", "avoid", "inherit", "initial", "revert", "revert-layer", "unset"],
    "pointer-events": ["auto", "none", "inherit", "initial", "revert", "revert-layer", "unset"],
    "resize": ["none", "both", "horizontal", "vertical", "block", "inline", "inherit", "initial", "revert", "revert-layer", "unset"],
    "scroll-behavior": ["auto", "smooth", "inherit", "initial", "revert", "revert-layer", "unset"],
    "text-orientation": ["mixed", "upright", "sideways", "inherit", "initial", "revert", "revert-layer", "unset"],
    "text-overflow": ["clip", "ellipsis", "inherit", "initial", "revert", "revert-layer", "unset"],
    "touch-action": ["auto", "none", "pan-x", "pan-left", "pan-right", "pan-y", "pan-up", "pan-down", "pinch-zoom", "manipulation", "inherit", "initial", "revert", "revert-layer", "unset"],
    "transform-style": ["flat", "preserve-3d", "inherit", "initial", "revert", "revert-layer", "unset"],
    "user-select": ["auto", "text", "none", "contain", "all", "inherit", "initial", "revert", "revert-layer", "unset"],
    "word-wrap": ["normal", "break-word", "inherit", "initial", "revert", "revert-layer", "unset"],
    "writing-mode": ["horizontal-tb", "vertical-rl", "vertical-lr", "sideways-rl", "sideways-lr", "inherit", "initial", "revert", "revert-layer", "unset"]
  },
  cssRangedValueProperties: {
    "opacity": { min: 0, max: 1, step: 0.01 },
    "z-index": { min: -Infinity, max: Infinity, step: 1 },
    "line-height": { min: 0, max: Infinity, step: 0.1 },
    "flex-grow": { min: 0, max: Infinity, step: 0.1 },
    "flex-shrink": { min: 0, max: Infinity, step: 0.1 },
    "order": { min: -Infinity, max: Infinity, step: 1 },
    "columns": { min: 1, max: Infinity, step: 1 },
    "column-count": { min: 1, max: Infinity, step: 1 },
    "column-width": { min: 0, max: Infinity, step: 1 },
    "font-size": { min: 0, max: 1, step: 0.01 },
    "font-size-adjust": { min: 0, max: 1, step: 0.01 },
    "letter-spacing": { min: -Infinity, max: Infinity, step: 0.1 },
    "word-spacing": { min: -Infinity, max: Infinity, step: 0.1 },
    "aspect-ratio": { min: 0, max: Infinity, step: 0.01 },
    "border-width": { min: 0, max: Infinity, step: 1 },
    "margin": { min: -Infinity, max: Infinity, step: 1 },
    "padding": { min: 0, max: Infinity, step: 1 },
    "width": { min: 0, max: Infinity, step: 1 },
    "height": { min: 0, max: Infinity, step: 1 },
    "max-width": { min: 0, max: Infinity, step: 1 },
    "max-height": { min: 0, max: Infinity, step: 1 },
    "min-width": { min: 0, max: Infinity, step: 1 },
    "min-height": { min: 0, max: Infinity, step: 1 },
    "top": { min: -Infinity, max: Infinity, step: 1 },
    "right": { min: -Infinity, max: Infinity, step: 1 },
    "bottom": { min: -Infinity, max: Infinity, step: 1 },
    "left": { min: -Infinity, max: Infinity, step: 1 },
    "rotate": { min: -360, max: 360, step: 1 },
    "scale": { min: -Infinity, max: Infinity, step: 0.1 },
    "translate": { min: -Infinity, max: Infinity, step: 1 },
    "perspective": { min: 0, max: Infinity, step: 1 },
    "skew": { min: -360, max: 360, step: 1 },
    "animation-duration": { min: 0, max: Infinity, step: 0.1 },
    "animation-delay": { min: 0, max: Infinity, step: 0.1 },
    "transition-duration": { min: 0, max: Infinity, step: 0.1 },
    "transition-delay": { min: 0, max: Infinity, step: 0.1 },
    "letter-spacing": { min: -Infinity, max: Infinity, step: 0.1 },
    "text-indent": { min: -Infinity, max: Infinity, step: 1 }
  },
  boxElements: [
    'article',
    'aside',
    'div',
    'figcaption',
    'figure',
    'footer',
    'header',
    'hgroup',
    'label',
    'li',
    'main',
    'nav',
    'ol',
    'picture',
    'section',
    'template',
    'ul'
  ],
  textElements: [
    'a',
    'abbr',
    'address',
    'b',
    'bdi',
    'bdo',
    'blockquote',
    'button',
    'cite',
    'code',
    'del',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'i',
    'ins',
    'kbd',
    'label',
    'legend',
    'mark',
    'output',
    'p',
    'samp',
    'small',
    'span',
    'strike',
    'strong',
    'summary',
    'sub',
    'sup',
    'time',
    'u',
    'var'
  ],
  breakElements: [
    'br',
    'hr',
    'wbr'
  ],
  blocks: {
    visible: true,
    name: "Elements",
    items: [
      {
        type: "box",
        code: '<div></div>'
      },
      {
        type: "text",
        code: '<p>text</p>'
      },
      {
        type: "link",
        code: '<a href="https://michaelsboost.com/Polyrise">Polyrise</a>'
      },
      {
        type: "button",
        code: '<button>text</button>'
      },
      {
        type: "list",
        code: '<ul><li>list item</li></ul>'
      },
      {
        type: "progress",
        code: '<progress value="25" max="100" />'
      },
      {
        type: "form",
        code: `<form>
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            aria-label="First name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            aria-label="Email address"
            autocomplete="email"
            required
          />
          <button type="submit">Subscribe</button>
          <fieldset>
            <label for="terms">
              <input type="checkbox" role="switch" id="terms" name="terms" />
              <span>I agree to the </span>
              <a href="#">Privacy Policy</a>
            </label>
          </fieldset>
        </form>`
      },
      {
        type: "datalist",
        code: `<input list="eus29efzy" type="search" placeholder="Search..." />
        <datalist id="eus29efzy">
          <option value="Hello"></option>
          <option value="World"></option>
        </list>`
      },
      {
        type: "textarea",
        code: `<textarea placeholder="Text here">Hello world</textarea>`
      },
      {
        type: "select",
        code: `<select>
          <optgroup label="English">
            <option value="Hello" selected>Hello</option>
            <option value="World">World</option>
          </optgroup>
          <optgroup label="Español">
            <option value="Hola">Hola</option>
            <option value="Mundo">Mundo</option>
          </optgroup>
        </select>`
      },
      {
        type: "audio",
        code: `<figure>
        <audio controls>
          <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <figcaption>
          <span>Audio courtesy of </span>
          <a href="https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_audio_all" target="_blank">w3schools.com</a>
        </figcaption>
      </figure>`
      },
      {
        type: "video",
        code: `<figure>
          <video controls>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
            Your browser does not support the video tag.
          </video>
          <figcaption>
            <span>Video courtesy of </span>
            <a href="https://www.bigbuckbunny.org/" target="_blank">Big Buck Bunny</a>
            <span>.</span>
          </figcaption>
        </figure>`
      },
      {
        type: "YouTube Video",
        code: `<iframe width="576" height="360" src="https://www.youtube.com/embed/5rebMQj4Yiw" title="Introducing my Character Party App" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
      },
      {
        type: "image",
        code: `<figure>
  <picture>
    <img src="https://cdn.pixabay.com/photo/2015/10/16/19/18/balloon-991680_1280.jpg" alt="${app.name}">
  </picture>
  <figcaption>
    <span>Image courtesy of </span>
    <a href="https://pixabay.com/photos/balloon-heart-love-red-romantic-991680/" target="_blank">Pixabay.com</a>
    <span>.</span>
  </figcaption>
</figure>
`
      },
      {
        type: "vector",
        code: `<svg xmlns="http://www.w3.org/2000/svg" style="isolation:isolate" viewBox="0 0 1080 1080" preserveAspectRatio="xMidYMin">
  <rect width="1080" height="1080" style="fill:rgb(248,255,247)">
  </rect>
  <line x1="159.75" y1="926" x2="920.25" y2="926" stroke-width="18" stroke="rgb(220,223,220)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="3">
  </line>
  <g>
  <g>
  <path d=" M 544.801 430.75 Q 544.801 504.551 544.801 580.75 Q 544.801 656.948 544.801 743.75" fill="none" stroke-width="50" stroke="rgb(253,222,189)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="3">
  </path>
  <g>
  <path d=" M 401.518 559.186 C 386.621 532.744 379.123 501.761 381.611 469.256 C 388.303 381.839 464.707 316.3 552.124 322.992 C 639.542 329.683 705.081 406.088 698.389 493.505 C 695.901 526.01 683.774 555.49 665.026 579.357 L 401.518 559.186 Z " fill="rgb(255,146,108)">
  </path>
  <path d=" M 401.518 559.186 C 426.684 603.855 472.963 635.566 527.876 639.77 C 582.788 643.973 633.355 619.675 665.026 579.357 L 401.518 559.186 Z " fill="rgb(0,72,99)">
  </path>
</g>
<g>
<line x1="553.901" y1="760.75" x2="553.901" y2="908.75" stroke-width="38" stroke="rgb(0,72,99)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="3">
</line>
<line x1="553.901" y1="618.75" x2="553.901" y2="760.75" stroke-width="38" stroke="rgb(0,72,99)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="3">
</line>
</g>
<g>
<line x1="500" y1="760.75" x2="500" y2="908.75" stroke-width="38" stroke="rgb(0,72,99)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="3">
</line>
<line x1="500" y1="618.75" x2="500" y2="760.75" stroke-width="38" stroke="rgb(0,72,99)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="3">
</line>
</g>
<path d=" M 544.801 430.75 Q 544.801 504.551 544.801 580.75 Q 544.801 656.948 544.801 743.75" fill="none" stroke-width="50" stroke="rgb(253,222,189)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="3">
</path>
</g>
<path d=" M 496.638 228.982 C 499.271 194.588 529.332 168.802 563.726 171.435 C 598.12 174.068 623.906 204.129 621.273 238.523 C 618.64 272.917 588.579 298.703 554.185 296.07 C 519.791 293.438 494.005 263.376 496.638 228.982 Z " fill="rgb(253,222,189)">
</path>
</g>
<g style="mix-blend-mode:soft-light;">
  <rect x="0" y="0" width="1080" height="1080" transform="matrix(1,0,0,1,0,0)" fill="rgb(243,255,241)">
  </rect>
</g>
</svg>`
      },
      {
        type: "iframe",
        code: `<iframe src="https://michaelsboost.com/">
          Your browser does not support the iframe tag.
        </iframe>`
      },
      {
        type: "dialog",
        code: `<dialog open>
  <article>
    <header>
      <button aria-label="Close" rel="prev" onclick="this.closest('dialog').removeAttribute('open');"></button>
      <h3>Confirm your action!</h3>
    </header>
    <p>
      Cras sit amet maximus risus. Pellentesque sodales odio sit amet augue finibus
      pellentesque. Nullam finibus risus non semper euismod.
    </p>
    <footer>
      <button role="button" class="secondary" onclick="this.closest('dialog').removeAttribute('open');">
        Cancel
      </button>
      <button autofocus onclick="this.closest('dialog').removeAttribute('open');">
        Confirm
      </button>
    </footer>
  </article>
</dialog>`
      },
      {
        type: "details",
        code: `<details>
  <summary>Accordion</summary>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna diam,
    tincidunt nec porta sed, auctor id velit. Etiam venenatis nisl ut orci consequat, vitae
    tempus quam commodo. Nulla non mauris ipsum. Aliquam eu posuere orci. Nulla convallis
    lectus rutrum quam hendrerit, in facilisis elit sollicitudin. Mauris pulvinar pulvinar
    mi, dictum tristique elit auctor quis. Maecenas ac ipsum ultrices, porta turpis sit
    amet, congue turpis.
  </p>
</details>`
      },
      {
        type: "canvas",
        code: `<canvas>Your browser does not support the canvas element.</canvas>`
      },
      {
        type: "meter",
        code: '<meter value="0.6">60%</meter>'
      },
      {
        type: "style",
        code: '<style type="text/css"></style>'
      },
      {
        type: "script",
        code: '<script type="module"></script>'
      },
      {
        type: "hr",
        code: '<hr/>'
      }   
    ]
  }
};
const icons = (function() {
  const SidebarIconCSS = "h-4 w-4";
  const navIconCSS = "h-3 w-3";
  const modalIconCSS = "h-4 w-4";
  const previewIconCSS = "h-3";

  return {
    logo: `<svg
      class="${SidebarIconCSS}" 
      width="512"
      height="512"
      viewBox="0 0 135.46666 135.46667"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg"
      fill="currentColor">
      <path
        d="M 9.5828775,0.26613362 V 135.20053 L 25.387597,126.03107 V 28.326953 l 70.325939,39.315946 -57.93083,32.387691 v 18.81073 L 125.88224,67.733332 Z M 37.783223,46.606974 V 88.679857 L 75.411417,67.643416 Z" />
    </svg>`,
    twitter: `<svg class="${SidebarIconCSS}" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <defs
     id="defs2"><clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath7"><path
         style="display:none;fill:#2a34ff;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
         d="M 2.7194315,3.6106111 H 8.5920036 L 21.280954,20.389389 h -5.727371 z"
         id="path7" /><path
         id="lpe_path-effect7"
         style="fill:#2a34ff;fill-opacity:1;stroke:none;stroke-width:0;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
         class="powerclip"
         d="M -2.8448815,-3.9722732 H 26.113213 V 27.972273 H -2.8448815 Z M 2.7194315,3.6106111 15.553583,20.389389 h 5.727371 L 8.5920036,3.6106111 Z" /></clipPath><clipPath
       clipPathUnits="userSpaceOnUse"
       id="clipPath11"><rect
         style="fill:#ff2a2a;fill-opacity:1;stroke:none;stroke-width:1.5;stroke-linecap:butt;stroke-linejoin:miter;stroke-dasharray:none;stroke-opacity:1"
         id="rect11"
         width="21.586601"
         height="18.278778"
         x="1.2021173"
         y="2.8606112" /></clipPath></defs><g
     style="fill:none;stroke:currentColor;stroke-width:1.5"
     id="g2"
     transform="translate(-0.04613684)"><g
       id="g8"
       clip-path="url(#clipPath11)"><path
         d="M 2.7194315,3.6106111 H 8.5920036 L 21.280954,20.389389 h -5.727371 z"
         id="path2-8" /><path
         d="M 20.541589,1.5132639 19.650846,2.5619375 18.760104,3.6106111 17.869362,4.6592848 16.978619,5.7079584 16.087877,6.756632 15.197135,7.8053056 14.306392,8.8539793 13.41565,9.9026529 12.524908,10.951326 11.634165,12 10.743423,13.048674 9.852681,14.097347 8.961938,15.146021 8.071196,16.194695 7.1804539,17.243368 6.2897116,18.292042 5.3989693,19.340715 4.5082269,20.389389 3.6174846,21.438063 2.7267423,22.486736"
         id="path4"
         clip-path="url(#clipPath7)" /></g></g>
    </svg>`,
    heart: `<svg class="w-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
    </svg>`,
    plus: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>`,
    layers: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
    </svg>`,
    swatch: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
    </svg>`,
    sun: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>`,
    moon: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>`,
    play: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>`,
    camera: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>`,
    cog: `<svg class="${SidebarIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>`,
    rotate: `<svg class="${previewIconCSS}" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z" />
    </svg>`,
    times: `<svg class="${modalIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>`,
    search: `<svg class="${modalIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>`,
    file: `<svg class="h-3 -mt-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z" />
    </svg>`,
    import: `<svg class="h-3 -mt-1 transform origin-center scale-125" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z" />
    </svg>`,
    upload: `<svg class="${modalIconCSS}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>`,
    download: `<svg class="h-3 -mt-1 transform origin-center scale-125" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
    </svg>`,
    codepen: `<svg class="h-3 -mt-1 transform origin-center scale-125" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M502.285 159.704l-234-156c-7.987-4.915-16.511-4.96-24.571 0l-234 156C3.714 163.703 0 170.847 0 177.989v155.999c0 7.143 3.714 14.286 9.715 18.286l234 156.022c7.987 4.915 16.511 4.96 24.571 0l234-156.022c6-3.999 9.715-11.143 9.715-18.286V177.989c-.001-7.142-3.715-14.286-9.716-18.285zM278 63.131l172.286 114.858-76.857 51.429L278 165.703V63.131zm-44 0v102.572l-95.429 63.715-76.857-51.429L234 63.131zM44 219.132l55.143 36.857L44 292.846v-73.714zm190 229.715L61.714 333.989l76.857-51.429L234 346.275v102.572zm22-140.858l-77.715-52 77.715-52 77.715 52-77.715 52zm22 140.858V346.275l95.429-63.715 76.857 51.429L278 448.847zm190-156.001l-55.143-36.857L468 219.132v73.714z" />
    </svg>`,
    layerUp: `<svg class="${navIconCSS}" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`,
    layerDown: `<svg class="${navIconCSS}" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`,
    arrowDown: `<svg class="${navIconCSS}" viewBox='0 0 576 512' style='color: unset;'>
      <path 
        fill='currentColor' 
        d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'/>
    </svg>`,
    eye: `<svg class="${navIconCSS}" viewBox="0 0 576 512" style="color: unset;">
      <path 
        fill="currentColor" 
        d="M572.52,241.4c-1.5-1.8-38.5-46-93.94-90.67C417.8,111.16,358.8,85.33,288,85.33S158.2,111.16,97.42,150.72C41.98,195.4,4.98,239.6,3.48,241.4A32,32,0,0,0,0,256a32,32,0,0,0,3.48,14.6c1.5,1.8,38.5,46,93.94,90.67C158.2,400.84,217.2,426.67,288,426.67s129.8-25.83,190.58-65.4c55.44-44.67,92.44-88.87,93.94-90.67A32,32,0,0,0,576,256,32,32,0,0,0,572.52,241.4ZM288,384a128,128,0,1,1,128-128A128,128,0,0,1,288,384Zm0-192a64,64,0,1,0,64,64A64,64,0,0,0,288,192Z"/>
    </svg>`,
    eyeSlash: `
    <svg class="${navIconCSS}" viewBox="0 0 640 512" style="color: unset;">
      <path 
        fill="currentColor" 
        d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c5.2-11.8 8-24.8 8-38.5c0-53-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zm223.1 298L373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5z"/>
    </svg>`,
    commandKey: `<svg class="${navIconCSS}" xmlns="http://www.w3.org/2000/svg" viewBox="-0.7 -0.596 432.75714 370.21021">
  <path
    fill="currentColor"
    stroke-width="1.82857"
    d="M 90.010716,-37.596 C 39.849447,-37.596 -0.7,2.9560437 -0.7,52.854 c 0,50.16127 40.812759,90.97356 90.710716,90.57858 h 42.392864 v 70.83214 H 90.010716 C 39.849447,214.26472 -0.7,254.68463 -0.7,304.58258 c 0,50.29293 40.549447,90.57857 90.710716,90.57857 49.897964,0 90.450004,-40.28564 90.450004,-90.57857 v -42.26429 h 70.56786 v 42.26429 c 0,50.29293 40.41681,90.57857 90.44642,90.57857 50.16127,0 90.58215,-40.28564 90.58215,-90.57857 0,-49.89795 -40.42088,-90.31786 -90.58215,-90.31786 H 299.08215 V 143.43258 H 341.475 c 50.16127,0 90.58215,-40.41731 90.58215,-90.57858 0,-49.8979563 -40.42088,-90.45 -90.58215,-90.45 -50.02961,0 -90.70974,40.5520437 -90.44642,90.45 V 95.511146 H 180.46072 V 52.854 c 0,-49.8979563 -40.55204,-90.45 -90.450004,-90.45 z m 0.13214,48.053572 c 23.303254,0 42.260724,18.961043 42.260724,42.264285 V 95.378996 H 90.142856 c -23.69819,0 -42.657141,-18.95892 -42.657141,-42.657139 0,-23.303242 18.958951,-42.264285 42.657141,-42.264285 z m 251.203574,0 c 23.69822,0 42.65715,18.961043 42.65715,42.264285 0,23.698219 -18.95893,42.657139 -42.65715,42.657139 H 299.08215 V 52.721857 c 0,-23.303242 18.96105,-42.264285 42.26428,-42.264285 z M 180.46072,143.56472 h 70.7 v 70.7 h -70.7 z M 90.142856,262.31829 h 42.260724 v 42.26429 c 0,23.6982 -18.95747,42.65714 -42.260724,42.65714 -23.69819,0 -42.657141,-18.95894 -42.657141,-42.65714 0,-23.30325 18.958951,-42.26429 42.657141,-42.26429 z m 208.939294,0 h 42.26428 c 23.69822,0 42.65715,18.96104 42.65715,42.26429 0,23.6982 -18.95893,42.65714 -42.65715,42.65714 -23.30323,0 -42.26428,-18.95894 -42.26428,-42.65714 z" />
</svg>`,
    plusFill: `<svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
      <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
    </svg>`,
    shift: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-long" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192h88l0 288c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32l0-288h88c9.6 0 18.2-5.7 22-14.5z"></path></svg>`,
    move: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrows-up-down-left-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z"></path></svg>`,
    undo: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-rotate-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"></path></svg>`,
    redo: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-rotate-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"></path></svg>`,
    trash: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>`,
    clone: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clone" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M0 448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H224c-53 0-96-43-96-96V160H64c-35.3 0-64 28.7-64 64V448zm224-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"></path></svg>`,
    cut: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="scissors" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 192l-39.5-39.5c4.9-12.6 7.5-26.2 7.5-40.5C224 50.1 173.9 0 112 0S0 50.1 0 112s50.1 112 112 112c14.3 0 27.9-2.7 40.5-7.5L192 256l-39.5 39.5c-12.6-4.9-26.2-7.5-40.5-7.5C50.1 288 0 338.1 0 400s50.1 112 112 112s112-50.1 112-112c0-14.3-2.7-27.9-7.5-40.5L499.2 76.8c7.1-7.1 7.1-18.5 0-25.6c-28.3-28.3-74.1-28.3-102.4 0L256 192zm22.6 150.6L396.8 460.8c28.3 28.3 74.1 28.3 102.4 0c7.1-7.1 7.1-18.5 0-25.6L342.6 278.6l-64 64zM160 112c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM112 448c-26.5 0-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48z"></path></svg>`,
    copy: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z"></path></svg>`,
    group: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hand-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M128 40c0-22.1 17.9-40 40-40s40 17.9 40 40V188.2c8.5-7.6 19.7-12.2 32-12.2c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c25.3 0 46 19.5 47.9 44.3c8.5-7.7 19.8-12.3 32.1-12.3c26.5 0 48 21.5 48 48v32 64c0 70.7-57.3 128-128 128l-16 0H240l-.1 0h-5.2c-5 0-9.9-.3-14.7-1c-55.3-5.6-106.2-34-140-79L8 336c-13.3-17.7-9.7-42.7 8-56s42.7-9.7 56 8l56 74.7V40zM240 304c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304zm48-16c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304c0-8.8-7.2-16-16-16zm80 16c0-8.8-7.2-16-16-16s-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V304z"></path></svg>`,
    paste: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paste" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M160 0c-23.7 0-44.4 12.9-55.4 32H48C21.5 32 0 53.5 0 80V400c0 26.5 21.5 48 48 48H192V176c0-44.2 35.8-80 80-80h48V80c0-26.5-21.5-48-48-48H215.4C204.4 12.9 183.7 0 160 0zM272 128c-26.5 0-48 21.5-48 48V448v16c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V256H416c-17.7 0-32-14.3-32-32V128H320 272zM160 40a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm256 88v96h96l-96-96z"></path></svg>`,
    bold: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bold" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"></path></svg>`,
    italic: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="italic" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"></path></svg>`,
    underline: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="underline" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"></path></svg>`,
    strike: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="strikethrough" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M161.3 144c3.2-17.2 14-30.1 33.7-38.6c21.1-9 51.8-12.3 88.6-6.5c11.9 1.9 48.8 9.1 60.1 12c17.1 4.5 34.6-5.6 39.2-22.7s-5.6-34.6-22.7-39.2c-14.3-3.8-53.6-11.4-66.6-13.4c-44.7-7-88.3-4.2-123.7 10.9c-36.5 15.6-64.4 44.8-71.8 87.3c-.1 .6-.2 1.1-.2 1.7c-2.8 23.9 .5 45.6 10.1 64.6c4.5 9 10.2 16.9 16.7 23.9H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H270.1c-.1 0-.3-.1-.4-.1l-1.1-.3c-36-10.8-65.2-19.6-85.2-33.1c-9.3-6.3-15-12.6-18.2-19.1c-3.1-6.1-5.2-14.6-3.8-27.4zM348.9 337.2c2.7 6.5 4.4 15.8 1.9 30.1c-3 17.6-13.8 30.8-33.9 39.4c-21.1 9-51.7 12.3-88.5 6.5c-18-2.9-49.1-13.5-74.4-22.1c-5.6-1.9-11-3.7-15.9-5.4c-16.8-5.6-34.9 3.5-40.5 20.3s3.5 34.9 20.3 40.5c3.6 1.2 7.9 2.7 12.7 4.3l0 0 0 0c24.9 8.5 63.6 21.7 87.6 25.6l0 0 .2 0c44.7 7 88.3 4.2 123.7-10.9c36.5-15.6 64.4-44.8 71.8-87.3c3.6-21 2.7-40.4-3.1-58.1H335.1c7 5.6 11.4 11.2 13.9 17.2z"></path></svg>`,
    subscript: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="subscript" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32H47.3l89.6 128L47.3 384H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64c10.4 0 20.2-5.1 26.2-13.6L176 311.8l85.8 122.6c6 8.6 15.8 13.6 26.2 13.6h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H304.7L215.1 256l89.6-128H320c17.7 0 32-14.3 32-32s-14.3-32-32-32H288c-10.4 0-20.2 5.1-26.2 13.6L176 200.2 90.2 77.6C84.2 69.1 74.4 64 64 64H32zM480 320c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-32 16c-15.8 7.9-22.2 27.1-14.3 42.9C393 361.5 404.3 368 416 368v80c-17.7 0-32 14.3-32 32s14.3 32 32 32h32 32c17.7 0 32-14.3 32-32s-14.3-32-32-32V320z"></path></svg>`,
    superscript: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="superscript" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M480 32c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4l-32 16c-15.8 7.9-22.2 27.1-14.3 42.9C393 73.5 404.3 80 416 80v80c-17.7 0-32 14.3-32 32s14.3 32 32 32h32 32c17.7 0 32-14.3 32-32s-14.3-32-32-32V32zM32 64C14.3 64 0 78.3 0 96s14.3 32 32 32H47.3l89.6 128L47.3 384H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64c10.4 0 20.2-5.1 26.2-13.6L176 311.8l85.8 122.6c6 8.6 15.8 13.6 26.2 13.6h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H304.7L215.1 256l89.6-128H320c17.7 0 32-14.3 32-32s-14.3-32-32-32H288c-10.4 0-20.2 5.1-26.2 13.6L176 200.2 90.2 77.6C84.2 69.1 74.4 64 64 64H32z"></path></svg>`,
    heading: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heading" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"></path></svg>`,
    paragraph: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paragraph" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M192 32h64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352H288V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H192c-88.4 0-160-71.6-160-160s71.6-160 160-160z"></path></svg>`,
    quote: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"></path></svg>`,
    link: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path></svg>`,
    listBullet: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list-ul" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M64 144c26.5 0 48-21.5 48-48s-21.5-48-48-48S16 69.5 16 96s21.5 48 48 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm48-208c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"></path></svg>`,
    listNumbers: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list-ol" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path></svg>`,
    icons: `<svg class="${navIconCSS}" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="icons" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M532.3 7.3C539.7 13.3 544 22.4 544 32V176c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48V71L384 90.2V208c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48V64c0-15.3 10.8-28.4 25.7-31.4l160-32c9.4-1.9 19.1 .6 26.6 6.6zM106.7 304l11.8-17.8c5.9-8.9 15.9-14.2 26.6-14.2h61.7c10.7 0 20.7 5.3 26.6 14.2L245.3 304H272c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V352c0-26.5 21.5-48 48-48h26.7zM224 408c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM510.7 278.3L472.3 368H528c6.7 0 12.6 4.1 15 10.4s.6 13.3-4.4 17.7l-128 112c-5.6 4.9-13.9 5.3-19.9 .9s-8.2-12.4-5.3-19.2L423.7 400H368c-6.7 0-12.6-4.1-15-10.4s-.6-13.3 4.4-17.7l128-112c5.6-4.9 13.9-5.3 19.9-.9s8.2 12.4 5.3 19.2zm-339-59.2c-6.5 6.5-17 6.5-23 0L51.9 119.2c-28-29-26.5-76.9 5-103.9c27-23.5 68.4-19 93.4 6.5l10 10.5 9.5-10.5c25-25.5 65.9-30 93.9-6.5c31 27 32.5 74.9 4.5 103.9l-96.4 99.9z"></path></svg>`
  };
})();

// Reactive objects
window.project = createProxy(p, (property, oldValue, newValue) => {
  if (oldValue !== newValue) {
    localStorage.setItem('Polyrise', JSON.stringify(project));
    
    // Split the property path into components
    const propertyParts = property.split('.');

    if (!App.initialRender) {
      // List of properties that should not trigger App.render
      const noRenderProps = ['lang', 'title', 'description', 'author', 'url', 'meta'];

      // Skip renderPreview if property is state.selected
      if (propertyParts.includes('state') && ['selected', 'collapsed'].some(part => propertyParts.includes(part))) {
        App.render('#app');
        return; // Exit the function early
      }

      // Check if the change is within project.html and is a text property
      if (propertyParts[0] === 'html' && propertyParts.includes('text')) {
        // Only text property changed, so only render preview
        renderPreview();
      } else if (noRenderProps.includes(propertyParts[0])) {
        // If the changed property is in noRenderProps, only render the preview
        renderPreview();
      } else {
        if (propertyParts[0] === 'activePanel') {
          // Handle full render or specific actions
          App.render('#app');
          getIframeClientSize();
        } else {
          // Handle full render or specific actions
          App.render('#app');
          // Diff nodes for other changes
          const diff = ['lang', 'libraries', 'html', 'css', 'title', 'description', 'author', 'url', 'meta', 'previewDark'];
          if (diff.includes(propertyParts[0])) {
            renderPreview();
          }
  
          if (propertyParts[0] === "dark") {
            document.documentElement.setAttribute('data-theme', project.dark ? 'dark' : 'light');
            document.querySelector('meta[name=apple-mobile-web-app-status-bar-style]').setAttribute('content', project.dark ? 'black-translucent' : 'default');
            document.querySelector('meta[name=theme-color]').setAttribute('content', project.dark ? '#13171f' : '#ffffff');
            document.querySelector('meta[name=msapplication-navbutton-color]').setAttribute('content', project.dark ? '#13171f' : '#ffffff');
          }
        }
      }
    }
  }
});

window.data = createProxy(d, (property, oldValue, newValue) => {
  // Only render if the actual value has changed
  if (oldValue !== newValue) {
    const string = property.toString();
    if (string === "stylesTarget") {
      if (data.stylesTarget) {
        if (data.shiftKey) {
          data.selectedLayerIds = [];
          selectLayersByStyleRef(data.stylesTarget, project.html);
        }
      }
    }
    if (string === 'selectedSize') {
      data.iframeWidth = data.selectedSize !== 'none' ? data.selectedSize.split('x')[0] : getIframeClientSize();
      data.iframeHeight = data.selectedSize !== 'none' ? data.selectedSize.split('x')[1] : getIframeClientSize();
    }
    App.render('#app');
  }
});

// Components
function LeftMenubar() {
  const buttonSize = "w-full";

  return `<ul class="p-0 m-0">
  <li class="list-none m-0">
    <button
      aria-label="toggle menu"
      name="toggle menu"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent"
      style="color: unset;"
      onclick="data.menuDialog = true"
    >
      ${icons.logo}
    </button>
  </li>
  <li class="list-none m-0">
    <a
      aria-label="developer's twitter page"
      name="developer's twitter page"
      class="${buttonSize} text-sm border-0 px-4 py-3 rounded-md bg-transparent"
      style="color: unset;"
      role="button"
      href="https://twitter.com/michaelsboost"
    >
      ${icons.twitter}
    </a>
  </li>
  <li class="list-none m-0">
    <a
      href="https://michaelsboost.com/donate/"
      aria-label="Donation helps developer maintence"
      target="_blank"
      role="button"
      class="${buttonSize} text-sm border-0 px-4 py-3 rounded-md bg-transparent text-red-400"
    >
      ${icons.heart}
    </a>
  </li>
  <li class="list-none m-0">
    <button 
      aria-label="add blocks" 
      name="add blocks" 
      class="w-11 text-sm border-0 px-0 py-3 mb-2"
      onclick="Blocks()"
    >
      ${icons.plus}
    </button>
  </li>
</ul>
<ul class="p-0 m-0">
  <li class="list-none m-0">
    <button
      aria-label="toggle layers"
      name="toggle layers"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent ${project.activePanel === 'layers' ? 'text-blue-500' : ''}"
      style="${project.activePanel === 'layers' ? 'text-blue-500' : 'color: unset;'}"
      onclick="project.activePanel = project.activePanel === 'layers' ? null : 'layers'"
    >
      ${icons.layers}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="toggle inspector"
      name="toggle inspector"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent ${project.activePanel === 'inspector' ? 'text-blue-500' : ''} lg:hidden"
      style="${project.activePanel === 'inspector' ? 'text-blue-500' : 'color: unset;'}"
      onclick="project.activePanel = project.activePanel === 'inspector' ? null : 'inspector'"
    >
      ${icons.swatch}
    </button>
  </li>
</ul>
<ul class="p-0 m-0">
  <li class="list-none m-0">
    <button
      aria-label="toggle theme"
      name="toggle theme"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent"
      style="color: unset;"
      onclick="project.previewDark = !project.previewDark;"
    >
      ${project.previewDark ? icons.sun : icons.moon}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="render preview"
      name="render preview"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent"
      style="color: unset;"
      onclick="renderPreview(true)"
    >
      ${icons.play}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="full page screenshot"
      name="full page screenshot"
      class="${buttonSize} text-sm border-0 px-0 py-3 rounded-md bg-transparent"
      style="color: unset;"
      onclick="screenshot()"
    >
      ${icons.camera}
    </button>
  </li>
  <li class="list-none m-0">
    <button
      aria-label="settings button"
      name="settings"
      class="${buttonSize} text-sm border-0 px-4 py-3 rounded-md bg-transparent -mt-1"
      style="color: unset;"
      onclick="data.settings = !data.settings;"
    >
      ${icons.cog}
    </button>
  </li>
</ul>`;
}
function Menu() {
  let menuDialog = `<ul class="py-4 px-0">
              <li class="list-none">
                <div class="items-center text-center">
                  <div>
                    <a 
                      aria-label="project homepage"
                      name="project homepage"
                      target="_blank" 
                      href="${app.url}">
                      <img 
                        alt="logo"
                        class="my-4 w-24 m-auto"
                        src="imgs/logo.svg"
                        loading="lazy" />
                    </a>
                    <div class="text-2xl">
                      About ${app.name}
                    </div>
                    <div class="my-2 text-xs">
                      Version ${app.version}
                    </div>
                    <a 
                      target="_blank" 
                      class="text-sm underline mb-2 text-blue-500" 
                      href="${app.license}">
                        Open Source License
                    </a>
                  </div>
                </div>
              </li>
              <li class="p-0 list-none">
                <hr />
              </li>
              <li class="p-0 list-none -mt-2">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="newProject();">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <span>new project</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="data.menuDialog = null; importProject()">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                  <span>import project</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="data.menuDialog = null; downloadJSON()">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                  </svg>
                  <span>download json</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="data.menuDialog = null; downloadProject()">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>download zip</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="data.menuDialog = null; share()">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                  </svg>
                  <span>share to codepen</span>
                </button>
              </li>
              <li class="p-0 list-none">
                <button 
                  aria-label="Empty storage saved from Polyrise"
                  name="Empty storage saved from Polyrise"
                  class="w-full flex gap-2 text-sm capitalize border-0 p-2 rounded-md bg-transparent" 
                  style="color: unset;" 
                  onclick="emptyStorage()">
                  <svg class="h-5 w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M566.6 54.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192-34.7-34.7c-4.2-4.2-10-6.6-16-6.6c-12.5 0-22.6 10.1-22.6 22.6l0 29.1L364.3 320l29.1 0c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16l-34.7-34.7 192-192zM341.1 353.4L222.6 234.9c-42.7-3.7-85.2 11.7-115.8 42.3l-8 8C76.5 307.5 64 337.7 64 369.2c0 6.8 7.1 11.2 13.2 8.2l51.1-25.5c5-2.5 9.5 4.1 5.4 7.9L7.3 473.4C2.7 477.6 0 483.6 0 489.9C0 502.1 9.9 512 22.1 512l173.3 0c38.8 0 75.9-15.4 103.4-42.8c30.6-30.6 45.9-73.1 42.3-115.8z"/>
                  </svg>
                  <span>empty storage</span>
                </button>
              </li>
            </ul>`;
  menuDialog = `<dialog ${data.menuDialog ? 'open' : ''}>
        <article class="rounded-md">
          <header class="flex justify-between items-center">
            <h1 class="text-lg font-thin m-0 capitalize">
              file menu
            </h1>
            <button 
              class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border-0" 
              style="color: unset;" 
              aria-label="Close"
              onclick="data.menuDialog = null">
              ${icons.times}
            </button>
          </header>
          <main class="font-thin">
            ${menuDialog}
          </main>
          <footer>
            <button 
              class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${project.dark ? 'border-gray-600' : 'border-gray-200'}" 
              style="color: unset;" 
              aria-label="Close" 
              onclick="data.menuDialog = null">
              close
            </button>
          </footer>
        </article>
      </dialog>`;
    return menuDialog;
}
function Settings() {
  let frameworks = data.frameworks;

  // Get the keys, sort them alphabetically, and reduce them back into an object
  let sortedFrameworks = Object.keys(frameworks)
    .sort()
    .reduce((acc, key) => {
      acc[key] = frameworks[key];
      return acc;
    }, {});

  let settingsHTML = `<ul class="px-0">
    <li class="list-none">
      <div class="mb-2">
        <input 
          id="pjqgd1wka"
          type="file" 
          name="project logo" 
          class="hidden"
          onchange="handleLogoChange(event)"
        />
        <label 
          for="pjqgd1wka"
          class="mb-2 flex justify-between items-center cursor-pointer">
          <span>Project logo:</span>

          <img 
            id="projectLogo"
            class="w-8"
            alt="Project Logo"
            src="${project.logo}"
            loading="lazy">
        </label>
      </div>
    </li>
    <li class="list-none">
      <nav class="flex justify-between mt-5 items-center">
        <label 
          for="o14tigo4m"
          class="mb-2 flex justify-between items-center cursor-pointer">
          <span>Dark:</span>
        </label>

        <input 
          id="o14tigo4m"
          class="m-0"
          type="checkbox" 
          role="switch"
          name="toggle css reset"
          onchange="project.dark = this.checked;"
          ${project.dark ? 'checked="true"' : ''}
        />
      </nav>
    </li>
    <li class="list-none">
      <nav class="flex justify-between mt-5 items-center">
        <label 
          for="osbpm2k0q"
          class="mb-2 flex justify-between items-center cursor-pointer">
          <span>PWA:</span>
        </label>

        <input 
          id="osbpm2k0q"
          class="m-0"
          type="checkbox" 
          role="switch"
          name="export project as a pwa"
          onchange="project.pwa = this.checked"
          ${project.pwa ? 'checked="true"' : ''}
        />
      </nav>
    </li>
    <li class="list-none">
      <button
        aria-label="empty history"
        name="empty history"
        class="capitalize py-2 w-full items-center rounded-md"
        onclick="
          data.history = [];
          data.historyIndex = -1;
          this.closest('dialog[open]').querySelector('header button').onclick();
        ">
        <span class="text-[.75rem]">
          empty history
        </span>
      </button>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <nav class="flex justifu-between -mt-3 items-center">
        <label 
          for="wl7i1adq7"
          class="m-0 flex justify-between items-center cursor-pointer">
          <span>Libraries:</span>
        </label>

        <button
          aria-label="search libraries"
          name="search libraries"
          class="bg-transparent border-0 focus-within:shadow-none"
          style="color: unset;"
          onclick="librariesDialog();">
          ${icons.search}
        </button>
      </nav>

      <select onchange="
        if (this.value) {
          data.chosenFramework = this.value.toLowerCase();
          let framework = data.frameworks[\`\${data.chosenFramework}\`];
          if (!project.libraries.includes(framework.libraries)) {
            for (item of framework.libraries) {
              project.libraries.push(item);
            }
          }
          if (framework.meta) project.meta += framework.meta;
        } else {
          data.chosenFramework = '';
        }
      ">
        <option value="" ${!data.chosenFramework ? 'selected' : ''}>-- Popular Libraries/Frameworks --</option>
        ${Object.keys(sortedFrameworks).map(framework => {
          // Lowercase except first character is uppercase
          let name = framework.toLowerCase();
          name = name.charAt(0).toUpperCase() + name.slice(1);
          return `<option value="${name}" ${name === data.chosenFramework ? 'selected' : ''}>${name}</option>`
        }).join('')}
      </select>

      <div id="librariesBox">
        ${project.libraries.map((library, index) => `
        <nav class="flex justify-between py-2" data-index="${index}">
          <input 
            type="text" 
            placeholder="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js" 
            data="library" 
            class="w-full pl-3 pr-0 rounded-md rounded-r-none focus:shadow-none"
            style="margin-bottom: 0;"
            value="${library}" 
            oninput="project.libraries[${index}] = this.value; renderPreview(true);" />
          <button 
            aria-label="delete library"
            name="delete library"
            class="px-3 py-[15px] h-full border-0 rounded-md rounded-l-none"
            onclick="project.libraries.splice(${index}, 1); renderPreview(true);">
            ${icons.trash}
          </button>
        </nav>
      `).join('')}
      </div>
      <button 
        aria-label="add another library or framework" 
        name="add another library or framework" 
        onclick="project.libraries.push('')" 
        class="capitalize py-2 w-full items-center rounded-md">
        <span class="text-[.75rem]">
          Add another
        </span>
      </button>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project name:
      </div>
      <input 
        type="text" 
        name="project name"
        placeholder="Project name" 
        class="p-2 rounded-md w-full" 
        value="${project.name}"
        oninput="project.name = this.value;"
      />
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project version:
      </div>
      <section class="flex justify-between gap-4">
        <input 
          type="number" 
          min="0"
          step="1"
          name="project-major-version"
          placeholder="Major"
          class="p-2 rounded-md w-full" 
          value="${project.version.split('.')[0]}"
          oninput="updateVersionPart('major', this.value);"
        />
        <input 
          type="number" 
          min="0"
          step="1"
          name="project-minor-version"
          placeholder="Minor" 
          class="p-2 rounded-md w-full" 
          value="${project.version.split('.')[1]}"
          oninput="updateVersionPart('minor', this.value);"
        />
        <input 
          type="number" 
          min="0"
          step="1"
          name="project-patch-version"
          placeholder="Patch" 
          class="p-2 rounded-md w-full" 
          value="${project.version.split('.')[2]}"
          oninput="updateVersionPart('patch', this.value);"
        />
      </section>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project title:
      </div>
      <input 
        type="text" 
        name="project title"
        placeholder="Project title"
        class="p-2 rounded-md w-full" 
        value="${project.title}"
        oninput="project.title = this.value;"
      />
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project description:
      </div>
      <textarea 
        name="project description"
        placeholder="Project description" 
        class="p-2 rounded-md w-full resize-vertical h-56"
        oninput="project.description = this.value;"
      >${project.description}</textarea>
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project author:
      </div>
      <input 
        type="text" 
        name="project author"
        placeholder="Project author" 
        class="p-2 rounded-md w-full" 
        value="${project.author}"
        oninput="project.author = this.value;"
      />
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="mb-2">
        Project url:
      </div>
      <input 
        type="text" 
        name="project url"
        placeholder="Project url" 
        class="p-2 rounded-md w-full" 
        value="${project.url}"
        oninput="project.url = this.value;"
      />
    </li>
    <li class="p-0 list-none">
      <hr />
    </li>
    <li class="list-none">
      <div class="my-2">
        HTML before closing head tag:
      </div>
      <textarea 
        placeholder="HTML before closing </head> tag" 
        class="p-2 rounded-md w-full resize-vertical h-56"
        oninput="project.meta = this.value;"
      >${project.meta}</textarea>
    </li>
  </ul>`;
  settingsHTML = `<dialog ${data.settings ? 'open' : ''}>
    <article class="rounded-md">
      <header class="flex justify-between items-center">
        <h1 class="text-lg font-thin m-0 capitalize">
          settings
        </h1>
        <button 
          class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border-0" 
          style="color: unset;" 
          aria-label="Close"
          onclick="data.settings = null; data.chosenFramework = '';">
          ${icons.times}
        </button>
      </header>
      <main class="font-thin">
        ${settingsHTML}
      </main>
      <footer>
        <button 
          class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${project.dark ? 'border-gray-600' : 'border-gray-200'}" 
          style="color: unset;" 
          aria-label="Close" 
          onclick="data.settings = null; data.chosenFramework = '';">
          close
        </button>
      </footer>
    </article>
  </dialog>`;
  return settingsHTML;
}
window.librariesDialog = () => {
  let libraries = `<div class="p-4">
          <input 
            id="searchInput" 
            type="search" 
            placeholder="Search for resources (JQuery, Bootstrap, Foundation...)" 
            class="w-full p-3 rounded-full bg-[#1c212c]" 
            oninput="this.value ? data.searchLibKey = this.value : data.searchLibKey = null; data.searchLibKey ? fetchSuggestions(data.searchLibKey) : ''" />
            
          <div id="pruz9lb2p" class="relative px-4 capitalize h-auto max-h-64 overflow-auto"></div>
        </div>`;

  Modal.render({
    title: "Search for resources (JQuery, Bootstrap, Foundation...)",
    content: libraries,
    onLoad() {
      document.getElementById('searchInput').focus();
    }
  });
}
window.attributesModal = () => {
  const globalAttributes = [
    "accesskey", "autocapitalize", "autofocus", "class", "contenteditable", 
    "dir", "exportparts", "hidden", "id", "inert", "inputmode", "is", 
    "itemid", "itemprop", "itemref", "itemscope", "itemtype", "lang", 
    "nonce", "part", "popover", "role", "slot", "spellcheck", "tabindex", 
    "translate"
  ];
  const eventAttributes = [
    "onabort", "onautocomplete", "onautocompleteerror", "onblur", "oncancel", 
    "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", 
    "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", 
    "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", 
    "ondurationchange", "onemptied", "onended", "onerror", "onfocus", 
    "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", 
    "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", 
    "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", 
    "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", 
    "onplaying", "onprogress", "onratechange", "onreset", "onresize", 
    "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onsort", 
    "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", 
    "onvolumechange", "onwaiting"
  ];

  // Initialize `common` first
  const commonEventGroup = [
    "onclick", "ondblclick", "onmousedown", "onmouseup", "onmouseover", "onmouseout", "onmouseenter", "onmouseleave", "oncontextmenu"
  ];
  const dragDropEventGroup = [
    "ondragstart", "ondragend", "ondrop", "ondragenter", "ondragleave",
    "ondragover", ...commonEventGroup
  ];

  const eventGroups = {
    common: commonEventGroup,
    formControls: [
      "onchange", "oninput", "onfocus", "onblur"
    ],
    buttonControls: [
      "onchange", "oninput", "onfocus", "onblur", ...commonEventGroup
    ],
    dragDrop: [
      ...dragDropEventGroup
    ],
    detailControls: [
      "ontoggle"
    ],
    dialogControls: [
      "onclose", "oncancel", ...dragDropEventGroup
    ],
    media: [
      "onabort", "oncanplay", "oncanplaythrough", "ondurationchange", "onemptied",
      "onended", "onerror", "onloadeddata", "onloadedmetadata", "onloadstart",
      "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onseeked",
      "onseeking", "onstalled", "onsuspend", "ontimeupdate", "onvolumechange",
      "onwaiting"
    ],
    body: [
      "onafterprint", "onbeforeprint", "onbeforeunload", "onhashchange",
      "onlanguagechange", "onmessage", "onmessageerror", "onoffline", "ononline",
      "onpopstate", "onrejectionhandled", "onstorage", "onunhandledrejection",
      "onunload"
    ],
    loadError: [
      "onload", "onerror"
    ]
  };

  const tagEventGroups = [
    { tags: ['form', 'input', 'select', 'textarea'], events: ['formControls'] },
    { tags: ['canvas', 'map', 'meter', 'svg', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon', 'text', 'use', 'symbol', 'linearGradient', 'radialGradient', 'stop', 'clipPath', 'mask', 'filter', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence'], events: ['common'] },
    { tags: ['a', 'button'], events: ['buttonControls'] },
    { tags: ['details'], events: ['detailControls'] },
    { tags: ['dialog'], events: ['dialogControls'] },
    { tags: ['audio', 'video'], events: ['media'] },
    { tags: ['html'], events: ['common', 'body'] },
    { tags: ['script', 'img'], events: ['loadError'] },
    { tags: ['div', 'section', 'article', 'aside', 'header', 'footer', 'nav', 'main', 'figure', 'figcaption'], events: ['dragDrop'] },
    { tags: ['table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'col', 'colgroup', 'caption'], events: ['common'] },
    { tags: ['fieldset', 'label', 'legend'], events: ['common'] },
    { tags: ['iframe', 'embed', 'object', 'param'], events: ['common'] },
    { tags: ['output', 'del', 'ins', 'marquee', 'meter', 'time', 'data'], events: ['common'] }
  ];

  function combineEventGroups(groups) {
    return Array.from(new Set(groups.flatMap(group => eventGroups[group])));
  }

  function generateEventMappings() {
    const elementEventMappings = {};

    tagEventGroups.forEach(group => {
      const combinedEvents = combineEventGroups(group.events);
      group.tags.forEach(tag => {
        elementEventMappings[tag] = combinedEvents;
      });
    });

    return elementEventMappings;
  }

  const elementEventMappings = generateEventMappings();
  
  const specificAttributes = {
    input: ["accept", "alt", "autocomplete", "checked", "dirname", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "height", "list", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "src", "step", "type", "value", "width"],
    select: ["autofocus", "disabled", "form", "multiple", "name", "required", "size"],
    option: ["disabled", "label", "selected", "value"],
    optgroup: ["disabled", "label"],
    textarea: ["autocapitalize", "autocomplete", "cols", "dirname", "disabled", "form", "maxlength", "minlength", "name", "placeholder", "readonly", "required", "rows", "wrap"],
    img: ["alt", "crossorigin", "decoding", "height", "importance", "intrinsicsize", "ismap", "loading", "referrerpolicy", "sizes", "src", "srcset", "usemap", "width"],
    a: ["download", "href", "hreflang", "ping", "referrerpolicy", "rel", "target", "type"],
    button: ["autofocus", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "name", "type", "value"],
    fieldset: ["disabled", "form", "name"],
    label: ["for"],
    iframe: ["allow", "allowfullscreen", "allowpaymentrequest", "height", "loading", "name", "referrerpolicy", "sandbox", "src", "srcdoc", "width"],
    audio: ["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"],
    video: ["autoplay", "controls", "crossorigin", "height", "loop", "muted", "playsinline", "poster", "preload", "src", "width"],
    source: ["media", "sizes", "src", "srcset", "type"],
    track: ["default", "kind", "label", "src", "srclang"],
    form: ["accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "target"],
    meta: ["charset", "content", "http-equiv", "name"],
    link: ["as", "crossorigin", "href", "hreflang", "media", "referrerpolicy", "rel", "sizes", "type"],
    script: ["async", "crossorigin", "defer", "integrity", "nomodule", "referrerpolicy", "src", "type"],
    style: ["media", "scoped", "type"],
    ol: ["reversed", "start", "type"],
    li: ["value"],
    table: ["border"],
    th: ["colspan", "headers", "rowspan", "scope"],
    tr: ["align", "bgcolor", "valign"],
    td: ["abbr", "align", "axis", "bgcolor", "colspan", "headers", "height", "rowspan", "scope", "valign", "width"],
    progress: ["max", "value"],
    meter: ["high", "low", "max", "min", "optimum", "value"],
    object: ["data", "form", "height", "name", "type", "usemap", "width"],
    embed: ["height", "src", "type", "width"],
    param: ["name", "value"],
    area: ["alt", "coords", "download", "href", "hreflang", "ping", "referrerpolicy", "rel", "shape", "target"],
    col: ["span", "width"],
    colgroup: ["span"],
    map: ["name"],
    track: ["default", "kind", "label", "src", "srclang"],
    canvas: ["height", "width"],
    data: ["value"],
    time: ["datetime"],
    output: ["for", "form", "name"],
    del: ["cite", "datetime"],
    ins: ["cite", "datetime"],
    details: ["open"],
    dialog: ["open"],
    marquee: ["behavior", "bgcolor", "direction", "height", "hspace", "loop", "scrollamount", "scrolldelay", "truespeed", "vspace", "width"],
    meter: ["high", "low", "max", "min", "optimum", "value"],

    svg: ["width", "height", "viewBox", "preserveAspectRatio", "xmlns"],
    path: ["d", "pathLength"],
    rect: ["x", "y", "width", "height", "rx", "ry"],
    circle: ["cx", "cy", "r"],
    ellipse: ["cx", "cy", "rx", "ry"],
    line: ["x1", "y1", "x2", "y2"],
    polyline: ["points"],
    polygon: ["points"],
    text: ["x", "y", "dx", "dy", "rotate", "textLength", "lengthAdjust"],
    use: ["href", "x", "y", "width", "height"],
    symbol: ["viewBox", "preserveAspectRatio"],
    linearGradient: ["x1", "y1", "x2", "y2", "gradientUnits", "gradientTransform", "spreadMethod"],
    radialGradient: ["cx", "cy", "r", "fx", "fy", "fr", "gradientUnits", "gradientTransform", "spreadMethod"],
    stop: ["offset", "stop-color", "stop-opacity"],
    clipPath: ["clipPathUnits"],
    mask: ["maskUnits", "maskContentUnits", "x", "y", "width", "height"],
    filter: ["x", "y", "width", "height", "filterUnits", "primitiveUnits"],
    feBlend: ["in", "in2", "mode"],
    feColorMatrix: ["in", "type", "values"],
    feComponentTransfer: ["in"],
    feComposite: ["in", "in2", "operator", "k1", "k2", "k3", "k4"],
    feConvolveMatrix: ["in", "order", "kernelMatrix", "divisor", "bias", "targetX", "targetY", "edgeMode", "preserveAlpha"],
    feDiffuseLighting: ["in", "surfaceScale", "diffuseConstant", "kernelUnitLength"],
    feDisplacementMap: ["in", "in2", "scale", "xChannelSelector", "yChannelSelector"],
    feDistantLight: ["azimuth", "elevation"],
    feFlood: ["flood-color", "flood-opacity"],
    feFuncA: ["type", "tableValues", "slope", "intercept", "amplitude", "exponent", "offset"],
    feFuncB: ["type", "tableValues", "slope", "intercept", "amplitude", "exponent", "offset"],
    feFuncG: ["type", "tableValues", "slope", "intercept", "amplitude", "exponent", "offset"],
    feFuncR: ["type", "tableValues", "slope", "intercept", "amplitude", "exponent", "offset"],
    feGaussianBlur: ["in", "stdDeviation", "edgeMode"],
    feImage: ["href", "preserveAspectRatio", "x", "y", "width", "height", "result"],
    feMergeNode: ["in"], // Used within feMerge, no additional attributes
    feMorphology: ["in", "operator", "radius"],
    feOffset: ["in", "dx", "dy"],
    fePointLight: ["x", "y", "z"],
    feSpecularLighting: ["in", "surfaceScale", "specularConstant", "specularExponent", "kernelUnitLength"],
    feSpotLight: ["x", "y", "z", "pointsAtX", "pointsAtY", "pointsAtZ", "specularExponent", "limitingConeAngle"],
    feTile: ["in"],
    feTurbulence: ["baseFrequency", "numOctaves", "seed", "stitchTiles", "type"],
  };

  // Helper to find common tags
  function areCommonLayerTags(layers) {
    if (layers.length === 0) return [];
  
    // Extract the tag from each layer
    const firstTag = layers[0].tag;
    const allSame = layers.every(layer => layer.tag === firstTag);
  
    // If all tags are the same, return the full layers array; otherwise, return an empty array
    return allSame ? true : false;
  }
  
  // Retrieve and aggregate attributes for selected layers
  const selectedLayers = data.selectedLayerIds.map(id => findLayerById(id, project.html).layer).filter(layer => layer);
  const detectCommonLayerTags = areCommonLayerTags(selectedLayers);

  function renderAttributeButtons(attributes) {
    return attributes
      .filter(attr => !data.searchTerm || attr.includes(data.searchTerm))
      .map(attr => `
        <button 
          class="text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border 
          ${project.dark ? 'border-gray-600' : 'border-gray-300'}"
          style="color: unset;"
          onclick="
            const textfield = document.getElementById('hyfb8mxg0');
            const val = textfield.value.trim();

            if (!val) {
              textfield.value = '${attr}';
              return;
            }
            textfield.value += ',${attr}';
          ">
          ${attr}
        </button>`
      ).join('');
  };

  let attributesModal = "";
  data.selectedLayerIds.forEach(id => {
    const { layer } = findLayerById(id, project.html);

    let specificAttributesForTag = specificAttributes[layer.tag] ? specificAttributes[layer.tag] : null;
    // if (data.selectedLayerIds.length > 0) specificAttributesForTag = [];

    let attrBtns = null;
    if (data.boxElements.includes(layer.tag) || data.textElements.includes(layer.tag)) {
      const detectTag = ['a', 'button', 'form', 'input', 'select', 'textarea'];
      if ((detectTag.includes(layer.tag))) {
        attrBtns = renderAttributeButtons(elementEventMappings[layer.tag]);
      } else {
        attrBtns = renderAttributeButtons(elementEventMappings['div']);
      }
    } else if (data.breakElements.includes(layer.tag)) {
      attrBtns = null
    } else {
      attrBtns = renderAttributeButtons(elementEventMappings[layer.tag] || eventAttributes);
    }

    attributesModal = `
      <div class="flex flex-col gap-4">
        ${specificAttributesForTag && detectCommonLayerTags ? `
          <details 
            class="flex items-center mt-4 mb-0" 
            ${data.specificAttributesForTag ? 'open' : ''}
            ontoggle="
            const detailsElement = this;
            data.specificAttributesForTag = detailsElement.hasAttribute('open');
          ">
            <summary class="block">
              Specific Attributes for &lt;${layer.tag}&gt;
            </summary>
            <code class="grid grid-cols-2 gap-2 mb-0 bg-transparent">
              ${renderAttributeButtons(specificAttributesForTag)}
            </code>
          </details>

        <hr/>` : ''}

        <details 
          class="flex items-center ${specificAttributesForTag && detectCommonLayerTags ? '' : 'mt-4'} mb-0" 
          ${data.globalAttributesCollapsed ? 'open' : ''}
          ontoggle="
          const detailsElement = this;
          data.globalAttributesCollapsed = detailsElement.hasAttribute('open');
        ">
          <summary class="block">
            Global Attributes
          </summary>
          <code class="grid grid-cols-2 gap-2 mb-0 bg-transparent">
            ${renderAttributeButtons(globalAttributes)}
          </code>
        </details>

        <hr/>

        <details 
          class="flex items-center mb-0" 
          ${data.eventAttributesCollapsed ? 'open' : ''}
          ontoggle="
          const detailsElement = this;
          data.eventAttributesCollapsed = detailsElement.hasAttribute('open');
        ">
          <summary class="block">
            Event Attributes for &lt;${layer.tag}&gt;
          </summary>
          <code class="grid grid-cols-2 gap-2 mb-0 bg-transparent">
            ${attrBtns}
          </code>
        </details>

        <hr/>

        <input 
          id="hyfb8mxg0"
          type="text" 
          placeholder="Enter custom attribute..." 
          class="rounded-full border p-2 flex-grow"
          style="margin: 0;"
          onkeydown="
            if (event.key === 'Enter' && this.value.trim()) {
              addAttribute(this.value);
              document.querySelector('dialog[open]').querySelector('header > button').onclick();
            }
          "
        />
      </div>`;
  });

  Modal.render({
    title: "Add An Attribute",
    content: attributesModal,
    onLoad() {
      document.getElementById('hyfb8mxg0').focus();
    },
    onClose() {
      
    },
    onConfirm() {
      addAttribute(document.getElementById('hyfb8mxg0').value.trim());
    }
  });
}
function LayerTree() {
  // Check if project.html is defined and is an array
  if (!Array.isArray(project.html)) {
    console.error("project.html is not a valid array:", project.html);
    return "";
  }

  // Function to render each layer recursively
  function renderLayer(layer) {
    // Defensive check for undefined or null layer
    if (!layer) {
      console.error("Undefined or null layer encountered in renderLayer:", layer);
      return "";
    }

    const { id, name, children, state } = layer;
    const hasChildren = children && children.length > 0;
    const isVisible = state.visible;

    if (data.shiftKey && data.cmdKey && layer.style === data.stylesTarget) {
      layer.state.selected = true;
    }

    // HTML structure for each layer
    const listItem = `
      <li class="list-none select-none">
        <code class="p-0 flex justify-between whitespace-nowrap min-w-min ${state.selected ? 'bg-[#0172ad] text-white' : ''}" data-layer="${id}">
          <span>
            <button 
              aria-label="toggle layer children"
              name="toggle layer children"
              class="bg-transparent ${hasChildren ? '' : 'hidden'} border-0 p-2 text-xs transform transition-transform" style="color: unset; transform: ${state.collapsed ? 'rotate(-90deg)' : 'rotate(0deg)'};"
              onclick="toggleCollapse('${id}')">
              ${hasChildren ? icons.arrowDown : ''}
            </button>
            <button 
              aria-label="toggle layer visibility"
              name="toggle layer visibility"
              class="bg-transparent border-0 p-2 text-xs" style="color: unset;"
              onclick="toggleVisible('${id}')">
              ${isVisible ? icons.eye : icons.eyeSlash}
            </button>
          </span>
          <button 
            aria-label="toggle selected layer"
            name="toggle selected layer"
            class="bg-transparent border-0 p-2 text-xs w-full text-right capitalize" 
            style="color: unset;"
            onclick="selectedBlock('${id}')"
          >
            ${name}
          </button>
        </code>
        ${hasChildren ? `<ul class="mt-1 mb-1 -ml-4 ${state.collapsed ? 'hidden' : ''}">` + children.map(child => renderLayer(child)).join('') + '</ul>' : ''}
      </li>
    `;

    return listItem;
  }

  // Render all layers in project.html
  return project.html.map(layer => renderLayer(layer)).join('');
}
function Inspector() {
  let iframe = document.getElementById('iframe');
  if (!iframe) return;
  if (data.editorNavState) return;

  // Helper to find common layer tags & attributes
  function findCommonLayerTags(layers) {
    if (layers.length === 0) return [];
    const firstTag = layers[0].tag;
    return layers.every(layer => layer.tag === firstTag) ? layers : [];
  }
  function findCommonAttributes(layers) {
    if (layers.length === 0) return {};
    const attributeCounts = {};

    layers.forEach(layer => {
      Object.keys(layer.props || {}).forEach(prop => {
        attributeCounts[prop] = (attributeCounts[prop] || 0) + 1;
      });
    });

    return Object.fromEntries(
      Object.entries(attributeCounts)
        .filter(([key, count]) => count === layers.length)
        .map(([key]) => [key, layers[0].props[key]])
    );
  }

  // Constants and helper functions
  let buttonItemClass = 'bg-transparent border-0 text-[.6rem] p-0 m-0 h-full capitalize text-left';
  const buttonAddItemClass = 'bg-transparent border-0 p-0 text-right';
  const RenameOrDeleteButtonClass = 'bg-transparent text-[.6rem] p-0 m-0 h-full capitalize text-center p-2 border';
  const selectClass = 'm-0 w-auto rounded-md capitalize text-[.6rem]';
  const selectStyle = 'padding: .5rem; background-image: none;';
  const inputClass = 'w-auto rounded-md normal-case text-[.6rem]';
  const inputStyle = 'height: auto; margin: 0; padding: .4rem;';
  const textareaClass = 'w-auto rounded-md normal-case text-[.6rem] resize-vertical';
  const textareaStyle = 'height: 5rem; margin: 0; padding: .4rem;';
  const mediaClass = 'cursor-pointer w-full my-2';

  const languages = {
    'en': 'English',       // English
    'es': 'Español',       // Spanish
    'zh': '中文',          // Chinese
    'hi': 'हिन्दी',        // Hindi
    'ar': 'العربية',       // Arabic
    'fr': 'Français',      // French
    'ru': 'Русский',       // Russian
    'pt': 'Português',     // Portuguese
    'de': 'Deutsch',       // German
    'ja': '日本語',        // Japanese
    'ko': '한국어',        // Korean
    'it': 'Italiano',      // Italian
    'tr': 'Türkçe',        // Turkish
    'vi': 'Tiếng Việt',    // Vietnamese
    'pl': 'Polski'         // Polish
  };
  const sizeOptions = {
    Phones: {
      '320x480': 'iPhone 3GS',
      '375x667': 'iPhone 6/7/8',
      '414x736': 'iPhone 6/7/8 Plus',
      '375x812': 'iPhone X/XS/11 Pro',
      '414x896': 'iPhone XR/XS Max/11/11 Pro Max',
      '360x640': 'Samsung Galaxy S5',
      '360x740': 'Samsung Galaxy S8+',
      '1440x3200': 'Samsung Galaxy S21 Ultra',
      '1080x2340': 'Google Pixel 5',
      '1080x2400': 'OnePlus 8 Pro',
      '1440x3200': 'Xiaomi Mi 11 Ultra',
      '1644x3840': 'Sony Xperia 1 III'
    },
    Tablets: {
      '2048x2732': 'iPad Pro 12.9" (3rd/4th Gen)',
      '2388x1668': 'iPad Pro 11" (1st/2nd/3rd Gen)',
      '2736x1824': 'Microsoft Surface Pro 7',
      '2800x1752': 'Samsung Galaxy Tab S7+',
      '2560x1600': 'Huawei MatePad Pro',
      '2000x1200': 'Lenovo Tab P11 Pro',
      '1920x1200': 'Amazon Fire HD 10',
      '1536x2048': 'iPad Air (3rd Gen)',
      '1620x2160': 'iPad Air (4th Gen)',
      '1620x2160': 'iPad 10.2" (8th Gen)',
      '1668x2224': 'iPad Pro 11" (2021)'
    },
    Desktops: {
      '3840x2160': '4K UHD (3840x2160)',
      '2560x1440': 'WQHD (2560x1440)',
      '1920x1080': 'Full HD (1920x1080)',
      '1366x768': 'Laptop (1366x768)',
      '3440x1440': 'UltraWide QHD (3440x1440)',
      '5120x2880': '5K Retina (5120x2880)',
      '1280x800': 'MacBook (1280x800)',
      '2560x1600': 'MacBook Pro (2560x1600)',
      '2880x1800': 'MacBook Pro Retina (2880x1800)'
    }
  };
  const booleanAttributes = [
    "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", 
    "formnovalidate", "hidden", "loop", "multiple", "muted", "novalidate", "open", 
    "contenteditable", "readonly", "required", "reversed", "scoped", "seamless", "selected"
  ];
  const inputTypes = [
    "button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden",
    "image", "month", "number", "password", "radio", "range", "reset", "search", "submit",
    "tel", "text", "time", "url", "week"
  ];
  const numberAttributes = ["max", "maxlength", "min", "minlength", "multiple", "range", "size", "step"];
  const stringAttributes = ["accept", "acceptCharset", "accesskey", "action", "align", "alt", "autocomplete", "form", "list", "pattern", "placeholder", "src", "tabindex", "title", "type", "usemap", "value"];
  const selectedLayers = data.selectedLayerIds.map(id => findLayerById(id, project.html).layer).filter(layer => layer);
  const commonLayerTag = findCommonLayerTags(selectedLayers);
  const commonAttributes = findCommonAttributes(selectedLayers);
  const cssFixedValueProperties = data.cssFixedValueProperties;
  const cssRangedValueProperties = data.cssRangedValueProperties;
  const boxElements = data.boxElements;
  const textElements = data.textElements;
  const breakElements = data.breakElements;

  // Simplify rendering functions
  function renderBooleanAttribute(name, value) {
    return `
      <button class="${buttonItemClass}" style="color: unset;" onclick="removeProp('${name}')">${name}</button>
      <button class="${buttonItemClass} p-1 text-right" style="color: unset;" onclick="removeProp('${name}')">${value ? 'Yes' : 'No'}</button>
    `;
  }
  function renderInput(name, type, value, min, max, step) {
    return `
      <button class="${buttonItemClass}" style="color: unset;" onclick="removeProp('${name}')">${name}</button>
      <input 
        class="${inputClass}" 
        style="${inputStyle}" 
        type="${type}" 
        placeholder="Use {n} for incremental text" 
        value="${value}" ${min ? `min="${min}"` : ''} ${max ? `max="${max}"` : ''} ${step ? `step="${step}"` : ''} 
        oninput="updateElement('props', '${name}', this.value, true)" 
        onfocus="saveState()" 
        onblur="saveState()"
      />
    `;
  }
  function renderTextarea(name, value) {
    return `
      <button class="${buttonItemClass}" style="color: unset;" onclick="removeProp('${name}')">${name}</button>
      <textarea 
        class="${textareaClass}" 
        style="${textareaStyle}" 
        placeholder="Use {n} for incremental text" 
        oninput="updateElement('props', '${name}', this.value, true)" 
        onfocus="saveState()" 
        onblur="saveState()"/>${value}</textarea>
    `;
  }
  
  // Functions to generate HTML sections
  const generatePreviewSize = () => {
    if (data.selectedSize === "none") getIframeClientSize();
    
    let html = `
    <div class="grid grid-cols-1 gap-1 items-center pt-2 capitalize">
      <label for="selectedSize" aria-label="resize canvas" class="m-auto">
        <select id="selectedSize" onchange="resizeCanvas(this.value)" class="${selectClass}" style="padding: .5rem; background-image: none;">
          <option value="none" ${data.selectedSize === "none" ? 'selected' : ''}>Select Size</option>
          ${Object.keys(sizeOptions).map(group => `
            <optgroup label="${group}">
              ${Object.keys(sizeOptions[group]).map(option => `
                <option value="${option}" ${data.selectedSize === option ? 'selected' : ''}>${sizeOptions[group][option]}</option>
              `).join('')}
            </optgroup>
          `).join('')}
        </select>
      </label>
    </div>

    <div class="grid grid-cols-2 gap-1 items-center pt-2 capitalize text-center">
      <span class="text-[.6rem] capitalize text-left">width</span>
      <input 
        id="iframeWidth"
        class="w-auto rounded-md normal-case text-[.6rem]" 
        style="height: auto; margin: 0; padding: .4rem;" 
        type="number" 
        min="0" 
        step="1" 
        value="${data.iframeWidth}"
        oninput="
          if (this.value && document.getElementById('iframeHeight').value) {
            resizeCanvas(this.value + 'x' + document.getElementById('iframeHeight').value);
          }
        ">
      <span class="text-[.6rem] capitalize text-left">height</span>
      <input 
        id="iframeHeight"
        class="w-auto rounded-md normal-case text-[.6rem]" 
        style="height: auto; margin: 0; padding: .4rem;" 
        type="number" 
        min="0" 
        step="1" 
        value="${data.iframeHeight}"
        oninput="
          if (document.getElementById('iframeWidth').value && this.value) {
            resizeCanvas(document.getElementById('iframeWidth').value + 'x' + this.value);
          }
        ">
        <span class="text-[.6rem] capitalize text-left ${data.selectedSize === 'none' ? 'hidden' : ''}">rotate</span>
        <button 
          aria-label="rotate canvas"
          name="rotate canvas" 
          class="bg-transparent border-0 p-0 px-2 text-center mr-1 ${data.selectedSize === 'none' ? 'hidden' : ''}"
          style="color: unset;"
          onclick="rotateCanvas()">
          ${icons.rotate}
        </button>
    </div>

    <div class="grid grid-cols-2 gap-1 items-center pt-2 capitalize">
      <span class="text-[.6rem] h-full capitalize">language</span>
      <select onchange="project.lang = this.value;" class="${selectClass}" style="padding: .5rem; background-image: none;">
        ${Object.keys(languages).map(lang => `
          <option value="${lang}">${languages[lang]}</option>
        `).join('')}
      </select>
    </div>
  `
    return html;
  };

  const processStyles = (stylesObject, selectorPrefix, key, detect = null) => {
    let styles = '';

    // Regular expression to detect color values
    const colorRegex = /^(#[0-9a-f]{3,6}|rgb?(.+)|hsl?(.+)|hsv?(.+))$/i;
    
    // List of properties that should use a textarea
    const complexProperties = [
        'background', 'background-image', 'box-shadow', 'text-shadow',
        'border', 'border-radius', 'border-image', 'filter', 'transform'
    ];

    Object.keys(stylesObject).forEach(prop => {
        let value = stylesObject[prop];
        let selector = `${selectorPrefix}['${prop}']`;

        // Check if the property has fixed values
        const predefinedValues = cssFixedValueProperties[prop];
        if (predefinedValues) {
            let options = predefinedValues.map(val => 
                `<option value="${val}" ${val === value ? 'selected' : ''}>${val}</option>`
            ).join('');

            styles += `
                <button 
                    class="${buttonItemClass.split('capitalize').join('')}" 
                    style="color: unset;" 
                    onclick="
                        styleModal('${key}', '${prop}', '${value}'${detect ? `, '${detect}'` : ''});
                ">
                    ${prop}
                </button>
                <select class="${selectClass}" style="${selectStyle}" onchange="${selector} = this.value; saveState();">
                    ${options}
                </select>`;
        } else if (cssRangedValueProperties[prop]) {
          const { min, max, step } = cssRangedValueProperties[prop];
      
          // Ensure valueParts and remainingParts are arrays, even if value is null or doesn't match
          const valueParts = value ? value.match(/-?\d*\.?\d+([a-z%]+|)/g) || [] : [];
          const remainingParts = value ? value.split(/-?\d*\.?\d+[a-z%]*/g).filter(Boolean) || [] : [];

          styles += `
              <button 
                  class="${buttonItemClass.split('capitalize').join('')}" 
                  style="color: unset;" 
                  onclick="
                      styleModal('${key}', '${prop}', '${value}'${detect ? `, '${detect}'` : ''});
              ">
                  ${prop}
              </button>
              <div class="grid gap-1 items-center capitalize">`;
      
          valueParts.forEach((part, index) => {
              const numericValue = parseFloat(part);
              const unitMatch = part.match(/[a-zA-Z%]+/);
              const unit = unitMatch ? unitMatch[0] : '';

              // Check if the current part contains `var()`
              const gridColsClass = part.includes('var(') ? 'grid-cols-1' : 'grid-cols-2';
      
              // Define valid units based on property
              let validUnits;
              switch (prop) {
                  case 'scale':
                  case 'rotate':
                  case 'translate':
                  case 'perspective':
                  case 'skew':
                      validUnits = ['', 'deg', 'rad']; // Example units for transform properties
                      break;
                  case 'animation-duration':
                  case 'transition-duration':
                      validUnits = ['', 'ms', 's']; // Example units for duration properties
                      break;
                  default:
                      validUnits = ['', 'px', '%', 'rem', 'em', 'vh', 'lvh', 'svh', 'dvh', 'vw', 'lvw', 'svw', 'dvw', 'ex', 'ch', 'vmin', 'vmax', 'cm', 'mm', 'in', 'pt', 'pc']; // Default units
                      break;
              }

              // Add a grid class per input field
              styles += `<div class="grid ${gridColsClass} gap-1">`;
      
              const selectElement = `<select class="${selectClass}" style="${selectStyle}" onchange="
                  const valueParts = ${selectorPrefix}['${prop}'].split(' ');
                  valueParts[${index}] = '${numericValue}' + this.value;
                  ${selector} = valueParts.join(' ')${remainingParts.length > 0 ? ` + ' ' + '${remainingParts.join(' ')}'` : ''};
                  saveState();
                  ">${validUnits.map(unitOption => 
                      `<option value="${unitOption}" ${unitOption === unit ? 'selected' : ''}>${unitOption}</option>`
                  ).join('')}</select>`;
      
              const rangeElement = `<input class="${inputClass}" style="${inputStyle}" 
                  type="range" min="${min}" max="${max}" step="${step}" value="${numericValue}"
                  oninput="const valueParts = ${selectorPrefix}['${prop}'].split(' ');
                  valueParts[${index}] = this.value + '${unit}';
                  ${selector} = valueParts.join(' ')${remainingParts.length > 0 ? ` + ' ' + '${remainingParts.join(' ')}'` : ''};"
                  onfocus="saveState();" onblur="saveState();">`;
      
              styles += `
                  <input class="${inputClass}" style="${inputStyle}" 
                      type="number" min="${min}" max="${max}" step="${step}" value="${numericValue}"
                      oninput="const valueParts = ${selectorPrefix}['${prop}'].split(' ');
                      valueParts[${index}] = this.value + '${unit}';
                      ${selector} = valueParts.join(' ')${remainingParts.length > 0 ? ` + ' ' + '${remainingParts.join(' ')}'` : ''};"
                      onfocus="saveState();" onblur="saveState();">
                  ${prop === 'opacity' || prop === 'z-index' ? rangeElement : selectElement}
                </div>`;
          });
      
          // Add a backup text input for cases where units aren't defined
          if (remainingParts.length > 0 || valueParts.length === 0) {
              styles += `
                  <input class="${inputClass}" style="${inputStyle}" 
                      type="text" value="${value}" 
                      oninput="${selector} = this.value;" onfocus="saveState()" onblur="saveState()">
              `;
          }
      
          styles += `</div>`;
        } else if (complexProperties.includes(prop)) {
            // Use a textarea for complex multi-line properties
            styles += `
                <button 
                    class="${buttonItemClass.split('capitalize').join('')}" 
                    style="color: unset;" 
                    onclick="
                        styleModal('${key}', '${prop}', '${value}'${detect ? `, '${detect}'` : ''});
                ">
                    ${prop}
                </button>
                <textarea class="${textareaClass}" style="${textareaStyle}"
                    oninput="${selector} = this.value;" onfocus="saveState()" onblur="saveState()">${value}</textarea>`;
        } else {
            // Check if the property is a color property
            const isColorProperty = colorRegex.test(value) || value === null;
            const fallbackColor = isColorProperty && value === null ? '#000000' : value;

            styles += `
                <button 
                  class="${buttonItemClass.split('capitalize').join('')}" 
                  style="color: unset;" 
                  onclick="
                    styleModal('${key}', '${prop}', '${value}'${detect ? `, '${detect}'` : ''});
                ">
                    ${prop}
                </button>
                <input 
                  class="${inputClass}" 
                  style="${inputStyle}" 
                  type="text" 
                  value="${fallbackColor}" 
                  ${isColorProperty ? `data-iscolor="${value}"` : ''}
                  oninput="${selector} = this.value;" 
                  onfocus="saveState()" 
                  onblur="saveState()"
                />`;
        }
    });

    return styles;
  };

  const generateRootVariablesSection = () => {
    let styles = '';
    
    // Regular expression to detect color values
    const colorRegex = /^(#[0-9a-f]{3,6}|rgb?(.+)|hsl?(.+)|hsv?(.+))$/i;

    // Iterate over each root variable
    Object.keys(project.css.rootVariables).forEach(key => {
      const value = project.css.rootVariables[key];
      const selector = `project.css.rootVariables['${key}']`;

      // Determine input type based on value
      const isColor = colorRegex.test(value);
      const isNumeric = !isNaN(parseFloat(value)) && isFinite(value);

      let inputType = 'text';
      let inputStyle = 'height: auto; margin: 0; padding: .4rem;';

      if (isNumeric) inputType = 'number';

      // Use processStyles function to generate styles for root variables
      styles += `
        <button 
          class="${buttonItemClass.split('capitalize').join('')}" 
          style="color: unset;" 
          onclick="modifyRootVariable('${key}')">
          ${key}
        </button>
        <input 
          class="${inputClass}"
          style="${inputStyle}" 
          type="${inputType}" 
          value="${value}"
          ${isColor ? `data-iscolor="${value}"` : ''}
          oninput="${selector} = this.value;" 
          onfocus="saveState()" 
          onblur="saveState()"
        />
      `;
    });

    return `
      <div class="border-0 border-b border-solid pb-2 mb-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
        <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
          <button class="${buttonItemClass}" style="color: unset;" onclick="data.rootVarsCollapsed = !data.rootVarsCollapsed">
            root css variables
          </button>
          <button 
            class="${buttonAddItemClass}" 
            style="color: unset;" 
            onclick="
              const id = '--' + generateId();
              project.css.rootVariables[id] = '';
            ">
            <svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
              <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-1 items-center py-2 ${data.rootVarsCollapsed ? 'hidden' : ''}">
          ${styles}
        </div>
      </div>
    `;
  };

  const generateStylesSection = () => {
    if (!commonLayerTag) data.stylesTarget = null;
    let targets = null;
    let styles = '';
    let activeStyle = null;
    if (commonLayerTag) {
      Object.keys(commonLayerTag).forEach(layerKey => {
        const layer = commonLayerTag[layerKey];
      });
    }
    
    let obj = null;
    if (data.breakpointKey) {
      obj = project.css.breakpoints[`${data.breakpointKey}px`];
    } else {
      obj = project.css.styles;
    }

    // Render targets within style
    let dropdown = `<select 
      class="${selectClass}" 
      style="${selectStyle}"
      onchange="
        data.stylesPropTarget = this.value;
      "
    >
      <option value="base" ${data.stylesPropTarget === 'base' ? 'selected' : ''}>base</option>
      <option value="pseudos" ${data.stylesPropTarget === 'pseudos' ? 'selected' : ''}>pseudos</option>
    </select>`;

    let buttonClass = '';
    Object.keys(obj).forEach(key => {
      if (data.stylesTarget && data.stylesTarget === key) {
        buttonClass = buttonItemClass.split('bg-transparent border-0').join('');
        activeStyle = key;
      } else {
        buttonClass = 'bg-transparent text-[.6rem] p-0 m-0 h-full capitalize text-left';
        activeStyle = null;
      }

      styles += `<button 
        aria-label="set style target to ${key}"
        name="set style target to ${key}"
        class="${buttonClass.split('capitalize').join('')} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}" ${activeStyle ? '' : 'style="color: unset;"'}
        onclick="data.stylesTarget = this.textContent.toString();">${key}</button>`;
    });

    return `<div class="border-0 border-b border-solid pb-2 mb-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
    <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
      <button class="${buttonItemClass}" style="color: unset;" onclick="data.stylesCollapsed = !data.stylesCollapsed;">
        styles
      </button>
      <button 
        class="${buttonAddItemClass}" 
        style="color: unset;"
        onclick="addStyle();">
        <svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
          <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-1 gap-1 items-center py-2 capitalize ${data.stylesCollapsed ? 'hidden' : ''}">
      ${data.stylesTarget ? `<div class="grid grid-cols-1 gap-1 items-center py-2">
        ${dropdown}
      </div>` : ''}
      <div class="grid grid-cols-2 gap-1 items-center py-2">
        ${styles}
      </div>
      ${data.stylesTarget ? `<div class="grid grid-cols-2 gap-1 items-center pb-2 capitalize">
        <button 
          aria-label="rename the ${data.stylesTarget} style"
          name="rename the ${data.stylesTarget} style"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-green-600 border-green-800" : "text-green-700 border-green-400"}"
          onclick="renameStyleTarget('${data.stylesTarget}');">
          rename
        </button>
        <button 
          aria-label="delete the ${data.stylesTarget} style"
          name="delete the ${data.stylesTarget} style"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-red-600 border-red-800" : "text-red-600 border-red-400"}"
          onclick="deleteStyleTarget('${data.stylesTarget}');">
          delete
        </button>
      </div>` : ''}
      ${data.stylesTarget ? `<div class="grid grid-cols-2 gap-1 items-center capitalize">
        <button 
          aria-label="duplicate the ${data.stylesTarget} style"
          name="duplicate the ${data.stylesTarget} style"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}"
          style="color: unset;"
          onclick="duplicateStyle();">
          duplicate
        </button>
        <button 
          aria-label="de-select the ${data.stylesTarget} style"
          name="de-select the ${data.stylesTarget} style"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}"
          style="color: unset;"
          onclick="
            data.stylesTarget = null;
            data.breakpointKey = null;
            clearAllSelections();
          ">
          de-select
        </button>
      </div>` : ''}
    </div>
  </div>`;
  };

  const generatePseudosSection = () => {
    if (!commonLayerTag) data.stylesTarget = null;
    let styles = '';
    let selector = '';
    let activeStyle = null;
    let buttonClass = '';
    if (commonLayerTag) {
      Object.keys(commonLayerTag).forEach(layerKey => {
        const layer = commonLayerTag[layerKey];
        if (!data.stylesTarget) {
          data.stylesTarget = layer.style;
        }
      });
    }

    // Target specific pseudo style
    if (data.stylesTarget && data.stylesPropTarget === "pseudos") {
      if (project.css.styles[data.stylesTarget].pseudos) {
        Object.keys(project.css.styles[data.stylesTarget].pseudos).forEach(index => {
          selector = project.css.styles[data.stylesTarget].pseudos[index].selector;
          if (data.pseudosSelector === selector) {
            buttonClass = buttonItemClass.split('bg-transparent border-0').join('');
            activeStyle = true;
            data.pseudosSelectorIndex = index;
          } else {
            buttonClass = 'bg-transparent text-[.6rem] p-0 m-0 h-full text-left';
            activeStyle = null;
          }
          styles += `<button 
            class="${buttonClass.split('capitalize').join('')} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}" ${activeStyle ? '' : 'style="color: unset;"'}
            onclick="data.pseudosSelector = this.textContent;">${selector}</button>`;
        });
      }
    }

    return `<div class="border-0 border-b border-solid pb-2 mb-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
    <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
      <button class="${buttonItemClass}" style="color: unset;" onclick="data.stylePseudosCollapsed = !data.stylePseudosCollapsed;">
        pseudos
      </button>
      <button class="${buttonAddItemClass}" style="color: unset;" onclick="addPseudo('${data.stylesTarget}')">
        <svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
          <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-1 gap-1 items-center py-2 capitalize ${data.stylePseudosCollapsed ? 'hidden' : ''}">
      ${data.stylesTarget ? `<div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
        ${styles}
      </div>` : ''}
      ${data.pseudosSelector && data.stylesTarget ? `
        <div class="grid grid-cols-2 gap-1 items-center pb-2 capitalize">
          <button 
            aria-label="Rename pseudo for ${data.breakpointKey}px"
            name="rename pseudo for ${data.breakpointKey}px"
            class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-green-600 border-green-800" : "text-green-700 border-green-400"}"
            onclick="renamePseudo('${data.pseudosSelector}');">
            Rename
          </button>
          <button 
            aria-label="Delete pseudo for ${data.breakpointKey}px"
            name="delete pseudo for ${data.breakpointKey}px"
            class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-red-600 border-red-800" : "text-red-600 border-red-400"}"
            onclick="deletePseudo();">
            Delete
          </button>
        </div>
      ` : ''}
      ${data.pseudosSelector && data.stylesTarget ? `
        <div class="grid grid-cols-1 gap-1 items-center capitalize">
          <button 
            aria-label="De-select the ${data.stylesTarget} style"
            name="de-select the ${data.stylesTarget} style"
            class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}"
            style="color: unset;"
            onclick="data.pseudosSelector = null;">
            De-select
          </button>
        </div>
      ` : ''}
    </div>
  </div>`;
  };

  const generateStylePropertiesSection = () => {
    let styles = '';
    let styleKey = null;

    if (commonLayerTag) {
      Object.keys(commonLayerTag).forEach(layerKey => {
        const layer = commonLayerTag[layerKey];
        styleKey = layer.style;
      });
    }

    let obj = project.css.styles;
    const detectStylesPropTarget = ['base', 'pseudos'];
    if (detectStylesPropTarget.includes(data.stylesPropTarget)) {
      Object.keys(obj).forEach(key => {
        if (styleKey === key || data.stylesTarget == key) {
          if (data.stylesPropTarget === 'pseudos') {
            const index = data.pseudosSelectorIndex;
            if (data.pseudosSelector) {
              if (obj[key].pseudos[index].styles) {
                styles += processStyles(obj[key].pseudos[index].styles, `project.css.styles['${key}'].pseudos['${index}'].styles`, key);
              }
            }
          } else {
            if (obj[key][data.stylesPropTarget]) {
              styles += processStyles(obj[key][data.stylesPropTarget], `project.css.styles['${key}']['${data.stylesPropTarget}']`, key);
            }
          }
        }
      });
    }

    let stylesObj = 'project.css.styles[data.stylesTarget][data.stylesPropTarget]';
    if (data.stylesPropTarget === "pseudos") {
      stylesObj = 'project.css.styles[data.stylesTarget][data.stylesPropTarget][data.pseudosSelectorIndex].styles';
    }

    return `<div class="border-0 border-b border-solid pb-2 mb-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
      <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
        <button class="${buttonItemClass}" style="color: unset;" onclick="data.stylePropsCollapsed = !data.stylePropsCollapsed;">
          style properties
        </button>
        <button 
          class="${buttonAddItemClass}" 
          style="color: unset;" 
          onclick="addStylePropModal('${data.stylesTarget}', ${stylesObj});">
          <svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
            <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize ${data.stylePropsCollapsed ? 'hidden' : ''}">
        ${styles}
      </div>
    </div>`;
  };

  const generateBreakpointsSection = () => {
    if (!commonLayerTag) data.stylesTarget = null;
    let styles = '';
    let activeStyle = null;
    if (commonLayerTag) {
      Object.keys(commonLayerTag).forEach(layerKey => {
        const layer = commonLayerTag[layerKey];
        if (!data.stylesTarget) {
          data.stylesTarget = layer.style;
        }
      });
    }

    let buttonClass = '';
    if (data.stylesTarget && project.css.breakpoints) {
      Object.keys(project.css.breakpoints).forEach(key => {
        if (data.breakpointKey === key.split('px').join('')) {
          buttonClass = buttonItemClass.split('bg-transparent border-0').join('');
          activeStyle = key;
        } else {
          buttonClass = 'bg-transparent text-[.6rem] p-0 m-0 h-full capitalize text-center';
          activeStyle = null;
        }
        styles += `<button 
          aria-label="target breakpoint styles for ${key}"
          name="target breakpoint styles for ${key}"
          class="${buttonClass.split('text-left').join('text-center')} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}" ${activeStyle ? '' : 'style="color: unset;"'}
          onclick="
            data.breakpointKey = this.textContent;
          ">${key.split('px').join('')}</button>`;
      });
    }

    return `<div class="border-0 border-b border-solid pb-2 mb-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
    <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
      <button class="${buttonItemClass}" style="color: unset;" onclick="data.breakpointsCollapsed = !data.breakpointsCollapsed;">
        breakpoints
      </button>
      <button 
        class="${buttonAddItemClass}" 
        style="color: unset;"
        onclick="addBreakpoint();">
        <svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
          <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-1 gap-1 items-center py-2 capitalize ${data.breakpointsCollapsed ? 'hidden' : ''}">
      ${data.stylesTarget && project.css.breakpoints ? `<div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
        ${styles}
      </div>` : ''}
      ${data.breakpointKey && data.stylesTarget && project.css.breakpoints ? `<div class="grid grid-cols-2 gap-1 items-center pb-2 capitalize">
        <button 
          aria-label="rename breakpoint styles for ${data.breakpointKey}px"
          name="rename breakpoint styles for ${data.breakpointKey}px"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-green-600 border-green-800" : "text-green-700 border-green-400"}"
          onclick="renameBreakpointKey('${data.breakpointKey}px');">
          rename
        </button>
        <button 
          aria-label="delete breakpoint styles for ${data.breakpointKey}px"
          name="delete breakpoint styles for ${data.breakpointKey}px"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-red-600 border-red-800" : "text-red-600 border-red-400"}"
          onclick="deleteBreakpointKey('${data.breakpointKey}px');">
          delete
        </button>
      </div>` : ''}
      ${data.breakpointKey && data.stylesTarget && project.css.breakpoints ? `<div class="grid grid-cols-1 gap-1 items-center capitalize">
        <button 
          aria-label="de-select the ${data.stylesTarget} style"
          name="de-select the ${data.stylesTarget} style"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}"
          style="color: unset;"
          onclick="data.breakpointKey = null;">
          de-select
        </button>
      </div>` : ''}
    </div>
  </div>`;
  };

  const generateBreakpointStylesSection = () => {
    if (!data.breakpointKey) return;
    let styles = '';
    let styleKey = null;

    if (commonLayerTag) {
      Object.keys(commonLayerTag).forEach(layerKey => {
        const layer = commonLayerTag[layerKey];
        styleKey = layer.style;
      });
    }

    let obj = project.css.breakpoints[`${data.breakpointKey}px`];

    const detectStylesPropTarget = ['base', 'pseudos'];
    if (detectStylesPropTarget.includes(data.stylesPropTarget)) {
      Object.keys(obj).forEach(key => {
        if (styleKey === key || data.stylesTarget == key) {
          if (data.stylesPropTarget === 'pseudos') {
            const index = data.pseudosSelectorIndex;
            if (data.pseudosSelector) {
              if (obj[key].pseudos[index].styles) {
                styles += processStyles(obj[key].pseudos[index].styles, `project.css.breakpoints['${data.breakpointKey}px']['${key}'].pseudos['${index}'].styles`, key, 'breakpoints');
              }
            }
          } else {
            if (obj[key][data.stylesPropTarget]) {
              styles += processStyles(obj[key][data.stylesPropTarget], `project.css.breakpoints['${data.breakpointKey}px']['${key}']['${data.stylesPropTarget}']`, key, 'breakpoints');
            }
          }
        }
      });
    }

    return `<div class="border-0 border-b border-solid pb-2 mb-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
      <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
        <button class="${buttonItemClass}" style="color: unset;" onclick="data.breakpointStylePropsCollapsed = !data.breakpointStylePropsCollapsed;">
          breakpoint styles
        </button>
        <button class="${buttonAddItemClass}" style="color: unset;" onclick="addStylePropModal('${styleKey}', project.css.breakpoints['${data.breakpointKey}px'][data.stylesTarget][data.stylesPropTarget]);">
          <svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
            <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize ${data.breakpointStylePropsCollapsed ? 'hidden' : ''}">
        ${styles}
      </div>
    </div>`;
  };

  const generateAnimationsSection = () => {
    if (!commonLayerTag) data.stylesTarget = null;
    let styles = '';
    let activeStyle = null;
    let buttonClass = '';
    if (commonLayerTag) {
      Object.keys(commonLayerTag).forEach(layerKey => {
        const layer = commonLayerTag[layerKey];
        if (!data.stylesTarget) {
          data.stylesTarget = layer.style;
        }
      });
    }

    if (data.stylesTarget && project.css.animations) {
      Object.keys(project.css.animations).forEach(key => {
        if (data.animationTarget === key) {
          buttonClass = buttonItemClass.split('bg-transparent border-0').join('');
          buttonClass = buttonClass.split('capitalize').join('normal-case');
          activeStyle = key;
        } else {
          buttonClass = 'bg-transparent text-[.6rem] p-0 m-0 h-full normal-case text-center';
          activeStyle = null;
        }
        styles += `<button 
          aria-label="target animation styles for ${key}"
          name="target animation styles for ${key}"
          class="${buttonClass.split('text-left').join('text-center')} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}" ${activeStyle ? '' : 'style="color: unset;"'}
          onclick="
            data.animationTarget = this.textContent;
          ">${key}</button>`;
      });
    }

    return `<div class="border-0 border-b border-solid pb-2 mb-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
    <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
      <button class="${buttonItemClass}" style="color: unset;" onclick="data.animationsCollapsed = !data.animationsCollapsed;">
        animations
      </button>
      <button 
        class="${buttonAddItemClass}" 
        style="color: unset;"
        onclick="addAnimation();">
        <svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
          <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-1 gap-1 items-center py-2 capitalize ${data.animationsCollapsed ? 'hidden' : ''}">
      ${data.stylesTarget && project.css.animations ? `<div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
        ${styles}
      </div>` : ''}
      ${data.animationTarget && project.css.animations ? `<div class="grid grid-cols-2 gap-1 items-center pb-2 capitalize">
        <button 
          aria-label="rename animation for ${data.animationTarget}"
          name="rename animation for ${data.animationTarget}"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-green-600 border-green-800" : "text-green-700 border-green-400"}"
          onclick="renameAnimation('${data.animationTarget}');">
          rename
        </button>
        <button 
          aria-label="delete animation for ${data.animationTarget}"
          name="delete animation for ${data.animationTarget}"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-red-600 border-red-800" : "text-red-600 border-red-400"}"
          onclick="deleteAnimation('${data.animationTarget}');">
          delete
        </button>
      </div>` : ''}
      ${data.animationTarget && project.css.animations ? `<div class="grid grid-cols-1 gap-1 items-center capitalize">
        <button 
          aria-label="de-select the ${data.animationTarget} animation"
          name="de-select the ${data.animationTarget} animation"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}"
          style="color: unset;"
          onclick="data.animationTarget = null;">
          de-select
        </button>
      </div>` : ''}
    </div>
  </div>`;
  };

  const generateAnimationPropertySection = () => {
    if (!commonLayerTag) data.stylesTarget = null;
    let content = '';
    let keyframes = '';
    let activeStyle = null;
    if (commonLayerTag) {
      Object.keys(commonLayerTag).forEach(layerKey => {
        const layer = commonLayerTag[layerKey];
        if (!data.stylesTarget) {
          data.stylesTarget = layer.style;
        }
      });
    }

    // Generate keyframes buttons
    if (data.animationTarget && project.css.animations && project.css.animations[data.animationTarget].keyframes) {
      Object.keys(project.css.animations[data.animationTarget].keyframes).forEach(key => {
        let buttonClass = '';
        if (data.animationKeyframe === key) {
          buttonClass = buttonItemClass.split('bg-transparent border-0').join('');
          isActive = true;
        } else {
          buttonClass = 'bg-transparent text-[.6rem] p-0 m-0 h-full capitalize text-center';
          isActive = null;
        }
        
        keyframes += `<button 
          aria-label="target keyframe styles for ${key}"
          name="target keyframe styles for ${key}"
          class="${buttonClass.split('text-left').join('text-center')} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}" ${isActive ? '' : 'style="color: unset;"'}
          onclick="
            data.animationKeyframe = null;
            data.animationKeyframe = '${key}';
          ">${key}</button>`;
      });
    }

    // Generate the styles for the active keyframe
    if (data.animationKeyframe && data.animationTarget && project.css.animations && project.css.animations[data.animationTarget].keyframes) {
      const activeKeyframe = project.css.animations[data.animationTarget].keyframes[data.animationKeyframe];
      content += processStyles(activeKeyframe, `project.css.animations['${data.animationTarget}'].keyframes['${data.animationKeyframe}']`, data.animationKeyframe, 'animations');
    }

    return `<div class="border-0 border-b border-solid pb-2 mb-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
    <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
      <button class="${buttonItemClass}" style="color: unset;" onclick="data.animationsCollapsed = !data.animationsCollapsed;">
        animation keyframes
      </button>
      <button 
        class="${buttonAddItemClass}" 
        style="color: unset;"
        onclick="addKeyFrame();">
        <svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
          <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      </button>
    </div>
    <div class="grid grid-cols-1 gap-1 items-center py-2 capitalize ${data.animationsCollapsed ? 'hidden' : ''}">
      ${data.animationTarget && project.css.animations ? `<div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
        ${keyframes}
      </div>` : ''}
      ${data.animationKeyframe && project.css.animations && project.css.animations[data.animationTarget].keyframes ? `<div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
        ${content}
      </div>` : ''}
      ${data.animationKeyframe && project.css.animations && project.css.animations[data.animationTarget].keyframes ? `<div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
        <button 
          aria-label="rename the "${data.animationKeyframe}" keyframe"
          name="rename the "${data.animationKeyframe}" keyframe"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-green-600 border-green-800" : "text-green-700 border-green-400"}"
          onclick="renameKeyFrame('${data.animationKeyframe}');">
          rename
        </button>
        <button 
          aria-label="delete the "${data.animationKeyframe}" keyframe"
          name="delete the "${data.animationKeyframe}" keyframe"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "text-red-600 border-red-800" : "text-red-600 border-red-400"}"
          onclick="deleteKeyFrame('${data.animationKeyframe}');">
          delete
        </button>
        <button 
          aria-label="add to the "${data.animationKeyframe}" keyframe"
          name="add to the "${data.animationKeyframe}" keyframe"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "border-blue-500" : "border-blue-400"}"
          style="color: unset;"
          onclick="addStylePropModal('${data.animationTarget}', project.css.animations[data.animationTarget].keyframes[data.animationKeyframe]);">
          ${icons.plus}
        </button>
        <button 
          aria-label="de-select the "${data.animationKeyframe}" keyframe"
          name="de-select the "${data.animationKeyframe}" keyframe"
          class="${RenameOrDeleteButtonClass} p-2 border ${project.dark ? "border-gray-700" : "border-gray-300"}"
          style="color: unset;"
          onclick="data.animationKeyframe = null;">
          de-select
        </button>
      </div>` : ''}
    </div>
  </div>`;
  };

  const generateAttributesSection = () => {
    if (selectedLayers.length === 0) return '';
    
    // Display common attributes
    let attributes = "",
        attributeTag = "",
        svgImage = "";
    if (commonLayerTag || selectedLayers.length === 1) {
      Object.keys(commonLayerTag).forEach(layerKey => {
        attributeTag = "";
        const layer = commonLayerTag[layerKey];
        const tag = layer.tag;
        
        // block name
        attributeTag += `
          <span class="${buttonItemClass}">Block Name</span>
          <input class="${inputClass}" style="${inputStyle}" type="text" value="${layer.name}" oninput="updateElement('name', null, this.value)" onfocus="saveState()" onblur="saveState()"/>
        `;
        
        // style reference
        attributeTag += `
          <span class="${buttonItemClass}">Style Ref</span>
          <input class="${inputClass}" style="${inputStyle}" type="text" value="${layer.style ? layer.style : ''}" onfocus="saveState()" onblur="updateElement('style', null, this.value); saveState();"/>
        `;
  
        // Determine block type and render the appropriate options
        let options = "";
        if (boxElements.includes(tag)) {
          options = boxElements.map(element => 
            `<option value="${element}" ${element === tag ? 'selected' : ''}>${element}</option>`
          ).join('');
        } else if (textElements.includes(tag)) {
          options = textElements.map(element => 
            `<option value="${element}" ${element === tag ? 'selected' : ''}>${element}</option>`
          ).join('');
        }  else if (breakElements.includes(tag)) {
          options = breakElements.map(element => 
            `<option value="${element}" ${element === tag ? 'selected' : ''}>${element}</option>`
          ).join('');
        } else {
          options = `<option value="${tag}" selected="true">${tag}</option>`;
        }
  
        if (options) {
          attributeTag += `
            <span class="${buttonItemClass}">tag</span>
            <select class="${selectClass}" style="${selectStyle}" onchange="saveState(); updateElement('tag', null, this.value); saveState();">
              ${options}
            </select>`;
        }
      
        if (tag === "svg" && selectedLayers.length === 1) {
          const elm = document.createElement("template");
          elm.innerHTML = json2html(layer);
          const element = elm.content.firstElementChild;
    
          if (element) {
            if (element.hasAttribute("style")) element.removeAttribute('style');
            element.removeAttribute("width");
            element.removeAttribute("height");
            element.setAttribute("class", mediaClass);
            element.setAttribute("onclick", `updateSvgMedia('${layer.id}', 'svg')`);
    
            svgImage += `
              <button class="${buttonItemClass}" style="color: unset;">svg</button>
              <div class="grid grid-cols-1 place-items-center">
                ${element.outerHTML}
              </div>
            `;
          }
    
          elm.remove();
        }
      });
    }
  
    if (Object.keys(commonAttributes).length > 0 || selectedLayers.length === 1) {
      svgImage ? attributes = svgImage + "" : attributes = "";
      const layer = selectedLayers[0];
      const tag = layer.tag;

      if (tag === "audio") {
        attributes += `
          <span class="${buttonItemClass.split('cursor-pointer').join('cursor-default')}" style="color: unset;">Replace Audio</span>
          <div class="grid grid-cols-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" preserveAspectRatio="xMidYMin" class="cursor-pointer w-full my-2 rounded-md" onclick="updateAudioMedia('${layer.id}', 'audio')">
              <rect width="256" height="256" fill="rgb(248,255,247)"/>
              <g transform="translate(128, 128) scale(0.5) translate(-128, -128)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#13171f">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                </svg>
              </g>
            </svg>
          </div>
        `;
      }
  
      if (layer.props) {
        // Generate the attributes section dynamically based on layer
        Object.keys(commonAttributes).forEach(propKey => {
          let name = propKey;
          const value = commonAttributes[propKey];
  
          const textAreaAttributes = ["on", '@', "x-", ":"];
          const lowerPropKey = propKey.toLowerCase();
  
          // Handle different types of attributes
          if (booleanAttributes.includes(name)) {
            attributes += renderBooleanAttribute(propKey, commonAttributes[propKey]);
          } else if (lowerPropKey === "style" || lowerPropKey === "class") {
            attributes += renderTextarea(propKey, commonAttributes[propKey]);
          } else if (textAreaAttributes.some(attr => lowerPropKey.startsWith(attr))) {
            attributes += renderTextarea(propKey, commonAttributes[propKey]);
          } else if (tag === "input") {
            if (name === "required") {
              attributes += renderBooleanAttribute(propKey, commonAttributes[propKey]);
            }
            
            let nodeType = "text";
            for (let numAttr of numberAttributes) {
              if (name === numAttr) {
                nodeType = "number";
              }
            }
            for (let string of stringAttributes) {
              if (name === string) {
                nodeType = "text";
              }
            }
            if (name === "value") {
              for (let inputType of inputTypes) {
                if (layer.props.type) {
                  if (layer.props.type === inputType) {
                    nodeType = layer.props.type.toLowerCase();
                  }
                  if (layer.props.type === "range") {
                    nodeType = "number";
                  }
                }
              }
            }
            if (name === "type") {
              let options = '';
              for (let string of inputTypes) {
                options += `<option class="${inputClass}" value="${string}" ${(value === string ? "selected" : "")}>${string}</option>`;
              }
  
              attributes += `
                <button class="${buttonItemClass}" style="color: unset;" onclick="removeProp('${propKey}')">${propKey}</button>
                <select class="${selectClass}" style="${selectStyle}" onchange="updateElement('props', '${propKey}', this.value); saveState();">
                  ${options}
                </select>
              `;
            } else {
              attributes += renderInput(propKey, 'text', commonAttributes[propKey]);
            }
          } else if (tag === "button") {
            if (name === "type") {
              attributes += `
                <button class="${buttonItemClass}" style="color: unset;" onclick="removeProp('${propKey}')">${propKey}</button>
                <select class="${selectClass}" style="${selectStyle}" onchange="updateElement('props', '${propKey}', this.value); saveState();">
                  <option class="${inputClass}" value="submit" ${value === name ? 'selected' : ''}>submit</option>
                  <option class="${inputClass}" value="reset" ${value === name ? 'selected' : ''}>reset</option>
                  <option class="${inputClass}" value="button" ${value === name ? 'selected' : ''}>button</option>
                </select>
              `;
            } else if (name === "role") {
              attributes += renderBooleanAttribute(propKey, commonAttributes[propKey]);
            } else {
              attributes += renderInput(propKey, 'text', commonAttributes[propKey]);
            }
          } else if (tag === "a") {
            if (name === "target") {
              attributes += `
                <button class="${buttonItemClass}" style="color: unset;" onclick="removeProp('${propKey}')">${propKey}</button>
                <select class="${selectClass}" style="${selectStyle}" onchange="updateElement('props', '${propKey}', this.value); saveState();">
                  <option class="${inputClass}" value="_blank" ${value === name ? 'selected' : ''}>_blank</option>
                  <option class="${inputClass}" value="_self" ${value === name ? 'selected' : ''}>_self</option>
                  <option class="${inputClass}" value="_parent" ${value === name ? 'selected' : ''}>_parent</option>
                  <option class="${inputClass}" value="_top" ${value === name ? 'selected' : ''}>_top</option>
                </select>
              `;
            } else {
              attributes += renderInput(propKey, 'text', commonAttributes[propKey]);
            }
          } else if (tag === "img") {
            let numTypes = ["width", "height"];
            if (numTypes.includes(name)) {
              let type = "text";
              for (let numType of numTypes) {
                if (name === numType) {
                  type = "number";
                }
              }
              attributes += renderInput(propKey, 'text', commonAttributes[propKey]);
            } else if (name === "src") {
              attributes += `
                <button class="${buttonItemClass}" style="color: unset;" onclick="removeProp('${propKey}')">${propKey}</button>
                <div class="grid grid-cols-1">
                  <img class="${mediaClass}" src="${value}" onclick="updateImageMedia('${layer.id}', 'img')">
                  <input class="${inputClass}" style="${inputStyle}" type="text" value="${value}" oninput="updateElement('props', '${propKey}', this.value)" onfocus="saveState()" onblur="saveState()"/>
                </div>
              `;
            } else {
              attributes += renderInput(propKey, 'text', commonAttributes[propKey]);
            }
          } else if (tag === "svg") {
            let numTypes = ["stroke-width"];
            let type = "text";
            for (let numType of numTypes) {
              if (name === numType) {
                type = "number";
              }
            }
            attributes += renderInput(propKey, 'text', commonAttributes[propKey]);
          } else if (tag === "form") {
            if (name === "method") {
              attributes += `
                <button class="${buttonItemClass}" style="color: unset;" onclick="removeProp('${propKey}')">${propKey}</button>
                <select class="${selectClass}" style="${selectStyle}" onchange="updateElement('props', '${propKey}', this.value); saveState();">
                  <option class="${inputClass}" value="GET" ${value === name ? 'selected' : ''}>GET</option>
                  <option class="${inputClass}" value="POST" ${value === name ? 'selected' : ''}>POST</option>
                  <option class="${inputClass}" value="PUT" ${value === name ? 'selected' : ''}>PUT</option>
                  <option class="${inputClass}" value="DELETE" ${value === name ? 'selected' : ''}>DELETE</option>
                </select>
              `;
            } else {
              attributes += renderInput(propKey, 'text', commonAttributes[propKey]);
            }
          } else {
            attributes += renderInput(propKey, 'text', commonAttributes[propKey]);
          }
        });
      }
    }

    if (Object.keys(commonAttributes).length > 0 || selectedLayers.length >= 0) {
      const layer = selectedLayers[0];
      const tag = layer.tag;

      if ("text" in layer || layer.text) {
        if (tag === "style" || tag === "script") {
          attributes += `
            <span class="${buttonItemClass}">text</span>
            <textarea 
              class="${textareaClass}" 
              style="${textareaStyle}" 
              oninput="updateElement('text', null, this.value)" 
              onfocus="saveState()" 
              onblur="saveState()"/>${layer.text}</textarea>
          `;
        } else {
          attributes += `
            <span class="${buttonItemClass}">text</span>
            <textarea 
              class="${textareaClass}" 
              style="${textareaStyle}" 
              placeholder="Use {n} for incremental text" 
              oninput="updateElement('text', null, this.value, true)" 
              onfocus="saveState()" 
              onblur="saveState()"/>${layer.text}</textarea>
          `;
        }
      }
    }
  
    if (selectedLayers.length > 0) {
      return `<div class="border-0 border-b border-solid pb-2 mb-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
        <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize">
          <button class="${buttonItemClass}" style="color: unset;" onclick="data.propsCollapsed = !data.propsCollapsed;">
            attributes
          </button>
          <button class="${buttonAddItemClass}" style="color: unset;" onclick="attributesModal();">
            <svg class="w-3" viewBox="0 0 576 512" style="color: unset;">
              <path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
            </svg>
          </button>
        </div>
        <div class="grid grid-cols-2 gap-1 items-center py-2 capitalize ${data.propsCollapsed ? 'hidden' : ''}">
          ${attributeTag + attributes}
        </div>
      </div>`;
    }
  }

  // Combine all sections
  const inspectorHtml = `
    <div>
      ${generatePreviewSize()}
      ${generateRootVariablesSection()}
      ${generateStylesSection()}
      ${data.stylesTarget && data.stylesPropTarget === "pseudos" ? generatePseudosSection() : ''}
      ${data.stylesTarget ? generateStylePropertiesSection() : ''}
      ${data.stylesTarget ? generateBreakpointsSection() : ''}
      ${data.breakpointKey ? generateBreakpointStylesSection() : ''}
      ${data.stylesTarget ? generateAnimationsSection() : ''}
      ${data.animationTarget ? generateAnimationPropertySection() : ''}
      ${generateAttributesSection()}
    </div>
  `;

  return inspectorHtml;
}
function editorNav() {
  const buttonClass = "border-0 bg-transparent py-1";

  return `<button 
      aria-label="delete layer"
      name="delete layer" 
      class="${buttonClass}"
      style="color: unset;"
      onclick="deleteLayers()"
    >
      ${icons.trash}
    </button>
    <button 
      aria-label="clone layer"
      name="clone layer" 
      class="${buttonClass}"
      style="color: unset;"
      onclick="cloneLayers()"
    >
      ${icons.clone}
    </button>
    <button 
      aria-label="cut layer"
      name="cut layer" 
      class="${buttonClass}"
      style="color: unset;"
      onclick="cutLayers()"
    >
      ${icons.cut}
    </button>
    <button 
      aria-label="copy layer"
      name="copy layer" 
      class="${buttonClass}"
      style="color: unset;"
      onclick="copyLayers()"
    >
      ${icons.copy}
    </button>
    <button 
      aria-label="paste layer"
      name="paste layer" 
      class="${buttonClass}"
      style="color: unset;"
      onclick="pasteLayers()"
    >
      ${icons.paste}
    </button>`;
}
window.Modal = {
  render({
    large,
    title = "Are you sure you want to proceed?",
    content,
    CloseLabel,
    ConfirmLabel,
    onLoad,
    onClose,
    onConfirm
  }) {
    // if (!options) return false;
    const hClass = "text-lg font-thin m-0";
    const buttonClass = "text-xs w-auto px-3 py-2 m-0 capitalize rounded-md";
    const svgClass = "w-3";
    const times = `<svg class="${svgClass}" viewBox="0 0 384 512">
        <path 
          fill="currentColor" 
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
      </svg>`;

    const html = `<article class="${large ? 'flex flex-col h-3/4' : ''} rounded-md">
      <header class="${large ? 'flex-none' : ''} flex justify-between items-center">
        <h1 class="${hClass}">${title}</h1>
        <button class="${buttonClass} bg-transparent border-0" style="color: unset;" aria-label="Close">
          ${times}
        </button>
      </header>
      <main class="font-thin ${large ? 'flex-grow' : ''}">
        ${content ? content : ''}
      </main>
      <footer ${large ? 'class="flex-none"' : ''}>
        <button class="${buttonClass} bg-transparent border ${project.dark ? 'border-gray-600' : 'border-gray-200'}" style="color: unset;" aria-label="Close" onclick="this.closest('dialog').remove()">${CloseLabel ? CloseLabel : 'close'}</button>
        ${onConfirm ? `<button class="${buttonClass}" aria-label="Confirm">${ConfirmLabel ? ConfirmLabel : 'confirm'}</button>` : ''}
      </footer>
    </article>`;

    const modal = document.createElement('dialog');
    modal.open = true;
    modal.innerHTML = html;

    document.body.appendChild(modal);
    if (onLoad && typeof onLoad === 'function') {
      onLoad();
    }

    const timesBtn = modal.querySelector('header button');
    const closeBtn = modal.querySelector('footer button:first-child');
    const confirmBtn = modal.querySelector('footer button:last-child');

    // Confirm handler function
    timesBtn.onclick = function() {
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
      document.body.removeChild(modal);
    }
    closeBtn.onclick = function() {
      if (onClose && typeof onClose === 'function') {
        onClose();
      }
      document.body.removeChild(modal);
    }
    confirmBtn.onclick = function() {
      if (onConfirm && typeof onConfirm === 'function') {
        onConfirm();
      }
      document.body.removeChild(modal);
    }
  }
}
window.Blocks = () => {
  const btnClass = `bg-transparent p-4 text-xs cursor-pointer capitalize`;

  let blockItem = '', componentItem = '';

  data.blocks.items.forEach((block, index) => {
    blockItem += `
      <button 
        class="${btnClass} border border-solid text-center rounded-md ${project.dark ? "border-gray-800" : "border-gray-200"}"
        style="color: unset;"
        onclick="addBlock(data.blocks.items[${index}].code);"
      >
        ${block.type}
      </button>`;
  });

  project.components.forEach((component, index) => {
    componentItem += `
      <div class="flex justify-between w-full h-full border border-solid rounded-md ${project.dark ? "border-gray-800" : "border-gray-200"}">
        <button 
          class="bg-transparent border-0 text-xs capitalize m-0 py-4 px-2"
          style="color: unset;"
          onclick="addBlock(project.components[${index}].code);"
        >
          ${component.name}
        </button>

        <button 
          class="bg-transparent border-0 text-xs capitalize m-0 py-4 px-2"
          style="color: unset;"
          onclick="deleteComponent('${index}');"
        >
          ${icons.trash}
        </button>
      </div>`;
  });

  let modalContent = `<nav class="select-none items-center" style="padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal); margin: var(--pico-spacing);">
    <label for='j44mb4rqj' class="font-thin cursor-pointer">${data.blockWrap ? "Blocks will be parent's of selected layers." : "Blocks are added as children"}</label>
    <input id='j44mb4rqj' type="checkbox" role="switch" ${data.blockWrap ? 'checked="true" ' : ''}onchange="
      data.blockWrap = !data.blockWrap;
      let result = data.blockWrap ? \`Blocks will be parent's of selected layers.\` : \`Blocks are added as children\`;
      this.previousElementSibling.textContent = result;
    ">
  </nav>
  
    <section class="select-none font-thin" style="padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal); margin: var(--pico-spacing);">
      <div class="p-0 m-0">
        <details class="block mb-0" ${data.blocks.visible ? 'open' : ''} ontoggle="
          const detailsElement = this;
          data.blocks.visible = detailsElement.hasAttribute('open');
        ">
          <summary class="block">
            ${data.blocks.name}
          </summary>
          <code class="grid grid-cols-2 gap-2 mb-0 bg-transparent">
            ${blockItem}

            <button 
              class="${btnClass} ${project.dark ? "border-gray-800" : "border-gray-200"}"
              style="color: unset;"
              onclick="customCode()"
            >
              Custom
            </button>
          </code>
        </details>
      </div>
    </section>
    
    <section class="select-none font-thin" style="padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal); margin: var(--pico-spacing);">
      <div class="p-0 m-0">
        <details class="block mb-0" ${data.componentsVisible ? 'open' : ''} ontoggle="
          const detailsElement = this;
          data.blocks.visible = detailsElement.hasAttribute('open');
        ">
        <summary class="block">
          Components
        </summary>
        <code class="grid grid-cols-2 gap-2 mb-0 bg-transparent">
          ${componentItem}

          <button 
            class="${btnClass} ${project.dark ? "border-gray-800" : "border-gray-200"}"
            style="color: unset;"
            onclick="addComponent()"
          >
            ${icons.plus}
          </button>
        </code>
      </details>
    </div>
  </section>`;

  // Render the modal
  Modal.render({
    title: `Add A Block`,
    content: modalContent
  });
}
window.App = {
  initialRender: true,
  render(container) {
    if (data.doNotRender) return;
    const buttonClass = "border-0 bg-transparent py-1";
    // Calculate zoom transform based on viewport size and iframe size
    const size = data.selectedSize;
    let viewportWidth, viewportHeight;
    const previewElm = document.getElementById('previewElm');
    if (document.getElementById('previewElm')) {
      viewportWidth = previewElm.clientWidth;
      viewportHeight = previewElm.clientHeight;
    }
    let [width, height] = size.split('x').map(Number);
  
    const html = `
      <div>
        <div class="absolute inset-y-0 left-0 flex flex-col text-center justify-between px-2 py-4 overflow-auto">
          ${LeftMenubar()}
        </div>
        
        <!-- flexbox for panels and preview -->
        <div class="flex flex-col flex-col-reverse md:flex-row absolute inset-y-0 right-0 left-16 bottom-0 overflow-hidden">
          <div class="flex-[2] md:flex-[1] relative w-full md:w-96 h-full text-sm overflow-auto ${project.activePanel ? `border-0 border-l border-solid ${project.dark ? "border-gray-800" : "border-gray-200"}` : 'hidden'}">
            <div class="absolute inset-0 flex flex-col ${project.activePanel === 'layers' ? '' : 'hidden'}">
              <ul class="flex-grow p-2 m-0 overflow-auto">
                ${LayerTree()}
              </ul>
              <div class="flex-none border-0 border-y md:border-b-0 border-solid ${project.dark ? "border-gray-800" : "border-gray-200"}">
                <div class="flex justify-between">
                  <div class="flex justify-between">
                    <button
                      aria-label="undo"
                      name="undo"
                      class="${buttonClass} md:hidden"
                      style="color: unset;"
                      onclick="undo()"
                      ${data.historyIndex > 0 ? '' : 'disabled="true"'}>
                      ${icons.undo}
                    </button>
                    <button
                      aria-label="toggle ctrl key"
                      name="toggle ctrl key"
                      class="${buttonClass} ${data.cmdKey ? 'text-blue-500' : ''}" 
                      style="${data.cmdKey ? '' : 'color: unset;'}"
                      onclick="data.cmdKey = !data.cmdKey;">
                      <span class="text-[.75rem]">ctrl</span>
                    </button>
                    <button
                      aria-label="toggle shift key"
                      name="toggle shift key"
                      class="${buttonClass} ${data.shiftKey ? 'text-blue-500' : ''}"
                      style="${data.shiftKey ? '' : 'color: unset;'}"
                      onclick="data.shiftKey = !data.shiftKey;">
                      ${icons.shift}
                    </button>
                  </div>
                  <div class="md:hidden flex justify-between whitespace-nowrap overflow-auto ${data.selectedLayerIds.length === 0 ? 'hidden' : ''}">
                    ${editorNav()}
                  </div>
                  <div class="flex justify-between">
                    <button 
                      aria-label="open command palette"
                      name="open command palette"
                      class="${buttonClass} ${data.cmdKey ? 'text-blue-500' : ''}" 
                      style="${data.cmdKey ? '' : 'color: unset;'}"
                      onclick="commandPalette();">
                      ${icons.commandKey}
                    </button>
                    <button
                      aria-label="redo"
                      name="redo"
                      class="${buttonClass} md:hidden"
                      style="color: unset;"
                      onclick="redo()"
                      ${data.historyIndex < data.history.length - 1 ? '' : 'disabled="true"'}>
                      ${icons.redo}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute inset-0 flex flex-col ${project.activePanel === 'inspector' ? '' : 'hidden'}">
              <ul class="flex-grow p-2 m-0 overflow-auto">
                ${Inspector()}
              </ul>
              <div class="flex-none border-0 border-y md:border-b-0 border-solid ${project.dark ? "border-gray-800" : "border-gray-200"}">
                <div class="flex justify-between">
                  <div>
                    <button
                      aria-label="undo"
                      name="undo"
                      class="${buttonClass} md:hidden"
                      style="color: unset;"
                      onclick="undo()"
                      ${data.historyIndex > 0 ? '' : 'disabled="true"'}>
                      ${icons.undo}
                    </button>
                  </div>
                  <div>
                    <button
                      aria-label="toggle ctrl key"
                      name="toggle ctrl key"
                      class="${buttonClass} ${data.cmdKey ? 'text-blue-500' : ''}" 
                      style="${data.cmdKey ? '' : 'color: unset;'}"
                      onclick="data.cmdKey = !data.cmdKey;">
                      <span class="text-[.75rem]">ctrl</span>
                    </button>
                    <button
                      aria-label="toggle shift key"
                      name="toggle shift key"
                      class="${buttonClass} ${data.shiftKey ? 'text-blue-500' : ''}"
                      style="${data.shiftKey ? '' : 'color: unset;'}"
                      onclick="data.shiftKey = !data.shiftKey;">
                      ${icons.shift}
                    </button>
                    <button
                      aria-label="redo"
                      name="redo"
                      class="${buttonClass} md:hidden"
                      style="color: unset;"
                      onclick="redo()"
                      ${data.historyIndex < data.history.length - 1 ? '' : 'disabled="true"'}>
                      ${icons.redo}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex-[2] w-full overflow-hidden flex">
            <div class="relative w-full h-full border-0 border-x border-solid overflow-auto p-4 ${project.dark ? "border-gray-800" : "border-gray-200"}">
              <div class="absolute inset-0 flex flex-col">
                <div class="flex-grow overflow-hidden h-full">
                  <div id="previewElm" class="relative grid grid-cols-1 align-center items-center w-full h-full">
                    <iframe
                      id="iframe"
                      title="iframe title"
                      class="bg-white ${data.selectedSize !== 'none' ? `border border-solid ${project.dark ? "border-gray-800" : "border-gray-200"} shadow-2xl shadow-blue-500` : ''}"
                      style="${data.selectedSize === 'none' ? 'width: 100%; height: 100%' : `
      width: ${width}px;
      height: ${height}px;
      transform: scale(${Math.min(viewportWidth / width, viewportHeight / height)});
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -${height / 2}px;
      margin-left: -${width / 2}px;`}"
                      allow="accelerometer *; bluetooth *; camera *; encrypted-media *; display-capture *; geolocation *; gyroscope *; microphone *; midi *; clipboard-read *; clipboard-write *; serial *; xr-spatial-tracking *"
                      allowfullscreen="true"
                      allowpaymentrequest="true"
                      allowtransparency="true"
                      sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups-to-escape-sandbox allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                      loading="lazy"
                    ></iframe>

                    <span 
                      id="iframeClientSize" 
                      class="hidden opacity-0 transition-opacity duration-300 absolute top-0 right-0 ${project.dark ? 'bg-gray-800' : 'bg-gray-200'} p-1 text-xs">
                        ${data.iframeSize}
                    </span>
                  </div>
                </div>
                <div class="hidden md:block flex-none border-0 border-y md:border-b-0 border-solid ${project.dark ? "border-gray-800" : "border-gray-200"}">
                  <div class="flex justify-between">
                    <div>
                      <button
                        aria-label="undo"
                        name="undo"
                        class="${buttonClass}"
                        style="color: unset;"
                        onclick="undo()"
                        ${data.historyIndex > 0 ? '' : 'disabled="true"'}>
                        ${icons.undo}
                      </button>
                    </div>
                    
                    <div class="flex justify-between whitespace-nowrap overflow-auto ${data.selectedLayerIds.length === 0 ? 'hidden' : ''}">
                      ${editorNav()}
                    </div>

                    <button
                      aria-label="redo"
                      name="redo"
                      class="${buttonClass}"
                      style="color: unset;"
                      onclick="redo()"
                      ${data.historyIndex < data.history.length - 1 ? '' : 'disabled="true"'}>
                      ${icons.redo}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div
            class="flex-[1] hidden ${project.activePanel === 'layers' ? 'lg:block' : ''} w-full md:w-96 h-full p-2 text-sm overflow-auto">
            <div class="h-full">
              ${Inspector()}
            </div>
          </div>
        </div>

        ${Menu()}
        ${Settings()}
      </div>`;
    
    const element = document.querySelector(container);
    if (!element) return;

    // Create a new temporary element to compare
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    if (doc.body.innerHTML.trim() === html.trim()) return;
    if (App.initialRender) {
      element.innerHTML = html;
      renderPreview(true);
      App.initialRender = false;
      return false;
    }

    const oldPickers = document.querySelectorAll('.pcr-app');
    if (oldPickers) oldPickers.forEach(picker => picker.remove());

    // Compare and update only the changed parts
    const currentDoc = element.firstElementChild;
    const newDoc = doc.body.firstElementChild;
    diffNodes(currentDoc, newDoc);

    // Select all elements with the data-color-picker attribute
    const pickers = document.querySelectorAll('[data-iscolor]');

    if (pickers) {
      pickers.forEach((picker, index) => {
        // Extract the initial color value from the data-iscolor attribute
        const initialColor = picker.getAttribute('data-iscolor');
        
        const pickr = Pickr.create({
          el: picker,
          theme: 'nano', // or 'monolith', or 'nano'
          default: initialColor,
          inline: true,
          components: {
            // Main components
            preview: true,
            opacity: true,
            hue: true,
  
            // Input / output Options
            interaction: {
              input: true
            }
          }
        });

        // Set the initial color
        pickr.setColor(initialColor);
  
        // Update color display and state on color change
        pickr.on('show', () => {
          data.doNotRender = true;
        })
        .on('change', color => {
          const colorString = color.toHEXA().toString();
          
          // Get the oninput attribute value
          const onInputCode = pickers[index].getAttribute('oninput');
        
          if (onInputCode) {
            // Replace 'this.value' with the actual color string
            const updatedCode = onInputCode.replace(/this.value/g, `"${colorString}"`);
        
            // Create a new function using the Function constructor and execute it
            const func = new Function(updatedCode);
            func(); // Execute the dynamically created function
          }
        
          // Apply color
          pickr.applyColor();
        })
        .on('hide', () => {
          data.doNotRender = null;
          pickr.applyColor();
          App.render('#app');
        })
      });
    }
  }
}

// Inspector functions
window.modifyRootVariable = id => {
  let modalContent = `<div class="p-4grid grid-cols-1 gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="mb-2 text-left">Name: </div>
          <input 
            id="m7t85jokv" 
            type="text" 
            value="${id}" 
            placeholder="-- added automatically" 
            onkeydown="
              if (event.key === 'Enter') {
                document.getElementById('hbo1luvti').focus();
              }
          ">
        </div>
        <div>
          <div class="mb-2 text-right">Value: </div>
          <input 
            id="hbo1luvti" 
            type="text" 
            value="${project.css.rootVariables[id]}" 
            placeholder="variable value" 
            onkeydown="
            if (event.key === 'Enter') {
              document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
            }
          ">
          <select 
            id="c15au9cn8" 
            onchange="
              document.getElementById('hbo1luvti').setAttribute('type', this.value);
            "
          >
            <option value="text">text</option>
            <option value="number">number</option>
            <option value="color">color</option>
          </select>
        </div>
      </div>
      <div class="text-center">
        <button 
          class="w-full border-red-400 text-red-400 rounded-md py-2 mt-4 bg-transparent font-thin" 
          onclick="
            saveState();
            delete project.css.rootVariables['${id}']; 
            saveState();
            document.querySelector('dialog[open]').querySelector('header > button:last-child').onclick();
          ">
          Delete Variable
        </button>
      </div>
    </div>`;

  Modal.render({
    title: `Are you sure you want to rename the "${id.substring(2)}" root variable?`,
    content: modalContent,
    onLoad() {
      document.getElementById('m7t85jokv').focus();
      document.getElementById('m7t85jokv').select();
    },
    onConfirm() {
      let newValue = document.getElementById('hbo1luvti').value;
      let name = document.getElementById('m7t85jokv').value;
      // Convert the first character to lowercase
      name = name.charAt(0).toLowerCase() + name.slice(1);

      if (name) {
        if (!name.startsWith('--')) {
          name = '--' + name;
        }
        // Convert the first character after '--' to lowercase
        let newName = name.substring(0, 2) + name.charAt(2).toLowerCase() + name.slice(3);
        
        if (project.css.rootVariables[newName]) {
          // Update existsing value
          project.css.rootVariables[newName] = newValue;
          App.render('#app');
        } else {
          saveState();

          // Clone the style object
          project.css.rootVariables[newName] = JSON.parse(JSON.stringify(project.css.rootVariables[`${id}`]));
  
          // Update the variable with the new value
          project.css.rootVariables[newName] = newValue; // Assign the new value to the variable

          // Now delete the old style object
          delete project.css.rootVariables[`${id}`];
          localStorage.setItem('Polyrise', JSON.stringify(project));

          saveState();
        }
      } else {
        Modal.render({
          title: `Unable to rename variable`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.addStyle = () => {
  let modalContent = `
    <input 
      id="vvrh9nxwk" 
      type="text" 
      value=".${generateId()}"
      placeholder="Style name/target..."
      onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      ">
  `;
  
  // Render the modal
  Modal.render({
    title: `Add A Style`,
    content: modalContent,
    onLoad() {
      document.getElementById('vvrh9nxwk').focus();
      document.getElementById('vvrh9nxwk').select();
    },
    onConfirm() {
      let value = document.getElementById('vvrh9nxwk').value;
      if (value) {
        // Convert the first character to lowercase
        value = value.charAt(0).toLowerCase() + value.slice(1);
        
        let obj = project.css.styles;
        if (data.breakpointKey && data.stylesTarget) {
          obj = project.css.breakpoints[`${data.breakpointKey}px`];
        }

        if (obj[`${value}`]) {
          Modal.render({
            title: `Unable to add style!`,
            content: "Style already exists!"
          });
        } else {
          obj[value] = {
            "base": {},
            "pseudos": []
          };
        }
      } else {
        Modal.render({
          title: `Unable to add style`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.duplicateStyle = () => {
  let modalContent = `
    <input 
      id="vvrh9nxwk" 
      type="text" 
      value=".${generateId()}"
      placeholder="Style name/target..."
      onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      ">
  `;
  
  // Render the modal
  Modal.render({
    title: `Name your style`,
    content: modalContent,
    onLoad() {
      document.getElementById('vvrh9nxwk').focus();
      document.getElementById('vvrh9nxwk').select();
    },
    onConfirm() {
      let value = document.getElementById('vvrh9nxwk').value;
      if (value) {
        // Convert the first character to lowercase
        value = value.charAt(0).toLowerCase() + value.slice(1);
        
        let obj = project.css.styles;
        if (data.breakpointKey && data.stylesTarget) {
          obj = project.css.breakpoints[`${data.breakpointKey}px`];
        }

        if (obj[`${value}`]) {
          Modal.render({
            title: `Unable to add style!`,
            content: "Style already exists!"
          });
        } else {
          obj[value] = obj[data.stylesTarget];
        }
      } else {
        Modal.render({
          title: `Unable to add style`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.addStylePropModal = (id, obj) => {
  // Define default values for each property type
  const defaultValues = data.defaultValues;

  // Sort and categorize properties
  const rootVariables = Object.keys(project.css.rootVariables).sort();
  const fixedValueProperties = Object.keys(data.cssFixedValueProperties).sort();
  const rangedValueProperties = Object.keys(data.cssRangedValueProperties).sort();

  // Generate options grouped by category
  const rootVariableOptions = rootVariables.map(prop => `
    <option value="${prop}">${prop}</option>
  `).join('');

  const fixedValuePropertyOptions = fixedValueProperties.map(prop => `
    <option value="${prop}">${prop}</option>
  `).join('');

  const rangedValuePropertyOptions = rangedValueProperties.map(prop => `
    <option value="${prop}">${prop}</option>
  `).join('');

  const modalContent = `
    <div class="p-4">
      <label class="block mb-2">Select Property Type:</label>
      <select id="property-type" class="w-full rounded-md capitalize text-[.6rem]">
        <option value="">-- Select a property --</option>
        <optgroup label="Root Variables">
          ${rootVariableOptions}
        </optgroup>
        <optgroup label="Fixed Value Properties">
          ${fixedValuePropertyOptions}
        </optgroup>
        <optgroup label="Ranged Value Properties">
          ${rangedValuePropertyOptions}
        </optgroup>
      </select>
      <div id="property-details-section" class="mt-4">
        <div id="unit-section" style="display: none;">
          <label class="block mb-2 mt-4">Select Unit:</label>
          <select id="property-unit" class="w-full rounded-md capitalize text-[.6rem]">
            <!-- Options will be dynamically updated -->
          </select>
        </div>
      </div>
      <input id="ool1zyibs" type="text" placeholder="Type css property here..." onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      "/>
    </div>
    ${data.canUseQuickCommands ? `<div class="text-center text-[.6rem]">
      You can also apply styles using <a href="https://tailwindcss.com/" target="_blank">tailwind</a> classes as quick commands!
    </div>` : ''}`;

  Modal.render({
    title: `Add New Style to "${id}"`,
    content: modalContent,
    onLoad() {
      document.getElementById('ool1zyibs').focus();
      const propertyTypeSelect = document.getElementById('property-type');
      const unitSelect = document.getElementById('property-unit');
      const unitSection = document.getElementById('unit-section');

      function updatePropertyDetails(selectedType) {
        unitSelect.innerHTML = '';

        if (data.cssRangedValueProperties[selectedType]) {
          unitSection.style.display = noUnitProperties.includes(selectedType) ? 'none' : 'block';

          if (selectedType.startsWith('animation')) {
            unitOptions.animation.forEach(unit => {
              unitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
            });
          } else if (transformUnits.includes(selectedType)) {
            unitOptions.transform.forEach(unit => {
              unitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
            });
          } else {
            unitOptions.default.forEach(unit => {
              unitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
            });
          }
        } else if (data.cssFixedValueProperties[selectedType]) {
          unitSection.style.display = 'none';
        } else {
          unitSection.style.display = 'none';
        }
      }

      propertyTypeSelect.onchange = function() {
        const selectedType = this.value;
        updatePropertyDetails(selectedType);
        document.getElementById('ool1zyibs').value = selectedType;
      };
    },
    onConfirm() {
      let propertyTypeInput = document.getElementById('ool1zyibs').value.trim();
      const unit = document.getElementById('property-unit') ? document.getElementById('property-unit').value : '';
      const noUnit = ['opacity', 'z-index'];
      const cssQuickCommands = data.cssQuickCommands;
      
      // Normalize the input
      const properties = propertyTypeInput.split(',').map(prop => prop.trim());
    
      properties.forEach(propertyString => {
        let [propertyType, userDefinedValue] = propertyString.split('=').map(str => str.trim());
        propertyType = propertyType.toLowerCase();
    
        // Check if propertyType is a Tailwind quick command
        if (Object.keys(cssQuickCommands).includes(propertyType)) {
          const quickCommand = cssQuickCommands[propertyType];
          const quickCommandProperties = quickCommand.split(';').filter(Boolean);
    
          quickCommandProperties.forEach(propertyString => {
            let [quickPropertyType, quickUserDefinedValue] = propertyString.split(':').map(str => str.trim());
            quickPropertyType = quickPropertyType.toLowerCase();
            obj[quickPropertyType] = quickUserDefinedValue;
          });
        } else {
          // Handle custom properties
          let finalValue;
    
          if (userDefinedValue) {
            // Use the user-defined value
            finalValue = userDefinedValue + (unit && !noUnit.includes(propertyType) ? unit : '');
          } else {
            // Use the default value if no value was provided
            const defaultValue = defaultValues[propertyType] || defaultValues['default'];
            finalValue = unit ? `${defaultValue}${unit}` : defaultValue;
          }
    
          // Apply the final value to the property
          if (noUnit.includes(propertyType)) {
            obj[propertyType] = userDefinedValue || "1";
          } else {
            obj[propertyType] = finalValue;
          }
        }
      });
    
      saveState();
    }    
  });
}
window.renameStyleTarget = target => {
  let modalContent = `<div class="p-4 text-center">
    <input id="lnjvy3iz2" type="text" placeholder="Style name/target..." onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      ">
  </div>`;
  
  // Render the modal
  Modal.render({
    title: `Are you sure you want to rename the "${target}" style?`,
    content: modalContent,
    onLoad() {
      document.getElementById('lnjvy3iz2').focus();
    },
    onConfirm() {
      let value = document.getElementById('lnjvy3iz2').value;
      if (value) {
        // Convert the first character to lowercase
        value = value.charAt(0).toLowerCase() + value.slice(1);
        
        if (project.css.styles[value]) {
          Modal.render({
            title: `Unable to add style!`,
            content: "Style already exists!"
          });
        } else if (project.css.styles[`${target}`]) {
          // Remove the storage of the styles target before changing
          data.stylesTarget = null;

          // Clone the style object
          project.css.styles[value] = JSON.parse(JSON.stringify(project.css.styles[target]));
  
          // Now delete the old style object
          delete project.css.styles[target];

          // Target the new style
          data.stylesTarget = value;

          saveState();
        }
      } else {
        Modal.render({
          title: `Unable to rename style`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.deleteStyleTarget = target => {
  let modalContent = `<div class="p-4 text-center">You will still be able to undo.</div>`;
  
  // Render the modal
  Modal.render({
    title: `Are you sure you want to delete the "${target}" style?`,
    content: modalContent,
    onConfirm() {
      if (data.stylesTarget) {
        clearStyles(project.html, data.stylesTarget);
        delete project.css.styles[data.stylesTarget];
        data.stylesTarget = null;
        saveState();
      }
    }
  });
}
window.addBreakpoint = () => {
  let modalContent = `
    <select 
      id="j6xqh4air" 
      onchange="document.getElementById('vvrh9nxwk').value = this.value;"
    >
      <option value="">none</option>
      <option value="640">sm (640px)</option>
      <option value="768">md (768px)</option>
      <option value="1024">lg (1024px)</option>
      <option value="1280">xl (1280px)</option>
      <option value="1536">2xl (1536px)</option>
    </select>
    <input 
      id="vvrh9nxwk" 
      type="number" 
      placeholder="Breakpoint size here"
      onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('header > button:last-child').onclick();
        }
      ">
  `;
  
  // Render the modal
  Modal.render({
    title: `Add A Breakpoint`,
    content: modalContent,
    onLoad() {
      document.getElementById('vvrh9nxwk').focus();
    },
    onConfirm() {
      const value = document.getElementById('vvrh9nxwk').value;
      if (value) {
        if (project.css.breakpoints[`${value}px`]) {
          Modal.render({
            title: `Unable to add breakpoint!`,
            content: "Breakpoint already exists!"
          });
        } else {
          project.css.breakpoints[`${value}px`] = {};
          project.css.breakpoints[`${value}px`][`${data.stylesTarget}`] = {
            "base": {},
            "pseudos": []
          };
        }
      } else {
        Modal.render({
          title: `Unable to add breakpoint`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.renameBreakpointKey = size => {
  let modalContent = `<div class="p-4 text-center">
    <input id="mow5ep6l7" type="number" placeholder="Style name/target..." onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      ">
  </div>`;
  
  // Render the modal
  Modal.render({
    title: `Are you sure you want to rename the "${size}" style?`,
    content: modalContent,
    onLoad() {
      document.getElementById('mow5ep6l7').focus();
    },
    onConfirm() {
      const value = document.getElementById('mow5ep6l7').value;
      if (value) {
        if (project.css.breakpoints[`${value}px`]) {
          Modal.render({
            title: `Unable to rename breakpoint key!`,
            content: "Key already exists!"
          });
        } else {
          // Remove the storage of the styles target before changing
          data.breakpointKey = null;

          // Clone the style object
          project.css.breakpoints[`${value}px`] = JSON.parse(JSON.stringify(project.css.breakpoints[size]));
  
          // Now delete the old style object
          delete project.css.breakpoints[size];
        }
      } else {
        Modal.render({
          title: `Unable to rename breakpoint key`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.deleteBreakpointKey = size => {
  let modalContent = `<div class="p-4 text-center">You will still be able to undo.</div>`;
  
  // Render the modal
  Modal.render({
    title: `Are you sure you want to delete the "${size}" style?`,
    content: modalContent,
    onConfirm() {
      if (size in project.css.breakpoints) {
        data.breakpointKey = null;
        delete project.css.breakpoints[size];
        saveState();
      }
    }
  });
}
window.addAnimation = () => {
  let modalContent = `
    <input 
      id="vvrh9nxwk" 
      type="text" 
      placeholder="Animation name here...."
      onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      ">
  `;
  
  // Render the modal
  Modal.render({
    title: `Add An Animation`,
    content: modalContent,
    onLoad() {
      document.getElementById('vvrh9nxwk').focus();
    },
    onConfirm() {
      let value = document.getElementById('vvrh9nxwk').value;
      if (value) {
        // Convert the first character to lowercase
        value = value.charAt(0).toLowerCase() + value.slice(1);
        if (project.css.animations[`${value}`]) {
          Modal.render({
            title: `Unable to add animation!`,
            content: "Animation already exists!"
          });
        } else {
          project.css.animations[value] = {
            "keyframes": {}
          };
          project.css.animations[value].keyframes = {
            "0%": {},
            "100%": {}
          };
        }
      } else {
        Modal.render({
          title: `Unable to add animation`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.renameAnimation = name => {
  let modalContent = `<div class="p-4 text-center">
    <input id="mow5ep6l7" type="text" placeholder="Animation name here..." onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      ">
  </div>`;
  
  // Render the modal
  Modal.render({
    title: `Are you sure you want to rename the "${name}" animation?`,
    content: modalContent,
    onLoad() {
      document.getElementById('mow5ep6l7').focus();
    },
    onConfirm() {
      const value = document.getElementById('mow5ep6l7').value;
      if (value) {
        if (project.css.animations[value]) {
          Modal.render({
            title: `Unable to rename animation!`,
            content: "Animation name already exists!"
          });
        } else {
          // Remove the storage of the styles target before changing
          data.animationTarget = null;

          // Clone the style object
          project.css.animations[value] = JSON.parse(JSON.stringify(project.css.animations[name]));
  
          // Now delete the old style object
          delete project.css.animations[name];

          // Make the new name the target
          data.animationTarget = value;
        }
      } else {
        Modal.render({
          title: `Unable to rename animation`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.deleteAnimation = name => {
  let modalContent = `<div class="p-4 text-center">You will still be able to undo.</div>`;
  
  // Render the modal
  Modal.render({
    title: `Are you sure you want to delete the "${name}" animation?`,
    content: modalContent,
    onConfirm() {
      if (data.animationKeyframe) data.animationKeyframe = null;
      // Remove the storage of the styles target before changing
      data.animationTarget = null;
      data.animationTarget = null;
      delete project.css.animations[name];
      App.render("#app");
    }
  });
}
window.addKeyFrame = () => {
  if (!data.animationTarget) return;
  let modalContent = `
    <input 
      id="vvrh9nxwk" 
      type="text" 
      placeholder="From, To, 0%, 50%, 100%, etc:"
      onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      ">
  `;
  
  // Render the modal
  Modal.render({
    title: `Add An Animation`,
    content: modalContent,
    onLoad() {
      document.getElementById('vvrh9nxwk').focus();
    },
    onConfirm() {
      const value = document.getElementById('vvrh9nxwk').value;
      if (value) {
        if (project.css.animations[data.animationTarget].keyframes[`${value}`]) {
          Modal.render({
            title: `Unable to add keyframe!`,
            content: "Keyframe already exists!"
          });
        } else {
          project.css.animations[data.animationTarget].keyframes[`${value}`] = {};
          saveState();
        }
      } else {
        Modal.render({
          title: `Unable to add keyframe`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.renameKeyFrame = name => {
  let modalContent = `<div class="p-4 text-center">
    <input id="mow5ep6l7" type="text" placeholder="From, To, 0%, 50%, 100%, etc:" onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      ">
  </div>`;
  
  // Render the modal
  Modal.render({
    title: `Are you sure you want to rename the "${name}" keyframe?`,
    content: modalContent,
    onLoad() {
      document.getElementById('mow5ep6l7').focus();
    },
    onConfirm() {
      const value = document.getElementById('mow5ep6l7').value;
      if (value) {
        if (project.css.animations[data.animationTarget].keyframes[value]) {
          Modal.render({
            title: `Unable to rename keyframe!`,
            content: "Animation keyframe already exists!"
          });
        } else {
          // Remove the storage of the styles target before changing
          data.animationKeyframe = null;

          // Clone the style object
          project.css.animations[data.animationTarget].keyframes[value] = JSON.parse(JSON.stringify(project.css.animations[data.animationTarget].keyframes[name]));
  
          // Now delete the old style object
          delete project.css.animations[data.animationTarget].keyframes[name];

          // Make the new name the target
          data.animationKeyframe = value;
          saveState();
        }
      } else {
        Modal.render({
          title: `Unable to rename keyframe key`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.deleteKeyFrame = name => {
  let modalContent = `<div class="p-4 text-center">You will still be able to undo.</div>`;
  
  // Render the modal
  Modal.render({
    title: `Are you sure you want to delete the "${name}" keyframe?`,
    content: modalContent,
    onConfirm() {
      if (data.animationKeyframe) data.animationKeyframe = null;
      // Remove the storage of the styles target before changing
      data.animationKeyframe = null;
      delete project.css.animations[data.animationTarget].keyframes[name];
      saveState();
      App.render("#app");
    }
  });
}
window.addToKeyframe = () => {
  if (!data.animationTarget || !data.animationKeyframe) return;
  let modalContent = `
    <input 
      id="vvrh9nxwk" 
      type="text" 
      placeholder="From, To, 0%, 50%, 100%, etc:"
      onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      ">
  `;
  
  // Render the modal
  Modal.render({
    title: `Add keyframe property`,
    content: modalContent,
    onLoad() {
      document.getElementById('vvrh9nxwk').focus();
    },
    onConfirm() {
      const value = document.getElementById('vvrh9nxwk').value;
      if (value) {
        if (project.css.animations[data.animationTarget].keyframes[`${value}`]) {
          Modal.render({
            title: `Unable to add keyframe!`,
            content: "Keyframe already exists!"
          });
        } else {
          project.css.animations[data.animationTarget].keyframes[value] = {};
          saveState();
        }
      } else {
        Modal.render({
          title: `Unable to add keyframe`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.deleteStyleProp = (id, prop, e, detect = null) => {
  let obj = null;
  if (detect) {
    if (detect === "breakpoints") {
      obj = project.css.breakpoints[`${data.breakpointKey}px`][id][data.stylesPropTarget];
    }
    if (detect === "animations") {
      obj = project.css.animations[data.animationTarget].keyframes[data.animationKeyframe]
    }
  } else {
    obj = project.css.styles[id][data.stylesPropTarget];
  }
  // Delete the property
  if (prop in obj) delete obj[`${prop}`];
  saveState();

  // Remove the modal
  e.closest('dialog[open]').remove();
}
window.clearStyles = (layers, query, callback) => {
  // first delete the style object
  if (project.css.styles[query]) {
    delete project.css[query];
  }

  // Track whether we found and cleared the styles in any layer
  let found = false;

  // then let's remove the style from layers
  for (const layer of layers) {
    if (layer.style === query) {
      layer.style = "";
      found = true;
    };
    // Recurse through child layers
    if (layer.children && layer.children.length > 0) {
      clearStyles(layer.children, query, () => {
        found = true;
      });
    }
    // If we processed any layers, renderPreview and invoke the callback
    if (found) {
      if (typeof callback === 'function') {
        callback();
      }
    }
  }
}
window.styleModal = (id, prop, currentValue, detect = null) => {
  const cssFixedValueProperties = data.cssFixedValueProperties;

  let detected = null;
  if (detect) detected = detect;

  // Initialize the modal content based on the property type
  let modalContent = '';

  if (cssFixedValueProperties[prop]) {
    // Handle fixed values
    const options = cssFixedValueProperties[prop].map(val => `
      <option value="${val}" ${val === currentValue ? 'selected' : ''}>${val}</option>
    `).join('');

    modalContent = `
      <div class="p-4">
        <label class="block mb-2">Current Value: ${currentValue}</label>
        <select class="w-full rounded-md text-[.6rem]" id="new-value">
          ${options}
        </select>
      </div>`;
  } else {
    // Handle other types of properties (e.g., text) with a single input
    modalContent = `
      <div class="p-4">
        <label class="block mb-2">Current Value: ${currentValue}</label>
        <input 
          id="new-value"
          class="w-full rounded-md text-[.6rem]" 
          type="text" 
          value="${currentValue}" 
          placeholder="Enter new value" 
          onkeydown="
            if (event.key === 'Enter') {
              document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
            }
          "/>
      </div>`;
  }

  // Add a delete option
  modalContent += `
    <div class="p-4 text-center">
      <button class="w-full border-red-400 text-red-400 rounded-md py-2 mt-4 bg-transparent font-thin" 
        onclick="deleteStyleProp('${id}', '${prop}', this${detected ? `, '${detected}'` : '' })">Delete Property</button>
    </div>`;

  // Render the modal
  Modal.render({
    title: `Modify "${prop}" Style`,
    content: modalContent,
    onLoad() {
      if (document.getElementById('new-value')) {
        const element = document.getElementById('new-value');
        element.focus();
        if (element.tagName.toLowerCase() === 'input') {
          element.select();
        }
      }
    },
    onConfirm() {
      saveState();

      // Get the new value from the modal
      const newValue = document.getElementById('new-value').value;

      let obj = null;
      if (detect) {
        if (detect === "breakpoints") {
          if (project.css.breakpoints[`${data.breakpointKey}px`][id][data.stylesPropTarget]) {
            obj = project.css.breakpoints[`${data.breakpointKey}px`][id][data.stylesPropTarget];
          }
        }
        if (detect === "animations") {
          if (project.css.animations[data.animationTarget].keyframes[data.animationKeyframe]) {
            obj = project.css.animations[data.animationTarget].keyframes[data.animationKeyframe];
          }
        }
      } else {
        if (data.stylesPropTarget) {
          obj = project.css.styles[id][data.stylesPropTarget];
        }
      }

      // Update or delete the style
      if (newValue === '') {
        // Delete the property if empty
        delete obj[prop];
      } else {
        // Update the property with the new value
        obj[prop] = `${newValue}`;
      }

      saveState();
    }
  });
}
window.addPseudo = selector => {
  // Ensure the selector exists and initialize pseudos if not already present
  if (!project.css.styles[selector]) return;
  if (!project.css.styles[selector].pseudos) {
    project.css.styles[selector].pseudos = [];
  }

  // Define available pseudo-classes and pseudo-elements
  const pseudos = [
    'none',
    ':active',
    ':after',
    ':before',
    ':first-child',
    ':focus',
    ':focus-visible',
    ':focus-within',
    ':hover',
    ':last-child',
    ':nth-child',
    ':target',
    ':visited',
    '::-webkit-scrollbar',
    '::-webkit-scrollbar-thumb',
    '::-webkit-scrollbar-track',
    '::before',
    '::after'
  ];

  let pseudoOptions = pseudos.map(pseudo => `
    <option value="${pseudo === 'none' ? '' : pseudo}">${pseudo}</option>
  `).join('');

  let modalContent = `
    <div class="p-4">
      <label class="block mb-2">Select Pseudo-Class/Element:</label>
      <select 
        id="pseudo-selector" 
        class="w-full rounded-md capitalize text-[.6rem]" 
        onchange="
          document.getElementById('pseudo-input').value = this.value;
        ">
        <option value="">-- Select a pseudo --</option>
        ${pseudoOptions}
      </select>
      <input 
        id="pseudo-input" 
        type="text" 
        placeholder="Enter CSS property and value here (e.g., display:none):"
        class="w-full rounded-md text-[.6rem] mt-4"
        onkeydown="
          if (event.key === 'Enter') {
            document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
          }
        ">
    </div>
  `;

  // Render the modal
  Modal.render({
    title: `Add A Pseudo-Class/Element`,
    content: modalContent,
    onLoad() {
      document.getElementById('pseudo-input').focus();
    },
    onConfirm() {
      const pseudoSelector = document.getElementById('pseudo-selector').value.trim();
      const pseudoStyles = document.getElementById('pseudo-input').value.trim();

      if (pseudoStyles) {
        // Convert pseudoStyles into an object
        const styles = pseudoStyles.split(';').reduce((acc, rule) => {
          const [property, value] = rule.split(':').map(s => s.trim());
          if (property && value) acc[property] = value;
          return acc;
        }, {});

        const existingPseudo = project.css.styles[selector].pseudos.find(pseudo => pseudo.selector === pseudoStyles);

        if (existingPseudo) {
          // Merge new styles with existing styles if pseudo already exists
          existingPseudo.styles = {
            ...existingPseudo.styles,
            ...styles
          };
        } else {
          // Add a new pseudo object
          let obj = {
            "selector": pseudoStyles,
            "styles": styles
          };
          project.css.styles[selector].pseudos.push(obj);
        }

        saveState();
      } else {
        Modal.render({
          title: `Unable to add pseudo`,
          content: "Please select a pseudo and enter valid CSS properties and values."
        });
      }
    }
  });
}
window.renamePseudo = oldName => {
  // Define available pseudo-classes and pseudo-elements
  const pseudos = [
    'none',
    ':active',
    ':after',
    ':before',
    ':first-child',
    ':focus',
    ':focus-visible',
    ':focus-within',
    ':hover',
    ':last-child',
    ':nth-child',
    ':target',
    ':visited',
    '::-webkit-scrollbar',
    '::-webkit-scrollbar-thumb',
    '::-webkit-scrollbar-track',
    '::before',
    '::after'
  ];

  let pseudoOptions = pseudos.map(pseudo => `
    <option value="${pseudo === 'none' ? '' : pseudo}">${pseudo}</option>
  `).join('');

  let modalContent = `
    <div class="p-4">
      <label class="block mb-2">Select Pseudo-Class/Element to Rename:</label>
      <select 
        id="pseudo-selector" 
        class="w-full rounded-md capitalize text-[.6rem]" 
        onchange="
          document.getElementById('pseudo-name-input').value = this.value;
        ">
        <option value="">-- Select a pseudo --</option>
        ${pseudoOptions}
      </select>
      <input 
        id="pseudo-name-input" 
        type="text" 
        placeholder="Enter new name here..."
        class="w-full rounded-md text-[.6rem] mt-4"
        onkeydown="
          if (event.key === 'Enter') {
            document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
          }
        ">
    </div>
  `;

  // Render the modal
  Modal.render({
    title: `Are you sure you want to rename the "${oldName}" pseudo-class/element?`,
    content: modalContent,
    onLoad() {
      document.getElementById('pseudo-name-input').focus();
    },
    onConfirm() {
      const newName = document.getElementById('pseudo-name-input').value.trim();
      if (newName) {
        const style = project.css.styles[data.stylesTarget];
        if (!style || !style.pseudos) return;

        const existingPseudo = style.pseudos.find(pseudo => pseudo.selector === newName);
        if (existingPseudo) {
          Modal.render({
            title: `Unable to rename pseudo!`,
            content: "Pseudo with the new name already exists!"
          });
          return;
        }

        const pseudoIndex = style.pseudos.findIndex(pseudo => pseudo.selector === oldName);
        if (pseudoIndex === -1) {
          Modal.render({
            title: `Pseudo not found!`,
            content: `No pseudo with the name "${oldName}" found!`
          });
          return;
        }

        // Rename the pseudo
        style.pseudos[pseudoIndex].selector = newName;

        App.render("#app");
        saveState();
      } else {
        Modal.render({
          title: `Unable to rename pseudo`,
          content: "No value detected!"
        });
      }
    }
  });
}
window.deletePseudo = () => {
  const name = data.pseudosSelector;
  const pseudoIndex = data.pseudosSelectorIndex;
  let modalContent = `<div class="p-4 text-center">You will still be able to undo.</div>`;

  // Render the modal
  Modal.render({
    title: `Are you sure you want to delete the "${name}" pseudo-class/element?`,
    content: modalContent,
    onConfirm() {
      const style = project.css.styles[data.stylesTarget];
      if (!style || !style.pseudos) return;

      data.pseudosSelector = null;
      data.pseudosSelectorIndex = 0;
      style.pseudos.splice(pseudoIndex, 1);
      saveState();
    }
  });
}
window.fetchCssQuickCommands = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data.canUseQuickCommands = true;
    const obj = await response.json();
    return obj;
  } catch (error) {
    console.error('Error fetching CSS quick commands:', error);
  }
}
window.applyCssQuickCommands = async url => {
  const cssQuickCommands = await fetchCssQuickCommands(url);

  if (cssQuickCommands) {
    // Assuming `data` is a global object where `cssQuickCommands` should be applied
    data.cssQuickCommands = cssQuickCommands;
  }
}
// Helper function to add an attribute to the element
window.addAttribute = attr => {
  if (!attr) return;
  const incrementPattern = /{n}/g; // Pattern to detect increment placeholder

  // Split the attributes into individual attributes
  const attrs = attr.toLowerCase().split(',').map(q => q.trim().toLowerCase());

  // Get the current increment values for each attribute
  const incrementValues = {};

  saveState();
  data.selectedLayerIds.forEach(id => {
    const { layer } = findLayerById(id, project.html);
    if (layer) {
      // Initialize layer.props if it's undefined
      if (!layer.props) layer.props = {};

      // Iterate over each attribute
      attrs.forEach(attribute => {
        let [key, value] = attribute.split('=').map(s => s.trim());
        if (key === 'id') value = generateId();

        if (incrementPattern.test(value)) {
          // Handle incrementing values
          let baseValue = value.replace(incrementPattern, '');
          let increment = incrementValues[key] || 1;
          value = baseValue + increment;
          incrementValues[key] = increment + 1;
        }

        if (!(key in layer.props)) {
          layer.props[key] = value !== undefined ? value : "";
        } else if (value !== undefined) {
          // If the attribute already exists, update its value
          layer.props[key] = value;
        }
      });
    }
  });
  saveState();
}

// editor functions
window.html2json = input => {
  function elementToJson(element) {
    const boxElements = data.boxElements;
    const textElements = data.textElements;
    const noTextElements = [
      "br",
      "hr",
      "input",
      "progress",
      "optgroup",
      "input",
      "link",
      "img",
      "svg",
      "path",
      "polygon",
      "rect",
      "circle",
      "ellipse",
      "g",
      "defs",
      "clipPath"
    ];
    const tagName = element.tagName.toLowerCase();
    const obj = {
      tag: element.tagName.toLowerCase(),
      id: generateId(),
      style: "",
      state: {
        "collapsed": false,
        "visible": true,
        "selected": false
      }
    };

    obj.name = tagName;
    if (boxElements.includes(tagName)) {
      obj.type = "box";
      obj.text = "";
    } else if (textElements.includes(tagName)) {
      obj.type = "text";
      obj.text = "";
    } else {
      obj.type = tagName;
      if (!noTextElements.includes(tagName)) {
        obj.text = "";
      }
    }
  
    // Add props only if not empty
    if (element.hasAttributes()) {
      const props = {};
      Array.from(element.attributes).forEach(attr => {
        props[`${attr.name.toLowerCase()}`] = `${attr.value}`;
      });
      obj.props = props;
    }
  
    if (element.childNodes.length > 0) {
      obj.children = [];
      element.childNodes.forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          obj.children.push(elementToJson(child));
        } else if (child.nodeType === Node.TEXT_NODE && child.nodeValue.trim()) {
          obj.text = child.nodeValue.trim();
        }
      });
    }
    return obj;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(input, 'text/html');

  // Process both head and body elements
  const headJson = Array.from(doc.head.children).map(child => elementToJson(child));
  const bodyJson = Array.from(doc.body.children).map(child => elementToJson(child));

  // Combine the head and body JSON structures into one array
  return [...headJson, ...bodyJson];
}
window.json2html = input => {
  function jsonToElement(json) {
    const renderElement = element => {
      let html = '';

      // Ensure element is not null or undefined before accessing properties
      if (!element) return html;

      // Skip elements that are not visible
      if (element.state && !element.state.visible) return html;
      
      if (!element.tag) {
        html += element.text || '';
        return html;
      }
    
      html += `<${element.tag}`;

      if (element.props) {
        for (let [key, value] of Object.entries(element.props)) {
          html += ` ${key}="${value}"`;
        }
      }
    
      html += '>';
    
      if (element.text) {
        if (element.tag === 'style' || element.tag === 'script') {
          html += element.text;
        } else {
          html += escapeHtml(element.text);
        }
      }
    
      if (element.children) {
        for (const childElement of element.children) {
          html += renderElement(childElement);
        }
      }
    
      html += `</${element.tag}>`;
      return html;
    }
  
    let html = '';

    // If the input is an object, wrap it in an array
    if (!Array.isArray(json)) {
      json = [json];
    }

    if (Array.isArray(json)) {
      json.forEach(element => {
        html += renderElement(element);
      });
    }
    return html;
  }
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }
  function beautifyHtml(json) {
    const html = jsonToElement(json);
    let tab = '  ';
    let result = '';
    let indent = '';
  
    html.split(/>\s*</).forEach(function(element) {
      if (element.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }
  
      result += indent + '<' + element.trim() + '>\r\n';
  
      if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("<input")) {
        indent += tab;
      }
    });
  
    // Remove leading tab and newline, and trim trailing newline and whitespace
    return result.substring(1, result.length - 3).trim();
  }

  return beautifyHtml(input);
}
window.css2json = css => {
  if (typeof css !== 'string') {
    throw new Error("Input must be a CSS string");
  }

  const json = {
    rootVariables: {},
    styles: {},
    animations: {},
    breakpoints: {}
  };

  css = minifyCSS(css)

  // Handle @import statements
  const importRegex = /@import\s+url\(['"]([^'"]+)['"]\);/g;
  let importMatch;

  while ((importMatch = importRegex.exec(css)) !== null) {
    const importUrl = importMatch[1].trim();
    if (project.libraries && !project.libraries.includes(importUrl)) {
      project.libraries.push(importUrl);
    }
  }

  // Remove @import statements from CSS
  css = css.replace(importRegex, '');

  const keyframesRegex = /@keyframes\s+([^{\s]+)\s*\{([^}]*(\{[^}]*\})[^}]*)\}/g;
  const mediaQueryRegex = /@media\s*([^{]+)\s*\{([\s\S]*?\{[\s\S]*?\})\s*}/g;
  const selectorRegex = /([^{]+?)\s*(\{([^}]+)\})/g;

  // Decode URL-encoded characters
  function decodeURIComponentSafe(str) {
    try {
      return decodeURIComponent(str);
    } catch {
      return str;
    }
  }

  function processSelector(selector, properties, target) {
    selector = selector.trim();
    if (selector.startsWith('@keyframes')) return;

    if (selector === ":root") {
      properties.split(';').forEach(prop => {
        const [varName, varValue] = prop.split(":").map(part => part.trim());
        if (varName && varValue) {
          json.rootVariables[varName] = decodeURIComponentSafe(varValue);
        }
      });
      return;
    }

    const pseudoMatch = selector.match(/^(.*?)(::?[a-zA-Z0-9-]+)$/);
    let baseSelector = selector;
    let pseudo = null;

    if (pseudoMatch) {
      baseSelector = pseudoMatch[1].trim();
      pseudo = pseudoMatch[2];
    }

    if (!target[baseSelector]) {
      target[baseSelector] = {};
    }

    let currentTarget = target[baseSelector];
    if (pseudo) {
      currentTarget['pseudos'] = currentTarget['pseudos'] || [];
      const pseudoObj = {
        selector: pseudo,
        styles: {}
      };
      currentTarget['pseudos'].push(pseudoObj);
      currentTarget = pseudoObj.styles;
    } else {
      currentTarget['base'] = currentTarget['base'] || {};
      currentTarget = currentTarget['base'];
    }

    // Use regex to handle property-value pairs
    const propertyRegex = /([a-zA-Z-]+)\s*:\s*(.*?)(?=;|$)/g;
    let match;
    while ((match = propertyRegex.exec(properties)) !== null) {
      const property = match[1].trim();
      const value = match[2].trim();

      // Special handling for url(...) values
      const urlRegex = /^url\(['"]?(.*?)['"]?\)$/i;
      const urlMatch = value.match(urlRegex);

      if (urlMatch) {
        const urlContent = urlMatch[1].trim(); // Extract URL content and trim
        currentTarget[property] = `url("${decodeURIComponentSafe(urlContent)}")`;
      } else {
        currentTarget[property] = decodeURIComponentSafe(value);
      }
    }
  }

  function processRules(cssRules, target) {
    let match;
    while ((match = selectorRegex.exec(cssRules)) !== null) {
      const selector = match[1].trim();
      const properties = match[3].trim();
      processSelector(selector, properties, target);
    }
  }

  function processKeyframes(keyframesName, keyframesRules) {
    const keyframes = {};

    keyframesRules.split('}').forEach(segment => {
      segment = segment.trim();
      if (!segment) return;

      const [keyframeName, propertiesPart] = segment.split('{').map(part => part.trim());
      if (keyframeName && (keyframeName.includes('to') || keyframeName.includes('from') || keyframeName.includes('%'))) {
        propertiesPart.split(';').forEach(prop => {
          const [property, value] = prop.split(':').map(p => p.trim());
          if (property && value) {
            keyframes[keyframeName] = keyframes[keyframeName] || {};
            keyframes[keyframeName][property] = decodeURIComponentSafe(value);
          }
        });
      }
    });

    json.animations[keyframesName] = { keyframes };
  }

  // Process keyframes
  let keyframesMatch;
  while ((keyframesMatch = keyframesRegex.exec(css)) !== null) {
    const keyframesName = keyframesMatch[1].trim();
    const keyframesRules = keyframesMatch[2].trim();
    processKeyframes(keyframesName, keyframesRules);
  }

  // Process media queries
  let mediaMatch;
  while ((mediaMatch = mediaQueryRegex.exec(css)) !== null) {
    const mediaCondition = mediaMatch[1].trim().split(")")[0].split(":")[1].trim();
    const mediaRules = mediaMatch[2].trim();
    const mediaTarget = {};

    processRules(mediaRules, mediaTarget);

    json.breakpoints[mediaCondition] = mediaTarget;
  }

  // Remove media queries from CSS
  const cssWithoutMedia = css.replace(mediaQueryRegex, '');

  // Process remaining CSS rules
  processRules(cssWithoutMedia, json.styles);

  // Remove keyframes from CSS
  css = css.replace(keyframesRegex, '');

  // Remove any empty selectors or unnecessary properties
  Object.keys(json.styles).forEach(selector => {
    if (Object.keys(json.styles[selector]).length === 0) {
      delete json.styles[selector];
    }
  });

  return json;
};

window.json2css = styles => {
  let css = '';
  let symbol = "";
  let semicolon = ";";
  let openBrace = "{";
  let closeBrace = "}";

  // Function to check if a value contains CSS variables
  function containCssVar(value) {
    return /var\(--/.test(value);
  }

  // Function to process styles recursively
  function processStyles(selector, style, indentLevel = 0) {
    let indent = '  '.repeat(indentLevel);
    let innerCss = '';

    const variables = style.variables || {};
    const baseStyles = style.base || {};
    const pseudos = style.pseudos || [];
    const children = style.children || {}; // Account for children

    // Add the base selector
    innerCss += `${indent}${selector} ${openBrace}\n`;

    // Variables
    for (const [variable, value] of Object.entries(variables)) {
      innerCss += `${indent}  ${symbol}${variable}: ${value}${semicolon}\n`;
    }

    // Base styles
    for (let [property, value] of Object.entries(baseStyles)) {
      if (containCssVar(value)) {
        // Replace CSS variables with CSS variables, handling mixed content
        value = value.replace(/var\(--([a-zA-Z0-9-_]+)\)/g, (match, varName) => {
          return `var(--${varName})`;
        });
      }
      innerCss += `${indent}  ${property}: ${value}${semicolon}\n`;
    }

    innerCss += `${indent}${closeBrace}\n`;

    // Pseudo-classes/styles
    pseudos.forEach(({ selector: pseudoSelector, styles: pseudoStyles }) => {
      innerCss += `${indent}${selector}${pseudoSelector} ${openBrace}\n`;
      for (let [property, value] of Object.entries(pseudoStyles)) {
        if (containCssVar(value)) {
          value = value.replace(/var\(--([a-zA-Z0-9-_]+)\)/g, (match, varName) => {
            return `var(--${varName})`;
          });
        }
        innerCss += `${indent}  ${property}: ${value}${semicolon}\n`;
      }
      innerCss += `${indent}${closeBrace}\n`;
    });

    // Recursively process children
    for (const [childSelector, childStyle] of Object.entries(children)) {
      innerCss += processStyles(`${selector} ${childSelector}`, childStyle, indentLevel + 1);
    }

    return innerCss;
  }

  // Function to process animations
  function processAnimations(animations, indentLevel = 0) {
    let indent = '  '.repeat(indentLevel);
    let animationCss = '';

    for (const [animationName, animation] of Object.entries(animations)) {
      animationCss += `${indent}@keyframes ${animationName} ${openBrace}\n`;

      for (const [keyframe, styles] of Object.entries(animation.keyframes)) {
        animationCss += `${indent}  ${keyframe} ${openBrace}\n`;
        for (let [property, value] of Object.entries(styles)) {
          if (containCssVar(value)) {
            value = value.replace(/var\(--([a-zA-Z0-9-_]+)\)/g, (match, varName) => {
              return `var(--${varName})`;
            });
          }
          animationCss += `${indent}    ${property}: ${value}${semicolon}\n`;
        }
        animationCss += `${indent}  ${closeBrace}\n`;
      }

      animationCss += `${indent}${closeBrace}\n`;
    }

    return animationCss;
  }

  // Function to process breakpoints
  function processBreakpoints(breakpoints, indentLevel = 0) {
    let indent = '  '.repeat(indentLevel);
    let breakpointCss = '';

    for (const [breakpoint, styles] of Object.entries(breakpoints)) {
      breakpointCss += `${indent}@media (min-width: ${breakpoint}) ${openBrace}\n`;
      for (const [selector, style] of Object.entries(styles)) {
        breakpointCss += processStyles(selector, style, indentLevel + 1);
      }
      breakpointCss += `${indent}${closeBrace}\n`;
    }

    return breakpointCss;
  }

  // Define :root variables
  if (styles.rootVariables && Object.keys(styles.rootVariables).length) {
    css += ":root {\n";
    for (const [variable, value] of Object.entries(styles.rootVariables)) {
      css += `  ${variable}: ${value}${semicolon}\n`;
    }
    css += "}\n\n";
  }

  // Define styles for each class
  for (const [classId, style] of Object.entries(styles.styles)) {
    if (!style || (!Object.keys(style.variables || {}).length &&
        !Object.keys(style.base || {}).length &&
        !Object.keys(style.pseudos || {}).length &&
        !Object.keys(style.children || {}).length)) {
      continue; // Skip empty styles
    }

    const selector = classId;
    css += processStyles(selector, style);
  }

  // Process animations
  if (Object.keys(styles.animations || {}).length) {
    css += processAnimations(styles.animations);
  }

  // Process breakpoints (media queries)
  if (Object.keys(styles.breakpoints || {}).length) {
    css += processBreakpoints(styles.breakpoints);
  }

  return css;
}
window.json2preprocessor = styles => {
  let css = '';
  let symbol = "";
  let semicolon = ";";
  let openBrace = "{";
  let closeBrace = "}";

  // set proper symbols
  if (data.preprocessors.includes(project.convertTo)) {
    if (project.convertTo === "sass" || project.convertTo === "scss") symbol = "$";
    if (project.convertTo === "sass") {
      semicolon = "";
      openBrace = "";
      closeBrace = "";
    }
    if (project.convertTo === "less") symbol = "@";
  }

  // Function to check if a value contains CSS variables
  function containcssVar(value) {
    return /var\(--/.test(value);
  }

  // Function to process styles recursively
  function processStyles(selector, style, indentLevel = 0) {
    let indent = '  '.repeat(indentLevel);
    let innercss = '';

    const variables = style.variables || {};
    const baseStyles = style.base || {};
    const pseudos = style.pseudos || [];
    const children = style.children || {}; // Account for children

    innercss += `${indent}${selector} ${openBrace}\n`;

    // Variables (convert CSS variables to css variables)
    for (const [variable, value] of Object.entries(variables)) {
      innercss += `${indent}  ${symbol}${variable}: ${value}${semicolon}\n`;
    }

    // Base styles
    for (let [property, value] of Object.entries(baseStyles)) {
      if (property.startsWith('--')) {
        property = property.split('--').join(symbol);
      }

      // Check if value contains a CSS variable
      if (containcssVar(value)) {
        // Replace CSS variables with css variables, handling mixed content
        value = value.replace(/var\(--([a-zA-Z0-9-_]+)\)/g, (match, varName) => {
          if (!property.startsWith('--')) {
            return `${symbol}${varName}`;
          } else {
            return `${symbol}${varName}`;
          }
        });
      }
      innercss += `${indent}  ${property}: ${value}${semicolon}\n`;
    }

    // Pseudo-classes/styles
    pseudos.forEach(({ selector: pseudoSelector, styles: pseudoStyles }) => {
      innercss += `${indent}  &${pseudoSelector} ${openBrace}\n`;
      for (let [property, value] of Object.entries(pseudoStyles)) {
        // Check if value contains a CSS variable
        if (containcssVar(value)) {
          value = value.replace(/var\(--([a-zA-Z0-9-_]+)\)/g, (match, varName) => {
            return `${symbol}${varName}`;
          });
        }
        innercss += `${indent}    ${property}: ${value}${semicolon}\n`;
      }
      innercss += `${indent}  ${closeBrace}\n`;
    });

    // Recursively process children
    if (children) {
      for (const [childSelector, childStyle] of Object.entries(children)) {
        innercss += processStyles(`${selector} ${childSelector}`, childStyle, indentLevel + 1);
      }
    }

    innercss += `${indent}${closeBrace}\n`;

    return innercss;
  }

  // Function to process animations
  function processAnimations(animations, indentLevel = 0) {
    let indent = '  '.repeat(indentLevel);
    let animationCSS = '';

    for (const [animationName, animation] of Object.entries(animations)) {
      animationCSS += `${indent}@keyframes ${animationName} ${openBrace}\n`;

      for (const [keyframe, styles] of Object.entries(animation.keyframes)) {
        animationCSS += `${indent}  ${keyframe} ${openBrace}\n`;
        for (let [property, value] of Object.entries(styles)) {
          // Replace CSS variables with preprocessor variables if needed
          if (containcssVar(value)) {
            value = value.replace(/var\(--([a-zA-Z0-9-_]+)\)/g, (match, varName) => {
              return `${symbol}${varName}`;
            });
          }
          animationCSS += `${indent}    ${property}: ${value}${semicolon}\n`;
        }
        animationCSS += `${indent}  ${closeBrace}\n`;
      }

      animationCSS += `${indent}${closeBrace}\n`;
    }

    return animationCSS;
  }

  // Function to process breakpoints
  function processBreakpoints(breakpoints, indentLevel = 0) {
    let indent = '  '.repeat(indentLevel);
    let breakpointCSS = '';

    for (const [breakpoint, styles] of Object.entries(breakpoints)) {
      breakpointCSS += `${indent}@media (max-width: ${breakpoint}) ${openBrace}\n`;
      for (const [selector, style] of Object.entries(styles.base || {})) {
        breakpointCSS += processStyles(selector, style, indentLevel + 1);
      }
      breakpointCSS += `${indent}${closeBrace}\n`;
    }

    return breakpointCSS;
  }

  // Define :root variables (css supports variables using $)
  let rootVariables = [];
  if (styles.rootVariables && Object.keys(styles.rootVariables).length) {
    for (const [variable, value] of Object.entries(styles.rootVariables)) {
      rootVariables.push(variable);
      css += `${symbol}${variable.split('--').join('')}: ${value}${semicolon}\n`;
    }
    css += '\n';
  }

  // Define styles for each class
  for (const [classId, style] of Object.entries(styles.styles)) {
    if (!style || (!Object.keys(style.variables || {}).length &&
        !Object.keys(style.base || {}).length &&
        !Object.keys(style.pseudos || {}).length &&
        !Object.keys(style.children || {}).length)) {
      continue; // Skip empty styles
    }

    const selector = classId;
    css += processStyles(selector, style);
  }

  // Process animations
  if (Object.keys(styles.animations || {}).length) {
    css += processAnimations(styles.animations);
  }

  // Process breakpoints (media queries)
  if (Object.keys(styles.breakpoints || {}).length) {
    css += processBreakpoints(styles.breakpoints);
  }

  return css;
}
window.mergeCSSJSON = (existingJSON, newJSON) => {
  if (typeof existingJSON === 'string') {
    throw new Error("Input's must be JSON");
  }

  // Merge root variables
  Object.assign(existingJSON.rootVariables, newJSON.rootVariables);

  // Merge styles
  Object.keys(newJSON.styles).forEach(selector => {
    if (!existingJSON.styles[selector]) {
      existingJSON.styles[selector] = newJSON.styles[selector];
    } else {
      if (newJSON.styles[selector].base) {
        existingJSON.styles[selector].base = {
          ...existingJSON.styles[selector].base,
          ...newJSON.styles[selector].base
        };
      }
      if (newJSON.styles[selector].pseudos) {
        existingJSON.styles[selector].pseudos = [
          ...(existingJSON.styles[selector].pseudos || []),
          ...newJSON.styles[selector].pseudos
        ];
      }
    }
  });

  // Merge animations
  Object.keys(newJSON.animations).forEach(animationName => {
    if (!existingJSON.animations[animationName]) {
      existingJSON.animations[animationName] = newJSON.animations[animationName];
    } else {
      existingJSON.animations[animationName].keyframes = {
        ...existingJSON.animations[animationName].keyframes,
        ...newJSON.animations[animationName].keyframes
      };
      existingJSON.animations[animationName].properties = {
        ...existingJSON.animations[animationName].properties,
        ...newJSON.animations[animationName].properties
      };
    }
  });

  // Merge breakpoints
  Object.keys(newJSON.breakpoints).forEach(breakpoint => {
    if (!existingJSON.breakpoints[breakpoint]) {
      existingJSON.breakpoints[breakpoint] = newJSON.breakpoints[breakpoint];
    } else {
      Object.keys(newJSON.breakpoints[breakpoint]).forEach(selector => {
        if (!existingJSON.breakpoints[breakpoint][selector]) {
          existingJSON.breakpoints[breakpoint][selector] = newJSON.breakpoints[breakpoint][selector];
        } else {
          existingJSON.breakpoints[breakpoint][selector].base = {
            ...existingJSON.breakpoints[breakpoint][selector].base,
            ...newJSON.breakpoints[breakpoint][selector].base
          };
        }
      });
    }
  });

  return existingJSON;
}
window.fetchCssFile = async url => {
  const response = await fetch(url);
  return response.text();
}
window.generateCssQuickCommands = async url => {
  const css = await fetchCssFile(url);

  // Create a new CSSStyleSheet object
  const stylesheet = new CSSStyleSheet();
  await stylesheet.replace(css); // Replace with the CSS content

  const cssQuickCommands = {};

  // Iterate over all rules in the stylesheet
  for (const rule of stylesheet.cssRules) {
    // Skip pseudo-classes and animations
    if (rule.type === CSSRule.STYLE_RULE &&
        !rule.selectorText.includes(':') &&
        !rule.selectorText.includes('@keyframes')) {

      const className = rule.selectorText.replace('.', '');
      if (className) {
        const declarations = Array.from(rule.style)
          .filter(prop => !prop.startsWith('animation') && !prop.startsWith('transition'))
          .map(prop => `${prop}: ${rule.style[prop]};`)
          .join(' ');
        cssQuickCommands[className] = declarations;
      }
    }
  }

  return cssQuickCommands;
}
window.saveState = () => {
  // Save the current state to history
  const currentState = {
    rootVariables: project.css.rootVariables,
    styles: project.css,
    html: project.html,
    selectedLayerIds: data.selectedLayerIds
  };

  // Store the state as a stringified object
  const stateString = JSON.stringify(currentState);

  // Check if the last saved state is different from the current state
  if (data.history.length === 0 || data.history[data.historyIndex] !== stateString) {
    data.history = data.history.slice(0, data.historyIndex + 1); // Trim any redo history
    data.history.push(stateString); // Save the new state
    data.historyIndex++;
    localStorage.setItem('Polyrise', JSON.stringify(project));
  }
}
window.undo = () => {
  if (data.historyIndex > 0) {
    data.editorNavState = true;
    data.historyIndex--;
    const previousState = JSON.parse(data.history[data.historyIndex]);
    // Restore the previous state
    project.css.rootVariables = previousState.rootVariables;
    project.css = previousState.styles;
    project.html = previousState.html;
    data.selectedLayerIds = previousState.selectedLayerIds;
    data.editorNavState = null;
  }
}
window.redo = () => {
  if (data.historyIndex < data.history.length - 1) {
    data.editorNavState = true;
    data.historyIndex++;
    const nextState = JSON.parse(data.history[data.historyIndex]);
    // Restore the next state
    project.css.rootVariables = nextState.rootVariables;
    project.css = previousState.styles;
    project.html = nextState.html;
    data.selectedLayerIds = nextState.selectedLayerIds;
    data.editorNavState = null;
  }
}
window.customCode = () => {
  Modal.render({
    title: "Paste Custom Code",
    content: `
      <div class="p-4 text-center">
        <div class="p-4 text-center">
          <select id="bvk1c6j4o" class="uppercase">
            <option value="html">html</option>
            <option value="css">css</option>
          </select>
        </div>
        <div class="p-4 text-center">
          <textarea id="op95hyy3l" class="w-full h-[250px] resize-y" placeholder="Paste code here..."></textarea>
        </div>
      </div>
    `,
    onLoad() {
      document.getElementById('op95hyy3l').focus();
      document.getElementById('op95hyy3l').select();
    },
    onConfirm() {
      const selection = document.getElementById('bvk1c6j4o').value;
      let code = document.getElementById('op95hyy3l').value;
      if (selection === 'html') {
        addBlock(code);
      } else {
        code = minifyCSS(code);
        const newJSON = css2json(code);
        mergeCSSJSON(project.css, newJSON);
        document.querySelector('dialog[open]').querySelector('header > button').onclick();
      }
    }
  });
}
window.addLibrary = url => {
  if (!url) {
    project.libraries.push('');
    document.getElementById('librariesBox').innerHTML = renderLibraries();
    return false;
  }

  if (!project.libraries.includes(url)) {
    project.libraries.push(url);
  } else {
    console.error(`Library already exists: ${url}`);
  }

  if (document.getElementById('librariesBox')) {
    document.getElementById('librariesBox').innerHTML = renderLibraries();
  }
};
window.renderLibraries = () => {
  return project.libraries.map((library, index) => `
    <nav class="flex justify-between py-2" data-index="${index}">
      <input 
        type="text" 
        placeholder="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.15.2/Sortable.min.js" 
        data="library" 
        class="w-full pl-3 pr-0 rounded-md rounded-r-none focus:shadow-none"
        style="margin-bottom: 0;"
        value="${library}" 
        oninput="project.libraries[${index}] = this.value" />
      <button 
        aria-label="delete library"
        name="delete library"
        class="px-3 py-[15px] h-full border-0 rounded-md rounded-l-none"
        onclick="project.libraries.splice(${index}, 1);">
        ${icons.trash}
      </button>
    </nav>
  `).join('')
}
window.fetchSuggestions = key => {
  fetch(
    `https://api.cdnjs.com/libraries?search=${key}&fields=filename,description,version`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(item => {
      if (item && item.results && item.results.length > 0) {
        const suggestions = item.results.map(result => result);

        document.getElementById('pruz9lb2p').innerHTML = suggestions.map(result => {
          return `
            <section 
              class="cursor-pointer"
              onclick="
                if (!project.libraries.includes('${result.latest}')) project.libraries.push('${result.latest}'); 
                data.searchLibKey = null;
                data.librarySuggestions = null;
                searchInput.value = null;
                renderPreview(true);
                const dialog = this.closest('dialog');
                if (dialog) dialog.querySelector('header > button').onclick();
              ">
              <div class="flex justify-between mb-2 font-bold text-1xl">
                <span class="font-bold">${result.name}</span>
                <span class="font-bold">${result.version}</span>
              </div>
              <div class="text-sm font-thin">${result.description}<br><hr></div>
            </section>`;
        }).join('');
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
}
window.removeScript = src => {
  const script = document.querySelector(`script[src="${src}"]`);
  if (script) script.remove();
}
window.removeScripts = scripts => {
  scripts.forEach(src => {
    const script = document.querySelector(`script[src="${src}"]`);
    if (script) script.remove();
  });
}
window.loadScript = async scriptUrl => {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      resolve(); // If the script is already present, resolve immediately
      return;
    }

    // Create a new script element if not present
    const scriptElement = document.createElement('script');
    scriptElement.src = scriptUrl;
    scriptElement.onload = resolve; // Resolve when the script is successfully loaded
    scriptElement.onerror = () => reject(new Error(`Failed to load script: ${scriptUrl}`)); // Reject on error
    document.body.appendChild(scriptElement); // Append the script to the body
  });
}
window.loadScripts = async srcArray => {
  return Promise.all(srcArray.map(loadScript));
}

// layers functions
window.layerUp = (shiftKeyPressed = false) => {
  saveState(); // Save state before making changes

  // Get the selected layer IDs
  const selectedLayerIds = data.selectedLayerIds;

  if (selectedLayerIds.length === 0) {
    console.error("No layers selected.");
    return;
  }

  // Process each selected layer
  selectedLayerIds.forEach((layerId) => {
    const { layer, parent } = findLayerById(layerId, project.html);

    if (!layer || !parent) {
      console.error(`Layer or parent not found for ID: ${layerId}`);
      return;
    }

    const siblings = parent.children || parent; // Handle root layers or nested layers
    const currentIndex = siblings.indexOf(layer);

    // If the layer is already at the top, skip it
    if (currentIndex === siblings.length - 1) return;

    if (shiftKeyPressed) {
      // Move the layer to the top of its container
      siblings.splice(currentIndex, 1); // Remove from current position
      siblings.push(layer); // Add to the end (top)
    } else {
      // Move the layer up by one position
      const nextIndex = currentIndex + 1;
      if (nextIndex < siblings.length) {
        // Swap positions
        [siblings[currentIndex], siblings[nextIndex]] = [
          siblings[nextIndex],
          siblings[currentIndex],
        ];
      }
    }
  });

  clearAllSelections(); // Clear selections after moving
  saveState(); // Save state after making changes
};
window.executeQuery = (queriesString, replaceSelection = true) => {
  if (!queriesString) {
    clearAllSelections();
    return;
  }

  const queries = queriesString.split(',').map(q => q.trim());

  function handleSpecialCommand(command) {
    switch (command) {
      case 'f':
        foldAllLayers(true); // Collapse all layers
        break;
      case 'u':
        foldAllLayers(false); // Uncollapse all layers
        break;
      case 'h':
        hideAllLayers(true); // Hide all layers
        break;
      case 's':
        hideAllLayers(false); // Show all layers
        break;
      case 'e':
        emptyChildren(); // Empty all children from selections
        break;
      case 'cas':
        project.css = {
          "rootVariables": {},
          "styles": {},
          "animations": {},
          "breakpoints": {}
        };
        break;
        default:
        console.warn('Unknown command:', command);
    }
  }

  function matchesPseudoClass(layer, pseudoClass, index, total) {
    switch (pseudoClass) {
      case 'first-child': return index === 0;
      case 'last-child': return index === total - 1;
      case 'nth-child': return (index + 1) === parseInt(pseudoClass.split('(')[1], 10);
      case 'nth-last-child': return (total - index) === parseInt(pseudoClass.split('(')[1], 10);
      case 'only-child': return total === 1;
      case 'empty': return !(layer.children && layer.children.length > 0);
      case 'first-of-type': return layer.tagOccurrences.index === 0;
      case 'last-of-type': return layer.tagOccurrences.reverseIndex === 0;
      case 'nth-of-type': return layer.tagOccurrences.index === parseInt(pseudoClass.split('(')[1], 10) - 1;
      case 'nth-last-of-type': return layer.tagOccurrences.reverseIndex === parseInt(pseudoClass.split('(')[1], 10) - 1;
      case 'only-of-type': return layer.tagOccurrences.total === 1;
      default: return false;
    }
  }

  function selectLayersRecursive(layers, query, callback) {
    let activeCalls = 0; // Track active recursive calls
  
    function processLayers(layers) {
      activeCalls++; // Increment the active call count
  
      layers.forEach((layer, index) => {
        let match = false;
  
        // Extract selector and pseudo-class
        const [selector, pseudoClassPart] = query.split(':');
        const pseudoClass = pseudoClassPart || null;
  
        // Parse selector
        let [tag, classNames, attribute, value] = [null, [], null, null];
        const attributeMatch = /\[([^\]]+)\]/.exec(selector);
        if (attributeMatch) {
          [attribute, value] = attributeMatch[1].split('=');
        }
        const classMatches = /\.([^.\[]+)/g;
        let matchResult;
        while ((matchResult = classMatches.exec(selector)) !== null) {
          classNames.push(matchResult[1]);
        }
        tag = selector.split(/[\.\[]/)[0];
  
        // Check tag match
        if (tag && layer.tag !== tag) match = false;
        else match = true;
  
        // Check class match
        if (classNames.length > 0) {
          if (!layer.props || !layer.props.class) match = false;
          else {
            const layerClasses = layer.props.class.split(' ');
            match = classNames.every(className => layerClasses.includes(className));
          }
        }
  
        // Check attribute match
        if (attribute) {
          if (value) {
            // Ensure attribute is matched specifically, not just any property
            if (layer.props && layer.props[attribute] !== value) match = false;
          } else {
            // Ensure attribute is matched specifically, not just any property
            if (!layer.props || !layer.props.hasOwnProperty(attribute)) match = false;
          }
        }
  
        // Check pseudo-class match
        if (match && pseudoClass) {
          const total = layers.length;
          if (!matchesPseudoClass(layer, pseudoClass, index, total)) match = false;
        }
  
        // Apply selection
        if (match) {
          layer.state.selected = true;
          if (!data.selectedLayerIds.includes(layer.id)) {
            data.selectedLayerIds.push(layer.id);
          }
        }
  
        // Recursively apply to children
        if (layer.children && layer.children.length > 0) {
          processLayers(layer.children);
        }
      });
  
      activeCalls--; // Decrement the active call count
  
      // If this was the last active call, invoke the callback
      if (activeCalls === 0 && callback && typeof callback === 'function') {
        callback();
      }
    }
  
    // Start processing layers
    processLayers(layers);
  }

  function targetChildrenOfSelections(query, callback) {
    if (data.selectedLayerIds.length > 0) {
      // Find the layers by IDs and target their children
      const selectedLayers = data.selectedLayerIds.map(id => findLayerById(id, project.html));
      if (selectedLayers.length > 0) {
        // Collect children of selected layers
        const children = selectedLayers.flatMap(group => group.layer.children || []);
        // Select layers from children
        selectLayersRecursive(children, query);
      }

      // Invoke the callback if provided
      if (typeof callback === 'function') {
        callback();
      }
    }
  }

  function processQuery(query) {
    // Find the index of the '=' symbol
    const equalsIndex = query.indexOf('=');
  
    // If '=' is found, convert the portion before it to lowercase
    if (equalsIndex !== -1) {
      const prefix = query.slice(0, equalsIndex).toLowerCase();
      query = prefix + query.slice(equalsIndex);
    }
    
    if (query.startsWith('t=')) {
      if (replaceSelection) clearAllSelections();
      selectLayersRecursive(project.html, query.slice(2));
    } else if (query.startsWith('r=')) {
      clearAllSelections();
      selectLayersRecursive(project.html, query.slice(2), () => {
        deleteLayers();
      });
    } else if (query.startsWith('e=')) {
      clearAllSelections();
      selectLayersRecursive(project.html, query.slice(2), () => {
        emptyChildren();
      });
    } else if (query.startsWith('c=')) {
      if (data.selectedLayerIds.length > 0) {
        if (data.replaceCurrentSelection) {
          let currentIDs = [...data.selectedLayerIds];
          targetChildrenOfSelections(query.slice(2), () => {
            currentIDs.forEach(id => {
              const { layer } = findLayerById(id, project.html);
              layer.state.selected = false;
            });
          });
        } else {
          targetChildrenOfSelections(query.slice(2));
        }
      } else {
        console.error('no layers selected');
      }
    } else if (query.startsWith('mv=')) {
      if (data.selectedLayerIds.length > 0) {
        if (replaceSelection) clearAllSelections();
        cutLayers(() => {
          selectLayersRecursive(project.html, query.slice(3), () => {
            pasteLayers();
          });
        });
      }
    } else if (query.startsWith('rs=')) {
      if (data.selectedLayerIds.length > 0) {
        if (replaceSelection) clearAllSelections();
        clearStyles(project.html, query.slice(3), () => {
          saveState();  // Callback after clearStyles completes
        });
      }
    }  else {
      handleSpecialCommand(query);
    }
  }

  queries.forEach(processQuery);
}
window.toggleCollapse = layerId => {
  if (project.activePanel !== 'layers') project.activePanel = 'layers';
  let targetLayer = null;
  let parentLayer = null;

  // Function to recursively find the target layer and its parent
  function findLayerAndParent(layer, parent = null) {
    if (layer.id === layerId) {
      targetLayer = layer;
      parentLayer = parent;
      return true; // Found the layer
    }

    if (layer.children) {
      for (let i = 0; i < layer.children.length; i++) {
        if (findLayerAndParent(layer.children[i], layer)) {
          return true; // Found the layer in children
        }
      }
    }

    return false; // Layer not found
  }

  // Function to collapse or uncollapse all siblings to match the target layer's state
  function applyCollapseStateToSiblings(layers, collapseState) {
    layers.forEach(layer => {
      if (layer !== targetLayer) {
        layer.state.collapsed = collapseState;
      }
    });
  }

  // Check top-level layers directly
  for (let i = 0; i < project.html.length; i++) {
    let layer = project.html[i];
    if (layer.id === layerId) {
      targetLayer = layer;
      parentLayer = null; // No parent for top-level layers
      break;
    } else {
      findLayerAndParent(layer);
    }
  }

  if (targetLayer) {
    // Toggle the target layer's collapse state
    const newCollapseState = !targetLayer.state.collapsed;
    targetLayer.state.collapsed = newCollapseState;

    if (data.shiftKey) {
      if (parentLayer) {
        // Apply to siblings within the same parent layer
        applyCollapseStateToSiblings(parentLayer.children, newCollapseState);
      } else {
        // Apply to all top-level layers
        applyCollapseStateToSiblings(project.html, newCollapseState);
      }
    }

    // Render the application (if needed)
    App.render("#app");
  }
}
window.foldAllLayers = (state = false) => {
  if (project.activePanel !== 'layers') project.activePanel = 'layers';
  function collapseLayer(layer) {
    layer.state.collapsed = state;
    if (layer.children) layer.children.forEach(child => collapseLayer(child));
  }

  project.html.forEach(layer => collapseLayer(layer));
}
window.hideAllLayers = (state = false) => {
  if (project.activePanel !== 'layers') project.activePanel = 'layers';
  function hideLayer(layer) {
    layer.state.visible = !state;
    if (layer.children) layer.children.forEach(child => hideLayer(child));
  }

  project.html.forEach(layer => hideLayer(layer));
}
window.toggleVisible = layerId => {
  if (project.activePanel !== 'layers') project.activePanel = 'layers';
  let targetLayer = null;
  let parentLayer = null;

  // Function to recursively find the target layer and its parent
  function findLayerAndParent(layer, parent = null) {
    if (layer.id === layerId) {
      targetLayer = layer;
      parentLayer = parent;
      return true; // Found the layer
    }

    if (layer.children) {
      for (let i = 0; i < layer.children.length; i++) {
        if (findLayerAndParent(layer.children[i], layer)) {
          return true; // Found the layer in children
        }
      }
    }

    return false; // Layer not found
  }

  // Function to set visibility for all siblings to match the target layer's state
  function applyVisibilityToSiblings(layers, visibilityState) {
    layers.forEach(layer => {
      if (layer !== targetLayer) {
        layer.state.visible = visibilityState;
      }
    });
  }

  // Check top-level layers directly
  for (let i = 0; i < project.html.length; i++) {
    let layer = project.html[i];
    if (layer.id === layerId) {
      targetLayer = layer;
      parentLayer = null; // No parent for top-level layers
      break;
    } else {
      findLayerAndParent(layer);
    }
  }

  if (targetLayer) {
    // Toggle the target layer's visibility state
    const newVisibilityState = !targetLayer.state.visible;
    targetLayer.state.visible = newVisibilityState;

    // Apply the new visibility state to all siblings
    if (data.shiftKey) {
      if (parentLayer) {
        // Apply to siblings within the same parent layer
        applyVisibilityToSiblings(parentLayer.children, newVisibilityState);
      } else {
        // Apply to all top-level layers
        applyVisibilityToSiblings(project.html, newVisibilityState);
      }
    }
  }
}
window.selectedBlock = layerId => {
  if (project.activePanel !== 'layers') project.activePanel = 'layers';
  let targetLayer = null;
  let parentLayer = null;

  // Function to find the layer and its parent
  function findLayerAndParent(layer, parent = null) {
    if (layer.id === layerId) {
      targetLayer = layer;
      parentLayer = parent;
      return true; // Found the layer
    }

    if (layer.children) {
      for (let i = 0; i < layer.children.length; i++) {
        if (findLayerAndParent(layer.children[i], layer)) {
          return true; // Found the layer in children
        }
      }
    }

    return false; // Layer not found
  }

  // Apply selection state to all siblings
  function applySelectionToSiblings(layers, selectionState) {
    layers.forEach(layer => {
      if (layer !== targetLayer) {
        const childIndex = data.selectedLayerIds.indexOf(layer.id);
        if (selectionState) {
          if (childIndex === -1) {
            data.selectedLayerIds.push(layer.id);
            layer.state.selected = true;
          }
        } else {
          if (childIndex > -1) {
            data.selectedLayerIds.splice(childIndex, 1);
            layer.state.selected = false;
          }
        }
      }
    });
  }

  // Check top-level layers directly
  for (let i = 0; i < project.html.length; i++) {
    let layer = project.html[i];
    if (layer.id === layerId) {
      targetLayer = layer;
      parentLayer = null; // No parent for top-level layers
      break;
    } else {
      findLayerAndParent(layer);
    }
  }

  if (targetLayer) {
    const isSelected = data.selectedLayerIds.includes(layerId);
    const newSelectionState = !isSelected;

    // If replaceCurrentSelection is true and shiftKey is not pressed, clear all selections
    if (data.cmdKey && !data.shiftKey) {
      data.selectedLayerIds.forEach(id => {
        const layer = findLayerById(id);
        if (layer) {
          layer.state.selected = false;
        }
      });
      data.selectedLayerIds = []; // Clear all selections
    }

    // Toggle selection state of the target layer
    if (newSelectionState) {
      data.selectedLayerIds.push(layerId);
      const lastSelectedLayerId = data.selectedLayerIds[data.selectedLayerIds.length - 1];
      const layer = findLayerById(lastSelectedLayerId);
      data.stylesTarget = layer.style;
      data.breakpointKey = null;
    } else {
      const index = data.selectedLayerIds.indexOf(layerId);
      if (index > -1) {
        data.selectedLayerIds.splice(index, 1);
      }
    }
    targetLayer.state.selected = newSelectionState;

    // Apply selection state to siblings
    if (data.shiftKey) {
      if (parentLayer) {
        // Apply to siblings within the same parent layer
        applySelectionToSiblings(parentLayer.children, newSelectionState);
      } else {
        // Apply to all top-level layers
        applySelectionToSiblings(project.html, newSelectionState);
      }
    }
  }

  function findLayerById(id) {
    let foundLayer = null;
    for (let i = 0; i < project.html.length; i++) {
      function searchLayer(layer) {
        if (layer.id === id) {
          foundLayer = layer;
          return true;
        }
        if (layer.children) {
          for (let j = 0; j < layer.children.length; j++) {
            if (searchLayer(layer.children[j])) {
              return true;
            }
          }
        }
        return false;
      }
      searchLayer(project.html[i]);
      if (foundLayer) break;
    }
    return foundLayer;
  }
}
window.collectSelectedIDs = layers => {
  layers.forEach(layer => {
    if (layer.state && layer.state.selected) {
      data.selectedLayerIds.push(layer.id);
    }
    if (layer.children && layer.children.length > 0) {
      collectSelectedIDs(layer.children);
    }
  });
}
window.clearAllSelections = () => {
  data.selectedLayerIds = [];
  data.stylesTarget = null;
  clearSelection(project.html);
}
window.clearSelection = layers => {
  layers.forEach(layer => {
    layer.state.selected = false;
    if (layer.children) clearSelection(layer.children);
  });
}
window.clearSelectionExcept = (excludeId, layers) => {
  layers.forEach(layer => {
    if (layer.id !== excludeId) {
      layer.state.selected = false;
    } else {
      layer.state.selected = true;
    }
    if (layer.children) clearSelectionExcept(excludeId, layer.children);
  });
}
window.findLayerById = (id, layers, parent = null) => {
  // Ensure layers is a valid array before looping
  if (!Array.isArray(layers)) {
    console.error("findLayerById: layers is not an array or is undefined", layers);
    return null;
  }

  for (const layer of layers) {
    // Ensure layer is defined before accessing its properties
    if (!layer || typeof layer !== "object") {
      console.error("findLayerById: Encountered an invalid layer", layer);
      continue;
    }

    if (layer.id === id) return { layer, parent };

    if (Array.isArray(layer.children)) {
      const found = findLayerById(id, layer.children, layer);
      if (found) return found;
    }
  }
  
  return null;
};
window.canAcceptChildren = layer => {
  const elementsThatDontAcceptChildren = [
    'audio',
    'datalist',
    'iframe',
    'img',
    'input',
    'meter',
    'option',
    'progress',
    'select',
    'textarea',
    'video'
  ];  
  
  return !elementsThatDontAcceptChildren.includes(layer.tag);
}
window.addBlock = html => {
  saveState(); // Save state before making changes

  // Function to assign an ID to each new block
  const assignIds = (blocks, callback) => {
    blocks.forEach(block => {
      block.id = generateId(); // Assign a new ID
      if (block.children) {
        assignIds(block.children); // Recursively assign IDs to children if they exist
      }
    });

    if (callback && typeof callback === 'function') {
      callback(); // Call the callback function after all IDs have been assigned
    }
  };

  // Process the input HTML or object
  const newBlocks = html2json(html);

  if (data.selectedLayerIds.length > 0) {
    data.selectedLayerIds.forEach(id => {
      const result = findLayerById(id, project.html);
      if (result) {
        const { layer, parent } = result;

        // Set the selected state to false and remove the ID from selectedLayerIds
        layer.selected = false;
        data.selectedLayerIds = data.selectedLayerIds.filter(layerId => layerId !== id);

        if (canAcceptChildren(layer)) {
          if (data.blockWrap) {
            // Ensure the new block can hold children
            const parentBlock = newBlocks[0];
            if (canAcceptChildren(parentBlock)) {
              // Ensure `parentBlock.children` is initialized
              parentBlock.children = parentBlock.children || [];
              parentBlock.children.push(layer); // Make the selected layer a child of the new block

              // Assign IDs to the new parent block and its children
              assignIds(newBlocks, () => {
                // Push the new parent block to the original parent's children
                if (parent && parent.children) {
                  parent.children = parent.children.map(child =>
                    child.id === layer.id ? parentBlock : child
                  );
                } else {
                  project.html = project.html.map(child =>
                    child.id === layer.id ? parentBlock : child
                  );
                }
              });
            }
          } else {
            // Ensure `layer.children` is initialized
            layer.children = layer.children || [];

            // Assign IDs and then push new blocks
            assignIds(newBlocks, () => {
              newBlocks.forEach(newBlock => {
                layer.children.push(newBlock); // Push new block after ID assignment
              });
            });
          }
        }
      }
    });
  } else {
    // If user has no layers selected, add to the root layer structure
    assignIds(newBlocks, () => {
      newBlocks.forEach(newBlock => project.html.push(newBlock)); // Push new block after ID assignment
    });
  }

  clearAllSelections();
  saveState(); // Save state after making changes
  document.querySelector('dialog[open]').querySelector('header > button').onclick();
};

window.selectLayersByStyleRef = (style, layers) => {
  for (const layer of layers) {
    // Deselect all layers
    layer.state.selected = false;

    // Check if the current layer matches the style reference
    if (layer.style === style) {
      data.selectedLayerIds.push(layer.id);
      layer.state.selected = true;
      // Continue searching in children even if the parent is selected
    }

    // Recursively check children if they exist
    if (layer.children && layer.children.length > 0) {
      selectLayersByStyleRef(style, layer.children);
    }
  }
};
window.deleteLayers = () => {
  saveState(); // Save state before making changes
  data.editorNavState = true;

  // Create a copy of selectedLayerIds to avoid modifying the array while iterating
  const selectedIds = [...data.selectedLayerIds];

  selectedIds.forEach((id) => {
    const layerExists = removeLayerById(id, project.html);

    // If the layer was not found, remove its ID from data.selectedLayerIds
    if (!layerExists) {
      const index = data.selectedLayerIds.indexOf(id);
      if (index !== -1) {
        data.selectedLayerIds.splice(index, 1);
      }
    }
  });

  // Execute a callback function once all layers are processed
  onLayersDeleted(() => {
    data.selectedLayerIds = []; // Clear selection after deletion
    data.editorNavState = null;
    saveState(); // Save state after making changes
  });
};
// Callback function to execute when layers are deleted
function onLayersDeleted(callback) {
  // Wrap in setTimeout to ensure it runs after the loop
  setTimeout(() => {
    if (typeof callback === "function") {
      callback();
    }
  }, 300);
}
window.removeLayerById = (id, layers) => {
  // Check if layers is defined and is an array
  if (!Array.isArray(layers)) {
    console.error("Invalid layers array:", layers);
    return false; // Layer not found
  }

  for (const layer of layers) {
    // Check if layer is defined
    if (!layer) {
      console.error("Undefined layer encountered in removeLayerById:", layer);
      continue; // Skip undefined layers
    }

    // Check if layer has an id property
    if (typeof layer.id === "undefined") {
      console.error("Layer does not have an id property:", layer);
      continue; // Skip invalid layers
    }

    if (layer.id === id) {
      const index = layers.findIndex((l) => l.id === id);
      if (index !== -1) {
        layers.splice(index, 1); // Remove layer from the main layers array
        return true; // Layer found and removed
      }
    }

    if (layer.children) {
      // Check if children is an array
      if (!Array.isArray(layer.children)) {
        console.error("Invalid children array in layer:", layer);
        continue; // Skip invalid children arrays
      }

      const index = layer.children.findIndex((child) => child && child.id === id);
      if (index !== -1) {
        layer.children.splice(index, 1); // Remove from children
        return true; // Layer found and removed
      } else {
        const layerExistsInChildren = removeLayerById(id, layer.children);
        if (layerExistsInChildren) {
          return true; // Layer found and removed in nested children
        }
      }
    }
  }

  return false; // Layer not found
};
window.cloneLayers = () => {
  let modalContent = `<div>
    <input 
      id="b40h7qc6d"
      type="number" 
      min="1" 
      step="1" 
      value="${data.increment}"
      oninput="data.increment = this.value;"
      focus="true"
      onkeydown="
        if (event.key === 'Enter') {
          document.querySelector('dialog[open]').querySelector('footer > button:last-child').onclick();
        }
      "
    />
  </div>`;

  Modal.render({
    title: `How many times do you want to clone this block?`,
    content: modalContent,
    onLoad() {
      document.getElementById('b40h7qc6d').focus();
      document.getElementById('b40h7qc6d').select();
    },
    onConfirm() {
      saveState(); // Save state before making changes

      const cloneCount = parseInt(data.increment, 10);
      
      if (isNaN(cloneCount) || cloneCount <= 0) {
        console.error('Invalid clone count:', cloneCount);
        return;
      }

      data.selectedLayerIds.forEach(id => {
        const { layer, parent } = findLayerById(id, project.html);
    
        if (layer) {
          for (let i = 0; i < cloneCount; i++) {
            const clonedLayer = cloneLayerObject(layer);
    
            if (parent && Array.isArray(parent.children)) {
              const index = parent.children.findIndex(child => child.id === layer.id);
              if (index !== -1) {
                parent.children.splice(index + 1, 0, clonedLayer);
              } else {
                console.error("Selected layer not found in parent's children:", layer);
              }
            } else if (!parent) {
              const index = project.html.findIndex(rootLayer => rootLayer.id === layer.id);
              if (index !== -1) {
                project.html.splice(index + 1, 0, clonedLayer);
              } else {
                console.error('Selected layer not found in root layer structure:', layer);
              }
            }
          }
        } else {
          console.error('Layer not found for ID:', id);
        }
      });
    
      clearAllSelections(); // Clear selection after cloning
      saveState(); // Save state after making changes
    }
  });
}

window.cloneLayerObject = layer => {
  const clonedLayer = JSON.parse(JSON.stringify(layer)); // Deep clone
  clonedLayer.id = generateId(); // Assign a new ID

  if (clonedLayer.children) {
    clonedLayer.children = clonedLayer.children.map(child => cloneLayerObject(child)); // Clone children recursively
  }
  return clonedLayer;
}
window.cutLayers = callback => {
  saveState(); // Save state before making changes
  data.editorNavState = true;
  copyLayers();
  data.selectedLayerIds.forEach(id => {
    removeLayerById(id, project.html);
  });
  data.selectedLayerIds = []; // Clear selection after deletion
  saveState(); // Save state after making changes
  data.editorNavState = null;

  // Call the callback function if provided
  if (callback && typeof callback === 'function') {
    callback();
  }
}
window.copyLayers = () => {
  data.clipboard = data.selectedLayerIds.map(id => {
    const { layer } = findLayerById(id, project.html);
    return cloneLayerObject(layer); // Clone layer without deleting
  });
}
window.pasteLayers = () => {
  saveState(); // Save state before making changes
  if (data.clipboard.length > 0) {
    const pastedLayers = data.clipboard.map(layer => {
      return cloneLayerObject(layer); // Clone layer with new IDs
    });

    if (data.selectedLayerIds.length > 0) {
      data.selectedLayerIds.forEach(id => {
        const { layer } = findLayerById(id, project.html);
        if (layer && canAcceptChildren(layer)) {
          layer.children = layer.children || [];
          layer.children.push(...pastedLayers);
        }
      });
    } else {
      project.html.push(...pastedLayers); // Paste to root if no layer selected
    }

    data.clipboard = []; // Clear clipboard after pasting
    clearAllSelections(); // Clear selection after pasting
    saveState(); // Save state after making changes
  }
}
window.removeAttributeFromLayers = property => {
  saveState();
  data.selectedLayerIds.forEach(id => {
    const { layer } = findLayerById(id, project.html);
    // Delete the key from the props object
    if (layer) delete layer.props[property];
  });
  saveState();
}
window.removeProp = key => {
  Modal.render({
    title: `Are you sure you want to delete the ${key} attribute?`,
    content: `
      <div class="p-4 text-center">You will still be able to undo.</div>
    `,
    onConfirm() {
      removeAttributeFromLayers(key);
    }
  });
}
window.emptyChildren = () => {
  saveState(); // Save state before making changes
  if (data.selectedLayerIds.length > 0) {
    data.selectedLayerIds.forEach(id => {
      const { layer } = findLayerById(id, project.html);
      if (layer.children) layer.children = [];
      if (layer.text) {
        layer.text = '';
      }
    });
  }
  saveState(); // Save state after making changes
}
window.updateElement = (key, propKey, value, initIncrement = false) => {
  const incrementPattern = /{n}/g; // Pattern to detect increment placeholder
  
  saveState();
  data.selectedLayerIds.forEach((id, index) => {
    const { layer } = findLayerById(id, project.html);
    if (layer) {
      if (key !== 'props') {
        if (key === 'text') {
          if (!value) {
            layer.text = "";
          } else {
            if (initIncrement && incrementPattern.test(value)) {
              // If initIncrement is true, increment the {n} pattern
              layer.text = value.replace(incrementPattern, index + 1);
            } else {
              layer.text = value; // Otherwise, just use the given value
            }
          }
        } else {
          // General case for non-text keys
          layer[`${key}`] = value;
        }
      } else {
        // Handling props (e.g., attributes)
        if (initIncrement && incrementPattern.test(value)) {
          // If initIncrement is true, increment the {n} pattern in props
          layer.props[`${propKey}`] = value.replace(incrementPattern, index + 1);
        } else {
          layer.props[`${propKey}`] = value; // Otherwise, just use the given value
        }
      }
    }
  });
  saveState();
};
window.updateImageMedia = (id, type) => {
  let target = findLayerById(id, project.html).layer.props['src'];
  let modalContent = `<div class="p-4 text-center grid grid-cols-1 gap-4 place-items-center">
    <input id="ixkq65jma" class="hidden" type="file" name="image" onchange="updateMediaSource(event, '${type}', document.getElementById('p8gnvn4o7'))">
    <figure>
      <picture>
        <label for="ixkq65jma" class="cursor-pointer">
          <img id="p8gnvn4o7" class="cursor-pointer" src="${target}" alt="Your image" loading="lazy">
        </label>
      </picture>
      <figcaption>
        <span>Api courtesy of 
        <a href="https://openverse.org/" target="_blank">Openverse</a>.
      </figcaption>
    </figure>
    <fieldset role="group" class="mb-0 w-full place-items-center">
      <input 
        id="search-input" 
        type="text" 
        placeholder="Search for images..." 
        class="p-2 w-full" 
        onkeydown="
          if (event.key === 'Enter') {
            document.getElementById('search-btn').click();
          }
      "/>
      <button id="search-btn">
        ${icons.search}
      </button>
    </fieldset>
    <div id="search-results" class="mt-4 grid grid-cols-3 gap-2"></div>
    <div class="font-thin text-xs">
      You can grab your own high-res image by searching <a href="https://pixabay.com/" target="_blank">Pixabay.com</a> or <a href="https://pexels.com/" target="_blank">Pexels.com</a>.
    </div>
  </div>`;
  
  Modal.render({
    title: "Are you sure you want to replace the image source?",
    content: modalContent,
    onLoad() {
      const searchField = document.getElementById('search-input');
      searchField.focus();
  
      const handleSearch = async () => {
        if (searchField.value) {
          const results = await searchOpenverseImage(searchField.value);
          displayResults(results);
        } else {
          document.getElementById('search-results').innerHTML = '';
          return false;
        }
      };
  
      searchField.oninput = handleSearch;
      document.getElementById('search-btn').onclick = handleSearch;

      function displayResults(results) {
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = results.map(result => `
          <img 
            src="${result.thumbnail}" 
            alt="${result.title}" 
            loading="lazy"
            class="cursor-pointer w-full" 
            onclick="
              document.getElementById('p8gnvn4o7').src = '${result.url}';
              this.closest('article').scrollTop = 0;
            "/>
        `).join('');
      }
    },
    onConfirm() {
      data.selectedLayerIds.forEach(id => {
        const { layer } = findLayerById(id, project.html);
        if (layer) {
          if (layer.tag === "img") {
            saveState();
            layer.props[`src`] = document.getElementById('p8gnvn4o7').src;
            saveState();
          }
        }
      });
    }
  });
}
window.searchOpenverseImage = async query => {
  const url = `https://api.openverse.org/v1/images?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (response.ok) {
      const data = await response.json();
      return data.results;
  } else {
      console.error("API request failed:", response.status);
      return [];
  }
}
window.updateAudioMedia = (id, type) => {
  let target = findLayerById(id, project.html).layer;
  if (target.tag !== 'audio' || type !== 'audio') return;
  let uniqueId = generateId();
  if (!target.props) target.props = {};
  if (target.props.id) target.props.id = uniqueId;
  if (!target.props.id) target.props['id'] = uniqueId;
  
  const audioHTML = json2html([target]);
  let modalContent = `<style>
    #xdbmkeqha audio {
      width: 100%;
    }
  </style>
  
  <div class="p-4 grid grid-cols-1 gap-4 items-center">
    <input id="ixkq65jma" class="hidden" type="file" name="audio" onchange="updateMediaSource(event, '${type}', document.getElementById('${uniqueId}'))">
    <figure class="text-center">
      <nav id="xdbmkeqha" class="items-center">
        ${audioHTML}

        <button 
          class="ml-4 font-thin text-xs bg-transparent border-0"
          style="color: unset;"
          onclick="
            document.getElementById('ixkq65jma').click();
          "
        >
          ${icons.upload}
        </button>
      </nav>
      <figcaption>
        <span>Api courtesy of 
        <a href="https://openverse.org/" target="_blank">Openverse</a>.
      </figcaption>
    </figure>
    <fieldset role="group" class="mb-0 w-full items-center">
      <input 
        id="search-input" 
        type="text" 
        placeholder="Search for audios..." 
        class="p-2 w-full" 
        onkeydown="
          if (event.key === 'Enter') {
            document.getElementById('search-btn').click();
          }
      "/>
      <button id="search-btn">
        ${icons.search}
      </button>
    </fieldset>
    <div id="search-results" class="mt-4 grid grid-cols-1 gap-2"></div>
    <div class="font-thin text-xs text-center">
      You can also grab your own audio files from <a href="https://freesound.org/" target="_blank">freesound.org</a>.
    </div>
  </div>`;
  
  Modal.render({
    title: "Are you sure you want to replace the audio element?",
    content: modalContent,
    onLoad() {
      const searchInput = document.getElementById('search-input');
      const searchBtn = document.getElementById('search-btn');
      const resultsContainer = document.getElementById('search-results');
      searchInput.focus();
  
      const handleSearch = async () => {
        if (searchInput.value) {
          const results = await searchOpenverseAudio(searchInput.value);
          displayResults(results);
        } else {
          resultsContainer.innerHTML = '';
          return false;
        }
      };
  
      searchInput.oninput = handleSearch;
      searchBtn.onclick = handleSearch;

      function displayResults(results) {
        if (results.length === 0) {
          resultsContainer.innerHTML = `<p>No results found.</p>`;
        } else {
          resultsContainer.innerHTML = results.map(result => `
            <div>
              <div class="font-thin mb-2">${result.title}</div>
              <figure>
                <nav class="text-center place-items-center">
                  <audio controls class="w-full" preload="true">
                    <source src="${result.url}" type="${result.mime_type}">
                    Your browser does not support the audio element.
                  </audio>
                  <button 
                    class="ml-4 font-thin text-xs" 
                    onclick="
                      const audio = document.getElementById('${uniqueId}');
                      audio.src = '${result.url}';
                      const sources = audio.querySelectorAll('source');
                      sources.forEach(source => {
                        source.src = this.previousElementSibling.src;
                      });
                      this.closest('article').scrollTop = 0;
                    "
                  >
                    Select
                  </button>
                </nav>
                <figcaption class="font-thin text-sm">
                  <span>Artist is 
                  <a href="${result.foreign_landing_url}" target="_blank">${result.creator}</a>.
                </figcaption>
              </figure>
            </div>
          `).join('');
    
          // Reinitialize audio elements to ensure they work properly
          const audios = resultsContainer.querySelectorAll('audio');
          audios.forEach(audio => {
            const src = audio.querySelector('source').getAttribute('src');
            audio.load(); // Ensure the audio element is fully loaded
            audio.src = src; // Re-set the src to trigger playback readiness
          });
        }
      }
    },
    onConfirm() {
      data.selectedLayerIds.forEach(id => {
        const { layer } = findLayerById(id, project.html);
        if (layer) {
          source = document.getElementById(uniqueId).outerHTML;
          let obj = html2json(source)[0];
  
          saveState();
          // Update properties directly instead of reassigning the whole object
          Object.keys(obj).forEach(key => {
            if (key === "id") return;
            layer[key] = obj[key];
          });
          findLayerById(id, project.html).layer.state.selected = null;
          findLayerById(id, project.html).layer.state.selected = true;
          saveState();
        }
      });
    }
  });
}
window.searchOpenverseAudio = async query => {
  const url = `https://api.openverse.org/v1/audio?q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data.results;
  } else {
    console.error("API request failed:", response.status);
    return [];
  }
}
window.updateMediaSource = async (event, type, element) => {
  const file = event.target.files[0];
  if (!file) return; // If no file selected, return

  try {
    // Check if the file is an SVG
    if (type === "svg") {
      // Read the file content as text (SVG markup)
      const svgCode = await file.text();
      
      // Update target with SVG code
      document.getElementById('vl61t8366').querySelector('svg').outerHTML = svgCode;
      document.getElementById('vl61t8366').querySelector('svg').setAttribute('id', 'p8gnvn4o7');
    } else {
      // Handle non-SVG and non-image files (e.g., convert to base64)
      const base64String = await fileToBase64(file);
      element.setAttribute('src', base64String);
    }
  } catch (error) {
    console.error('Error reading file:', error);
  }
}
window.checkApiConnection = async () => {
  try {
    const response = await fetch('https://api.iconify.design/collections');
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.error("API connection failed:", error);
  }
  return false;
}
window.fetchIconifySvg = async icon => {
  const hosts = [
    `https://api.iconify.design/${icon}.svg`,
    `https://api.simplesvg.com/${icon}.svg`,
    `https://api.unisvg.com/${icon}.svg`
  ];

  for (const url of hosts) {
    try {
      const response = await fetch(url, { timeout: 750 });
      if (response.ok) {
        return await response.text();
      } else if (response.status === 404) {
        console.warn(`Icon not found at ${url}`);
        continue;
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${url}:`, error);
    }
  }

  throw new Error("Icon not found or all hosts are unreachable.");
}
window.searchIcons = async query => {
  const searchUrl = `https://api.iconify.design/search?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(searchUrl);
    if (response.ok) {
      const data = await response.json();
      return data.icons || [];
    } else {
      console.error("Failed to fetch icon search results.");
    }
  } catch (error) {
    console.error("Error during icon search:", error);
  }
  return [];
}
window.updateSvgMedia = async (id, type) => {
  let title = "Replace the SVG";
  const target = findLayerById(id, project.html).layer;
  let display = "";
  const elm = document.createElement("template");
  elm.innerHTML = json2html(target);
  const element = elm.content.firstElementChild;
  if (element) {
    display = `<label for="ixkq65jma">${element.outerHTML}</label>`;
  }
  elm.remove();

  let modalContent = `<style>
      #vl61t8366 svg {
        cursor: pointer;
        width: 100%;
        height: 100%;
      }
    </style>
    <div id="vl61t8366" class="p-4 text-center grid grid-cols-1 gap-4 place-items-center">
      <figure>
        ${display}
        <figcaption>
          <span id="modal-description">Checking connection...</span>
        </figcaption>
      </figure>
      <input id="ixkq65jma" type="file" name="image" accept=".svg" class="hidden" onchange="updateMediaSource(event, '${type}', document.getElementById('vl61t8366'))">
      <input type="search" id="iconSearch" placeholder="Search for an icon" class="w-full p-2 border rounded-full mt-4 hidden" oninput="handleIconSearch(event)">
      <div id="iconResults" class="grid grid-cols-4 gap-4 mt-4 w-full hidden"></div>
    </div>`;

  Modal.render({
    title: title,
    content: modalContent,
    onLoad: async function() {
      const apiConnection = await checkApiConnection();
      const descriptionElement = document.getElementById('modal-description');
      const searchElement = document.getElementById('iconSearch');
      const iconResults = document.getElementById('iconResults');

      if (navigator.onLine && apiConnection) {
        descriptionElement.innerHTML = `<span>Api courtesy of 
          <a href="https://iconify.design/" target="_blank">Iconify</a>.
        </span>`;
        searchElement.classList.remove('hidden');
        searchElement.focus();
        iconResults.classList.remove('hidden');
      } else {
        descriptionElement.textContent = 'Upload your SVG:';
      }
    },
    onConfirm: function() {
      data.selectedLayerIds.forEach(id => {
        const { layer } = findLayerById(id, project.html);
        if (layer && layer.tag === "svg") {
          const selectedSvg = document.getElementById('vl61t8366').querySelector('svg');
          if (selectedSvg) {
            let obj = html2json(selectedSvg.outerHTML)[0];
            saveState();
            Object.keys(obj).forEach(key => {
              if (key === "id") return;
              layer[key] = obj[key];
            });
            findLayerById(id, project.html).layer.state.selected = null;
            findLayerById(id, project.html).layer.state.selected = true;
            saveState();
          }
        }
      });
    }
  });
}
window.handleIconSearch = async event => {
  const query = event.target.value;
  const iconResultsElement = document.getElementById('iconResults');
  if (query.length > 2) {
    const icons = await searchIcons(query);
    
    iconResultsElement.innerHTML = ''; // Clear previous results

    for (const icon of icons) {
      try {
        const iconUrl = `https://api.iconify.design/${icon}.svg`;
        getFile(iconUrl, (error, svgContent) => {
          if (error) {
            console.error("Failed to fetch SVG:", error);
          } else {
            const iconDiv = document.createElement('div');
            iconDiv.innerHTML = svgContent;
            iconDiv.onclick = () => {
              const selectedSvgElement = document.querySelector("#vl61t8366 label svg");
              if (selectedSvgElement) {
                selectedSvgElement.outerHTML = svgContent; // Replace the outerHTML with the selected SVG
                iconDiv.closest('article').scrollTop = 0;
              }
            };
            iconResultsElement.appendChild(iconDiv);
          }
        });
      } catch (error) {
        console.warn(`Failed to fetch SVG for icon: ${icon}`, error);
      }
    }
  } else {
    const iconResultsElement = document.getElementById('iconResults');
    iconResultsElement.innerHTML = '';
  }
}
window.selectIcon = svgContent => {
  iconContainer.innerHTML = svgContent;
}
window.copyToClipboard = text => {
  navigator.clipboard.writeText(text).then(function() {
  }).catch(function(error) {
    console.error('Failed to copy text: ', error);
  });
}
window.collectComponents = layers => {
  const existingNames = new Set(project.components.map(comp => comp.name));

  layers.forEach(layer => {
    if (layer.isComponent) {
      // Check if the layer name already exists
      if (!existingNames.has(layer.name)) {
        const clone = { ...layer };
        let uniqueId = generateId();
        clone.id = uniqueId;

        project.components.push({
          id: uniqueId,
          name: layer.name,
          code: clone
        });

        // Add the new name to the set
        existingNames.add(layer.name);
      }
    }
  });
}
window.addComponent = () => {
  if (data.selectedLayerIds.length === 0) return;
  
  saveState(); // Save state before making changes

  data.selectedLayerIds.forEach(id => {
    const result = findLayerById(id, project.html);

    if (result) {
      const { layer } = result;
      const clone = { ...layer };
      clone.id = generateId();

      const newHtml = json2html(clone);

      // Check for duplicate name or HTML
      const isDuplicate = project.components.some(comp =>
        comp.name === clone.name || comp.code === newHtml
      );

      if (!isDuplicate) {
        project.components.push({
          name: clone.name,
          code: newHtml
        });
      } else {
        console.warn(`Component with name "${clone.name}" or identical HTML already exists.`);
      }
    } else {
      console.error('Layer not found for ID:', id);
    }
  });

  saveState(); // Save state after making changes
}
window.deleteComponent = index => {
  if (index >= 0 && index < project.components.length) {
    project.components.splice(index, 1);
    saveState(); // Save state after making changes
  } else {
    console.error('Invalid index:', index);
  }
}
window.commandPalette = () => {
  let buttonClass = `text-xs w-auto px-3 py-2 m-0 capitalize rounded-md bg-transparent border ${project.dark ? 'border-gray-600' : 'border-gray-400'}`;
  let commands = {
    "fold all": "f",
    "unfold all": "u",
    "hide all": "h",
    "show all": "s",
    "empty children": "e",
    "clear all styles": "cas"
  };

  // Generate buttons HTML from the commands object
  let buttonsHtml = Object.keys(commands).map(command => {
    return `<button 
  class="${buttonClass}"
  style="color: unset;"
  onclick="
    const emuqfdoxq = document.getElementById('emuqfdoxq').checked;
    executeQuery('${commands[command]}', emuqfdoxq);
    document.querySelector('dialog[open]').querySelector('header > button').onclick();
  "
>
  ${command}
</button>`;
  }).join(''); // Join the array into a single string

  const guide = `<div class="font-thin text-xs">
  - <strong class="text-sm">Enter a Query</strong>: <br/>
    Input a query in the format <code>t=tagname</code>, <code>t=.classname</code>, <code>t=[attribute=value]</code>, or <code>t=[id]</code>. You can also use pseudo-classes with the <code>t=</code> prefix like <code>t=.classname:first-child</code>.<br/><br/>

  - <strong class="text-sm">Multiple Queries</strong>: <br/>
    Separate multiple queries with a comma (e.g., <code>t=li, t=.name</code>).<br/><br/>

  - <strong class="text-sm">Pseudo-Classes</strong>: <br/>
    You can use pseudo-classes to refine your selection. Supported pseudo-classes include:<br/>
    <ul class="mt-4">
      <li><code>:first-child</code> - Selects the first child element.</li>
      <li><code>:last-child</code> - Selects the last child element.</li>
      <li><code>:nth-child(n)</code> - Selects the nth child element.</li>
      <li><code>:nth-last-child(n)</code> - Selects the nth last child element.</li>
      <li><code>:only-child</code> - Selects elements that are the only child.</li>
      <li><code>:empty</code> - Selects elements without children.</li>
      <li><code>:first-of-type</code> - Selects the first element of its type.</li>
      <li><code>:last-of-type</code> - Selects the last element of its type.</li>
      <li><code>:nth-of-type(n)</code> - Selects the nth element of its type.</li>
      <li><code>:nth-last-of-type(n)</code> - Selects the nth last element of its type.</li>
      <li><code>:only-of-type</code> - Selects elements of its type that are the only one.</li>
    </ul><br/>

  - <strong class="text-sm">Targeting Selections</strong>: <br/>
    Use the <code>t=</code> prefix to specify the type of selection:<br/>
    <ul class="mt-4">
      <li><code>t=tagname</code> - Targets elements with the specified tag.</li>
      <li><code>t=.classname</code> - Targets elements with the specified class.</li>
      <li><code>t=[attribute]</code> - Targets elements with the specified attribute (without defining its value).</li>
      <li><code>t=[attribute=value]</code> - Targets elements with the specified attribute and value.</li>
      <li><code>t=.classname:pseudo-class</code> - Targets elements with the specified class and pseudo-class.</li>
    </ul><br/>

  - <strong class="text-sm">Operation Prefixes</strong>: <br/>
    Use the following prefixes to perform operations on the targeted elements:<br/>
    <ul class="mt-4">
      <li><code>r=</code> - Remove targeted elements. For example, <code>r=tagname</code> will remove all elements matching the specified tag.</li>
      <li><code>e=</code> - Empty all children from the targeted elements. For example, <code>e=.name</code> will empty the children of all elements with the class <code>name</code>.</li>
      <li><code>c=</code> - Apply operations to the children of the targeted elements. For example, <code>c=tagname</code> will select the children of currently selected elements that match the specified tag.</li>
      <li><code>mv=</code> - Move targeted elements. For example, <code>mv=tagname</code> will cut the currently selected elements and paste them as elements matching the specified tag.</li>
      <li><code>rs=</code> - Remove styles from the project as well as targeted elements. For example, <code>rs=styleName</code> will clear the specified style from all elements that currently have it applied.</li>
    </ul><br/>

  - <strong class="text-sm">Special Commands</strong>: <br/>
    Use special commands to quickly fold, unfold, hide, show all layers, or empty all children from selections. The supported commands are:<br/>
    <ul class="mt-4">
      <li><code>f</code> - Collapse all layers.</li>
      <li><code>u</code> - Uncollapse all layers.</li>
      <li><code>h</code> - Hide all layers.</li>
      <li><code>s</code> - Show all layers.</li>
      <li><code>cas</code> - Clear all styles.</li>
      <li><code>e</code> - Empty all children from selections.</li>
    </ul>
    If no query is provided and you click "Confirm", all current selections will be cleared automatically. (You can also do this using the shortcut <code>Shift+Ctrl+A</code> on Windows or <code>Shift+Cmd+A</code> on Mac)<br/><br/>

  - <strong class="text-sm">Replace Current Selection</strong>: <br/>
    Toggle the switch to decide whether to replace the current selection or add to it.<br/>
    You can also hold the <code>Ctrl</code> key on Windows (<code>Cmd</code> key on Mac) to do this as well to target replacing current selection.<br/><br/>

  - <strong class="text-sm">Execute</strong>: <br/>
    Press Enter to run the command or query.<br/><br/>

  - <strong class="text-sm">Close</strong>: <br/>
    The palette will close automatically after executing a command.<br/>
    You can also open it using the shortcut <code>Ctrl+Shift+P</code> on Windows or <code>Cmd+Shift+P</code> on Mac.<br/>
    You can also use the <code>Esc</code> key to close every opened dialog.
</div>`;

  // Check if data.commandPalette is true
  if (!data.commandPalette) {
    data.commandPalette = true;

    // Modal rendering code
    Modal.render({
      title: "Command Palette...",
      content: `
        <div class="p-4 grid grid-cols-1 gap-4">
          <input
            id="olphbh94a"
            type="text"
            placeholder="Enter a query (e.g., tag=li:first-child, class=name)..."
            class="rounded-full border p-2 flex-grow"
            style="margin: 0;"
            onkeydown="
              if (event.key === 'Enter') {
                executeQuery(this.value.trim(), data.replaceCurrentSelection);
                document.querySelector('dialog[open]').querySelector('header > button').onclick();
              }
            "
          />
          <div class="flex items-center">
            <input 
              type="checkbox" 
              role="switch" 
              id="emuqfdoxq" 
              class="mr-2" 
              ${data.replaceCurrentSelection ? 'checked' : ''} 
              onchange="data.replaceCurrentSelection = !data.replaceCurrentSelection;"
            />
            <label for="emuqfdoxq" class="select-none">Replace current selection</label>
          </div>
          <hr/>
          <details class="block mb-0" ${data.commandsOpen ? 'open' : ''} ontoggle="
            const detailsElement = this;
            data.commandsOpen = detailsElement.hasAttribute('open');
          ">
          <summary class="block">
            Commands
          </summary>
          <code class="grid grid-cols-2 gap-2 mb-0 bg-transparent">
            ${buttonsHtml}
          </code>
        </details>
        <hr/>
        <details class="mb-0" ${data.commandPaletteGuide ? 'open' : ''} ontoggle="
            const detailsElement = this;
            data.commandPaletteGuide = detailsElement.hasAttribute('open');
          ">
          <summary class="block">
            How to use the Command Palette:
          </summary>
          ${guide}
        </details>
      </div>`,
      onLoad() {
        document.getElementById('olphbh94a').focus();
      },
      onClose() {
        data.commandPalette = null;
      },
      onConfirm() {
        const query = document.getElementById('olphbh94a').value.trim();
        executeQuery(query, data.replaceCurrentSelection);
        data.commandPalette = null;
      }
    });
  }
}
window.updateVersionPart = (part, value) => {
  const versionParts = project.version.split('.');
  if (part === 'major') {
    versionParts[0] = value;
  } else if (part === 'minor') {
    versionParts[1] = value;
  } else if (part === 'patch') {
    versionParts[2] = value;
  }
  project.version = versionParts.join('.');
}
window.createLayerMap = (layers, map = new Map()) => {
  // Check if layers is defined and is an array
  if (!Array.isArray(layers)) {
    console.error("Invalid layers array:", layers);
    return map;
  }

  layers.forEach((layer) => {
    // Check if layer is defined
    if (!layer) {
      console.error("Undefined or null layer encountered:", layer);
      return; // Skip this iteration
    }

    // Check if layer has an id property
    if (typeof layer.id === "undefined") {
      console.error("Layer does not have an id property:", layer);
      return; // Skip this iteration
    }

    // Add the layer to the map
    map.set(layer.id, layer);

    // If the layer has children, recursively add them to the map
    if (layer.children && layer.children.length > 0) {
      createLayerMap(layer.children, map);
    }
  });

  return map;
};

// iframe functions
window.resizeCanvas = size => data.selectedSize = size;
window.rotateCanvas = () => {
  const iframe = document.getElementById('previewElm').firstElementChild;
  if (iframe.style.width === '100%') return false;

  // Extract current width and height
  let width = parseInt(iframe.style.width);
  let height = parseInt(iframe.style.height);

  // Swap width and height
  [width, height] = [height, width];
  data.selectedSize = width+'x'+height;
}
window.getIframeClientSize = () => {
  const iframe = document.getElementById('iframe');
  if (iframe && iframe.offsetWidth && iframe.offsetHeight) {
    data.iframeWidth = iframe.offsetWidth.toString();
    data.iframeHeight = iframe.offsetHeight.toString();
  }
}

// save functions
window.handleLogoChange = async event => {
  const file = event.target.files[0];
  if (!file) return; // If no file selected, return

  try {
    // Convert file to base64 string
    const base64String = await fileToBase64(file);
    // Update project.logo with base64String
    project.logo = base64String;
  } catch (error) {
    console.error('Error converting image to base64:', error);
  }
}
window.fileToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
window.importJSON = (obj, callback = null) => {
  if (obj === null) return;
  App.initialRender = true;
  data.selectedLayerIds = [];
  project.name = obj.name;
  project.version = obj.version;
  project.title = obj.title;
  project.description = obj.description;
  project.author = obj.author;
  project.url = obj.url;
  project.logo = obj.logo;
  project.dark = obj.dark;
  project['previewDark'] = ('previewDark' in obj && typeof obj.previewDark === 'boolean') 
    ? obj.previewDark 
    : true;
  project.pwa = obj.pwa;
  project.activePanel = obj.activePanel;
  
  project.meta = obj.meta;
  project.libraries = obj.libraries;
  project.css = obj.css;
  project.html = obj.html;
  if (obj.components) {
    project['components'] = obj.components;
    collectComponents(project.html);
  }
  data.layerMap = createLayerMap(project.html);
  App.initialRender = null;
  collectSelectedIDs(project.html);
  App.render('#app');
  renderPreview(true);

  // Call the callback function if provided
  if (typeof callback === 'function') {
    callback();
  }
}
window.newProject = () => {
  const obj = {
    name: "App name",
    version: "0.0.1",
    title: "An attractive title",
    description: "The most attractive description ever!",
    author: "Polyrise",
    url: "https://michaelsboost.com/",
    meta: "",
    libraries: [],
    css: {
      "rootVariables": {},
      "styles": {},
      "animations": {},
      "breakpoints": {}
    },
    components: [],
    html: [],
    logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iNTEyIgogICBoZWlnaHQ9IjUxMiIKICAgdmlld0JveD0iMCAwIDEzNS40NjY2NiAxMzUuNDY2NjciCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzEiCiAgIHhtbDpzcGFjZT0icHJlc2VydmUiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMKICAgICBpZD0iZGVmczEiIC8+PGcKICAgICBpZD0iZzI0Ij48cGF0aAogICAgICAgaWQ9InBhdGgyMiIKICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtmaWxsOiMxMzNhZDQ7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjk2LjE3NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQiCiAgICAgICBkPSJNIDkuNTgyODc3NSw2Ny43MzMzMzIgViAxMzUuMjAwNTMgTCAyNS4zODc1OTcsMTI2LjAzMTA3IFYgMTA2Ljk2MDQgNjcuNzMzMzMyIFogbSA4NS45Njg5MTE1LDAgLTU3Ljc2OTA4MywzMi4yOTcyNTggdiAxOC44MTA3MyBMIDEyNS44ODIyNCw2Ny43MzMzMzIgWiIgLz48cGF0aAogICAgICAgc3R5bGU9ImRpc3BsYXk6aW5saW5lO2ZpbGw6IzA0YTJmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2Utd2lkdGg6MTQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kIgogICAgICAgaWQ9InBhdGgyMyIKICAgICAgIGQ9Im0gNDkuNTY4NTI3LDM1LjgxOTU1MyAtMTYuOTcwNDc4LDkuNzk3OTEgMCwtMTkuNTk1ODIgeiIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDIuMjE3MjY1MiwwLDAsMi4xNDcwMjkzLC0zNC40OTUyNjksLTkuMjYyMTYyKSIgLz48cGF0aAogICAgICAgaWQ9InBhdGgyNCIKICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtmaWxsOiM4NjAwZWY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlLXdpZHRoOjk2LjE3NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQiCiAgICAgICBkPSJNIDkuNTgyODc3NSwwLjI2NjEzMzYyIFYgNjcuNzMzMzMyIEggMjUuMzg3NTk3IFYgNDIuODU2ODE1IDI4LjMyNjk1MyBsIDcwLjMyNTkzOSwzOS4zMTU5NDYgLTAuMTYxNzQ3LDAuMDkwNDMgaCAzMC4zMzA0NTEgbCAwLjAwMiwtMC4wMDEgeiIgLz48L2c+PC9zdmc+Cg==",
    lang: "en",
    dark: true,
    previewDark: true,
    pwa: false,
    activePanel: 'layers'
  }

  let modalContent = `
    <div class="p-4">
      <div class="p-4 text-center">All current data will be lost.</div>
      <div class="mb-4 text-center">✨ Click the image to start with a template! 🚀</div>
      <div class="grid grid-cols-1 gap-4 place-items-center">
        <img class="cursor-pointer rounded-md shadow-2xl" id="starter-project" src="imgs/demo.png" width="593" height="335" loading="lazy">
      </div>
    </div>`;

  Modal.render({
    title: "Are you sure you want to start a new project?",
    content: modalContent,
    onLoad() {
      // Set up the event listener once the modal is loaded
      document.getElementById('starter-project').onclick = () => {
        fetch('json/bootstrap-landing-page-demo.json')
          .then(response => response.json())
          .then(data => {
            importJSON(data, () => {
              if (document.querySelector('dialog[open]')) {
                document.querySelector('dialog[open]').querySelector('header > button:last-child').onclick();
              }
              if (document.querySelector('dialog[open]')) {
                document.querySelector('dialog[open]').querySelector('header > button:last-child').onclick();
              }
            });
          })
          .catch(error => {
            console.error('Error loading the starter project:', error);
          });
      };
    },
    onConfirm() {
      importJSON(obj);
      data.menuDialog = null;
    }
  });
};

window.emptyStorage = () => {
  Modal.render({
    title: "Are you sure you want to empty storage?",
    content: '<div class="p-4 text-center">All current data will be lost.</div>',
    onConfirm() {
      // Clear local storage
      localStorage.removeItem('Polyrise');
    
      // Clear session storage specific to Polyrise (if you use a specific key)
      sessionStorage.removeItem('Polyrise');
    
      // Clear cookies specific to Polyrise
      document.cookie.split(";").forEach(function(c) {
        if (c.trim().startsWith('Polyrise')) {
          document.cookie = c.trim().split("=")[0] + 
                            '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
        }
      });
    
      // Clear service worker caches specific to Polyrise
      if ('caches' in window) {
        caches.keys().then(function(names) {
          names.forEach(function(name) {
            if (name === 'Polyrise-cache') {
              caches.delete(name);
            }
          });
        });
      }
    
      // Unregister service workers specific to Polyrise
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          registrations.forEach(function(registration) {
            if (registration.scope.includes('Polyrise')) {
              registration.unregister();
            }
          });
        });
      }
    
      location.reload();
    }
  });
}
window.clearAllStorage = () => {
  // Clear local storage
  localStorage.clear();

  // Clear session storage
  sessionStorage.clear();

  // Clear all cookies
  document.cookie.split(";").forEach(function(cookie) {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
  });

  // Clear all service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      registrations.forEach(function(registration) {
        registration.unregister();
      });
    });
  }

  // Clear all caches
  if ('caches' in window) {
    caches.keys().then(function(names) {
      names.forEach(function(name) {
        caches.delete(name);
      });
    });
  }

  // Reload the page
  location.reload();
}
window.importProject = () => {
  Modal.render({
    title: "Are you sure you want to load a new project?",
    content: `<div class="p-4 text-center">All current data will be lost.</div>`,
    onClose: function () {
      data.menuDialog = true;
    },
    onConfirm: function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';

      input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        
        if (!file) {
          console.error('No file selected.');
          return;
        }
    
        const reader = new FileReader();
    
        reader.onload = event => {
          try {
            importJSON(JSON.parse(event.target.result));
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };
    
        reader.readAsText(file);
        input.remove();
      });
    
      input.click();
    }
  });
}
window.getFileNameAndType = url => {
  // Extract the file name with extension from the URL
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  
  // Extract the file extension
  const fileExtension = fileName.split('.').pop().toLowerCase();
  
  // Map file extensions to MIME types
  const mimeTypes = {
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogv': 'video/ogg'
  };
  
  // Get the MIME type based on the file extension
  const fileType = mimeTypes[fileExtension] || 'application/octet-stream';
  
  return {
    fileName,
    fileType
  };
}
window.fetchResources = obj => {
  try {
    const doc = new DOMParser().parseFromString(json2html(obj.html), 'text/html');
    const body = doc.body;

    const imageResources = [];
    const audioResources = [];
    const vectorResources = [];
    const videoResources = [];

    let fileCounter = 1;

    // Helper function to check if a string is Base64
    function isBase64(str) {
      return str.startsWith('data:') && str.includes('base64,');
    }

    // Helper function to extract file type from Base64 string
    function getBase64FileType(str) {
      const mimeMatch = str.match(/^data:(.*);base64,/);
      if (mimeMatch) {
        const mimeType = mimeMatch[1];
        return mimeTypeToExtension(mimeType);
      }
      return 'unknown';
    }

    // Helper function to map MIME types to file extensions
    function mimeTypeToExtension(mimeType) {
      const typeMap = {
        // Images
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/svg+xml': 'svg',
        'image/webp': 'webp',
        'image/tiff': 'tiff',
        'image/bmp': 'bmp',
        'image/x-icon': 'ico',

        // Audio
        'audio/mpeg': 'mp3',
        'audio/wav': 'wav',
        'audio/ogg': 'ogg',
        'audio/aac': 'aac',
        'audio/webm': 'webm',
        'audio/flac': 'flac',

        // Video
        'video/mp4': 'mp4',
        'video/webm': 'webm',
        'video/ogg': 'ogv',
        'video/avi': 'avi',
        'video/mpeg': 'mpg',
        'video/quicktime': 'mov',
        'video/x-msvideo': 'avi',
        'video/x-matroska': 'mkv',

        // Fallback for unknown types
        'unknown': 'bin'
      };
      return typeMap[mimeType] || 'bin';
    }

    // Helper function to extract file name from URL
    function getFileName(url) {
      return url.substring(url.lastIndexOf('/') + 1);
    }

    // Generate a file name for Base64 resources
    function getBase64FileName() {
      return `file-${fileCounter++}`;
    }

    // Function to extract and process background images from CSS
    function extractBackgroundImageUrls(css) {
      const urls = [];
      const regex = /background-image\s*:\s*url\(([^)]+)\)/g;
      let match;
      while ((match = regex.exec(css)) !== null) {
        let url = match[1].replace(/['"]/g, ""); // Remove quotes around URLs
        if (isBase64(url)) {
          const fileType = getBase64FileType(url);
          const fileName = `${getBase64FileName()}.${fileType}`;
          imageResources.push({ url: url, fileName: fileName });
          css = css.replace(url, `../imgs/${fileName}`);
        } else {
          const fileName = getFileName(url);
          imageResources.push({ url: url, fileName: fileName });
          css = css.replace(url, `../imgs/${fileName}`);
        }
        urls.push(url);
      }
      return css;
    }

    // Extract image URLs and filenames
    body.querySelectorAll('img').forEach(img => {
      if (img.hasAttribute('src')) {
        const src = img.getAttribute('src');

        if (isBase64(src)) {
          const fileType = getBase64FileType(src);
          const fileName = `${getBase64FileName()}.${fileType}`;
          imageResources.push({ url: src, fileName: fileName });
          img.src = `imgs/${fileName}`;
        } else {
          const fileName = getFileName(src);
          imageResources.push({ url: src, fileName: fileName });
          img.src = `imgs/${getFileNameAndType(src).fileName}`;
        }
      }

      if (img.hasAttribute('srcset')) {
        img.srcset.split(',').forEach(srcset => {
          const url = srcset.trim().split(' ')[0];
          if (isBase64(url)) {
            const fileType = getBase64FileType(src);
            const fileName = `${getBase64FileName()}.${fileType}`;
            imageResources.push({ url: url, fileName: fileName });
            img.src = `imgs/${fileName}`;
          } else {
            const fileName = getFileName(url);
            imageResources.push({ url: url, fileName: fileName });
            img.src = `imgs/${getFileNameAndType(img.getAttribute('src')).fileName}`;
          }
        });
      }
    });

    // Extract audio URLs and filenames
    body.querySelectorAll('audio').forEach(audio => {
      audio.querySelectorAll('source').forEach(source => {
        if (source.hasAttribute('src')) {
          const src = source.getAttribute('src');

          if (isBase64(src)) {
            const fileType = getBase64FileType(src);
            const fileName = `${getBase64FileName()}.${fileType}`;
            audioResources.push({ url: src, fileName: fileName });
            source.src = `audios/${fileName}`;
          } else {
            const fileName = getFileName(src);
            audioResources.push({ url: src, fileName: fileName });
            source.src = `audios/${getFileNameAndType(src).fileName}`;
          }
        }
      });
    });

    // Extract vectors
    body.querySelectorAll('svg').forEach(svg => {
      vectorResources.push({ content: svg.outerHTML, fileName: `vector-${vectorResources.length + 1}.svg` });
    });

    // Extract video URLs and filenames
    body.querySelectorAll('video').forEach(video => {
      video.querySelectorAll('source').forEach(source => {
        if (source.hasAttribute('src')) {
          const src = source.getAttribute('src');

          if (isBase64(src)) {
            const fileType = getBase64FileType(src);
            const fileName = `${getBase64FileName()}.${fileType}`;
            videoResources.push({ url: src, fileName: fileName });
            source.src = `vids/${fileName}`;
          } else {
            const fileName = getFileName(src);
            videoResources.push({ url: src, fileName: fileName });
            source.src = `vids/${getFileNameAndType(src).fileName}`;
          }
        }
      });
    });

    // Process CSS background images
    const css = json2css(obj.css) || '';
    const updatedCss = extractBackgroundImageUrls(css);
    const stylesObj = updatedCss;
    body.querySelectorAll('style').forEach(style => style.remove());

    return {
      html: doc.body.innerHTML,
      stylesObj,
      imageResources,
      audioResources,
      vectorResources,
      videoResources
    };
  } catch (error) {
    console.error('Error fetching resources:', error);
    return null; // Or handle the error in an appropriate way
  }
}
window.getBase64Media = async mediaUrl => {
  const response = await fetch(mediaUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
window.renderStyles = styles => {
  let css = '';

  // Define :root variables
  css += `:root {\n`;
  for (const [variable, value] of Object.entries(styles.rootVariables || {})) {
    css += `  --${variable}: ${value};\n`;
  }
  css += '}\n';

  // Define styles for each class
  for (const [classId, style] of Object.entries(styles.styles)) {
    if (!style || (!Object.keys(style.variables || {}).length && 
                  !Object.keys(style.base || {}).length && 
                  !Object.keys(style.pseudos || {}).length && 
                  !Object.keys(style.animations || {}).length && 
                  !Object.keys(style.breakpoints || {}).length)) {
      continue; // Skip empty styles
  }
    const variables = style.variables || {};
    const baseStyles = style.base || {};
    const pseudos = style.pseudos || [];
    const animations = style.animations || {};
    const breakpoints = style.breakpoints || {};

    if (classId === "html" || classId === "body") {
      css += `${classId} {\n`;
    } else {
      css += `.${classId} {\n`;
    }
    
    for (const [variable, value] of Object.entries(variables)) {
      css += `  --${variable}: ${value};\n`;
    }
    for (const [property, value] of Object.entries(baseStyles)) {
      css += `  ${property}: ${value};\n`;
    }
    css += '}\n';

    for (const { selector, styles: pseudoStyles } of pseudos) {
      css += `.${classId}${selector} {\n`;
      for (const [property, value] of Object.entries(pseudoStyles)) {
        css += `  ${property}: ${value};\n`;
      }
      css += '}\n';
    }

    for (const [animationName, animation] of Object.entries(animations)) {
      css += `@keyframes ${animationName} {\n`;
      for (const [key, frameStyles] of Object.entries(animation.keyframes)) {
        css += `  ${key} {\n`;
        for (const [property, value] of Object.entries(frameStyles)) {
          css += `    ${property}: ${value};\n`;
        }
        css += '  }\n';
      }
      css += '}\n';

      css += `.${classId} {\n`;
      for (const [property, value] of Object.entries(animation.properties)) {
        css += `  ${property}: ${value};\n`;
      }
      css += '}\n';
    }

    for (const [breakpoint, breakpointStyles] of Object.entries(breakpoints)) {
      css += `@media (max-width: ${breakpoint}) {\n`;
      css += `  .${classId} {\n`;
      for (const [variable, value] of Object.entries(breakpointStyles.variables || {})) {
        css += `    --${variable}: ${value};\n`;
      }
      for (const [property, value] of Object.entries(breakpointStyles.base || {})) {
        css += `    ${property}: ${value};\n`;
      }
      css += '  }\n';

      for (const { selector, styles: pseudoStyles } of breakpointStyles.pseudos || []) {
        css += `  .${classId}${selector} {\n`;
        for (const [property, value] of Object.entries(pseudoStyles)) {
          css += `    ${property}: ${value};\n`;
        }
        css += '  }\n';
      }

      css += '}\n';
    }
  }

  return css;
}
window.downloadJSON = async () => {
  try {
    await loadScript("libraries/jszip/FileSaver.min.js");
    let blob = new Blob([JSON.stringify(project, null, 2)], {type: "application/json"});
    saveAs(blob, `${project.name.split(' ').join('').toLowerCase()}-Polyrise.json`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up scripts after use
    removeScript("libraries/jszip/FileSaver.min.js");
  }
}
window.downloadQuickCommands = () => {
  const colorMappings = {
    'black': '#000000',
    'white': '#ffffff',
    'gray-50': '#f9fafb',
    'gray-100': '#f3f4f6',
    'gray-200': '#e5e7eb',
    'gray-300': '#d1d5db',
    'gray-400': '#9ca3af',
    'gray-500': '#6b7280',
    'gray-600': '#4b5563',
    'gray-700': '#374151',
    'gray-800': '#1f2937',
    'gray-900': '#111827',
    'red-50': '#fef2f2',
    'red-100': '#fee2e2',
    'red-200': '#fecaca',
    'red-300': '#fca5a5',
    'red-400': '#f87171',
    'red-500': '#ef4444',
    'red-600': '#dc2626',
    'red-700': '#b91c1c',
    'red-800': '#991b1b',
    'red-900': '#7f1d1d',
    'yellow-50': '#fefce8',
    'yellow-100': '#fef9c3',
    'yellow-200': '#fef08a',
    'yellow-300': '#fde047',
    'yellow-400': '#facc15',
    'yellow-500': '#eab308',
    'yellow-600': '#ca8a04',
    'yellow-700': '#a16207',
    'yellow-800': '#854d0e',
    'yellow-900': '#713f12',
    'green-50': '#f0fdf4',
    'green-100': '#dcfce7',
    'green-200': '#bbf7d0',
    'green-300': '#86efac',
    'green-400': '#4ade80',
    'green-500': '#22c55e',
    'green-600': '#16a34a',
    'green-700': '#15803d',
    'green-800': '#166534',
    'green-900': '#14532d',
    'blue-50': '#eff6ff',
    'blue-100': '#dbeafe',
    'blue-200': '#bfdbfe',
    'blue-300': '#93c5fd',
    'blue-400': '#60a5fa',
    'blue-500': '#3b82f6',
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'blue-800': '#1e40af',
    'blue-900': '#1e3a8a',
    'indigo-50': '#eef2ff',
    'indigo-100': '#e0e7ff',
    'indigo-200': '#c7d2fe',
    'indigo-300': '#a5b4fc',
    'indigo-400': '#818cf8',
    'indigo-500': '#6366f1',
    'indigo-600': '#4f46e5',
    'indigo-700': '#4338ca',
    'indigo-800': '#3730a3',
    'indigo-900': '#312e81',
    'purple-50': '#f5f3ff',
    'purple-100': '#ede9fe',
    'purple-200': '#ddd6fe',
    'purple-300': '#c4b5fd',
    'purple-400': '#a78bfa',
    'purple-500': '#8b5cf6',
    'purple-600': '#7c3aed',
    'purple-700': '#6d28d9',
    'purple-800': '#5b21b6',
    'purple-900': '#4c1d95',
    'pink-50': '#fdf2f8',
    'pink-100': '#fce7f3',
    'pink-200': '#fbcfe8',
    'pink-300': '#f9a8d4',
    'pink-400': '#f472b6',
    'pink-500': '#ec4899',
    'pink-600': '#db2777',
    'pink-700': '#be185d',
    'pink-800': '#9d174d',
    'pink-900': '#831843'
  };    

  function updateBorderColors(data) {
    const updatedData = {};
    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('border-') && !key.includes('-opacity')) {
        const colorKey = key.split('-').slice(1).join('-');
        const color = colorMappings[colorKey] || 'transparent';
        updatedData[key] = `--tw-border-opacity: 1; border-top-color: ${color}; border-right-color: ${color}; border-bottom-color: ${color}; border-left-color: ${color};`;
      } else {
        updatedData[key] = value;
      }
    }
    return updatedData;
  }
  

  window.saveAsJson = async (data, filename) => {
    try {
      await loadScript("libraries/jszip/FileSaver.min.js");
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      saveAs(blob, filename);
  
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Clean up scripts after use
      removeScript("libraries/jszip/FileSaver.min.js");
    }
  }

  // Generate the CSS quick commands and save to a JSON file
  generateCssQuickCommands('libraries/tailwind/tailwind-mod.min.css').then(cssQuickCommands => {
    const updatedData = updateBorderColors(cssQuickCommands);
    saveAsJson(updatedData, 'cssQuickCommands.json');
  });
}
window.getFile = async (url, callback = null) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const fileContent = await response.text();
    if (callback && typeof callback === 'function') {
      callback(null, fileContent); // Call the callback with the file content
    } else {
      return fileContent; // Return the file content
    }
  } catch (error) {
    console.warn("Request error:", error);
    if (callback && typeof callback === 'function') {
      callback(error, null); // Call the callback with the error
    } else {
      throw error; // Re-throw to handle in caller
    }
  }
}
window.minifyCSS = source => {
  // Convert the source to a string if it isn't one
  source = String(source);
  // Remove comments
  let minified = source.replace(/\/\*[\s\S]*?\*\//g, '');
  // Remove whitespace and newlines
  minified = minified.replace(/\s{2,}/g, ' ').replace(/\n/g, '');
  // Remove spaces around selectors, properties, and values
  minified = minified.replace(/\s*([{}:;])\s*/g, '$1');
  // Remove the last semicolon before the closing brace
  minified = minified.replace(/;}/g, '}');
  return minified;
}
window.downloadProject = async () => {
  try {
    await loadScripts([
      "libraries/jszip/jszip.min.js",
      "libraries/jszip/FileSaver.min.js"
    ]);

    // Extract srcset URLs
    const iframe = document.getElementById('iframe');
    if (!iframe) return;
    const idoc = iframe.contentDocument || iframe.contentWindow.document;
    const { html, stylesObj, imageResources, audioResources, vectorResources, videoResources } = fetchResources(project);

    const zip = new JSZip();

    // Project file
    zip.file(`${project.name.split(' ').join('').toLowerCase()}-Polyrise.json`, JSON.stringify(project, null, 2));

    // kodeWeave project file
    const kodeWeaveProject = {
      name: project.name,
      version: project.version,
      title: project.title,
      description: project.description,
      author: project.author,
      url: project.url,
      meta: project.meta,
      libraries: project.libraries,
      html_pre_processor: "html",
      css_pre_processor: "css",
      javascript_pre_processor: "javascript",
      html: json2html(project.html),
      css: json2css(project.css),
      javascript: '',
      logo: project.logo,
      console: false,
      dark: project.dark,
      module: true,
      autorun: true,
      pwa: project.pwa,
      preview: true,
      activePanel: 'html',
      columns: false,
      columnsRight: true
    };
    zip.file(`${project.name.split(' ').join('').toLowerCase()}-kodeWeave.json`, JSON.stringify(kodeWeaveProject, null, 2));

    let licenseStr = `The MIT License (MIT)
Copyright (c) ${new Date().getFullYear()} ${project.author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
    zip.file("LICENSE.md", licenseStr);

    let READMEStr = `# ${project.name}

**Description:**
${project.description}

**Built With ${app.name}!**
This site was made with [${app.name}](https://michaelsboost.com/${app.name.toString().split(' ').join('-')}/).

**${app.name} Description:**
${app.summary} ${app.description}

**Website:**
[${app.name}](https://michaelsboost.com/${app.name.toString().split(' ').join('-')}/)`;
    zip.file("README.md", READMEStr);

    let cssContent = '';
    let cssBuildItems = [];
    let cssBuildItemsString = '';
    let TailwindNoReset = null;
    const promises = project.libraries.map(async library => {
      if (!library.endsWith(['.css', '.js'])) return false;
      const data = await getFile(library);
      const parts = library.split("/");
      const name = parts[parts.length - 1];

      // Check if the library is one of the Tailwind files to ignore
      if (name === "tailwind-mod-noreset.min.js") {
        TailwindNoReset = true;
      }
      
      // Assuming libraries have .css extensions for simplicity
      if (name.endsWith('.css')) {
        cssContent += data + '\n';
        cssBuildItems.push(name);
        cssBuildItemsString += `libraries/${name} `;
        zip.folder('libraries').file(name, data);
      }
      
      // Assuming libraries have .js extensions for simplicity
      if (name.endsWith('.js')) {
        zip.folder('libraries').file(name, data);
      }
    });
    await Promise.all(promises);

    // Checks css for html
    let cssBuild = '';
    let css4html = '';
    let twFound = '';
    let tailwindDirectives = '';
    let tailwindStyles = '';
    let cssImport = '';
    
    // Find out if user is using tailwind
    if (idoc.getElementById('vyhibnq91')) {
      twFound = true;
      tailwindDirectives = `
  ${!TailwindNoReset ? `@tailwind base;` : ''}
@tailwind components;
@tailwind utilities;
`

      if (twFound) {
        cssBuildItems.map(async library => {
          cssImport += `@import '../libraries/${library}';
`;
        });
        cssImport += tailwindDirectives;
      } else {
        cssImport = cssContent;
      }
      tailwindStyles = idoc.getElementById('vyhibnq91').textContent;
    }

    // Extract and join the content of all <style> tags into a single string
    const combinedStyles = Array.from(idoc.body.querySelectorAll('style'))
    .map(style => style.textContent)
    .join('\n');
    let css = stylesObj + combinedStyles;
    if (tailwindStyles) css += tailwindStyles;
    if (cssContent) {
      css4html = `<link rel="stylesheet" href="dist/bundle.css">
    `;
      cssBuild = `"build:css": "postcss src/bundle.css -o dist/bundle.css",`;
      zip.file("src/bundle.css", cssImport + css);
      zip.file('dist/bundle.css', minifyCSS(cssContent + tailwindStyles + css));
    } else {
      css4html = `<link rel="stylesheet" href="dist/bundle.css">
    `;
      cssBuild = `"build:css": "postcss src/bundle.css -o dist/bundle.css",`;
      zip.file("src/bundle.css", css);
      zip.file('dist/bundle.css', minifyCSS(css));
    }

    // Tailwind config
    if (twFound) {
      let configCode = `module.exports = {
  content: [
    './**/*.html',
    './src/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`
      zip.file("tailwind.config.js", configCode);
    }

    // PostCSS config
    let postcssConfig = `module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),${twFound ? `
    require('tailwindcss'),` : ''}
    require('cssnano')({
      preset: ['default', {
        discardComments: { removeAll: true }, // Remove all comments
      }],
    }),
  ],
};`;
    zip.file("postcss.config.cjs", postcssConfig);

    // Package JSON
    let npmJSON = `{
  "name": "${project.name.split(' ').join('').toLowerCase()}",
  "private": true,
  "version": "${project.version}",
  "type": "module",
  "scripts": {
    "build:css": "postcss src/bundle.css -o dist/bundle.css",
    "build": "npm run build:css",
    "serve": "http-server -c-1 -p 8081"
  },
  "dependencies": {
    "autoprefixer": "^10.4.19",
    "cssnano": "^7.0.2",
    "postcss": "^8.4.38",
    "postcss-import": "^16.1.0"${twFound ? `,
    "tailwindcss": "^3.4.4"` : ''}
  }
}`;
    zip.file("package.json", npmJSON);

    // Always include the original logo
    if (project.logo) {
      try {
        let base64Logo = '';
    
        if (project.logo.startsWith('data:')) {
          // If logo is already a data URL, extract base64 part
          base64Logo = project.logo; // Get the base64 part
        } else {
          // Otherwise fetch and convert to base64
          base64Logo = await getBase64Media(project.logo);
        }
    
        // Determine file extension based on MIME type
        let logoType;
        if (project.logo.startsWith('data:image/png')) {
          logoType = 'png';
        } else if (project.logo.startsWith('data:image/jpeg')) {
          logoType = 'jpeg';
        } else if (project.logo.startsWith('data:image/svg+xml')) {
          logoType = 'svg';
        } else {
          console.error('Unsupported logo MIME type:', project.logo);
          return; // Exit or handle error appropriately
        }
    
        const logoFileName = `logo.${logoType}`;
        zip.folder('imgs').file(logoFileName, base64Logo.split(",")[1], { base64: true });
    
        // Add icons to manifest.json based on image sizes
        const sizes = ['192x192', '256x256', '384x384', '512x512'];
        const icons = sizes.map(size => ({
          "src": `./imgs/logo-${size}.png`,
          "sizes": size,
          "type": "image/png",
          "purpose": "any"
        }));

        // Helper function to create resized images
        const createResizedImage = (size) => {
          return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            canvas.width = parseInt(size.split('x')[0]);
            canvas.height = parseInt(size.split('x')[1]);
            const ctx = canvas.getContext('2d');
    
            const img = new Image();
            img.src = base64Logo;
            img.onload = function() {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const base64Image = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
              zip.folder('imgs').file(`logo-${size}.png`, base64Image, { base64: true });
              resolve();
            };
            img.onerror = reject;
    
            // Clean up canvas element
            canvas.remove();
          });
        };
    
        // Create all resized images
        await Promise.all(sizes.map(createResizedImage));
    
        zip.file(`manifest.json`, JSON.stringify({
          "theme_color": "#13171f",
          "background_color": "#13171f",
          "display": "standalone",
          "start_url": "./index.html",
          "lang": "en-US",
          "name": project.name,
          "short_name": project.name,
          "description": project.description,
          "icons": icons
        }, null, 2));
    
      } catch (error) {
        console.error('Error adding logo to ZIP:', error);
        return; // Exit method or handle error as needed
      }
    }

    // if pwa is enabled
    let swinit = '';
    if (project.pwa) {
      swinit = `
    <script src="https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"></script>
    <script>
      // service worker for progressive web app
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./sw.js')
        })
      }
    </script>`;
      const swjs = `// Service worker code
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst } = workbox.strategies;

const cacheName = '${project.name.split(' ').join('')}-cache';

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'script' ||
            request.destination === 'style' ||
            request.destination === 'document' ||
            request.destination === 'image' ||
            request.destination === 'font' ||
            request.destination === 'audio' ||
            request.destination === 'video',
    new CacheFirst({
    cacheName: cacheName,
    plugins: [
      // Any additional plugins can be added here
    ],
  })
);`
  zip.file("sw.js", swjs);
    }

    // Save audio files to ZIP
    if (audioResources.length > 0) {
      const audioFolder = zip.folder('audios');
      try {
        for (const { url, fileName } of audioResources) {
          const base64Audio = await getBase64Media(url);
          audioFolder.file(fileName, base64Audio, { base64: true });
        }
      } catch (error) {
        console.error('Error adding audio to ZIP:', error);
        return;
      }
    }

    // Save image files to ZIP
    if (imageResources.length > 0) {
      try {
        for (const { url, fileName } of imageResources) {
          const base64Image = await getBase64Media(url);
          zip.folder('imgs').file(fileName, base64Image, { base64: true });
        }
      } catch (error) {
        console.error('Error adding images to ZIP:', error);
        return;
      }
    }

    // Save SVG files to ZIP
    if (vectorResources.length > 0) {
      const svgFolder = zip.folder('svgs');
      try {
        for (const { content, fileName } of vectorResources) {
          svgFolder.file(fileName, content);
        }
      } catch (error) {
        console.error('Error adding SVGs to ZIP:', error);
        return;
      }
    }

    // Save video files to ZIP
    if (videoResources.length > 0) {
      const videoFolder = zip.folder('vids');
      try {
        for (const { url, fileName } of videoResources) {
          const base64Video = await getBase64Media(url);
          videoFolder.file(fileName, base64Video, { base64: true });
        }
      } catch (error) {
        console.error('Error adding videos to ZIP:', error);
        return;
      }
    }

    // Iterate over each library
    let scriptTags = '';
    let cssTags = '';
    project.libraries.forEach(library => {
      if (library.endsWith('.js')) {
        scriptTags += `<script src="${library}"></script>\n    `;
      } else {
        // Assuming it's a Google font
        cssTags += `<link href="${library}" rel="stylesheet">\n    `;
      }
    });
  
    // Add index.html
    const testHtmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="${project.dark ? 'dark' : 'light'}">
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, interactive-widget=resizes-content">
    <meta name="description" content="${project.description}">
    <meta name="author" content="${project.author}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${project.title}">
    <meta name="theme-color" content="hsl(205deg 18.75% 87.45%)">
    <meta name="apple-mobile-web-app-title" content="${project.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="./index.html">
    <meta name="msapplication-navbutton-color" content="hsl(205deg 18.75% 87.45%)">
    <meta property="og:url" content="${project.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${project.title}" />
    <meta property="og:description" content="${project.description}" />
    <link rel="manifest" href="manifest.json">
    <link rel="shortcut icon" type="image/x-icon" href="imgs/logo.svg">
    <link rel="icon" type="image/svg+xml" href="imgs/logo.svg" />
    <link rel="apple-touch-icon" href="imgs/logo.svg">
    ${cssTags}${css4html}${project.meta ? `${project.meta}\n  ` : ''}${scriptTags ? scriptTags : ''}
  </head>
  <body>
    
${json2html(project.html).replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')}

  </body>
</html>`;
    zip.file('test.html', testHtmlContent);
    const indexHtmlContentCompiled = `<!DOCTYPE html>
<html lang="en" data-theme="${project.dark ? 'dark' : 'light'}">
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, interactive-widget=resizes-content">
    <meta name="description" content="${project.description}">
    <meta name="author" content="${project.author}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="application-name" content="${project.title}">
    <meta name="theme-color" content="hsl(205deg 18.75% 87.45%)">
    <meta name="apple-mobile-web-app-title" content="${project.title}">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="msapplication-starturl" content="./index.html">
    <meta name="msapplication-navbutton-color" content="hsl(205deg 18.75% 87.45%)">
    <meta property="og:url" content="${project.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${project.title}" />
    <meta property="og:description" content="${project.description}" />
    <link rel="manifest" href="manifest.json">
    <link rel="shortcut icon" type="image/x-icon" href="imgs/logo.svg">
    <link rel="icon" type="image/svg+xml" href="imgs/logo.svg" />
    <link rel="apple-touch-icon" href="imgs/logo.svg">
    ${cssTags}${css4html}${project.meta ? `${project.meta}\n  ` : ''}${scriptTags ? scriptTags : ''}
  </head>
  <body>
    
${html}

${(project.pwa ? swinit : '')}

  </body>
</html>`;
    zip.file('index.html', indexHtmlContentCompiled);

    // Generate the ZIP file
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${project.name.toLowerCase().split(' ').join('')}.zip`);
    
    // Clear all arrays after saving
    imageResources.length = audioResources.length = vectorResources.length = videoResources.length = 0;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up scripts after use
    const scriptsToRemove = [
      'libraries/jszip/FileSaver.min.js',
      'libraries/jszip/jszip.min.js'
    ];

    removeScripts(scriptsToRemove);
  }
}
window.share = async () => {
  try {
    if (navigator.onLine) {
      const shareProject = {
        title: project.title,
        description: project.description,
        head: project.meta,
        html: `<!-- This site was made with ${app.name}: ${app.summary} -->
        
${json2html(project.html)}`,
        html_pre_processor: "none",
        css: `/* This site was made with ${app.name}: ${app.summary} */

${json2css(project.css)}`,
        css_pre_processor: "none",
        css_external: project.libraries.filter(lib => lib.endsWith('.css')).join(';'),
        css_starter: "neither",
        css_prefix: "neither",
        js_external: project.libraries.filter(lib => lib.endsWith('.js')).join(';'),
        editors: '111',
        layout: 'left'
      };

      // Stringify the JSON object and escape quotes
      const JSONstring = JSON.stringify(shareProject)
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

      // Create form element
      const form = `
        <form action="https://codepen.io/pen/define" method="POST" target="_blank">
          <input type="hidden" name="data" value='${JSONstring}'>
          <input type="image" src="http://s.cdpn.io/3/cp-arrow-right.svg" width="40" height="40" value="Create New Pen with Prefilled Data" class="codepen-mover-button">
        </form>`;

      // Append form to the document body and submit
      document.body.insertAdjacentHTML('beforeend', form);
      document.querySelector('form').submit();
      document.querySelector('form').remove();
    } else {
      Modal.render({
        title: "Unable to share!",
        content: `<div class="p-4 text-center">No internet connection!</div>`
      });
    }
  } catch (error) {
    console.error('Error sharing project:', error);
  }
}
window.screenshot = async () => {
  const iframe = document.getElementById('iframe');
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

  try {
    await loadScripts([
      "libraries/html2canvas/html2canvas.min.js",
      "libraries/jszip/FileSaver.min.js"
    ]);
    
    html2canvas(iframeDocument.documentElement).then(canvas => {
      const context = canvas.getContext('2d');
      const videoElements = iframeDocument.getElementsByTagName('video');

      // Draw video elements
      Array.from(videoElements).forEach(video => {
        const { currentTime, paused, volume } = video;

        // Set volume to 0 for the screenshot process
        video.volume = 0;

        // Draw the video frame
        if (!paused) video.pause();
        context.drawImage(video, video.offsetLeft, video.offsetTop, video.clientWidth, video.clientHeight);

        // Restore the original volume and playback state
        video.volume = volume;
        video.currentTime = currentTime;
        if (!paused) video.play();
      });

      // Convert canvas to Blob
      canvas.toBlob(blob => {
        // Save the Blob using FileSaver.js
        saveAs(blob, 'screenshot.png');
      }, 'image/png');
    }).catch(error => {
      console.error('Error taking screenshot:', error);
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Clean up scripts after use
    removeScript("../libraries/html2canvas/html2canvas.min.js");
    removeScript("../libraries/jszip/FileSaver.min.js");
  }
}
window.createBlobURL = (content, type) => {
  const blob = new Blob([content], { type });
  return URL.createObjectURL(blob);
}
window.renderPreview = (forceRun = false) => {
  const iframe = document.getElementById('iframe');
  if (!iframe) return;

  let scriptTags = '';
  let cssTags = '';
  project.libraries.forEach(library => {
    if (library.endsWith('.js')) {
      scriptTags += `<script src="${library}"></script>\n    `;
    } else if (library.endsWith('.css')) {
      cssTags += `<link rel="stylesheet" href="${library}">\n          `;
    } else {
      cssTags += `<link href="${library}" rel="stylesheet">\n          `;
    }
  });

  let css = json2css(project.css);

  const iframeSrc = `<html lang="${project.lang}" data-theme="${project.previewDark ? 'dark' : 'light'}">
  <head>
    <title>${project.title}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="${project.description}">
    <meta name="author" content="${project.author}">
    ${project.meta ? project.meta : ''}
    ${cssTags}
    <style>${css}</style>
    ${scriptTags ? scriptTags : ''}
  </head>
  <body>

${json2html(project.html)}
    <script>
      // Intercept hash changes within the iframe
      window.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
          const href = event.target.getAttribute('href');
          if (href && href.startsWith('#')) {
            event.preventDefault(); // Prevent the default action
            // Handle hash change, e.g., scroll to the section or update the iframe content if needed
            const hash = href;
            // Example: Scroll to the section with the ID from the hash
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView();
            }
          }
        }
      });
    </script>
  </body>
</html>`;
const newHtmlBlobURL = createBlobURL(iframeSrc, 'text/html');

  // Create a new temporary iframe to compare
  const parser = new DOMParser();
  const doc = parser.parseFromString(iframeSrc, 'text/html');
  const idoc = iframe.contentDocument || iframe.contentWindow.document;

  if (forceRun) {
    iframe.setAttribute('src', newHtmlBlobURL);
  } else {
    diffNodes(idoc.documentElement, doc.documentElement);
  }
}
window.detectOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.platform;

  // Check for Mac OS
  const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/.test(userAgent);

  // Check for Windows
  const isWindows = /Win32|Win64|Windows|WinCE/.test(userAgent);

  // Check for Linux
  const isLinux = /Linux/.test(userAgent) && !isWindows;

  if (isMac) {
    return 'Mac';
  } else if (isWindows) {
    return 'Windows';
  } else if (isLinux) {
    return 'Linux';
  } else {
    return 'unknown';
  }
}

// Diffing algorithm to update ui when changes occur
window.diffNodes = (oldNode, newNode) => {
  if (!oldNode || !newNode) {
    return;
  }

  // Skip nodes that are marked with `data-ignore-diff`
  if (oldNode?.getAttribute && oldNode.hasAttribute('data-ignore-diff')) {
    return;
  }

  // Check if nodes are iframe elements
  if (oldNode.nodeName === 'IFRAME' && newNode.nodeName === 'IFRAME') {
    const acceptableIframeAttributes = ['id', 'title', 'class', 'style', 'sandbox'];
    // Compare acceptable attributes only
    acceptableIframeAttributes.forEach(attr => {
      if (oldNode.getAttribute(attr) !== newNode.getAttribute(attr)) {
        oldNode.setAttribute(attr, newNode.getAttribute(attr));
      }
    });

    const oldSrcdoc = oldNode.getAttribute('srcdoc');
    const newSrcdoc = newNode.getAttribute('srcdoc');
    // Ignore srcdoc attribute if it hasn't changed
    if (oldSrcdoc === newSrcdoc) return;
    return;
  }

  // If nodes are different types, replace the old node
  if (oldNode.nodeName !== newNode.nodeName) {
    oldNode.replaceWith(newNode.cloneNode(true));
    return;
  }

  // Diff the attributes of the nodes
  if (oldNode.nodeType === Node.ELEMENT_NODE && newNode.nodeType === Node.ELEMENT_NODE) {
    const oldAttributes = Array.from(oldNode.attributes);
    const newAttributes = Array.from(newNode.attributes);

    // Remove old attributes not present in the new node
    oldAttributes.forEach(attr => {
      if (!newNode.hasAttribute(attr.name)) {
        oldNode.removeAttribute(attr.name);
      }
    });

    // Add or update attributes from the new node
    newAttributes.forEach(attr => {
      if (oldNode.getAttribute(attr.name) !== attr.value) {
        oldNode.setAttribute(attr.name, attr.value);
      }
    });

    // Handle specific case for input elements
    if (oldNode.nodeName === 'INPUT' && newNode.nodeName === 'INPUT') {
      const oldValue = oldNode.value;
      const newValue = newNode.value;
      if (oldValue !== newValue) {
        oldNode.value = newValue;
      }
    }
  }

  const oldChildren = Array.from(oldNode.childNodes);
  const newChildren = Array.from(newNode.childNodes);

  // Update or remove existing child nodes
  oldChildren.forEach((oldChild, index) => {
    const newChild = newChildren[index];
    if (!newChild) {
      oldNode.removeChild(oldChild);
      return;
    }
    // Special handling for <title> elements
    if (oldNode.tagName === 'TITLE' || oldNode.tagName === 'STYLE' && oldNode.textContent !== newNode.textContent) {
      oldNode.textContent = newNode.textContent;
    } else if (oldChild.nodeType === Node.TEXT_NODE && oldChild.nodeValue !== newChild.nodeValue) {
      oldChild.nodeValue = newChild.nodeValue;
    }
    diffNodes(oldChild, newChild);
  });

  // Add new child nodes
  newChildren.slice(oldChildren.length).forEach(newChild => {
    oldNode.appendChild(newChild.cloneNode(true));
  });
}

// Once dom has loaded init functions
document.addEventListener('DOMContentLoaded', function() {
  window.onload = () => {
    // URL to the JSON file
    const jsonFileUrl = 'cssQuickCommands.json';

    // Apply the CSS quick commands
    applyCssQuickCommands(jsonFileUrl);

    // Set the state to true when the Command/Shift key is down
    window.onkeydown = e => {
      const activeElement = document.activeElement;
    
      // Check if the active element is not an input, textarea, or contenteditable
      const isNonEditable = !['INPUT', 'TEXTAREA'].includes(activeElement.tagName) &&
                            activeElement.getAttribute('contenteditable') !== 'true';
    
      if (isNonEditable) {
        const os = detectOperatingSystem();
        const isCmdPressed = os === 'Mac' && e.metaKey;
        const isCtrlPressed = os !== 'Mac' && e.ctrlKey;
        const isModifierPressed = isCmdPressed || isCtrlPressed;
        const isShiftPressed = e.shiftKey || e.key === "Shift";
        const isZKeyPressed = e.key.toLowerCase() === 'z';
    
        // Handle shortcut actions
        const handleShortcut = action => {
          e.preventDefault();
          action();
          return false;
        };

        // Update key states
        data.ctrlKey = isCtrlPressed;
        data.cmdKey = isCmdPressed;
    
        if (isModifierPressed) {
          if (isZKeyPressed) {
            if (isShiftPressed) {
              return handleShortcut(redo);
            }
            return handleShortcut(undo);
          }
    
          if (e.key.toLowerCase() === 'd') return handleShortcut(cloneLayers);
          if (e.key.toLowerCase() === 'x') return handleShortcut(cutLayers);
          if (e.key.toLowerCase() === 'c') return handleShortcut(copyLayers);
          if (e.key.toLowerCase() === 'v') return handleShortcut(pasteLayers);
          if (isShiftPressed && e.key.toLowerCase() === 'p') return handleShortcut(commandPalette);
          if (isShiftPressed && isModifierPressed && e.key.toLowerCase() === 'a') return handleShortcut(clearAllSelections);
        }
    
        // Update shift key state
        if (isShiftPressed) data.shiftKey = true;
    
        // Handle Escape key to close dialogs
        if (e.key === 'Escape') {
          e.preventDefault();
          const dialog = document.querySelector('dialog[open]');
          if (dialog) dialog.querySelector('header > button').onclick();
          return false;
        }
      }
    
      // Handle Escape key in editable elements
      if (['INPUT', 'TEXTAREA'].includes(activeElement.tagName) ||
          activeElement.getAttribute('contenteditable') === 'true') {
        if (e.key === 'Escape') {
          e.preventDefault();
          const dialog = document.querySelector('dialog[open]');
          if (dialog) dialog.querySelector('header > button').onclick();
          activeElement.blur();
          return false;
        }
      }
    };

    // Set the state to false when the Command/Shift key is up
    window.onkeyup = e => {
      e.key === "Shift" && (data.shiftKey = false);
      if (e.key === "Control" || e.key === "ControlLeft" || e.key === "ControlRight") data.ctrlKey = false;
      if (e.key === "Command" || e.key === "Meta") data.cmdKey = false;
    }

    if (localStorage.getItem('Polyrise')) {
      importJSON(JSON.parse(localStorage.getItem('Polyrise')));
    } else {
      App.render('#app');
    }
    window.onresize = () => {
      App.render('#app');
      getIframeClientSize();
    }
  };
});