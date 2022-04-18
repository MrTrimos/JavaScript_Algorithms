"use strict"

let table_colon = 4;
let table_stroc = 9;

// Table
var elem = document.querySelector('#elem');

function createTable(parent, cols, rows){

	var table = document.createElement('table');

	for(var i = 0; i < rows; i++){
		var tr = document.createElement('tr');

		for(var j = 0; j < cols; j++){
		
			var td = document.createElement('td');
			tr.appendChild(td);
			
		}
		table.appendChild(tr);
	}

	parent.appendChild(table);
}


// Porametrs
let strok1 = ["№ ітерації, k","x1","x2","x3","f1","f2","f3","x~","f~"];

let Q_f = 0.001;
let Q_x = 0.001;

let a1 = [];
let a2 = [];
let a3 = [];

let x1 = [0.05];
let x2 = [];
let x3 = [];

let deltaX = 0.5;

let minX = [];
let maxX = [];

let f1 = [];
let f2 = [];
let f3 = [];

let minF = [];
let maxF = [];

let x_whith_Line = [];

let f_whith_Line = [];

let x_star = 0;

Decision();
createTable(elem, table_stroc, table_colon);
Paule();
text_fun();

function Paule(){
	let tds = elem.querySelectorAll('td');

		//strolk1
		for(let i = 0; i < strok1.length; i++){
			tds[i].innerHTML = strok1[i];
		}

		//№ ітерації,k
		for(let j = 0, i = table_stroc; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = j;
		}

		//x1
		for(let j = 0, i = table_stroc + 1; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x1[j]* 100) / 100;
		}

		//x2
		for(let j = 0, i = table_stroc + 2; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x2[j] * 1000) / 1000;
		}

		//x3
		for(let j = 0, i = table_stroc + 3; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x3[j] * 1000) / 1000;
		}

		//f1
		for(let j = 0, i = table_stroc + 4; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f1[j] * 1000) / 1000;
		}

		//f2
		for(let j = 0, i = table_stroc + 5; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = f2[j].toFixed(3);
		}

		//f3
		for(let j = 0, i = table_stroc + 6; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = f3[j].toFixed(3);
		}

		//x_whith_line
		for(let j = 0, i = table_stroc + 7; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = x_whith_Line[j].toFixed(3);
		}


		//f_whith_line
		for(let j = 0, i = table_stroc + 8; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = f_whith_Line[j].toFixed(3);
		}

}

function Decision(){

	// f1[0] = 2 * Math.pow(x1[0], 2) - 4 * x1[0] + (16 / x1[0]);
	f1[0] = Math.pow((x1[0] - 1),2) * Math.pow((x1[0] + 1), 4) * Math.pow((x1[0] - 2), 3);

	x2[0] = x1[0] + deltaX;

	// f2[0] = 2 * Math.pow(x2[0], 2) - 4 * x2[0] + (16 / x2[0]);
	f2[0] = Math.pow((x2[0] - 1),2) * Math.pow((x2[0] + 1), 4) * Math.pow((x2[0] - 2), 3);

	// if(f2[0] < f1[0]){
		x3[0] = x1[0] + 2 * deltaX;
	// }

	// f3[0] = 2 * Math.pow(x3[0], 2) - 4 * x3[0] + (16 / x3[0]);	
	f3[0] = Math.pow((x3[0] - 1),2) * Math.pow((x3[0] + 1), 4) * Math.pow((x3[0] - 2), 3);

	Interation();
}

function Interation(){
	for(let i = 0; i < table_colon; i++){
		minF[i] = Math.min(f1[i],f2[i],f3[i]);
		maxF[i] = Math.max(f1[i],f2[i],f3[i]);

		minX[i] = Math.min(x1[i],x2[i],x3[i]);
		maxX[i] = Math.max(x1[i],x2[i],x3[i]);


		a1[i] = ( (f2[i] - f1[i]) / (x2[i] - x1[i]) ); 

		a2[i] = ( (1 / (x3[i] - x2[i])) * ( ((f3[i] - f1[i]) / (x3[i] - x1[i])) 
			- ((f2[i] - f1[i]) / (x2[i] - x1[i])) ) );


		if(a2[i] < 0){x_whith_Line[i] = 2 * minX[i] - maxX[i];}
		else{x_whith_Line[i] = ( ((x2[i] + x1[i]) / 2) - (a1[i] / (2 * a2[i])) );}

		alert(x_whith_Line[i])

		f_whith_Line[i] = 2 * Math.pow(x_whith_Line[i], 2) - 4 * x_whith_Line[i] + (16 / x_whith_Line[i]);

		if( (Math.abs(minF[i] - f_whith_Line[i])) <= Q_f && (Math.abs(minX[i] - x_whith_Line[i])) <= Q_x ){
			// table_colon = i + 1;
			alert(i)
		}

		x1[i + 1] = x1[i];
		x2[i + 1] = x2[i];
		x3[i + 1] = x_whith_Line[i];

		// f1[i + 1] = 2 * Math.pow(x1[i + 1], 2) - 4 * x1[i + 1] + (16 / x1[i + 1]);
		// f2[i + 1] = 2 * Math.pow(x2[i + 1], 2) - 4 * x2[i + 1] + (16 / x2[i + 1]);
		// f3[i + 1] = 2 * Math.pow(x3[i + 1], 2) - 4 * x3[i + 1] + (16 / x3[i + 1]);	

		f1[i + 1] = Math.pow((x1[i + 1] - 1),2) * Math.pow((x1[i + 1] + 1), 4) * Math.pow((x1[i + 1] - 2), 3);
		f2[i + 1] = Math.pow((x2[i + 1] - 1),2) * Math.pow((x2[i + 1] + 1), 4) * Math.pow((x2[i + 1] - 2), 3);
		f3[i + 1] = Math.pow((x3[i + 1] - 1),2) * Math.pow((x3[i + 1] + 1), 4) * Math.pow((x3[i + 1] - 2), 3);

		table_colon = 3;
	}
}


function text_fun(){
	let text = document.querySelector('#text');
	let p = document.createElement('p');
	x_star = x_whith_Line[table_colon - 2];
	p.innerHTML = `x* = ${Math.ceil(x_star * 1000) / 1000}`;

	text.appendChild(p);
}