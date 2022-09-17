function mostrar() {

    document.getElementById("menu").style.display = "block";
}

function irAlJuego() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("juego").style.display = "block";
    nuevoJuego();
}

function irAlGuardado() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("guardar").style.display = "block";
    document.getElementById("AreaTexto").focus();
}

function desistir() {
    document.getElementById("idGanastes").style.display = "none";
    document.getElementById("idfinJuego").style.display = "none";
    document.getElementById("juego").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

function cancelar() {
    document.getElementById("guardar").style.display = "none";
    document.getElementById("menu").style.display = "block";
}

var palabras = ["amigo", "pajaro", "cocodrilo", "soleado", "cantante", "patineta"];
//const palabras = ["casa"];
var palabra;
let palabrasGuiones;
let palabrasFallos = "";
var vida = 6;


function nuevoJuego() {
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
    palabrasGuiones = palabra.replace(/./g, "- ");

    document.querySelector("#prueba").innerHTML = palabra;
    document.querySelector("#guiones").innerHTML = palabrasGuiones;
    limpiarletras();
    dibujar();
    comprobarteclado();
    quitaDisable();
    return palabra;

}

function comprobarteclado() {
    document.addEventListener("keydown", function (Event) {
        //alert(Event.key);
        if (vida > 0) {
            var letra = Event.key;
            var codigo = Event.keyCode;
            if (codigo > 64) {
                if (codigo < 91) {
                    var varialetra = letra;
                    var dejeAsi = false;
                    for (const i in palabra) {
                        if (varialetra == palabra[i]) {
                            palabrasGuiones = palabrasGuiones.replaceAt(i * 2, varialetra);
                            dejeAsi = true;
                        }
                    }
                    if (dejeAsi == true) {
                        vidas(0);
                    } else {
                        anotarfallos2(letra);
                    }
                    document.querySelector("#guiones").innerHTML = palabrasGuiones;
                }
            }
            if (codigo == 192) {
                var varialetra = letra;
                var dejeAsi = false;
                for (const i in palabra) {
                    if (varialetra == palabra[i]) {
                        palabrasGuiones = palabrasGuiones.replaceAt(i * 2, varialetra);
                        dejeAsi = true;
                    }
                }
                if (dejeAsi == true) {
                    vidas(0);
                } else {
                    anotarfallos2(letra);
                }
                document.querySelector("#guiones").innerHTML = palabrasGuiones;
            }
        }
    });



}

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

function comprobarLetra(letra) {
    if (vida > 0) {
        var varialetra = letra;
        var dejeAsi = false;
        for (const i in palabra) {
            if (varialetra == palabra[i]) {
                palabrasGuiones = palabrasGuiones.replaceAt(i * 2, varialetra);
                dejeAsi = true;
            }
        }
        if (dejeAsi == true) {
            comprobarBuMa(letra, "bueno");
            vidas(0);
        } else {
            comprobarBuMa(letra, "malo");
            anotarfallos(letra);
            vidas(1);
        }
        document.querySelector("#guiones").innerHTML = palabrasGuiones;
    }

}

function anotarfallos(letra) {
    palabrasFallos = palabrasFallos + " " + letra;
    document.querySelector("#p-fallos").innerHTML = palabrasFallos;
}

function anotarfallos2(letra) {
    var falloesta = false;
    for (const i in palabrasFallos) {
        if (letra == palabrasFallos[i]) {
            falloesta = true;
        }
    }
    if (falloesta == false) {
        palabrasFallos = palabrasFallos + " " + letra;
        document.querySelector("#p-fallos").innerHTML = palabrasFallos;
        vidas(1);
    }
}

function vidas(numero) {
    vida = vida - numero;
    dibujar();
    if (vida == 0) {
        //alert("has perdido");
        document.getElementById("idfinJuego").style.display = "flex";
        document.getElementById("palabracorrecta").innerHTML = palabra;

    }
    var resultado = palabrasGuiones.indexOf('-');
    if (resultado < 0) {
        //alert("Has ganado");
        document.getElementById("idGanastes").style.display = "flex";
        document.getElementById("guiones").style.color = "green";
        vida = 0;
    }
}

function comprobarBuMa(letra, String) {
    const $key_btns = document.querySelectorAll(".boton-teclado");
    $key_btns.forEach((key) => {
        if (key.textContent === letra.toUpperCase()) {
            key.classList.add("disabled");
            key.classList.add(String);
            key.disabled = true;
        }
    });
}

function quitaDisable() {
    const $key_btns = document.querySelectorAll(".boton-teclado");
    $key_btns.forEach((key) => {
            key.disabled = false;
        
    });
}

function limpiarletras() {
    const $key_btns = document.querySelectorAll(".boton-teclado");
    $key_btns.forEach((key) => {
        key.classList.remove("disabled");
        key.classList.remove("bueno");
        key.classList.remove("malo");
    });
    palabrasFallos = "";
    document.querySelector("#p-fallos").innerHTML = palabrasFallos;
    document.getElementById("idGanastes").style.display = "none";
    document.getElementById("idfinJuego").style.display = "none";
    vida = 6;
    return vida;
}

function dibujar() {
    let canvasLineas = document.getElementById('lineas');
    let pincel = canvasLineas.getContext('2d');
    if (vida == 6) {
        canvasLineas.width = canvasLineas.width;

        pincel.beginPath();
        pincel.strokeStyle = "black";
        pincel.lineWidth = 5;
        pincel.lineCap = "round";
        pincel.moveTo(30, 140);
        pincel.lineTo(250, 140);
        pincel.moveTo(50, 140);
        pincel.lineTo(50, 10);
        pincel.moveTo(50, 10);
        pincel.lineTo(150, 10);
        pincel.stroke();

        pincel.beginPath();
        pincel.strokeStyle = "black";
        pincel.lineWidth = 1.5;
        pincel.moveTo(150, 10);
        pincel.lineTo(150, 40);
        pincel.stroke();
    }

    if (vida == 5) {
        pincel.fillStyle = "red";
        pincel.beginPath();
        pincel.arc(150, 30, 15, 0, 2 * 3.14);
        pincel.fill();
    }

    if (vida == 4) {
        pincel.beginPath();
        pincel.strokeStyle = "red";
        pincel.lineWidth = 2;
        pincel.lineCap = "round";
        pincel.moveTo(150, 45);
        pincel.lineTo(150, 100);
        pincel.stroke();
    }

    if (vida == 3) {
        pincel.beginPath();
        pincel.strokeStyle = "red";
        pincel.lineWidth = 2;
        pincel.lineCap = "round";
        pincel.moveTo(150, 60);
        pincel.lineTo(100, 70);
        pincel.stroke();
    }

    if (vida == 2) {
        pincel.beginPath();
        pincel.strokeStyle = "red";
        pincel.lineWidth = 2;
        pincel.lineCap = "round";
        pincel.moveTo(150, 60);
        pincel.lineTo(200, 70);
        pincel.stroke();
    }

    if (vida == 1) {
        pincel.beginPath();
        pincel.strokeStyle = "red";
        pincel.lineWidth = 2;
        pincel.lineCap = "round";
        pincel.moveTo(150, 100);
        pincel.lineTo(100, 130);
        pincel.stroke();
    }

    if (vida == 0) {
        pincel.beginPath();
        pincel.strokeStyle = "red";
        pincel.lineWidth = 2;
        pincel.lineCap = "round";
        pincel.moveTo(150, 100);
        pincel.lineTo(200, 130);
        pincel.stroke();
    }

}


/*   elimina duplicados de un array*/
function filterArray(inputArr) {
    var found = {};
    var out = inputArr.filter(function (element) {
        return found.hasOwnProperty(element) ? false : (found[element] = true);
    });
    return out;
}

/*      elimina acentos menos ñ   */
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u0301]/g, ""); // elemina los acentos y caracteres especiales
}

