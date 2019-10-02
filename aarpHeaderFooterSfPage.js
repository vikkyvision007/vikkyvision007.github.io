"use strict";
// For updating the domain name as per the url to all links included,  
let AARP = {};
AARP.Everywhere = AARP.Everywhere || {};
AARP.cookies = AARP.cookies || {};
AARP.userState = {};
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
document.cookies = "at=u%3D97406043%26a%3DGaleo9%26e%3Dte.sta.a.r.p.21.0%40gmail.com%26f%3DGaleio%26t%3D1569267529%26p%3D20171%26mj%3D05%2F16%2F2019%26mat%3D5%26ms%3D0%26mc%3D0%26me%3D05%2F31%2F2024%26ftr%3D0%26us%3DVirginia%26mar%3DN%26uf%3D%5BCTG%5D%26n%3D%5B11724%2C51655%2C58025%2C55599%2C56035%5D%26cid%3D5497434910%26ur%3DaXIio15svTmWzWKuT551vcQZoTZUaKkv9G%252BdKyR8vdn2QPok8f8QEtmlnOprNuPSzVY%252FG0ivpzRFWjTe2XwQ6ZA9ZrBRj%252BjpJhcEkPl%252FqwQdH%252F%252Ff5jFFV8t%252F4Qw%252F3Sx7tHuFgl%252BlKePbr8K2h%252Fzar1qRZ7ZgiQfrh4dPlhQLKQlTxElVfmoZDIa4dEQNFyySxU8XdshvrQEoV68scymtXZj3I%252F6VJf85%252FB%252ByyQ182F8xc8Qzyx3cbtrVuUCTHj4JNeINtFCvSIwkeUsCu3k3V7%252FfUBvVy9A0MmLqrI8rHMa1xJfHCtKEBL5zEdpieHf9%252FhOfbzktzSI8cxncksOjog%253D%253D%26li%3D20826091%26h%3D8cb21a738838d9e86ee91da9aeb2c0bf%26msa%3D47900%26lu%3D3olKpboObYzzgxU_gYCCRjFbqehDZrSxS-QtHl5vXS4.; domain=.aarp.org; path=/; expires=2019-11-22T19:38:49.037Z";
(function () {
    /* AARP.cookies = document.cookies
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
                            const obj = { [o[0]]: o[1] };
                            return Object.assign(obj, a);
                        } else {
                            // Assume that it's not a set of key value pairs; Just a value.
                            return b;
                        }
                    }, {})
            };
            return Object.assign(obj, a);
        }, {}); */
    AARP.cookie = document.cookies;
    window.decodeURIComponent(AARP.cookie)
        .split(/\&/)
        .reduce((a, b) => {
            // is this another set of key value pairs?
            if (~b.indexOf('=')) {
                const o = b.split('=');
                const obj = { [o[0]]: o[1] };
                AARP.cookies.at = a;
                return Object.assign(obj, a);
            } else {
                // Assume that it's not a set of key value pairs; Just a value.
                return b;
            }
        }, {})
})();

//Search functionality below
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

// Menu navigation code below
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

    //Sticky header code below
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

//User state object for All States

