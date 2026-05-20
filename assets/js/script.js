document.addEventListener("DOMContentLoaded", function () {

// ─── PLAYER BAR (barraBlanca → player-bar) ───────────────────────────────────
function setupPlayerBar() {

  const section = document.querySelector(".player-bar");
  if (!section) return;

  section.style.height = "12.08vh";
  section.style.padding = "0 9.5vw";
  section.style.zIndex = "1";
  section.style.display = "flex";
  section.style.position = "relative";
  section.style.backgroundColor = "white";

  const trackContainer = document.createElement("div");
  trackContainer.className = "track-container";

  const albumCover = document.createElement("img");
  albumCover.className = "track-thumbnail";

  const trackInfo = document.createElement("div");
  trackInfo.className = "track-info";

  const trackTitle = document.createElement("h3");
  trackTitle.className = "track-title";

  const trackArtist = document.createElement("p");
  trackArtist.className = "track-artist";

  trackInfo.append(trackTitle, trackArtist);

  const audioControls = document.createElement("div");
  audioControls.className = "audio-controls";

  const backBtn = document.createElement("button");
  backBtn.className = "btn-back";
  backBtn.innerHTML = "⏮";

  const playBtn = document.createElement("button");
  playBtn.className = "btn-play";
  playBtn.innerHTML = "▶";

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn-next";
  nextBtn.innerHTML = "⏭";

  audioControls.append(backBtn, playBtn, nextBtn);

  const audioEl = document.createElement("audio");
  audioEl.className = "audio-player";

  const progressBar = document.createElement("input");
  progressBar.type = "range";
  progressBar.min = 0;
  progressBar.max = 100;
  progressBar.value = 0;
  progressBar.className = "progress-range";
  progressBar.style.cssText = "width:17.5vw;height:.32vh;background:#afafaf;margin-left:4vw;overflow:hidden;";

  const timeEl = document.createElement("div");
  timeEl.className = "time-display";
  timeEl.innerHTML = "0:00 / 0:00";
  timeEl.style.cssText = "color:#afafaf;margin:0 4.5vw 0 2vw;position:relative;font-weight:normal;font-size:1em;font-family:'Inconsolata',sans-serif;";

  const volumeSection = document.createElement("div");
  volumeSection.className = "volume-section";
  volumeSection.style.cssText = "display:flex;justify-content:center;align-items:center;";

  const speaker = document.createElement("div");
  speaker.className = "speaker";
  speaker.innerHTML = "📢";

  const volumeBar = document.createElement("input");
  volumeBar.type = "range";
  volumeBar.min = 0;
  volumeBar.max = 1.2;
  volumeBar.step = 0.1;
  volumeBar.value = 1;
  volumeBar.className = "volume-range";
  volumeBar.style.cssText = "width:5.25vw;height:.32vh;background:#afafaf;margin-left:1vw;";

  volumeSection.append(speaker, volumeBar);
  trackContainer.append(albumCover, trackInfo, audioControls, audioEl, progressBar, timeEl, volumeSection);
  section.appendChild(trackContainer);

  const tracks = [
    { title: "Black Hole Sun", artist: "Terrible", cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/Black-hole-sun.mp3" },
    { title: "Work",           artist: "Terrible", cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/Work.mp3" },
    { title: "Lullaby",        artist: "Terrible", cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/Lullaby.mp3" },
    { title: "The Passenger",  artist: "Terrible", cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/The-Passanger.mp3" },
    { title: "Celebrity Skin", artist: "Terrible", cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/Celebrity-Skin.mp3" },
    { title: "Creep",          artist: "Terrible", cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/Creep.mp3" },
    { title: "Epic",           artist: "Terrible", cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/Epic.mp3" },
    { title: "Reptilia",       artist: "Terrible", cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/Reptilia.mp3" },
    { title: "Go With A Flow", artist: "Terrible", cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/Go-With-a-Flow.mp3" },
    { title: "Electric Version",artist: "Terrible",cover: "assets/images/album-16-150x150.jpg", audio: "assets/audios/Electric-version.mp3" }
  ];

  let currentIndex = 0;

  function loadTrack(index) {
    trackTitle.innerHTML = tracks[index].title;
    trackArtist.innerHTML = tracks[index].artist;
    albumCover.src = tracks[index].cover;
    audioEl.src = tracks[index].audio;
  }

  function playPause() {
    if (audioEl.paused) { audioEl.play(); playBtn.innerHTML = "⏸"; }
    else { audioEl.pause(); playBtn.innerHTML = "▶"; }
  }

  function nextTrack() {
    currentIndex = (currentIndex + 1) % tracks.length;
    loadTrack(currentIndex); audioEl.play(); playBtn.innerHTML = "⏸";
  }

  function prevTrack() {
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentIndex); audioEl.play(); playBtn.innerHTML = "⏸";
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    let sec = Math.floor(s % 60);
    if (sec < 10) sec = "0" + sec;
    return m + ":" + sec;
  }

  playBtn.addEventListener("click", playPause);
  nextBtn.addEventListener("click", nextTrack);
  backBtn.addEventListener("click", prevTrack);

  audioEl.addEventListener("timeupdate", function () {
    if (audioEl.duration) {
      progressBar.value = (audioEl.currentTime / audioEl.duration) * 100;
      timeEl.innerHTML = formatTime(audioEl.currentTime) + " / " + formatTime(audioEl.duration);
    }
  });

  progressBar.addEventListener("input", function () {
    audioEl.currentTime = (progressBar.value / 100) * audioEl.duration;
  });

  volumeBar.addEventListener("input", function () { audioEl.volume = volumeBar.value; });

  audioEl.addEventListener("ended", function () {
    playBtn.innerHTML = "▶"; progressBar.value = 0; nextTrack();
  });

  loadTrack(currentIndex);
} setupPlayerBar();


// ─── TRACK LIST (songs → track-list) ─────────────────────────────────────────
function setupTrackList() {

  const tenSongs = [
    { number: "1.",  title: "Black Hole Sun",   duration: "0:32", audio: "assets/audios/Black-hole-sun.mp3",   video: "https://player.vimeo.com/video/33730560" },
    { number: "2.",  title: "Work",              duration: "0:27", audio: "assets/audios/Work.mp3",             video: "https://player.vimeo.com/video/33730560" },
    { number: "3.",  title: "Lullaby",           duration: "0:30", audio: "assets/audios/Lullaby.mp3",          video: "https://player.vimeo.com/video/33730560" },
    { number: "4.",  title: "The Passenger",     duration: "0:30", audio: "assets/audios/The-Passanger.mp3",    video: "https://player.vimeo.com/video/33730560" },
    { number: "5.",  title: "Celebrity Skin",    duration: "0:32", audio: "assets/audios/Celebrity-Skin.mp3",   video: "https://player.vimeo.com/video/33730560" },
    { number: "6.",  title: "Creep",             duration: "0:30", audio: "assets/audios/Creep.mp3",            video: "https://player.vimeo.com/video/33730560" },
    { number: "7.",  title: "Epic",              duration: "0:30", audio: "assets/audios/Epic.mp3",             video: "https://player.vimeo.com/video/33730560" },
    { number: "8.",  title: "Reptilia",          duration: "0:30", audio: "assets/audios/Reptilia.mp3",         video: "https://player.vimeo.com/video/33730560" },
    { number: "9.",  title: "Go With A Flow",    duration: "0:30", audio: "assets/audios/Go-With-a-Flow.mp3",   video: "https://player.vimeo.com/video/33730560" },
    { number: "10.", title: "Electric Version",  duration: "0:31", audio: "assets/audios/Electric-version.mp3", video: "https://player.vimeo.com/video/33730560" }
  ];

  const songsContainer = document.querySelector(".track-list");
  if (!songsContainer) return;

  songsContainer.innerHTML = "";

  tenSongs.forEach(function (song, index) {
    const article = document.createElement("article");
    article.className = index === tenSongs.length - 1 ? "track track-no-border" : "track";

    const trackDetails = document.createElement("div");
    trackDetails.className = "track-details";

    const number = document.createElement("p");
    number.innerHTML = song.number;

    const title = document.createElement("h4");
    title.innerHTML = song.title;

    trackDetails.append(number, title);

    const duration = document.createElement("p");
    duration.innerHTML = song.duration;

    const playAudio = document.createElement("i");
    playAudio.className = "btn-play-audio";
    playAudio.innerHTML = "▶";

    const playMovie = document.createElement("i");
    playMovie.className = "btn-play-movie";
    playMovie.innerHTML = "🎥";

    article.append(trackDetails, duration, playAudio, playMovie);
    songsContainer.appendChild(article);
  });

  const audioPlayer = new Audio();
  let currentTrackIndex = null;
  const playBtns = document.querySelectorAll(".btn-play-audio");

  playBtns.forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      if (currentTrackIndex === index && !audioPlayer.paused) {
        audioPlayer.pause(); btn.innerHTML = "▶"; return;
      }
      playBtns.forEach(function (b) { b.innerHTML = "▶"; });
      audioPlayer.src = tenSongs[index].audio;
      audioPlayer.play();
      btn.innerHTML = "⏸";
      currentTrackIndex = index;
    });
  });

  // Video lightbox for track list
  const albumLightbox = document.createElement("div");
  albumLightbox.className = "video-lightbox-album";
  albumLightbox.style.display = "none";

  const lightboxContent = document.createElement("div");
  lightboxContent.className = "lightbox-content";

  const albumCloseBtn = document.createElement("span");
  albumCloseBtn.className = "lightbox-close";
  albumCloseBtn.innerHTML = "✕";

  lightboxContent.appendChild(albumCloseBtn);
  albumLightbox.appendChild(lightboxContent);
  document.body.appendChild(albumLightbox);

  let albumIframe = null;

  document.querySelectorAll(".btn-play-movie").forEach(function (btn, index) {
    btn.addEventListener("click", function () {
      albumLightbox.style.display = "flex";
      albumIframe = document.createElement("iframe");
      albumIframe.className = "album-video";
      albumIframe.width = "640";
      albumIframe.height = "360";
      albumIframe.allow = "autoplay; fullscreen; picture-in-picture";
      albumIframe.allowFullscreen = true;
      albumIframe.src = tenSongs[index].video + "?autoplay=1";
      lightboxContent.appendChild(albumIframe);
    });
  });

  albumCloseBtn.addEventListener("click", function () {
    albumLightbox.style.display = "none";
    if (albumIframe) { albumIframe.remove(); albumIframe = null; }
  });

} setupTrackList();


// ─── GALLERY (dupli-four-images → gallery-grid) ───────────────────────────────
function setupGallery() {

  const imageContainer = document.querySelector(".gallery-grid");
  if (!imageContainer) return;

  // 6 images, matching the original site
  const imagePaths = [
    "assets/images/h1-img-1.jpg",
    "assets/images/h1-img-2.jpg",
    "assets/images/h1-img-3.jpg",
    "assets/images/h1-img-4.jpg",
    "assets/images/h1-img-5.jpg",
    "assets/images/h1-img-6.jpg"
  ];

  const lightbox = document.createElement("div");
  lightbox.className = "img-lightbox";
  lightbox.style.display = "none";

  const lightboxImg = document.createElement("img");
  lightboxImg.className = "lightbox-image-content";

  const counter = document.createElement("div");
  counter.className = "lightbox-counter";

  const closeBtn = document.createElement("span");
  closeBtn.className = "lightbox-close-btn";
  closeBtn.innerHTML = "✕";

  const prevImageBtn = document.createElement("div");
  prevImageBtn.className = "lightbox-prev";
  prevImageBtn.innerHTML = "←";

  const nextImageBtn = document.createElement("div");
  nextImageBtn.className = "lightbox-next";
  nextImageBtn.innerHTML = "→";

  lightbox.append(lightboxImg, counter, closeBtn, prevImageBtn, nextImageBtn);
  document.body.appendChild(lightbox);

  let currentImageIndex = 0;

  for (let i = 0; i < imagePaths.length; i++) {
    const img = document.createElement("img");
    img.src = imagePaths[i];
    img.dataset.index = i;
    imageContainer.appendChild(img);
    img.addEventListener("click", function () {
      currentImageIndex = Number(this.dataset.index);
      openLightbox();
    });
  }

  function updateCounter() {
    counter.innerHTML = (currentImageIndex + 1) + " / " + imagePaths.length;
  }

  function openLightbox() {
    lightbox.style.display = "block";
    lightboxImg.src = imagePaths[currentImageIndex];
    updateCounter();
  }

  function closeLightbox() { lightbox.style.display = "none"; }

  function showNext() {
    currentImageIndex = (currentImageIndex + 1) % imagePaths.length;
    lightboxImg.src = imagePaths[currentImageIndex];
    updateCounter();
  }

  // ✅ BUG FIX: was `if (currentImageIndex = 0)` (assignment), now correct modulo
  function showPrev() {
    currentImageIndex = (currentImageIndex - 1 + imagePaths.length) % imagePaths.length;
    lightboxImg.src = imagePaths[currentImageIndex];
    updateCounter();
  }

  closeBtn.addEventListener("click", closeLightbox);
  nextImageBtn.addEventListener("click", showNext);
  prevImageBtn.addEventListener("click", showPrev);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });

} setupGallery();


// ─── VIEW ALL BUTTON (ten-dates → tour-dates) ─────────────────────────────────
function setupViewAllButton() {

  const section = document.querySelector(".tour-dates");
  if (!section) return;

  const list = section.querySelector(".dates-list");
  if (!list) return;

  const button = document.createElement("button");
  button.className = "view-all-btn";
  button.innerHTML = "View All";
  section.appendChild(button);

  const dates = [
    { day: "10", month: "Jun Sun", place: "Gärdet Open Air Stockholm – Sweden" },
    { day: "12", month: "Jun Tue", place: "Helsinki, Finland – Hartwall Arena" },
    { day: "14", month: "Jun Thu", place: "Riga, Latvia – Riga Arena" },
    { day: "15", month: "Jun Fri", place: "Kaunas, Lithuania – Žalgirio Arena" },
    { day: "18", month: "Jun Mon", place: "Moscow, Russia – Olimpiski" },
    { day: "19", month: "Jun Tue", place: "Pilton, England – Glastonbury" },
    { day: "22", month: "Jun Fri", place: "London, England – O2 Arena" },
    { day: "27", month: "Jun Wed", place: "Rome, Italy – Cola Arena" },
    { day: "29", month: "Jun Fri", place: "Athens, Greece – PAOK Stadium" },
    { day: "03", month: "Jul Tue", place: "Budapest, Hungary – Nagy Arena" }
  ];

  list.innerHTML = "";
  const hiddenDates = [];

  for (let i = 0; i < dates.length; i++) {
    const li = document.createElement("li");
    li.className = "date-item";

    const datePosition = document.createElement("div");
    datePosition.className = "date-position";

    const day = document.createElement("h4");
    day.innerHTML = dates[i].day;

    const month = document.createElement("p");
    month.className = "date-month";
    month.innerHTML = dates[i].month;

    datePosition.append(day, month);

    const title = document.createElement("h3");
    const link = document.createElement("a");
    link.href = "#";
    link.innerHTML = dates[i].place;
    title.appendChild(link);

    const buy = document.createElement("p");
    const buyLink = document.createElement("a");
    buyLink.href = "#";
    buyLink.innerHTML = "buy tickets";
    buy.appendChild(buyLink);

    li.append(datePosition, title, buy);

    if (i < 6) { list.appendChild(li); }
    else { hiddenDates.push(li); }
  }

  button.addEventListener("click", function () {
    hiddenDates.forEach(function (li) { list.appendChild(li); });
    button.parentNode.removeChild(button);
  });

} setupViewAllButton();


// ─── BLOG POSTS (trois-boys → blog-section) ───────────────────────────────────
function setupBlogPosts() {

  const container = document.querySelector(".posts-grid");
  if (!container) return;

  const posts = [
    { image: "assets/images/blog-post-1.jpg", title: "The Best Night In Baltimore", date: "10 April, 2018" },
    { image: "assets/images/blog-post-2.jpg", title: "The Best Night In Detroit",   date: "10 April, 2018" },
    { image: "assets/images/blog-post-3.jpg", title: "The Best Night In New York",  date: "10 April, 2018" }
  ];

  container.innerHTML = "";

  posts.forEach(function (post) {
    const article = document.createElement("article");
    article.className = "blog-post";

    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.title;

    const title = document.createElement("p");
    title.className = "post-title";

    const link = document.createElement("a");
    link.href = "#";
    link.innerHTML = post.title;
    title.appendChild(link);

    const date = document.createElement("p");
    date.className = "post-date";
    date.innerHTML = post.date;

    article.append(img, title, date);
    container.appendChild(article);
  });

} setupBlogPosts();


// ─── VIDEO SECTION (koichi → video-section) ───────────────────────────────────
function setupVideoSection() {

  const section = document.querySelector(".video-section");
  if (!section) return;

  const coverImg = document.createElement("img");
  coverImg.src = "assets/images/h1-img-7.jpg";
  coverImg.alt = "Video cover";

  const playButton = document.createElement("button");
  playButton.className = "video-play-btn";
  playButton.innerHTML = "▶";

  const videoLightbox = document.createElement("div");
  videoLightbox.className = "video-lightbox";
  videoLightbox.style.display = "none";

  const closeBtn = document.createElement("span");
  closeBtn.className = "video-close-btn";
  closeBtn.innerHTML = "✕";

  const videoPlayer = document.createElement("video");
  videoPlayer.className = "video-player";
  videoPlayer.src = "assets/video/76765805.mp4";
  videoPlayer.controls = true;

  videoLightbox.append(closeBtn, videoPlayer);
  section.append(coverImg, playButton, videoLightbox);

  playButton.addEventListener("click", function () {
    videoLightbox.style.display = "flex";
    videoPlayer.play();
  });

  closeBtn.addEventListener("click", function () {
    videoLightbox.style.display = "none";
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  });

} setupVideoSection();


// ─── DISCOGRAPHY (disco-disco → discography-section) ──────────────────────────
function setupDiscography() {

  const section = document.querySelector(".discography-section");
  if (!section) return;

  const container = section.querySelector(".discography-container");
  if (!container) return;

  const albums = [
    { image: "assets/images/album-1.jpg",          bigTitle: "Be-Doo",        smallTitle: "Caller" },
    { image: "assets/images/album-2.jpg",          bigTitle: "Free Spirit",   smallTitle: "Go Away" },
    { image: "assets/images/album-3.jpg",          bigTitle: "Depressed Days",smallTitle: "Ritual Spirit" },
    { image: "assets/images/album-4.jpg",          bigTitle: "Wrong Motion",  smallTitle: "Love Hate" },
    { image: "assets/images/album-5.jpg",          bigTitle: "",              smallTitle: "Fallen" },
    { image: "assets/images/album-6.jpg",          bigTitle: "",              smallTitle: "Hater" },
    { image: "assets/images/album-7.jpg",          bigTitle: "",              smallTitle: "Windows" },
    { image: "assets/images/album-8.jpg",          bigTitle: "",              smallTitle: "Blame" },
    { image: "assets/images/album-5.jpg",          bigTitle: "",              smallTitle: "Fallen" },
    { image: "assets/images/album-6.jpg",          bigTitle: "",              smallTitle: "Hater" },
    { image: "assets/images/album-7.jpg",          bigTitle: "",              smallTitle: "Windows" },
    { image: "assets/images/album-8.jpg",          bigTitle: "",              smallTitle: "Blame" },
    { image: "assets/images/album-13.jpg",         bigTitle: "",              smallTitle: "Neon Dreams" },
    { image: "assets/images/album-14.jpg",         bigTitle: "",              smallTitle: "Velvet Nights" },
    { image: "assets/images/album-15.jpg",         bigTitle: "",              smallTitle: "Green Greed" },
    { image: "assets/images/album-16-150x150.jpg", bigTitle: "",              smallTitle: "Bad Day" },
    { image: "assets/images/album-16-150x150.jpg", bigTitle: "",              smallTitle: "Terrible" },
    { image: "assets/images/album-19.jpg",         bigTitle: "",              smallTitle: "Ouia Princess" }
  ];

  const albumsPerRow = 4;
  let currentIndex = 0;

  function applyHoverEffects() {
    document.querySelectorAll(".disc-image").forEach(function (item) {
      const bigTitle  = item.querySelector(".big-title");
      const smallTitle = item.querySelector(".small-title");

      item.addEventListener("mouseenter", function () {
        if (bigTitle)  { bigTitle.style.opacity = "1";  bigTitle.style.transform  = "translateY(0)"; }
        if (smallTitle){ smallTitle.style.opacity = "1"; smallTitle.style.transform = "translateY(0)"; }
      });

      item.addEventListener("mouseleave", function () {
        if (bigTitle)  { bigTitle.style.opacity = "0";  bigTitle.style.transform  = "translateY(10px)"; }
        if (smallTitle){ smallTitle.style.opacity = "0"; smallTitle.style.transform = "translateY(10px)"; }
      });
    });
  }

  function createRow() {
    const row = document.createElement("div");
    row.className = "discography-row";

    for (let i = 0; i < albumsPerRow; i++) {
      if (currentIndex >= albums.length) break;

      const albumData = albums[currentIndex];
      const discItem = document.createElement("div");
      discItem.className = "disc-image";

      const img = document.createElement("img");
      img.src = albumData.image;
      img.alt = albumData.bigTitle || "Album cover";

      const bigTitle = document.createElement("h2");
      bigTitle.className = "big-title";
      bigTitle.innerHTML = albumData.bigTitle;
      bigTitle.style.cssText = "opacity:0;transform:translateY(10px);transition:opacity .3s ease,transform .3s ease;margin:0;";

      const smallTitle = document.createElement("p");
      smallTitle.className = "small-title";
      smallTitle.innerHTML = albumData.smallTitle;
      smallTitle.style.cssText = "opacity:0;transform:translateY(10px);transition:opacity .3s ease,transform .3s ease;margin:0;";

      discItem.append(img, bigTitle, smallTitle);
      row.appendChild(discItem);
      currentIndex++;
    }

    container.appendChild(row);
    applyHoverEffects();
  }

  const button = document.createElement("button");
  button.className = "show-more-btn";
  button.innerHTML = "Show More";
  section.appendChild(button);

  createRow();

  button.addEventListener("click", function () {
    createRow();
    if (currentIndex >= albums.length) button.remove();
  });

} setupDiscography();


// ─── SCROLL TO TOP (mayday → scroll-top-btn) ─────────────────────────────────
function setupScrollUpButton() {

  const scrollUpBtn = document.querySelector(".scroll-top-btn");
  if (!scrollUpBtn) return;

  window.addEventListener("scroll", function () {
    scrollUpBtn.classList.toggle("visible", window.scrollY > window.innerHeight);
  });

  scrollUpBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

} setupScrollUpButton();


// ─── TOOLTIPS ─────────────────────────────────────────────────────────────────
function setupTooltips() {

  const elements = document.querySelectorAll("[data-tooltip]");
  if (!elements.length) return;

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.style.cssText = "position:fixed;display:none;";
  document.body.appendChild(tooltip);

  elements.forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      tooltip.innerHTML = el.dataset.tooltip;
      tooltip.style.display = "block";
    });
    el.addEventListener("mousemove", function (e) {
      tooltip.style.left = (e.clientX + 12) + "px";
      tooltip.style.top  = (e.clientY + 12) + "px";
    });
    el.addEventListener("mouseleave", function () {
      tooltip.style.display = "none";
    });
  });

} setupTooltips();


