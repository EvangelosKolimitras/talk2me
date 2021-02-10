// @ts-ignore
const socket = io()
socket.on("message", msg => {
	console.log(msg);
})

const chatForm = document.querySelector("#chat-footer--form")

// On submit

chatForm.addEventListener("submit", e => {
	e.preventDefault();

	// Get input value
	const msg = e.target.elements.msg.value

	// Emiting a msg to the server
	socket.emit("message-send-from-client", msg)
})