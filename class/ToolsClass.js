class ToolsClass {
    //remove plural and other characters
    static removePlural(array) {
        return array.filter(element => element[element.length - 1] !== 's' && element[element.length - 1] !== '.' && element !== 'casserole' && element !== 'crême fraîche')
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


