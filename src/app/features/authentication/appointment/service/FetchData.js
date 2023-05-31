const URI = 'http://127.0.0.1:52517/components/MakeApointment/doctorList.json';

export default {
    async fetchUsers() {
        try {
                let response = await fetch(URI + '/doctors');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}