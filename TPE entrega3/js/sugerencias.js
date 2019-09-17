document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    let cuerpoTabla = document.querySelector("#autos-tabla");

    let baseUrl = "http://web-unicen.herokuapp.com/api/groups/grupo14/sugerencias";

    let rtaCarga = document.getElementById("js-cargando");

    MostrarTabla();

    setInterval(function(){ 
        
            MostrarTabla();
        } , 5000);

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
        rtaCarga.innerHTML = "loading..."
        
        fetch(baseUrl)
            .then(response => {
                if (!response.ok) { console.log("error"); } else { return response.json() }
            })
            .then(json => {
                
                cuerpoTabla.innerHTML = "";
                sortJSON(json.sugerencias,"dateAdded");
                
                for (let elem of json.sugerencias) {
                    cuerpoTabla.innerHTML += "<tr>" +
                        "<td>" + elem.thing.Maqueta + "</td>" +
                        "<td>" + elem.thing.Año + "</td>" +
                        '<td> <button class="Delete" data-id-borrarSug=' + elem._id + '> Borrar </button>'
                        + '<button class="Modify" data-id-modificarSug=' + elem._id + '> Editar </button> <td>' +
                        "</tr>";

                }
                agregarAdd(); // agrega los event listeners a todos los nuevos elemenots

                
                buscar();
                resaltar();
                rtaCarga.innerHTML = "Listo!"

            }).catch(function (e) { console.log(e) })
    };


    function sortJSON(mijson, key) {
        return mijson.sort(function (a, b) {
            let x = a[key];
            let y = b[key];
            if(x < y){return -1;}
            else if(x > y){return 0;}
            
        })};

    function nuevaMaqueta(e) {
        e.preventDefault();
        let autoIntroducidoPorUsuario = document.getElementById('Auto').value;
        let añoIntroducidoPorUsuario = document.getElementById('Año').value;
        let verificacionAuto = autoIntroducidoPorUsuario.trim();

        if (añoIntroducidoPorUsuario > 1886 && añoIntroducidoPorUsuario < 2020 && verificacionAuto != "") {



            let nuevoAuto = {
                thing: {
                    "Maqueta": autoIntroducidoPorUsuario,
                    "Año": añoIntroducidoPorUsuario
                }
            };

            fetch(baseUrl, {
                "method": "POST",
                "mode": 'cors',
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(nuevoAuto)
            }).then(response => {
                if (!response.ok) { console.log("error"); } else { return response.json() }
            }).then(json => {
                // cuerpoTabla.innerHTML = "";
                MostrarTabla();
                console.log(json);
            }).catch(function (e) { console.log(e) })
        } else {
            alert("No ingresó un dato válido");
        }

    };

    function nuevaMaqueta3(e) {
        e.preventDefault();
        nuevaMaqueta(e);
        nuevaMaqueta(e);
        nuevaMaqueta(e);

    };



    // function

    function agregarAdd() {
        let btnesBorrar = document.querySelectorAll(".Delete");
        for (let btnBorrar of btnesBorrar) {
            btnBorrar.addEventListener("click", function () {

                BorrarEse(btnBorrar.getAttribute('data-id-borrarSug'));

            });
        }
        // soy una barra espaciadora
        let btnesCambiar = document.querySelectorAll(".Modify");
        for (let btnCambiar of btnesCambiar) {
            btnCambiar.addEventListener("click", function () {
                CambiarEse(btnCambiar.getAttribute('data-id-modificarSug'));
            });
        }

    }

    function BorrarEse(param) {
        fetch(baseUrl + "/" + param, {
            "method": "DELETE"
        }).then(response => response.json()).then(json => {
            console.log(json);
            MostrarTabla(json);
        }).catch(function (e) { console.log(e) })
    }

    function CambiarEse(param) {
        let autoIntroducidoPorUsuario = document.getElementById('Auto').value;
        let añoIntroducidoPorUsuario = document.getElementById('Año').value;
        let verificacionAuto = autoIntroducidoPorUsuario.trim();

        let nuevoAuto = {
            thing: {
                "Maqueta": autoIntroducidoPorUsuario,
                "Año": añoIntroducidoPorUsuario
            }
        };

        if (añoIntroducidoPorUsuario > 1886 && añoIntroducidoPorUsuario < 2020 && verificacionAuto != "") {

            fetch(baseUrl + "/" + param, {
                "method": "PUT",
                "mode": 'cors',
                "headers": { "Content-Type": "application/json" },
                "body": JSON.stringify(nuevoAuto)

            }).then(response => response.json()).then(json => {
                console.log(json);
                MostrarTabla(json);
            }).catch(function (e) { console.log(e) })




        } else {
            alert("No ingresó un dato válido");
        }

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

// set interval