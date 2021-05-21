/**********************Primary Inserts**********************/

function primaryInserts(db) {

    var request;

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //Se utiliza Ajax para obtener el contenido del archivo JSON que contiene los datos de la base de datos
    request.open('GET', './src/json/data.json', true);
    request.send(null);
    request.onreadystatechange = function (evento) {

        if ((evento.target.readyState == 4) && ((evento.target.status == 200))) {

            var obj = JSON.parse(request.responseText);

            for (var i = 0; i < obj.games.length; i++) {

                obj.games[i].launchDate = new Date(obj.games[i].launchDate).toISOString();
            }

            //Una vez obtenido el archivo JSON, se crea una transacción para añadir los datos en bucle
            var tr = db.transaction(db.objectStoreNames, "readwrite");
            var usersStore = tr.objectStore("users");
            var gamesStore = tr.objectStore("games");
            var criticsStore = tr.objectStore("critics");

            //Se utilizan las funciones encrypt() y decrypt() para encriptar y desencriptar la contraseña
            for (var i = 0; i < obj.users.length; i++) {

                usersStore.add(obj.users[i]);
            }

            for (var i = 0; i < obj.games.length; i++) {

                gamesStore.add(obj.games[i]);
            }

            for (var i = 0; i < obj.critics.length; i++) {

                criticsStore.add(obj.critics[i]);
            }

            //Se hace la llamada a la función que rellena el contenido del index aqui para evitar problemas con la petición Ajax 
            setIndexContent(db);
        }
    };
}

/**********************Primary Inserts**********************/

/**********************Cookies**********************/

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function cookieDelete(cookieName) {

    document.cookie = cookieName + "=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
}

function cookieDeleteRedirect(cookieName) {

    document.cookie = cookieName + "=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
    localStorage.clear();
    window.location.href = "index.html";
}

/**********************Cookies**********************/

/**********************Encrypt**********************/

function encrypt(password) {

    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ",", ".", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var reversedAlphabet = ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "&", "@", "ç", "=", "/", "*", "+", "{", "}", "¨", "¬", "#"];
    var passwordArray = password.split("");
    var encryptedPassword = "";

    for (var i = 0; i < passwordArray.length; i++) {

        for (var j = 0; j < alphabet.length; j++) {

            if (passwordArray[i] == alphabet[j]) {

                encryptedPassword += reversedAlphabet[j];
            }
        }
    }

    return encryptedPassword;
}

function decrypt(encryptedPassword) {

    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ",", ".", 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var reversedAlphabet = ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a", "Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "&", "@", "ç", "=", "/", "*", "+", "{", "}", "¨", "¬", "#"];
    var encryptedPasswordArray = encryptedPassword.split("");
    var decryptedPassword = "";

    for (var i = 0; i < encryptedPasswordArray.length; i++) {

        for (var j = 0; j < reversedAlphabet.length; j++) {

            if (encryptedPassword[i] == reversedAlphabet[j]) {

                decryptedPassword += alphabet[j];
            }
        }
    }

    return decryptedPassword;
}

/**********************Encrypt**********************/

/**********************Header Elements**********************/

function loginLink() {

    var loginLink = document.createElement("a");
    loginLink.href = "login.html";
    loginLink.textContent = "Iniciar Sesión";

    var listItem = document.createElement("li");
    listItem.appendChild(loginLink);
    document.getElementsByClassName("menuList")[0].appendChild(listItem);
}

function registryLink() {

    var registryLink = document.createElement("a");
    registryLink.href = "registry.html";
    registryLink.textContent = "Registrarse";

    var listItem = document.createElement("li");
    listItem.appendChild(registryLink);
    document.getElementsByClassName("menuList")[0].appendChild(listItem);
}

function userAreaLink() {

    var userAreaLink = document.createElement("a");
    userAreaLink.href = "userArea.html";
    userAreaLink.textContent = "Área de usuario";

    var listItem = document.createElement("li");
    listItem.appendChild(userAreaLink);
    document.getElementsByClassName("menuList")[0].appendChild(listItem);
}

function logOutLink() {

    var logOutLink = document.createElement("a");
    logOutLink.href = "javascript:cookieDeleteRedirect('userLogged', 'index.html')";
    logOutLink.textContent = "Cerrar Sesión";

    var listItem = document.createElement("li");
    listItem.appendChild(logOutLink);
    document.getElementsByClassName("menuList")[0].appendChild(listItem);
}

