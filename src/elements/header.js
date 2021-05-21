var header = document.getElementsByTagName("header");

//Título princpal
var mainTitle = document.createElement("h1");
mainTitle.className = "mainTitle";
mainTitle.textContent = "Softófilos";
header[0].appendChild(mainTitle);

//Subtítulo
var companyParagraph = document.createElement("p");
companyParagraph.className = "companyParagraph";
companyParagraph.textContent = "A Softófilos™ Company";
header[0].appendChild(companyParagraph);

/****************Menú lateral****************/

//Listas del menú lateral
var sideMenu = document.createElement("div");
sideMenu.className = "sideMenu";

var labelMain = document.createElement("label");
labelMain.textContent = "Principal";

sideMenu.appendChild(labelMain);

var hr = document.createElement("hr");
sideMenu.appendChild(hr);
//Lista con label y hr para el botón de index
var sideMenuListMain = document.createElement("ul");
sideMenuListMain.className = "sideMenuListMain";
sideMenu.appendChild(sideMenuListMain);

var listItem = document.createElement("li");
var indexLink = document.createElement("a");
indexLink.href = "index.html";
indexLink.textContent = "Index";
listItem.appendChild(indexLink);

sideMenuListMain.appendChild(listItem);

//Lista con label y hr para los botones de las páginas del contenido
var labelContent = document.createElement("label");
labelContent.textContent = "Contenido";

sideMenu.appendChild(labelContent);

var hr = document.createElement("hr");
sideMenu.appendChild(hr);

var sideMenuListContent = document.createElement("ul");
sideMenuListContent.className = "sideMenuListContent";
sideMenu.appendChild(sideMenuListContent);

var gameListLinkSideMenu = document.createElement("a");
gameListLinkSideMenu.href = "gameList.html";
gameListLinkSideMenu.textContent = "Lista de juegos";

var listItem = document.createElement("li");
listItem.appendChild(gameListLinkSideMenu);
sideMenuListContent.appendChild(listItem);

//Lista con label y hr para los botones de las páginas de usuarios
var labelUser = document.createElement("label");
labelUser.textContent = "Usuario";

sideMenu.appendChild(labelUser);

var hr = document.createElement("hr");
sideMenu.appendChild(hr);

var sideMenuListUser = document.createElement("ul");
sideMenuListUser.className = "sideMenuListUser";
sideMenu.appendChild(sideMenuListUser);

header[0].appendChild(sideMenu);

//Lista con label y hr para el link de la info de la página
var labelInfo = document.createElement("label");
labelInfo.textContent = "Info";

sideMenu.appendChild(labelInfo);

var hr = document.createElement("hr");
sideMenu.appendChild(hr);

var sideMenuListInfo = document.createElement("ul");
sideMenuListInfo.className = "sideMenuListInfo";
sideMenu.appendChild(sideMenuListInfo);

header[0].appendChild(sideMenu);

var InfoLinkSideMenu = document.createElement("a");
InfoLinkSideMenu.href = "info.html";
InfoLinkSideMenu.textContent = "Información";

var listItem = document.createElement("li");
listItem.appendChild(InfoLinkSideMenu);
sideMenuListInfo.appendChild(listItem);

/****************Menú lateral****************/

//NAV
var navBar = document.createElement("nav");
header[0].appendChild(navBar);

//Lista del navBar
var menuList = document.createElement("ul");
menuList.className = "menuList";
navBar.appendChild(menuList);

//Icono de fonts awesome para el menú lateral
var listMenuItem = document.createElement("li");
listMenuItem.className = "listMenuItem";
var listMenuItemIcon = document.createElement("i");
listMenuItemIcon.className = "fas fa-bars";

/* Se crea una función onclick para el icono del menú desplegable */
var check = false;
listMenuItem.onclick = function () {

    if (!check) {
        document.getElementsByClassName("sideMenu")[0].className = "sideMenu open";
        check = !check;
    } else {
        document.getElementsByClassName("sideMenu")[0].className = "sideMenu";
        check = !check;
    }
};

/* Se crea una función onclick para todos los elementos de la página para ocultar el sideMenu cuando se hace click fuera de él */
/* y para ocultar las ventanas modales si se hace click fuera de ella (cuando está abierta)*/

var modal = document.querySelector("#modal");
var modalBottom = document.querySelector("#modalBottom");
var modalWriteCritic = document.querySelector("#modalWriteCritic");
var modalAddGame = document.querySelector("#modalAddGame");
var modalEditGame = document.querySelector("#modalEditGame");
var modalMyCritic = document.querySelector("#modalMyCritic");
window.onclick = function (event) {
    if (modal != null) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    if (modalBottom != null) {
        if (event.target == modalBottom) {
            modalBottom.style.display = "none";
        }
    }

    if (modalWriteCritic != null) {
        if (event.target == modalWriteCritic) {
            modalWriteCritic.style.display = "none";
        }
    }

    if (modalAddGame != null) {
        if (event.target == modalAddGame) {
            modalAddGame.style.display = "none";
        }
    }

    if (modalEditGame != null) {
        if (event.target == modalEditGame) {
            modalEditGame.style.display = "none";
        }
    }

    if (modalMyCritic != null) {
        if (event.target == modalMyCritic) {
            modalMyCritic.style.display = "none";
        }
    }

    if (event.target.tagName != "path" &&
        event.target.tagName != "svg" &&
        event.target.tagName != "LI" &&
        event.target.className != "listMenuItem" &&
        event.target.className != "sideMenu open" &&
        document.getElementsByClassName("sideMenu")[0].className == "sideMenu open") {

        document.getElementsByClassName("sideMenu")[0].className = "sideMenu";
        check = !check;
    }
}

listMenuItem.appendChild(listMenuItemIcon);
menuList.appendChild(listMenuItem);

//Botón de Index (siempre presente)
var listIndexItem = document.createElement("li");
listIndexItem.className = "indexLink";
var indexLink = document.createElement("a");
indexLink.href = "index.html";
indexLink.textContent = "Index";
listIndexItem.appendChild(indexLink);
menuList.appendChild(listIndexItem);

navBar.appendChild(menuList);