const socket = new WebSocket(`ws://${location.host}`);
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');

let currentImageData = null;

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
});

socket.onmessage = (event) => {
    if (event.data === 'capture') {
        document.body.style.backgroundColor = '#fff';
        setTimeout(() => document.body.style.backgroundColor = '#f0f0f0', 100);

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const imgData = canvas.toDataURL('image/png');

        preview.innerHTML = '';
        const img = new Image();
        img.src = currentImageData;
        img.style.maxWidth = '80%';
        img.style.borderRadius = '8px';
        preview.appendChild(img);
        
        downloadBtn.style.display = 'inline-block';
    }
};

downloadBtn.onclick = () => {
    const a = document.createElement('a');
    a.href = currentImageData;
    a.download = `capture_${Date.now()}.png`;
    a.click();
};