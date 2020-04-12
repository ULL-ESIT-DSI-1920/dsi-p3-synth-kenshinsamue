import profile from './perfil.js';



class conversation{
    constructor(conversaciones,users){
        this._chat=conversaciones;
        this._users=users;
    }

    configurar_synth(perfil,guion){
        const msg  = new SpeechSynthesisUtterance();
        
        msg.lang = perfil.lenguaje;
        msg.text = guion;

        msg.rate= perfil.rate;
        msg.volume =0.4;
        msg.pitch = perfil.tono;
       
        speechSynthesis.speak(msg);

    }
    wordByWord(informacion,text){
        var sintetizador;
   // text.data=informacion["message"];
        const dialogo = informacion["message"].split(" ");
        var i;
        for(i=0;i<dialogo.length;i++){
            if(i==0){
                text.data = dialogo[i]+" ";
            }
            else{
                text.data = text.data+dialogo[i]+" ";
            }
            this.configurar_synth(this._users[informacion["author"]], dialogo[i]);
        }
        
    }

    normal(informacion,text){
        var sintetizador;
   // text.data=informacion["message"];
        text.data = informacion["message"];
        this.configurar_synth(this._users[informacion["author"]], text.data);
    }
    crearDialogo(info,padre){

        var div = document.createElement('div');
        var img = document.createElement('div');
        var text =document.createElement('div');
        var a = document.createElement("a");
        //var letter = document.createTextNode(info["message"]);
        var letter = document.createTextNode("a");
        a.classList.add("blanco");
        div.classList.add("campo");
        img.classList.add("imagen");
        img.classList.add(info["author"])
        text.classList.add("texto");

        div.appendChild(img);
        div.appendChild(text);
        text.appendChild(a);
        a.appendChild(letter);

        //return div;
        padre.appendChild(div);
        //this.normal(info,letter);
        this.wordByWord(info,letter);
    }

    construirChat(){
        var elementoPadre = document.getElementById("chat");
        var i ; var cosas;
        for(i=0; i<this._chat.length;i++){    
            cosas = Object.keys(this._chat)[i];
            this.crearDialogo(this._chat[cosas],elementoPadre);
            //elementoPadre.appendChild(this.crearDialogo(this._chat[cosas]));
        }

    }
};

export default conversation;