"use strict";

const estadosPalanca = [-1, 0, 1, 2, 3, 4, 5, 6];
const nivelPresion = ['Sin presion', 'Presion baja', 'Presion media', 'Presion alta'];
const velocidadesCambioPalanca = [10, 20, 40, 60, 80];
const VELOCIDAD_MAXIMA = 120;
let mensaje = "";
let numeroActualParada = 0;

/*$('body').on("keydown", function(e) { 
    if (e.which === 114) {
        this.setDireccionalIzq(true);
        console.log("Estamos girando a la Izquierda");
        console.log("Termino el giro a la Izquierda");
        this.setDireccionalIzq(false);
        e.preventDefault();
    } else if (e.which === 108){
        this.setDireccionalDer(true);
        console.log("Estamos girando a la Derecha");
        console.log("Termino el giro a la Derecha");
        this.setDireccionalDer(false);
    }
});*/

class Carro {
  constructor() {
    this._palanca = estadosPalanca[1];
    this._frenoPedal = false;
    this._frenoMano = true;
    this._clutch = nivelPresion[0];
    this._acelerador = nivelPresion[0];
    this._cabrilla = false;
    this._direccionalDer = false;
    this._direccionalIzq = false;
    this._velocidad = 0;
    this._interruptor = false;
    this._velocidadMaximaAlcanzada = 0;
  }

  //getter
  getInterruptor() {
    return this._interruptor;
  }
  getPalanca() {
    return this._palanca;
  }
  getFrenoPedal() {
    return this._frenoPedal;
  }
  getFrenoMano() {
    return this._frenoMano;
  }
  getClutch() {
    return this._clutch;
  }
  getAcelerador() {
    return this._acelerador;
  }
  getCabrilla() {
    return this._cabrilla;
  }
  getDireccionalDer() {
    return this._direccionalDer;
  }
  getDireccionalIzq() {
    return this._direccionalIzq;
  }
  getVelocidad() {
    return this._velocidad;
  }
  getVelocidadMaximaAlcanzada() {
    return this._velocidadMaximaAlcanzada;
  }

  //setter

  setInterruptor(interruptor) {
    this._interruptor = interruptor;
  }
  setPalanca(palanca) {
    this._palanca = palanca;
  }
  setFrenoPedal(frenoPedal) {
    this._frenoPedal = frenoPedal;
  }
  setFrenoMano(frenoMano) {
    this._frenoMano = frenoMano;
  }
  setClutch(clutch) {
    this._clutch = clutch;
  }
  setAcelerador(acelerador) {
    this._acelerador = acelerador;
  }
  setCabrilla(cabrilla) {
    this._cabrilla = cabrilla;
  }
  setDireccionalDer(direccionalDer) {
    this._direccionalDer = direccionalDer;
  }
  setDireccionalIzq(direccionalIzq) {
    this._direccionalIzq = direccionalIzq;
  }
  setVelocidad(velocidad) {
    this._velocidad = velocidad;
  }
  setVelocidad(velocidadMaximaAlcanzada) {
    this._velocidadMaximaAlcanzada = velocidadMaximaAlcanzada;
  }

  ////////// Creacion de metodos

  interruptor(flag) {
    if (this.validarEstadoReposo) {
      this.setInterruptor(flag);
      // imprimirDataEnPantalla("El interruptor del carro esta: " +  (flag? " encendido" : " apagado"));
      setInterval(() => { imprimirDataEnPantalla }, 1000);
      funcionRuta();
      this.arrancar();
    } else {
      imprimirDataEnPantalla("Coloque el carro en neutro y el freno de mano");
    }
  }

