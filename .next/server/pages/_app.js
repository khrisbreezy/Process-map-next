module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("1TCz");


/***/ }),

/***/ "1TCz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__("F5FC");

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__("h74D");

// EXTERNAL MODULE: ./node_modules/next/app.js
var app = __webpack_require__("8Bbg");
var app_default = /*#__PURE__*/__webpack_require__.n(app);

// EXTERNAL MODULE: external "redux-thunk"
var external_redux_thunk_ = __webpack_require__("ZSx1");
var external_redux_thunk_default = /*#__PURE__*/__webpack_require__.n(external_redux_thunk_);

// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__("rKB8");

// EXTERNAL MODULE: external "redux-devtools-extension"
var external_redux_devtools_extension_ = __webpack_require__("ufKq");

// EXTERNAL MODULE: external "redux-persist/lib/storage"
var storage_ = __webpack_require__("T8f9");
var storage_default = /*#__PURE__*/__webpack_require__.n(storage_);

// EXTERNAL MODULE: external "react-notifications"
var external_react_notifications_ = __webpack_require__("gWK2");

// EXTERNAL MODULE: external "redux-persist"
var external_redux_persist_ = __webpack_require__("VNb8");

// EXTERNAL MODULE: external "redux-persist/integration/react"
var react_ = __webpack_require__("JPPj");

// EXTERNAL MODULE: ./store/actions/phaseStore.js
var phaseStore = __webpack_require__("2fD4");

// CONCATENATED MODULE: ./store/reducers/phaseStore.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const initialState = {
  phases: [],
  processInfo: null
};

const phaseData = (state = initialState, action) => {
  switch (action.type) {
    case phaseStore["a" /* SAVE_PHASE_DATA */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        phases: action.data
      });

    case phaseStore["b" /* SAVE_PROCESS_DATA */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        processInfo: action.data
      });

    default:
      return state;
  }
};

/* harmony default export */ var reducers_phaseStore = (phaseData);
// EXTERNAL MODULE: external "js-cookie"
var external_js_cookie_ = __webpack_require__("vmXh");
var external_js_cookie_default = /*#__PURE__*/__webpack_require__.n(external_js_cookie_);

// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__("zr5I");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);

// CONCATENATED MODULE: ./config/axios.js

const axiosInstance = external_axios_default.a.create({
  baseURL: 'https://process-mapping.herokuapp.com/api/v1/',
  headers: {
    'Content-Type': 'application/json'
  }
});
/* harmony default export */ var axios = (axiosInstance);
// CONCATENATED MODULE: ./store/actions/auth.js



