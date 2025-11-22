// ==== HYMNS PRACTICE SYSTEM ====


// Public domain hymns collection (you can add more)
const HYMNS_DATA = [
  {
    id: 1,
    title: "Amazing Grace",
    author: "John Newton",
    year: 1779,
    category: "Salvation",
    verses: [
      "Amazing grace how sweet the sound that saved a wretch like me I once was lost but now am found was blind but now I see",
      "Twas grace that taught my heart to fear and grace my fears relieved How precious did that grace appear the hour I first believed",
      "Through many dangers toils and snares I have already come Tis grace hath brought me safe thus far and grace will lead me home"
    ]
  },
  {
    id: 2,
    title: "How Great Thou Art",
    author: "Carl Boberg",
    year: 1885,
    category: "Praise",
    verses: [
      "O Lord my God when I in awesome wonder consider all the worlds Thy hands have made I see the stars I hear the rolling thunder Thy power throughout the universe displayed",
      "Then sings my soul my Saviour God to Thee how great Thou art how great Thou art Then sings my soul my Saviour God to Thee how great Thou art how great Thou art"
    ]
  },
  {
    id: 3,
    title: "It Is Well With My Soul",
    author: "Horatio Spafford",
    year: 1873,
    category: "Peace",
    verses: [
      "When peace like a river attendeth my way when sorrows like sea billows roll Whatever my lot Thou hast taught me to say It is well it is well with my soul",
      "My sin oh the bliss of this glorious thought my sin not in part but the whole Is nailed to the cross and I bear it no more praise the Lord praise the Lord O my soul"
    ]
  },
  {
    id: 4,
    title: "Holy Holy Holy",
    author: "Reginald Heber",
    year: 1826,
    category: "Worship",
    verses: [
      "Holy holy holy Lord God Almighty Early in the morning our song shall rise to Thee Holy holy holy merciful and mighty God in three Persons blessed Trinity",
      "Holy holy holy all the saints adore Thee casting down their golden crowns around the glassy sea Cherubim and seraphim falling down before Thee which wert and art and evermore shalt be"
    ]
  },
  {
    id: 5,
    title: "Be Thou My Vision",
    author: "Ancient Irish",
    year: 700,
    category: "Devotion",
    verses: [
      "Be Thou my vision O Lord of my heart naught be all else to me save that Thou art Thou my best thought by day or by night waking or sleeping Thy presence my light",
      "Be Thou my wisdom and Thou my true word I ever with Thee and Thou with me Lord Thou my great Father and I Thy true son Thou in me dwelling and I with Thee one"
    ]
  }
];

let currentHymn = null;
let currentHymnVerseIndex = 0;  // CHANGED
let currentHymnVerseText = '';  // CHANGED
let hymnsTyped = '';
let hymnsStartTime = null;
let hymnsTimerDuration = 90;
let hymnsTimeLeft = 90;
let hymnsTimerInterval = null;
let hymnsMode = 'typing';
let hymnsAudioPlaying = false;

// Initialize Hymns page
function loadHymnsPage() {
  updateHymnsStats();
  loadHymnsList();
  setupHymnsEventListeners();
}