function welcomeMessage() {

    var welcomeMessage = document.createElement("span");
    welcomeMessage.className = "welcomeLabel";
    welcomeMessage.textContent = "Bienvenido/a " + getCookie("userLogged");
    document.getElementsByTagName("header")[0].insertBefore(welcomeMessage, document.getElementsByTagName("header")[0].children[0]);
}

/**********************Header Elements**********************/

/**********************Side Menu Elements**********************/

function loginLinkSideMenu() {

    var loginLinkSideMenu = document.createElement("a");
    loginLinkSideMenu.href = "login.html";
    loginLinkSideMenu.textContent = "Iniciar Sesión";

    var listItem = document.createElement("li");
    listItem.appendChild(loginLinkSideMenu);
    document.getElementsByClassName("sideMenuListUser")[0].appendChild(listItem);
}

function registryLinkSideMenu() {

    var registryLinkSideMenu = document.createElement("a");
    registryLinkSideMenu.href = "registry.html";
    registryLinkSideMenu.textContent = "Registrarse";

    var listItem = document.createElement("li");
    listItem.appendChild(registryLinkSideMenu);
    document.getElementsByClassName("sideMenuListUser")[0].appendChild(listItem);
}

function userAreaLinkSideMenu() {

    var userAreaLinkSideMenu = document.createElement("a");
    userAreaLinkSideMenu.href = "userArea.html";
    userAreaLinkSideMenu.textContent = "Área de usuario";

    var listItem = document.createElement("li");
    listItem.appendChild(userAreaLinkSideMenu);
    document.getElementsByClassName("sideMenuListUser")[0].appendChild(listItem);
}

function logOutLinkSideMenu() {

    var logOutLinkSideMenu = document.createElement("a");
    logOutLinkSideMenu.href = "javascript:cookieDeleteRedirect('userLogged', 'index.html')";
    logOutLinkSideMenu.textContent = "Cerrar Sesión";

    var listItem = document.createElement("li");
    listItem.appendChild(logOutLinkSideMenu);
    document.getElementsByClassName("sideMenuListUser")[0].appendChild(listItem);
}

/**********************Side Menu Elements**********************/

/**********************Background Mode**********************/

function setBackgroundMode() {

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readonly");
        var usersStore = tr.objectStore("users");
        var user = usersStore.get(getCookie("userLogged"));

        user.onsuccess = function (event) {

            if (user.result.backgroundMode == "clear") {

                document.getElementsByTagName("main")[0].className = "clear";
                document.getElementsByTagName("header")[0].className = "clear";
                document.getElementsByTagName("body")[0].className = "clear";
                document.getElementsByTagName("footer")[0].className = "clear";
                document.getElementsByClassName("mainTitle")[0].className = "mainTitle clear";
                document.getElementsByClassName("companyParagraph")[0].className = "companyParagraph clear";
                document.getElementsByClassName("pageTitle")[0].className = "pageTitle clear";
                document.getElementsByClassName("welcomeLabel")[0].className = "welcomeLabel clear";
                var footerH3 = document.getElementsByClassName("footerH3");
                for (var i = 0; i < footerH3.length; i++) {

                    footerH3[i].className = "footerH3 clear";
                }

                if (document.getElementById("actualBackgroundMode") != null) {

                    document.getElementById("actualBackgroundMode").textContent = "Modo actual: clear";
                    document.getElementById("backgroundModeIconContainer").innerHTML = "";
                    document.getElementById("backgroundMode").style.backgroundColor = "rgba(0, 0, 0, 0.5)";

                    var icon = document.createElement("i");
                    icon.id = "backgroundModeIcon";
                    icon.className = "fas fa-sun";
                    iconContainer.appendChild(icon);


                    setTimeout(function () {
                        document.getElementById("backgroundModeIconContainer").children[0].style.color = "white";
                    }, 20);
                }
            } else {

                document.getElementsByTagName("main")[0].className = "dark";
                document.getElementsByTagName("header")[0].className = "dark";
                document.getElementsByTagName("body")[0].className = "dark";
                document.getElementsByTagName("footer")[0].className = "dark";
                document.getElementsByClassName("mainTitle")[0].className = "mainTitle dark";
                document.getElementsByClassName("companyParagraph")[0].className = "companyParagraph dark";
                document.getElementsByClassName("pageTitle")[0].className = "pageTitle dark";
                document.getElementsByClassName("welcomeLabel")[0].className = "welcomeLabel dark";
                var footerH3 = document.getElementsByClassName("footerH3");
                for (var i = 0; i < footerH3.length; i++) {

                    footerH3[i].className = "footerH3 dark";
                }

                if (document.getElementById("actualBackgroundMode") != null) {

                    document.getElementById("actualBackgroundMode").textContent = "Modo actual: dark";
                    document.getElementById("backgroundModeIconContainer").innerHTML = "";
                    document.getElementById("backgroundMode").style.backgroundColor = "white";

                    var icon = document.createElement("i");
                    icon.id = "backgroundModeIcon";
                    icon.className = "fas fa-moon";
                    iconContainer.appendChild(icon);
                }
            }
        }
    }

    request.onerror = function (event) {
        console.log("Error IndexedDB");
    }

    request.onupgradeneeded = function (event) {
        console.log("UpgradeNeeded");
    }
}

