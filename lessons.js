 /* --------------------------
       DATA: 100 Beginner Lessons
       -------------------------- */
    const beginnerLessons = [
      // Stage 1: Home row drills (1–20)
      "asdf jkl;", "fjdksla;", "jjff kkdd", "aa ss dd ff", "jj kk ll ;;",
      "asdf asdf jkl; jkl;", "fj fj fj fj", "dk dk dk dk", "sl sl sl sl",
      "a s d f j k l ;", "ff jj dd kk", "aa ss ll ;;", "asdfg hjkl;",
      "fjdk sl; fjdk sl;", "aj ak al a;", "sd sl sk sj", "df dk dl d;",
      "fj fj fj fj dk dk dk", "as as as as jl jl jl", "asdf jkl; asdf jkl;",
      // Stage 2: Upper row drills (21–40)
      "qwer uiop", "qq ww ee rr", "uu ii oo pp", "qw er ty ui op",
      "qwe rty uio p", "qp qp qp qp", "we we we we", "er er er er",
      "ty ty ty ty", "io io io io", "qw qw qw qw", "ui ui ui ui",
      "op op op op", "qwerty qwerty", "uiop uiop", "qwe qwe qwe",
      "rty rty rty", "uio uio uio", "qwert uiop", "qw er ui op",
      // Stage 3: Lower row drills (41–60)
      "zxcv nm,.", "zz xx cc vv", "nn mm ,, ..", "zx zx zx zx",
      "cv cv cv cv", "nm nm nm nm", "zc zc zc zc", "xv xv xv xv",
      "mn mn mn mn", ",. ,. ,. ,.", "zxc zxc zxc", "vnm vnm vnm",
      "zx nm zx nm", "cv ., cv ., ", "zxcv zxcv", "nm,. nm,.",
      "zx cv nm ,.", "zxcv nm,.", "zxvnm ,.zx", "mncv zx,.",
      // Stage 4: Mixed rows (61–80)
      "asdf qwer zxcv", "jkl; uiop nm,.", "asd qwe zxc", "jkl uio nm,",
      "asdfg qwert", "hjkl uiopn", "qaz wsx edc rfv", "tgb yhn ujm ik,",
      "qwe asd zxc", "rty fgh vbn", "uio jkl m,.", "qaz wsx edc",
      "rfv tgb yhn", "ujm ik, ol.", "pl; okm inj", "uhb ygv tfc",
      "qazwsx qazwsx", "edcrfv edcrfv", "tgbtgb tgbtgb", "yhnujm yhnujm",
      // Stage 5: Words & simple sentences (81–100)
      "cat dog man", "sun run fun", "jam ham ram", "pen hen men",
      "top hop mop", "red bed fed", "sit fit hit", "cup pup sup",
      "fan can ran", "mad sad bad", "rat mat bat", "lap cap map",
      "tip sip dip", "log fog hog", "pig wig big", "box fox ox",
      "you are good", "we can go", "he is mad", "she is sad",
      "I can type", "you can run", "we are one", "cats and dogs",
      "fish swim fast", "the sun is hot", "a red pen", "big and small",
      "dogs run fast", "time to go", "I am happy", "we play well",
      "he can win", "she will go", "they all ran", "you did it",
      "this is fun", "that is big", "here we go", "good job done"
    ];

    /* --------------------------
       STATE / STORAGE
       -------------------------- */
    const PASS_WPM = 30;
    const PASS_ACC = 90;
    const DURATION = 120; // seconds
    const STORAGE_KEY = "beginnerResults_v1"; // { [index]: {wpm, acc, passed, ts} }

    let results = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    let currentIndex = findFirstUnpassed();
    let timerId = null;
    let timeLeft = DURATION;
    let startedAt = null;
    let typingLocked = false;

    /* --------------------------
       ELEMENTS
       -------------------------- */
    const tabs = document.getElementById("lesson-tabs");
    const sections = {
      beginner: document.getElementById("section-beginner"),
      intermediate: document.getElementById("section-intermediate"),
      advanced: document.getElementById("section-advanced"),
    };

    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");
    const lessonsGrid = document.getElementById("lessons-grid");

    const passage = document.getElementById("passage");
    const typing = document.getElementById("typing");
    const statWpm = document.getElementById("stat-wpm");
    const statAcc = document.getElementById("stat-acc");
    const timerEl = document.getElementById("timer");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const retryBtn = document.getElementById("retry-btn");

    const interLockBox = document.getElementById("intermediate-lock");
    const interContent = document.getElementById("intermediate-content");
    const advLockBox = document.getElementById("advanced-lock");
    const advContent = document.getElementById("advanced-content");

    /* --------------------------
       TABS
       -------------------------- */
    tabs.addEventListener("click", (e) => {
      const t = e.target.closest(".tab");
      if (!t) return;
      [...tabs.querySelectorAll(".tab")].forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      const level = t.dataset.level;
      Object.keys(sections).forEach(k => sections[k].classList.add("hidden"));
      sections[level].classList.remove("hidden");
    });

    /* --------------------------
       RENDERERS
       -------------------------- */
    function renderLessonsGrid(){
      lessonsGrid.innerHTML = "";
      beginnerLessons.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.className = "lesson-btn";
        btn.textContent = `Lesson ${i+1}`;
        const prevPassed = i === 0 ? true : !!(results[i-1]?.passed);
        const passed = !!(results[i]?.passed);

        if (passed) btn.classList.add("passed");
        if (!prevPassed && !passed) btn.disabled = true;

        btn.addEventListener("click", () => {
          if (btn.disabled) return;
          loadLesson(i);
        });
        lessonsGrid.appendChild(btn);
      });
      updateProgressBar();
    }

    function updateProgressBar(){
      const passedCount = Object.values(results).filter(r => r.passed).length;
      const total = beginnerLessons.length;
      const pct = (passedCount/total)*100;
      progressText.textContent = `Progress: ${passedCount} / ${total} lessons passed`;
      progressBar.style.width = pct + "%";
      // Unlock Intermediate when all 100 passed
      const allPassed = passedCount === total;
      interLockBox.classList.toggle("hidden", allPassed);
      interContent.classList.toggle("hidden", !allPassed);
      // Keep Advanced locked for now (depends on your intermediate pass logic)
      advLockBox.classList.toggle("hidden", false);
      advContent.classList.toggle("hidden", true);
    }

    function renderPassage(){
      const target = beginnerLessons[currentIndex];
      const user = typing.value || "";
      const parts = [];
      const len = Math.max(target.length, user.length);
      let correct = 0;
      let typed = user.length;

      for (let i=0;i<len;i++){
        const tChar = target[i] ?? "";
        const uChar = user[i];
        if (i < user.length){
          if (uChar === tChar){
            parts.push(`<span class="ok">${escapeHtml(tChar)}</span>`);
            correct++;
          } else {
            parts.push(`<span class="bad">${escapeHtml(tChar || " ")}</span>`);
          }
        } else {
          // remaining
          const cls = i === user.length ? "rest caret" : "rest";
          parts.push(`<span class="${cls}">${escapeHtml(tChar)}</span>`);
        }
      }
      passage.innerHTML = parts.join("");

      // live stats
      const elapsedMin = startedAt ? ((Date.now()-startedAt)/60000) : 0;
      const wpm = elapsedMin > 0 ? Math.round((correct/5)/elapsedMin) : 0;
      const acc = typed > 0 ? Math.round((correct/typed)*100) : 100;
      statWpm.textContent = String(wpm);
      statAcc.textContent = `${acc}%`;

      return { correct, typed, acc, wpm, targetLen: target.length };
    }

    /* --------------------------
       LESSON FLOW
       -------------------------- */
    function loadLesson(i){
      currentIndex = i;
      typingLocked = false;
      typing.disabled = false;
      typing.value = "";
      startedAt = null;

      stopTimer();
      timeLeft = DURATION;
      timerEl.textContent = `${timeLeft}s`;

      // Render passage fresh
      renderPassage();

      // nav buttons
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i >= beginnerLessons.length - 1;

      // focus
      typing.focus();
    }

    function startTimer(){
      stopTimer();
      timerId = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `${timeLeft}s`;
        if (timeLeft <= 0){
          finishLesson("timeout");
        }
      }, 1000);
    }
    function stopTimer(){
      if (timerId){ clearInterval(timerId); timerId = null; }
    }

    /* --------------------------
   LESSON FLOW (update finishLesson + retry handling)
   -------------------------- */
