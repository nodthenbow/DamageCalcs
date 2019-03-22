
<!-- Begin

var A=[],str=[],x=[],y=[],mat=[],dvals=[],mathold=[];
var m,m1,n,n1,n2,mess,val,vsave,r2ev,r2gb1ev,r2gb2ev,foundev,matrix;

/*mat is the matrix



*/

function main(form) {
	calcrounds(form);
	/*
	display(form);
	form.output.value=mess; 
	*/
}
	
function calcrounds(form){
	for(i = 0; i<49;i++){
		dvals[i] = 0;
	}
	
	dvals[0]=form.p1r2a.value;
	dvals[1]=form.p1r2b.value;
	dvals[2]=form.p1r2k.value;
	dvals[3]=form.p1r2g.value;
	dvals[5]=form.p16.value;
	dvals[6]=form.p14.value;
	dvals[7]=form.p12.value;
	dvals[8]=-1*form.p2r2a.value;
	dvals[9]=-1*form.p2r2b.value;
	dvals[10]=-1*form.p2r2k.value;
	dvals[11]=-1*form.p2r2g.value;
	dvals[12]=-1*form.p26.value;
	dvals[13]=-1*form.p24.value;
	dvals[14]=-1*form.p22.value;
	dvals[15]=form.p1gba.value;
	dvals[16]=form.p1gbb.value;
	dvals[17]=form.p1gbk.value;
	dvals[18]=-1*form.p2gba.value;
	dvals[19]=-1*form.p2gbb.value;
	dvals[20]=-1*form.p2gbk.value;
	dvals[21]=form.giworthp1.value;
	dvals[22]=form.giworthp2.value;
	
	dvals[15]=0;
	dvals[16]=0;
	dvals[17]=0;
	dvals[18]=0;
	dvals[19]=0;
	dvals[20]=0;
	
	if(form.gbriskp1.checked){
		dvals[18]=-1*form.p2gba.value;
		dvals[19]=-1*form.p2gbb.value;
		dvals[20]=-1*form.p2gbk.value;
	}
	if(form.gbriskp2.checked){
		dvals[15]=form.p1gba.value;
		dvals[16]=form.p1gbb.value;
		dvals[17]=form.p1gbk.value;
	}
	if(form.usepercents.checked){
		for(i=0;i<23;i++){
			dvals[i] = dvals[i]/280.0;
		}
	}
	
	mathold[0]= dvals[0];
	mathold[1]= dvals[9];
	mathold[2]= dvals[0];
	mathold[3]= dvals[15];
	mathold[4]= dvals[12];
	mathold[5]= dvals[0];
	mathold[6]= dvals[0];
	mathold[7]= dvals[1];
	mathold[8]= dvals[9];
	mathold[9]= dvals[1];
	mathold[10]= dvals[16];
	mathold[11]= dvals[1];
	mathold[12]= dvals[1];
	mathold[13]= dvals[14];
	mathold[14]= dvals[8];
	mathold[15]= dvals[2];
	mathold[16]= dvals[2];
	mathold[17]= dvals[17];
	mathold[18]= dvals[2];
	mathold[19]= dvals[13];
	mathold[20]= dvals[2];
	mathold[21]= dvals[18];
	mathold[22]= dvals[19];
	mathold[23]= dvals[20];
	mathold[24]= dvals[21];
	mathold[25]= dvals[25];
	mathold[26]= dvals[26];
	mathold[27]= dvals[27];
	mathold[28]= dvals[5];
	mathold[29]= dvals[9];
	mathold[30]= dvals[10];
	mathold[31]= dvals[31];
	mathold[32]= dvals[32];
	mathold[33]= dvals[33];
	mathold[34]= dvals[34];
	mathold[35]= dvals[8];
	mathold[36]= dvals[9];
	mathold[37]= dvals[6];
	mathold[38]= dvals[38];
	mathold[39]= dvals[39];
	mathold[40]= dvals[40];
	mathold[41]= dvals[41];
	mathold[42]= dvals[8];
	mathold[43]= dvals[7];
	mathold[44]= dvals[10];
	mathold[45]= dvals[45];
	mathold[46]= dvals[46];
	mathold[47]= dvals[47];
	mathold[48]= dvals[48];
	
	document.getElementById("outputbox").innerHTML += "Round 2 after a clash</br>";
	matrix = "";
	for(hq=0; hq<49;hq++){
		matrix += mathold[hq] +  " ";
		if((hq+1)%7==0){
			matrix += "\n";
		}
	}
	getinput(form);
	InitA();
	makeValuePositive();
	Solve();
	ValueOptimalStrategies();
	display(form);
	
	r2ev = foundev;
	
	dvals[0]=form.p1r2a.value;
	dvals[1]=form.p1r2b.value;
	dvals[2]=form.p1r2k.value;
	dvals[3]=form.p1r2g.value;
	dvals[5]=form.p16.value;
	dvals[6]=form.p14.value;
	dvals[7]=form.p12.value;
	dvals[8]=-1*form.p2r2a.value;
	dvals[9]=-1*form.p2r2b.value;
	dvals[10]=-1*form.p2r2k.value;
	dvals[11]=-1*form.p2r2g.value;
	dvals[12]=-1*form.p26.value;
	dvals[13]=-1*form.p24.value;
	dvals[14]=-1*form.p22.value;
	dvals[15]=form.p1gba.value;
	dvals[16]=form.p1gbb.value;
	dvals[17]=form.p1gbk.value;
	dvals[18]=-1*form.p2gba.value;
	dvals[19]=-1*form.p2gbb.value;
	dvals[20]=-1*form.p2gbk.value;
	dvals[21]=form.giworthp1.value;
	dvals[22]=form.giworthp2.value;
	
	dvals[15]=0;
	dvals[16]=0;
	dvals[17]=0;
	
	if(form.gbriskp1.checked){
		dvals[18]=-1*form.p2gba.value;
		dvals[19]=-1*form.p2gbb.value;
		dvals[20]=-1*form.p2gbk.value;
	}
	if(form.gbriskp2.checked){
		dvals[15]=form.p1gba.value;
		dvals[16]=form.p1gbb.value;
		dvals[17]=form.p1gbk.value;
	}
	if(form.usepercents.checked){
		for(i=0;i<23;i++){
			dvals[i] = dvals[i]/280.0;
		}
	}
	
	mathold[0]= dvals[0];
	mathold[1]= dvals[9];
	mathold[2]= dvals[0];
	mathold[3]= dvals[15];
	mathold[4]= dvals[12];
	mathold[5]= dvals[0];
	mathold[6]= dvals[0];
	mathold[7]= dvals[1];
	mathold[8]= dvals[9];
	mathold[9]= dvals[1];
	mathold[10]= dvals[16];
	mathold[11]= dvals[1];
	mathold[12]= dvals[1];
	mathold[13]= dvals[14];
	mathold[14]= dvals[8];
	mathold[15]= dvals[2];
	mathold[16]= dvals[2];
	mathold[17]= dvals[17];
	mathold[18]= dvals[2];
	mathold[19]= dvals[13];
	mathold[20]= dvals[2];
	mathold[21]= dvals[18];
	mathold[22]= dvals[19];
	mathold[23]= dvals[20];
	mathold[24]= dvals[21];
	mathold[25]= dvals[25];
	mathold[26]= dvals[26];
	mathold[27]= dvals[27];
	mathold[28]= dvals[5];
	mathold[29]= dvals[9];
	mathold[30]= dvals[10];
	mathold[31]= dvals[31];
	mathold[32]= dvals[32];
	mathold[33]= dvals[33];
	mathold[34]= dvals[34];
	mathold[35]= dvals[8];
	mathold[36]= dvals[9];
	mathold[37]= dvals[6];
	mathold[38]= dvals[38];
	mathold[39]= dvals[39];
	mathold[40]= dvals[40];
	mathold[41]= dvals[41];
	mathold[42]= dvals[8];
	mathold[43]= dvals[7];
	mathold[44]= dvals[10];
	mathold[45]= dvals[45];
	mathold[46]= dvals[46];
	mathold[47]= dvals[47];
	mathold[48]= dvals[48];
	
	document.getElementById("outputbox").innerHTML += "Round 2 after P1's B is blocked</br>";
	matrix = "";
	for(hq=0; hq<49;hq++){
		matrix += mathold[hq] +  " ";
		if((hq+1)%7==0){
			matrix += "\n";
		}
	}
	getinput(form);
	InitA();
	makeValuePositive();
	Solve();
	ValueOptimalStrategies();
	display(form);
	
	r2gb2ev = foundev;
	
	dvals[0]=form.p1r2a.value;
	dvals[1]=form.p1r2b.value;
	dvals[2]=form.p1r2k.value;
	dvals[3]=form.p1r2g.value;
	dvals[5]=form.p16.value;
	dvals[6]=form.p14.value;
	dvals[7]=form.p12.value;
	dvals[8]=-1*form.p2r2a.value;
	dvals[9]=-1*form.p2r2b.value;
	dvals[10]=-1*form.p2r2k.value;
	dvals[11]=-1*form.p2r2g.value;
	dvals[12]=-1*form.p26.value;
	dvals[13]=-1*form.p24.value;
	dvals[14]=-1*form.p22.value;
	dvals[15]=form.p1gba.value;
	dvals[16]=form.p1gbb.value;
	dvals[17]=form.p1gbk.value;
	dvals[18]=-1*form.p2gba.value;
	dvals[19]=-1*form.p2gbb.value;
	dvals[20]=-1*form.p2gbk.value;
	dvals[21]=form.giworthp1.value;
	dvals[22]=form.giworthp2.value;
	
	dvals[18]=0;
	dvals[19]=0;
	dvals[20]=0;
	
	if(form.gbriskp1.checked){
		dvals[18]=-1*form.p2gba.value;
		dvals[19]=-1*form.p2gbb.value;
		dvals[20]=-1*form.p2gbk.value;
	}
	if(form.gbriskp2.checked){
		dvals[15]=form.p1gba.value;
		dvals[16]=form.p1gbb.value;
		dvals[17]=form.p1gbk.value;
	}
	if(form.usepercents.checked){
		for(i=0;i<23;i++){
			dvals[i] = dvals[i]/280.0;
		}
	}
	
	mathold[0]= dvals[0];
	mathold[1]= dvals[9];
	mathold[2]= dvals[0];
	mathold[3]= dvals[15];
	mathold[4]= dvals[12];
	mathold[5]= dvals[0];
	mathold[6]= dvals[0];
	mathold[7]= dvals[1];
	mathold[8]= dvals[9];
	mathold[9]= dvals[1];
	mathold[10]= dvals[16];
	mathold[11]= dvals[1];
	mathold[12]= dvals[1];
	mathold[13]= dvals[14];
	mathold[14]= dvals[8];
	mathold[15]= dvals[2];
	mathold[16]= dvals[2];
	mathold[17]= dvals[17];
	mathold[18]= dvals[2];
	mathold[19]= dvals[13];
	mathold[20]= dvals[2];
	mathold[21]= dvals[18];
	mathold[22]= dvals[19];
	mathold[23]= dvals[20];
	mathold[24]= dvals[21];
	mathold[25]= dvals[25];
	mathold[26]= dvals[26];
	mathold[27]= dvals[27];
	mathold[28]= dvals[5];
	mathold[29]= dvals[9];
	mathold[30]= dvals[10];
	mathold[31]= dvals[31];
	mathold[32]= dvals[32];
	mathold[33]= dvals[33];
	mathold[34]= dvals[34];
	mathold[35]= dvals[8];
	mathold[36]= dvals[9];
	mathold[37]= dvals[6];
	mathold[38]= dvals[38];
	mathold[39]= dvals[39];
	mathold[40]= dvals[40];
	mathold[41]= dvals[41];
	mathold[42]= dvals[8];
	mathold[43]= dvals[7];
	mathold[44]= dvals[10];
	mathold[45]= dvals[45];
	mathold[46]= dvals[46];
	mathold[47]= dvals[47];
	mathold[48]= dvals[48];
	
	document.getElementById("outputbox").innerHTML += "Round 2 after P2's B is blocked</br>";
	matrix = "";
	for(hq=0; hq<49;hq++){
		matrix += mathold[hq] +  " ";
		if((hq+1)%7==0){
			matrix += "\n";
		}
	}
	
	getinput(form);
	InitA();
	makeValuePositive();
	Solve();
	ValueOptimalStrategies();
	display(form);
	
	r2gb1ev = foundev;
	
	dvals[0]=form.p1r1a.value;
	dvals[1]=form.p1r1b.value;
	dvals[2]=form.p1r1k.value;
	dvals[3]=form.p1r1g.value;
	dvals[8]=-1*form.p2r1a.value;
	dvals[9]=-1*form.p2r1b.value;
	dvals[10]=-1*form.p2r1k.value;
	dvals[11]=-1*form.p2r1g.value;
	dvals[12]=-1*form.p26.value;
	dvals[13]=-1*form.p24.value;
	dvals[14]=-1*form.p22.value;
	dvals[15]=form.p1gba.value;
	dvals[16]=form.p1gbb.value;
	dvals[17]=form.p1gbk.value;
	dvals[18]=-1*form.p2gba.value;
	dvals[19]=-1*form.p2gbb.value;
	dvals[20]=-1*form.p2gbk.value;
	dvals[21]=form.giworthp1.value;
	dvals[22]=form.giworthp2.value;
	
	/*
	if(form.gbriskp1.checked){
		dvals[18]=-1*form.p2gba.value;
		dvals[19]=-1*form.p2gbb.value;
		dvals[20]=-1*form.p2gbk.value;
	}
	if(form.gbriskp2.checked){
		dvals[15]=form.p1gba.value;
		dvals[16]=form.p1gbb.value;
		dvals[17]=form.p1gbk.value;
	}
	*/
	if(form.usepercents.checked){
		for(i=0;i<23;i++){
			dvals[i] = dvals[i]/280.0;
		}
	}
	
	mathold[0]= r2ev;
	mathold[1]= dvals[9];
	mathold[2]= dvals[0];
	mathold[3]= dvals[15];
	mathold[4]= dvals[12];
	mathold[5]= dvals[0];
	mathold[6]= dvals[0];
	mathold[7]= dvals[1];
	mathold[8]= r2ev;
	mathold[9]= dvals[1];
	mathold[10]= r2gb1ev;
	mathold[11]= dvals[1];
	mathold[12]= dvals[1];
	mathold[13]= dvals[14];
	mathold[14]= dvals[8];
	mathold[15]= dvals[2];
	mathold[16]= r2ev;
	mathold[17]= dvals[17];
	mathold[18]= dvals[2];
	mathold[19]= dvals[13];
	mathold[20]= dvals[2];
	mathold[21]= dvals[18];
	mathold[22]= r2gb2ev;
	mathold[23]= dvals[20];
	mathold[24]= r2ev;
	mathold[25]= dvals[25];
	mathold[26]= dvals[26];
	mathold[27]= dvals[27];
	mathold[28]= dvals[5];
	mathold[29]= dvals[9];
	mathold[30]= dvals[10];
	mathold[31]= dvals[31];
	mathold[32]= dvals[32];
	mathold[33]= dvals[33];
	mathold[34]= dvals[34];
	mathold[35]= dvals[8];
	mathold[36]= dvals[9];
	mathold[37]= dvals[6];
	mathold[38]= dvals[38];
	mathold[39]= dvals[39];
	mathold[40]= dvals[40];
	mathold[41]= dvals[41];
	mathold[42]= dvals[8];
	mathold[43]= dvals[7];
	mathold[44]= dvals[10];
	mathold[45]= dvals[45];
	mathold[46]= dvals[46];
	mathold[47]= dvals[47];
	mathold[48]= dvals[48];
	
	document.getElementById("outputbox").innerHTML += "Round 1</br>";
	matrix = "";
	for(hq=0; hq<49;hq++){
		matrix += mathold[hq] +  " ";
		if((hq+1)%7==0){
			matrix += "\n";
		}
	}
	console.log(matrix);
	getinput(form);
	InitA();
	makeValuePositive();
	Solve();
	ValueOptimalStrategies();
	display(form);
}

