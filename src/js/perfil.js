class profile{
    constructor(perfil){

        this._nombre = perfil["nombre"];
        this._lenguaje =perfil["lang"];
        this._tono = perfil["pitch"];
        this._color = perfil["colour"]; 
    }

     mostrar(){
        console.log(this._nombre);

    }
    get nombre(){
        return this._nombre;
    }

};
export default profile;