var local = [];

function cargarData() {
    var localguardada = document.getElementById("AreaTexto").value;
    if (localguardada != "") {
        var largolocal = localguardada.length;
        var largopalabras = palabras.length;
        if (largolocal >= 3 && largolocal <= 8) {
            var nnoesta = true;
            var nnoesta2 = true;
            //localStorage.removeItem("palabras");
            localguardada = localguardada.toLocaleLowerCase();
            localguardada = removeAccents(localguardada);
            var primera = false;
            var vistaso = localStorage.getItem('palabras');
            if (vistaso == null) {
                largolocal = 0;
                local.push(localguardada);
                localStorage.setItem('palabras', JSON.stringify(local));
                //alert("guardado con éxito");
                document.getElementById("idpalabraGuardada").style.display = "flex";
                primera = true;
            }
            var localSt = JSON.parse(localStorage.getItem("palabras"));

            var locarLargo = localSt.length;

            if (primera == false) {
                for (var i = 0; i < locarLargo; i++) {
                    if (localguardada == localSt[i]) {
                        //alert("La palabra ya esta guardada.");
                        document.getElementById("idpalabraNoGuardada").style.display = "flex";
                        nnoesta = false;
                        break;
                    }
                }
            }

            for (var i = 0; i < largopalabras; i++) {
                if (localguardada == palabras[i]) {
                    if (nnoesta == false) {
                        break;
                    }
                    //alert("La palabra ya esta guardada.");
                    document.getElementById("idpalabraNoGuardada").style.display = "flex";
                    nnoesta = false;
                    break;
                }
            }
            local.push(localguardada);
            var ingresar = filterArray(local);
            local = ingresar;
            if (nnoesta == true) {
                if (nnoesta2 == true) {
                    for (var i = 0; i < ingresar.length; i++) {
                        if (nnoesta == true) {
                            palabras.push(ingresar[i]);
                        }
                    }
                    //alert("guardado con éxito");
                    document.getElementById("idpalabraGuardada").style.display = "flex";
                }
            }
            var arraypalabras = filterArray(palabras);
            palabras = arraypalabras;
            
            console.log(palabras);
            console.log(local);
            console.log(localStorage.getItem("palabras"));

            localStorage.removeItem("palabras");
            localStorage.setItem('palabras', JSON.stringify(local));
        }else{
            if(largolocal < 3){
                //alert("No se aceptan palabras de menos de 3 letras.");
                document.getElementById("idmesageerror").style.display = "flex";
        document.getElementById("idmensage").innerHTML = "No se aceptan palabras de <br> menos de 3 letras.";
            }
            if(largolocal >8){
               //alert("No se aceptan palabras de más de 8 letras.");
                document.getElementById("idmesageerror").style.display = "flex";
        document.getElementById("idmensage").innerHTML = "No se aceptan palabras <br> de más de 8 letras.";
               }
        }
    } else {
        //alert("Digite alguna palabra");
        document.getElementById("idmesageerror").style.display = "flex";
        document.getElementById("idmensage").innerHTML = "Digite alguna <br> palabra";
    }
}

function limpiarbase() {
    localStorage.removeItem("palabras");
}

function cerrarDiv(String) {
    document.getElementById(String).style.display = "none";
    document.getElementById("AreaTexto").value = "";
    document.getElementById("AreaTexto").focus();
}

function soloLetras(e) {
    var key = e.keyCode || e.which,
      tecla = String.fromCharCode(key).toLowerCase(),
      letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
      especiales = [37, 39, 46],
      tecla_especial = false;

    for (var i in especiales) {
      if (key == especiales[i]) {
        tecla_especial = true;
        break;
      }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
      return false;
    }
  }