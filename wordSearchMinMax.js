testModWordList = [
"aahed",
"aalii",
"aargh",
"aaron",
"abaca",
"abaci",
"aback",
"abada",
"abaff",
"abaft",
"abaka",
"abama",
"abamp",
"aband",
"abase",
"abash",
"abask",
"abate",
"abaue",
"abave"
];

const wordSize = 5;
wordList = testModWordList;
wordListMod = wordList.slice();

function letterCount(wl){
    tempD = {
        "a": 0,
        "b": 0,
        "c": 0,
        "d": 0,
        "e": 0,
        "f": 0,
        "g": 0,
        "h": 0,
        "i": 0,
        "j": 0,
        "k": 0,
        "l": 0,
        "m": 0,
        "n": 0,
        "o": 0,
        "p": 0,
        "q": 0,
        "r": 0,
        "s": 0,
        "t": 0,
        "u": 0,
        "v": 0,
        "w": 0,
        "x": 0,
        "y": 0,
        "z": 0
    }
    wl.forEach(element => {
        for (i = 0; i < element.length; i++){
            tempD[element[i]] += 1;
        }
    });
    return tempD;
}

function cutCountWords(wl, pLetters, bl, greensList, yellowsList, cutBool){
    rcount = 0;
    function greensListSize(){
        q = 0;
        for (i = 0; i < greensList; i++){
            if (greensList[i] != "!"){
                q++;
            }
        }
        return q;
    }
    if (greensListSize() > 0){
        checkL = [];
        for (i = 0; i < wordSize; i++){
            checkL.push(false);
            if(greensList[i] != "!"){
                checkL[i] = true;
            }
        }
    }

    for (i = 0; i < wl.size(); i++){
        skipWord = 0;
        for (k = 0; k < wordSize; k++){
            if(checkL[k]){//greens
                if (wl[i][k] != greensList[k]){
                    if (cutBool){
                        wl.splice(i,1);
                        i--;
                    }
                    rcount++;
                    skipWord = true;
                    break;
                }
            }
            for (j = 0; j < bl.size(); j++){//blacks
                if (wl[i].includes(bl[j])){
                    if (cutBool){
                        wl.splice(i,1);
                        i--;
                    }
                    rcount++;
                    skipWord = true;
                    break;
                }
            }
        }
        if (!skipWord){
            for (k = 0; k < yellowsList.size; k++){
                tempC = 1;
                for (l = 0; l < wordSize; l++){
                    if (yellowsList[k] == greensList[l]){
                        tempC++;
                    }
                    if (yellowsList[k] == wl[i][k]){
                        tempC--;
                    }
                }
                if (tempC != 0){
                    if (cutBool){
                        wl.splice(i,1);
                        i--;
                    }
                    rcount++;
                    skipWord = true;
                    break;
                }
            }
        }
        if (!skipWord){
            for (k = 0; k < wordSize; k++){
                if (!pLetters[k].includes(wl[i][k])){
                    if (cutBool){
                        wl.splice(i,1);
                        i--;
                    }
                    rcount++;
                    skipWord = true;
                    break;
                }
            }
        }
    }
    if (cutBool){
        tempD = letterCount[wl];
        for (i = 0; i < 26; i++){
            tempKey = String.fromCharCode("a".charCodeAt(0) + i);
            if (tempD[tempKey] == 0){
                for (k = 0; k < pLetters.size; k++){
                    pLetters[k] = pLetters[k].replace(tempKey,"");
                }
            }
        }
    }
    return rcount;
}

function generateResponsesHelper(pR, cS, n){
    if (n < 1){
        pR.push(cS);
    }
    else {
        generateResponsesHelper(pR, cS + "0", n - 1);
        generateResponsesHelper(pR, cS + "1", n - 1);
        generateResponsesHelper(pR, cS + "2", n - 1);
    }
}

function generateResponses(pLetters, bl, guess){
    possibleResponses = [];
    rResponses = [];
    generateResponsesHelper(possibleResponses,"",wordSize);
    for (p = 0; p < possibleResponses.size; p++){
        tempS = possibleResponses[p];
        for (i = 0; i < wordSize; i++){
            skipR = false;
            if (tempS[i] == "2" && !pLetters[i].includes(guess[i])){
                skipR = true;
            }
            if (!skipR && tempS[i] != "0" && bl.includes(guess[i])){
                skipR = true;
            }
            if (!skipR && tempS[i] != "2" && guess[i] == greensList[i]){
                skipR = true;
            }
        }
        if (!skipR){
            tempC = 0;
            for (i = 0; i < tempS.size; i++){
                if (tempS[i] != "0"){
                    tempC++;
                }
            }
            if (tempC > greensListSize()+yellowsList.size){
                skipR == true;
            }
        }
        if (!skipR){
            rResponses.push(tempS);
        }
    }
    return rResponses;
}

function updateLists(pl, bl, gl, yl, guess, response){
    for (i = 0; i < wordSize; i++){
        if (response[i] == "2" && gl[i] == "!"){
            yl = yl.replace(guess[i], "");
            gl[i] = guess[i];
            pl[i] = guess[i];
        }
        else if (response[i] == "0"){
            for (k = 0; k < wordSize; k++){
                pl[k] = pl[k].replace(guess[i], "");
            }
            if (!bl.includes(guess[i])){
                bl = bl + guess[i];
            }
        }
    }
    if (response.includes("1")){
        glt = gl;
        ylt = yl;
        for (i = 0; i < wordSize; i++){
            if (response[i] == "1"){
                if (glt.includes(guess[i])){
                    glt = glt.replace(guess[i], "");
                }
                else if (ylt.includes(guess[i])){
                    ylt = ylt.replace(guess[i], "");
                }
                else {
                    yl = yl + guess[i];
                    ylt = ylt + guess[i];
                }
                pl[i] = pl[i].replace(guess[i], "");
            }
        }

    }
}

function minmaxSearch(){
    greensList = "";
    for (i = 0; i < wordSize; i++){
        greensList += "!";
    }
    yellowsList = [];
    yellowsList.size = 0;
    bestGuess = "";
    bestGuessScore = 0;
    posLetters = [];
    for (i = 0; i < wordSize; i++){
        posLetters.push("abcdefghijklmnopqrstuvwxyz");
    }
    safetyCount = 0;
    while (safetyCount < 10){
        for (i = 0; i < wordList.size; i++){
            pResponses = [];
            pResponses = generateResponses(posLetters, blacksList, wordList[i]);
            minScore = wordList.size;
            for (k = 0; k < pResponses.size; k++){
                //update lists
                cutsC = cutCountWords(wordListMod, posLetters, blacksList, greensList, yellowsList, false);
                if (cutsC < minScore){
                    minScore = cutsC;
                }
            }
            if (minScore > bestGuessScore){
                bestGuessScore = minScore;
                bestGuess = wordList[i];
            }
        }
        console.log("Best guess is: " + bestGuess);
        guessResult = String(prompt("Best guess is: " + bestGuess));
        console.log(guessResult);
        updateLists(posLetters,blacksList,greensList,yellowsList, bestGuess, guessResult);
        cutCountWords(wordListMod,posLetters,blacksList,greensList,yellowsList,true);
        if (wordListMod.size < 2){
            console.log(wordListMod);
            if (wordListMod.size > 0){
                prompt(wordListMod[0]);
            }
            else {
                prompt("word not found");
            }
            break;
        }
        safetyCount++;
    }
}
