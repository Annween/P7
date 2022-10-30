class ToolsClass {

    static removeDuplicates(array) {
        return array.filter(element => element === element || (element === element.replace(/s$/, '')))
    }

    //remove plural from string
    /* static removePlural(str) {
         return str.replace(/s$/, '');
     }*/

    //remove plural from array
    static removePlural(array) {
        return array.map(element => element.replace(/s$/, ''))
    }

    //shorter unit of measure
    static shorterUnitOfMeasure(str) {
        switch (str) {
            case 'grammes':
                return 'g';
            case 'centilitres':
                return 'cl';
            case 'litres':
                return 'l';
            case 'cuillères à soupe':
                return 'càs';
            case 'cuillère à soupe':
                return 'càs';
            case 'cuillère à café':
                return 'càc';
            case 'cuillères à café':
                return 'càc';
            case 'pincées':
                return 'p';
            default:
                return str;
        }
    }


    //create function that removes accents
    static noAccents(array) {
        return array.map(element => element.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    }

    //truncate string to a certain length
    static truncate(str, n) {
        return (str.length > n) ? str.slice(0, n - 1) + '&hellip;' : str;
    }

    //sorting array by alphabetical order
    static sortArray(array) {
        return array.sort(function (a, b) {
            return a.localeCompare(b);
        })
    }
}


