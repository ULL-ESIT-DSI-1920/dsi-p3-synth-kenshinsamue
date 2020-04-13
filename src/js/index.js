import Conversation from './conversation.js';
import Profile from './perfil.js';


document.getElementById("boton").onclick = function (){

  document.getElementById("boton").classList.add("ocultar");
  document.getElementById("conv").classList.remove("ocultar");
  const lars = new Profile("Lars","en",1.0,1.5,"rojo");
  const kirk = new Profile("Whammet","en",1.0,1.0,"amarillo");
  const jason = new Profile("Jason","en",1.0,1.0,"verde");
  const dave = new Profile("Mustaine","en",1.0,1.0,"blanco");

  const chat = [
    {   author: "Lars",
      message: "Seriously! This is the fucking sandbox." },

    {   author: "Whammet",
      message: "Well, he´s wounded"   },

    {   author: "Lars",
      message: "huh?"     },
        
    {   author: "Whammet",
      message: "he´s wounde. yeah, but you know its up to him to mend himself"     },
    
    {   author: "Whammet",
      message:"and we´re giving him every opportunity.."      },

    {   author: "Lars",
      message: "He fucking left the band!, He fucking left the band!"     },
    
    {   author: "Lars",
      message: "I mean, period! Exclamation point!"},

    {   author: "Jason",
      message: "No way!"},

    {   author: "Mustaine",
      message: "Oh,you too ?. Wanna hang up in a concert with us ?"}
  ];

  const usuarios = {
    Lars : lars,
    Whammet: kirk,
    Jason: jason,
    Mustaine : dave
  };
  const conv = new Conversation(chat,usuarios);

  conv.construirChat();


  document.getElementById("video").classList.remove("ocultar");
};