function changeBackgroundMode(element) {

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readwrite");
        var usersStore = tr.objectStore("users");
        var user = usersStore.get(getCookie("userLogged"));
        var backgroundMode = "";

        user.onsuccess = function (event) {

            if (user.result.backgroundMode == "clear") {

                backgroundMode = "dark";
                element.style.background = "white";
                setBackgroundMode();
            } else {

                backgroundMode = "clear";
                element.style.background = "rgba(0, 0, 0, 0.5)";
                document.getElementById("backgroundModeIconContainer").children[0].color = "white"
                setBackgroundMode();
            }

            usersStore.put({
                user: user.result.user,
                password: user.result.password,
                birthDate: user.result.birthDate,
                backgroundMode: backgroundMode,
                availability: user.result.availability
            });

        }

        request.onerror = function (event) {
            console.log("Error IndexedDB");
        }

        request.onupgradeneeded = function (event) {
            console.log("UpgradeNeeded");
        }
    }
}

/**********************Background Mode**********************/

/**********************Login & Registry**********************/

function login(user, password, remember) {

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readonly");
        var usersStore = tr.objectStore("users");

        var login = usersStore.get(user);

        login.onsuccess = function (event) {

            if (typeof (login.result) != "undefined") {

                if (login.result.availability == "enabled") {

                    if (password == decrypt(login.result.password)) {

                        if (remember) {

                            setCookie("remember", JSON.stringify({
                                remember: [user, encrypt(password)]
                            }), 7);
                        } else {

                            if (getCookie("remember") != "") {

                                cookieDelete("remember");
                            }
                        }

                        setCookie("userLogged", user, 7);

                        if (localStorage.getItem("gameDragged") != null || localStorage.getItem("gameClicked") != null) {

                            swal({
                                type: 'success',
                                title: 'Inicio de sesión realizado con éxito',
                                text: 'Redireccionando...',
                                showConfirmButton: false,
                            });

                            document.getElementById("loginButton").setAttribute("disabled", "disabled");

                            setTimeout(function () {
                                window.location.href = "gamePage.html";
                            }, 1500);
                        } else {

                            swal({
                                type: 'success',
                                title: 'Inicio de sesión realizado con éxito',
                                text: 'Redireccionando...',
                                showConfirmButton: false,
                            });

                            document.getElementById("loginButton").setAttribute("disabled", "disabled");

                            setTimeout(function () {
                                window.location.href = "userArea.html";
                            }, 1500);
                        }
                    } else {
                        swal({
                            type: 'error',
                            title: 'Error',
                            text: 'Contraseña Incorrecta'
                        });
                    }
                } else {

                    swal({
                        type: 'error',
                        title: 'Error',
                        text: 'Éste usuario está baneado'
                    });
                }
            } else {

                swal({
                    type: 'question',
                    title: 'No hay ningún resultado'
                });
            }
        }
    }

    request.onerror = function (event) {
        console.log("Error IndexedDB");
    }

    request.onupgradeneeded = function (event) {
        console.log("UpgradeNeeded");
    }
}

/* Función para iniciar sesión con la tecla ENTER en el input type=password */
function enterLogin(event) {

    if (event.keyCode == 13) {
        login();
        return false;
    }
}

function registry(user, date, password) {

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readwrite");
        var usersStore = tr.objectStore("users");

        var checkuserAvailabilty = usersStore.count(user);

        checkuserAvailabilty.onsuccess = function () {

            if (checkuserAvailabilty.result == 0) {

                usersStore.put({
                    user: user,
                    password: encrypt(password),
                    birthDate: date,
                    backgroundMode: "clear",
                    availability: "enabled"
                });

                setCookie("userLogged", user, 7);

                swal({
                    type: 'success',
                    title: 'Usuario ' + user + ' registrado con éxito',
                    text: 'Redireccionando...',
                    showConfirmButton: false,
                });

                document.getElementById("registryButton").setAttribute("disabled", "disabled");
                setTimeout(function () {
                    window.location.href = "userArea.html";
                }, 1500);

            } else {
                swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Ese usuario ya está registrado'
                });
            }
        }
    }

    request.onerror = function (event) {
        console.log("Error");
    }

    request.onupgradeneeded = function (event) {
        console.log("UpgradeNeeded");
    }
}