  arrancar() {
    if (this.getInterruptor) {
      this.setClutch(nivelPresion[3]);
      document.getElementById("clutch").style.backgroundColor = "#FFC874"
      this.setFrenoPedal(true);
      document.getElementById("freno").style.backgroundColor = "#FFC874"
      imprimirDataEnPantalla("Freno del pedal esta: " + (this.getFrenoPedal() ? "Presionado" : "Sin presionar"));
      this.setFrenoMano(false);
      imprimirDataEnPantalla("Freno de mano esta: " + (this.getFrenoMano() ? "Activado" : "Desactivado"))
      this.setPalanca(estadosPalanca[2]);
      imprimirDataEnPantalla("La palanca esta en " + (this.getPalanca() == estadosPalanca[2] ? "primera" : "neutro"))
      this.setFrenoPedal(false);
      document.getElementById("freno").style.backgroundColor = "#ffffff"
      imprimirDataEnPantalla("Freno del pedal esta: " + (this.getFrenoPedal() ? "Presionado" : "Sin presionar"));
      for (let i = 0; i < nivelPresion.length; i++) {
        this.setAcelerador(nivelPresion[i]);
        document.getElementById("acelerador").style.backgroundColor = "#FFC874"
        this.setClutch(nivelPresion[nivelPresion.length - 1 - i]);
        document.getElementById("clutch").style.backgroundColor = "#fffff"
      }
      imprimirDataEnPantalla("Acelerador: " + this.getAcelerador());
      imprimirDataEnPantalla("Clutch: " + this.getClutch());
      imprimirDataEnPantalla(" El auto ya esta en movimiento")
      this.paradas(funcionParadas());
    }
  }

  cambiosAcelerar(palanca) {
    return estadosPalanca[estadosPalanca.indexOf(palanca) + 1];
  }

  cambiosFrenar(palanca) {
    // console.log(" palanca" + palanca);
    // console.log("nueva palanca" + estadosPalanca[estadosPalanca.indexOf(palanca) - 1]);
    return estadosPalanca[estadosPalanca.indexOf(palanca) - 1];
  }

  cambioDeCambiosAcelerar() {
    for (let i = 0; i < nivelPresion.length; i++) {
      this.setClutch(nivelPresion[i]);
      document.getElementById("clutch").style.backgroundColor = "#FFC874"
      this.setAcelerador(nivelPresion[nivelPresion.length - 1 - i]);
      document.getElementById("acelerador").style.backgroundColor = "#FFFFFF"
      //console.log(
      // "Acelerador: " + this.getAcelerador() + "  Clutch: " + this.getClutch()
      //);
    }
    let palancaActual = this.getPalanca();
    this.setPalanca(this.cambiosAcelerar(this.getPalanca()));
    //console.log("Se hace el cambio de palanca en " + palancaActual + " a: " + this.getPalanca());
    imprimirDataEnPantalla("Se hace el cambio de palanca en " + palancaActual + " a: " + this.getPalanca());

    for (let i = 0; i < nivelPresion.length; i++) {
      this.setAcelerador(nivelPresion[i]);
      document.getElementById("acelerador").style.backgroundColor = "#FFC874"
      this.setClutch(nivelPresion[nivelPresion.length - 1 - i]);
      document.getElementById("clutch").style.backgroundColor = "#FFFFFF"
      //console.log(
      // "Acelerador: " + this.getAcelerador() + "  Clutch: " + this.getClutch()
      //);
    }
  }

  cambioDeCambiosFrenar() {
    for (let i = 0; i < nivelPresion.length; i++) {
      this.setClutch(nivelPresion[i]);
      document.getElementById("acelerador").style.backgroundColor = "#FFFFFF"
      this.setAcelerador(nivelPresion[nivelPresion.length - 1 - i]);
      document.getElementById("clutch").style.backgroundColor = "#FFC874"
      //console.log(
        //"Acelerador: " + this.getAcelerador() + "  Clutch: " + this.getClutch()
        //);
      }
      let palancaActual = this.getPalanca();
      this.setPalanca(this.cambiosFrenar(this.getPalanca()));
      //console.log("Se hace el cambio de palanca en " + palancaActual + " a: " + this.getPalanca());
      imprimirDataEnPantalla("Se hace el cambio de palanca en " + palancaActual + " a: " + this.getPalanca());
      
      for (let i = 0; i < nivelPresion.length; i++) {
        this.setAcelerador(nivelPresion[i]);
        document.getElementById("acelerador").style.backgroundColor = "#FFC874"
        this.setClutch(nivelPresion[nivelPresion.length - 1 - i]);
        document.getElementById("clutch").style.backgroundColor = "#FFFFFF"
      //console.log(
      //"Acelerador: " + this.getAcelerador() + "  Clutch: " + this.getClutch()
      //);
    }
  }

