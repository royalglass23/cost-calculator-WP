(function () {
  const M = document.createElement("link").relList;
  if (M && M.supports && M.supports("modulepreload")) return;
  for (const U of document.querySelectorAll('link[rel="modulepreload"]')) d(U);
  new MutationObserver((U) => {
    for (const G of U)
      if (G.type === "childList")
        for (const O of G.addedNodes) O.tagName === "LINK" && O.rel === "modulepreload" && d(O);
  }).observe(document, { childList: !0, subtree: !0 });
  function B(U) {
    const G = {};
    return (
      U.integrity && (G.integrity = U.integrity),
      U.referrerPolicy && (G.referrerPolicy = U.referrerPolicy),
      U.crossOrigin === "use-credentials"
        ? (G.credentials = "include")
        : U.crossOrigin === "anonymous"
          ? (G.credentials = "omit")
          : (G.credentials = "same-origin"),
      G
    );
  }
  function d(U) {
    if (U.ep) return;
    U.ep = !0;
    const G = B(U);
    fetch(U.href, G);
  }
})();
function Hd(m) {
  return m && m.__esModule && Object.prototype.hasOwnProperty.call(m, "default") ? m.default : m;
}
var df = { exports: {} },
  En = {};
var Td;
function u0() {
  if (Td) return En;
  Td = 1;
  var m = Symbol.for("react.transitional.element"),
    M = Symbol.for("react.fragment");
  function B(d, U, G) {
    var O = null;
    if ((G !== void 0 && (O = "" + G), U.key !== void 0 && (O = "" + U.key), "key" in U)) {
      G = {};
      for (var K in U) K !== "key" && (G[K] = U[K]);
    } else G = U;
    return ((U = G.ref), { $$typeof: m, type: d, key: O, ref: U !== void 0 ? U : null, props: G });
  }
  return ((En.Fragment = M), (En.jsx = B), (En.jsxs = B), En);
}
var zd;
function i0() {
  return (zd || ((zd = 1), (df.exports = u0())), df.exports);
}
var s = i0(),
  hf = { exports: {} },
  k = {};
var Ed;
function c0() {
  if (Ed) return k;
  Ed = 1;
  var m = Symbol.for("react.transitional.element"),
    M = Symbol.for("react.portal"),
    B = Symbol.for("react.fragment"),
    d = Symbol.for("react.strict_mode"),
    U = Symbol.for("react.profiler"),
    G = Symbol.for("react.consumer"),
    O = Symbol.for("react.context"),
    K = Symbol.for("react.forward_ref"),
    A = Symbol.for("react.suspense"),
    S = Symbol.for("react.memo"),
    Y = Symbol.for("react.lazy"),
    C = Symbol.for("react.activity"),
    Z = Symbol.iterator;
  function W(r) {
    return r === null || typeof r != "object"
      ? null
      : ((r = (Z && r[Z]) || r["@@iterator"]), typeof r == "function" ? r : null);
  }
  var Q = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    ul = Object.assign,
    _ = {};
  function w(r, E, D) {
    ((this.props = r), (this.context = E), (this.refs = _), (this.updater = D || Q));
  }
  ((w.prototype.isReactComponent = {}),
    (w.prototype.setState = function (r, E) {
      if (typeof r != "object" && typeof r != "function" && r != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, r, E, "setState");
    }),
    (w.prototype.forceUpdate = function (r) {
      this.updater.enqueueForceUpdate(this, r, "forceUpdate");
    }));
  function ol() {}
  ol.prototype = w.prototype;
  function rl(r, E, D) {
    ((this.props = r), (this.context = E), (this.refs = _), (this.updater = D || Q));
  }
  var Zl = (rl.prototype = new ol());
  ((Zl.constructor = rl), ul(Zl, w.prototype), (Zl.isPureReactComponent = !0));
  var tt = Array.isArray;
  function Rl() {}
  var I = { H: null, A: null, T: null, S: null },
    Al = Object.prototype.hasOwnProperty;
  function Nl(r, E, D) {
    var N = D.ref;
    return { $$typeof: m, type: r, key: E, ref: N !== void 0 ? N : null, props: D };
  }
  function q(r, E) {
    return Nl(r.type, E, r.props);
  }
  function X(r) {
    return typeof r == "object" && r !== null && r.$$typeof === m;
  }
  function yl(r) {
    var E = { "=": "=0", ":": "=2" };
    return (
      "$" +
      r.replace(/[=:]/g, function (D) {
        return E[D];
      })
    );
  }
  var Vl = /\/+/g;
  function $l(r, E) {
    return typeof r == "object" && r !== null && r.key != null ? yl("" + r.key) : E.toString(36);
  }
  function Kl(r) {
    switch (r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw r.reason;
      default:
        switch (
          (typeof r.status == "string"
            ? r.then(Rl, Rl)
            : ((r.status = "pending"),
              r.then(
                function (E) {
                  r.status === "pending" && ((r.status = "fulfilled"), (r.value = E));
                },
                function (E) {
                  r.status === "pending" && ((r.status = "rejected"), (r.reason = E));
                },
              )),
          r.status)
        ) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
        }
    }
    throw r;
  }
  function x(r, E, D, N, F) {
    var ll = typeof r;
    (ll === "undefined" || ll === "boolean") && (r = null);
    var hl = !1;
    if (r === null) hl = !0;
    else
      switch (ll) {
        case "bigint":
        case "string":
        case "number":
          hl = !0;
          break;
        case "object":
          switch (r.$$typeof) {
            case m:
            case M:
              hl = !0;
              break;
            case Y:
              return ((hl = r._init), x(hl(r._payload), E, D, N, F));
          }
      }
    if (hl)
      return (
        (F = F(r)),
        (hl = N === "" ? "." + $l(r, 0) : N),
        tt(F)
          ? ((D = ""),
            hl != null && (D = hl.replace(Vl, "$&/") + "/"),
            x(F, E, D, "", function (Ca) {
              return Ca;
            }))
          : F != null &&
            (X(F) &&
              (F = q(
                F,
                D +
                  (F.key == null || (r && r.key === F.key)
                    ? ""
                    : ("" + F.key).replace(Vl, "$&/") + "/") +
                  hl,
              )),
            E.push(F)),
        1
      );
    hl = 0;
    var Pl = N === "" ? "." : N + ":";
    if (tt(r))
      for (var Cl = 0; Cl < r.length; Cl++)
        ((N = r[Cl]), (ll = Pl + $l(N, Cl)), (hl += x(N, E, D, ll, F)));
    else if (((Cl = W(r)), typeof Cl == "function"))
      for (r = Cl.call(r), Cl = 0; !(N = r.next()).done; )
        ((N = N.value), (ll = Pl + $l(N, Cl++)), (hl += x(N, E, D, ll, F)));
    else if (ll === "object") {
      if (typeof r.then == "function") return x(Kl(r), E, D, N, F);
      throw (
        (E = String(r)),
        Error(
          "Objects are not valid as a React child (found: " +
            (E === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : E) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return hl;
  }
  function j(r, E, D) {
    if (r == null) return r;
    var N = [],
      F = 0;
    return (
      x(r, N, "", "", function (ll) {
        return E.call(D, ll, F++);
      }),
      N
    );
  }
  function J(r) {
    if (r._status === -1) {
      var E = r._result;
      ((E = E()),
        E.then(
          function (D) {
            (r._status === 0 || r._status === -1) && ((r._status = 1), (r._result = D));
          },
          function (D) {
            (r._status === 0 || r._status === -1) && ((r._status = 2), (r._result = D));
          },
        ),
        r._status === -1 && ((r._status = 0), (r._result = E)));
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var vl =
      typeof reportError == "function"
        ? reportError
        : function (r) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var E = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof r == "object" && r !== null && typeof r.message == "string"
                    ? String(r.message)
                    : String(r),
                error: r,
              });
              if (!window.dispatchEvent(E)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", r);
              return;
            }
            console.error(r);
          },
    xl = {
      map: j,
      forEach: function (r, E, D) {
        j(
          r,
          function () {
            E.apply(this, arguments);
          },
          D,
        );
      },
      count: function (r) {
        var E = 0;
        return (
          j(r, function () {
            E++;
          }),
          E
        );
      },
      toArray: function (r) {
        return (
          j(r, function (E) {
            return E;
          }) || []
        );
      },
      only: function (r) {
        if (!X(r))
          throw Error("React.Children.only expected to receive a single React element child.");
        return r;
      },
    };
  return (
    (k.Activity = C),
    (k.Children = xl),
    (k.Component = w),
    (k.Fragment = B),
    (k.Profiler = U),
    (k.PureComponent = rl),
    (k.StrictMode = d),
    (k.Suspense = A),
    (k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = I),
    (k.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (r) {
        return I.H.useMemoCache(r);
      },
    }),
    (k.cache = function (r) {
      return function () {
        return r.apply(null, arguments);
      };
    }),
    (k.cacheSignal = function () {
      return null;
    }),
    (k.cloneElement = function (r, E, D) {
      if (r == null) throw Error("The argument must be a React element, but you passed " + r + ".");
      var N = ul({}, r.props),
        F = r.key;
      if (E != null)
        for (ll in (E.key !== void 0 && (F = "" + E.key), E))
          !Al.call(E, ll) ||
            ll === "key" ||
            ll === "__self" ||
            ll === "__source" ||
            (ll === "ref" && E.ref === void 0) ||
            (N[ll] = E[ll]);
      var ll = arguments.length - 2;
      if (ll === 1) N.children = D;
      else if (1 < ll) {
        for (var hl = Array(ll), Pl = 0; Pl < ll; Pl++) hl[Pl] = arguments[Pl + 2];
        N.children = hl;
      }
      return Nl(r.type, F, N);
    }),
    (k.createContext = function (r) {
      return (
        (r = {
          $$typeof: O,
          _currentValue: r,
          _currentValue2: r,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (r.Provider = r),
        (r.Consumer = { $$typeof: G, _context: r }),
        r
      );
    }),
    (k.createElement = function (r, E, D) {
      var N,
        F = {},
        ll = null;
      if (E != null)
        for (N in (E.key !== void 0 && (ll = "" + E.key), E))
          Al.call(E, N) && N !== "key" && N !== "__self" && N !== "__source" && (F[N] = E[N]);
      var hl = arguments.length - 2;
      if (hl === 1) F.children = D;
      else if (1 < hl) {
        for (var Pl = Array(hl), Cl = 0; Cl < hl; Cl++) Pl[Cl] = arguments[Cl + 2];
        F.children = Pl;
      }
      if (r && r.defaultProps)
        for (N in ((hl = r.defaultProps), hl)) F[N] === void 0 && (F[N] = hl[N]);
      return Nl(r, ll, F);
    }),
    (k.createRef = function () {
      return { current: null };
    }),
    (k.forwardRef = function (r) {
      return { $$typeof: K, render: r };
    }),
    (k.isValidElement = X),
    (k.lazy = function (r) {
      return { $$typeof: Y, _payload: { _status: -1, _result: r }, _init: J };
    }),
    (k.memo = function (r, E) {
      return { $$typeof: S, type: r, compare: E === void 0 ? null : E };
    }),
    (k.startTransition = function (r) {
      var E = I.T,
        D = {};
      I.T = D;
      try {
        var N = r(),
          F = I.S;
        (F !== null && F(D, N),
          typeof N == "object" && N !== null && typeof N.then == "function" && N.then(Rl, vl));
      } catch (ll) {
        vl(ll);
      } finally {
        (E !== null && D.types !== null && (E.types = D.types), (I.T = E));
      }
    }),
    (k.unstable_useCacheRefresh = function () {
      return I.H.useCacheRefresh();
    }),
    (k.use = function (r) {
      return I.H.use(r);
    }),
    (k.useActionState = function (r, E, D) {
      return I.H.useActionState(r, E, D);
    }),
    (k.useCallback = function (r, E) {
      return I.H.useCallback(r, E);
    }),
    (k.useContext = function (r) {
      return I.H.useContext(r);
    }),
    (k.useDebugValue = function () {}),
    (k.useDeferredValue = function (r, E) {
      return I.H.useDeferredValue(r, E);
    }),
    (k.useEffect = function (r, E) {
      return I.H.useEffect(r, E);
    }),
    (k.useEffectEvent = function (r) {
      return I.H.useEffectEvent(r);
    }),
    (k.useId = function () {
      return I.H.useId();
    }),
    (k.useImperativeHandle = function (r, E, D) {
      return I.H.useImperativeHandle(r, E, D);
    }),
    (k.useInsertionEffect = function (r, E) {
      return I.H.useInsertionEffect(r, E);
    }),
    (k.useLayoutEffect = function (r, E) {
      return I.H.useLayoutEffect(r, E);
    }),
    (k.useMemo = function (r, E) {
      return I.H.useMemo(r, E);
    }),
    (k.useOptimistic = function (r, E) {
      return I.H.useOptimistic(r, E);
    }),
    (k.useReducer = function (r, E, D) {
      return I.H.useReducer(r, E, D);
    }),
    (k.useRef = function (r) {
      return I.H.useRef(r);
    }),
    (k.useState = function (r) {
      return I.H.useState(r);
    }),
    (k.useSyncExternalStore = function (r, E, D) {
      return I.H.useSyncExternalStore(r, E, D);
    }),
    (k.useTransition = function () {
      return I.H.useTransition();
    }),
    (k.version = "19.2.5"),
    k
  );
}
var _d;
function Sf() {
  return (_d || ((_d = 1), (hf.exports = c0())), hf.exports);
}
var cl = Sf();
const Oa = Hd(cl);
var mf = { exports: {} },
  _n = {},
  gf = { exports: {} },
  yf = {};
var Ad;
function f0() {
  return (
    Ad ||
      ((Ad = 1),
      (function (m) {
        function M(x, j) {
          var J = x.length;
          x.push(j);
          l: for (; 0 < J; ) {
            var vl = (J - 1) >>> 1,
              xl = x[vl];
            if (0 < U(xl, j)) ((x[vl] = j), (x[J] = xl), (J = vl));
            else break l;
          }
        }
        function B(x) {
          return x.length === 0 ? null : x[0];
        }
        function d(x) {
          if (x.length === 0) return null;
          var j = x[0],
            J = x.pop();
          if (J !== j) {
            x[0] = J;
            l: for (var vl = 0, xl = x.length, r = xl >>> 1; vl < r; ) {
              var E = 2 * (vl + 1) - 1,
                D = x[E],
                N = E + 1,
                F = x[N];
              if (0 > U(D, J))
                N < xl && 0 > U(F, D)
                  ? ((x[vl] = F), (x[N] = J), (vl = N))
                  : ((x[vl] = D), (x[E] = J), (vl = E));
              else if (N < xl && 0 > U(F, J)) ((x[vl] = F), (x[N] = J), (vl = N));
              else break l;
            }
          }
          return j;
        }
        function U(x, j) {
          var J = x.sortIndex - j.sortIndex;
          return J !== 0 ? J : x.id - j.id;
        }
        if (
          ((m.unstable_now = void 0),
          typeof performance == "object" && typeof performance.now == "function")
        ) {
          var G = performance;
          m.unstable_now = function () {
            return G.now();
          };
        } else {
          var O = Date,
            K = O.now();
          m.unstable_now = function () {
            return O.now() - K;
          };
        }
        var A = [],
          S = [],
          Y = 1,
          C = null,
          Z = 3,
          W = !1,
          Q = !1,
          ul = !1,
          _ = !1,
          w = typeof setTimeout == "function" ? setTimeout : null,
          ol = typeof clearTimeout == "function" ? clearTimeout : null,
          rl = typeof setImmediate < "u" ? setImmediate : null;
        function Zl(x) {
          for (var j = B(S); j !== null; ) {
            if (j.callback === null) d(S);
            else if (j.startTime <= x) (d(S), (j.sortIndex = j.expirationTime), M(A, j));
            else break;
            j = B(S);
          }
        }
        function tt(x) {
          if (((ul = !1), Zl(x), !Q))
            if (B(A) !== null) ((Q = !0), Rl || ((Rl = !0), yl()));
            else {
              var j = B(S);
              j !== null && Kl(tt, j.startTime - x);
            }
        }
        var Rl = !1,
          I = -1,
          Al = 5,
          Nl = -1;
        function q() {
          return _ ? !0 : !(m.unstable_now() - Nl < Al);
        }
        function X() {
          if (((_ = !1), Rl)) {
            var x = m.unstable_now();
            Nl = x;
            var j = !0;
            try {
              l: {
                ((Q = !1), ul && ((ul = !1), ol(I), (I = -1)), (W = !0));
                var J = Z;
                try {
                  t: {
                    for (Zl(x), C = B(A); C !== null && !(C.expirationTime > x && q()); ) {
                      var vl = C.callback;
                      if (typeof vl == "function") {
                        ((C.callback = null), (Z = C.priorityLevel));
                        var xl = vl(C.expirationTime <= x);
                        if (((x = m.unstable_now()), typeof xl == "function")) {
                          ((C.callback = xl), Zl(x), (j = !0));
                          break t;
                        }
                        (C === B(A) && d(A), Zl(x));
                      } else d(A);
                      C = B(A);
                    }
                    if (C !== null) j = !0;
                    else {
                      var r = B(S);
                      (r !== null && Kl(tt, r.startTime - x), (j = !1));
                    }
                  }
                  break l;
                } finally {
                  ((C = null), (Z = J), (W = !1));
                }
                j = void 0;
              }
            } finally {
              j ? yl() : (Rl = !1);
            }
          }
        }
        var yl;
        if (typeof rl == "function")
          yl = function () {
            rl(X);
          };
        else if (typeof MessageChannel < "u") {
          var Vl = new MessageChannel(),
            $l = Vl.port2;
          ((Vl.port1.onmessage = X),
            (yl = function () {
              $l.postMessage(null);
            }));
        } else
          yl = function () {
            w(X, 0);
          };
        function Kl(x, j) {
          I = w(function () {
            x(m.unstable_now());
          }, j);
        }
        ((m.unstable_IdlePriority = 5),
          (m.unstable_ImmediatePriority = 1),
          (m.unstable_LowPriority = 4),
          (m.unstable_NormalPriority = 3),
          (m.unstable_Profiling = null),
          (m.unstable_UserBlockingPriority = 2),
          (m.unstable_cancelCallback = function (x) {
            x.callback = null;
          }),
          (m.unstable_forceFrameRate = function (x) {
            0 > x || 125 < x
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Al = 0 < x ? Math.floor(1e3 / x) : 5);
          }),
          (m.unstable_getCurrentPriorityLevel = function () {
            return Z;
          }),
          (m.unstable_next = function (x) {
            switch (Z) {
              case 1:
              case 2:
              case 3:
                var j = 3;
                break;
              default:
                j = Z;
            }
            var J = Z;
            Z = j;
            try {
              return x();
            } finally {
              Z = J;
            }
          }),
          (m.unstable_requestPaint = function () {
            _ = !0;
          }),
          (m.unstable_runWithPriority = function (x, j) {
            switch (x) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                x = 3;
            }
            var J = Z;
            Z = x;
            try {
              return j();
            } finally {
              Z = J;
            }
          }),
          (m.unstable_scheduleCallback = function (x, j, J) {
            var vl = m.unstable_now();
            switch (
              (typeof J == "object" && J !== null
                ? ((J = J.delay), (J = typeof J == "number" && 0 < J ? vl + J : vl))
                : (J = vl),
              x)
            ) {
              case 1:
                var xl = -1;
                break;
              case 2:
                xl = 250;
                break;
              case 5:
                xl = 1073741823;
                break;
              case 4:
                xl = 1e4;
                break;
              default:
                xl = 5e3;
            }
            return (
              (xl = J + xl),
              (x = {
                id: Y++,
                callback: j,
                priorityLevel: x,
                startTime: J,
                expirationTime: xl,
                sortIndex: -1,
              }),
              J > vl
                ? ((x.sortIndex = J),
                  M(S, x),
                  B(A) === null &&
                    x === B(S) &&
                    (ul ? (ol(I), (I = -1)) : (ul = !0), Kl(tt, J - vl)))
                : ((x.sortIndex = xl), M(A, x), Q || W || ((Q = !0), Rl || ((Rl = !0), yl()))),
              x
            );
          }),
          (m.unstable_shouldYield = q),
          (m.unstable_wrapCallback = function (x) {
            var j = Z;
            return function () {
              var J = Z;
              Z = j;
              try {
                return x.apply(this, arguments);
              } finally {
                Z = J;
              }
            };
          }));
      })(yf)),
    yf
  );
}
var jd;
function s0() {
  return (jd || ((jd = 1), (gf.exports = f0())), gf.exports);
}
var vf = { exports: {} },
  Il = {};
