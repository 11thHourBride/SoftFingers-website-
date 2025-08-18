  (function(){
    // Map a physical key (KeyboardEvent.code) to a finger element id
    // Coverage includes letters, number row, punctuation & modifiers.
    const fingerMap = {
      // Left hand
      leftPinky: [
        "Backquote","Digit1","KeyQ","KeyA","KeyZ",
        "Tab","CapsLock","ShiftLeft","Backslash" // backslash often right, but many layouts left of Enter
      ],
      leftRing:  ["Digit2","KeyW","KeyS","KeyX"],
      leftMiddle:["Digit3","KeyE","KeyD","KeyC"],
      leftIndex: ["Digit4","Digit5","KeyR","KeyF","KeyV","KeyT","KeyG","KeyB"],

      // Right hand
      rightIndex: ["Digit6","Digit7","KeyY","KeyH","KeyN","KeyU","KeyJ","KeyM"],
      rightMiddle:["Digit8","KeyI","KeyK","Comma"],
      rightRing:  ["Digit9","KeyO","KeyL","Period"],
      rightPinky: [
        "Digit0","Minus","Equal","KeyP","BracketLeft","BracketRight",
        "Semicolon","Quote","Slash",
        "Backspace","Enter","ShiftRight"
      ],

      // Thumbs
      thumbs: ["Space","AltLeft","AltRight","MetaLeft","MetaRight","ControlLeft","ControlRight","ContextMenu"]
    };

    // Reverse index: code -> finger element id
    const codeToFinger = new Map();
    Object.entries(fingerMap).forEach(([group, codes])=>{
      const targetId = group === "leftPinky"  ? "left-pinky"  :
                       group === "leftRing"   ? "left-ring"   :
                       group === "leftMiddle" ? "left-middle" :
                       group === "leftIndex"  ? "left-index"  :
                       group === "rightIndex" ? "right-index" :
                       group === "rightMiddle"? "right-middle":
                       group === "rightRing"  ? "right-ring"  :
                       group === "rightPinky" ? "right-pinky" :
                       /* thumbs */             "left-thumb,right-thumb";
      codes.forEach(code => codeToFinger.set(code, targetId));
    });

    // Helpers
    const q = sel => document.querySelector(sel);
    const keyEl = (code) => document.querySelector(`#trainer-qwerty .key[data-code="${code}"]`);

    function pressKey(code){
      const el = keyEl(code);
      if (el) el.classList.add("active");

      const id = codeToFinger.get(code);
      if (!id) return;

      if (id.includes(",")){ // thumbs -> both thumbs can animate
        id.split(",").forEach(fid=>{
          const f = q(`#${fid}`);
          if (f) f.classList.add("press");
        });
      } else {
        const f = q(`#${id}`);
        if (f) f.classList.add("press");
      }
    }

    function releaseKey(code){
      const el = keyEl(code);
      if (el) el.classList.remove("active");

      const id = codeToFinger.get(code);
      if (!id) return;

      if (id.includes(",")){
        id.split(",").forEach(fid=>{
          const f = q(`#${fid}`);
          if (f) f.classList.remove("press");
        });
      } else {
        const f = q(`#${id}`);
        if (f) f.classList.remove("press");
      }
    }

    // Handle physical keyboard
    const downSet = new Set();
    window.addEventListener("keydown", (e)=>{
      // Avoid repeating animation while key held
      if (downSet.has(e.code)) return;
      downSet.add(e.code);
      pressKey(e.code);
    }, {capture:true});

    window.addEventListener("keyup", (e)=>{
      downSet.delete(e.code);
      releaseKey(e.code);
    }, {capture:true});

    // Safety: clear all on blur (prevents stuck highlights)
    window.addEventListener("blur", ()=>{
      downSet.forEach(code => releaseKey(code));
      downSet.clear();
    });

    // Optional: if you have a specific typing input, mirror its input events too:
    // document.getElementById("typing")?.addEventListener("keydown", e=>pressKey(e.code));
    // document.getElementById("typing")?.addEventListener("keyup",   e=>releaseKey(e.code));
  })();