function setupHymnsEventListeners() {
  // Mode tabs
  document.querySelectorAll('.hymns-mode-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.hymns-mode-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      hymnsMode = this.dataset.mode;
      
      if (hymnsMode === 'audio') {
        document.getElementById('hymns-audio-controls').style.display = 'block';
        document.getElementById('hymns-verse-display').style.display = 'none';
      } else {
        document.getElementById('hymns-audio-controls').style.display = 'none';
        document.getElementById('hymns-verse-display').style.display = 'block';
      }
    });
  });
  
  // Back button
  document.getElementById('back-to-hymns')?.addEventListener('click', () => {
    stopHymnsTimer();
    stopHymnsAudio();
    document.getElementById('hymns-list-grid').style.display = 'grid';
    document.getElementById('hymns-practice-card').style.display = 'none';
    hymnsTyped = '';
    document.getElementById('hymns-input').value = '';
  });
  
  // Timer select
  const timerSelect = document.getElementById('hymns-timer-select');
  if (timerSelect && !timerSelect.dataset.listenerAdded) {
    timerSelect.dataset.listenerAdded = 'true';
    timerSelect.addEventListener('change', (e) => {
      hymnsTimerDuration = parseInt(e.target.value);
      hymnsTimeLeft = hymnsTimerDuration;
      document.getElementById('hymns-countdown').textContent = 
        hymnsTimerDuration === 0 ? '∞' : hymnsTimerDuration + 's';
    });
  }
  
  // Audio controls
  document.getElementById('play-hymn-audio')?.addEventListener('click', playHymnAudio);
  document.getElementById('stop-hymn-audio')?.addEventListener('click', stopHymnsAudio);
  
  // Hymns input
  const hymnsInput = document.getElementById('hymns-input');
  if (hymnsInput && !hymnsInput.dataset.listenerAdded) {
    hymnsInput.dataset.listenerAdded = 'true';
    hymnsInput.addEventListener('input', handleHymnsInput);
    hymnsInput.addEventListener('paste', e => e.preventDefault());
  }
}

// Update stats
function updateHymnsStats() {
  const statsKey = 'hymns_stats_global';
  const stats = JSON.parse(localStorage.getItem(statsKey) || '{"totalVerses": 0, "totalHymns": 0}');
  
  document.getElementById('total-hymns-practiced').textContent = stats.totalHymns || 0;
  document.getElementById('total-hymn-verses').textContent = stats.totalVerses || 0;
}

// Load hymns list
function loadHymnsList() {
  const hymnsGrid = document.getElementById('hymns-list-grid');
  
  let html = '';
  HYMNS_DATA.forEach(hymn => {
    const progress = getHymnProgress(hymn.id);
    
    html += `
      <div class="hymn-card" onclick="openHymn(${hymn.id})">
        <div class="hymn-card-header">
          <h4 class="hymn-card-title">${hymn.title}</h4>
          <span class="hymn-category-badge">${hymn.category}</span>
        </div>
        <div class="hymn-card-meta">
          <span>📝 ${hymn.author}</span>
          <span>📅 ${hymn.year}</span>
        </div>
        <div class="hymn-card-meta">
          <span>${hymn.verses.length} verses</span>
          <span>${progress.completed ? '✅ Completed' : progress.versesCompleted + ' typed'}</span>
        </div>
        <div class="hymn-progress-bar">
          <div class="hymn-progress-fill" style="width: ${progress.percentage}%"></div>
        </div>
      </div>
    `;
  });
  
  hymnsGrid.innerHTML = html;
}

// Get hymn progress
function getHymnProgress(hymnId) {
  const key = `hymn_progress_${hymnId}`;
  const progress = JSON.parse(localStorage.getItem(key) || '{"versesCompleted": 0, "completed": false}');
  const hymn = HYMNS_DATA.find(h => h.id === hymnId);
  const percentage = hymn ? Math.round((progress.versesCompleted / hymn.verses.length) * 100) : 0;
  
  return {
    versesCompleted: progress.versesCompleted || 0,
    completed: progress.completed || false,
    percentage: percentage
  };
}

// Open hymn
window.openHymn = function(hymnId) {
  currentHymn = HYMNS_DATA.find(h => h.id === hymnId);
  if (!currentHymn) return;
  
  currentVerseIndex = 0;
  
  // Hide list, show practice
  document.getElementById('hymns-list-grid').style.display = 'none';
  document.getElementById('hymns-practice-card').style.display = 'block';
  
  // Update header
  document.getElementById('current-hymn-title').textContent = currentHymn.title;
  document.getElementById('current-hymn-author').textContent = `${currentHymn.author} (${currentHymn.year})`;
  
  // Load first verse
  loadCurrentHymnVerse();
};

