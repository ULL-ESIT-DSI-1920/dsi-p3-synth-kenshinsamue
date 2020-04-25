# Practica 8

Enrique Manuel Pedroza Castillo
alu0100886351@ull.edu.es

## Descripcion de la practica

En la practica se nos pide crear un "chat", pero con la particularidad de que el texto va a ser reproducido por un sintetizador de voz incorporado dentro del 
navegador. Para ello se van a pedir tres modalidades de reproduccion, con todo el dialogo, palabra a palabra y letra a letra.


### Html

En el codigo `HTML` nos encontraremos algo muy basico y simple. Por una parte en la cabecera nos encontraremos los tipicos enlaces a los ficheros `index.js` 
e `index.css`. Estos ficheros contendran los scripts y los estilos de la pagina respectivamente.

	<!DOCTYPE html>
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Practica 8</title>

	  <link rel="stylesheet" href="./css/index.css">
	  <script defer src="./js/index.js"></script>
	</head>

Por otro lado dentro de `body`nos encontramos dos `div`que contendran, el primero el formulario para preguntar la modalidad en la que se 
mostrara el texto, y el segundo que servira como contenedor del chat en si junto con un video contextual.


	<body>

    <div id="boton">
        <form>
            <input type="radio" id="frase" name="opcion" value="frase">
            <label for="frase">Frase entera</label><br>

            <input type="radio" id="palabra" name="opcion" value="palabra">
            <label for="female">Palabra a palabra</label><br>

            <input type="radio" id="letra" name="opcion" value="letra">
            <label for="other">Letra a letra</label><br><br>

            <button id="enviar" type="button">listo</button>
          </form> 
    </div>
    <div class="ocultar" id="conv">
        <div class="chat" id="chat">
        </div>
        <iframe  class="ocultar" id="video"
            src="https://www.youtube.com/embed/kj_8E3FOU4s">
        </iframe> 
    </div>
	   
	</body>

### CSS

En el codigo `css` nos encontramos con diversas clases y reglas para los estilos que necesitaremos mas tarde. Podemos empezar con la clase `campo`:

	.campo{
	    margin-top: 10px;
	    height: 100px;
	    width: 100%;
	    background: red;
	    display: flex;
	    align-items: center;
	}

Esta clase representa cada dialogo, de forma individual de cada usuario. Como se puede ver se establece una separacion entre el elemento en la parte superior, 
una altura y anchura predeterminada, ademas el fondo tendra un color rojo y usaremos las propiedades `flex`  y  `align-items` para facilitar la disposicion de 
los elementos dentro del propio `div`

La siguiente clase sera mas simple, se llama `ocultar`, como su nombre nos puede sugerir, sirve para establecer una regla de visibilidad a un elemento 
concreto.

	.ocultar{
	    visibility: hidden;
	}

Luego tendremos las clases de los colores, que se usaran para darle un color determinado a la fuente dentro del chat, como vemos tenemos cuatro colores: blanco, rojo, amarillo y verde:

	.blanco{
	    color: white;
	}

La siguiente clase se llama `imagen`, se usa para fijar las propiedades del tamaño de las imagenes que representan a los usuarios.

	.imagen{
	    height: 100%;
	    width: 100px;
	}

Las siguientes cuatro clases se usan para establecer una carga al directorio `src/assets/` para cargar la imagen del usuario. 

	.Lars{
	    background-image: url("../assets/Lars.png");
	}

`Texto`, es una clase que usaremos, para otro campo `div` que se ubicara al lado del `div` que contendra la imagen del usuario, y que ademas contendra el 
texto del dialogo de dicho usuario. 

	.texto{
	    height: 100%;
	    width: 100%;
	    background: black;
	}

Casi acabando, tenemos `chat` que sera el div que contendra todas las lineas de dialogo:

	.chat{
	    float: left;
	    width: 1000px;
	}

