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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logs_tag_html__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logs_tag_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__logs_tag_html__);

    var riot = __webpack_require__(0)
    //src: C:/dev/js/riotjs/ilan-arch/src/webpack/random.tag.html

riot.tag2('random',
  '<h3>{opts.title}</h3> <button onclick="{generate}"> Generate </button> <h1> {number} </h1> <img src="svg-logo-h.svg" height="30"> <logs logs="{logs}" onclear="{clearLogs}"></logs>',
  'random h1,[data-is="random"] h1{ color: red; }',
  '', function(opts) {

    this.number = null
    this.logs = []

    this.generate = (e) => {
      this.logs.push({ text: `Generate button clicked. Even type is ${ e.type }` })
      this.number = Math.floor(Math.random()*10000)
    }

    this.clearLogs = (e) => {
      this.logs = []
    }

    this.generate({ type: 'custom' })
});

    
  if (false) {
    module.hot.accept()
    if (module.hot.data) {
      riot.reload('random')
    }
  }
  

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _riot = __webpack_require__(0);

var _riot2 = _interopRequireDefault(_riot);

__webpack_require__(1);

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_riot2.default.mount('random', {
  title: 'Hi there!'
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


    var riot = __webpack_require__(0)
    //src: C:/dev/js/riotjs/ilan-arch/src/webpack/logs.tag.html
riot.tag2('logs',
  '<h4>Logs</h4> <button onclick="{opts.onclear}"> Clear logs </button> <ul> <li each="{opts.logs}">{text}</li> </ul>',
  '',
  '', function(opts) {
});

    
  if (false) {
    module.hot.accept()
    if (module.hot.data) {
      riot.reload('logs')
    }
  }
  

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2NkNDZkOWFlNWY3NmVjMzgxNDQiLCJ3ZWJwYWNrOi8vLy4vfi9yaW90L3Jpb3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yaW90LWhvdC1yZWxvYWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3dlYnBhY2svcmFuZG9tLnRhZy5odG1sIiwid2VicGFjazovLy8uL3NyYy93ZWJwYWNrL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvd2VicGFjay9sb2dzLnRhZy5odG1sIl0sIm5hbWVzIjpbIm1vdW50IiwidGl0bGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQyxDQUFDLDRCQUE0Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELEdBQUcsR0FBRztBQUMvRCxpQ0FBaUM7QUFDakM7QUFDQSwyQ0FBMkM7O0FBRTNDO0FBQ0E7QUFDQSxhQUFhLFNBQVM7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QUNBOztBQUNBOzs7O0FBRUEsZUFBS0EsS0FBTCxDQUFXLFFBQVgsRUFBcUI7QUFDbkJDLFNBQU87QUFEWSxDQUFyQixFOzs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGFBQWEsd0NBQXdDLFVBQVUsR0FBRyxLQUFLO0FBQzFHO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjY2Q0NmQ5YWU1Zjc2ZWMzODE0NCIsIi8qIFJpb3QgdjMuNi4wLCBAbGljZW5zZSBNSVQgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcblx0KGZhY3RvcnkoKGdsb2JhbC5yaW90ID0gZ2xvYmFsLnJpb3QgfHwge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbnZhciBfX1RBR1NfQ0FDSEUgPSBbXTtcbnZhciBfX1RBR19JTVBMID0ge307XG52YXIgR0xPQkFMX01JWElOID0gJ19fZ2xvYmFsX21peGluJztcbnZhciBBVFRSU19QUkVGSVggPSAncmlvdC0nO1xudmFyIFJFRl9ESVJFQ1RJVkVTID0gWydyZWYnLCAnZGF0YS1yZWYnXTtcbnZhciBJU19ESVJFQ1RJVkUgPSAnZGF0YS1pcyc7XG52YXIgQ09ORElUSU9OQUxfRElSRUNUSVZFID0gJ2lmJztcbnZhciBMT09QX0RJUkVDVElWRSA9ICdlYWNoJztcbnZhciBMT09QX05PX1JFT1JERVJfRElSRUNUSVZFID0gJ25vLXJlb3JkZXInO1xudmFyIFNIT1dfRElSRUNUSVZFID0gJ3Nob3cnO1xudmFyIEhJREVfRElSRUNUSVZFID0gJ2hpZGUnO1xudmFyIFJJT1RfRVZFTlRTX0tFWSA9ICdfX3Jpb3QtZXZlbnRzX18nO1xudmFyIFRfU1RSSU5HID0gJ3N0cmluZyc7XG52YXIgVF9PQkpFQ1QgPSAnb2JqZWN0JztcbnZhciBUX1VOREVGICA9ICd1bmRlZmluZWQnO1xudmFyIFRfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xudmFyIFhMSU5LX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xudmFyIFNWR19OUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG52YXIgWExJTktfUkVHRVggPSAvXnhsaW5rOihcXHcrKS87XG52YXIgV0lOID0gdHlwZW9mIHdpbmRvdyA9PT0gVF9VTkRFRiA/IHVuZGVmaW5lZCA6IHdpbmRvdztcbnZhciBSRV9TUEVDSUFMX1RBR1MgPSAvXig/OnQoPzpib2R5fGhlYWR8Zm9vdHxbcmhkXSl8Y2FwdGlvbnxjb2woPzpncm91cCk/fG9wdCg/Omlvbnxncm91cCkpJC87XG52YXIgUkVfU1BFQ0lBTF9UQUdTX05PX09QVElPTiA9IC9eKD86dCg/OmJvZHl8aGVhZHxmb290fFtyaGRdKXxjYXB0aW9ufGNvbCg/Omdyb3VwKT8pJC87XG52YXIgUkVfRVZFTlRTX1BSRUZJWCA9IC9eb24vO1xudmFyIFJFX1JFU0VSVkVEX05BTUVTID0gL14oPzpfKD86aXRlbXxpZHxwYXJlbnQpfHVwZGF0ZXxyb290fCg/OnVuKT9tb3VudHxtaXhpbnxpcyg/Ok1vdW50ZWR8TG9vcCl8dGFnc3xyZWZzfHBhcmVudHxvcHRzfHRyaWdnZXJ8byg/Om58ZmZ8bmUpKSQvO1xudmFyIFJFX0hUTUxfQVRUUlMgPSAvKFstXFx3XSspID89ID8oPzpcIihbXlwiXSopfCcoW14nXSopfCh7W159XSp9KSkvZztcbnZhciBDQVNFX1NFTlNJVElWRV9BVFRSSUJVVEVTID0geyAndmlld2JveCc6ICd2aWV3Qm94JyB9O1xudmFyIFJFX0JPT0xfQVRUUlMgPSAvXig/OmRpc2FibGVkfGNoZWNrZWR8cmVhZG9ubHl8cmVxdWlyZWR8YWxsb3dmdWxsc2NyZWVufGF1dG8oPzpmb2N1c3xwbGF5KXxjb21wYWN0fGNvbnRyb2xzfGRlZmF1bHR8Zm9ybW5vdmFsaWRhdGV8aGlkZGVufGlzbWFwfGl0ZW1zY29wZXxsb29wfG11bHRpcGxlfG11dGVkfG5vKD86cmVzaXplfHNoYWRlfHZhbGlkYXRlfHdyYXApP3xvcGVufHJldmVyc2VkfHNlYW1sZXNzfHNlbGVjdGVkfHNvcnRhYmxlfHRydWVzcGVlZHx0eXBlbXVzdG1hdGNoKSQvO1xudmFyIElFX1ZFUlNJT04gPSAoV0lOICYmIFdJTi5kb2N1bWVudCB8fCB7fSkuZG9jdW1lbnRNb2RlIHwgMDtcblxuLyoqXG4gKiBDaGVjayBDaGVjayBpZiB0aGUgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbEF0dHIodmFsdWUpIHtcbiAgcmV0dXJuIFJFX0JPT0xfQVRUUlMudGVzdCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBmdW5jdGlvblxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfRlVOQ1RJT05cbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYW4gb2JqZWN0LCBleGNsdWRlIG51bGxcbiAqIE5PVEU6IHVzZSBpc09iamVjdCh4KSAmJiAhaXNBcnJheSh4KSB0byBleGNsdWRlcyBhcnJheXMuXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFRfT0JKRUNUIC8vIHR5cGVvZiBudWxsIGlzICdvYmplY3QnXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBUX1VOREVGXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgc3RyaW5nXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfU1RSSU5HXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGVtcHR5LiBEaWZmZXJlbnQgZnJvbSBmYWxzeSwgYmVjYXVzZSB3ZSBkb250IGNvbnNpZGVyIDAgb3IgZmFsc2UgdG8gYmUgYmxhbmtcbiAqIEBwYXJhbSB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQmxhbmsodmFsdWUpIHtcbiAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJydcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBraW5kIG9mIGFycmF5XG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIG9iamVjdCdzIHByb3BlcnR5IGNvdWxkIGJlIG92ZXJyaWRkZW5cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG9iaiAtIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIGtleSAtIG9iamVjdCBwcm9wZXJ0eVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1dyaXRhYmxlKG9iaiwga2V5KSB7XG4gIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gIHJldHVybiBpc1VuZGVmaW5lZChvYmpba2V5XSkgfHwgZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgcmVzZXJ2ZWQgbmFtZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWROYW1lKHZhbHVlKSB7XG4gIHJldHVybiBSRV9SRVNFUlZFRF9OQU1FUy50ZXN0KHZhbHVlKVxufVxuXG52YXIgY2hlY2sgPSBPYmplY3QuZnJlZXplKHtcblx0aXNCb29sQXR0cjogaXNCb29sQXR0cixcblx0aXNGdW5jdGlvbjogaXNGdW5jdGlvbixcblx0aXNPYmplY3Q6IGlzT2JqZWN0LFxuXHRpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG5cdGlzU3RyaW5nOiBpc1N0cmluZyxcblx0aXNCbGFuazogaXNCbGFuayxcblx0aXNBcnJheTogaXNBcnJheSxcblx0aXNXcml0YWJsZTogaXNXcml0YWJsZSxcblx0aXNSZXNlcnZlZE5hbWU6IGlzUmVzZXJ2ZWROYW1lXG59KTtcblxuLyoqXG4gKiBTaG9ydGVyIGFuZCBmYXN0IHdheSB0byBzZWxlY3QgbXVsdGlwbGUgbm9kZXMgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIERPTSBzZWxlY3RvclxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBET00gbm9kZSB3aGVyZSB0aGUgdGFyZ2V0cyBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZXMgZm91bmRcbiAqL1xuZnVuY3Rpb24gJCQoc2VsZWN0b3IsIGN0eCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoKGN0eCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG59XG5cbi8qKlxuICogU2hvcnRlciBhbmQgZmFzdCB3YXkgdG8gc2VsZWN0IGEgc2luZ2xlIG5vZGUgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIHVuaXF1ZSBkb20gc2VsZWN0b3JcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gRE9NIG5vZGUgd2hlcmUgdGhlIHRhcmdldCBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZSBmb3VuZFxuICovXG5mdW5jdGlvbiAkKHNlbGVjdG9yLCBjdHgpIHtcbiAgcmV0dXJuIChjdHggfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9jdW1lbnQgZnJhZ21lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRnJhZygpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRvY3VtZW50IHRleHQgbm9kZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjcmVhdGUgYSB0ZXh0IG5vZGUgdG8gdXNlIGFzIHBsYWNlaG9sZGVyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURPTVBsYWNlaG9sZGVyKCkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBET00gbm9kZSBpcyBhbiBzdmcgdGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gIGVsIC0gbm9kZSB3ZSB3YW50IHRvIHRlc3RcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIGl0J3MgYW4gc3ZnIG5vZGVcbiAqL1xuZnVuY3Rpb24gaXNTdmcoZWwpIHtcbiAgcmV0dXJuICEhZWwub3duZXJTVkdFbGVtZW50XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZ2VuZXJpYyBET00gbm9kZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgRE9NIG5vZGUgd2Ugd2FudCB0byBjcmVhdGVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzU3ZnIC0gdHJ1ZSBpZiB3ZSBuZWVkIHRvIHVzZSBhbiBzdmcgbm9kZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBET00gbm9kZSBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gbWtFbChuYW1lKSB7XG4gIHJldHVybiBuYW1lID09PSAnc3ZnJyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTlMsIG5hbWUpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxufVxuXG4vKipcbiAqIFNldCB0aGUgaW5uZXIgaHRtbCBvZiBhbnkgRE9NIG5vZGUgU1ZHcyBpbmNsdWRlZFxuICogQHBhcmFtIHsgT2JqZWN0IH0gY29udGFpbmVyIC0gRE9NIG5vZGUgd2hlcmUgd2UnbGwgaW5qZWN0IG5ldyBodG1sXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBodG1sIC0gaHRtbCB0byBpbmplY3RcbiAqL1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmZ1bmN0aW9uIHNldElubmVySFRNTChjb250YWluZXIsIGh0bWwpIHtcbiAgaWYgKCFpc1VuZGVmaW5lZChjb250YWluZXIuaW5uZXJIVE1MKSlcbiAgICB7IGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sOyB9XG4gICAgLy8gc29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCBpbm5lckhUTUwgb24gdGhlIFNWR3MgdGFnc1xuICBlbHNlIHtcbiAgICB2YXIgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAnYXBwbGljYXRpb24veG1sJyk7XG4gICAgdmFyIG5vZGUgPSBjb250YWluZXIub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRvYy5kb2N1bWVudEVsZW1lbnQsIHRydWUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiBhbnkgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gaGlkZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gc2hvdyAtIGRvIHdlIHdhbnQgdG8gc2hvdyBpdD9cbiAqL1xuXG5mdW5jdGlvbiB0b2dnbGVWaXNpYmlsaXR5KGRvbSwgc2hvdykge1xuICBkb20uc3R5bGUuZGlzcGxheSA9IHNob3cgPyAnJyA6ICdub25lJztcbiAgZG9tWydoaWRkZW4nXSA9IHNob3cgPyBmYWxzZSA6IHRydWU7XG59XG5cbi8qKlxuICogUmVtb3ZlIGFueSBET00gYXR0cmlidXRlIGZyb20gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHJlbW92ZVxuICovXG5mdW5jdGlvbiByZW1BdHRyKGRvbSwgbmFtZSkge1xuICBkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHlsZSBvYmplY3QgdG8gYSBzdHJpbmdcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gc3R5bGUgLSBzdHlsZSBvYmplY3Qgd2UgbmVlZCB0byBwYXJzZVxuICogQHJldHVybnMgeyBTdHJpbmcgfSByZXN1bHRpbmcgY3NzIHN0cmluZ1xuICogQGV4YW1wbGVcbiAqIHN0eWxlT2JqZWN0VG9TdHJpbmcoeyBjb2xvcjogJ3JlZCcsIGhlaWdodDogJzEwcHgnfSkgLy8gPT4gJ2NvbG9yOiByZWQ7IGhlaWdodDogMTBweCdcbiAqL1xuZnVuY3Rpb24gc3R5bGVPYmplY3RUb1N0cmluZyhzdHlsZSkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoc3R5bGUpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwcm9wKSB7XG4gICAgcmV0dXJuIChhY2MgKyBcIiBcIiArIHByb3AgKyBcIjogXCIgKyAoc3R5bGVbcHJvcF0pICsgXCI7XCIpXG4gIH0sICcnKVxufVxuXG4vKipcbiAqIEdldCB0aGUgdmFsdWUgb2YgYW55IERPTSBhdHRyaWJ1dGUgb24gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB3ZSB3YW50IHRvIGdldFxuICogQHJldHVybnMgeyBTdHJpbmcgfCB1bmRlZmluZWQgfSBuYW1lIG9mIHRoZSBub2RlIGF0dHJpYnV0ZSB3aGV0aGVyIGl0IGV4aXN0c1xuICovXG5mdW5jdGlvbiBnZXRBdHRyKGRvbSwgbmFtZSkge1xuICByZXR1cm4gZG9tLmdldEF0dHJpYnV0ZShuYW1lKVxufVxuXG4vKipcbiAqIFNldCBhbnkgRE9NIGF0dHJpYnV0ZVxuICogQHBhcmFtIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byB1cGRhdGVcbiAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHNldFxuICogQHBhcmFtIHsgU3RyaW5nIH0gdmFsIC0gdmFsdWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gc2V0XG4gKi9cbmZ1bmN0aW9uIHNldEF0dHIoZG9tLCBuYW1lLCB2YWwpIHtcbiAgdmFyIHhsaW5rID0gWExJTktfUkVHRVguZXhlYyhuYW1lKTtcbiAgaWYgKHhsaW5rICYmIHhsaW5rWzFdKVxuICAgIHsgZG9tLnNldEF0dHJpYnV0ZU5TKFhMSU5LX05TLCB4bGlua1sxXSwgdmFsKTsgfVxuICBlbHNlXG4gICAgeyBkb20uc2V0QXR0cmlidXRlKG5hbWUsIHZhbCk7IH1cbn1cblxuLyoqXG4gKiBJbnNlcnQgc2FmZWx5IGEgdGFnIHRvIGZpeCAjMTk2MiAjMTY0OVxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBjaGlsZHJlbiBjb250YWluZXJcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBjdXJyIC0gbm9kZSB0byBpbnNlcnRcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBuZXh0IC0gbm9kZSB0aGF0IHNob3VsZCBwcmVjZWVkIHRoZSBjdXJyZW50IG5vZGUgaW5zZXJ0ZWRcbiAqL1xuZnVuY3Rpb24gc2FmZUluc2VydChyb290LCBjdXJyLCBuZXh0KSB7XG4gIHJvb3QuaW5zZXJ0QmVmb3JlKGN1cnIsIG5leHQucGFyZW50Tm9kZSAmJiBuZXh0KTtcbn1cblxuLyoqXG4gKiBNaW5pbWl6ZSByaXNrOiBvbmx5IHplcm8gb3Igb25lIF9zcGFjZV8gYmV0d2VlbiBhdHRyICYgdmFsdWVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBodG1sIC0gaHRtbCBzdHJpbmcgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gYXBwbHkgb24gYW55IGF0dHJpYnV0ZSBmb3VuZFxuICovXG5mdW5jdGlvbiB3YWxrQXR0cnMoaHRtbCwgZm4pIHtcbiAgaWYgKCFodG1sKVxuICAgIHsgcmV0dXJuIH1cbiAgdmFyIG07XG4gIHdoaWxlIChtID0gUkVfSFRNTF9BVFRSUy5leGVjKGh0bWwpKVxuICAgIHsgZm4obVsxXS50b0xvd2VyQ2FzZSgpLCBtWzJdIHx8IG1bM10gfHwgbVs0XSk7IH1cbn1cblxuLyoqXG4gKiBXYWxrIGRvd24gcmVjdXJzaXZlbHkgYWxsIHRoZSBjaGlsZHJlbiB0YWdzIHN0YXJ0aW5nIGRvbSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICAgZG9tIC0gc3RhcnRpbmcgbm9kZSB3aGVyZSB3ZSB3aWxsIHN0YXJ0IHRoZSByZWN1cnNpb25cbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIHRvIHRyYW5zZm9ybSB0aGUgY2hpbGQgbm9kZSBqdXN0IGZvdW5kXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICAgY29udGV4dCAtIGZuIGNhbiBvcHRpb25hbGx5IHJldHVybiBhbiBvYmplY3QsIHdoaWNoIGlzIHBhc3NlZCB0byBjaGlsZHJlblxuICovXG5mdW5jdGlvbiB3YWxrTm9kZXMoZG9tLCBmbiwgY29udGV4dCkge1xuICBpZiAoZG9tKSB7XG4gICAgdmFyIHJlcyA9IGZuKGRvbSwgY29udGV4dCk7XG4gICAgdmFyIG5leHQ7XG4gICAgLy8gc3RvcCB0aGUgcmVjdXJzaW9uXG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuICAgIGRvbSA9IGRvbS5maXJzdENoaWxkO1xuXG4gICAgd2hpbGUgKGRvbSkge1xuICAgICAgbmV4dCA9IGRvbS5uZXh0U2libGluZztcbiAgICAgIHdhbGtOb2Rlcyhkb20sIGZuLCByZXMpO1xuICAgICAgZG9tID0gbmV4dDtcbiAgICB9XG4gIH1cbn1cblxudmFyIGRvbSA9IE9iamVjdC5mcmVlemUoe1xuXHQkJDogJCQsXG5cdCQ6ICQsXG5cdGNyZWF0ZUZyYWc6IGNyZWF0ZUZyYWcsXG5cdGNyZWF0ZURPTVBsYWNlaG9sZGVyOiBjcmVhdGVET01QbGFjZWhvbGRlcixcblx0aXNTdmc6IGlzU3ZnLFxuXHRta0VsOiBta0VsLFxuXHRzZXRJbm5lckhUTUw6IHNldElubmVySFRNTCxcblx0dG9nZ2xlVmlzaWJpbGl0eTogdG9nZ2xlVmlzaWJpbGl0eSxcblx0cmVtQXR0cjogcmVtQXR0cixcblx0c3R5bGVPYmplY3RUb1N0cmluZzogc3R5bGVPYmplY3RUb1N0cmluZyxcblx0Z2V0QXR0cjogZ2V0QXR0cixcblx0c2V0QXR0cjogc2V0QXR0cixcblx0c2FmZUluc2VydDogc2FmZUluc2VydCxcblx0d2Fsa0F0dHJzOiB3YWxrQXR0cnMsXG5cdHdhbGtOb2Rlczogd2Fsa05vZGVzXG59KTtcblxudmFyIHN0eWxlTm9kZTtcbnZhciBjc3NUZXh0UHJvcDtcbnZhciBieU5hbWUgPSB7fTtcbnZhciByZW1haW5kZXIgPSBbXTtcbnZhciBuZWVkc0luamVjdCA9IGZhbHNlO1xuXG4vLyBza2lwIHRoZSBmb2xsb3dpbmcgY29kZSBvbiB0aGUgc2VydmVyXG5pZiAoV0lOKSB7XG4gIHN0eWxlTm9kZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLy8gY3JlYXRlIGEgbmV3IHN0eWxlIGVsZW1lbnQgd2l0aCB0aGUgY29ycmVjdCB0eXBlXG4gICAgdmFyIG5ld05vZGUgPSBta0VsKCdzdHlsZScpO1xuICAgIHNldEF0dHIobmV3Tm9kZSwgJ3R5cGUnLCAndGV4dC9jc3MnKTtcblxuICAgIC8vIHJlcGxhY2UgYW55IHVzZXIgbm9kZSBvciBpbnNlcnQgdGhlIG5ldyBvbmUgaW50byB0aGUgaGVhZFxuICAgIHZhciB1c2VyTm9kZSA9ICQoJ3N0eWxlW3R5cGU9cmlvdF0nKTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh1c2VyTm9kZSkge1xuICAgICAgaWYgKHVzZXJOb2RlLmlkKSB7IG5ld05vZGUuaWQgPSB1c2VyTm9kZS5pZDsgfVxuICAgICAgdXNlck5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgdXNlck5vZGUpO1xuICAgIH1cbiAgICBlbHNlIHsgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChuZXdOb2RlKTsgfVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbiAgfSkoKTtcbiAgY3NzVGV4dFByb3AgPSBzdHlsZU5vZGUuc3R5bGVTaGVldDtcbn1cblxuLyoqXG4gKiBPYmplY3QgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaW5qZWN0IGFuZCBtYW5hZ2UgdGhlIGNzcyBvZiBldmVyeSB0YWcgaW5zdGFuY2VcbiAqL1xudmFyIHN0eWxlTWFuYWdlciA9IHtcbiAgc3R5bGVOb2RlOiBzdHlsZU5vZGUsXG4gIC8qKlxuICAgKiBTYXZlIGEgdGFnIHN0eWxlIHRvIGJlIGxhdGVyIGluamVjdGVkIGludG8gRE9NXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IGNzcyAtIGNzcyBzdHJpbmdcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIGlmIGl0J3MgcGFzc2VkIHdlIHdpbGwgbWFwIHRoZSBjc3MgdG8gYSB0YWduYW1lXG4gICAqL1xuICBhZGQ6IGZ1bmN0aW9uIGFkZChjc3MsIG5hbWUpIHtcbiAgICBpZiAobmFtZSkgeyBieU5hbWVbbmFtZV0gPSBjc3M7IH1cbiAgICBlbHNlIHsgcmVtYWluZGVyLnB1c2goY3NzKTsgfVxuICAgIG5lZWRzSW5qZWN0ID0gdHJ1ZTtcbiAgfSxcbiAgLyoqXG4gICAqIEluamVjdCBhbGwgcHJldmlvdXNseSBzYXZlZCB0YWcgc3R5bGVzIGludG8gRE9NXG4gICAqIGlubmVySFRNTCBzZWVtcyBzbG93OiBodHRwOi8vanNwZXJmLmNvbS9yaW90LWluc2VydC1zdHlsZVxuICAgKi9cbiAgaW5qZWN0OiBmdW5jdGlvbiBpbmplY3QoKSB7XG4gICAgaWYgKCFXSU4gfHwgIW5lZWRzSW5qZWN0KSB7IHJldHVybiB9XG4gICAgbmVlZHNJbmplY3QgPSBmYWxzZTtcbiAgICB2YXIgc3R5bGUgPSBPYmplY3Qua2V5cyhieU5hbWUpXG4gICAgICAubWFwKGZ1bmN0aW9uKGspIHsgcmV0dXJuIGJ5TmFtZVtrXSB9KVxuICAgICAgLmNvbmNhdChyZW1haW5kZXIpLmpvaW4oJ1xcbicpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgaWYgKGNzc1RleHRQcm9wKSB7IGNzc1RleHRQcm9wLmNzc1RleHQgPSBzdHlsZTsgfVxuICAgIGVsc2UgeyBzdHlsZU5vZGUuaW5uZXJIVE1MID0gc3R5bGU7IH1cbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgcmlvdCB0ZW1wbGF0ZSBlbmdpbmVcbiAqIEB2ZXJzaW9uIHYzLjAuOFxuICovXG5cbnZhciBza2lwUmVnZXggPSAoZnVuY3Rpb24gKCkgeyAvL2VzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICB2YXIgYmVmb3JlUmVDaGFycyA9ICdbeygsOzo/PXwmIV5+PiUqLyc7XG5cbiAgdmFyIGJlZm9yZVJlV29yZHMgPSBbXG4gICAgJ2Nhc2UnLFxuICAgICdkZWZhdWx0JyxcbiAgICAnZG8nLFxuICAgICdlbHNlJyxcbiAgICAnaW4nLFxuICAgICdpbnN0YW5jZW9mJyxcbiAgICAncHJlZml4JyxcbiAgICAncmV0dXJuJyxcbiAgICAndHlwZW9mJyxcbiAgICAndm9pZCcsXG4gICAgJ3lpZWxkJ1xuICBdO1xuXG4gIHZhciB3b3Jkc0xhc3RDaGFyID0gYmVmb3JlUmVXb3Jkcy5yZWR1Y2UoZnVuY3Rpb24gKHMsIHcpIHtcbiAgICByZXR1cm4gcyArIHcuc2xpY2UoLTEpXG4gIH0sICcnKTtcblxuICB2YXIgUkVfUkVHRVggPSAvXlxcLyg/PVteKj4vXSlbXlsvXFxcXF0qKD86KD86XFxcXC58XFxbKD86XFxcXC58W15cXF1cXFxcXSopKlxcXSlbXltcXFxcL10qKSo/XFwvW2dpbXV5XSovO1xuICB2YXIgUkVfVk5fQ0hBUiA9IC9bJFxcd10vO1xuXG4gIGZ1bmN0aW9uIHByZXYgKGNvZGUsIHBvcykge1xuICAgIHdoaWxlICgtLXBvcyA+PSAwICYmIC9cXHMvLnRlc3QoY29kZVtwb3NdKSl7ICB9XG4gICAgcmV0dXJuIHBvc1xuICB9XG5cbiAgZnVuY3Rpb24gX3NraXBSZWdleCAoY29kZSwgc3RhcnQpIHtcblxuICAgIHZhciByZSA9IC8uKi9nO1xuICAgIHZhciBwb3MgPSByZS5sYXN0SW5kZXggPSBzdGFydCsrO1xuICAgIHZhciBtYXRjaCA9IHJlLmV4ZWMoY29kZSlbMF0ubWF0Y2goUkVfUkVHRVgpO1xuXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICB2YXIgbmV4dCA9IHBvcyArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgcG9zID0gcHJldihjb2RlLCBwb3MpO1xuICAgICAgdmFyIGMgPSBjb2RlW3Bvc107XG5cbiAgICAgIGlmIChwb3MgPCAwIHx8IH5iZWZvcmVSZUNoYXJzLmluZGV4T2YoYykpIHtcbiAgICAgICAgcmV0dXJuIG5leHRcbiAgICAgIH1cblxuICAgICAgaWYgKGMgPT09ICcuJykge1xuXG4gICAgICAgIGlmIChjb2RlW3BvcyAtIDFdID09PSAnLicpIHtcbiAgICAgICAgICBzdGFydCA9IG5leHQ7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIGlmIChjID09PSAnKycgfHwgYyA9PT0gJy0nKSB7XG5cbiAgICAgICAgaWYgKGNvZGVbLS1wb3NdICE9PSBjIHx8XG4gICAgICAgICAgICAocG9zID0gcHJldihjb2RlLCBwb3MpKSA8IDAgfHxcbiAgICAgICAgICAgICFSRV9WTl9DSEFSLnRlc3QoY29kZVtwb3NdKSkge1xuICAgICAgICAgIHN0YXJ0ID0gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKH53b3Jkc0xhc3RDaGFyLmluZGV4T2YoYykpIHtcblxuICAgICAgICB2YXIgZW5kID0gcG9zICsgMTtcblxuICAgICAgICB3aGlsZSAoLS1wb3MgPj0gMCAmJiBSRV9WTl9DSEFSLnRlc3QoY29kZVtwb3NdKSl7ICB9XG4gICAgICAgIGlmICh+YmVmb3JlUmVXb3Jkcy5pbmRleE9mKGNvZGUuc2xpY2UocG9zICsgMSwgZW5kKSkpIHtcbiAgICAgICAgICBzdGFydCA9IG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRcbiAgfVxuXG4gIHJldHVybiBfc2tpcFJlZ2V4XG5cbn0pKCk7XG5cbi8qKlxuICogcmlvdC51dGlsLmJyYWNrZXRzXG4gKlxuICogLSBgYnJhY2tldHMgICAgYCAtIFJldHVybnMgYSBzdHJpbmcgb3IgcmVnZXggYmFzZWQgb24gaXRzIHBhcmFtZXRlclxuICogLSBgYnJhY2tldHMuc2V0YCAtIENoYW5nZSB0aGUgY3VycmVudCByaW90IGJyYWNrZXRzXG4gKlxuICogQG1vZHVsZVxuICovXG5cbi8qIGdsb2JhbCByaW90ICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG52YXIgYnJhY2tldHMgPSAoZnVuY3Rpb24gKFVOREVGKSB7XG5cbiAgdmFyXG4gICAgUkVHTE9CID0gJ2cnLFxuXG4gICAgUl9NTENPTU1TID0gL1xcL1xcKlteKl0qXFwqKyg/OlteKlxcL11bXipdKlxcKispKlxcLy9nLFxuXG4gICAgUl9TVFJJTkdTID0gL1wiW15cIlxcXFxdKig/OlxcXFxbXFxTXFxzXVteXCJcXFxcXSopKlwifCdbXidcXFxcXSooPzpcXFxcW1xcU1xcc11bXidcXFxcXSopKid8YFteYFxcXFxdKig/OlxcXFxbXFxTXFxzXVteYFxcXFxdKikqYC9nLFxuXG4gICAgU19RQkxPQ0tTID0gUl9TVFJJTkdTLnNvdXJjZSArICd8JyArXG4gICAgICAvKD86XFxicmV0dXJuXFxzK3woPzpbJFxcd1xcKVxcXV18XFwrXFwrfC0tKVxccyooXFwvKSg/IVsqXFwvXSkpLy5zb3VyY2UgKyAnfCcgK1xuICAgICAgL1xcLyg/PVteKlxcL10pW15bXFwvXFxcXF0qKD86KD86XFxbKD86XFxcXC58W15cXF1cXFxcXSopKlxcXXxcXFxcLilbXltcXC9cXFxcXSopKj8oW148XVxcLylbZ2ltXSovLnNvdXJjZSxcblxuICAgIFVOU1VQUE9SVEVEID0gUmVnRXhwKCdbXFxcXCcgKyAneDAwLVxcXFx4MUY8PmEtekEtWjAtOVxcJ1wiLDtcXFxcXFxcXF0nKSxcblxuICAgIE5FRURfRVNDQVBFID0gLyg/PVtbXFxdKCkqKz8uXiR8XSkvZyxcblxuICAgIFNfUUJMT0NLMiA9IFJfU1RSSU5HUy5zb3VyY2UgKyAnfCcgKyAvKFxcLykoPyFbKlxcL10pLy5zb3VyY2UsXG5cbiAgICBGSU5EQlJBQ0VTID0ge1xuICAgICAgJygnOiBSZWdFeHAoJyhbKCldKXwnICAgKyBTX1FCTE9DSzIsIFJFR0xPQiksXG4gICAgICAnWyc6IFJlZ0V4cCgnKFtbXFxcXF1dKXwnICsgU19RQkxPQ0syLCBSRUdMT0IpLFxuICAgICAgJ3snOiBSZWdFeHAoJyhbe31dKXwnICAgKyBTX1FCTE9DSzIsIFJFR0xPQilcbiAgICB9LFxuXG4gICAgREVGQVVMVCA9ICd7IH0nO1xuXG4gIHZhciBfcGFpcnMgPSBbXG4gICAgJ3snLCAnfScsXG4gICAgJ3snLCAnfScsXG4gICAgL3tbXn1dKn0vLFxuICAgIC9cXFxcKFt7fV0pL2csXG4gICAgL1xcXFwoeyl8ey9nLFxuICAgIFJlZ0V4cCgnXFxcXFxcXFwofSl8KFtbKHtdKXwofSl8JyArIFNfUUJMT0NLMiwgUkVHTE9CKSxcbiAgICBERUZBVUxULFxuICAgIC9eXFxzKntcXF4/XFxzKihbJFxcd10rKSg/OlxccyosXFxzKihcXFMrKSk/XFxzK2luXFxzKyhcXFMuKilcXHMqfS8sXG4gICAgLyhefFteXFxcXF0pez1bXFxTXFxzXSo/fS9cbiAgXTtcblxuICB2YXJcbiAgICBjYWNoZWRCcmFja2V0cyA9IFVOREVGLFxuICAgIF9yZWdleCxcbiAgICBfY2FjaGUgPSBbXSxcbiAgICBfc2V0dGluZ3M7XG5cbiAgZnVuY3Rpb24gX2xvb3BiYWNrIChyZSkgeyByZXR1cm4gcmUgfVxuXG4gIGZ1bmN0aW9uIF9yZXdyaXRlIChyZSwgYnApIHtcbiAgICBpZiAoIWJwKSB7IGJwID0gX2NhY2hlOyB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICByZS5zb3VyY2UucmVwbGFjZSgvey9nLCBicFsyXSkucmVwbGFjZSgvfS9nLCBicFszXSksIHJlLmdsb2JhbCA/IFJFR0xPQiA6ICcnXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAocGFpcikge1xuICAgIGlmIChwYWlyID09PSBERUZBVUxUKSB7IHJldHVybiBfcGFpcnMgfVxuXG4gICAgdmFyIGFyciA9IHBhaXIuc3BsaXQoJyAnKTtcblxuICAgIGlmIChhcnIubGVuZ3RoICE9PSAyIHx8IFVOU1VQUE9SVEVELnRlc3QocGFpcikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgYnJhY2tldHMgXCInICsgcGFpciArICdcIicpXG4gICAgfVxuICAgIGFyciA9IGFyci5jb25jYXQocGFpci5yZXBsYWNlKE5FRURfRVNDQVBFLCAnXFxcXCcpLnNwbGl0KCcgJykpO1xuXG4gICAgYXJyWzRdID0gX3Jld3JpdGUoYXJyWzFdLmxlbmd0aCA+IDEgPyAve1tcXFNcXHNdKj99LyA6IF9wYWlyc1s0XSwgYXJyKTtcbiAgICBhcnJbNV0gPSBfcmV3cml0ZShwYWlyLmxlbmd0aCA+IDMgPyAvXFxcXCh7fH0pL2cgOiBfcGFpcnNbNV0sIGFycik7XG4gICAgYXJyWzZdID0gX3Jld3JpdGUoX3BhaXJzWzZdLCBhcnIpO1xuICAgIGFycls3XSA9IFJlZ0V4cCgnXFxcXFxcXFwoJyArIGFyclszXSArICcpfChbWyh7XSl8KCcgKyBhcnJbM10gKyAnKXwnICsgU19RQkxPQ0syLCBSRUdMT0IpO1xuICAgIGFycls4XSA9IHBhaXI7XG4gICAgcmV0dXJuIGFyclxuICB9XG5cbiAgZnVuY3Rpb24gX2JyYWNrZXRzIChyZU9ySWR4KSB7XG4gICAgcmV0dXJuIHJlT3JJZHggaW5zdGFuY2VvZiBSZWdFeHAgPyBfcmVnZXgocmVPcklkeCkgOiBfY2FjaGVbcmVPcklkeF1cbiAgfVxuXG4gIF9icmFja2V0cy5zcGxpdCA9IGZ1bmN0aW9uIHNwbGl0IChzdHIsIHRtcGwsIF9icCkge1xuICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBfYnAgaXMgZm9yIHRoZSBjb21waWxlclxuICAgIGlmICghX2JwKSB7IF9icCA9IF9jYWNoZTsgfVxuXG4gICAgdmFyXG4gICAgICBwYXJ0cyA9IFtdLFxuICAgICAgbWF0Y2gsXG4gICAgICBpc2V4cHIsXG4gICAgICBzdGFydCxcbiAgICAgIHBvcyxcbiAgICAgIHJlID0gX2JwWzZdO1xuXG4gICAgdmFyIHFibG9ja3MgPSBbXTtcbiAgICB2YXIgcHJldlN0ciA9ICcnO1xuICAgIHZhciBtYXJrLCBsYXN0SW5kZXg7XG5cbiAgICBpc2V4cHIgPSBzdGFydCA9IHJlLmxhc3RJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhzdHIpKSkge1xuXG4gICAgICBsYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICBwb3MgPSBtYXRjaC5pbmRleDtcblxuICAgICAgaWYgKGlzZXhwcikge1xuXG4gICAgICAgIGlmIChtYXRjaFsyXSkge1xuXG4gICAgICAgICAgdmFyIGNoID0gbWF0Y2hbMl07XG4gICAgICAgICAgdmFyIHJlY2ggPSBGSU5EQlJBQ0VTW2NoXTtcbiAgICAgICAgICB2YXIgaXggPSAxO1xuXG4gICAgICAgICAgcmVjaC5sYXN0SW5kZXggPSBsYXN0SW5kZXg7XG4gICAgICAgICAgd2hpbGUgKChtYXRjaCA9IHJlY2guZXhlYyhzdHIpKSkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgIGlmIChtYXRjaFsxXSA9PT0gY2gpIHsgKytpeDsgfVxuICAgICAgICAgICAgICBlbHNlIGlmICghLS1peCkgeyBicmVhayB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWNoLmxhc3RJbmRleCA9IHB1c2hRQmxvY2sobWF0Y2guaW5kZXgsIHJlY2gubGFzdEluZGV4LCBtYXRjaFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlLmxhc3RJbmRleCA9IGl4ID8gc3RyLmxlbmd0aCA6IHJlY2gubGFzdEluZGV4O1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1hdGNoWzNdKSB7XG4gICAgICAgICAgcmUubGFzdEluZGV4ID0gcHVzaFFCbG9jayhwb3MsIGxhc3RJbmRleCwgbWF0Y2hbNF0pO1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtYXRjaFsxXSkge1xuICAgICAgICB1bmVzY2FwZVN0cihzdHIuc2xpY2Uoc3RhcnQsIHBvcykpO1xuICAgICAgICBzdGFydCA9IHJlLmxhc3RJbmRleDtcbiAgICAgICAgcmUgPSBfYnBbNiArIChpc2V4cHIgXj0gMSldO1xuICAgICAgICByZS5sYXN0SW5kZXggPSBzdGFydDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RyICYmIHN0YXJ0IDwgc3RyLmxlbmd0aCkge1xuICAgICAgdW5lc2NhcGVTdHIoc3RyLnNsaWNlKHN0YXJ0KSk7XG4gICAgfVxuXG4gICAgcGFydHMucWJsb2NrcyA9IHFibG9ja3M7XG5cbiAgICByZXR1cm4gcGFydHNcblxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlU3RyIChzKSB7XG4gICAgICBpZiAocHJldlN0cikge1xuICAgICAgICBzID0gcHJldlN0ciArIHM7XG4gICAgICAgIHByZXZTdHIgPSAnJztcbiAgICAgIH1cbiAgICAgIGlmICh0bXBsIHx8IGlzZXhwcikge1xuICAgICAgICBwYXJ0cy5wdXNoKHMgJiYgcy5yZXBsYWNlKF9icFs1XSwgJyQxJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydHMucHVzaChzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwdXNoUUJsb2NrKF9wb3MsIF9sYXN0SW5kZXgsIHNsYXNoKSB7IC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgaWYgKHNsYXNoKSB7XG4gICAgICAgIF9sYXN0SW5kZXggPSBza2lwUmVnZXgoc3RyLCBfcG9zKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRtcGwgJiYgX2xhc3RJbmRleCA+IF9wb3MgKyAyKSB7XG4gICAgICAgIG1hcmsgPSAnXFx1MjA1NycgKyBxYmxvY2tzLmxlbmd0aCArICd+JztcbiAgICAgICAgcWJsb2Nrcy5wdXNoKHN0ci5zbGljZShfcG9zLCBfbGFzdEluZGV4KSk7XG4gICAgICAgIHByZXZTdHIgKz0gc3RyLnNsaWNlKHN0YXJ0LCBfcG9zKSArIG1hcms7XG4gICAgICAgIHN0YXJ0ID0gX2xhc3RJbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfbGFzdEluZGV4XG4gICAgfVxuICB9O1xuXG4gIF9icmFja2V0cy5oYXNFeHByID0gZnVuY3Rpb24gaGFzRXhwciAoc3RyKSB7XG4gICAgcmV0dXJuIF9jYWNoZVs0XS50ZXN0KHN0cilcbiAgfTtcblxuICBfYnJhY2tldHMubG9vcEtleXMgPSBmdW5jdGlvbiBsb29wS2V5cyAoZXhwcikge1xuICAgIHZhciBtID0gZXhwci5tYXRjaChfY2FjaGVbOV0pO1xuXG4gICAgcmV0dXJuIG1cbiAgICAgID8geyBrZXk6IG1bMV0sIHBvczogbVsyXSwgdmFsOiBfY2FjaGVbMF0gKyBtWzNdLnRyaW0oKSArIF9jYWNoZVsxXSB9XG4gICAgICA6IHsgdmFsOiBleHByLnRyaW0oKSB9XG4gIH07XG5cbiAgX2JyYWNrZXRzLmFycmF5ID0gZnVuY3Rpb24gYXJyYXkgKHBhaXIpIHtcbiAgICByZXR1cm4gcGFpciA/IF9jcmVhdGUocGFpcikgOiBfY2FjaGVcbiAgfTtcblxuICBmdW5jdGlvbiBfcmVzZXQgKHBhaXIpIHtcbiAgICBpZiAoKHBhaXIgfHwgKHBhaXIgPSBERUZBVUxUKSkgIT09IF9jYWNoZVs4XSkge1xuICAgICAgX2NhY2hlID0gX2NyZWF0ZShwYWlyKTtcbiAgICAgIF9yZWdleCA9IHBhaXIgPT09IERFRkFVTFQgPyBfbG9vcGJhY2sgOiBfcmV3cml0ZTtcbiAgICAgIF9jYWNoZVs5XSA9IF9yZWdleChfcGFpcnNbOV0pO1xuICAgIH1cbiAgICBjYWNoZWRCcmFja2V0cyA9IHBhaXI7XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0U2V0dGluZ3MgKG8pIHtcbiAgICB2YXIgYjtcblxuICAgIG8gPSBvIHx8IHt9O1xuICAgIGIgPSBvLmJyYWNrZXRzO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCAnYnJhY2tldHMnLCB7XG4gICAgICBzZXQ6IF9yZXNldCxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FjaGVkQnJhY2tldHMgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBfc2V0dGluZ3MgPSBvO1xuICAgIF9yZXNldChiKTtcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYnJhY2tldHMsICdzZXR0aW5ncycsIHtcbiAgICBzZXQ6IF9zZXRTZXR0aW5ncyxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9zZXR0aW5ncyB9XG4gIH0pO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBpbiB0aGUgYnJvd3NlciByaW90IGlzIGFsd2F5cyBpbiB0aGUgc2NvcGUgKi9cbiAgX2JyYWNrZXRzLnNldHRpbmdzID0gdHlwZW9mIHJpb3QgIT09ICd1bmRlZmluZWQnICYmIHJpb3Quc2V0dGluZ3MgfHwge307XG4gIF9icmFja2V0cy5zZXQgPSBfcmVzZXQ7XG4gIF9icmFja2V0cy5za2lwUmVnZXggPSBza2lwUmVnZXg7XG5cbiAgX2JyYWNrZXRzLlJfU1RSSU5HUyA9IFJfU1RSSU5HUztcbiAgX2JyYWNrZXRzLlJfTUxDT01NUyA9IFJfTUxDT01NUztcbiAgX2JyYWNrZXRzLlNfUUJMT0NLUyA9IFNfUUJMT0NLUztcbiAgX2JyYWNrZXRzLlNfUUJMT0NLMiA9IFNfUUJMT0NLMjtcblxuICByZXR1cm4gX2JyYWNrZXRzXG5cbn0pKCk7XG5cbi8qKlxuICogQG1vZHVsZSB0bXBsXG4gKlxuICogdG1wbCAgICAgICAgICAtIFJvb3QgZnVuY3Rpb24sIHJldHVybnMgdGhlIHRlbXBsYXRlIHZhbHVlLCByZW5kZXIgd2l0aCBkYXRhXG4gKiB0bXBsLmhhc0V4cHIgIC0gVGVzdCB0aGUgZXhpc3RlbmNlIG9mIGEgZXhwcmVzc2lvbiBpbnNpZGUgYSBzdHJpbmdcbiAqIHRtcGwubG9vcEtleXMgLSBHZXQgdGhlIGtleXMgZm9yIGFuICdlYWNoJyBsb29wICh1c2VkIGJ5IGBfZWFjaGApXG4gKi9cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnZhciB0bXBsID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX2NhY2hlID0ge307XG5cbiAgZnVuY3Rpb24gX3RtcGwgKHN0ciwgZGF0YSkge1xuICAgIGlmICghc3RyKSB7IHJldHVybiBzdHIgfVxuXG4gICAgcmV0dXJuIChfY2FjaGVbc3RyXSB8fCAoX2NhY2hlW3N0cl0gPSBfY3JlYXRlKHN0cikpKS5jYWxsKFxuICAgICAgZGF0YSwgX2xvZ0Vyci5iaW5kKHtcbiAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgdG1wbDogc3RyXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIF90bXBsLmhhc0V4cHIgPSBicmFja2V0cy5oYXNFeHByO1xuXG4gIF90bXBsLmxvb3BLZXlzID0gYnJhY2tldHMubG9vcEtleXM7XG5cbiAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgX3RtcGwuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHsgX2NhY2hlID0ge307IH07XG5cbiAgX3RtcGwuZXJyb3JIYW5kbGVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBfbG9nRXJyIChlcnIsIGN0eCkge1xuXG4gICAgZXJyLnJpb3REYXRhID0ge1xuICAgICAgdGFnTmFtZTogY3R4ICYmIGN0eC5fXyAmJiBjdHguX18udGFnTmFtZSxcbiAgICAgIF9yaW90X2lkOiBjdHggJiYgY3R4Ll9yaW90X2lkICAvL2VzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gICAgfTtcblxuICAgIGlmIChfdG1wbC5lcnJvckhhbmRsZXIpIHsgX3RtcGwuZXJyb3JIYW5kbGVyKGVycik7IH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgY29uc29sZS5sb2coJzwlcz4gJXMnLCBlcnIucmlvdERhdGEudGFnTmFtZSB8fCAnVW5rbm93biB0YWcnLCB0aGlzLnRtcGwpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAoc3RyKSB7XG4gICAgdmFyIGV4cHIgPSBfZ2V0VG1wbChzdHIpO1xuXG4gICAgaWYgKGV4cHIuc2xpY2UoMCwgMTEpICE9PSAndHJ5e3JldHVybiAnKSB7IGV4cHIgPSAncmV0dXJuICcgKyBleHByOyB9XG5cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdFJywgZXhwciArICc7JykgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xuICB9XG5cbiAgdmFyIFJFX0RRVU9URSA9IC9cXHUyMDU3L2c7XG4gIHZhciBSRV9RQk1BUksgPSAvXFx1MjA1NyhcXGQrKX4vZztcblxuICBmdW5jdGlvbiBfZ2V0VG1wbCAoc3RyKSB7XG4gICAgdmFyIHBhcnRzID0gYnJhY2tldHMuc3BsaXQoc3RyLnJlcGxhY2UoUkVfRFFVT1RFLCAnXCInKSwgMSk7XG4gICAgdmFyIHFzdHIgPSBwYXJ0cy5xYmxvY2tzO1xuICAgIHZhciBleHByO1xuXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDIgfHwgcGFydHNbMF0pIHtcbiAgICAgIHZhciBpLCBqLCBsaXN0ID0gW107XG5cbiAgICAgIGZvciAoaSA9IGogPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBleHByID0gcGFydHNbaV07XG5cbiAgICAgICAgaWYgKGV4cHIgJiYgKGV4cHIgPSBpICYgMVxuXG4gICAgICAgICAgICA/IF9wYXJzZUV4cHIoZXhwciwgMSwgcXN0cilcblxuICAgICAgICAgICAgOiAnXCInICsgZXhwclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcclxcbj98XFxuL2csICdcXFxcbicpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArXG4gICAgICAgICAgICAgICdcIidcblxuICAgICAgICAgICkpIHsgbGlzdFtqKytdID0gZXhwcjsgfVxuXG4gICAgICB9XG5cbiAgICAgIGV4cHIgPSBqIDwgMiA/IGxpc3RbMF1cbiAgICAgICAgICAgOiAnWycgKyBsaXN0LmpvaW4oJywnKSArICddLmpvaW4oXCJcIiknO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgZXhwciA9IF9wYXJzZUV4cHIocGFydHNbMV0sIDAsIHFzdHIpO1xuICAgIH1cblxuICAgIGlmIChxc3RyLmxlbmd0aCkge1xuICAgICAgZXhwciA9IGV4cHIucmVwbGFjZShSRV9RQk1BUkssIGZ1bmN0aW9uIChfLCBwb3MpIHtcbiAgICAgICAgcmV0dXJuIHFzdHJbcG9zXVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJylcbiAgICAgICAgICAucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcbiAgfVxuXG4gIHZhciBSRV9DU05BTUUgPSAvXig/OigtP1tfQS1aYS16XFx4QTAtXFx4RkZdWy1cXHdcXHhBMC1cXHhGRl0qKXxcXHUyMDU3KFxcZCspfik6LztcbiAgdmFyXG4gICAgUkVfQlJFTkQgPSB7XG4gICAgICAnKCc6IC9bKCldL2csXG4gICAgICAnWyc6IC9bW1xcXV0vZyxcbiAgICAgICd7JzogL1t7fV0vZ1xuICAgIH07XG5cbiAgZnVuY3Rpb24gX3BhcnNlRXhwciAoZXhwciwgYXNUZXh0LCBxc3RyKSB7XG5cbiAgICBleHByID0gZXhwclxuICAgICAgLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKClcbiAgICAgIC5yZXBsYWNlKC9cXCA/KFtbXFwoe30sP1xcLjpdKVxcID8vZywgJyQxJyk7XG5cbiAgICBpZiAoZXhwcikge1xuICAgICAgdmFyXG4gICAgICAgIGxpc3QgPSBbXSxcbiAgICAgICAgY250ID0gMCxcbiAgICAgICAgbWF0Y2g7XG5cbiAgICAgIHdoaWxlIChleHByICYmXG4gICAgICAgICAgICAobWF0Y2ggPSBleHByLm1hdGNoKFJFX0NTTkFNRSkpICYmXG4gICAgICAgICAgICAhbWF0Y2guaW5kZXhcbiAgICAgICAgKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBqc2IsXG4gICAgICAgICAgcmUgPSAvLHwoW1t7KF0pfCQvZztcblxuICAgICAgICBleHByID0gUmVnRXhwLnJpZ2h0Q29udGV4dDtcbiAgICAgICAga2V5ICA9IG1hdGNoWzJdID8gcXN0clttYXRjaFsyXV0uc2xpY2UoMSwgLTEpLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJykgOiBtYXRjaFsxXTtcblxuICAgICAgICB3aGlsZSAoanNiID0gKG1hdGNoID0gcmUuZXhlYyhleHByKSlbMV0pIHsgc2tpcEJyYWNlcyhqc2IsIHJlKTsgfVxuXG4gICAgICAgIGpzYiAgPSBleHByLnNsaWNlKDAsIG1hdGNoLmluZGV4KTtcbiAgICAgICAgZXhwciA9IFJlZ0V4cC5yaWdodENvbnRleHQ7XG5cbiAgICAgICAgbGlzdFtjbnQrK10gPSBfd3JhcEV4cHIoanNiLCAxLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICBleHByID0gIWNudCA/IF93cmFwRXhwcihleHByLCBhc1RleHQpXG4gICAgICAgICAgIDogY250ID4gMSA/ICdbJyArIGxpc3Quam9pbignLCcpICsgJ10uam9pbihcIiBcIikudHJpbSgpJyA6IGxpc3RbMF07XG4gICAgfVxuICAgIHJldHVybiBleHByXG5cbiAgICBmdW5jdGlvbiBza2lwQnJhY2VzIChjaCwgcmUpIHtcbiAgICAgIHZhclxuICAgICAgICBtbSxcbiAgICAgICAgbHYgPSAxLFxuICAgICAgICBpciA9IFJFX0JSRU5EW2NoXTtcblxuICAgICAgaXIubGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgd2hpbGUgKG1tID0gaXIuZXhlYyhleHByKSkge1xuICAgICAgICBpZiAobW1bMF0gPT09IGNoKSB7ICsrbHY7IH1cbiAgICAgICAgZWxzZSBpZiAoIS0tbHYpIHsgYnJlYWsgfVxuICAgICAgfVxuICAgICAgcmUubGFzdEluZGV4ID0gbHYgPyBleHByLmxlbmd0aCA6IGlyLmxhc3RJbmRleDtcbiAgICB9XG4gIH1cblxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbm90IGJvdGhcbiAgdmFyIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgSlNfQ09OVEVYVCA9ICdcImluIHRoaXM/dGhpczonICsgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnID8gJ2dsb2JhbCcgOiAnd2luZG93JykgKyAnKS4nLFxuICAgIEpTX1ZBUk5BTUUgPSAvWyx7XVtcXCRcXHddKyg/PTopfCheICp8W14kXFx3XFwue10pKD8hKD86dHlwZW9mfHRydWV8ZmFsc2V8bnVsbHx1bmRlZmluZWR8aW58aW5zdGFuY2VvZnxpcyg/OkZpbml0ZXxOYU4pfHZvaWR8TmFOfG5ld3xEYXRlfFJlZ0V4cHxNYXRoKSg/IVskXFx3XSkpKFskX0EtWmEtel1bJFxcd10qKS9nLFxuICAgIEpTX05PUFJPUFMgPSAvXig/PShcXC5bJFxcd10rKSlcXDEoPzpbXi5bKF18JCkvO1xuXG4gIGZ1bmN0aW9uIF93cmFwRXhwciAoZXhwciwgYXNUZXh0LCBrZXkpIHtcbiAgICB2YXIgdGI7XG5cbiAgICBleHByID0gZXhwci5yZXBsYWNlKEpTX1ZBUk5BTUUsIGZ1bmN0aW9uIChtYXRjaCwgcCwgbXZhciwgcG9zLCBzKSB7XG4gICAgICBpZiAobXZhcikge1xuICAgICAgICBwb3MgPSB0YiA/IDAgOiBwb3MgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKG12YXIgIT09ICd0aGlzJyAmJiBtdmFyICE9PSAnZ2xvYmFsJyAmJiBtdmFyICE9PSAnd2luZG93Jykge1xuICAgICAgICAgIG1hdGNoID0gcCArICcoXCInICsgbXZhciArIEpTX0NPTlRFWFQgKyBtdmFyO1xuICAgICAgICAgIGlmIChwb3MpIHsgdGIgPSAocyA9IHNbcG9zXSkgPT09ICcuJyB8fCBzID09PSAnKCcgfHwgcyA9PT0gJ1snOyB9XG4gICAgICAgIH0gZWxzZSBpZiAocG9zKSB7XG4gICAgICAgICAgdGIgPSAhSlNfTk9QUk9QUy50ZXN0KHMuc2xpY2UocG9zKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaFxuICAgIH0pO1xuXG4gICAgaWYgKHRiKSB7XG4gICAgICBleHByID0gJ3RyeXtyZXR1cm4gJyArIGV4cHIgKyAnfWNhdGNoKGUpe0UoZSx0aGlzKX0nO1xuICAgIH1cblxuICAgIGlmIChrZXkpIHtcblxuICAgICAgZXhwciA9ICh0YlxuICAgICAgICAgID8gJ2Z1bmN0aW9uKCl7JyArIGV4cHIgKyAnfS5jYWxsKHRoaXMpJyA6ICcoJyArIGV4cHIgKyAnKSdcbiAgICAgICAgKSArICc/XCInICsga2V5ICsgJ1wiOlwiXCInO1xuXG4gICAgfSBlbHNlIGlmIChhc1RleHQpIHtcblxuICAgICAgZXhwciA9ICdmdW5jdGlvbih2KXsnICsgKHRiXG4gICAgICAgICAgPyBleHByLnJlcGxhY2UoJ3JldHVybiAnLCAndj0nKSA6ICd2PSgnICsgZXhwciArICcpJ1xuICAgICAgICApICsgJztyZXR1cm4gdnx8dj09PTA/djpcIlwifS5jYWxsKHRoaXMpJztcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwclxuICB9XG5cbiAgX3RtcGwudmVyc2lvbiA9IGJyYWNrZXRzLnZlcnNpb24gPSAndjMuMC44JztcblxuICByZXR1cm4gX3RtcGxcblxufSkoKTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnZhciBvYnNlcnZhYmxlJDEgPSBmdW5jdGlvbihlbCkge1xuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIG9yaWdpbmFsIG9iamVjdCBvciBjcmVhdGUgYSBuZXcgZW1wdHkgb25lXG4gICAqIEB0eXBlIHsgT2JqZWN0IH1cbiAgICovXG5cbiAgZWwgPSBlbCB8fCB7fTtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICovXG4gIHZhciBjYWxsYmFja3MgPSB7fSxcbiAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogUHVibGljIEFwaVxuICAgKi9cblxuICAvLyBleHRlbmQgdGhlIGVsIG9iamVjdCBhZGRpbmcgdGhlIG9ic2VydmFibGUgbWV0aG9kc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlbCwge1xuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gYGV2ZW50YCBhbmRzXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBlYWNoIHRpbWUgYW4gZXZlbnQgaXMgdHJpZ2dlcmVkLlxuICAgICAqIEBwYXJhbSAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgeyAoY2FsbGJhY2tzW2V2ZW50XSA9IGNhbGxiYWNrc1tldmVudF0gfHwgW10pLnB1c2goZm4pOyB9XG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBgZXZlbnRgIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9mZjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAoZXZlbnQgPT0gJyonICYmICFmbikgeyBjYWxsYmFja3MgPSB7fTsgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBjYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNiOyBjYiA9IGFyciAmJiBhcnJbaV07ICsraSkge1xuICAgICAgICAgICAgICBpZiAoY2IgPT0gZm4pIHsgYXJyLnNwbGljZShpLS0sIDEpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHsgZGVsZXRlIGNhbGxiYWNrc1tldmVudF07IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHRoZSBnaXZlbiBgZXZlbnRgIGFuZFxuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgYXQgbW9zdCBvbmNlXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb25lOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgICAgIGVsLm9mZihldmVudCwgb24pO1xuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbC5vbihldmVudCwgb24pXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYWxsIGNhbGxiYWNrIGZ1bmN0aW9ucyB0aGF0IGxpc3RlbiB0b1xuICAgICAqIHRoZSBnaXZlbiBgZXZlbnRgXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIHRyaWdnZXI6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cblxuICAgICAgICAvLyBnZXR0aW5nIHRoZSBhcmd1bWVudHNcbiAgICAgICAgdmFyIGFyZ2xlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxLFxuICAgICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkoYXJnbGVuKSxcbiAgICAgICAgICBmbnMsXG4gICAgICAgICAgZm4sXG4gICAgICAgICAgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJnbGVuOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzJDFbaSArIDFdOyAvLyBza2lwIGZpcnN0IGFyZ3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICBmbnMgPSBzbGljZS5jYWxsKGNhbGxiYWNrc1tldmVudF0gfHwgW10sIDApO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGZuID0gZm5zW2ldOyArK2kpIHtcbiAgICAgICAgICBmbi5hcHBseShlbCwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2tzWycqJ10gJiYgZXZlbnQgIT0gJyonKVxuICAgICAgICAgIHsgZWwudHJpZ2dlci5hcHBseShlbCwgWycqJywgZXZlbnRdLmNvbmNhdChhcmdzKSk7IH1cblxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlbFxuXG59O1xuXG4vKipcbiAqIFNwZWNpYWxpemVkIGZ1bmN0aW9uIGZvciBsb29waW5nIGFuIGFycmF5LWxpa2UgY29sbGVjdGlvbiB3aXRoIGBlYWNoPXt9YFxuICogQHBhcmFtICAgeyBBcnJheSB9IGxpc3QgLSBjb2xsZWN0aW9uIG9mIGl0ZW1zXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgQXJyYXkgfSB0aGUgYXJyYXkgbG9vcGVkXG4gKi9cbmZ1bmN0aW9uIGVhY2gobGlzdCwgZm4pIHtcbiAgdmFyIGxlbiA9IGxpc3QgPyBsaXN0Lmxlbmd0aCA6IDA7XG4gIHZhciBpID0gMDtcbiAgZm9yICg7IGkgPCBsZW47ICsraSkge1xuICAgIGZuKGxpc3RbaV0sIGkpO1xuICB9XG4gIHJldHVybiBsaXN0XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBhcnJheSBjb250YWlucyBhbiBpdGVtXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gYXJyYXkgLSB0YXJnZXQgYXJyYXlcbiAqIEBwYXJhbSAgIHsgKiB9IGl0ZW0gLSBpdGVtIHRvIHRlc3RcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0pIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YoaXRlbSkgIT09IC0xXG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyBjb250YWluaW5nIGRhc2hlcyB0byBjYW1lbCBjYXNlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHN0ciAtIGlucHV0IHN0cmluZ1xuICogQHJldHVybnMgeyBTdHJpbmcgfSBteS1zdHJpbmcgLT4gbXlTdHJpbmdcbiAqL1xuZnVuY3Rpb24gdG9DYW1lbChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8tKFxcdykvZywgZnVuY3Rpb24gKF8sIGMpIHsgcmV0dXJuIGMudG9VcHBlckNhc2UoKTsgfSlcbn1cblxuLyoqXG4gKiBGYXN0ZXIgU3RyaW5nIHN0YXJ0c1dpdGggYWx0ZXJuYXRpdmVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc3RyIC0gc291cmNlIHN0cmluZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtIHRlc3Qgc3RyaW5nXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyLCB2YWx1ZSkge1xuICByZXR1cm4gc3RyLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCkgPT09IHZhbHVlXG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCBhbiBpbW11dGFibGUgcHJvcGVydHlcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZWwgLSBvYmplY3Qgd2hlcmUgdGhlIG5ldyBwcm9wZXJ0eSB3aWxsIGJlIHNldFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBrZXkgLSBvYmplY3Qga2V5IHdoZXJlIHRoZSBuZXcgcHJvcGVydHkgd2lsbCBiZSBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC0gdmFsdWUgb2YgdGhlIG5ldyBwcm9wZXJ0eVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRpb25zIC0gc2V0IHRoZSBwcm9wZXJ5IG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogQHJldHVybnMgeyBPYmplY3QgfSAtIHRoZSBpbml0aWFsIG9iamVjdFxuICovXG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShlbCwga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIGtleSwgZXh0ZW5kKHtcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9LCBvcHRpb25zKSk7XG4gIHJldHVybiBlbFxufVxuXG4vKipcbiAqIEV4dGVuZCBhbnkgb2JqZWN0IHdpdGggb3RoZXIgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBzcmMgLSBzb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IHRoZSByZXN1bHRpbmcgZXh0ZW5kZWQgb2JqZWN0XG4gKlxuICogdmFyIG9iaiA9IHsgZm9vOiAnYmF6JyB9XG4gKiBleHRlbmQob2JqLCB7YmFyOiAnYmFyJywgZm9vOiAnYmFyJ30pXG4gKiBjb25zb2xlLmxvZyhvYmopID0+IHtiYXI6ICdiYXInLCBmb286ICdiYXInfVxuICpcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKHNyYykge1xuICB2YXIgb2JqLCBhcmdzID0gYXJndW1lbnRzO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAob2JqID0gYXJnc1tpXSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugb2JqZWN0IGNvdWxkIGJlIG92ZXJyaWRkZW5cbiAgICAgICAgaWYgKGlzV3JpdGFibGUoc3JjLCBrZXkpKVxuICAgICAgICAgIHsgc3JjW2tleV0gPSBvYmpba2V5XTsgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3JjXG59XG5cbnZhciBtaXNjID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGVhY2g6IGVhY2gsXG5cdGNvbnRhaW5zOiBjb250YWlucyxcblx0dG9DYW1lbDogdG9DYW1lbCxcblx0c3RhcnRzV2l0aDogc3RhcnRzV2l0aCxcblx0ZGVmaW5lUHJvcGVydHk6IGRlZmluZVByb3BlcnR5LFxuXHRleHRlbmQ6IGV4dGVuZFxufSk7XG5cbnZhciBzZXR0aW5ncyQxID0gZXh0ZW5kKE9iamVjdC5jcmVhdGUoYnJhY2tldHMuc2V0dGluZ3MpLCB7XG4gIHNraXBBbm9ueW1vdXNUYWdzOiB0cnVlLFxuICAvLyBoYW5kbGUgdGhlIGF1dG8gdXBkYXRlcyBvbiBhbnkgRE9NIGV2ZW50XG4gIGF1dG9VcGRhdGU6IHRydWVcbn0pO1xuXG4vKipcbiAqIFRyaWdnZXIgRE9NIGV2ZW50c1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIGRvbSBlbGVtZW50IHRhcmdldCBvZiB0aGUgZXZlbnRcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBoYW5kbGVyIC0gdXNlciBmdW5jdGlvblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlIC0gZXZlbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUV2ZW50KGRvbSwgaGFuZGxlciwgZSkge1xuICB2YXIgcHRhZyA9IHRoaXMuX18ucGFyZW50LFxuICAgIGl0ZW0gPSB0aGlzLl9fLml0ZW07XG5cbiAgaWYgKCFpdGVtKVxuICAgIHsgd2hpbGUgKHB0YWcgJiYgIWl0ZW0pIHtcbiAgICAgIGl0ZW0gPSBwdGFnLl9fLml0ZW07XG4gICAgICBwdGFnID0gcHRhZy5fXy5wYXJlbnQ7XG4gICAgfSB9XG5cbiAgLy8gb3ZlcnJpZGUgdGhlIGV2ZW50IHByb3BlcnRpZXNcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKGlzV3JpdGFibGUoZSwgJ2N1cnJlbnRUYXJnZXQnKSkgeyBlLmN1cnJlbnRUYXJnZXQgPSBkb207IH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKGlzV3JpdGFibGUoZSwgJ3RhcmdldCcpKSB7IGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50OyB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChpc1dyaXRhYmxlKGUsICd3aGljaCcpKSB7IGUud2hpY2ggPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZTsgfVxuXG4gIGUuaXRlbSA9IGl0ZW07XG5cbiAgaGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuXG4gIC8vIGF2b2lkIGF1dG8gdXBkYXRlc1xuICBpZiAoIXNldHRpbmdzJDEuYXV0b1VwZGF0ZSkgeyByZXR1cm4gfVxuXG4gIGlmICghZS5wcmV2ZW50VXBkYXRlKSB7XG4gICAgdmFyIHAgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGhpcyk7XG4gICAgLy8gZml4ZXMgIzIwODNcbiAgICBpZiAocC5pc01vdW50ZWQpIHsgcC51cGRhdGUoKTsgfVxuICB9XG59XG5cbi8qKlxuICogQXR0YWNoIGFuIGV2ZW50IHRvIGEgRE9NIG5vZGVcbiAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBldmVudCBuYW1lXG4gKiBAcGFyYW0geyBGdW5jdGlvbiB9IGhhbmRsZXIgLSBldmVudCBjYWxsYmFja1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZG9tIC0gZG9tIG5vZGVcbiAqIEBwYXJhbSB7IFRhZyB9IHRhZyAtIHRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBzZXRFdmVudEhhbmRsZXIobmFtZSwgaGFuZGxlciwgZG9tLCB0YWcpIHtcbiAgdmFyIGV2ZW50TmFtZSxcbiAgICBjYiA9IGhhbmRsZUV2ZW50LmJpbmQodGFnLCBkb20sIGhhbmRsZXIpO1xuXG4gIC8vIGF2b2lkIHRvIGJpbmQgdHdpY2UgdGhlIHNhbWUgZXZlbnRcbiAgLy8gcG9zc2libGUgZml4IGZvciAjMjMzMlxuICBkb21bbmFtZV0gPSBudWxsO1xuXG4gIC8vIG5vcm1hbGl6ZSBldmVudCBuYW1lXG4gIGV2ZW50TmFtZSA9IG5hbWUucmVwbGFjZShSRV9FVkVOVFNfUFJFRklYLCAnJyk7XG5cbiAgLy8gY2FjaGUgdGhlIGxpc3RlbmVyIGludG8gdGhlIGxpc3RlbmVycyBhcnJheVxuICBpZiAoIWNvbnRhaW5zKHRhZy5fXy5saXN0ZW5lcnMsIGRvbSkpIHsgdGFnLl9fLmxpc3RlbmVycy5wdXNoKGRvbSk7IH1cbiAgaWYgKCFkb21bUklPVF9FVkVOVFNfS0VZXSkgeyBkb21bUklPVF9FVkVOVFNfS0VZXSA9IHt9OyB9XG4gIGlmIChkb21bUklPVF9FVkVOVFNfS0VZXVtuYW1lXSkgeyBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGRvbVtSSU9UX0VWRU5UU19LRVldW25hbWVdKTsgfVxuXG4gIGRvbVtSSU9UX0VWRU5UU19LRVldW25hbWVdID0gY2I7XG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2IsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgZHluYW1pY2FsbHkgY3JlYXRlZCBkYXRhLWlzIHRhZ3Mgd2l0aCBjaGFuZ2luZyBleHByZXNzaW9uc1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZXhwciAtIGV4cHJlc3Npb24gdGFnIGFuZCBleHByZXNzaW9uIGluZm9cbiAqIEBwYXJhbSB7IFRhZyB9ICAgIHBhcmVudCAtIHBhcmVudCBmb3IgdGFnIGNyZWF0aW9uXG4gKiBAcGFyYW0geyBTdHJpbmcgfSB0YWdOYW1lIC0gdGFnIGltcGxlbWVudGF0aW9uIHdlIHdhbnQgdG8gdXNlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZURhdGFJcyhleHByLCBwYXJlbnQsIHRhZ05hbWUpIHtcbiAgdmFyIGNvbmYsIGlzVmlydHVhbCwgaGVhZCwgcmVmO1xuXG4gIGlmIChleHByLnRhZyAmJiBleHByLnRhZ05hbWUgPT09IHRhZ05hbWUpIHtcbiAgICBleHByLnRhZy51cGRhdGUoKTtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlzVmlydHVhbCA9IGV4cHIuZG9tLnRhZ05hbWUgPT09ICdWSVJUVUFMJztcbiAgLy8gc3luYyBfcGFyZW50IHRvIGFjY29tbW9kYXRlIGNoYW5naW5nIHRhZ25hbWVzXG4gIGlmIChleHByLnRhZykge1xuICAgIC8vIG5lZWQgcGxhY2Vob2xkZXIgYmVmb3JlIHVubW91bnRcbiAgICBpZihpc1ZpcnR1YWwpIHtcbiAgICAgIGhlYWQgPSBleHByLnRhZy5fXy5oZWFkO1xuICAgICAgcmVmID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKTtcbiAgICAgIGhlYWQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVmLCBoZWFkKTtcbiAgICB9XG5cbiAgICBleHByLnRhZy51bm1vdW50KHRydWUpO1xuICB9XG5cbiAgaWYgKCFpc1N0cmluZyh0YWdOYW1lKSkgeyByZXR1cm4gfVxuXG4gIGV4cHIuaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV07XG4gIGNvbmYgPSB7cm9vdDogZXhwci5kb20sIHBhcmVudDogcGFyZW50LCBoYXNJbXBsOiB0cnVlLCB0YWdOYW1lOiB0YWdOYW1lfTtcbiAgZXhwci50YWcgPSBpbml0Q2hpbGRUYWcoZXhwci5pbXBsLCBjb25mLCBleHByLmRvbS5pbm5lckhUTUwsIHBhcmVudCk7XG4gIGVhY2goZXhwci5hdHRycywgZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHNldEF0dHIoZXhwci50YWcucm9vdCwgYS5uYW1lLCBhLnZhbHVlKTsgfSk7XG4gIGV4cHIudGFnTmFtZSA9IHRhZ05hbWU7XG4gIGV4cHIudGFnLm1vdW50KCk7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtYWtlUmVwbGFjZVZpcnR1YWwoZXhwci50YWcsIHJlZiB8fCBleHByLnRhZy5yb290KTsgfSAvLyByb290IGV4aXN0IGZpcnN0IHRpbWUsIGFmdGVyIHVzZSBwbGFjZWhvbGRlclxuXG4gIC8vIHBhcmVudCBpcyB0aGUgcGxhY2Vob2xkZXIgdGFnLCBub3QgdGhlIGR5bmFtaWMgdGFnIHNvIGNsZWFuIHVwXG4gIHBhcmVudC5fXy5vblVubW91bnQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGVsTmFtZSA9IGV4cHIudGFnLm9wdHMuZGF0YUlzLFxuICAgICAgdGFncyA9IGV4cHIudGFnLnBhcmVudC50YWdzLFxuICAgICAgX3RhZ3MgPSBleHByLnRhZy5fXy5wYXJlbnQudGFncztcbiAgICBhcnJheWlzaFJlbW92ZSh0YWdzLCBkZWxOYW1lLCBleHByLnRhZyk7XG4gICAgYXJyYXlpc2hSZW1vdmUoX3RhZ3MsIGRlbE5hbWUsIGV4cHIudGFnKTtcbiAgICBleHByLnRhZy51bm1vdW50KCk7XG4gIH07XG59XG5cbi8qKlxuICogTm9tYWxpemUgYW55IGF0dHJpYnV0ZSByZW1vdmluZyB0aGUgXCJyaW90LVwiIHByZWZpeFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBhdHRyTmFtZSAtIG9yaWdpbmFsIGF0dHJpYnV0ZSBuYW1lXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IHZhbGlkIGh0bWwgYXR0cmlidXRlIG5hbWVcbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplQXR0ck5hbWUoYXR0ck5hbWUpIHtcbiAgaWYgKCFhdHRyTmFtZSkgeyByZXR1cm4gbnVsbCB9XG4gIGF0dHJOYW1lID0gYXR0ck5hbWUucmVwbGFjZShBVFRSU19QUkVGSVgsICcnKTtcbiAgaWYgKENBU0VfU0VOU0lUSVZFX0FUVFJJQlVURVNbYXR0ck5hbWVdKSB7IGF0dHJOYW1lID0gQ0FTRV9TRU5TSVRJVkVfQVRUUklCVVRFU1thdHRyTmFtZV07IH1cbiAgcmV0dXJuIGF0dHJOYW1lXG59XG5cbi8qKlxuICogVXBkYXRlIG9uIHNpbmdsZSB0YWcgZXhwcmVzc2lvblxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBPYmplY3QgfSBleHByIC0gZXhwcmVzc2lvbiBsb2dpY1xuICogQHJldHVybnMgeyB1bmRlZmluZWQgfVxuICovXG5mdW5jdGlvbiB1cGRhdGVFeHByZXNzaW9uKGV4cHIpIHtcbiAgaWYgKHRoaXMucm9vdCAmJiBnZXRBdHRyKHRoaXMucm9vdCwndmlydHVhbGl6ZWQnKSkgeyByZXR1cm4gfVxuXG4gIHZhciBkb20gPSBleHByLmRvbSxcbiAgICAvLyByZW1vdmUgdGhlIHJpb3QtIHByZWZpeFxuICAgIGF0dHJOYW1lID0gbm9ybWFsaXplQXR0ck5hbWUoZXhwci5hdHRyKSxcbiAgICBpc1RvZ2dsZSA9IGNvbnRhaW5zKFtTSE9XX0RJUkVDVElWRSwgSElERV9ESVJFQ1RJVkVdLCBhdHRyTmFtZSksXG4gICAgaXNWaXJ0dWFsID0gZXhwci5yb290ICYmIGV4cHIucm9vdC50YWdOYW1lID09PSAnVklSVFVBTCcsXG4gICAgcGFyZW50ID0gZG9tICYmIChleHByLnBhcmVudCB8fCBkb20ucGFyZW50Tm9kZSksXG4gICAgLy8gZGV0ZWN0IHRoZSBzdHlsZSBhdHRyaWJ1dGVzXG4gICAgaXNTdHlsZUF0dHIgPSBhdHRyTmFtZSA9PT0gJ3N0eWxlJyxcbiAgICBpc0NsYXNzQXR0ciA9IGF0dHJOYW1lID09PSAnY2xhc3MnLFxuICAgIGhhc1ZhbHVlLFxuICAgIGlzT2JqLFxuICAgIHZhbHVlO1xuXG4gIC8vIGlmIGl0J3MgYSB0YWcgd2UgY291bGQgdG90YWxseSBza2lwIHRoZSByZXN0XG4gIGlmIChleHByLl9yaW90X2lkKSB7XG4gICAgaWYgKGV4cHIuaXNNb3VudGVkKSB7XG4gICAgICBleHByLnVwZGF0ZSgpO1xuICAgIC8vIGlmIGl0IGhhc24ndCBiZWVuIG1vdW50ZWQgeWV0LCBkbyB0aGF0IG5vdy5cbiAgICB9IGVsc2Uge1xuICAgICAgZXhwci5tb3VudCgpO1xuICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICBtYWtlUmVwbGFjZVZpcnR1YWwoZXhwciwgZXhwci5yb290KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cbiAgLy8gaWYgdGhpcyBleHByZXNzaW9uIGhhcyB0aGUgdXBkYXRlIG1ldGhvZCBpdCBtZWFucyBpdCBjYW4gaGFuZGxlIHRoZSBET00gY2hhbmdlcyBieSBpdHNlbGZcbiAgaWYgKGV4cHIudXBkYXRlKSB7IHJldHVybiBleHByLnVwZGF0ZSgpIH1cblxuICAvLyAuLi5pdCBzZWVtcyB0byBiZSBhIHNpbXBsZSBleHByZXNzaW9uIHNvIHdlIHRyeSB0byBjYWxjdWxhdCBpdHMgdmFsdWVcbiAgdmFsdWUgPSB0bXBsKGV4cHIuZXhwciwgaXNUb2dnbGUgPyBleHRlbmQoe30sIE9iamVjdC5jcmVhdGUodGhpcy5wYXJlbnQpLCB0aGlzKSA6IHRoaXMpO1xuICBoYXNWYWx1ZSA9ICFpc0JsYW5rKHZhbHVlKTtcbiAgaXNPYmogPSBpc09iamVjdCh2YWx1ZSk7XG5cbiAgLy8gY29udmVydCB0aGUgc3R5bGUvY2xhc3Mgb2JqZWN0cyB0byBzdHJpbmdzXG4gIGlmIChpc09iaikge1xuICAgIGlzT2JqID0gIWlzQ2xhc3NBdHRyICYmICFpc1N0eWxlQXR0cjtcbiAgICBpZiAoaXNDbGFzc0F0dHIpIHtcbiAgICAgIHZhbHVlID0gdG1wbChKU09OLnN0cmluZ2lmeSh2YWx1ZSksIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaXNTdHlsZUF0dHIpIHtcbiAgICAgIHZhbHVlID0gc3R5bGVPYmplY3RUb1N0cmluZyh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcmVtb3ZlIG9yaWdpbmFsIGF0dHJpYnV0ZVxuICBpZiAoZXhwci5hdHRyICYmICghZXhwci5pc0F0dHJSZW1vdmVkIHx8ICFoYXNWYWx1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UpKSB7XG4gICAgcmVtQXR0cihkb20sIGV4cHIuYXR0cik7XG4gICAgZXhwci5pc0F0dHJSZW1vdmVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIGZvciB0aGUgYm9vbGVhbiBhdHRyaWJ1dGVzIHdlIGRvbid0IG5lZWQgdGhlIHZhbHVlXG4gIC8vIHdlIGNhbiBjb252ZXJ0IGl0IHRvIGNoZWNrZWQ9dHJ1ZSB0byBjaGVja2VkPWNoZWNrZWRcbiAgaWYgKGV4cHIuYm9vbCkgeyB2YWx1ZSA9IHZhbHVlID8gYXR0ck5hbWUgOiBmYWxzZTsgfVxuICBpZiAoZXhwci5pc1J0YWcpIHsgcmV0dXJuIHVwZGF0ZURhdGFJcyhleHByLCB0aGlzLCB2YWx1ZSkgfVxuICBpZiAoZXhwci53YXNQYXJzZWRPbmNlICYmIGV4cHIudmFsdWUgPT09IHZhbHVlKSB7IHJldHVybiB9XG5cbiAgLy8gdXBkYXRlIHRoZSBleHByZXNzaW9uIHZhbHVlXG4gIGV4cHIudmFsdWUgPSB2YWx1ZTtcbiAgZXhwci53YXNQYXJzZWRPbmNlID0gdHJ1ZTtcblxuICAvLyBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0IHdlIGNhbiBub3QgZG8gbXVjaCBtb3JlIHdpdGggaXRcbiAgaWYgKGlzT2JqICYmICFpc1RvZ2dsZSkgeyByZXR1cm4gfVxuICAvLyBhdm9pZCB0byByZW5kZXIgdW5kZWZpbmVkL251bGwgdmFsdWVzXG4gIGlmIChpc0JsYW5rKHZhbHVlKSkgeyB2YWx1ZSA9ICcnOyB9XG5cbiAgLy8gdGV4dGFyZWEgYW5kIHRleHQgbm9kZXMgaGF2ZSBubyBhdHRyaWJ1dGUgbmFtZVxuICBpZiAoIWF0dHJOYW1lKSB7XG4gICAgLy8gYWJvdXQgIzgxNSB3L28gcmVwbGFjZTogdGhlIGJyb3dzZXIgY29udmVydHMgdGhlIHZhbHVlIHRvIGEgc3RyaW5nLFxuICAgIC8vIHRoZSBjb21wYXJpc29uIGJ5IFwiPT1cIiBkb2VzIHRvbywgYnV0IG5vdCBpbiB0aGUgc2VydmVyXG4gICAgdmFsdWUgKz0gJyc7XG4gICAgLy8gdGVzdCBmb3IgcGFyZW50IGF2b2lkcyBlcnJvciB3aXRoIGludmFsaWQgYXNzaWdubWVudCB0byBub2RlVmFsdWVcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAvLyBjYWNoZSB0aGUgcGFyZW50IG5vZGUgYmVjYXVzZSBzb21laG93IGl0IHdpbGwgYmVjb21lIG51bGwgb24gSUVcbiAgICAgIC8vIG9uIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgZXhwci5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICBpZiAocGFyZW50LnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgcGFyZW50LnZhbHVlID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAvLyAjMTExM1xuICAgICAgICBpZiAoIUlFX1ZFUlNJT04pIHsgZG9tLm5vZGVWYWx1ZSA9IHZhbHVlOyB9ICAvLyAjMTYyNSBJRSB0aHJvd3MgaGVyZSwgbm9kZVZhbHVlXG4gICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIGJlIGF2YWlsYWJsZSBvbiAndXBkYXRlZCdcbiAgICAgIGVsc2UgeyBkb20ubm9kZVZhbHVlID0gdmFsdWU7IH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuXG4gIC8vIGV2ZW50IGhhbmRsZXJcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgc2V0RXZlbnRIYW5kbGVyKGF0dHJOYW1lLCB2YWx1ZSwgZG9tLCB0aGlzKTtcbiAgLy8gc2hvdyAvIGhpZGVcbiAgfSBlbHNlIGlmIChpc1RvZ2dsZSkge1xuICAgIHRvZ2dsZVZpc2liaWxpdHkoZG9tLCBhdHRyTmFtZSA9PT0gSElERV9ESVJFQ1RJVkUgPyAhdmFsdWUgOiB2YWx1ZSk7XG4gIC8vIGhhbmRsZSBhdHRyaWJ1dGVzXG4gIH0gZWxzZSB7XG4gICAgaWYgKGV4cHIuYm9vbCkge1xuICAgICAgZG9tW2F0dHJOYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChhdHRyTmFtZSA9PT0gJ3ZhbHVlJyAmJiBkb20udmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICBkb20udmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaGFzVmFsdWUgJiYgdmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICBzZXRBdHRyKGRvbSwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhhdCBpbiBjYXNlIG9mIHN0eWxlIGNoYW5nZXNcbiAgICAvLyB0aGUgZWxlbWVudCBzdGF5cyBoaWRkZW5cbiAgICBpZiAoaXNTdHlsZUF0dHIgJiYgZG9tLmhpZGRlbikgeyB0b2dnbGVWaXNpYmlsaXR5KGRvbSwgZmFsc2UpOyB9XG4gIH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgYWxsIHRoZSBleHByZXNzaW9ucyBpbiBhIFRhZyBpbnN0YW5jZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBBcnJheSB9IGV4cHJlc3Npb25zIC0gZXhwcmVzc2lvbiB0aGF0IG11c3QgYmUgcmUgZXZhbHVhdGVkXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUFsbEV4cHJlc3Npb25zKGV4cHJlc3Npb25zKSB7XG4gIGVhY2goZXhwcmVzc2lvbnMsIHVwZGF0ZUV4cHJlc3Npb24uYmluZCh0aGlzKSk7XG59XG5cbnZhciBJZkV4cHIgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoZG9tLCB0YWcsIGV4cHIpIHtcbiAgICByZW1BdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKTtcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmV4cHIgPSBleHByO1xuICAgIHRoaXMuc3R1YiA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCk7XG4gICAgdGhpcy5wcmlzdGluZSA9IGRvbTtcblxuICAgIHZhciBwID0gZG9tLnBhcmVudE5vZGU7XG4gICAgcC5pbnNlcnRCZWZvcmUodGhpcy5zdHViLCBkb20pO1xuICAgIHAucmVtb3ZlQ2hpbGQoZG9tKTtcblxuICAgIHJldHVybiB0aGlzXG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHRoaXMudmFsdWUgPSB0bXBsKHRoaXMuZXhwciwgdGhpcy50YWcpO1xuXG4gICAgaWYgKHRoaXMudmFsdWUgJiYgIXRoaXMuY3VycmVudCkgeyAvLyBpbnNlcnRcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMucHJpc3RpbmUuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgdGhpcy5zdHViLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuY3VycmVudCwgdGhpcy5zdHViKTtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBbXTtcbiAgICAgIHBhcnNlRXhwcmVzc2lvbnMuYXBwbHkodGhpcy50YWcsIFt0aGlzLmN1cnJlbnQsIHRoaXMuZXhwcmVzc2lvbnMsIHRydWVdKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnZhbHVlICYmIHRoaXMuY3VycmVudCkgeyAvLyByZW1vdmVcbiAgICAgIHVubW91bnRBbGwodGhpcy5leHByZXNzaW9ucyk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50Ll90YWcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Ll90YWcudW5tb3VudCgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnQucGFyZW50Tm9kZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnQpO1xuICAgICAgfVxuICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBbXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy52YWx1ZSkgeyB1cGRhdGVBbGxFeHByZXNzaW9ucy5jYWxsKHRoaXMudGFnLCB0aGlzLmV4cHJlc3Npb25zKTsgfVxuICB9LFxuICB1bm1vdW50OiBmdW5jdGlvbiB1bm1vdW50KCkge1xuICAgIHVubW91bnRBbGwodGhpcy5leHByZXNzaW9ucyB8fCBbXSk7XG4gIH1cbn07XG5cbnZhciBSZWZFeHByID0ge1xuICBpbml0OiBmdW5jdGlvbiBpbml0KGRvbSwgcGFyZW50LCBhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgdGhpcy5kb20gPSBkb207XG4gICAgdGhpcy5hdHRyID0gYXR0ck5hbWU7XG4gICAgdGhpcy5yYXdWYWx1ZSA9IGF0dHJWYWx1ZTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLmhhc0V4cCA9IHRtcGwuaGFzRXhwcihhdHRyVmFsdWUpO1xuICAgIHJldHVybiB0aGlzXG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBvbGQgPSB0aGlzLnZhbHVlO1xuICAgIHZhciBjdXN0b21QYXJlbnQgPSB0aGlzLnBhcmVudCAmJiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGhpcy5wYXJlbnQpO1xuICAgIC8vIGlmIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQgaXMgYSBjdXN0b20gdGFnLCB0aGVuIHdlIHNldCB0aGUgdGFnIGl0c2VsZiwgcmF0aGVyIHRoYW4gRE9NXG4gICAgdmFyIHRhZ09yRG9tID0gdGhpcy5kb20uX19yZWYgfHwgdGhpcy50YWcgfHwgdGhpcy5kb207XG5cbiAgICB0aGlzLnZhbHVlID0gdGhpcy5oYXNFeHAgPyB0bXBsKHRoaXMucmF3VmFsdWUsIHRoaXMucGFyZW50KSA6IHRoaXMucmF3VmFsdWU7XG5cbiAgICAvLyB0aGUgbmFtZSBjaGFuZ2VkLCBzbyB3ZSBuZWVkIHRvIHJlbW92ZSBpdCBmcm9tIHRoZSBvbGQga2V5IChpZiBwcmVzZW50KVxuICAgIGlmICghaXNCbGFuayhvbGQpICYmIGN1c3RvbVBhcmVudCkgeyBhcnJheWlzaFJlbW92ZShjdXN0b21QYXJlbnQucmVmcywgb2xkLCB0YWdPckRvbSk7IH1cbiAgICBpZiAoIWlzQmxhbmsodGhpcy52YWx1ZSkgJiYgaXNTdHJpbmcodGhpcy52YWx1ZSkpIHtcbiAgICAgIC8vIGFkZCBpdCB0byB0aGUgcmVmcyBvZiBwYXJlbnQgdGFnICh0aGlzIGJlaGF2aW9yIHdhcyBjaGFuZ2VkID49My4wKVxuICAgICAgaWYgKGN1c3RvbVBhcmVudCkgeyBhcnJheWlzaEFkZChcbiAgICAgICAgY3VzdG9tUGFyZW50LnJlZnMsXG4gICAgICAgIHRoaXMudmFsdWUsXG4gICAgICAgIHRhZ09yRG9tLFxuICAgICAgICAvLyB1c2UgYW4gYXJyYXkgaWYgaXQncyBhIGxvb3BlZCBub2RlIGFuZCB0aGUgcmVmIGlzIG5vdCBhbiBleHByZXNzaW9uXG4gICAgICAgIG51bGwsXG4gICAgICAgIHRoaXMucGFyZW50Ll9fLmluZGV4XG4gICAgICApOyB9XG5cbiAgICAgIGlmICh0aGlzLnZhbHVlICE9PSBvbGQpIHtcbiAgICAgICAgc2V0QXR0cih0aGlzLmRvbSwgdGhpcy5hdHRyLCB0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVtQXR0cih0aGlzLmRvbSwgdGhpcy5hdHRyKTtcbiAgICB9XG5cbiAgICAvLyBjYWNoZSB0aGUgcmVmIGJvdW5kIHRvIHRoaXMgZG9tIG5vZGVcbiAgICAvLyB0byByZXVzZSBpdCBpbiBmdXR1cmUgKHNlZSBhbHNvICMyMzI5KVxuICAgIGlmICghdGhpcy5kb20uX19yZWYpIHsgdGhpcy5kb20uX19yZWYgPSB0YWdPckRvbTsgfVxuICB9LFxuICB1bm1vdW50OiBmdW5jdGlvbiB1bm1vdW50KCkge1xuICAgIHZhciB0YWdPckRvbSA9IHRoaXMudGFnIHx8IHRoaXMuZG9tO1xuICAgIHZhciBjdXN0b21QYXJlbnQgPSB0aGlzLnBhcmVudCAmJiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGhpcy5wYXJlbnQpO1xuICAgIGlmICghaXNCbGFuayh0aGlzLnZhbHVlKSAmJiBjdXN0b21QYXJlbnQpXG4gICAgICB7IGFycmF5aXNoUmVtb3ZlKGN1c3RvbVBhcmVudC5yZWZzLCB0aGlzLnZhbHVlLCB0YWdPckRvbSk7IH1cbiAgfVxufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRoZSBpdGVtIGxvb3BlZCBpbnRvIGFuIG9iamVjdCB1c2VkIHRvIGV4dGVuZCB0aGUgY2hpbGQgdGFnIHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZXhwciAtIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXlzIHVzZWQgdG8gZXh0ZW5kIHRoZSBjaGlsZHJlbiB0YWdzXG4gKiBAcGFyYW0gICB7ICogfSBrZXkgLSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIG5ldyBvYmplY3QgcmV0dXJuZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbCAtIHZhbHVlIGNvbnRhaW5pbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIGluIHRoZSBhcnJheVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBiYXNlIC0gcHJvdG90eXBlIG9iamVjdCBmb3IgdGhlIG5ldyBpdGVtXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IC0gbmV3IG9iamVjdCBjb250YWluaW5nIHRoZSB2YWx1ZXMgb2YgdGhlIG9yaWdpbmFsIGl0ZW1cbiAqXG4gKiBUaGUgdmFyaWFibGVzICdrZXknIGFuZCAndmFsJyBhcmUgYXJiaXRyYXJ5LlxuICogVGhleSBkZXBlbmQgb24gdGhlIGNvbGxlY3Rpb24gdHlwZSBsb29wZWQgKEFycmF5LCBPYmplY3QpXG4gKiBhbmQgb24gdGhlIGV4cHJlc3Npb24gdXNlZCBvbiB0aGUgZWFjaCB0YWdcbiAqXG4gKi9cbmZ1bmN0aW9uIG1raXRlbShleHByLCBrZXksIHZhbCwgYmFzZSkge1xuICB2YXIgaXRlbSA9IGJhc2UgPyBPYmplY3QuY3JlYXRlKGJhc2UpIDoge307XG4gIGl0ZW1bZXhwci5rZXldID0ga2V5O1xuICBpZiAoZXhwci5wb3MpIHsgaXRlbVtleHByLnBvc10gPSB2YWw7IH1cbiAgcmV0dXJuIGl0ZW1cbn1cblxuLyoqXG4gKiBVbm1vdW50IHRoZSByZWR1bmRhbnQgdGFnc1xuICogQHBhcmFtICAgeyBBcnJheSB9IGl0ZW1zIC0gYXJyYXkgY29udGFpbmluZyB0aGUgY3VycmVudCBpdGVtcyB0byBsb29wXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gdGFncyAtIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiB0YWdzXG4gKi9cbmZ1bmN0aW9uIHVubW91bnRSZWR1bmRhbnQoaXRlbXMsIHRhZ3MpIHtcbiAgdmFyIGkgPSB0YWdzLmxlbmd0aCxcbiAgICBqID0gaXRlbXMubGVuZ3RoO1xuXG4gIHdoaWxlIChpID4gaikge1xuICAgIGktLTtcbiAgICByZW1vdmUuYXBwbHkodGFnc1tpXSwgW3RhZ3MsIGldKTtcbiAgfVxufVxuXG5cbi8qKlxuICogUmVtb3ZlIGEgY2hpbGQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gdGFncyBjb2xsZWN0aW9uXG4gKiBAcGFyYW0gICB7IE51bWJlciB9IGkgLSBpbmRleCBvZiB0aGUgdGFnIHRvIHJlbW92ZVxuICovXG5mdW5jdGlvbiByZW1vdmUodGFncywgaSkge1xuICB0YWdzLnNwbGljZShpLCAxKTtcbiAgdGhpcy51bm1vdW50KCk7XG4gIGFycmF5aXNoUmVtb3ZlKHRoaXMucGFyZW50LCB0aGlzLCB0aGlzLl9fLnRhZ05hbWUsIHRydWUpO1xufVxuXG4vKipcbiAqIE1vdmUgdGhlIG5lc3RlZCBjdXN0b20gdGFncyBpbiBub24gY3VzdG9tIGxvb3AgdGFnc1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IE51bWJlciB9IGkgLSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBsb29wIHRhZ1xuICovXG5mdW5jdGlvbiBtb3ZlTmVzdGVkVGFncyhpKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goT2JqZWN0LmtleXModGhpcy50YWdzKSwgZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICBtb3ZlQ2hpbGRUYWcuYXBwbHkodGhpcyQxLnRhZ3NbdGFnTmFtZV0sIFt0YWdOYW1lLCBpXSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIE1vdmUgYSBjaGlsZCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBUYWcgfSBuZXh0VGFnIC0gaW5zdGFuY2Ugb2YgdGhlIG5leHQgdGFnIHByZWNlZGluZyB0aGUgb25lIHdlIHdhbnQgdG8gbW92ZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gbW92ZShyb290LCBuZXh0VGFnLCBpc1ZpcnR1YWwpIHtcbiAgaWYgKGlzVmlydHVhbClcbiAgICB7IG1vdmVWaXJ0dWFsLmFwcGx5KHRoaXMsIFtyb290LCBuZXh0VGFnXSk7IH1cbiAgZWxzZVxuICAgIHsgc2FmZUluc2VydChyb290LCB0aGlzLnJvb3QsIG5leHRUYWcucm9vdCk7IH1cbn1cblxuLyoqXG4gKiBJbnNlcnQgYW5kIG1vdW50IGEgY2hpbGQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gZG9tIG5vZGUgY29udGFpbmluZyBhbGwgdGhlIGxvb3AgY2hpbGRyZW5cbiAqIEBwYXJhbSAgIHsgVGFnIH0gbmV4dFRhZyAtIGluc3RhbmNlIG9mIHRoZSBuZXh0IHRhZyBwcmVjZWRpbmcgdGhlIG9uZSB3ZSB3YW50IHRvIGluc2VydFxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gaW5zZXJ0KHJvb3QsIG5leHRUYWcsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbWFrZVZpcnR1YWwuYXBwbHkodGhpcywgW3Jvb3QsIG5leHRUYWddKTsgfVxuICBlbHNlXG4gICAgeyBzYWZlSW5zZXJ0KHJvb3QsIHRoaXMucm9vdCwgbmV4dFRhZy5yb290KTsgfVxufVxuXG4vKipcbiAqIEFwcGVuZCBhIG5ldyB0YWcgaW50byB0aGUgRE9NXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gZG9tIG5vZGUgY29udGFpbmluZyBhbGwgdGhlIGxvb3AgY2hpbGRyZW5cbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzVmlydHVhbCAtIGlzIGl0IGEgdmlydHVhbCB0YWc/XG4gKi9cbmZ1bmN0aW9uIGFwcGVuZChyb290LCBpc1ZpcnR1YWwpIHtcbiAgaWYgKGlzVmlydHVhbClcbiAgICB7IG1ha2VWaXJ0dWFsLmNhbGwodGhpcywgcm9vdCk7IH1cbiAgZWxzZVxuICAgIHsgcm9vdC5hcHBlbmRDaGlsZCh0aGlzLnJvb3QpOyB9XG59XG5cbi8qKlxuICogTWFuYWdlIHRhZ3MgaGF2aW5nIHRoZSAnZWFjaCdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBET00gbm9kZSB3ZSBuZWVkIHRvIGxvb3BcbiAqIEBwYXJhbSAgIHsgVGFnIH0gcGFyZW50IC0gcGFyZW50IHRhZyBpbnN0YW5jZSB3aGVyZSB0aGUgZG9tIG5vZGUgaXMgY29udGFpbmVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGV4cHIgLSBzdHJpbmcgY29udGFpbmVkIGluIHRoZSAnZWFjaCcgYXR0cmlidXRlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGV4cHJlc3Npb24gb2JqZWN0IGZvciB0aGlzIGVhY2ggbG9vcFxuICovXG5mdW5jdGlvbiBfZWFjaChkb20sIHBhcmVudCwgZXhwcikge1xuXG4gIC8vIHJlbW92ZSB0aGUgZWFjaCBwcm9wZXJ0eSBmcm9tIHRoZSBvcmlnaW5hbCB0YWdcbiAgcmVtQXR0cihkb20sIExPT1BfRElSRUNUSVZFKTtcblxuICB2YXIgbXVzdFJlb3JkZXIgPSB0eXBlb2YgZ2V0QXR0cihkb20sIExPT1BfTk9fUkVPUkRFUl9ESVJFQ1RJVkUpICE9PSBUX1NUUklORyB8fCByZW1BdHRyKGRvbSwgTE9PUF9OT19SRU9SREVSX0RJUkVDVElWRSksXG4gICAgdGFnTmFtZSA9IGdldFRhZ05hbWUoZG9tKSxcbiAgICBpbXBsID0gX19UQUdfSU1QTFt0YWdOYW1lXSxcbiAgICBwYXJlbnROb2RlID0gZG9tLnBhcmVudE5vZGUsXG4gICAgcGxhY2Vob2xkZXIgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIGNoaWxkID0gZ2V0VGFnKGRvbSksXG4gICAgaWZFeHByID0gZ2V0QXR0cihkb20sIENPTkRJVElPTkFMX0RJUkVDVElWRSksXG4gICAgdGFncyA9IFtdLFxuICAgIG9sZEl0ZW1zID0gW10sXG4gICAgaGFzS2V5cyxcbiAgICBpc0xvb3AgPSB0cnVlLFxuICAgIGlzQW5vbnltb3VzID0gIV9fVEFHX0lNUExbdGFnTmFtZV0sXG4gICAgaXNWaXJ0dWFsID0gZG9tLnRhZ05hbWUgPT09ICdWSVJUVUFMJztcblxuICAvLyBwYXJzZSB0aGUgZWFjaCBleHByZXNzaW9uXG4gIGV4cHIgPSB0bXBsLmxvb3BLZXlzKGV4cHIpO1xuICBleHByLmlzTG9vcCA9IHRydWU7XG5cbiAgaWYgKGlmRXhwcikgeyByZW1BdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKTsgfVxuXG4gIC8vIGluc2VydCBhIG1hcmtlZCB3aGVyZSB0aGUgbG9vcCB0YWdzIHdpbGwgYmUgaW5qZWN0ZWRcbiAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocGxhY2Vob2xkZXIsIGRvbSk7XG4gIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tKTtcblxuICBleHByLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZUVhY2goKSB7XG4gICAgLy8gZ2V0IHRoZSBuZXcgaXRlbXMgY29sbGVjdGlvblxuICAgIGV4cHIudmFsdWUgPSB0bXBsKGV4cHIudmFsLCBwYXJlbnQpO1xuXG4gICAgdmFyIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgICBpdGVtcyA9IGV4cHIudmFsdWUsXG4gICAgICBpc09iamVjdCQkMSA9ICFpc0FycmF5KGl0ZW1zKSAmJiAhaXNTdHJpbmcoaXRlbXMpLFxuICAgICAgcm9vdCA9IHBsYWNlaG9sZGVyLnBhcmVudE5vZGU7XG5cbiAgICAvLyBpZiB0aGlzIERPTSB3YXMgcmVtb3ZlZCB0aGUgdXBkYXRlIGhlcmUgaXMgdXNlbGVzc1xuICAgIC8vIHRoaXMgY29uZGl0aW9uIGZpeGVzIGFsc28gYSB3ZWlyZCBhc3luYyBpc3N1ZSBvbiBJRSBpbiBvdXIgdW5pdCB0ZXN0XG4gICAgaWYgKCFyb290KSB7IHJldHVybiB9XG5cbiAgICAvLyBvYmplY3QgbG9vcC4gYW55IGNoYW5nZXMgY2F1c2UgZnVsbCByZWRyYXdcbiAgICBpZiAoaXNPYmplY3QkJDEpIHtcbiAgICAgIGhhc0tleXMgPSBpdGVtcyB8fCBmYWxzZTtcbiAgICAgIGl0ZW1zID0gaGFzS2V5cyA/XG4gICAgICAgIE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiBta2l0ZW0oZXhwciwgaXRlbXNba2V5XSwga2V5KVxuICAgICAgICB9KSA6IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYXNLZXlzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlmRXhwcikge1xuICAgICAgaXRlbXMgPSBpdGVtcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICBpZiAoZXhwci5rZXkgJiYgIWlzT2JqZWN0JCQxKVxuICAgICAgICAgIHsgcmV0dXJuICEhdG1wbChpZkV4cHIsIG1raXRlbShleHByLCBpdGVtLCBpLCBwYXJlbnQpKSB9XG5cbiAgICAgICAgcmV0dXJuICEhdG1wbChpZkV4cHIsIGV4dGVuZChPYmplY3QuY3JlYXRlKHBhcmVudCksIGl0ZW0pKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbG9vcCBhbGwgdGhlIG5ldyBpdGVtc1xuICAgIGVhY2goaXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIC8vIHJlb3JkZXIgb25seSBpZiB0aGUgaXRlbXMgYXJlIG9iamVjdHNcbiAgICAgIHZhclxuICAgICAgICBkb1Jlb3JkZXIgPSBtdXN0UmVvcmRlciAmJiB0eXBlb2YgaXRlbSA9PT0gVF9PQkpFQ1QgJiYgIWhhc0tleXMsXG4gICAgICAgIG9sZFBvcyA9IG9sZEl0ZW1zLmluZGV4T2YoaXRlbSksXG4gICAgICAgIGlzTmV3ID0gb2xkUG9zID09PSAtMSxcbiAgICAgICAgcG9zID0gIWlzTmV3ICYmIGRvUmVvcmRlciA/IG9sZFBvcyA6IGksXG4gICAgICAgIC8vIGRvZXMgYSB0YWcgZXhpc3QgaW4gdGhpcyBwb3NpdGlvbj9cbiAgICAgICAgdGFnID0gdGFnc1twb3NdLFxuICAgICAgICBtdXN0QXBwZW5kID0gaSA+PSBvbGRJdGVtcy5sZW5ndGgsXG4gICAgICAgIG11c3RDcmVhdGUgPSAgZG9SZW9yZGVyICYmIGlzTmV3IHx8ICFkb1Jlb3JkZXIgJiYgIXRhZztcblxuICAgICAgaXRlbSA9ICFoYXNLZXlzICYmIGV4cHIua2V5ID8gbWtpdGVtKGV4cHIsIGl0ZW0sIGkpIDogaXRlbTtcblxuICAgICAgLy8gbmV3IHRhZ1xuICAgICAgaWYgKG11c3RDcmVhdGUpIHtcbiAgICAgICAgdGFnID0gbmV3IFRhZyQxKGltcGwsIHtcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICBpc0xvb3A6IGlzTG9vcCxcbiAgICAgICAgICBpc0Fub255bW91czogaXNBbm9ueW1vdXMsXG4gICAgICAgICAgdGFnTmFtZTogdGFnTmFtZSxcbiAgICAgICAgICByb290OiBkb20uY2xvbmVOb2RlKGlzQW5vbnltb3VzKSxcbiAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICB9LCBkb20uaW5uZXJIVE1MKTtcblxuICAgICAgICAvLyBtb3VudCB0aGUgdGFnXG4gICAgICAgIHRhZy5tb3VudCgpO1xuXG4gICAgICAgIGlmIChtdXN0QXBwZW5kKVxuICAgICAgICAgIHsgYXBwZW5kLmFwcGx5KHRhZywgW2ZyYWcgfHwgcm9vdCwgaXNWaXJ0dWFsXSk7IH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIHsgaW5zZXJ0LmFwcGx5KHRhZywgW3Jvb3QsIHRhZ3NbaV0sIGlzVmlydHVhbF0pOyB9XG5cbiAgICAgICAgaWYgKCFtdXN0QXBwZW5kKSB7IG9sZEl0ZW1zLnNwbGljZShpLCAwLCBpdGVtKTsgfVxuICAgICAgICB0YWdzLnNwbGljZShpLCAwLCB0YWcpO1xuICAgICAgICBpZiAoY2hpbGQpIHsgYXJyYXlpc2hBZGQocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRhZywgdHJ1ZSk7IH1cbiAgICAgIH0gZWxzZSBpZiAocG9zICE9PSBpICYmIGRvUmVvcmRlcikge1xuICAgICAgICAvLyBtb3ZlXG4gICAgICAgIGlmIChjb250YWlucyhpdGVtcywgb2xkSXRlbXNbcG9zXSkpIHtcbiAgICAgICAgICBtb3ZlLmFwcGx5KHRhZywgW3Jvb3QsIHRhZ3NbaV0sIGlzVmlydHVhbF0pO1xuICAgICAgICAgIC8vIG1vdmUgdGhlIG9sZCB0YWcgaW5zdGFuY2VcbiAgICAgICAgICB0YWdzLnNwbGljZShpLCAwLCB0YWdzLnNwbGljZShwb3MsIDEpWzBdKTtcbiAgICAgICAgICAvLyBtb3ZlIHRoZSBvbGQgaXRlbVxuICAgICAgICAgIG9sZEl0ZW1zLnNwbGljZShpLCAwLCBvbGRJdGVtcy5zcGxpY2UocG9zLCAxKVswXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSBpZiBpdCBleGlzdHNcbiAgICAgICAgaWYgKGV4cHIucG9zKSB7IHRhZ1tleHByLnBvc10gPSBpOyB9XG5cbiAgICAgICAgLy8gaWYgdGhlIGxvb3AgdGFncyBhcmUgbm90IGN1c3RvbVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIG1vdmUgYWxsIHRoZWlyIGN1c3RvbSB0YWdzIGludG8gdGhlIHJpZ2h0IHBvc2l0aW9uXG4gICAgICAgIGlmICghY2hpbGQgJiYgdGFnLnRhZ3MpIHsgbW92ZU5lc3RlZFRhZ3MuY2FsbCh0YWcsIGkpOyB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNhY2hlIHRoZSBvcmlnaW5hbCBpdGVtIHRvIHVzZSBpdCBpbiB0aGUgZXZlbnRzIGJvdW5kIHRvIHRoaXMgbm9kZVxuICAgICAgLy8gYW5kIGl0cyBjaGlsZHJlblxuICAgICAgdGFnLl9fLml0ZW0gPSBpdGVtO1xuICAgICAgdGFnLl9fLmluZGV4ID0gaTtcbiAgICAgIHRhZy5fXy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgICAgIGlmICghbXVzdENyZWF0ZSkgeyB0YWcudXBkYXRlKGl0ZW0pOyB9XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgdGhlIHJlZHVuZGFudCB0YWdzXG4gICAgdW5tb3VudFJlZHVuZGFudChpdGVtcywgdGFncyk7XG5cbiAgICAvLyBjbG9uZSB0aGUgaXRlbXMgYXJyYXlcbiAgICBvbGRJdGVtcyA9IGl0ZW1zLnNsaWNlKCk7XG5cbiAgICAvLyB0aGlzIGNvbmRpdGlvbiBpcyB3ZWlyZCB1XG4gICAgcm9vdC5pbnNlcnRCZWZvcmUoZnJhZywgcGxhY2Vob2xkZXIpO1xuICB9O1xuXG4gIGV4cHIudW5tb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIGVhY2godGFncywgZnVuY3Rpb24odCkgeyB0LnVubW91bnQoKTsgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGV4cHJcbn1cblxuLyoqXG4gKiBXYWxrIHRoZSB0YWcgRE9NIHRvIGRldGVjdCB0aGUgZXhwcmVzc2lvbnMgdG8gZXZhbHVhdGVcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSByb290IHRhZyB3aGVyZSB3ZSB3aWxsIHN0YXJ0IGRpZ2dpbmcgdGhlIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBlbXB0eSBhcnJheSB3aGVyZSB0aGUgZXhwcmVzc2lvbnMgd2lsbCBiZSBhZGRlZFxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gbXVzdEluY2x1ZGVSb290IC0gZmxhZyB0byBkZWNpZGUgd2hldGhlciB0aGUgcm9vdCBtdXN0IGJlIHBhcnNlZCBhcyB3ZWxsXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGFuIG9iamVjdCBjb250YWluaW5nIHRoZSByb290IG5vb2RlIGFuZCB0aGUgZG9tIHRyZWVcbiAqL1xuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9ucyhyb290LCBleHByZXNzaW9ucywgbXVzdEluY2x1ZGVSb290KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciB0cmVlID0ge3BhcmVudDoge2NoaWxkcmVuOiBleHByZXNzaW9uc319O1xuXG4gIHdhbGtOb2Rlcyhyb290LCBmdW5jdGlvbiAoZG9tLCBjdHgpIHtcbiAgICB2YXIgdHlwZSA9IGRvbS5ub2RlVHlwZSwgcGFyZW50ID0gY3R4LnBhcmVudCwgYXR0ciwgZXhwciwgdGFnSW1wbDtcbiAgICBpZiAoIW11c3RJbmNsdWRlUm9vdCAmJiBkb20gPT09IHJvb3QpIHsgcmV0dXJuIHtwYXJlbnQ6IHBhcmVudH0gfVxuXG4gICAgLy8gdGV4dCBub2RlXG4gICAgaWYgKHR5cGUgPT09IDMgJiYgZG9tLnBhcmVudE5vZGUudGFnTmFtZSAhPT0gJ1NUWUxFJyAmJiB0bXBsLmhhc0V4cHIoZG9tLm5vZGVWYWx1ZSkpXG4gICAgICB7IHBhcmVudC5jaGlsZHJlbi5wdXNoKHtkb206IGRvbSwgZXhwcjogZG9tLm5vZGVWYWx1ZX0pOyB9XG5cbiAgICBpZiAodHlwZSAhPT0gMSkgeyByZXR1cm4gY3R4IH0gLy8gbm90IGFuIGVsZW1lbnRcblxuICAgIHZhciBpc1ZpcnR1YWwgPSBkb20udGFnTmFtZSA9PT0gJ1ZJUlRVQUwnO1xuXG4gICAgLy8gbG9vcC4gZWFjaCBkb2VzIGl0J3Mgb3duIHRoaW5nIChmb3Igbm93KVxuICAgIGlmIChhdHRyID0gZ2V0QXR0cihkb20sIExPT1BfRElSRUNUSVZFKSkge1xuICAgICAgaWYoaXNWaXJ0dWFsKSB7IHNldEF0dHIoZG9tLCAnbG9vcFZpcnR1YWwnLCB0cnVlKTsgfSAvLyBpZ25vcmUgaGVyZSwgaGFuZGxlZCBpbiBfZWFjaFxuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goX2VhY2goZG9tLCB0aGlzJDEsIGF0dHIpKTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGlmLWF0dHJzIGJlY29tZSB0aGUgbmV3IHBhcmVudC4gQW55IGZvbGxvd2luZyBleHByZXNzaW9ucyAoZWl0aGVyIG9uIHRoZSBjdXJyZW50XG4gICAgLy8gZWxlbWVudCwgb3IgYmVsb3cgaXQpIGJlY29tZSBjaGlsZHJlbiBvZiB0aGlzIGV4cHJlc3Npb24uXG4gICAgaWYgKGF0dHIgPSBnZXRBdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKSkge1xuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goT2JqZWN0LmNyZWF0ZShJZkV4cHIpLmluaXQoZG9tLCB0aGlzJDEsIGF0dHIpKTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChleHByID0gZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkpIHtcbiAgICAgIGlmICh0bXBsLmhhc0V4cHIoZXhwcikpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goe2lzUnRhZzogdHJ1ZSwgZXhwcjogZXhwciwgZG9tOiBkb20sIGF0dHJzOiBbXS5zbGljZS5jYWxsKGRvbS5hdHRyaWJ1dGVzKX0pO1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGlzIGlzIGEgdGFnLCBzdG9wIHRyYXZlcnNpbmcgaGVyZS5cbiAgICAvLyB3ZSBpZ25vcmUgdGhlIHJvb3QsIHNpbmNlIHBhcnNlRXhwcmVzc2lvbnMgaXMgY2FsbGVkIHdoaWxlIHdlJ3JlIG1vdW50aW5nIHRoYXQgcm9vdFxuICAgIHRhZ0ltcGwgPSBnZXRUYWcoZG9tKTtcbiAgICBpZihpc1ZpcnR1YWwpIHtcbiAgICAgIGlmKGdldEF0dHIoZG9tLCAndmlydHVhbGl6ZWQnKSkge2RvbS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGRvbSk7IH0gLy8gdGFnIGNyZWF0ZWQsIHJlbW92ZSBmcm9tIGRvbVxuICAgICAgaWYoIXRhZ0ltcGwgJiYgIWdldEF0dHIoZG9tLCAndmlydHVhbGl6ZWQnKSAmJiAhZ2V0QXR0cihkb20sICdsb29wVmlydHVhbCcpKSAgLy8gb2sgdG8gY3JlYXRlIHZpcnR1YWwgdGFnXG4gICAgICAgIHsgdGFnSW1wbCA9IHsgdG1wbDogZG9tLm91dGVySFRNTCB9OyB9XG4gICAgfVxuXG4gICAgaWYgKHRhZ0ltcGwgJiYgKGRvbSAhPT0gcm9vdCB8fCBtdXN0SW5jbHVkZVJvb3QpKSB7XG4gICAgICBpZihpc1ZpcnR1YWwgJiYgIWdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpKSB7IC8vIGhhbmRsZWQgaW4gdXBkYXRlXG4gICAgICAgIC8vIGNhbiBub3QgcmVtb3ZlIGF0dHJpYnV0ZSBsaWtlIGRpcmVjdGl2ZXNcbiAgICAgICAgLy8gc28gZmxhZyBmb3IgcmVtb3ZhbCBhZnRlciBjcmVhdGlvbiB0byBwcmV2ZW50IG1heGltdW0gc3RhY2sgZXJyb3JcbiAgICAgICAgc2V0QXR0cihkb20sICd2aXJ0dWFsaXplZCcsIHRydWUpO1xuXG4gICAgICAgIHZhciB0YWcgPSBuZXcgVGFnJDEoeyB0bXBsOiBkb20ub3V0ZXJIVE1MIH0sXG4gICAgICAgICAge3Jvb3Q6IGRvbSwgcGFyZW50OiB0aGlzJDF9LFxuICAgICAgICAgIGRvbS5pbm5lckhUTUwpO1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaCh0YWcpOyAvLyBubyByZXR1cm4sIGFub255bW91cyB0YWcsIGtlZXAgcGFyc2luZ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNvbmYgPSB7cm9vdDogZG9tLCBwYXJlbnQ6IHRoaXMkMSwgaGFzSW1wbDogdHJ1ZX07XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGluaXRDaGlsZFRhZyh0YWdJbXBsLCBjb25mLCBkb20uaW5uZXJIVE1MLCB0aGlzJDEpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gYXR0cmlidXRlIGV4cHJlc3Npb25zXG4gICAgcGFyc2VBdHRyaWJ1dGVzLmFwcGx5KHRoaXMkMSwgW2RvbSwgZG9tLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIsIGV4cHIpIHtcbiAgICAgIGlmICghZXhwcikgeyByZXR1cm4gfVxuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goZXhwcik7XG4gICAgfV0pO1xuXG4gICAgLy8gd2hhdGV2ZXIgdGhlIHBhcmVudCBpcywgYWxsIGNoaWxkIGVsZW1lbnRzIGdldCB0aGUgc2FtZSBwYXJlbnQuXG4gICAgLy8gSWYgdGhpcyBlbGVtZW50IGhhZCBhbiBpZi1hdHRyLCB0aGF0J3MgdGhlIHBhcmVudCBmb3IgYWxsIGNoaWxkIGVsZW1lbnRzXG4gICAgcmV0dXJuIHtwYXJlbnQ6IHBhcmVudH1cbiAgfSwgdHJlZSk7XG59XG5cbi8qKlxuICogQ2FsbHMgYGZuYCBmb3IgZXZlcnkgYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQuIElmIHRoYXQgYXR0ciBoYXMgYW4gZXhwcmVzc2lvbixcbiAqIGl0IGlzIGFsc28gcGFzc2VkIHRvIGZuLlxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gZG9tIC0gZG9tIG5vZGUgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBhdHRycyAtIGFycmF5IG9mIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIHRvIGV4ZWMgb24gYW55IGl0ZXJhdGlvblxuICovXG5mdW5jdGlvbiBwYXJzZUF0dHJpYnV0ZXMoZG9tLCBhdHRycywgZm4pIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZWFjaChhdHRycywgZnVuY3Rpb24gKGF0dHIpIHtcbiAgICBpZiAoIWF0dHIpIHsgcmV0dXJuIGZhbHNlIH1cblxuICAgIHZhciBuYW1lID0gYXR0ci5uYW1lLCBib29sID0gaXNCb29sQXR0cihuYW1lKSwgZXhwcjtcblxuICAgIGlmIChjb250YWlucyhSRUZfRElSRUNUSVZFUywgbmFtZSkpIHtcbiAgICAgIGV4cHIgPSAgT2JqZWN0LmNyZWF0ZShSZWZFeHByKS5pbml0KGRvbSwgdGhpcyQxLCBuYW1lLCBhdHRyLnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRtcGwuaGFzRXhwcihhdHRyLnZhbHVlKSkge1xuICAgICAgZXhwciA9IHtkb206IGRvbSwgZXhwcjogYXR0ci52YWx1ZSwgYXR0cjogbmFtZSwgYm9vbDogYm9vbH07XG4gICAgfVxuXG4gICAgZm4oYXR0ciwgZXhwcik7XG4gIH0pO1xufVxuXG4vKlxuICBJbmNsdWRlcyBoYWNrcyBuZWVkZWQgZm9yIHRoZSBJbnRlcm5ldCBFeHBsb3JlciB2ZXJzaW9uIDkgYW5kIGJlbG93XG4gIFNlZTogaHR0cDovL2thbmdheC5naXRodWIuaW8vY29tcGF0LXRhYmxlL2VzNS8jaWU4XG4gICAgICAgaHR0cDovL2NvZGVwbGFuZXQuaW8vZHJvcHBpbmctaWU4L1xuKi9cblxudmFyIHJlSGFzWWllbGQgID0gLzx5aWVsZFxcYi9pO1xudmFyIHJlWWllbGRBbGwgID0gLzx5aWVsZFxccyooPzpcXC8+fD4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPnw+KS9pZztcbnZhciByZVlpZWxkU3JjICA9IC88eWllbGRcXHMrdG89WydcIl0oW14nXCI+XSopWydcIl1cXHMqPihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+L2lnO1xudmFyIHJlWWllbGREZXN0ID0gLzx5aWVsZFxccytmcm9tPVsnXCJdPyhbLVxcd10rKVsnXCJdP1xccyooPzpcXC8+fD4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPikvaWc7XG52YXIgcm9vdEVscyA9IHsgdHI6ICd0Ym9keScsIHRoOiAndHInLCB0ZDogJ3RyJywgY29sOiAnY29sZ3JvdXAnIH07XG52YXIgdGJsVGFncyA9IElFX1ZFUlNJT04gJiYgSUVfVkVSU0lPTiA8IDEwID8gUkVfU1BFQ0lBTF9UQUdTIDogUkVfU1BFQ0lBTF9UQUdTX05PX09QVElPTjtcbnZhciBHRU5FUklDID0gJ2Rpdic7XG52YXIgU1ZHID0gJ3N2Zyc7XG5cblxuLypcbiAgQ3JlYXRlcyB0aGUgcm9vdCBlbGVtZW50IGZvciB0YWJsZSBvciBzZWxlY3QgY2hpbGQgZWxlbWVudHM6XG4gIHRyL3RoL3RkL3RoZWFkL3Rmb290L3Rib2R5L2NhcHRpb24vY29sL2NvbGdyb3VwL29wdGlvbi9vcHRncm91cFxuKi9cbmZ1bmN0aW9uIHNwZWNpYWxUYWdzKGVsLCB0bXBsLCB0YWdOYW1lKSB7XG5cbiAgdmFyXG4gICAgc2VsZWN0ID0gdGFnTmFtZVswXSA9PT0gJ28nLFxuICAgIHBhcmVudCA9IHNlbGVjdCA/ICdzZWxlY3Q+JyA6ICd0YWJsZT4nO1xuXG4gIC8vIHRyaW0oKSBpcyBpbXBvcnRhbnQgaGVyZSwgdGhpcyBlbnN1cmVzIHdlIGRvbid0IGhhdmUgYXJ0aWZhY3RzLFxuICAvLyBzbyB3ZSBjYW4gY2hlY2sgaWYgd2UgaGF2ZSBvbmx5IG9uZSBlbGVtZW50IGluc2lkZSB0aGUgcGFyZW50XG4gIGVsLmlubmVySFRNTCA9ICc8JyArIHBhcmVudCArIHRtcGwudHJpbSgpICsgJzwvJyArIHBhcmVudDtcbiAgcGFyZW50ID0gZWwuZmlyc3RDaGlsZDtcblxuICAvLyByZXR1cm5zIHRoZSBpbW1lZGlhdGUgcGFyZW50IGlmIHRyL3RoL3RkL2NvbCBpcyB0aGUgb25seSBlbGVtZW50LCBpZiBub3RcbiAgLy8gcmV0dXJucyB0aGUgd2hvbGUgdHJlZSwgYXMgdGhpcyBjYW4gaW5jbHVkZSBhZGRpdGlvbmFsIGVsZW1lbnRzXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChzZWxlY3QpIHtcbiAgICBwYXJlbnQuc2VsZWN0ZWRJbmRleCA9IC0xOyAgLy8gZm9yIElFOSwgY29tcGF0aWJsZSB3L2N1cnJlbnQgcmlvdCBiZWhhdmlvclxuICB9IGVsc2Uge1xuICAgIC8vIGF2b2lkcyBpbnNlcnRpb24gb2YgY29pbnRhaW5lciBpbnNpZGUgY29udGFpbmVyIChleDogdGJvZHkgaW5zaWRlIHRib2R5KVxuICAgIHZhciB0bmFtZSA9IHJvb3RFbHNbdGFnTmFtZV07XG4gICAgaWYgKHRuYW1lICYmIHBhcmVudC5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMSkgeyBwYXJlbnQgPSAkKHRuYW1lLCBwYXJlbnQpOyB9XG4gIH1cbiAgcmV0dXJuIHBhcmVudFxufVxuXG4vKlxuICBSZXBsYWNlIHRoZSB5aWVsZCB0YWcgZnJvbSBhbnkgdGFnIHRlbXBsYXRlIHdpdGggdGhlIGlubmVySFRNTCBvZiB0aGVcbiAgb3JpZ2luYWwgdGFnIGluIHRoZSBwYWdlXG4qL1xuZnVuY3Rpb24gcmVwbGFjZVlpZWxkKHRtcGwsIGh0bWwpIHtcbiAgLy8gZG8gbm90aGluZyBpZiBubyB5aWVsZFxuICBpZiAoIXJlSGFzWWllbGQudGVzdCh0bXBsKSkgeyByZXR1cm4gdG1wbCB9XG5cbiAgLy8gYmUgY2FyZWZ1bCB3aXRoICMxMzQzIC0gc3RyaW5nIG9uIHRoZSBzb3VyY2UgaGF2aW5nIGAkMWBcbiAgdmFyIHNyYyA9IHt9O1xuXG4gIGh0bWwgPSBodG1sICYmIGh0bWwucmVwbGFjZShyZVlpZWxkU3JjLCBmdW5jdGlvbiAoXywgcmVmLCB0ZXh0KSB7XG4gICAgc3JjW3JlZl0gPSBzcmNbcmVmXSB8fCB0ZXh0OyAgIC8vIHByZXNlcnZlIGZpcnN0IGRlZmluaXRpb25cbiAgICByZXR1cm4gJydcbiAgfSkudHJpbSgpO1xuXG4gIHJldHVybiB0bXBsXG4gICAgLnJlcGxhY2UocmVZaWVsZERlc3QsIGZ1bmN0aW9uIChfLCByZWYsIGRlZikgeyAgLy8geWllbGQgd2l0aCBmcm9tIC0gdG8gYXR0cnNcbiAgICAgIHJldHVybiBzcmNbcmVmXSB8fCBkZWYgfHwgJydcbiAgICB9KVxuICAgIC5yZXBsYWNlKHJlWWllbGRBbGwsIGZ1bmN0aW9uIChfLCBkZWYpIHsgICAgICAgIC8vIHlpZWxkIHdpdGhvdXQgYW55IFwiZnJvbVwiXG4gICAgICByZXR1cm4gaHRtbCB8fCBkZWYgfHwgJydcbiAgICB9KVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBET00gZWxlbWVudCB0byB3cmFwIHRoZSBnaXZlbiBjb250ZW50LiBOb3JtYWxseSBhbiBgRElWYCwgYnV0IGNhbiBiZVxuICogYWxzbyBhIGBUQUJMRWAsIGBTRUxFQ1RgLCBgVEJPRFlgLCBgVFJgLCBvciBgQ09MR1JPVVBgIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0bXBsICAtIFRoZSB0ZW1wbGF0ZSBjb21pbmcgZnJvbSB0aGUgY3VzdG9tIHRhZyBkZWZpbml0aW9uXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGh0bWwgLSBIVE1MIGNvbnRlbnQgdGhhdCBjb21lcyBmcm9tIHRoZSBET00gZWxlbWVudCB3aGVyZSB5b3VcbiAqICAgICAgICAgICB3aWxsIG1vdW50IHRoZSB0YWcsIG1vc3RseSB0aGUgb3JpZ2luYWwgdGFnIGluIHRoZSBwYWdlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1N2ZyAtIHRydWUgaWYgdGhlIHJvb3Qgbm9kZSBpcyBhbiBzdmdcbiAqIEByZXR1cm5zIHsgSFRNTEVsZW1lbnQgfSBET00gZWxlbWVudCB3aXRoIF90bXBsXyBtZXJnZWQgdGhyb3VnaCBgWUlFTERgIHdpdGggdGhlIF9odG1sXy5cbiAqL1xuZnVuY3Rpb24gbWtkb20odG1wbCwgaHRtbCwgaXNTdmckJDEpIHtcbiAgdmFyIG1hdGNoICAgPSB0bXBsICYmIHRtcGwubWF0Y2goL15cXHMqPChbLVxcd10rKS8pLFxuICAgIHRhZ05hbWUgPSBtYXRjaCAmJiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpLFxuICAgIGVsID0gbWtFbChpc1N2ZyQkMSA/IFNWRyA6IEdFTkVSSUMpO1xuXG4gIC8vIHJlcGxhY2UgYWxsIHRoZSB5aWVsZCB0YWdzIHdpdGggdGhlIHRhZyBpbm5lciBodG1sXG4gIHRtcGwgPSByZXBsYWNlWWllbGQodG1wbCwgaHRtbCk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHRibFRhZ3MudGVzdCh0YWdOYW1lKSlcbiAgICB7IGVsID0gc3BlY2lhbFRhZ3MoZWwsIHRtcGwsIHRhZ05hbWUpOyB9XG4gIGVsc2VcbiAgICB7IHNldElubmVySFRNTChlbCwgdG1wbCk7IH1cblxuICByZXR1cm4gZWxcbn1cblxuLyoqXG4gKiBBbm90aGVyIHdheSB0byBjcmVhdGUgYSByaW90IHRhZyBhIGJpdCBtb3JlIGVzNiBmcmllbmRseVxuICogQHBhcmFtIHsgSFRNTEVsZW1lbnQgfSBlbCAtIHRhZyBET00gc2VsZWN0b3Igb3IgRE9NIG5vZGUvc1xuICogQHBhcmFtIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBsb2dpY1xuICogQHJldHVybnMgeyBUYWcgfSBuZXcgcmlvdCB0YWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gVGFnJDIoZWwsIG9wdHMpIHtcbiAgLy8gZ2V0IHRoZSB0YWcgcHJvcGVydGllcyBmcm9tIHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICB2YXIgcmVmID0gdGhpcztcbiAgdmFyIG5hbWUgPSByZWYubmFtZTtcbiAgdmFyIHRtcGwgPSByZWYudG1wbDtcbiAgdmFyIGNzcyA9IHJlZi5jc3M7XG4gIHZhciBhdHRycyA9IHJlZi5hdHRycztcbiAgdmFyIG9uQ3JlYXRlID0gcmVmLm9uQ3JlYXRlO1xuICAvLyByZWdpc3RlciBhIG5ldyB0YWcgYW5kIGNhY2hlIHRoZSBjbGFzcyBwcm90b3R5cGVcbiAgaWYgKCFfX1RBR19JTVBMW25hbWVdKSB7XG4gICAgdGFnJDEobmFtZSwgdG1wbCwgY3NzLCBhdHRycywgb25DcmVhdGUpO1xuICAgIC8vIGNhY2hlIHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICAgIF9fVEFHX0lNUExbbmFtZV0uY2xhc3MgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICB9XG5cbiAgLy8gbW91bnQgdGhlIHRhZyB1c2luZyB0aGUgY2xhc3MgaW5zdGFuY2VcbiAgbW91bnRUbyhlbCwgbmFtZSwgb3B0cywgdGhpcyk7XG4gIC8vIGluamVjdCB0aGUgY29tcG9uZW50IGNzc1xuICBpZiAoY3NzKSB7IHN0eWxlTWFuYWdlci5pbmplY3QoKTsgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJpb3QgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgbmFtZSAtIG5hbWUvaWQgb2YgdGhlIG5ldyByaW90IHRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIHRtcGwgLSB0YWcgdGVtcGxhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBjc3MgLSBjdXN0b20gdGFnIGNzc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGF0dHJzIC0gcm9vdCB0YWcgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gdXNlciBmdW5jdGlvblxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lL2lkIG9mIHRoZSB0YWcganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIHRhZyQxKG5hbWUsIHRtcGwsIGNzcywgYXR0cnMsIGZuKSB7XG4gIGlmIChpc0Z1bmN0aW9uKGF0dHJzKSkge1xuICAgIGZuID0gYXR0cnM7XG5cbiAgICBpZiAoL15bXFx3XFwtXStcXHM/PS8udGVzdChjc3MpKSB7XG4gICAgICBhdHRycyA9IGNzcztcbiAgICAgIGNzcyA9ICcnO1xuICAgIH0gZWxzZVxuICAgICAgeyBhdHRycyA9ICcnOyB9XG4gIH1cblxuICBpZiAoY3NzKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY3NzKSlcbiAgICAgIHsgZm4gPSBjc3M7IH1cbiAgICBlbHNlXG4gICAgICB7IHN0eWxlTWFuYWdlci5hZGQoY3NzKTsgfVxuICB9XG5cbiAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgX19UQUdfSU1QTFtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdG1wbDogdG1wbCwgYXR0cnM6IGF0dHJzLCBmbjogZm4gfTtcblxuICByZXR1cm4gbmFtZVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyByaW90IHRhZyBpbXBsZW1lbnRhdGlvbiAoZm9yIHVzZSBieSB0aGUgY29tcGlsZXIpXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgbmFtZSAtIG5hbWUvaWQgb2YgdGhlIG5ldyByaW90IHRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIHRtcGwgLSB0YWcgdGVtcGxhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBjc3MgLSBjdXN0b20gdGFnIGNzc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGF0dHJzIC0gcm9vdCB0YWcgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gdXNlciBmdW5jdGlvblxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lL2lkIG9mIHRoZSB0YWcganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIHRhZzIkMShuYW1lLCB0bXBsLCBjc3MsIGF0dHJzLCBmbikge1xuICBpZiAoY3NzKSB7IHN0eWxlTWFuYWdlci5hZGQoY3NzLCBuYW1lKTsgfVxuXG4gIF9fVEFHX0lNUExbbmFtZV0gPSB7IG5hbWU6IG5hbWUsIHRtcGw6IHRtcGwsIGF0dHJzOiBhdHRycywgZm46IGZuIH07XG5cbiAgcmV0dXJuIG5hbWVcbn1cblxuLyoqXG4gKiBNb3VudCBhIHRhZyB1c2luZyBhIHNwZWNpZmljIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtICAgeyAqIH0gc2VsZWN0b3IgLSB0YWcgRE9NIHNlbGVjdG9yIG9yIERPTSBub2RlL3NcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIHRhZyBpbXBsZW1lbnRhdGlvbiBuYW1lXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdHMgLSB0YWcgbG9naWNcbiAqIEByZXR1cm5zIHsgQXJyYXkgfSBuZXcgdGFncyBpbnN0YW5jZXNcbiAqL1xuZnVuY3Rpb24gbW91bnQkMShzZWxlY3RvciwgdGFnTmFtZSwgb3B0cykge1xuICB2YXIgdGFncyA9IFtdO1xuICB2YXIgZWxlbSwgYWxsVGFncztcblxuICBmdW5jdGlvbiBwdXNoVGFnc1RvKHJvb3QpIHtcbiAgICBpZiAocm9vdC50YWdOYW1lKSB7XG4gICAgICB2YXIgcmlvdFRhZyA9IGdldEF0dHIocm9vdCwgSVNfRElSRUNUSVZFKSwgdGFnO1xuXG4gICAgICAvLyBoYXZlIHRhZ05hbWU/IGZvcmNlIHJpb3QtdGFnIHRvIGJlIHRoZSBzYW1lXG4gICAgICBpZiAodGFnTmFtZSAmJiByaW90VGFnICE9PSB0YWdOYW1lKSB7XG4gICAgICAgIHJpb3RUYWcgPSB0YWdOYW1lO1xuICAgICAgICBzZXRBdHRyKHJvb3QsIElTX0RJUkVDVElWRSwgdGFnTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIHRhZyA9IG1vdW50VG8ocm9vdCwgcmlvdFRhZyB8fCByb290LnRhZ05hbWUudG9Mb3dlckNhc2UoKSwgb3B0cyk7XG5cbiAgICAgIGlmICh0YWcpXG4gICAgICAgIHsgdGFncy5wdXNoKHRhZyk7IH1cbiAgICB9IGVsc2UgaWYgKHJvb3QubGVuZ3RoKVxuICAgICAgeyBlYWNoKHJvb3QsIHB1c2hUYWdzVG8pOyB9IC8vIGFzc3VtZSBub2RlTGlzdFxuICB9XG5cbiAgLy8gaW5qZWN0IHN0eWxlcyBpbnRvIERPTVxuICBzdHlsZU1hbmFnZXIuaW5qZWN0KCk7XG5cbiAgaWYgKGlzT2JqZWN0KHRhZ05hbWUpKSB7XG4gICAgb3B0cyA9IHRhZ05hbWU7XG4gICAgdGFnTmFtZSA9IDA7XG4gIH1cblxuICAvLyBjcmF3bCB0aGUgRE9NIHRvIGZpbmQgdGhlIHRhZ1xuICBpZiAoaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgc2VsZWN0b3IgPSBzZWxlY3RvciA9PT0gJyonID9cbiAgICAgIC8vIHNlbGVjdCBhbGwgcmVnaXN0ZXJlZCB0YWdzXG4gICAgICAvLyAmIHRhZ3MgZm91bmQgd2l0aCB0aGUgcmlvdC10YWcgYXR0cmlidXRlIHNldFxuICAgICAgYWxsVGFncyA9IHNlbGVjdFRhZ3MoKSA6XG4gICAgICAvLyBvciBqdXN0IHRoZSBvbmVzIG5hbWVkIGxpa2UgdGhlIHNlbGVjdG9yXG4gICAgICBzZWxlY3RvciArIHNlbGVjdFRhZ3Moc2VsZWN0b3Iuc3BsaXQoLywgKi8pKTtcblxuICAgIC8vIG1ha2Ugc3VyZSB0byBwYXNzIGFsd2F5cyBhIHNlbGVjdG9yXG4gICAgLy8gdG8gdGhlIHF1ZXJ5U2VsZWN0b3JBbGwgZnVuY3Rpb25cbiAgICBlbGVtID0gc2VsZWN0b3IgPyAkJChzZWxlY3RvcikgOiBbXTtcbiAgfVxuICBlbHNlXG4gICAgLy8gcHJvYmFibHkgeW91IGhhdmUgcGFzc2VkIGFscmVhZHkgYSB0YWcgb3IgYSBOb2RlTGlzdFxuICAgIHsgZWxlbSA9IHNlbGVjdG9yOyB9XG5cbiAgLy8gc2VsZWN0IGFsbCB0aGUgcmVnaXN0ZXJlZCBhbmQgbW91bnQgdGhlbSBpbnNpZGUgdGhlaXIgcm9vdCBlbGVtZW50c1xuICBpZiAodGFnTmFtZSA9PT0gJyonKSB7XG4gICAgLy8gZ2V0IGFsbCBjdXN0b20gdGFnc1xuICAgIHRhZ05hbWUgPSBhbGxUYWdzIHx8IHNlbGVjdFRhZ3MoKTtcbiAgICAvLyBpZiB0aGUgcm9vdCBlbHMgaXQncyBqdXN0IGEgc2luZ2xlIHRhZ1xuICAgIGlmIChlbGVtLnRhZ05hbWUpXG4gICAgICB7IGVsZW0gPSAkJCh0YWdOYW1lLCBlbGVtKTsgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gc2VsZWN0IGFsbCB0aGUgY2hpbGRyZW4gZm9yIGFsbCB0aGUgZGlmZmVyZW50IHJvb3QgZWxlbWVudHNcbiAgICAgIHZhciBub2RlTGlzdCA9IFtdO1xuXG4gICAgICBlYWNoKGVsZW0sIGZ1bmN0aW9uIChfZWwpIHsgcmV0dXJuIG5vZGVMaXN0LnB1c2goJCQodGFnTmFtZSwgX2VsKSk7IH0pO1xuXG4gICAgICBlbGVtID0gbm9kZUxpc3Q7XG4gICAgfVxuICAgIC8vIGdldCByaWQgb2YgdGhlIHRhZ05hbWVcbiAgICB0YWdOYW1lID0gMDtcbiAgfVxuXG4gIHB1c2hUYWdzVG8oZWxlbSk7XG5cbiAgcmV0dXJuIHRhZ3Ncbn1cblxuLy8gQ3JlYXRlIGEgbWl4aW4gdGhhdCBjb3VsZCBiZSBnbG9iYWxseSBzaGFyZWQgYWNyb3NzIGFsbCB0aGUgdGFnc1xudmFyIG1peGlucyA9IHt9O1xudmFyIGdsb2JhbHMgPSBtaXhpbnNbR0xPQkFMX01JWElOXSA9IHt9O1xudmFyIG1peGluc19pZCA9IDA7XG5cbi8qKlxuICogQ3JlYXRlL1JldHVybiBhIG1peGluIGJ5IGl0cyBuYW1lXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICBuYW1lIC0gbWl4aW4gbmFtZSAoZ2xvYmFsIG1peGluIGlmIG9iamVjdClcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG1peCAtIG1peGluIGxvZ2ljXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBnIC0gaXMgZ2xvYmFsP1xuICogQHJldHVybnMgeyBPYmplY3QgfSAgdGhlIG1peGluIGxvZ2ljXG4gKi9cbmZ1bmN0aW9uIG1peGluJDEobmFtZSwgbWl4LCBnKSB7XG4gIC8vIFVubmFtZWQgZ2xvYmFsXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIG1peGluJDEoKFwiX19cIiArIChtaXhpbnNfaWQrKykgKyBcIl9fXCIpLCBuYW1lLCB0cnVlKTtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdG9yZSA9IGcgPyBnbG9iYWxzIDogbWl4aW5zO1xuXG4gIC8vIEdldHRlclxuICBpZiAoIW1peCkge1xuICAgIGlmIChpc1VuZGVmaW5lZChzdG9yZVtuYW1lXSkpXG4gICAgICB7IHRocm93IG5ldyBFcnJvcigoXCJVbnJlZ2lzdGVyZWQgbWl4aW46IFwiICsgbmFtZSkpIH1cblxuICAgIHJldHVybiBzdG9yZVtuYW1lXVxuICB9XG5cbiAgLy8gU2V0dGVyXG4gIHN0b3JlW25hbWVdID0gaXNGdW5jdGlvbihtaXgpID9cbiAgICBleHRlbmQobWl4LnByb3RvdHlwZSwgc3RvcmVbbmFtZV0gfHwge30pICYmIG1peCA6XG4gICAgZXh0ZW5kKHN0b3JlW25hbWVdIHx8IHt9LCBtaXgpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBhbGwgdGhlIHRhZ3MgaW5zdGFuY2VzIGNyZWF0ZWRcbiAqIEByZXR1cm5zIHsgQXJyYXkgfSBhbGwgdGhlIHRhZ3MgaW5zdGFuY2VzXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZSQxKCkge1xuICByZXR1cm4gZWFjaChfX1RBR1NfQ0FDSEUsIGZ1bmN0aW9uICh0YWcpIHsgcmV0dXJuIHRhZy51cGRhdGUoKTsgfSlcbn1cblxuZnVuY3Rpb24gdW5yZWdpc3RlciQxKG5hbWUpIHtcbiAgX19UQUdfSU1QTFtuYW1lXSA9IG51bGw7XG59XG5cbnZhciB2ZXJzaW9uJDEgPSAndjMuNi4wJztcblxuXG52YXIgY29yZSA9IE9iamVjdC5mcmVlemUoe1xuXHRUYWc6IFRhZyQyLFxuXHR0YWc6IHRhZyQxLFxuXHR0YWcyOiB0YWcyJDEsXG5cdG1vdW50OiBtb3VudCQxLFxuXHRtaXhpbjogbWl4aW4kMSxcblx0dXBkYXRlOiB1cGRhdGUkMSxcblx0dW5yZWdpc3RlcjogdW5yZWdpc3RlciQxLFxuXHR2ZXJzaW9uOiB2ZXJzaW9uJDFcbn0pO1xuXG4vLyBjb3VudGVyIHRvIGdpdmUgYSB1bmlxdWUgaWQgdG8gYWxsIHRoZSBUYWcgaW5zdGFuY2VzXG52YXIgX191aWQgPSAwO1xuXG4vKipcbiAqIFdlIG5lZWQgdG8gdXBkYXRlIG9wdHMgZm9yIHRoaXMgdGFnLiBUaGF0IHJlcXVpcmVzIHVwZGF0aW5nIHRoZSBleHByZXNzaW9uc1xuICogaW4gYW55IGF0dHJpYnV0ZXMgb24gdGhlIHRhZywgYW5kIHRoZW4gY29weWluZyB0aGUgcmVzdWx0IG9udG8gb3B0cy5cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAge0Jvb2xlYW59IGlzTG9vcCAtIGlzIGl0IGEgbG9vcCB0YWc/XG4gKiBAcGFyYW0gICB7IFRhZyB9ICBwYXJlbnQgLSBwYXJlbnQgdGFnIG5vZGVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9ICBpc0Fub255bW91cyAtIGlzIGl0IGEgdGFnIHdpdGhvdXQgYW55IGltcGw/IChhIHRhZyBub3QgcmVnaXN0ZXJlZClcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG9wdHMgLSB0YWcgb3B0aW9uc1xuICogQHBhcmFtICAgeyBBcnJheSB9ICBpbnN0QXR0cnMgLSB0YWcgYXR0cmlidXRlcyBhcnJheVxuICovXG5mdW5jdGlvbiB1cGRhdGVPcHRzKGlzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgb3B0cywgaW5zdEF0dHJzKSB7XG4gIC8vIGlzQW5vbnltb3VzIGBlYWNoYCB0YWdzIHRyZWF0IGBkb21gIGFuZCBgcm9vdGAgZGlmZmVyZW50bHkuIEluIHRoaXMgY2FzZVxuICAvLyAoYW5kIG9ubHkgdGhpcyBjYXNlKSB3ZSBkb24ndCBuZWVkIHRvIGRvIHVwZGF0ZU9wdHMsIGJlY2F1c2UgdGhlIHJlZ3VsYXIgcGFyc2VcbiAgLy8gd2lsbCB1cGRhdGUgdGhvc2UgYXR0cnMuIFBsdXMsIGlzQW5vbnltb3VzIHRhZ3MgZG9uJ3QgbmVlZCBvcHRzIGFueXdheVxuICBpZiAoaXNMb29wICYmIGlzQW5vbnltb3VzKSB7IHJldHVybiB9XG5cbiAgdmFyIGN0eCA9ICFpc0Fub255bW91cyAmJiBpc0xvb3AgPyB0aGlzIDogcGFyZW50IHx8IHRoaXM7XG4gIGVhY2goaW5zdEF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgIGlmIChhdHRyLmV4cHIpIHsgdXBkYXRlQWxsRXhwcmVzc2lvbnMuY2FsbChjdHgsIFthdHRyLmV4cHJdKTsgfVxuICAgIC8vIG5vcm1hbGl6ZSB0aGUgYXR0cmlidXRlIG5hbWVzXG4gICAgb3B0c1t0b0NhbWVsKGF0dHIubmFtZSkucmVwbGFjZShBVFRSU19QUkVGSVgsICcnKV0gPSBhdHRyLmV4cHIgPyBhdHRyLmV4cHIudmFsdWUgOiBhdHRyLnZhbHVlO1xuICB9KTtcbn1cblxuXG4vKipcbiAqIFRhZyBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0geyBPYmplY3QgfSBpbXBsIC0gaXQgY29udGFpbnMgdGhlIHRhZyB0ZW1wbGF0ZSwgYW5kIGxvZ2ljXG4gKiBAcGFyYW0geyBPYmplY3QgfSBjb25mIC0gdGFnIG9wdGlvbnNcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGlubmVySFRNTCAtIGh0bWwgdGhhdCBldmVudHVhbGx5IHdlIG5lZWQgdG8gaW5qZWN0IGluIHRoZSB0YWdcbiAqL1xuZnVuY3Rpb24gVGFnJDEoaW1wbCwgY29uZiwgaW5uZXJIVE1MKSB7XG4gIGlmICggaW1wbCA9PT0gdm9pZCAwICkgaW1wbCA9IHt9O1xuICBpZiAoIGNvbmYgPT09IHZvaWQgMCApIGNvbmYgPSB7fTtcblxuICB2YXIgb3B0cyA9IGV4dGVuZCh7fSwgY29uZi5vcHRzKSxcbiAgICBwYXJlbnQgPSBjb25mLnBhcmVudCxcbiAgICBpc0xvb3AgPSBjb25mLmlzTG9vcCxcbiAgICBpc0Fub255bW91cyA9ICEhY29uZi5pc0Fub255bW91cyxcbiAgICBza2lwQW5vbnltb3VzID0gc2V0dGluZ3MkMS5za2lwQW5vbnltb3VzVGFncyAmJiBpc0Fub255bW91cyxcbiAgICBpdGVtID0gY2xlYW5VcERhdGEoY29uZi5pdGVtKSxcbiAgICBpbmRleCA9IGNvbmYuaW5kZXgsIC8vIGF2YWlsYWJsZSBvbmx5IGZvciB0aGUgbG9vcGVkIG5vZGVzXG4gICAgaW5zdEF0dHJzID0gW10sIC8vIEFsbCBhdHRyaWJ1dGVzIG9uIHRoZSBUYWcgd2hlbiBpdCdzIGZpcnN0IHBhcnNlZFxuICAgIGltcGxBdHRycyA9IFtdLCAvLyBleHByZXNzaW9ucyBvbiB0aGlzIHR5cGUgb2YgVGFnXG4gICAgZXhwcmVzc2lvbnMgPSBbXSxcbiAgICByb290ID0gY29uZi5yb290LFxuICAgIHRhZ05hbWUgPSBjb25mLnRhZ05hbWUgfHwgZ2V0VGFnTmFtZShyb290KSxcbiAgICBpc1ZpcnR1YWwgPSB0YWdOYW1lID09PSAndmlydHVhbCcsXG4gICAgaXNJbmxpbmUgPSAhaXNWaXJ0dWFsICYmICFpbXBsLnRtcGwsXG4gICAgcHJvcHNJblN5bmNXaXRoUGFyZW50ID0gW10sXG4gICAgZG9tO1xuXG4gIC8vIG1ha2UgdGhpcyB0YWcgb2JzZXJ2YWJsZVxuICBpZiAoIXNraXBBbm9ueW1vdXMpIHsgb2JzZXJ2YWJsZSQxKHRoaXMpOyB9XG4gIC8vIG9ubHkgY2FsbCB1bm1vdW50IGlmIHdlIGhhdmUgYSB2YWxpZCBfX1RBR19JTVBMIChoYXMgbmFtZSBwcm9wZXJ0eSlcbiAgaWYgKGltcGwubmFtZSAmJiByb290Ll90YWcpIHsgcm9vdC5fdGFnLnVubW91bnQodHJ1ZSk7IH1cblxuICAvLyBub3QgeWV0IG1vdW50ZWRcbiAgdGhpcy5pc01vdW50ZWQgPSBmYWxzZTtcblxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX18nLCB7XG4gICAgaXNBbm9ueW1vdXM6IGlzQW5vbnltb3VzLFxuICAgIGluc3RBdHRyczogaW5zdEF0dHJzLFxuICAgIGlubmVySFRNTDogaW5uZXJIVE1MLFxuICAgIHRhZ05hbWU6IHRhZ05hbWUsXG4gICAgaW5kZXg6IGluZGV4LFxuICAgIGlzTG9vcDogaXNMb29wLFxuICAgIGlzSW5saW5lOiBpc0lubGluZSxcbiAgICAvLyB0YWdzIGhhdmluZyBldmVudCBsaXN0ZW5lcnNcbiAgICAvLyBpdCB3b3VsZCBiZSBiZXR0ZXIgdG8gdXNlIHdlYWsgbWFwcyBoZXJlIGJ1dCB3ZSBjYW4gbm90IGludHJvZHVjZSBicmVha2luZyBjaGFuZ2VzIG5vd1xuICAgIGxpc3RlbmVyczogW10sXG4gICAgLy8gdGhlc2UgdmFycyB3aWxsIGJlIG5lZWRlZCBvbmx5IGZvciB0aGUgdmlydHVhbCB0YWdzXG4gICAgdmlydHM6IFtdLFxuICAgIHRhaWw6IG51bGwsXG4gICAgaGVhZDogbnVsbCxcbiAgICBwYXJlbnQ6IG51bGwsXG4gICAgaXRlbTogbnVsbFxuICB9KTtcblxuICAvLyBjcmVhdGUgYSB1bmlxdWUgaWQgdG8gdGhpcyB0YWdcbiAgLy8gaXQgY291bGQgYmUgaGFuZHkgdG8gdXNlIGl0IGFsc28gdG8gaW1wcm92ZSB0aGUgdmlydHVhbCBkb20gcmVuZGVyaW5nIHNwZWVkXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdfcmlvdF9pZCcsICsrX191aWQpOyAvLyBiYXNlIDEgYWxsb3dzIHRlc3QgIXQuX3Jpb3RfaWRcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3Jvb3QnLCByb290KTtcbiAgZXh0ZW5kKHRoaXMsIHsgb3B0czogb3B0cyB9LCBpdGVtKTtcbiAgLy8gcHJvdGVjdCB0aGUgXCJ0YWdzXCIgYW5kIFwicmVmc1wiIHByb3BlcnR5IGZyb20gYmVpbmcgb3ZlcnJpZGRlblxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAncGFyZW50JywgcGFyZW50IHx8IG51bGwpO1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAndGFncycsIHt9KTtcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3JlZnMnLCB7fSk7XG5cbiAgaWYgKGlzSW5saW5lIHx8IGlzTG9vcCAmJiBpc0Fub255bW91cykge1xuICAgIGRvbSA9IHJvb3Q7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpc1ZpcnR1YWwpIHsgcm9vdC5pbm5lckhUTUwgPSAnJzsgfVxuICAgIGRvbSA9IG1rZG9tKGltcGwudG1wbCwgaW5uZXJIVE1MLCBpc1N2Zyhyb290KSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0YWcgZXhwcmVzc2lvbnMgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtICAgeyAqIH0gIGRhdGEgLSBkYXRhIHdlIHdhbnQgdG8gdXNlIHRvIGV4dGVuZCB0aGUgdGFnIHByb3BlcnRpZXNcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd1cGRhdGUnLCBmdW5jdGlvbiB0YWdVcGRhdGUoZGF0YSkge1xuICAgIHZhciBuZXh0T3B0cyA9IHt9LFxuICAgICAgY2FuVHJpZ2dlciA9IHRoaXMuaXNNb3VudGVkICYmICFza2lwQW5vbnltb3VzO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBkYXRhIHBhc3NlZCB3aWxsIG5vdCBvdmVycmlkZVxuICAgIC8vIHRoZSBjb21wb25lbnQgY29yZSBtZXRob2RzXG4gICAgZGF0YSA9IGNsZWFuVXBEYXRhKGRhdGEpO1xuICAgIGV4dGVuZCh0aGlzLCBkYXRhKTtcbiAgICB1cGRhdGVPcHRzLmFwcGx5KHRoaXMsIFtpc0xvb3AsIHBhcmVudCwgaXNBbm9ueW1vdXMsIG5leHRPcHRzLCBpbnN0QXR0cnNdKTtcblxuICAgIGlmIChjYW5UcmlnZ2VyICYmIHRoaXMuaXNNb3VudGVkICYmIGlzRnVuY3Rpb24odGhpcy5zaG91bGRVcGRhdGUpICYmICF0aGlzLnNob3VsZFVwZGF0ZShkYXRhLCBuZXh0T3B0cykpIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLy8gaW5oZXJpdCBwcm9wZXJ0aWVzIGZyb20gdGhlIHBhcmVudCwgYnV0IG9ubHkgZm9yIGlzQW5vbnltb3VzIHRhZ3NcbiAgICBpZiAoaXNMb29wICYmIGlzQW5vbnltb3VzKSB7IGluaGVyaXRGcm9tLmFwcGx5KHRoaXMsIFt0aGlzLnBhcmVudCwgcHJvcHNJblN5bmNXaXRoUGFyZW50XSk7IH1cbiAgICBleHRlbmQob3B0cywgbmV4dE9wdHMpO1xuICAgIGlmIChjYW5UcmlnZ2VyKSB7IHRoaXMudHJpZ2dlcigndXBkYXRlJywgZGF0YSk7IH1cbiAgICB1cGRhdGVBbGxFeHByZXNzaW9ucy5jYWxsKHRoaXMsIGV4cHJlc3Npb25zKTtcbiAgICBpZiAoY2FuVHJpZ2dlcikgeyB0aGlzLnRyaWdnZXIoJ3VwZGF0ZWQnKTsgfVxuXG4gICAgcmV0dXJuIHRoaXNcblxuICB9LmJpbmQodGhpcykpO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBtaXhpbiB0byB0aGlzIHRhZ1xuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ21peGluJywgZnVuY3Rpb24gdGFnTWl4aW4oKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBlYWNoKGFyZ3VtZW50cywgZnVuY3Rpb24gKG1peCkge1xuICAgICAgdmFyIGluc3RhbmNlLCBvYmo7XG4gICAgICB2YXIgcHJvcHMgPSBbXTtcblxuICAgICAgLy8gcHJvcGVydGllcyBibGFja2xpc3RlZCBhbmQgd2lsbCBub3QgYmUgYm91bmQgdG8gdGhlIHRhZyBpbnN0YW5jZVxuICAgICAgdmFyIHByb3BzQmxhY2tsaXN0ID0gWydpbml0JywgJ19fcHJvdG9fXyddO1xuXG4gICAgICBtaXggPSBpc1N0cmluZyhtaXgpID8gbWl4aW4kMShtaXgpIDogbWl4O1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgbWl4aW4gaXMgYSBmdW5jdGlvblxuICAgICAgaWYgKGlzRnVuY3Rpb24obWl4KSkge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIG5ldyBtaXhpbiBpbnN0YW5jZVxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBtaXgoKTtcbiAgICAgIH0gZWxzZSB7IGluc3RhbmNlID0gbWl4OyB9XG5cbiAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSk7XG5cbiAgICAgIC8vIGJ1aWxkIG11bHRpbGV2ZWwgcHJvdG90eXBlIGluaGVyaXRhbmNlIGNoYWluIHByb3BlcnR5IGxpc3RcbiAgICAgIGRvIHsgcHJvcHMgPSBwcm9wcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqIHx8IGluc3RhbmNlKSk7IH1cbiAgICAgIHdoaWxlIChvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqIHx8IGluc3RhbmNlKSlcblxuICAgICAgLy8gbG9vcCB0aGUga2V5cyBpbiB0aGUgZnVuY3Rpb24gcHJvdG90eXBlIG9yIHRoZSBhbGwgb2JqZWN0IGtleXNcbiAgICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgLy8gYmluZCBtZXRob2RzIHRvIHRoaXNcbiAgICAgICAgLy8gYWxsb3cgbWl4aW5zIHRvIG92ZXJyaWRlIG90aGVyIHByb3BlcnRpZXMvcGFyZW50IG1peGluc1xuICAgICAgICBpZiAoIWNvbnRhaW5zKHByb3BzQmxhY2tsaXN0LCBrZXkpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgZm9yIGdldHRlcnMvc2V0dGVyc1xuICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpbnN0YW5jZSwga2V5KSB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBrZXkpO1xuICAgICAgICAgIHZhciBoYXNHZXR0ZXJTZXR0ZXIgPSBkZXNjcmlwdG9yICYmIChkZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLnNldCk7XG5cbiAgICAgICAgICAvLyBhcHBseSBtZXRob2Qgb25seSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IG9uIHRoZSBpbnN0YW5jZVxuICAgICAgICAgIGlmICghdGhpcyQxLmhhc093blByb3BlcnR5KGtleSkgJiYgaGFzR2V0dGVyU2V0dGVyKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyQxLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzJDFba2V5XSA9IGlzRnVuY3Rpb24oaW5zdGFuY2Vba2V5XSkgP1xuICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldLmJpbmQodGhpcyQxKSA6XG4gICAgICAgICAgICAgIGluc3RhbmNlW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gaW5pdCBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYXV0b21hdGljYWxseVxuICAgICAgaWYgKGluc3RhbmNlLmluaXQpXG4gICAgICAgIHsgaW5zdGFuY2UuaW5pdC5iaW5kKHRoaXMkMSkoKTsgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIE1vdW50IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ21vdW50JywgZnVuY3Rpb24gdGFnTW91bnQoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByb290Ll90YWcgPSB0aGlzOyAvLyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSB0YWcganVzdCBjcmVhdGVkXG5cbiAgICAvLyBSZWFkIGFsbCB0aGUgYXR0cnMgb24gdGhpcyBpbnN0YW5jZS4gVGhpcyBnaXZlIHVzIHRoZSBpbmZvIHdlIG5lZWQgZm9yIHVwZGF0ZU9wdHNcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkocGFyZW50LCBbcm9vdCwgcm9vdC5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYXR0ciwgZXhwcikge1xuICAgICAgaWYgKCFpc0Fub255bW91cyAmJiBSZWZFeHByLmlzUHJvdG90eXBlT2YoZXhwcikpIHsgZXhwci50YWcgPSB0aGlzJDE7IH1cbiAgICAgIGF0dHIuZXhwciA9IGV4cHI7XG4gICAgICBpbnN0QXR0cnMucHVzaChhdHRyKTtcbiAgICB9XSk7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHJvb3QgYWRkaW5nIGN1c3RvbSBhdHRyaWJ1dGVzIGNvbWluZyBmcm9tIHRoZSBjb21waWxlclxuICAgIGltcGxBdHRycyA9IFtdO1xuICAgIHdhbGtBdHRycyhpbXBsLmF0dHJzLCBmdW5jdGlvbiAoaywgdikgeyBpbXBsQXR0cnMucHVzaCh7bmFtZTogaywgdmFsdWU6IHZ9KTsgfSk7XG4gICAgcGFyc2VBdHRyaWJ1dGVzLmFwcGx5KHRoaXMsIFtyb290LCBpbXBsQXR0cnMsIGZ1bmN0aW9uIChhdHRyLCBleHByKSB7XG4gICAgICBpZiAoZXhwcikgeyBleHByZXNzaW9ucy5wdXNoKGV4cHIpOyB9XG4gICAgICBlbHNlIHsgc2V0QXR0cihyb290LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpOyB9XG4gICAgfV0pO1xuXG4gICAgLy8gaW5pdGlhbGlhdGlvblxuICAgIHVwZGF0ZU9wdHMuYXBwbHkodGhpcywgW2lzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgb3B0cywgaW5zdEF0dHJzXSk7XG5cbiAgICAvLyBhZGQgZ2xvYmFsIG1peGluc1xuICAgIHZhciBnbG9iYWxNaXhpbiA9IG1peGluJDEoR0xPQkFMX01JWElOKTtcblxuICAgIGlmIChnbG9iYWxNaXhpbiAmJiAhc2tpcEFub255bW91cykge1xuICAgICAgZm9yICh2YXIgaSBpbiBnbG9iYWxNaXhpbikge1xuICAgICAgICBpZiAoZ2xvYmFsTWl4aW4uaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICB0aGlzJDEubWl4aW4oZ2xvYmFsTWl4aW5baV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGltcGwuZm4pIHsgaW1wbC5mbi5jYWxsKHRoaXMsIG9wdHMpOyB9XG5cbiAgICBpZiAoIXNraXBBbm9ueW1vdXMpIHsgdGhpcy50cmlnZ2VyKCdiZWZvcmUtbW91bnQnKTsgfVxuXG4gICAgLy8gcGFyc2UgbGF5b3V0IGFmdGVyIGluaXQuIGZuIG1heSBjYWxjdWxhdGUgYXJncyBmb3IgbmVzdGVkIGN1c3RvbSB0YWdzXG4gICAgcGFyc2VFeHByZXNzaW9ucy5hcHBseSh0aGlzLCBbZG9tLCBleHByZXNzaW9ucywgaXNBbm9ueW1vdXNdKTtcblxuICAgIHRoaXMudXBkYXRlKGl0ZW0pO1xuXG4gICAgaWYgKCFpc0Fub255bW91cyAmJiAhaXNJbmxpbmUpIHtcbiAgICAgIHdoaWxlIChkb20uZmlyc3RDaGlsZCkgeyByb290LmFwcGVuZENoaWxkKGRvbS5maXJzdENoaWxkKTsgfVxuICAgIH1cblxuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsICdyb290Jywgcm9vdCk7XG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ2lzTW91bnRlZCcsIHRydWUpO1xuXG4gICAgaWYgKHNraXBBbm9ueW1vdXMpIHsgcmV0dXJuIH1cblxuICAgIC8vIGlmIGl0J3Mgbm90IGEgY2hpbGQgdGFnIHdlIGNhbiB0cmlnZ2VyIGl0cyBtb3VudCBldmVudFxuICAgIGlmICghdGhpcy5wYXJlbnQpIHtcbiAgICAgIHRoaXMudHJpZ2dlcignbW91bnQnKTtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHdlIG5lZWQgdG8gd2FpdCB0aGF0IHRoZSBwYXJlbnQgXCJtb3VudFwiIG9yIFwidXBkYXRlZFwiIGV2ZW50IGdldHMgdHJpZ2dlcmVkXG4gICAgZWxzZSB7XG4gICAgICB2YXIgcCA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzLnBhcmVudCk7XG4gICAgICBwLm9uZSghcC5pc01vdW50ZWQgPyAnbW91bnQnIDogJ3VwZGF0ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMkMS50cmlnZ2VyKCdtb3VudCcpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcblxuICB9LmJpbmQodGhpcykpO1xuXG4gIC8qKlxuICAgKiBVbm1vdW50IHRoZSB0YWcgaW5zdGFuY2VcbiAgICogQHBhcmFtIHsgQm9vbGVhbiB9IG11c3RLZWVwUm9vdCAtIGlmIGl0J3MgdHJ1ZSB0aGUgcm9vdCBub2RlIHdpbGwgbm90IGJlIHJlbW92ZWRcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd1bm1vdW50JywgZnVuY3Rpb24gdGFnVW5tb3VudChtdXN0S2VlcFJvb3QpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBlbCA9IHRoaXMucm9vdCxcbiAgICAgIHAgPSBlbC5wYXJlbnROb2RlLFxuICAgICAgcHRhZyxcbiAgICAgIHRhZ0luZGV4ID0gX19UQUdTX0NBQ0hFLmluZGV4T2YodGhpcyk7XG5cbiAgICBpZiAoIXNraXBBbm9ueW1vdXMpIHsgdGhpcy50cmlnZ2VyKCdiZWZvcmUtdW5tb3VudCcpOyB9XG5cbiAgICAvLyBjbGVhciBhbGwgYXR0cmlidXRlcyBjb21pbmcgZnJvbSB0aGUgbW91bnRlZCB0YWdcbiAgICB3YWxrQXR0cnMoaW1wbC5hdHRycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmIChzdGFydHNXaXRoKG5hbWUsIEFUVFJTX1BSRUZJWCkpXG4gICAgICAgIHsgbmFtZSA9IG5hbWUuc2xpY2UoQVRUUlNfUFJFRklYLmxlbmd0aCk7IH1cblxuICAgICAgcmVtQXR0cihyb290LCBuYW1lKTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSBhbGwgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgIHRoaXMuX18ubGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGRvbSkge1xuICAgICAgT2JqZWN0LmtleXMoZG9tW1JJT1RfRVZFTlRTX0tFWV0pLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGRvbVtSSU9UX0VWRU5UU19LRVldW2V2ZW50TmFtZV0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgdGhpcyB0YWcgaW5zdGFuY2UgZnJvbSB0aGUgZ2xvYmFsIHZpcnR1YWxEb20gdmFyaWFibGVcbiAgICBpZiAodGFnSW5kZXggIT09IC0xKVxuICAgICAgeyBfX1RBR1NfQ0FDSEUuc3BsaWNlKHRhZ0luZGV4LCAxKTsgfVxuXG4gICAgaWYgKHAgfHwgaXNWaXJ0dWFsKSB7XG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHB0YWcgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcocGFyZW50KTtcblxuICAgICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXModGhpcy50YWdzKS5mb3JFYWNoKGZ1bmN0aW9uICh0YWdOYW1lKSB7XG4gICAgICAgICAgICBhcnJheWlzaFJlbW92ZShwdGFnLnRhZ3MsIHRhZ05hbWUsIHRoaXMkMS50YWdzW3RhZ05hbWVdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheWlzaFJlbW92ZShwdGFnLnRhZ3MsIHRhZ05hbWUsIHRoaXMpO1xuICAgICAgICAgIC8vIHJlbW92ZSBmcm9tIF9wYXJlbnQgdG9vXG4gICAgICAgICAgaWYocGFyZW50ICE9PSBwdGFnKSB7XG4gICAgICAgICAgICBhcnJheWlzaFJlbW92ZShwYXJlbnQudGFncywgdGFnTmFtZSwgdGhpcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZW1vdmUgdGhlIHRhZyBjb250ZW50c1xuICAgICAgICBzZXRJbm5lckhUTUwoZWwsICcnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHAgJiYgIW11c3RLZWVwUm9vdCkgeyBwLnJlbW92ZUNoaWxkKGVsKTsgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9fLnZpcnRzKSB7XG4gICAgICBlYWNoKHRoaXMuX18udmlydHMsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmICh2LnBhcmVudE5vZGUpIHsgdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHYpOyB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhbGxvdyBleHByZXNzaW9ucyB0byB1bm1vdW50IHRoZW1zZWx2ZXNcbiAgICB1bm1vdW50QWxsKGV4cHJlc3Npb25zKTtcbiAgICBlYWNoKGluc3RBdHRycywgZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEuZXhwciAmJiBhLmV4cHIudW5tb3VudCAmJiBhLmV4cHIudW5tb3VudCgpOyB9KTtcblxuICAgIC8vIGN1c3RvbSBpbnRlcm5hbCB1bm1vdW50IGZ1bmN0aW9uIHRvIGF2b2lkIHJlbHlpbmcgb24gdGhlIG9ic2VydmFibGVcbiAgICBpZiAodGhpcy5fXy5vblVubW91bnQpIHsgdGhpcy5fXy5vblVubW91bnQoKTsgfVxuXG4gICAgaWYgKCFza2lwQW5vbnltb3VzKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ3VubW91bnQnKTtcbiAgICAgIHRoaXMub2ZmKCcqJyk7XG4gICAgfVxuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ2lzTW91bnRlZCcsIGZhbHNlKTtcblxuICAgIGRlbGV0ZSB0aGlzLnJvb3QuX3RhZztcblxuICAgIHJldHVybiB0aGlzXG5cbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgdGhlIHRhZyBpbXBsZW1lbnRhdGlvbiBieSBhIERPTSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gcGFyc2UgdG8gZ2V0IGl0cyB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gaXQgcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgaW1wbGVtZW50YXRpb24gb2YgYSBjdXN0b20gdGFnICh0ZW1wbGF0ZSBhbmQgYm9vdCBmdW5jdGlvbilcbiAqL1xuZnVuY3Rpb24gZ2V0VGFnKGRvbSkge1xuICByZXR1cm4gZG9tLnRhZ05hbWUgJiYgX19UQUdfSU1QTFtnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKSB8fFxuICAgIGdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpIHx8IGRvbS50YWdOYW1lLnRvTG93ZXJDYXNlKCldXG59XG5cbi8qKlxuICogSW5oZXJpdCBwcm9wZXJ0aWVzIGZyb20gYSB0YXJnZXQgdGFnIGluc3RhbmNlXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgVGFnIH0gdGFyZ2V0IC0gdGFnIHdoZXJlIHdlIHdpbGwgaW5oZXJpdCBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gcHJvcHNJblN5bmNXaXRoUGFyZW50IC0gYXJyYXkgb2YgcHJvcGVydGllcyB0byBzeW5jIHdpdGggdGhlIHRhcmdldFxuICovXG5mdW5jdGlvbiBpbmhlcml0RnJvbSh0YXJnZXQsIHByb3BzSW5TeW5jV2l0aFBhcmVudCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBlYWNoKE9iamVjdC5rZXlzKHRhcmdldCksIGZ1bmN0aW9uIChrKSB7XG4gICAgLy8gc29tZSBwcm9wZXJ0aWVzIG11c3QgYmUgYWx3YXlzIGluIHN5bmMgd2l0aCB0aGUgcGFyZW50IHRhZ1xuICAgIHZhciBtdXN0U3luYyA9ICFpc1Jlc2VydmVkTmFtZShrKSAmJiBjb250YWlucyhwcm9wc0luU3luY1dpdGhQYXJlbnQsIGspO1xuXG4gICAgaWYgKGlzVW5kZWZpbmVkKHRoaXMkMVtrXSkgfHwgbXVzdFN5bmMpIHtcbiAgICAgIC8vIHRyYWNrIHRoZSBwcm9wZXJ0eSB0byBrZWVwIGluIHN5bmNcbiAgICAgIC8vIHNvIHdlIGNhbiBrZWVwIGl0IHVwZGF0ZWRcbiAgICAgIGlmICghbXVzdFN5bmMpIHsgcHJvcHNJblN5bmNXaXRoUGFyZW50LnB1c2goayk7IH1cbiAgICAgIHRoaXMkMVtrXSA9IHRhcmdldFtrXTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1vdmUgdGhlIHBvc2l0aW9uIG9mIGEgY3VzdG9tIHRhZyBpbiBpdHMgcGFyZW50IHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSBrZXkgd2hlcmUgdGhlIHRhZyB3YXMgc3RvcmVkXG4gKiBAcGFyYW0gICB7IE51bWJlciB9IG5ld1BvcyAtIGluZGV4IHdoZXJlIHRoZSBuZXcgdGFnIHdpbGwgYmUgc3RvcmVkXG4gKi9cbmZ1bmN0aW9uIG1vdmVDaGlsZFRhZyh0YWdOYW1lLCBuZXdQb3MpIHtcbiAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50LFxuICAgIHRhZ3M7XG4gIC8vIG5vIHBhcmVudCBubyBtb3ZlXG4gIGlmICghcGFyZW50KSB7IHJldHVybiB9XG5cbiAgdGFncyA9IHBhcmVudC50YWdzW3RhZ05hbWVdO1xuXG4gIGlmIChpc0FycmF5KHRhZ3MpKVxuICAgIHsgdGFncy5zcGxpY2UobmV3UG9zLCAwLCB0YWdzLnNwbGljZSh0YWdzLmluZGV4T2YodGhpcyksIDEpWzBdKTsgfVxuICBlbHNlIHsgYXJyYXlpc2hBZGQocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRoaXMpOyB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGNoaWxkIHRhZyBpbmNsdWRpbmcgaXQgY29ycmVjdGx5IGludG8gaXRzIHBhcmVudFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjaGlsZCAtIGNoaWxkIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRzIC0gdGFnIG9wdGlvbnMgY29udGFpbmluZyB0aGUgRE9NIG5vZGUgd2hlcmUgdGhlIHRhZyB3aWxsIGJlIG1vdW50ZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gaW5uZXJIVE1MIC0gaW5uZXIgaHRtbCBvZiB0aGUgY2hpbGQgbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBwYXJlbnQgLSBpbnN0YW5jZSBvZiB0aGUgcGFyZW50IHRhZyBpbmNsdWRpbmcgdGhlIGNoaWxkIGN1c3RvbSB0YWdcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gaW5zdGFuY2Ugb2YgdGhlIG5ldyBjaGlsZCB0YWcganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIGluaXRDaGlsZFRhZyhjaGlsZCwgb3B0cywgaW5uZXJIVE1MLCBwYXJlbnQpIHtcbiAgdmFyIHRhZyA9IG5ldyBUYWckMShjaGlsZCwgb3B0cywgaW5uZXJIVE1MKSxcbiAgICB0YWdOYW1lID0gb3B0cy50YWdOYW1lIHx8IGdldFRhZ05hbWUob3B0cy5yb290LCB0cnVlKSxcbiAgICBwdGFnID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHBhcmVudCk7XG4gIC8vIGZpeCBmb3IgdGhlIHBhcmVudCBhdHRyaWJ1dGUgaW4gdGhlIGxvb3BlZCBlbGVtZW50c1xuICBkZWZpbmVQcm9wZXJ0eSh0YWcsICdwYXJlbnQnLCBwdGFnKTtcbiAgLy8gc3RvcmUgdGhlIHJlYWwgcGFyZW50IHRhZ1xuICAvLyBpbiBzb21lIGNhc2VzIHRoaXMgY291bGQgYmUgZGlmZmVyZW50IGZyb20gdGhlIGN1c3RvbSBwYXJlbnQgdGFnXG4gIC8vIGZvciBleGFtcGxlIGluIG5lc3RlZCBsb29wc1xuICB0YWcuX18ucGFyZW50ID0gcGFyZW50O1xuXG4gIC8vIGFkZCB0aGlzIHRhZyB0byB0aGUgY3VzdG9tIHBhcmVudCB0YWdcbiAgYXJyYXlpc2hBZGQocHRhZy50YWdzLCB0YWdOYW1lLCB0YWcpO1xuXG4gIC8vIGFuZCBhbHNvIHRvIHRoZSByZWFsIHBhcmVudCB0YWdcbiAgaWYgKHB0YWcgIT09IHBhcmVudClcbiAgICB7IGFycmF5aXNoQWRkKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0YWcpOyB9XG5cbiAgcmV0dXJuIHRhZ1xufVxuXG4vKipcbiAqIExvb3AgYmFja3dhcmQgYWxsIHRoZSBwYXJlbnRzIHRyZWUgdG8gZGV0ZWN0IHRoZSBmaXJzdCBjdXN0b20gcGFyZW50IHRhZ1xuICogQHBhcmFtICAgeyBPYmplY3QgfSB0YWcgLSBhIFRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBPYmplY3QgfSB0aGUgaW5zdGFuY2Ugb2YgdGhlIGZpcnN0IGN1c3RvbSBwYXJlbnQgdGFnIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0YWcpIHtcbiAgdmFyIHB0YWcgPSB0YWc7XG4gIHdoaWxlIChwdGFnLl9fLmlzQW5vbnltb3VzKSB7XG4gICAgaWYgKCFwdGFnLnBhcmVudCkgeyBicmVhayB9XG4gICAgcHRhZyA9IHB0YWcucGFyZW50O1xuICB9XG4gIHJldHVybiBwdGFnXG59XG5cbi8qKlxuICogVHJpZ2dlciB0aGUgdW5tb3VudCBtZXRob2Qgb24gYWxsIHRoZSBleHByZXNzaW9uc1xuICogQHBhcmFtICAgeyBBcnJheSB9IGV4cHJlc3Npb25zIC0gRE9NIGV4cHJlc3Npb25zXG4gKi9cbmZ1bmN0aW9uIHVubW91bnRBbGwoZXhwcmVzc2lvbnMpIHtcbiAgZWFjaChleHByZXNzaW9ucywgZnVuY3Rpb24oZXhwcikge1xuICAgIGlmIChleHByIGluc3RhbmNlb2YgVGFnJDEpIHsgZXhwci51bm1vdW50KHRydWUpOyB9XG4gICAgZWxzZSBpZiAoZXhwci50YWdOYW1lKSB7IGV4cHIudGFnLnVubW91bnQodHJ1ZSk7IH1cbiAgICBlbHNlIGlmIChleHByLnVubW91bnQpIHsgZXhwci51bm1vdW50KCk7IH1cbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSB0YWcgbmFtZSBvZiBhbnkgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gc2tpcERhdGFJcyAtIGhhY2sgdG8gaWdub3JlIHRoZSBkYXRhLWlzIGF0dHJpYnV0ZSB3aGVuIGF0dGFjaGluZyB0byBwYXJlbnRcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbmFtZSB0byBpZGVudGlmeSB0aGlzIGRvbSBub2RlIGluIHJpb3RcbiAqL1xuZnVuY3Rpb24gZ2V0VGFnTmFtZShkb20sIHNraXBEYXRhSXMpIHtcbiAgdmFyIGNoaWxkID0gZ2V0VGFnKGRvbSksXG4gICAgbmFtZWRUYWcgPSAhc2tpcERhdGFJcyAmJiBnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKTtcbiAgcmV0dXJuIG5hbWVkVGFnICYmICF0bXBsLmhhc0V4cHIobmFtZWRUYWcpID9cbiAgICAgICAgICAgICAgICBuYW1lZFRhZyA6XG4gICAgICAgICAgICAgIGNoaWxkID8gY2hpbGQubmFtZSA6IGRvbS50YWdOYW1lLnRvTG93ZXJDYXNlKClcbn1cblxuLyoqXG4gKiBXaXRoIHRoaXMgZnVuY3Rpb24gd2UgYXZvaWQgdGhhdCB0aGUgaW50ZXJuYWwgVGFnIG1ldGhvZHMgZ2V0IG92ZXJyaWRkZW5cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZGF0YSAtIG9wdGlvbnMgd2Ugd2FudCB0byB1c2UgdG8gZXh0ZW5kIHRoZSB0YWcgaW5zdGFuY2VcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gY2xlYW4gb2JqZWN0IHdpdGhvdXQgY29udGFpbmluZyB0aGUgcmlvdCBpbnRlcm5hbCByZXNlcnZlZCB3b3Jkc1xuICovXG5mdW5jdGlvbiBjbGVhblVwRGF0YShkYXRhKSB7XG4gIGlmICghKGRhdGEgaW5zdGFuY2VvZiBUYWckMSkgJiYgIShkYXRhICYmIGlzRnVuY3Rpb24oZGF0YS50cmlnZ2VyKSkpXG4gICAgeyByZXR1cm4gZGF0YSB9XG5cbiAgdmFyIG8gPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICBpZiAoIVJFX1JFU0VSVkVEX05BTUVTLnRlc3Qoa2V5KSkgeyBvW2tleV0gPSBkYXRhW2tleV07IH1cbiAgfVxuICByZXR1cm4gb1xufVxuXG4vKipcbiAqIFNldCB0aGUgcHJvcGVydHkgb2YgYW4gb2JqZWN0IGZvciBhIGdpdmVuIGtleS4gSWYgc29tZXRoaW5nIGFscmVhZHlcbiAqIGV4aXN0cyB0aGVyZSwgdGhlbiBpdCBiZWNvbWVzIGFuIGFycmF5IGNvbnRhaW5pbmcgYm90aCB0aGUgb2xkIGFuZCBuZXcgdmFsdWUuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBvYmogLSBvYmplY3Qgb24gd2hpY2ggdG8gc2V0IHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtIHsgU3RyaW5nIH0ga2V5IC0gcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHsgT2JqZWN0IH0gdmFsdWUgLSB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIHNldFxuICogQHBhcmFtIHsgQm9vbGVhbiB9IGVuc3VyZUFycmF5IC0gZW5zdXJlIHRoYXQgdGhlIHByb3BlcnR5IHJlbWFpbnMgYW4gYXJyYXlcbiAqIEBwYXJhbSB7IE51bWJlciB9IGluZGV4IC0gYWRkIHRoZSBuZXcgaXRlbSBpbiBhIGNlcnRhaW4gYXJyYXkgcG9zaXRpb25cbiAqL1xuZnVuY3Rpb24gYXJyYXlpc2hBZGQob2JqLCBrZXksIHZhbHVlLCBlbnN1cmVBcnJheSwgaW5kZXgpIHtcbiAgdmFyIGRlc3QgPSBvYmpba2V5XTtcbiAgdmFyIGlzQXJyID0gaXNBcnJheShkZXN0KTtcbiAgdmFyIGhhc0luZGV4ID0gIWlzVW5kZWZpbmVkKGluZGV4KTtcblxuICBpZiAoZGVzdCAmJiBkZXN0ID09PSB2YWx1ZSkgeyByZXR1cm4gfVxuXG4gIC8vIGlmIHRoZSBrZXkgd2FzIG5ldmVyIHNldCwgc2V0IGl0IG9uY2VcbiAgaWYgKCFkZXN0ICYmIGVuc3VyZUFycmF5KSB7IG9ialtrZXldID0gW3ZhbHVlXTsgfVxuICBlbHNlIGlmICghZGVzdCkgeyBvYmpba2V5XSA9IHZhbHVlOyB9XG4gIC8vIGlmIGl0IHdhcyBhbiBhcnJheSBhbmQgbm90IHlldCBzZXRcbiAgZWxzZSB7XG4gICAgaWYgKGlzQXJyKSB7XG4gICAgICB2YXIgb2xkSW5kZXggPSBkZXN0LmluZGV4T2YodmFsdWUpO1xuICAgICAgLy8gdGhpcyBpdGVtIG5ldmVyIGNoYW5nZWQgaXRzIHBvc2l0aW9uXG4gICAgICBpZiAob2xkSW5kZXggPT09IGluZGV4KSB7IHJldHVybiB9XG4gICAgICAvLyByZW1vdmUgdGhlIGl0ZW0gZnJvbSBpdHMgb2xkIHBvc2l0aW9uXG4gICAgICBpZiAob2xkSW5kZXggIT09IC0xKSB7IGRlc3Quc3BsaWNlKG9sZEluZGV4LCAxKTsgfVxuICAgICAgLy8gbW92ZSBvciBhZGQgdGhlIGl0ZW1cbiAgICAgIGlmIChoYXNJbmRleCkge1xuICAgICAgICBkZXN0LnNwbGljZShpbmRleCwgMCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVzdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyBvYmpba2V5XSA9IFtkZXN0LCB2YWx1ZV07IH1cbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIGFuIG9iamVjdCBhdCBhIGdpdmVuIGtleS4gSWYgdGhlIGtleSBwb2ludHMgdG8gYW4gYXJyYXksXG4gKiB0aGVuIHRoZSBpdGVtIGlzIGp1c3QgcmVtb3ZlZCBmcm9tIHRoZSBhcnJheS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9iaiAtIG9iamVjdCBvbiB3aGljaCB0byByZW1vdmUgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0geyBTdHJpbmcgfSBrZXkgLSBwcm9wZXJ0eSBuYW1lXG4gKiBAcGFyYW0geyBPYmplY3QgfSB2YWx1ZSAtIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgcmVtb3ZlZFxuICogQHBhcmFtIHsgQm9vbGVhbiB9IGVuc3VyZUFycmF5IC0gZW5zdXJlIHRoYXQgdGhlIHByb3BlcnR5IHJlbWFpbnMgYW4gYXJyYXlcbiovXG5mdW5jdGlvbiBhcnJheWlzaFJlbW92ZShvYmosIGtleSwgdmFsdWUsIGVuc3VyZUFycmF5KSB7XG4gIGlmIChpc0FycmF5KG9ialtrZXldKSkge1xuICAgIHZhciBpbmRleCA9IG9ialtrZXldLmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHsgb2JqW2tleV0uc3BsaWNlKGluZGV4LCAxKTsgfVxuICAgIGlmICghb2JqW2tleV0ubGVuZ3RoKSB7IGRlbGV0ZSBvYmpba2V5XTsgfVxuICAgIGVsc2UgaWYgKG9ialtrZXldLmxlbmd0aCA9PT0gMSAmJiAhZW5zdXJlQXJyYXkpIHsgb2JqW2tleV0gPSBvYmpba2V5XVswXTsgfVxuICB9IGVsc2VcbiAgICB7IGRlbGV0ZSBvYmpba2V5XTsgfSAvLyBvdGhlcndpc2UganVzdCBkZWxldGUgdGhlIGtleVxufVxuXG4vKipcbiAqIE1vdW50IGEgdGFnIGNyZWF0aW5nIG5ldyBUYWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcm9vdCAtIGRvbSBub2RlIHdoZXJlIHRoZSB0YWcgd2lsbCBiZSBtb3VudGVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSBuYW1lIG9mIHRoZSByaW90IHRhZyB3ZSB3YW50IHRvIG1vdW50XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdHMgLSBvcHRpb25zIHRvIHBhc3MgdG8gdGhlIFRhZyBpbnN0YW5jZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBvcHRpb25hbCBjb250ZXh0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIGV4dGVuZCBhbiBleGlzdGluZyBjbGFzcyAoIHVzZWQgaW4gcmlvdC5UYWcgKVxuICogQHJldHVybnMgeyBUYWcgfSBhIG5ldyBUYWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gbW91bnRUbyhyb290LCB0YWdOYW1lLCBvcHRzLCBjdHgpIHtcbiAgdmFyIGltcGwgPSBfX1RBR19JTVBMW3RhZ05hbWVdLFxuICAgIGltcGxDbGFzcyA9IF9fVEFHX0lNUExbdGFnTmFtZV0uY2xhc3MsXG4gICAgdGFnID0gY3R4IHx8IChpbXBsQ2xhc3MgPyBPYmplY3QuY3JlYXRlKGltcGxDbGFzcy5wcm90b3R5cGUpIDoge30pLFxuICAgIC8vIGNhY2hlIHRoZSBpbm5lciBIVE1MIHRvIGZpeCAjODU1XG4gICAgaW5uZXJIVE1MID0gcm9vdC5faW5uZXJIVE1MID0gcm9vdC5faW5uZXJIVE1MIHx8IHJvb3QuaW5uZXJIVE1MO1xuXG4gIHZhciBjb25mID0gZXh0ZW5kKHsgcm9vdDogcm9vdCwgb3B0czogb3B0cyB9LCB7IHBhcmVudDogb3B0cyA/IG9wdHMucGFyZW50IDogbnVsbCB9KTtcblxuICBpZiAoaW1wbCAmJiByb290KSB7IFRhZyQxLmFwcGx5KHRhZywgW2ltcGwsIGNvbmYsIGlubmVySFRNTF0pOyB9XG5cbiAgaWYgKHRhZyAmJiB0YWcubW91bnQpIHtcbiAgICB0YWcubW91bnQodHJ1ZSk7XG4gICAgLy8gYWRkIHRoaXMgdGFnIHRvIHRoZSB2aXJ0dWFsRG9tIHZhcmlhYmxlXG4gICAgaWYgKCFjb250YWlucyhfX1RBR1NfQ0FDSEUsIHRhZykpIHsgX19UQUdTX0NBQ0hFLnB1c2godGFnKTsgfVxuICB9XG5cbiAgcmV0dXJuIHRhZ1xufVxuXG4vKipcbiAqIG1ha2VzIGEgdGFnIHZpcnR1YWwgYW5kIHJlcGxhY2VzIGEgcmVmZXJlbmNlIGluIHRoZSBkb21cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgdGFnIH0gdGhlIHRhZyB0byBtYWtlIHZpcnR1YWxcbiAqIEBwYXJhbSB7IHJlZiB9IHRoZSBkb20gcmVmZXJlbmNlIGxvY2F0aW9uXG4gKi9cbmZ1bmN0aW9uIG1ha2VSZXBsYWNlVmlydHVhbCh0YWcsIHJlZikge1xuICB2YXIgZnJhZyA9IGNyZWF0ZUZyYWcoKTtcbiAgbWFrZVZpcnR1YWwuY2FsbCh0YWcsIGZyYWcpO1xuICByZWYucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZnJhZywgcmVmKTtcbn1cblxuLyoqXG4gKiBBZGRzIHRoZSBlbGVtZW50cyBmb3IgYSB2aXJ0dWFsIHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBOb2RlIH0gc3JjIC0gdGhlIG5vZGUgdGhhdCB3aWxsIGRvIHRoZSBpbnNlcnRpbmcgb3IgYXBwZW5kaW5nXG4gKiBAcGFyYW0geyBUYWcgfSB0YXJnZXQgLSBvbmx5IGlmIGluc2VydGluZywgaW5zZXJ0IGJlZm9yZSB0aGlzIHRhZydzIGZpcnN0IGNoaWxkXG4gKi9cbmZ1bmN0aW9uIG1ha2VWaXJ0dWFsKHNyYywgdGFyZ2V0KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciBoZWFkID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKSxcbiAgICB0YWlsID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKSxcbiAgICBmcmFnID0gY3JlYXRlRnJhZygpLFxuICAgIHNpYiwgZWw7XG5cbiAgdGhpcy5yb290Lmluc2VydEJlZm9yZShoZWFkLCB0aGlzLnJvb3QuZmlyc3RDaGlsZCk7XG4gIHRoaXMucm9vdC5hcHBlbmRDaGlsZCh0YWlsKTtcblxuICB0aGlzLl9fLmhlYWQgPSBlbCA9IGhlYWQ7XG4gIHRoaXMuX18udGFpbCA9IHRhaWw7XG5cbiAgd2hpbGUgKGVsKSB7XG4gICAgc2liID0gZWwubmV4dFNpYmxpbmc7XG4gICAgZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gICAgdGhpcyQxLl9fLnZpcnRzLnB1c2goZWwpOyAvLyBob2xkIGZvciB1bm1vdW50aW5nXG4gICAgZWwgPSBzaWI7XG4gIH1cblxuICBpZiAodGFyZ2V0KVxuICAgIHsgc3JjLmluc2VydEJlZm9yZShmcmFnLCB0YXJnZXQuX18uaGVhZCk7IH1cbiAgZWxzZVxuICAgIHsgc3JjLmFwcGVuZENoaWxkKGZyYWcpOyB9XG59XG5cbi8qKlxuICogTW92ZSB2aXJ0dWFsIHRhZyBhbmQgYWxsIGNoaWxkIG5vZGVzXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IE5vZGUgfSBzcmMgIC0gdGhlIG5vZGUgdGhhdCB3aWxsIGRvIHRoZSBpbnNlcnRpbmdcbiAqIEBwYXJhbSB7IFRhZyB9IHRhcmdldCAtIGluc2VydCBiZWZvcmUgdGhpcyB0YWcncyBmaXJzdCBjaGlsZFxuICovXG5mdW5jdGlvbiBtb3ZlVmlydHVhbChzcmMsIHRhcmdldCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgZWwgPSB0aGlzLl9fLmhlYWQsXG4gICAgZnJhZyA9IGNyZWF0ZUZyYWcoKSxcbiAgICBzaWI7XG5cbiAgd2hpbGUgKGVsKSB7XG4gICAgc2liID0gZWwubmV4dFNpYmxpbmc7XG4gICAgZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gICAgZWwgPSBzaWI7XG4gICAgaWYgKGVsID09PSB0aGlzJDEuX18udGFpbCkge1xuICAgICAgZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gICAgICBzcmMuaW5zZXJ0QmVmb3JlKGZyYWcsIHRhcmdldC5fXy5oZWFkKTtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2V0IHNlbGVjdG9ycyBmb3IgdGFnc1xuICogQHBhcmFtICAgeyBBcnJheSB9IHRhZ3MgLSB0YWcgbmFtZXMgdG8gc2VsZWN0XG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IHNlbGVjdG9yXG4gKi9cbmZ1bmN0aW9uIHNlbGVjdFRhZ3ModGFncykge1xuICAvLyBzZWxlY3QgYWxsIHRhZ3NcbiAgaWYgKCF0YWdzKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhfX1RBR19JTVBMKTtcbiAgICByZXR1cm4ga2V5cyArIHNlbGVjdFRhZ3Moa2V5cylcbiAgfVxuXG4gIHJldHVybiB0YWdzXG4gICAgLmZpbHRlcihmdW5jdGlvbiAodCkgeyByZXR1cm4gIS9bXi1cXHddLy50ZXN0KHQpOyB9KVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24gKGxpc3QsIHQpIHtcbiAgICAgIHZhciBuYW1lID0gdC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBsaXN0ICsgXCIsW1wiICsgSVNfRElSRUNUSVZFICsgXCI9XFxcIlwiICsgbmFtZSArIFwiXFxcIl1cIlxuICAgIH0sICcnKVxufVxuXG5cbnZhciB0YWdzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGdldFRhZzogZ2V0VGFnLFxuXHRpbmhlcml0RnJvbTogaW5oZXJpdEZyb20sXG5cdG1vdmVDaGlsZFRhZzogbW92ZUNoaWxkVGFnLFxuXHRpbml0Q2hpbGRUYWc6IGluaXRDaGlsZFRhZyxcblx0Z2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnOiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcsXG5cdHVubW91bnRBbGw6IHVubW91bnRBbGwsXG5cdGdldFRhZ05hbWU6IGdldFRhZ05hbWUsXG5cdGNsZWFuVXBEYXRhOiBjbGVhblVwRGF0YSxcblx0YXJyYXlpc2hBZGQ6IGFycmF5aXNoQWRkLFxuXHRhcnJheWlzaFJlbW92ZTogYXJyYXlpc2hSZW1vdmUsXG5cdG1vdW50VG86IG1vdW50VG8sXG5cdG1ha2VSZXBsYWNlVmlydHVhbDogbWFrZVJlcGxhY2VWaXJ0dWFsLFxuXHRtYWtlVmlydHVhbDogbWFrZVZpcnR1YWwsXG5cdG1vdmVWaXJ0dWFsOiBtb3ZlVmlydHVhbCxcblx0c2VsZWN0VGFnczogc2VsZWN0VGFnc1xufSk7XG5cbi8qKlxuICogUmlvdCBwdWJsaWMgYXBpXG4gKi9cbnZhciBzZXR0aW5ncyA9IHNldHRpbmdzJDE7XG52YXIgdXRpbCA9IHtcbiAgdG1wbDogdG1wbCxcbiAgYnJhY2tldHM6IGJyYWNrZXRzLFxuICBzdHlsZU1hbmFnZXI6IHN0eWxlTWFuYWdlcixcbiAgdmRvbTogX19UQUdTX0NBQ0hFLFxuICBzdHlsZU5vZGU6IHN0eWxlTWFuYWdlci5zdHlsZU5vZGUsXG4gIC8vIGV4cG9ydCB0aGUgcmlvdCBpbnRlcm5hbCB1dGlscyBhcyB3ZWxsXG4gIGRvbTogZG9tLFxuICBjaGVjazogY2hlY2ssXG4gIG1pc2M6IG1pc2MsXG4gIHRhZ3M6IHRhZ3Ncbn07XG5cbi8vIGV4cG9ydCB0aGUgY29yZSBwcm9wcy9tZXRob2RzXG52YXIgVGFnJCQxID0gVGFnJDI7XG52YXIgdGFnJCQxID0gdGFnJDE7XG52YXIgdGFnMiQkMSA9IHRhZzIkMTtcbnZhciBtb3VudCQkMSA9IG1vdW50JDE7XG52YXIgbWl4aW4kJDEgPSBtaXhpbiQxO1xudmFyIHVwZGF0ZSQkMSA9IHVwZGF0ZSQxO1xudmFyIHVucmVnaXN0ZXIkJDEgPSB1bnJlZ2lzdGVyJDE7XG52YXIgdmVyc2lvbiQkMSA9IHZlcnNpb24kMTtcbnZhciBvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZSQxO1xuXG52YXIgcmlvdCQxID0gZXh0ZW5kKHt9LCBjb3JlLCB7XG4gIG9ic2VydmFibGU6IG9ic2VydmFibGUkMSxcbiAgc2V0dGluZ3M6IHNldHRpbmdzLFxuICB1dGlsOiB1dGlsLFxufSk7XG5cbmV4cG9ydHMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbmV4cG9ydHMudXRpbCA9IHV0aWw7XG5leHBvcnRzLlRhZyA9IFRhZyQkMTtcbmV4cG9ydHMudGFnID0gdGFnJCQxO1xuZXhwb3J0cy50YWcyID0gdGFnMiQkMTtcbmV4cG9ydHMubW91bnQgPSBtb3VudCQkMTtcbmV4cG9ydHMubWl4aW4gPSBtaXhpbiQkMTtcbmV4cG9ydHMudXBkYXRlID0gdXBkYXRlJCQxO1xuZXhwb3J0cy51bnJlZ2lzdGVyID0gdW5yZWdpc3RlciQkMTtcbmV4cG9ydHMudmVyc2lvbiA9IHZlcnNpb24kJDE7XG5leHBvcnRzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gcmlvdCQxO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Jpb3QvcmlvdC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMsIHJlcXVpcmUoJ3Jpb3QnKSkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJywgJ3Jpb3QnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLnJpb3RIb3RSZWxvYWQgPSBnbG9iYWwucmlvdEhvdFJlbG9hZCB8fCB7fSksZ2xvYmFsLnJpb3QpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzLHJpb3QpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgbm9uU3RhdGUgPSAnaXNNb3VudGVkIG9wdHMnLnNwbGl0KCcgJyk7XG5cbmZ1bmN0aW9uIHJlbG9hZChuYW1lKSB7XG4gIHJpb3QudXRpbC5zdHlsZU1hbmFnZXIuaW5qZWN0KCk7XG5cbiAgdmFyIGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgobmFtZSArIFwiLCBbZGF0YS1pcz1cIiArIG5hbWUgKyBcIl1cIikpO1xuICB2YXIgdGFncyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZWwgPSBlbGVtc1tpXSwgb2xkVGFnID0gZWwuX3RhZywgdjtcbiAgICByZWxvYWQudHJpZ2dlcignYmVmb3JlLXVubW91bnQnLCBvbGRUYWcpO1xuICAgIG9sZFRhZy51bm1vdW50KHRydWUpOyAvLyBkZXRhY2ggdGhlIG9sZCB0YWdcblxuICAgIC8vIHJlc2V0IHRoZSBpbm5lckhUTUwgYW5kIGF0dHJpYnV0ZXMgdG8gaG93IHRoZXkgd2VyZSBiZWZvcmUgbW91bnRcbiAgICBlbC5pbm5lckhUTUwgPSBvbGRUYWcuX18uaW5uZXJIVE1MO1xuICAgIChvbGRUYWcuX18uaW5zdEF0dHJzIHx8IFtdKS5tYXAoZnVuY3Rpb24oYXR0cikge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7XG4gICAgfSk7XG5cbiAgICAvLyBjb3B5IG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRoZSBuZXcgdGFnXG4gICAgdmFyIG5ld09wdHMgPSB7fTtcbiAgICBmb3Ioa2V5IGluIG9sZFRhZy5vcHRzKSB7XG4gICAgICBuZXdPcHRzW2tleV0gPSBvbGRUYWcub3B0c1trZXldO1xuICAgIH1cbiAgICBuZXdPcHRzLnBhcmVudCA9IG9sZFRhZy5wYXJlbnQ7XG5cbiAgICAvLyBjcmVhdGUgdGhlIG5ldyB0YWdcbiAgICByZWxvYWQudHJpZ2dlcignYmVmb3JlLW1vdW50JywgbmV3T3B0cywgb2xkVGFnKTtcbiAgICB2YXIgbmV3VGFnID0gcmlvdC5tb3VudChlbCwgbmV3T3B0cylbMF07XG5cbiAgICAvLyBjb3B5IHN0YXRlIGZyb20gdGhlIG9sZCB0byBuZXcgdGFnXG4gICAgZm9yKHZhciBrZXkgaW4gb2xkVGFnKSB7XG4gICAgICB2ID0gb2xkVGFnW2tleV07XG4gICAgICBpZiAofm5vblN0YXRlLmluZGV4T2Yoa2V5KSkgeyBjb250aW51ZSB9XG4gICAgICBuZXdUYWdba2V5XSA9IHY7XG4gICAgfVxuICAgIG5ld1RhZy51cGRhdGUoKTtcbiAgICB0YWdzLnB1c2gobmV3VGFnKTtcbiAgICByZWxvYWQudHJpZ2dlcignYWZ0ZXItbW91bnQnLCBuZXdUYWcsIG9sZFRhZyk7XG4gIH1cblxuICByZXR1cm4gdGFnc1xufVxuXG5yaW90Lm9ic2VydmFibGUocmVsb2FkKTtcbnJpb3QucmVsb2FkID0gcmVsb2FkO1xuaWYgKHJpb3QuZGVmYXVsdCkgeyByaW90LmRlZmF1bHQucmVsb2FkID0gcmVsb2FkOyB9XG5cbmV4cG9ydHMucmVsb2FkID0gcmVsb2FkO1xuZXhwb3J0c1snZGVmYXVsdCddID0gcmVsb2FkO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Jpb3QtaG90LXJlbG9hZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbiAgICB2YXIgcmlvdCA9IHJlcXVpcmUoJ3Jpb3QnKVxuICAgIC8vc3JjOiBDOi9kZXYvanMvcmlvdGpzL2lsYW4tYXJjaC9zcmMvd2VicGFjay9yYW5kb20udGFnLmh0bWxcbmltcG9ydCAnLi9sb2dzLnRhZy5odG1sJ1xucmlvdC50YWcyKCdyYW5kb20nLFxuICAnPGgzPntvcHRzLnRpdGxlfTwvaDM+IDxidXR0b24gb25jbGljaz1cIntnZW5lcmF0ZX1cIj4gR2VuZXJhdGUgPC9idXR0b24+IDxoMT4ge251bWJlcn0gPC9oMT4gPGltZyBzcmM9XCJzdmctbG9nby1oLnN2Z1wiIGhlaWdodD1cIjMwXCI+IDxsb2dzIGxvZ3M9XCJ7bG9nc31cIiBvbmNsZWFyPVwie2NsZWFyTG9nc31cIj48L2xvZ3M+JyxcbiAgJ3JhbmRvbSBoMSxbZGF0YS1pcz1cInJhbmRvbVwiXSBoMXsgY29sb3I6IHJlZDsgfScsXG4gICcnLCBmdW5jdGlvbihvcHRzKSB7XG5cbiAgICB0aGlzLm51bWJlciA9IG51bGxcbiAgICB0aGlzLmxvZ3MgPSBbXVxuXG4gICAgdGhpcy5nZW5lcmF0ZSA9IChlKSA9PiB7XG4gICAgICB0aGlzLmxvZ3MucHVzaCh7IHRleHQ6IGBHZW5lcmF0ZSBidXR0b24gY2xpY2tlZC4gRXZlbiB0eXBlIGlzICR7IGUudHlwZSB9YCB9KVxuICAgICAgdGhpcy5udW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwMDApXG4gICAgfVxuXG4gICAgdGhpcy5jbGVhckxvZ3MgPSAoZSkgPT4ge1xuICAgICAgdGhpcy5sb2dzID0gW11cbiAgICB9XG5cbiAgICB0aGlzLmdlbmVyYXRlKHsgdHlwZTogJ2N1c3RvbScgfSlcbn0pO1xuXG4gICAgXG4gIGlmIChtb2R1bGUuaG90KSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIHJpb3QucmVsb2FkKCdyYW5kb20nKVxuICAgIH1cbiAgfVxuICBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy93ZWJwYWNrL3JhbmRvbS50YWcuaHRtbFxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcmlvdCBmcm9tICdyaW90J1xuaW1wb3J0ICdyaW90LWhvdC1yZWxvYWQnXG5pbXBvcnQgJy4vcmFuZG9tLnRhZy5odG1sJ1xuXG5yaW90Lm1vdW50KCdyYW5kb20nLCB7XG4gIHRpdGxlOiAnSGkgdGhlcmUhJ1xufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy93ZWJwYWNrL2FwcC5qcyIsIlxuICAgIHZhciByaW90ID0gcmVxdWlyZSgncmlvdCcpXG4gICAgLy9zcmM6IEM6L2Rldi9qcy9yaW90anMvaWxhbi1hcmNoL3NyYy93ZWJwYWNrL2xvZ3MudGFnLmh0bWxcbnJpb3QudGFnMignbG9ncycsXG4gICc8aDQ+TG9nczwvaDQ+IDxidXR0b24gb25jbGljaz1cIntvcHRzLm9uY2xlYXJ9XCI+IENsZWFyIGxvZ3MgPC9idXR0b24+IDx1bD4gPGxpIGVhY2g9XCJ7b3B0cy5sb2dzfVwiPnt0ZXh0fTwvbGk+IDwvdWw+JyxcbiAgJycsXG4gICcnLCBmdW5jdGlvbihvcHRzKSB7XG59KTtcblxuICAgIFxuICBpZiAobW9kdWxlLmhvdCkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgICByaW90LnJlbG9hZCgnbG9ncycpXG4gICAgfVxuICB9XG4gIFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3dlYnBhY2svbG9ncy50YWcuaHRtbFxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9