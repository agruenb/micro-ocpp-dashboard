import { API_ROOT, NODE_ENV } from "./constants"

class DataServiceClass {
    constructor(){
        this.apiRoot = API_ROOT;
    }

    async post(endpoint, body) {
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        };
        return this.request(endpoint, options);
    }

    async get(endpoint) {
        let options = {
            method: "GET"
        };
        return this.request(endpoint, options);
    }
    
    async request(endpoint, options) {
        let url = this.apiRoot + endpoint;
        let response;
        if(NODE_ENV === "development"){
            //this block is only included in the development build
            try{
                console.log("Fetch - Options: ", options);
                response = await fetch(url, options);
            }catch(error){
                console.error("The api request could not complete successfully", `URL: ${url}`, body)
                throw error;
            }
            let response_raw, response_json;
            try{
                response_raw = await response.text();
                response_json = JSON.parse(response_raw);
            }catch(error){
                console.error("Could not parse api response as JSON", `Response: ${response_raw}`);
                throw error;
            }
            console.log("Response: ", response_json);
            return response_json;
        }
        if(NODE_ENV === "production"){
            //this block is only included in the production build
            response = await fetch(url, options);
            return response.json();
        }
    }
}

const DataService = new DataServiceClass();

export default DataService;