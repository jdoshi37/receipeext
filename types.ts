
export interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
  url: string; // The source URL of the recipe
}

export interface GeminiRecipe {
    title: string;
    ingredients: string[];
    instructions: string[];
}