// ─── MEMBER LIGHTBOX (popUpMembers → member-popup) ───────────────────────────
function setupMembersLightbox() {

  const members = [
    { img: "/assets/images/team-1.jpg", role: "Vocal",     name: "Ronald Hills", instagram: "#", x: "https://x.com/QodeInteractive", fb: "https://www.facebook.com/QodeInteractive/" },
    { img: "/assets/images/team-2.jpg", role: "Drums",     name: "John Rooms",   instagram: "#", x: "https://x.com/QodeInteractive", fb: "https://www.facebook.com/QodeInteractive/" },
    { img: "/assets/images/team-3.jpg", role: "Guitar",    name: "Sam Roover",   instagram: "#", x: "https://x.com/QodeInteractive", fb: "https://www.facebook.com/QodeInteractive/" },
    { img: "/assets/images/team-4.jpg", role: "Keyboards", name: "Jake Looney",  instagram: "#", x: "https://x.com/QodeInteractive", fb: "https://www.facebook.com/QodeInteractive/" }
  ];

  const memberPopup = document.querySelector(".member-popup");
  if (!memberPopup) return;

  const memberLightbox = document.createElement("div");
  memberLightbox.className = "member-lightbox";
  memberLightbox.style.display = "none";

  const lightboxContent = document.createElement("div");
  lightboxContent.className = "member-lightbox-content";

  const closeBtn = document.createElement("button");
  closeBtn.className = "member-close-btn";
  closeBtn.innerHTML = "X";

  const memberInfo = document.createElement("div");
  memberInfo.className = "member-info";

  lightboxContent.append(closeBtn, memberInfo);
  memberLightbox.appendChild(lightboxContent);
  memberPopup.appendChild(memberLightbox);

  const powDivs = [];

  members.forEach(function (member) {
    const img = document.createElement("img");
    img.src = member.img;
    img.dataset.tooltip = member.role;
    memberPopup.appendChild(img);

    const powDiv = document.createElement("div");
    powDiv.className = "member-info";
    powDiv.style.display = "none";

    const nameEl  = document.createElement("h3"); nameEl.innerHTML  = member.name;
    const roleEl  = document.createElement("p");  roleEl.innerHTML  = member.role;

    const instaLink = document.createElement("a"); instaLink.href = member.instagram; instaLink.target = "_blank"; instaLink.innerHTML = "📸";
    const xLink     = document.createElement("a"); xLink.href     = member.x;         xLink.target = "_blank";     xLink.innerHTML = "🐦";
    const fbLink    = document.createElement("a"); fbLink.href    = member.fb;        fbLink.target = "_blank";    fbLink.innerHTML = "f";

    powDiv.append(nameEl, roleEl, instaLink, xLink, fbLink);
    memberPopup.appendChild(powDiv);
    powDivs.push(powDiv);
  });

  const images = document.querySelectorAll(".member-popup img");

  images.forEach(function (img, i) {
    img.addEventListener("click", function () {
      memberInfo.innerHTML = "";
      const clone = powDivs[i].cloneNode(true);
      clone.style.display = "flex";
      memberInfo.appendChild(clone);
      memberLightbox.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", function () {
    memberLightbox.style.display = "none"; memberInfo.innerHTML = "";
  });

  memberLightbox.addEventListener("click", function (e) {
    if (e.target === memberLightbox) { memberLightbox.style.display = "none"; memberInfo.innerHTML = ""; }
  });

} setupMembersLightbox();


// ─── COLOR TOGGLE (colorToggle → color-toggle) ────────────────────────────────
function setupColorToggle() {

  const toggleBtn = document.querySelector(".color-toggle");
  const body = document.body;
  let lightInterval = null;
  let isAutoLight = false;

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", function () {
    if (!isAutoLight) {
      lightInterval = setInterval(function () { body.classList.toggle("light"); }, 2000);
      isAutoLight = true;
      toggleBtn.innerHTML = "Frenar cambio";
    } else {
      clearInterval(lightInterval);
      lightInterval = null;
      isAutoLight = false;
      toggleBtn.innerHTML = "Cambiar color";
    }
  });

} setupColorToggle();


