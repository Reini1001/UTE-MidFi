let ws = [{
    spiel: "Spiel 1", name: "Objekt 1", beschreibung: "Beschreibung", abonniert: false
}, {
    spiel: "Spiel 1", name: "Objekt 2", beschreibung: "Beschreibung", abonniert: true
}, {
    spiel: "Spiel 2", name: "Objekt 3", beschreibung: "Beschreibung", abonniert: false
}, {
    spiel: "Spiel 2", name: "Objekt 4", beschreibung: "Beschreibung", abonniert: true
}, {
    spiel: "Spiel 3", name: "Objekt 5", beschreibung: "Beschreibung", abonniert: false
}, {
    spiel: "Spiel 3", name: "Objekt 6", beschreibung: "Beschreibung", abonniert: true
}, {
    spiel: "Zeitalter der Imperien II (2013)", name: "Objekt 7", beschreibung: "Beschreibung", abonniert: false
}, {
    spiel: "Zeitalter der Imperien II (2013)", name: "Objekt 8", beschreibung: "Beschreibung", abonniert: true
}, {
    spiel: "Zeitalter der Imperien II (2013)", name: "Objekt 9", beschreibung: "Beschreibung", abonniert: false
}, {
    spiel: "Zeitalter der Imperien II (2013)", name: "Objekt 10", beschreibung: "Beschreibung", abonniert: true
},]

function game_load() {
    let game = findGetParameter("game");
    if (game) {
        document.getElementById("game").innerHTML = "" + "<img onclick='url_game()' alt='' width='16' src='icons/x.svg' height='16'>" + "<h2>" + game + "</h2>";
    } else {
        document.getElementById("game").innerHTML = "" + "<h2>Kein Spiel ausgewählt</h2>" + "<div class=\"last-played\" onclick='set_game(\"Spiel 3\")'>Spiel 3</div>" + "<div class=\"last-played\" onclick='set_game(\"Spiel 2\")'>Spiel 2</div>" + "<div class=\"last-played\" onclick='set_game(\"Spiel 1\")'>Spiel 1</div>";
    }

    if (findGetParameter("menu")) {
        let list = document.getElementsByClassName("menu-item");
        list[parseInt(findGetParameter("menu"))].classList.add("active")
    }

    let ws_list_element = document.getElementById("ws-list");
    let ws_list = [];
    ws.forEach(ws_objekt => {
        let out = true
        if (findGetParameter("game") && ws_objekt.spiel !== findGetParameter("game")) {
            out = false;
        }
        if (findGetParameter("menu") && ((parseInt(findGetParameter("menu")) === 7 && !ws_objekt.abonniert) || parseInt(findGetParameter("menu")) !== 7)) {
            out = false;
        }
        if (out) {
            ws_list.push(ws_objekt);
        }
    })
    let outHtml = ""
    ws_list.forEach(object => {
        outHtml += "" + "<div class=\"ws-item\">" + "<h3>" + object.name + "</h3>" + "<div>" + object.beschreibung + "</div>" + "</div>"
    })

    ws_list_element.innerHTML = outHtml;
}

function url_game() {
    if (findGetParameter("menu")) {
        window.location = location.protocol + '//' + location.host + location.pathname + "?menu=" + findGetParameter("menu")
    } else {
        window.location = location.protocol + '//' + location.host + location.pathname
    }
}

function set_game(game) {
    if (findGetParameter("menu")) {
        window.location = location.href + '&game=' + game;
    } else {
        window.location = location.href + '?game=' + game;
    }
}

function menu(element) {
    let list = document.getElementsByClassName("menu-item");
    for (let i = 0; i < list.length; i++) {
        if (list[i] === element) {
            if (parseInt(findGetParameter("menu")) === i) {
                if (findGetParameter("game")) {
                    window.location = location.protocol + '//' + location.host + location.pathname + "?game=" + findGetParameter("game");
                } else {
                    window.location = location.protocol + '//' + location.host + location.pathname;
                }
            } else {
                if (findGetParameter("game")) {
                    window.location = location.protocol + '//' + location.host + location.pathname + "?game=" + findGetParameter("game") + "&menu=" + i;
                } else {
                    window.location = location.protocol + '//' + location.host + location.pathname + "?menu=" + i;
                }
            }
        }
    }
}

function findGetParameter(parameterName) {
    let result = null, tmp = [];
    location.search
        .substring(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}