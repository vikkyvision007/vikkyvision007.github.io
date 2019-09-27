"use strict";
// For updating the domain name as per the url to all links included,  
let AARP = {};
AARP.Everywhere = AARP.Everywhere || {};
(function (aarp) {
    aarp.getEnvironment = function () {

        var domain = window.location.hostname, firstDot = true;
        var arr = domain.split('');

        for (var key in arr) {
            if (arr[key] === '-') {
                var startKey = key;
            }
            if (arr[key] === '.' && firstDot) {
                firstDot = false;
                var endKey = key;
            }
        }

        if (!startKey) {
            return '';
        } else {
            return arr.slice(startKey, endKey).join('');
        }
    }

}(AARP.Everywhere));

// gets all the cookies available on the page and puts them in an object, eg:[at: {...}, dr: {..}]
/* const AARP = AARP || {};
AARP.cookies = document.cookie
  .split(';')
  .filter(a => /^\sat=|^\sdr=|^\sfedid=/.test(a))
  .reduce((a, b) => {
    const o = b.replace(/\s/, '').split('=');
    const obj = {
      [o[0]]: decodeURIComponent(o[1])
        .split(/\&/)
        .reduce((a, b) => {
          // is this another set of key value pairs?
          if (~b.indexOf('=')) {
            const o = b.split('=');
            const obj = {[o[0]]: o[1]};
            return Object.assign(obj, a);
          } else {
            // Assume that it's not a set of key value pairs; Just a value.
            return b;
          }
        }, {})
    };
    return Object.assign(obj, a);
  }, {}); */

// gets all the cookies available on the page and puts them in an object, eg:[at: {...}, dr: {..}]
// const AARP = AARP || {};
AARP.cookies = document.cookie
const b = "u%3D5525775%26a%3DMadridH465735%26e%3Dnotarwillieway1%40aarp.org%26f%3DBadridia%26t%3D1569417003%26p%3D20878%26mj%3D04%2F03%2F2019%26mat%3D3%26ms%3D0%26mc%3D0%26me%3D04%2F30%2F2022%26ftr%3D0%26us%3DMaryland%26mar%3DN%26uf%3D%5B%5D%26n%3D%5B11724%2C51655%2C56007%2C56035%5D%26cid%3D5482631868%26ur%3DJvAUVT1%252FQfM0TQdhzqD6py90XZB91dSiVAKDWUgww7qmb9nesqTfT1aOodm%252B8zU3vJfxUW3Vmoq0XjsbFB%252F0DbBfVzWPnzluuUgN4BOntF2COMR4UMAYoeHHyjpexNjh1N%252FpgmvI2yKYled5zpUYw1gZiHFLP5dgv646v3zq7XEw%252FNSsfPPtFE3iEOr%252BfXLB5kL33cHgbLEKHtX8i3lW6yCNRFKRcuUmbSWuJ%252B4Twy0zWj010RtRHJBMKgu%252FO%252FBeYQUhz0LiToETaXHdh5yXpNLPyMMNRcqdld2eyOk55WT77oxP1zVvtttbnH%252Fwjw1EyCJCaq6Zbfwu6S3HR1TlKw%253D%253D%26li%3D44794%26h%3De0c57bacf1d8526a4a3ecbcd755fdb19%26msa%3D47900%26lu%3DTltzDKfteevMrvNanLJKRCfOkkGWxuY4vacJp3d5iUU."
window.decodeURIComponent(b).split(/\&/)
    .reduce((a, b) => {
        // is this another set of key value pairs?
        if (~b.indexOf('=')) {
            const o = b.split('=');
            const obj = { [o[0]]: o[1] };
            return Object.assign(obj, a);
        } else {
            // Assume that it's not a set of key value pairs; Just a value.
            return b;
        }
    }, {})