function finishLesson(reason){
  stopTimer();
  typingLocked = true;
  typing.disabled = true;

  // compute final stats from latest render
  const {correct, typed} = renderPassage();
  const elapsedMin = startedAt ? ((Date.now()-startedAt)/60000) : (DURATION/60);
  const wpm = elapsedMin > 0 ? Math.round((correct/5)/elapsedMin) : 0;
  const acc = typed > 0 ? Math.round((correct/typed)*100) : 0;

  const passed = (wpm >= PASS_WPM) && (acc >= PASS_ACC);
  results[currentIndex] = { wpm, acc, passed, ts: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  renderLessonsGrid();

  alert(`${passed ? "✅ Passed" : "❌ Failed. Please try again and score 30WPM with 90% Accuracy or above to proceed"} — WPM: ${wpm}, Accuracy: ${acc}%${reason==="timeout"?" (time up)":""}`);

  if (passed && currentIndex < beginnerLessons.length-1){
    // auto-advance
    setTimeout(() => {
      loadLesson(currentIndex+1);
    }, 600);
  } else if (!passed) {
    // listen for Enter to retry automatically
    const retryHandler = (e) => {
      if (e.key === "Enter") {
        document.removeEventListener("keydown", retryHandler);
        loadLesson(currentIndex); // retry same lesson
      }
    };
    document.addEventListener("keydown", retryHandler);
  }
}

/* --------------------------
   EVENTS (update typing event)
   -------------------------- */
typing.addEventListener("input", () => {
  if (typingLocked) return;
  if (!startedAt){
    startedAt = Date.now();
    startTimer();
  }
  const {acc, wpm, targetLen} = renderPassage();

  // End lesson as soon as all chars typed (regardless of correctness)
  if (typing.value.length >= targetLen){
    finishLesson("completed");
  }
});

/* --------------------------
   Disable retry button when failed
   -------------------------- */
retryBtn.addEventListener("click", () => {
  const lastResult = results[currentIndex];
  if (lastResult && !lastResult.passed){
    alert("❌ You must retry this lesson by pressing ENTER after failing. Retry button is disabled for failed lessons.");
    return;
  }
  loadLesson(currentIndex);
});


    function findFirstUnpassed(){
      for (let i=0;i<beginnerLessons.length;i++){
        if (!results[i]?.passed) return i;
      }
      return 0; // all passed -> start at first
    }

    /* --------------------------
       EVENTS
       -------------------------- */
    typing.addEventListener("input", () => {
      if (typingLocked) return;
      if (!startedAt){
        startedAt = Date.now();
        startTimer();
      }
      const {acc, wpm, targetLen} = renderPassage();

      // If fully matched target text, finish early
      if (typing.value.length >= targetLen && typing.value === beginnerLessons[currentIndex]){
        finishLesson("completed");
      }
    });

    prevBtn.addEventListener("click", () => {
      // can always go back to review/practice
      const prev = Math.max(0, currentIndex-1);
      loadLesson(prev);
    });
    nextBtn.addEventListener("click", () => {
      // only allow going forward if current is passed (or next already unlocked)
      const curPassed = !!(results[currentIndex]?.passed);
      const nextIdx = Math.min(beginnerLessons.length-1, currentIndex+1);
      const nextAllowed = curPassed || !!(results[nextIdx-1]?.passed);
      if (!nextAllowed){
        alert("Pass the current lesson to unlock the next one (≥ 30 WPM & ≥ 90% accuracy).");
        return;
      }
      loadLesson(nextIdx);
    });
    retryBtn.addEventListener("click", () => loadLesson(currentIndex));

    /* --------------------------
       UTIL
       -------------------------- */
    function escapeHtml(s){
      return (s ?? "").replace(/[&<>"']/g, m => ({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
      }[m]));
    }

    /* --------------------------
       INIT
       -------------------------- */
    (function init(){
      // tab default visible
      Object.values(sections).forEach(s => s.classList.add("hidden"));
      sections.beginner.classList.remove("hidden");

      renderLessonsGrid();
      // load first unpassed (or 1st)
      loadLesson(currentIndex);
      // initial render to paint caret
      renderPassage();
    })();
    
    /* --------------------------
   PROGRESS CHECK
   -------------------------- */
