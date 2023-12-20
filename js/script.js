document.addEventListener('DOMContentLoaded', function () {
    var maxHoras = 23;
    var maxMinutos = 59;
    var maxSegundos = 59;

    var horas = 0;
    var minutos = 0;
    var segundos = 0;
    var temporizadorEnMarcha = false;
    var intervalo;

    var horasElemento = document.getElementById('horas');
    var minutosElemento = document.getElementById('minutos');
    var segundosElemento = document.getElementById('segundos');
    var iniciarDetener = document.getElementById('btnIniciarPausar');    

    function actualizarTemporizador() {
        horasElemento.textContent = formatoDosDigitos(horas);
        minutosElemento.textContent = formatoDosDigitos(minutos);
        segundosElemento.textContent = formatoDosDigitos(segundos);
    }

    function formatoDosDigitos(numero) {
        return numero < 10 ? '0' + numero : numero;
    }

    function subirHora() {
        horas++;
        if (horas > maxHoras) {
            horas = 0;
        }
        actualizarTemporizador();
    }

    function bajarHora() {
        horas--;
        if (horas < 0) {
            horas = maxHoras;
        }
        actualizarTemporizador();
    }

    function subirMinuto() {
        minutos++;
        if (minutos > maxMinutos) {
            minutos = 0;
            subirHora();
        }
        actualizarTemporizador();
    }

    function bajarMinuto() {
        minutos--;
        if (minutos < 0) {
            minutos = maxMinutos;
            bajarHora();
        }
        actualizarTemporizador();
    }

    function subirSegundo() {
        segundos++;
        if (segundos > maxSegundos) {
            segundos = 0;
            subirMinuto();
        }
        actualizarTemporizador();
    }

    function bajarSegundo() {
        segundos--;
        if (segundos < 0) {
            segundos = maxSegundos;
            bajarMinuto();
        }
        actualizarTemporizador();
    }

    function iniciarPausarTemporizador() {
        if(iniciarDetener.firstChild.data == "Iniciar"){
            iniciarDetener.firstChild.data = "Pausar";
        }
        else{
            iniciarDetener.firstChild.data = "Iniciar";
        }
        if (temporizadorEnMarcha) {
            clearInterval(intervalo);
        } else {
            intervalo = setInterval(function () {
                if (segundos > 0) {
                    segundos--;
                } else {
                    if (minutos > 0) {
                        minutos--;
                        segundos = maxSegundos;
                    } else {
                        if (horas > 0) {
                            horas--;
                            minutos = maxMinutos;
                            segundos = maxSegundos;
                        } else {
                            clearInterval(intervalo);
                            temporizadorEnMarcha = !temporizadorEnMarcha;
                            iniciarDetener.firstChild.data = "Iniciar";
                            //alert('¡Tiempo agotado!');
                        }
                    }
                }
                actualizarTemporizador();
            }, 1000);
        }
        temporizadorEnMarcha = !temporizadorEnMarcha;
    }

    document.getElementById('btnSubirHora').addEventListener('click', subirHora);
    document.getElementById('btnBajarHora').addEventListener('click', bajarHora);
    document.getElementById('btnSubirMinuto').addEventListener('click', subirMinuto);
    document.getElementById('btnBajarMinuto').addEventListener('click', bajarMinuto);
    document.getElementById('btnSubirSegundo').addEventListener('click', subirSegundo);
    document.getElementById('btnBajarSegundo').addEventListener('click', bajarSegundo);
    document.getElementById('btnIniciarPausar').addEventListener('click', iniciarPausarTemporizador);

    actualizarTemporizador();
});