/**********************Login & Registry**********************/

/**********************Index Content**********************/

function setIndexContent(db) {

    var tr = db.transaction(db.objectStoreNames, "readonly");
    var gamesStore = tr.objectStore("games");
    var sort_by_date = gamesStore.index("sort_by_date").getAll();
    //Se recorre el índice ordenado por fecha al revés y se muestran los 3 mas recientes
    sort_by_date.onsuccess = function () {

        var j = 0;

        for (var i = (sort_by_date.result.length - 1); j < 3; i--) {

            document.getElementsByClassName("gameImg")[j].src = sort_by_date.result[i].img;
            document.getElementsByClassName("gameImg")[j].id = "imgGameId" + sort_by_date.result[i].gameId;
            document.getElementsByClassName("gameImg")[j].setAttribute("onclick", "gameClick(this.id)");

            document.getElementsByClassName("gameTitle")[j].textContent = sort_by_date.result[i].name;
            document.getElementsByClassName("gameTitle")[j].id = "gameTitleGameId" + sort_by_date.result[i].gameId;
            document.getElementsByClassName("gameTitle")[j].setAttribute("onclick", "gameClick(this.id)");

            var date = new Date(sort_by_date.result[i].launchDate);
            j++;
        }
    }

}

/**********************Index Content**********************/

/**********************Game List Content**********************/

function setGameListContent(callback) {

    document.getElementById("resultSection").innerHTML = "";

    var text = document.querySelector("#searchInput").value;
    var gamesArray = [];

    var db;
    var request = window.indexedDB.open("Softofilos", 1);
    var games;

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readonly");
        var gamesStore = tr.objectStore("games");

        var allGamesRequest = gamesStore.getAll();

        allGamesRequest.onsuccess = function (event) {

            games = allGamesRequest.result;

            for (var i = 0; i < games.length; i++) {

                if (games[i].name.toUpperCase().startsWith(text.toUpperCase())) {

                    gamesArray.push(games[i]);
                }
            }

            var count = 0;
            for (var i = 0; i < Math.ceil(gamesArray.length / 4); i++) {

                var flex_container = document.createElement("div");
                flex_container.className = "flex-container";
                document.getElementById("resultSection").appendChild(flex_container);

                for (var j = 0; j < 4; j++) {

                    if (count < gamesArray.length) {

                        var flex_item4 = document.createElement("div");
                        flex_item4.className = "flex-item4 animated zoomIn";
                        flex_container.appendChild(flex_item4);

                        var img = document.createElement("img");
                        img.src = gamesArray[count].img;
                        img.id = "imgGameId" + gamesArray[count].gameId;
                        img.className = "gameImg";
                        img.setAttribute("onclick", "gameClick(this.id)");
                        flex_item4.appendChild(img);

                        var gameTitleParagraph = document.createElement("p");
                        gameTitleParagraph.textContent = gamesArray[count].name;
                        gameTitleParagraph.id = "gameTitleGameId" + gamesArray[count].gameId;
                        gameTitleParagraph.className = "gameTitle";
                        gameTitleParagraph.setAttribute("onclick", "gameClick(this.id)");
                        flex_item4.appendChild(gameTitleParagraph);
                        count++;
                    }
                }
            }
            callback();
        }
    }
}

/**********************Game List Content**********************/

/**********************Background Randomizer**********************/

function backgroundRandomizer() {

    var random = Math.floor(Math.random() * 10) + 1;
    document.children[0].style.background = "url(./src/img/background/" + random + ".png) no-repeat fixed";
}

/**********************Background Randomizer**********************/

/**********************Game Click**********************/

function gameClick(id) {

    var gameId;

    if (id.indexOf("imgGameId") != -1) {
        gameId = id.substring(9, id.length);
    }
    if (id.indexOf("gameTitleGameId") != -1) {
        gameId = id.substring(15, id.length);
    }

    localStorage.setItem("gameClicked", gameId);
    window.location.href = "gamePage.html";
}

/**********************Game Click**********************/

/**********************Modal Drag&Drop**********************/

