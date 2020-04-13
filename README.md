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

Por otro lado nos encontramos el `body` que contendra dos etiquetas `div`, la primera sera un boton que usaremos para empezar el "dialogo" al presionarlo. El
segundo representa el chat en general, ademas de un video enlazado de youtube.


	<body>
	    <div id="boton">
	        <button>empezar</button>
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

Como vemos consta simplemente de un constructor, que se limita a obtener los datos por parametros, y los guarda en atributos para poder ser usados en getters.

Por otro lado tenemos `Conversation`, que es un poco mas compleja, por lo que iremos metodo a metodo:

    constructor(conversaciones,users){
        this._chat=conversaciones;
        this._users=users;
    }

Nada mas empezar nos encontramos con el constructor, que como vemos guarda como atributo el hash con las conversaciones y otro hash con los objeto `perfil` de
cada usuario. 

Posteriormente tenemos el metodo `construirChat`:

    construirChat(){
        var elementoPadre = document.getElementById("chat");
        var i ; var cosas;
        for(i=0; i<this._chat.length;i++){    
            cosas = Object.keys(this._chat)[i];
            this.crearDialogo(this._chat[cosas],elementoPadre);
        }
    }

Este metodo se usa para construir de forma dinamica los diferentes `div` que contendran los dialogos e imagenes, de forma que por cada elemento dentro del 
hash que contiene el chat se creara un nuevo. Esto se hace llamando al metodo `crearDialogo` que se le pasara como parametros el perfil del usuario al que 
corresponde el dialogo y el elemento padre del dialogo dentro del `DOM`.

Como vemos en las primeras instrucciones, crearemos los diferentes elementos de forma separada, 3 `div`, uno para contenerlo todo, otro para la imagen y el 
ultimo para el texto, y 1 elemento con etiqueta `<a>`:

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

Por ultimo tenemos una llamada a los metodos encargados de escribir los dialogos, ademas de mostrarlos segun se estipula en la practica
1. Todo el dialogo completo
2. Palabra por palabra
3. Letra por letra

        this.normal(info,a);
        //this.wordByWord(info,a);
        //this.letterToLetter(info,a);

En este caso tenenmos descomentado el formato "normal". Con el llamamos al metodo `normal`, valga la redundancia, que recibira por parametro el perfil del 
usuario y el campo `<a>` creado anteriormente. Este metodo como podremos ver simplemente arregla las cosas para llamar a otro metodo que se encarga de la 
configuracion del sintetizador asi como mostrar todos los datos que tenemos:

	normal(informacion,text){
        this.configurar_synth(this._users[informacion["author"]],informacion["message"], text);
    }

Antes de continuar con el metodo, es necesario explicar el metodo tambien `wordByWord`. Que recibe los mismos parametros, y en general hace lo mismo que 
`normal`, la diferencia que encontraremos sera que usaremos un bucle para dividir las palabras por espacios, y esto es lo que le pasaremos al metodo 
`configurar_synth`, en vez del dialogo completo:

    wordByWord(informacion,text){
        const dialogo = informacion["message"].split(" ");
        var i; var palabra;
        for(i=0;i<dialogo.length;i++){
            palabra = dialogo[i]+" ";
            this.configurar_synth(this._users[informacion["author"]], palabra, text);
        }
    }

Ahora si, explicaremos el metodo `configurar_synth`, que vemos, como se dijo antes, recibira el perfil del usuario, el texto que se va a insertar y el 
elemento `<a>` que venimos arrastrando desde hace rato. Lo primero que hacemos dentro del metodo es configurar las opciones del sintetizador, extrayendo los mismos de los atributos del perfil:

	    const msg  = new SpeechSynthesisUtterance();
        msg.lang = perfil.lenguaje;
        msg.text = guion;
        msg.rate= perfil.rate;
        msg.volume =0.4;
        msg.pitch = perfil.tono;

Ahora bien, nos encontramos con que si mandamos a ejecutar esto nos encontraremos que el programa principal se ejecutara todo de una vez, mientras que 
el sintetizador va extrayendo de un buffer propio los diferentes dialogos almacenados, como este no es el comportamiento que deseamos, usaremos un evento 
`onstart` que sera el encargado de crear, en caso de que no exista, un campo de texto, asignarle el contenido dentro de la variable `guion` y hacer que el
dialogo sea visible, en caso contrario simplemente concatena el contenido de `guion` al texto actual dentro de la etiqueta `<a>`:

        msg.onstart = ()=>{
        if(campo.childNodes.length == 0){
            var texto = document.createTextNode(guion);
            campo.appendChild(texto);
            campo.parentNode.parentNode.classList.remove("ocultar");
            campo.classList.add(perfil.color);
        }
        else{
            campo.childNodes[0].data= campo.childNodes[0].data+guion; 
        }
    }

Por ultimo tenemos la carga al sintetizador de todo lo que hemos configurado:

    speechSynthesis.speak(msg);

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

En `sinth_letter` vemos que el comportamiento es parecido al de `configurar_synth`. La principal diferencia es que toda la configuracion se asigna dentro de un bucle for, que iterara una vez por cada letra de la palabra cargada en `guion`, y veremos que de resto se comporta de forma igual:


    sinth_letter(perfil,guion,campo){
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
                if(campo.childNodes.length == 0){
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
            }
            msg.text = guion.charAt(i);
            speechSynthesis.speak(msg);
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