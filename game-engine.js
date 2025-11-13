// ==== TYPING GAMES ENGINE ====
// Handles all game logic, rendering, and interactions

class TypingGame {
  constructor(gameType, gameData, onComplete) {
    this.gameType = gameType;
    this.gameData = gameData;
    this.onComplete = onComplete;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correctWords = 0;
    this.incorrectWords = 0;
    this.startTime = null;
    this.gameActive = false;
    this.gameCanvas = null;
    this.ctx = null;
  }
  
  // Initialize the game
  init(container) {
    this.container = container;
    this.setupGameUI();
    this.startGame();
  }
  
  // Setup game UI based on type
  setupGameUI() {
    let gameHTML = '';
    
    switch(this.gameType) {
      case 'word_rush':
        gameHTML = this.createWordRushUI();
        break;
      case 'falling_words':
        gameHTML = this.createFallingWordsUI();
        break;
      case 'typing_race':
        gameHTML = this.createTypingRaceUI();
        break;
      case 'word_cannon':
        gameHTML = this.createWordCannonUI();
        break;
      case 'speed_challenge':
        gameHTML = this.createSpeedChallengeUI();
        break;
      case 'typing_snake':
        gameHTML = this.createTypingSnakeUI();
        break;
      case 'word_scramble':
        gameHTML = this.createWordScrambleUI();
        break;
      case 'type_invaders':
        gameHTML = this.createTypeInvadersUI();
        break;
      default:
        gameHTML = this.createDefaultGameUI();
    }
    
    this.container.innerHTML = gameHTML;
  }
  
  // Word Rush UI
  createWordRushUI() {
    return `
      <div class="game-arena">
        <div class="game-stats-bar">
          <div class="game-stat">
            <span class="game-stat-label">Score</span>
            <span class="game-stat-value" id="game-score">0</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">Time</span>
            <span class="game-stat-value" id="game-time">60</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">Combo</span>
            <span class="game-stat-value" id="game-combo">0x</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">Words</span>
            <span class="game-stat-value" id="game-words">0</span>
          </div>
        </div>
        
        <div class="game-word-display" id="game-word-display">
          <div class="game-current-word" id="current-word">Ready</div>
        </div>
        
        <div class="game-input-container">
          <input type="text" id="game-input" class="game-input" placeholder="Type the word..." autocomplete="off" spellcheck="false">
        </div>
        
        <div class="game-message" id="game-message"></div>
      </div>
    `;
  }
  
  // Falling Words UI
  createFallingWordsUI() {
    return `
      <div class="game-arena">
        <div class="game-stats-bar">
          <div class="game-stat">
            <span class="game-stat-label">Score</span>
            <span class="game-stat-value" id="game-score">0</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">Lives</span>
            <span class="game-stat-value" id="game-lives">❤️❤️❤️</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">Level</span>
            <span class="game-stat-value" id="game-level">1</span>
          </div>
        </div>
        
        <canvas id="game-canvas" class="game-canvas" width="600" height="400"></canvas>
        
        <div class="game-input-container">
          <input type="text" id="game-input" class="game-input" placeholder="Type to catch words..." autocomplete="off" spellcheck="false">
        </div>
      </div>
    `;
  }
  
  // Typing Race UI
  createTypingRaceUI() {
    return `
      <div class="game-arena">
        <div class="game-stats-bar">
          <div class="game-stat">
            <span class="game-stat-label">Progress</span>
            <span class="game-stat-value" id="game-progress">0%</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">WPM</span>
            <span class="game-stat-value" id="game-wpm">0</span>
          </div>
        </div>
        
        <div class="game-race-track">
          <div class="race-car" id="race-car">🏎️</div>
          <div class="race-finish">🏁</div>
        </div>
        
        <div class="game-sentence-display" id="game-sentence">
          Click Start to begin!
        </div>
        
        <div class="game-input-container">
          <input type="text" id="game-input" class="game-input" placeholder="Type the sentence..." autocomplete="off" spellcheck="false">
        </div>
      </div>
    `;
  }
  
