// ==== GAMES LESSONS DATA ====
// Fun and engaging typing games to make practice enjoyable

const GAMES_LESSONS = {
  games: {
    name: "Typing Games",
    description: "Fun games to improve your typing skills",
    icon: "🎮",
    lessons: [
      // Typing Speed Games
      {
        id: "g1",
        number: 1,
        title: "Word Rush",
        description: "Type words as fast as possible before time runs out",
        type: "game",
        gameType: "word_rush",
        targetWPM: 40,
        targetAccuracy: 90,
        exercises: 5,
        difficulty: "easy",
        timeLimit: 60,
        instructions: "Type the words that appear on screen as quickly and accurately as possible. Each correct word gives you points!"
      },
      {
        id: "g2",
        number: 2,
        title: "Falling Words",
        description: "Type words before they hit the bottom",
        type: "game",
        gameType: "falling_words",
        targetWPM: 45,
        targetAccuracy: 90,
        exercises: 5,
        difficulty: "easy",
        instructions: "Words fall from the top of the screen. Type them before they reach the bottom!"
      },
      {
        id: "g3",
        number: 3,
        title: "Typing Race",
        description: "Race against time to type sentences",
        type: "game",
        gameType: "typing_race",
        targetWPM: 50,
        targetAccuracy: 92,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type complete sentences as fast as you can. Your car moves forward with each correct character!"
      },
      {
        id: "g4",
        number: 4,
        title: "Word Cannon",
        description: "Shoot down words by typing them",
        type: "game",
        gameType: "word_cannon",
        targetWPM: 50,
        targetAccuracy: 92,
        exercises: 5,
        difficulty: "medium",
        instructions: "Enemy words approach! Type them to shoot them down before they reach you!"
      },
      {
        id: "g5",
        number: 5,
        title: "Speed Typing Challenge",
        description: "Type as many words as possible in 30 seconds",
        type: "game",
        gameType: "speed_challenge",
        targetWPM: 55,
        targetAccuracy: 90,
        exercises: 5,
        difficulty: "medium",
        timeLimit: 30,
        instructions: "How many words can you type correctly in 30 seconds? Beat your high score!"
      },
      {
        id: "g6",
        number: 6,
        title: "Typing Snake",
        description: "Classic snake game controlled by typing",
        type: "game",
        gameType: "typing_snake",
        targetWPM: 45,
        targetAccuracy: 90,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type the letters that appear to control the snake. Collect food and avoid walls!"
      },
      {
        id: "g7",
        number: 7,
        title: "Word Scramble",
        description: "Unscramble words as fast as you can",
        type: "game",
        gameType: "word_scramble",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        difficulty: "easy",
        instructions: "Unscramble the jumbled letters to form the correct word!"
      },
      {
        id: "g8",
        number: 8,
        title: "Type Invaders",
        description: "Space invaders style typing game",
        type: "game",
        gameType: "type_invaders",
        targetWPM: 55,
        targetAccuracy: 92,
        exercises: 5,
        difficulty: "hard",
        instructions: "Alien words are invading! Type them to destroy them before they reach Earth!"
      },
      {
        id: "g9",
        number: 9,
        title: "Sentence Builder",
        description: "Build sentences word by word",
        type: "game",
        gameType: "sentence_builder",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type words in the correct order to build complete sentences!"
      },
      {
        id: "g10",
        number: 10,
        title: "Typing Marathon",
        description: "Endless typing challenge",
        type: "game",
        gameType: "marathon",
        targetWPM: 60,
        targetAccuracy: 90,
        exercises: 5,
        difficulty: "hard",
        instructions: "Keep typing without stopping! How long can you maintain your speed?"
      },
      
      // Pattern Recognition Games
      {
        id: "g11",
        number: 11,
        title: "Pattern Match",
        description: "Type patterns as they appear",
        type: "game",
        gameType: "pattern_match",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type the patterns exactly as shown. Perfect for muscle memory!"
      },
      {
        id: "g12",
        number: 12,
        title: "Key Combo Challenge",
        description: "Master difficult key combinations",
        type: "game",
        gameType: "key_combo",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        difficulty: "hard",
        instructions: "Type challenging key combinations to improve finger coordination!"
      },
      {
        id: "g13",
        number: 13,
        title: "Mirror Typing",
        description: "Type words that appear in reverse",
        type: "game",
        gameType: "mirror_typing",
        targetWPM: 35,
        targetAccuracy: 90,
        exercises: 5,
        difficulty: "hard",
        instructions: "Words appear backwards! Type them correctly to score points."
      },
      {
        id: "g14",
        number: 14,
        title: "Color Code",
        description: "Type words based on their colors",
        type: "game",
        gameType: "color_code",
        targetWPM: 40,
        targetAccuracy: 92,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type only the words that appear in the target color!"
      },
      {
        id: "g15",
        number: 15,
        title: "Memory Type",
        description: "Remember and type sequences",
        type: "game",
        gameType: "memory_type",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        difficulty: "medium",
        instructions: "Remember the sequence of words, then type them from memory!"
      },
      
      // Accuracy Games
      {
        id: "g16",
        number: 16,
        title: "Precision Typing",
        description: "Focus on perfect accuracy",
        type: "game",
        gameType: "precision",
        targetWPM: 40,
        targetAccuracy: 98,
        exercises: 5,
        difficulty: "hard",
        instructions: "One mistake and it's over! Type with perfect accuracy."
      },
      {
        id: "g17",
        number: 17,
        title: "Error Hunter",
        description: "Find and correct typing errors",
        type: "game",
        gameType: "error_hunter",
        targetWPM: 35,
        targetAccuracy: 95,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type the correct version of sentences with errors!"
      },
      {
        id: "g18",
        number: 18,
        title: "Perfect Sentence",
        description: "Type sentences without any mistakes",
        type: "game",
        gameType: "perfect_sentence",
        targetWPM: 45,
        targetAccuracy: 100,
        exercises: 5,
        difficulty: "hard",
        instructions: "Type complete sentences with zero errors. Perfection required!"
      },
      
      // Fun Challenge Games
      {
        id: "g19",
        number: 19,
        title: "Typing Story",
        description: "Type to progress through a story",
        type: "game",
        gameType: "typing_story",
        targetWPM: 50,
        targetAccuracy: 90,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type to advance through an interactive story. Your choices matter!"
      },
      {
        id: "g20",
        number: 20,
        title: "Word Chain",
        description: "Create chains of related words",
        type: "game",
        gameType: "word_chain",
        targetWPM: 40,
        targetAccuracy: 92,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type words that start with the last letter of the previous word!"
      },
      {
        id: "g21",
        number: 21,
        title: "Typing Quiz",
        description: "Answer questions by typing",
        type: "game",
        gameType: "typing_quiz",
        targetWPM: 40,
        targetAccuracy: 90,
        exercises: 5,
        difficulty: "easy",
        instructions: "Type your answers to trivia questions as fast as possible!"
      },
      {
        id: "g22",
        number: 22,
        title: "Rhythm Typer",
        description: "Type to the beat of music",
        type: "game",
        gameType: "rhythm_typer",
        targetWPM: 45,
        targetAccuracy: 92,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type in rhythm with the music! Hit the beats for bonus points."
      },
      {
        id: "g23",
        number: 23,
        title: "Boss Battle",
        description: "Defeat the boss by typing",
        type: "game",
        gameType: "boss_battle",
        targetWPM: 55,
        targetAccuracy: 92,
        exercises: 5,
        difficulty: "hard",
        instructions: "Type phrases to attack the boss! Defeat it before time runs out!"
      },
      {
        id: "g24",
        number: 24,
        title: "Typing Treasure Hunt",
        description: "Find treasures by typing clues",
        type: "game",
        gameType: "treasure_hunt",
        targetWPM: 45,
        targetAccuracy: 90,
        exercises: 5,
        difficulty: "medium",
        instructions: "Type the clues to find hidden treasures! X marks the spot!"
      },
      {
        id: "g25",
        number: 25,
        title: "Ultimate Typing Challenge",
        description: "The ultimate test of all your skills",
        type: "game",
        gameType: "ultimate_challenge",
        targetWPM: 60,
        targetAccuracy: 95,
        exercises: 10,
        difficulty: "expert",
        instructions: "Face all challenges in one epic game! Only the best typists survive!"
      }
    ]
  }
};

