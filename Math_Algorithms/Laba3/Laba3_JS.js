"use strict"

let table_colon = 12;
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
let strok1 = ["№ ітерації, k","x1","xm","x2","f1","fm","f2","[ak, bk]","Lk"];
let x1 = [' '];
let x2 = [' '];
let xm = [' '];

let f1 = [' '];
let f2 = [' '];
let fm = [' '];


let a = [' ', 0.05];
let b = [' ', 1.25];

let L = [' '];

let x_star = 0;

createTable(elem, table_stroc, table_colon);

PoklovDilen();
text_fun();
function PoklovDilen(){
	let tds = elem.querySelectorAll('td');


	//strolk1
	for(let i = 0; i < strok1.length; i++){
		tds[i].innerHTML = strok1[i];
	}

	//№ ітерації,k
	for(let j = 0, i = table_stroc; i < table_stroc * table_colon; i = i + table_stroc, j++){
		tds[i].innerHTML = j;
	}

	Decision();

	//x1
	for(let j = 0, i = table_stroc + 1; i < table_stroc * table_colon; i = i + table_stroc, j++){
		tds[i].innerHTML = Math.ceil(x1[j] * 100) / 100;
	}

	//xm
	for(let j = 0, i = table_stroc + 2; i < table_stroc * table_colon; i = i + table_stroc, j++){
		tds[i].innerHTML = Math.ceil(xm[j] * 100) / 100;
	}

	//x2
	for(let j = 0, i = table_stroc + 3; i < table_stroc * table_colon; i = i + table_stroc, j++){
		tds[i].innerHTML = Math.ceil(x2[j] * 100) / 100;
	}


	//f1
	for(let j = 0, i = table_stroc + 4; i < table_stroc * table_colon; i = i + table_stroc, j++){
		tds[i].innerHTML = Math.ceil(f1[j] * 1000) / 1000;
	}

	//fm
	for(let j = 0, i = table_stroc + 5; i < table_stroc * table_colon; i = i + table_stroc, j++){
		tds[i].innerHTML = Math.ceil(fm[j] * 1000) / 1000;
	}

	//f2
	for(let j = 0, i = table_stroc + 6; i < table_stroc * table_colon; i = i + table_stroc, j++){
		tds[i].innerHTML = Math.ceil(f2[j] * 1000) / 1000;
	}


	//[ak, bk]
	for(let j = 0, i = table_stroc + 7; i < table_stroc * table_colon; i = i + table_stroc, j++){
		tds[i].innerHTML = `[${a[j+1].toFixed(3)}, ${b[j+1].toFixed(3)}]`;
	}


	//L
	for(let j = 0, i = table_stroc + 8; i < table_stroc * table_colon; i = i + table_stroc, j++){
		tds[i].innerHTML = L[j + 1].toFixed(4);
	}

	// x_star_fun();
	// //x*
	// for(let i = table_stroc + 9; i <= table_stroc * table_colon; i = i + table_stroc){
	// 	tds[i].innerHTML = `x* = ${x_star.toFixed(3)}`;
	// }


}


function Decision(){
	for (let i = 1; i < table_colon; i++) {
		xm[i] = ( (a[i] + b[i]) / 2 );

		fm[i] = 2 * Math.pow(xm[i], 2) - 4 * xm[i] + (16 / xm[i]);

		L[i] = b[i] - a[i]; 

		x1[i] = a[i] + (L[i] / 4);
		x2[i] = b[i] - (L[i] / 4);

		// f1[i] = 2 * Math.pow(x1[i], 2) - 4 * x1[i] + (16 / x1[i]); 
		// f2[i] = 2 * Math.pow(x2[i], 2) - 4 * x2[i] + (16 / x2[i]); 

		f1[i] = Math.pow((x1[i] - 1),2) * Math.pow((x1[i] + 1), 4) * Math.pow((x1[i] - 2), 3);
		f2[i] = Math.pow((x2[i] - 1),2) * Math.pow((x2[i] + 1), 4) * Math.pow((x2[i] - 2), 3);


		if (f1[i] < fm[i]){ 
			b[i + 1] = xm[i]; 
			a[i + 1] = a[i]; 
			xm[i] = x1[i];
			fm[i] = f1[i];}

		if(f2[i] < fm[i]){
			a[i + 1] = xm[i];
			xm[i] = x2[i];
			fm[i] = f2[i];}

		if(f2[i] >= fm[i]){
			a[i + 1] = x1[i];
			b[i + 1] = x2[i];
			xm[i] = xm[i];
			fm[i] = fm[i];}

	}

}

function x_star_fun(){
	x_star = ( (a[a.length-1] + b[b.length-2]) / 2 );
}

function text_fun(){
	let text = document.querySelector('#text');
	let p = document.createElement('p');
	x_star = ( (a[table_colon] + b[table_colon-1]) / 2 );
	p.innerHTML = `x* = ${x_star.toFixed(4)}`;

	text.appendChild(p);
}