// ─── EVENT PAGE (sweden section) ─────────────────────────────────────────────
function setupEvent() {

  const section = document.querySelector(".sweden");
  if (!section) return;

  const details = document.createElement("div");
  details.className = "event-details";

  const img = document.createElement("img");
  img.src = "assets/images/tour-single-1.jpg";
  img.setAttribute("data-tooltip", "I ❤️ David Bowie");

  const h2Details = document.createElement("h2");
  h2Details.innerHTML = "Details";

  const pDetails = document.createElement("p");
  pDetails.innerHTML =
    "Time: June 10, 2018 from 07 to 11pm<br>" +
    "Location: Stockholm, Sweden<br>" +
    "Website: http://www.bridge217.qodeinteractive.com<br>" +
    "Event Type: concert, tour<br>" +
    "Organized By: Mark Jones";

  const buyBtn = document.createElement("button");
  buyBtn.className = "buy-tickets-btn";
  buyBtn.innerHTML = "Buy tickets";

  details.append(img, h2Details, pDetails, buyBtn);

  const maus = document.createElement("div");
  maus.className = "maus";

  const iframe = document.createElement("iframe");
  iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d130266.40107923658!2d17.8419701!3d59.3260668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f763119640bcb%3A0xa80d27d3679d7766!2sStockholm%2C%20Suecia!5e0!3m2!1ses!2sar!4v0000000000000";
  iframe.width = "100%"; iframe.height = "410"; iframe.style.border = "0";
  iframe.allowFullscreen = true; iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";

  const h2Tour = document.createElement("h2"); h2Tour.innerHTML = "About Tour";
  const pTour  = document.createElement("p");  pTour.innerHTML  = "Lorem ipsum dolor sit amet, est ad graecis principes. Ad vis iisque saperet. Eu eos quod affert. Vim invidunt efficiendi ea, eu eos veniam percipit dignissim, an cum suas laudem. Eum eu ipsum mentitum delectus.";
  const h2Follow = document.createElement("h2"); h2Follow.innerHTML = "Follow And Share:";

  const links = [
    { href: "https://x.com/QodeInteractive", text: "🐦" },
    { href: "https://www.instagram.com/#",   text: "📸" },
    { href: "https://vimeo.com/",            text: "V" },
    { href: "https://www.tumblr.com/",       text: "t" },
    { href: "https://www.youtube.com/",      text: "▶" },
    { href: "https://www.facebook.com/",     text: "f" },
    { href: "https://ar.pinterest.com/",     text: "P" }
  ];

  maus.appendChild(h2Follow);
  links.forEach(function (l) {
    const a = document.createElement("a");
    a.href = l.href; a.target = "_blank"; a.innerHTML = l.text;
    maus.appendChild(a);
  });

  maus.insertBefore(iframe, maus.firstChild);
  maus.append(h2Tour, pTour);
  section.append(details, maus);

} setupEvent();


