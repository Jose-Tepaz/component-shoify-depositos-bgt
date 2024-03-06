import axios from "axios";
import { all } from "micromatch";

//esto se oculta para mandar a produccion
const idDespotio = "846541694";

const listDirecciones = async(state) => {
    const peticion = await axios.get(`https://api.airtable.com/v0/appVwlmLP1164Ceku/tblgGAZYgdKhaKu7f?filterByFormula=Find(%22${idDespotio}%22%2C+IDcliente)`, {
        headers: {
            'Authorization': 'Bearer patRKAOUDaKjoM6c1.6564c9ab0b43954c74d0c41430eceb4a7f18a009249a22924ad944024e2d7446',
        }

    });

    //const direcciones = peticion.data.records[0].fields.DireccionesDepositos;
    const direcciones = peticion.data.records[0].fields;



    state(direcciones);


}

export {
    listDirecciones
}