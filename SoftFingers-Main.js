document.addEventListener('DOMContentLoaded', () => {
  // ==== FIREBASE CONFIG - your real config ====
  const firebaseConfig = {
    apiKey: "AIzaSyCoQO4vR_lIStx2lMPSy_YhHYPh75gHRSQ",
    authDomain: "softfingers-typing.firebaseapp.com",
    projectId: "softfingers-typing",
    storageBucket: "softfingers-typing.firebasestorage.app",
    messagingSenderId: "896354348357",
    appId: "1:896354348357:web:72fda3e79dce5f5b8b622c",
    measurementId: "G-SLF302PVR4"
  };
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // ==== ELEMENTS (existing IDs from your HTML) ====
  const loginTab = document.getElementById('tab-login');
  const signupTab = document.getElementById('tab-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const authCard = document.getElementById('auth-card');
  const authMessage = document.getElementById('auth-message');
  const forgotBtn = document.getElementById('forgot-btn');

  const userEmailTag = document.getElementById('user-email-tag');
  const emailVerifStatus = document.getElementById('email-verif-status');
  const logoutBtn = document.getElementById('logout-btn');
  const sendVerifBtn = document.getElementById('send-verif-btn');
  const authSummary = document.getElementById('auth-summary');

  const bestWPMEl = document.getElementById('best-wpm');
  const bestAccEl = document.getElementById('best-acc');
  const recentTableBody = document.querySelector('#recent-table tbody');
  const leaderboardBody = document.querySelector('#leaderboard-table tbody');

  const statTime = document.getElementById('stat-time');
  const statWPM = document.getElementById('stat-wpm');
  const statAcc = document.getElementById('stat-acc');
  const passageDisplay = document.getElementById('passage-display');
  const typingInput = document.getElementById('typing-input');
  const retryBtn = document.getElementById('retry-btn');
  const currentDiffBadge = document.getElementById('current-diff');
  const durationSelect = document.getElementById('duration-select');

  const diffTabs = document.querySelectorAll('.tab[data-diff]');
  const modeSelect = document.getElementById('mode-select');
  const quoteControls = document.getElementById('quote-controls');
  const quoteSelect = document.getElementById('quote-select');
  const quoteAuthorEl = document.getElementById('quote-author');

  // ==== DYNAMIC Story controls (auto-injected; no HTML change needed) ====
  const storyControls = document.createElement('div');
  storyControls.id = 'story-controls';
  storyControls.style.display = 'none';
  storyControls.style.minWidth = '260px';
  storyControls.innerHTML = `
    <div class="small">Story</div>
    <select id="story-chapter"></select>
    <select id="story-part" style="margin-left:8px; min-width:120px;">
      <option value="0">Part 1</option>
      <option value="1">Part 2</option>
    </select>
    <div class="small" id="story-meta" style="margin-top:4px;"></div>
  `;
  // insert after quote-controls
  quoteControls.parentNode.insertBefore(storyControls, quoteControls.nextSibling);

  const storyChapterSelect = storyControls.querySelector('#story-chapter');
  const storyPartSelect = storyControls.querySelector('#story-part');
  const storyMetaEl = storyControls.querySelector('#story-meta');

  // ==== WORDS / QUOTES (from your version) ====
  const WORDS = {
    Beginner: ["during","after","today","between","behind","defend","divine","middle","under","magic","beneath","withdraw",
    "Typing is fun when practiced daily.",
      "The sun sets and rises with a new day.",
      "Small steps lead to great achievements.",
      "believer","believe","release","adapt","construct","idiot","heaven","ignite","super","superb","dreadful","hover",
      "infinite","Jordan","coward","flame","previous","maintain","honorary","legacy","legit","graze","content","grass",
      "introduce","luggage","enter","ease","radio","junk","jelly","juice","juvenile","order","other","backspace","loop",
      "museum","hail","loving","Ghana","America","hundred","attract","abnormal","adjust","down","pages","pages","vile",
      "zebra","xylophone","lobby","easy","over","gamers","games","like","leave","leaves","lift","influence","frame",
      "insane","breathe","raid","flee","mango","pumpkin","orange","voilet","apple","inside","intern","mediate","final",
      "review","intend","brave","mapping","view","candle","handle","female","mandate","hunger","hungry","number","figure",
      "habit","things","matter","synthesis","grant","redeem","floor","major","subject","attract","indeed","below","other",
      "father","mother","uncle","auntie","nephew","niece","without","between","could","should","however","about","should",
      "green","purple","yellow","royal","chariot","horses","artist","mechanic","sweep","holler","amnesia","triangle","angel",
      "activate","windows","leader","settings","keyboard","majority","reel","track","preach","teach","leakage","angle","darkness",
      "trace","squeeze","truck","train","training","crystal","clear","clearance","mode","hatred","bitter","selfie","maize","blank",
      "chat","chartered","altar","alter","altered","chain","block","music","discord","discount","anger","bitterness","duty","faith",
      "individual","group","measure","kite","kiwi","forest","manner","statue","stature","Bible","chief","linquist","quick","quartz",
      "ghost","narrow","road","rapture","beast","brute","human","acquaint","scarlet","brown","black","white","blue","peach","parrot",
      "severe","several","plate","shadow","slain","three","eleven","computer","hazard","manager","account","cashier","clerk","clearance",
      "heavy","brother","zinc","grapes","choke","banker","mobile","retreat","surrender","water","hybrid","since","yourself"
    ],
    Intermediate: ["synthesis","resolve","gradient","interaction","parallel","compute","framework","latency","protocol","asynchronous","concurrency","optimization","rendering",
      "Learning to type with accuracy and speed takes dedication.",
      "Patience and practice unlock hidden potential in every learner.",
      "Consistency is the bridge between goals and accomplishments."
    ],
    Advanced: ["antidisestablishmentarianism","transubstantiation","quintessentially","epistemological","philosophically","heterogeneous","microarchitecture","electroencephalography","counterintuitively","neurophysiological",
      "In the symphony of progress, persistence plays the most enduring tune.",
      "Mastery is not an act but a habit built from countless attempts.",
      "Complex challenges refine character, shaping resilience and brilliance."
    ]
  };

// Quote bank (from user)
      const QUOTES = [
        {"quote": "Be the change that you wish to see in the world.", "author": "Mahatma Gandhi"},
        {"quote": "In the middle of every difficulty lies opportunity.", "author": "Albert Einstein"},
        {"quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.", "author": "Winston Churchill"},
        {"quote": "The only thing we have to fear is fear itself.", "author": "Franklin D. Roosevelt"},
        {"quote": "Do not go where the path may lead, go instead where there is no path and leave a trail.", "author": "Ralph Waldo Emerson"},
        {"quote": "I have not failed. I've just found 10,000 ways that won't work.", "author": "Thomas Edison"},
        {"quote": "The future belongs to those who believe in the beauty of their dreams.", "author": "Eleanor Roosevelt"},
        {"quote": "What lies behind us and what lies before us are tiny matters compared to what lies within us.", "author": "Ralph Waldo Emerson"},
        {"quote": "Life is what happens when you're busy making other plans.", "author": "John Lennon"},
        {"quote": "Whether you think you can or you think you can't, you're right.", "author": "Henry Ford"},
        {"quote": "It always seems impossible until it's done.", "author": "Nelson Mandela"},
        {"quote": "The journey of a thousand miles begins with one step.", "author": "Lao Tzu"},
        {"quote": "You must be the master of your own destiny.", "author": "Napoleon Hill"},
        {"quote": "Don't count the days, make the days count.", "author": "Muhammad Ali"},
        {"quote": "If opportunity doesn't knock, build a door.", "author": "Milton Berle"},
        {"quote": "Strive not to be a success, but rather to be of value.", "author": "Albert Einstein"},
        {"quote": "The best way to predict the future is to invent it.", "author": "Alan Kay"},
        {"quote": "Hardships often prepare ordinary people for an extraordinary destiny.", "author": "C.S. Lewis"},
        {"quote": "What you get by achieving your goals is not as important as what you become by achieving your goals.", "author": "Zig Ziglar"},
        {"quote": "You miss 100% of the shots you don't take.", "author": "Wayne Gretzky"},
        {"quote": "If you want to lift yourself up, lift up someone else.", "author": "Booker T. Washington"},
        {"quote": "You must do the things you think you cannot do.", "author": "Eleanor Roosevelt"},
        {"quote": "Act as if what you do makes a difference. It does.", "author": "William James"},
        {"quote": "Believe you can and you're halfway there.", "author": "Theodore Roosevelt"},
        {"quote": "Failure is another stepping stone to greatness.", "author": "Oprah Winfrey"},
        {"quote": "A person who never made a mistake never tried anything new.", "author": "Albert Einstein"},
        {"quote": "Courage is resistance to fear, mastery of fear-not absence of fear.", "author": "Mark Twain"},
        {"quote": "To live is the rarest thing in the world. Most people exist, that is all.", "author": "Oscar Wilde"},
        {"quote": "Happiness is not something ready-made. It comes from your own actions.", "author": "Dalai Lama"},
        {"quote": "Your time is limited, so don't waste it living someone else's life.", "author": "Steve Jobs"},
        {"quote": "Dream big and dare to fail.", "author": "Norman Vaughan"},
        {"quote": "The greatest glory in living lies not in never falling, but in rising every time we fall.", "author": "Nelson Mandela"},
        {"quote": "Do what you can, with what you have, where you are.", "author": "Theodore Roosevelt"},
        {"quote": "Everything you've ever wanted is on the other side of fear.", "author": "George Addair"},
        {"quote": "You only live once, but if you do it right, once is enough.", "author": "Mae West"},
        {"quote": "A champion is defined not by their wins but by how they recover when they fall.", "author": "Serena Williams"},
        {"quote": "Success usually comes to those who are too busy to be looking for it.", "author": "Henry David Thoreau"},
        {"quote": "Don't be pushed by your problems. Be led by your dreams.", "author": "Ralph Waldo Emerson"},
        {"quote": "Go confidently in the direction of your dreams. Live the life you have imagined.", "author": "Henry David Thoreau"},
        {"quote": "The best revenge is massive success.", "author": "Frank Sinatra"},
        {"quote": "It does not matter how slowly you go as long as you do not stop.", "author": "Confucius"},
        {"quote": "The way to get started is to quit talking and begin doing.", "author": "Walt Disney"},
        {"quote": "Only those who dare to fail greatly can ever achieve greatly.", "author": "Robert F. Kennedy"},
        {"quote": "Everything you can imagine is real.", "author": "Pablo Picasso"},
        {"quote": "A man is but what he knows.", "author": "Francis Bacon"},
        {"quote": "Knowledge is power.", "author": "Francis Bacon"},
        {"quote": "Leadership is the capacity to translate vision into reality.", "author": "Warren Bennis"},
        {"quote": "Success is how high you bounce when you hit bottom.", "author": "George S. Patton"},
        {"quote": "The mind is everything. What you think you become.", "author": "Buddha"},
        {"quote": "I am not a product of my circumstances. I am a product of my decisions.", "author": "Stephen R. Covey"},
        {"quote": "Learning never exhausts the mind.", "author": "Leonardo da Vinci"},
        {"quote": "But, listen, many times, education leads to the demon of education. And that demon of education leads you to a know-all. And when you get there, then you become an infidel, and deny Christ. So you can't build upon the foundation of education.", "author": "Rev. William Marrion Branham - 64-0604 - To Whom Shall We Go?"},
        {"quote": "Don't fear, stay right there at the Word, watch what God does; just be sure that you're right with God. Stay with that Word, and watch what happens.", "author": "Rev. William Marrion Branham - 61-0211 - Abraham"},
        {"quote": "It's the way out of all troubles. It's the way to peace. It's the way to success. It's the way to Life, itself, is to follow this Star, the Lord Jesus. And now, if you are tied to that Star, the Holy Spirit is the Compass that'll only point to the Star.", "author": "Rev. William Marrion Branham - 63-0304 - A Absolute"},
        {"quote": "We are saved by grace, that through faith, not by works. Works shows that you have been saved. But what saves you is the grace of God. Grace saves you. Grace is what God does for you. Works is what you do for God, to show appreciation of what God did for you. But by grace are you saved!", "author": "Rev. William Marrion Branham - 61-0827 - The Message Of Grace"},
        {"quote": "Now, when God makes His ways, just wonder why He feels when He makes a way for us, for our healing, for our salvation, for our comfort, for our peace, and all these things, and we just walk away and leave them. Must make Him feel terribly bad.", "author": "Rev. William Marrion Branham - 61-0125 - Why?"},
        {"quote": "And faith always admits the Word is right. Amen. If your faith don't punctuate every Word of God's Word, with an amen, there is something wrong with your experience. The Bible said, 'He is the same yesterday, today, and forever. If it don't say amen to that, then there is something wrong. Jesus said, 'The works that I do shall you do also.' If it don't say amen to that, then there is something wrong. If it don't punctuate every Word of God's promise, with an amen, there is something wrong.", "author": "Rev. William Marrion Branham - 64-0305 - Perseverant"},
        {"quote": "The true evidence of being baptized with the Holy Ghost is for the believer to receive the Word for the age in which he lives.", "author": "Rev. William Marrion Branham - An Exposition Of The Seven Church Ages(4-The Smyrnaean Church Age)"},
        {"quote": "Just keep away...You just be a real, sweet, humble, Christian, live the life, and then God will take of the rest of it.", "author": "Rev. William Marrion Branham - 64-0830E - Questions And Answers #4"},
        {"quote": "Greatness is humility. Don't forget that, Church. Greatness is expressed in humility, not how fine you can be.", "author": "Rev. William Marrion Branham - 63-0825M - How Can I Overcome?"},
        {"quote": "Not always prosperity is a sign of a spiritual blessings, but sometimes on the contrary. People think maybe you have to own a lot of worldly goods, and shows that God is a blessing you. That's not true. Sometimes it's the other way.", "author": "Rev. William Marrion Branham - 64-0411 - Spiritual Amnesia"},
        {"quote": "This little, unknown fellow was Amos the prophet. And now we don't know very much about him. We don't know where he come from. Prophets usually come on the scene, unknown, leave the same way. We don't know where they come from, where they go, don't know about their backgrounds. God just raises them up. He wasn't much to look at, but he had THUS SAITH THE LORD. That's the main thing I see.", "author": "Rev. William Marrion Branham - 64-0411 - Spiritual Amnesia"},
        {"quote": "There is no excuse. It's just what's in the heart. That's what shows out. It identifies itself.", "author": "Rev. William Marrion Branham - 64-0411 - Spiritual Amnesia"},
        {"quote": "Determination kills all difficulties.", "author": "Godfred Mensah"},
        {"quote": "We deem everyone that come closer to us as friend, because we don't know the one who becomes happy when we succeed and who becomes happy when we fail. But God knows the genuine and the hypocrite friends.", "author": "Godfred Mensah"},
        {"quote": "Your ability to lift heavy objects doesn't guarantee your victory in a battle.", "author": "Godfred Mensah"},
        {"quote": "Opportunities don't happen, you create them.", "author": "Chris Grosser"},
        {"quote": "Don't watch the clock; do what it does. Keep going.", "author": "Sam Levenson"},
        {"quote": "Diligence is the mother of good luck.", "author": "Benjamin Franklin"},
        {"quote": "Do not pray for easy lives. Pray to be stronger men.", "author": "John F. Kennedy"},
        {"quote": "Great minds discuss ideas; average minds discuss events; small minds discuss people.", "author": "Eleanor Roosevelt"},
        {"quote": "Quality is not an act, it is a habit.", "author": "Aristotle"},
        {"quote": "The purpose of our lives is to be happy.", "author": "Dalai Lama"},
        {"quote": "An investment in knowledge pays the best interest.", "author": "Benjamin Franklin"},
        {"quote": "Start where you are. Use what you have. Do what you can.", "author": "Arthur Ashe"},
        {"quote": "Do not let making a living prevent you from making a life.", "author": "John Wooden"}
      ];

  // ==== STORIES (chaptered, each with two halves) ====
  const STORIES = [
    {
      title: "Cinders of the Clockwork City",
      parts: [
        "The tram sighed through brass-laced fog as Ara pressed a palm to the window. Below, the market ticked like a living watch: awnings fluttered, valves sneezed steam, and coin-bright pigeons hopped along soldered rails. She tasted copper on the air, the city's heartbeat-regular, reliable, relentless-pushing her toward the foundry district where rumors said an unsleeping engine dreamed of rain.",
        "Inside the foundry, heat bent the air into a watery mirage. Ara followed chalk sigils between anvils until gears the size of houses loomed above. The engine's breath thrummed in her ribs. When she slipped the bone key into the service port, it was like waking a giant: the pistons paused, listening. Then, from somewhere deep, a quiet syllable answered-her name-carried on a draft that smelled like wet stone."
      ]
    },
    {
      title: "The River That Remembers",
      parts: [
        "Dawn unfurled along the river like silk, pale and forgiving. Sefu skimmed a hand across the surface and the water replied with a page of ripples, each ring a sentence his grandmother once taught him to read. Migrating storks stitched white commas into the sky. On the opposite bank, the old shrine leaned, cedar bones creaking with stories it refused to forget.",
        "He spoke his request and dropped a reed token; the current took it greedily. The answer rose as a chill along his forearms-permission, and a warning. When he waded knee-deep, the silt shaped itself around his ankles, printing his lineage in cold script. By the time he reached the shrine, the river had memorized him-every doubt, every promise-so that if he failed, it would know how to carry him home."
      ]
    },
    {
      title: "Salt, Star, and Sail",
      parts: [
        "Night smelled of tar and oranges. Captain Liora traced constellations with a callused finger while the deck murmured beneath her boots. The new navigator swore the sky had shifted-stars wandering like stray goats-but the sextant, stubborn as an old friend, insisted on familiar truth. Far off, a lighthouse performed its patient punctuation against the horizon.",
        "At midnight the sea went glass-flat. The crew held its breath as a pale fin cut a sentence across the water. It wasn't a fish but a question, written in phosphor. Liora answered with a turn of the wheel, and the wind obliged, threading itself through the rigging like a silver needle. The ship curved toward an island that had no right to exist, and yet there it was: a comma between two tides."
      ]
    }
  ];

  // ==== STATE WITH FIXED ACCURACY TRACKING ====
  let currentDifficulty = "Beginner";
  let duration = 60;
  let timeLeft = duration;
  let running = false;
  let startTime = null;
  let timerInterval = null;
  let targetText = "";
  let typed = "";
  let currentUser = null;

  let mode = 'passage';
  let currentQuoteIndex = null;
  let currentStoryIndex = 0;
  let currentStoryPart = 0;

  let totalKeysPressed = 0;
  let totalCorrectChars = 0;
  let lastTypedLength = 0;   // Track previous typed length to detect corrections

  // ==== POPULATE DROPDOWNS ====
  function populateQuoteDropdown() {
    quoteSelect.innerHTML = `<option value="__random__">Random quote</option>`;
    QUOTES.forEach((q, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = `${q.quote.slice(0, 50)}${q.quote.length > 50 ? '…' : ''} — ${q.author}`;
      quoteSelect.appendChild(opt);
    });
  }
  populateQuoteDropdown();

  function populateStoryDropdown() {
    storyChapterSelect.innerHTML = '';
    STORIES.forEach((s, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = s.title;
      storyChapterSelect.appendChild(opt);
    });
    storyChapterSelect.value = currentStoryIndex;
    storyPartSelect.value = String(currentStoryPart);
    storyMetaEl.textContent = `${STORIES[currentStoryIndex].title} — Part ${Number(currentStoryPart)+1}`;
  }
  populateStoryDropdown();

  // ==== AUTH TABS ====
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.style.display = 'flex';
    signupForm.style.display = 'none';
    authMessage.textContent = '';
  });
  signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.style.display = 'flex';
    loginForm.style.display = 'none';
    authMessage.textContent = '';
  });

  // ==== LOGIN ====
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authMessage.textContent = 'Logging in...';
    authMessage.className = 'small';
    try {
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-pass').value;
      await auth.signInWithEmailAndPassword(email, pass);
      authMessage.textContent = '';
    } catch (err) {
      authMessage.textContent = err.message;
      authMessage.classList.add('error');
    }
  });

  // ==== SIGNUP ====
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authMessage.textContent = 'Creating account...';
    authMessage.className = 'small';
    try {
      const email = document.getElementById('signup-email').value.trim();
      const pass = document.getElementById('signup-pass').value;
      if (pass.length < 6) {
        authMessage.textContent = 'Password must be at least 6 characters.';
        authMessage.classList.add('error');
        return;
      }
      const cred = await auth.createUserWithEmailAndPassword(email, pass);
      await cred.user.sendEmailVerification();
      authMessage.textContent = 'Account created. Verification email sent.';
      authMessage.classList.add('success');
    } catch (err) {
      authMessage.textContent = err.message;
      authMessage.classList.add('error');
    }
  });

  // ==== FORGOT PASSWORD ====
  forgotBtn.addEventListener('click', async () => {
    authMessage.className = 'small';
    const email = document.getElementById('login-email').value.trim();
    if (!email) {
      authMessage.textContent = 'Enter email to reset password.';
      authMessage.classList.add('error');
      return;
    }
    try {
      await auth.sendPasswordResetEmail(email);
      authMessage.textContent = 'Password reset email sent.';
      authMessage.classList.add('success');
    } catch (err) {
      authMessage.textContent = err.message;
      authMessage.classList.add('error');
    }
  });

  // ==== LOGOUT & VERIFY ====
  logoutBtn.addEventListener('click', () => auth.signOut());
  sendVerifBtn.addEventListener('click', async () => {
    if (currentUser) {
      try {
        await currentUser.sendEmailVerification();
        alert('Verification email resent.');
      } catch (e) {
        console.warn(e);
      }
    }
  });

  // ==== DIFFICULTY / DURATION ====
  diffTabs.forEach(t => {
    t.addEventListener('click', () => {
      if (mode !== 'passage') return;
      diffTabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      currentDifficulty = t.dataset.diff;
      currentDiffBadge.textContent = currentDifficulty;
      loadNewPassage();
      refreshDashboard();
    });
  });

  durationSelect.addEventListener('change', () => {
    duration = parseInt(durationSelect.value, 10);
    if (mode === 'passage') loadNewPassage();
    else if (mode === 'quote') loadNewQuote();
    else loadNewStory();
    refreshDashboard();
  });

  // ==== MODE SWITCHING ====
  modeSelect.addEventListener('change', () => {
    mode = modeSelect.value;

    if (mode === 'quote') {
      quoteControls.style.display = 'block';
      storyControls.style.display = 'none';
      diffTabs.forEach(t => t.style.display = 'none');
      loadNewQuote();
    } else if (mode === 'story') {
      quoteControls.style.display = 'none';
      storyControls.style.display = 'block';
      diffTabs.forEach(t => t.style.display = 'none');
      loadNewStory();
    } else {
      quoteControls.style.display = 'none';
      storyControls.style.display = 'none';
      diffTabs.forEach(t => t.style.display = '');
      loadNewPassage();
    }
  });

  quoteSelect.addEventListener('change', () => {
    if (mode === 'quote') loadNewQuote();
  });

  storyChapterSelect.addEventListener('change', () => {
    currentStoryIndex = parseInt(storyChapterSelect.value, 10) || 0;
    storyMetaEl.textContent = `${STORIES[currentStoryIndex].title} — Part ${Number(currentStoryPart)+1}`;
    if (mode === 'story') loadNewStory();
  });

  storyPartSelect.addEventListener('change', () => {
    currentStoryPart = parseInt(storyPartSelect.value, 10) || 0;
    storyMetaEl.textContent = `${STORIES[currentStoryIndex].title} — Part ${Number(currentStoryPart)+1}`;
    if (mode === 'story') loadNewStory();
  });

  // ==== TYPING EVENT LISTENERS WITH FIXED ACCURACY ====
  typingInput.addEventListener('input', (e) => {
    if (!running) startTimer();
    
    const newTyped = typingInput.value;
    
    if (newTyped.length > targetText.length) {
      typingInput.value = newTyped.slice(0, targetText.length);
      return;
    }
    
    // If user added characters (typed forward)
    if (newTyped.length > lastTypedLength) {
      const addedChars = newTyped.length - lastTypedLength;
      totalKeysPressed += addedChars;
      
      // Count how many of the newly added characters are correct
      for (let i = lastTypedLength; i < newTyped.length; i++) {
        if (i < targetText.length && newTyped[i] === targetText[i]) {
          totalCorrectChars++;
        }
      }
    }
    
    lastTypedLength = newTyped.length;
    typed = newTyped;
    renderPassage();
    
    if (typed.length >= targetText.length) {
      finalizeTest();
    }
  });

  typingInput.addEventListener('keydown', (e) => {
    if (e.key.length > 1 && e.key !== ' ' && e.key !== 'Backspace' && e.key !== 'Delete') return;
    
    const currentPos = typingInput.selectionStart;
    
    if (currentPos >= targetText.length && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
      return;
    }
    
    // Count backspace and delete as keystrokes (corrections)
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (typingInput.value.length > 0) {
        totalKeysPressed++;
      }
    }
  });

  typingInput.addEventListener('paste', e => e.preventDefault());
  retryBtn.addEventListener('click', () => {
    if (mode === 'passage') loadNewPassage();
    else if (mode === 'quote') loadNewQuote();
    else loadNewStory();
  });

  // ==== GENERATORS ====
  function pickPassage() {
    const arr = WORDS[currentDifficulty];
    let text = [];
    while (text.join(' ').length < 160) {
      text = text.concat(shuffleArray(arr));
    }
    return text.slice(0, 80).join(' ');
  }
  function shuffleArray(a) { return [...a].sort(() => Math.random() - 0.5); }

  function pickQuote() {
    if (quoteSelect.value === '__random__') {
      const idx = Math.floor(Math.random() * QUOTES.length);
      currentQuoteIndex = idx;
      return QUOTES[idx];
    }
    const idx = parseInt(quoteSelect.value, 10);
    currentQuoteIndex = isNaN(idx) ? null : idx;
    return QUOTES[currentQuoteIndex];
  }

  function pickStoryText() {
    const chapter = STORIES[currentStoryIndex] || STORIES[0];
    const part = chapter.parts[currentStoryPart] || chapter.parts[0];
    return { title: chapter.title, partIndex: currentStoryPart, text: part };
  }

  // ==== LOADERS ====
  function resetTestState() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = duration;
    running = false;
    startTime = null;
    typed = '';
    typingInput.value = '';
    totalCharsAttempted = 0;
    statTime.textContent = timeLeft + 's';
    statWPM.textContent = '-';
    statAcc.textContent = '-%';
    typingInput.disabled = false;
    renderPassage();
  }

  function loadNewPassage() {
    targetText = pickPassage();
    currentDiffBadge.textContent = currentDifficulty;
    resetTestState();
  }

  function loadNewQuote() {
    const q = pickQuote();
    targetText = q.quote;
    quoteAuthorEl.textContent = `— ${q.author}`;
    currentDiffBadge.textContent = currentDifficulty;
    resetTestState();
  }

  function loadNewStory() {
    const s = pickStoryText();
    targetText = s.text;
    storyMetaEl.textContent = `${s.title} — Part ${s.partIndex + 1}`;
    currentDiffBadge.textContent = currentDifficulty;
    resetTestState();
  }