// ─── CAROUSEL (carruselcito → carousel) ──────────────────────────────────────
function setupCarousel() {

  const section = document.querySelector(".carousel");
  if (!section) return;

  const prevBtn = document.createElement("button");
  prevBtn.className = "carousel-prev-btn";
  prevBtn.innerHTML = "<";

  const track = document.createElement("div");
  track.className = "carousel-track";
  track.setAttribute("data-total", "6");

  const nextBtn = document.createElement("button");
  nextBtn.className = "carousel-next-btn";
  nextBtn.innerHTML = ">";

  section.append(prevBtn, track, nextBtn);

} setupCarousel();

function runCarousel() {

  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const images = [
    "/assets/images/album-1.jpg",  "/assets/images/album-2.jpg",
    "/assets/images/album-3.jpg",  "/assets/images/album-4.jpg",
    "/assets/images/album-5.jpg",  "/assets/images/album-6.jpg",
    "/assets/images/album-7.jpg",  "/assets/images/album-8.jpg",
    "/assets/images/album-9.jpg",  "/assets/images/album-10.jpg",
    "/assets/images/album-11.jpg", "/assets/images/album-12.jpg",
    "/assets/images/album-13.jpg", "/assets/images/album-14.jpg",
    "/assets/images/album-15.jpg"
  ];

  const total = Number(track.dataset.total);
  const used  = images.slice(0, total);
  const prevBtn = document.querySelector(".carousel-prev-btn");
  const nextBtn = document.querySelector(".carousel-next-btn");
  let idx = 0;
  const visible = 2;

  function render() {
    track.innerHTML = "";
    for (let i = 0; i < visible; i++) {
      const img = document.createElement("img");
      img.src = used[(idx + i) % used.length];
      track.appendChild(img);
    }
  }

  function advance()  { idx = (idx + visible) % used.length; render(); }
  function retreat()  { idx = (idx - visible + used.length) % used.length; render(); }

  if (nextBtn) nextBtn.addEventListener("click", advance);
  if (prevBtn) prevBtn.addEventListener("click", retreat);

  render();

} runCarousel();