// Word banks for games
const GAME_WORDS = {
  easy: [
    "cat", "dog", "run", "jump", "play", "fun", "sun", "moon", "star", "tree",
    "book", "pen", "cup", "door", "fish", "hand", "home", "key", "lamp", "map",
    "rain", "snow", "wind", "bird", "food", "game", "hat", "ice", "joke", "king"
  ],
  medium: [
    "apple", "beach", "chair", "dance", "earth", "fruit", "green", "happy", "island", "jungle",
    "knife", "light", "music", "night", "ocean", "plant", "quiet", "river", "smile", "table",
    "under", "voice", "water", "yellow", "zebra", "bridge", "cloud", "dragon", "forest", "garden"
  ],
  hard: [
    "amazing", "balance", "capital", "develop", "element", "freedom", "general", "history", "improve", "journey",
    "kitchen", "library", "machine", "natural", "opinion", "perfect", "quality", "rainbow", "science", "theater",
    "unusual", "village", "weather", "example", "younger", "balloon", "calendar", "daughter", "elephant", "favorite"
  ],
  expert: [
    "absolutely", "background", "celebrate", "dangerous", "education", "fantastic", "generation", "happiness", "important", "knowledge",
    "landscape", "magnificent", "necessary", "operation", "particular", "question", "restaurant", "something", "temperature", "understand",
    "vocabulary", "wonderful", "yesterday", "achievement", "beautiful", "championship", "definitely", "environment", "extraordinary", "fascination"
  ]
};

const GAME_SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect when learning to type.",
  "Every great journey begins with a single step.",
  "Success is the result of hard work and dedication.",
  "Believe in yourself and achieve your dreams.",
  "The future belongs to those who prepare today.",
  "Knowledge is power when applied with wisdom.",
  "Patience and persistence lead to excellence.",
  "Challenge yourself to grow stronger every day.",
  "Great things never come from comfort zones."
];

// Export for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GAMES_LESSONS, GAME_WORDS, GAME_SENTENCES };
}