  // Word Cannon UI
  createWordCannonUI() {
    return `
      <div class="game-arena">
        <div class="game-stats-bar">
          <div class="game-stat">
            <span class="game-stat-label">Score</span>
            <span class="game-stat-value" id="game-score">0</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">Health</span>
            <span class="game-stat-value" id="game-health">💚💚💚💚💚</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">Wave</span>
            <span class="game-stat-value" id="game-wave">1</span>
          </div>
        </div>
        
        <canvas id="game-canvas" class="game-canvas" width="600" height="400"></canvas>
        
        <div class="game-input-container">
          <input type="text" id="game-input" class="game-input" placeholder="Type to shoot..." autocomplete="off" spellcheck="false">
        </div>
      </div>
    `;
  }
  
  // Speed Challenge UI
  createSpeedChallengeUI() {
    return `
      <div class="game-arena">
        <div class="game-countdown" id="game-countdown">Get Ready!</div>
        
        <div class="game-stats-bar">
          <div class="game-stat">
            <span class="game-stat-label">Words Typed</span>
            <span class="game-stat-value" id="game-words">0</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">Time Left</span>
            <span class="game-stat-value" id="game-time">30</span>
          </div>
          <div class="game-stat">
            <span class="game-stat-label">WPM</span>
            <span class="game-stat-value" id="game-wpm">0</span>
          </div>
        </div>
        
        <div class="game-word-grid" id="word-grid">
          <!-- Words will appear here -->
        </div>
        
        <div class="game-input-container">
          <input type="text" id="game-input" class="game-input" placeholder="Start typing..." autocomplete="off" spellcheck="false">
        </div>
      </div>
    `;
  }
  
  // Default game UI
  createDefaultGameUI() {
    return `
      <div class="game-arena">
        <div class="game-coming-soon">
          <div class="coming-soon-icon">🎮</div>
          <h3>Coming Soon!</h3>
          <p>This game is under development.</p>
          <p class="text-small text-muted">Check back later for an amazing typing game experience!</p>
        </div>
      </div>
    `;
  }
  
  // Start the game
  startGame() {
    this.gameActive = true;
    this.startTime = Date.now();
    
    // Initialize based on game type
    switch(this.gameType) {
      case 'word_rush':
        this.startWordRush();
        break;
      case 'falling_words':
        this.startFallingWords();
        break;
      case 'typing_race':
        this.startTypingRace();
        break;
      case 'word_cannon':
        this.startWordCannon();
        break;
      case 'speed_challenge':
        this.startSpeedChallenge();
        break;
      default:
        console.log('Game type not implemented yet');
    }
  }
  
  // Word Rush Game Logic
  startWordRush() {
    const input = document.getElementById('game-input');
    const wordDisplay = document.getElementById('current-word');
    const difficulty = this.gameData.difficulty || 'medium';
    const words = GAME_WORDS[difficulty] || GAME_WORDS.medium;
    
    let currentWord = '';
    let timeLeft = this.gameData.timeLimit || 60;
    
    const getNewWord = () => {
      currentWord = words[Math.floor(Math.random() * words.length)];
      wordDisplay.textContent = currentWord;
      wordDisplay.className = 'game-current-word';
    };
    
    const updateTimer = () => {
      if (!this.gameActive) return;
      
      timeLeft--;
      document.getElementById('game-time').textContent = timeLeft;
      
      if (timeLeft <= 0) {
        this.endGame();
      } else {
        setTimeout(updateTimer, 1000);
      }
    };
    
    input.addEventListener('input', (e) => {
      const typed = e.target.value.trim();
      
      if (typed === currentWord) {
        // Correct word
        this.score += (10 * (this.combo + 1));
        this.combo++;
        this.correctWords++;
        
        if (this.combo > this.maxCombo) this.maxCombo = this.combo;
        
        document.getElementById('game-score').textContent = this.score;
        document.getElementById('game-combo').textContent = this.combo + 'x';
        document.getElementById('game-words').textContent = this.correctWords;
        
        // Visual feedback
        wordDisplay.classList.add('correct-flash');
        this.showMessage('✓ Correct!', 'success');
        
        input.value = '';
        getNewWord();
        
      } else if (!currentWord.startsWith(typed) && typed.length > 0) {
        // Wrong input
        wordDisplay.classList.add('incorrect-flash');
        this.combo = 0;
        document.getElementById('game-combo').textContent = '0x';
      }
    });
    
    getNewWord();
    updateTimer();
    input.focus();
  }
  