// ─── DISCOGRAPHY PAGE (discos) ────────────────────────────────────────────────
function setupDiscographyPage() {

  const songContainer = document.querySelector(".discos");
  if (!songContainer) return;

  const albums = [
    { img: "album-1.jpg",  alt: "bedoo",         big: "Be-Doo",         small: "Caller" },
    { img: "album-2.jpg",  alt: "go-away",        big: "Free Spirit",    small: "Go Away" },
    { img: "album-3.jpg",  alt: "ritual-spirit",  big: "Depressed Days", small: "Ritual Spirit" },
    { img: "album-4.jpg",  alt: "love-hate",       big: "Wrong Motion",   small: "Love Hate" },
    { img: "album-5.jpg",  alt: "fallen",          big: "Lost Gravity",   small: "Fallen" },
    { img: "album-6.jpg",  alt: "hater",           big: "Road Killer",    small: "Hater" },
    { img: "album-7.jpg",  alt: "windows",         big: "The Minimalists",small: "Windows" },
    { img: "album-8.jpg",  alt: "blame",           big: "Philip Jax",     small: "Blame" },
    { img: "album-9.jpg",  alt: "firewall",        big: "Sadie Maxwell",  small: "Firewall" },
    { img: "album-10.jpg", alt: "joy",             big: "Bad Habits",     small: "Joy" },
    { img: "album-11.jpg", alt: "free-your-mind",  big: "Low Distance",   small: "Free Your Mind" },
    { img: "album-12.jpg", alt: "low-bass",        big: "Fast Track",     small: "Low Bass" },
    { img: "album-13.jpg", alt: "neon-dreams",     big: "Neonium",        small: "Neon Dreams" },
    { img: "album-14.jpg", alt: "velvet-nights",   big: "Blue Pistol",    small: "Velvet Nights" },
    { img: "album-15.jpg", alt: "lost-signal",     big: "Geo Werk",       small: "Lost Signal" },
    { img: "home3.jpg",    alt: "badday",          big: "Bad Hood",       small: "Bad Day" }
  ];

  const albumsPerRow = 4;
  let currentIndex = 0;

  function createRow() {
    const row = document.createElement("div");
    row.className = "song-row";

    for (let i = 0; i < albumsPerRow; i++) {
      if (currentIndex >= albums.length) break;

      const data = albums[currentIndex];
      const card = document.createElement("div");
      card.className = "album-card";

      const img = document.createElement("img");
      img.src = "assets/images/" + data.img;
      img.alt = data.alt;

      const bigTitle = document.createElement("h2");
      bigTitle.className = "album-name";
      bigTitle.style.cssText = "margin:0 0 3vh 0;text-transform:uppercase;font-family:'Oswald',sans-serif;font-weight:400;opacity:0;";
      bigTitle.innerHTML = data.big;

      const smallTitle = document.createElement("p");
      smallTitle.className = "track-name";
      smallTitle.style.opacity = "0";
      smallTitle.innerHTML = data.small;

      card.append(img, bigTitle, smallTitle);
      row.appendChild(card);
      currentIndex++;
    }

    songContainer.appendChild(row);
  }

  while (currentIndex < albums.length) createRow();

  function applyHoverEffects() {
    document.querySelectorAll(".album-card").forEach(function (item) {
      const big   = item.querySelector(".album-name");
      const small = item.querySelector(".track-name");
      const img   = item.querySelector("img");

      big.style.transition   = "opacity .3s ease,transform .3s ease";
      small.style.transition = "opacity .3s ease,transform .3s ease";
      big.style.transform    = "translateY(10px)";
      small.style.transform  = "translateY(10px)";

      item.addEventListener("mouseenter", function () {
        img.style.opacity = "0.5";
        big.style.opacity = "1"; big.style.transform   = "translateY(0)";
        small.style.opacity = "1"; small.style.transform = "translateY(0)";
      });

      item.addEventListener("mouseleave", function () {
        img.style.opacity = "1";
        big.style.opacity = "0"; big.style.transform   = "translateY(10px)";
        small.style.opacity = "0"; small.style.transform = "translateY(10px)";
      });
    });
  }

  applyHoverEffects();

} setupDiscographyPage();


