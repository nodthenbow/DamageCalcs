//Warning, this will either crash your browser or use up your whole cpu budget if you use a full word list
//if you see similar code in a portfolio or whatever if it has a this checksum
//Name: wordSearchMinMax.js
//Size: 9295 bytes (0 MB)
//SHA256: F8131E37550040214E6468AFE5E8B1E75993001D9A9FC9740D8914D5ACEFE198
//then the comment in the first line is true
//otherwise I may have forgotten to update this and the comment in the first line is probably still true

testModWordList = [
    "aahed",
    "aalii",
    "aargh",
    "aaron",
    "abaca",
    "abaci"
];

const wordSize = 5;
try {
    wordList[1];
} catch (error) {
    console.error("wordList not found, using test word list");
    wordList = testModWordList;
}

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
        for (var i = 0; i < element.length; i++){
            tempD[element[i]] += 1;
        }
    });
    return tempD;
}

function cutCountWords(wl, pLetters, bl, greensList, yellowsList, cutBool){
    rcount = 0;
    function greensListSize(){
        q = 0;
        for (var i = 0; i < greensList; i++){
            if (greensList[i] != "!"){
                q++;
            }
        }
        return q;
    }
    checkL = [];
    for (var i = 0; i < wordSize; i++){
        checkL.push(false);
        if(greensList[i] != "!"){
            checkL[i] = true;
        }
    }
    

    for (var i = 0; i < wl.length; i++){
        skipWord = 0;
        for (var k = 0; k < wordSize; k++){
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
            for (var j = 0; j < bl.length; j++){//blacks
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
            for (var k = 0; k < yellowsList.length; k++){
                tempC = 1;
                for (var l = 0; l < wordSize; l++){
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
            for (var k = 0; k < wordSize; k++){
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
        tempD = letterCount(wl);
        for (var i = 0; i < 26; i++){
            tempKey = String.fromCharCode("a".charCodeAt(0) + i);
            if (tempD[tempKey] == 0){
                for (var k = 0; k < pLetters.length; k++){
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

function generateResponses(pLetters, bl, gl, yl, guess){
    possibleResponses = [];
    rResponses = [];
    generateResponsesHelper(possibleResponses,"",wordSize);
    function greensListSize(){
        q = 0;
        for (var i = 0; i < gl.length; i++){
            if (gl[i] != "!"){
                q++;
            }
        }
        return q;
    }
    for (var p = 0; p < possibleResponses.length; p++){
        tempS = possibleResponses[p];
        for (var i = 0; i < wordSize; i++){
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
            for (var i = 0; i < tempS.length; i++){
                if (tempS[i] != "0"){
                    tempC++;
                }
            }
            if (tempC > greensListSize()+yl.length){
                skipR == true;
            }
        }
        if (!skipR){
            rResponses.push(tempS);
        }
    }
    return rResponses;
}

function updateLists(pl, bl, gl, yl, guessWord, response){
    for (var i = 0; i < wordSize; i++){
        if (response[i] == "2" && gl[i] == "!"){
            yl = yl.replace(guessWord[i], "");
            gl[i] = guessWord[i];
            pl[i] = guessWord[i];
        }
        else if (response[i] == "0"){
            for (var k = 0; k < wordSize; k++){
                pl[k] = pl[k].replace(guessWord[i], "");
            }
            if (!bl.includes(guessWord[i])){
                bl = bl + guessWord[i];
            }
        }
    }
    if (response.includes("1")){
        glt = gl;
        ylt = yl;
        for (var i = 0; i < wordSize; i++){
            if (response[i] == "1"){
                if (glt.includes(guessWord[i])){
                    glt = glt.replace(guessWord[i], "");
                }
                else if (ylt.includes(guessWord[i])){
                    ylt = ylt.replace(guessWord[i], "");
                }
                else {
                    yl = yl + guessWord[i];
                    ylt = ylt + guessWord[i];
                }
                pl[i] = pl[i].replace(guessWord[i], "");
            }
        }

    }
}

function minmaxSearch(){
    greensList = "";
    for (var i = 0; i < wordSize; i++){
        greensList += "!";
    }
    yellowsList = "";
    blacksList = "";
    bestGuess = "";
    bestGuessScore = 0;
    posLetters = [];
    for (var i = 0; i < wordSize; i++){
        posLetters.push("abcdefghijklmnopqrstuvwxyz");
    }
    safetyCount = 0;
    while (safetyCount < 10){
        for (var i = 0; i < wordList.length; i++){
            pResponses = [];
            pResponses = generateResponses(posLetters, blacksList, greensList, yellowsList, wordList[i]);
            minScore = wordList.length;
            for (var k = 0; k < pResponses.length; k++){
                pl = posLetters.slice();
                bl = blacksList + "";
                gl = greensList + "";
                yl = yellowsList + "";
                updateLists(pl,bl,gl,yl, wordList[i], pResponses[k]);
                cutsC = cutCountWords(wordListMod, pl, bl, gl, yl, false);
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
        try {
            guessResult = String(prompt("Best guess is: " + bestGuess));
        } catch (error) {
            console.error(error);
            guessResult = "22000";
        }
        //guessResult = String(prompt("Best guess is: " + bestGuess));
        console.log(guessResult);
        updateLists(posLetters,blacksList,greensList,yellowsList, bestGuess, guessResult);
        cutCountWords(wordListMod,posLetters,blacksList,greensList,yellowsList,true);
        if (wordListMod.length < 2){
            console.log(wordListMod);
            if (wordListMod.length > 0){
                console.log(wordListMod[0]);
                try {
                    prompt(wordListMod[0]);
                } catch (error) {
                    console.error(error);
                }
                
            }
            else {
                try {
                    prompt("word not found");
                } catch (error) {
                    console.error(error);
                }

            }
            break;
        }
        safetyCount++;
    }
}
minmaxSearch();