// ==== PROBLEMATIC CODE - Live accuracy updates ====
function startTimer() {
function startTimer() {
  if (running) return;
  running = true;
  startTime = Date.now();
  timerInterval = setInterval(() => {
    if (!running) {
      clearInterval(timerInterval);
      return;
    }
    
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
      statTime.textContent = timeLeft + 's';
      finalizeTest();
      return;
    }
    if (typed.length >= targetText.length) {
      finalizeTest();
      return;
    }
    statTime.textContent = timeLeft + 's';

  }, 1000);
}}

// ==== FIXED VERSION - No live accuracy ====
function startTimer() {
  if (running) return;
  running = true;
  startTime = Date.now();
  timerInterval = setInterval(() => {
    // Stop updating if test is no longer running
    if (!running) {
      clearInterval(timerInterval);
      return;
    }
    
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
      statTime.textContent = timeLeft + 's';
      finalizeTest();
      return;
    }
    if (typed.length >= targetText.length) {
      finalizeTest();
      return;
    }
    statTime.textContent = timeLeft + 's';
    const elapsed = duration - timeLeft;

    statWPM.textContent = stats.wpm;
   
    // Accuracy will only be shown when test completes in finalizeTest()
  }, 1000);
}
  // ==== FIXED ACCURACY CALCULATION ====
  function computeStats(typedStr, elapsedSec) {
    if (elapsedSec <= 0) return { wpm: 0, accuracy: 100 };
    
    // Calculate current correct characters in the typed string
    const currentCorrectChars = [...typedStr].filter((ch, i) => ch === targetText[i]).length;
    
    // Use a hybrid approach: consider both total keystrokes and current correctness
    // This gives more weight to current accuracy while still penalizing corrections
    const baseAccuracy = totalKeysPressed > 0 ? (totalCorrectChars / totalKeysPressed) * 100 : 100;
    const currentAccuracy = typedStr.length > 0 ? (currentCorrectChars / typedStr.length) * 100 : 100;
    
    // Weighted average: 60% current accuracy, 40% historical accuracy
    // This allows accuracy to recover as users type correctly after corrections
    const accuracy = Math.round((currentAccuracy * 0.6) + (baseAccuracy * 0.4));
    
    const totalCharsTyped = typedStr.length;
    const grossWPM = (totalCharsTyped / 5) / (elapsedSec / 60);
    const wpm = Math.max(0, Math.round(grossWPM));
    
    return { wpm, accuracy: Math.max(0, Math.min(100, accuracy)) };
  }

  function renderPassage() {
    const words = targetText.split(" ");
    const typedWords = typed.trimEnd().split(" ");

    let currentWordIndex = typedWords.length - 1;
    if (typed.endsWith(" ") && currentWordIndex < words.length - 1) {
      currentWordIndex++;
    }

    const style = window.getComputedStyle(passageDisplay);
    const containerWidth = passageDisplay.clientWidth;
    const fontSize = parseInt(style.fontSize, 10);
    const charWidth = fontSize * 0.6;
    const avgWordLength = 6;
    const WORDS_PER_ROW = Math.max(1, Math.floor(containerWidth / (avgWordLength * charWidth)));

    const ROW_SIZE = WORDS_PER_ROW ;
    let pageStartIndex = 0;
    while (pageStartIndex + ROW_SIZE <= currentWordIndex && pageStartIndex + ROW_SIZE < words.length) {
      pageStartIndex += ROW_SIZE;
    }

    const visibleWords = words.slice(pageStartIndex, pageStartIndex + ROW_SIZE * 2);

    let html = "";
    for (let r = 0; r < visibleWords.length; r += WORDS_PER_ROW) {
      const rowWords = visibleWords.slice(r, r + WORDS_PER_ROW);

      const rowHtml = rowWords.map((word, wi) => {
        const absoluteIndex = pageStartIndex + r + wi;
        const typedWord = typedWords[absoluteIndex] || "";
        let chars = "";

        for (let i = 0; i < word.length; i++) {
          const typedChar = typedWord[i];

          if (typedChar === undefined) {
            chars += `<span>${escapeHtml(word[i])}</span>`;
          } else if (typedChar === word[i]) {
            chars += `<span class="correct">${escapeHtml(word[i])}</span>`;
          } else {
            chars += `<span class="incorrect">${escapeHtml(word[i])}</span>`;
          }
        }

        let wordClass = "word";
        if (absoluteIndex === currentWordIndex) {
          wordClass += " active-word";
        }

        return `<span class="${wordClass}">${chars} </span>`;
      }).join("");

      html += `<div class="row">${rowHtml}</div>`;
    }

    passageDisplay.innerHTML = html;
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  async function finalizeTest() {
    if (!running) return;
    running = false;
    clearInterval(timerInterval);
    timerInterval = null;
    typingInput.disabled = true;
    statTime.textContent = timeLeft + 's';
    const elapsed = duration - timeLeft;
    const stats = computeStats(typed, elapsed);
    statWPM.textContent = stats.wpm;
    
    // Show final accuracy only when test is complete
    statAcc.textContent = stats.accuracy + '%';

    if (currentUser) {
      try {
        const payload = {
          uid: currentUser.uid,
          difficulty: currentDifficulty,
          duration,
          wpm: stats.wpm,
          accuracy: stats.accuracy,
          mode,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        if (mode === 'quote') {
          payload.quote = targetText;
          payload.quoteAuthor = QUOTES[currentQuoteIndex]?.author || null;
        } else if (mode === 'story') {
          payload.storyTitle = STORIES[currentStoryIndex]?.title || null;
          payload.storyPart = currentStoryPart + 1;
        }
        await db.collection('results').add(payload);
        await refreshDashboard();
      } catch (e) {
        console.warn('save error', e);
      }
    }
  }

  async function refreshDashboard() {
    if (!currentUser) return;
    
    const bestQuery = db.collection('results')
      .where('uid','==', currentUser.uid)
      .where('difficulty','==', currentDifficulty)
      .where('duration','==', duration)
      .orderBy('wpm','desc')
      .limit(1);
    const bestSnap = await bestQuery.get();
    if (!bestSnap.empty) {
      const b = bestSnap.docs[0].data();
      bestWPMEl.textContent = b.wpm;
      bestAccEl.textContent = b.accuracy + '%';
    } else {
      bestWPMEl.textContent = '0';
      bestAccEl.textContent = '0%';
    }

    const recentSnap = await db.collection('results')
      .where('uid','==', currentUser.uid)
      .orderBy('timestamp','desc')
      .limit(10)
      .get();
    recentTableBody.innerHTML = '';
    recentSnap.forEach(d => {
      const v = d.data();
      const when = v.timestamp?.toDate ? v.timestamp.toDate().toLocaleString() : '—';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${when}</td>
        <td>${v.wpm}</td>
        <td>${v.accuracy}%</td>
        <td>${v.duration}s</td>
        <td>${v.difficulty}</td>
      `;
      recentTableBody.appendChild(row);
    });

    const lbSnap = await db.collection('results')
      .where('difficulty','==', currentDifficulty)
      .where('duration','==', duration)
      .orderBy('wpm','desc')
      .limit(10)
      .get();
    leaderboardBody.innerHTML = '';
    let rank = 1;
    lbSnap.forEach(d => {
      const v = d.data();
      const when = v.timestamp?.toDate ? v.timestamp.toDate().toLocaleDateString() : '';
      const shortUser = v.uid.slice(0, 6);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${rank}</td>
        <td>${shortUser}</td>
        <td>${v.wpm}</td>
        <td>${v.accuracy}%</td>
        <td>${when}</td>
      `;
      leaderboardBody.appendChild(tr);
      rank++;
    });
  }

  auth.onAuthStateChanged(async user => {
    currentUser = user;
    if (user) {
      authCard.style.display = 'none';
      userEmailTag.textContent = user.email;
      emailVerifStatus.innerHTML = user.emailVerified
        ? '<span style="color:#6bf58f;">Verified</span>'
        : '<span style="color:#ffcc33;">Not verified</span>' + (user.emailVerified ? '' : ' <span style="font-size:11px;">(check inbox)</span>');
      if (modeSelect.value === 'quote') loadNewQuote();
      else if (modeSelect.value === 'story') loadNewStory();
      else loadNewPassage();
      await refreshDashboard();
      authSummary.innerHTML = `
        <div class="small">Hi, ${user.email}</div>
        <button class="btn secondary" onclick="firebase.auth().signOut()">Log out</button>
      `;
    } else {
      authCard.style.display = 'block';
      authSummary.innerHTML = '';
      userEmailTag.textContent = 'Not signed in';
      emailVerifStatus.textContent = '';
      passageDisplay.textContent = 'Please log in to start typing and save results.';
      typingInput.disabled = true;
    }
  });

  // ==== INITIALIZE ====
  mode = modeSelect.value || 'passage';
  if (mode === 'quote') loadNewQuote();
  else if (mode === 'story') loadNewStory();
  else loadNewPassage();
});

