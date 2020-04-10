import profile from './perfil.js';

const a = {nombre: "Lars",
        lang:"en",
        rate:2.0,
        pitch:1.0,
        colour:"#000000"
};






const b = new profile(a);

console.log(b.nombre);

/*const manzProfile = new Profile("Manz", {               // creamos una clase que contendra el avatar, y representa a un usuario
    lang: "es",
    rate: 2.0,
    pitch: 1.0,
    color: "#ff0000",
  });





const conversation = new Conversation(box);

conversation.addMessage([
  { author: manzProfile, text: "¡Hola a todos! ¿Qué tal están?" },
  { author: robotProfile, text: "Muy bien, ¡gracias!" },
  { author: breadmanProfile, text: "Yo también muy bien" },
  {
    author: manzProfile,
    text: "El robot habla con un acento un tanto raro...",
  },
  { author: robotProfile, text: "Es que soy del norte" },
]);*/