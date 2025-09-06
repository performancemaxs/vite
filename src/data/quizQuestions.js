export const quizQuestions = [
  {
    id: 1,
    text: "I like to solve complex problems",
    category: "logic"
  },
  {
    id: 2,
    text: "I prefer learning through hands-on experience",
    category: "reaction"
  },
  {
    id: 3,
    text: "I enjoy analyzing patterns and relationships",
    category: "logic"
  },
  {
    id: 4,
    text: "I can easily remember sequences of numbers",
    category: "memory"
  },
  {
    id: 5,
    text: "I think quickly under pressure",
    category: "speed"
  },
  {
    id: 6,
    text: "I notice details that others often miss",
    category: "concentration"
  },
  {
    id: 7,
    text: "I enjoy working with abstract concepts",
    category: "logic"
  },
  {
    id: 8,
    text: "I can concentrate for long periods without distraction",
    category: "concentration"
  },
  {
    id: 9,
    text: "I prefer logical reasoning over intuitive thinking",
    category: "logic"
  },
  {
    id: 10,
    text: "I enjoy puzzles and brain teasers",
    category: "logic"
  },
  {
    id: 11,
    text: "I can visualize objects rotating in my mind",
    category: "memory"
  },
  {
    id: 12,
    text: "I learn new concepts faster than most people",
    category: "speed"
  },
  {
    id: 13,
    text: "I enjoy finding creative solutions to problems",
    category: "logic"
  },
  {
    id: 14,
    text: "I can hold multiple ideas in my mind simultaneously",
    category: "memory"
  },
  {
    id: 15,
    text: "I prefer systematic approaches to problem-solving",
    category: "concentration"
  },
  {
    id: 16,
    text: "I enjoy mathematical calculations and formulas",
    category: "logic"
  },
  {
    id: 17,
    text: "I can quickly identify cause-and-effect relationships",
    category: "speed"
  },
  {
    id: 18,
    text: "I enjoy debates and logical arguments",
    category: "logic"
  },
  {
    id: 19,
    text: "I can easily understand complex instructions",
    category: "memory"
  },
  {
    id: 20,
    text: "I prefer working with facts rather than opinions",
    category: "logic"
  },
  {
    id: 21,
    text: "I enjoy organizing information into categories",
    category: "concentration"
  },
  {
    id: 22,
    text: "I can quickly spot errors in reasoning",
    category: "speed"
  },
  {
    id: 23,
    text: "I enjoy learning about how things work",
    category: "logic"
  },
  {
    id: 24,
    text: "I can easily adapt my thinking to new situations",
    category: "reaction"
  },
  {
    id: 25,
    text: "I prefer challenging mental tasks over easy ones",
    category: "logic"
  },
  {
    id: 26,
    text: "I work better in teams than alone",
    category: "social"
  },
  {
    id: 27,
    text: "I prefer structured environments over flexible ones",
    category: "social"
  },
  {
    id: 28,
    text: "I enjoy taking leadership roles",
    category: "social"
  },
  {
    id: 29,
    text: "I am comfortable with uncertainty and ambiguity",
    category: "reaction"
  },
  {
    id: 30,
    text: "I prefer practical applications over theoretical concepts",
    category: "social"
  },
  {
    id: 31,
    text: "What is your education level?",
    category: "demographic",
    type: "education",
    options: [
      "Some high school",
      "High school diploma", 
      "College/trade school",
      "Bachelor's degree",
      "Graduate degree"
    ]
  }
];

export const answerOptions = [
  { value: 1, label: "Strongly Disagree", color: "bg-pink-200 hover:bg-pink-300" },
  { value: 2, label: "Disagree", color: "bg-teal-200 hover:bg-teal-300" },
  { value: 3, label: "Neutral", color: "bg-purple-200 hover:bg-purple-300" },
  { value: 4, label: "Agree", color: "bg-yellow-200 hover:bg-yellow-300" },
  { value: 5, label: "Strongly Agree", color: "bg-blue-200 hover:bg-blue-300" }
];

export const calculateIQ = (responses) => {
  const categoryScores = {
    memory: [],
    speed: [],
    reaction: [],
    concentration: [],
    logic: []
  };

  // Group responses by category
  responses.forEach((response, index) => {
    const question = quizQuestions[index];
    if (question.category !== 'demographic' && question.category !== 'social') {
      categoryScores[question.category].push(response);
    }
  });

  // Calculate average for each category
  const averages = {};
  Object.keys(categoryScores).forEach(category => {
    const scores = categoryScores[category];
    averages[category] = scores.length > 0 
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length 
      : 3;
  });

  // Calculate overall average
  const overallAverage = Object.values(averages).reduce((sum, avg) => sum + avg, 0) / 5;

  // Convert to IQ score (scale 1-5 to 70-145)
  let iqScore = Math.round(70 + (overallAverage - 1) * 18.75);

  // Apply education modifier
  const educationResponse = responses[30]; // Question 31 (index 30)
  const educationModifiers = [-5, 0, 3, 5, 8];
  if (educationResponse >= 1 && educationResponse <= 5) {
    iqScore += educationModifiers[educationResponse - 1];
  }

  // Ensure score is within reasonable bounds
  iqScore = Math.max(70, Math.min(145, iqScore));

  return {
    overallIQ: iqScore,
    categoryScores: {
      memory: Math.round(averages.memory * 20 + 20),
      speed: Math.round(averages.speed * 20 + 20),
      reaction: Math.round(averages.reaction * 20 + 20),
      concentration: Math.round(averages.concentration * 20 + 20),
      logic: Math.round(averages.logic * 20 + 20)
    },
    percentile: Math.round((iqScore - 70) / 75 * 100)
  };
};