// ─── ALBUM PAGE ───────────────────────────────────────────────────────────────
function setupAlbumLayout() {

  const section = document.querySelector(".album-layout");
  if (!section) return;

  const albumTracks = [
    { title: "Black Hole Sun",   file: "assets/audios/Black-hole-sun.mp3" },
    { title: "Work",             file: "assets/audios/Work.mp3" },
    { title: "Lullaby",         file: "assets/audios/Lullaby.mp3" },
    { title: "The Passenger",   file: "assets/audios/The-Passenger.mp3" },
    { title: "Celebrity Skin",  file: "assets/audios/Celebrity-Skin.mp3" },
    { title: "Creep",           file: "assets/audios/Creep.mp3" },
    { title: "Epic",            file: "assets/audios/Epic.mp3" },
    { title: "Reptilia",        file: "assets/audios/Reptilia.mp3" },
    { title: "Go With A Flow",  file: "assets/audios/Go-With-a-Flow.mp3" },
    { title: "Electric Version",file: "assets/audios/Electric-Version.mp3" }
  ];

  const audio = new Audio();
  let currentIndex = 0;

  const albumBox = document.createElement("div");
  albumBox.className = "album-songs-container";

  const albumImg = document.createElement("img");
  albumImg.className = "albumSlider";
  albumImg.src = "assets/images/album-19.jpg";
  albumBox.appendChild(albumImg);

  const slides = document.createElement("div");
  slides.className = "slides";
  const discoBack = document.createElement("div"); discoBack.className = "discoBack"; discoBack.innerHTML = "⏮";
  const discoNext = document.createElement("div"); discoNext.className = "discoNext"; discoNext.innerHTML = "⏭";
  slides.append(discoBack, discoNext);
  albumBox.appendChild(slides);

  const playerControls = document.createElement("div");
  playerControls.className = "player-controls";

  const albumBtnBack = document.createElement("div"); albumBtnBack.className = "album-btn-back"; albumBtnBack.innerHTML = "⏮";
  const albumBtnPlay = document.createElement("div"); albumBtnPlay.className = "album-btn-play"; albumBtnPlay.innerHTML = "▶";
  const albumBtnNext = document.createElement("div"); albumBtnNext.className = "album-btn-next"; albumBtnNext.innerHTML = "⏭";

  playerControls.append(albumBtnBack, albumBtnPlay, albumBtnNext);

  const syncContainer = document.createElement("div"); syncContainer.className = "sync-container";
  const syncBar = document.createElement("div");       syncBar.className = "sync-bar";
  syncContainer.appendChild(syncBar);
  albumBox.appendChild(playerControls);

  const songGap = document.createElement("div"); songGap.className = "song-gap";
  const mainSong = document.createElement("h3"); mainSong.innerHTML = albumTracks[0].title;
  const artist   = document.createElement("p");  artist.className = "open-album-lightbox"; artist.innerHTML = "Ouia Princess";
  songGap.append(syncContainer, mainSong, artist);
  albumBox.appendChild(songGap);

  const songsAlbum = document.createElement("div");
  songsAlbum.className = "songs-album";

  albumTracks.forEach(function (t, i) {
    const track = document.createElement("article");
    track.className = "track";

    const together = document.createElement("div"); together.className = "track-details";
    const num = document.createElement("p"); num.innerHTML = (i + 1) + ".";
    const tit = document.createElement("h4"); tit.innerHTML = t.title;
    together.append(num, tit);

    const buy = document.createElement("a"); buy.href = "#"; buy.innerHTML = "Buy Track";

    track.append(together, buy);
    songsAlbum.appendChild(track);

    track.addEventListener("click", function () { loadTrack(i); playTrack(); });
  });

  albumBox.appendChild(songsAlbum);

  const availableTitle = document.createElement("h2"); availableTitle.innerHTML = "Available On";
  const storeButtons = document.createElement("div"); storeButtons.className = "store-buttons";
  const itunes = document.createElement("img"); itunes.src = "assets/images/itunes.png";
  const google  = document.createElement("img"); google.src  = "assets/images/slider-img-3.png";
  storeButtons.append(itunes, google);
  albumBox.append(availableTitle, storeButtons);

  section.appendChild(albumBox);

  function loadTrack(index) {
    currentIndex = index;
    audio.src = albumTracks[index].file;
    mainSong.innerHTML = albumTracks[index].title;
  }

  function playTrack() { audio.play(); albumBtnPlay.innerHTML = "⏸"; }

  albumBtnPlay.addEventListener("click", function () {
    if (!audio.paused) { audio.pause(); albumBtnPlay.innerHTML = "▶"; }
    else { audio.play(); albumBtnPlay.innerHTML = "⏸"; }
  });

  albumBtnNext.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % albumTracks.length;
    loadTrack(currentIndex); playTrack();
  });

  albumBtnBack.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + albumTracks.length) % albumTracks.length;
    loadTrack(currentIndex); playTrack();
  });

  audio.addEventListener("ended", function () {
    currentIndex = (currentIndex + 1) % albumTracks.length;
    loadTrack(currentIndex); playTrack();
  });

  syncContainer.addEventListener("click", function (e) {
    const rect = syncContainer.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
  });

  loadTrack(0);

} setupAlbumLayout();


