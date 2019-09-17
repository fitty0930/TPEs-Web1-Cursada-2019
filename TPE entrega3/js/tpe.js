"use strict";
// captcha

function CargarPagina(){
  let a;
  let b;
  let c;
  let d; // variables globales para el captcha (las uso en el generador)
  function generateCaptcha() {
    let alpha = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    let i;
    for (i = 0; i < 4; i++) {
      a = alpha[Math.floor(Math.random() * alpha.length)];
      b = alpha[Math.floor(Math.random() * alpha.length)];
      c = alpha[Math.floor(Math.random() * alpha.length)];
      d = alpha[Math.floor(Math.random() * alpha.length)];
    }
    let code = a + '' + b + '' + '' + c + '' + d;
    document.getElementById("mainCaptcha").value = code
  }
  // chequeo
  function CheckValidCaptcha() {
    let string1 = removeSpaces(document.getElementById('mainCaptcha').value);
    let string2 = removeSpaces(document.getElementById('txtInput').value);
    if (string1 == string2) {
      document.getElementById('respuesta').innerHTML = "Correcto";
      document.getElementById('form').submit();
      //validado;
      return true;
    }
    else {
      document.getElementById('respuesta').innerHTML = "Por favor ingrese los caracteres correctamente";
      //no validado;
      return false;
    }
  }


  // quita espacios en blanco; 
  function removeSpaces(string) {
    return string.split(' ').join('');
  }
  
  generateCaptcha();

  let refresh = document.getElementById('refresh');
  refresh.addEventListener("click",generateCaptcha);

  let btncheck = document.getElementById('btnCheck');
  btncheck.addEventListener("click",CheckValidCaptcha);
}

document.addEventListener('DOMContentLoaded', CargarPagina);
