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

    //replaced by for

    filterResults(recipes, filters) {
        //il faut boucler sur les filtres
        if(Array.isArray(filters)) {
            for (let i = 0; i < filters.length; i++) {
                recipes = this.doFilter(recipes, filters[i])
            }
        }

        return recipes;
    }

    //replace by for loop
    findSearchBarResults(search) {
        for (let i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i].name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return this.recipes[i];
            }
        }
    }




    doFilter(recipes = false, filter) {
        if (!recipes) {
            recipes = this.recipes;
        }

        if (this.ingredientArray.includes(filter)) {
            for (let i = 0; i < recipes.length; i++) {
                for (let j = 0; j < recipes[i].ingredients.length; j++) {
                    if (recipes[i].ingredients[j].ingredient.toLocaleLowerCase() === filter || recipes[i].ingredients[j].ingredient.toLocaleLowerCase() === filter + 's') {
                        return recipes[i]
                    }
                }
            }
        }
        else if(this.applicanceArray.includes(filter)) {
            for (let i = 0; i < recipes.length; i++) {
                if (recipes[i].appliance.toLocaleLowerCase().includes(filter)) {
                    return recipes[i]
                }

            }
        }
        else if(this.ustensilsArray.includes(filter)) {
            for (let i = 0; i < recipes.length; i++) {
                if (recipes[i].ustensils.includes(filter)) {
                    return recipes[i]
                }
            }
        }

    }

    //sort array by ingredients
    getAllIngredientsRecipe() {

        let ingredientsArray = [];
        let ingredientSet = new Set();

        for (let i = 0; i < this.recipes.length; i++) {
            for (let j = 0; j < this.recipes[i].ingredients.length; j++) {
                ingredientSet.add(this.recipes[i].ingredients[j].ingredient.toLocaleLowerCase())
            }
        }
        ingredientsArray = Array.from(ingredientSet)
        ToolsClass.sortArray(ingredientsArray)
        ToolsClass.removeDuplicates(ingredientsArray)
        ToolsClass.noAccents(ingredientsArray)
        return ingredientsArray
    }


    //sort array by appliances
    getAllAppliancesRecipe()
    {
        let applianceArray = [];
        let applianceSet = new Set();

        for (let i = 0; i < this.recipes.length; i++) {
            applianceSet.add(this.recipes[i].appliance.toLocaleLowerCase())
        }
        applianceArray = Array.from(applianceSet)
        ToolsClass.sortArray(applianceArray)
        ToolsClass.noAccents(applianceArray)
        ToolsClass.removeDuplicates(applianceArray)
        return applianceArray
    }

    //sort array by ustensils
    getUstentilsRecipe()
    {
        let ustentilsArray;
        let ustentilsSet = new Set();
        for (const recipe of this.recipes) {
            for (const ustensil of recipe.ustensils) {
                ustentilsSet.add(ustensil.toLocaleLowerCase())
            }
        }
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


