 const LESSON_DATA = {
    beginner: {
      name: "Beginner Lessons",
      description: "Master the fundamentals of touch typing",
      icon: "🌱",
      lessons: [
        // Home Row - Left Hand (Tutorials)
        {
          id: "b1",
          number: 1,
          title: "Home Row Tutorial - F & J",
          description: "Learn the home position with index fingers",
          type: "tutorial",
          keys: ["f", "j"],
          text: "fff jjj fff jjj fjf jfj fjf jfj",
          instructions: "Place your left index finger on 'F' and right index finger on 'J'. These keys have small bumps to help you find them without looking. Practice typing these keys alternately.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b2",
          number: 2,
          title: "Home Row Tutorial - D & K",
          description: "Add middle fingers to home row",
          type: "tutorial",
          keys: ["f", "j", "d", "k"],
          text: "ddd kkk ddd kkk dkd kdk fjd kfj",
          instructions: "Keep your index fingers on F and J. Place your left middle finger on 'D' and right middle finger on 'K'. Practice all four keys together.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b3",
          number: 3,
          title: "Home Row Tutorial - S & L",
          description: "Add ring fingers to home row",
          type: "tutorial",
          keys: ["f", "j", "d", "k", "s", "l"],
          text: "sss lll sss lll sls lsl fds jkl",
          instructions: "Place your left ring finger on 'S' and right ring finger on 'L'. Now you have six home row keys!",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b4",
          number: 4,
          title: "Home Row Tutorial - A & ;",
          description: "Complete the home row",
          type: "tutorial",
          keys: ["f", "j", "d", "k", "s", "l", "a", ";"],
          text: "aaa ;;; aaa ;;; a;a ;a; asd jkl; asdf jkl;",
          instructions: "Place your left pinky on 'A' and right pinky on ';'. You've now learned all home row keys! This is your base position.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        
        // Home Row Exercises
        {
          id: "b5",
          number: 5,
          title: "Home Row Practice - Left Hand",
          description: "Practice left hand home row keys",
          type: "exercise",
          keys: ["a", "s", "d", "f"],
          targetWPM: 20,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b6",
          number: 6,
          title: "Home Row Practice - Right Hand",
          description: "Practice right hand home row keys",
          type: "exercise",
          keys: ["j", "k", "l", ";"],
          targetWPM: 20,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b7",
          number: 7,
          title: "Home Row - Mixed Practice",
          description: "Combine both hands on home row",
          type: "exercise",
          keys: ["a", "s", "d", "f", "j", "k", "l", ";"],
          targetWPM: 25,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b8",
          number: 8,
          title: "Home Row Words - Simple",
          description: "Type simple words using home row",
          type: "exercise",
          keys: ["a", "s", "d", "f", "j", "k", "l", ";"],
          targetWPM: 25,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["lad", "dad", "sad", "lass", "fall", "all", "ask", "flask", "salad", "lass"]
        },
        {
          id: "b9",
          number: 9,
          title: "Home Row Words - Advanced",
          description: "More complex home row words",
          type: "exercise",
          keys: ["a", "s", "d", "f", "j", "k", "l", ";"],
          targetWPM: 30,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["adds", "falls", "lass", "dads", "salads", "asks", "flasks", "fad", "lads", "lass"]
        },
        
        // Upper Row - Tutorials
        {
          id: "b10",
          number: 10,
          title: "Upper Row Tutorial - R & U",
          description: "Learn upper row with index fingers",
          type: "tutorial",
          keys: ["r", "u"],
          text: "rrr uuu rrr uuu rur uru frj juf",
          instructions: "From home position (F and J), reach up with your index fingers to press 'R' and 'U'. Return to home position after each keystroke.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b11",
          number: 11,
          title: "Upper Row Tutorial - E & I",
          description: "Add middle fingers to upper row",
          type: "tutorial",
          keys: ["e", "i"],
          text: "eee iii eee iii eie iei der kik",
          instructions: "Reach up with your middle fingers from D and K to press 'E' and 'I'. Always return to home position.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b12",
          number: 12,
          title: "Upper Row Tutorial - W & O",
          description: "Add ring fingers to upper row",
          type: "tutorial",
          keys: ["w", "o"],
          text: "www ooo www ooo wow owo sws lol",
          instructions: "Reach up with your ring fingers from S and L to press 'W' and 'O'.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b13",
          number: 13,
          title: "Upper Row Tutorial - Q & P",
          description: "Complete the upper row",
          type: "tutorial",
          keys: ["q", "p"],
          text: "qqq ppp qqq ppp qpq pqp aqa ;p;",
          instructions: "Reach up with your pinkies from A and ; to press 'Q' and 'P'. You've learned the entire upper row!",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        
        // Upper Row Exercises
        {
          id: "b14",
          number: 14,
          title: "Upper Row - Left Hand",
          description: "Practice left hand upper row",
          type: "exercise",
          keys: ["q", "w", "e", "r"],
          targetWPM: 20,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b15",
          number: 15,
          title: "Upper Row - Right Hand",
          description: "Practice right hand upper row",
          type: "exercise",
          keys: ["u", "i", "o", "p"],
          targetWPM: 20,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b16",
          number: 16,
          title: "Upper Row - Mixed",
          description: "Combine both hands upper row",
          type: "exercise",
          keys: ["q", "w", "e", "r", "u", "i", "o", "p"],
          targetWPM: 25,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b17",
          number: 17,
          title: "Home + Upper Row - Combined",
          description: "Mix home and upper row keys",
          type: "exercise",
          keys: ["a", "s", "d", "f", "j", "k", "l", "q", "w", "e", "r", "u", "i", "o", "p"],
          targetWPM: 30,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b18",
          number: 18,
          title: "Upper Row Words - Simple",
          description: "Type words using upper row",
          type: "exercise",
          keys: ["q", "w", "e", "r", "u", "i", "o", "p", "a", "s", "d", "f", "j", "k", "l"],
          targetWPM: 30,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["read", "peer", "reap", "pear", "wear", "were", "ease", "ears", "pour", "power"]
        },
        {
          id: "b19",
          number: 19,
          title: "Upper Row Words - Advanced",
          description: "Complex upper row words",
          type: "exercise",
          keys: ["q", "w", "e", "r", "u", "i", "o", "p", "a", "s", "d", "f", "j", "k", "l"],
          targetWPM: 35,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["quake", "equip", "powers", "require", "inspire", "explore", "proper", "prepare", "appear", "weaker"]
        },
        
        // Bottom Row - Tutorials
        {
          id: "b20",
          number: 20,
          title: "Bottom Row Tutorial - V & M",
          description: "Learn bottom row with index fingers",
          type: "tutorial",
          keys: ["v", "m"],
          text: "vvv mmm vvv mmm vmv mvm fvf jmj",
          instructions: "From home position, reach down with your index fingers to press 'V' and 'M'. Return to F and J after each key.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b21",
          number: 21,
          title: "Bottom Row Tutorial - C & ,",
          description: "Add middle fingers to bottom row",
          type: "tutorial",
          keys: ["c", ","],
          text: "ccc ,,, ccc ,,, c,c ,c, dcd k,k",
          instructions: "Reach down with your middle fingers from D and K to press 'C' and ',' (comma).",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b22",
          number: 22,
          title: "Bottom Row Tutorial - X & .",
          description: "Add ring fingers to bottom row",
          type: "tutorial",
          keys: ["x", "."],
          text: "xxx ... xxx ... x.x .x. sxs l.l",
          instructions: "Reach down with your ring fingers from S and L to press 'X' and '.' (period).",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b23",
          number: 23,
          title: "Bottom Row Tutorial - Z & /",
          description: "Complete the bottom row",
          type: "tutorial",
          keys: ["z", "/"],
          text: "zzz /// zzz /// z/z /z/ aza ;/;",
          instructions: "Reach down with your pinkies from A and ; to press 'Z' and '/' (slash). You've mastered all three rows!",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        
        // Bottom Row Exercises
        {
          id: "b24",
          number: 24,
          title: "Bottom Row - Left Hand",
          description: "Practice left hand bottom row",
          type: "exercise",
          keys: ["z", "x", "c", "v"],
          targetWPM: 20,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b25",
          number: 25,
          title: "Bottom Row - Right Hand",
          description: "Practice right hand bottom row",
          type: "exercise",
          keys: ["m", ",", ".", "/"],
          targetWPM: 20,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b26",
          number: 26,
          title: "Bottom Row - Mixed",
          description: "Combine both hands bottom row",
          type: "exercise",
          keys: ["z", "x", "c", "v", "m", ",", ".", "/"],
          targetWPM: 25,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b27",
          number: 27,
          title: "All Three Rows - Combined",
          description: "Practice all keyboard rows together",
          type: "exercise",
          keys: ["a", "s", "d", "f", "j", "k", "l", "q", "w", "e", "r", "u", "i", "o", "p", "z", "x", "c", "v", "m"],
          targetWPM: 30,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b28",
          number: 28,
          title: "Bottom Row Words - Simple",
          description: "Type words using bottom row",
          type: "exercise",
          keys: ["z", "x", "c", "v", "m", "a", "s", "d", "f", "j", "k", "l"],
          targetWPM: 30,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["maze", "cave", "vase", "zone", "calm", "came", "move", "make", "voice", "axe"]
        },
        {
          id: "b29",
          number: 29,
          title: "Bottom Row Words - Advanced",
          description: "Complex bottom row words",
          type: "exercise",
          keys: ["z", "x", "c", "v", "m", "a", "s", "d", "f", "j", "k", "l"],
          targetWPM: 35,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["maximize", "complex", "vaccine", "canvas", "exam", "civic", "music", "cosmic", "volume", "example"]
        },
        
        // Full Alphabet Practice
        {
          id: "b30",
          number: 30,
          title: "Full Alphabet - Letters Only",
          description: "Practice all letter keys",
          type: "exercise",
          keys: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
          targetWPM: 35,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b31",
          number: 31,
          title: "Common Words - Level 1",
          description: "Type frequently used words",
          type: "exercise",
          targetWPM: 35,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["the", "and", "for", "are", "but", "not", "you", "all", "can", "her", "was", "one", "our", "out", "day"]
        },
        {
          id: "b32",
          number: 32,
          title: "Common Words - Level 2",
          description: "More frequently used words",
          type: "exercise",
          targetWPM: 40,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["get", "has", "him", "his", "how", "man", "new", "now", "old", "see", "time", "two", "way", "who", "boy"]
        },
        {
          id: "b33",
          number: 33,
          title: "Common Words - Level 3",
          description: "Build vocabulary speed",
          type: "exercise",
          targetWPM: 40,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["did", "its", "let", "put", "say", "she", "too", "use", "each", "make", "many", "over", "such", "them", "well"]
        },
        
        // Numbers Row Tutorials
        {
          id: "b34",
          number: 34,
          title: "Numbers Tutorial - 4 & 7",
          description: "Learn number keys with index fingers",
          type: "tutorial",
          keys: ["4", "7"],
          text: "444 777 444 777 474 747 f4f j7j",
          instructions: "Reach up from F to press '4' and from J to press '7'. Numbers are typed with the same fingers as their letter keys below.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b35",
          number: 35,
          title: "Numbers Tutorial - 3 & 8",
          description: "Add middle fingers to numbers",
          type: "tutorial",
          keys: ["3", "8"],
          text: "333 888 333 888 383 838 d3d k8k",
          instructions: "Reach up from D to press '3' and from K to press '8'.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b36",
          number: 36,
          title: "Numbers Tutorial - 2 & 9",
          description: "Add ring fingers to numbers",
          type: "tutorial",
          keys: ["2", "9"],
          text: "222 999 222 999 292 929 s2s l9l",
          instructions: "Reach up from S to press '2' and from L to press '9'.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b37",
          number: 37,
          title: "Numbers Tutorial - 1 & 0",
          description: "Complete the number row",
          type: "tutorial",
          keys: ["1", "0"],
          text: "111 000 111 000 101 010 a1a ;0;",
          instructions: "Reach up from A to press '1' and from ; to press '0'. You've learned all number keys!",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b38",
          number: 38,
          title: "Numbers Tutorial - 5 & 6",
          description: "Center number keys",
          type: "tutorial",
          keys: ["5", "6"],
          text: "555 666 555 666 565 656 f5f j6j",
          instructions: "Press '5' with your left index finger (F) and '6' with your right index finger (J).",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        
        // Number Exercises
        {
          id: "b39",
          number: 39,
          title: "Numbers Practice - 1-5",
          description: "Practice numbers 1 through 5",
          type: "exercise",
          keys: ["1", "2", "3", "4", "5"],
          targetWPM: 25,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b40",
          number: 40,
          title: "Numbers Practice - 6-0",
          description: "Practice numbers 6 through 0",
          type: "exercise",
          keys: ["6", "7", "8", "9", "0"],
          targetWPM: 25,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b41",
          number: 41,
          title: "Numbers Practice - All Numbers",
          description: "Practice all number keys",
          type: "exercise",
          keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          targetWPM: 30,
          targetAccuracy: 95,
          exercises: 5
        },
        {
          id: "b42",
          number: 42,
          title: "Mixed Letters and Numbers",
          description: "Combine letters and numbers",
          type: "exercise",
          targetWPM: 35,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["word1", "test2", "code3", "file4", "page5", "line6", "item7", "step8", "task9", "rule0"]
        },
        
        // Capital Letters
        {
          id: "b43",
          number: 43,
          title: "Capital Letters Tutorial",
          description: "Learn to use Shift key",
          type: "tutorial",
          keys: ["shift"],
          text: "Aa Ss Dd Ff Jj Kk Ll",
          instructions: "Hold Shift with your pinky while pressing letter keys to make capital letters. Use left Shift for right hand keys and right Shift for left hand keys.",
          targetWPM: null,
          targetAccuracy: null,
          exercises: 1
        },
        {
          id: "b44",
          number: 44,
          title: "Capital Letters Practice",
          description: "Practice capital letters",
          type: "exercise",
          targetWPM: 30,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["The", "And", "For", "Are", "But", "Not", "You", "All", "Can", "Her", "Was", "One", "Our", "Day", "Get"]
        },
        {
          id: "b45",
          number: 45,
          title: "Sentences with Capitals",
          description: "Type proper sentences",
          type: "exercise",
          targetWPM: 35,
          targetAccuracy: 95,
          exercises: 5,
          useSentences: true
        },
        
        // Final Beginner Lessons
        {
          id: "b46",
          number: 46,
          title: "Speed Building - Level 1",
          description: "Focus on increasing speed",
          type: "exercise",
          targetWPM: 40,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["quick", "brown", "jumps", "over", "lazy", "where", "there", "their", "would", "could", "should", "about", "which", "people", "think"]
        },
        {
          id: "b47",
          number: 47,
          title: "Speed Building - Level 2",
          description: "Increase typing speed further",
          type: "exercise",
          targetWPM: 45,
          targetAccuracy: 95,
          exercises: 5,
          useWords: true,
          wordList: ["because", "through", "another", "between", "important", "different", "however", "without", "something", "everything", "nothing", "someone", "everyone", "anyone", "always"]
        },
        {
          id: "b48",
          number: 48,
          title: "Accuracy Challenge",
          description: "Focus on perfect accuracy",
          type: "exercise",
          targetWPM: 40,
          targetAccuracy: 98,
          exercises: 5,
          useWords: true,
          wordList: ["accuracy", "precision", "perfect", "careful", "exactly", "correct", "proper", "precise", "flawless", "excellent"]
        },
        {
          id: "b49",
          number: 49,
          title: "Final Review - All Skills",
          description: "Review everything you've learned",
          type: "exercise",
          targetWPM: 50,
          targetAccuracy: 95,
          exercises: 5,
          useSentences: true
        },
        {
          id: "b50",
          number: 50,
          title: "Beginner Graduation Test",
          description: "Final test to complete beginner level",
          type: "exercise",
          targetWPM: 60,
          targetAccuracy: 95,
          exercises: 10,
          useSentences: true
        }
      ]
    }
  };