AARP.allUserStates = {
    anonymous: {
        __comment: 'ANONYMOUS STATE',
        buttonHeader: {
            Join: 'https://join.aarp.org/joinnav/',
            Renew: 'https://join.aarp.org/rfrenew'
        },
        flyOutNav: {
            Join: 'https://join.aarp.org/joinnav/',
            Renew: 'https://join.aarp.org/rfrenew'
        },
        Link: {
            Help: 'https://www.aarp.org/help/',
            'Member Benefits': 'https://www.aarp.org/benefits-discounts/'
        },
        leftRightLink: {
            Register: 'https://secure.aarp.org/applications/user/register?response_type=code&client_id=0oa3rtsa6ahTQReOG2p7&redirect_uri=https%3A//www.aarp.org/aarp/auth/callback&scope=bui+bmi',
            Login: 'https://secure.aarp.org/applications/user/login?response_type=code&client_id=0oa3rtsa6ahTQReOG2p7&redirect_uri=https%3A//www.aarp.org/aarp/auth/callback&scope=bui+bmi'
        },
        rightLeftDropDown: {
            'My Account': 'https://secure.aarp.org/applications/acct/myAccount.action?request_locale=en&amp;intcmp=GLOBAL-HDR-LNK-CLK-MYACC',
            Community: 'https://community.aarp.org'
        }
    },
    'non-member': {
        __comment: 'NON-MEMBER STATE / Registered non-member',
        buttonHeader: {
            Join: 'https://join.aarp.org/joinnav/',
            Volunteer: 'https://www.aarp.org/giving-back/'
        },
        flyOutNav: {
            Join: 'https://join.aarp.org/joinnav/',
            Volunteer: 'https://www.aarp.org/giving-back/'
        },
        Link: {
            Help: 'https://www.aarp.org/help/',
            'Member Benefits': 'https://www.aarp.org/benefits-discounts/'
        },
        leftRightLink: {
            'Hi, %{firstName}%': ''
        },
        rightLeftDropDown: {
            Join: 'https://join.aarp.org/joinnav/',
            'My Account': 'https://secure.aarp.org/applications/acct/myAccount.action?request_locale=en&amp;intcmp=GLOBAL-HDR-LNK-CLK-MYACC',
            Community: 'https://community.aarp.org',
            Newsletters: 'https://secure.aarp.org/applications/acct/editNewsletters.action?request_locale=en&intcmp=GLOBAL-HDR-LNK-CLK-NEWSLETTER',
            'Staying Sharp': 'https://stayingsharp.aarp.org/',
            Logout: 'https://secure.aarp.org/applications/user/logout/logout'
        }
    },
    'member-on-automatic-renew': {
        __comment: 'MEMBER AUTO RENEW',
        buttonHeader: {
            Donate: 'https://foundation.aarp.org/site/Donation2?df_id=15985&mfc_pref=T&15985.donation=form1',
            Volunteer: 'https://www.aarp.org/giving-back/'
        },
        flyOutNav: {
            Donate: 'https://foundation.aarp.org/site/Donation2?df_id=15985&mfc_pref=T&15985.donation=form1',
            Volunteer: 'https://www.aarp.org/giving-back/'
        },
        Link: {
            Help: 'https://www.aarp.org/help/',
            'Member Benefits': 'https://www.aarp.org/benefits-discounts/'
        },
        leftRightLink: {
            'Hi, %{firstName}%': ''
        },
        rightLeftDropDown: {
            'My Account': 'https://secure.aarp.org/applications/acct/myAccount.action?request_locale=en&amp;intcmp=GLOBAL-HDR-LNK-MYACC',
            Donate: 'https://foundation.aarp.org/site/Donation2?df_id=15985&mfc_pref=T&15985.donation=form1',
            Volunteer: 'https://www.aarp.org/giving-back/',
            Community: 'https://community.aarp.org',
            Newsletters: 'https://secure.aarp.org/applications/acct/editNewsletters.action?request_locale=en&intcmp=GLOBAL-HDR-LNK-CLK-NEWSLETTER',
            'Staying Sharp': 'https://stayingsharp.aarp.org/',
            Logout: 'https://secure.aarp.org/applications/user/logout/logout'
        }
    },
    'member-not-on-automatic-renew': {
        __comment: 'MEMBER NOT AUTO RENEW',
        buttonHeader: {
            Donate: 'https://foundation.aarp.org/site/Donation2?df_id=15985&mfc_pref=T&15985.donation=form1',
            Volunteer: 'https://www.aarp.org/giving-back/'
        },
        flyOutNav: {
            Donate: 'https://foundation.aarp.org/site/Donation2?df_id=15985&mfc_pref=T&15985.donation=form1',
            Volunteer: 'https://www.aarp.org/giving-back/'
        },
        Link: {
            Help: 'https://www.aarp.org/help/',
            'Member Benefits': 'https://www.aarp.org/benefits-discounts/'
        },
        leftRightLink: {
            'Hi, %{firstName}%': ''
        },
        rightLeftDropDown: {
            Renew: 'https://join.aarp.org/rfrenew',
            'My Account': 'https://secure.aarp.org/applications/acct/myAccount.action?request_locale=en&amp;intcmp=GLOBAL-HDR-LNK-MYACC',
            Donate: 'https://foundation.aarp.org/site/Donation2?df_id=15985&mfc_pref=T&15985.donation=form1',
            Volunteer: 'http://www.aarp.org/giving-back/',
            Community: 'https://community.aarp.org',
            Newsletters: 'https://secure.aarp.org/applications/acct/editNewsletters.action?request_locale=en&intcmp=GLOBAL-HDR-LNK-CLK-NEWSLETTER',
            'Staying Sharp': 'https://stayingsharp.aarp.org/',
            Logout: 'https://secure.aarp.org/applications/user/logout/logout'
        }
    },
    'expiring-member': {
        __comment: 'EXPIRING WITH 30 DAYS  (CAN ONLY TEST IN STAGE NO USER ACCOUNT TO LOG IN WITH IN PRODUCTION)',
        buttonHeader: {
            Renew: 'https://join.aarp.org/rfrenew',
            Volunteer: 'https://www.aarp.org/giving-back/'
        },
        flyOutNav: {
            Renew: 'https://join.aarp.org/rfrenew',
            Volunteer: 'https://www.aarp.org/giving-back/'
        },
        Link: {
            Help: 'https://www.aarp.org/help/',
            'Member Benefits': 'https://www.aarp.org/benefits-discounts/'
        },
        leftRightLink: {
            'Hi, %{firstName}%': ''
        },
        rightLeftDropDown: {
            Renew: 'https://join.aarp.org/rfrenew',
            'My Account': 'https://secure.aarp.org/applications/acct/myAccount.action?request_locale=en&amp;intcmp=GLOBAL-HDR-LNK-MYACC',
            Volunteer: 'http://www.aarp.org/giving-back/',
            Community: 'https://community.aarp.org',
            Newsletters: 'https://secure.aarp.org/applications/acct/editNewsletters.action?request_locale=en&intcmp=GLOBAL-HDR-LNK-CLK-NEWSLETTER',
            'Staying Sharp': 'https://stayingsharp.aarp.org/',
            Logout: 'https://secure.aarp.org/applications/user/logout/logout'
        }
    },
    'lapsed-or-expired-member': {
        __comment: 'Lapsed/Expired (same as canceled)',
        buttonHeader: {
            Join: 'https://join.aarp.org/joinnav/',
            Renew: 'https://join.aarp.org/rfrenew'
        },
        flyOutNav: {
            Join: 'https://join.aarp.org/joinnav/',
            Renew: 'https://join.aarp.org/rfrenew'
        },
        Link: {
            Help: 'https://www.aarp.org/help/',
            'Member Benefits': 'https://www.aarp.org/benefits-discounts/'
        },
        leftRightLink: {
            'Hi, %{firstName}%': ''
        },
        rightLeftDropDown: {
            Join: 'https://join.aarp.org/joinnav/',
            Renew: 'https://join.aarp.org/rfrenew',
            'My Account': 'https://secure.aarp.org/applications/acct/myAccount.action?request_locale=en&amp;intcmp=GLOBAL-HDR-LNK-MYACC',
            Community: 'https://community.aarp.org',
            Logout: 'https://secure.aarp.org/applications/user/logout/logout'
        }
    },
    'cancelled-member': {
        __comment: 'Canceled',
        buttonHeader: {
            Join: 'https://join.aarp.org/joinnav/',
            Renew: 'https://join.aarp.org/rfrenew'
        },
        flyOutNav: {
            Join: 'https://join.aarp.org/joinnav/',
            Renew: 'https://join.aarp.org/rfrenew'
        },
        Link: {
            Help: 'https://www.aarp.org/help/',
            'Member Benefits': 'https://www.aarp.org/benefits-discounts/'
        },
        leftRightLink: {
            'Hi, %{firstName}%': ''
        },
        rightLeftDropDown: {
            Join: 'https://join.aarp.org/joinnav/',
            Renew: 'https://join.aarp.org/rfrenew',
            'My Account': 'https://secure.aarp.org/applications/acct/myAccount.action?request_locale=en&amp;intcmp=GLOBAL-HDR-LNK-MYACC',
            Community: 'https://community.aarp.org',
            Logout: 'https://secure.aarp.org/applications/user/logout/logout'
        }
    }
}