function getinput(form){
	var z;
	for (i=0;i<matrix.length;i++) {
		z=matrix.charCodeAt(i);
		if ((z==13)||(z==10)) break;
	}
	if (z==13) {
		mat = matrix.split("\r");  /*for Explorer*/
	} else if (z==10) {
		mat = matrix.split("\n");  /*for Netscape*/
	}
	m=mat.length;
	while (mat[m-1].length==0) m--;
	for (i=0;i<m;i++) {
		mat[i]=mat[i].split(" ");
	}
}

function InitA() {
	var i,j,k;
	m1=m+1;
	for (i=0;i<=m1;i++) {
		A[i]=[];
		A[i][0]=i;     /* First column */
	}
	for (i=1;i<m1;i++) {
		k=1;
		j=1;
		while (j<=mat[i-1].length) {
			if (mat[i-1][j-1]!="") {
				A[i][k] = mat[i-1][j-1];
				k++;
			}
			j++;
		}
	}
	n1=A[1].length;
	n=n1-1;
	n2=n1+1;
	for (i=1;i<m1;i++) {
		A[i][n1]=1;        /* Last column */
	}
	for (j=1;j<n1;j++) {
		A[0][j]=-j;        /* First row */
		A[m1][j] = -1;     /* Last row */
	}
	A[m1][n1]=0;          /* Lower Right corner */
	mess = "The matrix is<br>";
	i=1;
	while (i<m1) {
		str[i]=""
		j=1;
		while (j<n1) {
			str[i]+=" "+ A[i][j];
			j++;
		}
		mess += str[i]+"</br>";
		i++;
	}
}

