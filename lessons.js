 // Tab switching logic
    document.querySelectorAll("#lesson-tabs .tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll("#lesson-tabs .tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        document.querySelectorAll("[id^='section-']").forEach(sec => sec.classList.add("hidden"));
        document.getElementById("section-" + tab.dataset.level).classList.remove("hidden");
      });
    });

// === Beginner Lessons (100 total) ===
const beginnerLessons = [
  // === Stage 1: Home row drills (40) ===
  "asdf jkl;", "asdf asdf jkl; jkl;", "aa ss dd ff jj kk ll ;;",
  "adsf lk;j", "fjdksla ;laskdjf", "a s d f j k l ;", "ff jj kk ll aa ss dd ;;",
  "asdf asdf asdf", "jkl; jkl; jkl;", "a a a s s s d d d f f f",
  "j j j k k k l l l ; ; ;", "asdf jkl; asdf jkl;", "aa jj ss kk dd ll ff ;;",
  "asdfg hjkl;", "a s d f g h j k l ;", "asdfgh jkl;", "a j s k d l f ;",
  "aj sk dl f;", "jk; asd fgh", "a s j k d l f ;",
  "asdf jkl; asdf jkl;", "adsfjkl; adsfjkl;", "aa ss dd ff jj kk ll ;; aa ss",
  "ff jj ff jj ff jj", "asdfg hjkl; asdfg hjkl;", "a s d f j k l ; a s d f j",
  "fff jjj ddd kkk lll ;;; aaa sss", "asdf jkl; aaaa ssss dddd ffff",
  "jjjj kkkk llll ;;;; aaaa ssss dddd ffff",
  "asdf jkl; fjdk sl; ajsl dkjf",
  "jjjj aaaa kkkk ssss llll dddd ;;;; ffff",
  "adsf jkl; asdf jkl;", "asdf jkl; asdf jkl;", "aaaa jjjj ssss kkkk",
  "ll ll ;; ;; dd dd ff ff aa aa", "adsf adsf jkl; jkl;", "sdfj kl; asdf jkl;",
  "asdf asdf jkl; jkl;", "asdf jkl; adsf lk;j",

  // === Stage 2: Words (30) ===
  "dad sad lad", "fall all sall", "jazz add flask", "dad fad lad bad",
  "all fall hall mall", "lass mass pass gas", "fall sad dad lad",
  "jazz lad sad dad", "dad had a lad", "Sam sat", "lad sad dad fad",
  "fall hall mall tall", "sass mass lass pass", "dad lad sad tad",
  "add jazz fizz", "fall lad dad bad", "hall mall call tall",
  "lad bad sad mad", "lass mass bass sass", "dad lad add sad",
  "fall tall wall hall", "jazz pass mass lass", "fad lad add dad",
  "sass lass mass jazz", "lad sad dad fad bad", "Sam had lad", "Dad had lad",
  "fall lad dad mall", "lass bass mass pass", "jazz sass lass mass",

  // === Stage 3: Sentences (30) ===
  "Sam sat on a mat", "Dad had a lad", "Jill said all is well",
  "A lad had a sad fall", "All dads fall and all lads fall",
  "Sam had a flask", "Jill had a lad and dad", "Dad said lad sat",
  "A lad fell and dad fell", "Jill and Sam had a lad",
  "Dad had a small flask", "All lads sat and all dads sat",
  "Sam said Jill had a lad", "Dad and lad had a fall",
  "All fall and all had a lad", "Dad said all lads sat",
  "Sam had lad and dad had lad", "A lad had fall and dad had fall",
  "All lads had dad and all dads had lad",
  "Dad and Sam had lad and Jill had lad",
  "All dads sat and lads sat", "A lad sat and dad sat",
  "Sam had flask and dad had flask",
  "All lads had flask and all dads had flask",
  "Jill had dad and lad had flask", "Sam had lad and dad had flask",
  "All lads sat and all dads had lad",
  "Sam had dad and lad and Jill had flask",
  "Dad had lad and flask and Sam had lad",
  "All lads sat and all dads had flask"
]


let currentLesson = 0;
let startTime = null;

let currentLessonIndex = 0;
let passedLessons = JSON.parse(localStorage.getItem("passedLessons")) || [];
let timerInterval;
let timeLeft = 120;
let typingLocked = false; // 🔒 NEW FLAG

function renderLessons() {
  const container = document.getElementById("lessons-list");
  container.innerHTML = "";

  beginnerLessons.forEach((lesson, index) => {
    const btn = document.createElement("button");
    btn.textContent = `Lesson ${index + 1}`;
    btn.className = "lesson-btn";

    if (passedLessons.includes(index)) {
      btn.classList.add("passed");
    } else if (index > 0 && !passedLessons.includes(index - 1)) {
      btn.disabled = true;
    }

    btn.onclick = () => loadLesson(index);
    container.appendChild(btn);
  });

  updateProgress();
}

function updateProgress() {
  const completed = passedLessons.length;
  const total = beginnerLessons.length;
  const percent = (completed / total) * 100;

  document.getElementById("progress-text").textContent = 
    `Progress: ${completed} / ${total} lessons passed`;
  document.getElementById("progress-bar").style.width = percent + "%";
}