function loadProgress() {
  const progress = results; // reuse your results object
  const list = document.getElementById("progressList");
  list.innerHTML = "";

  if (Object.keys(progress).length === 0) {
    list.innerHTML = "<li>No lessons attempted yet.</li>";
    return;
  }

  Object.keys(progress).forEach(lessonIndex => {
    const p = progress[lessonIndex];
    const li = document.createElement("li");
    li.textContent = `Lesson ${parseInt(lessonIndex) + 1}: 
      WPM ${p.wpm}, Accuracy ${p.acc}%, 
      Status: ${p.passed ? "✅ Passed" : "❌ Failed"}`;
    list.appendChild(li);
  });
}

// Hook up to button
document.getElementById("Progress-btn").addEventListener("click", loadProgress);

function loadProgress() {
  const progress = results; 
  const list = document.getElementById("progressList");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  list.innerHTML = "";

  const totalLessons = 120; // Beginner lessons
  let passedCount = 0;

  if (Object.keys(progress).length === 0) {
    list.innerHTML = "<li>No lessons attempted yet.</li>";
    progressBar.style.width = "0%";
    progressText.textContent = "0 / " + totalLessons + " lessons passed";
    return;
  }

  Object.keys(progress).forEach(lessonIndex => {
    const p = progress[lessonIndex];
    const li = document.createElement("li");
    li.textContent = `Lesson ${parseInt(lessonIndex) + 1}: 
      WPM ${p.wpm}, Accuracy ${p.acc}%, 
      Status: ${p.passed ? "✅ Passed" : "❌ Failed"}`;
    if (p.passed) passedCount++;
    list.appendChild(li);
  });

  // Update progress bar
  const percent = (passedCount / totalLessons) * 120;
  progressBar.style.width = percent + "%";
  progressText.textContent = `${passedCount} / ${totalLessons} lessons passed`;
}


// Modal handling
const progressModal = document.getElementById("progressModal");
const progressBtn = document.getElementById("Progress-btn");
const closeBtn = document.getElementById("closeProgress");

progressBtn.addEventListener("click", () => {
  loadProgress();
  progressModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  progressModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === progressModal) {
    progressModal.style.display = "none";
  }
});


