/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handler.ts":
/*!************************!*\
  !*** ./src/handler.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   app: () => (/* binding */ app),\n/* harmony export */   serve: () => (/* binding */ serve)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! serverless-http */ \"serverless-http\");\n/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ \"cors\");\n/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes */ \"./src/routes/index.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.ts\");\n\r\n\r\n\r\n\r\n\r\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\r\napp.use(cors__WEBPACK_IMPORTED_MODULE_2___default()({\r\n    origin: '*',\r\n    methods: '*',\r\n    allowedHeaders: '*',\r\n}));\r\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default().json());\r\napp.use('/', _routes__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\r\napp.use((req, res, next) => {\r\n    res.status(404);\r\n});\r\napp.use((err, req, res, next) => {\r\n    console.error(err);\r\n    res\r\n        .status(err.status || 500)\r\n        .json(err.message || 'Internal Server Error')\r\n        .send();\r\n});\r\napp.use(_utils__WEBPACK_IMPORTED_MODULE_4__.logErrors);\r\napp.use(_utils__WEBPACK_IMPORTED_MODULE_4__.clientErrorHandler);\r\napp.use(_utils__WEBPACK_IMPORTED_MODULE_4__.errorHandler);\r\nconst serve = serverless_http__WEBPACK_IMPORTED_MODULE_1___default()(app);\r\n\n\n//# sourceURL=webpack://backend-blog/./src/handler.ts?");

/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _v1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v1 */ \"./src/routes/v1/index.ts\");\n\r\n\r\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\r\nrouter.get('/', async (req, res) => {\r\n    res.status(200).json('Health check');\r\n});\r\nrouter.use('', _v1__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\r\n\n\n//# sourceURL=webpack://backend-blog/./src/routes/index.ts?");

/***/ }),

/***/ "./src/routes/v1/blog.route.ts":
/*!*************************************!*\
  !*** ./src/routes/v1/blog.route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var front_matter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! front-matter */ \"front-matter\");\n/* harmony import */ var front_matter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(front_matter__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\r\nrouter.get('/:categoryId/latest', (req, res) => {\r\n    console.log('blog,latest');\r\n    (0,fs__WEBPACK_IMPORTED_MODULE_1__.readFile)(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {\r\n        if (err) {\r\n            res.status(404).send(err);\r\n        }\r\n        else {\r\n            res.send(front_matter__WEBPACK_IMPORTED_MODULE_2___default()(data));\r\n        }\r\n    });\r\n});\r\nrouter.get('/:categoryId/:postId', (req, res) => {\r\n    console.log('blog,post');\r\n    (0,fs__WEBPACK_IMPORTED_MODULE_1__.readFile)(`./src/assets/${req.params.postId}.mdx`, 'utf8', (err, data) => {\r\n        if (err) {\r\n            res.status(404).send(err);\r\n        }\r\n        else {\r\n            res.send(front_matter__WEBPACK_IMPORTED_MODULE_2___default()(data));\r\n        }\r\n    });\r\n});\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\r\n\n\n//# sourceURL=webpack://backend-blog/./src/routes/v1/blog.route.ts?");

/***/ }),

/***/ "./src/routes/v1/changelog.route.ts":
/*!******************************************!*\
  !*** ./src/routes/v1/changelog.route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var front_matter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! front-matter */ \"front-matter\");\n/* harmony import */ var front_matter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(front_matter__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\r\nrouter.get('/latest', (req, res) => {\r\n    res.send({});\r\n});\r\nrouter.get('/:postId', (req, res) => {\r\n    (0,fs__WEBPACK_IMPORTED_MODULE_1__.readFile)(`./src/assets/${req.params.postId}.md`, 'utf8', (err, data) => {\r\n        if (err) {\r\n            res.status(404).send(err);\r\n        }\r\n        else {\r\n            res.send(front_matter__WEBPACK_IMPORTED_MODULE_2___default()(data));\r\n        }\r\n    });\r\n});\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\r\n\n\n//# sourceURL=webpack://backend-blog/./src/routes/v1/changelog.route.ts?");

/***/ }),

