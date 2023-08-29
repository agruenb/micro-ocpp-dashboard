import createModule from "./mo_simulator_for_wasm.mjs";

class WasmApiClass {
    constructor(){
        this.initialized = false;

        createModule().then((Module) => {
            this.mocpp_wasm_api_call = Module.cwrap("mocpp_wasm_api_call", "string", ["string", "string", "string"]);
            this.initialized = true;
        });
    }

    async call(endpoint, method, body) {
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
