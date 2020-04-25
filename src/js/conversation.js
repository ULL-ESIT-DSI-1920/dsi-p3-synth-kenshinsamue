import Profile from './perfil.js';

class Conversation{
  constructor(conversaciones,users){
    this._chat=conversaciones;
    this._users=users;
  }

  construirChat(){
    var elementoPadre = document.getElementById("chat");
    var i ; var cosas;
    for(i=0; i<this._chat.length;i++){    
      cosas = Object.keys(this._chat)[i];
      this.crearDialogo(this._chat[cosas],elementoPadre);
    }
  }

  crearDialogo(info,padre){
    var div = document.createElement('div');
    var img = document.createElement('div');
    var text =document.createElement('div');
    var a = document.createElement("a");
    div.classList.add("campo");
    div.classList.add("ocultar");
    img.classList.add("imagen");
    img.classList.add(info.author);
    text.classList.add("texto");
    div.appendChild(img);
    div.appendChild(text);
    text.appendChild(a);
    padre.appendChild(div);

    var opcion = document.getElementById("boton").childNodes[1];
    
    this.configurarSynth(this._users[info.author],info.message,a,opcion);
  }

  configurarSynth(perfil,guion,campo,opcion){    

    const msg  = new SpeechSynthesisUtterance();
    msg.lang = perfil.lenguaje;
    msg.text = guion;
    msg.rate= perfil.rate;
    msg.volume =0.4;
    msg.pitch = perfil.tono;

    msg.onboundary = (event)=>{

      if(opcion[0].checked == true){
        if(event.name == "sentence"){
          const palabra = msg.text; 
          this.completo(palabra,perfil,campo);
        }
        
      }
  
      else{
  
        if(opcion[1].checked ==true){
         
          if (event.name === "word") {
            const start = event.charIndex;
            const end = start+ event.charLength;
            const palabra = msg.text.substring(start,end)+" ";
            this.wordByWord(palabra,perfil,campo);
          }
        }
          else{
            if (event.name === "word") {
              const start = event.charIndex;
              const end = start+ event.charLength;
              const palabra = msg.text.substring(start,end)+" ";
              this.letterToLetter(palabra,perfil,campo);
            }
         }
      }
    };
    speechSynthesis.speak(msg);
  }

  completo(guion,perfil,campo){
    if(campo.childNodes.length === 0){
      var texto = document.createTextNode(guion);
      campo.appendChild(texto);
      campo.parentNode.parentNode.classList.remove("ocultar");
      campo.classList.add(perfil.color);
    }
  }

  wordByWord(guion,perfil,campo){
    if(campo.childNodes.length === 0){
      var texto = document.createTextNode(guion);
      campo.appendChild(texto);
      campo.parentNode.parentNode.classList.remove("ocultar");
      campo.classList.add(perfil.color);
    }
    else{
      campo.childNodes[0].data= campo.childNodes[0].data+guion; 
    }
  }

  letterToLetter(guion,perfil,campo){

    var j =0;

    var interval = setInterval(() => {
      if(campo.childNodes.length === 0){
        var texto = document.createTextNode(guion.charAt(j));
        campo.appendChild(texto);
        campo.parentNode.parentNode.classList.remove("ocultar");
        campo.classList.add(perfil.color);
        j++;          
      }
      else{
        campo.childNodes[0].data= campo.childNodes[0].data+guion.charAt(j);
        j++;
      }
      if (j > guion.length){
        clearInterval(interval);
      }

    }, 20);

  }

  sinthLetter(perfil,guion,campo){
    var i;
    var msg;
    var j = 0;
    for(i =0; i<guion.length;i++){
      msg  = new SpeechSynthesisUtterance();
      msg.lang = perfil.lenguaje;
      msg.rate= perfil.rate;
      msg.volume =0.4;
      msg.pitch = perfil.tono;
      msg.onstart = ()=>{
        if(campo.childNodes.length === 0){
          var texto = document.createTextNode(guion.charAt(j));
          campo.appendChild(texto);
          campo.parentNode.parentNode.classList.remove("ocultar");
          campo.classList.add(perfil.color);
          j++;
                    
        }
        else{
          campo.childNodes[0].data= campo.childNodes[0].data+guion.charAt(j);
          j++; 
        }
      };
      msg.text = guion.charAt(i);
      speechSynthesis.speak(msg);
    }
  }
};

export default Conversation;