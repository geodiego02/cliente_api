const fecha=getParameterByName("fecha");
const hora=getParameterByName("hora");
const url='http://localhost/api_rest/';
let fe=document.getElementById("fecha");
let ho=document.getElementById("hora");
let correoValido=false;
fe.innerHTML=fecha;
ho.innerHTML=hora;

let correo=document.getElementById("correo");
let texto=document.getElementById("textFinal");
correo.addEventListener('keyup',function(){
    if(this.value){
        const mail=this.value;
        if(verificarCorreo(mail) == true){
            texto.innerHTML="Tu dirección email es correcta.";
            texto.style.color="blue";
            correoValido=true;
        }else{
            texto.innerHTML="Tu dirección email es inválida.";
            texto.style.color="red";
            correoValido=false;
        }
    }
});

document.getElementById("reservar").addEventListener('click',function(){
    if(correoValido == true){
        registrarHora();
    }else{
        alert("Se debe verificar que el correo sea válido.");
    }
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function verificarCorreo(correo){
    let patron=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(correo.match(patron)){
        return true;
    }else{
        return false;
    }
}


function registrarHora(){
    let data=new FormData();
    data.append('date',fecha);
    data.append('hora',hora);
    data.append('correo',correo.value);
    fetch(url,{
        method: 'POST',
        body: data
    })
    .then( function(response){
        if(response.ok){
            return response.json();
        }else{
            throw alert("Error en la conexión a la API.");
        }
    })
    .then(response => {
        alert(response);
        //regresar a la página principal
        let targetURL = 'http://localhost/cliente_api/';
        let newURL = document.createElement('a');
        newURL.href = targetURL;
        document.body.appendChild(newURL);
        newURL.click();
    } );
}