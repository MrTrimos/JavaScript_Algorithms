"use strict"

let table_colon = 14;
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
let strok1 = ["№ ітерації, k","xk-1","f'(xk-1)","xk","f'(xk)","xk+1","f'(xk+1)"];

let h = 0.001;

let x = [0.05, 1.25];

let Q = 0.001;

let f = [];
let f_one_hatch = [];

Decision();
createTable(elem, table_stroc, table_colon);
Nuton_Sicn();

function Nuton_Sicn(){
	let tds = elem.querySelectorAll('td');

		//strolk1
		for(let i = 0; i < strok1.length; i++){
			tds[i].innerHTML = strok1[i];
		}

		//№ ітерації,k
		for(let j = 0, i = table_stroc; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = j;
		}

		//xk-1
		for(let j = 0, i = table_stroc + 1; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x[j - 1] * 100) / 100;
		}

		//f'(xk-1)
		for(let j = 0, i = table_stroc + 2; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_one_hatch[j - 1] * 100) / 100;
		}

		//xk
		for(let j = 0, i = table_stroc + 3; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x[j] * 100) / 100;
		}

		//f'(xk)
		for(let j = 0, i = table_stroc + 4; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_one_hatch[j] * 100) / 100;
		}

		//xk+1
		for(let j = 0, i = table_stroc + 5; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(x[j + 1]  * 100) / 100;
		}

		//f'(xk+1)
		for(let j = 0, i = table_stroc + 6; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_one_hatch[j + 1] * 100) / 100;
		}

}

function Decision(){
	for(let i = 0; i < table_colon; i++){

		f[i] = Math.pow((x[i] - 1),2) * Math.pow((x[i] + 1), 4) * Math.pow((x[i] - 2), 3); // 2

		f_one_hatch[i] = ( (Math.pow((x[i] + h - 1),2) * Math.pow((x[i]+ h + 1), 4) * Math.pow((x[i] + h - 2), 3)) 
		- (Math.pow((x[i] - h - 1),2) * Math.pow((x[i] - h + 1), 4) * Math.pow((x[i] - h - 2), 3)) ) 
		/ (2 * h);

		f_one_hatch[i + 1] = ( (Math.pow((x[i + 1] + h - 1),2) * Math.pow((x[i + 1]+ h + 1), 4) * Math.pow((x[i + 1] + h - 2), 3)) 
		- (Math.pow((x[i + 1] - h - 1),2) * Math.pow((x[i + 1] - h + 1), 4) * Math.pow((x[i + 1] - h - 2), 3)) ) 
		/ (2 * h);

		x[i + 2] = (f_one_hatch[i + 1] * x[i] - f_one_hatch[i] * x[i + 1]) / (f_one_hatch[i + 1] - f_one_hatch[i]);
		
		f_one_hatch[i + 2] = ( (Math.pow((x[i + 2] + h - 1),2) * Math.pow((x[i + 2]+ h + 1), 4) * Math.pow((x[i + 2] + h - 2), 3)) 
		- (Math.pow((x[i + 2] - h - 1),2) * Math.pow((x[i + 2] - h + 1), 4) * Math.pow((x[i + 2] - h - 2), 3)) ) 
		/ (2 * h);

		if(Math.abs(f_one_hatch[i + 2]) < Q){alert(i);table_colon = i + 1; break;}
		
		if(f[i + 2] > 0){x[i + 1] = x[0];}
	}
}