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
function displayIngredientList(recipesBook) {

    const ingredientList = recipesBook.getAllIngredientsRecipe();

    const dropdownContent = document.getElementById('ingredientsContent');
    const ul = document.createElement('ul');
    ingredientList.forEach(ingredient => {
        //display only singular ingredients
        if (ingredient === ingredient.replace(/s$/, '')) {

            const li = document.createElement('li');
            dropdownContent.innerHTML = ''
            li.innerHTML = ingredient;
            li.classList.add('ingredientElement')
            ul.appendChild(li);
        }
    })

    dropdownContent.appendChild(ul);
}

function displayApplicanceList(recipesBook) {
    const applianceList = recipesBook.getAllAppliancesRecipe();
    const dropdownContent = document.getElementById('appliancesContent');
    const ul = document.createElement('ul');
    applianceList.forEach(applicance => {
        if (applicance === applicance.replace(/s$/, '')) {
            const li = document.createElement('li');
            dropdownContent.innerHTML = ''
            li.innerHTML = applicance;
            li.classList.add('applianceElement')
            ul.appendChild(li);
        }
    })

    dropdownContent.appendChild(ul);
}

function displayUstensilsList(recipesBook) {
    const ustensilsList = recipesBook.getUstentilsRecipe();

    const dropdownContent = document.getElementById('ustensilsContent');
    const ul = document.createElement('ul');
    ustensilsList.forEach(ustensils => {
        if (ustensils === ustensils.replace(/s$/, '')) {
            const li = document.createElement('li');
            dropdownContent.innerHTML = ''
            li.innerHTML = ustensils;
            li.classList.add('ustentsilElement')
            ul.appendChild(li);
        }
    })

    dropdownContent.appendChild(ul);
}

//display the founded recipes in the DOM
function searchBar(recipeBook) {
    document.getElementById('rechercher').addEventListener('keyup', ev => {
        const results = recipeBook.doSearch(document.getElementById('rechercher').value);
        showRecipe(recipeBook, results);

    })
    return document.getElementById('rechercher').value;
}


//display content of search filter
function displayFilterContent(recipesBook, elementId, dropdownId, color) {
    document.getElementById(elementId).addEventListener('keyup', ev => {
        const dropdownContent = document.getElementById(dropdownId);
        const ul = document.createElement('ul');
        //search among filters when typing in a filter searchbar
        const filteredFilters = recipesBook.searchFilter(document.getElementById(elementId));
        const filterContainer = document.getElementById('filterContainer');
        filteredFilters.forEach(fltr => {
            if (fltr === fltr.replace(/s$/, '')) {
                const li = document.createElement('li');
                dropdownContent.innerHTML = ''
                li.innerHTML = fltr;
                ul.appendChild(li);
                //faire une fonction à part
                li.addEventListener('click', (e) => {
                    const pinnedFilter = document.createElement('div');
                    pinnedFilter.classList.add('pinnedFilter');
                    pinnedFilter.id = fltr;
                    const span = document.createElement('span');
                    //span.id = fltr;
                    const close = document.createElement('i')
                    close.classList.add('fa-regular', 'fa-times-circle', 'closeFilter');
                    close.onclick = () => {
                        this.synchronizeFilters(selectedFilters, pinnedFilter.id, recipesBook);
                        document.getElementById(pinnedFilter.id).remove();
                    }
                    pinnedFilter.style = 'display: flex; background-color: #' + color + '; justify-content: space-between; align-items: center; margin-right: 10px'
                    span.innerHTML = fltr;
                    filterContainer.appendChild(pinnedFilter)
                    pinnedFilter.appendChild(span);
                    pinnedFilter.appendChild(close);
                    selectedFilters.push(fltr);
                    searchWithFilters(recipesBook, selectedFilters);

                })
            }
        })


        document.querySelector('nav').appendChild(filterContainer);
        dropdownContent.appendChild(ul);
    })

}

//if the user clicks on the remove croce, it will be removed from the list of selected filters
function synchronizeFilters(selectedFilters, id, recipesBook) {
    selectedFilters.splice(selectedFilters.indexOf(id), 1);
    if (selectedFilters.length === 0) {
        return showRecipe(recipesBook);
    }
}


//display the recipe with required criteria
function searchWithFilters(recipesBook, filters) {
    //const searchBar = this.searchBar(recipesBook);
    /*if (searchBar && filters) {
        const results = recipesBook.doSearch(searchBar, filters);
        showRecipe(recipesBook, results);
    }*/
    if (document.getElementById('rechercher').value.length > 0) {
        const results = recipesBook.doSearch(document.getElementById('rechercher').value, filters);
        showRecipe(recipesBook, results);
    } else {
        const results = recipesBook.doSearch('', filters);
        return showRecipe(recipesBook, results);
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
            if (ingredient.quantity === '' || ingredient.quantity === undefined) {
                li.innerHTML = '<b>' + ingredient.ingredient + '</b>';
            } else if (ingredient.unit === '' || ingredient.unit === undefined) {
                li.innerHTML = ingredient.quantity + ' ' + '<b>' + ingredient.ingredient + '</b> ';
            } else {
                // if(ingredient.quantity === 1 && ingredient.unit.slice(-1) === 's') li.innerHTML =  ingredient.quantity + ' ' + '<b>' + ingredient.unit.replace(/s$/, '') + '</b> ' ;
                li.innerHTML = '<b>' + ingredient.ingredient + '</b>' + ' : ' + ingredient.quantity + ' ' + ToolsClass.shorterUnitOfMeasure(ingredient.unit);
            }

            // add s to ingredient unit if quantity is > 1
            //if(ingredient.quantity && ingredient.quantity > 1 ) li.innerHTML =  ingredient.quantity + ' ' + ToolsClass.shorterUnitOfMeasure(ingredient.unit) + '<b>' + ingredient.ingredient + 's' + '</b> ' ;
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

    //if no recipes found with the search criteria display a message
    if (recipes.length === 0) {
        const noRecipe = document.createElement('h2');
        noRecipe.innerHTML = 'Aucune recette ne correspond à vos critères...';
        noRecipe.style = 'text-align: center; margin-top: 50px';
        section.appendChild(noRecipe);
    }
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
    searchBar(recipesBook);
    showRecipe(recipesBook);
    //closeFilter();
    await spellCheck(recipesBook);
}


(function () {
    init()
})()
