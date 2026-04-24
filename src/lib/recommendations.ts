"use client";

export type GoalType = 'lose-fat' | 'gain-weight' | 'build-muscle' | 'improve-fitness';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

export interface UserData {
  height: number;
  weight: number;
  targetWeight: number;
  goal: GoalType;
  activityLevel: ActivityLevel;
  sleepQuality: string;
  waterIntake: string;
  workoutExp: string;
  foodPreference: string;
}

export interface RecommendationResult {
  summary: string;
  fitness: string[];
  nutrition: string[];
  habits: string[];
  motivation: string;
}

export function generateRecommendations(data: UserData): RecommendationResult {
  const weightDiff = data.weight - data.targetWeight;
  const isLoss = weightDiff > 0;
  
  const result: RecommendationResult = {
    summary: "",
    fitness: [],
    nutrition: [],
    habits: [],
    motivation: ""
  };

  // Tone: Warm, Realistic, Modern
  if (data.goal === 'lose-fat') {
    result.summary = `Focusing on a sustainable ${Math.abs(weightDiff)}kg reduction through metabolic conditioning and mindful nourishment.`;
    result.fitness = [
      "High-Intensity Low-Impact Training (HILIT) to protect joints.",
      "Compound movements (squats, deadlifts) to maximize calorie burn.",
      "30-minute brisk morning walks in a fasted state.",
      "Progressive overload to maintain muscle mass while leaning out."
    ];
    result.nutrition = [
      "Prioritize high-volume, low-calorie density foods (greens, berries).",
      "Aim for 1.6g of protein per kg of body weight to feel full.",
      "Try 'Protein-First' eating—eat your protein before carbs.",
      "Incorporate complex carbs (sweet potato, oats) pre-workout only."
    ];
  } else if (data.goal === 'build-muscle' || data.goal === 'gain-weight') {
    result.summary = `Strategic hypertrophic growth targeting a clean ${Math.abs(weightDiff)}kg increase in lean tissue.`;
    result.fitness = [
      "Hypertrophy-focused lifting (8-12 reps per set).",
      "Prioritize heavy compound lifts at the start of sessions.",
      "Ensure 48-72 hours of recovery between the same muscle groups.",
      "Focus on time-under-tension (slow eccentrics)."
    ];
    result.nutrition = [
      "Slight caloric surplus—aim for 200-300 calories above maintenance.",
      "Consistent protein intake every 3-4 hours.",
      "Healthy fats (nuts, seeds, olive oil) for hormone support.",
      "Post-workout carbs are essential to replenish glycogen."
    ];
  } else {
    result.summary = "Enhancing functional capacity, cardiovascular efficiency, and overall vitality.";
    result.fitness = [
      "Functional patterns (push, pull, hinge, carry).",
      "Zone 2 cardio (conversational pace) for 150 mins/week.",
      "Mobility and flexibility work to enhance range of motion.",
      "Bodyweight mastery (pull-ups, push-ups, dips)."
    ];
    result.nutrition = [
      "Balanced macro distribution (40% carbs, 30% protein, 30% fats).",
      "Focus on 'The Rainbow'—diverse fruit and vegetable intake.",
      "Minimize processed sugars to maintain steady energy levels.",
      "Prioritize whole foods over supplements."
    ];
  }

  // Lifestyle adjustments
  if (data.sleepQuality === 'poor') {
    result.habits.push("Implement a 'Digital Sunset'—no screens 60 mins before bed.");
    result.habits.push("Keep your bedroom temperature below 20°C for deeper REM.");
  } else {
    result.habits.push("Maintain consistent wake-up times to stabilize circadian rhythm.");
  }

  if (data.waterIntake === 'low') {
    result.habits.push("Start your day with 500ml of water before coffee.");
    result.habits.push("Carry a 1L reusable bottle and aim for 2 refills.");
  }

  result.habits.push("Practice 5 minutes of mindful breathing to lower cortisol.");
  result.habits.push("Park further away or take stairs—non-exercise activity (NEAT) matters.");

  const motivations = [
    "Your future self is already thanking you for starting today.",
    "Small, consistent actions beat occasional intensity every time.",
    "Transformation is a series of tiny wins repeated daily.",
    "You don't have to be great to start, but you have to start to be great.",
    "Health is the ultimate luxury. Invest in yourself."
  ];
  result.motivation = motivations[Math.floor(Math.random() * motivations.length)];

  return result;
}
