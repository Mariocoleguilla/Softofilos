var footer = document.getElementsByTagName("footer");
var flexContainer = document.createElement("section");
flexContainer.className = "flex-container";
footer[0].appendChild(flexContainer);

for (var i = 0; i < 3; i++) {

    var flexItem = document.createElement("div");
    flexItem.className = "flex-item3";
    flexItem.id = "item" + i;
    flexContainer.appendChild(flexItem);
}

var flexItem0 = document.querySelector("#item0");
var h3 = document.createElement("h3");
h3.className = "footerH3 clear";
h3.textContent = "Redes Sociales";
flexItem0.appendChild(h3);

var p = document.createElement("p");
p.innerHTML = "<a href='http://www.facebook.es'><i class='fab fa-facebook-square'></i></a><a href='http://www.twitter.es'><i class='fab fa-twitter'></i></a><a href='http://www.instagram.com'><i class='fab fa-instagram'></i></a><a href='http://www.reddit.com'><i class='fab fa-reddit'></i></a><a href='http://store.steampowered.com'><i class='fab fa-steam-symbol'></i></a><a href='http://www.plus.google.com'><i class='fab fa-google-plus-g'></i></a><a href='http://www.youtube.es'><i class='fab fa-youtube'></i></a>";
flexItem0.appendChild(p);

var flexItem1 = document.querySelector("#item1");
var h3 = document.createElement("h3");
h3.className = "footerH3 clear";
h3.textContent = "¿Quiénes Somos?";
flexItem1.appendChild(h3);

var p = document.createElement("p");
p.innerHTML = "Softófilos es un término para englobar a todas las personas amantes de las obras con gran dedicación personal y tendentes a formas alternativas de narrativa. <a href='info.html'>Leer más</a>";
flexItem1.appendChild(p);

var flexItem2 = document.querySelector("#item2");
var h3 = document.createElement("h3");
h3.className = "footerH3 clear";
h3.textContent = "Nuestra Filosofía";
flexItem2.appendChild(h3);

var p = document.createElement("p");
p.innerHTML = "Nuestra filosofía es ver los videojuegos desde un punto de vista artístico, explorativo y educativo más que como un producto de entretenimiento. <a href='info.html'>Leer más</a>";
flexItem2.appendChild(p);