function dragStart(ev) {

    setTimeout(function () {
        document.getElementById("modal").style.display = "block";
    }, 1);
    ev.dataTransfer.setData("", ev.target.id);
}

function dropContinueOver(ev) {

    ev.preventDefault();
    ev.target.style.background = "rgba(0, 160, 0, 0.5)";
}

function dropStopOver(ev) {

    ev.preventDefault();
    ev.target.style.background = "rgba(250, 0, 0, 0.5)";
}

function dragLeave(ev) {
    ev.target.style.background = "white";
}

function dropContinue(ev) {
    var data = ev.dataTransfer.getData("");
    ev.target.style.background = "white";

    var id = data.substring(9, data.length);

    localStorage.setItem("gameClicked", id);
    window.location.href = "gamePage.html";
    localStorage.setItem("gameDragged", "dragged");

    if (getCookie("userLogged") == "") {

        window.location.href = "login.html";
    }

}

function dropStop(ev) {
    ev.target.style.background = "white";
    var modal = document.getElementById("modal").style.display = "none";
}

function dragOverExternalImage(ev) {

    ev.preventDefault();
    ev.target.style.background = "rgba(0, 160, 0, 0.5)";
}

function dropExternalImage(ev) {

    ev.preventDefault();
    ev.target.style.background = "white";
    var image = event.dataTransfer.files[0].name;

    document.getElementById("droppedImage").innerHTML = "<span id='droppedImageSpan'>Imagen añadida:</span> <span id='droppedImageName'>" + image + "</span>";
}

/**********************Modal Drag&Drop**********************/

/**********************Critics**********************/

function readEntireCritic(user, title, critic, date) {

    document.getElementById("modalBottom").style.display = "block";

    document.getElementsByClassName("modalUserParagraph")[0].textContent = user;
    document.getElementsByClassName("modalDateParagraph")[0].textContent = new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString();
    document.getElementsByClassName("modalTitleParagraph")[0].textContent = title;
    document.getElementsByClassName("modalCriticParagraph")[0].innerHTML = critic;
}

function sendCritic(id, user, title, critic) {

    //Reemplazar los saltos de línea de los textarea por saltos de línea HTML
    critic = critic.replace(/\r?\n/g, '<br/>');

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readwrite");

        var criticsStore = tr.objectStore("critics");
        var getCritic = criticsStore.get(parseInt(id));

        getCritic.onsuccess = function (event) {

            if (getCritic.result != undefined) {

                var criticsArray = getCritic.result.critics;
                criticsArray.push({
                    user: user,
                    title: title,
                    critic: critic,
                    date: new Date().toUTCString()
                });

                criticsStore.put({
                    gameId: parseInt(id),
                    critics: criticsArray
                });

            } else {

                criticsStore.add({
                    gameId: parseInt(id),
                    critics: [{
                        user: user,
                        title: title,
                        critic: critic,
                        date: new Date().toUTCString()
                    }]
                });
            }

            document.getElementById("sendCriticButton").setAttribute("disabled", "disabled");

            localStorage.setItem("gameClicked", id);
            swal({
                type: 'success',
                title: 'Crítica añadida con éxito',
                text: 'Redireccionando...',
                showConfirmButton: false,
            });
            setTimeout(function () {
                window.location.href = "gamePage.html";
            }, 1500);
        }
    }
}

/**********************Critics**********************/

/**********************Add/Edit/Delete Game**********************/

function add_editGame(title, genre, developer, date, lat, lng, img, id, boolean) {

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readwrite");
        var gamesStore = tr.objectStore("games");

        if (boolean) {
            gamesStore.put({
                gameId: parseInt(id),
                name: title,
                genre: genre,
                developer: developer,
                launchDate: date,
                img: img,
                lat: lat,
                lng: lng
            });

            swal({
                type: 'success',
                title: 'Obra editada con éxito',
                text: 'Redireccionando...',
                showConfirmButton: false
            });
            setTimeout(function () {
                window.location.href = "adminGameEdit.html";
            }, 1500);

            document.getElementById("modalEditGame").style.display = "none";
        } else {

            gamesStore.add({
                name: title,
                genre: genre,
                developer: developer,
                launchDate: date,
                img: "./src/img/" + img,
                lat: lat,
                lng: lng
            });

            swal({
                type: 'success',
                title: 'Obra añadida con éxito',
                text: 'Redireccionando...',
                showConfirmButton: false
            });
            setTimeout(function () {
                window.location.href = "adminGameEdit.html";
            }, 1500);

            if (document.getElementById("modalAddGame") != undefined) {
                document.getElementById("modalAddGame").style.display = "none";
            }

            if (document.getElementById("modalEditGame") != undefined) {
                document.getElementById("modalEditGame").style.display = "none";
            }
        }
    }
}