// Load current verse
function loadCurrentHymnVerse() {
  if (currentVerseIndex >= currentHymn.verses.length) {
    completeHymn();
    return;
  }
  
  currentVerseText = currentHymn.verses[currentVerseIndex];
  hymnsTyped = '';
  hymnsStartTime = null;
  
  updateHymnVerseDisplay();
  renderHymnVerse();
  
  const input = document.getElementById('hymns-input');
  input.value = '';
  input.disabled = false;
  input.focus();
  
  // Reset stats
  document.getElementById('hymns-time').textContent = '0s';
  document.getElementById('hymns-wpm').textContent = '0';
  document.getElementById('hymns-accuracy').textContent = '100%';
  
  // Reset timer
  stopHymnsTimer();
  hymnsTimeLeft = hymnsTimerDuration;
  document.getElementById('hymns-countdown').textContent = 
    hymnsTimerDuration === 0 ? '∞' : hymnsTimerDuration + 's';
  document.getElementById('hymns-countdown').style.color = 'var(--accent-solid)';
}

// Update verse display
function updateHymnVerseDisplay() {
  const verseInfo = `Verse ${currentVerseIndex + 1} of ${currentHymn.verses.length}`;
  document.getElementById('hymns-verse-info').textContent = verseInfo;
}

// Render hymn verse
function renderHymnVerse() {
  if (hymnsMode === 'audio' && !hymnsAudioPlaying) {
    document.getElementById('hymns-verse-text').innerHTML = 
      '<span style="color: var(--muted); font-style: italic;">🎧 Click "Play Audio" to hear the verse, then type what you hear...</span>';
    return;
  }
  
  const display = document.getElementById('hymns-verse-text');
  let html = '';
  
  for (let i = 0; i < currentVerseText.length; i++) {
    const char = currentVerseText[i];
    const typedChar = hymnsTyped[i];
    
    let charClass = 'char';
    
    if (i === hymnsTyped.length) {
      charClass += ' current';
    } else if (typedChar !== undefined) {
      if (typedChar === char) {
        charClass += ' correct';
      } else {
        charClass += ' incorrect';
      }
    }
    
    html += `<span class="${charClass}">${char === ' ' ? '&nbsp;' : escapeHtml(char)}</span>`;
  }
  
  display.innerHTML = html;
}

