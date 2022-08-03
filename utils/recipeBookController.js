//gets the recipe array from API and passes it as a parameter to the constructor of the RecipeBook class
async function getRecipes(recipesArray) {
    return new RecipeBook(recipesArray);
}


//show IngredientList in DOM
function displayIngredientList(recipesBook) {
    const ingredientList = recipesBook.getAllIngredientsRecipe();

    const dropdownContent = document.getElementById('ingredientsContent');
    const ul = document.createElement('ul');
    ingredientList.forEach(ingredient => {
        const li = document.createElement('li');
        dropdownContent.innerHTML = ''
        li.innerHTML = ingredient;
        li.classList.add('ingredientElement')
        ul.appendChild(li);
    })

    dropdownContent.appendChild(ul);
}

function displayApplicanceList(recipesBook) {
    const applianceList = recipesBook.getAllAppliancesRecipe();
    const dropdownContent = document.getElementById('appliancesContent');
    const ul = document.createElement('ul');
    applianceList.forEach(applicance => {
        const li = document.createElement('li');
        dropdownContent.innerHTML = ''
        li.innerHTML = applicance;
        li.classList.add('applianceElement')
        ul.appendChild(li);
    })

    dropdownContent.appendChild(ul);
}

function displayUstensilsList(recipesBook) {
    const ustensilsList = recipesBook.getUstentilsRecipe();

    const dropdownContent = document.getElementById('ustensilsContent');
    const ul = document.createElement('ul');
    ustensilsList.forEach(ustensils => {
        const li = document.createElement('li');
        dropdownContent.innerHTML = ''
        li.innerHTML = ustensils;
        li.classList.add('ustentsilElement')
        ul.appendChild(li);
    })

    dropdownContent.appendChild(ul);
}

//display the founded recipes in the DOM
function displaySearchRecipe(recipeBook) {
    document.getElementById('rechercher').addEventListener('keyup', ev => {
       const recipeSection = document.getElementById('recipeSection');
         const results = recipeBook.searchRecipe(document.getElementById('rechercher').value);
            recipeSection.innerHTML = '';
            showRecipe(recipeBook, results);
    })
}

// function displayFilterContent()

//display content of search filter
function displayFilterContent(recipesBook, elementId, dropdownId, color) {

    //switch case pour les paramètres
    //faire une map => key => elementId object=>dropdownId, et color
    // key => ingredient { dropdownId => value, color => value }
    //mettre tout en haut en global

    if(elementId === 'ingredient'){
        dropdownId = 'ingredientsContent';
        color = '3282F7'
    }

    document.getElementById(elementId).addEventListener('keyup', ev => {
        const dropdownContent = document.getElementById(dropdownId);
        const ul = document.createElement('ul');
        const results = recipesBook.searchFilter(document.getElementById(elementId));
        const filterContainer = document.getElementById('filterContainer');
        results.forEach(result => {
            const li = document.createElement('li');
            dropdownContent.innerHTML = ''
            li.innerHTML = result;
            ul.appendChild(li);
            li.addEventListener('click', function (e) {
                const pinnedFilter = document.createElement('div');
                pinnedFilter.id = 'pinnedFilter';
                const span = document.createElement('span');
                span.id = 'founded';
                const close = document.createElement('i')
                close.classList.add('fas', 'fa-times-circle');
                close.id = 'closeFilter'
                close.onclick = closeFilter;
                pinnedFilter.style = 'display: flex; background-color: #' + color +'; justify-content: space-between; align-items: center;'
                span.innerHTML = li.innerHTML;
                filterContainer.appendChild(pinnedFilter)
                pinnedFilter.appendChild(span);
                pinnedFilter.appendChild(close);
                //creer une fonction à part pour le click
            })
        })
        document.querySelector('nav').appendChild(filterContainer);
        dropdownContent.appendChild(ul);
    })

}

function closeFilter() {
    const pinnedFilter = document.getElementById('pinnedFilter');
    pinnedFilter.remove();
}

//display the recipe in the DOM
function showRecipe(recipesBook, results = false) {
    if (results) {
        const recipes = results;
    }
    const recipes = recipesBook.Recipes;
    //console.log(recipes)
    const body = document.querySelector('body')
    const section = document.getElementById('recipeSection');
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card');
        const empty = document.createElement('img');
        empty.src = 'https://via.placeholder.com/400x200';
        empty.classList.add('empty');

        const container = document.createElement('div');
        container.classList.add('container');
        const header = document.createElement('div');
        header.classList.add('card-header');
        card.appendChild(empty);
        header.appendChild(container);
        const h3 = document.createElement('h3');
        h3.classList.add('card-title');
        h3.innerHTML = truncate(recipe.name, 25);
        const time = document.createElement('h4');
        time.innerHTML = '<i class="fa-regular fa-clock"></i> ' + recipe.time + ' min';
        header.appendChild(h3)
        header.appendChild(time)
        card.appendChild(header);
        const ingredients = document.createElement('div');
        ingredients.classList.add('ingredients');
        const listElement = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            if (ingredient.quantity === '' || ingredient.quantity === undefined || ingredient.unit === '' || ingredient.unit === undefined) {
                li.innerHTML = ingredient.ingredient;
            } else {
                li.innerHTML = ingredient.ingredient + ' : ' + ingredient.quantity + ' ' + ingredient.unit;
            }
            listElement.appendChild(li);
            ingredients.appendChild(listElement);
            container.appendChild(ingredients)
        });

        const instructions = document.createElement('div');
        instructions.classList.add('instructions');
        const descriptionBloc = document.createElement('p');
        descriptionBloc.innerHTML = truncate(recipe.description, 150);
        instructions.appendChild(descriptionBloc);
        container.appendChild(instructions);


        section.appendChild(card)
        card.appendChild(container)

    })
    body.appendChild(section)
}

//mettre dans un fichier séparé
function truncate(str, n) {
    return (str.length > n) ? str.slice(0, n - 1) + '&hellip;' : str;
}

//init the app
async function init() {
    const recipesArray = await getArrayRecipe();
    const recipesBook = await getRecipes(recipesArray);
    displayIngredientList(recipesBook);
    displayUstensilsList(recipesBook);
    displayApplicanceList(recipesBook);
    displayFilterContent(recipesBook, 'ingredient', 'ingredientsContent', '3282F7');
    displayFilterContent(recipesBook, 'appareils', 'appliancesContent', '68D9A4');
    displayFilterContent(recipesBook, 'ustensiles', 'ustensilsContent', 'ed6454');
    displaySearchRecipe(recipesBook);
    showRecipe(recipesBook);

}


(function () {
    init()
})()
