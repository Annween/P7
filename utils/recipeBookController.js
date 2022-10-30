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

//display the founded recipes in the DOM
function searchBar(recipesBook) {

    document.getElementById('rechercher').addEventListener('keyup', ev => {
        const results = recipesBook.doSearch(document.getElementById('rechercher').value);
        showRecipe(recipesBook, results);
        synchronizeSearchBar(recipesBook, results);
    })


    return document.getElementById('rechercher').value;
}

function synchronizeSearchBar(recipesBook, results = []) {
    let ingredientList = [];
    let applianceList = [];
    let utensilList = [];
    const searchBar = document.getElementById('rechercher').value;
    //find the recipes that match the search bar
    //const results = recipesBook.doSearch(searchBar);
    //display the recipes that match the search bar
    results.forEach(result => {
        //loop through the ingredients of each recipe and push them in the ingredientList array
        result.ingredients.forEach(ingredient => {
            const ingredientName = ingredient.ingredient.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            ingredientList.push(ingredientName.toLocaleLowerCase());
        })

        //loop through the appliances of each recipe and push them in the applianceList array
        const applianceName = result.appliance.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        applianceList.push(applianceName.toLocaleLowerCase());


        result.ustensils.forEach(ustensile => {
            const ustensileName = ustensile.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
            utensilList.push(ustensileName.toLocaleLowerCase());
        })


        displayIngredientList(recipesBook, ingredientList);
        displayUstensilsList(recipesBook, utensilList);
        displayApplicanceList(recipesBook, applianceList);

    })

}

//show IngredientList in DOM
function displayIngredientList(recipesBook, list = []) {

    let ingredientList = recipesBook.getAllIngredientsRecipe();

    if (list.length > 0) {
        ingredientList = list;
    }


    const dropdownContent = document.getElementById('ingredientsContent');
    const ul = document.createElement('ul');
    ingredientList.forEach(ingredient => {
        //display only singular ingredients
        //if (ingredient === ingredient.replace(/s$/, '')) {
        const li = document.createElement('li');
        dropdownContent.innerHTML = ''
        li.innerHTML = ingredient;
        li.classList.add('ingredientElement')
        ul.appendChild(li);
        //}

        li.addEventListener('click', (e) => {
            const pinnedFilter = document.createElement('div');
            pinnedFilter.classList.add('pinnedFilter');
            pinnedFilter.id = ingredient;
            const span = document.createElement('span');
            //span.id = fltr;
            const close = document.createElement('i')
            close.classList.add('fa-regular', 'fa-times-circle', 'closeFilter');
            close.onclick = () => {
                this.synchronizeFilters(selectedFilters, pinnedFilter.id, recipesBook, document.getElementById('rechercher').value);
                document.getElementById(pinnedFilter.id).remove();
            }
            pinnedFilter.style = 'display: flex; background-color: #3282F7; justify-content: space-between; align-items: center; margin-right: 10px'
            span.innerHTML = ingredient;
            filterContainer.appendChild(pinnedFilter)
            pinnedFilter.appendChild(span);
            pinnedFilter.appendChild(close);
            selectedFilters.push(ingredient);
            searchWithFilters(recipesBook, selectedFilters);

        })
    })

    dropdownContent.appendChild(ul);
}

function displayApplicanceList(recipesBook, list = []) {
    let applianceList = recipesBook.getAllAppliancesRecipe();

    if (list.length > 0) {
        applianceList = list;
    }

    const dropdownContent = document.getElementById('appliancesContent');
    const ul = document.createElement('ul');
    applianceList.forEach(applicance => {
        if (applicance === applicance.replace(/s$/, '')) {
            const li = document.createElement('li');
            dropdownContent.innerHTML = ''
            li.innerHTML = applicance;
            li.classList.add('applianceElement')
            ul.appendChild(li);

            li.addEventListener('click', (e) => {
                const pinnedFilter = document.createElement('div');
                pinnedFilter.classList.add('pinnedFilter');
                pinnedFilter.id = applicance;
                const span = document.createElement('span');
                //span.id = fltr;
                const close = document.createElement('i')
                close.classList.add('fa-regular', 'fa-times-circle', 'closeFilter');
                close.onclick = () => {
                    this.synchronizeFilters(selectedFilters, pinnedFilter.id, recipesBook, document.getElementById('rechercher').value);
                    document.getElementById(pinnedFilter.id).remove();
                }
                pinnedFilter.style = 'display: flex; background-color: #68D9A4; justify-content: space-between; align-items: center; margin-right: 10px'
                span.innerHTML = applicance;
                filterContainer.appendChild(pinnedFilter)
                pinnedFilter.appendChild(span);
                pinnedFilter.appendChild(close);
                selectedFilters.push(applicance);
                searchWithFilters(recipesBook, selectedFilters);

            })
        }


    })

    dropdownContent.appendChild(ul);
}

