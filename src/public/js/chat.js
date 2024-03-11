 const socketClient = io();
const form = document.getElementById("formChat")
const message = document.getElementById("message")
const nombre = document.getElementById('name');
const div = document.getElementById('chat')
let user
Swal.fire({
   title: 'Welcome!',
    text: 'What is your name?',
    input: 'text',
    inputValidator: (value) => {
        if (!value) {
            return 'Name is required'
        }
    }, 
    confirmButtonText: "Enter"
 }).then((input) => {
    user = input.value;
    nombre.innerHTML= user
    socketClient.emit("newUser", user)
 });

 socketClient.on('userConnect', async (usuario) => {
    Toastify({
        text: `${usuario} connected`,
        duration: 3000, 
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)"
        },
        duration: 3000
      }).showToast();
 })

 socketClient.on("chat", async (messages) => {
    const chat = messages.map((m) => {
        return `${m.name}: ${m.message}`;
    }).join(" ");
    div.innerHTML= chat
 })

 form.onsubmit = (e) => {
    e.preventDefault()
    const infoMessage = {
        name : user, 
        message : message.value,
    };
    infoMessage.innerText = ""
    socketClient.emit("message", infoMessage)
 } 