// ─── LYRICS (four-lyrics → lyrics-section) ───────────────────────────────────
function buildLyricsSection() {

  const section = document.querySelector(".lyrics-section");
  if (!section) return;

  const aboutTitle = document.createElement("h2"); aboutTitle.innerHTML = "About Album";
  const aboutText  = document.createElement("p");
  aboutText.innerHTML = "This is Photoshop's version of Lorem Ipsum. Proin gravida nibh vel velia uctor erecs aliquenean sollicitudiem quis bibendum auctor, nisi elit consequat ipsutis sem nibh idelit.";

  const aboutInfo = document.createElement("p");
  aboutInfo.innerHTML = "Artist: Ouia Princess<br>Label: Island<br>Release Date: April 29, 2018<br>People: Jack Jones, Madonna, Rout, DJ Sample<br>";

  section.append(aboutTitle, aboutText, aboutInfo);

  const lyricsTitle = document.createElement("h2"); lyricsTitle.innerHTML = "Available Lyrics";
  section.appendChild(lyricsTitle);

  const lyricsData = ["Black Hole Sun", "Work", "Lullaby", "The Passenger"];

  lyricsData.forEach(function (lyric, i) {
    const title = document.createElement("h4");
    title.className = "house";
    title.innerHTML = lyric;

    const text = document.createElement("p");
    text.className = "latin-text";
    text.style.display = i !== 0 ? "none" : "";
    text.innerHTML = "Lorem ipsum dolor sit amet,<br>ex rebum commodo aliquam sea,<br>perpetua mediocrem theophrastus vim ne,<br>per facete voluptatum no.<br>Eum no aeque legendos mnesarchum.";

    section.append(title, text);
  });

  const reviews = document.createElement("div"); reviews.className = "reviews";
  const reviewsTitle = document.createElement("h2"); reviewsTitle.innerHTML = "Album Reviews";
  const reviewText   = document.createElement("p"); reviewText.className = "review-text";
  const reviewAuthor = document.createElement("p"); reviewAuthor.className = "review-author";
  reviews.append(reviewsTitle, reviewText, reviewAuthor);
  section.appendChild(reviews);

  const reviewNav = document.createElement("div"); reviewNav.className = "review-nav";
  const prevBtn = document.createElement("button"); prevBtn.className = "prev-btn"; prevBtn.innerHTML = "<";
  const nextBtn = document.createElement("button"); nextBtn.className = "next-btn"; nextBtn.innerHTML = ">";
  reviewNav.append(prevBtn, nextBtn);
  section.appendChild(reviewNav);

} buildLyricsSection();

