const video = document.getElementById('video');
const toggleCameraBtn = document.getElementById('toggleCamera');
const snapBtn = document.getElementById('snapBtn');
const resetBtn = document.getElementById('resetBtn');
const resultCanvas = document.getElementById('resultCanvas');
const overlayCanvas = document.getElementById('overlayCanvas');
const filterOverlay = document.getElementById('filterOverlay');
const glassesAccessory = document.getElementById('glassesAccessory');
const cowboyAccessory = document.getElementById('cowboyAccessory');
const toggleGlasses = document.getElementById('toggleGlasses');
const toggleCowboy = document.getElementById('toggleCowboy');
const downloadBtn = document.getElementById('downloadBtn');
const filterButtons = document.querySelectorAll('.filter-btn');

let stream = null;
let activeFilter = 'none';

async function enableCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false
    });

    video.srcObject = stream;
    video.play();
    toggleCameraBtn.textContent = 'Kamera Aktif';
    toggleCameraBtn.disabled = true;
    toggleCameraBtn.style.opacity = '0.8';
  } catch (error) {
    alert('Kamera tidak dapat diakses. Pastikan izin kamera sudah diberikan.');
    console.error(error);
  }
}

function drawFaceGuide() {
  const ctx = overlayCanvas.getContext('2d');
  const w = overlayCanvas.width;
  const h = overlayCanvas.height;

  ctx.clearRect(0, 0, w, h);

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.moveTo(w * 0.28, h * 0.28);
  ctx.lineTo(w * 0.72, h * 0.28);
  ctx.lineTo(w * 0.72, h * 0.78);
  ctx.lineTo(w * 0.28, h * 0.78);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'rgba(34,211,238,0.8)';
  ctx.arc(w / 2, h / 2, 120, 0, Math.PI * 2);
  ctx.stroke();
}

function applyFilter() {
  filterOverlay.classList.remove('active');
  filterOverlay.removeAttribute('data-filter');

  if (activeFilter !== 'none') {
    filterOverlay.setAttribute('data-filter', activeFilter);
    filterOverlay.classList.add('active');
  }
}

function toggleAccessoryVisibility() {
  glassesAccessory.classList.toggle('visible', toggleGlasses.checked);
  cowboyAccessory.classList.toggle('visible', toggleCowboy.checked);
}

function capturePhoto() {
  const ctx = resultCanvas.getContext('2d');
  resultCanvas.width = 640;
  resultCanvas.height = 480;

  ctx.drawImage(video, 0, 0, resultCanvas.width, resultCanvas.height);

  const overlay = document.createElement('canvas');
  overlay.width = resultCanvas.width;
  overlay.height = resultCanvas.height;
  const overlayCtx = overlay.getContext('2d');

  const glasses = glassesAccessory.querySelector('.glasses');
  const cowboy = cowboyAccessory.querySelector('.cowboy-hat');

  if (toggleGlasses.checked) {
    const rect = glasses.getBoundingClientRect();
    const parent = video.getBoundingClientRect();
    const x = ((rect.left - parent.left) / parent.width) * resultCanvas.width;
    const y = ((rect.top - parent.top) / parent.height) * resultCanvas.height;
    const w = (rect.width / parent.width) * resultCanvas.width;
    const h = (rect.height / parent.height) * resultCanvas.height;

    overlayCtx.fillStyle = 'rgba(17,24,39,0.9)';
    overlayCtx.fillRect(x + 10, y + 10, w - 20, h - 18);
    overlayCtx.clearRect(x + 20, y + 18, w - 40, h - 34);
  }

  if (toggleCowboy.checked) {
    const rect = cowboy.getBoundingClientRect();
    const parent = video.getBoundingClientRect();
    const x = ((rect.left - parent.left) / parent.width) * resultCanvas.width;
    const y = ((rect.top - parent.top) / parent.height) * resultCanvas.height;
    const w = (rect.width / parent.width) * resultCanvas.width;
    const h = (rect.height / parent.height) * resultCanvas.height;

    overlayCtx.fillStyle = '#f5f3ff';
    overlayCtx.beginPath();
    overlayCtx.moveTo(x + w * 0.15, y + h * 0.9);
    overlayCtx.lineTo(x + w * 0.85, y + h * 0.9);
    overlayCtx.lineTo(x + w, y + h * 0.2);
    overlayCtx.lineTo(x + w * 0.7, y + h * 0.02);
    overlayCtx.lineTo(x + w * 0.3, y + h * 0.02);
    overlayCtx.lineTo(x, y + h * 0.2);
    overlayCtx.closePath();
    overlayCtx.fill();

    overlayCtx.fillStyle = '#7c3aed';
    overlayCtx.fillRect(x + w * 0.2, y + h * 0.55, w * 0.6, h * 0.1);
    overlayCtx.fillStyle = '#f8fafc';
    overlayCtx.fillRect(x + w * 0.1, y + h * 0.7, w * 0.8, h * 0.14);
  }

  const finalImage = ctx.getImageData(0, 0, resultCanvas.width, resultCanvas.height);
  const imageData = finalImage.data;

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];

    if (activeFilter === 'vintage') {
      imageData[i] = Math.min(255, r * 1.15);
      imageData[i + 1] = Math.min(255, g * 0.95);
      imageData[i + 2] = Math.min(255, b * 0.82);
    }

    if (activeFilter === 'sunset') {
      imageData[i] = Math.min(255, r * 1.2);
      imageData[i + 1] = Math.min(255, g * 0.85);
      imageData[i + 2] = Math.min(255, b * 0.7);
    }

    if (activeFilter === 'dream') {
      imageData[i] = Math.min(255, r * 1.12);
      imageData[i + 1] = Math.min(255, g * 1.08);
      imageData[i + 2] = Math.min(255, b * 1.18);
    }

    if (activeFilter === 'mono') {
      const gray = (r + g + b) / 3;
      imageData[i] = gray;
      imageData[i + 1] = gray;
      imageData[i + 2] = gray;
    }

    if (activeFilter === 'neon') {
      imageData[i] = Math.min(255, r * 1.3);
      imageData[i + 1] = Math.min(255, g * 1.05);
      imageData[i + 2] = Math.min(255, b * 1.4);
    }
  }

  ctx.putImageData(finalImage, 0, 0);

  const imageDataUrl = resultCanvas.toDataURL('image/png');
  downloadBtn.href = imageDataUrl;
}

toggleCameraBtn.addEventListener('click', enableCamera);

snapBtn.addEventListener('click', () => {
  if (video.readyState >= 2) {
    capturePhoto();
  } else {
    alert('Kamera belum siap. Tekan tombol aktifkan kamera terlebih dahulu.');
  }
});

resetBtn.addEventListener('click', () => {
  const ctx = resultCanvas.getContext('2d');
  ctx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
  downloadBtn.removeAttribute('href');
  downloadBtn.style.opacity = '0.6';
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    applyFilter();
  });
});

toggleGlasses.addEventListener('change', toggleAccessoryVisibility);
toggleCowboy.addEventListener('change', toggleAccessoryVisibility);

function loopFrame() {
  drawFaceGuide();
  requestAnimationFrame(loopFrame);
}

loopFrame();
applyFilter();
toggleAccessoryVisibility();
