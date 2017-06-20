/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* Riot v3.6.0, @license MIT */
(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.riot = global.riot || {})));
}(this, (function (exports) { 'use strict';

var __TAGS_CACHE = [];
var __TAG_IMPL = {};
var GLOBAL_MIXIN = '__global_mixin';
var ATTRS_PREFIX = 'riot-';
var REF_DIRECTIVES = ['ref', 'data-ref'];
var IS_DIRECTIVE = 'data-is';
var CONDITIONAL_DIRECTIVE = 'if';
var LOOP_DIRECTIVE = 'each';
var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
var SHOW_DIRECTIVE = 'show';
var HIDE_DIRECTIVE = 'hide';
var RIOT_EVENTS_KEY = '__riot-events__';
var T_STRING = 'string';
var T_OBJECT = 'object';
var T_UNDEF  = 'undefined';
var T_FUNCTION = 'function';
var XLINK_NS = 'http://www.w3.org/1999/xlink';
var SVG_NS = 'http://www.w3.org/2000/svg';
var XLINK_REGEX = /^xlink:(\w+)/;
var WIN = typeof window === T_UNDEF ? undefined : window;
var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
var RE_EVENTS_PREFIX = /^on/;
var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

/**
 * Check Check if the passed argument is undefined
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isBoolAttr(value) {
  return RE_BOOL_ATTRS.test(value)
}

/**
 * Check if passed argument is a function
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isFunction(value) {
  return typeof value === T_FUNCTION
}

/**
 * Check if passed argument is an object, exclude null
 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isObject(value) {
  return value && typeof value === T_OBJECT // typeof null is 'object'
}

/**
 * Check if passed argument is undefined
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isUndefined(value) {
  return typeof value === T_UNDEF
}

/**
 * Check if passed argument is a string
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isString(value) {
  return typeof value === T_STRING
}

/**
 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
 * @param { * } value -
 * @returns { Boolean } -
 */
function isBlank(value) {
  return isUndefined(value) || value === null || value === ''
}

/**
 * Check if passed argument is a kind of array
 * @param   { * } value -
 * @returns { Boolean } -
 */
function isArray(value) {
  return Array.isArray(value) || value instanceof Array
}

/**
 * Check whether object's property could be overridden
 * @param   { Object }  obj - source object
 * @param   { String }  key - object property
 * @returns { Boolean } -
 */
function isWritable(obj, key) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
  return isUndefined(obj[key]) || descriptor && descriptor.writable
}

/**
 * Check if passed argument is a reserved name
 * @param   { String } value -
 * @returns { Boolean } -
 */
function isReservedName(value) {
  return RE_RESERVED_NAMES.test(value)
}

var check = Object.freeze({
	isBoolAttr: isBoolAttr,
	isFunction: isFunction,
	isObject: isObject,
	isUndefined: isUndefined,
	isString: isString,
	isBlank: isBlank,
	isArray: isArray,
	isWritable: isWritable,
	isReservedName: isReservedName
});

/**
 * Shorter and fast way to select multiple nodes in the DOM
 * @param   { String } selector - DOM selector
 * @param   { Object } ctx - DOM node where the targets of our search will is located
 * @returns { Object } dom nodes found
 */
function $$(selector, ctx) {
  return Array.prototype.slice.call((ctx || document).querySelectorAll(selector))
}

/**
 * Shorter and fast way to select a single node in the DOM
 * @param   { String } selector - unique dom selector
 * @param   { Object } ctx - DOM node where the target of our search will is located
 * @returns { Object } dom node found
 */
function $(selector, ctx) {
  return (ctx || document).querySelector(selector)
}

/**
 * Create a document fragment
 * @returns { Object } document fragment
 */
function createFrag() {
  return document.createDocumentFragment()
}

/**
 * Create a document text node
 * @returns { Object } create a text node to use as placeholder
 */
function createDOMPlaceholder() {
  return document.createTextNode('')
}

/**
 * Check if a DOM node is an svg tag
 * @param   { HTMLElement }  el - node we want to test
 * @returns {Boolean} true if it's an svg node
 */
function isSvg(el) {
  return !!el.ownerSVGElement
}

/**
 * Create a generic DOM node
 * @param   { String } name - name of the DOM node we want to create
 * @param   { Boolean } isSvg - true if we need to use an svg node
 * @returns { Object } DOM node just created
 */
function mkEl(name) {
  return name === 'svg' ? document.createElementNS(SVG_NS, name) : document.createElement(name)
}

/**
 * Set the inner html of any DOM node SVGs included
 * @param { Object } container - DOM node where we'll inject new html
 * @param { String } html - html to inject
 */
/* istanbul ignore next */
function setInnerHTML(container, html) {
  if (!isUndefined(container.innerHTML))
    { container.innerHTML = html; }
    // some browsers do not support innerHTML on the SVGs tags
  else {
    var doc = new DOMParser().parseFromString(html, 'application/xml');
    var node = container.ownerDocument.importNode(doc.documentElement, true);
    container.appendChild(node);
  }
}

/**
 * Toggle the visibility of any DOM node
 * @param   { Object }  dom - DOM node we want to hide
 * @param   { Boolean } show - do we want to show it?
 */

function toggleVisibility(dom, show) {
  dom.style.display = show ? '' : 'none';
  dom['hidden'] = show ? false : true;
}

/**
 * Remove any DOM attribute from a node
 * @param   { Object } dom - DOM node we want to update
 * @param   { String } name - name of the property we want to remove
 */
function remAttr(dom, name) {
  dom.removeAttribute(name);
}

/**
 * Convert a style object to a string
 * @param   { Object } style - style object we need to parse
 * @returns { String } resulting css string
 * @example
 * styleObjectToString({ color: 'red', height: '10px'}) // => 'color: red; height: 10px'
 */
function styleObjectToString(style) {
  return Object.keys(style).reduce(function (acc, prop) {
    return (acc + " " + prop + ": " + (style[prop]) + ";")
  }, '')
}

/**
 * Get the value of any DOM attribute on a node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { String } name - name of the attribute we want to get
 * @returns { String | undefined } name of the node attribute whether it exists
 */
function getAttr(dom, name) {
  return dom.getAttribute(name)
}

/**
 * Set any DOM attribute
 * @param { Object } dom - DOM node we want to update
 * @param { String } name - name of the property we want to set
 * @param { String } val - value of the property we want to set
 */
function setAttr(dom, name, val) {
  var xlink = XLINK_REGEX.exec(name);
  if (xlink && xlink[1])
    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
  else
    { dom.setAttribute(name, val); }
}

/**
 * Insert safely a tag to fix #1962 #1649
 * @param   { HTMLElement } root - children container
 * @param   { HTMLElement } curr - node to insert
 * @param   { HTMLElement } next - node that should preceed the current node inserted
 */
function safeInsert(root, curr, next) {
  root.insertBefore(curr, next.parentNode && next);
}

/**
 * Minimize risk: only zero or one _space_ between attr & value
 * @param   { String }   html - html string we want to parse
 * @param   { Function } fn - callback function to apply on any attribute found
 */
function walkAttrs(html, fn) {
  if (!html)
    { return }
  var m;
  while (m = RE_HTML_ATTRS.exec(html))
    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
}

/**
 * Walk down recursively all the children tags starting dom node
 * @param   { Object }   dom - starting node where we will start the recursion
 * @param   { Function } fn - callback to transform the child node just found
 * @param   { Object }   context - fn can optionally return an object, which is passed to children
 */
function walkNodes(dom, fn, context) {
  if (dom) {
    var res = fn(dom, context);
    var next;
    // stop the recursion
    if (res === false) { return }

    dom = dom.firstChild;

    while (dom) {
      next = dom.nextSibling;
      walkNodes(dom, fn, res);
      dom = next;
    }
  }
}

var dom = Object.freeze({
	$$: $$,
	$: $,
	createFrag: createFrag,
	createDOMPlaceholder: createDOMPlaceholder,
	isSvg: isSvg,
	mkEl: mkEl,
	setInnerHTML: setInnerHTML,
	toggleVisibility: toggleVisibility,
	remAttr: remAttr,
	styleObjectToString: styleObjectToString,
	getAttr: getAttr,
	setAttr: setAttr,
	safeInsert: safeInsert,
	walkAttrs: walkAttrs,
	walkNodes: walkNodes
});

var styleNode;
var cssTextProp;
var byName = {};
var remainder = [];
var needsInject = false;

// skip the following code on the server
if (WIN) {
  styleNode = (function () {
    // create a new style element with the correct type
    var newNode = mkEl('style');
    setAttr(newNode, 'type', 'text/css');

    // replace any user node or insert the new one into the head
    var userNode = $('style[type=riot]');
    /* istanbul ignore next */
    if (userNode) {
      if (userNode.id) { newNode.id = userNode.id; }
      userNode.parentNode.replaceChild(newNode, userNode);
    }
    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

    return newNode
  })();
  cssTextProp = styleNode.styleSheet;
}

/**
 * Object that will be used to inject and manage the css of every tag instance
 */
var styleManager = {
  styleNode: styleNode,
  /**
   * Save a tag style to be later injected into DOM
   * @param { String } css - css string
   * @param { String } name - if it's passed we will map the css to a tagname
   */
  add: function add(css, name) {
    if (name) { byName[name] = css; }
    else { remainder.push(css); }
    needsInject = true;
  },
  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   */
  inject: function inject() {
    if (!WIN || !needsInject) { return }
    needsInject = false;
    var style = Object.keys(byName)
      .map(function(k) { return byName[k] })
      .concat(remainder).join('\n');
    /* istanbul ignore next */
    if (cssTextProp) { cssTextProp.cssText = style; }
    else { styleNode.innerHTML = style; }
  }
};

/**
 * The riot template engine
 * @version v3.0.8
 */

var skipRegex = (function () { //eslint-disable-line no-unused-vars

  var beforeReChars = '[{(,;:?=|&!^~>%*/';

  var beforeReWords = [
    'case',
    'default',
    'do',
    'else',
    'in',
    'instanceof',
    'prefix',
    'return',
    'typeof',
    'void',
    'yield'
  ];

  var wordsLastChar = beforeReWords.reduce(function (s, w) {
    return s + w.slice(-1)
  }, '');

  var RE_REGEX = /^\/(?=[^*>/])[^[/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/;
  var RE_VN_CHAR = /[$\w]/;

  function prev (code, pos) {
    while (--pos >= 0 && /\s/.test(code[pos])){  }
    return pos
  }

  function _skipRegex (code, start) {

    var re = /.*/g;
    var pos = re.lastIndex = start++;
    var match = re.exec(code)[0].match(RE_REGEX);

    if (match) {
      var next = pos + match[0].length;

      pos = prev(code, pos);
      var c = code[pos];

      if (pos < 0 || ~beforeReChars.indexOf(c)) {
        return next
      }

      if (c === '.') {

        if (code[pos - 1] === '.') {
          start = next;
        }

      } else if (c === '+' || c === '-') {

        if (code[--pos] !== c ||
            (pos = prev(code, pos)) < 0 ||
            !RE_VN_CHAR.test(code[pos])) {
          start = next;
        }

      } else if (~wordsLastChar.indexOf(c)) {

        var end = pos + 1;

        while (--pos >= 0 && RE_VN_CHAR.test(code[pos])){  }
        if (~beforeReWords.indexOf(code.slice(pos + 1, end))) {
          start = next;
        }
      }
    }

    return start
  }

  return _skipRegex

})();

/**
 * riot.util.brackets
 *
 * - `brackets    ` - Returns a string or regex based on its parameter
 * - `brackets.set` - Change the current riot brackets
 *
 * @module
 */

/* global riot */

/* istanbul ignore next */
var brackets = (function (UNDEF) {

  var
    REGLOB = 'g',

    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,

    S_QBLOCKS = R_STRINGS.source + '|' +
      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,

    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

    S_QBLOCK2 = R_STRINGS.source + '|' + /(\/)(?![*\/])/.source,

    FINDBRACES = {
      '(': RegExp('([()])|'   + S_QBLOCK2, REGLOB),
      '[': RegExp('([[\\]])|' + S_QBLOCK2, REGLOB),
      '{': RegExp('([{}])|'   + S_QBLOCK2, REGLOB)
    },

    DEFAULT = '{ }';

  var _pairs = [
    '{', '}',
    '{', '}',
    /{[^}]*}/,
    /\\([{}])/g,
    /\\({)|{/g,
    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCK2, REGLOB),
    DEFAULT,
    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
    /(^|[^\\]){=[\S\s]*?}/
  ];

  var
    cachedBrackets = UNDEF,
    _regex,
    _cache = [],
    _settings;

  function _loopback (re) { return re }

  function _rewrite (re, bp) {
    if (!bp) { bp = _cache; }
    return new RegExp(
      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
    )
  }

  function _create (pair) {
    if (pair === DEFAULT) { return _pairs }

    var arr = pair.split(' ');

    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
      throw new Error('Unsupported brackets "' + pair + '"')
    }
    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
    arr[6] = _rewrite(_pairs[6], arr);
    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCK2, REGLOB);
    arr[8] = pair;
    return arr
  }

  function _brackets (reOrIdx) {
    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
  }

  _brackets.split = function split (str, tmpl, _bp) {
    // istanbul ignore next: _bp is for the compiler
    if (!_bp) { _bp = _cache; }

    var
      parts = [],
      match,
      isexpr,
      start,
      pos,
      re = _bp[6];

    var qblocks = [];
    var prevStr = '';
    var mark, lastIndex;

    isexpr = start = re.lastIndex = 0;

    while ((match = re.exec(str))) {

      lastIndex = re.lastIndex;
      pos = match.index;

      if (isexpr) {

        if (match[2]) {

          var ch = match[2];
          var rech = FINDBRACES[ch];
          var ix = 1;

          rech.lastIndex = lastIndex;
          while ((match = rech.exec(str))) {
            if (match[1]) {
              if (match[1] === ch) { ++ix; }
              else if (!--ix) { break }
            } else {
              rech.lastIndex = pushQBlock(match.index, rech.lastIndex, match[2]);
            }
          }
          re.lastIndex = ix ? str.length : rech.lastIndex;
          continue
        }

        if (!match[3]) {
          re.lastIndex = pushQBlock(pos, lastIndex, match[4]);
          continue
        }
      }

      if (!match[1]) {
        unescapeStr(str.slice(start, pos));
        start = re.lastIndex;
        re = _bp[6 + (isexpr ^= 1)];
        re.lastIndex = start;
      }
    }

    if (str && start < str.length) {
      unescapeStr(str.slice(start));
    }

    parts.qblocks = qblocks;

    return parts

    function unescapeStr (s) {
      if (prevStr) {
        s = prevStr + s;
        prevStr = '';
      }
      if (tmpl || isexpr) {
        parts.push(s && s.replace(_bp[5], '$1'));
      } else {
        parts.push(s);
      }
    }

    function pushQBlock(_pos, _lastIndex, slash) { //eslint-disable-line
      if (slash) {
        _lastIndex = skipRegex(str, _pos);
      }

      if (tmpl && _lastIndex > _pos + 2) {
        mark = '\u2057' + qblocks.length + '~';
        qblocks.push(str.slice(_pos, _lastIndex));
        prevStr += str.slice(start, _pos) + mark;
        start = _lastIndex;
      }
      return _lastIndex
    }
  };

  _brackets.hasExpr = function hasExpr (str) {
    return _cache[4].test(str)
  };

  _brackets.loopKeys = function loopKeys (expr) {
    var m = expr.match(_cache[9]);

    return m
      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
      : { val: expr.trim() }
  };

  _brackets.array = function array (pair) {
    return pair ? _create(pair) : _cache
  };

  function _reset (pair) {
    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
      _cache = _create(pair);
      _regex = pair === DEFAULT ? _loopback : _rewrite;
      _cache[9] = _regex(_pairs[9]);
    }
    cachedBrackets = pair;
  }

  function _setSettings (o) {
    var b;

    o = o || {};
    b = o.brackets;
    Object.defineProperty(o, 'brackets', {
      set: _reset,
      get: function () { return cachedBrackets },
      enumerable: true
    });
    _settings = o;
    _reset(b);
  }

  Object.defineProperty(_brackets, 'settings', {
    set: _setSettings,
    get: function () { return _settings }
  });

  /* istanbul ignore next: in the browser riot is always in the scope */
  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
  _brackets.set = _reset;
  _brackets.skipRegex = skipRegex;

  _brackets.R_STRINGS = R_STRINGS;
  _brackets.R_MLCOMMS = R_MLCOMMS;
  _brackets.S_QBLOCKS = S_QBLOCKS;
  _brackets.S_QBLOCK2 = S_QBLOCK2;

  return _brackets

})();

/**
 * @module tmpl
 *
 * tmpl          - Root function, returns the template value, render with data
 * tmpl.hasExpr  - Test the existence of a expression inside a string
 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
 */

/* istanbul ignore next */
var tmpl = (function () {

  var _cache = {};

  function _tmpl (str, data) {
    if (!str) { return str }

    return (_cache[str] || (_cache[str] = _create(str))).call(
      data, _logErr.bind({
        data: data,
        tmpl: str
      })
    )
  }

  _tmpl.hasExpr = brackets.hasExpr;

  _tmpl.loopKeys = brackets.loopKeys;

  // istanbul ignore next
  _tmpl.clearCache = function () { _cache = {}; };

  _tmpl.errorHandler = null;

  function _logErr (err, ctx) {

    err.riotData = {
      tagName: ctx && ctx.__ && ctx.__.tagName,
      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
    };

    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
    else if (
      typeof console !== 'undefined' &&
      typeof console.error === 'function'
    ) {
      console.error(err.message);
      console.log('<%s> %s', err.riotData.tagName || 'Unknown tag', this.tmpl); // eslint-disable-line
      console.log(this.data); // eslint-disable-line
    }
  }

  function _create (str) {
    var expr = _getTmpl(str);

    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
  }

  var RE_DQUOTE = /\u2057/g;
  var RE_QBMARK = /\u2057(\d+)~/g;

  function _getTmpl (str) {
    var parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
    var qstr = parts.qblocks;
    var expr;

    if (parts.length > 2 || parts[0]) {
      var i, j, list = [];

      for (i = j = 0; i < parts.length; ++i) {

        expr = parts[i];

        if (expr && (expr = i & 1

            ? _parseExpr(expr, 1, qstr)

            : '"' + expr
                .replace(/\\/g, '\\\\')
                .replace(/\r\n?|\n/g, '\\n')
                .replace(/"/g, '\\"') +
              '"'

          )) { list[j++] = expr; }

      }

      expr = j < 2 ? list[0]
           : '[' + list.join(',') + '].join("")';

    } else {

      expr = _parseExpr(parts[1], 0, qstr);
    }

    if (qstr.length) {
      expr = expr.replace(RE_QBMARK, function (_, pos) {
        return qstr[pos]
          .replace(/\r/g, '\\r')
          .replace(/\n/g, '\\n')
      });
    }
    return expr
  }

  var RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/;
  var
    RE_BREND = {
      '(': /[()]/g,
      '[': /[[\]]/g,
      '{': /[{}]/g
    };

  function _parseExpr (expr, asText, qstr) {

    expr = expr
      .replace(/\s+/g, ' ').trim()
      .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

    if (expr) {
      var
        list = [],
        cnt = 0,
        match;

      while (expr &&
            (match = expr.match(RE_CSNAME)) &&
            !match.index
        ) {
        var
          key,
          jsb,
          re = /,|([[{(])|$/g;

        expr = RegExp.rightContext;
        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

        jsb  = expr.slice(0, match.index);
        expr = RegExp.rightContext;

        list[cnt++] = _wrapExpr(jsb, 1, key);
      }

      expr = !cnt ? _wrapExpr(expr, asText)
           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
    }
    return expr

    function skipBraces (ch, re) {
      var
        mm,
        lv = 1,
        ir = RE_BREND[ch];

      ir.lastIndex = re.lastIndex;
      while (mm = ir.exec(expr)) {
        if (mm[0] === ch) { ++lv; }
        else if (!--lv) { break }
      }
      re.lastIndex = lv ? expr.length : ir.lastIndex;
    }
  }

  // istanbul ignore next: not both
  var // eslint-disable-next-line max-len
    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

  function _wrapExpr (expr, asText, key) {
    var tb;

    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
      if (mvar) {
        pos = tb ? 0 : pos + match.length;

        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
          match = p + '("' + mvar + JS_CONTEXT + mvar;
          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
        } else if (pos) {
          tb = !JS_NOPROPS.test(s.slice(pos));
        }
      }
      return match
    });

    if (tb) {
      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
    }

    if (key) {

      expr = (tb
          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
        ) + '?"' + key + '":""';

    } else if (asText) {

      expr = 'function(v){' + (tb
          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
        ) + ';return v||v===0?v:""}.call(this)';
    }

    return expr
  }

  _tmpl.version = brackets.version = 'v3.0.8';

  return _tmpl

})();

/* istanbul ignore next */
var observable$1 = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {};

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice;

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          { (callbacks[event] = callbacks[event] || []).push(fn); }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) { callbacks = {}; }
        else {
          if (fn) {
            var arr = callbacks[event];
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) { arr.splice(i--, 1); }
            }
          } else { delete callbacks[event]; }
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on);
          fn.apply(el, arguments);
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {
        var arguments$1 = arguments;


        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i;

        for (i = 0; i < arglen; i++) {
          args[i] = arguments$1[i + 1]; // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0);

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args);
        }

        if (callbacks['*'] && event != '*')
          { el.trigger.apply(el, ['*', event].concat(args)); }

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  });

  return el

};

/**
 * Specialized function for looping an array-like collection with `each={}`
 * @param   { Array } list - collection of items
 * @param   {Function} fn - callback function
 * @returns { Array } the array looped
 */
function each(list, fn) {
  var len = list ? list.length : 0;
  var i = 0;
  for (; i < len; ++i) {
    fn(list[i], i);
  }
  return list
}

/**
 * Check whether an array contains an item
 * @param   { Array } array - target array
 * @param   { * } item - item to test
 * @returns { Boolean } -
 */
function contains(array, item) {
  return array.indexOf(item) !== -1
}

/**
 * Convert a string containing dashes to camel case
 * @param   { String } str - input string
 * @returns { String } my-string -> myString
 */
function toCamel(str) {
  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
}

/**
 * Faster String startsWith alternative
 * @param   { String } str - source string
 * @param   { String } value - test string
 * @returns { Boolean } -
 */
function startsWith(str, value) {
  return str.slice(0, value.length) === value
}

/**
 * Helper function to set an immutable property
 * @param   { Object } el - object where the new property will be set
 * @param   { String } key - object key where the new property will be stored
 * @param   { * } value - value of the new property
 * @param   { Object } options - set the propery overriding the default options
 * @returns { Object } - the initial object
 */
function defineProperty(el, key, value, options) {
  Object.defineProperty(el, key, extend({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  return el
}

/**
 * Extend any object with other properties
 * @param   { Object } src - source object
 * @returns { Object } the resulting extended object
 *
 * var obj = { foo: 'baz' }
 * extend(obj, {bar: 'bar', foo: 'bar'})
 * console.log(obj) => {bar: 'bar', foo: 'bar'}
 *
 */
function extend(src) {
  var obj, args = arguments;
  for (var i = 1; i < args.length; ++i) {
    if (obj = args[i]) {
      for (var key in obj) {
        // check if this property of the source object could be overridden
        if (isWritable(src, key))
          { src[key] = obj[key]; }
      }
    }
  }
  return src
}

var misc = Object.freeze({
	each: each,
	contains: contains,
	toCamel: toCamel,
	startsWith: startsWith,
	defineProperty: defineProperty,
	extend: extend
});

var settings$1 = extend(Object.create(brackets.settings), {
  skipAnonymousTags: true,
  // handle the auto updates on any DOM event
  autoUpdate: true
});

/**
 * Trigger DOM events
 * @param   { HTMLElement } dom - dom element target of the event
 * @param   { Function } handler - user function
 * @param   { Object } e - event object
 */
function handleEvent(dom, handler, e) {
  var ptag = this.__.parent,
    item = this.__.item;

  if (!item)
    { while (ptag && !item) {
      item = ptag.__.item;
      ptag = ptag.__.parent;
    } }

  // override the event properties
  /* istanbul ignore next */
  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
  /* istanbul ignore next */
  if (isWritable(e, 'target')) { e.target = e.srcElement; }
  /* istanbul ignore next */
  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

  e.item = item;

  handler.call(this, e);

  // avoid auto updates
  if (!settings$1.autoUpdate) { return }

  if (!e.preventUpdate) {
    var p = getImmediateCustomParentTag(this);
    // fixes #2083
    if (p.isMounted) { p.update(); }
  }
}

/**
 * Attach an event to a DOM node
 * @param { String } name - event name
 * @param { Function } handler - event callback
 * @param { Object } dom - dom node
 * @param { Tag } tag - tag instance
 */
function setEventHandler(name, handler, dom, tag) {
  var eventName,
    cb = handleEvent.bind(tag, dom, handler);

  // avoid to bind twice the same event
  // possible fix for #2332
  dom[name] = null;

  // normalize event name
  eventName = name.replace(RE_EVENTS_PREFIX, '');

  // cache the listener into the listeners array
  if (!contains(tag.__.listeners, dom)) { tag.__.listeners.push(dom); }
  if (!dom[RIOT_EVENTS_KEY]) { dom[RIOT_EVENTS_KEY] = {}; }
  if (dom[RIOT_EVENTS_KEY][name]) { dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][name]); }

  dom[RIOT_EVENTS_KEY][name] = cb;
  dom.addEventListener(eventName, cb, false);
}

/**
 * Update dynamically created data-is tags with changing expressions
 * @param { Object } expr - expression tag and expression info
 * @param { Tag }    parent - parent for tag creation
 * @param { String } tagName - tag implementation we want to use
 */
function updateDataIs(expr, parent, tagName) {
  var conf, isVirtual, head, ref;

  if (expr.tag && expr.tagName === tagName) {
    expr.tag.update();
    return
  }

  isVirtual = expr.dom.tagName === 'VIRTUAL';
  // sync _parent to accommodate changing tagnames
  if (expr.tag) {
    // need placeholder before unmount
    if(isVirtual) {
      head = expr.tag.__.head;
      ref = createDOMPlaceholder();
      head.parentNode.insertBefore(ref, head);
    }

    expr.tag.unmount(true);
  }

  if (!isString(tagName)) { return }

  expr.impl = __TAG_IMPL[tagName];
  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
  each(expr.attrs, function (a) { return setAttr(expr.tag.root, a.name, a.value); });
  expr.tagName = tagName;
  expr.tag.mount();
  if (isVirtual)
    { makeReplaceVirtual(expr.tag, ref || expr.tag.root); } // root exist first time, after use placeholder

  // parent is the placeholder tag, not the dynamic tag so clean up
  parent.__.onUnmount = function() {
    var delName = expr.tag.opts.dataIs,
      tags = expr.tag.parent.tags,
      _tags = expr.tag.__.parent.tags;
    arrayishRemove(tags, delName, expr.tag);
    arrayishRemove(_tags, delName, expr.tag);
    expr.tag.unmount();
  };
}

/**
 * Nomalize any attribute removing the "riot-" prefix
 * @param   { String } attrName - original attribute name
 * @returns { String } valid html attribute name
 */
function normalizeAttrName(attrName) {
  if (!attrName) { return null }
  attrName = attrName.replace(ATTRS_PREFIX, '');
  if (CASE_SENSITIVE_ATTRIBUTES[attrName]) { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
  return attrName
}

/**
 * Update on single tag expression
 * @this Tag
 * @param { Object } expr - expression logic
 * @returns { undefined }
 */
function updateExpression(expr) {
  if (this.root && getAttr(this.root,'virtualized')) { return }

  var dom = expr.dom,
    // remove the riot- prefix
    attrName = normalizeAttrName(expr.attr),
    isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
    parent = dom && (expr.parent || dom.parentNode),
    // detect the style attributes
    isStyleAttr = attrName === 'style',
    isClassAttr = attrName === 'class',
    hasValue,
    isObj,
    value;

  // if it's a tag we could totally skip the rest
  if (expr._riot_id) {
    if (expr.isMounted) {
      expr.update();
    // if it hasn't been mounted yet, do that now.
    } else {
      expr.mount();
      if (isVirtual) {
        makeReplaceVirtual(expr, expr.root);
      }
    }
    return
  }
  // if this expression has the update method it means it can handle the DOM changes by itself
  if (expr.update) { return expr.update() }

  // ...it seems to be a simple expression so we try to calculat its value
  value = tmpl(expr.expr, isToggle ? extend({}, Object.create(this.parent), this) : this);
  hasValue = !isBlank(value);
  isObj = isObject(value);

  // convert the style/class objects to strings
  if (isObj) {
    isObj = !isClassAttr && !isStyleAttr;
    if (isClassAttr) {
      value = tmpl(JSON.stringify(value), this);
    } else if (isStyleAttr) {
      value = styleObjectToString(value);
    }
  }

  // remove original attribute
  if (expr.attr && (!expr.isAttrRemoved || !hasValue || value === false)) {
    remAttr(dom, expr.attr);
    expr.isAttrRemoved = true;
  }

  // for the boolean attributes we don't need the value
  // we can convert it to checked=true to checked=checked
  if (expr.bool) { value = value ? attrName : false; }
  if (expr.isRtag) { return updateDataIs(expr, this, value) }
  if (expr.wasParsedOnce && expr.value === value) { return }

  // update the expression value
  expr.value = value;
  expr.wasParsedOnce = true;

  // if the value is an object we can not do much more with it
  if (isObj && !isToggle) { return }
  // avoid to render undefined/null values
  if (isBlank(value)) { value = ''; }

  // textarea and text nodes have no attribute name
  if (!attrName) {
    // about #815 w/o replace: the browser converts the value to a string,
    // the comparison by "==" does too, but not in the server
    value += '';
    // test for parent avoids error with invalid assignment to nodeValue
    if (parent) {
      // cache the parent node because somehow it will become null on IE
      // on the next iteration
      expr.parent = parent;
      if (parent.tagName === 'TEXTAREA') {
        parent.value = value;                    // #1113
        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
      }                                         // will be available on 'updated'
      else { dom.nodeValue = value; }
    }
    return
  }


  // event handler
  if (isFunction(value)) {
    setEventHandler(attrName, value, dom, this);
  // show / hide
  } else if (isToggle) {
    toggleVisibility(dom, attrName === HIDE_DIRECTIVE ? !value : value);
  // handle attributes
  } else {
    if (expr.bool) {
      dom[attrName] = value;
    }

    if (attrName === 'value' && dom.value !== value) {
      dom.value = value;
    }

    if (hasValue && value !== false) {
      setAttr(dom, attrName, value);
    }

    // make sure that in case of style changes
    // the element stays hidden
    if (isStyleAttr && dom.hidden) { toggleVisibility(dom, false); }
  }
}

/**
 * Update all the expressions in a Tag instance
 * @this Tag
 * @param { Array } expressions - expression that must be re evaluated
 */
function updateAllExpressions(expressions) {
  each(expressions, updateExpression.bind(this));
}

var IfExpr = {
  init: function init(dom, tag, expr) {
    remAttr(dom, CONDITIONAL_DIRECTIVE);
    this.tag = tag;
    this.expr = expr;
    this.stub = createDOMPlaceholder();
    this.pristine = dom;

    var p = dom.parentNode;
    p.insertBefore(this.stub, dom);
    p.removeChild(dom);

    return this
  },
  update: function update() {
    this.value = tmpl(this.expr, this.tag);

    if (this.value && !this.current) { // insert
      this.current = this.pristine.cloneNode(true);
      this.stub.parentNode.insertBefore(this.current, this.stub);
      this.expressions = [];
      parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
    } else if (!this.value && this.current) { // remove
      unmountAll(this.expressions);
      if (this.current._tag) {
        this.current._tag.unmount();
      } else if (this.current.parentNode) {
        this.current.parentNode.removeChild(this.current);
      }
      this.current = null;
      this.expressions = [];
    }

    if (this.value) { updateAllExpressions.call(this.tag, this.expressions); }
  },
  unmount: function unmount() {
    unmountAll(this.expressions || []);
  }
};

var RefExpr = {
  init: function init(dom, parent, attrName, attrValue) {
    this.dom = dom;
    this.attr = attrName;
    this.rawValue = attrValue;
    this.parent = parent;
    this.hasExp = tmpl.hasExpr(attrValue);
    return this
  },
  update: function update() {
    var old = this.value;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
    var tagOrDom = this.dom.__ref || this.tag || this.dom;

    this.value = this.hasExp ? tmpl(this.rawValue, this.parent) : this.rawValue;

    // the name changed, so we need to remove it from the old key (if present)
    if (!isBlank(old) && customParent) { arrayishRemove(customParent.refs, old, tagOrDom); }
    if (!isBlank(this.value) && isString(this.value)) {
      // add it to the refs of parent tag (this behavior was changed >=3.0)
      if (customParent) { arrayishAdd(
        customParent.refs,
        this.value,
        tagOrDom,
        // use an array if it's a looped node and the ref is not an expression
        null,
        this.parent.__.index
      ); }

      if (this.value !== old) {
        setAttr(this.dom, this.attr, this.value);
      }
    } else {
      remAttr(this.dom, this.attr);
    }

    // cache the ref bound to this dom node
    // to reuse it in future (see also #2329)
    if (!this.dom.__ref) { this.dom.__ref = tagOrDom; }
  },
  unmount: function unmount() {
    var tagOrDom = this.tag || this.dom;
    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
    if (!isBlank(this.value) && customParent)
      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
  }
};

/**
 * Convert the item looped into an object used to extend the child tag properties
 * @param   { Object } expr - object containing the keys used to extend the children tags
 * @param   { * } key - value to assign to the new object returned
 * @param   { * } val - value containing the position of the item in the array
 * @param   { Object } base - prototype object for the new item
 * @returns { Object } - new object containing the values of the original item
 *
 * The variables 'key' and 'val' are arbitrary.
 * They depend on the collection type looped (Array, Object)
 * and on the expression used on the each tag
 *
 */
function mkitem(expr, key, val, base) {
  var item = base ? Object.create(base) : {};
  item[expr.key] = key;
  if (expr.pos) { item[expr.pos] = val; }
  return item
}

/**
 * Unmount the redundant tags
 * @param   { Array } items - array containing the current items to loop
 * @param   { Array } tags - array containing all the children tags
 */
function unmountRedundant(items, tags) {
  var i = tags.length,
    j = items.length;

  while (i > j) {
    i--;
    remove.apply(tags[i], [tags, i]);
  }
}


/**
 * Remove a child tag
 * @this Tag
 * @param   { Array } tags - tags collection
 * @param   { Number } i - index of the tag to remove
 */
function remove(tags, i) {
  tags.splice(i, 1);
  this.unmount();
  arrayishRemove(this.parent, this, this.__.tagName, true);
}

/**
 * Move the nested custom tags in non custom loop tags
 * @this Tag
 * @param   { Number } i - current position of the loop tag
 */
function moveNestedTags(i) {
  var this$1 = this;

  each(Object.keys(this.tags), function (tagName) {
    moveChildTag.apply(this$1.tags[tagName], [tagName, i]);
  });
}

/**
 * Move a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function move(root, nextTag, isVirtual) {
  if (isVirtual)
    { moveVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Insert and mount a child tag
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function insert(root, nextTag, isVirtual) {
  if (isVirtual)
    { makeVirtual.apply(this, [root, nextTag]); }
  else
    { safeInsert(root, this.root, nextTag.root); }
}

/**
 * Append a new tag into the DOM
 * @this Tag
 * @param   { HTMLElement } root - dom node containing all the loop children
 * @param   { Boolean } isVirtual - is it a virtual tag?
 */
function append(root, isVirtual) {
  if (isVirtual)
    { makeVirtual.call(this, root); }
  else
    { root.appendChild(this.root); }
}

/**
 * Manage tags having the 'each'
 * @param   { HTMLElement } dom - DOM node we need to loop
 * @param   { Tag } parent - parent tag instance where the dom node is contained
 * @param   { String } expr - string contained in the 'each' attribute
 * @returns { Object } expression object for this each loop
 */
function _each(dom, parent, expr) {

  // remove the each property from the original tag
  remAttr(dom, LOOP_DIRECTIVE);

  var mustReorder = typeof getAttr(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
    tagName = getTagName(dom),
    impl = __TAG_IMPL[tagName],
    parentNode = dom.parentNode,
    placeholder = createDOMPlaceholder(),
    child = getTag(dom),
    ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
    tags = [],
    oldItems = [],
    hasKeys,
    isLoop = true,
    isAnonymous = !__TAG_IMPL[tagName],
    isVirtual = dom.tagName === 'VIRTUAL';

  // parse the each expression
  expr = tmpl.loopKeys(expr);
  expr.isLoop = true;

  if (ifExpr) { remAttr(dom, CONDITIONAL_DIRECTIVE); }

  // insert a marked where the loop tags will be injected
  parentNode.insertBefore(placeholder, dom);
  parentNode.removeChild(dom);

  expr.update = function updateEach() {
    // get the new items collection
    expr.value = tmpl(expr.val, parent);

    var frag = createFrag(),
      items = expr.value,
      isObject$$1 = !isArray(items) && !isString(items),
      root = placeholder.parentNode;

    // if this DOM was removed the update here is useless
    // this condition fixes also a weird async issue on IE in our unit test
    if (!root) { return }

    // object loop. any changes cause full redraw
    if (isObject$$1) {
      hasKeys = items || false;
      items = hasKeys ?
        Object.keys(items).map(function (key) {
          return mkitem(expr, items[key], key)
        }) : [];
    } else {
      hasKeys = false;
    }

    if (ifExpr) {
      items = items.filter(function(item, i) {
        if (expr.key && !isObject$$1)
          { return !!tmpl(ifExpr, mkitem(expr, item, i, parent)) }

        return !!tmpl(ifExpr, extend(Object.create(parent), item))
      });
    }

    // loop all the new items
    each(items, function(item, i) {
      // reorder only if the items are objects
      var
        doReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
        oldPos = oldItems.indexOf(item),
        isNew = oldPos === -1,
        pos = !isNew && doReorder ? oldPos : i,
        // does a tag exist in this position?
        tag = tags[pos],
        mustAppend = i >= oldItems.length,
        mustCreate =  doReorder && isNew || !doReorder && !tag;

      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

      // new tag
      if (mustCreate) {
        tag = new Tag$1(impl, {
          parent: parent,
          isLoop: isLoop,
          isAnonymous: isAnonymous,
          tagName: tagName,
          root: dom.cloneNode(isAnonymous),
          item: item,
          index: i,
        }, dom.innerHTML);

        // mount the tag
        tag.mount();

        if (mustAppend)
          { append.apply(tag, [frag || root, isVirtual]); }
        else
          { insert.apply(tag, [root, tags[i], isVirtual]); }

        if (!mustAppend) { oldItems.splice(i, 0, item); }
        tags.splice(i, 0, tag);
        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
      } else if (pos !== i && doReorder) {
        // move
        if (contains(items, oldItems[pos])) {
          move.apply(tag, [root, tags[i], isVirtual]);
          // move the old tag instance
          tags.splice(i, 0, tags.splice(pos, 1)[0]);
          // move the old item
          oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
        }

        // update the position attribute if it exists
        if (expr.pos) { tag[expr.pos] = i; }

        // if the loop tags are not custom
        // we need to move all their custom tags into the right position
        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
      }

      // cache the original item to use it in the events bound to this node
      // and its children
      tag.__.item = item;
      tag.__.index = i;
      tag.__.parent = parent;

      if (!mustCreate) { tag.update(item); }
    });

    // remove the redundant tags
    unmountRedundant(items, tags);

    // clone the items array
    oldItems = items.slice();

    // this condition is weird u
    root.insertBefore(frag, placeholder);
  };

  expr.unmount = function() {
    each(tags, function(t) { t.unmount(); });
  };

  return expr
}

/**
 * Walk the tag DOM to detect the expressions to evaluate
 * @this Tag
 * @param   { HTMLElement } root - root tag where we will start digging the expressions
 * @param   { Array } expressions - empty array where the expressions will be added
 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
 * @returns { Object } an object containing the root noode and the dom tree
 */
function parseExpressions(root, expressions, mustIncludeRoot) {
  var this$1 = this;

  var tree = {parent: {children: expressions}};

  walkNodes(root, function (dom, ctx) {
    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

    // text node
    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

    if (type !== 1) { return ctx } // not an element

    var isVirtual = dom.tagName === 'VIRTUAL';

    // loop. each does it's own thing (for now)
    if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
      if(isVirtual) { setAttr(dom, 'loopVirtual', true); } // ignore here, handled in _each
      parent.children.push(_each(dom, this$1, attr));
      return false
    }

    // if-attrs become the new parent. Any following expressions (either on the current
    // element, or below it) become children of this expression.
    if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
      return false
    }

    if (expr = getAttr(dom, IS_DIRECTIVE)) {
      if (tmpl.hasExpr(expr)) {
        parent.children.push({isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes)});
        return false
      }
    }

    // if this is a tag, stop traversing here.
    // we ignore the root, since parseExpressions is called while we're mounting that root
    tagImpl = getTag(dom);
    if(isVirtual) {
      if(getAttr(dom, 'virtualized')) {dom.parentElement.removeChild(dom); } // tag created, remove from dom
      if(!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual'))  // ok to create virtual tag
        { tagImpl = { tmpl: dom.outerHTML }; }
    }

    if (tagImpl && (dom !== root || mustIncludeRoot)) {
      if(isVirtual && !getAttr(dom, IS_DIRECTIVE)) { // handled in update
        // can not remove attribute like directives
        // so flag for removal after creation to prevent maximum stack error
        setAttr(dom, 'virtualized', true);

        var tag = new Tag$1({ tmpl: dom.outerHTML },
          {root: dom, parent: this$1},
          dom.innerHTML);
        parent.children.push(tag); // no return, anonymous tag, keep parsing
      } else {
        var conf = {root: dom, parent: this$1, hasImpl: true};
        parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
        return false
      }
    }

    // attribute expressions
    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
      if (!expr) { return }
      parent.children.push(expr);
    }]);

    // whatever the parent is, all child elements get the same parent.
    // If this element had an if-attr, that's the parent for all child elements
    return {parent: parent}
  }, tree);
}

