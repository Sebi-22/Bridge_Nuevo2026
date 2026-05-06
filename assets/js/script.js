// audio player para la sección de música (music1)
document.addEventListener("DOMContentLoaded", function () {

  function setupBarraBlanca() {

    const section = document.querySelector(".music1");
    if (!section) return;

    // CONTENEDOR PRINCIPAL
    const trackContainer = document.createElement("div");
    trackContainer.className = "track-container";

    // IMAGEN
    const albumCover = document.createElement("img");
    albumCover.className = "album-cover";

    // INFO
    const trackInfo = document.createElement("div");
    trackInfo.className = "track-info";

    const trackTitle = document.createElement("h3");
    trackTitle.className = "track-title";
    trackTitle.textContent = "Nombre de la canción";

    const trackArtist = document.createElement("p");
    trackArtist.className = "track-artist";
    trackArtist.textContent = "Artista";

    trackInfo.append(trackTitle, trackArtist);

    // CONTROLES
    const audioControls = document.createElement("div");
    audioControls.className = "audio-controls";

    const backBtn = document.createElement("button");
    backBtn.innerHTML = "⏮";

    const playBtn = document.createElement("button");
    playBtn.innerHTML = "▶";

    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "⏭";

    audioControls.append(backBtn, playBtn, nextBtn);

    // AUDIO
    const audioEl = document.createElement("audio");
    audioEl.src = "assets/audios/tema.mp3"; // 👈 cambiá esto

    // PROGRESS
    const progressBar = document.createElement("input");
    progressBar.type = "range";
    progressBar.min = 0;
    progressBar.max = 100;
    progressBar.value = 0;
    progressBar.className = "progress-range";

    // TIEMPO
    const timeEl = document.createElement("div");
    timeEl.className = "time";
    timeEl.textContent = "0:00 / 0:00";

    // VOLUMEN
    const volumeSection = document.createElement("div");
    volumeSection.className = "volume-section";

    const speaker = document.createElement("span");
    speaker.textContent = "🔊";

    const volumeBar = document.createElement("input");
    volumeBar.type = "range";
    volumeBar.min = 0;
    volumeBar.max = 1;
    volumeBar.step = 0.1;
    volumeBar.value = 1;

    volumeSection.append(speaker, volumeBar);

    // ARMADO FINAL
    trackContainer.append(
      albumCover,
      trackInfo,
      audioControls,
      progressBar,
      timeEl,
      volumeSection
    );

    section.appendChild(trackContainer);

    // ▶️ PLAY / PAUSE
    playBtn.addEventListener("click", () => {
      if (audioEl.paused) {
        audioEl.play();
        playBtn.textContent = "⏸";
      } else {
        audioEl.pause();
        playBtn.textContent = "▶";
      }
    });

    // 🔊 VOLUMEN
    volumeBar.addEventListener("input", () => {
      audioEl.volume = volumeBar.value;
    });

    // ⏱ PROGRESS
    audioEl.addEventListener("timeupdate", () => {
      const progress = (audioEl.currentTime / audioEl.duration) * 100;
      progressBar.value = progress || 0;

      const formatTime = (t) => {
        const min = Math.floor(t / 60);
        const sec = Math.floor(t % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
      };

      timeEl.textContent = `${formatTime(audioEl.currentTime)} / ${formatTime(audioEl.duration || 0)}`;
    });

    // 🎯 MOVER BARRA
    progressBar.addEventListener("input", () => {
      audioEl.currentTime = (progressBar.value / 100) * audioEl.duration;
    });
  }

  setupBarraBlanca();
});