const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const loginAsync = data => {
  let newData = data;
  return async dispatch => {
    try {
      const {
        data: response
      } = await axios.post(`login`, newData);
      dispatch(storeAuth(response.data));
      external_react_notifications_["NotificationManager"].success(response.message, '', 5000);
    } catch (error) {
      external_react_notifications_["NotificationManager"].error(error.response.data.message, '', 5000);
      return 'error';
    }
  };
};
const storeAuth = data => {
  external_js_cookie_default.a.set('token', data.token, {
    secure: true
  });
  external_js_cookie_default.a.set('user', JSON.stringify(data.user), {
    secure: true
  });
  return {
    type: 'LOGIN',
    data
  };
};
const logout = () => {
  external_js_cookie_default.a.remove('token');
  external_js_cookie_default.a.remove('user');
  return {
    type: LOGOUT
  };
};
// CONCATENATED MODULE: ./store/reducers/auth.js
function auth_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function auth_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { auth_ownKeys(Object(source), true).forEach(function (key) { auth_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { auth_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function auth_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const auth_token = external_js_cookie_default.a.get('token'),
      auth_user = external_js_cookie_default.a.get('user');
const auth_initialState = {
  loggedIn: !!auth_token && !!auth_user,
  user: auth_user || null,
  token: auth_token || auth_token
};

const auth = (state = auth_initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const {
        user,
        token
      } = action.data;
      return auth_objectSpread(auth_objectSpread({}, state), {}, {
        user,
        token,
        loggedIn: true
      });

    case LOGOUT:
      return auth_objectSpread(auth_objectSpread({}, state), {}, {
        user: null,
        token: null,
        loggedIn: false
      });

    default:
      return state;
  }
};

/* harmony default export */ var reducers_auth = (auth);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("cDcd");

// EXTERNAL MODULE: external "react-hook-form"
var external_react_hook_form_ = __webpack_require__("BTiB");

// CONCATENATED MODULE: ./components/Error.js


const Error = ({
  children
}) => {
  return /*#__PURE__*/Object(jsx_runtime_["jsx"])("p", {
    className: "mb-0 error",
    children: children
  });
};

/* harmony default export */ var components_Error = (Error);
// CONCATENATED MODULE: ./components/AuthModal.js










const AuthModal = () => {
  const {
    handleSubmit,
    errors,
    register,
    reset
  } = Object(external_react_hook_form_["useForm"])();
  const {
    0: loading,
    1: setLoading
  } = Object(external_react_["useState"])(false);
  const {
    0: formState,
    1: setFormState
  } = Object(external_react_["useState"])('login');
  const dispatch = Object(external_react_redux_["useDispatch"])();

  const signUpHandler = async data => {
    setLoading(true);
    let newData = data;

    try {
      const {
        data: response
      } = await axios.post('register', newData);
      dispatch(storeAuth(response.data));
      $('#authModal').modal('hide');
      setLoading(false);
    } catch (e) {
      console.log('====================================');
      console.log(e.response);
      console.log('====================================');
      setLoading(false);
    }
  };

  const loginHandler = async data => {
    setLoading(true);

    try {
      const loginResponse = await dispatch(loginAsync(data));
      setLoading(false);
      $('#authModal').modal('hide');
      if (loginResponse === 'error') return;
    } catch (error) {
      console.log(error, 'error');
      setLoading(false);
    }

    reset({});
  };

  const forgotPasswordHandler = () => {};

  return /*#__PURE__*/Object(jsx_runtime_["jsx"])(jsx_runtime_["Fragment"], {
    children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
      className: "modal fade",
      id: "authModal",
      tabIndex: "-1",
      role: "dialog",
      "aria-labelledby": "exampleModalCenterTitle",
      "aria-hidden": "true",
      children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
        className: "modal-dialog modal-dialog-centered modal-lg",
        role: "document",
        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
          className: "modal-content",
          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
            className: "modal-header",
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
              style: {
                fontSize: '3rem'
              },
              type: "button",
              className: "close",
              "data-dismiss": "modal",
              "aria-label": "Close",
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
                "aria-hidden": "true",
                children: "\xD7"
              })
            })
          }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
            className: "modal-body mb-5",
            children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
              className: "container",
              children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
                className: "row",
                children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
                  className: "col-md-12",
                  children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                    className: "text-center",
                    children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("h2", {
                      children: formState === 'login' ? 'Login' : `${formState === 'signUp' ? 'Signup' : 'Forgot Password'}`
                    }), formState === 'signUp' && /*#__PURE__*/Object(jsx_runtime_["jsxs"])("form", {
                      className: "auth-form",
                      onSubmit: handleSubmit(signUpHandler),
                      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                        className: "row",
                        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                          className: "col-md-6 mb-4",
                          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                            type: "text",
                            name: "first_name",
                            placeholder: "First name",
                            className: "w-100",
                            ref: register({
                              required: 'This field is required'
                            })
                          }), errors.first_name && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_Error, {
                            children: errors.first_name.message
                          })]
                        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                          className: "col-md-6 mb-4",
                          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                            type: "text",
                            name: "last_name",
                            placeholder: "Last name",
                            className: "w-100",
                            ref: register({
                              required: 'This field is required'
                            })
                          }), errors.last_name && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_Error, {
                            children: errors.last_name.message
                          })]
                        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                          className: "col-md-6 mb-4",
                          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                            type: "email",
                            name: "email",
                            placeholder: "Email",
                            className: "w-100",
                            ref: register({
                              required: 'This field is required'
                            })
                          }), errors.email && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_Error, {
                            children: errors.email.message
                          })]
                        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                          className: "col-md-6 mb-4",
                          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                            type: "password",
                            name: "password",
                            placeholder: "Password",
                            className: "w-100",
                            ref: register({
                              required: 'This field is required'
                            })
                          }), errors.password && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_Error, {
                            children: errors.password.message
                          })]
                        })]
                      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
                        className: "text-center",
                        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
                          disabled: loading,
                          type: "submit",
                          className: "btn btn-login",
                          children: !loading ? 'Submit' : 'Submitting...'
                        })
                      })]
                    }), formState === 'login' && /*#__PURE__*/Object(jsx_runtime_["jsxs"])("form", {
                      className: "auth-form",
                      onSubmit: handleSubmit(loginHandler),
                      children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                        className: "row",
                        children: [/*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                          className: "col-12 mb-4",
                          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                            type: "email",
                            name: "email",
                            placeholder: "Email",
                            className: "w-100",
                            ref: register({
                              required: 'This field is required'
                            })
                          }), errors.email && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_Error, {
                            children: errors.email.message
                          })]
                        }), /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                          className: "col-12 mb-4",
                          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                            type: "password",
                            name: "password",
                            placeholder: "Password",
                            className: "w-100",
                            ref: register({
                              required: 'This field is required'
                            })
                          }), errors.password && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_Error, {
                            children: errors.password.message
                          })]
                        })]
                      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
                        className: "text-center",
                        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
                          disabled: loading,
                          type: "submit",
                          className: "btn btn-login",
                          children: !loading ? 'Submit' : 'Submitting...'
                        })
                      })]
                    }), formState === 'forgot' && /*#__PURE__*/Object(jsx_runtime_["jsxs"])("form", {
                      className: "auth-form",
                      onSubmit: handleSubmit(forgotPasswordHandler),
                      children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
                        className: "row",
                        children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("div", {
                          className: "col-12 mb-4",
                          children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])("input", {
                            type: "email",
                            name: "email",
                            placeholder: "Email",
                            className: "w-100",
                            ref: register({
                              required: 'This field is required'
                            })
                          }), errors.email && /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_Error, {
                            children: errors.email.message
                          })]
                        })
                      }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
                        className: "text-center",
                        children: /*#__PURE__*/Object(jsx_runtime_["jsx"])("button", {
                          disabled: loading,
                          type: "submit",
                          className: "btn btn-login",
                          children: !loading ? 'Submit' : 'Submitting...'
                        })
                      })]
                    }), /*#__PURE__*/Object(jsx_runtime_["jsx"])("div", {
                      className: "d-flex align-items-center justify-content-between",
                      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])("p", {
                        children: [" ", formState === 'signUp' ? 'Already signed up?' : `Haven't signup yet?`, formState === 'signUp' ? /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
                          onClick: () => setFormState('login'),
                          className: "cursor",
                          children: "Login"
                        }) : /*#__PURE__*/Object(jsx_runtime_["jsx"])("span", {
                          onClick: () => setFormState('signUp'),
                          className: "cursor",
                          children: " Signup"
                        })]
                      })
                    })]
                  })
                })
              })
            })
          })]
        })
      })
    })
  });
};

