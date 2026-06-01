document.addEventListener('DOMContentLoaded', function () {

    /* ================================================================
       DATOS GLOBALES
    ================================================================ */
    const TRACKS = [
        { title: 'Black Hole Sun',   dur: '0:32', audio: 'assets/audios/Black-hole-sun.mp3',   video: 'https://player.vimeo.com/video/33730560?autoplay=1' },
        { title: 'Work',             dur: '0:27', audio: 'assets/audios/Work.mp3',             video: 'https://player.vimeo.com/video/33730560?autoplay=1' },
        { title: 'Lullaby',         dur: '0:30', audio: 'assets/audios/Lullaby.mp3',          video: 'https://player.vimeo.com/video/33730560?autoplay=1' },
        { title: 'The Passenger',   dur: '0:30', audio: 'assets/audios/The-Passanger.mp3',    video: 'https://player.vimeo.com/video/33730560?autoplay=1' },
        { title: 'Celebrity Skin',  dur: '0:32', audio: 'assets/audios/Celebrity-Skin.mp3',   video: 'https://player.vimeo.com/video/33730560?autoplay=1' },
        { title: 'Creep',           dur: '0:30', audio: 'assets/audios/Creep.mp3',            video: 'https://player.vimeo.com/video/33730560?autoplay=1' },
        { title: 'Epic',            dur: '0:30', audio: 'assets/audios/Epic.mp3',             video: 'https://player.vimeo.com/video/33730560?autoplay=1' },
        { title: 'Reptilia',        dur: '0:30', audio: 'assets/audios/Reptilia.mp3',         video: 'https://player.vimeo.com/video/33730560?autoplay=1' },
        { title: 'Go With A Flow',  dur: '0:30', audio: 'assets/audios/Go-With-a-Flow.mp3',   video: 'https://player.vimeo.com/video/33730560?autoplay=1' },
        { title: 'Electric Version',dur: '0:31', audio: 'assets/audios/Electric-version.mp3', video: 'https://player.vimeo.com/video/33730560?autoplay=1' }
    ];

    /* ================================================================
       HELPER
    ================================================================ */
    function fmt(s) {
        const m   = Math.floor(s / 60);
        const sec = String(Math.floor(s % 60)).padStart(2, '0');
        return m + ':' + sec;
    }

    /* ================================================================
       PLAYER BAR
    ================================================================ */
    const audio      = document.getElementById('main-audio');
    const playBtn    = document.getElementById('btn-play');
    const prevBtn    = document.getElementById('btn-prev');
    const nextBtn    = document.getElementById('btn-next');
    const progFill   = document.getElementById('progress-fill');
    const progTrack  = document.getElementById('progress-track');
    const timeEl     = document.getElementById('player-time');
    const titleEl    = document.getElementById('player-title');

    let currentIdx = 0;

    function loadTrack(idx) {
        currentIdx     = idx;
        audio.src      = TRACKS[idx].audio;
        titleEl.textContent = TRACKS[idx].title;
    }

    function setPlayIcon(playing) {
        playBtn.innerHTML = playing
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
    }

    function togglePlay() {
        if (audio.paused) { audio.play(); setPlayIcon(true); }
        else              { audio.pause(); setPlayIcon(false); }
    }

    audio.addEventListener('timeupdate', function () {
        if (!audio.duration) return;
        progFill.style.width  = (audio.currentTime / audio.duration * 100) + '%';
        timeEl.textContent    = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
    });

    progTrack.addEventListener('click', function (e) {
        if (!audio.duration) return;
        const rect       = progTrack.getBoundingClientRect();
        audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    });

    audio.addEventListener('ended', function () {
        currentIdx = (currentIdx + 1) % TRACKS.length;
        loadTrack(currentIdx);
        audio.play();
        setPlayIcon(true);
    });

    playBtn.addEventListener('click', togglePlay);

    nextBtn.addEventListener('click', function () {
        currentIdx = (currentIdx + 1) % TRACKS.length;
        loadTrack(currentIdx);
        audio.play();
        setPlayIcon(true);
    });

    prevBtn.addEventListener('click', function () {
        currentIdx = (currentIdx - 1 + TRACKS.length) % TRACKS.length;
        loadTrack(currentIdx);
        audio.play();
        setPlayIcon(true);
    });

    loadTrack(0);

    /* ================================================================
       TRACK LIST
    ================================================================ */
    const trackListEl  = document.getElementById('track-list');
    const modalVideo   = document.getElementById('modal-video');
    const videoFrame   = document.getElementById('video-frame');
    const modalClose   = document.getElementById('modal-video-close');
    const trackAudio   = new Audio();
    let   activeTrackIdx = null;

    TRACKS.forEach(function (t, i) {
        const item = document.createElement('div');
        item.className = 'track-item';
        item.innerHTML =
            '<span class="track-num">' + (i + 1) + '.</span>' +
            '<span class="track-name">' + t.title + '</span>' +
            '<span class="track-dur">'  + t.dur   + '</span>' +
            '<span class="track-actions">' +
                '<button class="ta-play"  aria-label="Reproducir audio"><i class="fas fa-play"></i></button>' +
                '<button class="ta-video" aria-label="Ver video"><i class="fas fa-video"></i></button>' +
            '</span>';

        const btnAudio = item.querySelector('.ta-play');
        const btnVideo = item.querySelector('.ta-video');

        btnAudio.addEventListener('click', function () {
            if (activeTrackIdx === i && !trackAudio.paused) {
                trackAudio.pause();
                btnAudio.innerHTML  = '<i class="fas fa-play"></i>';
                activeTrackIdx      = null;
                return;
            }
            /* Resetear todos los botones */
            document.querySelectorAll('.ta-play').forEach(function (b) {
                b.innerHTML = '<i class="fas fa-play"></i>';
            });
            trackAudio.src   = t.audio;
            trackAudio.play();
            btnAudio.innerHTML = '<i class="fas fa-pause"></i>';
            activeTrackIdx     = i;
        });

        btnVideo.addEventListener('click', function () {
            videoFrame.src = t.video;
            modalVideo.classList.add('active');
        });

        trackListEl.appendChild(item);
    });

    trackAudio.addEventListener('ended', function () {
        document.querySelectorAll('.ta-play').forEach(function (b) {
            b.innerHTML = '<i class="fas fa-play"></i>';
        });
        activeTrackIdx = null;
    });

    function closeModalVideo() {
        modalVideo.classList.remove('active');
        videoFrame.src = '';
    }

    modalClose.addEventListener('click', closeModalVideo);
    modalVideo.addEventListener('click', function (e) {
        if (e.target === modalVideo) closeModalVideo();
    });

    /* ================================================================
       GALLERY + LIGHTBOX
    ================================================================ */
    const galleryEl = document.getElementById('gallery-grid');
    const IMAGES = [
        'assets/images/h1-img-1.jpg',
        'assets/images/h1-img-2.jpg',
        'assets/images/h1-img-3.jpg',
        'assets/images/h1-img-4.jpg',
        'assets/images/h1-img-5.jpg',
        'assets/images/h1-img-6.jpg'
    ];

    const lightbox  = document.getElementById('img-lightbox');
    const lbImg     = document.getElementById('lb-img');
    const lbClose   = document.getElementById('lb-close');
    const lbPrev    = document.getElementById('lb-prev');
    const lbNext    = document.getElementById('lb-next');
    const lbCounter = document.getElementById('lb-counter');
    let   lbIdx     = 0;

    IMAGES.forEach(function (src, i) {
        const img = document.createElement('img');
        img.src   = src;
        img.alt   = 'Gallery image ' + (i + 1);
        img.addEventListener('click', function () { openLb(i); });
        galleryEl.appendChild(img);
    });

    function openLb(i) {
        lbIdx               = i;
        lbImg.src           = IMAGES[i];
        lbCounter.textContent = (i + 1) + ' / ' + IMAGES.length;
        lightbox.classList.add('active');
    }

    lbClose.addEventListener('click', function () { lightbox.classList.remove('active'); });
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });
    lbNext.addEventListener('click', function () { openLb((lbIdx + 1) % IMAGES.length); });
    lbPrev.addEventListener('click', function () { openLb((lbIdx - 1 + IMAGES.length) % IMAGES.length); });

    /* ================================================================
       TOUR DATES
    ================================================================ */
    const DATES = [
        { day: '10', month: 'Jun', dayName: 'Sun', place: 'Gärdet Open Air Stockholm – Sweden',  link: 'event.html' },
        { day: '12', month: 'Jun', dayName: 'Tue', place: 'Helsinki, Finland – Hartwall Arena',   link: 'event.html' },
        { day: '14', month: 'Jun', dayName: 'Thu', place: 'Riga, Latvia – Riga Arena',            link: 'event.html' },
        { day: '15', month: 'Jun', dayName: 'Fri', place: 'Kaunas, Lithuania – Žalgirio Arena',   link: 'event.html' },
        { day: '18', month: 'Jun', dayName: 'Mon', place: 'Moscow, Russia – Olimpiski',           link: 'event.html' },
        { day: '19', month: 'Jun', dayName: 'Tue', place: 'Pilton, England – Glastonbury',        link: 'event.html' },
        { day: '22', month: 'Jun', dayName: 'Fri', place: 'London, England – O2 Arena',           link: 'event.html' },
        { day: '27', month: 'Jun', dayName: 'Wed', place: 'Rome, Italy – Cola Arena',             link: 'event.html' },
        { day: '29', month: 'Jun', dayName: 'Fri', place: 'Athens, Greece – PAOK Stadium',        link: 'event.html' },
        { day: '03', month: 'Jul', dayName: 'Tue', place: 'Budapest, Hungary – Nagy Arena',       link: 'event.html' }
    ];

    const datesList  = document.getElementById('dates-list');
    const viewAllBtn = document.getElementById('view-all-btn');
    const VISIBLE    = 6;
    let   extraShown = false;
    const extraEls   = [];

    DATES.forEach(function (d, i) {
        const li = document.createElement('li');
        li.className = 'date-item';
        li.innerHTML =
            '<div class="date-block">' +
                '<span class="date-num">'   + d.day     + '</span>' +
                '<span class="date-label">' + d.month + '<br>' + d.dayName + '</span>' +
            '</div>' +
            '<div class="date-venue"><a href="' + d.link + '">' + d.place + '</a></div>' +
            '<a href="#" class="buy-ticket-link">Buy Tickets</a>';

        if (i < VISIBLE) {
            datesList.appendChild(li);
        } else {
            li.style.display = 'none';
            datesList.appendChild(li);
            extraEls.push(li);
        }
    });

    viewAllBtn.addEventListener('click', function () {
        if (!extraShown) {
            extraEls.forEach(function (li) { li.style.display = ''; });
            viewAllBtn.textContent = 'Show Less';
            extraShown = true;
        } else {
            extraEls.forEach(function (li) { li.style.display = 'none'; });
            viewAllBtn.textContent = 'View All';
            extraShown = false;
        }
    });

    /* ================================================================
       BLOG POSTS
    ================================================================ */
    const POSTS = [
        { img: 'assets/images/blog-post-1.jpg', title: 'The Best Night In Baltimore', date: '10 April, 2018', link: '#' },
        { img: 'assets/images/blog-post-2.jpg', title: 'The Best Night In Detroit',   date: '10 April, 2018', link: '#' },
        { img: 'assets/images/blog-post-3.jpg', title: 'The Best Night In New York',  date: '10 April, 2018', link: '#' }
    ];

    const postsGrid = document.getElementById('posts-grid');

    POSTS.forEach(function (p) {
        const art = document.createElement('article');
        art.className = 'blog-post';
        art.innerHTML =
            '<img src="' + p.img + '" alt="' + p.title + '">' +
            '<p class="blog-post-title"><a href="' + p.link + '">' + p.title + '</a></p>' +
            '<p class="blog-post-date">' + p.date + '</p>';
        postsGrid.appendChild(art);
    });

    /* ================================================================
       VIDEO SECTION
    ================================================================ */
    const videoPlayBtn  = document.getElementById('video-play-btn');
    const videoLightbox = document.getElementById('video-lightbox');
    const videoClose    = document.getElementById('video-close');
    const mainVideo     = document.getElementById('main-video');

    videoPlayBtn.addEventListener('click', function () {
        videoLightbox.classList.add('active');
        mainVideo.play();
    });

    function closeVideoLightbox() {
        videoLightbox.classList.remove('active');
        mainVideo.pause();
        mainVideo.currentTime = 0;
    }

    videoClose.addEventListener('click', closeVideoLightbox);
    videoLightbox.addEventListener('click', function (e) {
        if (e.target === videoLightbox) closeVideoLightbox();
    });

    /* ================================================================
       DISCOGRAPHY
    ================================================================ */
    const ALBUMS = [
        { img: 'assets/images/album-1.jpg', title: 'Be-Doo',          sub: 'Caller' },
        { img: 'assets/images/album-2.jpg', title: 'Free Spirit',     sub: 'Go Away' },
        { img: 'assets/images/album-3.jpg', title: 'Depressed Days',  sub: 'Ritual Spirit' },
        { img: 'assets/images/album-4.jpg', title: 'Wrong Motion',    sub: 'Love Hate' },
        { img: 'assets/images/album-5.jpg', title: 'Lost Gravity',    sub: 'Fallen' },
        { img: 'assets/images/album-6.jpg', title: 'Road Killer',     sub: 'Hater' },
        { img: 'assets/images/album-7.jpg', title: 'The Minimalists', sub: 'Windows' },
        { img: 'assets/images/album-8.jpg', title: 'Philip Jax',      sub: 'Blame' }
    ];

    const discoGrid    = document.getElementById('disco-grid');
    const discoMoreBtn = document.getElementById('disco-show-more');
    let   discoShown   = 0;
    const DISCO_STEP   = 4;

    function renderDiscoCard(album) {
        const card = document.createElement('div');
        card.className = 'disco-card';
        card.innerHTML =
            '<img src="' + album.img + '" alt="' + album.title + '">' +
            '<div class="disco-overlay">' +
                '<h3>' + album.title + '</h3>' +
                '<p>'  + album.sub   + '</p>' +
            '</div>';
        discoGrid.appendChild(card);
    }

    function loadDiscoRow() {
        const slice = ALBUMS.slice(discoShown, discoShown + DISCO_STEP);
        slice.forEach(renderDiscoCard);
        discoShown += slice.length;
        if (discoShown >= ALBUMS.length) discoMoreBtn.style.display = 'none';
    }

    loadDiscoRow(); /* Primera fila al cargar */

    discoMoreBtn.addEventListener('click', loadDiscoRow);

    /* ================================================================
       SCROLL TO TOP
    ================================================================ */
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', function () {
        scrollTopBtn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

}); 