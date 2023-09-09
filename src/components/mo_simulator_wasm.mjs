/*
 * Empty placeholder file for the WebAssembly version of the Core MicroOcpp lib.
 *
 * See the documentation in https://github.com/matth-x/MicroOcppSimulator/ for a guide on how to 
 * build the WebAssembly port. During the build procedure, this file will be replaced by the
 * "real" WebAssembly file.
 */

//dummy function signature for createModule()
function createModule() {
    console.log("error in build config: WASM API called but WASM binary files not installed");
}

export default createModule;
