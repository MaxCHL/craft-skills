/**
 * Lightweight slide deck engine.
 *
 * Usage:
 *   1. Include this script in your HTML
 *   2. Structure your slides as:
 *      <div class="deck">
 *        <section class="slide" data-notes="Speaker notes here">...</section>
 *        <section class="slide">...</section>
 *      </div>
 *   3. Navigate: ← → arrow keys, or click prev/next buttons
 *   4. Press S to open speaker notes window (for second screen)
 *   5. Press F for fullscreen
 */

(function () {
  "use strict";

  const SLIDE_SEL   = ".slide";
  const DECK_SEL    = ".deck";
  const STORAGE_KEY = "deck-current-slide";

  let current = 0;
  let slides  = [];
  let notesWin = null;
  let transitionTimer = null;

  function init() {
    slides = Array.from(document.querySelectorAll(SLIDE_SEL));
    if (slides.length === 0) return;

    const saved = parseInt(sessionStorage.getItem(STORAGE_KEY), 10);
    current = (saved >= 0 && saved < slides.length) ? saved : 0;

    applyBaseStyles();
    buildControls();
    goTo(current, false);
    attachKeyboard();
  }

  function applyBaseStyles() {
    const deck = document.querySelector(DECK_SEL);
    if (deck) {
      Object.assign(deck.style, {
        position: "relative",
        width: "1920px",
        height: "1080px",
        overflow: "hidden",
      });
    }
    slides.forEach(s => {
      Object.assign(s.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        opacity: "0",
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      });
    });
  }

  function goTo(index, animate = true) {
    if (index < 0 || index >= slides.length) return;

    const prev = current;
    current = index;
    sessionStorage.setItem(STORAGE_KEY, current);

    if (!animate) {
      // Instant switch: disable transition, swap, re-enable
      slides[prev].style.transition = "none";
      slides[current].style.transition = "none";
      slides[prev].style.opacity = "0";
      slides[prev].style.pointerEvents = "none";
      requestAnimationFrame(() => {
        slides[current].style.opacity = "1";
        slides[current].style.pointerEvents = "auto";
        requestAnimationFrame(() => {
          slides[prev].style.transition = "opacity 0.3s ease";
          slides[current].style.transition = "opacity 0.3s ease";
        });
      });
    } else {
      // Sequence: fade out old first (300ms), then fade in new.
      // Cancel any pending fade-in from a previous rapid keypress.
      clearTimeout(transitionTimer);
      slides[prev].style.opacity = "0";
      slides[prev].style.pointerEvents = "none";
      transitionTimer = setTimeout(() => {
        slides[current].style.opacity = "1";
        slides[current].style.pointerEvents = "auto";
      }, 300);
    }

    updateCounter();
    updateNotes();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function buildControls() {
    const bar = document.createElement("div");
    Object.assign(bar.style, {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(8px)",
      borderRadius: "30px",
      padding: "8px 16px",
      zIndex: "9999",
      fontSize: "14px",
      color: "#fff",
      userSelect: "none",
    });

    const btnStyle = {
      background: "rgba(255,255,255,0.15)",
      border: "none",
      borderRadius: "50%",
      width: "32px",
      height: "32px",
      cursor: "pointer",
      color: "#fff",
      fontSize: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const prevBtn = document.createElement("button");
    Object.assign(prevBtn.style, btnStyle);
    prevBtn.textContent = "←";
    prevBtn.onclick = prev;

    const nextBtn = document.createElement("button");
    Object.assign(nextBtn.style, btnStyle);
    nextBtn.textContent = "→";
    nextBtn.onclick = next;

    const counter = document.createElement("span");
    counter.id = "deck-counter";
    counter.style.minWidth = "60px";
    counter.style.textAlign = "center";

    bar.appendChild(prevBtn);
    bar.appendChild(counter);
    bar.appendChild(nextBtn);
    document.body.appendChild(bar);
  }

  function updateCounter() {
    const el = document.getElementById("deck-counter");
    if (el) el.textContent = `${current + 1} / ${slides.length}`;
  }

  function updateNotes() {
    if (!notesWin || notesWin.closed) return;
    const notes = slides[current].dataset.notes || "";
    notesWin.postMessage({ type: "notes", slide: current + 1, total: slides.length, notes }, "*");
  }

  function buildNotesPage(win) {
    const doc = win.document;
    doc.title = "Speaker Notes";

    const style = doc.createElement("style");
    style.textContent = [
      "body{font-family:-apple-system,sans-serif;padding:24px;background:#1a1a1a;color:#fff;margin:0}",
      "#counter{font-size:13px;color:#888;margin-bottom:12px}",
      "#notes{font-size:18px;line-height:1.6;white-space:pre-wrap}",
      ".empty{color:#555;font-style:italic}",
    ].join("");
    doc.head.appendChild(style);

    const counter = doc.createElement("div");
    counter.id = "counter";
    counter.textContent = "Slide — / —";
    doc.body.appendChild(counter);

    const notes = doc.createElement("div");
    notes.id = "notes";
    notes.className = "empty";
    notes.textContent = "No speaker notes.";
    doc.body.appendChild(notes);

    win.addEventListener("message", e => {
      if (e.origin !== window.location.origin) return;
      if (e.data.type !== "notes") return;
      counter.textContent = `Slide ${e.data.slide} / ${e.data.total}`;
      notes.textContent = e.data.notes || "No speaker notes.";
      notes.className = e.data.notes ? "" : "empty";
    });
  }

  function openNotes() {
    notesWin = window.open("about:blank", "deck-notes", "width=600,height=400");
    if (!notesWin) return;
    buildNotesPage(notesWin);
    updateNotes();
  }

  function attachKeyboard() {
    document.addEventListener("keydown", e => {
      const tag = e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || e.target.isContentEditable) return;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case " ":
          e.preventDefault(); next(); break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault(); prev(); break;
        case "s":
        case "S":
          openNotes(); break;
        case "f":
        case "F":
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          } else if (document.fullscreenEnabled) {
            document.documentElement.requestFullscreen().catch(() => {});
          }
          break;
        case "Home":
          goTo(0); break;
        case "End":
          goTo(slides.length - 1); break;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