/* harmony default export */ var components_AuthModal = (AuthModal);
// EXTERNAL MODULE: ./styles/sass/main.scss
var main = __webpack_require__("kmg9");

// EXTERNAL MODULE: ./node_modules/react-notifications/lib/notifications.css
var notifications = __webpack_require__("R9sY");

// CONCATENATED MODULE: ./pages/_app.js



function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _app_ownKeys(Object(source), true).forEach(function (key) { _app_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















const persistConfig = {
  key: 'root',
  storage: storage_default.a,
  blacklist: ['auth']
};
const reducers = Object(external_redux_["combineReducers"])({
  auth: reducers_auth,
  phaseData: Object(external_redux_persist_["persistReducer"])(persistConfig, reducers_phaseStore)
});
const store =  true ? Object(external_redux_["createStore"])(reducers, Object(external_redux_devtools_extension_["composeWithDevTools"])(Object(external_redux_["applyMiddleware"])(external_redux_thunk_default.a))) : undefined;
const persistor = Object(external_redux_persist_["persistStore"])(store);
/* harmony default export */ var _app = __webpack_exports__["default"] = (class extends app_default.a {
  render() {
    const {
      Component,
      pageProps
    } = this.props;
    return /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_redux_["Provider"], {
      store: store,
      children: /*#__PURE__*/Object(jsx_runtime_["jsxs"])(react_["PersistGate"], {
        persistor: persistor,
        loading: null,
        children: [/*#__PURE__*/Object(jsx_runtime_["jsx"])(Component, _app_objectSpread({}, pageProps)), /*#__PURE__*/Object(jsx_runtime_["jsx"])(components_AuthModal, {}), /*#__PURE__*/Object(jsx_runtime_["jsx"])(external_react_notifications_["NotificationContainer"], {})]
      })
    });
  }

});

/***/ }),