/***/ "./src/routes/v1/index.ts":
/*!********************************!*\
  !*** ./src/routes/v1/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _blog_route__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blog.route */ \"./src/routes/v1/blog.route.ts\");\n/* harmony import */ var _changelog_route__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./changelog.route */ \"./src/routes/v1/changelog.route.ts\");\n\r\n\r\n\r\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\r\nrouter.use('/blog', _blog_route__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\r\nrouter.use('/changelog', _changelog_route__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\r\n\n\n//# sourceURL=webpack://backend-blog/./src/routes/v1/index.ts?");

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ferror: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.Ferror),\n/* harmony export */   clientErrorHandler: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.clientErrorHandler),\n/* harmony export */   decrypt: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.decrypt),\n/* harmony export */   encrypt: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.encrypt),\n/* harmony export */   errorHandler: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler),\n/* harmony export */   hashClientId: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.hashClientId),\n/* harmony export */   isStringsArray: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.isStringsArray),\n/* harmony export */   logErrors: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.logErrors),\n/* harmony export */   sortByDate: () => (/* reexport safe */ _utils__WEBPACK_IMPORTED_MODULE_0__.sortByDate)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/utils/utils.ts\");\n\r\n\n\n//# sourceURL=webpack://backend-blog/./src/utils/index.ts?");

/***/ }),

/***/ "./src/utils/utils.ts":
/*!****************************!*\
  !*** ./src/utils/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ferror: () => (/* binding */ Ferror),\n/* harmony export */   clientErrorHandler: () => (/* binding */ clientErrorHandler),\n/* harmony export */   decrypt: () => (/* binding */ decrypt),\n/* harmony export */   encrypt: () => (/* binding */ encrypt),\n/* harmony export */   errorHandler: () => (/* binding */ errorHandler),\n/* harmony export */   hashClientId: () => (/* binding */ hashClientId),\n/* harmony export */   isStringsArray: () => (/* binding */ isStringsArray),\n/* harmony export */   logErrors: () => (/* binding */ logErrors),\n/* harmony export */   sortByDate: () => (/* binding */ sortByDate)\n/* harmony export */ });\n/* harmony import */ var fernet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fernet */ \"fernet\");\n/* harmony import */ var fernet__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fernet__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node:crypto */ \"node:crypto\");\n/* harmony import */ var node_crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_crypto__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\nconst errorHandler = (err, req, res, next) => {\r\n    res.status(500);\r\n    res.render('error', { error: err });\r\n};\r\nconst clientErrorHandler = (err, req, res, next) => {\r\n    console.log('errorrr', err);\r\n    if (req.xhr) {\r\n        res.status(500).send({ error: 'Something failed!' });\r\n    }\r\n    else {\r\n        next(err);\r\n    }\r\n};\r\nconst logErrors = (err, req, res, next) => {\r\n    console.error(err.stack);\r\n    next(err);\r\n};\r\nclass Ferror extends Error {\r\n    status = 500;\r\n    message = 'Internal Server Error';\r\n    constructor(status, message) {\r\n        super(message);\r\n        this.status = status;\r\n        this.message = message;\r\n        Object.seal(this);\r\n    }\r\n}\r\nconst key = () => {\r\n    return process.env.SECRET_KEY || '';\r\n};\r\nconst encrypt = (data, secret) => {\r\n    if (!secret)\r\n        secret = key();\r\n    const f = new (fernet__WEBPACK_IMPORTED_MODULE_0___default().Token)({ secret: new (fernet__WEBPACK_IMPORTED_MODULE_0___default().Secret)(secret) });\r\n    return f.encode(JSON.stringify(data));\r\n};\r\nconst decrypt = (token, secret) => {\r\n    if (!secret)\r\n        secret = key();\r\n    const f = new (fernet__WEBPACK_IMPORTED_MODULE_0___default().Token)({\r\n        secret: new (fernet__WEBPACK_IMPORTED_MODULE_0___default().Secret)(secret),\r\n        token: token,\r\n        ttl: 0,\r\n    });\r\n    return f.decode();\r\n};\r\nconst hashClientId = (clientId) => {\r\n    const hash = (0,node_crypto__WEBPACK_IMPORTED_MODULE_1__.createHash)('sha256');\r\n    return hash.update(Buffer.from(clientId, 'utf8')).digest('hex').slice(0, 24);\r\n};\r\nconst isStringsArray = (arr) => arr.every((i) => typeof i === 'string');\r\nconst sortByDate = (array, key, ascending = false) => {\r\n    array.sort((a, b) => {\r\n        const j = Date.parse(a[key]);\r\n        const k = Date.parse(b[key]);\r\n        if (ascending)\r\n            return j - k;\r\n        return k - j;\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://backend-blog/./src/utils/utils.ts?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "fernet":
/*!*************************!*\
  !*** external "fernet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("fernet");

/***/ }),

/***/ "front-matter":
/*!*******************************!*\
  !*** external "front-matter" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("front-matter");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("serverless-http");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;