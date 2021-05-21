gamesStore.getAll().onsuccess = function (event) {

    var gamesObject;
    var gamesJSON = "";

    for (var i = 0; i < this.result.length; i++) {

        gamesObject = {
            gameId: this.result[i].gameId,
            name: this.result[i].name,
            platform: this.result[i].platform,
            genre: this.result[i].genre
        };

        gamesJSON += JSON.stringify(gamesObject);
    }

    console.log(gamesJSON);
};