// Determining Userstate using cookies value
var findUserState = function () {
    var val = AARP.cookies.at.ms;
    //var val = '0';
    AARP.userState.userFirstname = AARP.cookies.at.f;
    var obj = {};
    switch (val) {
        case '1':
            obj.userType = 'non-member';
            break;
        case '5':
            obj.userType = 'lapsed-or-expired-member';
            break;
        case '0':
            obj.userType = AARP.cookies.at.mar == 'Y' ? 'member-on-automatic-renew' : 'member-not-on-automatic-renew';
            break;
        case '4':
            obj.userType = 'cancelled-member';
            break;
        default:
            obj.userType = 'anonymous';
    }
    if (obj.userType == 'member-on-automatic-renew' || obj.userType == 'member-not-on-automatic-renew') {
        var thirtyDaysOutDate = new Date();
        thirtyDaysOutDate.setDate(thirtyDaysOutDate.getDate() + 30);
        var expirationDate = new Date(AARP.cookies.at.me);
        if (thirtyDaysOutDate > expirationDate) {
            obj.userType = 'expiring-member';
        }
    }
    AARP.userState.userType = obj.userType;
}

//Function to set userstate in the header and accordingly changing values/links 
var setUserState = function (userStates, memberState) {
    let stateObj = userStates[memberState];
    let buttonHeaderElm = "";
    let flyOutNavElm = "";
    let linkElm = "";
    let leftLinkElm = "";
    let rightLinkElm = "";
    let leftDropDownElm = "";
    let rightDropDownElm = "";

    //aarp-c-header__links-button
    for (const prop in stateObj) {
        for (const obj in stateObj[prop]) {
            if (prop === 'buttonHeader') {

                buttonHeaderElm += `<li role="presentation">
                    <div>
                        <a class="aarp-c-common-button aarp-c-link" href="${stateObj[prop][obj]}" target="_self">${obj}</a>
                    </div>
                </li>`
            }
            else if (prop === 'flyOutNav') {

            }
            else if (prop === 'Link') {
                linkElm += `<li role="presentation">
                <a href="${stateObj[prop][obj]}" >${obj}</a>
                 </li>`

            }
            else if (prop === 'leftRightLink' && stateObj[prop]["Hi, %{firstName}%"] !== "") {
                leftLinkElm += `<li>
                <b>
                    <a href="${stateObj[prop][obj]}">${obj}</a>
                </b>
            </li>`
                rightLinkElm += `<li>
                <a href="${stateObj[prop][obj]}"
                    data-overlay-msg="AARP.Everywhere.LeavingModal.drawOverlay(this,'',/content/experience-fragments/fragments/hpHeader/hp-header-anonymous.html,'','You are now leaving AARP.org and going to a website that is not operated by AARP. A different privacy policy and terms of service will apply.');return false;">${obj}</a>
            </li>`
            }
            else if (prop === 'leftRightLink' && stateObj[prop]["Hi, %{firstName}%"] === "") {
                leftLinkElm += `<p>Hi, ${AARP.userState.userFirstname}</p>`
                rightLinkElm += `<p>Hi, ${AARP.userState.userFirstname}</p>`
            }
            else if (prop === 'rightLeftDropDown') {
                leftDropDownElm += `<li class="aarp-c-linked-dropdown__list-item">
                <a href="${stateObj[prop][obj]}" class="aarp-c-linked-dropdown__link-item" target="_blank"
                    data-displayoverlay="displayOverlay" data-default-element-msg="">${obj}</a>
            </li>`
                rightDropDownElm += `<li class="aarp-c-linked-dropdown__list-item">
                <a href="${stateObj[prop][obj]}" class="aarp-c-linked-dropdown__link-item" target="_blank"
                    data-displayoverlay="displayOverlay" data-default-element-msg="">${obj}</a>
            </li>`
            }


        }

    }
    document.addEventListener("DOMContentLoaded", function () {
        let buttonHeaderParent = document.querySelector(".aarp-c-header__links-button");
        let LinkParent = document.querySelector(".linkElm");
        let leftLinkParent = document.querySelector(".leftLinkElm");
        let rightLinkParent = document.querySelector(".rightLinkElm");
        let leftDropDownParent = document.querySelector(".leftDropDownElm");
        let rightDropDownParent = document.querySelector(".rightDropDownElm");

        // Adding the created html to Loaded DOM
        buttonHeaderParent.innerHTML = buttonHeaderElm;
        LinkParent.innerHTML = linkElm;
        leftLinkParent.innerHTML = leftLinkElm;
        rightLinkParent.innerHTML = rightLinkElm;
        leftDropDownParent.innerHTML = leftDropDownElm;
        rightDropDownParent.innerHTML = rightDropDownElm;

    });
}
//Initializing community page
findUserState();
setUserState(AARP.allUserStates, AARP.userState.userType);