function deleteGame(id) {

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readwrite");

        var gamesStore = tr.objectStore("games");
        gamesStore.delete(parseInt(id));
    }
}

/**********************Add Game**********************/

/**********************Search**********************/

function search() {

    document.getElementById("resultSection").innerHTML = "";

    var text = document.querySelector("#searchInput").value;
    var gamesArray = [];

    var db;
    var request = window.indexedDB.open("Softofilos", 1);
    var games;

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readonly");
        var gamesStore = tr.objectStore("games");

        var allGamesRequest = gamesStore.getAll();

        allGamesRequest.onsuccess = function (event) {

            games = allGamesRequest.result;

            for (var i = 0; i < games.length; i++) {

                if (games[i].name.toUpperCase().startsWith(text.toUpperCase())) {

                    gamesArray.push(games[i]);
                }
            }

            var count = 0;
            for (var i = 0; i < Math.ceil(gamesArray.length / 6); i++) {

                var flex_container = document.createElement("div");
                flex_container.className = "flex-container";
                document.getElementById("resultSection").appendChild(flex_container);

                for (var j = 0; j < 6; j++) {

                    if (count < gamesArray.length) {

                        var flex_item6 = document.createElement("div");
                        flex_item6.className = "flex-item6 animated jackInTheBox";
                        flex_container.appendChild(flex_item6);

                        var img = document.createElement("img");
                        img.src = gamesArray[count].img;
                        img.className = "gameEditImg";
                        img.setAttribute("onclick", "fillModalEdit(\"" + gamesArray[count].name + "\", \"" + gamesArray[count].genre + "\", \"" + gamesArray[count].developer + "\", \"" + gamesArray[count].launchDate + "\", \"" + gamesArray[count].lat + "\", \"" + gamesArray[count].lng + "\", \"" + gamesArray[count].img + "\", \"" + gamesArray[count].gameId + "\")");
                        flex_item6.appendChild(img);

                        var gameTitleParagraph = document.createElement("p");
                        gameTitleParagraph.textContent = gamesArray[count].name;
                        gameTitleParagraph.className = "gameEditParagraph";
                        gameTitleParagraph.setAttribute("onclick", "fillModalEdit(\"" + gamesArray[count].name + "\", \"" + gamesArray[count].genre + "\", \"" + gamesArray[count].developer + "\", \"" + gamesArray[count].launchDate + "\", \"" + gamesArray[count].lat + "\", \"" + gamesArray[count].lng + "\", \"" + gamesArray[count].img + "\", \"" + gamesArray[count].gameId + "\")");
                        flex_item6.appendChild(gameTitleParagraph);
                        count++;
                    }
                }
            }
        }
    }
}

function fillModalEdit(name, genre, developer, launchDate, lat, lng, img, id) {
    $(function () {
        $("#modalEditGame").show();
        $("#nameInput").val(name);
        $("#genreInput").val(genre);
        $("#developerInput").val(developer);

        var month;
        var day;

        if (String(parseInt(new Date(launchDate).getMonth() + 1)).length < 2) {

            month = "0" + String(parseInt(new Date(launchDate).getMonth()) + 1);
        } else {
            month = String(parseInt(new Date(launchDate).getMonth()) + 1);
        }

        if (String(new Date(launchDate).getDate()).length < 2) {

            day = "0" + String(new Date(launchDate).getDate());
        } else {
            day = String(new Date(launchDate).getDate());
        }

        var fullDate = new Date(launchDate).getFullYear() + "-" + month + "-" + day;

        $("#dateInput").val(fullDate);
        $("#latInput").val(lat);
        $("#lngInput").val(lng);
        $("#poster").attr("src", img);
        $("#hidden").val(id);
    });
}

/**********************Search**********************/

/**********************Read Entire Critic (My Critics)**********************/

function readMyCritic(user, title, critic, date, id) {

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readonly");
        var gamesStore = tr.objectStore("games");

        var gamesStoreRequest = gamesStore.get(parseInt(id));

        gamesStoreRequest.onsuccess = function (event) {

            document.getElementById("modalMyCritic").style.display = "block";
            document.getElementById("myCriticImg").src = gamesStoreRequest.result.img;
            document.getElementsByClassName("modalMyCriticTitleParagraph")[0].textContent = title;
            document.getElementsByClassName("modalMyCriticCriticParagraph")[0].innerHTML = critic;
        }
    }
}