/**
 * Calls `fn` for every attribute on an element. If that attr has an expression,
 * it is also passed to fn.
 * @this Tag
 * @param   { HTMLElement } dom - dom node to parse
 * @param   { Array } attrs - array of attributes
 * @param   { Function } fn - callback to exec on any iteration
 */
function parseAttributes(dom, attrs, fn) {
  var this$1 = this;

  each(attrs, function (attr) {
    if (!attr) { return false }

    var name = attr.name, bool = isBoolAttr(name), expr;

    if (contains(REF_DIRECTIVES, name)) {
      expr =  Object.create(RefExpr).init(dom, this$1, name, attr.value);
    } else if (tmpl.hasExpr(attr.value)) {
      expr = {dom: dom, expr: attr.value, attr: name, bool: bool};
    }

    fn(attr, expr);
  });
}

/*
  Includes hacks needed for the Internet Explorer version 9 and below
  See: http://kangax.github.io/compat-table/es5/#ie8
       http://codeplanet.io/dropping-ie8/
*/

var reHasYield  = /<yield\b/i;
var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
var GENERIC = 'div';
var SVG = 'svg';


/*
  Creates the root element for table or select child elements:
  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
*/
function specialTags(el, tmpl, tagName) {

  var
    select = tagName[0] === 'o',
    parent = select ? 'select>' : 'table>';

  // trim() is important here, this ensures we don't have artifacts,
  // so we can check if we have only one element inside the parent
  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
  parent = el.firstChild;

  // returns the immediate parent if tr/th/td/col is the only element, if not
  // returns the whole tree, as this can include additional elements
  /* istanbul ignore next */
  if (select) {
    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
  } else {
    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
    var tname = rootEls[tagName];
    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
  }
  return parent
}

/*
  Replace the yield tag from any tag template with the innerHTML of the
  original tag in the page
*/
function replaceYield(tmpl, html) {
  // do nothing if no yield
  if (!reHasYield.test(tmpl)) { return tmpl }

  // be careful with #1343 - string on the source having `$1`
  var src = {};

  html = html && html.replace(reYieldSrc, function (_, ref, text) {
    src[ref] = src[ref] || text;   // preserve first definition
    return ''
  }).trim();

  return tmpl
    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
      return src[ref] || def || ''
    })
    .replace(reYieldAll, function (_, def) {        // yield without any "from"
      return html || def || ''
    })
}

/**
 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
 *
 * @param   { String } tmpl  - The template coming from the custom tag definition
 * @param   { String } html - HTML content that comes from the DOM element where you
 *           will mount the tag, mostly the original tag in the page
 * @param   { Boolean } isSvg - true if the root node is an svg
 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
 */
function mkdom(tmpl, html, isSvg$$1) {
  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
    tagName = match && match[1].toLowerCase(),
    el = mkEl(isSvg$$1 ? SVG : GENERIC);

  // replace all the yield tags with the tag inner html
  tmpl = replaceYield(tmpl, html);

  /* istanbul ignore next */
  if (tblTags.test(tagName))
    { el = specialTags(el, tmpl, tagName); }
  else
    { setInnerHTML(el, tmpl); }

  return el
}

/**
 * Another way to create a riot tag a bit more es6 friendly
 * @param { HTMLElement } el - tag DOM selector or DOM node/s
 * @param { Object } opts - tag logic
 * @returns { Tag } new riot tag instance
 */
function Tag$2(el, opts) {
  // get the tag properties from the class constructor
  var ref = this;
  var name = ref.name;
  var tmpl = ref.tmpl;
  var css = ref.css;
  var attrs = ref.attrs;
  var onCreate = ref.onCreate;
  // register a new tag and cache the class prototype
  if (!__TAG_IMPL[name]) {
    tag$1(name, tmpl, css, attrs, onCreate);
    // cache the class constructor
    __TAG_IMPL[name].class = this.constructor;
  }

  // mount the tag using the class instance
  mountTo(el, name, opts, this);
  // inject the component css
  if (css) { styleManager.inject(); }

  return this
}

/**
 * Create a new riot tag implementation
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag$1(name, tmpl, css, attrs, fn) {
  if (isFunction(attrs)) {
    fn = attrs;

    if (/^[\w\-]+\s?=/.test(css)) {
      attrs = css;
      css = '';
    } else
      { attrs = ''; }
  }

  if (css) {
    if (isFunction(css))
      { fn = css; }
    else
      { styleManager.add(css); }
  }

  name = name.toLowerCase();
  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Create a new riot tag implementation (for use by the compiler)
 * @param   { String }   name - name/id of the new riot tag
 * @param   { String }   tmpl - tag template
 * @param   { String }   css - custom tag css
 * @param   { String }   attrs - root tag attributes
 * @param   { Function } fn - user function
 * @returns { String } name/id of the tag just created
 */
function tag2$1(name, tmpl, css, attrs, fn) {
  if (css) { styleManager.add(css, name); }

  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

  return name
}

/**
 * Mount a tag using a specific tag implementation
 * @param   { * } selector - tag DOM selector or DOM node/s
 * @param   { String } tagName - tag implementation name
 * @param   { Object } opts - tag logic
 * @returns { Array } new tags instances
 */
function mount$1(selector, tagName, opts) {
  var tags = [];
  var elem, allTags;

  function pushTagsTo(root) {
    if (root.tagName) {
      var riotTag = getAttr(root, IS_DIRECTIVE), tag;

      // have tagName? force riot-tag to be the same
      if (tagName && riotTag !== tagName) {
        riotTag = tagName;
        setAttr(root, IS_DIRECTIVE, tagName);
      }

      tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

      if (tag)
        { tags.push(tag); }
    } else if (root.length)
      { each(root, pushTagsTo); } // assume nodeList
  }

  // inject styles into DOM
  styleManager.inject();

  if (isObject(tagName)) {
    opts = tagName;
    tagName = 0;
  }

  // crawl the DOM to find the tag
  if (isString(selector)) {
    selector = selector === '*' ?
      // select all registered tags
      // & tags found with the riot-tag attribute set
      allTags = selectTags() :
      // or just the ones named like the selector
      selector + selectTags(selector.split(/, */));

    // make sure to pass always a selector
    // to the querySelectorAll function
    elem = selector ? $$(selector) : [];
  }
  else
    // probably you have passed already a tag or a NodeList
    { elem = selector; }

  // select all the registered and mount them inside their root elements
  if (tagName === '*') {
    // get all custom tags
    tagName = allTags || selectTags();
    // if the root els it's just a single tag
    if (elem.tagName)
      { elem = $$(tagName, elem); }
    else {
      // select all the children for all the different root elements
      var nodeList = [];

      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

      elem = nodeList;
    }
    // get rid of the tagName
    tagName = 0;
  }

  pushTagsTo(elem);

  return tags
}

// Create a mixin that could be globally shared across all the tags
var mixins = {};
var globals = mixins[GLOBAL_MIXIN] = {};
var mixins_id = 0;

/**
 * Create/Return a mixin by its name
 * @param   { String }  name - mixin name (global mixin if object)
 * @param   { Object }  mix - mixin logic
 * @param   { Boolean } g - is global?
 * @returns { Object }  the mixin logic
 */
function mixin$1(name, mix, g) {
  // Unnamed global
  if (isObject(name)) {
    mixin$1(("__" + (mixins_id++) + "__"), name, true);
    return
  }

  var store = g ? globals : mixins;

  // Getter
  if (!mix) {
    if (isUndefined(store[name]))
      { throw new Error(("Unregistered mixin: " + name)) }

    return store[name]
  }

  // Setter
  store[name] = isFunction(mix) ?
    extend(mix.prototype, store[name] || {}) && mix :
    extend(store[name] || {}, mix);
}

/**
 * Update all the tags instances created
 * @returns { Array } all the tags instances
 */
function update$1() {
  return each(__TAGS_CACHE, function (tag) { return tag.update(); })
}

function unregister$1(name) {
  __TAG_IMPL[name] = null;
}

var version$1 = 'v3.6.0';


var core = Object.freeze({
	Tag: Tag$2,
	tag: tag$1,
	tag2: tag2$1,
	mount: mount$1,
	mixin: mixin$1,
	update: update$1,
	unregister: unregister$1,
	version: version$1
});

// counter to give a unique id to all the Tag instances
var __uid = 0;

/**
 * We need to update opts for this tag. That requires updating the expressions
 * in any attributes on the tag, and then copying the result onto opts.
 * @this Tag
 * @param   {Boolean} isLoop - is it a loop tag?
 * @param   { Tag }  parent - parent tag node
 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
 * @param   { Object }  opts - tag options
 * @param   { Array }  instAttrs - tag attributes array
 */
function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
  // (and only this case) we don't need to do updateOpts, because the regular parse
  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
  if (isLoop && isAnonymous) { return }

  var ctx = !isAnonymous && isLoop ? this : parent || this;
  each(instAttrs, function (attr) {
    if (attr.expr) { updateAllExpressions.call(ctx, [attr.expr]); }
    // normalize the attribute names
    opts[toCamel(attr.name).replace(ATTRS_PREFIX, '')] = attr.expr ? attr.expr.value : attr.value;
  });
}


/**
 * Tag class
 * @constructor
 * @param { Object } impl - it contains the tag template, and logic
 * @param { Object } conf - tag options
 * @param { String } innerHTML - html that eventually we need to inject in the tag
 */
function Tag$1(impl, conf, innerHTML) {
  if ( impl === void 0 ) impl = {};
  if ( conf === void 0 ) conf = {};

  var opts = extend({}, conf.opts),
    parent = conf.parent,
    isLoop = conf.isLoop,
    isAnonymous = !!conf.isAnonymous,
    skipAnonymous = settings$1.skipAnonymousTags && isAnonymous,
    item = cleanUpData(conf.item),
    index = conf.index, // available only for the looped nodes
    instAttrs = [], // All attributes on the Tag when it's first parsed
    implAttrs = [], // expressions on this type of Tag
    expressions = [],
    root = conf.root,
    tagName = conf.tagName || getTagName(root),
    isVirtual = tagName === 'virtual',
    isInline = !isVirtual && !impl.tmpl,
    propsInSyncWithParent = [],
    dom;

  // make this tag observable
  if (!skipAnonymous) { observable$1(this); }
  // only call unmount if we have a valid __TAG_IMPL (has name property)
  if (impl.name && root._tag) { root._tag.unmount(true); }

  // not yet mounted
  this.isMounted = false;

  defineProperty(this, '__', {
    isAnonymous: isAnonymous,
    instAttrs: instAttrs,
    innerHTML: innerHTML,
    tagName: tagName,
    index: index,
    isLoop: isLoop,
    isInline: isInline,
    // tags having event listeners
    // it would be better to use weak maps here but we can not introduce breaking changes now
    listeners: [],
    // these vars will be needed only for the virtual tags
    virts: [],
    tail: null,
    head: null,
    parent: null,
    item: null
  });

  // create a unique id to this tag
  // it could be handy to use it also to improve the virtual dom rendering speed
  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
  defineProperty(this, 'root', root);
  extend(this, { opts: opts }, item);
  // protect the "tags" and "refs" property from being overridden
  defineProperty(this, 'parent', parent || null);
  defineProperty(this, 'tags', {});
  defineProperty(this, 'refs', {});

  if (isInline || isLoop && isAnonymous) {
    dom = root;
  } else {
    if (!isVirtual) { root.innerHTML = ''; }
    dom = mkdom(impl.tmpl, innerHTML, isSvg(root));
  }

  /**
   * Update the tag expressions and options
   * @param   { * }  data - data we want to use to extend the tag properties
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'update', function tagUpdate(data) {
    var nextOpts = {},
      canTrigger = this.isMounted && !skipAnonymous;

    // make sure the data passed will not override
    // the component core methods
    data = cleanUpData(data);
    extend(this, data);
    updateOpts.apply(this, [isLoop, parent, isAnonymous, nextOpts, instAttrs]);

    if (canTrigger && this.isMounted && isFunction(this.shouldUpdate) && !this.shouldUpdate(data, nextOpts)) {
      return this
    }

    // inherit properties from the parent, but only for isAnonymous tags
    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
    extend(opts, nextOpts);
    if (canTrigger) { this.trigger('update', data); }
    updateAllExpressions.call(this, expressions);
    if (canTrigger) { this.trigger('updated'); }

    return this

  }.bind(this));

  /**
   * Add a mixin to this tag
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mixin', function tagMixin() {
    var this$1 = this;

    each(arguments, function (mix) {
      var instance, obj;
      var props = [];

      // properties blacklisted and will not be bound to the tag instance
      var propsBlacklist = ['init', '__proto__'];

      mix = isString(mix) ? mixin$1(mix) : mix;

      // check if the mixin is a function
      if (isFunction(mix)) {
        // create the new mixin instance
        instance = new mix();
      } else { instance = mix; }

      var proto = Object.getPrototypeOf(instance);

      // build multilevel prototype inheritance chain property list
      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
      while (obj = Object.getPrototypeOf(obj || instance))

      // loop the keys in the function prototype or the all object keys
      each(props, function (key) {
        // bind methods to this
        // allow mixins to override other properties/parent mixins
        if (!contains(propsBlacklist, key)) {
          // check for getters/setters
          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

          // apply method only if it does not already exist on the instance
          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
            Object.defineProperty(this$1, key, descriptor);
          } else {
            this$1[key] = isFunction(instance[key]) ?
              instance[key].bind(this$1) :
              instance[key];
          }
        }
      });

      // init method will be called automatically
      if (instance.init)
        { instance.init.bind(this$1)(); }
    });
    return this
  }.bind(this));

  /**
   * Mount the current tag instance
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'mount', function tagMount() {
    var this$1 = this;

    root._tag = this; // keep a reference to the tag just created

    // Read all the attrs on this instance. This give us the info we need for updateOpts
    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
      attr.expr = expr;
      instAttrs.push(attr);
    }]);

    // update the root adding custom attributes coming from the compiler
    implAttrs = [];
    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
      if (expr) { expressions.push(expr); }
      else { setAttr(root, attr.name, attr.value); }
    }]);

    // initialiation
    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

    // add global mixins
    var globalMixin = mixin$1(GLOBAL_MIXIN);

    if (globalMixin && !skipAnonymous) {
      for (var i in globalMixin) {
        if (globalMixin.hasOwnProperty(i)) {
          this$1.mixin(globalMixin[i]);
        }
      }
    }

    if (impl.fn) { impl.fn.call(this, opts); }

    if (!skipAnonymous) { this.trigger('before-mount'); }

    // parse layout after init. fn may calculate args for nested custom tags
    parseExpressions.apply(this, [dom, expressions, isAnonymous]);

    this.update(item);

    if (!isAnonymous && !isInline) {
      while (dom.firstChild) { root.appendChild(dom.firstChild); }
    }

    defineProperty(this, 'root', root);
    defineProperty(this, 'isMounted', true);

    if (skipAnonymous) { return }

    // if it's not a child tag we can trigger its mount event
    if (!this.parent) {
      this.trigger('mount');
    }
    // otherwise we need to wait that the parent "mount" or "updated" event gets triggered
    else {
      var p = getImmediateCustomParentTag(this.parent);
      p.one(!p.isMounted ? 'mount' : 'updated', function () {
        this$1.trigger('mount');
      });
    }

    return this

  }.bind(this));

  /**
   * Unmount the tag instance
   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
   * @returns { Tag } the current tag instance
   */
  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
    var this$1 = this;

    var el = this.root,
      p = el.parentNode,
      ptag,
      tagIndex = __TAGS_CACHE.indexOf(this);

    if (!skipAnonymous) { this.trigger('before-unmount'); }

    // clear all attributes coming from the mounted tag
    walkAttrs(impl.attrs, function (name) {
      if (startsWith(name, ATTRS_PREFIX))
        { name = name.slice(ATTRS_PREFIX.length); }

      remAttr(root, name);
    });

    // remove all the event listeners
    this.__.listeners.forEach(function (dom) {
      Object.keys(dom[RIOT_EVENTS_KEY]).forEach(function (eventName) {
        dom.removeEventListener(eventName, dom[RIOT_EVENTS_KEY][eventName]);
      });
    });

    // remove this tag instance from the global virtualDom variable
    if (tagIndex !== -1)
      { __TAGS_CACHE.splice(tagIndex, 1); }

    if (p || isVirtual) {
      if (parent) {
        ptag = getImmediateCustomParentTag(parent);

        if (isVirtual) {
          Object.keys(this.tags).forEach(function (tagName) {
            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
          });
        } else {
          arrayishRemove(ptag.tags, tagName, this);
          // remove from _parent too
          if(parent !== ptag) {
            arrayishRemove(parent.tags, tagName, this);
          }
        }
      } else {
        // remove the tag contents
        setInnerHTML(el, '');
      }

      if (p && !mustKeepRoot) { p.removeChild(el); }
    }

    if (this.__.virts) {
      each(this.__.virts, function (v) {
        if (v.parentNode) { v.parentNode.removeChild(v); }
      });
    }

    // allow expressions to unmount themselves
    unmountAll(expressions);
    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

    // custom internal unmount function to avoid relying on the observable
    if (this.__.onUnmount) { this.__.onUnmount(); }

    if (!skipAnonymous) {
      this.trigger('unmount');
      this.off('*');
    }

    defineProperty(this, 'isMounted', false);

    delete this.root._tag;

    return this

  }.bind(this));
}

/**
 * Detect the tag implementation by a DOM node
 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
 */
function getTag(dom) {
  return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) ||
    getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
}

/**
 * Inherit properties from a target tag instance
 * @this Tag
 * @param   { Tag } target - tag where we will inherit properties
 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
 */
function inheritFrom(target, propsInSyncWithParent) {
  var this$1 = this;

  each(Object.keys(target), function (k) {
    // some properties must be always in sync with the parent tag
    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

    if (isUndefined(this$1[k]) || mustSync) {
      // track the property to keep in sync
      // so we can keep it updated
      if (!mustSync) { propsInSyncWithParent.push(k); }
      this$1[k] = target[k];
    }
  });
}

/**
 * Move the position of a custom tag in its parent tag
 * @this Tag
 * @param   { String } tagName - key where the tag was stored
 * @param   { Number } newPos - index where the new tag will be stored
 */
function moveChildTag(tagName, newPos) {
  var parent = this.parent,
    tags;
  // no parent no move
  if (!parent) { return }

  tags = parent.tags[tagName];

  if (isArray(tags))
    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
  else { arrayishAdd(parent.tags, tagName, this); }
}

/**
 * Create a new child tag including it correctly into its parent
 * @param   { Object } child - child tag implementation
 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
 * @param   { String } innerHTML - inner html of the child node
 * @param   { Object } parent - instance of the parent tag including the child custom tag
 * @returns { Object } instance of the new child tag just created
 */
function initChildTag(child, opts, innerHTML, parent) {
  var tag = new Tag$1(child, opts, innerHTML),
    tagName = opts.tagName || getTagName(opts.root, true),
    ptag = getImmediateCustomParentTag(parent);
  // fix for the parent attribute in the looped elements
  defineProperty(tag, 'parent', ptag);
  // store the real parent tag
  // in some cases this could be different from the custom parent tag
  // for example in nested loops
  tag.__.parent = parent;

  // add this tag to the custom parent tag
  arrayishAdd(ptag.tags, tagName, tag);

  // and also to the real parent tag
  if (ptag !== parent)
    { arrayishAdd(parent.tags, tagName, tag); }

  return tag
}

/**
 * Loop backward all the parents tree to detect the first custom parent tag
 * @param   { Object } tag - a Tag instance
 * @returns { Object } the instance of the first custom parent tag found
 */
function getImmediateCustomParentTag(tag) {
  var ptag = tag;
  while (ptag.__.isAnonymous) {
    if (!ptag.parent) { break }
    ptag = ptag.parent;
  }
  return ptag
}

/**
 * Trigger the unmount method on all the expressions
 * @param   { Array } expressions - DOM expressions
 */
function unmountAll(expressions) {
  each(expressions, function(expr) {
    if (expr instanceof Tag$1) { expr.unmount(true); }
    else if (expr.tagName) { expr.tag.unmount(true); }
    else if (expr.unmount) { expr.unmount(); }
  });
}

/**
 * Get the tag name of any DOM node
 * @param   { Object } dom - DOM node we want to parse
 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
 * @returns { String } name to identify this dom node in riot
 */
function getTagName(dom, skipDataIs) {
  var child = getTag(dom),
    namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
  return namedTag && !tmpl.hasExpr(namedTag) ?
                namedTag :
              child ? child.name : dom.tagName.toLowerCase()
}

/**
 * With this function we avoid that the internal Tag methods get overridden
 * @param   { Object } data - options we want to use to extend the tag instance
 * @returns { Object } clean object without containing the riot internal reserved words
 */
function cleanUpData(data) {
  if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger)))
    { return data }

  var o = {};
  for (var key in data) {
    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
  }
  return o
}

/**
 * Set the property of an object for a given key. If something already
 * exists there, then it becomes an array containing both the old and new value.
 * @param { Object } obj - object on which to set the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be set
 * @param { Boolean } ensureArray - ensure that the property remains an array
 * @param { Number } index - add the new item in a certain array position
 */
function arrayishAdd(obj, key, value, ensureArray, index) {
  var dest = obj[key];
  var isArr = isArray(dest);
  var hasIndex = !isUndefined(index);

  if (dest && dest === value) { return }

  // if the key was never set, set it once
  if (!dest && ensureArray) { obj[key] = [value]; }
  else if (!dest) { obj[key] = value; }
  // if it was an array and not yet set
  else {
    if (isArr) {
      var oldIndex = dest.indexOf(value);
      // this item never changed its position
      if (oldIndex === index) { return }
      // remove the item from its old position
      if (oldIndex !== -1) { dest.splice(oldIndex, 1); }
      // move or add the item
      if (hasIndex) {
        dest.splice(index, 0, value);
      } else {
        dest.push(value);
      }
    } else { obj[key] = [dest, value]; }
  }
}

/**
 * Removes an item from an object at a given key. If the key points to an array,
 * then the item is just removed from the array.
 * @param { Object } obj - object on which to remove the property
 * @param { String } key - property name
 * @param { Object } value - the value of the property to be removed
 * @param { Boolean } ensureArray - ensure that the property remains an array
*/
function arrayishRemove(obj, key, value, ensureArray) {
  if (isArray(obj[key])) {
    var index = obj[key].indexOf(value);
    if (index !== -1) { obj[key].splice(index, 1); }
    if (!obj[key].length) { delete obj[key]; }
    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
  } else
    { delete obj[key]; } // otherwise just delete the key
}

/**
 * Mount a tag creating new Tag instance
 * @param   { Object } root - dom node where the tag will be mounted
 * @param   { String } tagName - name of the riot tag we want to mount
 * @param   { Object } opts - options to pass to the Tag instance
 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
 * @returns { Tag } a new Tag instance
 */
function mountTo(root, tagName, opts, ctx) {
  var impl = __TAG_IMPL[tagName],
    implClass = __TAG_IMPL[tagName].class,
    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
    // cache the inner HTML to fix #855
    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

  var conf = extend({ root: root, opts: opts }, { parent: opts ? opts.parent : null });

  if (impl && root) { Tag$1.apply(tag, [impl, conf, innerHTML]); }

  if (tag && tag.mount) {
    tag.mount(true);
    // add this tag to the virtualDom variable
    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
  }

  return tag
}

/**
 * makes a tag virtual and replaces a reference in the dom
 * @this Tag
 * @param { tag } the tag to make virtual
 * @param { ref } the dom reference location
 */
function makeReplaceVirtual(tag, ref) {
  var frag = createFrag();
  makeVirtual.call(tag, frag);
  ref.parentNode.replaceChild(frag, ref);
}

/**
 * Adds the elements for a virtual tag
 * @this Tag
 * @param { Node } src - the node that will do the inserting or appending
 * @param { Tag } target - only if inserting, insert before this tag's first child
 */
function makeVirtual(src, target) {
  var this$1 = this;

  var head = createDOMPlaceholder(),
    tail = createDOMPlaceholder(),
    frag = createFrag(),
    sib, el;

  this.root.insertBefore(head, this.root.firstChild);
  this.root.appendChild(tail);

  this.__.head = el = head;
  this.__.tail = tail;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    this$1.__.virts.push(el); // hold for unmounting
    el = sib;
  }

  if (target)
    { src.insertBefore(frag, target.__.head); }
  else
    { src.appendChild(frag); }
}

/**
 * Move virtual tag and all child nodes
 * @this Tag
 * @param { Node } src  - the node that will do the inserting
 * @param { Tag } target - insert before this tag's first child
 */
function moveVirtual(src, target) {
  var this$1 = this;

  var el = this.__.head,
    frag = createFrag(),
    sib;

  while (el) {
    sib = el.nextSibling;
    frag.appendChild(el);
    el = sib;
    if (el === this$1.__.tail) {
      frag.appendChild(el);
      src.insertBefore(frag, target.__.head);
      break
    }
  }
}

/**
 * Get selectors for tags
 * @param   { Array } tags - tag names to select
 * @returns { String } selector
 */
function selectTags(tags) {
  // select all tags
  if (!tags) {
    var keys = Object.keys(__TAG_IMPL);
    return keys + selectTags(keys)
  }

  return tags
    .filter(function (t) { return !/[^-\w]/.test(t); })
    .reduce(function (list, t) {
      var name = t.trim().toLowerCase();
      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
    }, '')
}


var tags = Object.freeze({
	getTag: getTag,
	inheritFrom: inheritFrom,
	moveChildTag: moveChildTag,
	initChildTag: initChildTag,
	getImmediateCustomParentTag: getImmediateCustomParentTag,
	unmountAll: unmountAll,
	getTagName: getTagName,
	cleanUpData: cleanUpData,
	arrayishAdd: arrayishAdd,
	arrayishRemove: arrayishRemove,
	mountTo: mountTo,
	makeReplaceVirtual: makeReplaceVirtual,
	makeVirtual: makeVirtual,
	moveVirtual: moveVirtual,
	selectTags: selectTags
});

/**
 * Riot public api
 */
var settings = settings$1;
var util = {
  tmpl: tmpl,
  brackets: brackets,
  styleManager: styleManager,
  vdom: __TAGS_CACHE,
  styleNode: styleManager.styleNode,
  // export the riot internal utils as well
  dom: dom,
  check: check,
  misc: misc,
  tags: tags
};

// export the core props/methods
var Tag$$1 = Tag$2;
var tag$$1 = tag$1;
var tag2$$1 = tag2$1;
var mount$$1 = mount$1;
var mixin$$1 = mixin$1;
var update$$1 = update$1;
var unregister$$1 = unregister$1;
var version$$1 = version$1;
var observable = observable$1;

var riot$1 = extend({}, core, {
  observable: observable$1,
  settings: settings,
  util: util,
});

