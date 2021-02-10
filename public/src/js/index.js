// @ts-nocheck
const div = document.getElementById("chat-name")
const usersListInRoom = document.getElementById("chat-users")
// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
	ignoreQueryPrefix: true, // avoid fetching the symbols from the query string 
});

// @ts-ignore
const socket = io()

// Join room emition
socket.emit("joinroom", { username, room });

// Get room users
socket.on("roomUsers", ({ room, users }) => {

	// Populates the room's name
	div.innerHTML = room

	// Populate the list of users in the sidebar

	usersListInRoom.innerHTML = '';
	users.forEach((user) => {
		const li = document.createElement('li');
		li.innerText = user.username;
		usersListInRoom.appendChild(li);
	});
})

const chatMsgs = document.querySelector(".chat-main--messages")
socket.on("message", (/** @type {any} */ msg) => {
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

