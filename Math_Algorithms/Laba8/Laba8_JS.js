"use strict"

let table_colon = 5;
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
let strok1 = ["№ ітерації, k","xk","L","f(xk)","f'(xk)","f''(xk)","x~","f(x~)","f'(x~)"];

let x = [-1.6];

let L = [];
let Q = 0.01;
let J = 0.5;

let f = [];
let f_one_hatch = [];
let f_two_hatch = [];

let x_whith_line = [];
let f_whith_line = [];
let f_one_hatch_line = [];

Decision();
createTable(elem, table_stroc, table_colon);
Nuton_Rafson();

function Nuton_Rafson(){
	let tds = elem.querySelectorAll('td');

		//strolk1
		for(let i = 0; i < strok1.length; i++){
			tds[i].innerHTML = strok1[i];
		}

		//№ ітерації,k
		for(let j = 0, i = table_stroc; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = j;
		}

		//x
		for(let j = 0, i = table_stroc + 1; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x[j]* 100) / 100;
		}

		//L
		for(let j = 0, i = table_stroc + 2; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(L[j] * 100) / 100;
		}

		//f(x)
		for(let j = 0, i = table_stroc + 3; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f[j] * 1000) / 1000;
		}

		//f'(x)
		for(let j = 0, i = table_stroc + 4; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_one_hatch[j] * 1000) / 1000;
		}

		//f''(x)
		for(let j = 0, i = table_stroc + 5; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_two_hatch[j] * 1000) / 1000;
		}

		//x~
		for(let j = 0, i = table_stroc + 6; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x_whith_line[j] * 1000) / 1000;
		}

		//f(x~)
		for(let j = 0, i = table_stroc + 7; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_whith_line[j] * 1000) / 1000;
		}

		//f'(x~)
		for(let j = 0, i = table_stroc + 8; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_one_hatch_line[j] * 1000) / 1000;
		}
}


function Decision(){
	for(let i = 0; i < table_colon; i++){
		f[i] = x[i] * Math.atan() * x[i] - (1/2) * Math.In()
	}
}