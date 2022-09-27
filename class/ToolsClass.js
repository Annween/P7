class ToolsClass {

    static removeDuplicates(array) {
        return array.filter(element => element === element)
    }

    //remove plural from string
    static removePlural(str) {
        return str.replace(/s$/, '');
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

    //excluded misspelled words
    static excludedWords() {
        return {
            'casserole': ['casserolle.', 'casserole.', 'casserolle'],
            'crème fraîche': ['crême fraîche', 'crème fraiche'],
            'viande hachée': 'viande hachée 1% de matière grasse'

        };
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