/***/ "2fD4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SAVE_PHASE_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SAVE_PROCESS_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return savePhaseData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return saveProcessData; });
const SAVE_PHASE_DATA = 'SAVE_PHASE_DATA';
const SAVE_PROCESS_DATA = 'SAVE_PROCESS_DATA';
const savePhaseData = data => ({
  type: SAVE_PHASE_DATA,
  data
});
const saveProcessData = data => ({
  type: SAVE_PROCESS_DATA,
  data
});

/***/ }),

/***/ "8Bbg":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("B5Ud")


/***/ }),

/***/ "AroE":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "B5Ud":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("AroE");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__("cDcd"));

var _utils = __webpack_require__("kYf9");

exports.AppInitialProps = _utils.AppInitialProps;
exports.NextWebVitalsMetric = _utils.NextWebVitalsMetric;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

async function appGetInitialProps({
  Component,
  ctx
}) {
  const pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
  return {
    pageProps
  };
}

class App extends _react.default.Component {
  // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`.
  // @deprecated This method is no longer needed. Errors are caught at the top level
  componentDidCatch(error, _errorInfo) {
    throw error;
  }

  render() {
    const {
      router,
      Component,
      pageProps,
      __N_SSG,
      __N_SSP
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy
    // methods like getStaticProps and getServerSideProps
    !(__N_SSG || __N_SSP) ? {
      url: createUrl(router)
    } : {}));
  }

}

exports.default = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
let warnContainer;
let warnUrl;

if (false) {} // @deprecated noop for now until removal


function Container(p) {
  if (false) {}
  return p.children;
}

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  const {
    pathname,
    asPath,
    query
  } = router;
  return {
    get query() {
      if (false) {}
      return query;
    },

    get pathname() {
      if (false) {}
      return pathname;
    },

    get asPath() {
      if (false) {}
      return asPath;
    },

    back: () => {
      if (false) {}
      router.back();
    },
    push: (url, as) => {
      if (false) {}
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (false) {}
      const pushRoute = as ? href : '';
      const pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (false) {}
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (false) {}
      const replaceRoute = as ? href : '';
      const replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "BTiB":
/***/ (function(module, exports) {

module.exports = require("react-hook-form");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "JPPj":
/***/ (function(module, exports) {

module.exports = require("redux-persist/integration/react");

/***/ }),

/***/ "R9sY":
/***/ (function(module, exports) {



/***/ }),

/***/ "T8f9":
/***/ (function(module, exports) {

module.exports = require("redux-persist/lib/storage");

/***/ }),

/***/ "VNb8":
/***/ (function(module, exports) {

module.exports = require("redux-persist");

/***/ }),

/***/ "ZSx1":
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "gWK2":
/***/ (function(module, exports) {

module.exports = require("react-notifications");

/***/ }),

/***/ "h74D":
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "kYf9":
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "kmg9":
/***/ (function(module, exports) {



/***/ }),

/***/ "rKB8":
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "ufKq":
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "vmXh":
/***/ (function(module, exports) {

module.exports = require("js-cookie");

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });