<?php
$basePath = __DIR__;
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Fotobooth Online</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
  <div class="page-shell">
    <header class="topbar">
      <div class="brand-wrap">
        <div class="brand-badge">✦</div>
        <div>
          <p class="eyebrow">Online Studio</p>
          <h1>Fotobooth Magic</h1>
        </div>
      </div>
      <button id="toggleCamera" class="ghost-btn">Aktifkan Kamera</button>
    </header>

    <main class="studio">
      <section class="camera-panel card">
        <div class="camera-box">
          <video id="video" autoplay playsinline muted></video>
          <canvas id="overlayCanvas" width="640" height="480"></canvas>

          <div class="accessory accessory-glasses" id="glassesAccessory">
            <div class="glasses">
              <span class="lens left"></span>
              <span class="bridge"></span>
              <span class="lens right"></span>
            </div>
          </div>

          <div class="accessory accessory-cowboy" id="cowboyAccessory">
            <div class="cowboy-hat">
              <span class="hat-top"></span>
              <span class="hat-band"></span>
              <span class="hat-brim"></span>
            </div>
          </div>

          <div class="filter-overlay" id="filterOverlay"></div>
        </div>

        <div class="toolbar">
          <button id="snapBtn" class="primary-btn">Ambil Foto</button>
          <button id="resetBtn" class="secondary-btn">Reset</button>
        </div>
      </section>

      <aside class="control-panel card">
        <div class="panel-section">
          <p class="section-label">Filter</p>
          <div class="filter-grid">
            <button class="filter-btn active" data-filter="none">Normal</button>
            <button class="filter-btn" data-filter="vintage">Vintage</button>
            <button class="filter-btn" data-filter="sunset">Sunset</button>
            <button class="filter-btn" data-filter="dream">Dream</button>
            <button class="filter-btn" data-filter="mono">Mono</button>
            <button class="filter-btn" data-filter="neon">Neon</button>
          </div>
        </div>

        <div class="panel-section">
          <p class="section-label">Aksesori</p>
          <div class="accessory-list">
            <label class="switch-row">
              <input type="checkbox" id="toggleGlasses" />
              <span>Kacamata</span>
            </label>
            <label class="switch-row">
              <input type="checkbox" id="toggleCowboy" />
              <span>Topi Koboy</span>
            </label>
          </div>
        </div>

        <div class="panel-section">
          <p class="section-label">Hasil Foto</p>
          <div class="result-box">
            <canvas id="resultCanvas" width="640" height="480"></canvas>
            <a id="downloadBtn" class="download-btn" download="fotobooth.png">Download</a>
          </div>
        </div>
      </aside>
    </main>
  </div>

  <script src="assets/js/app.js"></script>
</body>
</html>