(function () {
    var a = function a() {
        if (document.querySelector(".aarp-o-body")) {
            var f = document.body;
            var g = document.querySelector(".aarp-c-search");
            var i = document.querySelector(".aarp-c-search__form-container");
            var j = document.querySelector(".aarp-c-search__submit-button");
            var d = document.querySelector(".aarp-c-search__search-input");
            var e = new CustomEvent("SEARCH_CLICKED", {
                detail: {}
            });
            g.addEventListener("click", function (k) {
                document.dispatchEvent(e);
                g.classList.toggle("aarp-c-search-form-container__trigger--closed")
            });
            var c = function c(m, n, l) {
                var o = {
                    searchTerm: n,
                    searchNoResults: m.length > 0 ? "" : "No Results",
                    searchNumResults: m.length > 0 ? m.length : "",
                    searchFilter: n,
                    searchSort: m,
                    searchCorrection: m,
                    searchSuggest: m,
                    pagePath: l
                };
                var k = AARP.StayingSharp.analyticDataLayer.search.frontEndSearch.createEvent(o);
                document.body.dispatchEvent(k)
            };
            var b = function b(m) {
                if (m) {
                    var k = [];
                    var l = encodeURIComponent(m);
                    var n = AARP.Everywhere.endecaSearchUrl + "?q=" + l + "&" + AARP.Everywhere.endecaSearchUrlInternalTracking;
                    AARP.StayingSharp.Services.getSearchResult(n).then(function (o) {
                        var p = JSON.parse(o);
                        if (p.completions) {
                            p.completions.map(function (r, q) {
                                k.push(r.expression)
                            })
                        }
                        c(k, m, uri);
                        window.location = n
                    })["catch"](function (o) {
                        console.log(o);
                        window.location = n
                    })
                }
            };
            j.addEventListener("click", function (k) {
                k.preventDefault();
                var l = d.value;
                b(l)
            });
            d.addEventListener("keyup", function (k) {
                var l = k.keyCode || k.which;
                if (l === 13) {
                    var m = d.value;
                    b(m)
                }
            });
            var h = function h(k) {
                document.querySelector(".aarp-c-search__search-input").value = ""
            };
            f.addEventListener("click", h, false);
            document.addEventListener("MENU_CLICKED", h);
            document.addEventListener("CONTENT_TITLE_OPTIONS_CLICKED", h)
        }
    };
    window.addEventListener("load", a)
})();

