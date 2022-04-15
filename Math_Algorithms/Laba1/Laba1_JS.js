"use strict"

// Table
var elem = document.querySelector('#elem');

createTable(elem, 6, 6);

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
let stolb = 5;
let triangle_0 = 0.3;
let xk = 0.05;
let fun = [];
let tr_and_fl = [];
let xk_ras = [];
let strok1 = ["№ ітерації, k","^0","xk","f(xk)","f(xk) < f(xk-1)","[a0, b0]"];



Swenna();

function Swenna(){
	var tds = elem.querySelectorAll('td');

	//strolk1
	for(var i = 0; i < strok1.length; i++){
		tds[i].innerHTML = strok1[i];
	}

	//№ ітерації,k
	for(var j = 0, i = 6; i < 33; i = i + 6, j++){
		tds[i].innerHTML = j;
	}

	//^0
	for(var i = 7; i < 33; i = i + 6){
		tds[i].innerHTML = triangle_0;
	}

	//xk
	xk_fun();
	for(var j = 0, i = 8; i < 33; i = i + 6, j++){
		//tds[i].innerHTML = Math.ceil(xk_fun() * 10)/10;
		tds[i].innerHTML = Math.ceil(xk_ras[j]* 100)/100;

	}

	//f(xk)
	f_xk();
	for(var j = 0, i = 9; i < 38; i = i + 6, j++){
		tds[i].innerHTML = Math.ceil(fun[j]* 1000)/1000;
	}

	//f(xk) < f(xk-1)
	fx_bol_fx1();
	for(var j = 0, i = 10; i < 38; i = i + 6, j++){
		tds[i].innerHTML = tr_and_fl[j];
	}

	//[a0, b0]
	for(var j = 0, i = 11; i < 38; i = i + 6, j++){
		tds[i].innerHTML = `[${xk_ras[0]}, ${xk_ras[xk_ras.length - 1]}]`;
	}

}


function xk_fun(){
	xk_ras[0] = xk;
	for(let k = 1; k < stolb; k++){
		xk_ras[k] = xk + triangle_0;
		xk = xk_ras[k];			
	}
}

function f_xk(){
	for(let i = 0; i < stolb; i++){
		fun[i] = Math.pow((xk_ras[i] - 1),2) * Math.pow((xk_ras[i] + 1), 4) * Math.pow((xk_ras[i] - 2), 3);
	}
}

function fx_bol_fx1(){
	for(let i = 0; i < stolb; i++){
		tr_and_fl[i] = fun[i] < fun[i + 1];
		tr_and_fl[i] == true ? tr_and_fl[i] = '+' : tr_and_fl[i] ='-';
	}
	
	//console.log(tr_and_fl);
}

//alert ("OK");