function makeValuePositive() {
	var i,j;
	vsave=1*A[1][1];    /* Change A to number */
	j=2;
	while (j<n1) {		/* Find min first row */
		s=1*A[1][j];
		if (vsave>s) {
			vsave = s;
		}
		j++;
	}
	vsave=vsave-1;
	i=1;
	while (i<m1) {
		j=1;
		while (j<n1) {
			A[i][j]=A[i][j]-vsave;
			j++;
		}
		i++;
	}
}

function CheckA() {
	var i,j;
	mess1 = "The matrix is</br>";
	i=0;
	while (i<=m1) {
		str[i]=""
		j=0;
		while (j<=n1) {
			str[i]+=" "+ A[i][j];
			j++;
		}
		mess1 += str[i]+"</br>";
		i++;
	}
	alert(mess1)
}

function Solve() {
	var i,j,p,q,t1,d,epsilon;
	epsilon=.000000000001
//	CheckA();
	q=1;
	while (q != 0) {			/* Main loop */
		r=0;
		for (i=1;i<m1;i++) {	/* Find pivot row */
			t1=A[i][q];
			if (t1>epsilon) {     /* To avoid roundoff error */
				t2=A[i][n1];
				if (t2<=0) {
					p=i;
					i=m1;
				} else if (t1>t2*r) {
					p=i;
					r=t1/t2;
				}
			}
		}
//		alert("(p,q) = "+p+","+q);
		d=A[p][q];				/* Pivot on (p,q) */
		j=1;
		while (j<n2) {				/* Pivot row */
		    if (j!=q) A[p][j]=A[p][j]/d;
			j++;
		}
		i=1;
		while (i<=m1) {			/* Pivot main part */
		    if (i != p) {
			    j=1;
				while (j<=n1) {
				    if (j != q) A[i][j]=A[i][j]-A[i][q]*A[p][j];
				    j++;
				}
		    }
			i++;
		}
		i=1;
		while (i<=m1) {			/* Pivot col */
		    if (i != p) A[i][q] = (0.-A[i][q])/d;
			i++;
		}
		A[p][q]=1./d;
		t1=A[p][0];
		A[p][0]=A[0][q];
		A[0][q]=t1;				/* End pivot */
//		CheckA();
		q=0;
		j=1;
		while (j<n1) {			/* Find pivot col */
		    if (A[m1][j]<0) {
			    q=j;
				j=n1;
		    }
			j++;
		}
	}
}

