import createModule from "./mo_simulator_wasm.mjs";

class WasmApiClass {
    constructor(){
        this.created = false;
        this.initialized = false;
    }

    async call(endpoint, method, body) {
        if (!this.created) {
            this.created = true;
            createModule().then((Module) => {
                this.mocpp_wasm_api_call = Module.cwrap("mocpp_wasm_api_call", "string", ["string", "string", "string"]);
                this.initialized = true;
            });
        }
        return new Promise((resolve,reject) => {
            var pollInitialized = () => {
                if (this.initialized) {
                    resolve(JSON.parse(this.mocpp_wasm_api_call(endpoint, method, body)));
                } else {
                    setTimeout(pollInitialized, 100);
                }
            };
            pollInitialized();
        });
    }

}

export const WasmApi = new WasmApiClass();
