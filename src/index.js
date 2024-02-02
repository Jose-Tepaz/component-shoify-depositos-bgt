import ReactDOM from 'react-dom';
import { IdInput } from './IdInput';
import { Sedes } from './Sedes';
import { SedesList } from './SedesList';
import { TotalSend } from './TotalSend';
import { Comentarios } from './Comentarios';
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
    const [mesajeValue, setMesajeValue] = React.useState("No hay comentarios");
    //console.log(mesajeValue);

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
    //const idDespotio = "123456789";
    //const finalsend = "algo nuevo";
          
    // !!--- Send POST data to Airtable ---!!
    async function enviandoDatos() {
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
                        "Comentario": `${mesajeValue}`,
                        "productos": `${finalsend}`,
                        "Email": `${emailClienteApi}`,
                        "RFC": `${rfcClienteApi}`,
                        "emailTelemarketing": `${telemarketingClienteApi}`,
                    }
                }],
                "typecast": true
            })
        });
        //console.log(response);
    }

    // !!--- End this script ---!! //

    
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
                //alert("Solicitud enviada con éxito...");
                enviandoDatos();
                mostrarAlerta();
                return newLoadings;
            });
        }, 2000);
    };

    // !!--- END function to load BTN  ---!! //
    //modal de confirmación
    const mostrarAlerta=()=>{
        Swal.fire({
        title: "Cotizacion solicitada con éxito",
        icon: "success",
        confirmButtonText: `Volver al inicio`,
        customClass: {
            confirmButton: 'btn-siguiente',
            popup: 'popAlert',
            title: 'titlePopup',
        }
    }).then((result) => {
        window.location = '/';
    });
    }
 
    return (
        <>
        <div className='Wrapp-component' >


            <div className='card' >
                <Comentarios mesajeValue={mesajeValue}
                 setMesajeValue={setMesajeValue}/>
            </div > 
            <div className='card'>
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
                        <div className='card'>
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