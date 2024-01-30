import axios from "axios";


const sendData = async() => {

    try {
        const peticion = await axios.post("https://api.airtable.com/v0/appVwlmLP1164Ceku/tbl7q7V4X0euPXyyC", {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                'Authorization': 'Bearer patRKAOUDaKjoM6c1.6564c9ab0b43954c74d0c41430eceb4a7f18a009249a22924ad944024e2d7446',


            },
            body: {
                "records": [{
                    "fields": {
                        "Idcliente": "12345678",
                        "DireccionDeposito": "Zacatecas #334",
                        "Comentario": "No vi disponibilidd",
                        "Email": "jose@acueducto.studio",
                        "RFC": "SAOM720912J33"
                    }
                }]
            }



        });

        console.log(peticion);


    } catch (error) {
        console.log(error);
    }


    //state(peticion);

}

export {
    sendData
}