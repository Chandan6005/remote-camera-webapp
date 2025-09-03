const socket = new WebSocket(`ws://${location.host}`);

document.getElementById('triggerBtn').onclick = () => {
    socket.send('capture');
}