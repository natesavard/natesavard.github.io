(function () {
  "use strict";

  if (window.NateSoundscape) return;

  var STORAGE_KEY = "nate_soundscape_enabled_v1";
  var INTERACTIVE_SELECTOR = [
    "a",
    "button",
    "[role='button']",
    "input[type='range']",
    ".path",
    ".queue__track",
    ".siteflow-link",
    ".revelation-player",
    "[data-sound]"
  ].join(",");

  var context = null;
  var master = null;
  var compressor = null;
  var noiseBuffer = null;
  var unlocked = false;
  var enabled = readEnabled();
  var lastHoverAt = 0;
  var elementHoverTimes = new WeakMap();
  var toggle = null;

  function readEnabled() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) !== "0";
    } catch (error) {
      return true;
    }
  }

  function saveEnabled() {
    try {
      window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
    } catch (error) {
      // The sound state still works for this visit when storage is unavailable.
    }
  }

  function createEngine() {
    if (context) return context;

    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;

    context = new AudioContext();
    master = context.createGain();
    compressor = context.createDynamicsCompressor();

    master.gain.value = 0.42;
    compressor.threshold.value = -22;
    compressor.knee.value = 18;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.14;

    master.connect(compressor);
    compressor.connect(context.destination);

    noiseBuffer = context.createBuffer(1, Math.floor(context.sampleRate * 0.24), context.sampleRate);
    var noise = noiseBuffer.getChannelData(0);
    var previous = 0;

    for (var index = 0; index < noise.length; index += 1) {
      var white = Math.random() * 2 - 1;
      previous = previous * 0.82 + white * 0.18;
      noise[index] = previous;
    }

    return context;
  }

  function resumeEngine() {
    var engine = createEngine();
    if (!engine) return Promise.resolve(false);

    var attempt = engine.state === "suspended" ? engine.resume() : Promise.resolve();
    return attempt.then(function () {
      unlocked = engine.state === "running";
      document.documentElement.classList.toggle("nate-sound-unlocked", unlocked);
      return unlocked;
    }).catch(function () {
      return false;
    });
  }

  function envelope(gain, start, peak, attack, release) {
    gain.gain.cancelScheduledValues(start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), start + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + attack + release);
  }

  function bleep(intensity) {
    var now = context.currentTime;
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    var filter = context.createBiquadFilter();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(690 + Math.random() * 110, now);
    oscillator.frequency.exponentialRampToValueAtTime(1060 + Math.random() * 180, now + 0.055);
    filter.type = "bandpass";
    filter.frequency.value = 1220;
    filter.Q.value = 2.4;
    envelope(gain, now, 0.035 * intensity, 0.006, 0.075);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    oscillator.start(now);
    oscillator.stop(now + 0.09);
  }

  function chromeClick(intensity) {
    var now = context.currentTime;
    var oscillator = context.createOscillator();
    var toneGain = context.createGain();
    var noise = context.createBufferSource();
    var noiseFilter = context.createBiquadFilter();
    var noiseGain = context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(238, now);
    oscillator.frequency.exponentialRampToValueAtTime(82, now + 0.042);
    envelope(toneGain, now, 0.043 * intensity, 0.002, 0.055);

    noise.buffer = noiseBuffer;
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1800;
    envelope(noiseGain, now, 0.025 * intensity, 0.001, 0.028);

    oscillator.connect(toneGain);
    toneGain.connect(master);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);

    oscillator.start(now);
    oscillator.stop(now + 0.065);
    noise.start(now);
    noise.stop(now + 0.04);
  }

  function organicSquish(intensity) {
    var now = context.currentTime;
    var noise = context.createBufferSource();
    var filter = context.createBiquadFilter();
    var gain = context.createGain();
    var body = context.createOscillator();
    var bodyGain = context.createGain();

    noise.buffer = noiseBuffer;
    filter.type = "lowpass";
    filter.Q.value = 1.8;
    filter.frequency.setValueAtTime(150, now);
    filter.frequency.exponentialRampToValueAtTime(620, now + 0.055);
    filter.frequency.exponentialRampToValueAtTime(105, now + 0.16);
    envelope(gain, now, 0.047 * intensity, 0.018, 0.15);

    body.type = "sine";
    body.frequency.setValueAtTime(78, now);
    body.frequency.exponentialRampToValueAtTime(48, now + 0.16);
    envelope(bodyGain, now, 0.028 * intensity, 0.012, 0.16);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    body.connect(bodyGain);
    bodyGain.connect(master);

    noise.start(now);
    noise.stop(now + 0.19);
    body.start(now);
    body.stop(now + 0.19);
  }

  function transmission(intensity) {
    var now = context.currentTime;
    var first = context.createOscillator();
    var second = context.createOscillator();
    var gain = context.createGain();
    var delay = context.createDelay(0.2);
    var echo = context.createGain();

    first.type = "sine";
    first.frequency.setValueAtTime(420, now);
    first.frequency.exponentialRampToValueAtTime(940, now + 0.095);

    second.type = "triangle";
    second.frequency.setValueAtTime(860, now + 0.035);
    second.frequency.exponentialRampToValueAtTime(1320, now + 0.13);

    delay.delayTime.value = 0.07;
    echo.gain.value = 0.18;
    envelope(gain, now, 0.032 * intensity, 0.008, 0.14);

    first.connect(gain);
    second.connect(gain);
    gain.connect(master);
    gain.connect(delay);
    delay.connect(echo);
    echo.connect(master);

    first.start(now);
    first.stop(now + 0.15);
    second.start(now + 0.035);
    second.stop(now + 0.16);
  }

  function play(type, intensity) {
    if (!enabled || !unlocked || !context || context.state !== "running") return;

    var strength = Math.max(0.22, Math.min(Number(intensity || 1), 1));

    if (type === "organic") {
      organicSquish(strength);
    } else if (type === "signal" || type === "navigation") {
      transmission(strength);
    } else if (type === "chrome" || type === "click") {
      chromeClick(strength);
    } else {
      bleep(strength);
    }
  }

  function soundType(element, fallback) {
    if (!element) return fallback || "bleep";

    var explicit = element.getAttribute("data-sound");
    if (explicit) return explicit;
    if (element.matches(".revelation-player, .organic-shell, [class*='moss']")) return "organic";
    if (element.matches("input[type='range'], button, [role='button'], .sound-player__button")) return "chrome";
    if (element.matches("a[href], .path, .siteflow-link")) return "signal";
    return fallback || "bleep";
  }

  function closestInteractive(target) {
    if (!(target instanceof Element)) return null;
    return target.closest(INTERACTIVE_SELECTOR);
  }

  function isSoundToggle(target) {
    return target instanceof Element && Boolean(target.closest("[data-sound-toggle]"));
  }

  function updateToggle() {
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", enabled ? "true" : "false");
    toggle.dataset.enabled = enabled ? "true" : "false";
    toggle.innerHTML =
      '<span class="nate-soundscape-toggle__light" aria-hidden="true"></span>' +
      '<span>SOUND&nbsp; ' + (enabled ? "ON" : "OFF") + "</span>";
    toggle.setAttribute(
      "aria-label",
      enabled ? "Turn website interaction sounds off" : "Turn website interaction sounds on"
    );
  }

  function setEnabled(nextEnabled) {
    enabled = Boolean(nextEnabled);
    saveEnabled();
    updateToggle();

    if (enabled) {
      resumeEngine().then(function (ready) {
        if (ready) transmission(0.72);
      });
    }
  }

  function installToggle() {
    if (document.getElementById("nateSoundscapeToggle")) return;

    var style = document.createElement("style");
    style.textContent =
      ".nate-soundscape-toggle{" +
      "position:fixed;right:12px;bottom:12px;z-index:2147483000;display:inline-flex;align-items:center;gap:7px;" +
      "min-height:28px;padding:6px 9px;color:rgba(244,238,226,.78);font:700 8px/1 'Courier New',monospace;" +
      "letter-spacing:.18em;border:1px solid rgba(230,215,181,.28);border-radius:999px;" +
      "background:linear-gradient(180deg,rgba(34,38,35,.86),rgba(5,7,6,.92));" +
      "box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 8px 22px rgba(0,0,0,.32);" +
      "backdrop-filter:blur(8px);cursor:pointer;opacity:.7;transition:opacity .2s ease,border-color .2s ease,transform .2s ease}" +
      ".nate-soundscape-toggle:hover,.nate-soundscape-toggle:focus-visible{opacity:1;border-color:rgba(226,183,90,.62);outline:none;transform:translateY(-1px)}" +
      ".nate-soundscape-toggle__light{width:5px;height:5px;border-radius:50%;background:#4b4d49;box-shadow:none}" +
      ".nate-soundscape-toggle[data-enabled='true'] .nate-soundscape-toggle__light{background:#d5aa55;box-shadow:0 0 8px rgba(213,170,85,.82)}" +
      "@media(max-width:620px){.nate-soundscape-toggle{right:7px;bottom:7px;min-height:25px;padding:5px 7px;font-size:7px}}";
    document.head.appendChild(style);

    toggle = document.createElement("button");
    toggle.id = "nateSoundscapeToggle";
    toggle.className = "nate-soundscape-toggle";
    toggle.type = "button";
    toggle.setAttribute("data-sound-toggle", "true");
    document.body.appendChild(toggle);
    updateToggle();

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setEnabled(!enabled);
    });
  }

  document.addEventListener("pointerdown", function (event) {
    if (!enabled || isSoundToggle(event.target)) return;
    resumeEngine();
  }, true);

  document.addEventListener("keydown", function (event) {
    if (!enabled || (event.key !== "Enter" && event.key !== " ")) return;
    resumeEngine();
  }, true);

  document.addEventListener("pointerover", function (event) {
    if (!enabled || !unlocked) return;

    var element = closestInteractive(event.target);
    if (!element || (event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) return;

    var now = window.performance.now();
    var lastForElement = elementHoverTimes.get(element) || 0;
    if (now - lastHoverAt < 72 || now - lastForElement < 290) return;

    lastHoverAt = now;
    elementHoverTimes.set(element, now);
    play(soundType(element, "bleep"), soundType(element) === "organic" ? 0.42 : 0.34);
  }, true);

  document.addEventListener("click", function (event) {
    if (!enabled || isSoundToggle(event.target)) return;

    var element = closestInteractive(event.target);
    if (!element) return;

    var intensity = element.matches("a[href], .path, .siteflow-link") ? 0.72 : 0.58;
    if (unlocked) {
      play(soundType(element, "chrome"), intensity);
    } else {
      resumeEngine().then(function (ready) {
        if (ready) play(soundType(element, "chrome"), intensity);
      });
    }
  }, true);

  document.addEventListener("input", function (event) {
    if (!enabled || !unlocked || !(event.target instanceof Element)) return;
    if (!event.target.matches("input[type='range']")) return;
    play("bleep", 0.22);
  }, true);

  window.NateSoundscape = {
    play: play,
    setEnabled: setEnabled,
    isEnabled: function () {
      return enabled;
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installToggle, { once: true });
  } else {
    installToggle();
  }
})();
