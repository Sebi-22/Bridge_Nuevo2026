// ======================================
// AUDIO PLAYER - MUSIC1
// ======================================

document.addEventListener("DOMContentLoaded", function () {

  function setupBarraBlanca() {

    const section = document.querySelector(".music1");

    if (!section) return;

    // ======================================
    // CONTENEDOR PRINCIPAL
    // ======================================

    const trackContainer = document.createElement("div");
    trackContainer.className = "track-container";

    // ======================================
    // IMAGEN DEL ÁLBUM
    // ======================================

    const albumCover = document.createElement("img");
    albumCover.className = "album-cover";
    albumCover.src = "assets/images/cover.jpg";
    albumCover.alt = "Album Cover";

    // ======================================
    // INFO CANCIÓN
    // ======================================

    const trackInfo = document.createElement("div");
    trackInfo.className = "track-info";

    const trackTitle = document.createElement("h3");
    trackTitle.className = "track-title";
    trackTitle.textContent = "BLACK HOLE SUN";

    const trackArtist = document.createElement("p");
    trackArtist.className = "track-artist";
    trackArtist.textContent = "BORING VACCINES";

    trackInfo.append(trackTitle, trackArtist);

    // ======================================
    // CONTROLES
    // ======================================

    const audioControls = document.createElement("div");
    audioControls.className = "audio-controls";

    // BACK
    const backBtn = document.createElement("button");
    backBtn.className = "back-btn";
    backBtn.innerHTML = "⏮";

    // PLAY
    const playBtn = document.createElement("button");
    playBtn.className = "play-btn";
    playBtn.innerHTML = "▶";

    // NEXT
    const nextBtn = document.createElement("button");
    nextBtn.className = "next-btn";
    nextBtn.innerHTML = "⏭";

    audioControls.append(
      backBtn,
      playBtn,
      nextBtn
    );

    // ======================================
    // AUDIO
    // ======================================

    const audioEl = document.createElement("audio");

    audioEl.src = "assets/audios/tema.mp3";

    // ======================================
    // BARRA DE PROGRESO
    // ======================================

    const progressBar = document.createElement("input");

    progressBar.type = "range";
    progressBar.min = 0;
    progressBar.max = 100;
    progressBar.value = 0;

    progressBar.className = "progress-range";

    // ======================================
    // TIEMPO
    // ======================================

    const timeEl = document.createElement("div");

    timeEl.className = "time";

    timeEl.textContent = "0:00 / 0:00";

    // ======================================
    // VOLUMEN
    // ======================================

    const volumeSection = document.createElement("div");

    volumeSection.className = "volume-section";

    const speaker = document.createElement("span");

    speaker.className = "speaker";

    speaker.innerHTML = "🔈";

    const volumeBar = document.createElement("input");

    volumeBar.type = "range";
    volumeBar.min = 0;
    volumeBar.max = 1;
    volumeBar.step = 0.1;
    volumeBar.value = 1;

    volumeBar.className = "volume-bar";

    volumeSection.append(
      speaker,
      volumeBar
    );

    // ======================================
    // ARMADO FINAL
    // ======================================

    trackContainer.append(
      albumCover,
      trackInfo,
      audioControls,
      progressBar,
      timeEl,
      volumeSection,
      audioEl
    );

    section.appendChild(trackContainer);

    // ======================================
    // PLAY / PAUSE
    // ======================================

    playBtn.addEventListener("click", () => {

      if (audioEl.paused) {

        audioEl.play();

        playBtn.innerHTML = "⏸";

      } else {

        audioEl.pause();

        playBtn.innerHTML = "▶";

      }

    });

    // ======================================
    // VOLUMEN
    // ======================================

    volumeBar.addEventListener("input", () => {

      audioEl.volume = volumeBar.value;

    });

    // ======================================
    // FORMATO TIEMPO
    // ======================================

    function formatTime(time) {

      const minutes = Math.floor(time / 60);

      const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

      return `${minutes}:${seconds}`;

    }

    // ======================================
    // UPDATE PROGRESS
    // ======================================

    audioEl.addEventListener("timeupdate", () => {

      const progress =
        (audioEl.currentTime / audioEl.duration) * 100;

      progressBar.value = progress || 0;

      timeEl.textContent =
        `${formatTime(audioEl.currentTime)} / ${formatTime(audioEl.duration || 0)}`;

    });

    // ======================================
    // MOVER BARRA
    // ======================================

    progressBar.addEventListener("input", () => {

      audioEl.currentTime =
        (progressBar.value / 100) * audioEl.duration;

    });

    // ======================================
    // TERMINA AUDIO
    // ======================================

    audioEl.addEventListener("ended", () => {

      playBtn.innerHTML = "▶";

    });

  }

  setupBarraBlanca();

});