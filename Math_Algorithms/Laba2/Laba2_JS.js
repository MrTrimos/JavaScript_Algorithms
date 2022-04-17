"use strict"

let table_colon = 12;
let table_stroc = 7;

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
let strok1 = ["№ ітерації, k","x1","x2","f1","f2","[ak, bk]","Lk"];
let xk = 0.05;
let L_step = 0.001;
let a = [' ',0.05];
let b = [' ',1.25];
let x1 = [' '];
let x2 = [' '];
let E = 0.0001;
let f1 = [' '];
let f2 = [' '];
let L = [];
let x_star = 0;


createTable(elem, table_stroc, table_colon);

Dihotomii();


function Dihotomii(){
	let tds = elem.querySelectorAll('td');


		//strolk1
		for(let i = 0; i < strok1.length; i++){
			tds[i].innerHTML = strok1[i];
		}

		//№ ітерації,k
		for(let j = 0, i = table_stroc; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = j;
		}

		Resh_1();

		//x1
		for(let j = 0, i = table_stroc + 1; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x1[j] * 1000) / 1000;
		}

		//x2
		for(let j = 0, i = table_stroc + 2; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x2[j] * 1000) / 1000;
		}

		//f1
		for(let j = 0, i = table_stroc + 3; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f1[j] * 1000) / 1000;
		}

		//f2
		for(let j = 0, i = table_stroc + 4; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f2[j] * 1000) / 1000;
		}

		//[ak, bk]
		for(let j = 0, i = table_stroc + 5; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = `[${a[j+1].toFixed(3)}, ${b[j+1].toFixed(3)}]`;
		}


		L_operatsthen();
		//L
		for(let j = 0, i = table_stroc + 6; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = L[j + 1].toFixed(3);
		}
}

x_star_fun();
text_fun();

function text_fun(){
	let text = document.querySelector('#text');
	let p = document.createElement('p');

	p.innerHTML = `x* = ${x_star}`;

	text.appendChild(p);
}


function Resh_1(){
	for (let i = 1; i < table_colon; i++) {

		x1[i] = ( (a[i] + b[i]) / 2 ) - (E / 2);
		x2[i] = x1[i] + E;

		//alert(x1[i]);

		// f1[i] = 2 * Math.pow(x1[i], 2) - 4 * x1[i] + (16 / x1[i]);
		// f2[i] = 2 * Math.pow(x2[i], 2) - 4 * x2[i] + (16 / x2[i]);
		f1[i] = Math.pow((x1[i] - 1),2) * Math.pow((x1[i] + 1), 4) * Math.pow((x1[i] - 2), 3);
		f2[i] = Math.pow((x2[i] - 1),2) * Math.pow((x2[i] + 1), 4) * Math.pow((x2[i] - 2), 3);

		//alert(f1[i]);

		if (f1[i] < f2[i]){ a[i+1] = a[i]; b[i+1] = x2[i]; }
		if (f1[i] >= f2[i]){ a[i+1] = x1[i]; b[i+1] = b[i]; }
	}
}

function L_operatsthen(){
	for (let i = 0; i < table_colon; i++) {
		L[i] = b[i] - a[i];   

		if (L[i + 1] <= 2 * L_step){ x_star = ( (a[i] + b[i]) / 2); }
	}
}

function x_star_fun(){
	x_star = ( (a[a.length-1] + b[b.length-2]) / 2 );
}


function efficiency(){
	for(let i = 0; i < table_colon; i++){

		L[i] = ( L[0] / Math.pow(2, i) ) + E * ( ( 1 / 2 ) + ( 1 / Math.pow(2, i)) );
	}
}