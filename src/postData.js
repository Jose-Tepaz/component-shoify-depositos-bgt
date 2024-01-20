import axios from "axios";

const sendDataPost = async() => {
    const sendObject = await axios.post(`https://api.airtable.com/v0/appVwlmLP1164Ceku/tblgGAZYgdKhaKu7f?filterByFormula=Find(%22${id}%22%2C+IDcliente)`, {
        headers: {
            'Authorization': 'Bearer patRKAOUDaKjoM6c1.6564c9ab0b43954c74d0c41430eceb4a7f18a009249a22924ad944024e2d7446',
        }

    });

}