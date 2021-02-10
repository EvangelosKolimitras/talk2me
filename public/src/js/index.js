
// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true, // avoid fetching the symbols from the query string 
});

// @ts-ignore
const socket = io()

// Join room emition
socket.emit("joinroom", { username, room });

const chatMsgs = document.querySelector(".chat-main--messages")
socket.on("message", msg => {
	outputMessage(msg);

	// Scroll on msg submission
	chatMsgs.scrollTop = chatMsgs.scrollHeight;
})

const chatForm = document.querySelector("#chat-footer--form")

// On submit

chatForm.addEventListener("submit", e => {
	e.preventDefault();

	// Get input value
	const msg = e.target.elements.msg.value

	// Emiting a msg to the server
	socket.emit("message-send-from-client", msg)

	// Clear input
	e.target.elements.msg.value = ""
	e.target.elemets.msg.focus()
})

// Render to DOM
function outputMessage(msg) {
	const div = document.createElement("div")
	div.classList.add("message")

	div.innerHTML = `
		<p class="message">
			<span class="message-author">${msg.username}</span>
			${msg.text}<span class="message-time">
			${msg.timestamp}</span>
		</p>
	`

	document.querySelector(".chat-main--messages").appendChild(div)
}