Y por ultimo tenemos reglas para las etiquetas tipo `iframe`, es decir el video de youtube que vamos a cargar: 
	
	iframe{
	    margin-top :8px;
	    float:right;
	    height: 300px;
	    width: 450px;
	}

A modo de aclaracion, la estructura que se espera de los diferentes div y etiquetas es : 

	Chat
	.	|
	.	|--> campo
	.	.		  |
	.	.		  |--> img
	.	.		  |--> texto
	.	.		  .			|
	.	.		  .			|--> <a>
	.	.
	.		  
	|--> <iframe>


### JavaScript

En JavaScript tenemos dos clases : `perfil` y `conversation`.

Para empezar, tenemos `perfil` que lo describimos de la siguiente forma: 

	class profile{
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

Como vemos consta simplemente de un constructor, que se limita a obtener los datos por parametros, y los guarda en atributos para poder ser 
usados en getters.

Por otro lado tenemos `Conversation`, que es un poco mas compleja, por lo que iremos metodo a metodo:

    constructor(conversaciones,users){
        this._chat=conversaciones;
        this._users=users;
    }

Nada mas empezar nos encontramos con el constructor, que como vemos guarda como atributo el hash con las conversaciones y otro hash con los 
objeto `perfil` de cada usuario. 

Posteriormente tenemos el metodo `construirChat`:

    construirChat(){
        var elementoPadre = document.getElementById("chat");
        var i ; var cosas;
        for(i=0; i<this._chat.length;i++){    
            cosas = Object.keys(this._chat)[i];
            this.crearDialogo(this._chat[cosas],elementoPadre);
        }
    }

Este metodo se usa para construir de forma dinamica los diferentes `div` que contendran los dialogos e imagenes, de forma que por cada elemento 
dentro del  hash que contiene el chat se creara un nuevo. Esto se hace llamando al metodo `crearDialogo` que se le pasara como parametros el 
perfil del usuario al que corresponde el dialogo y el elemento padre del dialogo dentro del `DOM`.

Como vemos en las primeras instrucciones, crearemos los diferentes elementos de forma separada, 3 `div`, uno para contenerlo todo, otro para la 
imagen y el ultimo para el texto, y 1 elemento con etiqueta `<a>`:

    var div = document.createElement('div');
    var img = document.createElement('div');
    var text =document.createElement('div');
    var a = document.createElement("a");

Lo siguiente que se hace es asignar las diferentes clases segun corresponda a cada elemento: 

    div.classList.add("campo");
    div.classList.add("ocultar");
    img.classList.add("imagen");
    img.classList.add(info["author"])
    text.classList.add("texto");

Lo que haremos despues, sera unir los diferentes elementos respetando la jerarquia explicada anteriormente: 

    div.appendChild(img);
    div.appendChild(text);
    text.appendChild(a);
    padre.appendChild(div);

Por ultimo haremos una llamada al metodo `configurarSynth` que como su nombre indica, configurara el sintentizador con la informacion que 
disponemos y ejecutara la forma correcta de mostrar el dialogo.


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
			if (event.name === "word") {
			const start = event.charIndex;
			const end = start+ event.charLength;
			const palabra = msg.text.substring(start,end)+" ";
			if(opcion[1].checked ==true){
				this.wordByWord(palabra,perfil,campo);
			}
			if(opcion[2].checked ==true){
				this.letterToLetter(palabra,perfil,campo);
			}
			}
		}
		};
		speechSynthesis.speak(msg);
	}


Como podemos ver, `configurarSynth` consta de dos "partes", la primera que se encarga como tal de cargar la configuracion: 

	const msg  = new SpeechSynthesisUtterance();
	msg.lang = perfil.lenguaje;
	msg.text = guion;
	msg.rate= perfil.rate;
	msg.volume =0.4;
	msg.pitch = perfil.tono;

