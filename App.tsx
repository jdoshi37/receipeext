
import React, { useState, useCallback } from 'react';
import { RecipeExtractor } from './components/RecipeExtractor';
import { SavedRecipesList } from './components/SavedRecipesList';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Recipe } from './types';
import { ChefHatIcon } from './components/icons';

const App: React.FC = () => {
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>('savedRecipes', []);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSaveRecipe = useCallback((recipe: Recipe) => {
    if (!savedRecipes.some(r => r.url === recipe.url)) {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  }, [savedRecipes, setSavedRecipes]);

  const handleDeleteRecipe = useCallback((url: string) => {
    setSavedRecipes(savedRecipes.filter(r => r.url !== url));
    if (selectedRecipe?.url === url) {
        setSelectedRecipe(null);
    }
  }, [savedRecipes, setSavedRecipes, selectedRecipe]);

  const handleSelectRecipe = useCallback((recipe: Recipe) => {
      setSelectedRecipe(recipe);
      // Scroll to the top to see the selected recipe
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-brand-light to-amber-50 text-brand-text">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-20 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ChefHatIcon className="h-9 w-9 text-brand-primary" />
            <h1 className="text-3xl font-bold font-serif bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text animate-gradient-x">
              Recipe Extractor
            </h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <RecipeExtractor
                onSave={handleSaveRecipe}
                initialRecipe={selectedRecipe}
                isRecipeSaved={(url) => savedRecipes.some(r => r.url === url)}
            />
          </div>
          <div className="lg:col-span-1 lg:sticky lg:top-28">
            <SavedRecipesList
              recipes={savedRecipes}
              onSelect={handleSelectRecipe}
              onDelete={handleDeleteRecipe}
            />
          </div>
        </div>
      </main>

      <footer className="text-center py-8 mt-10 border-t border-gray-200/80">
          <p className="text-sm text-gray-600">
              Crafted with love by Janmejay using combination of AI tools.
          </p>
      </footer>
    </div>
  );
};

export default App;