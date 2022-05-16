const api_url='http://localhost/api_rest/';
//obtener el dato de la fecha de acuerdo a id y llamar a la función
//llamar hora
const fechaIngresada= document.getElementById("date");
//const horaSeleccionada=document.getElementById("hora");
const input=document.getElementById("texto");
const horas=document.getElementById('horas');
let fecha="";

fechaIngresada.addEventListener('change',function(){
    if(this.value){
        fecha=this.value;
        let informacion=document.getElementById("informacion");
        if(verificarFecha(fecha)==true){
            informacion.innerHTML="Seleccione la hora que desea reservar.<br>"+
            "Recuerde que puede reservar una sola hora.";
            informacion.style.color="black";
            llamarHorario(fecha);
        }else{
            informacion.innerHTML="Debe seleccionar un día entre lunes y viernes";
            informacion.style.color="red";
            horas.innerHTML="";
        }
        //horaSeleccionada.style.visibility="visible";
    }
});

function llamarHorario(fecha){
    const url=api_url+'?date='+fecha;
    fetch(url)
    .then(  response => response.json())
    .then( response => {
        mostrarHoras(response);
    }  );
}

function mostrarHoras(listado){
    let hora='';
    let aux=9;
    let i=0;
    
    while(aux<=18){
        if(i<listado.length && ((String(aux)+':00:00') == listado[i].start_time || '09:00:00' == listado[i].start_time)){
            let cadena=listado[i].start_time;
            let subcadena=cadena.substring(0,5);
            hora=`${hora}<p class="ocupado">${subcadena}</p>`;
                aux++;
                i++;
        }else{
            if(aux<10){
                hora=`${hora}
                <p class="libre"><a href="datos.html?fecha=${fecha}&hora=0${aux}:00:00">0`+
                aux+`:00</a></p>`;
                aux++;
            }else{
                hora=`${hora}
                <p class="libre"><a href="datos.html?fecha=${fecha}&hora=${aux}:00:00">`+
                aux+`:00</a></p>`;
                aux++;
            }
        }

    }
    horas.innerHTML=hora;
}

function verificarFecha(fecha){
    let dia=new Date(fecha);
    let diaDetalle=dia.getDay();
    if(diaDetalle>=0 && diaDetalle<5){
        return true;
    }else{
        return false;
    }
}