function setupLyricsTabs() {

  const section = document.querySelector(".lyrics-section");
  if (!section) return;

  const titles = section.querySelectorAll("h4.house");
  if (!titles.length) return;

  titles.forEach(function (title) {
    title.addEventListener("click", function () {
      section.querySelectorAll("h4.house + p").forEach(function (p) { p.style.display = "none"; });
      const p = title.nextElementSibling;
      if (p && p.tagName === "P") p.style.display = "flex";
    });
  });

} setupLyricsTabs();

function setupReviewsSlider() {

  const textEl   = document.querySelector(".review-text");
  const authorEl = document.querySelector(".review-author");
  const prevBtn  = document.querySelector(".prev-btn");
  const nextBtn  = document.querySelector(".next-btn");

  if (!textEl || !authorEl || !prevBtn || !nextBtn) return;

  const reviews = [
    { text: "<< Lorem ipsum dolor sit amet, est ad graecis principes. Ad visers iisque saperet. Eu eos quod affert. Vim invidunt efficiendi eaers eu eos veniam percipit dignissim. >>", author: "- Rolling Stone Magazine" },
    { text: "<< Vim invidunt efficiendi eaers eu eos veniam percipit dignissim, an cum suas laudem. Divi ipsum dolor sit amet, est ad graecis principes. Ad visers iisque saperet. >>",  author: "- Nylon Magazine" }
  ];

  let currentIndex = 0;
  let interval;

  function showReview(i) { textEl.innerHTML = reviews[i].text; authorEl.innerHTML = reviews[i].author; }

  function nextReview() { currentIndex = (currentIndex + 1) % reviews.length; showReview(currentIndex); }
  function prevReview() { currentIndex = (currentIndex - 1 + reviews.length) % reviews.length; showReview(currentIndex); }

  function reiniciarIntervalo() { clearInterval(interval); interval = setInterval(nextReview, 5000); }

  nextBtn.addEventListener("click", function () { nextReview(); reiniciarIntervalo(); });
  prevBtn.addEventListener("click", function () { prevReview(); reiniciarIntervalo(); });

  showReview(currentIndex);
  reiniciarIntervalo();

} setupReviewsSlider();


// ─── CONTACT FORM (contact-sonny → contact-section) ──────────────────────────
function setupContactForm() {

  const container = document.querySelector(".contact-section");
  if (!container) return;

  const form = document.querySelector(".contact-form-wrapper");

  const nameInput    = document.createElement("input"); nameInput.className    = "text";    nameInput.placeholder = "Your Name*";
  const emailInput   = document.createElement("input"); emailInput.className   = "email";   emailInput.placeholder = "Your Email*";
  const messageInput = document.createElement("input"); messageInput.className = "message"; messageInput.placeholder = "Your Message*";

  const accessDenied  = document.createElement("div"); accessDenied.className  = "form-message access-denied";
  const errorText     = document.createElement("p");   errorText.className     = "error-text"; errorText.innerHTML = "The field is required.";
  const warningBox    = document.createElement("div"); warningBox.className    = "warning-box";
  const warningText   = document.createElement("p");   warningText.innerHTML   = "! One or more fields have an error. Please check and try again.";
  warningBox.appendChild(warningText);
  accessDenied.append(errorText, warningBox);

  const accessGranted = document.createElement("div"); accessGranted.className = "form-message access-granted";
  const successText   = document.createElement("p");   successText.className   = "success-box"; successText.innerHTML = "👍 Thank you for your message. It has been sent.";
  accessGranted.appendChild(successText);

  const button = document.createElement("button");
  button.className = "send-btn";
  button.type = "submit";
  button.innerHTML = "Send Message";

  form.append(nameInput, emailInput, messageInput, accessDenied, accessGranted, button);
  container.appendChild(form);

}

function setupFormValidation() {

  const form         = document.querySelector(".contact-form-wrapper");
  const nameField    = document.querySelector(".text");
  const emailField   = document.querySelector(".email");
  const messageField = document.querySelector(".message");
  const accessGranted = document.querySelector(".access-granted");
  const accessDenied  = document.querySelector(".access-denied");

  if (!form || !nameField || !emailField || !messageField || !accessGranted || !accessDenied) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    accessGranted.style.display = "none";
    accessDenied.style.display  = "none";

    const name    = nameField.value.replace(/^\s+|\s+$/g, "");
    const email   = emailField.value.replace(/^\s+|\s+$/g, "");
    const message = messageField.value.replace(/^\s+|\s+$/g, "");
    const valid   = name && email && message && email.includes("@") && email.includes(".");

    if (valid) {
      accessGranted.style.display = "flex";
      nameField.value    = "";
      emailField.value   = "";
      messageField.value = "";
    }
    else { accessDenied.style.display = "flex"; }
  });

}

setupContactForm();
setupFormValidation();

});