  giroIzqAuto() {
    this.setDireccionalIzq(true);
    document.getElementById("direccionalizq").style.backgroundColor = "#FFC874"
    imprimirDataEnPantalla("La direccional izquierda esta: " + (this.getDireccionalIzq() ? "encendida" : "apagada"));
    imprimirDataEnPantalla("Giro izquierda");
    this.setDireccionalIzq(false);
    document.getElementById("direccionalizq").style.backgroundColor = "#FFFFFF"
    imprimirDataEnPantalla("La direccional izquierda esta: " + (this.getDireccionalIzq() ? "encendida" : "apagada"));
  }

  giroDerAuto() {
    imprimirDataEnPantalla("Se inicia un giro a la derecha");
    this.setDireccionalDer(true);
    document.getElementById("direccionalder").style.backgroundColor = "#FFC874"
    imprimirDataEnPantalla("Se enciende la direccional derecha");
    imprimirDataEnPantalla("Giro completado");
    this.setDireccionalDer(false);
    document.getElementById("direccionalder").style.backgroundColor = "#FFFFFF"
    imprimirDataEnPantalla("Se apaga la direccional derecha");
  }

  acelerar() {
    document.getElementById("direccionalizq").style.backgroundColor = "#FFFFFF"
    document.getElementById("direccionalder").style.backgroundColor = "#FFFFFF"
    this.setAcelerador(nivelPresion[3]);
    document.getElementById("acelerador").style.backgroundColor = "#FFC874"
    document.getElementById("freno").style.backgroundColor = "#FFFFFF"
    let a = 0;
    let velocidadActual = 0;
    let aleatorio = 0;
    imprimirDataEnPantalla("El carro está acelerando");
    for (let i = 0; i <= VELOCIDAD_MAXIMA; i++) {
      if (
        i === velocidadesCambioPalanca[a] &&
        a < velocidadesCambioPalanca.length
      ) {
        this.cambioDeCambiosAcelerar();
        imprimirDataEnPantalla("Cuando la velocidad es de: " + (velocidadActual + 1));
        console.log("Cambio (acelerar) cuando estaba en la velocidad de: " + velocidadesCambioPalanca[a]);
        //console.log("antes a: " + a);
        a++;
        //console.log("despues a: " + a);
      }
      aleatorio = this.generarNumAleatorio(100, 1);
      if (aleatorio === 1) {
        this.giroDerAuto();
      } else if (aleatorio === 2) {
        this.giroIzqAuto();
      }
      velocidadActual = i;
      console.log("La velocidad es: " + velocidadActual);
    }
  }

