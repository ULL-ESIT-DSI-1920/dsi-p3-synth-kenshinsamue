class Profile{
  constructor(nombre,idioma,rate,tono,color){

    this._nombre = nombre;
    this._lenguaje =idioma;
    this._rate = rate;
    this._tono = tono;
    this._color= color;
  }

  get nombre(){
    return this._nombre;
  }

  get lenguaje(){
    return this._lenguaje; 
  }

  get rate(){
    return this._rate;
  }

  get tono(){
    return this._tono;
  }

  get color(){
    return this._color;
  }
};
export default Profile;