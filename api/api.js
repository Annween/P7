// fetch from recipes.json
 async function getArrayRecipe() {
    try{
        const response = await fetch('api/data/recipes.json')
        return await response.json()
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
 }

async function getFrenchDictionnary() {
    try{
        const response = await fetch('api/data/Francais.json')
        return await response.json()
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
}

// rewrite json array recipe by comparing each words with Francais.json file
 /*  async function spellCheck() {
        let arrayRecipe = await getArrayRecipe();
        let arrayFrancais = await getFrenchDictionnary();
        for (let i = 0; i < arrayRecipe.length; i++) {
            let recipe = arrayRecipe[i];
            for (let j = 0; j < arrayFrancais.length; j++) {
                let francais = arrayFrancais[j];
                if (recipe.name == francais) {
                    recipe.name = francais;
                }
                for (let k = 0; k < recipe.ingredients.length; k++) {
                    let ingredient = recipe.ingredients[k];
                    if (ingredient.ingredient == francais) {
                        ingredient.ingredient = francais;
                    }
                }
                if (recipe.appliance == francais) {
                    recipe.appliance = francais;
                }
                for (let l = 0; l < recipe.ustensils.length; l++) {
                    let ustensil = recipe.ustensils[l];
                    if (ustensil == francais) {
                        ustensil = francais;
                    }
                }
            }
        }
        return arrayRecipe;
    } */

