var solve, level1, level2, level3, level4, level5, poems, poemsFile, hashSorted = {}, hash = {}; 
var fs = require('fs');

poemsFile = fs.readFileSync('./poems/poems-full.json', 'utf8');
poemsSortedFile = fs.readFileSync('./poems/poems-sorted.json', 'utf8');
poemsLinesFile = fs.readFileSync('./poems/poems-lines.json', 'utf8');

poems = JSON.parse(poemsFile);
poemsSorted = JSON.parse(poemsSortedFile);
lines = JSON.parse(poemsLinesFile);

level8 = function(str) {
    var line, _i, _j, pline, __i, __j, inconsistencies, h1 = {};
    line = str.replace(/[^A-Za-zА-Яа-я0-9]/g, '');
    for (_i = 0; _i < poemsSorted.length; _i++) {
        for (_j = 0; _j < poemsSorted[_i][1].length; _j++) {
            pline = poemsSorted[_i][1][_j];
            if (pline.length === line.length) {
                chars = pline.split('');
                inconsistencies = 0;
                if (chars.length === line.length) {
                    h1 = {}, h2 = {};
                    for (__i = 0; __i < line.length; __i++) {
                        if (h1[line[__i]] != null) h1[line[__i]]++; else h1[line[__i]] = 1;
                        if (h1[chars[__i]] != null) h1[chars[__i]]--; else h1[chars[__i]] = -1;
                    }
                    Object.keys(h1).forEach(function(key) { 
                        if (h1[key] != 0) inconsistencies++;
                    })
                    if (inconsistencies < 3) {
                        return poems[_i][1][_j];
                    }
                }
            }
        }
    }
}


level6 = function(str) {
    line = str.replace(/[^A-Za-zА-Яа-я0-9]/g, '').split('').sort().join('');
    return hashSorted[line];
}


level5 = function(str) {
    var words, _i, _j, matches, index, line;
    words = str.match(/[А-Яа-я]+/g);
    for (_i = 0; _i < poems.length; _i++) {
        for (_j = 0; _j < poems[_i][1].length; _j++) {
            line = poems[_i][1][_j].match(/[А-Яа-я]+/g);
            matches = 0;
            index = -1;
            if (line != null && line.length === words.length) {
                for (_k = 0; _k < line.length; _k++) {
                    if (line[_k] === words[_k]) {
                        matches++;
                    } else {
                        index = _k;
                    }
                }
            }
            if (matches == words.length - 1) {
                return line[index] + "," + words[index];
            }
        }
    }
}

level4 = function(str) {
    var regex = new RegExp(str.replace(/%WORD%/g, '([А-Яа-яA-Za-z]+)').replace(/\n/g, '\\n\\s*'));
    for (_i = 0; _i < lines.length; _i++) {
        line = lines[_i];
        if (regex.test(line)) {
            words = regex.exec(line);
            return words[1] + ',' + words[2] + ',' + words[3];
        }
    }
}

level3 = function(str) {
    var regex = new RegExp(str.replace(/%WORD%/g, '([А-Яа-яA-Za-z]+)').replace(/\n/g, '\\n\\s*'));
    for (_i = 0; _i < lines.length; _i++) {
        line = lines[_i];
        if (regex.test(line)) {
            words = regex.exec(line);
            return words[1] + ',' + words[2];
        }
    }
}

level2 = function(line) {
    var regex, result, pline, _i, _j;
    regex = new RegExp(line.replace('%WORD%', '([А-Яа-я]+)'));
    for (_i = 0; _i < lines.length; _i++) {
        line = lines[_i];
        if (regex.test(line)) {
            words = regex.exec(line);
            return words[1];
        }
    }
}

/*level1 = function(line) {
    var _i, _j, pline;
    regex = new RegExp(line)
    for (_i = 0; _i < poems.length; _i++) {
        for (_j = 0; _j < poems[_i][1].length; _j++) {
            pline = poems[_i][1][_j];
            if (regex.test(pline)) {
                return poems[_i][0];
            }
        }
    }
};*/

level1 = function(str) {
    line = str.replace(/[^A-Za-zА-Яа-я0-9]/g, '').split('').sort().join('');
    return hash[line];
}

exports.init = function() {
    var _i, _j, pline;
    for (_i = 0; _i < poemsSorted.length; _i++) {
        for (_j = 0; _j < poemsSorted[_i][1].length; _j++) {
            pline = poemsSorted[_i][1][_j];
            hash[pline] = poems[_i][0];
        }
    }
    for (_i = 0; _i < poemsSorted.length; _i++) {
        for (_j = 0; _j < poemsSorted[_i][1].length; _j++) {
            pline = poemsSorted[_i][1][_j];
            hashSorted[pline] = poems[_i][1][_j]
        }
    }
}

exports.solve = function(level, string) {
    switch (level) {
    case 1:
        return level1(string);
    case 2:
        return level2(string);
    case 3:
        return level3(string);
    case 4:
        return level4(string);
    case 5:
        return level5(string);  
    case 6:
        return level6(string);
    case 7:
        return level6(string);
    case 8:
        return level8(string);  
    default:
        return '';
    } 
}