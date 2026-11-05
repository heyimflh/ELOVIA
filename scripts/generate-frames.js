const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 4321;
const TOTAL_FRAMES = 72; // 72 frames across 10 seconds = ultra smooth scrub
const FRAMES_DIR = path.join(__dirname, '..', 'public', 'video', 'frames');

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

const VIDEO_PATH = path.join(__dirname, '..', 'public', 'video', 'CallToAction.mp4');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/video') {
    const stat = fs.statSync(VIDEO_PATH);
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(VIDEO_PATH, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stat.size,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(VIDEO_PATH).pipe(res);
    }
    return;
  }

  if (url.pathname === '/save') {
    const index = url.searchParams.get('index');
    const filename = `frame_${String(index).padStart(3, '0')}.jpg`;
    const filePath = path.join(FRAMES_DIR, filename);
    const fileStream = fs.createWriteStream(filePath);

    req.pipe(fileStream);
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
      console.log(`Saved ${filename}`);
    });
    return;
  }

  if (url.pathname === '/done') {
    console.log('Frame extraction complete!');
    res.writeHead(200);
    res.end('DONE');
    setTimeout(() => {
      process.exit(0);
    }, 500);
    return;
  }

  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<head><title>Frame Extractor</title></head>
<body style="background:#111; color:#fff; font-family:sans-serif; text-align:center; padding:20px;">
  <h2>Extracting Frames... <span id="status">0 / ${TOTAL_FRAMES}</span></h2>
  <video id="v" src="/video" muted playsinline preload="auto" style="display:none;"></video>
  <canvas id="c" width="1280" height="720" style="max-width:80%; border:1px solid #444;"></canvas>

  <script>
    const v = document.getElementById('v');
    const c = document.getElementById('c');
    const ctx = c.getContext('2d');
    const status = document.getElementById('status');
    const totalFrames = ${TOTAL_FRAMES};

    v.addEventListener('loadedmetadata', async () => {
      console.log('Video duration:', v.duration);
      const duration = v.duration || 10.027;

      for (let i = 0; i < totalFrames; i++) {
        const time = (i / (totalFrames - 1)) * (duration - 0.05);
        v.currentTime = time;
        await new Promise(r => {
          v.onseeked = r;
        });

        ctx.drawImage(v, 0, 0, c.width, c.height);
        status.innerText = (i + 1) + ' / ' + totalFrames;

        const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.85));
        await fetch('/save?index=' + i, { method: 'POST', body: blob });
      }

      await fetch('/done');
    });
  </script>
</body>
</html>`);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('Launching Edge...');
  const child = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--autoplay-policy=no-user-gesture-required',
    `http://localhost:${PORT}`,
  ]);

  child.on('exit', (code) => {
    console.log('Edge exited with code', code);
  });
});

