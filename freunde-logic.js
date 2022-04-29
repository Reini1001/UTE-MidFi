function searchFriend() {
    let inputField = document.getElementById("friends-friendcode").value;
    let outputField = document.getElementById("infobox");
    let friend = document.getElementById("friends-found-friend");
    
    if (
        inputField.length < 6 ||                                                                                        // Muss mindestens 6 lang sein
        inputField.charAt((inputField.length -5)) !== "#" ||                                                            // Das 5.-letzte Zeichen muss # sein
        typeof Number.parseInt(inputField.substring((inputField.length -4))) !== "number"                               // Die letzten 4 Zeichen müssen Nummern sein
    ) {
        outputField.innerText = "Bitte geben Sie den Namen und die Zahlen vom Nutzer im Format 'Name#XXXX' an."
        friend.classList.add("invisible");
        return;
    } else if (inputField !== "BeispielName#1234") {
        outputField.innerText = "Der Angegebene Nutzer existiert nicht. (In diesem Prototypen ist nur 'BeispielName#1234' verfügbar)"
        friend.classList.add("invisible");
        return;
    }
    outputField.innerText = "";
    friend.classList.remove("invisible");
}

let isRequestPending = false
function toggleAddFriend() {
    let button = document.getElementById("addFriendButton");
    isRequestPending = !isRequestPending;
    if (isRequestPending) {
        button.classList.add("toggled")
        button.innerText = "Anfrage Zurückziehen";
        return;
    }
    button.classList.remove("toggled");
    button.innerText = "Anfrage Senden";
}