function ValueOptimalStrategies() {
	x[0]=0;
	val=1./A[m1][n1];
	var j=1;
	while (j<n1) {
	    if (A[0][j] < 0) {
 	    	y[0-A[0][j]]=0
	    } else {
		    x[A[0][j]] = A[m1][j]*val;
	    }
		j++;
	}
	var i=1;
	while (i<m1) {
	    if (A[i][0] < 0) {
	    	y[0-A[i][0]]= A[i][n1]*val;
	    } else {
		    x[A[i][0]] = 0;
	    }
		i++;
	}
}


function display(form) {
	var i,j,t,opt1,opt2
	val=val+vsave;
	var t=Math.round(100000*val)/100000;
	foundev = Math.round(100000*val)/100000;
	mess+= "The value is "+t+".</br>";
	var t=Math.round(100000*x[1])/100000;
	opt1= "An optimal strategy for Player 1 is:</br> ("+t;
	i=2;
	while (i<=m) {
		t=Math.round(100000*x[i])/100000;
		opt1+= ","+t;
		i++;
	}
	opt1+=")</br>"; 
	var t=Math.round(100000*y[1])/100000;
	opt2="An optimal strategy for Player 2 is:</br> ("+t;
	j=2;
	while (j<=n) {
		t=Math.round(100000*y[j])/100000;
		opt2+= ","+t;
		j++;
	}
	opt2+=")</br>"; 
	mess+=opt1+opt2; 
	document.getElementById("outputbox").innerHTML += mess+"</br>"; 
}





//  End -->
