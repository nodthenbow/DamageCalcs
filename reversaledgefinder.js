
<!-- Begin

var A=[],str=[],x=[],y=[],mat=[],dvals=[];
var m,m1,n,n1,n2,mess,val,vsave,r2ev,r2gb1ev,r2gb2ev,foundev;

/*mat is the matrix



*/

function main(form) {
	calcrounds(form);
	
	display(form);
	form.output.value=mess; 
}
	

function InitA() {
	A=[];
	m=7;
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
	mess = "The matrix is\r\n";
	i=1;
	while (i<m1) {
		str[i]=""
		j=1;
		while (j<n1) {
			str[i]+=" "+ A[i][j];
			j++;
		}
		mess += str[i]+"\r\n";
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
	mess1 = "The matrix is\n";
	i=0;
	while (i<=m1) {
		str[i]=""
		j=0;
		while (j<=n1) {
			str[i]+=" "+ A[i][j];
			j++;
		}
		mess1 += str[i]+"\r";
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
	mess+= "The value is "+t+".\r\n";
	var t=Math.round(100000*x[1])/100000;
	opt1= "An optimal strategy for Player 1 is:\r\n ("+t;
	i=2;
	while (i<=m) {
		t=Math.round(100000*x[i])/100000;
		opt1+= ","+t;
		i++;
	}
	opt1+=")\r"; 
	var t=Math.round(100000*y[1])/100000;
	opt2="An optimal strategy for Player 2 is:\r\n ("+t;
	j=2;
	while (j<=n) {
		t=Math.round(100000*y[j])/100000;
		opt2+= ","+t;
		j++;
	}
	opt2+=")\r\n"; 
	mess+=opt1+opt2; 
	document.getElementById("outputbox").value += mess+"\r\n"; 
}

function calcrounds(form){
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
	
	if(gbriskp1){
		dvals[18]=-1*form.p2gba.value;
		dvals[19]=-1*form.p2gbb.value;
		dvals[20]=-1*form.p2gbk.value;
	}
	if(gbriskp2){
		dvals[15]=form.p1gba.value;
		dvals[16]=form.p1gbb.value;
		dvals[17]=form.p1gbk.value;
	}
	if(form.bypercents.value){
		for(i=0;i<23;i++){
			dvals[i] = dvals[i]/280.0;
		}
	}
	
	mat[0]= dvals[0];
	mat[1]= dvals[9];
	mat[2]= dvals[0];
	mat[3]= dvals[15];
	mat[4]= dvals[12];
	mat[5]= dvals[0];
	mat[6]= dvals[0];
	mat[7]= dvals[1];
	mat[8]= dvals[9];
	mat[9]= dvals[1];
	mat[10]= dvals[16];
	mat[11]= dvals[1];
	mat[12]= dvals[1];
	mat[13]= dvals[14];
	mat[14]= dvals[8];
	mat[15]= dvals[2];
	mat[16]= dvals[2];
	mat[17]= dvals[17];
	mat[18]= dvals[2];
	mat[19]= dvals[13];
	mat[20]= dvals[2];
	mat[21]= dvals[18];
	mat[22]= dvals[19];
	mat[23]= dvals[20];
	mat[24]= dvals[21];
	mat[25]= dvals[25];
	mat[26]= dvals[26];
	mat[27]= dvals[27];
	mat[28]= dvals[5];
	mat[29]= dvals[9];
	mat[30]= dvals[10];
	mat[31]= dvals[31];
	mat[32]= dvals[32];
	mat[33]= dvals[33];
	mat[34]= dvals[34];
	mat[35]= dvals[8];
	mat[36]= dvals[9];
	mat[37]= dvals[6];
	mat[38]= dvals[38];
	mat[39]= dvals[39];
	mat[40]= dvals[40];
	mat[41]= dvals[41];
	mat[42]= dvals[8];
	mat[43]= dvals[7];
	mat[44]= dvals[10];
	mat[45]= dvals[45];
	mat[46]= dvals[46];
	mat[47]= dvals[47];
	mat[48]= dvals[48];
	
	document.getElementById("outputbox").value += "Round 2 after P1's B is blocked\r\n";
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
	
	if(gbriskp1){
		dvals[18]=-1*form.p2gba.value;
		dvals[19]=-1*form.p2gbb.value;
		dvals[20]=-1*form.p2gbk.value;
	}
	if(gbriskp2){
		dvals[15]=form.p1gba.value;
		dvals[16]=form.p1gbb.value;
		dvals[17]=form.p1gbk.value;
	}
	if(form.bypercents.value){
		for(i=0;i<23;i++){
			dvals[i] = dvals[i]/280.0;
		}
	}
	
	mat[0]= dvals[0];
	mat[1]= dvals[9];
	mat[2]= dvals[0];
	mat[3]= dvals[15];
	mat[4]= dvals[12];
	mat[5]= dvals[0];
	mat[6]= dvals[0];
	mat[7]= dvals[1];
	mat[8]= dvals[9];
	mat[9]= dvals[1];
	mat[10]= dvals[16];
	mat[11]= dvals[1];
	mat[12]= dvals[1];
	mat[13]= dvals[14];
	mat[14]= dvals[8];
	mat[15]= dvals[2];
	mat[16]= dvals[2];
	mat[17]= dvals[17];
	mat[18]= dvals[2];
	mat[19]= dvals[13];
	mat[20]= dvals[2];
	mat[21]= dvals[18];
	mat[22]= dvals[19];
	mat[23]= dvals[20];
	mat[24]= dvals[21];
	mat[25]= dvals[25];
	mat[26]= dvals[26];
	mat[27]= dvals[27];
	mat[28]= dvals[5];
	mat[29]= dvals[9];
	mat[30]= dvals[10];
	mat[31]= dvals[31];
	mat[32]= dvals[32];
	mat[33]= dvals[33];
	mat[34]= dvals[34];
	mat[35]= dvals[8];
	mat[36]= dvals[9];
	mat[37]= dvals[6];
	mat[38]= dvals[38];
	mat[39]= dvals[39];
	mat[40]= dvals[40];
	mat[41]= dvals[41];
	mat[42]= dvals[8];
	mat[43]= dvals[7];
	mat[44]= dvals[10];
	mat[45]= dvals[45];
	mat[46]= dvals[46];
	mat[47]= dvals[47];
	mat[48]= dvals[48];
	
	document.getElementById("outputbox").value += "Round 2 after P2's B is blocked\r\n";
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
	if(gbriskp1){
		dvals[18]=-1*form.p2gba.value;
		dvals[19]=-1*form.p2gbb.value;
		dvals[20]=-1*form.p2gbk.value;
	}
	if(gbriskp2){
		dvals[15]=form.p1gba.value;
		dvals[16]=form.p1gbb.value;
		dvals[17]=form.p1gbk.value;
	}
	*/
	
	mat[0]= r2ev;
	mat[1]= dvals[9];
	mat[2]= dvals[0];
	mat[3]= dvals[15];
	mat[4]= dvals[12];
	mat[5]= dvals[0];
	mat[6]= dvals[0];
	mat[7]= dvals[1];
	mat[8]= r2ev;
	mat[9]= dvals[1];
	mat[10]= r2gb1ev;
	mat[11]= dvals[1];
	mat[12]= dvals[1];
	mat[13]= dvals[14];
	mat[14]= dvals[8];
	mat[15]= dvals[2];
	mat[16]= r2ev;
	mat[17]= dvals[17];
	mat[18]= dvals[2];
	mat[19]= dvals[13];
	mat[20]= dvals[2];
	mat[21]= dvals[18];
	mat[22]= r2gb2ev;
	mat[23]= dvals[20];
	mat[24]= r2ev;
	mat[25]= dvals[25];
	mat[26]= dvals[26];
	mat[27]= dvals[27];
	mat[28]= dvals[5];
	mat[29]= dvals[9];
	mat[30]= dvals[10];
	mat[31]= dvals[31];
	mat[32]= dvals[32];
	mat[33]= dvals[33];
	mat[34]= dvals[34];
	mat[35]= dvals[8];
	mat[36]= dvals[9];
	mat[37]= dvals[6];
	mat[38]= dvals[38];
	mat[39]= dvals[39];
	mat[40]= dvals[40];
	mat[41]= dvals[41];
	mat[42]= dvals[8];
	mat[43]= dvals[7];
	mat[44]= dvals[10];
	mat[45]= dvals[45];
	mat[46]= dvals[46];
	mat[47]= dvals[47];
	mat[48]= dvals[48];
	
	document.getElementById("outputbox").value += "Round 1\r\n";
	InitA();
	makeValuePositive();
	Solve();
	ValueOptimalStrategies();
	display(form);
	
}



//  End -->
