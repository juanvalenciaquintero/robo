window.onload = function() {

	var protaX, protaY, maloX, maloY, practicasX, practicasY;

	var celda, celdaSeleccionada;

	var practicaCogida=false;

	var tablero = new Array(8);
	var tam= tablero.length;

	var mensajes = document.querySelector('#mensajes');

	var terminado;

	inicializar();

	document.querySelector('button').onclick = inicializar;
				
	function inicializar() {

		terminado = false;
		mensajes.innerHTML= '';
		practicaCogida=false;

		protaX=0; 
		protaY=0;
	
		for (i=0;i<tablero.length;i++) {
			tablero[i] = new Array(8);

		}

		for (y=0; y<tam;y++) {
			for (x=0;x<tam;x++) {
				tablero[y][x]="";
				
			}
		}

		for (y=1;y<=tam;y++) {
			for (x=1;x<=tam;x++) {
				celda = '#cuadro' + y + '_' + x;
				console.log(celda);
				celdaSeleccionada = document.querySelector(celda);
				document.querySelector(celda).onclick = function() {
					moverProta(this);
				}
				celdaSeleccionada.style.backgroundImage='';
			}
		}
		

		for (i=0;i<8;i++) {
			colocarObstaculos();
		}

		colocarPractica();

		colocarMalo();

		colocarProtaInicial() ;

	}


	function aleatorio(min,max) {

		return Math.floor((Math.random()*((max-min)+1)+min));
		
	}

	function colocarObstaculos() {

		var obstY,obstX;
		var correcto = false;


		while(!correcto) {

			obstY=aleatorio(0,7);
			console.log(obstY);
			obstX=aleatorio(0,7);
			console.log(obstX);

			if (((obstX==0)&&(obstY==0))|| ((obstX==7)&&(obstY==7))) {
				correcto = false;
			} else {
				if (tablero[obstY][obstX] !="") {
					correcto=false;
				} else {
					correcto = true;
					tablero[obstY][obstX] = 'obstaculo';
				}
			}
		}

		celda = '#cuadro' + (obstY+1) + '_'  + (obstX+1) ;

		celdaSeleccionada = document.querySelector(celda);
		celdaSeleccionada.style.backgroundImage='url("crate.jpg")';
		celdaSeleccionada.style.backgroundSize='contain';

	}


	function colocarPractica() {
		var correcto = false;

		while(!correcto) {

			practicaX=aleatorio(0,7);
			console.log(practicaX);
			practicaY=aleatorio(0,7);
			console.log(practicaY);

			if (((practicaX==0)&&(practicaY==0))|| ((practicaX==7)&&(practicaY==7))) {
				correcto = false;
			} else {
				correcto = true;
			}
		}

		celda = '#cuadro' + (practicaY+1) + '_'  + (practicaX+1) ;

		celdaSeleccionada = document.querySelector(celda);
		celdaSeleccionada.style.backgroundImage='url("practica.png")';
		celdaSeleccionada.style.backgroundSize='contain';


		tablero[practicaY][practicaX] = 'practica';

	}


	function colocarMalo() {
		var correcto = false;

		while(!correcto) {

			maloX=aleatorio(0,7);
			console.log(maloX);
			maloY=aleatorio(0,7);
			console.log(maloY);

			if (((maloX==0)&&(maloY==0))|| ((maloX==7)&&(maloY==7))) {
				correcto = false;
			} else {
				correcto = true;
			}
		}


		if (tablero[maloY][maloX] == 'practica') {

			colocarMalo();
		} else {

			tablero[maloY][maloX] = 'malo';
		}

		celda = '#cuadro' + (maloY+1) + '_'  + (maloX+1) ;
		console.log(celda);
		celdaSeleccionada = document.querySelector(celda);
		celdaSeleccionada.style.backgroundImage='url("malo.png")';
		

	}

	function moverProta(celda) {

		if (!terminado) {
			var celdaPulsada = celda.id;
			console.log('Celda pulsada: ' + celdaPulsada); 

			horizontal = parseInt(celdaPulsada.charAt(8))-1;
	        vertical = parseInt(celdaPulsada.charAt(6))-1;

	        if (((Math.abs(vertical-protaY)==1) && (Math.abs(horizontal-protaX)==0)) || ((Math.abs(vertical-protaY)==0) && (Math.abs(horizontal-protaX)==1))){
	        		borrarCasilla( protaY,protaX);
					
	        		colocarProta(vertical,horizontal);
	        }
	    }
	}

	function colocarProtaInicial() {
		celda = '#cuadro1_1';		
		celdaSeleccionada = document.querySelector(celda);
		celdaSeleccionada.style.backgroundImage='url("prota.png")';
	}


	function colocarProta(valorY,valorX) {

		console.log('Posicion prota antes de mover: ' + protaY + ',' + protaX + ': ' + tablero[protaY][protaX]);

		if (tablero[valorY][valorX] =="") {
			tablero[valorY][valorX] = 'prota';
			
			
			protaY=valorY;
			protaX=valorX;
			if (!((protaY==0) && (protaX==0))) {
				
			}


		} else if (tablero[valorY][valorX] =="practica"){
			tablero[valorY][valorX] = 'prota';
					
			protaY=valorY;
			protaX=valorX;

			tablero[7][7] = 'salida';
			celda = '#cuadro8_8' ;		
			celdaSeleccionada = document.querySelector(celda);
			celdaSeleccionada.style.backgroundColor='#FFF';
			/*celdaSeleccionada.innerHTML='Salida';*/

			practicaCogida = true;

			
			mensajes.innerHTML= '<h3>Has cogido la practica!</h3>';
			


		} else if (tablero[valorY][valorX] =="salida"){
			tablero[valorY][valorX] = 'prota';
			protaY=valorY;
			protaX=valorX;
			mensajes.innerHTML= '<h3>Has conseguido salir!</h3>';
			terminado=true;
		} else if (tablero[valorY][valorX] =="malo") {
			mensajes.innerHTML= '<h3>Has conseguido perdido!</h3>';

			return false;
		}

		console.log('Posicion prota despues de mover: ' + protaY + ',' + protaX );
		celda = '#cuadro' + (protaY+1) + '_'  + (protaX+1) ;		
		celdaSeleccionada = document.querySelector(celda);
		celdaSeleccionada.style.backgroundImage='url("prota.png")';
		moverMalo();

	}


	

	function borrarCasilla(posY,posX) {
		tablero[posY][posX]='';
		celda = '#cuadro' + (posY+1) + '_'  + (posX+1) ;	
		celdaSeleccionada = document.querySelector(celda);
		celdaSeleccionada.style.backgroundImage='url("")';

	}

	



	function moverMalo() {

		comprobarDistancia();
	
	}



	function pintarMalo(valorY,valorX, cog){
		var cogido = cog;
		maloX=valorX;
		maloY=valorY;
	
		celda = '#cuadro' + (maloY+1) + '_'  + (maloX+1) ;		
		celdaSeleccionada = document.querySelector(celda);
		celdaSeleccionada.style.backgroundImage='url("malo.png")';
		if (cogido) {
			mensajes.innerHTML= '<h3>Has cogido al ladrón!</h3>';
		}
	}

	function comprobarDistancia() {

		var distancias = new Array();
		var distancia1_Y, distancia2_Y, distancia1_X, distancia2_X, valorM_X, valorM_Y;
		var minimo, posicion, variable, operacion;
		var correcto = false;

		distancia1_Y = Math.abs(protaY-(maloY-1));
		distancia2_Y = Math.abs(protaY-(maloY+1));
		distancia1_X = Math.abs(protaX-(maloX-1));
		distancia2_X = 	Math.abs(protaX-(maloX+1));
		distancias[0] = Math.abs(protaY-(maloY-1)) + Math.abs(protaX-maloX);
		console.log('Distancia 0: ' + distancias[0]);
		distancias[1] = Math.abs(protaY-(maloY+1)) + Math.abs(protaX-maloX);
		console.log('Distancia 1: ' + distancias[1]);
		distancias[2] = Math.abs(protaX-(maloX-1)) + Math.abs(protaY-maloY);
		console.log('Distancia 2: ' + distancias[2]);
		distancias[3] = Math.abs(protaX-(maloX+1)) + Math.abs(protaY-maloY);
		console.log('Distancia 3: ' + distancias[3]);

		minimo = Math.min.apply(null,distancias);
		console.log('Minimo: ' + minimo);
		posicion = distancias.indexOf(minimo);
		console.log('Posicion: ' + posicion);

		var dondePintar;
		switch (posicion) {
			case 0 :  dondePintar = comprobarDestino((maloY-1),maloX);
					  switch(dondePintar) {					  	
					  	case 0: borrarCasilla(maloY,maloX);
								pintarMalo((maloY-1), maloX, true);
								break;
						case 1: borrarCasilla(maloY,maloX);
								pintarMalo((maloY-1), maloX, false);
								break;
						case 2: while (!correcto) {
									variable=aleatorio(0,1);
									operacion = aleatorio(0,1);
									if (variable==0) {
										valorM_X=maloX;
										valorM_Y=maloY+1;
									} else {
										valorM_Y=maloY;
										operacion = aleatorio(0,1);
										if (operacion==0) {
											valorM_X=maloX+1;
										} else {
											valorM_X=maloX-1;
										}
									}
									console.log('Nueva posicion: ' + valorM_Y + '/' + valorM_X);
									if (tablero[valorM_Y][valorM_X]=="") {
												correcto=true;
											}
								}
								borrarCasilla(maloY,maloX);
								pintarMalo(valorM_Y, valorM_X, false);
								break;
						case 3: while (!correcto) {
									variable=aleatorio(0,1);
									operacion = aleatorio(0,1);
									if (variable==0) {
										valorM_X=maloX;
										valorM_Y=maloY+1;
									} else {
										valorM_Y=maloY;
										operacion = aleatorio(0,1);
										if (operacion==0) {
											valorM_X=maloX+1;
										} else {
											valorM_X=maloX-1;
										}
									}
									console.log('Nueva posicion: ' + valorM_Y + '/' + valorM_X);
									if (tablero[valorM_Y][valorM_X]=="") {
												correcto=true;
											}
								}
								borrarCasilla(maloY,maloX);
								pintarMalo(valorM_Y, valorM_X, false);
								break;
						default: break;
					  }
					  
					  break;
			case 1 :  dondePintar = comprobarDestino((maloY+1),maloX);
					  switch(dondePintar) {					  	
					  	case 0: borrarCasilla((maloY),maloX);
								pintarMalo((maloY+1), maloX, true);
								break;
						case 1: borrarCasilla(maloY,maloX);
								pintarMalo((maloY+1), maloX, false);
								break;
						case 2: while (!correcto) {
									variable=aleatorio(0,1);
									operacion = aleatorio(0,1);
									if (variable==0) {
										valorM_X=maloX;
										valorM_Y=maloY-1;
										
									} else {
										operacion = aleatorio(0,1);
										valorM_Y=maloY;
										if (operacion==0) {
											valorM_X=maloX+1;
										} else {
											valorM_X=maloX-1;
										}
										
									}
									console.log('Nueva posicion: ' + valorM_Y + '/' + valorM_X);
									if (tablero[valorM_Y][valorM_X]=="") {
												correcto=true;
												console.log('Nueva posicion  posible');
									} else {
										console.log('Nueva posicion no posible');
									}
								}
								borrarCasilla(maloY,maloX);
								pintarMalo(valorM_Y, valorM_X, false);
								break;
						case 3: while (!correcto) {
									variable=aleatorio(0,1);
									operacion = aleatorio(0,1);
									if (variable==0) {
										valorM_X=maloX;
										valorM_Y=maloY-1;
										
									} else {
										operacion = aleatorio(0,1);
										valorM_Y=maloY;
										if (operacion==0) {
											valorM_X=maloX+1;
										} else {
											valorM_X=maloX-1;
										}
										
									}
									console.log('Nueva posicion: ' + valorM_Y + '/' + valorM_X);
									if (tablero[valorM_Y][valorM_X]=="") {
												correcto=true;
												console.log('Nueva posicion  posible');
									} else {
										console.log('Nueva posicion no posible');
									}
								}
								borrarCasilla(maloY,maloX);
								pintarMalo(valorM_Y, valorM_X, false);
								break;
						default: break;
					  }
					  break;
			case 2 :  dondePintar = comprobarDestino(maloY,(maloX-1));
					  switch(dondePintar) {					  	
					  	case 0: borrarCasilla(maloY,(maloX));
								pintarMalo(maloY,(maloX-1), true);
								break;
						case 1: borrarCasilla(maloY,(maloX));
								pintarMalo(maloY,(maloX-1), false);
								break;
						case 2: while (!correcto) {
									variable=aleatorio(0,1);
									operacion = aleatorio(0,1);
									
									if (variable==0) {
										valorM_X=maloX;
										if (operacion==0) {
											valorM_Y=maloY+1;
										} else {
											valorM_Y=maloY-1;
										}
																
									} else {
										operacion = aleatorio(0,1);
										valorM_Y=maloY;
										valorM_X=maloX+1;
										
									}
									console.log('Nueva posicion: ' + valorM_Y + '/' + valorM_X);
									if (tablero[valorM_Y][valorM_X]=="") {
												correcto=true;
											}
								}
								borrarCasilla(maloY,maloX);
								pintarMalo(valorM_Y, valorM_X, false);
								break;
						case 3: while (!correcto) {
									variable=aleatorio(0,1);
									operacion = aleatorio(0,1);
									
									if (variable==0) {
										valorM_X=maloX;
										if (operacion==0) {
											valorM_Y=maloY+1;
										} else {
											valorM_Y=maloY-1;
										}
																
									} else {
										operacion = aleatorio(0,1);
										valorM_Y=maloY;
										valorM_X=maloX+1;
										
									}
									console.log('Nueva posicion: ' + valorM_Y + '/' + valorM_X);
									if (tablero[valorM_Y][valorM_X]=="") {
												correcto=true;
											}
								}
								borrarCasilla(maloY,maloX);
								pintarMalo(valorM_Y, valorM_X, false);
								break;
						default: break;
					  }
					  break;
			case 3 : dondePintar = comprobarDestino(maloY,(maloX+1));
					  switch(dondePintar) {					  	
					  	case 0: borrarCasilla(maloY,maloX);
								pintarMalo(maloY,(maloX+1), true);
								break;
						case 1: borrarCasilla(maloY,(maloX));
								pintarMalo(maloY,(maloX+1), false);
								break;
						case 2: while (!correcto) {
									variable=aleatorio(0,1);
									operacion = aleatorio(0,1);
									
									if (variable==0) {
										valorM_X=maloX;
										if (operacion==0) {
											valorM_Y=(maloY+1);
										} else {
											valorM_Y=(maloY-1);
										}
									} else {
										operacion = aleatorio(0,1);
										valorM_Y=maloY;
										valorM_X=maloX-1;							
									}
									console.log('Nueva posicion: ' + valorM_Y + '/' + valorM_X);
									if (tablero[valorM_Y][valorM_X]=="") {
												correcto=true;
											}
								}	
								borrarCasilla(maloY,maloX);
								pintarMalo(valorM_Y, valorM_X, false);
								break;
						case 3: while (!correcto) {
									variable=aleatorio(0,1);
									operacion = aleatorio(0,1);
									
									if (variable==0) {
										valorM_X=maloX;
										if (operacion==0) {
											valorM_Y=(maloY+1);
										} else {
											valorM_Y=(maloY-1);
										}
									} else {
										operacion = aleatorio(0,1);
										valorM_Y=maloY;
										valorM_X=maloX-1;							
									}
									console.log('Nueva posicion: ' + valorM_Y + '/' + valorM_X);
									if (tablero[valorM_Y][valorM_X]=="") {
												correcto=true;
											}
								}	
								borrarCasilla(maloY,maloX);
								pintarMalo(valorM_Y, valorM_X, false);
								break;
						default: break;
					  }

			default: break;
		}



	}

	function comprobarDestino(numY,numX) {
		if (tablero[numY][numX] =="prota") {
			return 0;
		} else if (tablero[numY][numX] ==""){
			return 1;			
		} else if (tablero[numY][numX] =="practica") {
			console.log('Practica  en ' + numY + '/' + numX);
			return 2;
		} else if (tablero[numY][numX] =="obstaculo") {
			console.log('Obstaculo en ' + numY + '/' + numX);
			return 3;
		}

	}

}


