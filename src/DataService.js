import { API_ROOT } from "./constants"

class DataServiceClass {
    constructor(){
        this.apiRoot = API_ROOT;
    }
    
    async post(endpoint, body) {
        let url = this.apiRoot + endpoint;
        let options = {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(body)
        }
        let response = await fetch(url, options);
        return response.json()
    }
}

const DataService = new DataServiceClass();

export default DataService;