exports.settings = settings;
exports.util = util;
exports.Tag = Tag$$1;
exports.tag = tag$$1;
exports.tag2 = tag2$$1;
exports.mount = mount$$1;
exports.mixin = mixin$$1;
exports.update = update$$1;
exports.unregister = unregister$$1;
exports.version = version$$1;
exports.observable = observable;
exports['default'] = riot$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports, __webpack_require__(0)) :
	typeof define === 'function' && define.amd ? define(['exports', 'riot'], factory) :
	(factory((global.riotHotReload = global.riotHotReload || {}),global.riot));
}(this, (function (exports,riot) { 'use strict';

var nonState = 'isMounted opts'.split(' ');

function reload(name) {
  riot.util.styleManager.inject();

  var elems = document.querySelectorAll((name + ", [data-is=" + name + "]"));
  var tags = [];

  for (var i = 0; i < elems.length; i++) {
    var el = elems[i], oldTag = el._tag, v;
    reload.trigger('before-unmount', oldTag);
    oldTag.unmount(true); // detach the old tag

    // reset the innerHTML and attributes to how they were before mount
    el.innerHTML = oldTag.__.innerHTML;
    (oldTag.__.instAttrs || []).map(function(attr) {
      el.setAttribute(attr.name, attr.value);
    });

    // copy options for creating the new tag
    var newOpts = {};
    for(key in oldTag.opts) {
      newOpts[key] = oldTag.opts[key];
    }
    newOpts.parent = oldTag.parent;

    // create the new tag
    reload.trigger('before-mount', newOpts, oldTag);
    var newTag = riot.mount(el, newOpts)[0];

    // copy state from the old to new tag
    for(var key in oldTag) {
      v = oldTag[key];
      if (~nonState.indexOf(key)) { continue }
      newTag[key] = v;
    }
    newTag.update();
    tags.push(newTag);
    reload.trigger('after-mount', newTag, oldTag);
  }

  return tags
}

riot.observable(reload);
riot.reload = reload;
if (riot.default) { riot.default.reload = reload; }

exports.reload = reload;
exports['default'] = reload;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logs_tag__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logs_tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__logs_tag__);

    var riot = __webpack_require__(0)
    //src: C:/dev/js/riotjs/ilan-arch/src/webpack/random.tag

riot.tag2('random',
  '<h3>{opts.title}</h3> <button onclick="{generate}"> Generate </button> <h1> {number} </h1> <img src="svg-logo-h.svg" height="30"> <logs logs="{logs}" onclear="{clearLogs}"></logs>',
  'random h1,[data-is="random"] h1{ color: red; }',
  '', function(opts) {
var _this = this;

this.number = null;
this.logs = [];

this.generate = e => {
  _this.logs.push({ text: `Generate button clicked. Even type is ${e.type}` });
  _this.number = Math.floor(Math.random() * 10000);
};

this.clearLogs = e => {
  _this.logs = [];
};

this.generate({ type: 'custom' });
});

    
  

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_riot___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_riot__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_riot_hot_reload__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_riot_hot_reload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_riot_hot_reload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__random_tag__ = __webpack_require__(2);




__WEBPACK_IMPORTED_MODULE_0_riot___default.a.mount('random', {
  title: 'Hi there!'
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    //src: C:/dev/js/riotjs/ilan-arch/src/webpack/logs.tag
riot.tag2('logs',
  '<h4>Logs</h4> <button onclick="{opts.onclear}"> Clear logs </button> <ul> <li each="{opts.logs}">{text}</li> </ul>',
  '',
  '', function(opts) {
});

    
  

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjQzMjcwYTRlMTM1ZjI2YmUzMzQiLCJ3ZWJwYWNrOi8vLy4vfi9yaW90L3Jpb3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yaW90LWhvdC1yZWxvYWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnBhY2svcmFuZG9tLnRhZyIsIndlYnBhY2s6Ly8vLi9zcmMvd2VicGFjay9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnBhY2svbG9ncy50YWciXSwibmFtZXMiOlsicmlvdCIsIm1vdW50IiwidGl0bGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQyxDQUFDLDRCQUE0Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELEdBQUcsR0FBRztBQUMvRCxpQ0FBaUM7QUFDakM7QUFDQSwyQ0FBMkM7O0FBRTNDO0FBQ0E7QUFDQSxhQUFhLFNBQVM7QUFD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QUwsQ0FBVyxRQUFYLEVBQXFCO0FBQ25CQyxTQUFPO0FBRFksQ0FBckIsRTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxhQUFhLHdDQUF3QyxVQUFVLEdBQUcsS0FBSztBQUMxRztBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI0MzI3MGE0ZTEzNWYyNmJlMzM0IiwiLyogUmlvdCB2My42LjAsIEBsaWNlbnNlIE1JVCAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLnJpb3QgPSBnbG9iYWwucmlvdCB8fCB7fSkpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIF9fVEFHU19DQUNIRSA9IFtdO1xudmFyIF9fVEFHX0lNUEwgPSB7fTtcbnZhciBHTE9CQUxfTUlYSU4gPSAnX19nbG9iYWxfbWl4aW4nO1xudmFyIEFUVFJTX1BSRUZJWCA9ICdyaW90LSc7XG52YXIgUkVGX0RJUkVDVElWRVMgPSBbJ3JlZicsICdkYXRhLXJlZiddO1xudmFyIElTX0RJUkVDVElWRSA9ICdkYXRhLWlzJztcbnZhciBDT05ESVRJT05BTF9ESVJFQ1RJVkUgPSAnaWYnO1xudmFyIExPT1BfRElSRUNUSVZFID0gJ2VhY2gnO1xudmFyIExPT1BfTk9fUkVPUkRFUl9ESVJFQ1RJVkUgPSAnbm8tcmVvcmRlcic7XG52YXIgU0hPV19ESVJFQ1RJVkUgPSAnc2hvdyc7XG52YXIgSElERV9ESVJFQ1RJVkUgPSAnaGlkZSc7XG52YXIgUklPVF9FVkVOVFNfS0VZID0gJ19fcmlvdC1ldmVudHNfXyc7XG52YXIgVF9TVFJJTkcgPSAnc3RyaW5nJztcbnZhciBUX09CSkVDVCA9ICdvYmplY3QnO1xudmFyIFRfVU5ERUYgID0gJ3VuZGVmaW5lZCc7XG52YXIgVF9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG52YXIgWExJTktfTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7XG52YXIgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbnZhciBYTElOS19SRUdFWCA9IC9eeGxpbms6KFxcdyspLztcbnZhciBXSU4gPSB0eXBlb2Ygd2luZG93ID09PSBUX1VOREVGID8gdW5kZWZpbmVkIDogd2luZG93O1xudmFyIFJFX1NQRUNJQUxfVEFHUyA9IC9eKD86dCg/OmJvZHl8aGVhZHxmb290fFtyaGRdKXxjYXB0aW9ufGNvbCg/Omdyb3VwKT98b3B0KD86aW9ufGdyb3VwKSkkLztcbnZhciBSRV9TUEVDSUFMX1RBR1NfTk9fT1BUSU9OID0gL14oPzp0KD86Ym9keXxoZWFkfGZvb3R8W3JoZF0pfGNhcHRpb258Y29sKD86Z3JvdXApPykkLztcbnZhciBSRV9FVkVOVFNfUFJFRklYID0gL15vbi87XG52YXIgUkVfUkVTRVJWRURfTkFNRVMgPSAvXig/Ol8oPzppdGVtfGlkfHBhcmVudCl8dXBkYXRlfHJvb3R8KD86dW4pP21vdW50fG1peGlufGlzKD86TW91bnRlZHxMb29wKXx0YWdzfHJlZnN8cGFyZW50fG9wdHN8dHJpZ2dlcnxvKD86bnxmZnxuZSkpJC87XG52YXIgUkVfSFRNTF9BVFRSUyA9IC8oWy1cXHddKykgPz0gPyg/OlwiKFteXCJdKil8JyhbXiddKil8KHtbXn1dKn0pKS9nO1xudmFyIENBU0VfU0VOU0lUSVZFX0FUVFJJQlVURVMgPSB7ICd2aWV3Ym94JzogJ3ZpZXdCb3gnIH07XG52YXIgUkVfQk9PTF9BVFRSUyA9IC9eKD86ZGlzYWJsZWR8Y2hlY2tlZHxyZWFkb25seXxyZXF1aXJlZHxhbGxvd2Z1bGxzY3JlZW58YXV0byg/OmZvY3VzfHBsYXkpfGNvbXBhY3R8Y29udHJvbHN8ZGVmYXVsdHxmb3Jtbm92YWxpZGF0ZXxoaWRkZW58aXNtYXB8aXRlbXNjb3BlfGxvb3B8bXVsdGlwbGV8bXV0ZWR8bm8oPzpyZXNpemV8c2hhZGV8dmFsaWRhdGV8d3JhcCk/fG9wZW58cmV2ZXJzZWR8c2VhbWxlc3N8c2VsZWN0ZWR8c29ydGFibGV8dHJ1ZXNwZWVkfHR5cGVtdXN0bWF0Y2gpJC87XG52YXIgSUVfVkVSU0lPTiA9IChXSU4gJiYgV0lOLmRvY3VtZW50IHx8IHt9KS5kb2N1bWVudE1vZGUgfCAwO1xuXG4vKipcbiAqIENoZWNrIENoZWNrIGlmIHRoZSBwYXNzZWQgYXJndW1lbnQgaXMgdW5kZWZpbmVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNCb29sQXR0cih2YWx1ZSkge1xuICByZXR1cm4gUkVfQk9PTF9BVFRSUy50ZXN0KHZhbHVlKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gVF9GVU5DVElPTlxufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhbiBvYmplY3QsIGV4Y2x1ZGUgbnVsbFxuICogTk9URTogdXNlIGlzT2JqZWN0KHgpICYmICFpc0FycmF5KHgpIHRvIGV4Y2x1ZGVzIGFycmF5cy5cbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gVF9PQkpFQ1QgLy8gdHlwZW9mIG51bGwgaXMgJ29iamVjdCdcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgdW5kZWZpbmVkXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfVU5ERUZcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBzdHJpbmdcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gVF9TVFJJTkdcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgZW1wdHkuIERpZmZlcmVudCBmcm9tIGZhbHN5LCBiZWNhdXNlIHdlIGRvbnQgY29uc2lkZXIgMCBvciBmYWxzZSB0byBiZSBibGFua1xuICogQHBhcmFtIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNCbGFuayh2YWx1ZSkge1xuICByZXR1cm4gaXNVbmRlZmluZWQodmFsdWUpIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJ1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIGtpbmQgb2YgYXJyYXlcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheVxufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgb2JqZWN0J3MgcHJvcGVydHkgY291bGQgYmUgb3ZlcnJpZGRlblxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgb2JqIC0gc291cmNlIG9iamVjdFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAga2V5IC0gb2JqZWN0IHByb3BlcnR5XG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzV3JpdGFibGUob2JqLCBrZXkpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgcmV0dXJuIGlzVW5kZWZpbmVkKG9ialtrZXldKSB8fCBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iud3JpdGFibGVcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSByZXNlcnZlZCBuYW1lXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNSZXNlcnZlZE5hbWUodmFsdWUpIHtcbiAgcmV0dXJuIFJFX1JFU0VSVkVEX05BTUVTLnRlc3QodmFsdWUpXG59XG5cbnZhciBjaGVjayA9IE9iamVjdC5mcmVlemUoe1xuXHRpc0Jvb2xBdHRyOiBpc0Jvb2xBdHRyLFxuXHRpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuXHRpc09iamVjdDogaXNPYmplY3QsXG5cdGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcblx0aXNTdHJpbmc6IGlzU3RyaW5nLFxuXHRpc0JsYW5rOiBpc0JsYW5rLFxuXHRpc0FycmF5OiBpc0FycmF5LFxuXHRpc1dyaXRhYmxlOiBpc1dyaXRhYmxlLFxuXHRpc1Jlc2VydmVkTmFtZTogaXNSZXNlcnZlZE5hbWVcbn0pO1xuXG4vKipcbiAqIFNob3J0ZXIgYW5kIGZhc3Qgd2F5IHRvIHNlbGVjdCBtdWx0aXBsZSBub2RlcyBpbiB0aGUgRE9NXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHNlbGVjdG9yIC0gRE9NIHNlbGVjdG9yXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIERPTSBub2RlIHdoZXJlIHRoZSB0YXJnZXRzIG9mIG91ciBzZWFyY2ggd2lsbCBpcyBsb2NhdGVkXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGRvbSBub2RlcyBmb3VuZFxuICovXG5mdW5jdGlvbiAkJChzZWxlY3RvciwgY3R4KSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCgoY3R4IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbn1cblxuLyoqXG4gKiBTaG9ydGVyIGFuZCBmYXN0IHdheSB0byBzZWxlY3QgYSBzaW5nbGUgbm9kZSBpbiB0aGUgRE9NXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHNlbGVjdG9yIC0gdW5pcXVlIGRvbSBzZWxlY3RvclxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBET00gbm9kZSB3aGVyZSB0aGUgdGFyZ2V0IG9mIG91ciBzZWFyY2ggd2lsbCBpcyBsb2NhdGVkXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGRvbSBub2RlIGZvdW5kXG4gKi9cbmZ1bmN0aW9uICQoc2VsZWN0b3IsIGN0eCkge1xuICByZXR1cm4gKGN0eCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb2N1bWVudCBmcmFnbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVGcmFnKCkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZG9jdW1lbnQgdGV4dCBub2RlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGNyZWF0ZSBhIHRleHQgbm9kZSB0byB1c2UgYXMgcGxhY2Vob2xkZXJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJylcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIERPTSBub2RlIGlzIGFuIHN2ZyB0YWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSAgZWwgLSBub2RlIHdlIHdhbnQgdG8gdGVzdFxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgaXQncyBhbiBzdmcgbm9kZVxuICovXG5mdW5jdGlvbiBpc1N2ZyhlbCkge1xuICByZXR1cm4gISFlbC5vd25lclNWR0VsZW1lbnRcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBnZW5lcmljIERPTSBub2RlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBET00gbm9kZSB3ZSB3YW50IHRvIGNyZWF0ZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNTdmcgLSB0cnVlIGlmIHdlIG5lZWQgdG8gdXNlIGFuIHN2ZyBub2RlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IERPTSBub2RlIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiBta0VsKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUgPT09ICdzdmcnID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OUywgbmFtZSkgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpXG59XG5cbi8qKlxuICogU2V0IHRoZSBpbm5lciBodG1sIG9mIGFueSBET00gbm9kZSBTVkdzIGluY2x1ZGVkXG4gKiBAcGFyYW0geyBPYmplY3QgfSBjb250YWluZXIgLSBET00gbm9kZSB3aGVyZSB3ZSdsbCBpbmplY3QgbmV3IGh0bWxcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGh0bWwgLSBodG1sIHRvIGluamVjdFxuICovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gc2V0SW5uZXJIVE1MKGNvbnRhaW5lciwgaHRtbCkge1xuICBpZiAoIWlzVW5kZWZpbmVkKGNvbnRhaW5lci5pbm5lckhUTUwpKVxuICAgIHsgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7IH1cbiAgICAvLyBzb21lIGJyb3dzZXJzIGRvIG5vdCBzdXBwb3J0IGlubmVySFRNTCBvbiB0aGUgU1ZHcyB0YWdzXG4gIGVsc2Uge1xuICAgIHZhciBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGh0bWwsICdhcHBsaWNhdGlvbi94bWwnKTtcbiAgICB2YXIgbm9kZSA9IGNvbnRhaW5lci5vd25lckRvY3VtZW50LmltcG9ydE5vZGUoZG9jLmRvY3VtZW50RWxlbWVudCwgdHJ1ZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICB9XG59XG5cbi8qKlxuICogVG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIGFueSBET00gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBoaWRlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBzaG93IC0gZG8gd2Ugd2FudCB0byBzaG93IGl0P1xuICovXG5cbmZ1bmN0aW9uIHRvZ2dsZVZpc2liaWxpdHkoZG9tLCBzaG93KSB7XG4gIGRvbS5zdHlsZS5kaXNwbGF5ID0gc2hvdyA/ICcnIDogJ25vbmUnO1xuICBkb21bJ2hpZGRlbiddID0gc2hvdyA/IGZhbHNlIDogdHJ1ZTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW55IERPTSBhdHRyaWJ1dGUgZnJvbSBhIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byB1cGRhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gcmVtb3ZlXG4gKi9cbmZ1bmN0aW9uIHJlbUF0dHIoZG9tLCBuYW1lKSB7XG4gIGRvbS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0eWxlIG9iamVjdCB0byBhIHN0cmluZ1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBzdHlsZSAtIHN0eWxlIG9iamVjdCB3ZSBuZWVkIHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IHJlc3VsdGluZyBjc3Mgc3RyaW5nXG4gKiBAZXhhbXBsZVxuICogc3R5bGVPYmplY3RUb1N0cmluZyh7IGNvbG9yOiAncmVkJywgaGVpZ2h0OiAnMTBweCd9KSAvLyA9PiAnY29sb3I6IHJlZDsgaGVpZ2h0OiAxMHB4J1xuICovXG5mdW5jdGlvbiBzdHlsZU9iamVjdFRvU3RyaW5nKHN0eWxlKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhzdHlsZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHByb3ApIHtcbiAgICByZXR1cm4gKGFjYyArIFwiIFwiICsgcHJvcCArIFwiOiBcIiArIChzdHlsZVtwcm9wXSkgKyBcIjtcIilcbiAgfSwgJycpXG59XG5cbi8qKlxuICogR2V0IHRoZSB2YWx1ZSBvZiBhbnkgRE9NIGF0dHJpYnV0ZSBvbiBhIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgYXR0cmlidXRlIHdlIHdhbnQgdG8gZ2V0XG4gKiBAcmV0dXJucyB7IFN0cmluZyB8IHVuZGVmaW5lZCB9IG5hbWUgb2YgdGhlIG5vZGUgYXR0cmlidXRlIHdoZXRoZXIgaXQgZXhpc3RzXG4gKi9cbmZ1bmN0aW9uIGdldEF0dHIoZG9tLCBuYW1lKSB7XG4gIHJldHVybiBkb20uZ2V0QXR0cmlidXRlKG5hbWUpXG59XG5cbi8qKlxuICogU2V0IGFueSBET00gYXR0cmlidXRlXG4gKiBAcGFyYW0geyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gc2V0XG4gKiBAcGFyYW0geyBTdHJpbmcgfSB2YWwgLSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byBzZXRcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cihkb20sIG5hbWUsIHZhbCkge1xuICB2YXIgeGxpbmsgPSBYTElOS19SRUdFWC5leGVjKG5hbWUpO1xuICBpZiAoeGxpbmsgJiYgeGxpbmtbMV0pXG4gICAgeyBkb20uc2V0QXR0cmlidXRlTlMoWExJTktfTlMsIHhsaW5rWzFdLCB2YWwpOyB9XG4gIGVsc2VcbiAgICB7IGRvbS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsKTsgfVxufVxuXG4vKipcbiAqIEluc2VydCBzYWZlbHkgYSB0YWcgdG8gZml4ICMxOTYyICMxNjQ5XG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGNoaWxkcmVuIGNvbnRhaW5lclxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGN1cnIgLSBub2RlIHRvIGluc2VydFxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IG5leHQgLSBub2RlIHRoYXQgc2hvdWxkIHByZWNlZWQgdGhlIGN1cnJlbnQgbm9kZSBpbnNlcnRlZFxuICovXG5mdW5jdGlvbiBzYWZlSW5zZXJ0KHJvb3QsIGN1cnIsIG5leHQpIHtcbiAgcm9vdC5pbnNlcnRCZWZvcmUoY3VyciwgbmV4dC5wYXJlbnROb2RlICYmIG5leHQpO1xufVxuXG4vKipcbiAqIE1pbmltaXplIHJpc2s6IG9ubHkgemVybyBvciBvbmUgX3NwYWNlXyBiZXR3ZWVuIGF0dHIgJiB2YWx1ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGh0bWwgLSBodG1sIHN0cmluZyB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvbiB0byBhcHBseSBvbiBhbnkgYXR0cmlidXRlIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIHdhbGtBdHRycyhodG1sLCBmbikge1xuICBpZiAoIWh0bWwpXG4gICAgeyByZXR1cm4gfVxuICB2YXIgbTtcbiAgd2hpbGUgKG0gPSBSRV9IVE1MX0FUVFJTLmV4ZWMoaHRtbCkpXG4gICAgeyBmbihtWzFdLnRvTG93ZXJDYXNlKCksIG1bMl0gfHwgbVszXSB8fCBtWzRdKTsgfVxufVxuXG4vKipcbiAqIFdhbGsgZG93biByZWN1cnNpdmVseSBhbGwgdGhlIGNoaWxkcmVuIHRhZ3Mgc3RhcnRpbmcgZG9tIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gICBkb20gLSBzdGFydGluZyBub2RlIHdoZXJlIHdlIHdpbGwgc3RhcnQgdGhlIHJlY3Vyc2lvblxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgdG8gdHJhbnNmb3JtIHRoZSBjaGlsZCBub2RlIGp1c3QgZm91bmRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gICBjb250ZXh0IC0gZm4gY2FuIG9wdGlvbmFsbHkgcmV0dXJuIGFuIG9iamVjdCwgd2hpY2ggaXMgcGFzc2VkIHRvIGNoaWxkcmVuXG4gKi9cbmZ1bmN0aW9uIHdhbGtOb2Rlcyhkb20sIGZuLCBjb250ZXh0KSB7XG4gIGlmIChkb20pIHtcbiAgICB2YXIgcmVzID0gZm4oZG9tLCBjb250ZXh0KTtcbiAgICB2YXIgbmV4dDtcbiAgICAvLyBzdG9wIHRoZSByZWN1cnNpb25cbiAgICBpZiAocmVzID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG4gICAgZG9tID0gZG9tLmZpcnN0Q2hpbGQ7XG5cbiAgICB3aGlsZSAoZG9tKSB7XG4gICAgICBuZXh0ID0gZG9tLm5leHRTaWJsaW5nO1xuICAgICAgd2Fsa05vZGVzKGRvbSwgZm4sIHJlcyk7XG4gICAgICBkb20gPSBuZXh0O1xuICAgIH1cbiAgfVxufVxuXG52YXIgZG9tID0gT2JqZWN0LmZyZWV6ZSh7XG5cdCQkOiAkJCxcblx0JDogJCxcblx0Y3JlYXRlRnJhZzogY3JlYXRlRnJhZyxcblx0Y3JlYXRlRE9NUGxhY2Vob2xkZXI6IGNyZWF0ZURPTVBsYWNlaG9sZGVyLFxuXHRpc1N2ZzogaXNTdmcsXG5cdG1rRWw6IG1rRWwsXG5cdHNldElubmVySFRNTDogc2V0SW5uZXJIVE1MLFxuXHR0b2dnbGVWaXNpYmlsaXR5OiB0b2dnbGVWaXNpYmlsaXR5LFxuXHRyZW1BdHRyOiByZW1BdHRyLFxuXHRzdHlsZU9iamVjdFRvU3RyaW5nOiBzdHlsZU9iamVjdFRvU3RyaW5nLFxuXHRnZXRBdHRyOiBnZXRBdHRyLFxuXHRzZXRBdHRyOiBzZXRBdHRyLFxuXHRzYWZlSW5zZXJ0OiBzYWZlSW5zZXJ0LFxuXHR3YWxrQXR0cnM6IHdhbGtBdHRycyxcblx0d2Fsa05vZGVzOiB3YWxrTm9kZXNcbn0pO1xuXG52YXIgc3R5bGVOb2RlO1xudmFyIGNzc1RleHRQcm9wO1xudmFyIGJ5TmFtZSA9IHt9O1xudmFyIHJlbWFpbmRlciA9IFtdO1xudmFyIG5lZWRzSW5qZWN0ID0gZmFsc2U7XG5cbi8vIHNraXAgdGhlIGZvbGxvd2luZyBjb2RlIG9uIHRoZSBzZXJ2ZXJcbmlmIChXSU4pIHtcbiAgc3R5bGVOb2RlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjcmVhdGUgYSBuZXcgc3R5bGUgZWxlbWVudCB3aXRoIHRoZSBjb3JyZWN0IHR5cGVcbiAgICB2YXIgbmV3Tm9kZSA9IG1rRWwoJ3N0eWxlJyk7XG4gICAgc2V0QXR0cihuZXdOb2RlLCAndHlwZScsICd0ZXh0L2NzcycpO1xuXG4gICAgLy8gcmVwbGFjZSBhbnkgdXNlciBub2RlIG9yIGluc2VydCB0aGUgbmV3IG9uZSBpbnRvIHRoZSBoZWFkXG4gICAgdmFyIHVzZXJOb2RlID0gJCgnc3R5bGVbdHlwZT1yaW90XScpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKHVzZXJOb2RlKSB7XG4gICAgICBpZiAodXNlck5vZGUuaWQpIHsgbmV3Tm9kZS5pZCA9IHVzZXJOb2RlLmlkOyB9XG4gICAgICB1c2VyTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCB1c2VyTm9kZSk7XG4gICAgfVxuICAgIGVsc2UgeyBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKG5ld05vZGUpOyB9XG5cbiAgICByZXR1cm4gbmV3Tm9kZVxuICB9KSgpO1xuICBjc3NUZXh0UHJvcCA9IHN0eWxlTm9kZS5zdHlsZVNoZWV0O1xufVxuXG4vKipcbiAqIE9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZCB0byBpbmplY3QgYW5kIG1hbmFnZSB0aGUgY3NzIG9mIGV2ZXJ5IHRhZyBpbnN0YW5jZVxuICovXG52YXIgc3R5bGVNYW5hZ2VyID0ge1xuICBzdHlsZU5vZGU6IHN0eWxlTm9kZSxcbiAgLyoqXG4gICAqIFNhdmUgYSB0YWcgc3R5bGUgdG8gYmUgbGF0ZXIgaW5qZWN0ZWQgaW50byBET01cbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gY3NzIC0gY3NzIHN0cmluZ1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIC0gaWYgaXQncyBwYXNzZWQgd2Ugd2lsbCBtYXAgdGhlIGNzcyB0byBhIHRhZ25hbWVcbiAgICovXG4gIGFkZDogZnVuY3Rpb24gYWRkKGNzcywgbmFtZSkge1xuICAgIGlmIChuYW1lKSB7IGJ5TmFtZVtuYW1lXSA9IGNzczsgfVxuICAgIGVsc2UgeyByZW1haW5kZXIucHVzaChjc3MpOyB9XG4gICAgbmVlZHNJbmplY3QgPSB0cnVlO1xuICB9LFxuICAvKipcbiAgICogSW5qZWN0IGFsbCBwcmV2aW91c2x5IHNhdmVkIHRhZyBzdHlsZXMgaW50byBET01cbiAgICogaW5uZXJIVE1MIHNlZW1zIHNsb3c6IGh0dHA6Ly9qc3BlcmYuY29tL3Jpb3QtaW5zZXJ0LXN0eWxlXG4gICAqL1xuICBpbmplY3Q6IGZ1bmN0aW9uIGluamVjdCgpIHtcbiAgICBpZiAoIVdJTiB8fCAhbmVlZHNJbmplY3QpIHsgcmV0dXJuIH1cbiAgICBuZWVkc0luamVjdCA9IGZhbHNlO1xuICAgIHZhciBzdHlsZSA9IE9iamVjdC5rZXlzKGJ5TmFtZSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4gYnlOYW1lW2tdIH0pXG4gICAgICAuY29uY2F0KHJlbWFpbmRlcikuam9pbignXFxuJyk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICBpZiAoY3NzVGV4dFByb3ApIHsgY3NzVGV4dFByb3AuY3NzVGV4dCA9IHN0eWxlOyB9XG4gICAgZWxzZSB7IHN0eWxlTm9kZS5pbm5lckhUTUwgPSBzdHlsZTsgfVxuICB9XG59O1xuXG4vKipcbiAqIFRoZSByaW90IHRlbXBsYXRlIGVuZ2luZVxuICogQHZlcnNpb24gdjMuMC44XG4gKi9cblxudmFyIHNraXBSZWdleCA9IChmdW5jdGlvbiAoKSB7IC8vZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gIHZhciBiZWZvcmVSZUNoYXJzID0gJ1t7KCw7Oj89fCYhXn4+JSovJztcblxuICB2YXIgYmVmb3JlUmVXb3JkcyA9IFtcbiAgICAnY2FzZScsXG4gICAgJ2RlZmF1bHQnLFxuICAgICdkbycsXG4gICAgJ2Vsc2UnLFxuICAgICdpbicsXG4gICAgJ2luc3RhbmNlb2YnLFxuICAgICdwcmVmaXgnLFxuICAgICdyZXR1cm4nLFxuICAgICd0eXBlb2YnLFxuICAgICd2b2lkJyxcbiAgICAneWllbGQnXG4gIF07XG5cbiAgdmFyIHdvcmRzTGFzdENoYXIgPSBiZWZvcmVSZVdvcmRzLnJlZHVjZShmdW5jdGlvbiAocywgdykge1xuICAgIHJldHVybiBzICsgdy5zbGljZSgtMSlcbiAgfSwgJycpO1xuXG4gIHZhciBSRV9SRUdFWCA9IC9eXFwvKD89W14qPi9dKVteWy9cXFxcXSooPzooPzpcXFxcLnxcXFsoPzpcXFxcLnxbXlxcXVxcXFxdKikqXFxdKVteW1xcXFwvXSopKj9cXC9bZ2ltdXldKi87XG4gIHZhciBSRV9WTl9DSEFSID0gL1skXFx3XS87XG5cbiAgZnVuY3Rpb24gcHJldiAoY29kZSwgcG9zKSB7XG4gICAgd2hpbGUgKC0tcG9zID49IDAgJiYgL1xccy8udGVzdChjb2RlW3Bvc10pKXsgIH1cbiAgICByZXR1cm4gcG9zXG4gIH1cblxuICBmdW5jdGlvbiBfc2tpcFJlZ2V4IChjb2RlLCBzdGFydCkge1xuXG4gICAgdmFyIHJlID0gLy4qL2c7XG4gICAgdmFyIHBvcyA9IHJlLmxhc3RJbmRleCA9IHN0YXJ0Kys7XG4gICAgdmFyIG1hdGNoID0gcmUuZXhlYyhjb2RlKVswXS5tYXRjaChSRV9SRUdFWCk7XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHZhciBuZXh0ID0gcG9zICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICBwb3MgPSBwcmV2KGNvZGUsIHBvcyk7XG4gICAgICB2YXIgYyA9IGNvZGVbcG9zXTtcblxuICAgICAgaWYgKHBvcyA8IDAgfHwgfmJlZm9yZVJlQ2hhcnMuaW5kZXhPZihjKSkge1xuICAgICAgICByZXR1cm4gbmV4dFxuICAgICAgfVxuXG4gICAgICBpZiAoYyA9PT0gJy4nKSB7XG5cbiAgICAgICAgaWYgKGNvZGVbcG9zIC0gMV0gPT09ICcuJykge1xuICAgICAgICAgIHN0YXJ0ID0gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKGMgPT09ICcrJyB8fCBjID09PSAnLScpIHtcblxuICAgICAgICBpZiAoY29kZVstLXBvc10gIT09IGMgfHxcbiAgICAgICAgICAgIChwb3MgPSBwcmV2KGNvZGUsIHBvcykpIDwgMCB8fFxuICAgICAgICAgICAgIVJFX1ZOX0NIQVIudGVzdChjb2RlW3Bvc10pKSB7XG4gICAgICAgICAgc3RhcnQgPSBuZXh0O1xuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSBpZiAofndvcmRzTGFzdENoYXIuaW5kZXhPZihjKSkge1xuXG4gICAgICAgIHZhciBlbmQgPSBwb3MgKyAxO1xuXG4gICAgICAgIHdoaWxlICgtLXBvcyA+PSAwICYmIFJFX1ZOX0NIQVIudGVzdChjb2RlW3Bvc10pKXsgIH1cbiAgICAgICAgaWYgKH5iZWZvcmVSZVdvcmRzLmluZGV4T2YoY29kZS5zbGljZShwb3MgKyAxLCBlbmQpKSkge1xuICAgICAgICAgIHN0YXJ0ID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdGFydFxuICB9XG5cbiAgcmV0dXJuIF9za2lwUmVnZXhcblxufSkoKTtcblxuLyoqXG4gKiByaW90LnV0aWwuYnJhY2tldHNcbiAqXG4gKiAtIGBicmFja2V0cyAgICBgIC0gUmV0dXJucyBhIHN0cmluZyBvciByZWdleCBiYXNlZCBvbiBpdHMgcGFyYW1ldGVyXG4gKiAtIGBicmFja2V0cy5zZXRgIC0gQ2hhbmdlIHRoZSBjdXJyZW50IHJpb3QgYnJhY2tldHNcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuLyogZ2xvYmFsIHJpb3QgKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnZhciBicmFja2V0cyA9IChmdW5jdGlvbiAoVU5ERUYpIHtcblxuICB2YXJcbiAgICBSRUdMT0IgPSAnZycsXG5cbiAgICBSX01MQ09NTVMgPSAvXFwvXFwqW14qXSpcXCorKD86W14qXFwvXVteKl0qXFwqKykqXFwvL2csXG5cbiAgICBSX1NUUklOR1MgPSAvXCJbXlwiXFxcXF0qKD86XFxcXFtcXFNcXHNdW15cIlxcXFxdKikqXCJ8J1teJ1xcXFxdKig/OlxcXFxbXFxTXFxzXVteJ1xcXFxdKikqJ3xgW15gXFxcXF0qKD86XFxcXFtcXFNcXHNdW15gXFxcXF0qKSpgL2csXG5cbiAgICBTX1FCTE9DS1MgPSBSX1NUUklOR1Muc291cmNlICsgJ3wnICtcbiAgICAgIC8oPzpcXGJyZXR1cm5cXHMrfCg/OlskXFx3XFwpXFxdXXxcXCtcXCt8LS0pXFxzKihcXC8pKD8hWypcXC9dKSkvLnNvdXJjZSArICd8JyArXG4gICAgICAvXFwvKD89W14qXFwvXSlbXltcXC9cXFxcXSooPzooPzpcXFsoPzpcXFxcLnxbXlxcXVxcXFxdKikqXFxdfFxcXFwuKVteW1xcL1xcXFxdKikqPyhbXjxdXFwvKVtnaW1dKi8uc291cmNlLFxuXG4gICAgVU5TVVBQT1JURUQgPSBSZWdFeHAoJ1tcXFxcJyArICd4MDAtXFxcXHgxRjw+YS16QS1aMC05XFwnXCIsO1xcXFxcXFxcXScpLFxuXG4gICAgTkVFRF9FU0NBUEUgPSAvKD89W1tcXF0oKSorPy5eJHxdKS9nLFxuXG4gICAgU19RQkxPQ0syID0gUl9TVFJJTkdTLnNvdXJjZSArICd8JyArIC8oXFwvKSg/IVsqXFwvXSkvLnNvdXJjZSxcblxuICAgIEZJTkRCUkFDRVMgPSB7XG4gICAgICAnKCc6IFJlZ0V4cCgnKFsoKV0pfCcgICArIFNfUUJMT0NLMiwgUkVHTE9CKSxcbiAgICAgICdbJzogUmVnRXhwKCcoW1tcXFxcXV0pfCcgKyBTX1FCTE9DSzIsIFJFR0xPQiksXG4gICAgICAneyc6IFJlZ0V4cCgnKFt7fV0pfCcgICArIFNfUUJMT0NLMiwgUkVHTE9CKVxuICAgIH0sXG5cbiAgICBERUZBVUxUID0gJ3sgfSc7XG5cbiAgdmFyIF9wYWlycyA9IFtcbiAgICAneycsICd9JyxcbiAgICAneycsICd9JyxcbiAgICAve1tefV0qfS8sXG4gICAgL1xcXFwoW3t9XSkvZyxcbiAgICAvXFxcXCh7KXx7L2csXG4gICAgUmVnRXhwKCdcXFxcXFxcXCh9KXwoW1soe10pfCh9KXwnICsgU19RQkxPQ0syLCBSRUdMT0IpLFxuICAgIERFRkFVTFQsXG4gICAgL15cXHMqe1xcXj9cXHMqKFskXFx3XSspKD86XFxzKixcXHMqKFxcUyspKT9cXHMraW5cXHMrKFxcUy4qKVxccyp9LyxcbiAgICAvKF58W15cXFxcXSl7PVtcXFNcXHNdKj99L1xuICBdO1xuXG4gIHZhclxuICAgIGNhY2hlZEJyYWNrZXRzID0gVU5ERUYsXG4gICAgX3JlZ2V4LFxuICAgIF9jYWNoZSA9IFtdLFxuICAgIF9zZXR0aW5ncztcblxuICBmdW5jdGlvbiBfbG9vcGJhY2sgKHJlKSB7IHJldHVybiByZSB9XG5cbiAgZnVuY3Rpb24gX3Jld3JpdGUgKHJlLCBicCkge1xuICAgIGlmICghYnApIHsgYnAgPSBfY2FjaGU7IH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgIHJlLnNvdXJjZS5yZXBsYWNlKC97L2csIGJwWzJdKS5yZXBsYWNlKC99L2csIGJwWzNdKSwgcmUuZ2xvYmFsID8gUkVHTE9CIDogJydcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlIChwYWlyKSB7XG4gICAgaWYgKHBhaXIgPT09IERFRkFVTFQpIHsgcmV0dXJuIF9wYWlycyB9XG5cbiAgICB2YXIgYXJyID0gcGFpci5zcGxpdCgnICcpO1xuXG4gICAgaWYgKGFyci5sZW5ndGggIT09IDIgfHwgVU5TVVBQT1JURUQudGVzdChwYWlyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBicmFja2V0cyBcIicgKyBwYWlyICsgJ1wiJylcbiAgICB9XG4gICAgYXJyID0gYXJyLmNvbmNhdChwYWlyLnJlcGxhY2UoTkVFRF9FU0NBUEUsICdcXFxcJykuc3BsaXQoJyAnKSk7XG5cbiAgICBhcnJbNF0gPSBfcmV3cml0ZShhcnJbMV0ubGVuZ3RoID4gMSA/IC97W1xcU1xcc10qP30vIDogX3BhaXJzWzRdLCBhcnIpO1xuICAgIGFycls1XSA9IF9yZXdyaXRlKHBhaXIubGVuZ3RoID4gMyA/IC9cXFxcKHt8fSkvZyA6IF9wYWlyc1s1XSwgYXJyKTtcbiAgICBhcnJbNl0gPSBfcmV3cml0ZShfcGFpcnNbNl0sIGFycik7XG4gICAgYXJyWzddID0gUmVnRXhwKCdcXFxcXFxcXCgnICsgYXJyWzNdICsgJyl8KFtbKHtdKXwoJyArIGFyclszXSArICcpfCcgKyBTX1FCTE9DSzIsIFJFR0xPQik7XG4gICAgYXJyWzhdID0gcGFpcjtcbiAgICByZXR1cm4gYXJyXG4gIH1cblxuICBmdW5jdGlvbiBfYnJhY2tldHMgKHJlT3JJZHgpIHtcbiAgICByZXR1cm4gcmVPcklkeCBpbnN0YW5jZW9mIFJlZ0V4cCA/IF9yZWdleChyZU9ySWR4KSA6IF9jYWNoZVtyZU9ySWR4XVxuICB9XG5cbiAgX2JyYWNrZXRzLnNwbGl0ID0gZnVuY3Rpb24gc3BsaXQgKHN0ciwgdG1wbCwgX2JwKSB7XG4gICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHQ6IF9icCBpcyBmb3IgdGhlIGNvbXBpbGVyXG4gICAgaWYgKCFfYnApIHsgX2JwID0gX2NhY2hlOyB9XG5cbiAgICB2YXJcbiAgICAgIHBhcnRzID0gW10sXG4gICAgICBtYXRjaCxcbiAgICAgIGlzZXhwcixcbiAgICAgIHN0YXJ0LFxuICAgICAgcG9zLFxuICAgICAgcmUgPSBfYnBbNl07XG5cbiAgICB2YXIgcWJsb2NrcyA9IFtdO1xuICAgIHZhciBwcmV2U3RyID0gJyc7XG4gICAgdmFyIG1hcmssIGxhc3RJbmRleDtcblxuICAgIGlzZXhwciA9IHN0YXJ0ID0gcmUubGFzdEluZGV4ID0gMDtcblxuICAgIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKHN0cikpKSB7XG5cbiAgICAgIGxhc3RJbmRleCA9IHJlLmxhc3RJbmRleDtcbiAgICAgIHBvcyA9IG1hdGNoLmluZGV4O1xuXG4gICAgICBpZiAoaXNleHByKSB7XG5cbiAgICAgICAgaWYgKG1hdGNoWzJdKSB7XG5cbiAgICAgICAgICB2YXIgY2ggPSBtYXRjaFsyXTtcbiAgICAgICAgICB2YXIgcmVjaCA9IEZJTkRCUkFDRVNbY2hdO1xuICAgICAgICAgIHZhciBpeCA9IDE7XG5cbiAgICAgICAgICByZWNoLmxhc3RJbmRleCA9IGxhc3RJbmRleDtcbiAgICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmVjaC5leGVjKHN0cikpKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdID09PSBjaCkgeyArK2l4OyB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKCEtLWl4KSB7IGJyZWFrIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlY2gubGFzdEluZGV4ID0gcHVzaFFCbG9jayhtYXRjaC5pbmRleCwgcmVjaC5sYXN0SW5kZXgsIG1hdGNoWzJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmUubGFzdEluZGV4ID0gaXggPyBzdHIubGVuZ3RoIDogcmVjaC5sYXN0SW5kZXg7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWF0Y2hbM10pIHtcbiAgICAgICAgICByZS5sYXN0SW5kZXggPSBwdXNoUUJsb2NrKHBvcywgbGFzdEluZGV4LCBtYXRjaFs0XSk7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIW1hdGNoWzFdKSB7XG4gICAgICAgIHVuZXNjYXBlU3RyKHN0ci5zbGljZShzdGFydCwgcG9zKSk7XG4gICAgICAgIHN0YXJ0ID0gcmUubGFzdEluZGV4O1xuICAgICAgICByZSA9IF9icFs2ICsgKGlzZXhwciBePSAxKV07XG4gICAgICAgIHJlLmxhc3RJbmRleCA9IHN0YXJ0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHIgJiYgc3RhcnQgPCBzdHIubGVuZ3RoKSB7XG4gICAgICB1bmVzY2FwZVN0cihzdHIuc2xpY2Uoc3RhcnQpKTtcbiAgICB9XG5cbiAgICBwYXJ0cy5xYmxvY2tzID0gcWJsb2NrcztcblxuICAgIHJldHVybiBwYXJ0c1xuXG4gICAgZnVuY3Rpb24gdW5lc2NhcGVTdHIgKHMpIHtcbiAgICAgIGlmIChwcmV2U3RyKSB7XG4gICAgICAgIHMgPSBwcmV2U3RyICsgcztcbiAgICAgICAgcHJldlN0ciA9ICcnO1xuICAgICAgfVxuICAgICAgaWYgKHRtcGwgfHwgaXNleHByKSB7XG4gICAgICAgIHBhcnRzLnB1c2gocyAmJiBzLnJlcGxhY2UoX2JwWzVdLCAnJDEnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0cy5wdXNoKHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHB1c2hRQmxvY2soX3BvcywgX2xhc3RJbmRleCwgc2xhc2gpIHsgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBpZiAoc2xhc2gpIHtcbiAgICAgICAgX2xhc3RJbmRleCA9IHNraXBSZWdleChzdHIsIF9wb3MpO1xuICAgICAgfVxuXG4gICAgICBpZiAodG1wbCAmJiBfbGFzdEluZGV4ID4gX3BvcyArIDIpIHtcbiAgICAgICAgbWFyayA9ICdcXHUyMDU3JyArIHFibG9ja3MubGVuZ3RoICsgJ34nO1xuICAgICAgICBxYmxvY2tzLnB1c2goc3RyLnNsaWNlKF9wb3MsIF9sYXN0SW5kZXgpKTtcbiAgICAgICAgcHJldlN0ciArPSBzdHIuc2xpY2Uoc3RhcnQsIF9wb3MpICsgbWFyaztcbiAgICAgICAgc3RhcnQgPSBfbGFzdEluZGV4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9sYXN0SW5kZXhcbiAgICB9XG4gIH07XG5cbiAgX2JyYWNrZXRzLmhhc0V4cHIgPSBmdW5jdGlvbiBoYXNFeHByIChzdHIpIHtcbiAgICByZXR1cm4gX2NhY2hlWzRdLnRlc3Qoc3RyKVxuICB9O1xuXG4gIF9icmFja2V0cy5sb29wS2V5cyA9IGZ1bmN0aW9uIGxvb3BLZXlzIChleHByKSB7XG4gICAgdmFyIG0gPSBleHByLm1hdGNoKF9jYWNoZVs5XSk7XG5cbiAgICByZXR1cm4gbVxuICAgICAgPyB7IGtleTogbVsxXSwgcG9zOiBtWzJdLCB2YWw6IF9jYWNoZVswXSArIG1bM10udHJpbSgpICsgX2NhY2hlWzFdIH1cbiAgICAgIDogeyB2YWw6IGV4cHIudHJpbSgpIH1cbiAgfTtcblxuICBfYnJhY2tldHMuYXJyYXkgPSBmdW5jdGlvbiBhcnJheSAocGFpcikge1xuICAgIHJldHVybiBwYWlyID8gX2NyZWF0ZShwYWlyKSA6IF9jYWNoZVxuICB9O1xuXG4gIGZ1bmN0aW9uIF9yZXNldCAocGFpcikge1xuICAgIGlmICgocGFpciB8fCAocGFpciA9IERFRkFVTFQpKSAhPT0gX2NhY2hlWzhdKSB7XG4gICAgICBfY2FjaGUgPSBfY3JlYXRlKHBhaXIpO1xuICAgICAgX3JlZ2V4ID0gcGFpciA9PT0gREVGQVVMVCA/IF9sb29wYmFjayA6IF9yZXdyaXRlO1xuICAgICAgX2NhY2hlWzldID0gX3JlZ2V4KF9wYWlyc1s5XSk7XG4gICAgfVxuICAgIGNhY2hlZEJyYWNrZXRzID0gcGFpcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRTZXR0aW5ncyAobykge1xuICAgIHZhciBiO1xuXG4gICAgbyA9IG8gfHwge307XG4gICAgYiA9IG8uYnJhY2tldHM7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sICdicmFja2V0cycsIHtcbiAgICAgIHNldDogX3Jlc2V0LFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjYWNoZWRCcmFja2V0cyB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIF9zZXR0aW5ncyA9IG87XG4gICAgX3Jlc2V0KGIpO1xuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9icmFja2V0cywgJ3NldHRpbmdzJywge1xuICAgIHNldDogX3NldFNldHRpbmdzLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3NldHRpbmdzIH1cbiAgfSk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IGluIHRoZSBicm93c2VyIHJpb3QgaXMgYWx3YXlzIGluIHRoZSBzY29wZSAqL1xuICBfYnJhY2tldHMuc2V0dGluZ3MgPSB0eXBlb2YgcmlvdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcmlvdC5zZXR0aW5ncyB8fCB7fTtcbiAgX2JyYWNrZXRzLnNldCA9IF9yZXNldDtcbiAgX2JyYWNrZXRzLnNraXBSZWdleCA9IHNraXBSZWdleDtcblxuICBfYnJhY2tldHMuUl9TVFJJTkdTID0gUl9TVFJJTkdTO1xuICBfYnJhY2tldHMuUl9NTENPTU1TID0gUl9NTENPTU1TO1xuICBfYnJhY2tldHMuU19RQkxPQ0tTID0gU19RQkxPQ0tTO1xuICBfYnJhY2tldHMuU19RQkxPQ0syID0gU19RQkxPQ0syO1xuXG4gIHJldHVybiBfYnJhY2tldHNcblxufSkoKTtcblxuLyoqXG4gKiBAbW9kdWxlIHRtcGxcbiAqXG4gKiB0bXBsICAgICAgICAgIC0gUm9vdCBmdW5jdGlvbiwgcmV0dXJucyB0aGUgdGVtcGxhdGUgdmFsdWUsIHJlbmRlciB3aXRoIGRhdGFcbiAqIHRtcGwuaGFzRXhwciAgLSBUZXN0IHRoZSBleGlzdGVuY2Ugb2YgYSBleHByZXNzaW9uIGluc2lkZSBhIHN0cmluZ1xuICogdG1wbC5sb29wS2V5cyAtIEdldCB0aGUga2V5cyBmb3IgYW4gJ2VhY2gnIGxvb3AgKHVzZWQgYnkgYF9lYWNoYClcbiAqL1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyIHRtcGwgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfY2FjaGUgPSB7fTtcblxuICBmdW5jdGlvbiBfdG1wbCAoc3RyLCBkYXRhKSB7XG4gICAgaWYgKCFzdHIpIHsgcmV0dXJuIHN0ciB9XG5cbiAgICByZXR1cm4gKF9jYWNoZVtzdHJdIHx8IChfY2FjaGVbc3RyXSA9IF9jcmVhdGUoc3RyKSkpLmNhbGwoXG4gICAgICBkYXRhLCBfbG9nRXJyLmJpbmQoe1xuICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICB0bXBsOiBzdHJcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgX3RtcGwuaGFzRXhwciA9IGJyYWNrZXRzLmhhc0V4cHI7XG5cbiAgX3RtcGwubG9vcEtleXMgPSBicmFja2V0cy5sb29wS2V5cztcblxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICBfdG1wbC5jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkgeyBfY2FjaGUgPSB7fTsgfTtcblxuICBfdG1wbC5lcnJvckhhbmRsZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIF9sb2dFcnIgKGVyciwgY3R4KSB7XG5cbiAgICBlcnIucmlvdERhdGEgPSB7XG4gICAgICB0YWdOYW1lOiBjdHggJiYgY3R4Ll9fICYmIGN0eC5fXy50YWdOYW1lLFxuICAgICAgX3Jpb3RfaWQ6IGN0eCAmJiBjdHguX3Jpb3RfaWQgIC8vZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgICB9O1xuXG4gICAgaWYgKF90bXBsLmVycm9ySGFuZGxlcikgeyBfdG1wbC5lcnJvckhhbmRsZXIoZXJyKTsgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICBjb25zb2xlLmxvZygnPCVzPiAlcycsIGVyci5yaW90RGF0YS50YWdOYW1lIHx8ICdVbmtub3duIHRhZycsIHRoaXMudG1wbCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlIChzdHIpIHtcbiAgICB2YXIgZXhwciA9IF9nZXRUbXBsKHN0cik7XG5cbiAgICBpZiAoZXhwci5zbGljZSgwLCAxMSkgIT09ICd0cnl7cmV0dXJuICcpIHsgZXhwciA9ICdyZXR1cm4gJyArIGV4cHI7IH1cblxuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ0UnLCBleHByICsgJzsnKSAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy1mdW5jXG4gIH1cblxuICB2YXIgUkVfRFFVT1RFID0gL1xcdTIwNTcvZztcbiAgdmFyIFJFX1FCTUFSSyA9IC9cXHUyMDU3KFxcZCspfi9nO1xuXG4gIGZ1bmN0aW9uIF9nZXRUbXBsIChzdHIpIHtcbiAgICB2YXIgcGFydHMgPSBicmFja2V0cy5zcGxpdChzdHIucmVwbGFjZShSRV9EUVVPVEUsICdcIicpLCAxKTtcbiAgICB2YXIgcXN0ciA9IHBhcnRzLnFibG9ja3M7XG4gICAgdmFyIGV4cHI7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoID4gMiB8fCBwYXJ0c1swXSkge1xuICAgICAgdmFyIGksIGosIGxpc3QgPSBbXTtcblxuICAgICAgZm9yIChpID0gaiA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGV4cHIgPSBwYXJ0c1tpXTtcblxuICAgICAgICBpZiAoZXhwciAmJiAoZXhwciA9IGkgJiAxXG5cbiAgICAgICAgICAgID8gX3BhcnNlRXhwcihleHByLCAxLCBxc3RyKVxuXG4gICAgICAgICAgICA6ICdcIicgKyBleHByXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxyXFxuP3xcXG4vZywgJ1xcXFxuJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICtcbiAgICAgICAgICAgICAgJ1wiJ1xuXG4gICAgICAgICAgKSkgeyBsaXN0W2orK10gPSBleHByOyB9XG5cbiAgICAgIH1cblxuICAgICAgZXhwciA9IGogPCAyID8gbGlzdFswXVxuICAgICAgICAgICA6ICdbJyArIGxpc3Quam9pbignLCcpICsgJ10uam9pbihcIlwiKSc7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBleHByID0gX3BhcnNlRXhwcihwYXJ0c1sxXSwgMCwgcXN0cik7XG4gICAgfVxuXG4gICAgaWYgKHFzdHIubGVuZ3RoKSB7XG4gICAgICBleHByID0gZXhwci5yZXBsYWNlKFJFX1FCTUFSSywgZnVuY3Rpb24gKF8sIHBvcykge1xuICAgICAgICByZXR1cm4gcXN0cltwb3NdXG4gICAgICAgICAgLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZXhwclxuICB9XG5cbiAgdmFyIFJFX0NTTkFNRSA9IC9eKD86KC0/W19BLVphLXpcXHhBMC1cXHhGRl1bLVxcd1xceEEwLVxceEZGXSopfFxcdTIwNTcoXFxkKyl+KTovO1xuICB2YXJcbiAgICBSRV9CUkVORCA9IHtcbiAgICAgICcoJzogL1soKV0vZyxcbiAgICAgICdbJzogL1tbXFxdXS9nLFxuICAgICAgJ3snOiAvW3t9XS9nXG4gICAgfTtcblxuICBmdW5jdGlvbiBfcGFyc2VFeHByIChleHByLCBhc1RleHQsIHFzdHIpIHtcblxuICAgIGV4cHIgPSBleHByXG4gICAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKVxuICAgICAgLnJlcGxhY2UoL1xcID8oW1tcXCh7fSw/XFwuOl0pXFwgPy9nLCAnJDEnKTtcblxuICAgIGlmIChleHByKSB7XG4gICAgICB2YXJcbiAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICBjbnQgPSAwLFxuICAgICAgICBtYXRjaDtcblxuICAgICAgd2hpbGUgKGV4cHIgJiZcbiAgICAgICAgICAgIChtYXRjaCA9IGV4cHIubWF0Y2goUkVfQ1NOQU1FKSkgJiZcbiAgICAgICAgICAgICFtYXRjaC5pbmRleFxuICAgICAgICApIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIGpzYixcbiAgICAgICAgICByZSA9IC8sfChbW3soXSl8JC9nO1xuXG4gICAgICAgIGV4cHIgPSBSZWdFeHAucmlnaHRDb250ZXh0O1xuICAgICAgICBrZXkgID0gbWF0Y2hbMl0gPyBxc3RyW21hdGNoWzJdXS5zbGljZSgxLCAtMSkudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKSA6IG1hdGNoWzFdO1xuXG4gICAgICAgIHdoaWxlIChqc2IgPSAobWF0Y2ggPSByZS5leGVjKGV4cHIpKVsxXSkgeyBza2lwQnJhY2VzKGpzYiwgcmUpOyB9XG5cbiAgICAgICAganNiICA9IGV4cHIuc2xpY2UoMCwgbWF0Y2guaW5kZXgpO1xuICAgICAgICBleHByID0gUmVnRXhwLnJpZ2h0Q29udGV4dDtcblxuICAgICAgICBsaXN0W2NudCsrXSA9IF93cmFwRXhwcihqc2IsIDEsIGtleSk7XG4gICAgICB9XG5cbiAgICAgIGV4cHIgPSAhY250ID8gX3dyYXBFeHByKGV4cHIsIGFzVGV4dClcbiAgICAgICAgICAgOiBjbnQgPiAxID8gJ1snICsgbGlzdC5qb2luKCcsJykgKyAnXS5qb2luKFwiIFwiKS50cmltKCknIDogbGlzdFswXTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcblxuICAgIGZ1bmN0aW9uIHNraXBCcmFjZXMgKGNoLCByZSkge1xuICAgICAgdmFyXG4gICAgICAgIG1tLFxuICAgICAgICBsdiA9IDEsXG4gICAgICAgIGlyID0gUkVfQlJFTkRbY2hdO1xuXG4gICAgICBpci5sYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICB3aGlsZSAobW0gPSBpci5leGVjKGV4cHIpKSB7XG4gICAgICAgIGlmIChtbVswXSA9PT0gY2gpIHsgKytsdjsgfVxuICAgICAgICBlbHNlIGlmICghLS1sdikgeyBicmVhayB9XG4gICAgICB9XG4gICAgICByZS5sYXN0SW5kZXggPSBsdiA/IGV4cHIubGVuZ3RoIDogaXIubGFzdEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub3QgYm90aFxuICB2YXIgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBKU19DT05URVhUID0gJ1wiaW4gdGhpcz90aGlzOicgKyAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgPyAnZ2xvYmFsJyA6ICd3aW5kb3cnKSArICcpLicsXG4gICAgSlNfVkFSTkFNRSA9IC9bLHtdW1xcJFxcd10rKD89Oil8KF4gKnxbXiRcXHdcXC57XSkoPyEoPzp0eXBlb2Z8dHJ1ZXxmYWxzZXxudWxsfHVuZGVmaW5lZHxpbnxpbnN0YW5jZW9mfGlzKD86RmluaXRlfE5hTil8dm9pZHxOYU58bmV3fERhdGV8UmVnRXhwfE1hdGgpKD8hWyRcXHddKSkoWyRfQS1aYS16XVskXFx3XSopL2csXG4gICAgSlNfTk9QUk9QUyA9IC9eKD89KFxcLlskXFx3XSspKVxcMSg/OlteLlsoXXwkKS87XG5cbiAgZnVuY3Rpb24gX3dyYXBFeHByIChleHByLCBhc1RleHQsIGtleSkge1xuICAgIHZhciB0YjtcblxuICAgIGV4cHIgPSBleHByLnJlcGxhY2UoSlNfVkFSTkFNRSwgZnVuY3Rpb24gKG1hdGNoLCBwLCBtdmFyLCBwb3MsIHMpIHtcbiAgICAgIGlmIChtdmFyKSB7XG4gICAgICAgIHBvcyA9IHRiID8gMCA6IHBvcyArIG1hdGNoLmxlbmd0aDtcblxuICAgICAgICBpZiAobXZhciAhPT0gJ3RoaXMnICYmIG12YXIgIT09ICdnbG9iYWwnICYmIG12YXIgIT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgbWF0Y2ggPSBwICsgJyhcIicgKyBtdmFyICsgSlNfQ09OVEVYVCArIG12YXI7XG4gICAgICAgICAgaWYgKHBvcykgeyB0YiA9IChzID0gc1twb3NdKSA9PT0gJy4nIHx8IHMgPT09ICcoJyB8fCBzID09PSAnWyc7IH1cbiAgICAgICAgfSBlbHNlIGlmIChwb3MpIHtcbiAgICAgICAgICB0YiA9ICFKU19OT1BST1BTLnRlc3Qocy5zbGljZShwb3MpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoXG4gICAgfSk7XG5cbiAgICBpZiAodGIpIHtcbiAgICAgIGV4cHIgPSAndHJ5e3JldHVybiAnICsgZXhwciArICd9Y2F0Y2goZSl7RShlLHRoaXMpfSc7XG4gICAgfVxuXG4gICAgaWYgKGtleSkge1xuXG4gICAgICBleHByID0gKHRiXG4gICAgICAgICAgPyAnZnVuY3Rpb24oKXsnICsgZXhwciArICd9LmNhbGwodGhpcyknIDogJygnICsgZXhwciArICcpJ1xuICAgICAgICApICsgJz9cIicgKyBrZXkgKyAnXCI6XCJcIic7XG5cbiAgICB9IGVsc2UgaWYgKGFzVGV4dCkge1xuXG4gICAgICBleHByID0gJ2Z1bmN0aW9uKHYpeycgKyAodGJcbiAgICAgICAgICA/IGV4cHIucmVwbGFjZSgncmV0dXJuICcsICd2PScpIDogJ3Y9KCcgKyBleHByICsgJyknXG4gICAgICAgICkgKyAnO3JldHVybiB2fHx2PT09MD92OlwiXCJ9LmNhbGwodGhpcyknO1xuICAgIH1cblxuICAgIHJldHVybiBleHByXG4gIH1cblxuICBfdG1wbC52ZXJzaW9uID0gYnJhY2tldHMudmVyc2lvbiA9ICd2My4wLjgnO1xuXG4gIHJldHVybiBfdG1wbFxuXG59KSgpO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyIG9ic2VydmFibGUkMSA9IGZ1bmN0aW9uKGVsKSB7XG5cbiAgLyoqXG4gICAqIEV4dGVuZCB0aGUgb3JpZ2luYWwgb2JqZWN0IG9yIGNyZWF0ZSBhIG5ldyBlbXB0eSBvbmVcbiAgICogQHR5cGUgeyBPYmplY3QgfVxuICAgKi9cblxuICBlbCA9IGVsIHx8IHt9O1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlc1xuICAgKi9cbiAgdmFyIGNhbGxiYWNrcyA9IHt9LFxuICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBQdWJsaWMgQXBpXG4gICAqL1xuXG4gIC8vIGV4dGVuZCB0aGUgZWwgb2JqZWN0IGFkZGluZyB0aGUgb2JzZXJ2YWJsZSBtZXRob2RzXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGVsLCB7XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHRoZSBnaXZlbiBgZXZlbnRgIGFuZHNcbiAgICAgKiBleGVjdXRlIHRoZSBgY2FsbGJhY2tgIGVhY2ggdGltZSBhbiBldmVudCBpcyB0cmlnZ2VyZWQuXG4gICAgICogQHBhcmFtICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9uOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICB7IChjYWxsYmFja3NbZXZlbnRdID0gY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSkucHVzaChmbik7IH1cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGdpdmVuIGBldmVudGAgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb2ZmOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmIChldmVudCA9PSAnKicgJiYgIWZuKSB7IGNhbGxiYWNrcyA9IHt9OyB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgdmFyIGFyciA9IGNhbGxiYWNrc1tldmVudF07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgY2I7IGNiID0gYXJyICYmIGFycltpXTsgKytpKSB7XG4gICAgICAgICAgICAgIGlmIChjYiA9PSBmbikgeyBhcnIuc3BsaWNlKGktLSwgMSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgeyBkZWxldGUgY2FsbGJhY2tzW2V2ZW50XTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIGBldmVudGAgYW5kXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBhdCBtb3N0IG9uY2VcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbmU6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgZnVuY3Rpb24gb24oKSB7XG4gICAgICAgICAgZWwub2ZmKGV2ZW50LCBvbik7XG4gICAgICAgICAgZm4uYXBwbHkoZWwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsLm9uKGV2ZW50LCBvbilcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBhbGwgY2FsbGJhY2sgZnVuY3Rpb25zIHRoYXQgbGlzdGVuIHRvXG4gICAgICogdGhlIGdpdmVuIGBldmVudGBcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgdHJpZ2dlcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuXG4gICAgICAgIC8vIGdldHRpbmcgdGhlIGFyZ3VtZW50c1xuICAgICAgICB2YXIgYXJnbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgYXJncyA9IG5ldyBBcnJheShhcmdsZW4pLFxuICAgICAgICAgIGZucyxcbiAgICAgICAgICBmbixcbiAgICAgICAgICBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcmdsZW47IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHMkMVtpICsgMV07IC8vIHNraXAgZmlyc3QgYXJndW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGZucyA9IHNsaWNlLmNhbGwoY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSwgMCk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgZm4gPSBmbnNbaV07ICsraSkge1xuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWxsYmFja3NbJyonXSAmJiBldmVudCAhPSAnKicpXG4gICAgICAgICAgeyBlbC50cmlnZ2VyLmFwcGx5KGVsLCBbJyonLCBldmVudF0uY29uY2F0KGFyZ3MpKTsgfVxuXG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVsXG5cbn07XG5cbi8qKlxuICogU3BlY2lhbGl6ZWQgZnVuY3Rpb24gZm9yIGxvb3BpbmcgYW4gYXJyYXktbGlrZSBjb2xsZWN0aW9uIHdpdGggYGVhY2g9e31gXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gbGlzdCAtIGNvbGxlY3Rpb24gb2YgaXRlbXNcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMgeyBBcnJheSB9IHRoZSBhcnJheSBsb29wZWRcbiAqL1xuZnVuY3Rpb24gZWFjaChsaXN0LCBmbikge1xuICB2YXIgbGVuID0gbGlzdCA/IGxpc3QubGVuZ3RoIDogMDtcbiAgdmFyIGkgPSAwO1xuICBmb3IgKDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZm4obGlzdFtpXSwgaSk7XG4gIH1cbiAgcmV0dXJuIGxpc3Rcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGFycmF5IGNvbnRhaW5zIGFuIGl0ZW1cbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBhcnJheSAtIHRhcmdldCBhcnJheVxuICogQHBhcmFtICAgeyAqIH0gaXRlbSAtIGl0ZW0gdG8gdGVzdFxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBjb250YWlucyhhcnJheSwgaXRlbSkge1xuICByZXR1cm4gYXJyYXkuaW5kZXhPZihpdGVtKSAhPT0gLTFcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIGNvbnRhaW5pbmcgZGFzaGVzIHRvIGNhbWVsIGNhc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc3RyIC0gaW5wdXQgc3RyaW5nXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG15LXN0cmluZyAtPiBteVN0cmluZ1xuICovXG5mdW5jdGlvbiB0b0NhbWVsKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbiAoXywgYykgeyByZXR1cm4gYy50b1VwcGVyQ2FzZSgpOyB9KVxufVxuXG4vKipcbiAqIEZhc3RlciBTdHJpbmcgc3RhcnRzV2l0aCBhbHRlcm5hdGl2ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzdHIgLSBzb3VyY2Ugc3RyaW5nXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHZhbHVlIC0gdGVzdCBzdHJpbmdcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHIsIHZhbHVlKSB7XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSA9PT0gdmFsdWVcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IGFuIGltbXV0YWJsZSBwcm9wZXJ0eVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlbCAtIG9iamVjdCB3aGVyZSB0aGUgbmV3IHByb3BlcnR5IHdpbGwgYmUgc2V0XG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGtleSAtIG9iamVjdCBrZXkgd2hlcmUgdGhlIG5ldyBwcm9wZXJ0eSB3aWxsIGJlIHN0b3JlZFxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLSB2YWx1ZSBvZiB0aGUgbmV3IHByb3BlcnR5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdGlvbnMgLSBzZXQgdGhlIHByb3Blcnkgb3ZlcnJpZGluZyB0aGUgZGVmYXVsdCBvcHRpb25zXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IC0gdGhlIGluaXRpYWwgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGVsLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwga2V5LCBleHRlbmQoe1xuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0sIG9wdGlvbnMpKTtcbiAgcmV0dXJuIGVsXG59XG5cbi8qKlxuICogRXh0ZW5kIGFueSBvYmplY3Qgd2l0aCBvdGhlciBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHNyYyAtIHNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gdGhlIHJlc3VsdGluZyBleHRlbmRlZCBvYmplY3RcbiAqXG4gKiB2YXIgb2JqID0geyBmb286ICdiYXonIH1cbiAqIGV4dGVuZChvYmosIHtiYXI6ICdiYXInLCBmb286ICdiYXInfSlcbiAqIGNvbnNvbGUubG9nKG9iaikgPT4ge2JhcjogJ2JhcicsIGZvbzogJ2Jhcid9XG4gKlxuICovXG5mdW5jdGlvbiBleHRlbmQoc3JjKSB7XG4gIHZhciBvYmosIGFyZ3MgPSBhcmd1bWVudHM7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChvYmogPSBhcmdzW2ldKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBvYmplY3QgY291bGQgYmUgb3ZlcnJpZGRlblxuICAgICAgICBpZiAoaXNXcml0YWJsZShzcmMsIGtleSkpXG4gICAgICAgICAgeyBzcmNba2V5XSA9IG9ialtrZXldOyB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzcmNcbn1cblxudmFyIG1pc2MgPSBPYmplY3QuZnJlZXplKHtcblx0ZWFjaDogZWFjaCxcblx0Y29udGFpbnM6IGNvbnRhaW5zLFxuXHR0b0NhbWVsOiB0b0NhbWVsLFxuXHRzdGFydHNXaXRoOiBzdGFydHNXaXRoLFxuXHRkZWZpbmVQcm9wZXJ0eTogZGVmaW5lUHJvcGVydHksXG5cdGV4dGVuZDogZXh0ZW5kXG59KTtcblxudmFyIHNldHRpbmdzJDEgPSBleHRlbmQoT2JqZWN0LmNyZWF0ZShicmFja2V0cy5zZXR0aW5ncyksIHtcbiAgc2tpcEFub255bW91c1RhZ3M6IHRydWUsXG4gIC8vIGhhbmRsZSB0aGUgYXV0byB1cGRhdGVzIG9uIGFueSBET00gZXZlbnRcbiAgYXV0b1VwZGF0ZTogdHJ1ZVxufSk7XG5cbi8qKlxuICogVHJpZ2dlciBET00gZXZlbnRzXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gZG9tIC0gZG9tIGVsZW1lbnQgdGFyZ2V0IG9mIHRoZSBldmVudFxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGhhbmRsZXIgLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGUgLSBldmVudCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaGFuZGxlRXZlbnQoZG9tLCBoYW5kbGVyLCBlKSB7XG4gIHZhciBwdGFnID0gdGhpcy5fXy5wYXJlbnQsXG4gICAgaXRlbSA9IHRoaXMuX18uaXRlbTtcblxuICBpZiAoIWl0ZW0pXG4gICAgeyB3aGlsZSAocHRhZyAmJiAhaXRlbSkge1xuICAgICAgaXRlbSA9IHB0YWcuX18uaXRlbTtcbiAgICAgIHB0YWcgPSBwdGFnLl9fLnBhcmVudDtcbiAgICB9IH1cblxuICAvLyBvdmVycmlkZSB0aGUgZXZlbnQgcHJvcGVydGllc1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoaXNXcml0YWJsZShlLCAnY3VycmVudFRhcmdldCcpKSB7IGUuY3VycmVudFRhcmdldCA9IGRvbTsgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoaXNXcml0YWJsZShlLCAndGFyZ2V0JykpIHsgZS50YXJnZXQgPSBlLnNyY0VsZW1lbnQ7IH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKGlzV3JpdGFibGUoZSwgJ3doaWNoJykpIHsgZS53aGljaCA9IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlOyB9XG5cbiAgZS5pdGVtID0gaXRlbTtcblxuICBoYW5kbGVyLmNhbGwodGhpcywgZSk7XG5cbiAgLy8gYXZvaWQgYXV0byB1cGRhdGVzXG4gIGlmICghc2V0dGluZ3MkMS5hdXRvVXBkYXRlKSB7IHJldHVybiB9XG5cbiAgaWYgKCFlLnByZXZlbnRVcGRhdGUpIHtcbiAgICB2YXIgcCA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzKTtcbiAgICAvLyBmaXhlcyAjMjA4M1xuICAgIGlmIChwLmlzTW91bnRlZCkgeyBwLnVwZGF0ZSgpOyB9XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRhY2ggYW4gZXZlbnQgdG8gYSBET00gbm9kZVxuICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gaGFuZGxlciAtIGV2ZW50IGNhbGxiYWNrXG4gKiBAcGFyYW0geyBPYmplY3QgfSBkb20gLSBkb20gbm9kZVxuICogQHBhcmFtIHsgVGFnIH0gdGFnIC0gdGFnIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHNldEV2ZW50SGFuZGxlcihuYW1lLCBoYW5kbGVyLCBkb20sIHRhZykge1xuICB2YXIgZXZlbnROYW1lLFxuICAgIGNiID0gaGFuZGxlRXZlbnQuYmluZCh0YWcsIGRvbSwgaGFuZGxlcik7XG5cbiAgLy8gYXZvaWQgdG8gYmluZCB0d2ljZSB0aGUgc2FtZSBldmVudFxuICAvLyBwb3NzaWJsZSBmaXggZm9yICMyMzMyXG4gIGRvbVtuYW1lXSA9IG51bGw7XG5cbiAgLy8gbm9ybWFsaXplIGV2ZW50IG5hbWVcbiAgZXZlbnROYW1lID0gbmFtZS5yZXBsYWNlKFJFX0VWRU5UU19QUkVGSVgsICcnKTtcblxuICAvLyBjYWNoZSB0aGUgbGlzdGVuZXIgaW50byB0aGUgbGlzdGVuZXJzIGFycmF5XG4gIGlmICghY29udGFpbnModGFnLl9fLmxpc3RlbmVycywgZG9tKSkgeyB0YWcuX18ubGlzdGVuZXJzLnB1c2goZG9tKTsgfVxuICBpZiAoIWRvbVtSSU9UX0VWRU5UU19LRVldKSB7IGRvbVtSSU9UX0VWRU5UU19LRVldID0ge307IH1cbiAgaWYgKGRvbVtSSU9UX0VWRU5UU19LRVldW25hbWVdKSB7IGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZG9tW1JJT1RfRVZFTlRTX0tFWV1bbmFtZV0pOyB9XG5cbiAgZG9tW1JJT1RfRVZFTlRTX0tFWV1bbmFtZV0gPSBjYjtcbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYiwgZmFsc2UpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBkeW5hbWljYWxseSBjcmVhdGVkIGRhdGEtaXMgdGFncyB3aXRoIGNoYW5naW5nIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0geyBPYmplY3QgfSBleHByIC0gZXhwcmVzc2lvbiB0YWcgYW5kIGV4cHJlc3Npb24gaW5mb1xuICogQHBhcmFtIHsgVGFnIH0gICAgcGFyZW50IC0gcGFyZW50IGZvciB0YWcgY3JlYXRpb25cbiAqIEBwYXJhbSB7IFN0cmluZyB9IHRhZ05hbWUgLSB0YWcgaW1wbGVtZW50YXRpb24gd2Ugd2FudCB0byB1c2VcbiAqL1xuZnVuY3Rpb24gdXBkYXRlRGF0YUlzKGV4cHIsIHBhcmVudCwgdGFnTmFtZSkge1xuICB2YXIgY29uZiwgaXNWaXJ0dWFsLCBoZWFkLCByZWY7XG5cbiAgaWYgKGV4cHIudGFnICYmIGV4cHIudGFnTmFtZSA9PT0gdGFnTmFtZSkge1xuICAgIGV4cHIudGFnLnVwZGF0ZSgpO1xuICAgIHJldHVyblxuICB9XG5cbiAgaXNWaXJ0dWFsID0gZXhwci5kb20udGFnTmFtZSA9PT0gJ1ZJUlRVQUwnO1xuICAvLyBzeW5jIF9wYXJlbnQgdG8gYWNjb21tb2RhdGUgY2hhbmdpbmcgdGFnbmFtZXNcbiAgaWYgKGV4cHIudGFnKSB7XG4gICAgLy8gbmVlZCBwbGFjZWhvbGRlciBiZWZvcmUgdW5tb3VudFxuICAgIGlmKGlzVmlydHVhbCkge1xuICAgICAgaGVhZCA9IGV4cHIudGFnLl9fLmhlYWQ7XG4gICAgICByZWYgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpO1xuICAgICAgaGVhZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZWYsIGhlYWQpO1xuICAgIH1cblxuICAgIGV4cHIudGFnLnVubW91bnQodHJ1ZSk7XG4gIH1cblxuICBpZiAoIWlzU3RyaW5nKHRhZ05hbWUpKSB7IHJldHVybiB9XG5cbiAgZXhwci5pbXBsID0gX19UQUdfSU1QTFt0YWdOYW1lXTtcbiAgY29uZiA9IHtyb290OiBleHByLmRvbSwgcGFyZW50OiBwYXJlbnQsIGhhc0ltcGw6IHRydWUsIHRhZ05hbWU6IHRhZ05hbWV9O1xuICBleHByLnRhZyA9IGluaXRDaGlsZFRhZyhleHByLmltcGwsIGNvbmYsIGV4cHIuZG9tLmlubmVySFRNTCwgcGFyZW50KTtcbiAgZWFjaChleHByLmF0dHJzLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gc2V0QXR0cihleHByLnRhZy5yb290LCBhLm5hbWUsIGEudmFsdWUpOyB9KTtcbiAgZXhwci50YWdOYW1lID0gdGFnTmFtZTtcbiAgZXhwci50YWcubW91bnQoKTtcbiAgaWYgKGlzVmlydHVhbClcbiAgICB7IG1ha2VSZXBsYWNlVmlydHVhbChleHByLnRhZywgcmVmIHx8IGV4cHIudGFnLnJvb3QpOyB9IC8vIHJvb3QgZXhpc3QgZmlyc3QgdGltZSwgYWZ0ZXIgdXNlIHBsYWNlaG9sZGVyXG5cbiAgLy8gcGFyZW50IGlzIHRoZSBwbGFjZWhvbGRlciB0YWcsIG5vdCB0aGUgZHluYW1pYyB0YWcgc28gY2xlYW4gdXBcbiAgcGFyZW50Ll9fLm9uVW5tb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkZWxOYW1lID0gZXhwci50YWcub3B0cy5kYXRhSXMsXG4gICAgICB0YWdzID0gZXhwci50YWcucGFyZW50LnRhZ3MsXG4gICAgICBfdGFncyA9IGV4cHIudGFnLl9fLnBhcmVudC50YWdzO1xuICAgIGFycmF5aXNoUmVtb3ZlKHRhZ3MsIGRlbE5hbWUsIGV4cHIudGFnKTtcbiAgICBhcnJheWlzaFJlbW92ZShfdGFncywgZGVsTmFtZSwgZXhwci50YWcpO1xuICAgIGV4cHIudGFnLnVubW91bnQoKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBOb21hbGl6ZSBhbnkgYXR0cmlidXRlIHJlbW92aW5nIHRoZSBcInJpb3QtXCIgcHJlZml4XG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGF0dHJOYW1lIC0gb3JpZ2luYWwgYXR0cmlidXRlIG5hbWVcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gdmFsaWQgaHRtbCBhdHRyaWJ1dGUgbmFtZVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVBdHRyTmFtZShhdHRyTmFtZSkge1xuICBpZiAoIWF0dHJOYW1lKSB7IHJldHVybiBudWxsIH1cbiAgYXR0ck5hbWUgPSBhdHRyTmFtZS5yZXBsYWNlKEFUVFJTX1BSRUZJWCwgJycpO1xuICBpZiAoQ0FTRV9TRU5TSVRJVkVfQVRUUklCVVRFU1thdHRyTmFtZV0pIHsgYXR0ck5hbWUgPSBDQVNFX1NFTlNJVElWRV9BVFRSSUJVVEVTW2F0dHJOYW1lXTsgfVxuICByZXR1cm4gYXR0ck5hbWVcbn1cblxuLyoqXG4gKiBVcGRhdGUgb24gc2luZ2xlIHRhZyBleHByZXNzaW9uXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGV4cHIgLSBleHByZXNzaW9uIGxvZ2ljXG4gKiBAcmV0dXJucyB7IHVuZGVmaW5lZCB9XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUV4cHJlc3Npb24oZXhwcikge1xuICBpZiAodGhpcy5yb290ICYmIGdldEF0dHIodGhpcy5yb290LCd2aXJ0dWFsaXplZCcpKSB7IHJldHVybiB9XG5cbiAgdmFyIGRvbSA9IGV4cHIuZG9tLFxuICAgIC8vIHJlbW92ZSB0aGUgcmlvdC0gcHJlZml4XG4gICAgYXR0ck5hbWUgPSBub3JtYWxpemVBdHRyTmFtZShleHByLmF0dHIpLFxuICAgIGlzVG9nZ2xlID0gY29udGFpbnMoW1NIT1dfRElSRUNUSVZFLCBISURFX0RJUkVDVElWRV0sIGF0dHJOYW1lKSxcbiAgICBpc1ZpcnR1YWwgPSBleHByLnJvb3QgJiYgZXhwci5yb290LnRhZ05hbWUgPT09ICdWSVJUVUFMJyxcbiAgICBwYXJlbnQgPSBkb20gJiYgKGV4cHIucGFyZW50IHx8IGRvbS5wYXJlbnROb2RlKSxcbiAgICAvLyBkZXRlY3QgdGhlIHN0eWxlIGF0dHJpYnV0ZXNcbiAgICBpc1N0eWxlQXR0ciA9IGF0dHJOYW1lID09PSAnc3R5bGUnLFxuICAgIGlzQ2xhc3NBdHRyID0gYXR0ck5hbWUgPT09ICdjbGFzcycsXG4gICAgaGFzVmFsdWUsXG4gICAgaXNPYmosXG4gICAgdmFsdWU7XG5cbiAgLy8gaWYgaXQncyBhIHRhZyB3ZSBjb3VsZCB0b3RhbGx5IHNraXAgdGhlIHJlc3RcbiAgaWYgKGV4cHIuX3Jpb3RfaWQpIHtcbiAgICBpZiAoZXhwci5pc01vdW50ZWQpIHtcbiAgICAgIGV4cHIudXBkYXRlKCk7XG4gICAgLy8gaWYgaXQgaGFzbid0IGJlZW4gbW91bnRlZCB5ZXQsIGRvIHRoYXQgbm93LlxuICAgIH0gZWxzZSB7XG4gICAgICBleHByLm1vdW50KCk7XG4gICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgIG1ha2VSZXBsYWNlVmlydHVhbChleHByLCBleHByLnJvb3QpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuICAvLyBpZiB0aGlzIGV4cHJlc3Npb24gaGFzIHRoZSB1cGRhdGUgbWV0aG9kIGl0IG1lYW5zIGl0IGNhbiBoYW5kbGUgdGhlIERPTSBjaGFuZ2VzIGJ5IGl0c2VsZlxuICBpZiAoZXhwci51cGRhdGUpIHsgcmV0dXJuIGV4cHIudXBkYXRlKCkgfVxuXG4gIC8vIC4uLml0IHNlZW1zIHRvIGJlIGEgc2ltcGxlIGV4cHJlc3Npb24gc28gd2UgdHJ5IHRvIGNhbGN1bGF0IGl0cyB2YWx1ZVxuICB2YWx1ZSA9IHRtcGwoZXhwci5leHByLCBpc1RvZ2dsZSA/IGV4dGVuZCh7fSwgT2JqZWN0LmNyZWF0ZSh0aGlzLnBhcmVudCksIHRoaXMpIDogdGhpcyk7XG4gIGhhc1ZhbHVlID0gIWlzQmxhbmsodmFsdWUpO1xuICBpc09iaiA9IGlzT2JqZWN0KHZhbHVlKTtcblxuICAvLyBjb252ZXJ0IHRoZSBzdHlsZS9jbGFzcyBvYmplY3RzIHRvIHN0cmluZ3NcbiAgaWYgKGlzT2JqKSB7XG4gICAgaXNPYmogPSAhaXNDbGFzc0F0dHIgJiYgIWlzU3R5bGVBdHRyO1xuICAgIGlmIChpc0NsYXNzQXR0cikge1xuICAgICAgdmFsdWUgPSB0bXBsKEpTT04uc3RyaW5naWZ5KHZhbHVlKSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChpc1N0eWxlQXR0cikge1xuICAgICAgdmFsdWUgPSBzdHlsZU9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICAvLyByZW1vdmUgb3JpZ2luYWwgYXR0cmlidXRlXG4gIGlmIChleHByLmF0dHIgJiYgKCFleHByLmlzQXR0clJlbW92ZWQgfHwgIWhhc1ZhbHVlIHx8IHZhbHVlID09PSBmYWxzZSkpIHtcbiAgICByZW1BdHRyKGRvbSwgZXhwci5hdHRyKTtcbiAgICBleHByLmlzQXR0clJlbW92ZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gZm9yIHRoZSBib29sZWFuIGF0dHJpYnV0ZXMgd2UgZG9uJ3QgbmVlZCB0aGUgdmFsdWVcbiAgLy8gd2UgY2FuIGNvbnZlcnQgaXQgdG8gY2hlY2tlZD10cnVlIHRvIGNoZWNrZWQ9Y2hlY2tlZFxuICBpZiAoZXhwci5ib29sKSB7IHZhbHVlID0gdmFsdWUgPyBhdHRyTmFtZSA6IGZhbHNlOyB9XG4gIGlmIChleHByLmlzUnRhZykgeyByZXR1cm4gdXBkYXRlRGF0YUlzKGV4cHIsIHRoaXMsIHZhbHVlKSB9XG4gIGlmIChleHByLndhc1BhcnNlZE9uY2UgJiYgZXhwci52YWx1ZSA9PT0gdmFsdWUpIHsgcmV0dXJuIH1cblxuICAvLyB1cGRhdGUgdGhlIGV4cHJlc3Npb24gdmFsdWVcbiAgZXhwci52YWx1ZSA9IHZhbHVlO1xuICBleHByLndhc1BhcnNlZE9uY2UgPSB0cnVlO1xuXG4gIC8vIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3Qgd2UgY2FuIG5vdCBkbyBtdWNoIG1vcmUgd2l0aCBpdFxuICBpZiAoaXNPYmogJiYgIWlzVG9nZ2xlKSB7IHJldHVybiB9XG4gIC8vIGF2b2lkIHRvIHJlbmRlciB1bmRlZmluZWQvbnVsbCB2YWx1ZXNcbiAgaWYgKGlzQmxhbmsodmFsdWUpKSB7IHZhbHVlID0gJyc7IH1cblxuICAvLyB0ZXh0YXJlYSBhbmQgdGV4dCBub2RlcyBoYXZlIG5vIGF0dHJpYnV0ZSBuYW1lXG4gIGlmICghYXR0ck5hbWUpIHtcbiAgICAvLyBhYm91dCAjODE1IHcvbyByZXBsYWNlOiB0aGUgYnJvd3NlciBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gYSBzdHJpbmcsXG4gICAgLy8gdGhlIGNvbXBhcmlzb24gYnkgXCI9PVwiIGRvZXMgdG9vLCBidXQgbm90IGluIHRoZSBzZXJ2ZXJcbiAgICB2YWx1ZSArPSAnJztcbiAgICAvLyB0ZXN0IGZvciBwYXJlbnQgYXZvaWRzIGVycm9yIHdpdGggaW52YWxpZCBhc3NpZ25tZW50IHRvIG5vZGVWYWx1ZVxuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIC8vIGNhY2hlIHRoZSBwYXJlbnQgbm9kZSBiZWNhdXNlIHNvbWVob3cgaXQgd2lsbCBiZWNvbWUgbnVsbCBvbiBJRVxuICAgICAgLy8gb24gdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICBleHByLnBhcmVudCA9IHBhcmVudDtcbiAgICAgIGlmIChwYXJlbnQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICBwYXJlbnQudmFsdWUgPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgIC8vICMxMTEzXG4gICAgICAgIGlmICghSUVfVkVSU0lPTikgeyBkb20ubm9kZVZhbHVlID0gdmFsdWU7IH0gIC8vICMxNjI1IElFIHRocm93cyBoZXJlLCBub2RlVmFsdWVcbiAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgYmUgYXZhaWxhYmxlIG9uICd1cGRhdGVkJ1xuICAgICAgZWxzZSB7IGRvbS5ub2RlVmFsdWUgPSB2YWx1ZTsgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG5cbiAgLy8gZXZlbnQgaGFuZGxlclxuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBzZXRFdmVudEhhbmRsZXIoYXR0ck5hbWUsIHZhbHVlLCBkb20sIHRoaXMpO1xuICAvLyBzaG93IC8gaGlkZVxuICB9IGVsc2UgaWYgKGlzVG9nZ2xlKSB7XG4gICAgdG9nZ2xlVmlzaWJpbGl0eShkb20sIGF0dHJOYW1lID09PSBISURFX0RJUkVDVElWRSA/ICF2YWx1ZSA6IHZhbHVlKTtcbiAgLy8gaGFuZGxlIGF0dHJpYnV0ZXNcbiAgfSBlbHNlIHtcbiAgICBpZiAoZXhwci5ib29sKSB7XG4gICAgICBkb21bYXR0ck5hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgaWYgKGF0dHJOYW1lID09PSAndmFsdWUnICYmIGRvbS52YWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIGRvbS52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChoYXNWYWx1ZSAmJiB2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgIHNldEF0dHIoZG9tLCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IGluIGNhc2Ugb2Ygc3R5bGUgY2hhbmdlc1xuICAgIC8vIHRoZSBlbGVtZW50IHN0YXlzIGhpZGRlblxuICAgIGlmIChpc1N0eWxlQXR0ciAmJiBkb20uaGlkZGVuKSB7IHRvZ2dsZVZpc2liaWxpdHkoZG9tLCBmYWxzZSk7IH1cbiAgfVxufVxuXG4vKipcbiAqIFVwZGF0ZSBhbGwgdGhlIGV4cHJlc3Npb25zIGluIGEgVGFnIGluc3RhbmNlXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBleHByZXNzaW9uIHRoYXQgbXVzdCBiZSByZSBldmFsdWF0ZWRcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQWxsRXhwcmVzc2lvbnMoZXhwcmVzc2lvbnMpIHtcbiAgZWFjaChleHByZXNzaW9ucywgdXBkYXRlRXhwcmVzc2lvbi5iaW5kKHRoaXMpKTtcbn1cblxudmFyIElmRXhwciA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdChkb20sIHRhZywgZXhwcikge1xuICAgIHJlbUF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuZXhwciA9IGV4cHI7XG4gICAgdGhpcy5zdHViID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKTtcbiAgICB0aGlzLnByaXN0aW5lID0gZG9tO1xuXG4gICAgdmFyIHAgPSBkb20ucGFyZW50Tm9kZTtcbiAgICBwLmluc2VydEJlZm9yZSh0aGlzLnN0dWIsIGRvbSk7XG4gICAgcC5yZW1vdmVDaGlsZChkb20pO1xuXG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdGhpcy52YWx1ZSA9IHRtcGwodGhpcy5leHByLCB0aGlzLnRhZyk7XG5cbiAgICBpZiAodGhpcy52YWx1ZSAmJiAhdGhpcy5jdXJyZW50KSB7IC8vIGluc2VydFxuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5wcmlzdGluZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICB0aGlzLnN0dWIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5jdXJyZW50LCB0aGlzLnN0dWIpO1xuICAgICAgdGhpcy5leHByZXNzaW9ucyA9IFtdO1xuICAgICAgcGFyc2VFeHByZXNzaW9ucy5hcHBseSh0aGlzLnRhZywgW3RoaXMuY3VycmVudCwgdGhpcy5leHByZXNzaW9ucywgdHJ1ZV0pO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMudmFsdWUgJiYgdGhpcy5jdXJyZW50KSB7IC8vIHJlbW92ZVxuICAgICAgdW5tb3VudEFsbCh0aGlzLmV4cHJlc3Npb25zKTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnQuX3RhZykge1xuICAgICAgICB0aGlzLmN1cnJlbnQuX3RhZy51bm1vdW50KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xuICAgICAgdGhpcy5leHByZXNzaW9ucyA9IFtdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnZhbHVlKSB7IHVwZGF0ZUFsbEV4cHJlc3Npb25zLmNhbGwodGhpcy50YWcsIHRoaXMuZXhwcmVzc2lvbnMpOyB9XG4gIH0sXG4gIHVubW91bnQ6IGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgdW5tb3VudEFsbCh0aGlzLmV4cHJlc3Npb25zIHx8IFtdKTtcbiAgfVxufTtcblxudmFyIFJlZkV4cHIgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoZG9tLCBwYXJlbnQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICB0aGlzLmF0dHIgPSBhdHRyTmFtZTtcbiAgICB0aGlzLnJhd1ZhbHVlID0gYXR0clZhbHVlO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuaGFzRXhwID0gdG1wbC5oYXNFeHByKGF0dHJWYWx1ZSk7XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIG9sZCA9IHRoaXMudmFsdWU7XG4gICAgdmFyIGN1c3RvbVBhcmVudCA9IHRoaXMucGFyZW50ICYmIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzLnBhcmVudCk7XG4gICAgLy8gaWYgdGhlIHJlZmVyZW5jZWQgZWxlbWVudCBpcyBhIGN1c3RvbSB0YWcsIHRoZW4gd2Ugc2V0IHRoZSB0YWcgaXRzZWxmLCByYXRoZXIgdGhhbiBET01cbiAgICB2YXIgdGFnT3JEb20gPSB0aGlzLmRvbS5fX3JlZiB8fCB0aGlzLnRhZyB8fCB0aGlzLmRvbTtcblxuICAgIHRoaXMudmFsdWUgPSB0aGlzLmhhc0V4cCA/IHRtcGwodGhpcy5yYXdWYWx1ZSwgdGhpcy5wYXJlbnQpIDogdGhpcy5yYXdWYWx1ZTtcblxuICAgIC8vIHRoZSBuYW1lIGNoYW5nZWQsIHNvIHdlIG5lZWQgdG8gcmVtb3ZlIGl0IGZyb20gdGhlIG9sZCBrZXkgKGlmIHByZXNlbnQpXG4gICAgaWYgKCFpc0JsYW5rKG9sZCkgJiYgY3VzdG9tUGFyZW50KSB7IGFycmF5aXNoUmVtb3ZlKGN1c3RvbVBhcmVudC5yZWZzLCBvbGQsIHRhZ09yRG9tKTsgfVxuICAgIGlmICghaXNCbGFuayh0aGlzLnZhbHVlKSAmJiBpc1N0cmluZyh0aGlzLnZhbHVlKSkge1xuICAgICAgLy8gYWRkIGl0IHRvIHRoZSByZWZzIG9mIHBhcmVudCB0YWcgKHRoaXMgYmVoYXZpb3Igd2FzIGNoYW5nZWQgPj0zLjApXG4gICAgICBpZiAoY3VzdG9tUGFyZW50KSB7IGFycmF5aXNoQWRkKFxuICAgICAgICBjdXN0b21QYXJlbnQucmVmcyxcbiAgICAgICAgdGhpcy52YWx1ZSxcbiAgICAgICAgdGFnT3JEb20sXG4gICAgICAgIC8vIHVzZSBhbiBhcnJheSBpZiBpdCdzIGEgbG9vcGVkIG5vZGUgYW5kIHRoZSByZWYgaXMgbm90IGFuIGV4cHJlc3Npb25cbiAgICAgICAgbnVsbCxcbiAgICAgICAgdGhpcy5wYXJlbnQuX18uaW5kZXhcbiAgICAgICk7IH1cblxuICAgICAgaWYgKHRoaXMudmFsdWUgIT09IG9sZCkge1xuICAgICAgICBzZXRBdHRyKHRoaXMuZG9tLCB0aGlzLmF0dHIsIHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1BdHRyKHRoaXMuZG9tLCB0aGlzLmF0dHIpO1xuICAgIH1cblxuICAgIC8vIGNhY2hlIHRoZSByZWYgYm91bmQgdG8gdGhpcyBkb20gbm9kZVxuICAgIC8vIHRvIHJldXNlIGl0IGluIGZ1dHVyZSAoc2VlIGFsc28gIzIzMjkpXG4gICAgaWYgKCF0aGlzLmRvbS5fX3JlZikgeyB0aGlzLmRvbS5fX3JlZiA9IHRhZ09yRG9tOyB9XG4gIH0sXG4gIHVubW91bnQ6IGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgdmFyIHRhZ09yRG9tID0gdGhpcy50YWcgfHwgdGhpcy5kb207XG4gICAgdmFyIGN1c3RvbVBhcmVudCA9IHRoaXMucGFyZW50ICYmIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzLnBhcmVudCk7XG4gICAgaWYgKCFpc0JsYW5rKHRoaXMudmFsdWUpICYmIGN1c3RvbVBhcmVudClcbiAgICAgIHsgYXJyYXlpc2hSZW1vdmUoY3VzdG9tUGFyZW50LnJlZnMsIHRoaXMudmFsdWUsIHRhZ09yRG9tKTsgfVxuICB9XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdGhlIGl0ZW0gbG9vcGVkIGludG8gYW4gb2JqZWN0IHVzZWQgdG8gZXh0ZW5kIHRoZSBjaGlsZCB0YWcgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBleHByIC0gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleXMgdXNlZCB0byBleHRlbmQgdGhlIGNoaWxkcmVuIHRhZ3NcbiAqIEBwYXJhbSAgIHsgKiB9IGtleSAtIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgbmV3IG9iamVjdCByZXR1cm5lZFxuICogQHBhcmFtICAgeyAqIH0gdmFsIC0gdmFsdWUgY29udGFpbmluZyB0aGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGJhc2UgLSBwcm90b3R5cGUgb2JqZWN0IGZvciB0aGUgbmV3IGl0ZW1cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gLSBuZXcgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwgaXRlbVxuICpcbiAqIFRoZSB2YXJpYWJsZXMgJ2tleScgYW5kICd2YWwnIGFyZSBhcmJpdHJhcnkuXG4gKiBUaGV5IGRlcGVuZCBvbiB0aGUgY29sbGVjdGlvbiB0eXBlIGxvb3BlZCAoQXJyYXksIE9iamVjdClcbiAqIGFuZCBvbiB0aGUgZXhwcmVzc2lvbiB1c2VkIG9uIHRoZSBlYWNoIHRhZ1xuICpcbiAqL1xuZnVuY3Rpb24gbWtpdGVtKGV4cHIsIGtleSwgdmFsLCBiYXNlKSB7XG4gIHZhciBpdGVtID0gYmFzZSA/IE9iamVjdC5jcmVhdGUoYmFzZSkgOiB7fTtcbiAgaXRlbVtleHByLmtleV0gPSBrZXk7XG4gIGlmIChleHByLnBvcykgeyBpdGVtW2V4cHIucG9zXSA9IHZhbDsgfVxuICByZXR1cm4gaXRlbVxufVxuXG4vKipcbiAqIFVubW91bnQgdGhlIHJlZHVuZGFudCB0YWdzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gaXRlbXMgLSBhcnJheSBjb250YWluaW5nIHRoZSBjdXJyZW50IGl0ZW1zIHRvIGxvb3BcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIHRhZ3NcbiAqL1xuZnVuY3Rpb24gdW5tb3VudFJlZHVuZGFudChpdGVtcywgdGFncykge1xuICB2YXIgaSA9IHRhZ3MubGVuZ3RoLFxuICAgIGogPSBpdGVtcy5sZW5ndGg7XG5cbiAgd2hpbGUgKGkgPiBqKSB7XG4gICAgaS0tO1xuICAgIHJlbW92ZS5hcHBseSh0YWdzW2ldLCBbdGFncywgaV0pO1xuICB9XG59XG5cblxuLyoqXG4gKiBSZW1vdmUgYSBjaGlsZCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBBcnJheSB9IHRhZ3MgLSB0YWdzIGNvbGxlY3Rpb25cbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gaSAtIGluZGV4IG9mIHRoZSB0YWcgdG8gcmVtb3ZlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZSh0YWdzLCBpKSB7XG4gIHRhZ3Muc3BsaWNlKGksIDEpO1xuICB0aGlzLnVubW91bnQoKTtcbiAgYXJyYXlpc2hSZW1vdmUodGhpcy5wYXJlbnQsIHRoaXMsIHRoaXMuX18udGFnTmFtZSwgdHJ1ZSk7XG59XG5cbi8qKlxuICogTW92ZSB0aGUgbmVzdGVkIGN1c3RvbSB0YWdzIGluIG5vbiBjdXN0b20gbG9vcCB0YWdzXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gaSAtIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIGxvb3AgdGFnXG4gKi9cbmZ1bmN0aW9uIG1vdmVOZXN0ZWRUYWdzKGkpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZWFjaChPYmplY3Qua2V5cyh0aGlzLnRhZ3MpLCBmdW5jdGlvbiAodGFnTmFtZSkge1xuICAgIG1vdmVDaGlsZFRhZy5hcHBseSh0aGlzJDEudGFnc1t0YWdOYW1lXSwgW3RhZ05hbWUsIGldKTtcbiAgfSk7XG59XG5cbi8qKlxuICogTW92ZSBhIGNoaWxkIHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGRvbSBub2RlIGNvbnRhaW5pbmcgYWxsIHRoZSBsb29wIGNoaWxkcmVuXG4gKiBAcGFyYW0gICB7IFRhZyB9IG5leHRUYWcgLSBpbnN0YW5jZSBvZiB0aGUgbmV4dCB0YWcgcHJlY2VkaW5nIHRoZSBvbmUgd2Ugd2FudCB0byBtb3ZlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBtb3ZlKHJvb3QsIG5leHRUYWcsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbW92ZVZpcnR1YWwuYXBwbHkodGhpcywgW3Jvb3QsIG5leHRUYWddKTsgfVxuICBlbHNlXG4gICAgeyBzYWZlSW5zZXJ0KHJvb3QsIHRoaXMucm9vdCwgbmV4dFRhZy5yb290KTsgfVxufVxuXG4vKipcbiAqIEluc2VydCBhbmQgbW91bnQgYSBjaGlsZCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBUYWcgfSBuZXh0VGFnIC0gaW5zdGFuY2Ugb2YgdGhlIG5leHQgdGFnIHByZWNlZGluZyB0aGUgb25lIHdlIHdhbnQgdG8gaW5zZXJ0XG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBpbnNlcnQocm9vdCwgbmV4dFRhZywgaXNWaXJ0dWFsKSB7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtYWtlVmlydHVhbC5hcHBseSh0aGlzLCBbcm9vdCwgbmV4dFRhZ10pOyB9XG4gIGVsc2VcbiAgICB7IHNhZmVJbnNlcnQocm9vdCwgdGhpcy5yb290LCBuZXh0VGFnLnJvb3QpOyB9XG59XG5cbi8qKlxuICogQXBwZW5kIGEgbmV3IHRhZyBpbnRvIHRoZSBET01cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gYXBwZW5kKHJvb3QsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbWFrZVZpcnR1YWwuY2FsbCh0aGlzLCByb290KTsgfVxuICBlbHNlXG4gICAgeyByb290LmFwcGVuZENoaWxkKHRoaXMucm9vdCk7IH1cbn1cblxuLyoqXG4gKiBNYW5hZ2UgdGFncyBoYXZpbmcgdGhlICdlYWNoJ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gbG9vcFxuICogQHBhcmFtICAgeyBUYWcgfSBwYXJlbnQgLSBwYXJlbnQgdGFnIGluc3RhbmNlIHdoZXJlIHRoZSBkb20gbm9kZSBpcyBjb250YWluZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXhwciAtIHN0cmluZyBjb250YWluZWQgaW4gdGhlICdlYWNoJyBhdHRyaWJ1dGVcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZXhwcmVzc2lvbiBvYmplY3QgZm9yIHRoaXMgZWFjaCBsb29wXG4gKi9cbmZ1bmN0aW9uIF9lYWNoKGRvbSwgcGFyZW50LCBleHByKSB7XG5cbiAgLy8gcmVtb3ZlIHRoZSBlYWNoIHByb3BlcnR5IGZyb20gdGhlIG9yaWdpbmFsIHRhZ1xuICByZW1BdHRyKGRvbSwgTE9PUF9ESVJFQ1RJVkUpO1xuXG4gIHZhciBtdXN0UmVvcmRlciA9IHR5cGVvZiBnZXRBdHRyKGRvbSwgTE9PUF9OT19SRU9SREVSX0RJUkVDVElWRSkgIT09IFRfU1RSSU5HIHx8IHJlbUF0dHIoZG9tLCBMT09QX05PX1JFT1JERVJfRElSRUNUSVZFKSxcbiAgICB0YWdOYW1lID0gZ2V0VGFnTmFtZShkb20pLFxuICAgIGltcGwgPSBfX1RBR19JTVBMW3RhZ05hbWVdLFxuICAgIHBhcmVudE5vZGUgPSBkb20ucGFyZW50Tm9kZSxcbiAgICBwbGFjZWhvbGRlciA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCksXG4gICAgY2hpbGQgPSBnZXRUYWcoZG9tKSxcbiAgICBpZkV4cHIgPSBnZXRBdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKSxcbiAgICB0YWdzID0gW10sXG4gICAgb2xkSXRlbXMgPSBbXSxcbiAgICBoYXNLZXlzLFxuICAgIGlzTG9vcCA9IHRydWUsXG4gICAgaXNBbm9ueW1vdXMgPSAhX19UQUdfSU1QTFt0YWdOYW1lXSxcbiAgICBpc1ZpcnR1YWwgPSBkb20udGFnTmFtZSA9PT0gJ1ZJUlRVQUwnO1xuXG4gIC8vIHBhcnNlIHRoZSBlYWNoIGV4cHJlc3Npb25cbiAgZXhwciA9IHRtcGwubG9vcEtleXMoZXhwcik7XG4gIGV4cHIuaXNMb29wID0gdHJ1ZTtcblxuICBpZiAoaWZFeHByKSB7IHJlbUF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpOyB9XG5cbiAgLy8gaW5zZXJ0IGEgbWFya2VkIHdoZXJlIHRoZSBsb29wIHRhZ3Mgd2lsbCBiZSBpbmplY3RlZFxuICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShwbGFjZWhvbGRlciwgZG9tKTtcbiAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb20pO1xuXG4gIGV4cHIudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlRWFjaCgpIHtcbiAgICAvLyBnZXQgdGhlIG5ldyBpdGVtcyBjb2xsZWN0aW9uXG4gICAgZXhwci52YWx1ZSA9IHRtcGwoZXhwci52YWwsIHBhcmVudCk7XG5cbiAgICB2YXIgZnJhZyA9IGNyZWF0ZUZyYWcoKSxcbiAgICAgIGl0ZW1zID0gZXhwci52YWx1ZSxcbiAgICAgIGlzT2JqZWN0JCQxID0gIWlzQXJyYXkoaXRlbXMpICYmICFpc1N0cmluZyhpdGVtcyksXG4gICAgICByb290ID0gcGxhY2Vob2xkZXIucGFyZW50Tm9kZTtcblxuICAgIC8vIGlmIHRoaXMgRE9NIHdhcyByZW1vdmVkIHRoZSB1cGRhdGUgaGVyZSBpcyB1c2VsZXNzXG4gICAgLy8gdGhpcyBjb25kaXRpb24gZml4ZXMgYWxzbyBhIHdlaXJkIGFzeW5jIGlzc3VlIG9uIElFIGluIG91ciB1bml0IHRlc3RcbiAgICBpZiAoIXJvb3QpIHsgcmV0dXJuIH1cblxuICAgIC8vIG9iamVjdCBsb29wLiBhbnkgY2hhbmdlcyBjYXVzZSBmdWxsIHJlZHJhd1xuICAgIGlmIChpc09iamVjdCQkMSkge1xuICAgICAgaGFzS2V5cyA9IGl0ZW1zIHx8IGZhbHNlO1xuICAgICAgaXRlbXMgPSBoYXNLZXlzID9cbiAgICAgICAgT2JqZWN0LmtleXMoaXRlbXMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIG1raXRlbShleHByLCBpdGVtc1trZXldLCBrZXkpXG4gICAgICAgIH0pIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhc0tleXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaWZFeHByKSB7XG4gICAgICBpdGVtcyA9IGl0ZW1zLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgIGlmIChleHByLmtleSAmJiAhaXNPYmplY3QkJDEpXG4gICAgICAgICAgeyByZXR1cm4gISF0bXBsKGlmRXhwciwgbWtpdGVtKGV4cHIsIGl0ZW0sIGksIHBhcmVudCkpIH1cblxuICAgICAgICByZXR1cm4gISF0bXBsKGlmRXhwciwgZXh0ZW5kKE9iamVjdC5jcmVhdGUocGFyZW50KSwgaXRlbSkpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBsb29wIGFsbCB0aGUgbmV3IGl0ZW1zXG4gICAgZWFjaChpdGVtcywgZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgLy8gcmVvcmRlciBvbmx5IGlmIHRoZSBpdGVtcyBhcmUgb2JqZWN0c1xuICAgICAgdmFyXG4gICAgICAgIGRvUmVvcmRlciA9IG11c3RSZW9yZGVyICYmIHR5cGVvZiBpdGVtID09PSBUX09CSkVDVCAmJiAhaGFzS2V5cyxcbiAgICAgICAgb2xkUG9zID0gb2xkSXRlbXMuaW5kZXhPZihpdGVtKSxcbiAgICAgICAgaXNOZXcgPSBvbGRQb3MgPT09IC0xLFxuICAgICAgICBwb3MgPSAhaXNOZXcgJiYgZG9SZW9yZGVyID8gb2xkUG9zIDogaSxcbiAgICAgICAgLy8gZG9lcyBhIHRhZyBleGlzdCBpbiB0aGlzIHBvc2l0aW9uP1xuICAgICAgICB0YWcgPSB0YWdzW3Bvc10sXG4gICAgICAgIG11c3RBcHBlbmQgPSBpID49IG9sZEl0ZW1zLmxlbmd0aCxcbiAgICAgICAgbXVzdENyZWF0ZSA9ICBkb1Jlb3JkZXIgJiYgaXNOZXcgfHwgIWRvUmVvcmRlciAmJiAhdGFnO1xuXG4gICAgICBpdGVtID0gIWhhc0tleXMgJiYgZXhwci5rZXkgPyBta2l0ZW0oZXhwciwgaXRlbSwgaSkgOiBpdGVtO1xuXG4gICAgICAvLyBuZXcgdGFnXG4gICAgICBpZiAobXVzdENyZWF0ZSkge1xuICAgICAgICB0YWcgPSBuZXcgVGFnJDEoaW1wbCwge1xuICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgIGlzTG9vcDogaXNMb29wLFxuICAgICAgICAgIGlzQW5vbnltb3VzOiBpc0Fub255bW91cyxcbiAgICAgICAgICB0YWdOYW1lOiB0YWdOYW1lLFxuICAgICAgICAgIHJvb3Q6IGRvbS5jbG9uZU5vZGUoaXNBbm9ueW1vdXMpLFxuICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgIH0sIGRvbS5pbm5lckhUTUwpO1xuXG4gICAgICAgIC8vIG1vdW50IHRoZSB0YWdcbiAgICAgICAgdGFnLm1vdW50KCk7XG5cbiAgICAgICAgaWYgKG11c3RBcHBlbmQpXG4gICAgICAgICAgeyBhcHBlbmQuYXBwbHkodGFnLCBbZnJhZyB8fCByb290LCBpc1ZpcnR1YWxdKTsgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgeyBpbnNlcnQuYXBwbHkodGFnLCBbcm9vdCwgdGFnc1tpXSwgaXNWaXJ0dWFsXSk7IH1cblxuICAgICAgICBpZiAoIW11c3RBcHBlbmQpIHsgb2xkSXRlbXMuc3BsaWNlKGksIDAsIGl0ZW0pOyB9XG4gICAgICAgIHRhZ3Muc3BsaWNlKGksIDAsIHRhZyk7XG4gICAgICAgIGlmIChjaGlsZCkgeyBhcnJheWlzaEFkZChwYXJlbnQudGFncywgdGFnTmFtZSwgdGFnLCB0cnVlKTsgfVxuICAgICAgfSBlbHNlIGlmIChwb3MgIT09IGkgJiYgZG9SZW9yZGVyKSB7XG4gICAgICAgIC8vIG1vdmVcbiAgICAgICAgaWYgKGNvbnRhaW5zKGl0ZW1zLCBvbGRJdGVtc1twb3NdKSkge1xuICAgICAgICAgIG1vdmUuYXBwbHkodGFnLCBbcm9vdCwgdGFnc1tpXSwgaXNWaXJ0dWFsXSk7XG4gICAgICAgICAgLy8gbW92ZSB0aGUgb2xkIHRhZyBpbnN0YW5jZVxuICAgICAgICAgIHRhZ3Muc3BsaWNlKGksIDAsIHRhZ3Muc3BsaWNlKHBvcywgMSlbMF0pO1xuICAgICAgICAgIC8vIG1vdmUgdGhlIG9sZCBpdGVtXG4gICAgICAgICAgb2xkSXRlbXMuc3BsaWNlKGksIDAsIG9sZEl0ZW1zLnNwbGljZShwb3MsIDEpWzBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gYXR0cmlidXRlIGlmIGl0IGV4aXN0c1xuICAgICAgICBpZiAoZXhwci5wb3MpIHsgdGFnW2V4cHIucG9zXSA9IGk7IH1cblxuICAgICAgICAvLyBpZiB0aGUgbG9vcCB0YWdzIGFyZSBub3QgY3VzdG9tXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gbW92ZSBhbGwgdGhlaXIgY3VzdG9tIHRhZ3MgaW50byB0aGUgcmlnaHQgcG9zaXRpb25cbiAgICAgICAgaWYgKCFjaGlsZCAmJiB0YWcudGFncykgeyBtb3ZlTmVzdGVkVGFncy5jYWxsKHRhZywgaSk7IH1cbiAgICAgIH1cblxuICAgICAgLy8gY2FjaGUgdGhlIG9yaWdpbmFsIGl0ZW0gdG8gdXNlIGl0IGluIHRoZSBldmVudHMgYm91bmQgdG8gdGhpcyBub2RlXG4gICAgICAvLyBhbmQgaXRzIGNoaWxkcmVuXG4gICAgICB0YWcuX18uaXRlbSA9IGl0ZW07XG4gICAgICB0YWcuX18uaW5kZXggPSBpO1xuICAgICAgdGFnLl9fLnBhcmVudCA9IHBhcmVudDtcblxuICAgICAgaWYgKCFtdXN0Q3JlYXRlKSB7IHRhZy51cGRhdGUoaXRlbSk7IH1cbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSB0aGUgcmVkdW5kYW50IHRhZ3NcbiAgICB1bm1vdW50UmVkdW5kYW50KGl0ZW1zLCB0YWdzKTtcblxuICAgIC8vIGNsb25lIHRoZSBpdGVtcyBhcnJheVxuICAgIG9sZEl0ZW1zID0gaXRlbXMuc2xpY2UoKTtcblxuICAgIC8vIHRoaXMgY29uZGl0aW9uIGlzIHdlaXJkIHVcbiAgICByb290Lmluc2VydEJlZm9yZShmcmFnLCBwbGFjZWhvbGRlcik7XG4gIH07XG5cbiAgZXhwci51bm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgZWFjaCh0YWdzLCBmdW5jdGlvbih0KSB7IHQudW5tb3VudCgpOyB9KTtcbiAgfTtcblxuICByZXR1cm4gZXhwclxufVxuXG4vKipcbiAqIFdhbGsgdGhlIHRhZyBET00gdG8gZGV0ZWN0IHRoZSBleHByZXNzaW9ucyB0byBldmFsdWF0ZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIHJvb3QgdGFnIHdoZXJlIHdlIHdpbGwgc3RhcnQgZGlnZ2luZyB0aGUgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIGVtcHR5IGFycmF5IHdoZXJlIHRoZSBleHByZXNzaW9ucyB3aWxsIGJlIGFkZGVkXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBtdXN0SW5jbHVkZVJvb3QgLSBmbGFnIHRvIGRlY2lkZSB3aGV0aGVyIHRoZSByb290IG11c3QgYmUgcGFyc2VkIGFzIHdlbGxcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJvb3Qgbm9vZGUgYW5kIHRoZSBkb20gdHJlZVxuICovXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb25zKHJvb3QsIGV4cHJlc3Npb25zLCBtdXN0SW5jbHVkZVJvb3QpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIHRyZWUgPSB7cGFyZW50OiB7Y2hpbGRyZW46IGV4cHJlc3Npb25zfX07XG5cbiAgd2Fsa05vZGVzKHJvb3QsIGZ1bmN0aW9uIChkb20sIGN0eCkge1xuICAgIHZhciB0eXBlID0gZG9tLm5vZGVUeXBlLCBwYXJlbnQgPSBjdHgucGFyZW50LCBhdHRyLCBleHByLCB0YWdJbXBsO1xuICAgIGlmICghbXVzdEluY2x1ZGVSb290ICYmIGRvbSA9PT0gcm9vdCkgeyByZXR1cm4ge3BhcmVudDogcGFyZW50fSB9XG5cbiAgICAvLyB0ZXh0IG5vZGVcbiAgICBpZiAodHlwZSA9PT0gMyAmJiBkb20ucGFyZW50Tm9kZS50YWdOYW1lICE9PSAnU1RZTEUnICYmIHRtcGwuaGFzRXhwcihkb20ubm9kZVZhbHVlKSlcbiAgICAgIHsgcGFyZW50LmNoaWxkcmVuLnB1c2goe2RvbTogZG9tLCBleHByOiBkb20ubm9kZVZhbHVlfSk7IH1cblxuICAgIGlmICh0eXBlICE9PSAxKSB7IHJldHVybiBjdHggfSAvLyBub3QgYW4gZWxlbWVudFxuXG4gICAgdmFyIGlzVmlydHVhbCA9IGRvbS50YWdOYW1lID09PSAnVklSVFVBTCc7XG5cbiAgICAvLyBsb29wLiBlYWNoIGRvZXMgaXQncyBvd24gdGhpbmcgKGZvciBub3cpXG4gICAgaWYgKGF0dHIgPSBnZXRBdHRyKGRvbSwgTE9PUF9ESVJFQ1RJVkUpKSB7XG4gICAgICBpZihpc1ZpcnR1YWwpIHsgc2V0QXR0cihkb20sICdsb29wVmlydHVhbCcsIHRydWUpOyB9IC8vIGlnbm9yZSBoZXJlLCBoYW5kbGVkIGluIF9lYWNoXG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChfZWFjaChkb20sIHRoaXMkMSwgYXR0cikpO1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gaWYtYXR0cnMgYmVjb21lIHRoZSBuZXcgcGFyZW50LiBBbnkgZm9sbG93aW5nIGV4cHJlc3Npb25zIChlaXRoZXIgb24gdGhlIGN1cnJlbnRcbiAgICAvLyBlbGVtZW50LCBvciBiZWxvdyBpdCkgYmVjb21lIGNoaWxkcmVuIG9mIHRoaXMgZXhwcmVzc2lvbi5cbiAgICBpZiAoYXR0ciA9IGdldEF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpKSB7XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChPYmplY3QuY3JlYXRlKElmRXhwcikuaW5pdChkb20sIHRoaXMkMSwgYXR0cikpO1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKGV4cHIgPSBnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKSkge1xuICAgICAgaWYgKHRtcGwuaGFzRXhwcihleHByKSkge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaCh7aXNSdGFnOiB0cnVlLCBleHByOiBleHByLCBkb206IGRvbSwgYXR0cnM6IFtdLnNsaWNlLmNhbGwoZG9tLmF0dHJpYnV0ZXMpfSk7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoaXMgaXMgYSB0YWcsIHN0b3AgdHJhdmVyc2luZyBoZXJlLlxuICAgIC8vIHdlIGlnbm9yZSB0aGUgcm9vdCwgc2luY2UgcGFyc2VFeHByZXNzaW9ucyBpcyBjYWxsZWQgd2hpbGUgd2UncmUgbW91bnRpbmcgdGhhdCByb290XG4gICAgdGFnSW1wbCA9IGdldFRhZyhkb20pO1xuICAgIGlmKGlzVmlydHVhbCkge1xuICAgICAgaWYoZ2V0QXR0cihkb20sICd2aXJ0dWFsaXplZCcpKSB7ZG9tLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tKTsgfSAvLyB0YWcgY3JlYXRlZCwgcmVtb3ZlIGZyb20gZG9tXG4gICAgICBpZighdGFnSW1wbCAmJiAhZ2V0QXR0cihkb20sICd2aXJ0dWFsaXplZCcpICYmICFnZXRBdHRyKGRvbSwgJ2xvb3BWaXJ0dWFsJykpICAvLyBvayB0byBjcmVhdGUgdmlydHVhbCB0YWdcbiAgICAgICAgeyB0YWdJbXBsID0geyB0bXBsOiBkb20ub3V0ZXJIVE1MIH07IH1cbiAgICB9XG5cbiAgICBpZiAodGFnSW1wbCAmJiAoZG9tICE9PSByb290IHx8IG11c3RJbmNsdWRlUm9vdCkpIHtcbiAgICAgIGlmKGlzVmlydHVhbCAmJiAhZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkpIHsgLy8gaGFuZGxlZCBpbiB1cGRhdGVcbiAgICAgICAgLy8gY2FuIG5vdCByZW1vdmUgYXR0cmlidXRlIGxpa2UgZGlyZWN0aXZlc1xuICAgICAgICAvLyBzbyBmbGFnIGZvciByZW1vdmFsIGFmdGVyIGNyZWF0aW9uIHRvIHByZXZlbnQgbWF4aW11bSBzdGFjayBlcnJvclxuICAgICAgICBzZXRBdHRyKGRvbSwgJ3ZpcnR1YWxpemVkJywgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIHRhZyA9IG5ldyBUYWckMSh7IHRtcGw6IGRvbS5vdXRlckhUTUwgfSxcbiAgICAgICAgICB7cm9vdDogZG9tLCBwYXJlbnQ6IHRoaXMkMX0sXG4gICAgICAgICAgZG9tLmlubmVySFRNTCk7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHRhZyk7IC8vIG5vIHJldHVybiwgYW5vbnltb3VzIHRhZywga2VlcCBwYXJzaW5nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY29uZiA9IHtyb290OiBkb20sIHBhcmVudDogdGhpcyQxLCBoYXNJbXBsOiB0cnVlfTtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goaW5pdENoaWxkVGFnKHRhZ0ltcGwsIGNvbmYsIGRvbS5pbm5lckhUTUwsIHRoaXMkMSkpO1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBhdHRyaWJ1dGUgZXhwcmVzc2lvbnNcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkodGhpcyQxLCBbZG9tLCBkb20uYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0ciwgZXhwcikge1xuICAgICAgaWYgKCFleHByKSB7IHJldHVybiB9XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChleHByKTtcbiAgICB9XSk7XG5cbiAgICAvLyB3aGF0ZXZlciB0aGUgcGFyZW50IGlzLCBhbGwgY2hpbGQgZWxlbWVudHMgZ2V0IHRoZSBzYW1lIHBhcmVudC5cbiAgICAvLyBJZiB0aGlzIGVsZW1lbnQgaGFkIGFuIGlmLWF0dHIsIHRoYXQncyB0aGUgcGFyZW50IGZvciBhbGwgY2hpbGQgZWxlbWVudHNcbiAgICByZXR1cm4ge3BhcmVudDogcGFyZW50fVxuICB9LCB0cmVlKTtcbn1cblxuLyoqXG4gKiBDYWxscyBgZm5gIGZvciBldmVyeSBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudC4gSWYgdGhhdCBhdHRyIGhhcyBhbiBleHByZXNzaW9uLFxuICogaXQgaXMgYWxzbyBwYXNzZWQgdG8gZm4uXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBkb20gbm9kZSB0byBwYXJzZVxuICogQHBhcmFtICAgeyBBcnJheSB9IGF0dHJzIC0gYXJyYXkgb2YgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgdG8gZXhlYyBvbiBhbnkgaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlcyhkb20sIGF0dHJzLCBmbikge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBlYWNoKGF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgIGlmICghYXR0cikgeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgdmFyIG5hbWUgPSBhdHRyLm5hbWUsIGJvb2wgPSBpc0Jvb2xBdHRyKG5hbWUpLCBleHByO1xuXG4gICAgaWYgKGNvbnRhaW5zKFJFRl9ESVJFQ1RJVkVTLCBuYW1lKSkge1xuICAgICAgZXhwciA9ICBPYmplY3QuY3JlYXRlKFJlZkV4cHIpLmluaXQoZG9tLCB0aGlzJDEsIG5hbWUsIGF0dHIudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodG1wbC5oYXNFeHByKGF0dHIudmFsdWUpKSB7XG4gICAgICBleHByID0ge2RvbTogZG9tLCBleHByOiBhdHRyLnZhbHVlLCBhdHRyOiBuYW1lLCBib29sOiBib29sfTtcbiAgICB9XG5cbiAgICBmbihhdHRyLCBleHByKTtcbiAgfSk7XG59XG5cbi8qXG4gIEluY2x1ZGVzIGhhY2tzIG5lZWRlZCBmb3IgdGhlIEludGVybmV0IEV4cGxvcmVyIHZlcnNpb24gOSBhbmQgYmVsb3dcbiAgU2VlOiBodHRwOi8va2FuZ2F4LmdpdGh1Yi5pby9jb21wYXQtdGFibGUvZXM1LyNpZThcbiAgICAgICBodHRwOi8vY29kZXBsYW5ldC5pby9kcm9wcGluZy1pZTgvXG4qL1xuXG52YXIgcmVIYXNZaWVsZCAgPSAvPHlpZWxkXFxiL2k7XG52YXIgcmVZaWVsZEFsbCAgPSAvPHlpZWxkXFxzKig/OlxcLz58PihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+fD4pL2lnO1xudmFyIHJlWWllbGRTcmMgID0gLzx5aWVsZFxccyt0bz1bJ1wiXShbXidcIj5dKilbJ1wiXVxccyo+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj4vaWc7XG52YXIgcmVZaWVsZERlc3QgPSAvPHlpZWxkXFxzK2Zyb209WydcIl0/KFstXFx3XSspWydcIl0/XFxzKig/OlxcLz58PihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+KS9pZztcbnZhciByb290RWxzID0geyB0cjogJ3Rib2R5JywgdGg6ICd0cicsIHRkOiAndHInLCBjb2w6ICdjb2xncm91cCcgfTtcbnZhciB0YmxUYWdzID0gSUVfVkVSU0lPTiAmJiBJRV9WRVJTSU9OIDwgMTAgPyBSRV9TUEVDSUFMX1RBR1MgOiBSRV9TUEVDSUFMX1RBR1NfTk9fT1BUSU9OO1xudmFyIEdFTkVSSUMgPSAnZGl2JztcbnZhciBTVkcgPSAnc3ZnJztcblxuXG4vKlxuICBDcmVhdGVzIHRoZSByb290IGVsZW1lbnQgZm9yIHRhYmxlIG9yIHNlbGVjdCBjaGlsZCBlbGVtZW50czpcbiAgdHIvdGgvdGQvdGhlYWQvdGZvb3QvdGJvZHkvY2FwdGlvbi9jb2wvY29sZ3JvdXAvb3B0aW9uL29wdGdyb3VwXG4qL1xuZnVuY3Rpb24gc3BlY2lhbFRhZ3MoZWwsIHRtcGwsIHRhZ05hbWUpIHtcblxuICB2YXJcbiAgICBzZWxlY3QgPSB0YWdOYW1lWzBdID09PSAnbycsXG4gICAgcGFyZW50ID0gc2VsZWN0ID8gJ3NlbGVjdD4nIDogJ3RhYmxlPic7XG5cbiAgLy8gdHJpbSgpIGlzIGltcG9ydGFudCBoZXJlLCB0aGlzIGVuc3VyZXMgd2UgZG9uJ3QgaGF2ZSBhcnRpZmFjdHMsXG4gIC8vIHNvIHdlIGNhbiBjaGVjayBpZiB3ZSBoYXZlIG9ubHkgb25lIGVsZW1lbnQgaW5zaWRlIHRoZSBwYXJlbnRcbiAgZWwuaW5uZXJIVE1MID0gJzwnICsgcGFyZW50ICsgdG1wbC50cmltKCkgKyAnPC8nICsgcGFyZW50O1xuICBwYXJlbnQgPSBlbC5maXJzdENoaWxkO1xuXG4gIC8vIHJldHVybnMgdGhlIGltbWVkaWF0ZSBwYXJlbnQgaWYgdHIvdGgvdGQvY29sIGlzIHRoZSBvbmx5IGVsZW1lbnQsIGlmIG5vdFxuICAvLyByZXR1cm5zIHRoZSB3aG9sZSB0cmVlLCBhcyB0aGlzIGNhbiBpbmNsdWRlIGFkZGl0aW9uYWwgZWxlbWVudHNcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHNlbGVjdCkge1xuICAgIHBhcmVudC5zZWxlY3RlZEluZGV4ID0gLTE7ICAvLyBmb3IgSUU5LCBjb21wYXRpYmxlIHcvY3VycmVudCByaW90IGJlaGF2aW9yXG4gIH0gZWxzZSB7XG4gICAgLy8gYXZvaWRzIGluc2VydGlvbiBvZiBjb2ludGFpbmVyIGluc2lkZSBjb250YWluZXIgKGV4OiB0Ym9keSBpbnNpZGUgdGJvZHkpXG4gICAgdmFyIHRuYW1lID0gcm9vdEVsc1t0YWdOYW1lXTtcbiAgICBpZiAodG5hbWUgJiYgcGFyZW50LmNoaWxkRWxlbWVudENvdW50ID09PSAxKSB7IHBhcmVudCA9ICQodG5hbWUsIHBhcmVudCk7IH1cbiAgfVxuICByZXR1cm4gcGFyZW50XG59XG5cbi8qXG4gIFJlcGxhY2UgdGhlIHlpZWxkIHRhZyBmcm9tIGFueSB0YWcgdGVtcGxhdGUgd2l0aCB0aGUgaW5uZXJIVE1MIG9mIHRoZVxuICBvcmlnaW5hbCB0YWcgaW4gdGhlIHBhZ2VcbiovXG5mdW5jdGlvbiByZXBsYWNlWWllbGQodG1wbCwgaHRtbCkge1xuICAvLyBkbyBub3RoaW5nIGlmIG5vIHlpZWxkXG4gIGlmICghcmVIYXNZaWVsZC50ZXN0KHRtcGwpKSB7IHJldHVybiB0bXBsIH1cblxuICAvLyBiZSBjYXJlZnVsIHdpdGggIzEzNDMgLSBzdHJpbmcgb24gdGhlIHNvdXJjZSBoYXZpbmcgYCQxYFxuICB2YXIgc3JjID0ge307XG5cbiAgaHRtbCA9IGh0bWwgJiYgaHRtbC5yZXBsYWNlKHJlWWllbGRTcmMsIGZ1bmN0aW9uIChfLCByZWYsIHRleHQpIHtcbiAgICBzcmNbcmVmXSA9IHNyY1tyZWZdIHx8IHRleHQ7ICAgLy8gcHJlc2VydmUgZmlyc3QgZGVmaW5pdGlvblxuICAgIHJldHVybiAnJ1xuICB9KS50cmltKCk7XG5cbiAgcmV0dXJuIHRtcGxcbiAgICAucmVwbGFjZShyZVlpZWxkRGVzdCwgZnVuY3Rpb24gKF8sIHJlZiwgZGVmKSB7ICAvLyB5aWVsZCB3aXRoIGZyb20gLSB0byBhdHRyc1xuICAgICAgcmV0dXJuIHNyY1tyZWZdIHx8IGRlZiB8fCAnJ1xuICAgIH0pXG4gICAgLnJlcGxhY2UocmVZaWVsZEFsbCwgZnVuY3Rpb24gKF8sIGRlZikgeyAgICAgICAgLy8geWllbGQgd2l0aG91dCBhbnkgXCJmcm9tXCJcbiAgICAgIHJldHVybiBodG1sIHx8IGRlZiB8fCAnJ1xuICAgIH0pXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IHRvIHdyYXAgdGhlIGdpdmVuIGNvbnRlbnQuIE5vcm1hbGx5IGFuIGBESVZgLCBidXQgY2FuIGJlXG4gKiBhbHNvIGEgYFRBQkxFYCwgYFNFTEVDVGAsIGBUQk9EWWAsIGBUUmAsIG9yIGBDT0xHUk9VUGAgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRtcGwgIC0gVGhlIHRlbXBsYXRlIGNvbWluZyBmcm9tIHRoZSBjdXN0b20gdGFnIGRlZmluaXRpb25cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gaHRtbCAtIEhUTUwgY29udGVudCB0aGF0IGNvbWVzIGZyb20gdGhlIERPTSBlbGVtZW50IHdoZXJlIHlvdVxuICogICAgICAgICAgIHdpbGwgbW91bnQgdGhlIHRhZywgbW9zdGx5IHRoZSBvcmlnaW5hbCB0YWcgaW4gdGhlIHBhZ2VcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzU3ZnIC0gdHJ1ZSBpZiB0aGUgcm9vdCBub2RlIGlzIGFuIHN2Z1xuICogQHJldHVybnMgeyBIVE1MRWxlbWVudCB9IERPTSBlbGVtZW50IHdpdGggX3RtcGxfIG1lcmdlZCB0aHJvdWdoIGBZSUVMRGAgd2l0aCB0aGUgX2h0bWxfLlxuICovXG5mdW5jdGlvbiBta2RvbSh0bXBsLCBodG1sLCBpc1N2ZyQkMSkge1xuICB2YXIgbWF0Y2ggICA9IHRtcGwgJiYgdG1wbC5tYXRjaCgvXlxccyo8KFstXFx3XSspLyksXG4gICAgdGFnTmFtZSA9IG1hdGNoICYmIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCksXG4gICAgZWwgPSBta0VsKGlzU3ZnJCQxID8gU1ZHIDogR0VORVJJQyk7XG5cbiAgLy8gcmVwbGFjZSBhbGwgdGhlIHlpZWxkIHRhZ3Mgd2l0aCB0aGUgdGFnIGlubmVyIGh0bWxcbiAgdG1wbCA9IHJlcGxhY2VZaWVsZCh0bXBsLCBodG1sKTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodGJsVGFncy50ZXN0KHRhZ05hbWUpKVxuICAgIHsgZWwgPSBzcGVjaWFsVGFncyhlbCwgdG1wbCwgdGFnTmFtZSk7IH1cbiAgZWxzZVxuICAgIHsgc2V0SW5uZXJIVE1MKGVsLCB0bXBsKTsgfVxuXG4gIHJldHVybiBlbFxufVxuXG4vKipcbiAqIEFub3RoZXIgd2F5IHRvIGNyZWF0ZSBhIHJpb3QgdGFnIGEgYml0IG1vcmUgZXM2IGZyaWVuZGx5XG4gKiBAcGFyYW0geyBIVE1MRWxlbWVudCB9IGVsIC0gdGFnIERPTSBzZWxlY3RvciBvciBET00gbm9kZS9zXG4gKiBAcGFyYW0geyBPYmplY3QgfSBvcHRzIC0gdGFnIGxvZ2ljXG4gKiBAcmV0dXJucyB7IFRhZyB9IG5ldyByaW90IHRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBUYWckMihlbCwgb3B0cykge1xuICAvLyBnZXQgdGhlIHRhZyBwcm9wZXJ0aWVzIGZyb20gdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gIHZhciByZWYgPSB0aGlzO1xuICB2YXIgbmFtZSA9IHJlZi5uYW1lO1xuICB2YXIgdG1wbCA9IHJlZi50bXBsO1xuICB2YXIgY3NzID0gcmVmLmNzcztcbiAgdmFyIGF0dHJzID0gcmVmLmF0dHJzO1xuICB2YXIgb25DcmVhdGUgPSByZWYub25DcmVhdGU7XG4gIC8vIHJlZ2lzdGVyIGEgbmV3IHRhZyBhbmQgY2FjaGUgdGhlIGNsYXNzIHByb3RvdHlwZVxuICBpZiAoIV9fVEFHX0lNUExbbmFtZV0pIHtcbiAgICB0YWckMShuYW1lLCB0bXBsLCBjc3MsIGF0dHJzLCBvbkNyZWF0ZSk7XG4gICAgLy8gY2FjaGUgdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAgX19UQUdfSU1QTFtuYW1lXS5jbGFzcyA9IHRoaXMuY29uc3RydWN0b3I7XG4gIH1cblxuICAvLyBtb3VudCB0aGUgdGFnIHVzaW5nIHRoZSBjbGFzcyBpbnN0YW5jZVxuICBtb3VudFRvKGVsLCBuYW1lLCBvcHRzLCB0aGlzKTtcbiAgLy8gaW5qZWN0IHRoZSBjb21wb25lbnQgY3NzXG4gIGlmIChjc3MpIHsgc3R5bGVNYW5hZ2VyLmluamVjdCgpOyB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmlvdCB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgdG1wbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gdGFnJDEobmFtZSwgdG1wbCwgY3NzLCBhdHRycywgZm4pIHtcbiAgaWYgKGlzRnVuY3Rpb24oYXR0cnMpKSB7XG4gICAgZm4gPSBhdHRycztcblxuICAgIGlmICgvXltcXHdcXC1dK1xccz89Ly50ZXN0KGNzcykpIHtcbiAgICAgIGF0dHJzID0gY3NzO1xuICAgICAgY3NzID0gJyc7XG4gICAgfSBlbHNlXG4gICAgICB7IGF0dHJzID0gJyc7IH1cbiAgfVxuXG4gIGlmIChjc3MpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjc3MpKVxuICAgICAgeyBmbiA9IGNzczsgfVxuICAgIGVsc2VcbiAgICAgIHsgc3R5bGVNYW5hZ2VyLmFkZChjc3MpOyB9XG4gIH1cblxuICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICBfX1RBR19JTVBMW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiB0bXBsLCBhdHRyczogYXR0cnMsIGZuOiBmbiB9O1xuXG4gIHJldHVybiBuYW1lXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJpb3QgdGFnIGltcGxlbWVudGF0aW9uIChmb3IgdXNlIGJ5IHRoZSBjb21waWxlcilcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgdG1wbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gdGFnMiQxKG5hbWUsIHRtcGwsIGNzcywgYXR0cnMsIGZuKSB7XG4gIGlmIChjc3MpIHsgc3R5bGVNYW5hZ2VyLmFkZChjc3MsIG5hbWUpOyB9XG5cbiAgX19UQUdfSU1QTFtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdG1wbDogdG1wbCwgYXR0cnM6IGF0dHJzLCBmbjogZm4gfTtcblxuICByZXR1cm4gbmFtZVxufVxuXG4vKipcbiAqIE1vdW50IGEgdGFnIHVzaW5nIGEgc3BlY2lmaWMgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7ICogfSBzZWxlY3RvciAtIHRhZyBET00gc2VsZWN0b3Igb3IgRE9NIG5vZGUvc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0gdGFnIGltcGxlbWVudGF0aW9uIG5hbWVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBsb2dpY1xuICogQHJldHVybnMgeyBBcnJheSB9IG5ldyB0YWdzIGluc3RhbmNlc1xuICovXG5mdW5jdGlvbiBtb3VudCQxKHNlbGVjdG9yLCB0YWdOYW1lLCBvcHRzKSB7XG4gIHZhciB0YWdzID0gW107XG4gIHZhciBlbGVtLCBhbGxUYWdzO1xuXG4gIGZ1bmN0aW9uIHB1c2hUYWdzVG8ocm9vdCkge1xuICAgIGlmIChyb290LnRhZ05hbWUpIHtcbiAgICAgIHZhciByaW90VGFnID0gZ2V0QXR0cihyb290LCBJU19ESVJFQ1RJVkUpLCB0YWc7XG5cbiAgICAgIC8vIGhhdmUgdGFnTmFtZT8gZm9yY2UgcmlvdC10YWcgdG8gYmUgdGhlIHNhbWVcbiAgICAgIGlmICh0YWdOYW1lICYmIHJpb3RUYWcgIT09IHRhZ05hbWUpIHtcbiAgICAgICAgcmlvdFRhZyA9IHRhZ05hbWU7XG4gICAgICAgIHNldEF0dHIocm9vdCwgSVNfRElSRUNUSVZFLCB0YWdOYW1lKTtcbiAgICAgIH1cblxuICAgICAgdGFnID0gbW91bnRUbyhyb290LCByaW90VGFnIHx8IHJvb3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpLCBvcHRzKTtcblxuICAgICAgaWYgKHRhZylcbiAgICAgICAgeyB0YWdzLnB1c2godGFnKTsgfVxuICAgIH0gZWxzZSBpZiAocm9vdC5sZW5ndGgpXG4gICAgICB7IGVhY2gocm9vdCwgcHVzaFRhZ3NUbyk7IH0gLy8gYXNzdW1lIG5vZGVMaXN0XG4gIH1cblxuICAvLyBpbmplY3Qgc3R5bGVzIGludG8gRE9NXG4gIHN0eWxlTWFuYWdlci5pbmplY3QoKTtcblxuICBpZiAoaXNPYmplY3QodGFnTmFtZSkpIHtcbiAgICBvcHRzID0gdGFnTmFtZTtcbiAgICB0YWdOYW1lID0gMDtcbiAgfVxuXG4gIC8vIGNyYXdsIHRoZSBET00gdG8gZmluZCB0aGUgdGFnXG4gIGlmIChpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICBzZWxlY3RvciA9IHNlbGVjdG9yID09PSAnKicgP1xuICAgICAgLy8gc2VsZWN0IGFsbCByZWdpc3RlcmVkIHRhZ3NcbiAgICAgIC8vICYgdGFncyBmb3VuZCB3aXRoIHRoZSByaW90LXRhZyBhdHRyaWJ1dGUgc2V0XG4gICAgICBhbGxUYWdzID0gc2VsZWN0VGFncygpIDpcbiAgICAgIC8vIG9yIGp1c3QgdGhlIG9uZXMgbmFtZWQgbGlrZSB0aGUgc2VsZWN0b3JcbiAgICAgIHNlbGVjdG9yICsgc2VsZWN0VGFncyhzZWxlY3Rvci5zcGxpdCgvLCAqLykpO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRvIHBhc3MgYWx3YXlzIGEgc2VsZWN0b3JcbiAgICAvLyB0byB0aGUgcXVlcnlTZWxlY3RvckFsbCBmdW5jdGlvblxuICAgIGVsZW0gPSBzZWxlY3RvciA/ICQkKHNlbGVjdG9yKSA6IFtdO1xuICB9XG4gIGVsc2VcbiAgICAvLyBwcm9iYWJseSB5b3UgaGF2ZSBwYXNzZWQgYWxyZWFkeSBhIHRhZyBvciBhIE5vZGVMaXN0XG4gICAgeyBlbGVtID0gc2VsZWN0b3I7IH1cblxuICAvLyBzZWxlY3QgYWxsIHRoZSByZWdpc3RlcmVkIGFuZCBtb3VudCB0aGVtIGluc2lkZSB0aGVpciByb290IGVsZW1lbnRzXG4gIGlmICh0YWdOYW1lID09PSAnKicpIHtcbiAgICAvLyBnZXQgYWxsIGN1c3RvbSB0YWdzXG4gICAgdGFnTmFtZSA9IGFsbFRhZ3MgfHwgc2VsZWN0VGFncygpO1xuICAgIC8vIGlmIHRoZSByb290IGVscyBpdCdzIGp1c3QgYSBzaW5nbGUgdGFnXG4gICAgaWYgKGVsZW0udGFnTmFtZSlcbiAgICAgIHsgZWxlbSA9ICQkKHRhZ05hbWUsIGVsZW0pOyB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBzZWxlY3QgYWxsIHRoZSBjaGlsZHJlbiBmb3IgYWxsIHRoZSBkaWZmZXJlbnQgcm9vdCBlbGVtZW50c1xuICAgICAgdmFyIG5vZGVMaXN0ID0gW107XG5cbiAgICAgIGVhY2goZWxlbSwgZnVuY3Rpb24gKF9lbCkgeyByZXR1cm4gbm9kZUxpc3QucHVzaCgkJCh0YWdOYW1lLCBfZWwpKTsgfSk7XG5cbiAgICAgIGVsZW0gPSBub2RlTGlzdDtcbiAgICB9XG4gICAgLy8gZ2V0IHJpZCBvZiB0aGUgdGFnTmFtZVxuICAgIHRhZ05hbWUgPSAwO1xuICB9XG5cbiAgcHVzaFRhZ3NUbyhlbGVtKTtcblxuICByZXR1cm4gdGFnc1xufVxuXG4vLyBDcmVhdGUgYSBtaXhpbiB0aGF0IGNvdWxkIGJlIGdsb2JhbGx5IHNoYXJlZCBhY3Jvc3MgYWxsIHRoZSB0YWdzXG52YXIgbWl4aW5zID0ge307XG52YXIgZ2xvYmFscyA9IG1peGluc1tHTE9CQUxfTUlYSU5dID0ge307XG52YXIgbWl4aW5zX2lkID0gMDtcblxuLyoqXG4gKiBDcmVhdGUvUmV0dXJuIGEgbWl4aW4gYnkgaXRzIG5hbWVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIG5hbWUgLSBtaXhpbiBuYW1lIChnbG9iYWwgbWl4aW4gaWYgb2JqZWN0KVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgbWl4IC0gbWl4aW4gbG9naWNcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGcgLSBpcyBnbG9iYWw/XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9ICB0aGUgbWl4aW4gbG9naWNcbiAqL1xuZnVuY3Rpb24gbWl4aW4kMShuYW1lLCBtaXgsIGcpIHtcbiAgLy8gVW5uYW1lZCBnbG9iYWxcbiAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XG4gICAgbWl4aW4kMSgoXCJfX1wiICsgKG1peGluc19pZCsrKSArIFwiX19cIiksIG5hbWUsIHRydWUpO1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN0b3JlID0gZyA/IGdsb2JhbHMgOiBtaXhpbnM7XG5cbiAgLy8gR2V0dGVyXG4gIGlmICghbWl4KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHN0b3JlW25hbWVdKSlcbiAgICAgIHsgdGhyb3cgbmV3IEVycm9yKChcIlVucmVnaXN0ZXJlZCBtaXhpbjogXCIgKyBuYW1lKSkgfVxuXG4gICAgcmV0dXJuIHN0b3JlW25hbWVdXG4gIH1cblxuICAvLyBTZXR0ZXJcbiAgc3RvcmVbbmFtZV0gPSBpc0Z1bmN0aW9uKG1peCkgP1xuICAgIGV4dGVuZChtaXgucHJvdG90eXBlLCBzdG9yZVtuYW1lXSB8fCB7fSkgJiYgbWl4IDpcbiAgICBleHRlbmQoc3RvcmVbbmFtZV0gfHwge30sIG1peCk7XG59XG5cbi8qKlxuICogVXBkYXRlIGFsbCB0aGUgdGFncyBpbnN0YW5jZXMgY3JlYXRlZFxuICogQHJldHVybnMgeyBBcnJheSB9IGFsbCB0aGUgdGFncyBpbnN0YW5jZXNcbiAqL1xuZnVuY3Rpb24gdXBkYXRlJDEoKSB7XG4gIHJldHVybiBlYWNoKF9fVEFHU19DQUNIRSwgZnVuY3Rpb24gKHRhZykgeyByZXR1cm4gdGFnLnVwZGF0ZSgpOyB9KVxufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVyJDEobmFtZSkge1xuICBfX1RBR19JTVBMW25hbWVdID0gbnVsbDtcbn1cblxudmFyIHZlcnNpb24kMSA9ICd2My42LjAnO1xuXG5cbnZhciBjb3JlID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFRhZzogVGFnJDIsXG5cdHRhZzogdGFnJDEsXG5cdHRhZzI6IHRhZzIkMSxcblx0bW91bnQ6IG1vdW50JDEsXG5cdG1peGluOiBtaXhpbiQxLFxuXHR1cGRhdGU6IHVwZGF0ZSQxLFxuXHR1bnJlZ2lzdGVyOiB1bnJlZ2lzdGVyJDEsXG5cdHZlcnNpb246IHZlcnNpb24kMVxufSk7XG5cbi8vIGNvdW50ZXIgdG8gZ2l2ZSBhIHVuaXF1ZSBpZCB0byBhbGwgdGhlIFRhZyBpbnN0YW5jZXNcbnZhciBfX3VpZCA9IDA7XG5cbi8qKlxuICogV2UgbmVlZCB0byB1cGRhdGUgb3B0cyBmb3IgdGhpcyB0YWcuIFRoYXQgcmVxdWlyZXMgdXBkYXRpbmcgdGhlIGV4cHJlc3Npb25zXG4gKiBpbiBhbnkgYXR0cmlidXRlcyBvbiB0aGUgdGFnLCBhbmQgdGhlbiBjb3B5aW5nIHRoZSByZXN1bHQgb250byBvcHRzLlxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7Qm9vbGVhbn0gaXNMb29wIC0gaXMgaXQgYSBsb29wIHRhZz9cbiAqIEBwYXJhbSAgIHsgVGFnIH0gIHBhcmVudCAtIHBhcmVudCB0YWcgbm9kZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gIGlzQW5vbnltb3VzIC0gaXMgaXQgYSB0YWcgd2l0aG91dCBhbnkgaW1wbD8gKGEgdGFnIG5vdCByZWdpc3RlcmVkKVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgb3B0cyAtIHRhZyBvcHRpb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gIGluc3RBdHRycyAtIHRhZyBhdHRyaWJ1dGVzIGFycmF5XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZU9wdHMoaXNMb29wLCBwYXJlbnQsIGlzQW5vbnltb3VzLCBvcHRzLCBpbnN0QXR0cnMpIHtcbiAgLy8gaXNBbm9ueW1vdXMgYGVhY2hgIHRhZ3MgdHJlYXQgYGRvbWAgYW5kIGByb290YCBkaWZmZXJlbnRseS4gSW4gdGhpcyBjYXNlXG4gIC8vIChhbmQgb25seSB0aGlzIGNhc2UpIHdlIGRvbid0IG5lZWQgdG8gZG8gdXBkYXRlT3B0cywgYmVjYXVzZSB0aGUgcmVndWxhciBwYXJzZVxuICAvLyB3aWxsIHVwZGF0ZSB0aG9zZSBhdHRycy4gUGx1cywgaXNBbm9ueW1vdXMgdGFncyBkb24ndCBuZWVkIG9wdHMgYW55d2F5XG4gIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHsgcmV0dXJuIH1cblxuICB2YXIgY3R4ID0gIWlzQW5vbnltb3VzICYmIGlzTG9vcCA/IHRoaXMgOiBwYXJlbnQgfHwgdGhpcztcbiAgZWFjaChpbnN0QXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgaWYgKGF0dHIuZXhwcikgeyB1cGRhdGVBbGxFeHByZXNzaW9ucy5jYWxsKGN0eCwgW2F0dHIuZXhwcl0pOyB9XG4gICAgLy8gbm9ybWFsaXplIHRoZSBhdHRyaWJ1dGUgbmFtZXNcbiAgICBvcHRzW3RvQ2FtZWwoYXR0ci5uYW1lKS5yZXBsYWNlKEFUVFJTX1BSRUZJWCwgJycpXSA9IGF0dHIuZXhwciA/IGF0dHIuZXhwci52YWx1ZSA6IGF0dHIudmFsdWU7XG4gIH0pO1xufVxuXG5cbi8qKlxuICogVGFnIGNsYXNzXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGltcGwgLSBpdCBjb250YWlucyB0aGUgdGFnIHRlbXBsYXRlLCBhbmQgbG9naWNcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGNvbmYgLSB0YWcgb3B0aW9uc1xuICogQHBhcmFtIHsgU3RyaW5nIH0gaW5uZXJIVE1MIC0gaHRtbCB0aGF0IGV2ZW50dWFsbHkgd2UgbmVlZCB0byBpbmplY3QgaW4gdGhlIHRhZ1xuICovXG5mdW5jdGlvbiBUYWckMShpbXBsLCBjb25mLCBpbm5lckhUTUwpIHtcbiAgaWYgKCBpbXBsID09PSB2b2lkIDAgKSBpbXBsID0ge307XG4gIGlmICggY29uZiA9PT0gdm9pZCAwICkgY29uZiA9IHt9O1xuXG4gIHZhciBvcHRzID0gZXh0ZW5kKHt9LCBjb25mLm9wdHMpLFxuICAgIHBhcmVudCA9IGNvbmYucGFyZW50LFxuICAgIGlzTG9vcCA9IGNvbmYuaXNMb29wLFxuICAgIGlzQW5vbnltb3VzID0gISFjb25mLmlzQW5vbnltb3VzLFxuICAgIHNraXBBbm9ueW1vdXMgPSBzZXR0aW5ncyQxLnNraXBBbm9ueW1vdXNUYWdzICYmIGlzQW5vbnltb3VzLFxuICAgIGl0ZW0gPSBjbGVhblVwRGF0YShjb25mLml0ZW0pLFxuICAgIGluZGV4ID0gY29uZi5pbmRleCwgLy8gYXZhaWxhYmxlIG9ubHkgZm9yIHRoZSBsb29wZWQgbm9kZXNcbiAgICBpbnN0QXR0cnMgPSBbXSwgLy8gQWxsIGF0dHJpYnV0ZXMgb24gdGhlIFRhZyB3aGVuIGl0J3MgZmlyc3QgcGFyc2VkXG4gICAgaW1wbEF0dHJzID0gW10sIC8vIGV4cHJlc3Npb25zIG9uIHRoaXMgdHlwZSBvZiBUYWdcbiAgICBleHByZXNzaW9ucyA9IFtdLFxuICAgIHJvb3QgPSBjb25mLnJvb3QsXG4gICAgdGFnTmFtZSA9IGNvbmYudGFnTmFtZSB8fCBnZXRUYWdOYW1lKHJvb3QpLFxuICAgIGlzVmlydHVhbCA9IHRhZ05hbWUgPT09ICd2aXJ0dWFsJyxcbiAgICBpc0lubGluZSA9ICFpc1ZpcnR1YWwgJiYgIWltcGwudG1wbCxcbiAgICBwcm9wc0luU3luY1dpdGhQYXJlbnQgPSBbXSxcbiAgICBkb207XG5cbiAgLy8gbWFrZSB0aGlzIHRhZyBvYnNlcnZhYmxlXG4gIGlmICghc2tpcEFub255bW91cykgeyBvYnNlcnZhYmxlJDEodGhpcyk7IH1cbiAgLy8gb25seSBjYWxsIHVubW91bnQgaWYgd2UgaGF2ZSBhIHZhbGlkIF9fVEFHX0lNUEwgKGhhcyBuYW1lIHByb3BlcnR5KVxuICBpZiAoaW1wbC5uYW1lICYmIHJvb3QuX3RhZykgeyByb290Ll90YWcudW5tb3VudCh0cnVlKTsgfVxuXG4gIC8vIG5vdCB5ZXQgbW91bnRlZFxuICB0aGlzLmlzTW91bnRlZCA9IGZhbHNlO1xuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdfXycsIHtcbiAgICBpc0Fub255bW91czogaXNBbm9ueW1vdXMsXG4gICAgaW5zdEF0dHJzOiBpbnN0QXR0cnMsXG4gICAgaW5uZXJIVE1MOiBpbm5lckhUTUwsXG4gICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICBpbmRleDogaW5kZXgsXG4gICAgaXNMb29wOiBpc0xvb3AsXG4gICAgaXNJbmxpbmU6IGlzSW5saW5lLFxuICAgIC8vIHRhZ3MgaGF2aW5nIGV2ZW50IGxpc3RlbmVyc1xuICAgIC8vIGl0IHdvdWxkIGJlIGJldHRlciB0byB1c2Ugd2VhayBtYXBzIGhlcmUgYnV0IHdlIGNhbiBub3QgaW50cm9kdWNlIGJyZWFraW5nIGNoYW5nZXMgbm93XG4gICAgbGlzdGVuZXJzOiBbXSxcbiAgICAvLyB0aGVzZSB2YXJzIHdpbGwgYmUgbmVlZGVkIG9ubHkgZm9yIHRoZSB2aXJ0dWFsIHRhZ3NcbiAgICB2aXJ0czogW10sXG4gICAgdGFpbDogbnVsbCxcbiAgICBoZWFkOiBudWxsLFxuICAgIHBhcmVudDogbnVsbCxcbiAgICBpdGVtOiBudWxsXG4gIH0pO1xuXG4gIC8vIGNyZWF0ZSBhIHVuaXF1ZSBpZCB0byB0aGlzIHRhZ1xuICAvLyBpdCBjb3VsZCBiZSBoYW5keSB0byB1c2UgaXQgYWxzbyB0byBpbXByb3ZlIHRoZSB2aXJ0dWFsIGRvbSByZW5kZXJpbmcgc3BlZWRcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ19yaW90X2lkJywgKytfX3VpZCk7IC8vIGJhc2UgMSBhbGxvd3MgdGVzdCAhdC5fcmlvdF9pZFxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAncm9vdCcsIHJvb3QpO1xuICBleHRlbmQodGhpcywgeyBvcHRzOiBvcHRzIH0sIGl0ZW0pO1xuICAvLyBwcm90ZWN0IHRoZSBcInRhZ3NcIiBhbmQgXCJyZWZzXCIgcHJvcGVydHkgZnJvbSBiZWluZyBvdmVycmlkZGVuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdwYXJlbnQnLCBwYXJlbnQgfHwgbnVsbCk7XG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd0YWdzJywge30pO1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVmcycsIHt9KTtcblxuICBpZiAoaXNJbmxpbmUgfHwgaXNMb29wICYmIGlzQW5vbnltb3VzKSB7XG4gICAgZG9tID0gcm9vdDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWlzVmlydHVhbCkgeyByb290LmlubmVySFRNTCA9ICcnOyB9XG4gICAgZG9tID0gbWtkb20oaW1wbC50bXBsLCBpbm5lckhUTUwsIGlzU3ZnKHJvb3QpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHRhZyBleHByZXNzaW9ucyBhbmQgb3B0aW9uc1xuICAgKiBAcGFyYW0gICB7ICogfSAgZGF0YSAtIGRhdGEgd2Ugd2FudCB0byB1c2UgdG8gZXh0ZW5kIHRoZSB0YWcgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VwZGF0ZScsIGZ1bmN0aW9uIHRhZ1VwZGF0ZShkYXRhKSB7XG4gICAgdmFyIG5leHRPcHRzID0ge30sXG4gICAgICBjYW5UcmlnZ2VyID0gdGhpcy5pc01vdW50ZWQgJiYgIXNraXBBbm9ueW1vdXM7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhlIGRhdGEgcGFzc2VkIHdpbGwgbm90IG92ZXJyaWRlXG4gICAgLy8gdGhlIGNvbXBvbmVudCBjb3JlIG1ldGhvZHNcbiAgICBkYXRhID0gY2xlYW5VcERhdGEoZGF0YSk7XG4gICAgZXh0ZW5kKHRoaXMsIGRhdGEpO1xuICAgIHVwZGF0ZU9wdHMuYXBwbHkodGhpcywgW2lzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgbmV4dE9wdHMsIGluc3RBdHRyc10pO1xuXG4gICAgaWYgKGNhblRyaWdnZXIgJiYgdGhpcy5pc01vdW50ZWQgJiYgaXNGdW5jdGlvbih0aGlzLnNob3VsZFVwZGF0ZSkgJiYgIXRoaXMuc2hvdWxkVXBkYXRlKGRhdGEsIG5leHRPcHRzKSkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICAvLyBpbmhlcml0IHByb3BlcnRpZXMgZnJvbSB0aGUgcGFyZW50LCBidXQgb25seSBmb3IgaXNBbm9ueW1vdXMgdGFnc1xuICAgIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHsgaW5oZXJpdEZyb20uYXBwbHkodGhpcywgW3RoaXMucGFyZW50LCBwcm9wc0luU3luY1dpdGhQYXJlbnRdKTsgfVxuICAgIGV4dGVuZChvcHRzLCBuZXh0T3B0cyk7XG4gICAgaWYgKGNhblRyaWdnZXIpIHsgdGhpcy50cmlnZ2VyKCd1cGRhdGUnLCBkYXRhKTsgfVxuICAgIHVwZGF0ZUFsbEV4cHJlc3Npb25zLmNhbGwodGhpcywgZXhwcmVzc2lvbnMpO1xuICAgIGlmIChjYW5UcmlnZ2VyKSB7IHRoaXMudHJpZ2dlcigndXBkYXRlZCcpOyB9XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIEFkZCBhIG1peGluIHRvIHRoaXMgdGFnXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWl4aW4nLCBmdW5jdGlvbiB0YWdNaXhpbigpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGVhY2goYXJndW1lbnRzLCBmdW5jdGlvbiAobWl4KSB7XG4gICAgICB2YXIgaW5zdGFuY2UsIG9iajtcbiAgICAgIHZhciBwcm9wcyA9IFtdO1xuXG4gICAgICAvLyBwcm9wZXJ0aWVzIGJsYWNrbGlzdGVkIGFuZCB3aWxsIG5vdCBiZSBib3VuZCB0byB0aGUgdGFnIGluc3RhbmNlXG4gICAgICB2YXIgcHJvcHNCbGFja2xpc3QgPSBbJ2luaXQnLCAnX19wcm90b19fJ107XG5cbiAgICAgIG1peCA9IGlzU3RyaW5nKG1peCkgPyBtaXhpbiQxKG1peCkgOiBtaXg7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBtaXhpbiBpcyBhIGZ1bmN0aW9uXG4gICAgICBpZiAoaXNGdW5jdGlvbihtaXgpKSB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbmV3IG1peGluIGluc3RhbmNlXG4gICAgICAgIGluc3RhbmNlID0gbmV3IG1peCgpO1xuICAgICAgfSBlbHNlIHsgaW5zdGFuY2UgPSBtaXg7IH1cblxuICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGluc3RhbmNlKTtcblxuICAgICAgLy8gYnVpbGQgbXVsdGlsZXZlbCBwcm90b3R5cGUgaW5oZXJpdGFuY2UgY2hhaW4gcHJvcGVydHkgbGlzdFxuICAgICAgZG8geyBwcm9wcyA9IHByb3BzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmogfHwgaW5zdGFuY2UpKTsgfVxuICAgICAgd2hpbGUgKG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmogfHwgaW5zdGFuY2UpKVxuXG4gICAgICAvLyBsb29wIHRoZSBrZXlzIGluIHRoZSBmdW5jdGlvbiBwcm90b3R5cGUgb3IgdGhlIGFsbCBvYmplY3Qga2V5c1xuICAgICAgZWFjaChwcm9wcywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAvLyBiaW5kIG1ldGhvZHMgdG8gdGhpc1xuICAgICAgICAvLyBhbGxvdyBtaXhpbnMgdG8gb3ZlcnJpZGUgb3RoZXIgcHJvcGVydGllcy9wYXJlbnQgbWl4aW5zXG4gICAgICAgIGlmICghY29udGFpbnMocHJvcHNCbGFja2xpc3QsIGtleSkpIHtcbiAgICAgICAgICAvLyBjaGVjayBmb3IgZ2V0dGVycy9zZXR0ZXJzXG4gICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGluc3RhbmNlLCBrZXkpIHx8IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGtleSk7XG4gICAgICAgICAgdmFyIGhhc0dldHRlclNldHRlciA9IGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KTtcblxuICAgICAgICAgIC8vIGFwcGx5IG1ldGhvZCBvbmx5IGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3Qgb24gdGhlIGluc3RhbmNlXG4gICAgICAgICAgaWYgKCF0aGlzJDEuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBoYXNHZXR0ZXJTZXR0ZXIpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzJDEsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMkMVtrZXldID0gaXNGdW5jdGlvbihpbnN0YW5jZVtrZXldKSA/XG4gICAgICAgICAgICAgIGluc3RhbmNlW2tleV0uYmluZCh0aGlzJDEpIDpcbiAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBpbml0IG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhdXRvbWF0aWNhbGx5XG4gICAgICBpZiAoaW5zdGFuY2UuaW5pdClcbiAgICAgICAgeyBpbnN0YW5jZS5pbml0LmJpbmQodGhpcyQxKSgpOyB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXNcbiAgfS5iaW5kKHRoaXMpKTtcblxuICAvKipcbiAgICogTW91bnQgdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbW91bnQnLCBmdW5jdGlvbiB0YWdNb3VudCgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJvb3QuX3RhZyA9IHRoaXM7IC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHRhZyBqdXN0IGNyZWF0ZWRcblxuICAgIC8vIFJlYWQgYWxsIHRoZSBhdHRycyBvbiB0aGlzIGluc3RhbmNlLiBUaGlzIGdpdmUgdXMgdGhlIGluZm8gd2UgbmVlZCBmb3IgdXBkYXRlT3B0c1xuICAgIHBhcnNlQXR0cmlidXRlcy5hcHBseShwYXJlbnQsIFtyb290LCByb290LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChhdHRyLCBleHByKSB7XG4gICAgICBpZiAoIWlzQW5vbnltb3VzICYmIFJlZkV4cHIuaXNQcm90b3R5cGVPZihleHByKSkgeyBleHByLnRhZyA9IHRoaXMkMTsgfVxuICAgICAgYXR0ci5leHByID0gZXhwcjtcbiAgICAgIGluc3RBdHRycy5wdXNoKGF0dHIpO1xuICAgIH1dKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgcm9vdCBhZGRpbmcgY3VzdG9tIGF0dHJpYnV0ZXMgY29taW5nIGZyb20gdGhlIGNvbXBpbGVyXG4gICAgaW1wbEF0dHJzID0gW107XG4gICAgd2Fsa0F0dHJzKGltcGwuYXR0cnMsIGZ1bmN0aW9uIChrLCB2KSB7IGltcGxBdHRycy5wdXNoKHtuYW1lOiBrLCB2YWx1ZTogdn0pOyB9KTtcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW3Jvb3QsIGltcGxBdHRycywgZnVuY3Rpb24gKGF0dHIsIGV4cHIpIHtcbiAgICAgIGlmIChleHByKSB7IGV4cHJlc3Npb25zLnB1c2goZXhwcik7IH1cbiAgICAgIGVsc2UgeyBzZXRBdHRyKHJvb3QsIGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7IH1cbiAgICB9XSk7XG5cbiAgICAvLyBpbml0aWFsaWF0aW9uXG4gICAgdXBkYXRlT3B0cy5hcHBseSh0aGlzLCBbaXNMb29wLCBwYXJlbnQsIGlzQW5vbnltb3VzLCBvcHRzLCBpbnN0QXR0cnNdKTtcblxuICAgIC8vIGFkZCBnbG9iYWwgbWl4aW5zXG4gICAgdmFyIGdsb2JhbE1peGluID0gbWl4aW4kMShHTE9CQUxfTUlYSU4pO1xuXG4gICAgaWYgKGdsb2JhbE1peGluICYmICFza2lwQW5vbnltb3VzKSB7XG4gICAgICBmb3IgKHZhciBpIGluIGdsb2JhbE1peGluKSB7XG4gICAgICAgIGlmIChnbG9iYWxNaXhpbi5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgIHRoaXMkMS5taXhpbihnbG9iYWxNaXhpbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW1wbC5mbikgeyBpbXBsLmZuLmNhbGwodGhpcywgb3B0cyk7IH1cblxuICAgIGlmICghc2tpcEFub255bW91cykgeyB0aGlzLnRyaWdnZXIoJ2JlZm9yZS1tb3VudCcpOyB9XG5cbiAgICAvLyBwYXJzZSBsYXlvdXQgYWZ0ZXIgaW5pdC4gZm4gbWF5IGNhbGN1bGF0ZSBhcmdzIGZvciBuZXN0ZWQgY3VzdG9tIHRhZ3NcbiAgICBwYXJzZUV4cHJlc3Npb25zLmFwcGx5KHRoaXMsIFtkb20sIGV4cHJlc3Npb25zLCBpc0Fub255bW91c10pO1xuXG4gICAgdGhpcy51cGRhdGUoaXRlbSk7XG5cbiAgICBpZiAoIWlzQW5vbnltb3VzICYmICFpc0lubGluZSkge1xuICAgICAgd2hpbGUgKGRvbS5maXJzdENoaWxkKSB7IHJvb3QuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpOyB9XG4gICAgfVxuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3Jvb3QnLCByb290KTtcbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNNb3VudGVkJywgdHJ1ZSk7XG5cbiAgICBpZiAoc2tpcEFub255bW91cykgeyByZXR1cm4gfVxuXG4gICAgLy8gaWYgaXQncyBub3QgYSBjaGlsZCB0YWcgd2UgY2FuIHRyaWdnZXIgaXRzIG1vdW50IGV2ZW50XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdtb3VudCcpO1xuICAgIH1cbiAgICAvLyBvdGhlcndpc2Ugd2UgbmVlZCB0byB3YWl0IHRoYXQgdGhlIHBhcmVudCBcIm1vdW50XCIgb3IgXCJ1cGRhdGVkXCIgZXZlbnQgZ2V0cyB0cmlnZ2VyZWRcbiAgICBlbHNlIHtcbiAgICAgIHZhciBwID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMucGFyZW50KTtcbiAgICAgIHAub25lKCFwLmlzTW91bnRlZCA/ICdtb3VudCcgOiAndXBkYXRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcyQxLnRyaWdnZXIoJ21vdW50Jyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIFVubW91bnQgdGhlIHRhZyBpbnN0YW5jZVxuICAgKiBAcGFyYW0geyBCb29sZWFuIH0gbXVzdEtlZXBSb290IC0gaWYgaXQncyB0cnVlIHRoZSByb290IG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZFxuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VubW91bnQnLCBmdW5jdGlvbiB0YWdVbm1vdW50KG11c3RLZWVwUm9vdCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGVsID0gdGhpcy5yb290LFxuICAgICAgcCA9IGVsLnBhcmVudE5vZGUsXG4gICAgICBwdGFnLFxuICAgICAgdGFnSW5kZXggPSBfX1RBR1NfQ0FDSEUuaW5kZXhPZih0aGlzKTtcblxuICAgIGlmICghc2tpcEFub255bW91cykgeyB0aGlzLnRyaWdnZXIoJ2JlZm9yZS11bm1vdW50Jyk7IH1cblxuICAgIC8vIGNsZWFyIGFsbCBhdHRyaWJ1dGVzIGNvbWluZyBmcm9tIHRoZSBtb3VudGVkIHRhZ1xuICAgIHdhbGtBdHRycyhpbXBsLmF0dHJzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKHN0YXJ0c1dpdGgobmFtZSwgQVRUUlNfUFJFRklYKSlcbiAgICAgICAgeyBuYW1lID0gbmFtZS5zbGljZShBVFRSU19QUkVGSVgubGVuZ3RoKTsgfVxuXG4gICAgICByZW1BdHRyKHJvb3QsIG5hbWUpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIGFsbCB0aGUgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5fXy5saXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAoZG9tKSB7XG4gICAgICBPYmplY3Qua2V5cyhkb21bUklPVF9FVkVOVFNfS0VZXSkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZG9tW1JJT1RfRVZFTlRTX0tFWV1bZXZlbnROYW1lXSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSB0aGlzIHRhZyBpbnN0YW5jZSBmcm9tIHRoZSBnbG9iYWwgdmlydHVhbERvbSB2YXJpYWJsZVxuICAgIGlmICh0YWdJbmRleCAhPT0gLTEpXG4gICAgICB7IF9fVEFHU19DQUNIRS5zcGxpY2UodGFnSW5kZXgsIDEpOyB9XG5cbiAgICBpZiAocCB8fCBpc1ZpcnR1YWwpIHtcbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgcHRhZyA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyhwYXJlbnQpO1xuXG4gICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnRhZ3MpLmZvckVhY2goZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICAgICAgICAgIGFycmF5aXNoUmVtb3ZlKHB0YWcudGFncywgdGFnTmFtZSwgdGhpcyQxLnRhZ3NbdGFnTmFtZV0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycmF5aXNoUmVtb3ZlKHB0YWcudGFncywgdGFnTmFtZSwgdGhpcyk7XG4gICAgICAgICAgLy8gcmVtb3ZlIGZyb20gX3BhcmVudCB0b29cbiAgICAgICAgICBpZihwYXJlbnQgIT09IHB0YWcpIHtcbiAgICAgICAgICAgIGFycmF5aXNoUmVtb3ZlKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgdGFnIGNvbnRlbnRzXG4gICAgICAgIHNldElubmVySFRNTChlbCwgJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAocCAmJiAhbXVzdEtlZXBSb290KSB7IHAucmVtb3ZlQ2hpbGQoZWwpOyB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX18udmlydHMpIHtcbiAgICAgIGVhY2godGhpcy5fXy52aXJ0cywgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKHYucGFyZW50Tm9kZSkgeyB2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodik7IH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFsbG93IGV4cHJlc3Npb25zIHRvIHVubW91bnQgdGhlbXNlbHZlc1xuICAgIHVubW91bnRBbGwoZXhwcmVzc2lvbnMpO1xuICAgIGVhY2goaW5zdEF0dHJzLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYS5leHByICYmIGEuZXhwci51bm1vdW50ICYmIGEuZXhwci51bm1vdW50KCk7IH0pO1xuXG4gICAgLy8gY3VzdG9tIGludGVybmFsIHVubW91bnQgZnVuY3Rpb24gdG8gYXZvaWQgcmVseWluZyBvbiB0aGUgb2JzZXJ2YWJsZVxuICAgIGlmICh0aGlzLl9fLm9uVW5tb3VudCkgeyB0aGlzLl9fLm9uVW5tb3VudCgpOyB9XG5cbiAgICBpZiAoIXNraXBBbm9ueW1vdXMpIHtcbiAgICAgIHRoaXMudHJpZ2dlcigndW5tb3VudCcpO1xuICAgICAgdGhpcy5vZmYoJyonKTtcbiAgICB9XG5cbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNNb3VudGVkJywgZmFsc2UpO1xuXG4gICAgZGVsZXRlIHRoaXMucm9vdC5fdGFnO1xuXG4gICAgcmV0dXJuIHRoaXNcblxuICB9LmJpbmQodGhpcykpO1xufVxuXG4vKipcbiAqIERldGVjdCB0aGUgdGFnIGltcGxlbWVudGF0aW9uIGJ5IGEgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2UgbmVlZCB0byBwYXJzZSB0byBnZXQgaXRzIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybnMgeyBPYmplY3QgfSBpdCByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGN1c3RvbSB0YWcgKHRlbXBsYXRlIGFuZCBib290IGZ1bmN0aW9uKVxuICovXG5mdW5jdGlvbiBnZXRUYWcoZG9tKSB7XG4gIHJldHVybiBkb20udGFnTmFtZSAmJiBfX1RBR19JTVBMW2dldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpIHx8XG4gICAgZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkgfHwgZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKV1cbn1cblxuLyoqXG4gKiBJbmhlcml0IHByb3BlcnRpZXMgZnJvbSBhIHRhcmdldCB0YWcgaW5zdGFuY2VcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBUYWcgfSB0YXJnZXQgLSB0YWcgd2hlcmUgd2Ugd2lsbCBpbmhlcml0IHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBwcm9wc0luU3luY1dpdGhQYXJlbnQgLSBhcnJheSBvZiBwcm9wZXJ0aWVzIHRvIHN5bmMgd2l0aCB0aGUgdGFyZ2V0XG4gKi9cbmZ1bmN0aW9uIGluaGVyaXRGcm9tKHRhcmdldCwgcHJvcHNJblN5bmNXaXRoUGFyZW50KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goT2JqZWN0LmtleXModGFyZ2V0KSwgZnVuY3Rpb24gKGspIHtcbiAgICAvLyBzb21lIHByb3BlcnRpZXMgbXVzdCBiZSBhbHdheXMgaW4gc3luYyB3aXRoIHRoZSBwYXJlbnQgdGFnXG4gICAgdmFyIG11c3RTeW5jID0gIWlzUmVzZXJ2ZWROYW1lKGspICYmIGNvbnRhaW5zKHByb3BzSW5TeW5jV2l0aFBhcmVudCwgayk7XG5cbiAgICBpZiAoaXNVbmRlZmluZWQodGhpcyQxW2tdKSB8fCBtdXN0U3luYykge1xuICAgICAgLy8gdHJhY2sgdGhlIHByb3BlcnR5IHRvIGtlZXAgaW4gc3luY1xuICAgICAgLy8gc28gd2UgY2FuIGtlZXAgaXQgdXBkYXRlZFxuICAgICAgaWYgKCFtdXN0U3luYykgeyBwcm9wc0luU3luY1dpdGhQYXJlbnQucHVzaChrKTsgfVxuICAgICAgdGhpcyQxW2tdID0gdGFyZ2V0W2tdO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTW92ZSB0aGUgcG9zaXRpb24gb2YgYSBjdXN0b20gdGFnIGluIGl0cyBwYXJlbnQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIGtleSB3aGVyZSB0aGUgdGFnIHdhcyBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gbmV3UG9zIC0gaW5kZXggd2hlcmUgdGhlIG5ldyB0YWcgd2lsbCBiZSBzdG9yZWRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkVGFnKHRhZ05hbWUsIG5ld1Bvcykge1xuICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQsXG4gICAgdGFncztcbiAgLy8gbm8gcGFyZW50IG5vIG1vdmVcbiAgaWYgKCFwYXJlbnQpIHsgcmV0dXJuIH1cblxuICB0YWdzID0gcGFyZW50LnRhZ3NbdGFnTmFtZV07XG5cbiAgaWYgKGlzQXJyYXkodGFncykpXG4gICAgeyB0YWdzLnNwbGljZShuZXdQb3MsIDAsIHRhZ3Muc3BsaWNlKHRhZ3MuaW5kZXhPZih0aGlzKSwgMSlbMF0pOyB9XG4gIGVsc2UgeyBhcnJheWlzaEFkZChwYXJlbnQudGFncywgdGFnTmFtZSwgdGhpcyk7IH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgY2hpbGQgdGFnIGluY2x1ZGluZyBpdCBjb3JyZWN0bHkgaW50byBpdHMgcGFyZW50XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGNoaWxkIC0gY2hpbGQgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdHMgLSB0YWcgb3B0aW9ucyBjb250YWluaW5nIHRoZSBET00gbm9kZSB3aGVyZSB0aGUgdGFnIHdpbGwgYmUgbW91bnRlZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBpbm5lckhUTUwgLSBpbm5lciBodG1sIG9mIHRoZSBjaGlsZCBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHBhcmVudCAtIGluc3RhbmNlIG9mIHRoZSBwYXJlbnQgdGFnIGluY2x1ZGluZyB0aGUgY2hpbGQgY3VzdG9tIHRhZ1xuICogQHJldHVybnMgeyBPYmplY3QgfSBpbnN0YW5jZSBvZiB0aGUgbmV3IGNoaWxkIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gaW5pdENoaWxkVGFnKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwsIHBhcmVudCkge1xuICB2YXIgdGFnID0gbmV3IFRhZyQxKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwpLFxuICAgIHRhZ05hbWUgPSBvcHRzLnRhZ05hbWUgfHwgZ2V0VGFnTmFtZShvcHRzLnJvb3QsIHRydWUpLFxuICAgIHB0YWcgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcocGFyZW50KTtcbiAgLy8gZml4IGZvciB0aGUgcGFyZW50IGF0dHJpYnV0ZSBpbiB0aGUgbG9vcGVkIGVsZW1lbnRzXG4gIGRlZmluZVByb3BlcnR5KHRhZywgJ3BhcmVudCcsIHB0YWcpO1xuICAvLyBzdG9yZSB0aGUgcmVhbCBwYXJlbnQgdGFnXG4gIC8vIGluIHNvbWUgY2FzZXMgdGhpcyBjb3VsZCBiZSBkaWZmZXJlbnQgZnJvbSB0aGUgY3VzdG9tIHBhcmVudCB0YWdcbiAgLy8gZm9yIGV4YW1wbGUgaW4gbmVzdGVkIGxvb3BzXG4gIHRhZy5fXy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgLy8gYWRkIHRoaXMgdGFnIHRvIHRoZSBjdXN0b20gcGFyZW50IHRhZ1xuICBhcnJheWlzaEFkZChwdGFnLnRhZ3MsIHRhZ05hbWUsIHRhZyk7XG5cbiAgLy8gYW5kIGFsc28gdG8gdGhlIHJlYWwgcGFyZW50IHRhZ1xuICBpZiAocHRhZyAhPT0gcGFyZW50KVxuICAgIHsgYXJyYXlpc2hBZGQocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRhZyk7IH1cblxuICByZXR1cm4gdGFnXG59XG5cbi8qKlxuICogTG9vcCBiYWNrd2FyZCBhbGwgdGhlIHBhcmVudHMgdHJlZSB0byBkZXRlY3QgdGhlIGZpcnN0IGN1c3RvbSBwYXJlbnQgdGFnXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHRhZyAtIGEgVGFnIGluc3RhbmNlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IHRoZSBpbnN0YW5jZSBvZiB0aGUgZmlyc3QgY3VzdG9tIHBhcmVudCB0YWcgZm91bmRcbiAqL1xuZnVuY3Rpb24gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRhZykge1xuICB2YXIgcHRhZyA9IHRhZztcbiAgd2hpbGUgKHB0YWcuX18uaXNBbm9ueW1vdXMpIHtcbiAgICBpZiAoIXB0YWcucGFyZW50KSB7IGJyZWFrIH1cbiAgICBwdGFnID0gcHRhZy5wYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIHB0YWdcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIHRoZSB1bm1vdW50IG1ldGhvZCBvbiBhbGwgdGhlIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBET00gZXhwcmVzc2lvbnNcbiAqL1xuZnVuY3Rpb24gdW5tb3VudEFsbChleHByZXNzaW9ucykge1xuICBlYWNoKGV4cHJlc3Npb25zLCBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKGV4cHIgaW5zdGFuY2VvZiBUYWckMSkgeyBleHByLnVubW91bnQodHJ1ZSk7IH1cbiAgICBlbHNlIGlmIChleHByLnRhZ05hbWUpIHsgZXhwci50YWcudW5tb3VudCh0cnVlKTsgfVxuICAgIGVsc2UgaWYgKGV4cHIudW5tb3VudCkgeyBleHByLnVubW91bnQoKTsgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhZyBuYW1lIG9mIGFueSBET00gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBza2lwRGF0YUlzIC0gaGFjayB0byBpZ25vcmUgdGhlIGRhdGEtaXMgYXR0cmlidXRlIHdoZW4gYXR0YWNoaW5nIHRvIHBhcmVudFxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lIHRvIGlkZW50aWZ5IHRoaXMgZG9tIG5vZGUgaW4gcmlvdFxuICovXG5mdW5jdGlvbiBnZXRUYWdOYW1lKGRvbSwgc2tpcERhdGFJcykge1xuICB2YXIgY2hpbGQgPSBnZXRUYWcoZG9tKSxcbiAgICBuYW1lZFRhZyA9ICFza2lwRGF0YUlzICYmIGdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpO1xuICByZXR1cm4gbmFtZWRUYWcgJiYgIXRtcGwuaGFzRXhwcihuYW1lZFRhZykgP1xuICAgICAgICAgICAgICAgIG5hbWVkVGFnIDpcbiAgICAgICAgICAgICAgY2hpbGQgPyBjaGlsZC5uYW1lIDogZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxufVxuXG4vKipcbiAqIFdpdGggdGhpcyBmdW5jdGlvbiB3ZSBhdm9pZCB0aGF0IHRoZSBpbnRlcm5hbCBUYWcgbWV0aG9kcyBnZXQgb3ZlcnJpZGRlblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkYXRhIC0gb3B0aW9ucyB3ZSB3YW50IHRvIHVzZSB0byBleHRlbmQgdGhlIHRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjbGVhbiBvYmplY3Qgd2l0aG91dCBjb250YWluaW5nIHRoZSByaW90IGludGVybmFsIHJlc2VydmVkIHdvcmRzXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXBEYXRhKGRhdGEpIHtcbiAgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIFRhZyQxKSAmJiAhKGRhdGEgJiYgaXNGdW5jdGlvbihkYXRhLnRyaWdnZXIpKSlcbiAgICB7IHJldHVybiBkYXRhIH1cblxuICB2YXIgbyA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgIGlmICghUkVfUkVTRVJWRURfTkFNRVMudGVzdChrZXkpKSB7IG9ba2V5XSA9IGRhdGFba2V5XTsgfVxuICB9XG4gIHJldHVybiBvXG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgZm9yIGEgZ2l2ZW4ga2V5LiBJZiBzb21ldGhpbmcgYWxyZWFkeVxuICogZXhpc3RzIHRoZXJlLCB0aGVuIGl0IGJlY29tZXMgYW4gYXJyYXkgY29udGFpbmluZyBib3RoIHRoZSBvbGQgYW5kIG5ldyB2YWx1ZS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9iaiAtIG9iamVjdCBvbiB3aGljaCB0byBzZXQgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0geyBTdHJpbmcgfSBrZXkgLSBwcm9wZXJ0eSBuYW1lXG4gKiBAcGFyYW0geyBPYmplY3QgfSB2YWx1ZSAtIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgc2V0XG4gKiBAcGFyYW0geyBCb29sZWFuIH0gZW5zdXJlQXJyYXkgLSBlbnN1cmUgdGhhdCB0aGUgcHJvcGVydHkgcmVtYWlucyBhbiBhcnJheVxuICogQHBhcmFtIHsgTnVtYmVyIH0gaW5kZXggLSBhZGQgdGhlIG5ldyBpdGVtIGluIGEgY2VydGFpbiBhcnJheSBwb3NpdGlvblxuICovXG5mdW5jdGlvbiBhcnJheWlzaEFkZChvYmosIGtleSwgdmFsdWUsIGVuc3VyZUFycmF5LCBpbmRleCkge1xuICB2YXIgZGVzdCA9IG9ialtrZXldO1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KGRlc3QpO1xuICB2YXIgaGFzSW5kZXggPSAhaXNVbmRlZmluZWQoaW5kZXgpO1xuXG4gIGlmIChkZXN0ICYmIGRlc3QgPT09IHZhbHVlKSB7IHJldHVybiB9XG5cbiAgLy8gaWYgdGhlIGtleSB3YXMgbmV2ZXIgc2V0LCBzZXQgaXQgb25jZVxuICBpZiAoIWRlc3QgJiYgZW5zdXJlQXJyYXkpIHsgb2JqW2tleV0gPSBbdmFsdWVdOyB9XG4gIGVsc2UgaWYgKCFkZXN0KSB7IG9ialtrZXldID0gdmFsdWU7IH1cbiAgLy8gaWYgaXQgd2FzIGFuIGFycmF5IGFuZCBub3QgeWV0IHNldFxuICBlbHNlIHtcbiAgICBpZiAoaXNBcnIpIHtcbiAgICAgIHZhciBvbGRJbmRleCA9IGRlc3QuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAvLyB0aGlzIGl0ZW0gbmV2ZXIgY2hhbmdlZCBpdHMgcG9zaXRpb25cbiAgICAgIGlmIChvbGRJbmRleCA9PT0gaW5kZXgpIHsgcmV0dXJuIH1cbiAgICAgIC8vIHJlbW92ZSB0aGUgaXRlbSBmcm9tIGl0cyBvbGQgcG9zaXRpb25cbiAgICAgIGlmIChvbGRJbmRleCAhPT0gLTEpIHsgZGVzdC5zcGxpY2Uob2xkSW5kZXgsIDEpOyB9XG4gICAgICAvLyBtb3ZlIG9yIGFkZCB0aGUgaXRlbVxuICAgICAgaWYgKGhhc0luZGV4KSB7XG4gICAgICAgIGRlc3Quc3BsaWNlKGluZGV4LCAwLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZXN0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7IG9ialtrZXldID0gW2Rlc3QsIHZhbHVlXTsgfVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gYW4gb2JqZWN0IGF0IGEgZ2l2ZW4ga2V5LiBJZiB0aGUga2V5IHBvaW50cyB0byBhbiBhcnJheSxcbiAqIHRoZW4gdGhlIGl0ZW0gaXMganVzdCByZW1vdmVkIGZyb20gdGhlIGFycmF5LlxuICogQHBhcmFtIHsgT2JqZWN0IH0gb2JqIC0gb2JqZWN0IG9uIHdoaWNoIHRvIHJlbW92ZSB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGtleSAtIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHZhbHVlIC0gdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSByZW1vdmVkXG4gKiBAcGFyYW0geyBCb29sZWFuIH0gZW5zdXJlQXJyYXkgLSBlbnN1cmUgdGhhdCB0aGUgcHJvcGVydHkgcmVtYWlucyBhbiBhcnJheVxuKi9cbmZ1bmN0aW9uIGFycmF5aXNoUmVtb3ZlKG9iaiwga2V5LCB2YWx1ZSwgZW5zdXJlQXJyYXkpIHtcbiAgaWYgKGlzQXJyYXkob2JqW2tleV0pKSB7XG4gICAgdmFyIGluZGV4ID0gb2JqW2tleV0uaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkgeyBvYmpba2V5XS5zcGxpY2UoaW5kZXgsIDEpOyB9XG4gICAgaWYgKCFvYmpba2V5XS5sZW5ndGgpIHsgZGVsZXRlIG9ialtrZXldOyB9XG4gICAgZWxzZSBpZiAob2JqW2tleV0ubGVuZ3RoID09PSAxICYmICFlbnN1cmVBcnJheSkgeyBvYmpba2V5XSA9IG9ialtrZXldWzBdOyB9XG4gIH0gZWxzZVxuICAgIHsgZGVsZXRlIG9ialtrZXldOyB9IC8vIG90aGVyd2lzZSBqdXN0IGRlbGV0ZSB0aGUga2V5XG59XG5cbi8qKlxuICogTW91bnQgYSB0YWcgY3JlYXRpbmcgbmV3IFRhZyBpbnN0YW5jZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSByb290IC0gZG9tIG5vZGUgd2hlcmUgdGhlIHRhZyB3aWxsIGJlIG1vdW50ZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIG5hbWUgb2YgdGhlIHJpb3QgdGFnIHdlIHdhbnQgdG8gbW91bnRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgVGFnIGluc3RhbmNlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIG9wdGlvbmFsIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZXh0ZW5kIGFuIGV4aXN0aW5nIGNsYXNzICggdXNlZCBpbiByaW90LlRhZyApXG4gKiBAcmV0dXJucyB7IFRhZyB9IGEgbmV3IFRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBtb3VudFRvKHJvb3QsIHRhZ05hbWUsIG9wdHMsIGN0eCkge1xuICB2YXIgaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV0sXG4gICAgaW1wbENsYXNzID0gX19UQUdfSU1QTFt0YWdOYW1lXS5jbGFzcyxcbiAgICB0YWcgPSBjdHggfHwgKGltcGxDbGFzcyA/IE9iamVjdC5jcmVhdGUoaW1wbENsYXNzLnByb3RvdHlwZSkgOiB7fSksXG4gICAgLy8gY2FjaGUgdGhlIGlubmVyIEhUTUwgdG8gZml4ICM4NTVcbiAgICBpbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgfHwgcm9vdC5pbm5lckhUTUw7XG5cbiAgdmFyIGNvbmYgPSBleHRlbmQoeyByb290OiByb290LCBvcHRzOiBvcHRzIH0sIHsgcGFyZW50OiBvcHRzID8gb3B0cy5wYXJlbnQgOiBudWxsIH0pO1xuXG4gIGlmIChpbXBsICYmIHJvb3QpIHsgVGFnJDEuYXBwbHkodGFnLCBbaW1wbCwgY29uZiwgaW5uZXJIVE1MXSk7IH1cblxuICBpZiAodGFnICYmIHRhZy5tb3VudCkge1xuICAgIHRhZy5tb3VudCh0cnVlKTtcbiAgICAvLyBhZGQgdGhpcyB0YWcgdG8gdGhlIHZpcnR1YWxEb20gdmFyaWFibGVcbiAgICBpZiAoIWNvbnRhaW5zKF9fVEFHU19DQUNIRSwgdGFnKSkgeyBfX1RBR1NfQ0FDSEUucHVzaCh0YWcpOyB9XG4gIH1cblxuICByZXR1cm4gdGFnXG59XG5cbi8qKlxuICogbWFrZXMgYSB0YWcgdmlydHVhbCBhbmQgcmVwbGFjZXMgYSByZWZlcmVuY2UgaW4gdGhlIGRvbVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyB0YWcgfSB0aGUgdGFnIHRvIG1ha2UgdmlydHVhbFxuICogQHBhcmFtIHsgcmVmIH0gdGhlIGRvbSByZWZlcmVuY2UgbG9jYXRpb25cbiAqL1xuZnVuY3Rpb24gbWFrZVJlcGxhY2VWaXJ0dWFsKHRhZywgcmVmKSB7XG4gIHZhciBmcmFnID0gY3JlYXRlRnJhZygpO1xuICBtYWtlVmlydHVhbC5jYWxsKHRhZywgZnJhZyk7XG4gIHJlZi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChmcmFnLCByZWYpO1xufVxuXG4vKipcbiAqIEFkZHMgdGhlIGVsZW1lbnRzIGZvciBhIHZpcnR1YWwgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IE5vZGUgfSBzcmMgLSB0aGUgbm9kZSB0aGF0IHdpbGwgZG8gdGhlIGluc2VydGluZyBvciBhcHBlbmRpbmdcbiAqIEBwYXJhbSB7IFRhZyB9IHRhcmdldCAtIG9ubHkgaWYgaW5zZXJ0aW5nLCBpbnNlcnQgYmVmb3JlIHRoaXMgdGFnJ3MgZmlyc3QgY2hpbGRcbiAqL1xuZnVuY3Rpb24gbWFrZVZpcnR1YWwoc3JjLCB0YXJnZXQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGhlYWQgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIHRhaWwgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgc2liLCBlbDtcblxuICB0aGlzLnJvb3QuaW5zZXJ0QmVmb3JlKGhlYWQsIHRoaXMucm9vdC5maXJzdENoaWxkKTtcbiAgdGhpcy5yb290LmFwcGVuZENoaWxkKHRhaWwpO1xuXG4gIHRoaXMuX18uaGVhZCA9IGVsID0gaGVhZDtcbiAgdGhpcy5fXy50YWlsID0gdGFpbDtcblxuICB3aGlsZSAoZWwpIHtcbiAgICBzaWIgPSBlbC5uZXh0U2libGluZztcbiAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICB0aGlzJDEuX18udmlydHMucHVzaChlbCk7IC8vIGhvbGQgZm9yIHVubW91bnRpbmdcbiAgICBlbCA9IHNpYjtcbiAgfVxuXG4gIGlmICh0YXJnZXQpXG4gICAgeyBzcmMuaW5zZXJ0QmVmb3JlKGZyYWcsIHRhcmdldC5fXy5oZWFkKTsgfVxuICBlbHNlXG4gICAgeyBzcmMuYXBwZW5kQ2hpbGQoZnJhZyk7IH1cbn1cblxuLyoqXG4gKiBNb3ZlIHZpcnR1YWwgdGFnIGFuZCBhbGwgY2hpbGQgbm9kZXNcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgTm9kZSB9IHNyYyAgLSB0aGUgbm9kZSB0aGF0IHdpbGwgZG8gdGhlIGluc2VydGluZ1xuICogQHBhcmFtIHsgVGFnIH0gdGFyZ2V0IC0gaW5zZXJ0IGJlZm9yZSB0aGlzIHRhZydzIGZpcnN0IGNoaWxkXG4gKi9cbmZ1bmN0aW9uIG1vdmVWaXJ0dWFsKHNyYywgdGFyZ2V0KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciBlbCA9IHRoaXMuX18uaGVhZCxcbiAgICBmcmFnID0gY3JlYXRlRnJhZygpLFxuICAgIHNpYjtcblxuICB3aGlsZSAoZWwpIHtcbiAgICBzaWIgPSBlbC5uZXh0U2libGluZztcbiAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICBlbCA9IHNpYjtcbiAgICBpZiAoZWwgPT09IHRoaXMkMS5fXy50YWlsKSB7XG4gICAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgIHNyYy5pbnNlcnRCZWZvcmUoZnJhZywgdGFyZ2V0Ll9fLmhlYWQpO1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgc2VsZWN0b3JzIGZvciB0YWdzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gdGFncyAtIHRhZyBuYW1lcyB0byBzZWxlY3RcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gc2VsZWN0b3JcbiAqL1xuZnVuY3Rpb24gc2VsZWN0VGFncyh0YWdzKSB7XG4gIC8vIHNlbGVjdCBhbGwgdGFnc1xuICBpZiAoIXRhZ3MpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKF9fVEFHX0lNUEwpO1xuICAgIHJldHVybiBrZXlzICsgc2VsZWN0VGFncyhrZXlzKVxuICB9XG5cbiAgcmV0dXJuIHRhZ3NcbiAgICAuZmlsdGVyKGZ1bmN0aW9uICh0KSB7IHJldHVybiAhL1teLVxcd10vLnRlc3QodCk7IH0pXG4gICAgLnJlZHVjZShmdW5jdGlvbiAobGlzdCwgdCkge1xuICAgICAgdmFyIG5hbWUgPSB0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIGxpc3QgKyBcIixbXCIgKyBJU19ESVJFQ1RJVkUgKyBcIj1cXFwiXCIgKyBuYW1lICsgXCJcXFwiXVwiXG4gICAgfSwgJycpXG59XG5cblxudmFyIHRhZ3MgPSBPYmplY3QuZnJlZXplKHtcblx0Z2V0VGFnOiBnZXRUYWcsXG5cdGluaGVyaXRGcm9tOiBpbmhlcml0RnJvbSxcblx0bW92ZUNoaWxkVGFnOiBtb3ZlQ2hpbGRUYWcsXG5cdGluaXRDaGlsZFRhZzogaW5pdENoaWxkVGFnLFxuXHRnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWc6IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyxcblx0dW5tb3VudEFsbDogdW5tb3VudEFsbCxcblx0Z2V0VGFnTmFtZTogZ2V0VGFnTmFtZSxcblx0Y2xlYW5VcERhdGE6IGNsZWFuVXBEYXRhLFxuXHRhcnJheWlzaEFkZDogYXJyYXlpc2hBZGQsXG5cdGFycmF5aXNoUmVtb3ZlOiBhcnJheWlzaFJlbW92ZSxcblx0bW91bnRUbzogbW91bnRUbyxcblx0bWFrZVJlcGxhY2VWaXJ0dWFsOiBtYWtlUmVwbGFjZVZpcnR1YWwsXG5cdG1ha2VWaXJ0dWFsOiBtYWtlVmlydHVhbCxcblx0bW92ZVZpcnR1YWw6IG1vdmVWaXJ0dWFsLFxuXHRzZWxlY3RUYWdzOiBzZWxlY3RUYWdzXG59KTtcblxuLyoqXG4gKiBSaW90IHB1YmxpYyBhcGlcbiAqL1xudmFyIHNldHRpbmdzID0gc2V0dGluZ3MkMTtcbnZhciB1dGlsID0ge1xuICB0bXBsOiB0bXBsLFxuICBicmFja2V0czogYnJhY2tldHMsXG4gIHN0eWxlTWFuYWdlcjogc3R5bGVNYW5hZ2VyLFxuICB2ZG9tOiBfX1RBR1NfQ0FDSEUsXG4gIHN0eWxlTm9kZTogc3R5bGVNYW5hZ2VyLnN0eWxlTm9kZSxcbiAgLy8gZXhwb3J0IHRoZSByaW90IGludGVybmFsIHV0aWxzIGFzIHdlbGxcbiAgZG9tOiBkb20sXG4gIGNoZWNrOiBjaGVjayxcbiAgbWlzYzogbWlzYyxcbiAgdGFnczogdGFnc1xufTtcblxuLy8gZXhwb3J0IHRoZSBjb3JlIHByb3BzL21ldGhvZHNcbnZhciBUYWckJDEgPSBUYWckMjtcbnZhciB0YWckJDEgPSB0YWckMTtcbnZhciB0YWcyJCQxID0gdGFnMiQxO1xudmFyIG1vdW50JCQxID0gbW91bnQkMTtcbnZhciBtaXhpbiQkMSA9IG1peGluJDE7XG52YXIgdXBkYXRlJCQxID0gdXBkYXRlJDE7XG52YXIgdW5yZWdpc3RlciQkMSA9IHVucmVnaXN0ZXIkMTtcbnZhciB2ZXJzaW9uJCQxID0gdmVyc2lvbiQxO1xudmFyIG9ic2VydmFibGUgPSBvYnNlcnZhYmxlJDE7XG5cbnZhciByaW90JDEgPSBleHRlbmQoe30sIGNvcmUsIHtcbiAgb2JzZXJ2YWJsZTogb2JzZXJ2YWJsZSQxLFxuICBzZXR0aW5nczogc2V0dGluZ3MsXG4gIHV0aWw6IHV0aWwsXG59KTtcblxuZXhwb3J0cy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuZXhwb3J0cy51dGlsID0gdXRpbDtcbmV4cG9ydHMuVGFnID0gVGFnJCQxO1xuZXhwb3J0cy50YWcgPSB0YWckJDE7XG5leHBvcnRzLnRhZzIgPSB0YWcyJCQxO1xuZXhwb3J0cy5tb3VudCA9IG1vdW50JCQxO1xuZXhwb3J0cy5taXhpbiA9IG1peGluJCQxO1xuZXhwb3J0cy51cGRhdGUgPSB1cGRhdGUkJDE7XG5leHBvcnRzLnVucmVnaXN0ZXIgPSB1bnJlZ2lzdGVyJCQxO1xuZXhwb3J0cy52ZXJzaW9uID0gdmVyc2lvbiQkMTtcbmV4cG9ydHMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGU7XG5leHBvcnRzWydkZWZhdWx0J10gPSByaW90JDE7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmlvdC9yaW90LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cywgcmVxdWlyZSgncmlvdCcpKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnLCAncmlvdCddLCBmYWN0b3J5KSA6XG5cdChmYWN0b3J5KChnbG9iYWwucmlvdEhvdFJlbG9hZCA9IGdsb2JhbC5yaW90SG90UmVsb2FkIHx8IHt9KSxnbG9iYWwucmlvdCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMscmlvdCkgeyAndXNlIHN0cmljdCc7XG5cbnZhciBub25TdGF0ZSA9ICdpc01vdW50ZWQgb3B0cycuc3BsaXQoJyAnKTtcblxuZnVuY3Rpb24gcmVsb2FkKG5hbWUpIHtcbiAgcmlvdC51dGlsLnN0eWxlTWFuYWdlci5pbmplY3QoKTtcblxuICB2YXIgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKChuYW1lICsgXCIsIFtkYXRhLWlzPVwiICsgbmFtZSArIFwiXVwiKSk7XG4gIHZhciB0YWdzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlbCA9IGVsZW1zW2ldLCBvbGRUYWcgPSBlbC5fdGFnLCB2O1xuICAgIHJlbG9hZC50cmlnZ2VyKCdiZWZvcmUtdW5tb3VudCcsIG9sZFRhZyk7XG4gICAgb2xkVGFnLnVubW91bnQodHJ1ZSk7IC8vIGRldGFjaCB0aGUgb2xkIHRhZ1xuXG4gICAgLy8gcmVzZXQgdGhlIGlubmVySFRNTCBhbmQgYXR0cmlidXRlcyB0byBob3cgdGhleSB3ZXJlIGJlZm9yZSBtb3VudFxuICAgIGVsLmlubmVySFRNTCA9IG9sZFRhZy5fXy5pbm5lckhUTUw7XG4gICAgKG9sZFRhZy5fXy5pbnN0QXR0cnMgfHwgW10pLm1hcChmdW5jdGlvbihhdHRyKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTtcbiAgICB9KTtcblxuICAgIC8vIGNvcHkgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGhlIG5ldyB0YWdcbiAgICB2YXIgbmV3T3B0cyA9IHt9O1xuICAgIGZvcihrZXkgaW4gb2xkVGFnLm9wdHMpIHtcbiAgICAgIG5ld09wdHNba2V5XSA9IG9sZFRhZy5vcHRzW2tleV07XG4gICAgfVxuICAgIG5ld09wdHMucGFyZW50ID0gb2xkVGFnLnBhcmVudDtcblxuICAgIC8vIGNyZWF0ZSB0aGUgbmV3IHRhZ1xuICAgIHJlbG9hZC50cmlnZ2VyKCdiZWZvcmUtbW91bnQnLCBuZXdPcHRzLCBvbGRUYWcpO1xuICAgIHZhciBuZXdUYWcgPSByaW90Lm1vdW50KGVsLCBuZXdPcHRzKVswXTtcblxuICAgIC8vIGNvcHkgc3RhdGUgZnJvbSB0aGUgb2xkIHRvIG5ldyB0YWdcbiAgICBmb3IodmFyIGtleSBpbiBvbGRUYWcpIHtcbiAgICAgIHYgPSBvbGRUYWdba2V5XTtcbiAgICAgIGlmICh+bm9uU3RhdGUuaW5kZXhPZihrZXkpKSB7IGNvbnRpbnVlIH1cbiAgICAgIG5ld1RhZ1trZXldID0gdjtcbiAgICB9XG4gICAgbmV3VGFnLnVwZGF0ZSgpO1xuICAgIHRhZ3MucHVzaChuZXdUYWcpO1xuICAgIHJlbG9hZC50cmlnZ2VyKCdhZnRlci1tb3VudCcsIG5ld1RhZywgb2xkVGFnKTtcbiAgfVxuXG4gIHJldHVybiB0YWdzXG59XG5cbnJpb3Qub2JzZXJ2YWJsZShyZWxvYWQpO1xucmlvdC5yZWxvYWQgPSByZWxvYWQ7XG5pZiAocmlvdC5kZWZhdWx0KSB7IHJpb3QuZGVmYXVsdC5yZWxvYWQgPSByZWxvYWQ7IH1cblxuZXhwb3J0cy5yZWxvYWQgPSByZWxvYWQ7XG5leHBvcnRzWydkZWZhdWx0J10gPSByZWxvYWQ7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmlvdC1ob3QtcmVsb2FkL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuICAgIHZhciByaW90ID0gcmVxdWlyZSgncmlvdCcpXG4gICAgLy9zcmM6IEM6L2Rldi9qcy9yaW90anMvaWxhbi1hcmNoL3NyYy93ZWJwYWNrL3JhbmRvbS50YWdcbmltcG9ydCAnLi9sb2dzLnRhZyc7XG5yaW90LnRhZzIoJ3JhbmRvbScsXG4gICc8aDM+e29wdHMudGl0bGV9PC9oMz4gPGJ1dHRvbiBvbmNsaWNrPVwie2dlbmVyYXRlfVwiPiBHZW5lcmF0ZSA8L2J1dHRvbj4gPGgxPiB7bnVtYmVyfSA8L2gxPiA8aW1nIHNyYz1cInN2Zy1sb2dvLWguc3ZnXCIgaGVpZ2h0PVwiMzBcIj4gPGxvZ3MgbG9ncz1cIntsb2dzfVwiIG9uY2xlYXI9XCJ7Y2xlYXJMb2dzfVwiPjwvbG9ncz4nLFxuICAncmFuZG9tIGgxLFtkYXRhLWlzPVwicmFuZG9tXCJdIGgxeyBjb2xvcjogcmVkOyB9JyxcbiAgJycsIGZ1bmN0aW9uKG9wdHMpIHtcbnZhciBfdGhpcyA9IHRoaXM7XG5cbnRoaXMubnVtYmVyID0gbnVsbDtcbnRoaXMubG9ncyA9IFtdO1xuXG50aGlzLmdlbmVyYXRlID0gZSA9PiB7XG4gIF90aGlzLmxvZ3MucHVzaCh7IHRleHQ6IGBHZW5lcmF0ZSBidXR0b24gY2xpY2tlZC4gRXZlbiB0eXBlIGlzICR7ZS50eXBlfWAgfSk7XG4gIF90aGlzLm51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwKTtcbn07XG5cbnRoaXMuY2xlYXJMb2dzID0gZSA9PiB7XG4gIF90aGlzLmxvZ3MgPSBbXTtcbn07XG5cbnRoaXMuZ2VuZXJhdGUoeyB0eXBlOiAnY3VzdG9tJyB9KTtcbn0pO1xuXG4gICAgXG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYnBhY2svcmFuZG9tLnRhZ1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcmlvdCBmcm9tICdyaW90J1xyXG5pbXBvcnQgJ3Jpb3QtaG90LXJlbG9hZCdcclxuaW1wb3J0ICcuL3JhbmRvbS50YWcnXHJcblxyXG5yaW90Lm1vdW50KCdyYW5kb20nLCB7XHJcbiAgdGl0bGU6ICdIaSB0aGVyZSEnXHJcbn0pXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3dlYnBhY2svYXBwLmpzIiwiXG4gICAgdmFyIHJpb3QgPSByZXF1aXJlKCdyaW90JylcbiAgICAvL3NyYzogQzovZGV2L2pzL3Jpb3Rqcy9pbGFuLWFyY2gvc3JjL3dlYnBhY2svbG9ncy50YWdcbnJpb3QudGFnMignbG9ncycsXG4gICc8aDQ+TG9nczwvaDQ+IDxidXR0b24gb25jbGljaz1cIntvcHRzLm9uY2xlYXJ9XCI+IENsZWFyIGxvZ3MgPC9idXR0b24+IDx1bD4gPGxpIGVhY2g9XCJ7b3B0cy5sb2dzfVwiPnt0ZXh0fTwvbGk+IDwvdWw+JyxcbiAgJycsXG4gICcnLCBmdW5jdGlvbihvcHRzKSB7XG59KTtcblxuICAgIFxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93ZWJwYWNrL2xvZ3MudGFnXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=