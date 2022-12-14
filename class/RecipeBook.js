class RecipeBook {
    constructor(recipes) {
        this.recipes = recipes;
        this.ingredientArray = this.getAllIngredientsRecipe();
        this.ustensilsArray = this.getUstentilsRecipe();
        this.applicanceArray = this.getAllAppliancesRecipe();
    }

    get Recipes() {
        return this.recipes;
    }

    //initalize the search (on searchbar or on filter or both)
    doSearch(search, filters) {
        const results = this.findSearchBarResults(search);
        return this.filterResults(results, filters);

    }

    filterResults(recipes, filters) {
        if (Array.isArray(filters)) {
            filters.forEach(filter => {
                recipes = this.doFilter(recipes, filter)
            })
        }

        return recipes;
    }

    findSearchBarResults(search) {
        if (!search) {
            return this.recipes;
        }

        if(search.length >= 3) {
            return this.recipes.filter(recipe => recipe.name.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(search.toLocaleLowerCase()) || recipe.description.toLocaleLowerCase().includes(search) || recipe.ingredients.find(ingredient => ingredient.ingredient.toLocaleLowerCase().includes(search.toLocaleLowerCase())))
        }
    }


    doFilter(recipes = false, filter) {
        if (!recipes) {
            recipes = this.recipes;
        }
        //check if there is a match between the filter and the recipe else go to the next if

        let check = [];

            if (this.ingredientArray.includes(filter)) {
                check =  recipes.filter(recipe => recipe.ingredients.find(ingredient => ingredient.ingredient.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter))
                //if check === false go to the next if
                if(check.length > 0) {
                    return check;
                }
            }

        if (this.applicanceArray.includes(filter)) {
                check = recipes.filter(recipe => recipe.appliance.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter)
                if(check.length > 0) {
                    return check;
                }
            }

        if (this.ustensilsArray.includes(filter)) {
            check = recipes.filter(recipe => recipe.ustensils.find(ustensil => ustensil.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter))
            if(check.length > 0) {
                return check;
            }
        }



        //this.doFilter(recipes, filter);

    }

    //sorting array by ingredients
    getAllIngredientsRecipe() {

        let ingredientsArray = [];
        let ingredientSet = new Set();

        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredientsRecipe => {
                ingredientSet.add(ingredientsRecipe.ingredient.toLocaleLowerCase())

            })
        })
        ingredientsArray = Array.from(ingredientSet)
        const sortedArray = ToolsClass.sortArray(ingredientsArray)
        //const noPlural = ToolsClass.removePlural(sortedArray)
        const noAccentsArray = ToolsClass.removeDuplicates(sortedArray)
        return ToolsClass.noAccents(noAccentsArray)

    }


    //sorting array by appliances
    getAllAppliancesRecipe() {
        let applianceArray = [];
        let applianceSet = new Set();

        this.recipes.forEach(recipe => {
            applianceSet.add(recipe.appliance.toLocaleLowerCase())
            //remove . from appliance name
            applianceSet.forEach(appliance => {
                    if (appliance.includes('.')) {
                        applianceSet.delete(appliance)
                        applianceSet.add(appliance.replace('.', ''))
                    }
                }
            )
        })
        applianceArray = Array.from(applianceSet)

        const sortedArray = ToolsClass.sortArray(applianceArray)
        const noAccentsArray = ToolsClass.noAccents(sortedArray)
        //const noPlural = ToolsClass.removePlural(noAccentsArray)
        return ToolsClass.removeDuplicates(noAccentsArray)
    }

    //sorting array by ustensils
    getUstentilsRecipe() {
        let ustentilsArray;
        let ustentilsSet = new Set();
        this.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                ustentilsSet.add(ustensil.toLocaleLowerCase())
            })
        })

        ustentilsArray = Array.from(ustentilsSet)
        const sortedArray = ToolsClass.sortArray(ustentilsArray)
        const noAccentsArray = ToolsClass.noAccents(sortedArray)
        //const noPlural = ToolsClass.removePlural(noAccentsArray)
        return ToolsClass.removeDuplicates(noAccentsArray)
    }


    //search among filters when typing in a filter searchbar
    searchFilter(elementId) {
        if(elementId.value.length >= 3) {
            switch (elementId.id) {
                case 'ingredient':
                    return this.ingredientArray.filter(item => item.includes(elementId.value))
                case 'appareils':
                    return this.applicanceArray.filter(item => item.includes(elementId.value))
                case 'ustensiles':
                    return this.ustensilsArray.filter(item => item.includes(elementId.value))

            }
        }

    }


}