function displayUstensilsList(recipesBook, list = []) {
    let ustensilsList = recipesBook.getUstentilsRecipe();

    if (list.length > 0) {
        ustensilsList = list;
    }

    const dropdownContent = document.getElementById('ustensilsContent');
    const ul = document.createElement('ul');
    const filterContainer = document.getElementById('filterContainer');
    ustensilsList.forEach(ustensils => {

        const li = document.createElement('li');
        dropdownContent.innerHTML = ''
        li.innerHTML = ustensils;
        li.classList.add('ustentsilElement')
        ul.appendChild(li);

        li.addEventListener('click', (e) => {
            const pinnedFilter = document.createElement('div');
            pinnedFilter.classList.add('pinnedFilter');
            pinnedFilter.id = ustensils;
            const span = document.createElement('span');
            //span.id = fltr;
            const close = document.createElement('i')
            close.classList.add('fa-regular', 'fa-times-circle', 'closeFilter');
            close.onclick = () => {
                this.synchronizeFilters(selectedFilters, pinnedFilter.id, recipesBook, document.getElementById('rechercher').value);
                document.getElementById(pinnedFilter.id).remove();
            }
            pinnedFilter.style = 'display: flex; background-color: #ED6454; justify-content: space-between; align-items: center; margin-right: 10px'
            span.innerHTML = ustensils;
            filterContainer.appendChild(pinnedFilter)
            pinnedFilter.appendChild(span);
            pinnedFilter.appendChild(close);
            selectedFilters.push(ustensils);
            searchWithFilters(recipesBook, selectedFilters);

        })

    })

    dropdownContent.appendChild(ul);
}



function displayFilterContent(recipesBook, elementId, dropdownId, color) {
    document.getElementById(elementId).addEventListener('keyup', ev => {
        const dropdownContent = document.getElementById(dropdownId);
        const ul = document.createElement('ul');
        const filteredFilters = recipesBook.searchFilter(document.getElementById(elementId));
        //search among filters when typing in a filter searchbar

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
                        this.synchronizeFilters(selectedFilters, pinnedFilter.id, recipesBook, document.getElementById('rechercher').value);
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
function synchronizeFilters(selectedFilters, id, recipesBook, searchBar) {
    //if the user clicks on the remove croce, it will be removed from the list of selected filters
    if (selectedFilters.length === 0 && searchBar === '') {
        return showRecipe(recipesBook);
    }

    selectedFilters.splice(selectedFilters.indexOf(id), 1);

    return searchWithFilters(recipesBook, selectedFilters, searchBar);

}


//display the recipe with required criteria
function searchWithFilters(recipesBook, filters, searchBar = '') {

    document.getElementById('rechercher').addEventListener('keyup', ev => {
        searchBar = document.getElementById('rechercher').value;
        const results = recipesBook.doSearch(searchBar, filters);
        showRecipe(recipesBook, results);
        return searchBar;
    })
    const results = recipesBook.doSearch(searchBar, filters);
    showRecipe(recipesBook, results);

    return searchBar;
    /* if (document.getElementById('rechercher').value.length > 0) {
         const results = recipesBook.doSearch(document.getElementById('rechercher').value, filters);
         showRecipe(recipesBook, results);
     } else {
         const results = recipesBook.doSearch('', filters);
         return showRecipe(recipesBook, results);
     }*/

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
    searchBar(recipesBook, toolsClass);
    showRecipe(recipesBook);

}


(function () {
    init()
})();
