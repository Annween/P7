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
        //prévoir le cas → si search = 0 On renvoie toutes les recettes
        const results = this.findSearchBarResults(search);
        return this.filterResults(results, filters);
    }

    filterResults(recipes, filters) {
        //il faut boucler sur les filtres
        if(Array.isArray(filters)) {
            console.log('c bon')
            console.log(recipes)
            filters.forEach(filter => {
                recipes = this.doFilter(recipes, filter)
                console.log(recipes)
            })

            console.log(recipes)
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

        if (this.ingredientArray.includes(filter)) {
           // console.log('ici c bon')
            return recipes.filter(recipe => recipe.ingredients.find(ingredient => ingredient.ingredient.toLocaleLowerCase() === filter))
        }
        else if(this.applicanceArray.includes(filter)) {
            return recipes.filter(recipe => recipe.appliance.toLocaleLowerCase().includes(filter))
        }
        else if(this.ustensilsArray.includes(filter)) {
            return recipes.filter(recipe => recipe.ustensils.toLocaleLowerCase().includes(filter))
        }
    }

    //rajouter une méthode searchQuelqueChose(type --> quel tableau de filtre, motRecherché --> coco ) retourne une liste d'élément --> refresh contenu du filtre dans le controller
    search(array, motRecherche, filter) {
        return array.filter(item => item.includes(motRecherche) && item.includes(filter))
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
               ToolsClass.sortArray(ingredientsArray)
           })
        })
        return ingredientsArray
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

