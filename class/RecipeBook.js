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
        if(!search) {
            return this.recipes;
        }
        const array = [];
        for (let i = 0; i < this.recipes.length; i++) {
            if (this.recipes[i].name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                 array.push(this.recipes[i]);
            }

        }
        return array;
    }

    doFilter(recipes = false, filter) {
        if (!recipes) {
            recipes = this.recipes;
        }

        if (this.ingredientArray.includes(filter)) {
            return recipes.filter(recipe => recipe.ingredients.find(ingredient => ingredient.ingredient.toLocaleLowerCase() === filter || ingredient.ingredient.toLocaleLowerCase() === filter + 's' || ingredient.ingredient.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter || ingredient.ingredient.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter  + 's'))

        }
        else if(this.applicanceArray.includes(filter)) {
            return recipes.filter(recipe => recipe.appliance.toLocaleLowerCase().includes(filter) || recipe.appliance.toLocaleLowerCase().includes(filter + 's') || recipe.appliance.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter || recipe.appliance.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter  + 's')
        }
        else if(this.ustensilsArray.includes(filter)) {
            return recipes.filter(recipe => recipe.ustensils === filter || recipe.ustensils === filter + 's' || recipe.ustensils.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter || recipe.ustensils.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter  + 's')

        }

    }

    //sorting array by ingredients
    getAllIngredientsRecipe() {

        let ingredientsArray = [];
        let ingredientSet = new Set();

        this.recipes.forEach(recipe =>
        {
            recipe.ingredients.forEach(ingredientsRecipe =>
            {
                ingredientSet.add(ingredientsRecipe.ingredient.toLocaleLowerCase())

            })
        })
        ingredientsArray = Array.from(ingredientSet)
        const sortedArray =  ToolsClass.sortArray(ingredientsArray)
        const noAccentsArray = ToolsClass.removeDuplicates(sortedArray)
        return ToolsClass.noAccents(noAccentsArray)

    }



    //sorting array by appliances
    getAllAppliancesRecipe()
    {
        let applianceArray = [];
        let applianceSet = new Set();

        this.recipes.forEach(recipe =>
        {
            applianceSet.add(recipe.appliance.toLocaleLowerCase())
            //remove . from appliance name
            applianceSet.forEach(appliance => {
                    if(appliance.includes('.')) {
                        applianceSet.delete(appliance)
                        applianceSet.add(appliance.replace('.', ''))
                    }
                }
            )
        })
        applianceArray = Array.from(applianceSet)

        const sortedArray =  ToolsClass.sortArray(applianceArray)
        const noAccentsArray = ToolsClass.noAccents(sortedArray)
        return ToolsClass.removeDuplicates(noAccentsArray)
    }

    //sorting array by ustensils
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
        const sortedArray = ToolsClass.sortArray(ustentilsArray)
        const noAccentsArray = ToolsClass.noAccents(sortedArray)
        return ToolsClass.removeDuplicates(noAccentsArray)
    }


    //search among filters when typing in a filter searchbar
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


