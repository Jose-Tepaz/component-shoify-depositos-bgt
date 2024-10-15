import ReactDOM from 'react-dom';
import { IdInput } from './IdInput';
import { Sedes } from './Sedes';
import { SedesList } from './SedesList';
import { TotalSend } from './TotalSend';
import { Comentarios } from './Comentarios';
import { Comentario2} from './Comentario2';
import { listDespostos } from './apicallasesores';
import { listDirecciones } from './apicalldepositos'
import { sendData } from './sendedata';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './index.css';
import { Button, Modal } from 'antd';





const App = () => {
    //Sete la lista de clientes de un depostio
    const [depositos, setDepositos] = React.useState(null)

    const [direcciones, setDirecciones] = React.useState(null)
    //console.log(direcciones);

    //Mesaje value
    const [mesajeValue, setMesajeValue] = React.useState([]);
    //console.log(mesajeValue);


    const listadeComenatios = mesajeValue.map((lista) => (
        `<li> ${lista.sku}: ${lista.comment} </li>` 
    ))
        
    //seteando comentario
    const convirtiendoaStringComentario = listadeComenatios.toString();
    const stgNoComa = convirtiendoaStringComentario.split(",").join('');
    const completeComent = mesajeValue <= 0 ? "No hay comentaios" :`<ul style="padding: 2px;margin:0px;"> ${stgNoComa} </ul>`;
    
    useEffect(() => { 
        
       
        console.log(completeComent)
       
        

      }, [mesajeValue])

    const [searchValue, setSearchValue] = React.useState(null);
    //console.log('Este es el valor ' + searchValue);

    const [adressSelect, setAdressSelect] = React.useState(null);

    const [clientSelect, setClientSelect] = React.useState([]);

    //Estado que activa el botón
    const [activeBtn, setActiveBtn] = React.useState(true);


    const arrayCliebte = clientSelect.DireccionesDepositos;
    const rfcClienteApi = clientSelect.RFC;
    const telemarketingClienteApi = clientSelect.Telemarketing;
    const emailClienteApi = clientSelect.Email;
    //console.log(rfcClienteApi, telemarketingClienteApi, emailClienteApi)
   
  useEffect(() => {
    setDirecciones(arrayCliebte);
}), [clientSelect]



 //ocultar al enviar a produccion
    //const idDespotio = "D-123574654";
    //const finalsend = "algo nuevo";
    //const nombreDeProductoAPI = "algo nuevo";
    //const skuDeProductoAPI = "algo nuevo";
    //const cantidadDeProductoAPI = "algo nuevo";
          
    // !!--- Send POST data to Airtable ---!!
    async function enviandoDatos() {
        try {
            const response = await fetch('https://api.airtable.com/v0/appVwlmLP1164Ceku/tbl7q7V4X0euPXyyC', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer patRKAOUDaKjoM6c1.6564c9ab0b43954c74d0c41430eceb4a7f18a009249a22924ad944024e2d7446',
            },
            body: JSON.stringify({
                "records": [{
                    "fields": {
                        "Idcliente": `${idDespotio}`,
                        "DireccionDeposito": `${adressSelect}`,
                        "Comentario": `${completeComent}`,
                        "productos": `${finalsend}`,
                        "Email": `${emailClienteApi}`,
                        "RFC": `${rfcClienteApi}`,
                        "emailTelemarketing": `${telemarketingClienteApi}`,
                        "NameProduct": `${nombreDeProductoAPI}`,
                        "SkuProduct": `${skuDeProductoAPI}`,
                        "CantidadProduct": `${cantidadDeProductoAPI}`,
                        "SolicitudPor": "Deposito",
                        "Deposito": `${idDespotio}`,
                    }
                }],
                "typecast": true
            })
        });

        if (response.status === 200) {
            alertaSucces();
            
        } else {
            alertaError();       
        }    
        } catch (error) {
            console.log(error) 
            
        }
    //console.log(response);
    }

    // !!--- End this script ---!! //

    //verifica si tenemos conección
useEffect(() => {
    if(navigator.onLine) {
        console.log("estamos en linea")
    } else {
        alertaError();
    }

});


    
    useEffect(() => {
        listDirecciones(setClientSelect);
    });

    // !!--- function to load BTN  ---!! //
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                orderCreate(); //crear la orden en shopify
                enviandoDatos();
                
                return newLoadings; 
            });
        }, 2000);
    };

    // !!--- END function to load BTN  ---!! //
    //modal de confirmación
    const   alertaSucces=()=>{
        Swal.fire({
        title: "Solicitaste tu cotización",
        html: "Te enviaremos una copia de tu cotización a tu correo electrónico y nos comunicaremos contigo a la brevedad para confirmar todos los detalles.",
        imageUrl: "https://cdn.shopify.com/s/files/1/0633/1459/1884/files/icon-done.svg?v=1706909092",
      imageWidth: 60,
      imageHeight: 60,
      showCloseButton: true,
      //showConfirmButton: false,
      confirmButtonText: `Volver al inicio`,
        
        customClass: {
            popup: 'popAlert',
            title: 'titlePopup',
            confirmButton: 'clear-cart',
            htmlContainer: 'textpopup',
            closeButton: 'clodeBtnBtn'
    
        }
        }).then((result) => {
            function clearMyCart () {
                $.ajax({
                    type: "POST",
                    url: '/cart/clear.js',
                    success: function(){
                      window.location.href = "/";
                    },
                    dataType: 'json'
                  }); 
              }
              clearMyCart ();
        });
    }

    //modal de error
const alertaError=()=>{
    Swal.fire({
    title: "No pudimos solicitar tu cotización",
    html: "Lo sentimos, pero algo ha salido mal al procesar tu solicitud. Por favor, verifica tu conexión a internet e inténtalo de nuevo.",
    imageUrl: "https://cdn.shopify.com/s/files/1/0633/1459/1884/files/icon-error.svg?v=1706911874",
  imageWidth: 60,
  imageHeight: 60,
  showCloseButton: true,
  confirmButtonText: `Volver a intentarlo`,
    customClass: {
        popup: 'popAlert',
        confirmButton: 'btn-siguiente',
        title: 'titlePopup',
        htmlContainer: 'textpopup',
        closeButton: 'clodeBtnBtn'

    }
}).then((result) => {
    location.reload();
});
}

 
    return (
        <>
        <div className='Wrapp-component' >


            <div className='cardComponent' >
            <Comentario2 
                mesajeValue={mesajeValue}
                setMesajeValue={setMesajeValue} 
                />
                
            </div > 
            <div className='cardComponent'>
{ /* wrapp a list of address */}

                    <SedesList direcciones={direcciones}
                        setDirecciones={setDirecciones} > 
                        {direcciones != null ? (direcciones.map(direccion =>
                                    <Sedes key={direccion}
                                        isActive={activeBtn}
                                        setIsActive={setActiveBtn}
                                        name={direccion}
                                        adressSelect={adressSelect}
                                        setAdressSelect={setAdressSelect}
                                    />
                                )
                            ) : (<p className='nonInfo'> Introduce un ID de cliente para ver las direcciones disponibles </p>) }                               
                        </SedesList> 
                        </div> 
                        <div className='cardComponent'>
                                    <TotalSend />
                                    <Button
                                        type="primary"
                                        disabled = {activeBtn}
                                        loading={loadings[0]}
                                        onClick={
                                            () => enterLoading(0)                                       
                                        }
                                        >
                                        Pedir Cotización 
                                        </Button> 
                        </div > 
                        </div> 
                        
                        </>
                                        )
                }

ReactDOM.render( < App /> , document.getElementById('root'));