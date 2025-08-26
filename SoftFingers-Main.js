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
        {"quote": "Courage is resistance to fear, mastery of fear—not absence of fear.", "author": "Mark Twain"},
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
        {"quote": "And faith always admits the Word is right. Amen. If your faith don't punctuate every Word of God's Word, with an amen, there is something wrong with your experience. The Bible said, 'He is the same yesterday, today, and forever.” If it don't say amen to that, then there is something wrong. Jesus said, 'The works that I do shall you do also.' If it don't say amen to that, then there is something wrong. If it don't punctuate every Word of God's promise, with an amen, there is something wrong.", "author": "Rev. William Marrion Branham - 64-0305 - Perseverant"},
        {"quote": "The true evidence of being baptized with the Holy Ghost is for the believer to receive the Word for the age in which he lives.", "author": "Rev. William Marrion Branham - An Exposition Of The Seven Church Ages(4-The Smyrnaean Church Age)"},
        {"quote": "Just keep away...You just be a real, sweet, humble, Christian, live the life, and then God will take of the rest of it.", "author": "Rev. William Marrion Branham - 64-0830E - Questions And Answers #4"},
        {"quote": "Greatness is humility. Don't forget that, Church. Greatness is expressed in humility, not how fine you can be.", "author": "Rev. William Marrion Branham - 63-0825M - How Can I Overcome?"},

        {"quote": "Not always prosperity is a sign of a spiritual blessings, but sometimes on the contrary. People think maybe you have to own a lot of worldly goods, and shows that God is a blessing you. That's not true. Sometimes it's the other way.", "author": "Rev. William Marrion Branham - 64-0411 - Spiritual Amnesia"},
        {"quote": "This little, unknown fellow was Amos the prophet. And now we don't know very much about him. We don't know where he come from. Prophets usually come on the scene, unknown, leave the same way. We don't know where they come from, where they go, don't know about their backgrounds. God just raises them up. He wasn't much to look at, but he had THUS SAITH THE LORD. That's the main thing I see. ", "author": "Rev. William Marrion Branham - 64-0411 - Spiritual Amnesia"},
        {"quote": "There is no excuse. It's just what's in the heart. That's what shows out. It identifies itself. ", "author": "Rev. William Marrion Branham - 64-0411 - Spiritual Amnesia"},
        {"quote": "And now we find, in this city, it become morally decayed. The preachers was afraid to say anything about it. And, but they had a little, this little old fellow coming up over the hill, was coming to tell them THUS SAITH THE LORD, 'Clean this thing up, or you're going to go into captivity.” And he lived to see the days of his prophecy fulfilled.", "author": "Rev. William Marrion Branham - 64-0411 - Spiritual Amnesia"},
        {"quote": "You see, when people get away from God and won't listen to the Word, have no more desire for the Word, then there is one diagnoses to it, 'The soul that sinneth, that soul shall die.' Unbelief shall separate you from God.” That's exactly right.", "author": "Rev. William Marrion Branham - 64-0411 - Spiritual Amnesia"},
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
  {"quote": "Do not let making a living prevent you from making a life.", "author": "John Wooden"},
  {"quote": "We may encounter many defeats but we must not be defeated.", "author": "Maya Angelou"},
  {"quote": "The harder I work, the luckier I get.", "author": "Samuel Goldwyn"},
  {"quote": "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", "author": "Aristotle"},
  {"quote": "Dreams don't work unless you do.", "author": "John C. Maxwell"},
  {"quote": "Limit your 'always' and your 'nevers'.", "author": "Amy Poehler"},
  {"quote": "Perseverance is not a long race; it is many short races one after another.", "author": "Walter Elliot"},
  {"quote": "A room without books is like a body without a soul.", "author": "Marcus Tullius Cicero"},
  {"quote": "Turn your wounds into wisdom.", "author": "Oprah Winfrey"},
  {"quote": "Keep your face always toward the sunshine—and shadows will fall behind you.", "author": "Walt Whitman"},
  {"quote": "Nothing will work unless you do.", "author": "Maya Angelou"},
  {"quote": "Action is the foundational key to all success.", "author": "Pablo Picasso"},
  {"quote": "Don't count the people you reach; reach the people who count.", "author": "David Ogilvy"},
  {"quote": "Do not wait to strike till the iron is hot, but make it hot by striking.", "author": "William Butler Yeats"},
  {"quote": "Setting goals is the first step in turning the invisible into the visible.", "author": "Tony Robbins"},
  {"quote": "You are never too old to set another goal or to dream a new dream.", "author": "C.S. Lewis"},
  {"quote": "Don't let yesterday take up too much of today.", "author": "Will Rogers"},
  {"quote": "The best dreams happen when you're awake.", "author": "Cherie Gilderbloom"},
  {"quote": "Success is not in what you have, but who you are.", "author": "Bo Bennett"},
  {"quote": "Efforts and courage are not enough without purpose and direction.", "author": "John F. Kennedy"},
  {"quote": "Opportunities multiply as they are seized.", "author": "Sun Tzu"},
  {"quote": "Knowledge speaks, but wisdom listens.", "author": "Jimi Hendrix"},
  {"quote": "The only way to achieve the impossible is to believe it is possible.", "author": "Charles Kingsleigh"},
  {"quote": "Push yourself, because no one else is going to do it for you.", "author": "Unknown"},
  {"quote": "Discipline is the bridge between goals and accomplishment.", "author": "Jim Rohn"},
  {"quote": "You can waste your lives drawing lines. Or you can live your life crossing them.", "author": "Shonda Rhimes"},
  {"quote": "Energy and persistence conquer all things.", "author": "Benjamin Franklin"},
  {"quote": "Doubt kills more dreams than failure ever will.", "author": "Suzy Kassem"},
  {"quote": "The secret of getting ahead is getting started.", "author": "Mark Twain"},
  {"quote": "Fall seven times and stand up eight.", "author": "Japanese Proverb"},
  {"quote": "Failure is simply the opportunity to begin again, this time more intelligently.", "author": "Henry Ford"},
  {"quote": "It's not whether you get knocked down, it's whether you get up.", "author": "Vince Lombardi"},
  {"quote": "Hard work beats talent when talent doesn't work hard.", "author": "Tim Notke"},
  {"quote": "The expert in anything was once a beginner.", "author": "Helen Hayes"},
  {"quote": "Don't wish it were easier. Wish you were better.", "author": "Jim Rohn"},
  {"quote": "If you're going through hell, keep going.", "author": "Winston Churchill"},
  {"quote": "Small deeds done are better than great deeds planned.", "author": "Peter Marshall"},
  {"quote": "Don't let the fear of losing be greater than the excitement of winning.", "author": "Robert Kiyosaki"},
  {"quote": "Great things are done by a series of small things brought together.", "author": "Vincent Van Gogh"},
  {"quote": "If you fell down yesterday, stand up today.", "author": "H.G. Wells"},
  {"quote": "Act without expectation.", "author": "Lao Tzu"},
  {"quote": "You don't have to be great to start, but you have to start to be great.", "author": "Zig Ziglar"},
  {"quote": "Success is walking from failure to failure with no loss of enthusiasm.", "author": "Winston Churchill"},
  {"quote": "Courage is resistance to fear, mastery of fear, not absence of fear.", "author": "Mark Twain"},
  {"quote": "Don't let the fear of striking out hold you back.", "author": "Babe Ruth"},
  {"quote": "I never dreamed about success, I worked for it.", "author": "Estee Lauder"},
  {"quote": "The key to success is to start before you are ready.", "author": "Marie Forleo"},
  {"quote": "The best way to predict your future is to create it.", "author": "Peter Drucker"},
  {"quote": "Success is the sum of small efforts repeated day in and day out.", "author": "Robert Collier"},
  {"quote": "Difficulties in life don't come to destroy you but to help you realize your hidden potential.", "author": "A.P.J. Abdul Kalam"},
  {"quote": "Don't downgrade your dream just to fit your reality. Upgrade your conviction to match your destiny.", "author": "Stella Payton"},
  {"quote": "A champion is defined not by their wins but by how they can recover when they fall.", "author": "Serena Williams"},
  {"quote": "Keep your eyes on the stars and your feet on the ground.", "author": "Theodore Roosevelt"},
  {"quote": "When you feel like quitting, remember why you started.", "author": "Unknown"},
  {"quote": "Believe you can and you're halfway there.", "author": "Theodore Roosevelt"},
  {"quote": "Do something today that your future self will thank you for.", "author": "Unknown"},
  {"quote": "It always seems impossible until it's done.", "author": "Nelson Mandela"},
  {"quote": "Dreams are the touchstones of our character.", "author": "Henry David Thoreau"},
  {"quote": "Act boldly and unseen forces will come to your aid.", "author": "Dorothea Brande"},
  {"quote": "Life is 10% what happens to us and 90% how we react to it.", "author": "Charles R. Swindoll"},
  {"quote": "Don't wait for opportunity. Create it.", "author": "George Bernard Shaw"},
  {"quote": "Hustle in silence and let your success make the noise.", "author": "Unknown"},
  {"quote": "What consumes your mind controls your life.", "author": "Unknown"},
  {"quote": "Consistency is what transforms average into excellence.", "author": "Unknown"},
  {"quote": "When you focus on problems, you'll have more problems. When you focus on possibilities, you'll have more opportunities.", "author": "Unknown"},
  {"quote": "Winners are not afraid of losing. But losers are.", "author": "Robert Kiyosaki"},
  {"quote": "Do not wait to strike until the iron is hot; but make it hot by striking.", "author": "William Butler Yeats"},
  {"quote": "The way to succeed is to double your failure rate.", "author": "Thomas J. Watson"},
  {"quote": "Arise, awake, and stop not until the goal is reached.", "author": "Swami Vivekananda"},
  {"quote": "All progress takes place outside the comfort zone.", "author": "Michael John Bobak"},
  {"quote": "The secret of change is to focus all your energy not on fighting the old, but on building the new.", "author": "Socrates"},
  {"quote": "Strength grows in the moments when you think you can't go on but you keep going anyway.", "author": "Unknown"},
  {"quote": "Don't count the days, make the days count.", "author": "Muhammad Ali"},
  {"quote": "One day or day one. You decide.", "author": "Unknown"},
  {"quote": "Wake up with determination. Go to bed with satisfaction.", "author": "Unknown"},
  {"quote": "Do it with passion or not at all.", "author": "Unknown"},
  {"quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.", "author": "Winston Churchill"},
  {"quote": "Make each day your masterpiece.", "author": "John Wooden"},
  {"quote": "If you cannot do great things, do small things in a great way.", "author": "Napoleon Hill"},
  {"quote": "Your passion is waiting for your courage to catch up.", "author": "Isabelle Lafleche"},
  {"quote": "Don't be afraid to stand for what you believe in, even if that means standing alone.", "author": "Andy Biersack"},
  {"quote": "I can and I will. Watch me.", "author": "Unknown"},
  {"quote": "Done is better than perfect.", "author": "Sheryl Sandberg"},
  {"quote": "Little by little, a little becomes a lot.", "author": "Tanzanian Proverb"},
  {"quote": "Stay hungry. Stay foolish.", "author": "Steve Jobs"},
  {"quote": "Don't wait for the right opportunity: create it.", "author": "George Bernard Shaw"},
  {"quote": "The secret of your future is hidden in your daily routine.", "author": "Mike Murdock"},
  {"quote": "If you want something you've never had, you must be willing to do something you've never done.", "author": "Thomas Jefferson"},
  {"quote": "Don't tell people your plans. Show them your results.", "author": "Unknown"},
  {"quote": "A goal without a plan is just a wish.", "author": "Antoine de Saint-Exupéry"},
  {"quote": "Do not wait to strike till the iron is hot, but make it hot by striking.", "author": "William Butler Yeats"},
  {"quote": "Great minds discuss ideas; average minds discuss events; small minds discuss people.", "author": "Eleanor Roosevelt"},
  {"quote": "An unexamined life is not worth living.", "author": "Socrates"},
  {"quote": "Opportunities don't happen, you create them.", "author": "Chris Grosser"},
  {"quote": "Turn your wounds into wisdom.", "author": "Oprah Winfrey"},
  {"quote": "He who has a why to live can bear almost any how.", "author": "Friedrich Nietzsche"},
  {"quote": "Do not pray for an easy life, pray for the strength to endure a difficult one.", "author": "Bruce Lee"},
  {"quote": "Don't let the fear of losing be greater than the excitement of winning.", "author": "Robert Kiyosaki"},
  {"quote": "Everything has beauty, but not everyone can see.", "author": "Confucius"},
  {"quote": "A journey is best measured in friends, not in miles.", "author": "Tim Cahill"},
  {"quote": "The man who moves a mountain begins by carrying away small stones.", "author": "Confucius"},
  {"quote": "Doubt kills more dreams than failure ever will.", "author": "Suzy Kassem"},
  {"quote": "Act as though it is impossible to fail.", "author": "Dorothea Brande"},
  {"quote": "If you're going through hell, keep going.", "author": "Winston Churchill"},
  {"quote": "Limit your 'always' and your 'nevers'.", "author": "Amy Poehler"},
  {"quote": "Do something today that your future self will thank you for.", "author": "Unknown"},
  {"quote": "Discipline is the bridge between goals and accomplishment.", "author": "Jim Rohn"},
  {"quote": "Perfection is not attainable, but if we chase perfection we can catch excellence.", "author": "Vince Lombardi"},
  {"quote": "The secret of getting ahead is getting started.", "author": "Mark Twain"},
  {"quote": "Hustle beats talent when talent doesn't hustle.", "author": "Ross Simmonds"},
  {"quote": "The harder I work, the luckier I get.", "author": "Samuel Goldwyn"},
  {"quote": "Opportunities multiply as they are seized.", "author": "Sun Tzu"},
  {"quote": "The best dreams happen when you're awake.", "author": "Cherie Gilderbloom"},
  {"quote": "Don't let what you cannot do interfere with what you can do.", "author": "John Wooden"},
  {"quote": "In the end, we only regret the chances we didn't take.", "author": "Lewis Carroll"},
  {"quote": "Don't wait. The time will never be just right.", "author": "Napoleon Hill"},
  {"quote": "Light tomorrow with today.", "author": "Elizabeth Barrett Browning"},
  {"quote": "Keep your face always toward the sunshine—and shadows will fall behind you.", "author": "Walt Whitman"},
  {"quote": "You are never too old to set another goal or to dream a new dream.", "author": "C.S. Lewis"},
  {"quote": "Don't cry because it's over, smile because it happened.", "author": "Dr. Seuss"},
  {"quote": "Push yourself, because no one else is going to do it for you.", "author": "Unknown"},
  {"quote": "Hard times don't create heroes. It is during the hard times when the 'hero' within us is revealed.", "author": "Bob Riley"},
  {"quote": "Quality is not an act, it is a habit.", "author": "Aristotle"},
  {"quote": "The best way out is always through.", "author": "Robert Frost"},
  {"quote": "Keep going. Be all in.", "author": "Bryan Hutchinson"},
  {"quote": "Fall seven times and stand up eight.", "author": "Japanese Proverb"},
  {"quote": "Dreams don't work unless you do.", "author": "John C. Maxwell"},
  {"quote": "With the new day comes new strength and new thoughts.", "author": "Eleanor Roosevelt"},
  {"quote": "I can, therefore I am.", "author": "Simone Weil"},
  {"quote": "What defines us is how well we rise after falling.", "author": "Lionel Block"},
  {"quote": "Do not let what you cannot do interfere with what you can do.", "author": "John Wooden"},
  {"quote": "Little by little, one travels far.", "author": "J.R.R. Tolkien"},
  {"quote": "Happiness depends upon ourselves.", "author": "Aristotle"},
  {"quote": "Action is the foundational key to all success.", "author": "Pablo Picasso"},
  {"quote": "If you want something you've never had, you must be willing to do something you've never done.", "author": "Thomas Jefferson"},
  {"quote": "The sun himself is weak when he first rises, and gathers strength and courage as the day gets on.", "author": "Charles Dickens"},
  {"quote": "Energy and persistence conquer all things.", "author": "Benjamin Franklin"},
  {"quote": "Keep your eyes on the stars, and your feet on the ground.", "author": "Theodore Roosevelt"},
  {"quote": "Happiness is not by chance, but by choice.", "author": "Jim Rohn"}


      ];


  // ==== STORIES (chaptered, each with two halves) ====
  // Keep concise but rich, sized for typing; add more chapters as you like.
  const STORIES = [
    {
      title: "Cinders of the Clockwork City",
      parts: [
        "The tram sighed through brass-laced fog as Ara pressed a palm to the window. Below, the market ticked like a living watch: awnings fluttered, valves sneezed steam, and coin-bright pigeons hopped along soldered rails. She tasted copper on the air, the city's heartbeat—regular, reliable, relentless—pushing her toward the foundry district where rumors said an unsleeping engine dreamed of rain.",
        "Inside the foundry, heat bent the air into a watery mirage. Ara followed chalk sigils between anvils until gears the size of houses loomed above. The engine's breath thrummed in her ribs. When she slipped the bone key into the service port, it was like waking a giant: the pistons paused, listening. Then, from somewhere deep, a quiet syllable answered—her name—carried on a draft that smelled like wet stone."
      ]
    },
    {
      title: "The River That Remembers",
      parts: [
        "Dawn unfurled along the river like silk, pale and forgiving. Sefu skimmed a hand across the surface and the water replied with a page of ripples, each ring a sentence his grandmother once taught him to read. Migrating storks stitched white commas into the sky. On the opposite bank, the old shrine leaned, cedar bones creaking with stories it refused to forget.",
        "He spoke his request and dropped a reed token; the current took it greedily. The answer rose as a chill along his forearms—permission, and a warning. When he waded knee-deep, the silt shaped itself around his ankles, printing his lineage in cold script. By the time he reached the shrine, the river had memorized him—every doubt, every promise—so that if he failed, it would know how to carry him home."
      ]
    },
    {
      title: "Salt, Star, and Sail",
      parts: [
        "Night smelled of tar and oranges. Captain Liora traced constellations with a callused finger while the deck murmured beneath her boots. The new navigator swore the sky had shifted—stars wandering like stray goats—but the sextant, stubborn as an old friend, insisted on familiar truth. Far off, a lighthouse performed its patient punctuation against the horizon.",
        "At midnight the sea went glass-flat. The crew held its breath as a pale fin cut a sentence across the water. It wasn't a fish but a question, written in phosphor. Liora answered with a turn of the wheel, and the wind obliged, threading itself through the rigging like a silver needle. The ship curved toward an island that had no right to exist, and yet there it was: a comma between two tides."
      ]
    },
    {
      title: "The Whispering Keys - Chapter 1: The Key That Sang",
     parts: ["Rain fell in soft needles against the slate rooftops of Graywick, a town that seemed forever caught between dusk and dawn. Its crooked alleys twised like forgotten thoughts, and its lanterns burned low, giving the streets a quiet, watchful glow.Elias Thorn, a boy of sixteen with restless fingers and a heart that beat too quickly for such a slow town, moved through the drizzle with his collar up and his mind elsewhere. He had always been told he was a dreamer, too distracted, too curious. But curiosity, as his late mother used to whisper, was a gift when the world itself kept secrets.And tonight, the world was whispering.He had first noticed it in the marketplace when the crowd had thinned and the vendors were packing away their goods. A faint, trembling sound, like a note of music caught inside a shell, drifted through the rain. Elias followed it, winding between barrels and abandoned carts, until the melody seemed to pulse from beneath a loose cobblestone near the fountain square.With trembling hands, Elias pried the stone loose. Beneath, tucked into a hollow as though the street itself had been keeping it safe, lay a key.It was unlike any key he had ever seen—long and slender, forged of pale metal that shimmered faintly in the gloom. Strange markings curled along its shaft, symbols that seemed almost to rearrange themselves if he looked too long. And the sound—oh, the sound. The key sang softly, a single note that quivered like a voice at the edge of speech.Elias lifted it carefully, the chill of the metal running through his palm. The note swelled, filling his chest until he thought his ribs might crack with the weight of it. He staggered back, clutching the key to his chest, breath coming fast. “Beautiful, isn't it?” The voice came from behind him. Elias turned sharply. An old woman stood under the arch of the fountain, cloaked in rain-dark velvet. Her eyes gleamed like drops of mercury.“You hear it too?” Elias asked, his voice hoarse. The woman's smile was thin, secretive. “Only those the Key chooses will hear its song. Most would see nothing but rust and stone.” Elias swallowed. “What… what does it open?” Her gaze lingered on him, weighing, as though she were deciding whether he was worthy of the answer. At last, she spoke: “Not a door, boy. A destiny.” The rain seemed to hush at her words, and the key's note quivered in his palm, more alive than any object had a right to be.",
    "The old woman stepped closer, her boots silent on the wet cobblestones. She extended a hand, gnarled and veined, toward the key. Elias felt a strange pull, as if the metal itself was alive and wanted to leap from his grasp. “Keep it,” she said, her voice almost a whisper carried on the rain. “But beware—keys like this are not meant for the faint-hearted.” Elias hesitated. His fingers itched to touch the strange symbols again, to hear that quivering note once more. He had always believed in stories—tales of hidden doors and secret worlds—but never in anything that could hum beneath his palm, singing to him in a language older than the town itself. “Why me?” he asked. “Why now?” The woman's eyes glinted. “Because you listen. Because you follow.” She turned then, stepping away, her cloak billowing like smoke behind her. “Go home, Elias Thorn, and let the Key choose its moment. The rest will come.” Before he could respond, she melted into the mist that clung to the square, leaving only the key and the faint echo of her words. Elias stared after her, chest tight, mind spinning. Rain had slowed to a drizzle, and the lanterns glimmered faintly, reflecting on the puddles like tiny, trembling stars. Elias clenched the key, feeling its pulse under his skin. A note, longer this time, threaded itself into his mind, almost a tune. He didn't know the melody, but it felt urgent, beckoning him toward… somewhere. Home was dull and silent, a narrow room he shared with the flickering shadows of his father's absence. He set the key on his windowsill, and for a moment, it hummed, sending a shiver down his spine. Papers on his desk rattled lightly, as though the song of the key reached into the corners of the room. Elias lay awake that night, the sound of the key thrumming through his dreams. And in those dreams, doors opened that did not exist, corridors stretched into impossibility, and shadows whispered secrets he could almost—but not quite—understand. By dawn, he knew one thing for certain: life in Graywick would never feel ordinary again. The key had chosen him, and whatever lay beyond the doors it opened, he would have to find it. Somewhere, in the spaces between mist and memory, the key sang. And Elias Thorn, boy of restless fingers and endless curiosity, was listening."
     ]
    }
  ];

  // ==== STATE ====
  let currentDifficulty = "Beginner";
  let duration = 60;
  let timeLeft = duration;
  let running = false;
  let startTime = null;
  let timerInterval = null;
  let targetText = "";
  let typed = "";
  let currentUser = null;

  let mode = 'passage';      // 'passage' | 'quote' | 'story'
  let currentQuoteIndex = null;
  let currentStoryIndex = 0; // chapter
  let currentStoryPart = 0;  // 0 or 1

  // ==== Enhance mode-select with Story option if missing ====
  if (![...modeSelect.options].some(o => o.value === 'story')) {
    const opt = document.createElement('option');
    opt.value = 'story';
    opt.textContent = 'Story';
    modeSelect.appendChild(opt);
  }

  // ==== Populate quote dropdown ====
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

  // ==== Populate story chapter dropdown ====
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
  function setDiffTabsEnabled(enabled) {
    diffTabs.forEach(t => {
      t.style.pointerEvents = enabled ? '' : 'none';
      t.style.opacity = enabled ? '1' : '0.5';
    });
  }

  diffTabs.forEach(t => {
    t.addEventListener('click', () => {
      if (mode !== 'passage') return; // only applicable for passages
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
    // Reload current mode's text to reset timer
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
    diffTabs.forEach(t => t.style.display = 'none'); // hide difficulty tabs
    loadNewQuote();
  } else if (mode === 'story') {
    quoteControls.style.display = 'none';
    storyControls.style.display = 'block';
    diffTabs.forEach(t => t.style.display = 'none'); // hide difficulty tabs
    loadNewStory();
  } else {
    quoteControls.style.display = 'none';
    storyControls.style.display = 'none';
    diffTabs.forEach(t => t.style.display = ''); // show difficulty tabs
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

  // ==== TYPING ====
  typingInput.addEventListener('input', () => {
    if (!running) startTimer();
    typed = typingInput.value;
    renderPassage();
    if (typed.length >= targetText.length) finalizeTest();
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
    timeLeft = duration;
    running = false;
    startTime = null;
    typed = '';
    typingInput.value = '';
    statTime.textContent = timeLeft + 's';
    statWPM.textContent = 0;
    statAcc.textContent = '100%';
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

  function startTimer() {
    if (running) return;
    running = true;
    startTime = Date.now();
    timerInterval = setInterval(() => {
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
      const stats = computeStats(typed, elapsed);
      statWPM.textContent = stats.wpm;
      statAcc.textContent = stats.accuracy + '%';
    }, 1000);
  }

  function computeStats(typedStr, elapsedSec) {
    const target = targetText;
    const correctChars = [...typedStr].filter((ch, i) => ch === target[i]).length;
    const accuracy = typedStr.length ? Math.round((correctChars / typedStr.length) * 100) : 100;
    const wordsTyped = typedStr.trim().split(/\s+/).filter(Boolean).length;
    const wpm = elapsedSec > 0 ? Math.round((wordsTyped / (elapsedSec / 60))) : 0;
    return { wpm, accuracy };
  }

  function renderPassage() {
    const target = targetText;
    const position = typed.length;
    const html = [...target].map((ch, i) => {
      const typedChar = typed[i];
      let classes = [];
      if (i === position) classes.push('current');
      if (typedChar === undefined) {
        return `<span${classes.length ? ` class="${classes.join(' ')}"` : ''}>${escapeHtml(ch)}</span>`;
      }
      if (typedChar === ch) classes.push('correct');
      else classes.push('incorrect');
      return `<span class="${classes.join(' ')}">${escapeHtml(ch)}</span>`;
    }).join('');
    passageDisplay.innerHTML = html;

    // Auto-scroll current char into view
    const currentChar = passageDisplay.querySelector('.current');
    if (currentChar) {
      currentChar.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ==== FINALIZE & SAVE ====
  async function finalizeTest() {
    if (!running) return;
    running = false;
    clearInterval(timerInterval);
    typingInput.disabled = true;
    statTime.textContent = timeLeft + 's';
    const elapsed = duration - timeLeft;
    const stats = computeStats(typed, elapsed);
    statWPM.textContent = stats.wpm;
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

  // ==== DASHBOARD ====
  async function refreshDashboard() {
    if (!currentUser) return;
    // Best for current diff+duration (passage focus, but we keep as-is for uniformity)
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

    // Recent runs
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

    // Leaderboard top 10 (by current diff+duration)
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

  // ==== AUTH OBSERVER ====
  auth.onAuthStateChanged(async user => {
    currentUser = user;
    if (user) {
      authCard.style.display = 'none';
      userEmailTag.textContent = user.email;
      emailVerifStatus.innerHTML = user.emailVerified
        ? '<span style="color:#6bf58f;">Verified</span>'
        : '<span style="color:#ffcc33;">Not verified</span>' + (user.emailVerified ? '' : ' <span style="font-size:11px;">(check inbox)</span>');
      // start in whatever mode is selected
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
  // Respect current dropdown on load; default to passage if empty
  mode = modeSelect.value || 'passage';
  if (mode === 'quote') loadNewQuote();
  else if (mode === 'story') loadNewStory();
  else loadNewPassage();
});
