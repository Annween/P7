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

