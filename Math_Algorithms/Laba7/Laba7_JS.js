"use strict"

let table_colon = 5;
let table_stroc = 6;

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
let strok1 = ["№ ітерації, k","xk","f(xk)","f'(xk)","|f'(xk)|","f''(xk)"];

let Q = 0.001;

let x = [1.5];
let f = [];

let f_one_hatch = [];
let f_one_hatch_ABS = [];

let f_two_hatch = [];

let d = 1;

Decision();
createTable(elem, table_stroc, table_colon);
Nuton();

function Nuton(){
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

		//f(x)
		for(let j = 0, i = table_stroc + 2; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f[j] * 1000) / 1000;
		}

		//f'(x)
		for(let j = 0, i = table_stroc + 3; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_one_hatch[j] * 1000) / 1000;
		}

		//|f'(x)|
		for(let j = 0, i = table_stroc + 4; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_one_hatch_ABS[j] * 1000) / 1000;
		}

		//f''(x)
		for(let j = 0, i = table_stroc + 5; i < table_stroc * table_colon; i = i + table_stroc, j++){
			tds[i].innerHTML = Math.ceil(f_two_hatch[j] * 1000) / 1000;
		}

}


function Decision(){
	for(let i = 0; i < table_colon; i++){
		f[i] = 2 * Math.pow(x[i], 2) - 4 * x[i] + (16 / x[i]); // 1

		f_one_hatch[i] = 4 * x[i] - 4 - (16 / Math.pow(x[i], 2)); // 1
		f_two_hatch[i] = 4 + (32 / Math.pow(x[i], 3)); // 1
		f_one_hatch_ABS[i] = Math.abs(4 * x[i] - 4 - (16 / Math.pow(x[i], 2))); // 1

		// f[i] = Math.pow((x[i] - 1),2) * Math.pow((x[i] + 1), 4) * Math.pow((x[i] - 2), 3); // 2

		// f_one_hatch[i] = ( (2 * x[i] - 2) * Math.pow((x[i] + 1), 4) + ( 4 * Math.pow(x[i], 2)
		// - 8 * x[i] + 4) * Math.pow((x[i] + 1), 3) )
		// * Math.pow((x-2),3)
		// + (3 * Math.pow(x[i], 4) - 18 * Math.pow(x[i], 3) + 39 * Math.pow(x[i],2) - 36 * x[i] + 12)
		// * Math.pow((x+1),4); // 2
		
		// f_two_hatch[i] = 4 + (32 / Math.pow(x[i], 3)); // 2
		// f_one_hatch_ABS[i] = Math.abs(( (2 * x[i] - 2) * Math.pow((x[i] + 1), 4) + ( 4 * Math.pow(x[i], 2)
		// - 8 * x[i] + 4) * Math.pow((x[i] + 1), 3) )
		// * Math.pow((x-2),3)
		// + (3 * Math.pow(x[i], 4) - 18 * Math.pow(x[i], 3) + 39 * Math.pow(x[i],2) - 36 * x[i] + 12)
		// * Math.pow((x+1),4)); // 2

		console.log(f_one_hatch_ABS[i])
		if(f_one_hatch_ABS[i] <= Q){table_colon = i + 2; break;}

		x[i + 1] = x[i] - (f_one_hatch[i] / f_two_hatch[i]);
	}
}