  generarNumAleatorio(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  frenar() {
    this.setAcelerador(nivelPresion[0]);
    document.getElementById("direccionalizq").style.backgroundColor = "#FFFFFF"
    this.setFrenoPedal(true);
    document.getElementById("freno").style.backgroundColor = "#FFC874"
    imprimirDataEnPantalla("Comienza a frenar");
    console.log("Comienza a frenar");
    let a = velocidadesCambioPalanca.length - 1;
    for (let i = VELOCIDAD_MAXIMA; i >= 10; i--) {
      //console.log("esto es a: " + a);
      if (i === velocidadesCambioPalanca[a]) {
        this.cambioDeCambiosFrenar();
        imprimirDataEnPantalla("Cuando la velocidad es de: " + i);
        console.log("Cambio (frenar) cuando estaba en la velocidad de: " + velocidadesCambioPalanca[a]);
        a--;
      }
      console.log("La velocidad es: " + i);
    }
    return "El carro está frenando";
  }

  // paradas(numParadas) {
  //   console.log("Entro paradas" + numParadas);
  //   let distanciaparada = 0;
  //   let acumDistanciaParada = 0;
  //   let contadorDelNumeroDeParadas = 0;
  //   let contadorParada = setInterval(() => {
  //     imprimirDataEnPantalla("Comienza recorrido hacia la parada: " + (contadorDelNumeroDeParadas + 1));
  //     console.log("PARADA NUMERO.......  " + contadorDelNumeroDeParadas);
  //     this.acelerar();
  //     this.frenar();
  //     this.cambiarAestadoReposo();
  //     imprimirDataEnPantalla("Llego a la parada");
  //     this.tiempoParada()

  //     distanciaparada = cadaCuantoHaceLaParada()
  //     acumDistanciaParada += cadaCuantoHaceLaParada()
  //     contadorDelNumeroDeParadas += 1;

  //     console.log("Esto es distanciaParada antes del if:   " + distanciaparada);
  //     console.log("Esto es acumParada antes del if:   " + acumDistanciaParada);


  //     if(distanciaparada == cadaCuantoHaceLaParada()){
  //       clearInterval(contadorParada);
  //       this.contadorParada;
  //       console.log("Esto es distanciaParada despues del if:   " + distanciaparada);
  //       console.log("Esto es acumParada despues del if:   " + acumDistanciaParada);

  //     } else if(acumDistanciaParada == kmRecorridoTotal()){
  //       clearInterval(contadorParada);
  //       console.log("Esto es acumParada terminando el if:   " + acumDistanciaParada);

  //       this.reversar();
  //       resumenDelViaje();
  //     }

  //   }, (funcionTiempoParadas() + 1));
  // }

  ///////// PRUEBA

  // paradas(numParadas) {
  //   console.log("Entro paradas" + numParadas);
  //   for (let i = 0; i <= numParadas; i++) {
  //     imprimirDataEnPantalla("Comienza recorrido hacia la parada: " + (i+ 1));
  //     console.log("PARADA NUMERO.......  " + i);
  //     this.acelerar();
  //     this.frenar();
  //     this.cambiarAestadoReposo();
  //     imprimirDataEnPantalla("Llego a la parada");
  //     //imprimirDataEnPantalla("Tiempo parada........... );
  //   }
  //   console.log("ESTO ES NUMERO ACTUAL PARADA DENTRO DEL METODO: ......... " + numeroActualParada);
  //   this.tiempoParada()
  // }


  // paradas(numParadas) {
  //   console.log("Entro paradas" + numParadas);
  //   let count = 0;
  //   for (let j = 1; j <= numParadas; j++) {
  //     if (count !== numParadas) {
  //       for (let i = 0; i <= 1; i++) {
  //         imprimirDataEnPantalla("Comienza recorrido hacia la parada: " + (i + 1));
  //         console.log("PARADA NUMERO.......  " + i);
  //         this.cambiarAestadoReposo();
  //         imprimirDataEnPantalla("Llego a la parada");
  //         //imprimirDataEnPantalla("Tiempo parada........... );          
  //         count++
  //         break
  //       }
  //       this.tiempoParada();
  //     } else {
  //       this.reversar();
  //       resumenDelViaje();
  //     };
  //   }
  // }

  paradas(numParadas) {
    console.log("Entro paradas" + numParadas);
    for (let i = 0; i <= numParadas; i++) {
      imprimirDataEnPantalla("Comienza recorrido hacia la parada: " + (i + 1));
      console.log("PARADA NUMERO.......  " + i);
      this.acelerar();
      this.frenar();
      this.cambiarAestadoReposo();
      imprimirDataEnPantalla("Llego a la parada");
      //imprimirDataEnPantalla("Tiempo parada........... );
      this.tiempoParada()
    }
    this.reversar();
    resumenDelViaje();
  }


  estacionarias(flag) {
    this.getDireccionalDer(flag);
    this.getDireccionalIzq(flag);
    document.getElementById("estac").style.backgroundColor = "#FFC874"
    return "Se encienden las estacionarias";
  }

  cambiarAestadoReposo() {
    this.estacionarias(true);
    this.setClutch(nivelPresion[3]);
    document.getElementById("clutch").style.backgroundColor = "#FFC874"
    this.setPalanca(estadosPalanca[1]);
    this.setFrenoMano(true);
    return "Se queda en estado de reposo"
  }

  validarEstadoReposo() {
    return this.getPalanca() === estadosPalanca[1] && (this.getFrenoPedal() || this.getFrenoMano),
    document.getElementById("freno").style.backgroundColor = "#FFC874";
  }

  reversar() {
    if (this.validarEstadoReposo) {
      imprimirDataEnPantalla("Se comienza a reversar para estacionar");
      this.estacionarias(true);
      imprimirDataEnPantalla("Se encienden las estacionarias")
      this.setClutch(nivelPresion[3]);
      document.getElementById("acelerador").style.backgroundColor = "#FFFFFF"
      document.getElementById("clutch").style.backgroundColor = "#FFC874"
      imprimirDataEnPantalla("Clutch: " + this.getClutch());
      this.setPalanca(estadosPalanca[0]);
      imprimirDataEnPantalla("Se coloca la palanca en: neutro");
      for (let i = 0; i < nivelPresion.length; i++) {
        this.setAcelerador(nivelPresion[i]);
        document.getElementById("acelerador").style.backgroundColor = "#FFC874"
        this.setClutch(nivelPresion[nivelPresion.length - 1 - i]);
        document.getElementById("clutch").style.backgroundColor = "#FFFFFF"
        //console.log("Acelerador: " + this.getAcelerador() + "  Clutch: " + this.getClutch());
      }
      imprimirDataEnPantalla("Reversando....");

      for (let i = 0; i < nivelPresion.length; i++) {
        this.setClutch(nivelPresion[i]);
        document.getElementById("clutch").style.backgroundColor = "#FFC874"
        this.setAcelerador(nivelPresion[nivelPresion.length - 1 - i]);
        document.getElementById("acelerador").style.backgroundColor = "#FFFFFF"
        console.log(
          "Acelerador: " + this.getAcelerador() + "  Clutch: " + this.getClutch()
        );
      }
      this.cambiarAestadoReposo();
      imprimirDataEnPantalla("Ya se coloco el freno de mano, el carro esta parqueado");
      this.setInterruptor(false);
      document.getElementById("clutch").style.backgroundColor = "#FFFFFF"
      document.getElementById("acelerador").style.backgroundColor = "#FFFFFF"
      document.getElementById("direccionalizq").style.backgroundColor = "#FFFFFF"
      document.getElementById("direccionalder").style.backgroundColor = "#FFFFFF"
      document.getElementById("estac").style.backgroundColor = "#FFFFFF"
      document.getElementById("freno").style.backgroundColor = "#FFFFFF"
      imprimirDataEnPantalla("Se apago el carro, ya puede bajar");
    } else {
      imprimirDataEnPantalla("No se puede reversar en este momento, se requiere que el carro esté en neutro y en estado de reposo");
    }
  }

  ////// PRUEBA

  // tiempoParada() {
  //   let stop = 0;
  //   let tiempoParadas = funcionTiempoParadas();
  //   let numeroParada = funcionParadas();
  //   let decrecer = tiempoParadas;

  //   let tiempo = setInterval(() => {
  //     const segundos = decrecer/1000

  //     document.getElementById("botonPresionar").click();  
  //     document.getElementById('TextoModal').innerHTML = (`${segundos}`);

  //     //document.getElementById('contador').innerHTML = (`${segundos}`);
  //     numeroActualParada += 1;

  //       if(numeroActualParada == numeroParada){
  //         clearInterval(tiempo);
  //         this.reversar();
  //         resumenDelViaje();
  //       } else if(stop === tiempoParadas){
  //         clearInterval(tiempo);
  //         document.getElementById("cerrar").click();
  //         this.paradas(numeroParada);
  //         numeroActualParada += 1;
  //         console.log("ESTO ES FUNCION PARADAS............    " + numeroParada);
  //         console.log("ESTO ES NUMEROACTUALPARADAS:  ............    " + funcionParadas())
  //       };

  //       decrecer -= 1000
  //       stop += 1000;    
  //     }, 1000);

  // }

  tiempoParada() {
    let stop = 0;
    let tiempoParadas = funcionTiempoParadas();
    let decrecer = tiempoParadas;

    let tiempo = setInterval(() => {
      const segundos = decrecer / 1000

      document.getElementById("botonPresionar").click();
      document.getElementById('TextoModal').innerHTML = (`${segundos}`);

      //document.getElementById('contador').innerHTML = (`${segundos}`);

      if (stop === tiempoParadas) {
        clearInterval(tiempo);
      document.getElementById('cerrar').click();

      }

      decrecer -= 1000
      stop += 1000;
      console.log(stop);

    }, 1000);

  }

  /*giroIzqMan(){
      this.setDireccionalIzq(true);
      console.log("Giro izquierda");
      this.setDireccionalIzq(false);
  }*/

  /*giroDerMan(){
      this.setDireccionalDer(true);
      console.log("Giro Derecha");
      this.setDireccionalDer(false);
  }*/

  /*giroAuto(direccion, texto){
    imprimirDataEnPantalla(`Se inicia un giro a la: ${texto}`);
    direccion(true);
    imprimirDataEnPantalla(`Se enciende la direccional ${texto}`);
    imprimirDataEnPantalla("Giro completado");
    direccion(false);
    imprimirDataEnPantalla(`Se apaga la direccional ${texto}`);
  }*/
  // cabrilla() { }
  // apagar() { }
  // velocidadAprox() { }
  // velocidadMax() { }
}