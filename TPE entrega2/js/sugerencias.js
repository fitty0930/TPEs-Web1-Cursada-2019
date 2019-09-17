document.addEventListener("DOMContentLoaded", function () {

    "use strict";
    let cuerpoTabla = document.querySelector("#autos-tabla");

    let tablaSugerencias = [
        { "Maqueta": "Ford Falcon", "Año": "1962" },
        { "Maqueta": "Chevrolet Chevy", "Año": "1971" },
        { "Maqueta": "GMC Coach TDH 3610", "Año": "1948" }
    ];

    MostrarTabla();

    let btnBorrar = document.getElementById('borrar');
    btnBorrar.addEventListener("click", borrarTabla);

    let btnEnviar = document.getElementById('enviarSugerencia');
    btnEnviar.addEventListener("click", nuevaMaqueta);

    let btn3Enviar = document.getElementById('enviar3Sugerencia');
    btn3Enviar.addEventListener("click", nuevaMaqueta3);

    let textbuscar = document.getElementById("buscar");
    textbuscar.onkeyup = function () {
        buscar();
    }

    let textresaltar = document.getElementById("resaltar");
    textresaltar.onkeyup = function () {
        resaltar();
    }

    function MostrarTabla() {
        cuerpoTabla.innerHTML = "";
        for (let i = 0; i < tablaSugerencias.length; i++) {
            cuerpoTabla.innerHTML += "<tr>" +
                "<td>" + tablaSugerencias[i].Maqueta + "</td>" +
                "<td>" + tablaSugerencias[i].Año + "</td>" +
                "</tr>";
        }
        
    };


    function nuevaMaqueta(e) {
        e.preventDefault();
        let autoIntroducidoPorUsuario = document.getElementById('Auto').value;
        let añoIntroducidoPorUsuario = document.getElementById('Año').value;
        let verificacionAuto = autoIntroducidoPorUsuario.trim();

        if (añoIntroducidoPorUsuario > 1886 && añoIntroducidoPorUsuario < 2020 && verificacionAuto != "") {



            let nuevoAuto = {
                "Maqueta": autoIntroducidoPorUsuario,
                "Año": añoIntroducidoPorUsuario
            };

            tablaSugerencias.push(nuevoAuto);
        } else {
            alert("No ingresó un dato válido");
        }

        MostrarTabla();
    };

    function nuevaMaqueta3(e) {
        e.preventDefault();
        nuevaMaqueta(e);
        nuevaMaqueta(e);
        nuevaMaqueta(e);

    };

    function borrarTabla() {
        tablaSugerencias = [];
        cuerpoTabla.innerHTML = "";
    }


    function buscar() {
        let valorabuscar = document.getElementById('buscar').value.toLowerCase().trim();
        let tabla_tr = document.getElementsByTagName("tbody")[0].rows;
        for (let i = 0; i < tabla_tr.length; i++) {
            let tr = tabla_tr[i];
            let textotr = tr.innerText.toLowerCase();
            tr.className = (textotr.indexOf(valorabuscar) != -1) ? "mostrar" : "ocultar";
            // operador ternario
        }
    }

    function resaltar() {
        let valoraresaltar = document.getElementById('resaltar').value.toLowerCase().trim();
        let tabla_tr = document.getElementsByTagName("tbody")[0].rows;
        if (valoraresaltar != "") {
            for (let i = 0; i < tabla_tr.length; i++) {
                let tr = tabla_tr[i];
                let textotr = tr.innerText.toLowerCase();
                tr.className = (textotr.indexOf(valoraresaltar) != -1) ? "resaltado" : "noresaltado";
                // operador ternario
            }
        } else {
            for (let i = 0; i < tabla_tr.length; i++) {
                let tr = tabla_tr[i];
                tr.classList.remove("resaltado");
            }
        }
    }

});