function loadLesson(index) {
  currentLessonIndex = index;
  document.getElementById("lesson-text").textContent = beginnerLessons[index];

  typingLocked = false; // 🔓 Unlock typing
  document.getElementById("typing-input").disabled = false;
  document.getElementById("typing-input").value = "";

  resetTimer();
  startTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 120;
  document.getElementById("timer").textContent = "Time: 120s";
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      typingLocked = true; // 🔒 Lock typing
      document.getElementById("typing-input").disabled = true;

      // End lesson (simulate results)
      completeLesson(getRandomWPM(), getRandomAccuracy()); 
    }
  }, 1000);
}

// Placeholder until real typing logic is wired
function getRandomWPM() { return Math.floor(Math.random() * 50) + 20; }
function getRandomAccuracy() { return Math.floor(Math.random() * 20) + 80; }

function completeLesson(wpm, accuracy) {
  clearInterval(timerInterval);

  if (wpm >= 30 && accuracy >= 90) {
    if (!passedLessons.includes(currentLessonIndex)) {
      passedLessons.push(currentLessonIndex);
      localStorage.setItem("passedLessons", JSON.stringify(passedLessons));
    }
    if (currentLessonIndex + 1 < beginnerLessons.length) {
      loadLesson(currentLessonIndex + 1);
    }
    renderLessons();
  } else {
    alert(`Lesson failed!\nWPM: ${wpm}, Accuracy: ${accuracy}%\nNeed at least 30 WPM and 90% accuracy.`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderLessons();
  loadLesson(0);
});


const lessonTextEl = document.getElementById("lesson-text");
const lessonInputEl = document.getElementById("lesson-input");
const lessonWpmEl = document.getElementById("lesson-wpm");
const lessonAccEl = document.getElementById("lesson-accuracy");
const prevBtn = document.getElementById("prev-lesson");
const nextBtn = document.getElementById("next-lesson");
const retryBtn = document.getElementById("retry-lesson");

// Result + Progress
const resultMsgEl = document.createElement("p");
document.querySelector(".results").appendChild(resultMsgEl);

const progressEl = document.createElement("p");
progressEl.style.marginTop = "10px";
progressEl.style.fontWeight = "bold";
document.querySelector(".results").appendChild(progressEl);

function saveProgress() {
  localStorage.setItem("beginnerProgress", JSON.stringify(passedLessons));
}

function updateProgress() {
  const passedCount = passedLessons.filter(p => p).length;
  progressEl.textContent = `Progress: ${passedCount}/${beginnerLessons.length} lessons passed`;
}

function loadLesson(index) {
  lessonTextEl.textContent = beginnerLessons[index];
  lessonInputEl.value = "";
  lessonWpmEl.textContent = "0";
  lessonAccEl.textContent = "0%";
  resultMsgEl.textContent = "";
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === beginnerLessons.length - 1;
  startTime = null;
  updateProgress();
}

loadLesson(currentLesson);

// Navigation
prevBtn.addEventListener("click", () => {
  if (currentLesson > 0) {
    currentLesson--;
    loadLesson(currentLesson);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentLesson < beginnerLessons.length - 1) {
    currentLesson++;
    loadLesson(currentLesson);
  }
});

retryBtn.addEventListener("click", () => {
  loadLesson(currentLesson);
});

// Typing logic
lessonInputEl.addEventListener("input", () => {
  if (!startTime) startTime = new Date(); // start timer when typing begins

  const target = lessonTextEl.textContent.trim();
  const typed = lessonInputEl.value.trim();

  const targetWords = target.split(/\s+/);
  const typedWords = typed.split(/\s+/);

  let correctWords = 0;
  typedWords.forEach((word, i) => {
    if (word === targetWords[i]) correctWords++;
  });

  const accuracy = Math.round((correctWords / targetWords.length) * 100) || 0;
  lessonAccEl.textContent = accuracy + "%";

  // Calculate elapsed time in minutes
  const elapsedTime = (new Date() - startTime) / 1000 / 60;
  const wpm = Math.round(correctWords / (elapsedTime || 1));
  lessonWpmEl.textContent = wpm;

  // Pass/fail check
  if (typed.length >= target.length) {
    if (wpm >= 30 && accuracy >= 90) {
      resultMsgEl.textContent = "✅ Lesson Passed!";
      resultMsgEl.style.color = "green";
      passedLessons[currentLesson] = true;
      saveProgress();
      updateProgress();

      // Auto-advance to next lesson if available
      setTimeout(() => {
        if (currentLesson < beginnerLessons.length - 1) {
          currentLesson++;
          loadLesson(currentLesson);
        }
      }, 1000);
    } else {
      resultMsgEl.textContent = "❌ Try Again. (Need 30 WPM & 90% Accuracy)";
      resultMsgEl.style.color = "red";
    }
  }
});




  // ✅ Save progress if requirements met
  if (wpm >= 20 && accuracy >= 90) {
    beginnerProgress[currentLesson] = true;
    localStorage.setItem("beginnerProgress", JSON.stringify(beginnerProgress));
    checkUnlocks();
  }


function checkUnlocks() {
  const allPassed = beginnerLessons.every((_, i) => beginnerProgress[i]);
  if (allPassed) {
    document.getElementById("intermediate-lessons").classList.remove("locked");
    document.getElementById("intermediate-lessons").classList.add("unlocked");
    document.querySelector("#intermediate-lessons h2").textContent = "Intermediate Lessons ✅";
    document.querySelector("#intermediate-lessons .lock-msg").textContent = "Unlocked! Start practicing.";
  }
}

// Load first lesson
loadLesson(currentLesson);
checkUnlocks();
