// const { text } = require("express");

// const { text } = require("express");

const socket = io();

let name;
let messagearea = document.querySelector(".message_area");
let textarea = document.querySelector("#textarea");
do {
   name = prompt ("Please Enter Your Name")
}
while (!name)
textarea.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value);
        
    }
})
function sendMessage(messag) {
    let mssg = {
        user: name,
        message : messag.trim()
    }

    //append
    appendMessage(mssg, 'outgoing');
    textarea.value = '';
    socket.emit('message', mssg)
    scrollToBottom();
}

function appendMessage(mssg, type) {
    let maindiv = document.createElement('div');
    let className = type;
    maindiv.classList.add(className, "message")
    
    let markup = `
        <h4>${mssg.user}</h4>
        <p>${mssg.message}</p>
    `;

    maindiv.innerHTML = markup;
    messagearea.appendChild(maindiv);
}


socket.on('message', (mssg) => {
    // console.log(mssg);
    appendMessage(mssg, "incoming");
    scrollToBottom();
})

function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight;
}