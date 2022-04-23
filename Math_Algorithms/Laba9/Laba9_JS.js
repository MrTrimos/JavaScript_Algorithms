"use strict"

let table_colon = 10;
let table_stroc = 3;

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
let strok1 = ["№ ітерації, k","xk","f'(xk)"];

let h = 0.001;

let x = [0.05];
let Q = 0.001;

let f = [];
let f_one_hatch = [];
let f_two_hatch = [];

Decision();
createTable(elem, table_stroc, table_colon);
Modification_Nuton();

function Modification_Nuton(){
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
			tds[i].innerHTML = x[j].toFixed(3);
		}

		//f'(x)
		for(let j = 0, i = table_stroc + 2; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = f_one_hatch[j].toFixed(4);
		}

}

function Decision(){

	f[0] = Math.pow((x[0] - 1),2) * Math.pow((x[0] + 1), 4) * Math.pow((x[0] - 2), 3);

	f_one_hatch[0] = ( (Math.pow((x[0] + h - 1),2) * Math.pow((x[0]+ h + 1), 4) * Math.pow((x[0] + h - 2), 3)) 
		- (Math.pow((x[0] - h - 1),2) * Math.pow((x[0] - h + 1), 4) * Math.pow((x[0] - h - 2), 3)) ) 
		/ (2 * h);
			
	f_two_hatch[0] = ( (Math.pow((x[0] + h - 1),2) * Math.pow((x[0]+ h + 1), 4) * Math.pow((x[0] + h - 2), 3))
		- 2 * (Math.pow((x[0] - 1),2) * Math.pow((x[0] + 1), 4) * Math.pow((x[0] - 2), 3))
		+ (Math.pow((x[0] - h - 1),2) * Math.pow((x[0] - h + 1), 4) * Math.pow((x[0] - h - 2), 3))
		) / (Math.pow(h, 2));

	if(Math.abs(f_one_hatch[0]) < Q){table_colon = i + 1 ;}
	
	for(let i = 1; i < table_colon; i++){

		x[i] = x[i - 1] - f_one_hatch[i - 1] / f_two_hatch[0];
		f_one_hatch[i] = ( (Math.pow((x[i] + h - 1),2) * Math.pow((x[i]+ h + 1), 4) * Math.pow((x[i] + h - 2), 3)) 
			- (Math.pow((x[i] - h - 1),2) * Math.pow((x[i] - h + 1), 4) * Math.pow((x[i] - h - 2), 3)) ) 
			/ (2 * h);

		if(Math.abs(f_one_hatch[i]) < Q){table_colon = i + 2 ; break;}
	}
}