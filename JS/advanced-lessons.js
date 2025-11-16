// ==== ADVANCED LESSONS DATA ====
// This file contains all advanced level typing lessons
// Includes complex patterns, audio transcription, and professional content

const ADVANCED_LESSONS = {
  advanced: {
    name: "Advanced Lessons",
    description: "Master complex patterns, speed, and professional typing",
    icon: "🌳",
    lessons: [
      // Complex Word Patterns
      {
        id: "a1",
        number: 1,
        title: "Double Letter Patterns",
        description: "Master words with repeated letters",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["book", "letter", "coffee", "bottle", "balloon", "dinner", "success", "acco unt", "better", "little", "matter", "happen", "follow", "common", "bubble"]
      },
      {
        id: "a2",
        number: 2,
        title: "Finger Alternation",
        description: "Practice alternating between hands",
        type: "exercise",
        targetWPM: 55,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["quantity", "island", "authentic", "bicycle", "focus", "problem", "handle", "visual", "discipline", "formal", "social", "typical", "formal", "signal", "ritual"]
      },
      {
        id: "a3",
        number: 3,
        title: "Same Hand Sequences",
        description: "Master difficult same-hand combinations",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["only", "minimum", "opinion", "pumpkin", "union", "jolly", "nylon", "upon", "look", "hill", "milk", "polk", "jump", "hunk", "lump"]
      },
      {
        id: "a4",
        number: 4,
        title: "Long Words Challenge",
        description: "Type longer, complex words",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["accommodation", "beautiful", "communicate", "development", "environment", "fundamental", "government", "independent", "international", "knowledge", "maintenance", "necessary", "opportunity", "performance", "restaurant"]
      },
      {
        id: "a5",
        number: 5,
        title: "Technical Terminology",
        description: "Practice technical and scientific words",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["algorithm", "bandwidth", "cryptocurrency", "database", "encryption", "firewall", "gigabyte", "hardware", "interface", "javascript", "kernel", "localhost", "metadata", "network", "protocol"]
      },
      
      // Numbers and Symbols Mastery
      {
        id: "a6",
        number: 6,
        title: "Number Sequences",
        description: "Practice typing number sequences",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["12345", "67890", "24680", "13579", "11111", "99999", "54321", "10293", "47586", "36925", "159357", "246810", "135792", "147258", "369258"]
      },
      {
        id: "a7",
        number: 7,
        title: "Dates and Times",
        description: "Type dates and time formats",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["01/15/2024", "12:30 PM", "3:45 AM", "10/31/2023", "08:00:00", "23:59:59", "06/15/2024", "2024-11-15", "14:30:45", "09:15 AM"]
      },
      {
        id: "a8",
        number: 8,
        title: "Currency and Prices",
        description: "Practice typing prices and amounts",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["$19.99", "$100.00", "$5,432.50", "$1,000,000", "$49.95", "$0.99", "$299.99", "$15.50", "$3,750", "$89.99"]
      },
      {
        id: "a9",
        number: 9,
        title: "Email and Web Addresses",
        description: "Type email and URL formats",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["user@example.com", "https://website.com", "admin@company.org", "info@business.net", "www.google.com", "support@help.co", "name@email.io", "https://secure.site.com"]
      },
      {
        id: "a10",
        number: 10,
        title: "Complex Symbols",
        description: "Master all keyboard symbols",
        type: "exercise",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["[array]", "{object}", "<tag>", "|pipe|", "~tilde~", "`backtick`", "\\backslash\\", "^caret^", "item:value", "key=value"]
      },
      
      // Programming and Code
      {
        id: "a11",
        number: 11,
        title: "Code Syntax - Variables",
        description: "Practice typing variable declarations",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["let x = 5;", "const name = 'John';", "var count = 0;", "int total = 100;", "string text = 'hello';", "boolean flag = true;"]
      },
      {
        id: "a12",
        number: 12,
        title: "Code Syntax - Functions",
        description: "Type function declarations",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["function test() {}", "const add = (a, b) => a + b;", "def calculate():", "void main() {}", "func process() { }"]
      },
      {
        id: "a13",
        number: 13,
        title: "Code Syntax - Conditions",
        description: "Practice if statements and logic",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["if (x > 0)", "else if (y < 10)", "while (true)", "for (let i = 0; i < 10; i++)", "switch (value)"]
      },
      {
        id: "a14",
        number: 14,
        title: "HTML Tags",
        description: "Type common HTML markup",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["<div>", "</div>", "<p>text</p>", "<a href=''>", "<img src=''>", "<button>", "<input type='text'>", "<h1>Title</h1>"]
      },
      {
        id: "a15",
        number: 15,
        title: "CSS Properties",
        description: "Practice CSS syntax",
        type: "exercise",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        useWords: true,
        wordList: ["color: #fff;", "display: flex;", "margin: 0 auto;", "font-size: 16px;", "background: #000;", "padding: 10px 20px;"]
      },
      
      // Professional Documents
      {
        id: "a16",
        number: 16,
        title: "Business Email Format",
        description: "Type professional email content",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "business"
      },
      {
        id: "a17",
        number: 17,
        title: "Formal Letters",
        description: "Practice formal letter writing",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "formal"
      },
      {
        id: "a18",
        number: 18,
        title: "Report Writing",
        description: "Type report-style content",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "report"
      },
      {
        id: "a19",
        number: 19,
        title: "Meeting Minutes",
        description: "Practice typing meeting notes",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "minutes"
      },
      {
        id: "a20",
        number: 20,
        title: "Legal Documents",
        description: "Type legal-style text",
        type: "exercise",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "legal"
      },
      
      // Audio Transcription Lessons (21-40)
      {
        id: "a21",
        number: 21,
        title: "Audio Transcription - Introduction",
        description: "Learn to transcribe spoken audio",
        type: "audio",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 3,
        audioText: "Welcome to audio transcription training. Listen carefully and type exactly what you hear. Focus on accuracy over speed.",
        audioSpeed: "slow"
      },
      {
        id: "a22",
        number: 22,
        title: "Audio - Simple Sentences",
        description: "Transcribe basic spoken sentences",
        type: "audio",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type.",
        audioSpeed: "slow"
      },
      {
        id: "a23",
        number: 23,
        title: "Audio - News Report Style",
        description: "Transcribe news-style audio",
        type: "audio",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Breaking news from the city center. Local authorities have confirmed that traffic will be diverted starting tomorrow morning.",
        audioSpeed: "medium"
      },
      {
        id: "a24",
        number: 24,
        title: "Audio - Interview Format",
        description: "Type interview conversations",
        type: "audio",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Question: Can you tell us about your experience? Answer: Yes, I have been working in this field for over ten years.",
        audioSpeed: "medium"
      },
      {
        id: "a25",
        number: 25,
        title: "Audio - Dictation Practice",
        description: "Professional dictation exercise",
        type: "audio",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Please take note of the following items. First, schedule the meeting for next Tuesday. Second, prepare the quarterly report. Third, send invitations to all stakeholders.",
        audioSpeed: "medium"
      },
      {
        id: "a26",
        number: 26,
        title: "Audio - Technical Content",
        description: "Transcribe technical information",
        type: "audio",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "To configure the system, navigate to settings and select preferences. Click on advanced options and enable automatic updates.",
        audioSpeed: "medium"
      },
      {
        id: "a27",
        number: 27,
        title: "Audio - Numbers and Dates",
        description: "Type spoken numbers and dates",
        type: "audio",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "The meeting is scheduled for January fifteenth, two thousand twenty-four at three thirty PM. Please arrive fifteen minutes early.",
        audioSpeed: "medium"
      },
      {
        id: "a28",
        number: 28,
        title: "Audio - Phone Messages",
        description: "Transcribe phone message content",
        type: "audio",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "This is a message for John Smith. Please call me back at five five five, one two three four. My extension is two zero seven. Thank you.",
        audioSpeed: "medium"
      },
      {
        id: "a29",
        number: 29,
        title: "Audio - Academic Lecture",
        description: "Type lecture-style content",
        type: "audio",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Today we will discuss the fundamental principles of economics. Supply and demand are the two primary forces that drive market dynamics.",
        audioSpeed: "medium"
      },
      {
        id: "a30",
        number: 30,
        title: "Audio - Fast Speech",
        description: "Challenge: transcribe rapid speech",
        type: "audio",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Quick update on the project status. We have completed phases one and two. Phase three begins next week. All team members should be prepared for the kickoff meeting.",
        audioSpeed: "fast"
      },
      {
        id: "a31",
        number: 31,
        title: "Audio - Medical Terminology",
        description: "Transcribe medical content",
        type: "audio",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "The patient presents with symptoms including elevated blood pressure and irregular heartbeat. Recommend further cardiovascular examination.",
        audioSpeed: "medium"
      },
      {
        id: "a32",
        number: 32,
        title: "Audio - Legal Proceedings",
        description: "Type legal testimony",
        type: "audio",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Please state your full name for the record. Do you swear to tell the truth, the whole truth, and nothing but the truth?",
        audioSpeed: "medium"
      },
      {
        id: "a33",
        number: 33,
        title: "Audio - Customer Service",
        description: "Transcribe service calls",
        type: "audio",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Thank you for calling customer support. How may I assist you today? Please provide your account number and a brief description of the issue.",
        audioSpeed: "medium"
      },
      {
        id: "a34",
        number: 34,
        title: "Audio - Conference Call",
        description: "Type meeting discussions",
        type: "audio",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Good morning everyone. Let's begin with the agenda for today's meeting. First item is the budget review, followed by project updates.",
        audioSpeed: "medium"
      },
      {
        id: "a35",
        number: 35,
        title: "Audio - Podcast Excerpt",
        description: "Transcribe podcast content",
        type: "audio",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Welcome back to the show. Today's topic is productivity and time management. Our guest will share valuable insights on maximizing efficiency.",
        audioSpeed: "fast"
      },
      {
        id: "a36",
        number: 36,
        title: "Audio - Multiple Speakers",
        description: "Type conversation with multiple people",
        type: "audio",
        targetWPM: 45,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Speaker one: What are your thoughts on this proposal? Speaker two: I believe it has potential, but we need more data. Speaker one: Agreed, let's review it again next week.",
        audioSpeed: "medium"
      },
      {
        id: "a37",
        number: 37,
        title: "Audio - Accents Challenge",
        description: "Transcribe various accents",
        type: "audio",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Understanding different accents is crucial for transcription work. Practice listening carefully to distinguish words clearly regardless of pronunciation variations.",
        audioSpeed: "medium"
      },
      {
        id: "a38",
        number: 38,
        title: "Audio - Background Noise",
        description: "Transcribe with ambient noise",
        type: "audio",
        targetWPM: 40,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "In real-world situations, you will encounter background noise. Focus on the primary speaker and filter out distractions to maintain accuracy.",
        audioSpeed: "medium"
      },
      {
        id: "a39",
        number: 39,
        title: "Audio - Rapid Fire Dictation",
        description: "Fast-paced transcription challenge",
        type: "audio",
        targetWPM: 55,
        targetAccuracy: 95,
        exercises: 5,
        audioText: "Attention all staff. Tomorrow's meeting has been rescheduled to two PM in conference room B. Please confirm your attendance by end of day.",
        audioSpeed: "fast"
      },
      {
        id: "a40",
        number: 40,
        title: "Audio - Final Transcription Test",
        description: "Comprehensive audio transcription exam",
        type: "audio",
        targetWPM: 50,
        targetAccuracy: 95,
        exercises: 10,
        audioText: "This is your final transcription assessment. Type accurately and maintain consistent speed. Remember all techniques you have learned throughout this course.",
        audioSpeed: "medium"
      },
      
      // Speed Mastery (41-45)
      {
        id: "a41",
        number: 41,
        title: "Speed Building - 70 WPM",
        description: "Push your speed to 70 WPM",
        type: "exercise",
        targetWPM: 70,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "advanced"
      },
      {
        id: "a42",
        number: 42,
        title: "Speed Building - 75 WPM",
        description: "Reach 75 WPM milestone",
        type: "exercise",
        targetWPM: 75,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "advanced"
      },
      {
        id: "a43",
        number: 43,
        title: "Speed Building - 80 WPM",
        description: "Achieve 80 WPM target",
        type: "exercise",
        targetWPM: 80,
        targetAccuracy: 95,
        exercises: 5,
        useSentences: true,
        sentenceType: "advanced"
      },
      {
        id: "a44",
        number: 44,
        title: "Accuracy Perfection",
        description: "Perfect accuracy challenge",
        type: "exercise",
        targetWPM: 70,
        targetAccuracy: 98,
        exercises: 5,
        useSentences: true,
        sentenceType: "advanced"
      },
      {
        id: "a45",
        number: 45,
        title: "Endurance Test - 5 Minutes",
        description: "Sustained typing for 5 minutes",
        type: "exercise",
        targetWPM: 70,
        targetAccuracy: 95,
        exercises: 3,
        duration: 300,
        useSentences: true,
        sentenceType: "advanced"
      },
      
      // Final Challenges (46-50)
      {
        id: "a46",
        number: 46,
        title: "Mixed Content Master",
        description: "All content types combined",
        type: "exercise",
        targetWPM: 75,
        targetAccuracy: 95,
        exercises: 10,
        useSentences: true,
        sentenceType: "mixed_advanced"
      },
      {
        id: "a47",
        number: 47,
        title: "Professional Document Sprint",
        description: "Type complete professional document",
        type: "exercise",
        targetWPM: 75,
        targetAccuracy: 95,
        exercises: 10,
        useSentences: true,
        sentenceType: "professional"
      },
      {
        id: "a48",
        number: 48,
        title: "Code Marathon",
        description: "Extended code typing session",
        type: "exercise",
        targetWPM: 70,
        targetAccuracy: 95,
        exercises: 10,
        useWords: true,
        wordList: ["function calculate()", "const data = []", "if (x > 0) {", "return value;", "for (let i = 0;", "while (true) {", "} else {", "class User {", "export default", "import React from"]
      },
      {
        id: "a49",
        number: 49,
        title: "Advanced Final Review",
        description: "Comprehensive skill review",
        type: "exercise",
        targetWPM: 80,
        targetAccuracy: 95,
        exercises: 15,
        useSentences: true,
        sentenceType: "comprehensive"
      },
      {
        id: "a50",
        number: 50,
        title: "Advanced Graduation Exam",
        description: "Final examination for advanced certification",
        type: "exercise",
        targetWPM: 90,
        targetAccuracy: 95,
        exercises: 20,
        useSentences: true,
        sentenceType: "comprehensive",
        isFinalExam: true
      }
    ]
  }
};

// Export for use in main file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ADVANCED_LESSONS;
}