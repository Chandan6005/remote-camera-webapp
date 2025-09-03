const socket = new WebSocket(`ws://${location.host}`);
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
});

socket.onmessage = (event) => {
    if (event.data === 'capture') {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const imgData = canvas.toDataURL('image/png');
        const img = new Image();
        img.src = imgData;
        document.body.appendChild(img);
    }
};