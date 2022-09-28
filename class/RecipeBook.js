class RecipeBook
{
    constructor(recipes) {
        this.recipes = recipes;
        this.ingredientArray = this.getAllIngredientsRecipe();
        this.ustensilsArray = this.getUstentilsRecipe();
        this.applicanceArray = this.getAllAppliancesRecipe();
    }

    get Recipes() {
        return this.recipes;
    }


    doSearch(search, filters) {
        const results = this.findSearchBarResults(search);
        return this.filterResults(results, filters);
    }

    filterResults(recipes, filters) {
        //il faut boucler sur les filtres
        if(Array.isArray(filters)) {
            filters.forEach(filter => {
                recipes = this.doFilter(recipes, filter)
            })
        }
        if(filters.length === 0) {
            return this.recipes
        }
        return recipes;
    }

    findSearchBarResults(search) {
        if (!search){
            return this.recipes;
        }
        return this.recipes.filter(recipe => recipe.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }




    doFilter(recipes = false, filter) {
        if (!recipes) {
            recipes = this.recipes;
        }
        const forbiddenWords = ToolsClass.excludedWords();
        if (this.ingredientArray.includes(filter)) {
            console.log(forbiddenWords.includes(filter))
            return recipes.filter(recipe => recipe.ingredients.find(ingredient => ingredient.ingredient.toLocaleLowerCase() === filter || ingredient.ingredient.toLocaleLowerCase() === filter + 's' || forbiddenWords.includes(filter) === true))
        }
        else if(this.applicanceArray.includes(filter)) {
            return recipes.filter(recipe => recipe.appliance.toLocaleLowerCase().includes(filter) || recipe.appliance.toLocaleLowerCase().includes(filter + 's'))
        }
        else if(this.ustensilsArray.includes(filter)) {
            return recipes.filter(recipe => recipe.ustensils.includes(filter) || recipe.ustensils.includes(filter + 's'))
        }
    }

    //sort array by ingredients
    getAllIngredientsRecipe() {

       let ingredientsArray = [];
        let ingredientSet = new Set();

        this.recipes.forEach(recipe =>
        {
           recipe.ingredients.forEach(ingredientsRecipe =>
           {
                ingredientSet.add(ingredientsRecipe.ingredient.toLocaleLowerCase())
                ingredientsArray = Array.from(ingredientSet)
               const cleanedArray =  ToolsClass.sortArray(ingredientsArray)
               return ToolsClass.removeDuplicates(cleanedArray)
           })
        })
        return ToolsClass.noAccents(ingredientsArray)
    }


    //sort array by appliances
    getAllAppliancesRecipe()
    {
        let applianceArray = [];
        let applianceSet = new Set();

        this.recipes.forEach(recipe =>
        {
            applianceSet.add(recipe.appliance.toLocaleLowerCase())
            applianceArray = Array.from(applianceSet)
            ToolsClass.sortArray(applianceArray)
            ToolsClass.noAccents(applianceArray)
            ToolsClass.removeDuplicates(applianceArray)
        })
        return applianceArray
    }

    //sort array by ustensils
    getUstentilsRecipe()
    {
        let ustentilsArray;
        let ustentilsSet = new Set();
        this.recipes.forEach(recipe =>
        {
            recipe.ustensils.forEach(ustensil =>
            {
                ustentilsSet.add(ustensil.toLocaleLowerCase())
            })
        })
        ustentilsArray = Array.from(ustentilsSet)
        ToolsClass.sortArray(ustentilsArray)
        ToolsClass.noAccents(ustentilsArray)
        ToolsClass.removeDuplicates(ustentilsArray)
        return ustentilsArray
    }



    //faire un switch case
     searchFilter(elementId) {
         switch (elementId.id) {
             case 'ingredient':
                 return this.ingredientArray.filter(item => item.includes(elementId.value))
             case 'appareils':
                 return this.applicanceArray.filter(item => item.includes(elementId.value))
             case 'ustensiles':
                 return this.ustensilsArray.filter(item =>  item.includes(elementId.value))
         }

     }



}