/**********************Read Entire Critic (My Critics)**********************/

/**********************Export Critics PDF**********************/

function printCritics(critics, games) {

    var gamesCritisicedTemp = [];

    for (var i = 0; i < critics.length; i++) {

        for (var j = 0; j < games.length; j++) {

            if (critics[i].id == games[j].gameId) {

                gamesCritisicedTemp.push(games[j]);
            }
        }
    }

    var gamesCritisiced = [];
    var temp = "";
    for (var i = 0; i < gamesCritisicedTemp.length; i++) {

        if (gamesCritisicedTemp[i].name != temp) {

            gamesCritisiced.push(gamesCritisicedTemp[i]);
        }

        temp = gamesCritisicedTemp[i].name;
    }

    var pdf = new jsPDF('portrait', 'mm', 'a4');
    var logo = 'data:image/png;base64,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';

    pdf.setFontSize(40);
    pdf.setFont("helvetica", "bold");
    pdf.text(22, 50, "Mis críticas en Softófilos");

    pdf.addImage(logo, 'PNG', 20, 10);

    pdf.lines([
        [0, 0],
        [167, 0]
    ], 22, 52);

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "normal");
    pdf.text(30, 100, "Críticas del usuario: " + getCookie("userLogged") + ".");
    pdf.text(30, 120, "Has escrito " + critics.length + " críticas en total.");
    pdf.text(30, 140, "Has criticado los siguientes juegos:");
    pdf.setFont("helvetica", "bold");

    var temp = "";

    for (var i = 0; i < gamesCritisiced.length; i++) {

        if (i == (gamesCritisiced.length - 1)) {

            temp += gamesCritisiced[i].name;
        } else {

            temp += gamesCritisiced[i].name + ", ";
        }
    }
    var lines = pdf.splitTextToSize(temp, 170);
    pdf.text(30, 160, lines);

    for (var i = 0; i < critics.length; i++) {

        pdf.addPage();
        pdf.addImage(logo, 'PNG', 25, 20);

        pdf.setFontSize(20);
        pdf.setFont("helvetica", "bold");
        pdf.text(75, 40, "Datos de la crítica");

        pdf.setLineJoin(0);
        pdf.rect(25, 50, 160, 65, 'S');

        pdf.setFontSize(12);
        pdf.setFont("courier", "normal");
        pdf.text(30, 60, "Obra: " + gamesCritisiced[i].name);
        pdf.text(30, 70, "Desarrollador: " + gamesCritisiced[i].developer);
        pdf.text(30, 80, "Género: " + gamesCritisiced[i].genre);
        pdf.text(30, 90, "Lanzamiento: " + new Date(gamesCritisiced[i].launchDate).toLocaleDateString());
        pdf.text(30, 100, "Fecha de la crítica: " + new Date(critics[i].date).toLocaleDateString() + " " + new Date(critics[i].date).toLocaleTimeString());
        pdf.text(30, 110, "Título de la crítica: " + critics[i].title);

        pdf.setFontSize(20);
        pdf.setFont("helvetica", "bold");
        pdf.text(68, 150, "Contenido de la crítica");

        pdf.setFontSize(20);
        pdf.setFont("courier", "bold");
        pdf.text(25, 175, "-" + critics[i].title);

        pdf.setFontSize(12);
        pdf.setFont("courier", "normal");

        //Se utiliza spliTextToSize para adaptar saltos de línea al ancho de la página
        //y se utiliza replace para sustituir los saltos de línea HTML con \n
        var lines = pdf.splitTextToSize(critics[i].critic.replace(/<br\/>/gi, "\n"), 170);
        pdf.text(25, 190, lines)
    }

    var string = pdf.output('datauristring');
    var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
}

/**********************Export Critics PDF**********************/

/**********************Change Password**********************/

