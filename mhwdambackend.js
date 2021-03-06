document.getElementById("submittedstuff").addEventListener("submit", buildchart, false);

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
function coutb(text){
	var btn = document.createElement("p");
    var t = document.createTextNode(text);
	btn.appendChild(t);
    document.body.appendChild(btn);
}
function cout(greater, text, locx, locy, dam1, dam2) {
    var btn = document.createElement("td");
    var t = document.createTextNode(text);
    btn.style.width = "5px";
	btn.style.height = "5px";
	btn.style.padding = "2px";
	btn.style.paddingLeft = "3px";
	var loctext = "("+locx+","+locy+")"+"("+dam1+","+dam2+")";
	btn.title=loctext;
	if (greater == 1){
		btn.style.backgroundColor = "green";
	}
	else if (greater == 0){
		btn.style.backgroundColor = "red";
	}
	else if (greater == 2){
		btn.style.backgroundColor = "#ffc200";
	}
	else {
	}
    btn.appendChild(t);
    document.body.appendChild(btn);
}

function endl(){
	var btn = document.createElement("tr");
	btn.style.height = "0";
	btn.style.padding = "0";
	btn.style.margin = "0";
	document.body.appendChild(btn);
}

function buildchart(event){
	event.preventDefault();
	
	var chartall = createArray(101,101);
	
	//var elements = event.currentTarget;
	
	var weapon1name = document.getElementById("weapon1name").value;
	var weapon2name = document.getElementById("weapon2name").value;
	
	var baseattackweapon1 = parseFloat(document.getElementById("baseattackweapon1").value);
	var baseattackweapon2 = parseFloat(document.getElementById("baseattackweapon2").value);
	
	var affinityweapon1 = parseFloat(document.getElementById("affinityweapon1").value);
	var affinityweapon2 = parseFloat(document.getElementById("affinityweapon2").value);
	
	var elementaldamageweapon1 = parseFloat(document.getElementById("elementaldamageweapon1").value);
	var elementaldamageweapon2 = parseFloat(document.getElementById("elementaldamageweapon2").value);
	
	var hitzonesb = parseFloat(document.getElementById("hitzonesb").value);
	
	var diphz = document.getElementById("diphz").checked;
	
	elementaldamageweapon1 = elementaldamageweapon1/(10.0);
	elementaldamageweapon2 = elementaldamageweapon2/10.0;
	
	affinityweapon1 = affinityweapon1/100.0;
	affinityweapon2 = affinityweapon2/100.0;
	
	if (hitzonesb == null){
		hitzonesb = 100.0;
	}
	
	hitzonesb = hitzonesb/100.0;
	

	var att1 = baseattackweapon1 + affinityweapon1*baseattackweapon1*0.25;
	var att2 = baseattackweapon2 + affinityweapon2*baseattackweapon2*0.25;

	att1 = Math.floor(att1+0.5);
	att2 = Math.floor(att2+0.5);

	var fin1 = new Array(101);
	var fin2 = new Array(101);
	
	
	if (diphz == false){
		for (i = 0; i < 101; i++){
			fin1[i] = elementaldamageweapon1*(i/100.0) + hitzonesb*att1;
			fin2[i] = elementaldamageweapon2*(i/100.0) + hitzonesb*att2;
		}
	}
	else {
		for (i = 0; i < 101; i++){
			fin1[i] = att1*(i/100.0) + hitzonesb*elementaldamageweapon1;
			fin2[i] = att2*(i/100.0) + hitzonesb*elementaldamageweapon2;
		}
	}
	
	for (var i = 0; i < 101; i++){
		for (var j = 0; j < 101; j++){
			if (fin1[i]>fin2[j]){
				chartall[i][j] = 1;
			}
			else if (fin1[i]<fin2[j]){
				chartall[i][j] = 0;
			}
			else {
				chartall[i][j] = 2;
			}
		}
	}
	
	coutb("If green use "+weapon1name+", if red use "+weapon2name+", if amber then use either one. Hover for (X,Y). X is the modifier of a hitzone (default elemental) vs "+weapon1name+"'s damage against the hitzone type, Y is vs "+weapon2name+"'s. Second pair is the calculated damage number in the same order.");
	endl();
	
	for (var j = 0; j < 101; j++){
		for (var i = 0; i < 101; i++){
			cout(chartall[i][j], "", i, j, fin1[i], fin2[j]);
		}
		endl();
	}
	event.preventDefault();
}
	