  // Speed Challenge Game Logic
  startSpeedChallenge() {
    const input = document.getElementById('game-input');
    const wordGrid = document.getElementById('word-grid');
    const countdown = document.getElementById('game-countdown');
    const difficulty = this.gameData.difficulty || 'medium';
    const words = GAME_WORDS[difficulty] || GAME_WORDS.medium;
    
    let timeLeft = this.gameData.timeLimit || 30;
    let wordsTyped = 0;
    let currentWords = [];
    
    // Countdown before start
    let count = 3;
    const countdownInterval = setInterval(() => {
      countdown.textContent = count;
      count--;
      
      if (count < 0) {
        clearInterval(countdownInterval);
        countdown.textContent = 'GO!';
        setTimeout(() => countdown.style.display = 'none', 500);
        startTyping();
      }
    }, 1000);
    
    const startTyping = () => {
      // Generate grid of words
      const generateWords = () => {
        currentWords = [];
        for (let i = 0; i < 12; i++) {
          currentWords.push(words[Math.floor(Math.random() * words.length)]);
        }
        
        wordGrid.innerHTML = currentWords.map((word, i) => 
          `<div class="word-item" data-index="${i}">${word}</div>`
        ).join('');
      };
      
      const updateTimer = () => {
        if (!this.gameActive) return;
        
        timeLeft--;
        document.getElementById('game-time').textContent = timeLeft;
        
        if (timeLeft <= 0) {
          this.endGame();
        } else {
          setTimeout(updateTimer, 1000);
        }
      };
      
      input.addEventListener('input', (e) => {
        const typed = e.target.value.trim().toLowerCase();
        
        currentWords.forEach((word, index) => {
          if (typed === word.toLowerCase()) {
            // Correct word
            wordsTyped++;
            this.correctWords++;
            
            const wordItem = document.querySelector(`[data-index="${index}"]`);
            if (wordItem) {
              wordItem.classList.add('word-completed');
            }
            
            document.getElementById('game-words').textContent = wordsTyped;
            
            // Calculate WPM
            const elapsed = (Date.now() - this.startTime) / 1000 / 60;
            const wpm = Math.round((wordsTyped / elapsed));
            document.getElementById('game-wpm').textContent = wpm;
            
            input.value = '';
            generateWords();
          }
        });
      });
      
      generateWords();
      updateTimer();
      input.focus();
    };
  }
  
  // Show message
  showMessage(text, type = 'info') {
    const messageEl = document.getElementById('game-message');
    if (!messageEl) return;
    
    messageEl.textContent = text;
    messageEl.className = `game-message ${type}`;
    messageEl.style.display = 'block';
    
    setTimeout(() => {
      messageEl.style.display = 'none';
    }, 1500);
  }
  
  // End game
  endGame() {
    this.gameActive = false;
    
    const elapsed = (Date.now() - this.startTime) / 1000;
    const wpm = Math.round((this.correctWords * 60) / elapsed);
    const accuracy = this.correctWords + this.incorrectWords > 0 
      ? Math.round((this.correctWords / (this.correctWords + this.incorrectWords)) * 100)
      : 100;
    
    if (this.onComplete) {
      this.onComplete({
        wpm: wpm,
        accuracy: accuracy,
        score: this.score,
        correctWords: this.correctWords,
        incorrectWords: this.incorrectWords,
        maxCombo: this.maxCombo
      });
    }
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TypingGame;
}