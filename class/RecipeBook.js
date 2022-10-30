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

    //initalize the search (on searchbar or on filter or both)
    doSearch(search, filters) {
        const results = this.findSearchBarResults(search);
        return this.filterResults(results, filters);

    }

    filterResults(recipes, filters) {
        if(Array.isArray(filters)) {
            filters.forEach(filter => {
                recipes = this.doFilter(recipes, filter)
            })
        }

        return recipes;
    }

    findSearchBarResults(search) {
        if (!search){
            return this.recipes;
        }

        //filter must sync each other (ingredients, appliances, ustensils)
        //return console.log(this.recipes.filter(recipe => {
        //    return recipe.name.toLocaleLowerCase().includes(search) || recipe.name.toLocaleLowerCase().includes(search + 's') || recipe.name.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search || recipe.name.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search + 's' || recipe.ingredients.find(ingredient => ingredient.ingredient.toLocaleLowerCase().includes(search) || ingredient.ingredient.toLocaleLowerCase().includes(search + 's') || ingredient.ingredient.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search || ingredient.ingredient.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search + 's') || recipe.appliance.toLocaleLowerCase().includes(search) || recipe.appliance.toLocaleLowerCase().includes(search + 's') || recipe.appliance.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search || recipe.appliance.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search + 's' || recipe.ustensils.find(ustensil => ustensil.toLocaleLowerCase().includes(search) || ustensil.toLocaleLowerCase().includes(search + 's') || ustensil.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search || ustensil.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === search + 's')
        //}));
        return this.recipes.filter(recipe => recipe.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||  recipe.ingredients.find(ingredient => ingredient.ingredient.toLocaleLowerCase().includes(search.toLocaleLowerCase())))


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

            return recipes.filter(recipe => recipe.ustensils.find(ustensil => ustensil.toLocaleLowerCase().includes(filter) || ustensil.toLocaleLowerCase().includes(filter + 's') || ustensil.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter || ustensil.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === filter  + 's'))

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
        //const noPlural = ToolsClass.removePlural(sortedArray)
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
        //const noPlural = ToolsClass.removePlural(noAccentsArray)
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
        //const noPlural = ToolsClass.removePlural(noAccentsArray)
        return ToolsClass.removeDuplicates(noAccentsArray)
    }


    //search among filters when typing in a filter searchbar
     searchFilter(elementId, searchInput = '') {
         switch (elementId.id) {
             case 'ingredient':
                 return this.ingredientArray.filter(item => item.includes(elementId.value))
             case 'appareils':
                 return this.applicanceArray.filter(item => item.includes(elementId.value))
             case 'ustensiles':
                 return this.ustensilsArray.filter(item =>  item.includes(elementId.value))

             case 'ingredient' && searchInput !== '':
                 return this.ingredientArray.filter(item => item.includes(searchInput))
             case 'appareils' && searchInput !== '':
                 return this.applicanceArray.filter(item => item.includes(searchInput))
             case 'ustensiles' && searchInput !== '':
                 return this.ustensilsArray.filter(item =>  item.includes(searchInput))
         }

     }



}

