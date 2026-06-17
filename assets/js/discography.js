document.addEventListener('DOMContentLoaded', function() {

    // ─── ALBUMES ──────────────────────────────────────────
    const datosAlbumes = [
        { imagen: '../assets/images/album-1.jpg',  titulo: 'Be-Doo',          subtitulo: 'Caller' },
        { imagen: '../assets/images/album-2.jpg',  titulo: 'Free Spirit',     subtitulo: 'Go Away' },
        { imagen: '../assets/images/album-3.jpg',  titulo: 'Depressed Days',  subtitulo: 'Ritual Spirit' },
        { imagen: '../assets/images/album-4.jpg',  titulo: 'Wrong Motion',    subtitulo: 'Love Hate' },
        { imagen: '../assets/images/album-5.jpg',  titulo: 'Lost Gravity',    subtitulo: 'Fallen' },
        { imagen: '../assets/images/album-6.jpg',  titulo: 'Road Killer',     subtitulo: 'Hater' },
        { imagen: '../assets/images/album-7.jpg',  titulo: 'The Minimalists', subtitulo: 'Windows' },
        { imagen: '../assets/images/album-8.jpg',  titulo: 'Philip Jax',      subtitulo: 'Blame' },
        { imagen: '../assets/images/album-9.jpg',  titulo: 'Sadie Maxwell',   subtitulo: 'Firewall' },
        { imagen: '../assets/images/album-10.jpg', titulo: 'Bad Habits',      subtitulo: 'Joy' },
        { imagen: '../assets/images/album-11.jpg', titulo: 'Low Distance',    subtitulo: 'Free Your Mind' },
        { imagen: '../assets/images/album-12.jpg', titulo: 'Fast Track',      subtitulo: 'Low Bass' },
        { imagen: '../assets/images/album-13.jpg', titulo: 'Neonium',         subtitulo: 'Neon Dreams' },
        { imagen: '../assets/images/album-14.jpg', titulo: 'Blue Pistol',     subtitulo: 'Velvet Nights' },
        { imagen: '../assets/images/album-15.jpg', titulo: 'Geo Werk',        subtitulo: 'Green Greed' },
        { imagen: '../assets/images/album-16-150x150.jpg', titulo: 'Bad Hood', subtitulo: 'Bad Day' }
    ];

    // ─── AGARRAR EL CONTENEDOR ────────────────────────────
    const discoGrilla = document.getElementById('disco-grilla');

    // ─── RENDERIZAR TODOS LOS ALBUMES DE UNA VEZ ──────────
    if (discoGrilla) {
        for (let i = 0; i < datosAlbumes.length; i++) {

            let card = document.createElement('div');
            card.className = 'disco-card';

            let imagen = document.createElement('img');
            imagen.src = datosAlbumes[i].imagen;
            imagen.alt = datosAlbumes[i].titulo;

            let overlay = document.createElement('div');
            overlay.className = 'disco-overlay';

            let titulo = document.createElement('h3');
            titulo.textContent = datosAlbumes[i].titulo;

            let subtitulo = document.createElement('p');
            subtitulo.textContent = datosAlbumes[i].subtitulo;

            overlay.appendChild(titulo);
            overlay.appendChild(subtitulo);

            card.appendChild(imagen);
            card.appendChild(overlay);

            discoGrilla.appendChild(card);
        }
    }

    // ─── SCROLL TO TOP ────────────────────────────────────
    const scrollBtn = document.getElementById('scroll-top');

    if (scrollBtn) {
        window.addEventListener('scroll', function() {
            scrollBtn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
        });

        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});