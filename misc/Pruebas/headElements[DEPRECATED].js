var head = document.getElementsByTagName("head")[0];

/* Se utiliza normalize para que todos los navegadores rendericen la página de forma más consistente y siguiendo los últimos estándares */
var normalize = document.createElement("link");
normalize.rel = "stylesheet";
normalize.type = "text/css";
normalize.href = "./src/style/normalize.css";
head.appendChild(normalize);
 
/* Se importa la hoja de estilos propia */
var css = document.createElement("link");
css.rel = "stylesheet";
css.type = "text/css";
css.href = "./src/style/style.css";
head.appendChild(css);

/* Se importa el script funcs.js que contiene funciones muy utilizadas */
var funcs = document.createElement("script");
funcs.src = "src/funcs/funcs.js";
head.appendChild(funcs);

/* Se importa el framework Fonts Awesome 5 para hacer uso de los iconos */
var fontsAwesome = document.createElement("script");
fontsAwesome.src = "./src/FontsAwesome_5_Free/svg-with-js/js/fontawesome-all.js";
head.appendChild(fontsAwesome);

/* Se importa el favicon */
var favicon = document.createElement("link");
normalize.rel = "icon";
normalize.type = "image/png";
normalize.href = "./src/favicon.png";
head.appendChild(normalize);


/*<link rel="stylesheet" type="text/css" href="src/style/normalize.css">
<!-- Se utiliza normalize para que todos los navegadores rendericen la página de forma más consistente y siguiendo los últimos estándares -->
<link rel="stylesheet" type="text/css" href="src/style/style.css">
<!-- Se importa el script funcs.js que contiene funciones muy utilizadas -->
<script src="src/funcs/funcs.js"></script>
<!-- Se importa el framework Fonts Awesome 5 para hacer uso de los iconos -->
<script defer src="./src/FontsAwesome_5_Free/svg-with-js/js/fontawesome-all.js"></script>
<!-- Se importa el favicon -->
<link rel="icon" type="image/png" href="src/favicon.png">*/