//declare global variables for filters
const filtersConfig = {
    ingredient: {
        dropdownId: 'ingredientsContent', color: '3282F7'
    }, appareils: {
        dropdownId: 'appliancesContent', color: '68D9A4'
    }, ustensiles: {
        dropdownId: 'ustensilsContent', color: 'ed6454'
    }
}

const selectedFilters = [];

//gets the recipe array from API and passes it as a parameter to the constructor of the RecipeBook class
async function getRecipes(recipesArray) {
    return new RecipeBook(recipesArray);
}

async function getToolsClass() {
    return new ToolsClass();
}

//show IngredientList in DOM
function displayIngredientList(recipesBook, toolsClass) {

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
        const results = recipeBook.doSearch(document.getElementById('rechercher').value);
        showRecipe(recipeBook, results);
    })
}

// function displayFilterContent()

//display content of search filter
function displayFilterContent(recipesBook, elementId, dropdownId, color) {

    document.getElementById(elementId).addEventListener('keyup', ev => {
        const dropdownContent = document.getElementById(dropdownId);
        const ul = document.createElement('ul');
        //search among filters when typing in a filter searchbar
        const filteredFilters = recipesBook.searchFilter(document.getElementById(elementId));
        const filterContainer = document.getElementById('filterContainer');
        filteredFilters.forEach(fltr => {
            const li = document.createElement('li');
            dropdownContent.innerHTML = ''
            li.innerHTML = fltr;
            ul.appendChild(li);
            li.addEventListener('click', function (e) {
                const pinnedFilter = document.createElement('div');
                pinnedFilter.classList.add('pinnedFilter');
                pinnedFilter.id = fltr;
                const span = document.createElement('span');
                //span.id = fltr;
                const close = document.createElement('i')
                close.classList.add('fa-regular', 'fa-times-circle', 'closeFilter');
                close.onclick = closeFilter(pinnedFilter.id);
                pinnedFilter.style = 'display: flex; background-color: #' + color + '; justify-content: space-between; align-items: center; margin-right: 10px'
                span.innerHTML = fltr;
                filterContainer.appendChild(pinnedFilter)
                pinnedFilter.appendChild(span);
                pinnedFilter.appendChild(close);
                searchWithFilter(recipesBook, [fltr]);
            })
        })
        document.querySelector('nav').appendChild(filterContainer);
        dropdownContent.appendChild(ul);
    })
}

//display the recipe with required criteria
function searchWithFilter(recipesBook, filters) {
    if (document.getElementById('rechercher').value.length > 0) {
        const results = recipesBook.doSearch(document.getElementById('rechercher').value, filters);
        return showRecipe(recipesBook, results);
    } else {
        const results = recipesBook.doSearch('', filters);
        return showRecipe(recipesBook, results);
    }
}


function closeFilter(id) {
    return function () {
        document.getElementById(id).remove();
    }
}

//display the recipe in the DOM
function showRecipe(recipesBook, results = false) {
    let recipes = recipesBook.Recipes;

    if (results) {
        recipes = results;
    }
    const body = document.querySelector('body')
    const section = document.getElementById('recipeSection');
    section.innerHTML = '';
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card');
        const empty = document.createElement('img');
        empty.src = 'http://via.placeholder.com/400x200';
        empty.classList.add('empty');

        const container = document.createElement('div');
        container.classList.add('container');
        const header = document.createElement('div');
        header.classList.add('card-header');
        card.appendChild(empty);
        header.appendChild(container);
        const h3 = document.createElement('h3');
        h3.classList.add('card-title');
        h3.innerHTML = ToolsClass.truncate(recipe.name, 25);
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
                li.innerHTML = '<b>' + ingredient.ingredient + '</b>';
            } else {
                li.innerHTML = '<b>' + ingredient.ingredient + '</b>' + ' : ' + ingredient.quantity + ' ' + ingredient.unit;
            }
            listElement.appendChild(li);
            ingredients.appendChild(listElement);
            container.appendChild(ingredients)
        });


        const instructions = document.createElement('div');
        instructions.classList.add('instructions');
        const descriptionBloc = document.createElement('p');
        descriptionBloc.innerHTML = ToolsClass.truncate(recipe.description, 150);
        instructions.appendChild(descriptionBloc);
        container.appendChild(instructions);

        section.appendChild(card)
        card.appendChild(container)

    })
    body.appendChild(section)
}


//init the app
async function init() {
    const recipesArray = await getArrayRecipe();
    const recipesBook = await getRecipes(recipesArray);
    const toolsClass = await getToolsClass();
    displayIngredientList(recipesBook, toolsClass);
    displayUstensilsList(recipesBook);
    displayApplicanceList(recipesBook);
    for (const key in filtersConfig) displayFilterContent(recipesBook, key, filtersConfig[key].dropdownId, filtersConfig[key].color);
    displaySearchRecipe(recipesBook);
    showRecipe(recipesBook);
    //closeFilter();
}


(function () {
    init()
})()
