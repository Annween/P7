// fetch from recipes.json
 async function getArrayRecipe() {
    try{
        const response = await fetch('api/data/recipes.json')
        const data =  await response.json()
        return data
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
 }
