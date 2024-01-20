import axios from "axios";
import { all } from "micromatch";

//${987654321}
const asesorIdshopify = "987654321";

const listDespostos = async(state) => {

    const peticion = await axios.get(`https://api.airtable.com/v0/appVwlmLP1164Ceku/tblA5nanxMBvyKiY9?filterByFormula=Find(%22${asesorIdshopify}%22%2C+idAsesor)`, {
        headers: {
            'Authorization': 'Bearer patRKAOUDaKjoM6c1.6564c9ab0b43954c74d0c41430eceb4a7f18a009249a22924ad944024e2d7446',
        }

    });

    //console.log(peticion)
    const clientes = peticion.data.records[0].fields.IdDeposito;
    const nombreClientes = peticion.data.records[0].fields.NombreDeposito;

    state(clientes);

    //console.log(peticion)


}

export {
    listDespostos
}