// var AARP = AARP || {};
AARP.addStateParam = function (a) {
    var e = a.href.split("?")[1];
    var d = false;
    if (e) {
        d = e.indexOf("redirect_uri") > -1 && e.indexOf("state=") < 0
    }
    if (d) {
        var c = window.location.href;
        var b = encodeURIComponent(c);
        if (a.href.indexOf("?") > -1) {
            a.href += "&state=" + b
        }
    }
};
window.AARP = window.AARP || {};
AARP.Everywhere = AARP.Everywhere || {};
AARP.Everywhere.LeavingModal = {
    rewriteClickHandler: function (j) {
        var g = j.target.closest("[data-default-element-msg]");
        if (!j.target.closest("[data-default-element-msg]")) {
            return true
        }
        j.preventDefault();
        var b = "Est&aacutes saliendo del sitio web AARP.org y te diriges a un sitio web que no est&aacute operado por AARP. Se regir&aacute por una pol&iacutetica de privacidad y t&eacuterminos de servicio diferentes.",
            h = "You are now leaving AARP.org and going to a website that is not operated by AARP. A different privacy policy and terms of service will apply.",
            a = g.getAttribute("data-default-element-msg");
        if (a) {
            var i = a.split("'"),
                c = i.length > 5 ? i[5] : "",
                d = g.getAttribute("target") || "";
            if (!c) {
                c = AARP.Everywhere.isSpanish ? b : h
            }
            if (!d || d == "undefined") {
                d = ""
            }
            var f = g.getAttribute("href");
            if (AARP.Everywhere.Interstitial != undefined) {
                var k = AARP.Everywhere.Interstitial.isInWhitelist(f);
                if (AARP.Everywhere.Interstitial.localStorageCheck() || !k) {
                    g.setAttribute("data-target", "#leavingModal");
                    g.setAttribute("data-remote", "false");
                    g.setAttribute("data-toggle", "modal");
                    if (AARP.Everywhere.Interstitial.localStorageCheck() || !k) {
                        AARP.Everywhere.LeavingModal.drawOverlay(f, d, c)
                    } else {
                        j.stopPropagation();
                        window.open(f, d)
                    }
                }
            } else {
                g.setAttribute("data-target", "#leavingModal");
                g.setAttribute("data-remote", "false");
                g.setAttribute("data-toggle", "modal");
                AARP.Everywhere.LeavingModal.drawOverlay(f, d, c)
            }
        }
    },
    addAnchors: function () {
        document.addEventListener("click", AARP.Everywhere.LeavingModal.rewriteClickHandler, true)
    },
    drawOverlay: function (b, c, g) {
        var e = AARP.Everywhere.Interstitial;
        var d = document.querySelector("#leavingModal .hide-interstitial");
        if (e && d) {
            var a = AARP.Everywhere.Interstitial.isInWhitelist(b);
            d.style.display = a ? "block" : "none"
        }
        var f = document.querySelector("[data-asi-modal-continue-updated]");
        document.querySelector("#modelmsg").innerHTML = g;
        f.setAttribute("target", c);
        f.setAttribute("href", b);
        if (e) {
            f.addEventListener("click", AARP.Everywhere.Interstitial.setLocalStorage)
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    AARP.Everywhere.LeavingModal.addAnchors()
});

function openNav(d) {
    d && d.preventDefault();
    var b = document.getElementById("aarp-c-offscreen-nav-id");
    var a = document.getElementsByClassName("aarp-c-header__menu-icon-link")[0];
    var c = document.getElementById("aarp-c-body");
    var f = b.querySelector("button, [href], input, select, textarea, [tabindex]");
    if (b.offsetWidth > 0) {
        b.classList.remove("aarp-c-offscreen-nav__width");
        b.setAttribute("aria-hidden", "true");
        a.setAttribute("aria-label", "Press Space or Enter to open the AARP Menu");
        a.focus();
        c.classList.remove("aarp-c-offscreen-nav__open")
    } else {
        b.hidden = false;
        b.classList.add("aarp-c-offscreen-nav__width");
        b.setAttribute("aria-hidden", "false");
        a.setAttribute("aria-label", "Press Space or Enter to close the AARP Menu");
        c.classList.add("aarp-c-offscreen-nav__open");
        setTimeout(function () {
            f && f.focus()
        }, 500)
    }
}
document.addEventListener("DOMContentLoaded", function () {
    Array.prototype.forEach.call(document.querySelectorAll(".sharp-c-target__segment--hidden"), function (d) {
        d.classList.remove("sharp-c-target__segment--hidden")
    });
    var a = function a() {
        var h = document.querySelectorAll("#aarp-c-offscreen-nav-id [href], #aarp-c-offscreen-nav-id input, #aarp-c-offscreen-nav-id [tabindex]");
        var d = document.getElementsByClassName("aarp-c-header__menu-icon-link")[0];
        var g = h[0];
        var e = h[h.length - 1];
        var f = function f(j) {
            var i = j.which || j.keyCode;
            if ((j.shiftKey && i == 9 || j.keyCode === 38) && this == g) {
                d.focus();
                openNav(j)
            } else {
                if ((!j.shiftKey && i == 9 || j.keyCode === 40) && this == e) {
                    d.focus();
                    openNav(j)
                }
            }
        };
        if (g && e) {
            g.removeEventListener("keydown", f);
            g.addEventListener("keydown", f);
            e.removeEventListener("keydown", f);
            e.addEventListener("keydown", f)
        }
    };
    var b = function b() {
        var e = document.querySelectorAll(".aarp-c-linked-dropdown--header .aarp-c-linked-dropdown__main-text a");
        if (e) {
            e.forEach(function (f) {
                AARP.addStateParam(f)
            })
        }
        var d = document.querySelectorAll(".aarp-c-linked-dropdown--offscreen-login .aarp-c-linked-dropdown__main-text a");
        if (d) {
            d.forEach(function (f) {
                AARP.addStateParam(f)
            })
        }
    };
    var c = function c() {
        if (true) {
            var e = false;
            var h = document.getElementsByClassName("coreHeader")[0];
            var j = document.getElementsByClassName("aarp-c-header")[0];
            var d = j.offsetHeight;
            var i = j.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
            var g = function g(l) {
                var k = window.scrollY || window.pageYOffset;
                return k < i
            };
            var f = function f() {
                if (!e) {
                    window.requestAnimationFrame(function () {
                        if (g(j)) {
                            h.style.paddingTop = 0;
                            h.classList.remove("coreHeader--js-sticky")
                        } else {
                            h.style.paddingTop = d + "px";
                            if (!h.classList.contains("coreHeader--js-sticky")) {
                                h.classList.add("coreHeader--js-sticky")
                            }
                        }
                        e = false
                    });
                    e = true
                }
            };
            f();
            window.removeEventListener("scroll", f);
            window.addEventListener("scroll", f)
        }
    };
    c();
    window.addEventListener("STICKY_HEADER", c);
    a();
    window.ContextHub && ContextHub.Utils && ContextHub.Utils.Eventing && ContextHub.Utils.Eventing().on(ContextHub.Constants.EVENT_TEASER_LOADED, function () {
        window.dispatchEvent(new CustomEvent("STICKY_HEADER"));
        a()
    }, "load-sticky-header-js", true)
});
