(function () {
  "use strict";

  var STORAGE_KEY = "rooted317_language";

  var LANGUAGES = [
    { code: "en", name: "English", native: "English", flag: "\ud83c\uddec\ud83c\udde7" },
    { code: "es", name: "Spanish", native: "Espa\u00f1ol", flag: "\ud83c\uddea\ud83c\uddf8" },
    { code: "fr", name: "French", native: "Fran\u00e7ais", flag: "\ud83c\uddeb\ud83c\uddf7" },
    { code: "pt", name: "Portuguese", native: "Portugu\u00eas", flag: "\ud83c\udde7\ud83c\uddf7" },
    { code: "ht", name: "Haitian Creole", native: "Krey\u00f2l Ayisyen", flag: "\ud83c\udded\ud83c\uddf9" },
    { code: "de", name: "German", native: "Deutsch", flag: "\ud83c\udde9\ud83c\uddea" },
    { code: "it", name: "Italian", native: "Italiano", flag: "\ud83c\uddee\ud83c\uddf9" },
    { code: "nl", name: "Dutch", native: "Nederlands", flag: "\ud83c\uddf3\ud83c\uddf1" },
    { code: "ar", name: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "\ud83c\uddf8\ud83c\udde6" },
    { code: "he", name: "Hebrew", native: "\u05e2\u05d1\u05e8\u05d9\u05ea", flag: "\ud83c\uddf7\ud83c\uddea" },
    { code: "zh-CN", name: "Chinese (Simplified)", native: "\u7b80\u4f53\u4e2d\u6587", flag: "\ud83c\udde8\ud83c\uddf3" },
    { code: "zh-TW", name: "Chinese (Traditional)", native: "\u7e41\u9ad4\u4e2d\u6587", flag: "\ud83c\uddf9\ud83c\uddfc" },
    { code: "ja", name: "Japanese", native: "\u65e5\u672c\u8a9e", flag: "\ud83c\uddef\ud83c\uddf5" },
    { code: "ko", name: "Korean", native: "\ud55c\uad6d\uc5b4", flag: "\ud83c\uddf0\ud83c\uddf7" },
    { code: "hi", name: "Hindi", native: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "\ud83c\uddee\ud83c\uddf3" },
    { code: "bn", name: "Bengali", native: "\u09ac\u09be\u0982\u09b2\u09be", flag: "\ud83c\udde7\ud83c\udde9" },
    { code: "ur", name: "Urdu", native: "\u0627\u0631\u062f\u0648", flag: "\ud83c\uddf5\ud83c\uddf0" },
    { code: "pa", name: "Punjabi", native: "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40", flag: "\ud83c\udde7\ud83c\udde9" },
    { code: "vi", name: "Vietnamese", native: "Ti\u1ebfng Vi\u1ec7t", flag: "\ud83c\uddfb\ud83c\uddf3" },
    { code: "tl", name: "Tagalog / Filipino", native: "Filipino", flag: "\ud83c\uddf5\ud83c\udded" },
    { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "\ud83c\uddee\ud83c\udde9" },
    { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "\ud83c\uddf2\ud83c\uddfe" },
    { code: "th", name: "Thai", native: "\u0e44\u0e17\u0e22", flag: "\ud83c\uddf9\ud83c\udded" },
    { code: "sw", name: "Swahili", native: "Kiswahili", flag: "\ud83c\uddf0\ud83c\uddfa" },
    { code: "am", name: "Amharic", native: "\u12a0\u121d\u1295\u1228\u1227", flag: "\ud83c\uddea\ud83c\uddf9" },
    { code: "so", name: "Somali", native: "Soomaali", flag: "\ud83c\uddf8\ud83c\uddf4" },
    { code: "yo", name: "Yoruba", native: "Yor\u00f9b\u00e1", flag: "\ud83c\uddf3\ud83c\uddac" },
    { code: "ig", name: "Igbo", native: "Igbo", flag: "\ud83c\uddf3\ud83c\uddec" },
    { code: "zu", name: "Zulu", native: "isiZulu", flag: "\ud83c\uddff\ud83c\udde6" },
    { code: "af", name: "Afrikaans", native: "Afrikaans", flag: "\ud83c\udde6\ud83c\uddff" },
    { code: "ru", name: "Russian", native: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "\ud83c\uddf7\ud83c\uddfa" },
    { code: "uk", name: "Ukrainian", native: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430", flag: "\ud83c\uddfa\ud83c\udde6" },
    { code: "pl", name: "Polish", native: "Polski", flag: "\ud83c\uddf5\ud83c\uddf1" },
    { code: "ro", name: "Romanian", native: "Rom\u00e2n\u0103", flag: "\ud83c\uddf7\ud83c\uddf4" },
    { code: "el", name: "Greek", native: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac", flag: "\ud83c\uddec\ud83c\uddf7" },
    { code: "tr", name: "Turkish", native: "T\u00fcrk\u00e7e", flag: "\ud83c\uddf9\ud83c\uddf7" },
    { code: "fa", name: "Persian / Farsi", native: "\u0641\u0627\u0631\u0633\u06cc", flag: "\ud83c\uddee\ud83c\uddf7" },
    { code: "ne", name: "Nepali", native: "\u0928\u0947\u092a\u093e\u0932\u0940", flag: "\ud83c\uddf3\ud83c\uddf5" },
    { code: "ta", name: "Tamil", native: "\u0ba4\u0bae\u0bbf\u0bb4\u0bcd", flag: "\ud83c\uddf9\ud83c\udded" },
    { code: "te", name: "Telugu", native: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41", flag: "\ud83c\uddee\ud83c\uddf3" },
    { code: "mr", name: "Marathi", native: "\u092e\u0930\u093e\u0920\u0940", flag: "\ud83c\uddee\ud83c\uddf3" },
    { code: "gu", name: "Gujarati", native: "\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0a9f\u0ac0", flag: "\ud83c\uddee\ud83c\uddf3" },
    { code: "si", name: "Sinhala", native: "\u0dc3\u0dd2\u0d82\u0dc4\u0db6", flag: "\ud83c\uddf0\ud83c\uddf0" },
    { code: "my", name: "Burmese", native: "\u1019\u103c\u1014\u103a\u1019\u102c\u1018\u102c", flag: "\ud83c\uddf2\ud83c\uddf2" },
    { code: "km", name: "Khmer", native: "\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c4\u1784", flag: "\ud83c\uddf0\ud83c\udded" },
    { code: "lo", name: "Lao", native: "\u0e9e\u0eb2\u0e84\u0eb2\u0e99", flag: "\ud83c\uddf1\ud83c\udde6" },
    { code: "ka", name: "Georgian", native: "\u10d5\u10d0\u10e0\u10d8", flag: "\ud83c\uddec\ud83c\uddea" },
    { code: "hy", name: "Armenian", native: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576", flag: "\ud83c\udde6\ud83c\uddf2" },
    { code: "kk", name: "Kazakh", native: "\u049a\u0430\u0437\u0430\u049b", flag: "\ud83c\uddf0\ud83c\uddff" },
    { code: "uz", name: "Uzbek", native: "O\u2018zbek", flag: "\ud83c\uddfa\ud83c\uddff" },
    { code: "cs", name: "Czech", native: "\u010ce\u0161tina", flag: "\ud83c\udde8\ud83c\uddff" },
    { code: "sk", name: "Slovak", native: "Sloven\u010dina", flag: "\ud83c\uddf8\ud83c\uddf0" },
    { code: "hu", name: "Hungarian", native: "Magyar", flag: "\ud83c\udded\ud83c\uddfa" },
    { code: "fi", name: "Finnish", native: "Suomi", flag: "\ud83c\uddeb\ud83c\uddee" },
    { code: "sv", name: "Swedish", native: "Svenska", flag: "\ud83c\uddf8\ud83c\uddea" },
    { code: "da", name: "Danish", native: "Dansk", flag: "\ud83c\udde9\ud83c\uddf0" },
    { code: "no", name: "Norwegian", native: "Norsk", flag: "\ud83c\uddf3\ud83c\uddf4" },
    { code: "bg", name: "Bulgarian", native: "\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438", flag: "\ud83c\udde7\ud83c\uddec" },
    { code: "sr", name: "Serbian", native: "\u0421\u0440\u043f\u0441\u043a\u0438", flag: "\ud83c\uddf7\ud83c\uddf8" },
    { code: "hr", name: "Croatian", native: "Hrvatski", flag: "\ud83c\udded\ud83c\uddf7" },
    { code: "sl", name: "Slovenian", native: "Sloven\u0161\u010dina", flag: "\ud83c\uddf8\ud83c\uddee" },
    { code: "et", name: "Estonian", native: "Eesti", flag: "\ud83c\uddea\ud83c\uddea" },
    { code: "lv", name: "Latvian", native: "Latvie\u0161u", flag: "\ud83c\uddf1\ud83c\uddfb" },
    { code: "lt", name: "Lithuanian", native: "Lietuvi\u0173", flag: "\ud83c\uddf1\ud83c\uddf9" },
    { code: "mt", name: "Maltese", native: "Malti", flag: "\ud83c\uddf2\ud83c\uddf9" },
    { code: "cy", name: "Welsh", native: "Cymraeg", flag: "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f" },
    { code: "ga", name: "Irish", native: "Gaeilge", flag: "\ud83c\uddee\ud83c\uddea" },
    { code: "is", name: "Icelandic", native: "\u00cdslenska", flag: "\ud83c\uddee\ud83c\uddf8" },
    { code: "mk", name: "Macedonian", native: "\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438", flag: "\ud83c\uddf2\ud83c\uddf0" },
    { code: "sq", name: "Albanian", native: "Shqip", flag: "\ud83c\udde6\ud83c\uddf1" },
    { code: "bs", name: "Bosnian", native: "Bosanski", flag: "\ud83c\udde7\ud83c\udde6" },
    { code: "mn", name: "Mongolian", native: "\u041c\u043e\u043d\u0433\u043e\u043b", flag: "\ud83c\uddf2\ud83c\uddf3" },
    { code: "ti", name: "Tigrinya", native: "\u1275\u122a\u1275\u1229\u1235", flag: "\ud83c\uddf9\ud83c\uddec" },
    { code: "ha", name: "Hausa", native: "Hausa", flag: "\ud83c\udded\ud83c\uddf9" },
    { code: "ca", name: "Catalan", native: "Catal\u00e0", flag: "\ud83c\udde6\ud83c\uddf8" },
    { code: "eu", name: "Basque", native: "Euskara", flag: "\ud83c\uddea\ud83c\uddf8" }
  ];

  var overlay = null;
  var searchInput = null;
  var gridContainer = null;
  var currentLang = "en";

  function getStoredLanguage() {
    try { return localStorage.getItem(STORAGE_KEY) || "en"; }
    catch (e) { return "en"; }
  }

  function storeLanguage(code) {
    try { localStorage.setItem(STORAGE_KEY, code); }
    catch (e) {}
  }

  /* ── Google Translate ── */

  var gtReady = false;

  function loadGoogleTranslate(callback) {
    if (gtReady) { callback(); return; }

    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: LANGUAGES.map(function (l) { return l.code; }).join(","),
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, "google_translate_element");
      gtReady = true;
      if (callback) callback();
    };

    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.onerror = function () {
      console.warn("ROOTED317: Google Translate failed to load");
    };
    document.head.appendChild(s);
  }

  function translateTo(code) {
    if (!code || code === "en") {
      revertTranslation();
      return;
    }
    currentLang = code;
    storeLanguage(code);
    var select = document.querySelector("#google_translate_element select");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    }
  }

  function revertTranslation() {
    currentLang = "en";
    try { localStorage.removeItem(STORAGE_KEY); }
    catch (e) {}
    var select = document.querySelector("#google_translate_element select");
    if (select) {
      select.value = "";
      select.dispatchEvent(new Event("change"));
    }
  }

  /* ── UI ── */

  function createOverlay() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.className = "lang-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Select Language");

    var panel = document.createElement("div");
    panel.className = "lang-panel";

    var header = document.createElement("div");
    header.className = "lang-panel-header";
    var title = document.createElement("h2");
    title.textContent = "Select Language";
    var closeBtn = document.createElement("button");
    closeBtn.className = "lang-close-btn";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerHTML = "\u00d7";
    header.appendChild(title);
    header.appendChild(closeBtn);

    var searchWrap = document.createElement("div");
    searchWrap.className = "lang-search-wrap";
    searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "lang-search";
    searchInput.placeholder = "Search languages\u2026";
    searchInput.setAttribute("aria-label", "Search languages");
    searchWrap.appendChild(searchInput);

    var gridWrap = document.createElement("div");
    gridWrap.className = "lang-grid-wrap";
    gridContainer = document.createElement("div");
    gridContainer.className = "lang-grid";
    gridWrap.appendChild(gridContainer);

    var footer = document.createElement("div");
    footer.className = "lang-panel-footer";
    footer.textContent = "Powered by Google Translate";

    panel.appendChild(header);
    panel.appendChild(searchWrap);
    panel.appendChild(gridWrap);
    panel.appendChild(footer);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    closeBtn.addEventListener("click", closePanel);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closePanel();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) closePanel();
    });
  }

  function renderGrid(query) {
    if (!gridContainer) return;
    gridContainer.innerHTML = "";
    var q = (query || "").toLowerCase().trim();
    var count = 0;

    for (var i = 0; i < LANGUAGES.length; i++) {
      var lang = LANGUAGES[i];
      if (q && lang.name.toLowerCase().indexOf(q) === -1 && lang.native.toLowerCase().indexOf(q) === -1) continue;
      count++;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lang-btn";
      btn.dataset.code = lang.code;
      btn.setAttribute("aria-label", "Translate to " + lang.name);

      var flag = document.createElement("span");
      flag.className = "lang-btn-flag";
      flag.textContent = lang.flag;

      var info = document.createElement("span");
      info.className = "lang-btn-info";
      var n = document.createElement("span");
      n.className = "lang-btn-name";
      n.textContent = lang.name;
      var native = document.createElement("span");
      native.className = "lang-btn-native";
      native.textContent = lang.native;
      info.appendChild(n);
      info.appendChild(native);
      btn.appendChild(flag);
      btn.appendChild(info);

      if (lang.code === currentLang) btn.classList.add("is-selected");

      btn.addEventListener("click", (function (code) {
        return function () {
          translateTo(code);
          currentLang = code;
          var btns = gridContainer.querySelectorAll(".lang-btn");
          for (var j = 0; j < btns.length; j++) {
            btns[j].classList.toggle("is-selected", btns[j].dataset.code === code);
          }
          setTimeout(closePanel, 200);
        };
      })(lang.code));

      gridContainer.appendChild(btn);
    }

    if (count === 0) {
      var nr = document.createElement("div");
      nr.className = "lang-no-results";
      nr.textContent = "No languages found";
      gridContainer.appendChild(nr);
    }
  }

  function openPanel() {
    createOverlay();
    currentLang = getStoredLanguage();
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      searchInput.value = "";
      renderGrid("");
      searchInput.focus();
    }, 100);
  }

  function closePanel() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function init() {
    /* Search filter */
    document.addEventListener("input", function (e) {
      if (e.target.classList && e.target.classList.contains("lang-search")) {
        renderGrid(e.target.value);
      }
    });

    /* Inject trigger into nav */
    var navMenus = document.querySelectorAll(".nav-menu");
    for (var i = 0; i < navMenus.length; i++) {
      if (navMenus[i].querySelector(".lang-trigger-btn")) continue;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lang-trigger-btn";
      btn.setAttribute("aria-label", "Select language");
      btn.innerHTML = '<span class="lang-trigger-btn-icon">\ud83c\udf10</span> Language';
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openPanel();
      });
      navMenus[i].appendChild(btn);
    }

    /* Load Google Translate and restore saved language */
    loadGoogleTranslate(function () {
      var saved = getStoredLanguage();
      if (saved && saved !== "en") {
        setTimeout(function () { translateTo(saved); }, 500);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
