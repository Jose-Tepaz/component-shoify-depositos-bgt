import ReactDOM from 'react-dom';
import { IdInput } from './IdInput';
import { Sedes } from './Sedes';
import { SedesList } from './SedesList';
import { TotalSend } from './TotalSend';
import { Comentarios } from './Comentarios';
import { listDespostos } from './apicallasesores';
import { listDirecciones } from './apicalldepositos'
import { sendData } from './sendedata';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './index.css';
import { Button, Spin } from 'antd';





const App = () => {
    //Sete la lista de clientes de un depostio
    const [depositos, setDepositos] = React.useState(null)

    const [direcciones, setDirecciones] = React.useState(null)
    //console.log(direcciones);

    //Mesaje value
    const [mesajeValue, setMesajeValue] = React.useState(null);
    //console.log(mesajeValue);

    const [searchValue, setSearchValue] = React.useState(null);
    //console.log('Este es el valor ' + searchValue);

    const [adressSelect, setAdressSelect] = React.useState(null);

    const [clientSelect, setClientSelect] = React.useState([]);

    const arrayCliebte = clientSelect.DireccionesDepositos;
    const rfcClienteApi = clientSelect.RFC;
    const telemarketingClienteApi = clientSelect.Telemarketing;
    const emailClienteApi = clientSelect.Telemarketing;
   
  
    
  useEffect(() => {
    setDirecciones(arrayCliebte);
}), [clientSelect]



    const idDespotio = "1234578";

    // --!! Esto se oculta cuando se manda a produccion !!--

    const nuevosproducyos = [
        'Producto de prueba uno',
        'Producto de prueba dos',
        'Producto de prueba tres',
    ]
    let converTbprouct = nuevosproducyos.map(function (element) {
        return `<td>${element}</td>`;
    });
    const arrytostring = converTbprouct.toString();
    const finalsend = arrytostring.replaceAll(",", "");
  

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
        console.log(response);
    }

    // !!--- End this script ---!! //
    useEffect(() => {
        listDirecciones(setClientSelect);
    });

  

    //setea la lista de depositps del asesor

    //useEffect(() => {
    //    listDespostos(setDepositos);
//
    //}, [depositos]);



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
                //sendData();

                enviandoDatos();

                return newLoadings;
            });
        }, 2000);
    };

    // !!--- END function to load BTN  ---!! //


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
                                        name={direccion}
                                        adressSelect={adressSelect}
                                        setAdressSelect={setAdressSelect}
                                    />
                                )
                            ) : (<p className='nonInfo'> Introduce un ID de cliente para ver las direcciones disponibles </p>) }                               < /
                        SedesList> 
                        </div> 
                        <div className='card'>
                                    <TotalSend />
                                    <Button
                                        type="primary"
                                        loading={loadings[0]}
                                        onClick={
                                            () => enterLoading(0)
                                        } >
                                        Pedir Cotización </Button> 
                        </div > 
                        </div> 
                        </>
                                        )
                }

ReactDOM.render( < App /> , document.getElementById('root'));