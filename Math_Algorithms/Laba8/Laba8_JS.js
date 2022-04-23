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

let x = [0.05];

let L = [' ', 1];
let Q = 0.01;
let J = 0.5;

let h = 0.001;

let f = [];
let f_one_hatch = [];
let f_two_hatch = [];

let x_whith_line = [];
let f_whith_line = [];
let f_one_hatch_line = [];

let FLineXHatch_FX = [];
let J_FXPow2_FTwoHatch = [];

let iteration = 0;

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

	f[0] = Math.pow((x[0] - 1),2) * Math.pow((x[0] + 1), 4) * Math.pow((x[0] - 2), 3);

	f_one_hatch[0] = ( (Math.pow((x[0] + h - 1),2) * Math.pow((x[0]+ h + 1), 4) * Math.pow((x[0] + h - 2), 3)) 
		- (Math.pow((x[0] - h - 1),2) * Math.pow((x[0] - h + 1), 4) * Math.pow((x[0] - h - 2), 3)) ) 
		/ (2 * h);

	f_two_hatch[0] = ( (Math.pow((x[0] + h - 1),2) * Math.pow((x[0]+ h + 1), 4) * Math.pow((x[0] + h - 2), 3))
		- 2 * (Math.pow((x[0] - 1),2) * Math.pow((x[0] + 1), 4) * Math.pow((x[0] - 2), 3))
		+ (Math.pow((x[0] - h - 1),2) * Math.pow((x[0] - h + 1), 4) * Math.pow((x[0] - h - 2), 3))
		) / (Math.pow(h, 2));

	//if(Math.abs(f_one_hatch[0] < Q)){table_colon = i + 1 ; break;} 

	for(let i = 1; i < table_colon; i++){

		L[i] = 1;

		if (i > 2){iteration = 1}

		x_whith_line[i] = x[i - 1 - iteration] - (f_one_hatch[i - 1 - iteration] / f_two_hatch[i - 1 - iteration]);
		f_one_hatch_line[i] = ( (Math.pow((x_whith_line[i - iteration] + h - 1),2) * Math.pow((x_whith_line[i - iteration]+ h + 1), 4) * Math.pow((x_whith_line[i - iteration] + h - 2), 3)) 
		- (Math.pow((x_whith_line[i - iteration] - h - 1),2) * Math.pow((x_whith_line[i - iteration] - h + 1), 4) * Math.pow((x_whith_line[i - iteration] - h - 2), 3)) ) 
		/ (2 * h);


		if(Math.abs(f_one_hatch_line[i] > Q)){table_colon = i + 1 ; break;} 

		

		f_whith_line[i] = Math.pow((x_whith_line[i] - 1),2) * Math.pow((x_whith_line[i] + 1), 4) * Math.pow((x_whith_line[i] - 2), 3);
		
		FLineXHatch_FX[i] = f_whith_line[i] - f[i - 1];
		J_FXPow2_FTwoHatch[i] = ( -J * Math.pow(f_one_hatch[i - 1], 2) ) / f_two_hatch[i - 1];

		if(FLineXHatch_FX[i] > J_FXPow2_FTwoHatch[i]){L[i + 1] = L[i] / 2;}

		x_whith_line[i + 1] = x[i - 1] - L[i] * (f_one_hatch[i - 1] / f_two_hatch[i - 1]);

		f_one_hatch_line[i + 1] = ( (Math.pow((x_whith_line[i + 1] + h - 1),2) * Math.pow((x_whith_line[i + 1]+ h + 1), 4) * Math.pow((x_whith_line[i + 1] + h - 2), 3)) 
		- (Math.pow((x_whith_line[i + 1] - h - 1),2) * Math.pow((x_whith_line[i + 1] - h + 1), 4) * Math.pow((x_whith_line[i + 1] - h - 2), 3)) ) 
		/ (2 * h);

		if(Math.abs(f_one_hatch_line[i + 1] > Q)){table_colon = i + 1 ; break;} 

		f_whith_line[i + 1] = Math.pow((x_whith_line[i + 1] - 1),2) * Math.pow((x_whith_line[i + 1] + 1), 4) * Math.pow((x_whith_line[i + 1] - 2), 3);


		FLineXHatch_FX[i + 1] = f_whith_line[i] - f[i - 1];
		J_FXPow2_FTwoHatch[i + 1] = ( -J * Math.pow(f_one_hatch[i - 1], 2) ) / f_two_hatch[i - 1];

		if(FLineXHatch_FX[i + 1] > J_FXPow2_FTwoHatch[i + 1]){x[i] = x_whith_line[i + 1];}

		f_one_hatch[i] = f_one_hatch_line[i + 1];

		if(Math.abs(f_one_hatch[i] > Q)){table_colon = i + 1 ; break;} 

		f_two_hatch[i] = 1 / 1 + Math.pow(x[i], 2);
		i = i + 1;
	}
}