Y en la segunda ya trabajamos con el evento `onboundary`, en el que ademas, ya ejecutamos cierto codigo segun la opcion que se haya elegido 
para mostrar el texto
	

	if(opcion[0].checked == true){
			if(event.name == "sentence"){
			const palabra = msg.text; 
			this.completo(palabra,perfil,campo);
			}
		}
		else{
			if (event.name === "word") {
			const start = event.charIndex;
			const end = start+ event.charLength;
			const palabra = msg.text.substring(start,end)+" ";
			if(opcion[1].checked ==true){
				this.wordByWord(palabra,perfil,campo);
			}
			if(opcion[2].checked ==true){
				this.letterToLetter(palabra,perfil,campo);
			}
			}
		}
		};


En la primera opcion como vemos, se mostrara todo el dialogo de una vez. Lo cual nos llevara al metodo `completo`: 

	completo(guion,perfil,campo){
		if(campo.childNodes.length === 0){
		var texto = document.createTextNode(guion);
		campo.appendChild(texto);
		campo.parentNode.parentNode.classList.remove("ocultar");
		campo.classList.add(perfil.color);
		}
	}

Como vemos, simplemente agrega la informacion `html` correspondiente y aplica los estilos necesarios para que se muestre el chat.



Con la segunda opcion se hace algo relativamente parecido:


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

Con la opcion `wordToWord` hacemos lo mismo que en `completo`, pero con la diferencia que agregamos un condicional `else`, ya que el `if`funcionara para cuando sea la primera palabra de la frase, mientras que el `else` sirve para el resto.

Por ultimo tenemos `letterToLetter` que mostrara el texto mostrando letra a letra con una breve pausa entre cada una: 

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

Como vemos, hacemos uso del metodo `setInterval`, que nos ayudara a iterar sobre la cadena en periodos regulares de tiempo para mostrar nuestro texto tal y como queremos, de resto es el mismo tratamiento que en `wordToWord`.

Bien, como se podra ver, hemos cubierto el formato normal y el de palabra por palabra. El caso de letra por letra es diferente con lo que requeriremos de crear otros dos metodos aparte:

Primero tendremos letterToLetter, que obtendra los mismos parametros que `normal` y `wordByWord`, y se comportara de forma exacta al metodo `wordByWord`, con 
la diferencia que llamara al metodo `sinth_letter`  en vez de `configurar_synth`:

    letterToLetter(informacion,text){
        const dialogo = informacion["message"].split(" ");
        var i; var palabra;
        for(i=0;i<dialogo.length;i++){
            palabra = dialogo[i]+" ";
            this.sinth_letter(this._users[informacion["author"]], palabra, text);
        }
    }


Con esto dariamos por terminado las clases en JavaScript, ahora bien, dentro del fichero `index.js` nos encontraremos con lo siguiente:

Lo primero, es un `event listener` del boton que tenemos al principio del codigo HTML, de forma que cuando se pulse, este se vuelva invisible y de lugar a la 
ejecucion de un conjunto de instrucciones.

1. ocultar el boton:

    	document.getElementById("boton").classList.add("ocultar");

2. Mostrar el `div` del chat: 

		document.getElementById("conv").classList.remove("ocultar");

3. Creacion de instancias de los perfiles: 

		const lars = new profile("Lars","en",1.0,1.5,"rojo");
		const kirk = new profile("Whammet","en",1.0,1.0,"amarillo");
		const jason = new profile("Jason","en",1.0,1.0,"verde");
		const dave = new profile("Mustaine","en",1.0,1.0,"blanco");

4. Creacion de una instancia de un array con hash del chat con los dialogos: 

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

5. Creacion de una instancia hash que guarda los usuarios. 

		const usuarios = {
		    Lars : lars,
		    Whammet: kirk,
		    Jason: jason,
		    Mustaine : dave
		}

6. Creacion de instancia del objeto `conversation` y construccion del chat: 

		const conv = new conversation(chat,usuarios);
		conv.construirChat();

7. Mostrar el video, eliminando la clase `ocultar`:

		document.getElementById("video").classList.remove("ocultar");