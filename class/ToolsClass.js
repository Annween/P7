class ToolsClass {
    //remove plural
    static removePluralFromJSON(array) {
        array.forEach(element => {
            if (element[element.length - 1] === 's') element.slice(0, -1);
        })
        return console.log(array);
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


