// ==== INTERMEDIATE LESSONS DATA ====
// This file contains all intermediate level typing lessons
// Import this after the main lessons system is loaded

const INTERMEDIATE_LESSONS = {
  intermediate: {
    name: "Intermediate Lessons",
    description: "Build speed, accuracy, and master advanced patterns",
    icon: "🌿",
    lessons: [
      // Capital Letters Practice - Progressive Introduction
      {
        id: "i1",
        number: 1,
        title: "Capitals Introduction - Home Row",
        description: "Learn to type capital letters on home row",
        type: "tutorial",
        keys: ["A", "S", "D", "F", "J", "K", "L"],
        text: "Aa Ss Dd Ff Jj Kk Ll ASDF JKL; AsDf JkL;",
        instructions: "Hold the Shift key with your pinky while pressing letter keys. Use left Shift for right-hand letters and right Shift for left-hand letters. Practice smooth transitions between lowercase and uppercase.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i2",
        number: 2,
        title: "Mixed Case - Home Row Left",
        description: "Practice alternating cases on left hand",
        type: "exercise",
        keys: ["a", "s", "d", "f", "A", "S", "D", "F"],
        targetWPM: 25,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Add", "Sad", "Dad", "Fad", "Ads", "Ass", "All", "Fall", "Sass", "Pass", "Fast", "Last", "ask", "Ask", "lass", "Lass"]
      },
      {
        id: "i3",
        number: 3,
        title: "Mixed Case - Home Row Right",
        description: "Practice alternating cases on right hand",
        type: "exercise",
        keys: ["j", "k", "l", ";", "J", "K", "L"],
        targetWPM: 25,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Jal", "Jak", "jal", "Lak", "lak", "kjl", "Kjl", "jkl", "Jkl", "JKL"]
      },
      {
        id: "i4",
        number: 4,
        title: "Mixed Case - Home Row Combined",
        description: "Combine both hands with mixed cases",
        type: "exercise",
        keys: ["a", "s", "d", "f", "j", "k", "l", "A", "S", "D", "F", "J", "K", "L"],
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Ask", "Sad", "Fall", "Lass", "Jak", "Flask", "Salad", "Alaska", "All", "Lass", "Falls", "Asks", "Dads", "Lads", "Fads", "Glass"]
      },
      {
        id: "i5",
        number: 5,
        title: "Proper Names - Home Row",
        description: "Type names using home row keys",
        type: "exercise",
        keys: ["a", "s", "d", "f", "j", "k", "l", "A", "S", "D", "F", "J", "K", "L"],
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Sal", "Al", "Dallas", "Alaska", "Alfas", "Salad", "Alf", "Ada", "Jada", "Falak"]
      },
      
      // Upper Row Capitals
      {
        id: "i6",
        number: 6,
        title: "Capitals Introduction - Upper Row",
        description: "Learn capital letters on upper row",
        type: "tutorial",
        keys: ["Q", "W", "E", "R", "U", "I", "O", "P"],
        text: "Qq Ww Ee Rr Uu Ii Oo Pp QWER UIOP QwEr UiOp",
        instructions: "Practice reaching for upper row keys while using Shift. Remember to return to home position after each capital letter.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i7",
        number: 7,
        title: "Mixed Case - Upper Row Left",
        description: "Practice upper row capitals - left hand",
        type: "exercise",
        keys: ["q", "w", "e", "r", "Q", "W", "E", "R"],
        targetWPM: 25,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Qwer", "Were", "Wear", "Rear", "Rare", "War", "Wer", "Que", "Quest", "Queen", "quer", "Query", "Rew", "ewer", "Ewes"]
      },
      {
        id: "i8",
        number: 8,
        title: "Mixed Case - Upper Row Right",
        description: "Practice upper row capitals - right hand",
        type: "exercise",
        keys: ["u", "i", "o", "p", "U", "I", "O", "P"],
        targetWPM: 25,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Upon", "Oup", "Poi", "Opus", "Pour", "oup", "Pious", "oui", "Oui", "Pi", "Uiop"]
      },
      {
        id: "i9",
        number: 9,
        title: "Mixed Case - Upper Row Combined",
        description: "All upper row capitals together",
        type: "exercise",
        keys: ["q", "w", "e", "r", "u", "i", "o", "p", "Q", "W", "E", "R", "U", "I", "O", "P"],
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Power", "Require", "Prepare", "Oper", "Pure", "Wire", "Pour", "Pier", "Weir", "Pore", "Rope", "Wore", "Ripe", "Wipe", "Roper"]
      },
      {
        id: "i10",
        number: 10,
        title: "Proper Names - Upper Row",
        description: "Type names with upper row keys",
        type: "exercise",
        keys: ["q", "w", "e", "r", "u", "i", "o", "p", "a", "s", "d", "f", "j", "k", "l", "Q", "W", "E", "R", "U", "I", "O", "P"],
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Queen", "Paris", "Europe", "Russia", "Peru", "Roper", "Paula", "Peter", "Ross", "Rose", "Iris", "Paulo"]
      },
      
      // Bottom Row Capitals
      {
        id: "i11",
        number: 11,
        title: "Capitals Introduction - Bottom Row",
        description: "Learn capital letters on bottom row",
        type: "tutorial",
        keys: ["Z", "X", "C", "V", "M"],
        text: "Zz Xx Cc Vv Mm ZXCV Mm ZxCv",
        instructions: "Practice bottom row capitals. These require good pinky control for the Shift key while reaching down with your other fingers.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i12",
        number: 12,
        title: "Mixed Case - Bottom Row Left",
        description: "Practice bottom row capitals - left hand",
        type: "exercise",
        keys: ["z", "x", "c", "v", "Z", "X", "C", "V"],
        targetWPM: 25,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Zax", "Zac", "Czar", "Cave", "Vex", "Vox", "Zev", "Vic", "Cox", "Cove", "Czar", "Xcv"]
      },
      {
        id: "i13",
        number: 13,
        title: "Mixed Case - Bottom Row Right",
        description: "Practice bottom row capitals - right hand",
        type: "exercise",
        keys: ["m", "M"],
        targetWPM: 25,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Mom", "Mam", "Mime", "Maim", "Mum", "Mama", "Memo"]
      },
      {
        id: "i14",
        number: 14,
        title: "Mixed Case - Bottom Row Combined",
        description: "All bottom row capitals together",
        type: "exercise",
        keys: ["z", "x", "c", "v", "m", "Z", "X", "C", "V", "M"],
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Zoom", "Maze", "Move", "Calm", "Came", "Claim", "Zinc", "Vomex", "Czar", "Exam", "Civic", "Wax", "Max", "Vex", "Zac"]
      },
      {
        id: "i15",
        number: 15,
        title: "Proper Names - Bottom Row",
        description: "Type names with bottom row keys",
        type: "exercise",
        keys: ["z", "x", "c", "v", "m", "a", "s", "d", "f", "j", "k", "l", "Z", "X", "C", "V", "M"],
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Max", "Zac", "Vic", "Mack", "Zane", "Maven", "Vasco", "Mexico", "Zola", "Velma"]
      },
      
      // Full Alphabet Mixed Case
      {
        id: "i16",
        number: 16,
        title: "All Rows - Mixed Case Practice",
        description: "Combine all rows with capitals",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["The", "And", "For", "Are", "But", "Not", "You", "All", "Can", "Her", "Was", "One", "Our", "Out", "Day", "Get", "Has", "Him"]
      },
      {
        id: "i17",
        number: 17,
        title: "Common Words with Capitals",
        description: "Practice frequently capitalized words",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "January", "February", "March", "April", "May", "June"]
      },
      {
        id: "i18",
        number: 18,
        title: "Proper Sentences - Part 1",
        description: "Type complete sentences with capitals",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true
      },
      {
        id: "i19",
        number: 19,
        title: "Proper Sentences - Part 2",
        description: "More sentence practice",
        type: "exercise",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true
      },
      {
        id: "i20",
        number: 20,
        title: "Proper Sentences - Part 3",
        description: "Advanced sentence practice",
        type: "exercise",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true
      },
      
      // Common Punctuation
      {
        id: "i21",
        number: 21,
        title: "Punctuation Tutorial - Period & Comma",
        description: "Learn basic punctuation marks",
        type: "tutorial",
        keys: [".", ","],
        text: "word, word, word. word. word, word. end, start. yes, no.",
        instructions: "The comma (,) and period (.) are typed with your right middle and ring fingers respectively. Use them to end sentences and separate items in lists.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i22",
        number: 22,
        title: "Sentences with Commas",
        description: "Practice sentences with commas",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "commas"
      },
      {
        id: "i23",
        number: 23,
        title: "Lists and Commas",
        description: "Type lists separated by commas",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["red, blue, green", "one, two, three", "cat, dog, bird", "pen, paper, book", "sun, moon, stars"]
      },
      {
        id: "i24",
        number: 24,
        title: "Question Marks Tutorial",
        description: "Learn to type question marks",
        type: "tutorial",
        keys: ["?"],
        text: "What? Why? How? Where? When? Who? Is it? Can you?",
        instructions: "The question mark (?) is typed by holding Shift and pressing the forward slash key (/). Use your right pinky for both keys.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i25",
        number: 25,
        title: "Questions Practice",
        description: "Type questions with question marks",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "questions"
      },
      {
        id: "i26",
        number: 26,
        title: "Exclamation Points Tutorial",
        description: "Learn exclamation points",
        type: "tutorial",
        keys: ["!"],
        text: "Stop! Go! Yes! Wow! Great! Amazing! Help!",
        instructions: "The exclamation point (!) is Shift + 1. Reach up with your left pinky while holding Shift with your right pinky.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i27",
        number: 27,
        title: "Exclamations Practice",
        description: "Practice exclamatory sentences",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "exclamations"
      },
      {
        id: "i28",
        number: 28,
        title: "Mixed Punctuation",
        description: "Combine all punctuation marks",
        type: "exercise",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "mixed"
      },
      {
        id: "i29",
        number: 29,
        title: "Apostrophes Tutorial",
        description: "Learn to type apostrophes",
        type: "tutorial",
        keys: ["'"],
        text: "don't won't can't I'm it's we're they're you're",
        instructions: "The apostrophe (') is next to the semicolon. Use it for contractions and possessives.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i30",
        number: 30,
        title: "Contractions Practice",
        description: "Practice words with apostrophes",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["don't", "won't", "can't", "it's", "I'm", "we're", "they're", "you're", "isn't", "aren't", "wasn't", "weren't", "hasn't", "haven't", "shouldn't"]
      },
      
      // Numbers and Symbols Introduction
      {
        id: "i31",
        number: 31,
        title: "Number Symbols Tutorial - 1-5",
        description: "Learn symbols on number keys 1-5",
        type: "tutorial",
        keys: ["!", "@", "#", "$", "%"],
        text: "! @ # $ % test! email@ #tag $100 50%",
        instructions: "Hold Shift and press number keys to type symbols: ! @ # $ %. These are commonly used in emails, social media, and pricing.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i32",
        number: 32,
        title: "Symbol Practice - ! and @",
        description: "Practice exclamation and at symbols",
        type: "exercise",
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["user@email.com", "admin@site.org", "Help!", "Stop!", "info@company.net", "Great!", "test@mail.com"]
      },
      {
        id: "i33",
        number: 33,
        title: "Symbol Practice - # and $",
        description: "Practice hashtag and dollar symbols",
        type: "exercise",
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["#trending", "#news", "$100", "$50", "#viral", "$25.99", "#coding", "$1000", "#tech"]
      },
      {
        id: "i34",
        number: 34,
        title: "Number Symbols Tutorial - 6-0",
        description: "Learn symbols on number keys 6-0",
        type: "tutorial",
        keys: ["^", "&", "*", "(", ")"],
        text: "^ & * ( ) test^ you&me 5*5 (word) end)",
        instructions: "More symbols with Shift + numbers: ^ & * ( ). Parentheses are especially useful for grouping information.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i35",
        number: 35,
        title: "Symbol Practice - () and *",
        description: "Practice parentheses and asterisk",
        type: "exercise",
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["(note)", "(important)", "5*5", "10*20", "(test)", "2*2*2", "(example)", "item*"]
      },
      {
        id: "i36",
        number: 36,
        title: "Symbol Practice - & and ^",
        description: "Practice ampersand and caret",
        type: "exercise",
        targetWPM: 30,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["you&me", "Tom&Jerry", "rock&roll", "2^3", "5^2", "cat&dog", "up^", "this&that"]
      },
      {
        id: "i37",
        number: 37,
        title: "Mixed Symbols Practice",
        description: "Combine all learned symbols",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["user@email.com", "(test)", "$100", "#trending", "50%", "you&me", "5*5", "Great!", "admin@site.org", "2^3"]
      },
      
      // Advanced Punctuation
      {
        id: "i38",
        number: 38,
        title: "Quotation Marks Tutorial",
        description: "Learn to type quotation marks",
        type: "tutorial",
        keys: ['"'],
        text: '"Hello" "World" "Quote" She said "yes" to the "offer"',
        instructions: 'Quotation marks (") are Shift + apostrophe key. Use them to quote speech or emphasize words.',
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i39",
        number: 39,
        title: "Quotations Practice",
        description: "Practice typing quoted text",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ['"Hello"', '"World"', '"Yes"', '"No"', 'He said "okay"', '"Great job"', '"Thank you"', '"Good morning"']
      },
      {
        id: "i40",
        number: 40,
        title: "Colon and Semicolon",
        description: "Practice colons and semicolons",
        type: "tutorial",
        keys: [":", ";"],
        text: "item: value; first: second; yes; no; list: a, b, c;",
        instructions: "Colon (:) is Shift + semicolon. Semicolons (;) are on the home row. Use colons for lists and semicolons to separate clauses.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i41",
        number: 41,
        title: "Colon Practice",
        description: "Practice typing colons",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["Time: 5pm", "Name: John", "Title: Manager", "Status: Active", "Type: New", "Date: Today"]
      },
      {
        id: "i42",
        number: 42,
        title: "Underscore and Hyphen",
        description: "Practice underscores and hyphens",
        type: "tutorial",
        keys: ["-", "_"],
        text: "file-name user_name test-case my_file well-done file_path",
        instructions: "Hyphen (-) is next to zero. Underscore (_) is Shift + hyphen. Common in filenames and programming.",
        targetWPM: null,
        targetAccuracy: null,
        exercises: 1
      },
      {
        id: "i43",
        number: 43,
        title: "File Names Practice",
        description: "Type filenames with hyphens and underscores",
        type: "exercise",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["user_name", "file-path", "my_file", "test-case", "user_id", "file-name", "data_set", "web-page"]
      },
      
      // Speed Building
      {
        id: "i44",
        number: 44,
        title: "Speed Building - 45 WPM",
        description: "Build your speed to 45 WPM",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true
      },
      {
        id: "i45",
        number: 45,
        title: "Speed Building - 50 WPM",
        description: "Push your speed to 50 WPM",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true
      },
      {
        id: "i46",
        number: 46,
        title: "Speed Building - 55 WPM",
        description: "Reach 55 WPM with accuracy",
        type: "exercise",
        targetWPM: 55,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true
      },
      {
        id: "i47",
        number: 47,
        title: "Accuracy Challenge",
        description: "Focus on perfect accuracy",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 98,
        exercises: 5,
        useSentences: true
      },
      {
        id: "i48",
        number: 48,
        title: "Mixed Content - All Skills",
        description: "Combine all intermediate skills",
        type: "exercise",
        targetWPM: 55,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "advanced"
      },
      {
        id: "i49",
        number: 49,
        title: "Final Review",
        description: "Review all intermediate concepts",
        type: "exercise",
        targetWPM: 60,
        targetAccuracy: 95,
        exercises: 10,
        useSentences: true,
        sentenceType: "advanced"
      },
      {
        id: "i50",
        number: 50,
        title: "Intermediate Graduation Test",
        description: "Final test to complete intermediate level",
        type: "exercise",
        targetWPM: 70,
        targetAccuracy: 95,
        exercises: 10,
        useSentences: true,
        sentenceType: "advanced"
      }
    ]
  }
};

// Export for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = INTERMEDIATE_LESSONS;
}