function changePassword(oldPassword, newPassword, repeatNewPassword) {

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function () {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readwrite");
        var usersStore = tr.objectStore("users");

        var userRequest = usersStore.get(getCookie("userLogged"));
        userRequest.onsuccess = function (event) {

            var user = userRequest.result;
            var passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            var warning = "";

            if (oldPassword == "") {
                warning += "Rellene el campo de contraseña actual<br/>";
            }
            if (newPassword == "") {
                warning += "Rellene el campo de nueva contraseña<br/>";
            } else {
                if (!passwordRegExp.test(newPassword)) {
                    warning += "La contraseña no cumple los requisitos:<br/>Debe medir mínimo 8 con letras y números<br/>";
                }
            }
            if (repeatNewPassword == "") {
                warning += "Rellene el campo de repetir contraseña<br/>";
            }

            if (warning == "") {

                if (decrypt(user.password) == oldPassword) {

                    if (newPassword != repeatNewPassword) {
                        warning += "Las nuevas contraseñas no coinciden";
                    }
                } else {
                    warning += "La contraseña actual no es correcta"
                }
            }

            if (warning == "") {

                usersStore.put({
                    user: user.user,
                    password: encrypt(repeatNewPassword),
                    birthDate: user.birthDate,
                    backgroundMode: user.backgroundMode,
                    availability: user.availability
                });
                swal({
                    type: 'success',
                    title: 'Contraseña cambiada con éxito',
                    text: 'Redireccionando...',
                    showConfirmButton: false
                });
                document.getElementById("changePasswordButton").setAttribute("disabled", "disabled");
                setTimeout(function () {
                    window.location.href = "accountSettings.html";
                }, 1500);
            } else {
                $(function () {
                    swal({
                        type: 'error',
                        title: 'Error',
                        html: $("<div>").addClass("animated tada").html(warning)
                    });
                });
            }
        }
    }
}

/**********************Change Password**********************/

/**********************Delete Account**********************/

function deleteUser() {

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function (event) {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readwrite");

        var usersStore = tr.objectStore("users");
        usersStore.delete(getCookie("userLogged"));
        cookieDeleteRedirect("userLogged");
    }
}

/**********************Delete Account**********************/

/**********************Enable/Disable User**********************/

function enable_disableUser(user) {

    swal({
        title: '¿Está seguro/a?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            swal({
                title: 'Cambio de estado',
                text: 'El usuario ha cambiado de estado, Redireccionando...',
                type: 'success',
                showConfirmButton: false,
            });

            document.getElementById("deleteAccountButton").setAttribute("disabled", "disabled");
            setTimeout(function () {

                var db;
                var request = window.indexedDB.open("Softofilos", 1);

                request.onsuccess = function (event) {

                    db = request.result;
                    var tr = db.transaction(db.objectStoreNames, "readwrite");
                    var usersStore = tr.objectStore("users");

                    var userRequest = usersStore.get(user);
                    userRequest.onsuccess = function (event) {

                        if (userRequest.result.availability == "enabled") {

                            usersStore.put({
                                user: userRequest.result.user,
                                password: userRequest.result.password,
                                birthDate: userRequest.result.birthDate,
                                backgroundMode: userRequest.result.backgroundMode,
                                availability: "disabled"
                            });

                            if (userRequest.result.user == getCookie("userLogged")) {

                                cookieDeleteRedirect("userLogged");
                            } else {

                                window.location.href = "accountSettings.html";
                            }
                        } else {

                            usersStore.put({
                                user: userRequest.result.user,
                                password: userRequest.result.password,
                                birthDate: userRequest.result.birthDate,
                                backgroundMode: userRequest.result.backgroundMode,
                                availability: "enabled"
                            });

                            window.location.href = "accountSettings.html";
                        }

                    }

                }
            }, 1500);
        }
    });
}

/**********************Enable/Disable User**********************/

/**********************Google Maps**********************/

function mapCallbackFunction() {

    var gameId = localStorage.getItem("mapGameId");
    localStorage.removeItem("mapGameId");

    var db;
    var request = window.indexedDB.open("Softofilos", 1);

    request.onsuccess = function () {

        db = request.result;
        var tr = db.transaction(db.objectStoreNames, "readwrite");
        var gamesStore = tr.objectStore("games");

        var gameRequest = gamesStore.get(parseInt(id));
        gameRequest.onsuccess = function (event) {

            if (gameRequest.result.lat == "unknown") {

                var map = new google.maps.Map(document.getElementById('mapSlide'), {
                    center: {
                        lat: 0,
                        lng: 0
                    },
                    zoom: 2
                });
            } else {
                var map = new google.maps.Map(document.getElementById('mapSlide'), {
                    center: {
                        lat: parseInt(gameRequest.result.lat),
                        lng: parseInt(gameRequest.result.lng)
                    },
                    zoom: 7
                });

                var marker = new google.maps.Marker({
                    position: {
                        lat: parseInt(gameRequest.result.lat),
                        lng: parseInt(gameRequest.result.lng)
                    },
                    map: map,
                    title: gameRequest.result.developer
                });
            }
        }
    }
}

/**********************Google Maps**********************/