// Play audio
function playHymnAudio() {
  if (!currentVerseText) return;
  
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(currentVerseText);
    utterance.rate = 0.8; // Slower for transcription
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    utterance.onstart = () => {
      hymnsAudioPlaying = true;
      document.getElementById('hymns-verse-text').innerHTML = 
        '<span style="color: var(--accent-solid); font-style: italic;">🎧 Playing audio... Listen carefully!</span>';
    };
    
    utterance.onend = () => {
      hymnsAudioPlaying = false;
      renderHymnVerse();
      document.getElementById('hymns-input').disabled = false;
      document.getElementById('hymns-input').focus();
      
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: linear-gradient(135deg, #51cf66, #37b24d);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
      `;
      toast.textContent = '✅ Audio complete! Now type what you heard.';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    };
    
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Audio playback is not supported in your browser.');
  }
}

// Stop audio
function stopHymnsAudio() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    hymnsAudioPlaying = false;
  }
}

// Handle input
function handleHymnsInput(e) {
  if (!hymnsStartTime) {
    hymnsStartTime = Date.now();
    startHymnsTimer();
  }
  
  hymnsTyped = e.target.value;
  renderHymnVerse();
  
  // Calculate stats
  const elapsed = (Date.now() - hymnsStartTime) / 1000;
  const wordsTyped = hymnsTyped.length / 5;
  const wpm = elapsed > 0 ? Math.round((wordsTyped / elapsed) * 60) : 0;
  
  let correct = 0;
  for (let i = 0; i < hymnsTyped.length; i++) {
    if (hymnsTyped[i] === currentVerseText[i]) correct++;
  }
  const accuracy = hymnsTyped.length > 0 ? Math.round((correct / hymnsTyped.length) * 100) : 100;
  
  document.getElementById('hymns-time').textContent = Math.floor(elapsed) + 's';
  document.getElementById('hymns-wpm').textContent = wpm;
  document.getElementById('hymns-accuracy').textContent = accuracy + '%';
  
  // Check completion
  if (hymnsTyped.length >= currentVerseText.length) {
    completeHymnVerse(wpm, accuracy);
  }
}

// Start timer
function startHymnsTimer() {
  if (hymnsTimerInterval) clearInterval(hymnsTimerInterval);
  
  if (hymnsTimerDuration === 0) {
    document.getElementById('hymns-countdown').textContent = '∞';
    return;
  }
  
  hymnsTimeLeft = hymnsTimerDuration;
  document.getElementById('hymns-countdown').textContent = hymnsTimeLeft + 's';
  
  hymnsTimerInterval = setInterval(() => {
    hymnsTimeLeft--;
    
    if (hymnsTimeLeft <= 0) {
      clearInterval(hymnsTimerInterval);
      hymnsTimerInterval = null;
      document.getElementById('hymns-countdown').textContent = '0s';
      document.getElementById('hymns-countdown').style.color = '#ff6b6b';
      document.getElementById('hymns-input').disabled = true;
      alert('Time is up! Move to the next verse or try again.');
    } else {
      document.getElementById('hymns-countdown').textContent = hymnsTimeLeft + 's';
      
      if (hymnsTimeLeft <= 10) {
        document.getElementById('hymns-countdown').style.color = '#ff6b6b';
      } else if (hymnsTimeLeft <= 30) {
        document.getElementById('hymns-countdown').style.color = '#ffc107';
      } else {
        document.getElementById('hymns-countdown').style.color = 'var(--accent-solid)';
      }
    }
  }, 1000);
}

// Stop timer
function stopHymnsTimer() {
  if (hymnsTimerInterval) {
    clearInterval(hymnsTimerInterval);
    hymnsTimerInterval = null;
  }
}

// Complete verse
function completeHymnVerse(wpm, accuracy) {
  document.getElementById('hymns-input').disabled = true;
  stopHymnsTimer();
  stopHymnsAudio();
  
  // Save progress
  const key = `hymn_progress_${currentHymn.id}`;
  const progress = JSON.parse(localStorage.getItem(key) || '{"versesCompleted": 0}');
  progress.versesCompleted = Math.max(progress.versesCompleted, currentVerseIndex + 1);
  progress.completed = progress.versesCompleted >= currentHymn.verses.length;
  localStorage.setItem(key, JSON.stringify(progress));
  
  // Update global stats
  const statsKey = 'hymns_stats_global';
  const stats = JSON.parse(localStorage.getItem(statsKey) || '{"totalVerses": 0, "totalHymns": 0}');
  stats.totalVerses = (stats.totalVerses || 0) + 1;
  
  if (progress.completed && !stats.completedHymns?.includes(currentHymn.id)) {
    stats.completedHymns = stats.completedHymns || [];
    stats.completedHymns.push(currentHymn.id);
    stats.totalHymns = stats.completedHymns.length;
  }
  
  localStorage.setItem(statsKey, JSON.stringify(stats));
  updateHymnsStats();
  
  // Show completion
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    background: linear-gradient(135deg, #9f7cff, #6b4eff);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    z-index: 10000;
    box-shadow: 0 4px 16px rgba(159, 124, 255, 0.4);
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = `🎵 Verse completed! ${wpm} WPM • ${accuracy}%`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
  
  // Auto next verse
  setTimeout(() => {
    currentVerseIndex++;
    loadCurrentHymnVerse();
  }, 2000);
}

// Complete hymn
function completeHymn() {
  alert(`🎉 Hymn "${currentHymn.title}" completed! Well done!`);
  document.getElementById('hymns-list-grid').style.display = 'grid';
  document.getElementById('hymns-practice-card').style.display = 'none';
  loadHymnsList();
}

// Helper
function escapeHtml(text) {
  const map = {'&': '&amp;','<': '&lt;','>': '&gt;','"': '&quot;',"'": '&#039;'};
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Export
window.loadHymnsPage = loadHymnsPage;