var Md;
function o0() {
  if (Md) return Il;
  Md = 1;
  var m = Sf();
  function M(A) {
    var S = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Y = 2; Y < arguments.length; Y++) S += "&args[]=" + encodeURIComponent(arguments[Y]);
    }
    return (
      "Minified React error #" +
      A +
      "; visit " +
      S +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function B() {}
  var d = {
      d: {
        f: B,
        r: function () {
          throw Error(M(522));
        },
        D: B,
        C: B,
        L: B,
        m: B,
        X: B,
        S: B,
        M: B,
      },
      p: 0,
      findDOMNode: null,
    },
    U = Symbol.for("react.portal");
  function G(A, S, Y) {
    var C = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: U,
      key: C == null ? null : "" + C,
      children: A,
      containerInfo: S,
      implementation: Y,
    };
  }
  var O = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function K(A, S) {
    if (A === "font") return "";
    if (typeof S == "string") return S === "use-credentials" ? S : "";
  }
  return (
    (Il.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = d),
    (Il.createPortal = function (A, S) {
      var Y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!S || (S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)) throw Error(M(299));
      return G(A, S, null, Y);
    }),
    (Il.flushSync = function (A) {
      var S = O.T,
        Y = d.p;
      try {
        if (((O.T = null), (d.p = 2), A)) return A();
      } finally {
        ((O.T = S), (d.p = Y), d.d.f());
      }
    }),
    (Il.preconnect = function (A, S) {
      typeof A == "string" &&
        (S
          ? ((S = S.crossOrigin),
            (S = typeof S == "string" ? (S === "use-credentials" ? S : "") : void 0))
          : (S = null),
        d.d.C(A, S));
    }),
    (Il.prefetchDNS = function (A) {
      typeof A == "string" && d.d.D(A);
    }),
    (Il.preinit = function (A, S) {
      if (typeof A == "string" && S && typeof S.as == "string") {
        var Y = S.as,
          C = K(Y, S.crossOrigin),
          Z = typeof S.integrity == "string" ? S.integrity : void 0,
          W = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
        Y === "style"
          ? d.d.S(A, typeof S.precedence == "string" ? S.precedence : void 0, {
              crossOrigin: C,
              integrity: Z,
              fetchPriority: W,
            })
          : Y === "script" &&
            d.d.X(A, {
              crossOrigin: C,
              integrity: Z,
              fetchPriority: W,
              nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            });
      }
    }),
    (Il.preinitModule = function (A, S) {
      if (typeof A == "string")
        if (typeof S == "object" && S !== null) {
          if (S.as == null || S.as === "script") {
            var Y = K(S.as, S.crossOrigin);
            d.d.M(A, {
              crossOrigin: Y,
              integrity: typeof S.integrity == "string" ? S.integrity : void 0,
              nonce: typeof S.nonce == "string" ? S.nonce : void 0,
            });
          }
        } else S == null && d.d.M(A);
    }),
    (Il.preload = function (A, S) {
      if (typeof A == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
        var Y = S.as,
          C = K(Y, S.crossOrigin);
        d.d.L(A, Y, {
          crossOrigin: C,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          nonce: typeof S.nonce == "string" ? S.nonce : void 0,
          type: typeof S.type == "string" ? S.type : void 0,
          fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
          referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
          imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
          imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
          media: typeof S.media == "string" ? S.media : void 0,
        });
      }
    }),
    (Il.preloadModule = function (A, S) {
      if (typeof A == "string")
        if (S) {
          var Y = K(S.as, S.crossOrigin);
          d.d.m(A, {
            as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
            crossOrigin: Y,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
          });
        } else d.d.m(A);
    }),
    (Il.requestFormReset = function (A) {
      d.d.r(A);
    }),
    (Il.unstable_batchedUpdates = function (A, S) {
      return A(S);
    }),
    (Il.useFormState = function (A, S, Y) {
      return O.H.useFormState(A, S, Y);
    }),
    (Il.useFormStatus = function () {
      return O.H.useHostTransitionStatus();
    }),
    (Il.version = "19.2.5"),
    Il
  );
}
var Od;
function r0() {
  if (Od) return vf.exports;
  Od = 1;
  function m() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(m);
      } catch (M) {
        console.error(M);
      }
  }
  return (m(), (vf.exports = o0()), vf.exports);
}
var Cd;
function d0() {
  if (Cd) return _n;
  Cd = 1;
  var m = s0(),
    M = Sf(),
    B = r0();
  function d(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++) t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return (
      "Minified React error #" +
      l +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function U(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function G(l) {
    var t = l,
      e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do ((t = l), (t.flags & 4098) !== 0 && (e = t.return), (l = t.return));
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function O(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if ((t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function K(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if ((t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)), t !== null))
        return t.dehydrated;
    }
    return null;
  }
  function A(l) {
    if (G(l) !== l) throw Error(d(188));
  }
  function S(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = G(l)), t === null)) throw Error(d(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (((a = n.return), a !== null)) {
          e = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return (A(n), l);
          if (u === a) return (A(n), t);
          u = u.sibling;
        }
        throw Error(d(188));
      }
      if (e.return !== a.return) ((e = n), (a = u));
      else {
        for (var i = !1, c = n.child; c; ) {
          if (c === e) {
            ((i = !0), (e = n), (a = u));
            break;
          }
          if (c === a) {
            ((i = !0), (a = n), (e = u));
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = u.child; c; ) {
            if (c === e) {
              ((i = !0), (e = u), (a = n));
              break;
            }
            if (c === a) {
              ((i = !0), (a = u), (e = n));
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(d(189));
        }
      }
      if (e.alternate !== a) throw Error(d(190));
    }
    if (e.tag !== 3) throw Error(d(188));
    return e.stateNode.current === e ? l : t;
  }
  function Y(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (((t = Y(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  var C = Object.assign,
    Z = Symbol.for("react.element"),
    W = Symbol.for("react.transitional.element"),
    Q = Symbol.for("react.portal"),
    ul = Symbol.for("react.fragment"),
    _ = Symbol.for("react.strict_mode"),
    w = Symbol.for("react.profiler"),
    ol = Symbol.for("react.consumer"),
    rl = Symbol.for("react.context"),
    Zl = Symbol.for("react.forward_ref"),
    tt = Symbol.for("react.suspense"),
    Rl = Symbol.for("react.suspense_list"),
    I = Symbol.for("react.memo"),
    Al = Symbol.for("react.lazy"),
    Nl = Symbol.for("react.activity"),
    q = Symbol.for("react.memo_cache_sentinel"),
    X = Symbol.iterator;
  function yl(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (X && l[X]) || l["@@iterator"]), typeof l == "function" ? l : null);
  }
  var Vl = Symbol.for("react.client.reference");
  function $l(l) {
    if (l == null) return null;
    if (typeof l == "function") return l.$$typeof === Vl ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case ul:
        return "Fragment";
      case w:
        return "Profiler";
      case _:
        return "StrictMode";
      case tt:
        return "Suspense";
      case Rl:
        return "SuspenseList";
      case Nl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Q:
          return "Portal";
        case rl:
          return l.displayName || "Context";
        case ol:
          return (l._context.displayName || "Context") + ".Consumer";
        case Zl:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case I:
          return ((t = l.displayName || null), t !== null ? t : $l(l.type) || "Memo");
        case Al:
          ((t = l._payload), (l = l._init));
          try {
            return $l(l(t));
          } catch {}
      }
    return null;
  }
  var Kl = Array.isArray,
    x = M.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    j = B.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = { pending: !1, data: null, method: null, action: null },
    vl = [],
    xl = -1;
  function r(l) {
    return { current: l };
  }
  function E(l) {
    0 > xl || ((l.current = vl[xl]), (vl[xl] = null), xl--);
  }
  function D(l, t) {
    (xl++, (vl[xl] = l.current), (l.current = t));
  }
  var N = r(null),
    F = r(null),
    ll = r(null),
    hl = r(null);
  function Pl(l, t) {
    switch ((D(ll, t), D(F, l), D(N, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Kr(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI))) ((t = Kr(t)), (l = Jr(t, l)));
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    (E(N), D(N, l));
  }
  function Cl() {
    (E(N), E(F), E(ll));
  }
  function Ca(l) {
    l.memoizedState !== null && D(hl, l);
    var t = N.current,
      e = Jr(t, l.type);
    t !== e && (D(F, l), D(N, e));
  }
  function On(l) {
    (F.current === l && (E(N), E(F)), hl.current === l && (E(hl), (bn._currentValue = J)));
  }
  var wu, bf;
  function _e(l) {
    if (wu === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        ((wu = (t && t[1]) || ""),
          (bf =
            -1 <
            e.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < e.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      wu +
      l +
      bf
    );
  }
  var Wu = !1;
  function ku(l, t) {
    if (!l || Wu) return "";
    Wu = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var z = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(z.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(z, []);
                } catch (p) {
                  var v = p;
                }
                Reflect.construct(l, [], z);
              } else {
                try {
                  z.call();
                } catch (p) {
                  v = p;
                }
                l.call(z.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (p) {
                v = p;
              }
              (z = l()) && typeof z.catch == "function" && z.catch(function () {});
            }
          } catch (p) {
            if (p && v && typeof p.stack == "string") return [p.stack, v.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var u = a.DetermineComponentFrameRoot(),
        i = u[0],
        c = u[1];
      if (i && c) {
        var f = i.split(`
`),
          y = c.split(`
`);
        for (n = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot"); ) a++;
        for (; n < y.length && !y[n].includes("DetermineComponentFrameRoot"); ) n++;
        if (a === f.length || n === y.length)
          for (a = f.length - 1, n = y.length - 1; 1 <= a && 0 <= n && f[a] !== y[n]; ) n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (f[a] !== y[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || f[a] !== y[n])) {
                  var b =
                    `
` + f[a].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      b.includes("<anonymous>") &&
                      (b = b.replace("<anonymous>", l.displayName)),
                    b
                  );
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ((Wu = !1), (Error.prepareStackTrace = e));
    }
    return (e = l ? l.displayName || l.name : "") ? _e(e) : "";
  }
  function Bd(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return _e(l.type);
      case 16:
        return _e("Lazy");
      case 13:
        return l.child !== t && t !== null ? _e("Suspense Fallback") : _e("Suspense");
      case 19:
        return _e("SuspenseList");
      case 0:
      case 15:
        return ku(l.type, !1);
      case 11:
        return ku(l.type.render, !1);
      case 1:
        return ku(l.type, !0);
      case 31:
        return _e("Activity");
      default:
        return "";
    }
  }
  function xf(l) {
    try {
      var t = "",
        e = null;
      do ((t += Bd(l, e)), (e = l), (l = l.return));
      while (l);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var Fu = Object.prototype.hasOwnProperty,
    $u = m.unstable_scheduleCallback,
    Iu = m.unstable_cancelCallback,
    qd = m.unstable_shouldYield,
    Yd = m.unstable_requestPaint,
    st = m.unstable_now,
    Gd = m.unstable_getCurrentPriorityLevel,
    Tf = m.unstable_ImmediatePriority,
    zf = m.unstable_UserBlockingPriority,
    Cn = m.unstable_NormalPriority,
    Ld = m.unstable_LowPriority,
    Ef = m.unstable_IdlePriority,
    Xd = m.log,
    Qd = m.unstable_setDisableYieldValue,
    Da = null,
    ot = null;
  function le(l) {
    if ((typeof Xd == "function" && Qd(l), ot && typeof ot.setStrictMode == "function"))
      try {
        ot.setStrictMode(Da, l);
      } catch {}
  }
  var rt = Math.clz32 ? Math.clz32 : Kd,
    Zd = Math.log,
    Vd = Math.LN2;
  function Kd(l) {
    return ((l >>>= 0), l === 0 ? 32 : (31 - ((Zd(l) / Vd) | 0)) | 0);
  }
  var Dn = 256,
    Un = 262144,
    Rn = 4194304;
  function Ae(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Nn(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var n = 0,
      u = l.suspendedLanes,
      i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return (
      c !== 0
        ? ((a = c & ~u),
          a !== 0
            ? (n = Ae(a))
            : ((i &= c), i !== 0 ? (n = Ae(i)) : e || ((e = c & ~l), e !== 0 && (n = Ae(e)))))
        : ((c = a & ~u),
          c !== 0
            ? (n = Ae(c))
            : i !== 0
              ? (n = Ae(i))
              : e || ((e = a & ~l), e !== 0 && (n = Ae(e)))),
      n === 0
        ? 0
        : t !== 0 &&
            t !== n &&
            (t & u) === 0 &&
            ((u = n & -n), (e = t & -t), u >= e || (u === 32 && (e & 4194048) !== 0))
          ? t
          : n
    );
  }
  function Ua(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Jd(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function _f() {
    var l = Rn;
    return ((Rn <<= 1), (Rn & 62914560) === 0 && (Rn = 4194304), l);
  }
  function Pu(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function Ra(l, t) {
    ((l.pendingLanes |= t),
      t !== 268435456 && ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0)));
  }
  function wd(l, t, e, a, n, u) {
    var i = l.pendingLanes;
    ((l.pendingLanes = e),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= e),
      (l.entangledLanes &= e),
      (l.errorRecoveryDisabledLanes &= e),
      (l.shellSuspendCounter = 0));
    var c = l.entanglements,
      f = l.expirationTimes,
      y = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var b = 31 - rt(e),
        z = 1 << b;
      ((c[b] = 0), (f[b] = -1));
      var v = y[b];
      if (v !== null)
        for (y[b] = null, b = 0; b < v.length; b++) {
          var p = v[b];
          p !== null && (p.lane &= -536870913);
        }
      e &= ~z;
    }
    (a !== 0 && Af(l, a, 0),
      u !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= u & ~(i & ~t)));
  }
  function Af(l, t, e) {
    ((l.pendingLanes |= t), (l.suspendedLanes &= ~t));
    var a = 31 - rt(t);
    ((l.entangledLanes |= t),
      (l.entanglements[a] = l.entanglements[a] | 1073741824 | (e & 261930)));
  }
  function jf(l, t) {
    var e = (l.entangledLanes |= t);
    for (l = l.entanglements; e; ) {
      var a = 31 - rt(e),
        n = 1 << a;
      ((n & t) | (l[a] & t) && (l[a] |= t), (e &= ~n));
    }
  }
  function Mf(l, t) {
    var e = t & -t;
    return ((e = (e & 42) !== 0 ? 1 : li(e)), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e);
  }
  function li(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function ti(l) {
    return ((l &= -l), 2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2);
  }
  function Of() {
    var l = j.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : gd(l.type));
  }
  function Cf(l, t) {
    var e = j.p;
    try {
      return ((j.p = l), t());
    } finally {
      j.p = e;
    }
  }
  var te = Math.random().toString(36).slice(2),
    Jl = "__reactFiber$" + te,
    et = "__reactProps$" + te,
    Ve = "__reactContainer$" + te,
    ei = "__reactEvents$" + te,
    Wd = "__reactListeners$" + te,
    kd = "__reactHandles$" + te,
    Df = "__reactResources$" + te,
    Na = "__reactMarker$" + te;
  function ai(l) {
    (delete l[Jl], delete l[et], delete l[ei], delete l[Wd], delete l[kd]);
  }
  function Ke(l) {
    var t = l[Jl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if ((t = e[Ve] || e[Jl])) {
        if (((e = t.alternate), t.child !== null || (e !== null && e.child !== null)))
          for (l = Pr(l); l !== null; ) {
            if ((e = l[Jl])) return e;
            l = Pr(l);
          }
        return t;
      }
      ((l = e), (e = l.parentNode));
    }
    return null;
  }
  function Je(l) {
    if ((l = l[Jl] || l[Ve])) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return l;
    }
    return null;
  }
  function Ha(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(d(33));
  }
  function we(l) {
    var t = l[Df];
    return (t || (t = l[Df] = { hoistableStyles: new Map(), hoistableScripts: new Map() }), t);
  }
  function Xl(l) {
    l[Na] = !0;
  }
  var Uf = new Set(),
    Rf = {};
  function je(l, t) {
    (We(l, t), We(l + "Capture", t));
  }
  function We(l, t) {
    for (Rf[l] = t, l = 0; l < t.length; l++) Uf.add(t[l]);
  }
  var Fd = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    Nf = {},
    Hf = {};
  function $d(l) {
    return Fu.call(Hf, l)
      ? !0
      : Fu.call(Nf, l)
        ? !1
        : Fd.test(l)
          ? (Hf[l] = !0)
          : ((Nf[l] = !0), !1);
  }
  function Hn(l, t, e) {
    if ($d(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + e);
      }
  }
  function Bn(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function Bt(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  function St(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Bf(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Id(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (
      !l.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var n = a.get,
        u = a.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (i) {
            ((e = "" + i), u.call(this, i));
          },
        }),
        Object.defineProperty(l, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return e;
          },
          setValue: function (i) {
            e = "" + i;
          },
          stopTracking: function () {
            ((l._valueTracker = null), delete l[t]);
          },
        }
      );
    }
  }
  function ni(l) {
    if (!l._valueTracker) {
      var t = Bf(l) ? "checked" : "value";
      l._valueTracker = Id(l, t, "" + l[t]);
    }
  }
  function qf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(),
      a = "";
    return (
      l && (a = Bf(l) ? (l.checked ? "true" : "false") : l.value),
      (l = a),
      l !== e ? (t.setValue(l), !0) : !1
    );
  }
  function qn(l) {
    if (((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")) return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Pd = /[\n"\\]/g;
  function bt(l) {
    return l.replace(Pd, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function ui(l, t, e, a, n, u, i, c) {
    ((l.name = ""),
      i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean"
        ? (l.type = i)
        : l.removeAttribute("type"),
      t != null
        ? i === "number"
          ? ((t === 0 && l.value === "") || l.value != t) && (l.value = "" + St(t))
          : l.value !== "" + St(t) && (l.value = "" + St(t))
        : (i !== "submit" && i !== "reset") || l.removeAttribute("value"),
      t != null
        ? ii(l, i, St(t))
        : e != null
          ? ii(l, i, St(e))
          : a != null && l.removeAttribute("value"),
      n == null && u != null && (l.defaultChecked = !!u),
      n != null && (l.checked = n && typeof n != "function" && typeof n != "symbol"),
      c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean"
        ? (l.name = "" + St(c))
        : l.removeAttribute("name"));
  }
  function Yf(l, t, e, a, n, u, i, c) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (l.type = u),
      t != null || e != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || t != null)) {
        ni(l);
        return;
      }
      ((e = e != null ? "" + St(e) : ""),
        (t = t != null ? "" + St(t) : e),
        c || t === l.value || (l.value = t),
        (l.defaultValue = t));
    }
    ((a = a ?? n),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (l.checked = c ? l.checked : !!a),
      (l.defaultChecked = !!a),
      i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean" &&
        (l.name = i),
      ni(l));
  }
  function ii(l, t, e) {
    (t === "number" && qn(l.ownerDocument) === l) ||
      l.defaultValue === "" + e ||
      (l.defaultValue = "" + e);
  }
  function ke(l, t, e, a) {
    if (((l = l.options), t)) {
      t = {};
      for (var n = 0; n < e.length; n++) t["$" + e[n]] = !0;
      for (e = 0; e < l.length; e++)
        ((n = t.hasOwnProperty("$" + l[e].value)),
          l[e].selected !== n && (l[e].selected = n),
          n && a && (l[e].defaultSelected = !0));
    } else {
      for (e = "" + St(e), t = null, n = 0; n < l.length; n++) {
        if (l[n].value === e) {
          ((l[n].selected = !0), a && (l[n].defaultSelected = !0));
          return;
        }
        t !== null || l[n].disabled || (t = l[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Gf(l, t, e) {
    if (t != null && ((t = "" + St(t)), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + St(e) : "";
  }
  function Lf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(d(92));
        if (Kl(a)) {
          if (1 < a.length) throw Error(d(93));
          a = a[0];
        }
        e = a;
      }
      (e == null && (e = ""), (t = e));
    }
    ((e = St(t)),
      (l.defaultValue = e),
      (a = l.textContent),
      a === e && a !== "" && a !== null && (l.value = a),
      ni(l));
  }
  function Fe(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var lh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function Xf(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === ""
      ? a
        ? l.setProperty(t, "")
        : t === "float"
          ? (l.cssFloat = "")
          : (l[t] = "")
      : a
        ? l.setProperty(t, e)
        : typeof e != "number" || e === 0 || lh.has(t)
          ? t === "float"
            ? (l.cssFloat = e)
            : (l[t] = ("" + e).trim())
          : (l[t] = e + "px");
  }
  function Qf(l, t, e) {
    if (t != null && typeof t != "object") throw Error(d(62));
    if (((l = l.style), e != null)) {
      for (var a in e)
        !e.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? l.setProperty(a, "")
            : a === "float"
              ? (l.cssFloat = "")
              : (l[a] = ""));
      for (var n in t) ((a = t[n]), t.hasOwnProperty(n) && e[n] !== a && Xf(l, n, a));
    } else for (var u in t) t.hasOwnProperty(u) && Xf(l, u, t[u]);
  }
  function ci(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var th = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    eh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Yn(l) {
    return eh.test("" + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  function qt() {}
  var fi = null;
  function si(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var $e = null,
    Ie = null;
  function Zf(l) {
    var t = Je(l);
    if (t && (l = t.stateNode)) {
      var e = l[et] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case "input":
          if (
            (ui(
              l,
              e.value,
              e.defaultValue,
              e.defaultValue,
              e.checked,
              e.defaultChecked,
              e.type,
              e.name,
            ),
            (t = e.name),
            e.type === "radio" && t != null)
          ) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (
              e = e.querySelectorAll('input[name="' + bt("" + t) + '"][type="radio"]'), t = 0;
              t < e.length;
              t++
            ) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var n = a[et] || null;
                if (!n) throw Error(d(90));
                ui(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name,
                );
              }
            }
            for (t = 0; t < e.length; t++) ((a = e[t]), a.form === l.form && qf(a));
          }
          break l;
        case "textarea":
          Gf(l, e.value, e.defaultValue);
          break l;
        case "select":
          ((t = e.value), t != null && ke(l, !!e.multiple, t, !1));
      }
    }
  }
  var oi = !1;
  function Vf(l, t, e) {
    if (oi) return l(t, e);
    oi = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (
        ((oi = !1),
        ($e !== null || Ie !== null) &&
          (_u(), $e && ((t = $e), (l = Ie), (Ie = $e = null), Zf(t), l)))
      )
        for (t = 0; t < l.length; t++) Zf(l[t]);
    }
  }
  function Ba(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[et] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((l = l.type),
          (a = !(l === "button" || l === "input" || l === "select" || l === "textarea"))),
          (l = !a));
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function") throw Error(d(231, t, typeof e));
    return e;
  }
  var Yt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    ri = !1;
  if (Yt)
    try {
      var qa = {};
      (Object.defineProperty(qa, "passive", {
        get: function () {
          ri = !0;
        },
      }),
        window.addEventListener("test", qa, qa),
        window.removeEventListener("test", qa, qa));
    } catch {
      ri = !1;
    }
  var ee = null,
    di = null,
    Gn = null;
  function Kf() {
    if (Gn) return Gn;
    var l,
      t = di,
      e = t.length,
      a,
      n = "value" in ee ? ee.value : ee.textContent,
      u = n.length;
    for (l = 0; l < e && t[l] === n[l]; l++);
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === n[u - a]; a++);
    return (Gn = n.slice(l, 1 < a ? 1 - a : void 0));
  }
  function Ln(l) {
    var t = l.keyCode;
    return (
      "charCode" in l ? ((l = l.charCode), l === 0 && t === 13 && (l = 13)) : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function Xn() {
    return !0;
  }
  function Jf() {
    return !1;
  }
  function at(l) {
    function t(e, a, n, u, i) {
      ((this._reactName = e),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = u),
        (this.target = i),
        (this.currentTarget = null));
      for (var c in l) l.hasOwnProperty(c) && ((e = l[c]), (this[c] = e ? e(u) : u[c]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? Xn
          : Jf),
        (this.isPropagationStopped = Jf),
        this
      );
    }
    return (
      C(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : typeof e.returnValue != "unknown" && (e.returnValue = !1),
            (this.isDefaultPrevented = Xn));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0),
            (this.isPropagationStopped = Xn));
        },
        persist: function () {},
        isPersistent: Xn,
      }),
      t
    );
  }
  var Me = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Qn = at(Me),
    Ya = C({}, Me, { view: 0, detail: 0 }),
    ah = at(Ya),
    hi,
    mi,
    Ga,
    Zn = C({}, Ya, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: yi,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return "movementX" in l
          ? l.movementX
          : (l !== Ga &&
              (Ga && l.type === "mousemove"
                ? ((hi = l.screenX - Ga.screenX), (mi = l.screenY - Ga.screenY))
                : (mi = hi = 0),
              (Ga = l)),
            hi);
      },
      movementY: function (l) {
        return "movementY" in l ? l.movementY : mi;
      },
    }),
    wf = at(Zn),
    nh = C({}, Zn, { dataTransfer: 0 }),
    uh = at(nh),
    ih = C({}, Ya, { relatedTarget: 0 }),
    gi = at(ih),
    ch = C({}, Me, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    fh = at(ch),
    sh = C({}, Me, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    oh = at(sh),
    rh = C({}, Me, { data: 0 }),
    Wf = at(rh),
    dh = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    hh = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    mh = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function gh(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = mh[l]) ? !!t[l] : !1;
  }
  function yi() {
    return gh;
  }
  var yh = C({}, Ya, {
      key: function (l) {
        if (l.key) {
          var t = dh[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = Ln(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
            ? hh[l.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: yi,
      charCode: function (l) {
        return l.type === "keypress" ? Ln(l) : 0;
      },
      keyCode: function (l) {
        return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === "keypress"
          ? Ln(l)
          : l.type === "keydown" || l.type === "keyup"
            ? l.keyCode
            : 0;
      },
    }),
    vh = at(yh),
    ph = C({}, Zn, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    kf = at(ph),
    Sh = C({}, Ya, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: yi,
    }),
    bh = at(Sh),
    xh = C({}, Me, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Th = at(xh),
    zh = C({}, Zn, {
      deltaX: function (l) {
        return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
      },
      deltaY: function (l) {
        return "deltaY" in l
          ? l.deltaY
          : "wheelDeltaY" in l
            ? -l.wheelDeltaY
            : "wheelDelta" in l
              ? -l.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Eh = at(zh),
    _h = C({}, Me, { newState: 0, oldState: 0 }),
    Ah = at(_h),
    jh = [9, 13, 27, 32],
    vi = Yt && "CompositionEvent" in window,
    La = null;
  Yt && "documentMode" in document && (La = document.documentMode);
  var Mh = Yt && "TextEvent" in window && !La,
    Ff = Yt && (!vi || (La && 8 < La && 11 >= La)),
    $f = " ",
    If = !1;
  function Pf(l, t) {
    switch (l) {
      case "keyup":
        return jh.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ls(l) {
    return ((l = l.detail), typeof l == "object" && "data" in l ? l.data : null);
  }
  var Pe = !1;
  function Oh(l, t) {
    switch (l) {
      case "compositionend":
        return ls(t);
      case "keypress":
        return t.which !== 32 ? null : ((If = !0), $f);
      case "textInput":
        return ((l = t.data), l === $f && If ? null : l);
      default:
        return null;
    }
  }
  function Ch(l, t) {
    if (Pe)
      return l === "compositionend" || (!vi && Pf(l, t))
        ? ((l = Kf()), (Gn = di = ee = null), (Pe = !1), l)
        : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Ff && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Dh = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function ts(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Dh[l.type] : t === "textarea";
  }
  function es(l, t, e, a) {
    ($e ? (Ie ? Ie.push(a) : (Ie = [a])) : ($e = a),
      (t = Uu(t, "onChange")),
      0 < t.length &&
        ((e = new Qn("onChange", "change", null, e, a)), l.push({ event: e, listeners: t })));
  }
  var Xa = null,
    Qa = null;
  function Uh(l) {
    Gr(l, 0);
  }
  function Vn(l) {
    var t = Ha(l);
    if (qf(t)) return l;
  }
  function as(l, t) {
    if (l === "change") return t;
  }
  var ns = !1;
  if (Yt) {
    var pi;
    if (Yt) {
      var Si = "oninput" in document;
      if (!Si) {
        var us = document.createElement("div");
        (us.setAttribute("oninput", "return;"), (Si = typeof us.oninput == "function"));
      }
      pi = Si;
    } else pi = !1;
    ns = pi && (!document.documentMode || 9 < document.documentMode);
  }
  function is() {
    Xa && (Xa.detachEvent("onpropertychange", cs), (Qa = Xa = null));
  }
  function cs(l) {
    if (l.propertyName === "value" && Vn(Qa)) {
      var t = [];
      (es(t, Qa, l, si(l)), Vf(Uh, t));
    }
  }
  function Rh(l, t, e) {
    l === "focusin"
      ? (is(), (Xa = t), (Qa = e), Xa.attachEvent("onpropertychange", cs))
      : l === "focusout" && is();
  }
  function Nh(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown") return Vn(Qa);
  }
  function Hh(l, t) {
    if (l === "click") return Vn(t);
  }
  function Bh(l, t) {
    if (l === "input" || l === "change") return Vn(t);
  }
  function qh(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var dt = typeof Object.is == "function" ? Object.is : qh;
  function Za(l, t) {
    if (dt(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null) return !1;
    var e = Object.keys(l),
      a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!Fu.call(t, n) || !dt(l[n], t[n])) return !1;
    }
    return !0;
  }
  function fs(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function ss(l, t) {
    var e = fs(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (((a = l + e.textContent.length), l <= t && a >= t)) return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = fs(e);
    }
  }
  function os(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? os(l, t.parentNode)
            : "contains" in l
              ? l.contains(t)
              : l.compareDocumentPosition
                ? !!(l.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function rs(l) {
    l =
      l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = qn(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = qn(l.document);
    }
    return t;
  }
  function bi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (l.type === "text" ||
          l.type === "search" ||
          l.type === "tel" ||
          l.type === "url" ||
          l.type === "password")) ||
        t === "textarea" ||
        l.contentEditable === "true")
    );
  }
  var Yh = Yt && "documentMode" in document && 11 >= document.documentMode,
    la = null,
    xi = null,
    Va = null,
    Ti = !1;
  function ds(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Ti ||
      la == null ||
      la !== qn(a) ||
      ((a = la),
      "selectionStart" in a && bi(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = ((a.ownerDocument && a.ownerDocument.defaultView) || window).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Va && Za(Va, a)) ||
        ((Va = a),
        (a = Uu(xi, "onSelect")),
        0 < a.length &&
          ((t = new Qn("onSelect", "select", null, t, e)),
          l.push({ event: t, listeners: a }),
          (t.target = la))));
  }
  function Oe(l, t) {
    var e = {};
    return (
      (e[l.toLowerCase()] = t.toLowerCase()),
      (e["Webkit" + l] = "webkit" + t),
      (e["Moz" + l] = "moz" + t),
      e
    );
  }
  var ta = {
      animationend: Oe("Animation", "AnimationEnd"),
      animationiteration: Oe("Animation", "AnimationIteration"),
      animationstart: Oe("Animation", "AnimationStart"),
      transitionrun: Oe("Transition", "TransitionRun"),
      transitionstart: Oe("Transition", "TransitionStart"),
      transitioncancel: Oe("Transition", "TransitionCancel"),
      transitionend: Oe("Transition", "TransitionEnd"),
    },
    zi = {},
    hs = {};
  Yt &&
    ((hs = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete ta.animationend.animation,
      delete ta.animationiteration.animation,
      delete ta.animationstart.animation),
    "TransitionEvent" in window || delete ta.transitionend.transition);
  function Ce(l) {
    if (zi[l]) return zi[l];
    if (!ta[l]) return l;
    var t = ta[l],
      e;
    for (e in t) if (t.hasOwnProperty(e) && e in hs) return (zi[l] = t[e]);
    return l;
  }
  var ms = Ce("animationend"),
    gs = Ce("animationiteration"),
    ys = Ce("animationstart"),
    Gh = Ce("transitionrun"),
    Lh = Ce("transitionstart"),
    Xh = Ce("transitioncancel"),
    vs = Ce("transitionend"),
    ps = new Map(),
    Ei =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Ei.push("scrollEnd");
  function Ot(l, t) {
    (ps.set(l, t), je(t, [l]));
  }
  var Kn =
      typeof reportError == "function"
        ? reportError
        : function (l) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof l == "object" && l !== null && typeof l.message == "string"
                    ? String(l.message)
                    : String(l),
                error: l,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
              process.emit("uncaughtException", l);
              return;
            }
            console.error(l);
          },
    xt = [],
    ea = 0,
    _i = 0;
  function Jn() {
    for (var l = ea, t = (_i = ea = 0); t < l; ) {
      var e = xt[t];
      xt[t++] = null;
      var a = xt[t];
      xt[t++] = null;
      var n = xt[t];
      xt[t++] = null;
      var u = xt[t];
      if (((xt[t++] = null), a !== null && n !== null)) {
        var i = a.pending;
        (i === null ? (n.next = n) : ((n.next = i.next), (i.next = n)), (a.pending = n));
      }
      u !== 0 && Ss(e, n, u);
    }
  }
  function wn(l, t, e, a) {
    ((xt[ea++] = l),
      (xt[ea++] = t),
      (xt[ea++] = e),
      (xt[ea++] = a),
      (_i |= a),
      (l.lanes |= a),
      (l = l.alternate),
      l !== null && (l.lanes |= a));
  }
  function Ai(l, t, e, a) {
    return (wn(l, t, e, a), Wn(l));
  }
  function De(l, t) {
    return (wn(l, null, null, t), Wn(l));
  }
  function Ss(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = l.return; u !== null; )
      ((u.childLanes |= e),
        (a = u.alternate),
        a !== null && (a.childLanes |= e),
        u.tag === 22 && ((l = u.stateNode), l === null || l._visibility & 1 || (n = !0)),
        (l = u),
        (u = u.return));
    return l.tag === 3
      ? ((u = l.stateNode),
        n &&
          t !== null &&
          ((n = 31 - rt(e)),
          (l = u.hiddenUpdates),
          (a = l[n]),
          a === null ? (l[n] = [t]) : a.push(t),
          (t.lane = e | 536870912)),
        u)
      : null;
  }
  function Wn(l) {
    if (50 < hn) throw ((hn = 0), (Hc = null), Error(d(185)));
    for (var t = l.return; t !== null; ) ((l = t), (t = l.return));
    return l.tag === 3 ? l.stateNode : null;
  }
  var aa = {};
  function Qh(l, t, e, a) {
    ((this.tag = l),
      (this.key = e),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function ht(l, t, e, a) {
    return new Qh(l, t, e, a);
  }
  function ji(l) {
    return ((l = l.prototype), !(!l || !l.isReactComponent));
  }
  function Gt(l, t) {
    var e = l.alternate;
    return (
      e === null
        ? ((e = ht(l.tag, t, l.key, l.mode)),
          (e.elementType = l.elementType),
          (e.type = l.type),
          (e.stateNode = l.stateNode),
          (e.alternate = l),
          (l.alternate = e))
        : ((e.pendingProps = t),
          (e.type = l.type),
          (e.flags = 0),
          (e.subtreeFlags = 0),
          (e.deletions = null)),
      (e.flags = l.flags & 65011712),
      (e.childLanes = l.childLanes),
      (e.lanes = l.lanes),
      (e.child = l.child),
      (e.memoizedProps = l.memoizedProps),
      (e.memoizedState = l.memoizedState),
      (e.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (e.sibling = l.sibling),
      (e.index = l.index),
      (e.ref = l.ref),
      (e.refCleanup = l.refCleanup),
      e
    );
  }
  function bs(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return (
      e === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = e.childLanes),
          (l.lanes = e.lanes),
          (l.child = e.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = e.memoizedProps),
          (l.memoizedState = e.memoizedState),
          (l.updateQueue = e.updateQueue),
          (l.type = e.type),
          (t = e.dependencies),
          (l.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function kn(l, t, e, a, n, u) {
    var i = 0;
    if (((a = l), typeof l == "function")) ji(l) && (i = 1);
    else if (typeof l == "string")
      i = wm(l, e, N.current) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case Nl:
          return ((l = ht(31, e, t, n)), (l.elementType = Nl), (l.lanes = u), l);
        case ul:
          return Ue(e.children, n, u, t);
        case _:
          ((i = 8), (n |= 24));
          break;
        case w:
          return ((l = ht(12, e, t, n | 2)), (l.elementType = w), (l.lanes = u), l);
        case tt:
          return ((l = ht(13, e, t, n)), (l.elementType = tt), (l.lanes = u), l);
        case Rl:
          return ((l = ht(19, e, t, n)), (l.elementType = Rl), (l.lanes = u), l);
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case rl:
                i = 10;
                break l;
              case ol:
                i = 9;
                break l;
              case Zl:
                i = 11;
                break l;
              case I:
                i = 14;
                break l;
              case Al:
                ((i = 16), (a = null));
                break l;
            }
          ((i = 29), (e = Error(d(130, l === null ? "null" : typeof l, ""))), (a = null));
      }
    return ((t = ht(i, e, t, n)), (t.elementType = l), (t.type = a), (t.lanes = u), t);
  }
  function Ue(l, t, e, a) {
    return ((l = ht(7, l, a, t)), (l.lanes = e), l);
  }
  function Mi(l, t, e) {
    return ((l = ht(6, l, null, t)), (l.lanes = e), l);
  }
  function xs(l) {
    var t = ht(18, null, null, 0);
    return ((t.stateNode = l), t);
  }
  function Oi(l, t, e) {
    return (
      (t = ht(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = e),
      (t.stateNode = {
        containerInfo: l.containerInfo,
        pendingChildren: null,
        implementation: l.implementation,
      }),
      t
    );
  }
  var Ts = new WeakMap();
  function Tt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = Ts.get(l);
      return e !== void 0 ? e : ((t = { value: l, source: t, stack: xf(t) }), Ts.set(l, t), t);
    }
    return { value: l, source: t, stack: xf(t) };
  }
  var na = [],
    ua = 0,
    Fn = null,
    Ka = 0,
    zt = [],
    Et = 0,
    ae = null,
    Ut = 1,
    Rt = "";
  function Lt(l, t) {
    ((na[ua++] = Ka), (na[ua++] = Fn), (Fn = l), (Ka = t));
  }
  function zs(l, t, e) {
    ((zt[Et++] = Ut), (zt[Et++] = Rt), (zt[Et++] = ae), (ae = l));
    var a = Ut;
    l = Rt;
    var n = 32 - rt(a) - 1;
    ((a &= ~(1 << n)), (e += 1));
    var u = 32 - rt(t) + n;
    if (30 < u) {
      var i = n - (n % 5);
      ((u = (a & ((1 << i) - 1)).toString(32)),
        (a >>= i),
        (n -= i),
        (Ut = (1 << (32 - rt(t) + n)) | (e << n) | a),
        (Rt = u + l));
    } else ((Ut = (1 << u) | (e << n) | a), (Rt = l));
  }
  function Ci(l) {
    l.return !== null && (Lt(l, 1), zs(l, 1, 0));
  }
  function Di(l) {
    for (; l === Fn; ) ((Fn = na[--ua]), (na[ua] = null), (Ka = na[--ua]), (na[ua] = null));
    for (; l === ae; )
      ((ae = zt[--Et]),
        (zt[Et] = null),
        (Rt = zt[--Et]),
        (zt[Et] = null),
        (Ut = zt[--Et]),
        (zt[Et] = null));
  }
  function Es(l, t) {
    ((zt[Et++] = Ut), (zt[Et++] = Rt), (zt[Et++] = ae), (Ut = t.id), (Rt = t.overflow), (ae = l));
  }
  var wl = null,
    El = null,
    il = !1,
    ne = null,
    _t = !1,
    Ui = Error(d(519));
  function ue(l) {
    var t = Error(
      d(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""),
    );
    throw (Ja(Tt(t, l)), Ui);
  }
  function _s(l) {
    var t = l.stateNode,
      e = l.type,
      a = l.memoizedProps;
    switch (((t[Jl] = l), (t[et] = a), e)) {
      case "dialog":
        (el("cancel", t), el("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        el("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < gn.length; e++) el(gn[e], t);
        break;
      case "source":
        el("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (el("error", t), el("load", t));
        break;
      case "details":
        el("toggle", t);
        break;
      case "input":
        (el("invalid", t),
          Yf(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0));
        break;
      case "select":
        el("invalid", t);
        break;
      case "textarea":
        (el("invalid", t), Lf(t, a.value, a.defaultValue, a.children));
    }
    ((e = a.children),
      (typeof e != "string" && typeof e != "number" && typeof e != "bigint") ||
      t.textContent === "" + e ||
      a.suppressHydrationWarning === !0 ||
      Zr(t.textContent, e)
        ? (a.popover != null && (el("beforetoggle", t), el("toggle", t)),
          a.onScroll != null && el("scroll", t),
          a.onScrollEnd != null && el("scrollend", t),
          a.onClick != null && (t.onclick = qt),
          (t = !0))
        : (t = !1),
      t || ue(l, !0));
  }
  function As(l) {
    for (wl = l.return; wl; )
      switch (wl.tag) {
        case 5:
        case 31:
        case 13:
          _t = !1;
          return;
        case 27:
        case 3:
          _t = !0;
          return;
        default:
          wl = wl.return;
      }
  }
  function ia(l) {
    if (l !== wl) return !1;
    if (!il) return (As(l), (il = !0), !1);
    var t = l.tag,
      e;
    if (
      ((e = t !== 3 && t !== 27) &&
        ((e = t === 5) &&
          ((e = l.type), (e = !(e !== "form" && e !== "button") || Fc(l.type, l.memoizedProps))),
        (e = !e)),
      e && El && ue(l),
      As(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l)) throw Error(d(317));
      El = Ir(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l)) throw Error(d(317));
      El = Ir(l);
    } else
      t === 27
        ? ((t = El), Se(l.type) ? ((l = tf), (tf = null), (El = l)) : (El = t))
        : (El = wl ? jt(l.stateNode.nextSibling) : null);
    return !0;
  }
  function Re() {
    ((El = wl = null), (il = !1));
  }
  function Ri() {
    var l = ne;
    return (l !== null && (ct === null ? (ct = l) : ct.push.apply(ct, l), (ne = null)), l);
  }
  function Ja(l) {
    ne === null ? (ne = [l]) : ne.push(l);
  }
  var Ni = r(null),
    Ne = null,
    Xt = null;
  function ie(l, t, e) {
    (D(Ni, t._currentValue), (t._currentValue = e));
  }
  function Qt(l) {
    ((l._currentValue = Ni.current), E(Ni));
  }
  function Hi(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        l === e)
      )
        break;
      l = l.return;
    }
  }
  function Bi(l, t, e, a) {
    var n = l.child;
    for (n !== null && (n.return = l); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        l: for (; u !== null; ) {
          var c = u;
          u = n;
          for (var f = 0; f < t.length; f++)
            if (c.context === t[f]) {
              ((u.lanes |= e),
                (c = u.alternate),
                c !== null && (c.lanes |= e),
                Hi(u.return, e, l),
                a || (i = null));
              break l;
            }
          u = c.next;
        }
      } else if (n.tag === 18) {
        if (((i = n.return), i === null)) throw Error(d(341));
        ((i.lanes |= e), (u = i.alternate), u !== null && (u.lanes |= e), Hi(i, e, l), (i = null));
      } else i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (((n = i.sibling), n !== null)) {
            ((n.return = i.return), (i = n));
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function ca(l, t, e, a) {
    l = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(d(387));
        if (((i = i.memoizedProps), i !== null)) {
          var c = n.type;
          dt(n.pendingProps.value, i.value) || (l !== null ? l.push(c) : (l = [c]));
        }
      } else if (n === hl.current) {
        if (((i = n.alternate), i === null)) throw Error(d(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (l !== null ? l.push(bn) : (l = [bn]));
      }
      n = n.return;
    }
    (l !== null && Bi(t, l, e, a), (t.flags |= 262144));
  }
  function $n(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!dt(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function He(l) {
    ((Ne = l), (Xt = null), (l = l.dependencies), l !== null && (l.firstContext = null));
  }
  function Wl(l) {
    return js(Ne, l);
  }
  function In(l, t) {
    return (Ne === null && He(l), js(l, t));
  }
  function js(l, t) {
    var e = t._currentValue;
    if (((t = { context: t, memoizedValue: e, next: null }), Xt === null)) {
      if (l === null) throw Error(d(308));
      ((Xt = t), (l.dependencies = { lanes: 0, firstContext: t }), (l.flags |= 524288));
    } else Xt = Xt.next = t;
    return e;
  }
  var Zh =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (e, a) {
                  l.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                l.forEach(function (e) {
                  return e();
                }));
            };
          },
    Vh = m.unstable_scheduleCallback,
    Kh = m.unstable_NormalPriority,
    Hl = {
      $$typeof: rl,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function qi() {
    return { controller: new Zh(), data: new Map(), refCount: 0 };
  }
  function wa(l) {
    (l.refCount--,
      l.refCount === 0 &&
        Vh(Kh, function () {
          l.controller.abort();
        }));
  }
  var Wa = null,
    Yi = 0,
    fa = 0,
    sa = null;
  function Jh(l, t) {
    if (Wa === null) {
      var e = (Wa = []);
      ((Yi = 0),
        (fa = Xc()),
        (sa = {
          status: "pending",
          value: void 0,
          then: function (a) {
            e.push(a);
          },
        }));
    }
    return (Yi++, t.then(Ms, Ms), t);
  }
  function Ms() {
    if (--Yi === 0 && Wa !== null) {
      sa !== null && (sa.status = "fulfilled");
      var l = Wa;
      ((Wa = null), (fa = 0), (sa = null));
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function wh(l, t) {
    var e = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (n) {
          e.push(n);
        },
      };
    return (
      l.then(
        function () {
          ((a.status = "fulfilled"), (a.value = t));
          for (var n = 0; n < e.length; n++) (0, e[n])(t);
        },
        function (n) {
          for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++) (0, e[n])(void 0);
        },
      ),
      a
    );
  }
  var Os = x.S;
  x.S = function (l, t) {
    ((hr = st()),
      typeof t == "object" && t !== null && typeof t.then == "function" && Jh(l, t),
      Os !== null && Os(l, t));
  };
  var Be = r(null);
  function Gi() {
    var l = Be.current;
    return l !== null ? l : Tl.pooledCache;
  }
  function Pn(l, t) {
    t === null ? D(Be, Be.current) : D(Be, t.pool);
  }
  function Cs() {
    var l = Gi();
    return l === null ? null : { parent: Hl._currentValue, pool: l };
  }
  var oa = Error(d(460)),
    Li = Error(d(474)),
    lu = Error(d(542)),
    tu = { then: function () {} };
  function Ds(l) {
    return ((l = l.status), l === "fulfilled" || l === "rejected");
  }
  function Us(l, t, e) {
    switch (
      ((e = l[e]), e === void 0 ? l.push(t) : e !== t && (t.then(qt, qt), (t = e)), t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((l = t.reason), Ns(l), l);
      default:
        if (typeof t.status == "string") t.then(qt, qt);
        else {
          if (((l = Tl), l !== null && 100 < l.shellSuspendCounter)) throw Error(d(482));
          ((l = t),
            (l.status = "pending"),
            l.then(
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  ((n.status = "fulfilled"), (n.value = a));
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  ((n.status = "rejected"), (n.reason = a));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((l = t.reason), Ns(l), l);
        }
        throw ((Ye = t), oa);
    }
  }
  function qe(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? ((Ye = e), oa) : e;
    }
  }
  var Ye = null;
  function Rs() {
    if (Ye === null) throw Error(d(459));
    var l = Ye;
    return ((Ye = null), l);
  }
  function Ns(l) {
    if (l === oa || l === lu) throw Error(d(483));
  }
  var ra = null,
    ka = 0;
  function eu(l) {
    var t = ka;
    return ((ka += 1), ra === null && (ra = []), Us(ra, l, t));
  }
  function Fa(l, t) {
    ((t = t.props.ref), (l.ref = t !== void 0 ? t : null));
  }
  function au(l, t) {
    throw t.$$typeof === Z
      ? Error(d(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          d(
            31,
            l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l,
          ),
        ));
  }
  function Hs(l) {
    function t(h, o) {
      if (l) {
        var g = h.deletions;
        g === null ? ((h.deletions = [o]), (h.flags |= 16)) : g.push(o);
      }
    }
    function e(h, o) {
      if (!l) return null;
      for (; o !== null; ) (t(h, o), (o = o.sibling));
      return null;
    }
    function a(h) {
      for (var o = new Map(); h !== null; )
        (h.key !== null ? o.set(h.key, h) : o.set(h.index, h), (h = h.sibling));
      return o;
    }
    function n(h, o) {
      return ((h = Gt(h, o)), (h.index = 0), (h.sibling = null), h);
    }
    function u(h, o, g) {
      return (
        (h.index = g),
        l
          ? ((g = h.alternate),
            g !== null
              ? ((g = g.index), g < o ? ((h.flags |= 67108866), o) : g)
              : ((h.flags |= 67108866), o))
          : ((h.flags |= 1048576), o)
      );
    }
    function i(h) {
      return (l && h.alternate === null && (h.flags |= 67108866), h);
    }
    function c(h, o, g, T) {
      return o === null || o.tag !== 6
        ? ((o = Mi(g, h.mode, T)), (o.return = h), o)
        : ((o = n(o, g)), (o.return = h), o);
    }
    function f(h, o, g, T) {
      var L = g.type;
      return L === ul
        ? b(h, o, g.props.children, T, g.key)
        : o !== null &&
            (o.elementType === L ||
              (typeof L == "object" && L !== null && L.$$typeof === Al && qe(L) === o.type))
          ? ((o = n(o, g.props)), Fa(o, g), (o.return = h), o)
          : ((o = kn(g.type, g.key, g.props, null, h.mode, T)), Fa(o, g), (o.return = h), o);
    }
    function y(h, o, g, T) {
      return o === null ||
        o.tag !== 4 ||
        o.stateNode.containerInfo !== g.containerInfo ||
        o.stateNode.implementation !== g.implementation
        ? ((o = Oi(g, h.mode, T)), (o.return = h), o)
        : ((o = n(o, g.children || [])), (o.return = h), o);
    }
    function b(h, o, g, T, L) {
      return o === null || o.tag !== 7
        ? ((o = Ue(g, h.mode, T, L)), (o.return = h), o)
        : ((o = n(o, g)), (o.return = h), o);
    }
    function z(h, o, g) {
      if ((typeof o == "string" && o !== "") || typeof o == "number" || typeof o == "bigint")
        return ((o = Mi("" + o, h.mode, g)), (o.return = h), o);
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case W:
            return ((g = kn(o.type, o.key, o.props, null, h.mode, g)), Fa(g, o), (g.return = h), g);
          case Q:
            return ((o = Oi(o, h.mode, g)), (o.return = h), o);
          case Al:
            return ((o = qe(o)), z(h, o, g));
        }
        if (Kl(o) || yl(o)) return ((o = Ue(o, h.mode, g, null)), (o.return = h), o);
        if (typeof o.then == "function") return z(h, eu(o), g);
        if (o.$$typeof === rl) return z(h, In(h, o), g);
        au(h, o);
      }
      return null;
    }
    function v(h, o, g, T) {
      var L = o !== null ? o.key : null;
      if ((typeof g == "string" && g !== "") || typeof g == "number" || typeof g == "bigint")
        return L !== null ? null : c(h, o, "" + g, T);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case W:
            return g.key === L ? f(h, o, g, T) : null;
          case Q:
            return g.key === L ? y(h, o, g, T) : null;
          case Al:
            return ((g = qe(g)), v(h, o, g, T));
        }
        if (Kl(g) || yl(g)) return L !== null ? null : b(h, o, g, T, null);
        if (typeof g.then == "function") return v(h, o, eu(g), T);
        if (g.$$typeof === rl) return v(h, o, In(h, g), T);
        au(h, g);
      }
      return null;
    }
    function p(h, o, g, T, L) {
      if ((typeof T == "string" && T !== "") || typeof T == "number" || typeof T == "bigint")
        return ((h = h.get(g) || null), c(o, h, "" + T, L));
      if (typeof T == "object" && T !== null) {
        switch (T.$$typeof) {
          case W:
            return ((h = h.get(T.key === null ? g : T.key) || null), f(o, h, T, L));
          case Q:
            return ((h = h.get(T.key === null ? g : T.key) || null), y(o, h, T, L));
          case Al:
            return ((T = qe(T)), p(h, o, g, T, L));
        }
        if (Kl(T) || yl(T)) return ((h = h.get(g) || null), b(o, h, T, L, null));
        if (typeof T.then == "function") return p(h, o, g, eu(T), L);
        if (T.$$typeof === rl) return p(h, o, g, In(o, T), L);
        au(o, T);
      }
      return null;
    }
    function R(h, o, g, T) {
      for (
        var L = null, fl = null, H = o, P = (o = 0), nl = null;
        H !== null && P < g.length;
        P++
      ) {
        H.index > P ? ((nl = H), (H = null)) : (nl = H.sibling);
        var sl = v(h, H, g[P], T);
        if (sl === null) {
          H === null && (H = nl);
          break;
        }
        (l && H && sl.alternate === null && t(h, H),
          (o = u(sl, o, P)),
          fl === null ? (L = sl) : (fl.sibling = sl),
          (fl = sl),
          (H = nl));
      }
      if (P === g.length) return (e(h, H), il && Lt(h, P), L);
      if (H === null) {
        for (; P < g.length; P++)
          ((H = z(h, g[P], T)),
            H !== null && ((o = u(H, o, P)), fl === null ? (L = H) : (fl.sibling = H), (fl = H)));
        return (il && Lt(h, P), L);
      }
      for (H = a(H); P < g.length; P++)
        ((nl = p(H, h, P, g[P], T)),
          nl !== null &&
            (l && nl.alternate !== null && H.delete(nl.key === null ? P : nl.key),
            (o = u(nl, o, P)),
            fl === null ? (L = nl) : (fl.sibling = nl),
            (fl = nl)));
      return (
        l &&
          H.forEach(function (Ee) {
            return t(h, Ee);
          }),
        il && Lt(h, P),
        L
      );
    }
    function V(h, o, g, T) {
      if (g == null) throw Error(d(151));
      for (
        var L = null, fl = null, H = o, P = (o = 0), nl = null, sl = g.next();
        H !== null && !sl.done;
        P++, sl = g.next()
      ) {
        H.index > P ? ((nl = H), (H = null)) : (nl = H.sibling);
        var Ee = v(h, H, sl.value, T);
        if (Ee === null) {
          H === null && (H = nl);
          break;
        }
        (l && H && Ee.alternate === null && t(h, H),
          (o = u(Ee, o, P)),
          fl === null ? (L = Ee) : (fl.sibling = Ee),
          (fl = Ee),
          (H = nl));
      }
      if (sl.done) return (e(h, H), il && Lt(h, P), L);
      if (H === null) {
        for (; !sl.done; P++, sl = g.next())
          ((sl = z(h, sl.value, T)),
            sl !== null &&
              ((o = u(sl, o, P)), fl === null ? (L = sl) : (fl.sibling = sl), (fl = sl)));
        return (il && Lt(h, P), L);
      }
      for (H = a(H); !sl.done; P++, sl = g.next())
        ((sl = p(H, h, P, sl.value, T)),
          sl !== null &&
            (l && sl.alternate !== null && H.delete(sl.key === null ? P : sl.key),
            (o = u(sl, o, P)),
            fl === null ? (L = sl) : (fl.sibling = sl),
            (fl = sl)));
      return (
        l &&
          H.forEach(function (n0) {
            return t(h, n0);
          }),
        il && Lt(h, P),
        L
      );
    }
    function bl(h, o, g, T) {
      if (
        (typeof g == "object" &&
          g !== null &&
          g.type === ul &&
          g.key === null &&
          (g = g.props.children),
        typeof g == "object" && g !== null)
      ) {
        switch (g.$$typeof) {
          case W:
            l: {
              for (var L = g.key; o !== null; ) {
                if (o.key === L) {
                  if (((L = g.type), L === ul)) {
                    if (o.tag === 7) {
                      (e(h, o.sibling), (T = n(o, g.props.children)), (T.return = h), (h = T));
                      break l;
                    }
                  } else if (
                    o.elementType === L ||
                    (typeof L == "object" && L !== null && L.$$typeof === Al && qe(L) === o.type)
                  ) {
                    (e(h, o.sibling), (T = n(o, g.props)), Fa(T, g), (T.return = h), (h = T));
                    break l;
                  }
                  e(h, o);
                  break;
                } else t(h, o);
                o = o.sibling;
              }
              g.type === ul
                ? ((T = Ue(g.props.children, h.mode, T, g.key)), (T.return = h), (h = T))
                : ((T = kn(g.type, g.key, g.props, null, h.mode, T)),
                  Fa(T, g),
                  (T.return = h),
                  (h = T));
            }
            return i(h);
          case Q:
            l: {
              for (L = g.key; o !== null; ) {
                if (o.key === L)
                  if (
                    o.tag === 4 &&
                    o.stateNode.containerInfo === g.containerInfo &&
                    o.stateNode.implementation === g.implementation
                  ) {
                    (e(h, o.sibling), (T = n(o, g.children || [])), (T.return = h), (h = T));
                    break l;
                  } else {
                    e(h, o);
                    break;
                  }
                else t(h, o);
                o = o.sibling;
              }
              ((T = Oi(g, h.mode, T)), (T.return = h), (h = T));
            }
            return i(h);
          case Al:
            return ((g = qe(g)), bl(h, o, g, T));
        }
        if (Kl(g)) return R(h, o, g, T);
        if (yl(g)) {
          if (((L = yl(g)), typeof L != "function")) throw Error(d(150));
          return ((g = L.call(g)), V(h, o, g, T));
        }
        if (typeof g.then == "function") return bl(h, o, eu(g), T);
        if (g.$$typeof === rl) return bl(h, o, In(h, g), T);
        au(h, g);
      }
      return (typeof g == "string" && g !== "") || typeof g == "number" || typeof g == "bigint"
        ? ((g = "" + g),
          o !== null && o.tag === 6
            ? (e(h, o.sibling), (T = n(o, g)), (T.return = h), (h = T))
            : (e(h, o), (T = Mi(g, h.mode, T)), (T.return = h), (h = T)),
          i(h))
        : e(h, o);
    }
    return function (h, o, g, T) {
      try {
        ka = 0;
        var L = bl(h, o, g, T);
        return ((ra = null), L);
      } catch (H) {
        if (H === oa || H === lu) throw H;
        var fl = ht(29, H, null, h.mode);
        return ((fl.lanes = T), (fl.return = h), fl);
      }
    };
  }
  var Ge = Hs(!0),
    Bs = Hs(!1),
    ce = !1;
  function Xi(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Qi(l, t) {
    ((l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        }));
  }
  function fe(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function se(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (dl & 2) !== 0)) {
      var n = a.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (a.pending = t),
        (t = Wn(l)),
        Ss(l, null, e),
        t
      );
    }
    return (wn(l, a, t, e), Wn(l));
  }
  function $a(l, t, e) {
    if (((t = t.updateQueue), t !== null && ((t = t.shared), (e & 4194048) !== 0))) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (e |= a), (t.lanes = e), jf(l, e));
    }
  }
  function Zi(l, t) {
    var e = l.updateQueue,
      a = l.alternate;
    if (a !== null && ((a = a.updateQueue), e === a)) {
      var n = null,
        u = null;
      if (((e = e.firstBaseUpdate), e !== null)) {
        do {
          var i = { lane: e.lane, tag: e.tag, payload: e.payload, callback: null, next: null };
          (u === null ? (n = u = i) : (u = u.next = i), (e = e.next));
        } while (e !== null);
        u === null ? (n = u = t) : (u = u.next = t);
      } else n = u = t;
      ((e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (l.updateQueue = e));
      return;
    }
    ((l = e.lastBaseUpdate),
      l === null ? (e.firstBaseUpdate = t) : (l.next = t),
      (e.lastBaseUpdate = t));
  }
  var Vi = !1;
  function Ia() {
    if (Vi) {
      var l = sa;
      if (l !== null) throw l;
    }
  }
  function Pa(l, t, e, a) {
    Vi = !1;
    var n = l.updateQueue;
    ce = !1;
    var u = n.firstBaseUpdate,
      i = n.lastBaseUpdate,
      c = n.shared.pending;
    if (c !== null) {
      n.shared.pending = null;
      var f = c,
        y = f.next;
      ((f.next = null), i === null ? (u = y) : (i.next = y), (i = f));
      var b = l.alternate;
      b !== null &&
        ((b = b.updateQueue),
        (c = b.lastBaseUpdate),
        c !== i && (c === null ? (b.firstBaseUpdate = y) : (c.next = y), (b.lastBaseUpdate = f)));
    }
    if (u !== null) {
      var z = n.baseState;
      ((i = 0), (b = y = f = null), (c = u));
      do {
        var v = c.lane & -536870913,
          p = v !== c.lane;
        if (p ? (al & v) === v : (a & v) === v) {
          (v !== 0 && v === fa && (Vi = !0),
            b !== null &&
              (b = b.next =
                { lane: 0, tag: c.tag, payload: c.payload, callback: null, next: null }));
          l: {
            var R = l,
              V = c;
            v = t;
            var bl = e;
            switch (V.tag) {
              case 1:
                if (((R = V.payload), typeof R == "function")) {
                  z = R.call(bl, z, v);
                  break l;
                }
                z = R;
                break l;
              case 3:
                R.flags = (R.flags & -65537) | 128;
              case 0:
                if (
                  ((R = V.payload), (v = typeof R == "function" ? R.call(bl, z, v) : R), v == null)
                )
                  break l;
                z = C({}, z, v);
                break l;
              case 2:
                ce = !0;
            }
          }
          ((v = c.callback),
            v !== null &&
              ((l.flags |= 64),
              p && (l.flags |= 8192),
              (p = n.callbacks),
              p === null ? (n.callbacks = [v]) : p.push(v)));
        } else
          ((p = { lane: v, tag: c.tag, payload: c.payload, callback: c.callback, next: null }),
            b === null ? ((y = b = p), (f = z)) : (b = b.next = p),
            (i |= v));
        if (((c = c.next), c === null)) {
          if (((c = n.shared.pending), c === null)) break;
          ((p = c),
            (c = p.next),
            (p.next = null),
            (n.lastBaseUpdate = p),
            (n.shared.pending = null));
        }
      } while (!0);
      (b === null && (f = z),
        (n.baseState = f),
        (n.firstBaseUpdate = y),
        (n.lastBaseUpdate = b),
        u === null && (n.shared.lanes = 0),
        (me |= i),
        (l.lanes = i),
        (l.memoizedState = z));
    }
  }
  function qs(l, t) {
    if (typeof l != "function") throw Error(d(191, l));
    l.call(t);
  }
  function Ys(l, t) {
    var e = l.callbacks;
    if (e !== null) for (l.callbacks = null, l = 0; l < e.length; l++) qs(e[l], t);
  }
  var da = r(null),
    nu = r(0);
  function Gs(l, t) {
    ((l = $t), D(nu, l), D(da, t), ($t = l | t.baseLanes));
  }
  function Ki() {
    (D(nu, $t), D(da, da.current));
  }
  function Ji() {
    (($t = nu.current), E(da), E(nu));
  }
  var mt = r(null),
    At = null;
  function oe(l) {
    var t = l.alternate;
    (D(Dl, Dl.current & 1),
      D(mt, l),
      At === null && (t === null || da.current !== null || t.memoizedState !== null) && (At = l));
  }
  function wi(l) {
    (D(Dl, Dl.current), D(mt, l), At === null && (At = l));
  }
  function Ls(l) {
    l.tag === 22 ? (D(Dl, Dl.current), D(mt, l), At === null && (At = l)) : re();
  }
  function re() {
    (D(Dl, Dl.current), D(mt, mt.current));
  }
  function gt(l) {
    (E(mt), At === l && (At = null), E(Dl));
  }
  var Dl = r(0);
  function uu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && ((e = e.dehydrated), e === null || Pc(e) || lf(e))) return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Zt = 0,
    $ = null,
    pl = null,
    Bl = null,
    iu = !1,
    ha = !1,
    Le = !1,
    cu = 0,
    ln = 0,
    ma = null,
    Wh = 0;
  function Ml() {
    throw Error(d(321));
  }
  function Wi(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++) if (!dt(l[e], t[e])) return !1;
    return !0;
  }
  function ki(l, t, e, a, n, u) {
    return (
      (Zt = u),
      ($ = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (x.H = l === null || l.memoizedState === null ? Eo : oc),
      (Le = !1),
      (u = e(a, n)),
      (Le = !1),
      ha && (u = Qs(t, e, a, n)),
      Xs(l),
      u
    );
  }
  function Xs(l) {
    x.H = an;
    var t = pl !== null && pl.next !== null;
    if (((Zt = 0), (Bl = pl = $ = null), (iu = !1), (ln = 0), (ma = null), t)) throw Error(d(300));
    l === null || ql || ((l = l.dependencies), l !== null && $n(l) && (ql = !0));
  }
  function Qs(l, t, e, a) {
    $ = l;
    var n = 0;
    do {
      if ((ha && (ma = null), (ln = 0), (ha = !1), 25 <= n)) throw Error(d(301));
      if (((n += 1), (Bl = pl = null), l.updateQueue != null)) {
        var u = l.updateQueue;
        ((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0));
      }
      ((x.H = _o), (u = t(e, a)));
    } while (ha);
    return u;
  }
  function kh() {
    var l = x.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? tn(t) : t),
      (l = l.useState()[0]),
      (pl !== null ? pl.memoizedState : null) !== l && ($.flags |= 1024),
      t
    );
  }
  function Fi() {
    var l = cu !== 0;
    return ((cu = 0), l);
  }
  function $i(l, t, e) {
    ((t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~e));
  }
  function Ii(l) {
    if (iu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        (t !== null && (t.pending = null), (l = l.next));
      }
      iu = !1;
    }
    ((Zt = 0), (Bl = pl = $ = null), (ha = !1), (ln = cu = 0), (ma = null));
  }
  function lt() {
    var l = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return (Bl === null ? ($.memoizedState = Bl = l) : (Bl = Bl.next = l), Bl);
  }
  function Ul() {
    if (pl === null) {
      var l = $.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = pl.next;
    var t = Bl === null ? $.memoizedState : Bl.next;
    if (t !== null) ((Bl = t), (pl = l));
    else {
      if (l === null) throw $.alternate === null ? Error(d(467)) : Error(d(310));
      ((pl = l),
        (l = {
          memoizedState: pl.memoizedState,
          baseState: pl.baseState,
          baseQueue: pl.baseQueue,
          queue: pl.queue,
          next: null,
        }),
        Bl === null ? ($.memoizedState = Bl = l) : (Bl = Bl.next = l));
    }
    return Bl;
  }
  function fu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function tn(l) {
    var t = ln;
    return (
      (ln += 1),
      ma === null && (ma = []),
      (l = Us(ma, l, t)),
      (t = $),
      (Bl === null ? t.memoizedState : Bl.next) === null &&
        ((t = t.alternate), (x.H = t === null || t.memoizedState === null ? Eo : oc)),
      l
    );
  }
  function su(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return tn(l);
      if (l.$$typeof === rl) return Wl(l);
    }
    throw Error(d(438, String(l)));
  }
  function Pi(l) {
    var t = null,
      e = $.updateQueue;
    if ((e !== null && (t = e.memoCache), t == null)) {
      var a = $.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      e === null && ((e = fu()), ($.updateQueue = e)),
      (e.memoCache = t),
      (e = t.data[t.index]),
      e === void 0)
    )
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = q;
    return (t.index++, e);
  }
  function Vt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function ou(l) {
    var t = Ul();
    return lc(t, pl, l);
  }
  function lc(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(d(311));
    a.lastRenderedReducer = e;
    var n = l.baseQueue,
      u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        ((n.next = u.next), (u.next = i));
      }
      ((t.baseQueue = n = u), (a.pending = null));
    }
    if (((u = l.baseState), n === null)) l.memoizedState = u;
    else {
      t = n.next;
      var c = (i = null),
        f = null,
        y = t,
        b = !1;
      do {
        var z = y.lane & -536870913;
        if (z !== y.lane ? (al & z) === z : (Zt & z) === z) {
          var v = y.revertLane;
          if (v === 0)
            (f !== null &&
              (f = f.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: y.action,
                  hasEagerState: y.hasEagerState,
                  eagerState: y.eagerState,
                  next: null,
                }),
              z === fa && (b = !0));
          else if ((Zt & v) === v) {
            ((y = y.next), v === fa && (b = !0));
            continue;
          } else
            ((z = {
              lane: 0,
              revertLane: y.revertLane,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null,
            }),
              f === null ? ((c = f = z), (i = u)) : (f = f.next = z),
              ($.lanes |= v),
              (me |= v));
          ((z = y.action), Le && e(u, z), (u = y.hasEagerState ? y.eagerState : e(u, z)));
        } else
          ((v = {
            lane: z,
            revertLane: y.revertLane,
            gesture: y.gesture,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null,
          }),
            f === null ? ((c = f = v), (i = u)) : (f = f.next = v),
            ($.lanes |= z),
            (me |= z));
        y = y.next;
      } while (y !== null && y !== t);
      if (
        (f === null ? (i = u) : (f.next = c),
        !dt(u, l.memoizedState) && ((ql = !0), b && ((e = sa), e !== null)))
      )
        throw e;
      ((l.memoizedState = u), (l.baseState = i), (l.baseQueue = f), (a.lastRenderedState = u));
    }
    return (n === null && (a.lanes = 0), [l.memoizedState, a.dispatch]);
  }
  function tc(l) {
    var t = Ul(),
      e = t.queue;
    if (e === null) throw Error(d(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch,
      n = e.pending,
      u = t.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = (n = n.next);
      do ((u = l(u, i.action)), (i = i.next));
      while (i !== n);
      (dt(u, t.memoizedState) || (ql = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (e.lastRenderedState = u));
    }
    return [u, a];
  }
  function Zs(l, t, e) {
    var a = $,
      n = Ul(),
      u = il;
    if (u) {
      if (e === void 0) throw Error(d(407));
      e = e();
    } else e = t();
    var i = !dt((pl || n).memoizedState, e);
    if (
      (i && ((n.memoizedState = e), (ql = !0)),
      (n = n.queue),
      nc(Js.bind(null, a, n, l), [l]),
      n.getSnapshot !== t || i || (Bl !== null && Bl.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        ga(9, { destroy: void 0 }, Ks.bind(null, a, n, e, t), null),
        Tl === null)
      )
        throw Error(d(349));
      u || (Zt & 127) !== 0 || Vs(a, t, e);
    }
    return e;
  }
  function Vs(l, t, e) {
    ((l.flags |= 16384),
      (l = { getSnapshot: t, value: e }),
      (t = $.updateQueue),
      t === null
        ? ((t = fu()), ($.updateQueue = t), (t.stores = [l]))
        : ((e = t.stores), e === null ? (t.stores = [l]) : e.push(l)));
  }
  function Ks(l, t, e, a) {
    ((t.value = e), (t.getSnapshot = a), ws(t) && Ws(l));
  }
  function Js(l, t, e) {
    return e(function () {
      ws(t) && Ws(l);
    });
  }
  function ws(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !dt(l, e);
    } catch {
      return !0;
    }
  }
  function Ws(l) {
    var t = De(l, 2);
    t !== null && ft(t, l, 2);
  }
  function ec(l) {
    var t = lt();
    if (typeof l == "function") {
      var e = l;
      if (((l = e()), Le)) {
        le(!0);
        try {
          e();
        } finally {
          le(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vt,
        lastRenderedState: l,
      }),
      t
    );
  }
  function ks(l, t, e, a) {
    return ((l.baseState = e), lc(l, pl, typeof a == "function" ? a : Vt));
  }
  function Fh(l, t, e, a, n) {
    if (hu(l)) throw Error(d(485));
    if (((l = t.action), l !== null)) {
      var u = {
        payload: n,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (i) {
          u.listeners.push(i);
        },
      };
      (x.T !== null ? e(!0) : (u.isTransition = !1),
        a(u),
        (e = t.pending),
        e === null
          ? ((u.next = t.pending = u), Fs(t, u))
          : ((u.next = e.next), (t.pending = e.next = u)));
    }
  }
  function Fs(l, t) {
    var e = t.action,
      a = t.payload,
      n = l.state;
    if (t.isTransition) {
      var u = x.T,
        i = {};
      x.T = i;
      try {
        var c = e(n, a),
          f = x.S;
        (f !== null && f(i, c), $s(l, t, c));
      } catch (y) {
        ac(l, t, y);
      } finally {
        (u !== null && i.types !== null && (u.types = i.types), (x.T = u));
      }
    } else
      try {
        ((u = e(n, a)), $s(l, t, u));
      } catch (y) {
        ac(l, t, y);
      }
  }
  function $s(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function"
      ? e.then(
          function (a) {
            Is(l, t, a);
          },
          function (a) {
            return ac(l, t, a);
          },
        )
      : Is(l, t, e);
  }
  function Is(l, t, e) {
    ((t.status = "fulfilled"),
      (t.value = e),
      Ps(t),
      (l.state = e),
      (t = l.pending),
      t !== null &&
        ((e = t.next), e === t ? (l.pending = null) : ((e = e.next), (t.next = e), Fs(l, e))));
  }
  function ac(l, t, e) {
    var a = l.pending;
    if (((l.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = "rejected"), (t.reason = e), Ps(t), (t = t.next));
      while (t !== a);
    }
    l.action = null;
  }
  function Ps(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function lo(l, t) {
    return t;
  }
  function to(l, t) {
    if (il) {
      var e = Tl.formState;
      if (e !== null) {
        l: {
          var a = $;
          if (il) {
            if (El) {
              t: {
                for (var n = El, u = _t; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (((n = jt(n.nextSibling)), n === null)) {
                    n = null;
                    break t;
                  }
                }
                ((u = n.data), (n = u === "F!" || u === "F" ? n : null));
              }
              if (n) {
                ((El = jt(n.nextSibling)), (a = n.data === "F!"));
                break l;
              }
            }
            ue(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return (
      (e = lt()),
      (e.memoizedState = e.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: lo,
        lastRenderedState: t,
      }),
      (e.queue = a),
      (e = xo.bind(null, $, a)),
      (a.dispatch = e),
      (a = ec(!1)),
      (u = sc.bind(null, $, !1, a.queue)),
      (a = lt()),
      (n = { state: t, dispatch: null, action: l, pending: null }),
      (a.queue = n),
      (e = Fh.bind(null, $, n, u, e)),
      (n.dispatch = e),
      (a.memoizedState = l),
      [t, e, !1]
    );
  }
  function eo(l) {
    var t = Ul();
    return ao(t, pl, l);
  }
  function ao(l, t, e) {
    if (
      ((t = lc(l, t, lo)[0]),
      (l = ou(Vt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = tn(t);
      } catch (i) {
        throw i === oa ? lu : i;
      }
    else a = t;
    t = Ul();
    var n = t.queue,
      u = n.dispatch;
    return (
      e !== t.memoizedState &&
        (($.flags |= 2048), ga(9, { destroy: void 0 }, $h.bind(null, n, e), null)),
      [a, u, l]
    );
  }
  function $h(l, t) {
    l.action = t;
  }
  function no(l) {
    var t = Ul(),
      e = pl;
    if (e !== null) return ao(t, e, l);
    (Ul(), (t = t.memoizedState), (e = Ul()));
    var a = e.queue.dispatch;
    return ((e.memoizedState = l), [t, a, !1]);
  }
  function ga(l, t, e, a) {
    return (
      (l = { tag: l, create: e, deps: a, inst: t, next: null }),
      (t = $.updateQueue),
      t === null && ((t = fu()), ($.updateQueue = t)),
      (e = t.lastEffect),
      e === null
        ? (t.lastEffect = l.next = l)
        : ((a = e.next), (e.next = l), (l.next = a), (t.lastEffect = l)),
      l
    );
  }
  function uo() {
    return Ul().memoizedState;
  }
  function ru(l, t, e, a) {
    var n = lt();
    (($.flags |= l),
      (n.memoizedState = ga(1 | t, { destroy: void 0 }, e, a === void 0 ? null : a)));
  }
  function du(l, t, e, a) {
    var n = Ul();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    pl !== null && a !== null && Wi(a, pl.memoizedState.deps)
      ? (n.memoizedState = ga(t, u, e, a))
      : (($.flags |= l), (n.memoizedState = ga(1 | t, u, e, a)));
  }
  function io(l, t) {
    ru(8390656, 8, l, t);
  }
  function nc(l, t) {
    du(2048, 8, l, t);
  }
  function Ih(l) {
    $.flags |= 4;
    var t = $.updateQueue;
    if (t === null) ((t = fu()), ($.updateQueue = t), (t.events = [l]));
    else {
      var e = t.events;
      e === null ? (t.events = [l]) : e.push(l);
    }
  }
  function co(l) {
    var t = Ul().memoizedState;
    return (
      Ih({ ref: t, nextImpl: l }),
      function () {
        if ((dl & 2) !== 0) throw Error(d(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function fo(l, t) {
    return du(4, 2, l, t);
  }
  function so(l, t) {
    return du(4, 4, l, t);
  }
  function oo(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function () {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function ro(l, t, e) {
    ((e = e != null ? e.concat([l]) : null), du(4, 4, oo.bind(null, t, l), e));
  }
  function uc() {}
  function ho(l, t) {
    var e = Ul();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Wi(t, a[1]) ? a[0] : ((e.memoizedState = [l, t]), l);
  }
  function mo(l, t) {
    var e = Ul();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Wi(t, a[1])) return a[0];
    if (((a = l()), Le)) {
      le(!0);
      try {
        l();
      } finally {
        le(!1);
      }
    }
    return ((e.memoizedState = [a, t]), a);
  }
  function ic(l, t, e) {
    return e === void 0 || ((Zt & 1073741824) !== 0 && (al & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = e), (l = gr()), ($.lanes |= l), (me |= l), e);
  }
  function go(l, t, e, a) {
    return dt(e, t)
      ? e
      : da.current !== null
        ? ((l = ic(l, e, a)), dt(l, t) || (ql = !0), l)
        : (Zt & 42) === 0 || ((Zt & 1073741824) !== 0 && (al & 261930) === 0)
          ? ((ql = !0), (l.memoizedState = e))
          : ((l = gr()), ($.lanes |= l), (me |= l), t);
  }
  function yo(l, t, e, a, n) {
    var u = j.p;
    j.p = u !== 0 && 8 > u ? u : 8;
    var i = x.T,
      c = {};
    ((x.T = c), sc(l, !1, t, e));
    try {
      var f = n(),
        y = x.S;
      if (
        (y !== null && y(c, f), f !== null && typeof f == "object" && typeof f.then == "function")
      ) {
        var b = wh(f, a);
        en(l, t, b, pt(l));
      } else en(l, t, a, pt(l));
    } catch (z) {
      en(l, t, { then: function () {}, status: "rejected", reason: z }, pt());
    } finally {
      ((j.p = u), i !== null && c.types !== null && (i.types = c.types), (x.T = i));
    }
  }
  function Ph() {}
  function cc(l, t, e, a) {
    if (l.tag !== 5) throw Error(d(476));
    var n = vo(l).queue;
    yo(
      l,
      n,
      t,
      J,
      e === null
        ? Ph
        : function () {
            return (po(l), e(a));
          },
    );
  }
  function vo(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vt,
        lastRenderedState: J,
      },
      next: null,
    };
    var e = {};
    return (
      (t.next = {
        memoizedState: e,
        baseState: e,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Vt,
          lastRenderedState: e,
        },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function po(l) {
    var t = vo(l);
    (t.next === null && (t = l.alternate.memoizedState), en(l, t.next.queue, {}, pt()));
  }
  function fc() {
    return Wl(bn);
  }
  function So() {
    return Ul().memoizedState;
  }
  function bo() {
    return Ul().memoizedState;
  }
  function lm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = pt();
          l = fe(e);
          var a = se(t, l, e);
          (a !== null && (ft(a, t, e), $a(a, t, e)), (t = { cache: qi() }), (l.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function tm(l, t, e) {
    var a = pt();
    ((e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      hu(l) ? To(t, e) : ((e = Ai(l, t, e, a)), e !== null && (ft(e, l, a), zo(e, t, a))));
  }
  function xo(l, t, e) {
    var a = pt();
    en(l, t, e, a);
  }
  function en(l, t, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (hu(l)) To(t, n);
    else {
      var u = l.alternate;
      if (
        l.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var i = t.lastRenderedState,
            c = u(i, e);
          if (((n.hasEagerState = !0), (n.eagerState = c), dt(c, i)))
            return (wn(l, t, n, 0), Tl === null && Jn(), !1);
        } catch {}
      if (((e = Ai(l, t, n, a)), e !== null)) return (ft(e, l, a), zo(e, t, a), !0);
    }
    return !1;
  }
  function sc(l, t, e, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Xc(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      hu(l))
    ) {
      if (t) throw Error(d(479));
    } else ((t = Ai(l, e, a, 2)), t !== null && ft(t, l, 2));
  }
  function hu(l) {
    var t = l.alternate;
    return l === $ || (t !== null && t === $);
  }
  function To(l, t) {
    ha = iu = !0;
    var e = l.pending;
    (e === null ? (t.next = t) : ((t.next = e.next), (e.next = t)), (l.pending = t));
  }
  function zo(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (e |= a), (t.lanes = e), jf(l, e));
    }
  }
  var an = {
    readContext: Wl,
    use: su,
    useCallback: Ml,
    useContext: Ml,
    useEffect: Ml,
    useImperativeHandle: Ml,
    useLayoutEffect: Ml,
    useInsertionEffect: Ml,
    useMemo: Ml,
    useReducer: Ml,
    useRef: Ml,
    useState: Ml,
    useDebugValue: Ml,
    useDeferredValue: Ml,
    useTransition: Ml,
    useSyncExternalStore: Ml,
    useId: Ml,
    useHostTransitionStatus: Ml,
    useFormState: Ml,
    useActionState: Ml,
    useOptimistic: Ml,
    useMemoCache: Ml,
    useCacheRefresh: Ml,
  };
  an.useEffectEvent = Ml;
  var Eo = {
      readContext: Wl,
      use: su,
      useCallback: function (l, t) {
        return ((lt().memoizedState = [l, t === void 0 ? null : t]), l);
      },
      useContext: Wl,
      useEffect: io,
      useImperativeHandle: function (l, t, e) {
        ((e = e != null ? e.concat([l]) : null), ru(4194308, 4, oo.bind(null, t, l), e));
      },
      useLayoutEffect: function (l, t) {
        return ru(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        ru(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var e = lt();
        t = t === void 0 ? null : t;
        var a = l();
        if (Le) {
          le(!0);
          try {
            l();
          } finally {
            le(!1);
          }
        }
        return ((e.memoizedState = [a, t]), a);
      },
      useReducer: function (l, t, e) {
        var a = lt();
        if (e !== void 0) {
          var n = e(t);
          if (Le) {
            le(!0);
            try {
              e(t);
            } finally {
              le(!1);
            }
          }
        } else n = t;
        return (
          (a.memoizedState = a.baseState = n),
          (l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: l,
            lastRenderedState: n,
          }),
          (a.queue = l),
          (l = l.dispatch = tm.bind(null, $, l)),
          [a.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = lt();
        return ((l = { current: l }), (t.memoizedState = l));
      },
      useState: function (l) {
        l = ec(l);
        var t = l.queue,
          e = xo.bind(null, $, t);
        return ((t.dispatch = e), [l.memoizedState, e]);
      },
      useDebugValue: uc,
      useDeferredValue: function (l, t) {
        var e = lt();
        return ic(e, l, t);
      },
      useTransition: function () {
        var l = ec(!1);
        return ((l = yo.bind(null, $, l.queue, !0, !1)), (lt().memoizedState = l), [!1, l]);
      },
      useSyncExternalStore: function (l, t, e) {
        var a = $,
          n = lt();
        if (il) {
          if (e === void 0) throw Error(d(407));
          e = e();
        } else {
          if (((e = t()), Tl === null)) throw Error(d(349));
          (al & 127) !== 0 || Vs(a, t, e);
        }
        n.memoizedState = e;
        var u = { value: e, getSnapshot: t };
        return (
          (n.queue = u),
          io(Js.bind(null, a, u, l), [l]),
          (a.flags |= 2048),
          ga(9, { destroy: void 0 }, Ks.bind(null, a, u, e, t), null),
          e
        );
      },
      useId: function () {
        var l = lt(),
          t = Tl.identifierPrefix;
        if (il) {
          var e = Rt,
            a = Ut;
          ((e = (a & ~(1 << (32 - rt(a) - 1))).toString(32) + e),
            (t = "_" + t + "R_" + e),
            (e = cu++),
            0 < e && (t += "H" + e.toString(32)),
            (t += "_"));
        } else ((e = Wh++), (t = "_" + t + "r_" + e.toString(32) + "_"));
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: fc,
      useFormState: to,
      useActionState: to,
      useOptimistic: function (l) {
        var t = lt();
        t.memoizedState = t.baseState = l;
        var e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return ((t.queue = e), (t = sc.bind(null, $, !0, e)), (e.dispatch = t), [l, t]);
      },
      useMemoCache: Pi,
      useCacheRefresh: function () {
        return (lt().memoizedState = lm.bind(null, $));
      },
      useEffectEvent: function (l) {
        var t = lt(),
          e = { impl: l };
        return (
          (t.memoizedState = e),
          function () {
            if ((dl & 2) !== 0) throw Error(d(440));
            return e.impl.apply(void 0, arguments);
          }
        );
      },
    },
    oc = {
      readContext: Wl,
      use: su,
      useCallback: ho,
      useContext: Wl,
      useEffect: nc,
      useImperativeHandle: ro,
      useInsertionEffect: fo,
      useLayoutEffect: so,
      useMemo: mo,
      useReducer: ou,
      useRef: uo,
      useState: function () {
        return ou(Vt);
      },
      useDebugValue: uc,
      useDeferredValue: function (l, t) {
        var e = Ul();
        return go(e, pl.memoizedState, l, t);
      },
      useTransition: function () {
        var l = ou(Vt)[0],
          t = Ul().memoizedState;
        return [typeof l == "boolean" ? l : tn(l), t];
      },
      useSyncExternalStore: Zs,
      useId: So,
      useHostTransitionStatus: fc,
      useFormState: eo,
      useActionState: eo,
      useOptimistic: function (l, t) {
        var e = Ul();
        return ks(e, pl, l, t);
      },
      useMemoCache: Pi,
      useCacheRefresh: bo,
    };
  oc.useEffectEvent = co;
  var _o = {
    readContext: Wl,
    use: su,
    useCallback: ho,
    useContext: Wl,
    useEffect: nc,
    useImperativeHandle: ro,
    useInsertionEffect: fo,
    useLayoutEffect: so,
    useMemo: mo,
    useReducer: tc,
    useRef: uo,
    useState: function () {
      return tc(Vt);
    },
    useDebugValue: uc,
    useDeferredValue: function (l, t) {
      var e = Ul();
      return pl === null ? ic(e, l, t) : go(e, pl.memoizedState, l, t);
    },
    useTransition: function () {
      var l = tc(Vt)[0],
        t = Ul().memoizedState;
      return [typeof l == "boolean" ? l : tn(l), t];
    },
    useSyncExternalStore: Zs,
    useId: So,
    useHostTransitionStatus: fc,
    useFormState: no,
    useActionState: no,
    useOptimistic: function (l, t) {
      var e = Ul();
      return pl !== null ? ks(e, pl, l, t) : ((e.baseState = l), [l, e.queue.dispatch]);
    },
    useMemoCache: Pi,
    useCacheRefresh: bo,
  };
  _o.useEffectEvent = co;
  function rc(l, t, e, a) {
    ((t = l.memoizedState),
      (e = e(a, t)),
      (e = e == null ? t : C({}, t, e)),
      (l.memoizedState = e),
      l.lanes === 0 && (l.updateQueue.baseState = e));
  }
  var dc = {
    enqueueSetState: function (l, t, e) {
      l = l._reactInternals;
      var a = pt(),
        n = fe(a);
      ((n.payload = t),
        e != null && (n.callback = e),
        (t = se(l, n, a)),
        t !== null && (ft(t, l, a), $a(t, l, a)));
    },
    enqueueReplaceState: function (l, t, e) {
      l = l._reactInternals;
      var a = pt(),
        n = fe(a);
      ((n.tag = 1),
        (n.payload = t),
        e != null && (n.callback = e),
        (t = se(l, n, a)),
        t !== null && (ft(t, l, a), $a(t, l, a)));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var e = pt(),
        a = fe(e);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = se(l, a, e)),
        t !== null && (ft(t, l, e), $a(t, l, e)));
    },
  };
  function Ao(l, t, e, a, n, u, i) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == "function"
        ? l.shouldComponentUpdate(a, u, i)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Za(e, a) || !Za(n, u)
          : !0
    );
  }
  function jo(l, t, e, a) {
    ((l = t.state),
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(e, a),
      t.state !== l && dc.enqueueReplaceState(t, t.state, null));
  }
  function Xe(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t) a !== "ref" && (e[a] = t[a]);
    }
    if ((l = l.defaultProps)) {
      e === t && (e = C({}, e));
      for (var n in l) e[n] === void 0 && (e[n] = l[n]);
    }
    return e;
  }
  function Mo(l) {
    Kn(l);
  }
  function Oo(l) {
    console.error(l);
  }
  function Co(l) {
    Kn(l);
  }
  function mu(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Do(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, { componentStack: e.stack, errorBoundary: t.tag === 1 ? t.stateNode : null });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function hc(l, t, e) {
    return (
      (e = fe(e)),
      (e.tag = 3),
      (e.payload = { element: null }),
      (e.callback = function () {
        mu(l, t);
      }),
      e
    );
  }
  function Uo(l) {
    return ((l = fe(l)), (l.tag = 3), l);
  }
  function Ro(l, t, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      ((l.payload = function () {
        return n(u);
      }),
        (l.callback = function () {
          Do(t, e, a);
        }));
    }
    var i = e.stateNode;
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (l.callback = function () {
        (Do(t, e, a),
          typeof n != "function" && (ge === null ? (ge = new Set([this])) : ge.add(this)));
        var c = a.stack;
        this.componentDidCatch(a.value, { componentStack: c !== null ? c : "" });
      });
  }
  function em(l, t, e, a, n) {
    if (((e.flags |= 32768), a !== null && typeof a == "object" && typeof a.then == "function")) {
      if (((t = e.alternate), t !== null && ca(t, e, n, !0), (e = mt.current), e !== null)) {
        switch (e.tag) {
          case 31:
          case 13:
            return (
              At === null ? Au() : e.alternate === null && Ol === 0 && (Ol = 3),
              (e.flags &= -257),
              (e.flags |= 65536),
              (e.lanes = n),
              a === tu
                ? (e.flags |= 16384)
                : ((t = e.updateQueue),
                  t === null ? (e.updateQueue = new Set([a])) : t.add(a),
                  Yc(l, a, n)),
              !1
            );
          case 22:
            return (
              (e.flags |= 65536),
              a === tu
                ? (e.flags |= 16384)
                : ((t = e.updateQueue),
                  t === null
                    ? ((t = { transitions: null, markerInstances: null, retryQueue: new Set([a]) }),
                      (e.updateQueue = t))
                    : ((e = t.retryQueue), e === null ? (t.retryQueue = new Set([a])) : e.add(a)),
                  Yc(l, a, n)),
              !1
            );
        }
        throw Error(d(435, e.tag));
      }
      return (Yc(l, a, n), Au(), !1);
    }
    if (il)
      return (
        (t = mt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            a !== Ui && ((l = Error(d(422), { cause: a })), Ja(Tt(l, e))))
          : (a !== Ui && ((t = Error(d(423), { cause: a })), Ja(Tt(t, e))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (n &= -n),
            (l.lanes |= n),
            (a = Tt(a, e)),
            (n = hc(l.stateNode, a, n)),
            Zi(l, n),
            Ol !== 4 && (Ol = 2)),
        !1
      );
    var u = Error(d(520), { cause: a });
    if (((u = Tt(u, e)), dn === null ? (dn = [u]) : dn.push(u), Ol !== 4 && (Ol = 2), t === null))
      return !0;
    ((a = Tt(a, e)), (e = t));
    do {
      switch (e.tag) {
        case 3:
          return (
            (e.flags |= 65536),
            (l = n & -n),
            (e.lanes |= l),
            (l = hc(e.stateNode, a, l)),
            Zi(e, l),
            !1
          );
        case 1:
          if (
            ((t = e.type),
            (u = e.stateNode),
            (e.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (ge === null || !ge.has(u)))))
          )
            return (
              (e.flags |= 65536),
              (n &= -n),
              (e.lanes |= n),
              (n = Uo(n)),
              Ro(n, l, e, a),
              Zi(e, n),
              !1
            );
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var mc = Error(d(461)),
    ql = !1;
  function kl(l, t, e, a) {
    t.child = l === null ? Bs(t, null, e, a) : Ge(t, l.child, e, a);
  }
  function No(l, t, e, a, n) {
    e = e.render;
    var u = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a) c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return (
      He(t),
      (a = ki(l, t, e, i, u, n)),
      (c = Fi()),
      l !== null && !ql
        ? ($i(l, t, n), Kt(l, t, n))
        : (il && c && Ci(t), (t.flags |= 1), kl(l, t, a, n), t.child)
    );
  }
  function Ho(l, t, e, a, n) {
    if (l === null) {
      var u = e.type;
      return typeof u == "function" && !ji(u) && u.defaultProps === void 0 && e.compare === null
        ? ((t.tag = 15), (t.type = u), Bo(l, t, u, a, n))
        : ((l = kn(e.type, null, a, t, t.mode, n)), (l.ref = t.ref), (l.return = t), (t.child = l));
    }
    if (((u = l.child), !Tc(l, n))) {
      var i = u.memoizedProps;
      if (((e = e.compare), (e = e !== null ? e : Za), e(i, a) && l.ref === t.ref))
        return Kt(l, t, n);
    }
    return ((t.flags |= 1), (l = Gt(u, a)), (l.ref = t.ref), (l.return = t), (t.child = l));
  }
  function Bo(l, t, e, a, n) {
    if (l !== null) {
      var u = l.memoizedProps;
      if (Za(u, a) && l.ref === t.ref)
        if (((ql = !1), (t.pendingProps = a = u), Tc(l, n))) (l.flags & 131072) !== 0 && (ql = !0);
        else return ((t.lanes = l.lanes), Kt(l, t, n));
    }
    return gc(l, t, e, a, n);
  }
  function qo(l, t, e, a) {
    var n = a.children,
      u = l !== null ? l.memoizedState : null;
    if (
      (l === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((u = u !== null ? u.baseLanes | e : e), l !== null)) {
          for (a = t.child = l.child, n = 0; a !== null; )
            ((n = n | a.lanes | a.childLanes), (a = a.sibling));
          a = n & ~u;
        } else ((a = 0), (t.child = null));
        return Yo(l, t, u, e, a);
      }
      if ((e & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && Pn(t, u !== null ? u.cachePool : null),
          u !== null ? Gs(t, u) : Ki(),
          Ls(t));
      else return ((a = t.lanes = 536870912), Yo(l, t, u !== null ? u.baseLanes | e : e, e, a));
    } else
      u !== null
        ? (Pn(t, u.cachePool), Gs(t, u), re(), (t.memoizedState = null))
        : (l !== null && Pn(t, null), Ki(), re());
    return (kl(l, t, n, e), t.child);
  }
  function nn(l, t) {
    return (
      (l !== null && l.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function Yo(l, t, e, a, n) {
    var u = Gi();
    return (
      (u = u === null ? null : { parent: Hl._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: e, cachePool: u }),
      l !== null && Pn(t, null),
      Ki(),
      Ls(t),
      l !== null && ca(l, t, a, !0),
      (t.childLanes = n),
      null
    );
  }
  function gu(l, t) {
    return (
      (t = vu({ mode: t.mode, children: t.children }, l.mode)),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function Go(l, t, e) {
    return (
      Ge(t, l.child, null, e),
      (l = gu(t, t.pendingProps)),
      (l.flags |= 2),
      gt(t),
      (t.memoizedState = null),
      l
    );
  }
  function am(l, t, e) {
    var a = t.pendingProps,
      n = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if (il) {
        if (a.mode === "hidden") return ((l = gu(t, a)), (t.lanes = 536870912), nn(null, l));
        if (
          (wi(t),
          (l = El)
            ? ((l = $r(l, _t)),
              (l = l !== null && l.data === "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: ae !== null ? { id: Ut, overflow: Rt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = xs(l)),
                (e.return = t),
                (t.child = e),
                (wl = t),
                (El = null)))
            : (l = null),
          l === null)
        )
          throw ue(t);
        return ((t.lanes = 536870912), null);
      }
      return gu(t, a);
    }
    var u = l.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if ((wi(t), n))
        if (t.flags & 256) ((t.flags &= -257), (t = Go(l, t, e)));
        else if (t.memoizedState !== null) ((t.child = l.child), (t.flags |= 128), (t = null));
        else throw Error(d(558));
      else if ((ql || ca(l, t, e, !1), (n = (e & l.childLanes) !== 0), ql || n)) {
        if (((a = Tl), a !== null && ((i = Mf(a, e)), i !== 0 && i !== u.retryLane)))
          throw ((u.retryLane = i), De(l, i), ft(a, l, i), mc);
        (Au(), (t = Go(l, t, e)));
      } else
        ((l = u.treeContext),
          (El = jt(i.nextSibling)),
          (wl = t),
          (il = !0),
          (ne = null),
          (_t = !1),
          l !== null && Es(t, l),
          (t = gu(t, a)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (l = Gt(l.child, { mode: a.mode, children: a.children })),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function yu(l, t) {
    var e = t.ref;
    if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object") throw Error(d(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function gc(l, t, e, a, n) {
    return (
      He(t),
      (e = ki(l, t, e, a, void 0, n)),
      (a = Fi()),
      l !== null && !ql
        ? ($i(l, t, n), Kt(l, t, n))
        : (il && a && Ci(t), (t.flags |= 1), kl(l, t, e, n), t.child)
    );
  }
  function Lo(l, t, e, a, n, u) {
    return (
      He(t),
      (t.updateQueue = null),
      (e = Qs(t, a, e, n)),
      Xs(l),
      (a = Fi()),
      l !== null && !ql
        ? ($i(l, t, u), Kt(l, t, u))
        : (il && a && Ci(t), (t.flags |= 1), kl(l, t, e, u), t.child)
    );
  }
  function Xo(l, t, e, a, n) {
    if ((He(t), t.stateNode === null)) {
      var u = aa,
        i = e.contextType;
      (typeof i == "object" && i !== null && (u = Wl(i)),
        (u = new e(a, u)),
        (t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = dc),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = a),
        (u.state = t.memoizedState),
        (u.refs = {}),
        Xi(t),
        (i = e.contextType),
        (u.context = typeof i == "object" && i !== null ? Wl(i) : aa),
        (u.state = t.memoizedState),
        (i = e.getDerivedStateFromProps),
        typeof i == "function" && (rc(t, e, i, a), (u.state = t.memoizedState)),
        typeof e.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((i = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(),
          i !== u.state && dc.enqueueReplaceState(u, u.state, null),
          Pa(t, a, u, n),
          Ia(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0));
    } else if (l === null) {
      u = t.stateNode;
      var c = t.memoizedProps,
        f = Xe(e, c);
      u.props = f;
      var y = u.context,
        b = e.contextType;
      ((i = aa), typeof b == "object" && b !== null && (i = Wl(b)));
      var z = e.getDerivedStateFromProps;
      ((b = typeof z == "function" || typeof u.getSnapshotBeforeUpdate == "function"),
        (c = t.pendingProps !== c),
        b ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((c || y !== i) && jo(t, u, a, i)),
        (ce = !1));
      var v = t.memoizedState;
      ((u.state = v),
        Pa(t, a, u, n),
        Ia(),
        (y = t.memoizedState),
        c || v !== y || ce
          ? (typeof z == "function" && (rc(t, e, z, a), (y = t.memoizedState)),
            (f = ce || Ao(t, e, f, a, v, y, i))
              ? (b ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" && u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" && (t.flags |= 4194308))
              : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = y)),
            (u.props = a),
            (u.state = y),
            (u.context = i),
            (a = f))
          : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), (a = !1)));
    } else {
      ((u = t.stateNode),
        Qi(l, t),
        (i = t.memoizedProps),
        (b = Xe(e, i)),
        (u.props = b),
        (z = t.pendingProps),
        (v = u.context),
        (y = e.contextType),
        (f = aa),
        typeof y == "object" && y !== null && (f = Wl(y)),
        (c = e.getDerivedStateFromProps),
        (y = typeof c == "function" || typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((i !== z || v !== f) && jo(t, u, a, f)),
        (ce = !1),
        (v = t.memoizedState),
        (u.state = v),
        Pa(t, a, u, n),
        Ia());
      var p = t.memoizedState;
      i !== z || v !== p || ce || (l !== null && l.dependencies !== null && $n(l.dependencies))
        ? (typeof c == "function" && (rc(t, e, c, a), (p = t.memoizedState)),
          (b =
            ce ||
            Ao(t, e, b, a, v, p, f) ||
            (l !== null && l.dependencies !== null && $n(l.dependencies)))
            ? (y ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, p, f),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(a, p, f)),
              typeof u.componentDidUpdate == "function" && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (i === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (i === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = p)),
          (u.props = a),
          (u.state = p),
          (u.context = f),
          (a = b))
        : (typeof u.componentDidUpdate != "function" ||
            (i === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (i === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (u = a),
      yu(l, t),
      (a = (t.flags & 128) !== 0),
      u || a
        ? ((u = t.stateNode),
          (e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render()),
          (t.flags |= 1),
          l !== null && a
            ? ((t.child = Ge(t, l.child, null, n)), (t.child = Ge(t, null, e, n)))
            : kl(l, t, e, n),
          (t.memoizedState = u.state),
          (l = t.child))
        : (l = Kt(l, t, n)),
      l
    );
  }
  function Qo(l, t, e, a) {
    return (Re(), (t.flags |= 256), kl(l, t, e, a), t.child);
  }
  var yc = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function vc(l) {
    return { baseLanes: l, cachePool: Cs() };
  }
  function pc(l, t, e) {
    return ((l = l !== null ? l.childLanes & ~e : 0), t && (l |= vt), l);
  }
  function Zo(l, t, e) {
    var a = t.pendingProps,
      n = !1,
      u = (t.flags & 128) !== 0,
      i;
    if (
      ((i = u) || (i = l !== null && l.memoizedState === null ? !1 : (Dl.current & 2) !== 0),
      i && ((n = !0), (t.flags &= -129)),
      (i = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (il) {
        if (
          (n ? oe(t) : re(),
          (l = El)
            ? ((l = $r(l, _t)),
              (l = l !== null && l.data !== "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: ae !== null ? { id: Ut, overflow: Rt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = xs(l)),
                (e.return = t),
                (t.child = e),
                (wl = t),
                (El = null)))
            : (l = null),
          l === null)
        )
          throw ue(t);
        return (lf(l) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var c = a.children;
      return (
        (a = a.fallback),
        n
          ? (re(),
            (n = t.mode),
            (c = vu({ mode: "hidden", children: c }, n)),
            (a = Ue(a, n, e, null)),
            (c.return = t),
            (a.return = t),
            (c.sibling = a),
            (t.child = c),
            (a = t.child),
            (a.memoizedState = vc(e)),
            (a.childLanes = pc(l, i, e)),
            (t.memoizedState = yc),
            nn(null, a))
          : (oe(t), Sc(t, c))
      );
    }
    var f = l.memoizedState;
    if (f !== null && ((c = f.dehydrated), c !== null)) {
      if (u)
        t.flags & 256
          ? (oe(t), (t.flags &= -257), (t = bc(l, t, e)))
          : t.memoizedState !== null
            ? (re(), (t.child = l.child), (t.flags |= 128), (t = null))
            : (re(),
              (c = a.fallback),
              (n = t.mode),
              (a = vu({ mode: "visible", children: a.children }, n)),
              (c = Ue(c, n, e, null)),
              (c.flags |= 2),
              (a.return = t),
              (c.return = t),
              (a.sibling = c),
              (t.child = a),
              Ge(t, l.child, null, e),
              (a = t.child),
              (a.memoizedState = vc(e)),
              (a.childLanes = pc(l, i, e)),
              (t.memoizedState = yc),
              (t = nn(null, a)));
      else if ((oe(t), lf(c))) {
        if (((i = c.nextSibling && c.nextSibling.dataset), i)) var y = i.dgst;
        ((i = y),
          (a = Error(d(419))),
          (a.stack = ""),
          (a.digest = i),
          Ja({ value: a, source: null, stack: null }),
          (t = bc(l, t, e)));
      } else if ((ql || ca(l, t, e, !1), (i = (e & l.childLanes) !== 0), ql || i)) {
        if (((i = Tl), i !== null && ((a = Mf(i, e)), a !== 0 && a !== f.retryLane)))
          throw ((f.retryLane = a), De(l, a), ft(i, l, a), mc);
        (Pc(c) || Au(), (t = bc(l, t, e)));
      } else
        Pc(c)
          ? ((t.flags |= 192), (t.child = l.child), (t = null))
          : ((l = f.treeContext),
            (El = jt(c.nextSibling)),
            (wl = t),
            (il = !0),
            (ne = null),
            (_t = !1),
            l !== null && Es(t, l),
            (t = Sc(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return n
      ? (re(),
        (c = a.fallback),
        (n = t.mode),
        (f = l.child),
        (y = f.sibling),
        (a = Gt(f, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = f.subtreeFlags & 65011712),
        y !== null ? (c = Gt(y, c)) : ((c = Ue(c, n, e, null)), (c.flags |= 2)),
        (c.return = t),
        (a.return = t),
        (a.sibling = c),
        (t.child = a),
        nn(null, a),
        (a = t.child),
        (c = l.child.memoizedState),
        c === null
          ? (c = vc(e))
          : ((n = c.cachePool),
            n !== null
              ? ((f = Hl._currentValue), (n = n.parent !== f ? { parent: f, pool: f } : n))
              : (n = Cs()),
            (c = { baseLanes: c.baseLanes | e, cachePool: n })),
        (a.memoizedState = c),
        (a.childLanes = pc(l, i, e)),
        (t.memoizedState = yc),
        nn(l.child, a))
      : (oe(t),
        (e = l.child),
        (l = e.sibling),
        (e = Gt(e, { mode: "visible", children: a.children })),
        (e.return = t),
        (e.sibling = null),
        l !== null &&
          ((i = t.deletions), i === null ? ((t.deletions = [l]), (t.flags |= 16)) : i.push(l)),
        (t.child = e),
        (t.memoizedState = null),
        e);
  }
  function Sc(l, t) {
    return ((t = vu({ mode: "visible", children: t }, l.mode)), (t.return = l), (l.child = t));
  }
  function vu(l, t) {
    return ((l = ht(22, l, null, t)), (l.lanes = 0), l);
  }
  function bc(l, t, e) {
    return (
      Ge(t, l.child, null, e),
      (l = Sc(t, t.pendingProps.children)),
      (l.flags |= 2),
      (t.memoizedState = null),
      l
    );
  }
  function Vo(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    (a !== null && (a.lanes |= t), Hi(l.return, t, e));
  }
  function xc(l, t, e, a, n, u) {
    var i = l.memoizedState;
    i === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: e,
          tailMode: n,
          treeForkCount: u,
        })
      : ((i.isBackwards = t),
        (i.rendering = null),
        (i.renderingStartTime = 0),
        (i.last = a),
        (i.tail = e),
        (i.tailMode = n),
        (i.treeForkCount = u));
  }
  function Ko(l, t, e) {
    var a = t.pendingProps,
      n = a.revealOrder,
      u = a.tail;
    a = a.children;
    var i = Dl.current,
      c = (i & 2) !== 0;
    if (
      (c ? ((i = (i & 1) | 2), (t.flags |= 128)) : (i &= 1),
      D(Dl, i),
      kl(l, t, a, e),
      (a = il ? Ka : 0),
      !c && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && Vo(l, e, t);
        else if (l.tag === 19) Vo(l, e, t);
        else if (l.child !== null) {
          ((l.child.return = l), (l = l.child));
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break l;
          l = l.return;
        }
        ((l.sibling.return = l.return), (l = l.sibling));
      }
    switch (n) {
      case "forwards":
        for (e = t.child, n = null; e !== null; )
          ((l = e.alternate), l !== null && uu(l) === null && (n = e), (e = e.sibling));
        ((e = n),
          e === null ? ((n = t.child), (t.child = null)) : ((n = e.sibling), (e.sibling = null)),
          xc(t, !1, n, e, u, a));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, n = t.child, t.child = null; n !== null; ) {
          if (((l = n.alternate), l !== null && uu(l) === null)) {
            t.child = n;
            break;
          }
          ((l = n.sibling), (n.sibling = e), (e = n), (n = l));
        }
        xc(t, !0, e, null, u, a);
        break;
      case "together":
        xc(t, !1, null, null, void 0, a);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Kt(l, t, e) {
    if (
      (l !== null && (t.dependencies = l.dependencies), (me |= t.lanes), (e & t.childLanes) === 0)
    )
      if (l !== null) {
        if ((ca(l, t, e, !1), (e & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(d(153));
    if (t.child !== null) {
      for (l = t.child, e = Gt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        ((l = l.sibling), (e = e.sibling = Gt(l, l.pendingProps)), (e.return = t));
      e.sibling = null;
    }
    return t.child;
  }
  function Tc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : ((l = l.dependencies), !!(l !== null && $n(l)));
  }
  function nm(l, t, e) {
    switch (t.tag) {
      case 3:
        (Pl(t, t.stateNode.containerInfo), ie(t, Hl, l.memoizedState.cache), Re());
        break;
      case 27:
      case 5:
        Ca(t);
        break;
      case 4:
        Pl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ie(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), wi(t), null);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (oe(t), (t.flags |= 128), null)
            : (e & t.child.childLanes) !== 0
              ? Zo(l, t, e)
              : (oe(t), (l = Kt(l, t, e)), l !== null ? l.sibling : null);
        oe(t);
        break;
      case 19:
        var n = (l.flags & 128) !== 0;
        if (
          ((a = (e & t.childLanes) !== 0),
          a || (ca(l, t, e, !1), (a = (e & t.childLanes) !== 0)),
          n)
        ) {
          if (a) return Ko(l, t, e);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null && ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          D(Dl, Dl.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), qo(l, t, e, t.pendingProps));
      case 24:
        ie(t, Hl, l.memoizedState.cache);
    }
    return Kt(l, t, e);
  }
  function Jo(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) ql = !0;
      else {
        if (!Tc(l, e) && (t.flags & 128) === 0) return ((ql = !1), nm(l, t, e));
        ql = (l.flags & 131072) !== 0;
      }
    else ((ql = !1), il && (t.flags & 1048576) !== 0 && zs(t, Ka, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (((l = qe(t.elementType)), (t.type = l), typeof l == "function"))
            ji(l)
              ? ((a = Xe(l, a)), (t.tag = 1), (t = Xo(null, t, l, a, e)))
              : ((t.tag = 0), (t = gc(null, t, l, a, e)));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === Zl) {
                ((t.tag = 11), (t = No(null, t, l, a, e)));
                break l;
              } else if (n === I) {
                ((t.tag = 14), (t = Ho(null, t, l, a, e)));
                break l;
              }
            }
            throw ((t = $l(l) || l), Error(d(306, t, "")));
          }
        }
        return t;
      case 0:
        return gc(l, t, t.type, t.pendingProps, e);
      case 1:
        return ((a = t.type), (n = Xe(a, t.pendingProps)), Xo(l, t, a, n, e));
      case 3:
        l: {
          if ((Pl(t, t.stateNode.containerInfo), l === null)) throw Error(d(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          ((n = u.element), Qi(l, t), Pa(t, a, null, e));
          var i = t.memoizedState;
          if (
            ((a = i.cache),
            ie(t, Hl, a),
            a !== u.cache && Bi(t, [Hl], e, !0),
            Ia(),
            (a = i.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: a, isDehydrated: !1, cache: i.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = Qo(l, t, a, e);
              break l;
            } else if (a !== n) {
              ((n = Tt(Error(d(424)), t)), Ja(n), (t = Qo(l, t, a, e)));
              break l;
            } else
              for (
                l = t.stateNode.containerInfo,
                  l.nodeType === 9
                    ? (l = l.body)
                    : (l = l.nodeName === "HTML" ? l.ownerDocument.body : l),
                  El = jt(l.firstChild),
                  wl = t,
                  il = !0,
                  ne = null,
                  _t = !0,
                  e = Bs(t, null, a, e),
                  t.child = e;
                e;
              )
                ((e.flags = (e.flags & -3) | 4096), (e = e.sibling));
          else {
            if ((Re(), a === n)) {
              t = Kt(l, t, e);
              break l;
            }
            kl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          yu(l, t),
          l === null
            ? (e = ad(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = e)
              : il ||
                ((e = t.type),
                (l = t.pendingProps),
                (a = Ru(ll.current).createElement(e)),
                (a[Jl] = t),
                (a[et] = l),
                Fl(a, e, l),
                Xl(a),
                (t.stateNode = a))
            : (t.memoizedState = ad(t.type, l.memoizedProps, t.pendingProps, l.memoizedState)),
          null
        );
      case 27:
        return (
          Ca(t),
          l === null &&
            il &&
            ((a = t.stateNode = ld(t.type, t.pendingProps, ll.current)),
            (wl = t),
            (_t = !0),
            (n = El),
            Se(t.type) ? ((tf = n), (El = jt(a.firstChild))) : (El = n)),
          kl(l, t, t.pendingProps.children, e),
          yu(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            il &&
            ((n = a = El) &&
              ((a = Nm(a, t.type, t.pendingProps, _t)),
              a !== null
                ? ((t.stateNode = a), (wl = t), (El = jt(a.firstChild)), (_t = !1), (n = !0))
                : (n = !1)),
            n || ue(t)),
          Ca(t),
          (n = t.type),
          (u = t.pendingProps),
          (i = l !== null ? l.memoizedProps : null),
          (a = u.children),
          Fc(n, u) ? (a = null) : i !== null && Fc(n, i) && (t.flags |= 32),
          t.memoizedState !== null && ((n = ki(l, t, kh, null, null, e)), (bn._currentValue = n)),
          yu(l, t),
          kl(l, t, a, e),
          t.child
        );
      case 6:
        return (
          l === null &&
            il &&
            ((l = e = El) &&
              ((e = Hm(e, t.pendingProps, _t)),
              e !== null ? ((t.stateNode = e), (wl = t), (El = null), (l = !0)) : (l = !1)),
            l || ue(t)),
          null
        );
      case 13:
        return Zo(l, t, e);
      case 4:
        return (
          Pl(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          l === null ? (t.child = Ge(t, null, a, e)) : kl(l, t, a, e),
          t.child
        );
      case 11:
        return No(l, t, t.type, t.pendingProps, e);
      case 7:
        return (kl(l, t, t.pendingProps, e), t.child);
      case 8:
        return (kl(l, t, t.pendingProps.children, e), t.child);
      case 12:
        return (kl(l, t, t.pendingProps.children, e), t.child);
      case 10:
        return ((a = t.pendingProps), ie(t, t.type, a.value), kl(l, t, a.children, e), t.child);
      case 9:
        return (
          (n = t.type._context),
          (a = t.pendingProps.children),
          He(t),
          (n = Wl(n)),
          (a = a(n)),
          (t.flags |= 1),
          kl(l, t, a, e),
          t.child
        );
      case 14:
        return Ho(l, t, t.type, t.pendingProps, e);
      case 15:
        return Bo(l, t, t.type, t.pendingProps, e);
      case 19:
        return Ko(l, t, e);
      case 31:
        return am(l, t, e);
      case 22:
        return qo(l, t, e, t.pendingProps);
      case 24:
        return (
          He(t),
          (a = Wl(Hl)),
          l === null
            ? ((n = Gi()),
              n === null &&
                ((n = Tl),
                (u = qi()),
                (n.pooledCache = u),
                u.refCount++,
                u !== null && (n.pooledCacheLanes |= e),
                (n = u)),
              (t.memoizedState = { parent: a, cache: n }),
              Xi(t),
              ie(t, Hl, n))
            : ((l.lanes & e) !== 0 && (Qi(l, t), Pa(t, null, null, e), Ia()),
              (n = l.memoizedState),
              (u = t.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (t.memoizedState = n),
                  t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n),
                  ie(t, Hl, a))
                : ((a = u.cache), ie(t, Hl, a), a !== n.cache && Bi(t, [Hl], e, !0))),
          kl(l, t, t.pendingProps.children, e),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(d(156, t.tag));
  }
  function Jt(l) {
    l.flags |= 4;
  }
  function zc(l, t, e, a, n) {
    if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
      if (((l.flags |= 16777216), (n & 335544128) === n))
        if (l.stateNode.complete) l.flags |= 8192;
        else if (Sr()) l.flags |= 8192;
        else throw ((Ye = tu), Li);
    } else l.flags &= -16777217;
  }
  function wo(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) l.flags &= -16777217;
    else if (((l.flags |= 16777216), !fd(t)))
      if (Sr()) l.flags |= 8192;
      else throw ((Ye = tu), Li);
  }
  function pu(l, t) {
    (t !== null && (l.flags |= 4),
      l.flags & 16384 && ((t = l.tag !== 22 ? _f() : 536870912), (l.lanes |= t), (Sa |= t)));
  }
  function un(l, t) {
    if (!il)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var e = null; t !== null; ) (t.alternate !== null && (e = t), (t = t.sibling));
          e === null ? (l.tail = null) : (e.sibling = null);
          break;
        case "collapsed":
          e = l.tail;
          for (var a = null; e !== null; ) (e.alternate !== null && (a = e), (e = e.sibling));
          a === null
            ? t || l.tail === null
              ? (l.tail = null)
              : (l.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function _l(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      e = 0,
      a = 0;
    if (t)
      for (var n = l.child; n !== null; )
        ((e |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 65011712),
          (a |= n.flags & 65011712),
          (n.return = l),
          (n = n.sibling));
    else
      for (n = l.child; n !== null; )
        ((e |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = l),
          (n = n.sibling));
    return ((l.subtreeFlags |= a), (l.childLanes = e), t);
  }
  function um(l, t, e) {
    var a = t.pendingProps;
    switch ((Di(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (_l(t), null);
      case 1:
        return (_l(t), null);
      case 3:
        return (
          (e = t.stateNode),
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Qt(Hl),
          Cl(),
          e.pendingContext && ((e.context = e.pendingContext), (e.pendingContext = null)),
          (l === null || l.child === null) &&
            (ia(t)
              ? Jt(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Ri())),
          _l(t),
          null
        );
      case 26:
        var n = t.type,
          u = t.memoizedState;
        return (
          l === null
            ? (Jt(t), u !== null ? (_l(t), wo(t, u)) : (_l(t), zc(t, n, null, a, e)))
            : u
              ? u !== l.memoizedState
                ? (Jt(t), _l(t), wo(t, u))
                : (_l(t), (t.flags &= -16777217))
              : ((l = l.memoizedProps), l !== a && Jt(t), _l(t), zc(t, n, l, a, e)),
          null
        );
      case 27:
        if ((On(t), (e = ll.current), (n = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== a && Jt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(d(166));
            return (_l(t), null);
          }
          ((l = N.current), ia(t) ? _s(t) : ((l = ld(n, a, e)), (t.stateNode = l), Jt(t)));
        }
        return (_l(t), null);
      case 5:
        if ((On(t), (n = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== a && Jt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(d(166));
            return (_l(t), null);
          }
          if (((u = N.current), ia(t))) _s(t);
          else {
            var i = Ru(ll.current);
            switch (u) {
              case 1:
                u = i.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                u = i.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    u = i.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    u = i.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                    break;
                  case "script":
                    ((u = i.createElement("div")),
                      (u.innerHTML = "<script><\/script>"),
                      (u = u.removeChild(u.firstChild)));
                    break;
                  case "select":
                    ((u =
                      typeof a.is == "string"
                        ? i.createElement("select", { is: a.is })
                        : i.createElement("select")),
                      a.multiple ? (u.multiple = !0) : a.size && (u.size = a.size));
                    break;
                  default:
                    u =
                      typeof a.is == "string"
                        ? i.createElement(n, { is: a.is })
                        : i.createElement(n);
                }
            }
            ((u[Jl] = t), (u[et] = a));
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6) u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                ((i.child.return = i), (i = i.child));
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t) break l;
                i = i.return;
              }
              ((i.sibling.return = i.return), (i = i.sibling));
            }
            t.stateNode = u;
            l: switch ((Fl(u, n, a), n)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && Jt(t);
          }
        }
        return (_l(t), zc(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e), null);
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Jt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(d(166));
          if (((l = ll.current), ia(t))) {
            if (((l = t.stateNode), (e = t.memoizedProps), (a = null), (n = wl), n !== null))
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            ((l[Jl] = t),
              (l = !!(
                l.nodeValue === e ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                Zr(l.nodeValue, e)
              )),
              l || ue(t, !0));
          } else ((l = Ru(l).createTextNode(a)), (l[Jl] = t), (t.stateNode = l));
        }
        return (_l(t), null);
      case 31:
        if (((e = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((a = ia(t)), e !== null)) {
            if (l === null) {
              if (!a) throw Error(d(318));
              if (((l = t.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
                throw Error(d(557));
              l[Jl] = t;
            } else (Re(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (_l(t), (l = !1));
          } else
            ((e = Ri()),
              l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e),
              (l = !0));
          if (!l) return t.flags & 256 ? (gt(t), t) : (gt(t), null);
          if ((t.flags & 128) !== 0) throw Error(d(558));
        }
        return (_l(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          l === null || (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((n = ia(t)), a !== null && a.dehydrated !== null)) {
            if (l === null) {
              if (!n) throw Error(d(318));
              if (((n = t.memoizedState), (n = n !== null ? n.dehydrated : null), !n))
                throw Error(d(317));
              n[Jl] = t;
            } else (Re(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4));
            (_l(t), (n = !1));
          } else
            ((n = Ri()),
              l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return t.flags & 256 ? (gt(t), t) : (gt(t), null);
        }
        return (
          gt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = e), t)
            : ((e = a !== null),
              (l = l !== null && l.memoizedState !== null),
              e &&
                ((a = t.child),
                (n = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (n = a.alternate.memoizedState.cachePool.pool),
                (u = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (u = a.memoizedState.cachePool.pool),
                u !== n && (a.flags |= 2048)),
              e !== l && e && (t.child.flags |= 8192),
              pu(t, t.updateQueue),
              _l(t),
              null)
        );
      case 4:
        return (Cl(), l === null && Kc(t.stateNode.containerInfo), _l(t), null);
      case 10:
        return (Qt(t.type), _l(t), null);
      case 19:
        if ((E(Dl), (a = t.memoizedState), a === null)) return (_l(t), null);
        if (((n = (t.flags & 128) !== 0), (u = a.rendering), u === null))
          if (n) un(a, !1);
          else {
            if (Ol !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null; ) {
                if (((u = uu(l)), u !== null)) {
                  for (
                    t.flags |= 128,
                      un(a, !1),
                      l = u.updateQueue,
                      t.updateQueue = l,
                      pu(t, l),
                      t.subtreeFlags = 0,
                      l = e,
                      e = t.child;
                    e !== null;
                  )
                    (bs(e, l), (e = e.sibling));
                  return (D(Dl, (Dl.current & 1) | 2), il && Lt(t, a.treeForkCount), t.child);
                }
                l = l.sibling;
              }
            a.tail !== null &&
              st() > zu &&
              ((t.flags |= 128), (n = !0), un(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!n)
            if (((l = uu(u)), l !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                pu(t, l),
                un(a, !0),
                a.tail === null && a.tailMode === "hidden" && !u.alternate && !il)
              )
                return (_l(t), null);
            } else
              2 * st() - a.renderingStartTime > zu &&
                e !== 536870912 &&
                ((t.flags |= 128), (n = !0), un(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((l = a.last), l !== null ? (l.sibling = u) : (t.child = u), (a.last = u));
        }
        return a.tail !== null
          ? ((l = a.tail),
            (a.rendering = l),
            (a.tail = l.sibling),
            (a.renderingStartTime = st()),
            (l.sibling = null),
            (e = Dl.current),
            D(Dl, n ? (e & 1) | 2 : e & 1),
            il && Lt(t, a.treeForkCount),
            l)
          : (_l(t), null);
      case 22:
      case 23:
        return (
          gt(t),
          Ji(),
          (a = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (e & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (_l(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : _l(t),
          (e = t.updateQueue),
          e !== null && pu(t, e.retryQueue),
          (e = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (e = l.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== e && (t.flags |= 2048),
          l !== null && E(Be),
          null
        );
      case 24:
        return (
          (e = null),
          l !== null && (e = l.memoizedState.cache),
          t.memoizedState.cache !== e && (t.flags |= 2048),
          Qt(Hl),
          _l(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(d(156, t.tag));
  }
  function im(l, t) {
    switch ((Di(t), t.tag)) {
      case 1:
        return ((l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null);
      case 3:
        return (
          Qt(Hl),
          Cl(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 26:
      case 27:
      case 5:
        return (On(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((gt(t), t.alternate === null)) throw Error(d(340));
          Re();
        }
        return ((l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null);
      case 13:
        if ((gt(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)) {
          if (t.alternate === null) throw Error(d(340));
          Re();
        }
        return ((l = t.flags), l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null);
      case 19:
        return (E(Dl), null);
      case 4:
        return (Cl(), null);
      case 10:
        return (Qt(t.type), null);
      case 22:
      case 23:
        return (
          gt(t),
          Ji(),
          l !== null && E(Be),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return (Qt(Hl), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Wo(l, t) {
    switch ((Di(t), t.tag)) {
      case 3:
        (Qt(Hl), Cl());
        break;
      case 26:
      case 27:
      case 5:
        On(t);
        break;
      case 4:
        Cl();
        break;
      case 31:
        t.memoizedState !== null && gt(t);
        break;
      case 13:
        gt(t);
        break;
      case 19:
        E(Dl);
        break;
      case 10:
        Qt(t.type);
        break;
      case 22:
      case 23:
        (gt(t), Ji(), l !== null && E(Be));
        break;
      case 24:
        Qt(Hl);
    }
  }
  function cn(l, t) {
    try {
      var e = t.updateQueue,
        a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var u = e.create,
              i = e.inst;
            ((a = u()), (i.destroy = a));
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (c) {
      gl(t, t.return, c);
    }
  }
  function de(l, t, e) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst,
              c = i.destroy;
            if (c !== void 0) {
              ((i.destroy = void 0), (n = t));
              var f = e,
                y = c;
              try {
                y();
              } catch (b) {
                gl(n, f, b);
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (b) {
      gl(t, t.return, b);
    }
  }
  function ko(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        Ys(t, e);
      } catch (a) {
        gl(l, l.return, a);
      }
    }
  }
  function Fo(l, t, e) {
    ((e.props = Xe(l.type, l.memoizedProps)), (e.state = l.memoizedState));
    try {
      e.componentWillUnmount();
    } catch (a) {
      gl(l, t, a);
    }
  }
  function fn(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? (l.refCleanup = e(a)) : (e.current = a);
      }
    } catch (n) {
      gl(l, t, n);
    }
  }
  function Nt(l, t) {
    var e = l.ref,
      a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          gl(l, t, n);
        } finally {
          ((l.refCleanup = null), (l = l.alternate), l != null && (l.refCleanup = null));
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          gl(l, t, n);
        }
      else e.current = null;
  }
  function $o(l) {
    var t = l.type,
      e = l.memoizedProps,
      a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? (a.src = e.src) : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (n) {
      gl(l, l.return, n);
    }
  }
  function Ec(l, t, e) {
    try {
      var a = l.stateNode;
      (Mm(a, l.type, e, t), (a[et] = t));
    } catch (n) {
      gl(l, l.return, n);
    }
  }
  function Io(l) {
    return (
      l.tag === 5 || l.tag === 3 || l.tag === 26 || (l.tag === 27 && Se(l.type)) || l.tag === 4
    );
  }
  function _c(l) {
    l: for (;;) {
      for (; l.sibling === null; ) {
        if (l.return === null || Io(l.return)) return null;
        l = l.return;
      }
      for (
        l.sibling.return = l.return, l = l.sibling;
        l.tag !== 5 && l.tag !== 6 && l.tag !== 18;
      ) {
        if ((l.tag === 27 && Se(l.type)) || l.flags & 2 || l.child === null || l.tag === 4)
          continue l;
        ((l.child.return = l), (l = l.child));
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ac(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      ((l = l.stateNode),
        t
          ? (e.nodeType === 9
              ? e.body
              : e.nodeName === "HTML"
                ? e.ownerDocument.body
                : e
            ).insertBefore(l, t)
          : ((t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e),
            t.appendChild(l),
            (e = e._reactRootContainer),
            e != null || t.onclick !== null || (t.onclick = qt)));
    else if (
      a !== 4 &&
      (a === 27 && Se(l.type) && ((e = l.stateNode), (t = null)), (l = l.child), l !== null)
    )
      for (Ac(l, t, e), l = l.sibling; l !== null; ) (Ac(l, t, e), (l = l.sibling));
  }
  function Su(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6) ((l = l.stateNode), t ? e.insertBefore(l, t) : e.appendChild(l));
    else if (a !== 4 && (a === 27 && Se(l.type) && (e = l.stateNode), (l = l.child), l !== null))
      for (Su(l, t, e), l = l.sibling; l !== null; ) (Su(l, t, e), (l = l.sibling));
  }
  function Po(l) {
    var t = l.stateNode,
      e = l.memoizedProps;
    try {
      for (var a = l.type, n = t.attributes; n.length; ) t.removeAttributeNode(n[0]);
      (Fl(t, a, e), (t[Jl] = l), (t[et] = e));
    } catch (u) {
      gl(l, l.return, u);
    }
  }
  var wt = !1,
    Yl = !1,
    jc = !1,
    lr = typeof WeakSet == "function" ? WeakSet : Set,
    Ql = null;
  function cm(l, t) {
    if (((l = l.containerInfo), (Wc = Lu), (l = rs(l)), bi(l))) {
      if ("selectionStart" in l) var e = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          e = ((e = l.ownerDocument) && e.defaultView) || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var n = a.anchorOffset,
              u = a.focusNode;
            a = a.focusOffset;
            try {
              (e.nodeType, u.nodeType);
            } catch {
              e = null;
              break l;
            }
            var i = 0,
              c = -1,
              f = -1,
              y = 0,
              b = 0,
              z = l,
              v = null;
            t: for (;;) {
              for (
                var p;
                z !== e || (n !== 0 && z.nodeType !== 3) || (c = i + n),
                  z !== u || (a !== 0 && z.nodeType !== 3) || (f = i + a),
                  z.nodeType === 3 && (i += z.nodeValue.length),
                  (p = z.firstChild) !== null;
              )
                ((v = z), (z = p));
              for (;;) {
                if (z === l) break t;
                if (
                  (v === e && ++y === n && (c = i),
                  v === u && ++b === a && (f = i),
                  (p = z.nextSibling) !== null)
                )
                  break;
                ((z = v), (v = z.parentNode));
              }
              z = p;
            }
            e = c === -1 || f === -1 ? null : { start: c, end: f };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (kc = { focusedElem: l, selectionRange: e }, Lu = !1, Ql = t; Ql !== null; )
      if (((t = Ql), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null))
        ((l.return = t), (Ql = l));
      else
        for (; Ql !== null; ) {
          switch (((t = Ql), (u = t.alternate), (l = t.flags), t.tag)) {
            case 0:
              if (
                (l & 4) !== 0 &&
                ((l = t.updateQueue), (l = l !== null ? l.events : null), l !== null)
              )
                for (e = 0; e < l.length; e++) ((n = l[e]), (n.ref.impl = n.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && u !== null) {
                ((l = void 0),
                  (e = t),
                  (n = u.memoizedProps),
                  (u = u.memoizedState),
                  (a = e.stateNode));
                try {
                  var R = Xe(e.type, n);
                  ((l = a.getSnapshotBeforeUpdate(R, u)),
                    (a.__reactInternalSnapshotBeforeUpdate = l));
                } catch (V) {
                  gl(e, e.return, V);
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (((l = t.stateNode.containerInfo), (e = l.nodeType), e === 9)) Ic(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Ic(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(d(163));
          }
          if (((l = t.sibling), l !== null)) {
            ((l.return = t.return), (Ql = l));
            break;
          }
          Ql = t.return;
        }
  }
  function tr(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (kt(l, e), a & 4 && cn(5, e));
        break;
      case 1:
        if ((kt(l, e), a & 4))
          if (((l = e.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (i) {
              gl(e, e.return, i);
            }
          else {
            var n = Xe(e.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(n, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (i) {
              gl(e, e.return, i);
            }
          }
        (a & 64 && ko(e), a & 512 && fn(e, e.return));
        break;
      case 3:
        if ((kt(l, e), a & 64 && ((l = e.updateQueue), l !== null))) {
          if (((t = null), e.child !== null))
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            Ys(l, t);
          } catch (i) {
            gl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Po(e);
      case 26:
      case 5:
        (kt(l, e), t === null && a & 4 && $o(e), a & 512 && fn(e, e.return));
        break;
      case 12:
        kt(l, e);
        break;
      case 31:
        (kt(l, e), a & 4 && nr(l, e));
        break;
      case 13:
        (kt(l, e),
          a & 4 && ur(l, e),
          a & 64 &&
            ((l = e.memoizedState),
            l !== null && ((l = l.dehydrated), l !== null && ((e = ym.bind(null, e)), Bm(l, e)))));
        break;
      case 22:
        if (((a = e.memoizedState !== null || wt), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || Yl), (n = wt));
          var u = Yl;
          ((wt = a),
            (Yl = t) && !u ? Ft(l, e, (e.subtreeFlags & 8772) !== 0) : kt(l, e),
            (wt = n),
            (Yl = u));
        }
        break;
      case 30:
        break;
      default:
        kt(l, e);
    }
  }
  function er(l) {
    var t = l.alternate;
    (t !== null && ((l.alternate = null), er(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && ai(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null));
  }
  var jl = null,
    nt = !1;
  function Wt(l, t, e) {
    for (e = e.child; e !== null; ) (ar(l, t, e), (e = e.sibling));
  }
  function ar(l, t, e) {
    if (ot && typeof ot.onCommitFiberUnmount == "function")
      try {
        ot.onCommitFiberUnmount(Da, e);
      } catch {}
    switch (e.tag) {
      case 26:
        (Yl || Nt(e, t),
          Wt(l, t, e),
          e.memoizedState
            ? e.memoizedState.count--
            : e.stateNode && ((e = e.stateNode), e.parentNode.removeChild(e)));
        break;
      case 27:
        Yl || Nt(e, t);
        var a = jl,
          n = nt;
        (Se(e.type) && ((jl = e.stateNode), (nt = !1)),
          Wt(l, t, e),
          vn(e.stateNode),
          (jl = a),
          (nt = n));
        break;
      case 5:
        Yl || Nt(e, t);
      case 6:
        if (((a = jl), (n = nt), (jl = null), Wt(l, t, e), (jl = a), (nt = n), jl !== null))
          if (nt)
            try {
              (jl.nodeType === 9
                ? jl.body
                : jl.nodeName === "HTML"
                  ? jl.ownerDocument.body
                  : jl
              ).removeChild(e.stateNode);
            } catch (u) {
              gl(e, t, u);
            }
          else
            try {
              jl.removeChild(e.stateNode);
            } catch (u) {
              gl(e, t, u);
            }
        break;
      case 18:
        jl !== null &&
          (nt
            ? ((l = jl),
              kr(
                l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
                e.stateNode,
              ),
              ja(l))
            : kr(jl, e.stateNode));
        break;
      case 4:
        ((a = jl),
          (n = nt),
          (jl = e.stateNode.containerInfo),
          (nt = !0),
          Wt(l, t, e),
          (jl = a),
          (nt = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (de(2, e, t), Yl || de(4, e, t), Wt(l, t, e));
        break;
      case 1:
        (Yl ||
          (Nt(e, t), (a = e.stateNode), typeof a.componentWillUnmount == "function" && Fo(e, t, a)),
          Wt(l, t, e));
        break;
      case 21:
        Wt(l, t, e);
        break;
      case 22:
        ((Yl = (a = Yl) || e.memoizedState !== null), Wt(l, t, e), (Yl = a));
        break;
      default:
        Wt(l, t, e);
    }
  }
  function nr(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
    ) {
      l = l.dehydrated;
      try {
        ja(l);
      } catch (e) {
        gl(t, t.return, e);
      }
    }
  }
  function ur(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate),
      l !== null && ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        ja(l);
      } catch (e) {
        gl(t, t.return, e);
      }
  }
  function fm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return (t === null && (t = l.stateNode = new lr()), t);
      case 22:
        return (
          (l = l.stateNode),
          (t = l._retryCache),
          t === null && (t = l._retryCache = new lr()),
          t
        );
      default:
        throw Error(d(435, l.tag));
    }
  }
  function bu(l, t) {
    var e = fm(l);
    t.forEach(function (a) {
      if (!e.has(a)) {
        e.add(a);
        var n = vm.bind(null, l, a);
        a.then(n, n);
      }
    });
  }
  function ut(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a],
          u = l,
          i = t,
          c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (Se(c.type)) {
                ((jl = c.stateNode), (nt = !1));
                break l;
              }
              break;
            case 5:
              ((jl = c.stateNode), (nt = !1));
              break l;
            case 3:
            case 4:
              ((jl = c.stateNode.containerInfo), (nt = !0));
              break l;
          }
          c = c.return;
        }
        if (jl === null) throw Error(d(160));
        (ar(u, i, n),
          (jl = null),
          (nt = !1),
          (u = n.alternate),
          u !== null && (u.return = null),
          (n.return = null));
      }
    if (t.subtreeFlags & 13886) for (t = t.child; t !== null; ) (ir(t, l), (t = t.sibling));
  }
  var Ct = null;
  function ir(l, t) {
    var e = l.alternate,
      a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ut(t, l), it(l), a & 4 && (de(3, l, l.return), cn(3, l), de(5, l, l.return)));
        break;
      case 1:
        (ut(t, l),
          it(l),
          a & 512 && (Yl || e === null || Nt(e, e.return)),
          a & 64 &&
            wt &&
            ((l = l.updateQueue),
            l !== null &&
              ((a = l.callbacks),
              a !== null &&
                ((e = l.shared.hiddenCallbacks),
                (l.shared.hiddenCallbacks = e === null ? a : e.concat(a))))));
        break;
      case 26:
        var n = Ct;
        if ((ut(t, l), it(l), a & 512 && (Yl || e === null || Nt(e, e.return)), a & 4)) {
          var u = e !== null ? e.memoizedState : null;
          if (((a = l.memoizedState), e === null))
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  ((a = l.type), (e = l.memoizedProps), (n = n.ownerDocument || n));
                  t: switch (a) {
                    case "title":
                      ((u = n.getElementsByTagName("title")[0]),
                        (!u ||
                          u[Na] ||
                          u[Jl] ||
                          u.namespaceURI === "http://www.w3.org/2000/svg" ||
                          u.hasAttribute("itemprop")) &&
                          ((u = n.createElement(a)),
                          n.head.insertBefore(u, n.querySelector("head > title"))),
                        Fl(u, a, e),
                        (u[Jl] = l),
                        Xl(u),
                        (a = u));
                      break l;
                    case "link":
                      var i = id("link", "href", n).get(a + (e.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (
                            ((u = i[c]),
                            u.getAttribute("href") ===
                              (e.href == null || e.href === "" ? null : e.href) &&
                              u.getAttribute("rel") === (e.rel == null ? null : e.rel) &&
                              u.getAttribute("title") === (e.title == null ? null : e.title) &&
                              u.getAttribute("crossorigin") ===
                                (e.crossOrigin == null ? null : e.crossOrigin))
                          ) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      ((u = n.createElement(a)), Fl(u, a, e), n.head.appendChild(u));
                      break;
                    case "meta":
                      if ((i = id("meta", "content", n).get(a + (e.content || "")))) {
                        for (c = 0; c < i.length; c++)
                          if (
                            ((u = i[c]),
                            u.getAttribute("content") ===
                              (e.content == null ? null : "" + e.content) &&
                              u.getAttribute("name") === (e.name == null ? null : e.name) &&
                              u.getAttribute("property") ===
                                (e.property == null ? null : e.property) &&
                              u.getAttribute("http-equiv") ===
                                (e.httpEquiv == null ? null : e.httpEquiv) &&
                              u.getAttribute("charset") === (e.charSet == null ? null : e.charSet))
                          ) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      ((u = n.createElement(a)), Fl(u, a, e), n.head.appendChild(u));
                      break;
                    default:
                      throw Error(d(468, a));
                  }
                  ((u[Jl] = l), Xl(u), (a = u));
                }
                l.stateNode = a;
              } else cd(n, l.type, l.stateNode);
            else l.stateNode = ud(n, a, l.memoizedProps);
          else
            u !== a
              ? (u === null
                  ? e.stateNode !== null && ((e = e.stateNode), e.parentNode.removeChild(e))
                  : u.count--,
                a === null ? cd(n, l.type, l.stateNode) : ud(n, a, l.memoizedProps))
              : a === null && l.stateNode !== null && Ec(l, l.memoizedProps, e.memoizedProps);
        }
        break;
      case 27:
        (ut(t, l),
          it(l),
          a & 512 && (Yl || e === null || Nt(e, e.return)),
          e !== null && a & 4 && Ec(l, l.memoizedProps, e.memoizedProps));
        break;
      case 5:
        if ((ut(t, l), it(l), a & 512 && (Yl || e === null || Nt(e, e.return)), l.flags & 32)) {
          n = l.stateNode;
          try {
            Fe(n, "");
          } catch (R) {
            gl(l, l.return, R);
          }
        }
        (a & 4 &&
          l.stateNode != null &&
          ((n = l.memoizedProps), Ec(l, n, e !== null ? e.memoizedProps : n)),
          a & 1024 && (jc = !0));
        break;
      case 6:
        if ((ut(t, l), it(l), a & 4)) {
          if (l.stateNode === null) throw Error(d(162));
          ((a = l.memoizedProps), (e = l.stateNode));
          try {
            e.nodeValue = a;
          } catch (R) {
            gl(l, l.return, R);
          }
        }
        break;
      case 3:
        if (
          ((Bu = null),
          (n = Ct),
          (Ct = Nu(t.containerInfo)),
          ut(t, l),
          (Ct = n),
          it(l),
          a & 4 && e !== null && e.memoizedState.isDehydrated)
        )
          try {
            ja(t.containerInfo);
          } catch (R) {
            gl(l, l.return, R);
          }
        jc && ((jc = !1), cr(l));
        break;
      case 4:
        ((a = Ct), (Ct = Nu(l.stateNode.containerInfo)), ut(t, l), it(l), (Ct = a));
        break;
      case 12:
        (ut(t, l), it(l));
        break;
      case 31:
        (ut(t, l),
          it(l),
          a & 4 && ((a = l.updateQueue), a !== null && ((l.updateQueue = null), bu(l, a))));
        break;
      case 13:
        (ut(t, l),
          it(l),
          l.child.flags & 8192 &&
            (l.memoizedState !== null) != (e !== null && e.memoizedState !== null) &&
            (Tu = st()),
          a & 4 && ((a = l.updateQueue), a !== null && ((l.updateQueue = null), bu(l, a))));
        break;
      case 22:
        n = l.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null,
          y = wt,
          b = Yl;
        if (((wt = y || n), (Yl = b || f), ut(t, l), (Yl = b), (wt = y), it(l), a & 8192))
          l: for (
            t = l.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (e === null || f || wt || Yl || Qe(l)),
              e = null,
              t = l;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                f = e = t;
                try {
                  if (((u = f.stateNode), n))
                    ((i = u.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"));
                  else {
                    c = f.stateNode;
                    var z = f.memoizedProps.style,
                      v = z != null && z.hasOwnProperty("display") ? z.display : null;
                    c.style.display = v == null || typeof v == "boolean" ? "" : ("" + v).trim();
                  }
                } catch (R) {
                  gl(f, f.return, R);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = n ? "" : f.memoizedProps;
                } catch (R) {
                  gl(f, f.return, R);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                f = t;
                try {
                  var p = f.stateNode;
                  n ? Fr(p, !0) : Fr(f.stateNode, !1);
                } catch (R) {
                  gl(f, f.return, R);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) || t.memoizedState === null || t === l) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              (e === t && (e = null), (t = t.return));
            }
            (e === t && (e = null), (t.sibling.return = t.return), (t = t.sibling));
          }
        a & 4 &&
          ((a = l.updateQueue),
          a !== null && ((e = a.retryQueue), e !== null && ((a.retryQueue = null), bu(l, e))));
        break;
      case 19:
        (ut(t, l),
          it(l),
          a & 4 && ((a = l.updateQueue), a !== null && ((l.updateQueue = null), bu(l, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (ut(t, l), it(l));
    }
  }
  function it(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (Io(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(d(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode,
              u = _c(l);
            Su(l, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (Fe(i, ""), (e.flags &= -33));
            var c = _c(l);
            Su(l, c, i);
            break;
          case 3:
          case 4:
            var f = e.stateNode.containerInfo,
              y = _c(l);
            Ac(l, y, f);
            break;
          default:
            throw Error(d(161));
        }
      } catch (b) {
        gl(l, l.return, b);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function cr(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        (cr(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), (l = l.sibling));
      }
  }
  function kt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (tr(l, t.alternate, t), (t = t.sibling));
  }
  function Qe(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (de(4, t, t.return), Qe(t));
          break;
        case 1:
          Nt(t, t.return);
          var e = t.stateNode;
          (typeof e.componentWillUnmount == "function" && Fo(t, t.return, e), Qe(t));
          break;
        case 27:
          vn(t.stateNode);
        case 26:
        case 5:
          (Nt(t, t.return), Qe(t));
          break;
        case 22:
          t.memoizedState === null && Qe(t);
          break;
        case 30:
          Qe(t);
          break;
        default:
          Qe(t);
      }
      l = l.sibling;
    }
  }
  function Ft(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        n = l,
        u = t,
        i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (Ft(n, u, e), cn(4, u));
          break;
        case 1:
          if ((Ft(n, u, e), (a = u), (n = a.stateNode), typeof n.componentDidMount == "function"))
            try {
              n.componentDidMount();
            } catch (y) {
              gl(a, a.return, y);
            }
          if (((a = u), (n = a.updateQueue), n !== null)) {
            var c = a.stateNode;
            try {
              var f = n.shared.hiddenCallbacks;
              if (f !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < f.length; n++) qs(f[n], c);
            } catch (y) {
              gl(a, a.return, y);
            }
          }
          (e && i & 64 && ko(u), fn(u, u.return));
          break;
        case 27:
          Po(u);
        case 26:
        case 5:
          (Ft(n, u, e), e && a === null && i & 4 && $o(u), fn(u, u.return));
          break;
        case 12:
          Ft(n, u, e);
          break;
        case 31:
          (Ft(n, u, e), e && i & 4 && nr(n, u));
          break;
        case 13:
          (Ft(n, u, e), e && i & 4 && ur(n, u));
          break;
        case 22:
          (u.memoizedState === null && Ft(n, u, e), fn(u, u.return));
          break;
        case 30:
          break;
        default:
          Ft(n, u, e);
      }
      t = t.sibling;
    }
  }
  function Mc(l, t) {
    var e = null;
    (l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (e = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
      l !== e && (l != null && l.refCount++, e != null && wa(e)));
  }
  function Oc(l, t) {
    ((l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && wa(l)));
  }
  function Dt(l, t, e, a) {
    if (t.subtreeFlags & 10256) for (t = t.child; t !== null; ) (fr(l, t, e, a), (t = t.sibling));
  }
  function fr(l, t, e, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Dt(l, t, e, a), n & 2048 && cn(9, t));
        break;
      case 1:
        Dt(l, t, e, a);
        break;
      case 3:
        (Dt(l, t, e, a),
          n & 2048 &&
            ((l = null),
            t.alternate !== null && (l = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== l && (t.refCount++, l != null && wa(l))));
        break;
      case 12:
        if (n & 2048) {
          (Dt(l, t, e, a), (l = t.stateNode));
          try {
            var u = t.memoizedProps,
              i = u.id,
              c = u.onPostCommit;
            typeof c == "function" &&
              c(i, t.alternate === null ? "mount" : "update", l.passiveEffectDuration, -0);
          } catch (f) {
            gl(t, t.return, f);
          }
        } else Dt(l, t, e, a);
        break;
      case 31:
        Dt(l, t, e, a);
        break;
      case 13:
        Dt(l, t, e, a);
        break;
      case 23:
        break;
      case 22:
        ((u = t.stateNode),
          (i = t.alternate),
          t.memoizedState !== null
            ? u._visibility & 2
              ? Dt(l, t, e, a)
              : sn(l, t)
            : u._visibility & 2
              ? Dt(l, t, e, a)
              : ((u._visibility |= 2), ya(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || !1)),
          n & 2048 && Mc(i, t));
        break;
      case 24:
        (Dt(l, t, e, a), n & 2048 && Oc(t.alternate, t));
        break;
      default:
        Dt(l, t, e, a);
    }
  }
  function ya(l, t, e, a, n) {
    for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = l,
        i = t,
        c = e,
        f = a,
        y = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (ya(u, i, c, f, n), cn(8, i));
          break;
        case 23:
          break;
        case 22:
          var b = i.stateNode;
          (i.memoizedState !== null
            ? b._visibility & 2
              ? ya(u, i, c, f, n)
              : sn(u, i)
            : ((b._visibility |= 2), ya(u, i, c, f, n)),
            n && y & 2048 && Mc(i.alternate, i));
          break;
        case 24:
          (ya(u, i, c, f, n), n && y & 2048 && Oc(i.alternate, i));
          break;
        default:
          ya(u, i, c, f, n);
      }
      t = t.sibling;
    }
  }
  function sn(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l,
          a = t,
          n = a.flags;
        switch (a.tag) {
          case 22:
            (sn(e, a), n & 2048 && Mc(a.alternate, a));
            break;
          case 24:
            (sn(e, a), n & 2048 && Oc(a.alternate, a));
            break;
          default:
            sn(e, a);
        }
        t = t.sibling;
      }
  }
  var on = 8192;
  function va(l, t, e) {
    if (l.subtreeFlags & on) for (l = l.child; l !== null; ) (sr(l, t, e), (l = l.sibling));
  }
  function sr(l, t, e) {
    switch (l.tag) {
      case 26:
        (va(l, t, e),
          l.flags & on && l.memoizedState !== null && Wm(e, Ct, l.memoizedState, l.memoizedProps));
        break;
      case 5:
        va(l, t, e);
        break;
      case 3:
      case 4:
        var a = Ct;
        ((Ct = Nu(l.stateNode.containerInfo)), va(l, t, e), (Ct = a));
        break;
      case 22:
        l.memoizedState === null &&
          ((a = l.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = on), (on = 16777216), va(l, t, e), (on = a))
            : va(l, t, e));
        break;
      default:
        va(l, t, e);
    }
  }
  function or(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do ((t = l.sibling), (l.sibling = null), (l = t));
      while (l !== null);
    }
  }
  function rn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          ((Ql = a), dr(a, l));
        }
      or(l);
    }
    if (l.subtreeFlags & 10256) for (l = l.child; l !== null; ) (rr(l), (l = l.sibling));
  }
  function rr(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (rn(l), l.flags & 2048 && de(9, l, l.return));
        break;
      case 3:
        rn(l);
        break;
      case 12:
        rn(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), xu(l))
          : rn(l);
        break;
      default:
        rn(l);
    }
  }
  function xu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          ((Ql = a), dr(a, l));
        }
      or(l);
    }
    for (l = l.child; l !== null; ) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          (de(8, t, t.return), xu(t));
          break;
        case 22:
          ((e = t.stateNode), e._visibility & 2 && ((e._visibility &= -3), xu(t)));
          break;
        default:
          xu(t);
      }
      l = l.sibling;
    }
  }
  function dr(l, t) {
    for (; Ql !== null; ) {
      var e = Ql;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          de(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          wa(e.memoizedState.cache);
      }
      if (((a = e.child), a !== null)) ((a.return = e), (Ql = a));
      else
        l: for (e = l; Ql !== null; ) {
          a = Ql;
          var n = a.sibling,
            u = a.return;
          if ((er(a), a === e)) {
            Ql = null;
            break l;
          }
          if (n !== null) {
            ((n.return = u), (Ql = n));
            break l;
          }
          Ql = u;
        }
    }
  }
  var sm = {
      getCacheForType: function (l) {
        var t = Wl(Hl),
          e = t.data.get(l);
        return (e === void 0 && ((e = l()), t.data.set(l, e)), e);
      },
      cacheSignal: function () {
        return Wl(Hl).controller.signal;
      },
    },
    om = typeof WeakMap == "function" ? WeakMap : Map,
    dl = 0,
    Tl = null,
    tl = null,
    al = 0,
    ml = 0,
    yt = null,
    he = !1,
    pa = !1,
    Cc = !1,
    $t = 0,
    Ol = 0,
    me = 0,
    Ze = 0,
    Dc = 0,
    vt = 0,
    Sa = 0,
    dn = null,
    ct = null,
    Uc = !1,
    Tu = 0,
    hr = 0,
    zu = 1 / 0,
    Eu = null,
    ge = null,
    Gl = 0,
    ye = null,
    ba = null,
    It = 0,
    Rc = 0,
    Nc = null,
    mr = null,
    hn = 0,
    Hc = null;
  function pt() {
    return (dl & 2) !== 0 && al !== 0 ? al & -al : x.T !== null ? Xc() : Of();
  }
  function gr() {
    if (vt === 0)
      if ((al & 536870912) === 0 || il) {
        var l = Un;
        ((Un <<= 1), (Un & 3932160) === 0 && (Un = 262144), (vt = l));
      } else vt = 536870912;
    return ((l = mt.current), l !== null && (l.flags |= 32), vt);
  }
  function ft(l, t, e) {
    (((l === Tl && (ml === 2 || ml === 9)) || l.cancelPendingCommit !== null) &&
      (xa(l, 0), ve(l, al, vt, !1)),
      Ra(l, e),
      ((dl & 2) === 0 || l !== Tl) &&
        (l === Tl && ((dl & 2) === 0 && (Ze |= e), Ol === 4 && ve(l, al, vt, !1)), Ht(l)));
  }
  function yr(l, t, e) {
    if ((dl & 6) !== 0) throw Error(d(327));
    var a = (!e && (t & 127) === 0 && (t & l.expiredLanes) === 0) || Ua(l, t),
      n = a ? hm(l, t) : qc(l, t, !0),
      u = a;
    do {
      if (n === 0) {
        pa && !a && ve(l, t, 0, !1);
        break;
      } else {
        if (((e = l.current.alternate), u && !rm(e))) {
          ((n = qc(l, t, !1)), (u = !1));
          continue;
        }
        if (n === 2) {
          if (((u = t), l.errorRecoveryDisabledLanes & u)) var i = 0;
          else
            ((i = l.pendingLanes & -536870913), (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0));
          if (i !== 0) {
            t = i;
            l: {
              var c = l;
              n = dn;
              var f = c.current.memoizedState.isDehydrated;
              if ((f && (xa(c, i).flags |= 256), (i = qc(c, i, !1)), i !== 2)) {
                if (Cc && !f) {
                  ((c.errorRecoveryDisabledLanes |= u), (Ze |= u), (n = 4));
                  break l;
                }
                ((u = ct), (ct = n), u !== null && (ct === null ? (ct = u) : ct.push.apply(ct, u)));
              }
              n = i;
            }
            if (((u = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (xa(l, 0), ve(l, t, 0, !0));
          break;
        }
        l: {
          switch (((a = l), (u = n), u)) {
            case 0:
            case 1:
              throw Error(d(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ve(a, t, vt, !he);
              break l;
            case 2:
              ct = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(d(329));
          }
          if ((t & 62914560) === t && ((n = Tu + 300 - st()), 10 < n)) {
            if ((ve(a, t, vt, !he), Nn(a, 0, !0) !== 0)) break l;
            ((It = t),
              (a.timeoutHandle = wr(
                vr.bind(null, a, e, ct, Eu, Uc, t, vt, Ze, Sa, he, u, "Throttled", -0, 0),
                n,
              )));
            break l;
          }
          vr(a, e, ct, Eu, Uc, t, vt, Ze, Sa, he, u, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Ht(l);
  }
  function vr(l, t, e, a, n, u, i, c, f, y, b, z, v, p) {
    if (((l.timeoutHandle = -1), (z = t.subtreeFlags), z & 8192 || (z & 16785408) === 16785408)) {
      ((z = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: qt,
      }),
        sr(t, u, z));
      var R = (u & 62914560) === u ? Tu - st() : (u & 4194048) === u ? hr - st() : 0;
      if (((R = km(z, R)), R !== null)) {
        ((It = u),
          (l.cancelPendingCommit = R(_r.bind(null, l, t, u, e, a, n, i, c, f, b, z, null, v, p))),
          ve(l, u, i, !y));
        return;
      }
    }
    _r(l, t, u, e, a, n, i, c, f);
  }
  function rm(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if (
        (e === 0 || e === 11 || e === 15) &&
        t.flags & 16384 &&
        ((e = t.updateQueue), e !== null && ((e = e.stores), e !== null))
      )
        for (var a = 0; a < e.length; a++) {
          var n = e[a],
            u = n.getSnapshot;
          n = n.value;
          try {
            if (!dt(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (((e = t.child), t.subtreeFlags & 16384 && e !== null)) ((e.return = t), (t = e));
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function ve(l, t, e, a) {
    ((t &= ~Dc),
      (t &= ~Ze),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      a && (l.warmLanes |= t),
      (a = l.expirationTimes));
    for (var n = t; 0 < n; ) {
      var u = 31 - rt(n),
        i = 1 << u;
      ((a[u] = -1), (n &= ~i));
    }
    e !== 0 && Af(l, e, t);
  }
  function _u() {
    return (dl & 6) === 0 ? (mn(0), !1) : !0;
  }
  function Bc() {
    if (tl !== null) {
      if (ml === 0) var l = tl.return;
      else ((l = tl), (Xt = Ne = null), Ii(l), (ra = null), (ka = 0), (l = tl));
      for (; l !== null; ) (Wo(l.alternate, l), (l = l.return));
      tl = null;
    }
  }
  function xa(l, t) {
    var e = l.timeoutHandle;
    (e !== -1 && ((l.timeoutHandle = -1), Dm(e)),
      (e = l.cancelPendingCommit),
      e !== null && ((l.cancelPendingCommit = null), e()),
      (It = 0),
      Bc(),
      (Tl = l),
      (tl = e = Gt(l.current, null)),
      (al = t),
      (ml = 0),
      (yt = null),
      (he = !1),
      (pa = Ua(l, t)),
      (Cc = !1),
      (Sa = vt = Dc = Ze = me = Ol = 0),
      (ct = dn = null),
      (Uc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var n = 31 - rt(a),
          u = 1 << n;
        ((t |= l[n]), (a &= ~u));
      }
    return (($t = t), Jn(), e);
  }
  function pr(l, t) {
    (($ = null),
      (x.H = an),
      t === oa || t === lu
        ? ((t = Rs()), (ml = 3))
        : t === Li
          ? ((t = Rs()), (ml = 4))
          : (ml =
              t === mc
                ? 8
                : t !== null && typeof t == "object" && typeof t.then == "function"
                  ? 6
                  : 1),
      (yt = t),
      tl === null && ((Ol = 1), mu(l, Tt(t, l.current))));
  }
  function Sr() {
    var l = mt.current;
    return l === null
      ? !0
      : (al & 4194048) === al
        ? At === null
        : (al & 62914560) === al || (al & 536870912) !== 0
          ? l === At
          : !1;
  }
  function br() {
    var l = x.H;
    return ((x.H = an), l === null ? an : l);
  }
  function xr() {
    var l = x.A;
    return ((x.A = sm), l);
  }
  function Au() {
    ((Ol = 4),
      he || ((al & 4194048) !== al && mt.current !== null) || (pa = !0),
      ((me & 134217727) === 0 && (Ze & 134217727) === 0) || Tl === null || ve(Tl, al, vt, !1));
  }
  function qc(l, t, e) {
    var a = dl;
    dl |= 2;
    var n = br(),
      u = xr();
    ((Tl !== l || al !== t) && ((Eu = null), xa(l, t)), (t = !1));
    var i = Ol;
    l: do
      try {
        if (ml !== 0 && tl !== null) {
          var c = tl,
            f = yt;
          switch (ml) {
            case 8:
              (Bc(), (i = 6));
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              mt.current === null && (t = !0);
              var y = ml;
              if (((ml = 0), (yt = null), Ta(l, c, f, y), e && pa)) {
                i = 0;
                break l;
              }
              break;
            default:
              ((y = ml), (ml = 0), (yt = null), Ta(l, c, f, y));
          }
        }
        (dm(), (i = Ol));
        break;
      } catch (b) {
        pr(l, b);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (Xt = Ne = null),
      (dl = a),
      (x.H = n),
      (x.A = u),
      tl === null && ((Tl = null), (al = 0), Jn()),
      i
    );
  }
  function dm() {
    for (; tl !== null; ) Tr(tl);
  }
  function hm(l, t) {
    var e = dl;
    dl |= 2;
    var a = br(),
      n = xr();
    Tl !== l || al !== t ? ((Eu = null), (zu = st() + 500), xa(l, t)) : (pa = Ua(l, t));
    l: do
      try {
        if (ml !== 0 && tl !== null) {
          t = tl;
          var u = yt;
          t: switch (ml) {
            case 1:
              ((ml = 0), (yt = null), Ta(l, t, u, 1));
              break;
            case 2:
            case 9:
              if (Ds(u)) {
                ((ml = 0), (yt = null), zr(t));
                break;
              }
              ((t = function () {
                ((ml !== 2 && ml !== 9) || Tl !== l || (ml = 7), Ht(l));
              }),
                u.then(t, t));
              break l;
            case 3:
              ml = 7;
              break l;
            case 4:
              ml = 5;
              break l;
            case 7:
              Ds(u) ? ((ml = 0), (yt = null), zr(t)) : ((ml = 0), (yt = null), Ta(l, t, u, 7));
              break;
            case 5:
              var i = null;
              switch (tl.tag) {
                case 26:
                  i = tl.memoizedState;
                case 5:
                case 27:
                  var c = tl;
                  if (i ? fd(i) : c.stateNode.complete) {
                    ((ml = 0), (yt = null));
                    var f = c.sibling;
                    if (f !== null) tl = f;
                    else {
                      var y = c.return;
                      y !== null ? ((tl = y), ju(y)) : (tl = null);
                    }
                    break t;
                  }
              }
              ((ml = 0), (yt = null), Ta(l, t, u, 5));
              break;
            case 6:
              ((ml = 0), (yt = null), Ta(l, t, u, 6));
              break;
            case 8:
              (Bc(), (Ol = 6));
              break l;
            default:
              throw Error(d(462));
          }
        }
        mm();
        break;
      } catch (b) {
        pr(l, b);
      }
    while (!0);
    return (
      (Xt = Ne = null),
      (x.H = a),
      (x.A = n),
      (dl = e),
      tl !== null ? 0 : ((Tl = null), (al = 0), Jn(), Ol)
    );
  }
  function mm() {
    for (; tl !== null && !qd(); ) Tr(tl);
  }
  function Tr(l) {
    var t = Jo(l.alternate, l, $t);
    ((l.memoizedProps = l.pendingProps), t === null ? ju(l) : (tl = t));
  }
  function zr(l) {
    var t = l,
      e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Lo(e, t, t.pendingProps, t.type, void 0, al);
        break;
      case 11:
        t = Lo(e, t, t.pendingProps, t.type.render, t.ref, al);
        break;
      case 5:
        Ii(t);
      default:
        (Wo(e, t), (t = tl = bs(t, $t)), (t = Jo(e, t, $t)));
    }
    ((l.memoizedProps = l.pendingProps), t === null ? ju(l) : (tl = t));
  }
  function Ta(l, t, e, a) {
    ((Xt = Ne = null), Ii(t), (ra = null), (ka = 0));
    var n = t.return;
    try {
      if (em(l, n, t, e, al)) {
        ((Ol = 1), mu(l, Tt(e, l.current)), (tl = null));
        return;
      }
    } catch (u) {
      if (n !== null) throw ((tl = n), u);
      ((Ol = 1), mu(l, Tt(e, l.current)), (tl = null));
      return;
    }
    t.flags & 32768
      ? (il || a === 1
          ? (l = !0)
          : pa || (al & 536870912) !== 0
            ? (l = !1)
            : ((he = l = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = mt.current), a !== null && a.tag === 13 && (a.flags |= 16384))),
        Er(t, l))
      : ju(t);
  }
  function ju(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Er(t, he);
        return;
      }
      l = t.return;
      var e = um(t.alternate, t, $t);
      if (e !== null) {
        tl = e;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        tl = t;
        return;
      }
      tl = t = l;
    } while (t !== null);
    Ol === 0 && (Ol = 5);
  }
  function Er(l, t) {
    do {
      var e = im(l.alternate, l);
      if (e !== null) {
        ((e.flags &= 32767), (tl = e));
        return;
      }
      if (
        ((e = l.return),
        e !== null && ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        tl = l;
        return;
      }
      tl = l = e;
    } while (l !== null);
    ((Ol = 6), (tl = null));
  }
  function _r(l, t, e, a, n, u, i, c, f) {
    l.cancelPendingCommit = null;
    do Mu();
    while (Gl !== 0);
    if ((dl & 6) !== 0) throw Error(d(327));
    if (t !== null) {
      if (t === l.current) throw Error(d(177));
      if (
        ((u = t.lanes | t.childLanes),
        (u |= _i),
        wd(l, e, u, i, c, f),
        l === Tl && ((tl = Tl = null), (al = 0)),
        (ba = t),
        (ye = l),
        (It = e),
        (Rc = u),
        (Nc = n),
        (mr = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((l.callbackNode = null),
            (l.callbackPriority = 0),
            pm(Cn, function () {
              return (Cr(), null);
            }))
          : ((l.callbackNode = null), (l.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = x.T), (x.T = null), (n = j.p), (j.p = 2), (i = dl), (dl |= 4));
        try {
          cm(l, t, e);
        } finally {
          ((dl = i), (j.p = n), (x.T = a));
        }
      }
      ((Gl = 1), Ar(), jr(), Mr());
    }
  }
  function Ar() {
    if (Gl === 1) {
      Gl = 0;
      var l = ye,
        t = ba,
        e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        ((e = x.T), (x.T = null));
        var a = j.p;
        j.p = 2;
        var n = dl;
        dl |= 4;
        try {
          ir(t, l);
          var u = kc,
            i = rs(l.containerInfo),
            c = u.focusedElem,
            f = u.selectionRange;
          if (i !== c && c && c.ownerDocument && os(c.ownerDocument.documentElement, c)) {
            if (f !== null && bi(c)) {
              var y = f.start,
                b = f.end;
              if ((b === void 0 && (b = y), "selectionStart" in c))
                ((c.selectionStart = y), (c.selectionEnd = Math.min(b, c.value.length)));
              else {
                var z = c.ownerDocument || document,
                  v = (z && z.defaultView) || window;
                if (v.getSelection) {
                  var p = v.getSelection(),
                    R = c.textContent.length,
                    V = Math.min(f.start, R),
                    bl = f.end === void 0 ? V : Math.min(f.end, R);
                  !p.extend && V > bl && ((i = bl), (bl = V), (V = i));
                  var h = ss(c, V),
                    o = ss(c, bl);
                  if (
                    h &&
                    o &&
                    (p.rangeCount !== 1 ||
                      p.anchorNode !== h.node ||
                      p.anchorOffset !== h.offset ||
                      p.focusNode !== o.node ||
                      p.focusOffset !== o.offset)
                  ) {
                    var g = z.createRange();
                    (g.setStart(h.node, h.offset),
                      p.removeAllRanges(),
                      V > bl
                        ? (p.addRange(g), p.extend(o.node, o.offset))
                        : (g.setEnd(o.node, o.offset), p.addRange(g)));
                  }
                }
              }
            }
            for (z = [], p = c; (p = p.parentNode); )
              p.nodeType === 1 && z.push({ element: p, left: p.scrollLeft, top: p.scrollTop });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < z.length; c++) {
              var T = z[c];
              ((T.element.scrollLeft = T.left), (T.element.scrollTop = T.top));
            }
          }
          ((Lu = !!Wc), (kc = Wc = null));
        } finally {
          ((dl = n), (j.p = a), (x.T = e));
        }
      }
      ((l.current = t), (Gl = 2));
    }
  }
  function jr() {
    if (Gl === 2) {
      Gl = 0;
      var l = ye,
        t = ba,
        e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        ((e = x.T), (x.T = null));
        var a = j.p;
        j.p = 2;
        var n = dl;
        dl |= 4;
        try {
          tr(l, t.alternate, t);
        } finally {
          ((dl = n), (j.p = a), (x.T = e));
        }
      }
      Gl = 3;
    }
  }
  function Mr() {
    if (Gl === 4 || Gl === 3) {
      ((Gl = 0), Yd());
      var l = ye,
        t = ba,
        e = It,
        a = mr;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Gl = 5)
        : ((Gl = 0), (ba = ye = null), Or(l, l.pendingLanes));
      var n = l.pendingLanes;
      if (
        (n === 0 && (ge = null),
        ti(e),
        (t = t.stateNode),
        ot && typeof ot.onCommitFiberRoot == "function")
      )
        try {
          ot.onCommitFiberRoot(Da, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = x.T), (n = j.p), (j.p = 2), (x.T = null));
        try {
          for (var u = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            u(c.value, { componentStack: c.stack });
          }
        } finally {
          ((x.T = t), (j.p = n));
        }
      }
      ((It & 3) !== 0 && Mu(),
        Ht(l),
        (n = l.pendingLanes),
        (e & 261930) !== 0 && (n & 42) !== 0 ? (l === Hc ? hn++ : ((hn = 0), (Hc = l))) : (hn = 0),
        mn(0));
    }
  }
  function Or(l, t) {
    (l.pooledCacheLanes &= t) === 0 &&
      ((t = l.pooledCache), t != null && ((l.pooledCache = null), wa(t)));
  }
  function Mu() {
    return (Ar(), jr(), Mr(), Cr());
  }
  function Cr() {
    if (Gl !== 5) return !1;
    var l = ye,
      t = Rc;
    Rc = 0;
    var e = ti(It),
      a = x.T,
      n = j.p;
    try {
      ((j.p = 32 > e ? 32 : e), (x.T = null), (e = Nc), (Nc = null));
      var u = ye,
        i = It;
      if (((Gl = 0), (ba = ye = null), (It = 0), (dl & 6) !== 0)) throw Error(d(331));
      var c = dl;
      if (
        ((dl |= 4),
        rr(u.current),
        fr(u, u.current, i, e),
        (dl = c),
        mn(0, !1),
        ot && typeof ot.onPostCommitFiberRoot == "function")
      )
        try {
          ot.onPostCommitFiberRoot(Da, u);
        } catch {}
      return !0;
    } finally {
      ((j.p = n), (x.T = a), Or(l, t));
    }
  }
  function Dr(l, t, e) {
    ((t = Tt(e, t)),
      (t = hc(l.stateNode, t, 2)),
      (l = se(l, t, 2)),
      l !== null && (Ra(l, 2), Ht(l)));
  }
  function gl(l, t, e) {
    if (l.tag === 3) Dr(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Dr(t, l, e);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" && (ge === null || !ge.has(a)))
          ) {
            ((l = Tt(e, l)),
              (e = Uo(2)),
              (a = se(t, e, 2)),
              a !== null && (Ro(e, a, t, l), Ra(a, 2), Ht(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Yc(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new om();
      var n = new Set();
      a.set(t, n);
    } else ((n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n)));
    n.has(e) || ((Cc = !0), n.add(e), (l = gm.bind(null, l, t, e)), t.then(l, l));
  }
  function gm(l, t, e) {
    var a = l.pingCache;
    (a !== null && a.delete(t),
      (l.pingedLanes |= l.suspendedLanes & e),
      (l.warmLanes &= ~e),
      Tl === l &&
        (al & e) === e &&
        (Ol === 4 || (Ol === 3 && (al & 62914560) === al && 300 > st() - Tu)
          ? (dl & 2) === 0 && xa(l, 0)
          : (Dc |= e),
        Sa === al && (Sa = 0)),
      Ht(l));
  }
  function Ur(l, t) {
    (t === 0 && (t = _f()), (l = De(l, t)), l !== null && (Ra(l, t), Ht(l)));
  }
  function ym(l) {
    var t = l.memoizedState,
      e = 0;
    (t !== null && (e = t.retryLane), Ur(l, e));
  }
  function vm(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode,
          n = l.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(d(314));
    }
    (a !== null && a.delete(t), Ur(l, e));
  }
  function pm(l, t) {
    return $u(l, t);
  }
  var Ou = null,
    za = null,
    Gc = !1,
    Cu = !1,
    Lc = !1,
    pe = 0;
  function Ht(l) {
    (l !== za && l.next === null && (za === null ? (Ou = za = l) : (za = za.next = l)),
      (Cu = !0),
      Gc || ((Gc = !0), bm()));
  }
  function mn(l, t) {
    if (!Lc && Cu) {
      Lc = !0;
      do
        for (var e = !1, a = Ou; a !== null; ) {
          if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes,
                c = a.pingedLanes;
              ((u = (1 << (31 - rt(42 | l) + 1)) - 1),
                (u &= n & ~(i & ~c)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
            }
            u !== 0 && ((e = !0), Br(a, u));
          } else
            ((u = al),
              (u = Nn(
                a,
                a === Tl ? u : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
              )),
              (u & 3) === 0 || Ua(a, u) || ((e = !0), Br(a, u)));
          a = a.next;
        }
      while (e);
      Lc = !1;
    }
  }
  function Sm() {
    Rr();
  }
  function Rr() {
    Cu = Gc = !1;
    var l = 0;
    pe !== 0 && Cm() && (l = pe);
    for (var t = st(), e = null, a = Ou; a !== null; ) {
      var n = a.next,
        u = Nr(a, t);
      (u === 0
        ? ((a.next = null), e === null ? (Ou = n) : (e.next = n), n === null && (za = e))
        : ((e = a), (l !== 0 || (u & 3) !== 0) && (Cu = !0)),
        (a = n));
    }
    ((Gl !== 0 && Gl !== 5) || mn(l), pe !== 0 && (pe = 0));
  }
  function Nr(l, t) {
    for (
      var e = l.suspendedLanes,
        a = l.pingedLanes,
        n = l.expirationTimes,
        u = l.pendingLanes & -62914561;
      0 < u;
    ) {
      var i = 31 - rt(u),
        c = 1 << i,
        f = n[i];
      (f === -1
        ? ((c & e) === 0 || (c & a) !== 0) && (n[i] = Jd(c, t))
        : f <= t && (l.expiredLanes |= c),
        (u &= ~c));
    }
    if (
      ((t = Tl),
      (e = al),
      (e = Nn(l, l === t ? e : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
      (a = l.callbackNode),
      e === 0 || (l === t && (ml === 2 || ml === 9)) || l.cancelPendingCommit !== null)
    )
      return (a !== null && a !== null && Iu(a), (l.callbackNode = null), (l.callbackPriority = 0));
    if ((e & 3) === 0 || Ua(l, e)) {
      if (((t = e & -e), t === l.callbackPriority)) return t;
      switch ((a !== null && Iu(a), ti(e))) {
        case 2:
        case 8:
          e = zf;
          break;
        case 32:
          e = Cn;
          break;
        case 268435456:
          e = Ef;
          break;
        default:
          e = Cn;
      }
      return (
        (a = Hr.bind(null, l)),
        (e = $u(e, a)),
        (l.callbackPriority = t),
        (l.callbackNode = e),
        t
      );
    }
    return (
      a !== null && a !== null && Iu(a),
      (l.callbackPriority = 2),
      (l.callbackNode = null),
      2
    );
  }
  function Hr(l, t) {
    if (Gl !== 0 && Gl !== 5) return ((l.callbackNode = null), (l.callbackPriority = 0), null);
    var e = l.callbackNode;
    if (Mu() && l.callbackNode !== e) return null;
    var a = al;
    return (
      (a = Nn(l, l === Tl ? a : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1)),
      a === 0
        ? null
        : (yr(l, a, t),
          Nr(l, st()),
          l.callbackNode != null && l.callbackNode === e ? Hr.bind(null, l) : null)
    );
  }
  function Br(l, t) {
    if (Mu()) return null;
    yr(l, t, !0);
  }
  function bm() {
    Um(function () {
      (dl & 6) !== 0 ? $u(Tf, Sm) : Rr();
    });
  }
  function Xc() {
    if (pe === 0) {
      var l = fa;
      (l === 0 && ((l = Dn), (Dn <<= 1), (Dn & 261888) === 0 && (Dn = 256)), (pe = l));
    }
    return pe;
  }
  function qr(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean"
      ? null
      : typeof l == "function"
        ? l
        : Yn("" + l);
  }
  function Yr(l, t) {
    var e = t.ownerDocument.createElement("input");
    return (
      (e.name = t.name),
      (e.value = t.value),
      l.id && e.setAttribute("form", l.id),
      t.parentNode.insertBefore(e, t),
      (l = new FormData(l)),
      e.parentNode.removeChild(e),
      l
    );
  }
  function xm(l, t, e, a, n) {
    if (t === "submit" && e && e.stateNode === n) {
      var u = qr((n[et] || null).action),
        i = a.submitter;
      i &&
        ((t = (t = i[et] || null) ? qr(t.formAction) : i.getAttribute("formAction")),
        t !== null && ((u = t), (i = null)));
      var c = new Qn("action", "action", null, a, n);
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (pe !== 0) {
                  var f = i ? Yr(n, i) : new FormData(n);
                  cc(e, { pending: !0, data: f, method: n.method, action: u }, null, f);
                }
              } else
                typeof u == "function" &&
                  (c.preventDefault(),
                  (f = i ? Yr(n, i) : new FormData(n)),
                  cc(e, { pending: !0, data: f, method: n.method, action: u }, u, f));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var Qc = 0; Qc < Ei.length; Qc++) {
    var Zc = Ei[Qc],
      Tm = Zc.toLowerCase(),
      zm = Zc[0].toUpperCase() + Zc.slice(1);
    Ot(Tm, "on" + zm);
  }
  (Ot(ms, "onAnimationEnd"),
    Ot(gs, "onAnimationIteration"),
    Ot(ys, "onAnimationStart"),
    Ot("dblclick", "onDoubleClick"),
    Ot("focusin", "onFocus"),
    Ot("focusout", "onBlur"),
    Ot(Gh, "onTransitionRun"),
    Ot(Lh, "onTransitionStart"),
    Ot(Xh, "onTransitionCancel"),
    Ot(vs, "onTransitionEnd"),
    We("onMouseEnter", ["mouseout", "mouseover"]),
    We("onMouseLeave", ["mouseout", "mouseover"]),
    We("onPointerEnter", ["pointerout", "pointerover"]),
    We("onPointerLeave", ["pointerout", "pointerover"]),
    je("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    je(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    je("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    je("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    je(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    je(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var gn =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    Em = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gn),
    );
  function Gr(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e],
        n = a.event;
      a = a.listeners;
      l: {
        var u = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i],
              f = c.instance,
              y = c.currentTarget;
            if (((c = c.listener), f !== u && n.isPropagationStopped())) break l;
            ((u = c), (n.currentTarget = y));
            try {
              u(n);
            } catch (b) {
              Kn(b);
            }
            ((n.currentTarget = null), (u = f));
          }
        else
          for (i = 0; i < a.length; i++) {
            if (
              ((c = a[i]),
              (f = c.instance),
              (y = c.currentTarget),
              (c = c.listener),
              f !== u && n.isPropagationStopped())
            )
              break l;
            ((u = c), (n.currentTarget = y));
            try {
              u(n);
            } catch (b) {
              Kn(b);
            }
            ((n.currentTarget = null), (u = f));
          }
      }
    }
  }
  function el(l, t) {
    var e = t[ei];
    e === void 0 && (e = t[ei] = new Set());
    var a = l + "__bubble";
    e.has(a) || (Lr(t, l, 2, !1), e.add(a));
  }
  function Vc(l, t, e) {
    var a = 0;
    (t && (a |= 4), Lr(e, l, a, t));
  }
  var Du = "_reactListening" + Math.random().toString(36).slice(2);
  function Kc(l) {
    if (!l[Du]) {
      ((l[Du] = !0),
        Uf.forEach(function (e) {
          e !== "selectionchange" && (Em.has(e) || Vc(e, !1, l), Vc(e, !0, l));
        }));
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Du] || ((t[Du] = !0), Vc("selectionchange", !1, t));
    }
  }
  function Lr(l, t, e, a) {
    switch (gd(t)) {
      case 2:
        var n = Im;
        break;
      case 8:
        n = Pm;
        break;
      default:
        n = cf;
    }
    ((e = n.bind(null, t, e, l)),
      (n = void 0),
      !ri || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (n = !0),
      a
        ? n !== void 0
          ? l.addEventListener(t, e, { capture: !0, passive: n })
          : l.addEventListener(t, e, !0)
        : n !== void 0
          ? l.addEventListener(t, e, { passive: n })
          : l.addEventListener(t, e, !1));
  }
  function Jc(l, t, e, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (;;) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === n) return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (((i = Ke(c)), i === null)) return;
            if (((f = i.tag), f === 5 || f === 6 || f === 26 || f === 27)) {
              a = u = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Vf(function () {
      var y = u,
        b = si(e),
        z = [];
      l: {
        var v = ps.get(l);
        if (v !== void 0) {
          var p = Qn,
            R = l;
          switch (l) {
            case "keypress":
              if (Ln(e) === 0) break l;
            case "keydown":
            case "keyup":
              p = vh;
              break;
            case "focusin":
              ((R = "focus"), (p = gi));
              break;
            case "focusout":
              ((R = "blur"), (p = gi));
              break;
            case "beforeblur":
            case "afterblur":
              p = gi;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              p = wf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              p = uh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              p = bh;
              break;
            case ms:
            case gs:
            case ys:
              p = fh;
              break;
            case vs:
              p = Th;
              break;
            case "scroll":
            case "scrollend":
              p = ah;
              break;
            case "wheel":
              p = Eh;
              break;
            case "copy":
            case "cut":
            case "paste":
              p = oh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              p = kf;
              break;
            case "toggle":
            case "beforetoggle":
              p = Ah;
          }
          var V = (t & 4) !== 0,
            bl = !V && (l === "scroll" || l === "scrollend"),
            h = V ? (v !== null ? v + "Capture" : null) : v;
          V = [];
          for (var o = y, g; o !== null; ) {
            var T = o;
            if (
              ((g = T.stateNode),
              (T = T.tag),
              (T !== 5 && T !== 26 && T !== 27) ||
                g === null ||
                h === null ||
                ((T = Ba(o, h)), T != null && V.push(yn(o, T, g))),
              bl)
            )
              break;
            o = o.return;
          }
          0 < V.length && ((v = new p(v, R, null, e, b)), z.push({ event: v, listeners: V }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((v = l === "mouseover" || l === "pointerover"),
            (p = l === "mouseout" || l === "pointerout"),
            v && e !== fi && (R = e.relatedTarget || e.fromElement) && (Ke(R) || R[Ve]))
          )
            break l;
          if (
            (p || v) &&
            ((v =
              b.window === b
                ? b
                : (v = b.ownerDocument)
                  ? v.defaultView || v.parentWindow
                  : window),
            p
              ? ((R = e.relatedTarget || e.toElement),
                (p = y),
                (R = R ? Ke(R) : null),
                R !== null &&
                  ((bl = G(R)), (V = R.tag), R !== bl || (V !== 5 && V !== 27 && V !== 6)) &&
                  (R = null))
              : ((p = null), (R = y)),
            p !== R)
          ) {
            if (
              ((V = wf),
              (T = "onMouseLeave"),
              (h = "onMouseEnter"),
              (o = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((V = kf), (T = "onPointerLeave"), (h = "onPointerEnter"), (o = "pointer")),
              (bl = p == null ? v : Ha(p)),
              (g = R == null ? v : Ha(R)),
              (v = new V(T, o + "leave", p, e, b)),
              (v.target = bl),
              (v.relatedTarget = g),
              (T = null),
              Ke(b) === y &&
                ((V = new V(h, o + "enter", R, e, b)),
                (V.target = g),
                (V.relatedTarget = bl),
                (T = V)),
              (bl = T),
              p && R)
            )
              t: {
                for (V = _m, h = p, o = R, g = 0, T = h; T; T = V(T)) g++;
                T = 0;
                for (var L = o; L; L = V(L)) T++;
                for (; 0 < g - T; ) ((h = V(h)), g--);
                for (; 0 < T - g; ) ((o = V(o)), T--);
                for (; g--; ) {
                  if (h === o || (o !== null && h === o.alternate)) {
                    V = h;
                    break t;
                  }
                  ((h = V(h)), (o = V(o)));
                }
                V = null;
              }
            else V = null;
            (p !== null && Xr(z, v, p, V, !1), R !== null && bl !== null && Xr(z, bl, R, V, !0));
          }
        }
        l: {
          if (
            ((v = y ? Ha(y) : window),
            (p = v.nodeName && v.nodeName.toLowerCase()),
            p === "select" || (p === "input" && v.type === "file"))
          )
            var fl = as;
          else if (ts(v))
            if (ns) fl = Bh;
            else {
              fl = Nh;
              var H = Rh;
            }
          else
            ((p = v.nodeName),
              !p || p.toLowerCase() !== "input" || (v.type !== "checkbox" && v.type !== "radio")
                ? y && ci(y.elementType) && (fl = as)
                : (fl = Hh));
          if (fl && (fl = fl(l, y))) {
            es(z, fl, e, b);
            break l;
          }
          (H && H(l, v, y),
            l === "focusout" &&
              y &&
              v.type === "number" &&
              y.memoizedProps.value != null &&
              ii(v, "number", v.value));
        }
        switch (((H = y ? Ha(y) : window), l)) {
          case "focusin":
            (ts(H) || H.contentEditable === "true") && ((la = H), (xi = y), (Va = null));
            break;
          case "focusout":
            Va = xi = la = null;
            break;
          case "mousedown":
            Ti = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Ti = !1), ds(z, e, b));
            break;
          case "selectionchange":
            if (Yh) break;
          case "keydown":
          case "keyup":
            ds(z, e, b);
        }
        var P;
        if (vi)
          l: {
            switch (l) {
              case "compositionstart":
                var nl = "onCompositionStart";
                break l;
              case "compositionend":
                nl = "onCompositionEnd";
                break l;
              case "compositionupdate":
                nl = "onCompositionUpdate";
                break l;
            }
            nl = void 0;
          }
        else
          Pe
            ? Pf(l, e) && (nl = "onCompositionEnd")
            : l === "keydown" && e.keyCode === 229 && (nl = "onCompositionStart");
        (nl &&
          (Ff &&
            e.locale !== "ko" &&
            (Pe || nl !== "onCompositionStart"
              ? nl === "onCompositionEnd" && Pe && (P = Kf())
              : ((ee = b), (di = "value" in ee ? ee.value : ee.textContent), (Pe = !0))),
          (H = Uu(y, nl)),
          0 < H.length &&
            ((nl = new Wf(nl, l, null, e, b)),
            z.push({ event: nl, listeners: H }),
            P ? (nl.data = P) : ((P = ls(e)), P !== null && (nl.data = P)))),
          (P = Mh ? Oh(l, e) : Ch(l, e)) &&
            ((nl = Uu(y, "onBeforeInput")),
            0 < nl.length &&
              ((H = new Wf("onBeforeInput", "beforeinput", null, e, b)),
              z.push({ event: H, listeners: nl }),
              (H.data = P))),
          xm(z, l, y, e, b));
      }
      Gr(z, t);
    });
  }
  function yn(l, t, e) {
    return { instance: l, listener: t, currentTarget: e };
  }
  function Uu(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var n = l,
        u = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          u === null ||
          ((n = Ba(l, e)),
          n != null && a.unshift(yn(l, n, u)),
          (n = Ba(l, t)),
          n != null && a.push(yn(l, n, u))),
        l.tag === 3)
      )
        return a;
      l = l.return;
    }
    return [];
  }
  function _m(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Xr(l, t, e, a, n) {
    for (var u = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e,
        f = c.alternate,
        y = c.stateNode;
      if (((c = c.tag), f !== null && f === a)) break;
      ((c !== 5 && c !== 26 && c !== 27) ||
        y === null ||
        ((f = y),
        n
          ? ((y = Ba(e, u)), y != null && i.unshift(yn(e, y, f)))
          : n || ((y = Ba(e, u)), y != null && i.push(yn(e, y, f)))),
        (e = e.return));
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Am = /\r\n?/g,
    jm = /\u0000|\uFFFD/g;
  function Qr(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        Am,
        `
`,
      )
      .replace(jm, "");
  }
  function Zr(l, t) {
    return ((t = Qr(t)), Qr(l) === t);
  }
  function Sl(l, t, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || Fe(l, a)
          : (typeof a == "number" || typeof a == "bigint") && t !== "body" && Fe(l, "" + a);
        break;
      case "className":
        Bn(l, "class", a);
        break;
      case "tabIndex":
        Bn(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Bn(l, e, a);
        break;
      case "style":
        Qf(l, a, u);
        break;
      case "data":
        if (t !== "object") {
          Bn(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        ((a = Yn("" + a)), l.setAttribute(e, a));
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof u == "function" &&
            (e === "formAction"
              ? (t !== "input" && Sl(l, t, "name", n.name, n, null),
                Sl(l, t, "formEncType", n.formEncType, n, null),
                Sl(l, t, "formMethod", n.formMethod, n, null),
                Sl(l, t, "formTarget", n.formTarget, n, null))
              : (Sl(l, t, "encType", n.encType, n, null),
                Sl(l, t, "method", n.method, n, null),
                Sl(l, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        ((a = Yn("" + a)), l.setAttribute(e, a));
        break;
      case "onClick":
        a != null && (l.onclick = qt);
        break;
      case "onScroll":
        a != null && el("scroll", l);
        break;
      case "onScrollEnd":
        a != null && el("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(d(61));
          if (((e = a.__html), e != null)) {
            if (n.children != null) throw Error(d(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        ((e = Yn("" + a)), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(e, "" + a)
          : l.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(e, "")
          : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0
          ? l.setAttribute(e, "")
          : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol"
            ? l.setAttribute(e, a)
            : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a
          ? l.setAttribute(e, a)
          : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? l.removeAttribute(e)
          : l.setAttribute(e, a);
        break;
      case "popover":
        (el("beforetoggle", l), el("toggle", l), Hn(l, "popover", a));
        break;
      case "xlinkActuate":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Bt(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Bt(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Bt(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Bt(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Hn(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || (e[0] !== "o" && e[0] !== "O") || (e[1] !== "n" && e[1] !== "N")) &&
          ((e = th.get(e) || e), Hn(l, e, a));
    }
  }
  function wc(l, t, e, a, n, u) {
    switch (e) {
      case "style":
        Qf(l, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(d(61));
          if (((e = a.__html), e != null)) {
            if (n.children != null) throw Error(d(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? Fe(l, a)
          : (typeof a == "number" || typeof a == "bigint") && Fe(l, "" + a);
        break;
      case "onScroll":
        a != null && el("scroll", l);
        break;
      case "onScrollEnd":
        a != null && el("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = qt);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Rf.hasOwnProperty(e))
          l: {
            if (
              e[0] === "o" &&
              e[1] === "n" &&
              ((n = e.endsWith("Capture")),
              (t = e.slice(2, n ? e.length - 7 : void 0)),
              (u = l[et] || null),
              (u = u != null ? u[e] : null),
              typeof u == "function" && l.removeEventListener(t, u, n),
              typeof a == "function")
            ) {
              (typeof u != "function" &&
                u !== null &&
                (e in l ? (l[e] = null) : l.hasAttribute(e) && l.removeAttribute(e)),
                l.addEventListener(t, a, n));
              break l;
            }
            e in l ? (l[e] = a) : a === !0 ? l.setAttribute(e, "") : Hn(l, e, a);
          }
    }
  }
  function Fl(l, t, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (el("error", l), el("load", l));
        var a = !1,
          n = !1,
          u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var i = e[u];
            if (i != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(d(137, t));
                default:
                  Sl(l, t, u, i, e, null);
              }
          }
        (n && Sl(l, t, "srcSet", e.srcSet, e, null), a && Sl(l, t, "src", e.src, e, null));
        return;
      case "input":
        el("invalid", l);
        var c = (u = i = n = null),
          f = null,
          y = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var b = e[a];
            if (b != null)
              switch (a) {
                case "name":
                  n = b;
                  break;
                case "type":
                  i = b;
                  break;
                case "checked":
                  f = b;
                  break;
                case "defaultChecked":
                  y = b;
                  break;
                case "value":
                  u = b;
                  break;
                case "defaultValue":
                  c = b;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (b != null) throw Error(d(137, t));
                  break;
                default:
                  Sl(l, t, a, b, e, null);
              }
          }
        Yf(l, u, c, f, y, i, n, !1);
        return;
      case "select":
        (el("invalid", l), (a = i = u = null));
        for (n in e)
          if (e.hasOwnProperty(n) && ((c = e[n]), c != null))
            switch (n) {
              case "value":
                u = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                Sl(l, t, n, c, e, null);
            }
        ((t = u),
          (e = i),
          (l.multiple = !!a),
          t != null ? ke(l, !!a, t, !1) : e != null && ke(l, !!a, e, !0));
        return;
      case "textarea":
        (el("invalid", l), (u = n = a = null));
        for (i in e)
          if (e.hasOwnProperty(i) && ((c = e[i]), c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                n = c;
                break;
              case "children":
                u = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(d(91));
                break;
              default:
                Sl(l, t, i, c, e, null);
            }
        Lf(l, a, n, u);
        return;
      case "option":
        for (f in e)
          e.hasOwnProperty(f) &&
            ((a = e[f]), a != null) &&
            (f === "selected"
              ? (l.selected = a && typeof a != "function" && typeof a != "symbol")
              : Sl(l, t, f, a, e, null));
        return;
      case "dialog":
        (el("beforetoggle", l), el("toggle", l), el("cancel", l), el("close", l));
        break;
      case "iframe":
      case "object":
        el("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < gn.length; a++) el(gn[a], l);
        break;
      case "image":
        (el("error", l), el("load", l));
        break;
      case "details":
        el("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        (el("error", l), el("load", l));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (y in e)
          if (e.hasOwnProperty(y) && ((a = e[y]), a != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(d(137, t));
              default:
                Sl(l, t, y, a, e, null);
            }
        return;
      default:
        if (ci(t)) {
          for (b in e)
            e.hasOwnProperty(b) && ((a = e[b]), a !== void 0 && wc(l, t, b, a, e, void 0));
          return;
        }
    }
    for (c in e) e.hasOwnProperty(c) && ((a = e[c]), a != null && Sl(l, t, c, a, e, null));
  }
  function Mm(l, t, e, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null,
          u = null,
          i = null,
          c = null,
          f = null,
          y = null,
          b = null;
        for (p in e) {
          var z = e[p];
          if (e.hasOwnProperty(p) && z != null)
            switch (p) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = z;
              default:
                a.hasOwnProperty(p) || Sl(l, t, p, null, a, z);
            }
        }
        for (var v in a) {
          var p = a[v];
          if (((z = e[v]), a.hasOwnProperty(v) && (p != null || z != null)))
            switch (v) {
              case "type":
                u = p;
                break;
              case "name":
                n = p;
                break;
              case "checked":
                y = p;
                break;
              case "defaultChecked":
                b = p;
                break;
              case "value":
                i = p;
                break;
              case "defaultValue":
                c = p;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(d(137, t));
                break;
              default:
                p !== z && Sl(l, t, v, p, a, z);
            }
        }
        ui(l, i, c, f, y, b, u, n);
        return;
      case "select":
        p = i = c = v = null;
        for (u in e)
          if (((f = e[u]), e.hasOwnProperty(u) && f != null))
            switch (u) {
              case "value":
                break;
              case "multiple":
                p = f;
              default:
                a.hasOwnProperty(u) || Sl(l, t, u, null, a, f);
            }
        for (n in a)
          if (((u = a[n]), (f = e[n]), a.hasOwnProperty(n) && (u != null || f != null)))
            switch (n) {
              case "value":
                v = u;
                break;
              case "defaultValue":
                c = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== f && Sl(l, t, n, u, a, f);
            }
        ((t = c),
          (e = i),
          (a = p),
          v != null
            ? ke(l, !!e, v, !1)
            : !!a != !!e && (t != null ? ke(l, !!e, t, !0) : ke(l, !!e, e ? [] : "", !1)));
        return;
      case "textarea":
        p = v = null;
        for (c in e)
          if (((n = e[c]), e.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c)))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                Sl(l, t, c, null, a, n);
            }
        for (i in a)
          if (((n = a[i]), (u = e[i]), a.hasOwnProperty(i) && (n != null || u != null)))
            switch (i) {
              case "value":
                v = n;
                break;
              case "defaultValue":
                p = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(d(91));
                break;
              default:
                n !== u && Sl(l, t, i, n, a, u);
            }
        Gf(l, v, p);
        return;
      case "option":
        for (var R in e)
          ((v = e[R]),
            e.hasOwnProperty(R) &&
              v != null &&
              !a.hasOwnProperty(R) &&
              (R === "selected" ? (l.selected = !1) : Sl(l, t, R, null, a, v)));
        for (f in a)
          ((v = a[f]),
            (p = e[f]),
            a.hasOwnProperty(f) &&
              v !== p &&
              (v != null || p != null) &&
              (f === "selected"
                ? (l.selected = v && typeof v != "function" && typeof v != "symbol")
                : Sl(l, t, f, v, a, p)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var V in e)
          ((v = e[V]),
            e.hasOwnProperty(V) && v != null && !a.hasOwnProperty(V) && Sl(l, t, V, null, a, v));
        for (y in a)
          if (((v = a[y]), (p = e[y]), a.hasOwnProperty(y) && v !== p && (v != null || p != null)))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(d(137, t));
                break;
              default:
                Sl(l, t, y, v, a, p);
            }
        return;
      default:
        if (ci(t)) {
          for (var bl in e)
            ((v = e[bl]),
              e.hasOwnProperty(bl) &&
                v !== void 0 &&
                !a.hasOwnProperty(bl) &&
                wc(l, t, bl, void 0, a, v));
          for (b in a)
            ((v = a[b]),
              (p = e[b]),
              !a.hasOwnProperty(b) ||
                v === p ||
                (v === void 0 && p === void 0) ||
                wc(l, t, b, v, a, p));
          return;
        }
    }
    for (var h in e)
      ((v = e[h]),
        e.hasOwnProperty(h) && v != null && !a.hasOwnProperty(h) && Sl(l, t, h, null, a, v));
    for (z in a)
      ((v = a[z]),
        (p = e[z]),
        !a.hasOwnProperty(z) || v === p || (v == null && p == null) || Sl(l, t, z, v, a, p));
  }
  function Vr(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Om() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0;
        a < e.length;
        a++
      ) {
        var n = e[a],
          u = n.transferSize,
          i = n.initiatorType,
          c = n.duration;
        if (u && c && Vr(i)) {
          for (i = 0, c = n.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a],
              y = f.startTime;
            if (y > c) break;
            var b = f.transferSize,
              z = f.initiatorType;
            b && Vr(z) && ((f = f.responseEnd), (i += b * (f < c ? 1 : (c - y) / (f - y))));
          }
          if ((--a, (t += (8 * (u + i)) / (n.duration / 1e3)), l++, 10 < l)) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && ((l = navigator.connection.downlink), typeof l == "number")
      ? l
      : 5;
  }
  var Wc = null,
    kc = null;
  function Ru(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Kr(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Jr(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Fc(l, t) {
    return (
      l === "textarea" ||
      l === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var $c = null;
  function Cm() {
    var l = window.event;
    return l && l.type === "popstate" ? (l === $c ? !1 : (($c = l), !0)) : (($c = null), !1);
  }
  var wr = typeof setTimeout == "function" ? setTimeout : void 0,
    Dm = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Wr = typeof Promise == "function" ? Promise : void 0,
    Um =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Wr < "u"
          ? function (l) {
              return Wr.resolve(null).then(l).catch(Rm);
            }
          : wr;
  function Rm(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function Se(l) {
    return l === "head";
  }
  function kr(l, t) {
    var e = t,
      a = 0;
    do {
      var n = e.nextSibling;
      if ((l.removeChild(e), n && n.nodeType === 8))
        if (((e = n.data), e === "/$" || e === "/&")) {
          if (a === 0) {
            (l.removeChild(n), ja(t));
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&") a++;
        else if (e === "html") vn(l.ownerDocument.documentElement);
        else if (e === "head") {
          ((e = l.ownerDocument.head), vn(e));
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling,
              c = u.nodeName;
            (u[Na] ||
              c === "SCRIPT" ||
              c === "STYLE" ||
              (c === "LINK" && u.rel.toLowerCase() === "stylesheet") ||
              e.removeChild(u),
              (u = i));
          }
        } else e === "body" && vn(l.ownerDocument.body);
      e = n;
    } while (e);
    ja(t);
  }
  function Fr(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (
        (e.nodeType === 1
          ? t
            ? ((e._stashedDisplay = e.style.display), (e.style.display = "none"))
            : ((e.style.display = e._stashedDisplay || ""),
              e.getAttribute("style") === "" && e.removeAttribute("style"))
          : e.nodeType === 3 &&
            (t
              ? ((e._stashedText = e.nodeValue), (e.nodeValue = ""))
              : (e.nodeValue = e._stashedText || "")),
        a && a.nodeType === 8)
      )
        if (((e = a.data), e === "/$")) {
          if (l === 0) break;
          l--;
        } else (e !== "$" && e !== "$?" && e !== "$~" && e !== "$!") || l++;
      e = a;
    } while (e);
  }
  function Ic(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (((t = t.nextSibling), e.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Ic(e), ai(e));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function Nm(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var n = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[Na])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (
                ((u = l.getAttribute("rel")),
                u === "stylesheet" && l.hasAttribute("data-precedence"))
              )
                break;
              if (
                u !== n.rel ||
                l.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) ||
                l.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) ||
                l.getAttribute("title") !== (n.title == null ? null : n.title)
              )
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (
                ((u = l.getAttribute("src")),
                (u !== (n.src == null ? null : n.src) ||
                  l.getAttribute("type") !== (n.type == null ? null : n.type) ||
                  l.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  u &&
                  l.hasAttribute("async") &&
                  !l.hasAttribute("itemprop"))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && l.getAttribute("name") === u) return l;
      } else return l;
      if (((l = jt(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function Hm(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e) ||
        ((l = jt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function $r(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t) ||
        ((l = jt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function Pc(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function lf(l) {
    return l.data === "$!" || (l.data === "$?" && l.ownerDocument.readyState !== "loading");
  }
  function Bm(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading") t();
    else {
      var a = function () {
        (t(), e.removeEventListener("DOMContentLoaded", a));
      };
      (e.addEventListener("DOMContentLoaded", a), (l._reactRetry = a));
    }
  }
  function jt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = l.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var tf = null;
  function Ir(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0) return jt(l.nextSibling);
          t--;
        } else (e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&") || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Pr(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else (e !== "/$" && e !== "/&") || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function ld(l, t, e) {
    switch (((t = Ru(e)), l)) {
      case "html":
        if (((l = t.documentElement), !l)) throw Error(d(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(d(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(d(454));
        return l;
      default:
        throw Error(d(451));
    }
  }
  function vn(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    ai(l);
  }
  var Mt = new Map(),
    td = new Set();
  function Nu(l) {
    return typeof l.getRootNode == "function"
      ? l.getRootNode()
      : l.nodeType === 9
        ? l
        : l.ownerDocument;
  }
  var Pt = j.d;
  j.d = { f: qm, r: Ym, D: Gm, C: Lm, L: Xm, m: Qm, X: Vm, S: Zm, M: Km };
  function qm() {
    var l = Pt.f(),
      t = _u();
    return l || t;
  }
  function Ym(l) {
    var t = Je(l);
    t !== null && t.tag === 5 && t.type === "form" ? po(t) : Pt.r(l);
  }
  var Ea = typeof document > "u" ? null : document;
  function ed(l, t, e) {
    var a = Ea;
    if (a && typeof t == "string" && t) {
      var n = bt(t);
      ((n = 'link[rel="' + l + '"][href="' + n + '"]'),
        typeof e == "string" && (n += '[crossorigin="' + e + '"]'),
        td.has(n) ||
          (td.add(n),
          (l = { rel: l, crossOrigin: e, href: t }),
          a.querySelector(n) === null &&
            ((t = a.createElement("link")), Fl(t, "link", l), Xl(t), a.head.appendChild(t))));
    }
  }
  function Gm(l) {
    (Pt.D(l), ed("dns-prefetch", l, null));
  }
  function Lm(l, t) {
    (Pt.C(l, t), ed("preconnect", l, t));
  }
  function Xm(l, t, e) {
    Pt.L(l, t, e);
    var a = Ea;
    if (a && l && t) {
      var n = 'link[rel="preload"][as="' + bt(t) + '"]';
      t === "image" && e && e.imageSrcSet
        ? ((n += '[imagesrcset="' + bt(e.imageSrcSet) + '"]'),
          typeof e.imageSizes == "string" && (n += '[imagesizes="' + bt(e.imageSizes) + '"]'))
        : (n += '[href="' + bt(l) + '"]');
      var u = n;
      switch (t) {
        case "style":
          u = _a(l);
          break;
        case "script":
          u = Aa(l);
      }
      Mt.has(u) ||
        ((l = C(
          { rel: "preload", href: t === "image" && e && e.imageSrcSet ? void 0 : l, as: t },
          e,
        )),
        Mt.set(u, l),
        a.querySelector(n) !== null ||
          (t === "style" && a.querySelector(pn(u))) ||
          (t === "script" && a.querySelector(Sn(u))) ||
          ((t = a.createElement("link")), Fl(t, "link", l), Xl(t), a.head.appendChild(t)));
    }
  }
  function Qm(l, t) {
    Pt.m(l, t);
    var e = Ea;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        n = 'link[rel="modulepreload"][as="' + bt(a) + '"][href="' + bt(l) + '"]',
        u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Aa(l);
      }
      if (
        !Mt.has(u) &&
        ((l = C({ rel: "modulepreload", href: l }, t)), Mt.set(u, l), e.querySelector(n) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Sn(u))) return;
        }
        ((a = e.createElement("link")), Fl(a, "link", l), Xl(a), e.head.appendChild(a));
      }
    }
  }
  function Zm(l, t, e) {
    Pt.S(l, t, e);
    var a = Ea;
    if (a && l) {
      var n = we(a).hoistableStyles,
        u = _a(l);
      t = t || "default";
      var i = n.get(u);
      if (!i) {
        var c = { loading: 0, preload: null };
        if ((i = a.querySelector(pn(u)))) c.loading = 5;
        else {
          ((l = C({ rel: "stylesheet", href: l, "data-precedence": t }, e)),
            (e = Mt.get(u)) && ef(l, e));
          var f = (i = a.createElement("link"));
          (Xl(f),
            Fl(f, "link", l),
            (f._p = new Promise(function (y, b) {
              ((f.onload = y), (f.onerror = b));
            })),
            f.addEventListener("load", function () {
              c.loading |= 1;
            }),
            f.addEventListener("error", function () {
              c.loading |= 2;
            }),
            (c.loading |= 4),
            Hu(i, t, a));
        }
        ((i = { type: "stylesheet", instance: i, count: 1, state: c }), n.set(u, i));
      }
    }
  }
  function Vm(l, t) {
    Pt.X(l, t);
    var e = Ea;
    if (e && l) {
      var a = we(e).hoistableScripts,
        n = Aa(l),
        u = a.get(n);
      u ||
        ((u = e.querySelector(Sn(n))),
        u ||
          ((l = C({ src: l, async: !0 }, t)),
          (t = Mt.get(n)) && af(l, t),
          (u = e.createElement("script")),
          Xl(u),
          Fl(u, "link", l),
          e.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u));
    }
  }
  function Km(l, t) {
    Pt.M(l, t);
    var e = Ea;
    if (e && l) {
      var a = we(e).hoistableScripts,
        n = Aa(l),
        u = a.get(n);
      u ||
        ((u = e.querySelector(Sn(n))),
        u ||
          ((l = C({ src: l, async: !0, type: "module" }, t)),
          (t = Mt.get(n)) && af(l, t),
          (u = e.createElement("script")),
          Xl(u),
          Fl(u, "link", l),
          e.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u));
    }
  }
  function ad(l, t, e, a) {
    var n = (n = ll.current) ? Nu(n) : null;
    if (!n) throw Error(d(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string"
          ? ((t = _a(e.href)),
            (e = we(n).hoistableStyles),
            (a = e.get(t)),
            a || ((a = { type: "style", instance: null, count: 0, state: null }), e.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          e.rel === "stylesheet" &&
          typeof e.href == "string" &&
          typeof e.precedence == "string"
        ) {
          l = _a(e.href);
          var u = we(n).hoistableStyles,
            i = u.get(l);
          if (
            (i ||
              ((n = n.ownerDocument || n),
              (i = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(l, i),
              (u = n.querySelector(pn(l))) && !u._p && ((i.instance = u), (i.state.loading = 5)),
              Mt.has(l) ||
                ((e = {
                  rel: "preload",
                  as: "style",
                  href: e.href,
                  crossOrigin: e.crossOrigin,
                  integrity: e.integrity,
                  media: e.media,
                  hrefLang: e.hrefLang,
                  referrerPolicy: e.referrerPolicy,
                }),
                Mt.set(l, e),
                u || Jm(n, l, e, i.state))),
            t && a === null)
          )
            throw Error(d(528, ""));
          return i;
        }
        if (t && a !== null) throw Error(d(529, ""));
        return null;
      case "script":
        return (
          (t = e.async),
          (e = e.src),
          typeof e == "string" && t && typeof t != "function" && typeof t != "symbol"
            ? ((t = Aa(e)),
              (e = we(n).hoistableScripts),
              (a = e.get(t)),
              a || ((a = { type: "script", instance: null, count: 0, state: null }), e.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(d(444, l));
    }
  }
  function _a(l) {
    return 'href="' + bt(l) + '"';
  }
  function pn(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function nd(l) {
    return C({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function Jm(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = l.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        Fl(t, "link", e),
        Xl(t),
        l.head.appendChild(t));
  }
  function Aa(l) {
    return '[src="' + bt(l) + '"]';
  }
  function Sn(l) {
    return "script[async]" + l;
  }
  function ud(l, t, e) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = l.querySelector('style[data-href~="' + bt(e.href) + '"]');
          if (a) return ((t.instance = a), Xl(a), a);
          var n = C({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (l.ownerDocument || l).createElement("style")),
            Xl(a),
            Fl(a, "style", n),
            Hu(a, e.precedence, l),
            (t.instance = a)
          );
        case "stylesheet":
          n = _a(e.href);
          var u = l.querySelector(pn(n));
          if (u) return ((t.state.loading |= 4), (t.instance = u), Xl(u), u);
          ((a = nd(e)),
            (n = Mt.get(n)) && ef(a, n),
            (u = (l.ownerDocument || l).createElement("link")),
            Xl(u));
          var i = u;
          return (
            (i._p = new Promise(function (c, f) {
              ((i.onload = c), (i.onerror = f));
            })),
            Fl(u, "link", a),
            (t.state.loading |= 4),
            Hu(u, e.precedence, l),
            (t.instance = u)
          );
        case "script":
          return (
            (u = Aa(e.src)),
            (n = l.querySelector(Sn(u)))
              ? ((t.instance = n), Xl(n), n)
              : ((a = e),
                (n = Mt.get(u)) && ((a = C({}, e)), af(a, n)),
                (l = l.ownerDocument || l),
                (n = l.createElement("script")),
                Xl(n),
                Fl(n, "link", a),
                l.head.appendChild(n),
                (t.instance = n))
          );
        case "void":
          return null;
        default:
          throw Error(d(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Hu(a, e.precedence, l));
    return t.instance;
  }
  function Hu(l, t, e) {
    for (
      var a = e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),
        n = a.length ? a[a.length - 1] : null,
        u = n,
        i = 0;
      i < a.length;
      i++
    ) {
      var c = a[i];
      if (c.dataset.precedence === t) u = c;
      else if (u !== n) break;
    }
    u
      ? u.parentNode.insertBefore(l, u.nextSibling)
      : ((t = e.nodeType === 9 ? e.head : e), t.insertBefore(l, t.firstChild));
  }
  function ef(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title));
  }
  function af(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity));
  }
  var Bu = null;
  function id(l, t, e) {
    if (Bu === null) {
      var a = new Map(),
        n = (Bu = new Map());
      n.set(e, a);
    } else ((n = Bu), (a = n.get(e)), a || ((a = new Map()), n.set(e, a)));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), n = 0; n < e.length; n++) {
      var u = e[n];
      if (
        !(u[Na] || u[Jl] || (l === "link" && u.getAttribute("rel") === "stylesheet")) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var i = u.getAttribute(t) || "";
        i = l + i;
        var c = a.get(i);
        c ? c.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function cd(l, t, e) {
    ((l = l.ownerDocument || l),
      l.head.insertBefore(e, t === "title" ? l.querySelector("head > title") : null));
  }
  function wm(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === "stylesheet"
          ? ((l = t.disabled), typeof t.precedence == "string" && l == null)
          : !0;
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function fd(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Wm(l, t, e, a) {
    if (
      e.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (e.state.loading & 4) === 0
    ) {
      if (e.instance === null) {
        var n = _a(a.href),
          u = t.querySelector(pn(n));
        if (u) {
          ((t = u._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = qu.bind(l)), t.then(l, l)),
            (e.state.loading |= 4),
            (e.instance = u),
            Xl(u));
          return;
        }
        ((u = t.ownerDocument || t),
          (a = nd(a)),
          (n = Mt.get(n)) && ef(a, n),
          (u = u.createElement("link")),
          Xl(u));
        var i = u;
        ((i._p = new Promise(function (c, f) {
          ((i.onload = c), (i.onerror = f));
        })),
          Fl(u, "link", a),
          (e.instance = u));
      }
      (l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(e, t),
        (t = e.state.preload) &&
          (e.state.loading & 3) === 0 &&
          (l.count++,
          (e = qu.bind(l)),
          t.addEventListener("load", e),
          t.addEventListener("error", e)));
    }
  }
  var nf = 0;
  function km(l, t) {
    return (
      l.stylesheets && l.count === 0 && Gu(l, l.stylesheets),
      0 < l.count || 0 < l.imgCount
        ? function (e) {
            var a = setTimeout(function () {
              if ((l.stylesheets && Gu(l, l.stylesheets), l.unsuspend)) {
                var u = l.unsuspend;
                ((l.unsuspend = null), u());
              }
            }, 6e4 + t);
            0 < l.imgBytes && nf === 0 && (nf = 62500 * Om());
            var n = setTimeout(
              function () {
                if (
                  ((l.waitingForImages = !1),
                  l.count === 0 && (l.stylesheets && Gu(l, l.stylesheets), l.unsuspend))
                ) {
                  var u = l.unsuspend;
                  ((l.unsuspend = null), u());
                }
              },
              (l.imgBytes > nf ? 50 : 800) + t,
            );
            return (
              (l.unsuspend = e),
              function () {
                ((l.unsuspend = null), clearTimeout(a), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function qu() {
    if ((this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))) {
      if (this.stylesheets) Gu(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        ((this.unsuspend = null), l());
      }
    }
  }
  var Yu = null;
  function Gu(l, t) {
    ((l.stylesheets = null),
      l.unsuspend !== null &&
        (l.count++, (Yu = new Map()), t.forEach(Fm, l), (Yu = null), qu.call(l)));
  }
  function Fm(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Yu.get(l);
      if (e) var a = e.get(null);
      else {
        ((e = new Map()), Yu.set(l, e));
        for (
          var n = l.querySelectorAll("link[data-precedence],style[data-precedence]"), u = 0;
          u < n.length;
          u++
        ) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") &&
            (e.set(i.dataset.precedence, i), (a = i));
        }
        a && e.set(null, a);
      }
      ((n = t.instance),
        (i = n.getAttribute("data-precedence")),
        (u = e.get(i) || a),
        u === a && e.set(null, n),
        e.set(i, n),
        this.count++,
        (a = qu.bind(this)),
        n.addEventListener("load", a),
        n.addEventListener("error", a),
        u
          ? u.parentNode.insertBefore(n, u.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l), l.insertBefore(n, l.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var bn = {
    $$typeof: rl,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0,
  };
  function $m(l, t, e, a, n, u, i, c, f) {
    ((this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Pu(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Pu(0)),
      (this.hiddenUpdates = Pu(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = u),
      (this.onRecoverableError = i),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = f),
      (this.incompleteTransitions = new Map()));
  }
  function sd(l, t, e, a, n, u, i, c, f, y, b, z) {
    return (
      (l = new $m(l, t, e, i, f, y, b, z, c)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = ht(3, null, null, t)),
      (l.current = u),
      (u.stateNode = l),
      (t = qi()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: a, isDehydrated: e, cache: t }),
      Xi(u),
      l
    );
  }
  function od(l) {
    return l ? ((l = aa), l) : aa;
  }
  function rd(l, t, e, a, n, u) {
    ((n = od(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = fe(t)),
      (a.payload = { element: e }),
      (u = u === void 0 ? null : u),
      u !== null && (a.callback = u),
      (e = se(l, a, t)),
      e !== null && (ft(e, l, t), $a(e, l, t)));
  }
  function dd(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function uf(l, t) {
    (dd(l, t), (l = l.alternate) && dd(l, t));
  }
  function hd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = De(l, 67108864);
      (t !== null && ft(t, l, 67108864), uf(l, 67108864));
    }
  }
  function md(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = pt();
      t = li(t);
      var e = De(l, t);
      (e !== null && ft(e, l, t), uf(l, t));
    }
  }
  var Lu = !0;
  function Im(l, t, e, a) {
    var n = x.T;
    x.T = null;
    var u = j.p;
    try {
      ((j.p = 2), cf(l, t, e, a));
    } finally {
      ((j.p = u), (x.T = n));
    }
  }
  function Pm(l, t, e, a) {
    var n = x.T;
    x.T = null;
    var u = j.p;
    try {
      ((j.p = 8), cf(l, t, e, a));
    } finally {
      ((j.p = u), (x.T = n));
    }
  }
  function cf(l, t, e, a) {
    if (Lu) {
      var n = ff(a);
      if (n === null) (Jc(l, t, a, Xu, e), yd(l, a));
      else if (t0(n, l, t, e, a)) a.stopPropagation();
      else if ((yd(l, a), t & 4 && -1 < l0.indexOf(l))) {
        for (; n !== null; ) {
          var u = Je(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var i = Ae(u.pendingLanes);
                  if (i !== 0) {
                    var c = u;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var f = 1 << (31 - rt(i));
                      ((c.entanglements[1] |= f), (i &= ~f));
                    }
                    (Ht(u), (dl & 6) === 0 && ((zu = st() + 500), mn(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((c = De(u, 2)), c !== null && ft(c, u, 2), _u(), uf(u, 2));
            }
          if (((u = ff(a)), u === null && Jc(l, t, a, Xu, e), u === n)) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else Jc(l, t, a, null, e);
    }
  }
  function ff(l) {
    return ((l = si(l)), sf(l));
  }
  var Xu = null;
  function sf(l) {
    if (((Xu = null), (l = Ke(l)), l !== null)) {
      var t = G(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (((l = O(t)), l !== null)) return l;
          l = null;
        } else if (e === 31) {
          if (((l = K(t)), l !== null)) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return ((Xu = l), null);
  }
  function gd(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Gd()) {
          case Tf:
            return 2;
          case zf:
            return 8;
          case Cn:
          case Ld:
            return 32;
          case Ef:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var of = !1,
    be = null,
    xe = null,
    Te = null,
    xn = new Map(),
    Tn = new Map(),
    ze = [],
    l0 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function yd(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        be = null;
        break;
      case "dragenter":
      case "dragleave":
        xe = null;
        break;
      case "mouseover":
      case "mouseout":
        Te = null;
        break;
      case "pointerover":
      case "pointerout":
        xn.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tn.delete(t.pointerId);
    }
  }
  function zn(l, t, e, a, n, u) {
    return l === null || l.nativeEvent !== u
      ? ((l = {
          blockedOn: t,
          domEventName: e,
          eventSystemFlags: a,
          nativeEvent: u,
          targetContainers: [n],
        }),
        t !== null && ((t = Je(t)), t !== null && hd(t)),
        l)
      : ((l.eventSystemFlags |= a),
        (t = l.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        l);
  }
  function t0(l, t, e, a, n) {
    switch (t) {
      case "focusin":
        return ((be = zn(be, l, t, e, a, n)), !0);
      case "dragenter":
        return ((xe = zn(xe, l, t, e, a, n)), !0);
      case "mouseover":
        return ((Te = zn(Te, l, t, e, a, n)), !0);
      case "pointerover":
        var u = n.pointerId;
        return (xn.set(u, zn(xn.get(u) || null, l, t, e, a, n)), !0);
      case "gotpointercapture":
        return ((u = n.pointerId), Tn.set(u, zn(Tn.get(u) || null, l, t, e, a, n)), !0);
    }
    return !1;
  }
  function vd(l) {
    var t = Ke(l.target);
    if (t !== null) {
      var e = G(t);
      if (e !== null) {
        if (((t = e.tag), t === 13)) {
          if (((t = O(e)), t !== null)) {
            ((l.blockedOn = t),
              Cf(l.priority, function () {
                md(e);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = K(e)), t !== null)) {
            ((l.blockedOn = t),
              Cf(l.priority, function () {
                md(e);
              }));
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Qu(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = ff(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(e.type, e);
        ((fi = a), e.target.dispatchEvent(a), (fi = null));
      } else return ((t = Je(e)), t !== null && hd(t), (l.blockedOn = e), !1);
      t.shift();
    }
    return !0;
  }
  function pd(l, t, e) {
    Qu(l) && e.delete(t);
  }
  function e0() {
    ((of = !1),
      be !== null && Qu(be) && (be = null),
      xe !== null && Qu(xe) && (xe = null),
      Te !== null && Qu(Te) && (Te = null),
      xn.forEach(pd),
      Tn.forEach(pd));
  }
  function Zu(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null),
      of || ((of = !0), m.unstable_scheduleCallback(m.unstable_NormalPriority, e0)));
  }
  var Vu = null;
  function Sd(l) {
    Vu !== l &&
      ((Vu = l),
      m.unstable_scheduleCallback(m.unstable_NormalPriority, function () {
        Vu === l && (Vu = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t],
            a = l[t + 1],
            n = l[t + 2];
          if (typeof a != "function") {
            if (sf(a || e) === null) continue;
            break;
          }
          var u = Je(e);
          u !== null &&
            (l.splice(t, 3),
            (t -= 3),
            cc(u, { pending: !0, data: n, method: e.method, action: a }, a, n));
        }
      }));
  }
  function ja(l) {
    function t(f) {
      return Zu(f, l);
    }
    (be !== null && Zu(be, l),
      xe !== null && Zu(xe, l),
      Te !== null && Zu(Te, l),
      xn.forEach(t),
      Tn.forEach(t));
    for (var e = 0; e < ze.length; e++) {
      var a = ze[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < ze.length && ((e = ze[0]), e.blockedOn === null); )
      (vd(e), e.blockedOn === null && ze.shift());
    if (((e = (l.ownerDocument || l).$$reactFormReplay), e != null))
      for (a = 0; a < e.length; a += 3) {
        var n = e[a],
          u = e[a + 1],
          i = n[et] || null;
        if (typeof u == "function") i || Sd(e);
        else if (i) {
          var c = null;
          if (u && u.hasAttribute("formAction")) {
            if (((n = u), (i = u[et] || null))) c = i.formAction;
            else if (sf(n) !== null) continue;
          } else c = i.action;
          (typeof c == "function" ? (e[a + 1] = c) : (e.splice(a, 3), (a -= 3)), Sd(e));
        }
      }
  }
  function bd() {
    function l(u) {
      u.canIntercept &&
        u.info === "react-transition" &&
        u.intercept({
          handler: function () {
            return new Promise(function (i) {
              return (n = i);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      (n !== null && (n(), (n = null)), a || setTimeout(e, 20));
    }
    function e() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u &&
          u.url != null &&
          navigation.navigate(u.url, {
            state: u.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var a = !1,
        n = null;
      return (
        navigation.addEventListener("navigate", l),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(e, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener("navigate", l),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            n !== null && (n(), (n = null)));
        }
      );
    }
  }
  function rf(l) {
    this._internalRoot = l;
  }
  ((Ku.prototype.render = rf.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(d(409));
      var e = t.current,
        a = pt();
      rd(e, a, l, t, null, null);
    }),
    (Ku.prototype.unmount = rf.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          (rd(l.current, 2, null, l, null, null), _u(), (t[Ve] = null));
        }
      }));
  function Ku(l) {
    this._internalRoot = l;
  }
  Ku.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = Of();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < ze.length && t !== 0 && t < ze[e].priority; e++);
      (ze.splice(e, 0, l), e === 0 && vd(l));
    }
  };
  var xd = M.version;
  if (xd !== "19.2.5") throw Error(d(527, xd, "19.2.5"));
  j.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(d(188))
        : ((l = Object.keys(l).join(",")), Error(d(268, l)));
    return ((l = S(t)), (l = l !== null ? Y(l) : null), (l = l === null ? null : l.stateNode), l);
  };
  var a0 = {
    bundleType: 0,
    version: "19.2.5",
    rendererPackageName: "react-dom",
    currentDispatcherRef: x,
    reconcilerVersion: "19.2.5",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ju = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ju.isDisabled && Ju.supportsFiber)
      try {
        ((Da = Ju.inject(a0)), (ot = Ju));
      } catch {}
  }
  return (
    (_n.createRoot = function (l, t) {
      if (!U(l)) throw Error(d(299));
      var e = !1,
        a = "",
        n = Mo,
        u = Oo,
        i = Co;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (e = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
        (t = sd(l, 1, !1, null, null, e, a, null, n, u, i, bd)),
        (l[Ve] = t.current),
        Kc(l),
        new rf(t)
      );
    }),
    (_n.hydrateRoot = function (l, t, e) {
      if (!U(l)) throw Error(d(299));
      var a = !1,
        n = "",
        u = Mo,
        i = Oo,
        c = Co,
        f = null;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (n = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (i = e.onCaughtError),
          e.onRecoverableError !== void 0 && (c = e.onRecoverableError),
          e.formState !== void 0 && (f = e.formState)),
        (t = sd(l, 1, !0, t, e ?? null, a, n, f, u, i, c, bd)),
        (t.context = od(null)),
        (e = t.current),
        (a = pt()),
        (a = li(a)),
        (n = fe(a)),
        (n.callback = null),
        se(e, n, a),
        (e = a),
        (t.current.lanes = e),
        Ra(t, e),
        Ht(t),
        (l[Ve] = t.current),
        Kc(l),
        new Ku(t)
      );
    }),
    (_n.version = "19.2.5"),
    _n
  );
}
var Dd;
function h0() {
  if (Dd) return mf.exports;
  Dd = 1;
  function m() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(m);
      } catch (M) {
        console.error(M);
      }
  }
  return (m(), (mf.exports = d0()), mf.exports);
}
var m0 = h0();
const g0 = Hd(m0),
  pf = {
    scenarios: {
      ground_level: { ratePerMetre: 280, gatePrice: null },
      balcony_balustrade: { ratePerMetre: 320, gatePrice: null },
      premium_pool_fence: { ratePerMetre: 380, gatePrice: 680 },
      stair_balustrade: { ratePerMetre: 330, gatePrice: null },
    },
    minimumLength: 5,
    cornerSurcharge: 85,
    hardwareFinishSurcharge: {
      standard_chrome: 0,
      matte_black: 15,
      brushed_chrome: 12,
      powder_coated: 22,
      not_sure: 0,
    },
    glassTypeSurcharge: { toughened_12mm: 0, laminated: 0 },
    glassColourSurcharge: { clear: 0, low_iron: 0, tinted: 0, frosted: 0 },
    interlikingRailsSurcharge: 0,
    rangeLowPercent: 90,
    rangeHighPercent: 120,
  };
function y0() {
  if (typeof document > "u") return "/wp-content/plugins/rg-calculator/assets/";
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    return "/wordpress-plugin/rg-calculator/assets/";
  const m = window.rgCalculatorConfig;
  if (m?.assetsUrl) return m.assetsUrl;
  const M = document.querySelector('script[src*="rg-calculator.js"]');
  if (M?.src)
    try {
      const B = new URL(M.src, window.location.origin),
        d = B.pathname.slice(0, B.pathname.lastIndexOf("/") + 1);
      return `${B.origin}${d}`;
    } catch {}
  return "/wp-content/plugins/rg-calculator/assets/";
}
const v0 = y0(),
  Ll = (m) => v0 + m,
  zl = {
    groundLevel: Ll("use-deck.jpg"),
    balcony: Ll("use-balcony.jpg"),
    pool: Ll("use-pool.jpg"),
    stairs: Ll("use-stairs.jpg"),
    corners: Ll("feature-corner.jpg"),
    toughened: Ll("glass-12mm.jpg"),
    laminated: Ll("glass-laminated.jpg"),
    colourClear: Ll("clarity-standard.jpg"),
    colourLowIron: Ll("clarity-lowiron.jpg"),
    colourTinted: Ll("clarity-tinted.jpg"),
    colourFrosted: Ll("finish-custom.jpg"),
    spigots: Ll("fix-spigots.jpg"),
    standoff: Ll("fix-standoff.jpg"),
    hiddenChannel: Ll("fix-channel.jpg"),
    chrome: Ll("finish-chrome.jpg"),
    matteBlack: Ll("finish-black.jpg"),
    brushedChrome: Ll("finish-brushed.jpg"),
    powderCoated: Ll("finish-brass.jpg"),
    notSure: Ll("not-sure.jpg"),
    substrateConcrete: Ll("substrate-concrete.jpg"),
    substrateSteel: Ll("substrate-steel.jpg"),
    substrateTile: Ll("substrate-tile.jpg"),
    substrateTimber: Ll("substrate-timber.jpg"),

  };
function p0(m, M = pf) {
  const B = m.scenario === "stair_balustrade" ? m.length + (m.landingLength ?? 0) : m.length,
    d = Math.max(B, M.minimumLength);
  if (!m.scenario)
    return {
      effectiveLength: d,
      subtotal: 0,
      low: 0,
      high: 0,
      needsCallUs: m.callTriggers.length > 0,
      consultationFlags: [],
      breakdown: {
        base: 0,
        gates: 0,
        corners: 0,
        hardwareSurcharge: 0,
        glassTypeSurcharge: 0,
        glassColourSurcharge: 0,
        interlikingRails: 0,
      },
    };
  const U = M.scenarios[m.scenario],
    G = d * U.ratePerMetre,
    O = U.gatePrice !== null ? m.gates * U.gatePrice : 0,
    K = m.corners * M.cornerSurcharge,
    A = M.hardwareFinishSurcharge[m.hardwareFinish ?? "standard_chrome"] ?? 0,
    S = d * A,
    Y = d * (M.glassTypeSurcharge[m.glassType ?? "toughened_12mm"] ?? 0),
    C = d * (M.glassColourSurcharge[m.glassColour] ?? 0),
    Z = m.interlikingRails ? d * M.interlikingRailsSurcharge : 0,
    W = G + O + K + S + Y + C + Z,
    Q = (ol, rl = 50) => Math.round(ol / rl) * rl,
    ul = Q(W * (M.rangeLowPercent / 100)),
    _ = Q(W * (M.rangeHighPercent / 100)),
    w = [];
  return (
    m.fixingMethod === "not_sure" && w.push("Fixing method to be confirmed on site"),
    m.hardwareFinish === "not_sure" && w.push("Hardware finish to be confirmed"),
    m.substrate === "not_sure" && w.push("Substrate to be confirmed on site"),
    {
      effectiveLength: d,
      subtotal: W,
      low: ul,
      high: _,
      needsCallUs: m.callTriggers.length > 0,
      consultationFlags: w,
      breakdown: {
        base: G,
        gates: O,
        corners: K,
        hardwareSurcharge: S,
        glassTypeSurcharge: Y,
        glassColourSurcharge: C,
        interlikingRails: Z,
      },
    }
  );
}
const Ud = (m) =>
  new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    maximumFractionDigits: 0,
  }).format(m);
function S0() {
  const [m, M] = cl.useState(pf),
    [B, d] = cl.useState(!0);
  return (
    cl.useEffect(() => {
      const U =
        typeof rgCalculatorConfig < "u" ? rgCalculatorConfig.restUrl : "/wp-json/royal-glass/v1";
      fetch(`${U}/pricing`)
        .then((G) => G.json())
        .then((G) => {
          const O = G;
          O &&
            typeof O == "object" &&
            O.scenarios &&
            O.hardwareFinishSurcharge &&
            M({ ...pf, ...O });
        })
        .catch(() => {})
        .finally(() => d(!1));
    }, []),
    { pricing: m, loading: B }
  );
}
function Mn() {
  return typeof rgCalculatorConfig < "u"
    ? rgCalculatorConfig
    : { restUrl: "/wp-json/royal-glass/v1", nonce: "", googleMapsKey: "", turnstileSiteKey: "" };
}
function Ma({
  image: m,
  imageAlt: M,
  title: B,
  description: d,
  selected: U,
  onSelect: G,
  badge: O,
  compact: K = !1,
  swatch: A,
}) {
  const [S, Y] = Oa.useState(!1),
    C = U ? "#1a3c5e" : S ? "#c4cdd6" : "#e6eaef",
    Z = U ? "0 8px 24px rgba(26,60,94,0.12)" : S ? "0 6px 16px rgba(15,23,42,0.06)" : "none";
  return s.jsxs("button", {
    type: "button",
    onClick: G,
    onMouseEnter: () => Y(!0),
    onMouseLeave: () => Y(!1),
    "aria-pressed": U,
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      borderRadius: "16px",
      border: `1px solid ${C}`,
      background: "white",
      textAlign: "left",
      cursor: "pointer",
      outline: "none",
      transition: "border-color 0.15s, box-shadow 0.15s",
      boxShadow: Z,
      padding: K ? "12px" : 0,
      width: "100%",
    },
    children: [
      A
        ? s.jsx("div", {
            style: {
              width: "100%",
              height: K ? "64px" : "128px",
              borderRadius: "8px",
              marginBottom: "8px",
              background: A,
            },
            "aria-hidden": "true",
          })
        : m
          ? s.jsx("div", {
              style: { width: "100%", height: K ? "112px" : "176px", overflow: "hidden" },
              children: s.jsx("img", {
                src: m,
                alt: M ?? B,
                style: { height: "100%", width: "100%", objectFit: "cover", display: "block" },
                loading: "lazy",
              }),
            })
          : null,
      s.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: m || A ? "12px" : "16px",
        },
        children: [
          s.jsxs("div", {
            style: { display: "flex", alignItems: "center", gap: "8px" },
            children: [
              s.jsx("span", {
                style: { fontWeight: 600, color: "#111827", fontSize: "14px" },
                children: B,
              }),
              O &&
                s.jsx("span", {
                  style: {
                    borderRadius: "999px",
                    background: "#dcfce7",
                    padding: "2px 8px",
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "#15803d",
                  },
                  children: O,
                }),
              U &&
                s.jsx("span", {
                  style: {
                    marginLeft: "auto",
                    display: "flex",
                    width: "20px",
                    height: "20px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    background: "#1a3c5e",
                    flexShrink: 0,
                  },
                  children: s.jsx("svg", {
                    style: { width: "12px", height: "12px", color: "white" },
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 3,
                    children: s.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M5 13l4 4L19 7",
                    }),
                  }),
                }),
            ],
          }),
          d &&
            s.jsx("p", {
              style: { fontSize: "12px", color: "#6b7280", lineHeight: 1.6, margin: 0, padding: 0 },
              children: d,
            }),
        ],
      }),
    ],
  });
}
function An({ value: m, min: M, max: B, step: d = 1, unit: U, onChange: G, label: O }) {
  const [K, A] = Oa.useState(String(m));
  Oa.useEffect(() => {
    A(String(m));
  }, [m]);
  const S = (W) => G(Number(W.target.value)),
    Y = (W) => A(W.target.value),
    C = () => {
      const W = parseInt(K, 10);
      if (isNaN(W)) A(String(m));
      else {
        const Q = Math.min(B, Math.max(M, W));
        (G(Q), A(String(Q)));
      }
    },
    Z = (W) => {
      W.key === "Enter" && C();
    };
  return s.jsxs("div", {
    style: { display: "flex", flexDirection: "column", gap: "16px" },
    children: [
      O && s.jsx("span", { style: { fontSize: "12px", color: "#6b7280" }, children: O }),
      s.jsxs("div", {
        style: { display: "flex", alignItems: "baseline", gap: "8px", justifyContent: "center" },
        children: [
          s.jsx("span", {
            style: {
              fontSize: "48px",
              fontWeight: 700,
              color: "#1a3c5e",
              fontVariantNumeric: "tabular-nums",
            },
            children: m,
          }),
          s.jsx("span", { style: { fontSize: "20px", color: "#9ca3af" }, children: U }),
        ],
      }),
      s.jsx("input", {
        type: "range",
        min: M,
        max: B,
        step: d,
        value: m,
        onChange: S,
        style: { width: "100%", accentColor: "#1a3c5e" },
        "aria-label": `${U} slider`,
      }),
      s.jsxs("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#9ca3af",
        },
        children: [s.jsxs("span", { children: [M, U] }), s.jsxs("span", { children: [B, U] })],
      }),
      s.jsxs("div", {
        style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" },
        children: [
          s.jsx("span", {
            style: { fontSize: "14px", color: "#6b7280" },
            children: "Or type a number:",
          }),
          s.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "4px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              padding: "6px 12px",
            },
            children: [
              s.jsx("input", {
                type: "number",
                min: M,
                max: B,
                value: K,
                onChange: Y,
                onBlur: C,
                onKeyDown: Z,
                style: {
                  width: "64px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: 500,
                  outline: "none",
                  background: "transparent",
                  border: "none",
                },
                "aria-label": `Enter ${U} manually`,
              }),
              s.jsx("span", { style: { fontSize: "14px", color: "#9ca3af" }, children: U }),
            ],
          }),
        ],
      }),
    ],
  });
}
function jn({ children: m }) {
  return s.jsxs("div", {
    style: {
      display: "flex",
      gap: "8px",
      borderRadius: "12px",
      background: "#f5f8fc",
      border: "1px solid #dbe4ef",
      padding: "12px",
      fontSize: "14px",
      color: "#244160",
    },
    children: [
      s.jsx("svg", {
        style: { marginTop: "2px", width: "16px", height: "16px", flexShrink: 0 },
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: s.jsx("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        }),
      }),
      s.jsx("span", { children: m }),
    ],
  });
}
function b0({ children: m }) {
  return s.jsxs("div", {
    style: {
      display: "flex",
      gap: "8px",
      borderRadius: "12px",
      background: "#fff8ef",
      border: "1px solid #f8ddb6",
      padding: "12px",
      fontSize: "14px",
      color: "#8a4f0f",
    },
    children: [
      s.jsx("svg", {
        style: { marginTop: "2px", width: "16px", height: "16px", flexShrink: 0 },
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: s.jsx("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
        }),
      }),
      s.jsx("span", { children: m }),
    ],
  });
}
function Rd({ src: m, alt: M }) {
  return s.jsx("div", {
    style: {
      width: "100%",
      height: "180px",
      overflow: "hidden",
      borderRadius: "12px",
      marginBottom: "24px",
    },
    children: s.jsx("img", {
      src: m,
      alt: M,
      style: { height: "100%", width: "100%", objectFit: "cover", display: "block" },
      loading: "lazy",
    }),
  });
}
function x0({ number: m, title: M, children: B }) {
  return s.jsxs("div", {
    style: { marginBottom: "40px" },
    children: [
      s.jsxs("div", {
        style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" },
        children: [
          s.jsx("div", {
            style: {
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#1a3c5e",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: "700",
              flexShrink: 0,
            },
            children: m,
          }),
          s.jsx("h2", {
            style: { margin: 0, fontSize: "18px", fontWeight: "700", color: "#1a3c5e" },
            children: M,
          }),
        ],
      }),
      B,
    ],
  });
}
const T0 = [
    {
      value: "ground_level",
      title: "Ground Level Fence",
      description: "Outdoor area or pool — height ≤1m — standard residential",
      image: zl.groundLevel,
    },
    {
      value: "balcony_balustrade",
      title: "Balcony / Patio Balustrade",
      description: "Elevated deck, balcony or patio — height >1m (NZBC 1m minimum)",
      image: zl.balcony,
    },
    {
      value: "premium_pool_fence",
      title: "Premium Pool Fence",
      description: "Pool barrier — NZ Pool Safety Act — 1.2m minimum height",
      image: zl.pool,
    },
    {
      value: "stair_balustrade",
      title: "Stair Balustrade",
      description: "Glass panels along stairs — NZBC stair safety code",
      image: zl.stairs,
    },
  ],
  z0 = [
    {
      value: "toughened_12mm",
      title: "12mm Toughened + Capping",
      description: "Standard for balconies and stairs — durable, NZBC compliant",
      image: zl.toughened,
      badge: "STANDARD",
    },
    {
      value: "laminated",
      title: "Laminated Glass",
      description: "No capping required — holds together if broken, suits certain designs",
      image: zl.laminated,
      badge: "PREMIUM",
    },
  ],
  E0 = [
    {
      value: "clear",
      title: "Clear",
      description: "Standard clear glass — included in base price",
      image: zl.colourClear,
      badge: "STANDARD",
    },
    {
      value: "tinted",
      title: "Tinted Glass",
      description: "Grey, bronze, or blue-green — privacy and style",
      image: zl.colourTinted,
    },
    {
      value: "frosted",
      title: "Frosted Glass",
      description: "Diffused light, privacy without full opacity",
      image: zl.colourFrosted,
    },
    {
      value: "low_iron",
      title: "Low Iron / Ultra-Clear",
      description: "Minimal green tint — truer colour transparency",
      image: zl.colourLowIron,
    },
  ],
  _0 = [
    {
      value: "spigots",
      title: "Spigots",
      description: "Round or square posts drilled into the floor — most common",
      image: zl.spigots,
    },
    {
      value: "standoff_posts",
      title: "Stand-off Posts",
      description: "Bracket-mounted on the face of the structure",
      image: zl.standoff,
    },
    {
      value: "hidden_channel",
      title: "Hidden Channel",
      description: "Glass appears to float — recessed channel in the floor",
      image: zl.hiddenChannel,
    },
    {
      value: "not_sure",
      title: "Not Sure",
      description: "Our team will recommend the best option on site",
      image: zl.notSure,
    },
  ],
  A0 = [
    {
      value: "timber",
      title: "Timber",
      description: "Decking, joists or timber framing",
      image: zl.substrateTimber,
    },
    {
      value: "concrete",
      title: "Concrete",
      description: "Poured concrete slab or posts",
      image: zl.substrateConcrete,
    },
    {
      value: "tile",
      title: "Tile",
      description: "Tiled surface — pool surrounds, balconies",
      image: zl.substrateTile,
    },
    {
      value: "steel",
      title: "Steel",
      description: "Steel frame or structural steel",
      image: zl.substrateSteel,
    },
    {
      value: "not_sure",
      title: "Not Sure",
      description: "Our team will confirm on site",
      image: zl.notSure,
    },
  ],
  j0 = [
    {
      value: "standard_chrome",
      title: "Chrome",
      description: "Included in base price",
      image: zl.chrome,
      badge: "STANDARD",
    },
    {
      value: "matte_black",
      title: "Matte Black",
      description: "Most popular premium finish",
      image: zl.matteBlack,
      surcharge: "+$15/m",
    },
    {
      value: "brushed_chrome",
      title: "Brushed Chrome",
      description: "Subtle step up from standard",
      image: zl.brushedChrome,
      surcharge: "+$12/m",
    },
    {
      value: "powder_coated",
      title: "Powder Coated",
      description: "Durable colour coating — range of colours available",
      image: zl.powderCoated,
      surcharge: "+$22/m",
    },
    {
      value: "not_sure",
      title: "Not Sure",
      description: "Team will help you choose on site",
      image: zl.notSure,
    },
  ];
function M0({ answers: m, onChange: M, onGetEstimate: B }) {
  const [d, U] = cl.useState(0),
    G = m.scenario !== "premium_pool_fence",
    O = m.scenario === "ground_level" || m.scenario === "premium_pool_fence",
    K = m.scenario === "stair_balustrade";
  function A(_) {
    const w = { scenario: _ };
    (_ === "stair_balustrade"
      ? ((w.gates = 0), (w.corners = 0), (w.glassType = null))
      : _ === "premium_pool_fence"
        ? (m.gates === 0 && (w.gates = 1),
          (w.glassType = "toughened_12mm"),
          (w.interlikingRails = !1),
          (w.landingLength = 0))
        : _ === "ground_level"
          ? ((w.gates = 0),
            (w.glassType = "toughened_12mm"),
            (w.interlikingRails = !1),
            (w.landingLength = 0))
          : ((w.gates = 0), (w.glassType = null), (w.landingLength = 0)),
      M(w));
  }
  function S(_) {
    const w = { glassType: _ };
    (_ === "toughened_12mm"
      ? (w.interlikingRails = !0)
      : _ === "laminated" && (w.interlikingRails = !1),
      M(w));
  }
  const Y = [
      {
        title: "What's your project?",
        canContinue: m.scenario !== null,
        content: s.jsx("div", {
          style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" },
          children: T0.map((_) =>
            s.jsx(
              Ma,
              {
                image: _.image,
                title: _.title,
                description: _.description,
                selected: m.scenario === _.value,
                onSelect: () => A(_.value),
              },
              _.value,
            ),
          ),
        }),
      },
      {
        title: "Total length of glass run",
        canContinue: !0,
        content: s.jsxs(s.Fragment, {
          children: [
            s.jsx(Rd, { src: zl.balcony, alt: "Glass fencing project" }),
            m.scenario === "stair_balustrade"
              ? s.jsxs(s.Fragment, {
                  children: [
                    s.jsx(An, {
                      label: "Stair run",
                      value: m.length,
                      min: 1,
                      max: 100,
                      step: 1,
                      unit: "m",
                      onChange: (_) => M({ length: _ }),
                    }),
                    s.jsx(An, {
                      label: "Landing area",
                      value: m.landingLength,
                      min: 0,
                      max: 50,
                      step: 1,
                      unit: "m",
                      onChange: (_) => M({ landingLength: _ }),
                    }),
                    s.jsxs(jn, {
                      children: ["Total ", m.length + m.landingLength, "m will be priced"],
                    }),
                  ],
                })
              : s.jsxs(s.Fragment, {
                  children: [
                    s.jsx(An, {
                      label: "Metres",
                      value: m.length,
                      min: 1,
                      max: 100,
                      step: 1,
                      unit: "m",
                      onChange: (_) => M({ length: _ }),
                    }),
                    m.length < 5 &&
                      s.jsx(jn, {
                        children: "Minimum job is 5 m — shorter runs are charged as 5 m.",
                      }),
                  ],
                }),
          ],
        }),
      },
      ...(K
        ? []
        : [
            {
              title: "How many corners?",
              canContinue: !0,
              content: s.jsxs(s.Fragment, {
                children: [
                  s.jsx(Rd, { src: zl.corners, alt: "How to count corners" }),
                  s.jsx(An, {
                    label: "Corners",
                    value: m.corners,
                    min: 0,
                    max: 10,
                    step: 1,
                    unit: "",
                    onChange: (_) => M({ corners: _ }),
                  }),
                  s.jsx(jn, { children: "Count every 90° turn in the glass run." }),
                ],
              }),
            },
          ]),
      ...(G
        ? []
        : [
            {
              title: "How many gates?",
              canContinue: !0,
              content: s.jsxs(s.Fragment, {
                children: [
                  s.jsx(An, {
                    label: "Gates",
                    value: m.gates,
                    min: 0,
                    max: 6,
                    step: 1,
                    unit: "",
                    onChange: (_) => M({ gates: _ }),
                  }),
                  s.jsx(jn, {
                    children:
                      "NZ Pool Safety Act requires at least 1 self-closing, lockable gate on all pool fences.",
                  }),
                  s.jsx(jn, {
                    children:
                      "We use high-quality stainless steel gate hardware on all pool fence installations.",
                  }),
                  m.gates === 0 &&
                    s.jsx(b0, {
                      children:
                        "You've set 0 gates — this may not meet NZ Pool Safety Act requirements. If access is via another compliant barrier (e.g. a locked door), zero gates is acceptable.",
                    }),
                ],
              }),
            },
          ]),
      ...(O
        ? []
        : [
            {
              title: "Glass type",
              canContinue: m.glassType !== null,
              content: s.jsxs(s.Fragment, {
                children: [
                  s.jsx("p", {
                    style: { margin: "0 0 12px", fontSize: "13px", color: "#6b7280" },
                    children:
                      "Toughened glass includes a capping rail at the top. Laminated glass bonds two layers and needs no capping.",
                  }),
                  s.jsx("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: "12px",
                    },
                    children: z0.map((_) =>
                      s.jsx(
                        Ma,
                        {
                          image: _.image,
                          title: _.title,
                          description: _.description,
                          selected: m.glassType === _.value,
                          onSelect: () => S(_.value),
                          badge: _.badge,
                        },
                        _.value,
                      ),
                    ),
                  }),
                ],
              }),
            },
          ]),
      {
        title: "Glass colour",
        canContinue: !0,
        content: s.jsx("div", {
          style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" },
          children: E0.map((_) =>
            s.jsx(
              Ma,
              {
                image: _.image,
                title: _.title,
                description: _.description,
                selected: m.glassColour === _.value,
                onSelect: () => M({ glassColour: _.value }),
                badge: _.badge,
                compact: !0,
              },
              _.value,
            ),
          ),
        }),
      },
      {
        title: "How will the glass be fixed?",
        canContinue: m.fixingMethod !== null,
        content: s.jsxs(s.Fragment, {
          children: [
            s.jsx("p", {
              style: { margin: "0 0 12px", fontSize: "13px", color: "#6b7280" },
              children:
                "This is a preference — no price impact. Our team will confirm suitability on site.",
            }),
            s.jsx("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
              },
              children: _0.map((_) =>
                s.jsx(
                  Ma,
                  {
                    image: _.image,
                    title: _.title,
                    description: _.description,
                    selected: m.fixingMethod === _.value,
                    onSelect: () => M({ fixingMethod: _.value }),
                    compact: !0,
                  },
                  _.value,
                ),
              ),
            }),
          ],
        }),
      },
      {
        title: "What is the substrate?",
        canContinue: m.substrate !== null,
        content: s.jsxs(s.Fragment, {
          children: [
            s.jsx("p", {
              style: { margin: "0 0 12px", fontSize: "13px", color: "#6b7280" },
              children:
                "The material the glass will be fixed into or onto. This helps us plan the right fixing detail.",
            }),
            s.jsx("div", {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "12px",
              },
              children: A0.map((_) =>
                s.jsx(
                  Ma,
                  {
                    image: _.image,
                    title: _.title,
                    description: _.description,
                    selected: m.substrate === _.value,
                    onSelect: () => M({ substrate: _.value }),
                    compact: !0,
                  },
                  _.value,
                ),
              ),
            }),
          ],
        }),
      },
      {
        title: "Hardware finish",
        canContinue: m.hardwareFinish !== null,
        content: s.jsx("div", {
          style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px" },
          children: j0.map((_) =>
            s.jsx(
              Ma,
              {
                image: _.image,
                title: _.title,
                description: `${_.description}${_.surcharge ? ` — ${_.surcharge}` : ""}`,
                selected: m.hardwareFinish === _.value,
                onSelect: () => M({ hardwareFinish: _.value }),
                badge: _.badge,
                compact: !0,
              },
              _.value,
            ),
          ),
        }),
      },
    ],
    C = Y[Math.min(d, Y.length - 1)],
    Z = d === Y.length - 1,
    W = Math.round(((d + 1) / Y.length) * 100);
  function Q() {
    U((_) => Math.max(0, _ - 1));
  }
  function ul() {
    C.canContinue && (Z ? B() : U((_) => Math.min(Y.length - 1, _ + 1)));
  }
  return s.jsxs("div", {
    style: { maxWidth: "720px", margin: "0 auto", padding: "24px 16px", fontFamily: "inherit" },
    children: [
      s.jsxs("div", {
        style: { marginBottom: "40px", textAlign: "center" },
        children: [
          s.jsx("h1", {
            style: { margin: "0 0 8px", fontSize: "28px", fontWeight: "800", color: "#1a3c5e" },
            children: "Get a Glass Estimate",
          }),
          s.jsx("p", {
            style: { margin: 0, color: "#6b7280", fontSize: "15px" },
            children:
              "Answer a few questions, enter your details, and then view your indicative estimate.",
          }),
        ],
      }),
      s.jsxs("div", {
        style: { marginBottom: "24px" },
        children: [
          s.jsxs("div", {
            style: { display: "flex", justifyContent: "space-between", marginBottom: "8px" },
            children: [
              s.jsxs("span", {
                style: { fontSize: "12px", fontWeight: 700, color: "#1a3c5e" },
                children: ["Step ", d + 1, " of ", Y.length],
              }),
              s.jsxs("span", { style: { fontSize: "12px", color: "#6b7280" }, children: [W, "%"] }),
            ],
          }),
          s.jsx("div", {
            style: {
              height: "6px",
              width: "100%",
              background: "#e6eaef",
              borderRadius: "999px",
              overflow: "hidden",
            },
            children: s.jsx("div", {
              style: {
                height: "100%",
                width: `${W}%`,
                background: "#1a3c5e",
                borderRadius: "999px",
                transition: "width 0.25s ease",
              },
            }),
          }),
        ],
      }),
      s.jsx(x0, { number: d + 1, title: C.title, children: C.content }),
      s.jsxs("div", {
        style: {
          borderTop: "2px solid #e6eaef",
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
        },
        children: [
          s.jsx("button", {
            type: "button",
            onClick: Q,
            disabled: d === 0,
            style: {
              padding: "12px 18px",
              borderRadius: "10px",
              background: "white",
              color: d === 0 ? "#9ca3af" : "#1a3c5e",
              border: "1px solid #d1d5db",
              cursor: d === 0 ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "700",
            },
            children: "Back",
          }),
          s.jsx("button", {
            type: "button",
            onClick: ul,
            disabled: !C.canContinue,
            style: {
              flex: 1,
              padding: "14px 18px",
              borderRadius: "10px",
              background: C.canContinue ? "#1a3c5e" : "#9ca3af",
              color: "white",
              border: "none",
              cursor: C.canContinue ? "pointer" : "not-allowed",
              fontSize: "15px",
              fontWeight: "700",
            },
            children: Z ? "Continue — Enter Your Details" : "Continue",
          }),
        ],
      }),
    ],
  });
}
function O0({ value: m, onChange: M, error: B }) {
  const [d, U] = cl.useState(m),
    [G, O] = cl.useState([]),
    [K, A] = cl.useState(!1),
    [S, Y] = cl.useState(!1),
    [C, Z] = cl.useState(null),
    W = cl.useRef(null),
    Q = cl.useRef(null);
  cl.useEffect(() => {
    function ol(rl) {
      Q.current && !Q.current.contains(rl.target) && A(!1);
    }
    return (
      document.addEventListener("mousedown", ol),
      () => document.removeEventListener("mousedown", ol)
    );
  }, []);
  const ul = cl.useCallback(async (ol) => {
    if (ol.length < 3) {
      (O([]), A(!1));
      return;
    }
    Y(!0);
    try {
      const rl = new URLSearchParams({
          q: ol,
          countrycodes: "nz",
          format: "jsonv2",
          addressdetails: "1",
          limit: "6",
        }),
        Zl = new AbortController(),
        tt = setTimeout(() => Zl.abort(), 7e3),
        Rl = await fetch(`https://nominatim.openstreetmap.org/search?${rl}`, {
          headers: { "Accept-Language": "en-NZ,en" },
          signal: Zl.signal,
        });
      if ((clearTimeout(tt), !Rl.ok)) throw new Error("Search failed");
      const Al = (await Rl.json()).map((Nl) => ({
        ...Nl,
        display_name: Nl.display_name.replace(/, New Zealand$/, "").replace(/, Aotearoa$/, ""),
      }));
      (O(Al), A(!0));
    } catch {
      (O([]), A(!0));
    } finally {
      Y(!1);
    }
  }, []);
  function _(ol) {
    const rl = ol.target.value;
    (U(rl),
      M(rl),
      W.current && clearTimeout(W.current),
      (W.current = setTimeout(() => ul(rl), 350)));
  }
  function w(ol) {
    (U(ol.display_name), M(ol.display_name), O([]), A(!1));
  }
  return s.jsxs("div", {
    ref: Q,
    style: { position: "relative" },
    children: [
      s.jsxs("div", {
        style: { position: "relative" },
        children: [
          s.jsx("input", {
            type: "text",
            autoComplete: "off",
            placeholder: "23 Example Street, Auckland",
            value: d,
            onChange: _,
            onFocus: () => G.length > 0 && A(!0),
            "aria-label": "Project address",
            "aria-autocomplete": "list",
            "aria-expanded": K,
            style: {
              width: "100%",
              padding: "10px 36px 10px 12px",
              border: `1px solid ${B ? "#f87171" : "#d1d5db"}`,
              background: B ? "#fef2f2" : "white",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box",
            },
          }),
          S &&
            s.jsx("div", {
              style: {
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              },
              children: s.jsxs("svg", {
                style: {
                  width: "16px",
                  height: "16px",
                  color: "#9ca3af",
                  animation: "rg-spin 1s linear infinite",
                },
                viewBox: "0 0 24 24",
                fill: "none",
                children: [
                  s.jsx("circle", {
                    style: { opacity: 0.25 },
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4",
                  }),
                  s.jsx("path", {
                    style: { opacity: 0.75 },
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z",
                  }),
                ],
              }),
            }),
        ],
      }),
      K &&
        s.jsxs("ul", {
          role: "listbox",
          style: {
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 50,
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            background: "white",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
            overflow: "hidden",
            margin: 0,
            padding: 0,
            listStyle: "none",
          },
          children: [
            G.map((ol) =>
              s.jsxs(
                "li",
                {
                  role: "option",
                  "aria-selected": !1,
                  onMouseEnter: () => Z(ol.place_id),
                  onMouseLeave: () => Z(null),
                  onMouseDown: (rl) => {
                    (rl.preventDefault(), w(ol));
                  },
                  style: {
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "flex-start",
                    gap: "8px",
                    padding: "10px 12px",
                    fontSize: "14px",
                    background: C === ol.place_id ? "#eff6ff" : "white",
                  },
                  children: [
                    s.jsxs("svg", {
                      style: {
                        marginTop: "2px",
                        width: "16px",
                        height: "16px",
                        flexShrink: 0,
                        color: "#9ca3af",
                      },
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      children: [
                        s.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                        }),
                        s.jsx("path", {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                        }),
                      ],
                    }),
                    s.jsx("span", {
                      style: { color: "#374151", lineHeight: 1.4 },
                      children: ol.display_name,
                    }),
                  ],
                },
                ol.place_id,
              ),
            ),
            !S &&
              G.length === 0 &&
              s.jsx("li", {
                style: { padding: "10px 12px", fontSize: "14px", color: "#6b7280" },
                children: "No NZ address suggestions found. Keep typing a fuller address.",
              }),
          ],
        }),
      !B &&
        s.jsx("p", {
          style: { marginTop: "4px", fontSize: "12px", color: "#9ca3af" },
          children: "Start typing your NZ address — suggestions will appear",
        }),
      B &&
        s.jsx("p", {
          style: { marginTop: "4px", fontSize: "12px", color: "#dc2626" },
          children: B,
        }),
    ],
  });
}
const C0 = /^(\+?64[\s-]?)?(\(?0?[2-9]\d?\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4})$/,
  D0 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  U0 = [
    { value: "homeowner", label: "Homeowner" },
    { value: "builder", label: "Builder" },
    { value: "architect", label: "Architect / designer" },
    { value: "developer", label: "Developer" },
    { value: "other", label: "Other" },
  ],
  R0 = [
    { value: "asap", label: "ASAP" },
    { value: "1_3_months", label: "1–3 months" },
    { value: "3_6_months", label: "3–6 months" },
    { value: "6_plus_months", label: "6+ months" },
    { value: "just_planning", label: "Just planning / budgeting" },
  ];
function N0({ answers: m, estimate: M, loadedAt: B, onSuccess: d, onBack: U }) {
  function G(q) {
    return q.replace(/[^0-9+\s().-]/g, "");
  }
  const [O, K] = cl.useState({
      fullName: "",
      phone: "",
      email: "",
      customerType: null,
      timeframe: null,
      address: "",
      notes: "",
      consent: !1,
      marketingConsent: !1,
    }),
    [A, S] = cl.useState({}),
    [Y, C] = cl.useState(!1),
    [Z, W] = cl.useState(""),
    Q = cl.useRef(null),
    ul = cl.useRef(null),
    _ = cl.useRef(""),
    w = cl.useRef([]),
    ol = cl.useRef(null);
  Oa.useEffect(() => {
    if (!Q.current) return;
    const q = Mn();
    if (!q.turnstileSiteKey) return;
    let X;
    function yl() {
      !Q.current ||
        !window.turnstile ||
        ul.current ||
        ((ul.current = window.turnstile.render(Q.current, {
          sitekey: q.turnstileSiteKey,
          callback: ($l) => {
            ((_.current = $l), w.current.forEach((Kl) => Kl($l)), (w.current = []));
          },
          "expired-callback": () => {
            _.current = "";
          },
          size: "invisible",
          appearance: "interaction-only",
        })),
        (X = () => {
          ul.current &&
            window.turnstile &&
            (window.turnstile.remove(ul.current), (ul.current = null));
        }));
    }
    if (window.turnstile) return (yl(), () => X?.());
    const Vl = window.setInterval(() => {
      window.turnstile && (window.clearInterval(Vl), yl());
    }, 200);
    return () => {
      (window.clearInterval(Vl), X?.());
    };
  }, []);
  function rl() {
    const q = {};
    return (
      O.fullName.trim() || (q.fullName = "Full name is required"),
      O.phone.trim()
        ? C0.test(O.phone.replace(/\s/g, "")) || (q.phone = "Enter a valid NZ phone number")
        : (q.phone = "Phone number is required"),
      O.email.trim()
        ? D0.test(O.email) || (q.email = "Enter a valid email address")
        : (q.email = "Email is required"),
      O.customerType || (q.customerType = "Please select one"),
      O.timeframe || (q.timeframe = "Please select one"),
      O.address.trim() || (q.address = "Project address is required"),
      O.consent || (q.consent = "Please agree to be contacted"),
      S(q),
      Object.keys(q).length === 0
    );
  }
  async function Zl() {
    if (!Mn().turnstileSiteKey || _.current) return !0;
    if (!window.turnstile || !ul.current)
      return (W("Security check is still loading. Please wait a moment and try again."), !1);
    const X = new Promise((yl, Vl) => {
      const $l = window.setTimeout(() => Vl(new Error("timeout")), 8e3);
      w.current.push((Kl) => {
        (window.clearTimeout($l), yl(Kl));
      });
    });
    try {
      return (
        window.turnstile.reset(ul.current),
        window.turnstile.execute(ul.current),
        await X,
        !!_.current
      );
    } catch {
      return (W("Security check failed to load. Please reload the page and try again."), !1);
    }
  }
  async function tt(q) {
    if ((q.preventDefault(), !(!rl() || ol.current?.value || !(await Zl())))) {
      (C(!0), W(""));
      try {
        const yl = Mn(),
          [Vl, ...$l] = O.fullName.trim().split(/\s+/),
          Kl = {
            firstName: Vl ?? "",
            lastName: $l.join(" ").trim(),
            phone: O.phone,
            email: O.email,
            address: O.address,
            callPreference: "anytime",
            notes: O.notes.trim(),
            consent: O.consent,
            websiteUrl: ol.current?.value ?? "",
          },
          j = await (
            await fetch(`${yl.restUrl}/leads`, {
              method: "POST",
              headers: { "Content-Type": "application/json", "X-WP-Nonce": yl.nonce },
              body: JSON.stringify({
                answers: m,
                lead: Kl,
                estimate: M,
                turnstileToken: _.current,
                loadedAt: B,
              }),
            })
          ).json();
        j.ok
          ? d(j.leadId ?? 0, O.email, Vl ?? "")
          : W(j.error ?? "Something went wrong. Please try again.");
      } catch {
        W("Unable to submit. Please check your connection or call 0800 769 254.");
      } finally {
        C(!1);
      }
    }
  }
  const Rl = (q, X, yl, Vl) =>
      s.jsx(
        "button",
        {
          type: "button",
          onClick: yl,
          style: {
            padding: "10px 14px",
            borderRadius: "8px",
            border: `2px solid ${X ? "#1a3c5e" : Vl ? "#f87171" : "#e5e7eb"}`,
            background: X ? "#eef2f7" : "white",
            fontSize: "14px",
            fontWeight: X ? 600 : 400,
            color: X ? "#1a3c5e" : "#374151",
            cursor: "pointer",
            textAlign: "left",
          },
          children: q,
        },
        q,
      ),
    I = (q) => ({
      width: "100%",
      padding: "10px 12px",
      border: `1px solid ${q ? "#f87171" : "#d1d5db"}`,
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
      boxSizing: "border-box",
    }),
    Al = (q, X) =>
      s.jsxs("div", {
        style: { fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" },
        children: [
          q,
          X && s.jsx("span", { style: { color: "#ef4444", marginLeft: "2px" }, children: "*" }),
        ],
      }),
    Nl = (q) =>
      A[q]
        ? s.jsx("p", {
            style: { fontSize: "12px", color: "#ef4444", marginTop: "4px" },
            children: A[q],
          })
        : null;
  return s.jsxs("div", {
    children: [
      s.jsx("h2", {
        style: { fontSize: "28px", fontWeight: 700, color: "#111", marginBottom: "8px" },
        children: "Almost there!",
      }),
      s.jsx("p", {
        style: { fontSize: "15px", color: "#6b7280", marginBottom: "32px", lineHeight: 1.5 },
        children: "We'll show your indicative range and forward your details to Royal Glass.",
      }),
      s.jsxs("form", {
        onSubmit: tt,
        noValidate: !0,
        children: [
          s.jsx("input", {
            ref: ol,
            type: "text",
            name: "website_url",
            tabIndex: -1,
            "aria-hidden": "true",
            style: { position: "absolute", left: "-9999px", opacity: 0, height: 0 },
          }),
          s.jsxs("div", {
            style: { display: "flex", flexDirection: "column", gap: "20px" },
            children: [
              s.jsxs("div", {
                children: [
                  Al("Full name", !0),
                  s.jsx("input", {
                    type: "text",
                    autoComplete: "name",
                    placeholder: "Sarah Johnson",
                    style: I(A.fullName),
                    value: O.fullName,
                    onChange: (q) => {
                      (K((X) => ({ ...X, fullName: q.target.value })),
                        S((X) => ({ ...X, fullName: "" })));
                    },
                  }),
                  Nl("fullName"),
                ],
              }),
              s.jsxs("div", {
                style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
                children: [
                  s.jsxs("div", {
                    children: [
                      Al("Email", !0),
                      s.jsx("input", {
                        type: "email",
                        autoComplete: "email",
                        placeholder: "sarah@example.com",
                        style: I(A.email),
                        value: O.email,
                        onChange: (q) => {
                          (K((X) => ({ ...X, email: q.target.value })),
                            S((X) => ({ ...X, email: "" })));
                        },
                      }),
                      Nl("email"),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      Al("Phone", !0),
                      s.jsx("input", {
                        type: "tel",
                        autoComplete: "tel",
                        inputMode: "numeric",
                        placeholder: "e.g. 021 123 4567",
                        style: I(A.phone),
                        value: O.phone,
                        onChange: (q) => {
                          const X = G(q.target.value);
                          (K((yl) => ({ ...yl, phone: X })), S((yl) => ({ ...yl, phone: "" })));
                        },
                      }),
                      Nl("phone"),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" },
                children: [
                  s.jsxs("div", {
                    children: [
                      Al("I'm a...", !0),
                      s.jsx("div", {
                        style: { display: "flex", flexWrap: "wrap", gap: "8px" },
                        children: U0.map((q) =>
                          Rl(
                            q.label,
                            O.customerType === q.value,
                            () => {
                              (K((X) => ({ ...X, customerType: q.value })),
                                S((X) => ({ ...X, customerType: "" })));
                            },
                            !!A.customerType,
                          ),
                        ),
                      }),
                      Nl("customerType"),
                    ],
                  }),
                  s.jsxs("div", {
                    children: [
                      Al("Timeframe", !0),
                      s.jsx("div", {
                        style: { display: "flex", flexWrap: "wrap", gap: "8px" },
                        children: R0.map((q) =>
                          Rl(
                            q.label,
                            O.timeframe === q.value,
                            () => {
                              (K((X) => ({ ...X, timeframe: q.value })),
                                S((X) => ({ ...X, timeframe: "" })));
                            },
                            !!A.timeframe,
                          ),
                        ),
                      }),
                      Nl("timeframe"),
                    ],
                  }),
                ],
              }),
              s.jsxs("div", {
                children: [
                  Al("Project address", !0),
                  s.jsx(O0, {
                    value: O.address,
                    onChange: (q) => {
                      (K((X) => ({ ...X, address: q })), S((X) => ({ ...X, address: "" })));
                    },
                    error: A.address,
                  }),
                ],
              }),
              s.jsxs("div", {
                children: [
                  Al("Anything else we should know? (optional)"),
                  s.jsx("textarea", {
                    value: O.notes,
                    onChange: (q) => K((X) => ({ ...X, notes: q.target.value })),
                    placeholder:
                      "e.g. pool fence needs a self-closing gate, balcony is on the second floor, access is through a narrow gate…",
                    rows: 3,
                    style: { ...I(), resize: "vertical", fontFamily: "inherit", lineHeight: 1.5 },
                  }),
                ],
              }),
              s.jsxs("div", {
                style: {
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                },
                children: [
                  s.jsxs("label", {
                    style: {
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      cursor: "pointer",
                    },
                    children: [
                      s.jsx("input", {
                        type: "checkbox",
                        checked: O.consent,
                        onChange: (q) => {
                          (K((X) => ({ ...X, consent: q.target.checked })),
                            S((X) => ({ ...X, consent: "" })));
                        },
                        style: {
                          marginTop: "2px",
                          width: "16px",
                          height: "16px",
                          cursor: "pointer",
                        },
                      }),
                      s.jsxs("span", {
                        style: { fontSize: "13px", color: "#374151", lineHeight: 1.5 },
                        children: [
                          "I agree Royal Glass may contact me about my enquiry and store my details for that purpose. ",
                          s.jsx("span", { style: { color: "#ef4444" }, children: "*" }),
                        ],
                      }),
                    ],
                  }),
                  Nl("consent"),
                  s.jsxs("label", {
                    style: {
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      cursor: "pointer",
                    },
                    children: [
                      s.jsx("input", {
                        type: "checkbox",
                        checked: O.marketingConsent,
                        onChange: (q) => K((X) => ({ ...X, marketingConsent: q.target.checked })),
                        style: {
                          marginTop: "2px",
                          width: "16px",
                          height: "16px",
                          cursor: "pointer",
                        },
                      }),
                      s.jsx("span", {
                        style: { fontSize: "13px", color: "#6b7280", lineHeight: 1.5 },
                        children: "I'd also like occasional updates from Royal Glass. (optional)",
                      }),
                    ],
                  }),
                ],
              }),
              s.jsx("p", {
                style: { fontSize: "12px", color: "#9ca3af", lineHeight: 1.5 },
                children:
                  "ⓘ This is an indicative starting estimate, not a formal quote. Final pricing is confirmed by Royal Glass after a site visit.",
              }),
              s.jsx("div", { ref: Q }),
              Z &&
                s.jsx("div", {
                  style: {
                    padding: "12px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    borderRadius: "8px",
                    fontSize: "14px",
                    color: "#dc2626",
                  },
                  children: Z,
                }),
            ],
          }),
          s.jsxs("div", {
            style: {
              marginTop: "32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
            children: [
              s.jsx("button", {
                type: "button",
                onClick: U,
                style: {
                  padding: "10px 20px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  background: "white",
                  fontSize: "14px",
                  color: "#374151",
                  cursor: "pointer",
                },
                children: "← Back",
              }),
              s.jsx("button", {
                type: "submit",
                disabled: Y,
                style: {
                  padding: "12px 28px",
                  borderRadius: "8px",
                  border: "none",
                  background: Y ? "#9ca3af" : "#1a3c5e",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: Y ? "not-allowed" : "pointer",
                },
                children: Y ? "Submitting..." : "Show my estimate →",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const H0 = {
    ground_level: "Ground Level Fence",
    balcony_balustrade: "Balcony / Patio Balustrade",
    premium_pool_fence: "Premium Pool Fence",
    stair_balustrade: "Stair Balustrade",
  },
  B0 = { toughened_12mm: "12mm Toughened + Capping", laminated: "Laminated (no capping)" },
  q0 = {
    clear: "Clear",
    low_iron: "Low Iron / Ultra-Clear",
    tinted: "Tinted",
    frosted: "Frosted Glass",
  },
  Y0 = {
    spigots: "Spigots",
    standoff_posts: "Stand-off posts",
    hidden_channel: "Hidden channel",
    not_sure: "To be confirmed",
  },
  G0 = {
    timber: "Timber",
    concrete: "Concrete",
    tile: "Tile",
    steel: "Steel",
    not_sure: "To be confirmed",
  },
  L0 = {
    standard_chrome: "Chrome",
    matte_black: "Matte black",
    brushed_chrome: "Brushed chrome",
    powder_coated: "Powder coated",
    not_sure: "To be confirmed",
  };
function X0({ answers: m, estimate: M, leadId: B, email: d, firstName: U }) {
  const [G, O] = cl.useState(d),
    [K, A] = cl.useState(!1),
    [S, Y] = cl.useState(!1),
    [C, Z] = cl.useState("");
  async function W() {
    const Q = G.trim();
    if (!Q || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Q)) {
      Z("Please enter a valid email address.");
      return;
    }
    (A(!0), Z(""));
    try {
      const ul = Mn(),
        w = await (
          await fetch(`${ul.restUrl}/estimate-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-WP-Nonce": ul.nonce },
            body: JSON.stringify({ email: Q, firstName: U, leadId: B, answers: m, estimate: M }),
          })
        ).json();
      w.ok ? Y(!0) : Z(w.error ?? "Something went wrong. Please try again.");
    } catch {
      Z("Unable to send. Please check your connection or call 0800 769 254.");
    } finally {
      A(!1);
    }
  }
  return s.jsxs("div", {
    children: [
      M.needsCallUs
        ? s.jsxs("div", {
            style: {
              background: "#fff8ef",
              border: "2px solid #f59e0b",
              borderRadius: "18px",
              padding: "34px 24px",
              textAlign: "center",
              marginBottom: "24px",
            },
            children: [
              s.jsx("div", {
                style: {
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#92400e",
                  marginBottom: "8px",
                },
                children: "Custom Quote Required",
              }),
              s.jsx("p", {
                style: { margin: 0, color: "#78350f", fontSize: "15px" },
                children:
                  "Your project has site conditions that need a visit before we can estimate accurately. Royal Glass will contact you to arrange a free site assessment.",
              }),
            ],
          })
        : s.jsxs("div", {
            style: {
              background: "linear-gradient(135deg, #173755 0%, #1a3c5e 60%, #244a70 100%)",
              borderRadius: "18px",
              padding: "34px 24px",
              textAlign: "center",
              marginBottom: "24px",
              color: "white",
              boxShadow: "0 14px 34px rgba(26,60,94,0.26)",
            },
            children: [
              s.jsx("p", {
                style: {
                  fontSize: "13px",
                  color: "#93c5fd",
                  marginTop: 0,
                  marginBottom: "8px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                },
                children: "Your indicative estimate",
              }),
              s.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  margin: "12px 0",
                },
                children: [
                  s.jsx("span", {
                    style: { fontSize: "36px", fontWeight: 700 },
                    children: Ud(M.low),
                  }),
                  s.jsx("span", { style: { fontSize: "24px", color: "#93c5fd" }, children: "–" }),
                  s.jsx("span", {
                    style: { fontSize: "36px", fontWeight: 700 },
                    children: Ud(M.high),
                  }),
                ],
              }),
              s.jsxs("p", {
                style: { fontSize: "13px", color: "#93c5fd", margin: 0 },
                children: ["Excluding GST · Based on ", M.effectiveLength, "m effective length"],
              }),
            ],
          }),
      M.consultationFlags.length > 0 &&
        s.jsxs("div", {
          style: {
            background: "#fff8ef",
            border: "1px solid #f59e0b",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "20px",
          },
          children: [
            s.jsx("p", {
              style: { fontSize: "13px", fontWeight: 600, color: "#92400e", margin: "0 0 8px" },
              children: "Our team will confirm the following at the site visit:",
            }),
            M.consultationFlags.map((Q) =>
              s.jsxs(
                "p",
                {
                  style: { fontSize: "13px", color: "#78350f", margin: "0 0 3px 0" },
                  children: ["· ", Q],
                },
                Q,
              ),
            ),
          ],
        }),
      s.jsxs("div", {
        style: {
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        },
        children: [
          s.jsx("h3", {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              marginTop: 0,
              marginBottom: "12px",
            },
            children: "Your project summary",
          }),
          s.jsx("div", {
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px 16px",
              fontSize: "14px",
            },
            children: [
              ["Scenario", H0[m.scenario ?? ""] ?? ""],
              ...(m.scenario === "stair_balustrade"
                ? [
                    ["Stair run", `${m.length}m`],
                    ["Landing area", `${m.landingLength}m`],
                  ]
                : [["Length", `${m.length}m`]]),
              ["Corners", `${m.corners}`],
              ["Gates", m.scenario === "premium_pool_fence" ? `${m.gates}` : "N/A"],
              ["Glass type", B0[m.glassType ?? "toughened_12mm"] ?? ""],
              ["Glass colour", q0[m.glassColour] ?? ""],
              ["Fixing method", Y0[m.fixingMethod ?? ""] ?? ""],
              ["Substrate", G0[m.substrate ?? ""] ?? ""],
              ["Hardware finish", L0[m.hardwareFinish ?? ""] ?? ""],
            ].map(([Q, ul]) =>
              s.jsxs(
                Oa.Fragment,
                {
                  children: [
                    s.jsx("span", { style: { color: "#6b7280" }, children: Q }),
                    s.jsx("span", { style: { fontWeight: 500, color: "#111" }, children: ul }),
                  ],
                },
                Q,
              ),
            ),
          }),
        ],
      }),
      s.jsxs("div", {
        style: {
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        },
        children: [
          s.jsx("h3", {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              marginTop: 0,
              marginBottom: "8px",
            },
            children: "This estimate assumes:",
          }),
          [
            "Straight panels — no curved glass",
            "Ground-level access",
            "Timber or concrete substrate",
            "NZ standard height for selected scenario",
          ].map((Q) =>
            s.jsxs(
              "p",
              {
                style: { fontSize: "13px", color: "#6b7280", marginTop: 0, marginBottom: "4px" },
                children: ["✓ ", Q],
              },
              Q,
            ),
          ),
          s.jsx("p", {
            style: { fontSize: "12px", color: "#9ca3af", marginTop: "8px", marginBottom: 0 },
            children:
              "Anything different? Our team will adjust the formal quote after the site visit.",
          }),
        ],
      }),
      s.jsxs("div", {
        style: {
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
        },
        children: [
          s.jsx("h3", {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              marginTop: 0,
              marginBottom: "16px",
            },
            children: "What happens next",
          }),
          [
            {
              n: "1",
              title: "We review your details",
              body: "Our team checks your project and contacts you within 1 business day.",
            },
            {
              n: "2",
              title: "Site visit",
              body: "We visit to take precise measurements and confirm the scope.",
            },
            {
              n: "3",
              title: "Confirmed quote",
              body: "You receive a detailed, fixed-price quote with timeline. No obligation.",
            },
          ].map((Q) =>
            s.jsxs(
              "div",
              {
                style: { display: "flex", gap: "12px", marginBottom: "12px" },
                children: [
                  s.jsx("div", {
                    style: {
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "#1a3c5e",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 700,
                      flexShrink: 0,
                    },
                    children: Q.n,
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("p", {
                        style: {
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#111",
                          marginTop: 0,
                          marginBottom: "2px",
                        },
                        children: Q.title,
                      }),
                      s.jsx("p", {
                        style: { fontSize: "13px", color: "#6b7280", margin: 0 },
                        children: Q.body,
                      }),
                    ],
                  }),
                ],
              },
              Q.n,
            ),
          ),
        ],
      }),
      s.jsxs("div", {
        style: {
          border: "1px solid #dbeafe",
          borderRadius: "14px",
          padding: "22px",
          marginBottom: "16px",
          background: "#f0f7ff",
        },
        children: [
          s.jsxs("div", {
            style: { display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" },
            children: [
              s.jsx("div", {
                style: {
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#1a3c5e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                },
                children: s.jsx("svg", {
                  style: { width: "18px", height: "18px", color: "white" },
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  children: s.jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  }),
                }),
              }),
              s.jsxs("div", {
                children: [
                  s.jsx("h3", {
                    style: {
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1a3c5e",
                      marginTop: 0,
                      marginBottom: "3px",
                    },
                    children: "Get this estimate in your inbox",
                  }),
                  s.jsxs("p", {
                    style: { fontSize: "13px", color: "#3b82f6", margin: 0 },
                    children: [
                      U ? `Hi ${U} — we'll` : "We'll",
                      " send you a personal copy. Forward it to your builder, partner, or architect.",
                    ],
                  }),
                ],
              }),
            ],
          }),
          S
            ? s.jsxs("div", {
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "14px 16px",
                  background: "#f0fdf4",
                  border: "1px solid #86efac",
                  borderRadius: "10px",
                },
                children: [
                  s.jsx("div", {
                    style: {
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#16a34a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    },
                    children: s.jsx("svg", {
                      style: { width: "13px", height: "13px", color: "white" },
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      strokeWidth: 3,
                      children: s.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M5 13l4 4L19 7",
                      }),
                    }),
                  }),
                  s.jsxs("div", {
                    children: [
                      s.jsx("p", {
                        style: {
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#15803d",
                          marginTop: 0,
                          marginBottom: "2px",
                        },
                        children: "Sent! Check your inbox.",
                      }),
                      s.jsx("p", {
                        style: { fontSize: "12px", color: "#16a34a", margin: 0 },
                        children:
                          "Can't find it? Check your spam folder, or call us on 0800 769 254.",
                      }),
                    ],
                  }),
                ],
              })
            : s.jsxs(s.Fragment, {
                children: [
                  s.jsxs("div", {
                    style: { display: "flex", gap: "8px" },
                    children: [
                      s.jsx("input", {
                        type: "email",
                        value: G,
                        onChange: (Q) => {
                          (O(Q.target.value), Z(""));
                        },
                        placeholder: "your@email.com",
                        style: {
                          flex: 1,
                          padding: "11px 14px",
                          border: `1px solid ${C ? "#f87171" : "#bfdbfe"}`,
                          borderRadius: "8px",
                          fontSize: "14px",
                          outline: "none",
                          background: "white",
                          boxSizing: "border-box",
                        },
                      }),
                      s.jsx("button", {
                        type: "button",
                        onClick: W,
                        disabled: K,
                        style: {
                          padding: "11px 22px",
                          borderRadius: "8px",
                          border: "none",
                          background: K ? "#9ca3af" : "#1a3c5e",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: 600,
                          cursor: K ? "not-allowed" : "pointer",
                          whiteSpace: "nowrap",
                        },
                        children: K ? "Sending…" : "Send →",
                      }),
                    ],
                  }),
                  C &&
                    s.jsx("p", {
                      style: {
                        fontSize: "12px",
                        color: "#ef4444",
                        marginTop: "6px",
                        marginBottom: 0,
                      },
                      children: C,
                    }),
                  s.jsx("p", {
                    style: {
                      fontSize: "12px",
                      color: "#6b7280",
                      marginTop: "8px",
                      marginBottom: 0,
                    },
                    children:
                      "Want to share with your builder or partner? Change the address above.",
                  }),
                ],
              }),
        ],
      }),
      s.jsx("a", {
        href: "tel:0800769254",
        style: {
          display: "block",
          textAlign: "center",
          padding: "14px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#374151",
          textDecoration: "none",
          marginBottom: "12px",
        },
        children: "Call us now: 0800 769 254",
      }),
      s.jsx("button", {
        onClick: () => window.print(),
        style: {
          display: "block",
          width: "100%",
          padding: "10px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          fontSize: "13px",
          color: "#9ca3af",
          background: "white",
          cursor: "pointer",
          marginBottom: "16px",
        },
        children: "Save or print this estimate",
      }),
      s.jsx("p", {
        style: {
          fontSize: "11px",
          color: "#9ca3af",
          textAlign: "center",
          lineHeight: 1.5,
          margin: 0,
        },
        children:
          "This is an indicative estimate only. Final pricing is confirmed after a site visit. Prices exclude GST.",
      }),
    ],
  });
}
const Q0 = {
  scenario: null,
  length: 10,
  landingLength: 0,
  corners: 0,
  gates: 0,
  glassType: null,
  glassColour: "clear",
  interlikingRails: !1,
  fixingMethod: null,
  substrate: null,
  hardwareFinish: null,
  callTriggers: [],
};
function Z0() {
  if (document.querySelector("[data-rg-turnstile]")) return;
  const m = document.createElement("script");
  ((m.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"),
    (m.async = !0),
    (m.defer = !0),
    m.setAttribute("data-rg-turnstile", "1"),
    document.head.appendChild(m));
}
function V0() {
  const { pricing: m, loading: M } = S0(),
    B = cl.useRef(Date.now()),
    [d, U] = cl.useState(Q0),
    [G, O] = cl.useState(!1),
    [K, A] = cl.useState(null);
  cl.useEffect(() => {
    Mn().turnstileSiteKey && Z0();
  }, []);
  const S = cl.useMemo(() => p0(d, m), [d, m]);
  function Y(Z) {
    U((W) => ({ ...W, ...Z }));
  }
  function C(Z, W, Q) {
    A({ leadId: Z, email: W, firstName: Q });
  }
  return M
    ? s.jsx("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px",
          color: "#9ca3af",
          fontSize: "14px",
        },
        children: "Loading calculator...",
      })
    : K
      ? s.jsx(X0, {
          answers: d,
          estimate: S,
          leadId: K.leadId,
          email: K.email,
          firstName: K.firstName,
        })
      : G
        ? s.jsx("div", {
            style: {
              maxWidth: "720px",
              margin: "0 auto",
              padding: "24px 16px",
              fontFamily: "inherit",
            },
            children: s.jsx(N0, {
              answers: d,
              estimate: S,
              loadedAt: B.current,
              onSuccess: C,
              onBack: () => O(!1),
            }),
          })
        : s.jsx(M0, { answers: d, onChange: Y, onGetEstimate: () => O(!0) });
}
const Nd = document.getElementById("rg-calculator-root");
Nd && g0.createRoot(Nd).render(s.jsx(Oa.StrictMode, { children: s.jsx(V0, {}) }));
