class RecipeBook
{
    constructor(recipes) {
        this.recipes = recipes;
        this.ingredientArray = this.getAllIngredientsRecipe();
        this.ustensilsArray = this.getUstentilsRecipe();
        this.applicanceArray = this.getAllAppliancesRecipe();
    }

    get Recipes()
    {
        return this.recipes;
    }

    //rajouter une méthode searchQuelqueChose(type --> quel tableau de filtre, motRecherché --> coco ) retourne une liste d'élément --> refresh contenu du filtre dans le controller

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
        return ustentilsArray
    }

    searchRecipe(search) {
        return this.recipes.filter(recipe => recipe.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
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


    //le dropdown content doit recouvrir les inputs du dessous


}

