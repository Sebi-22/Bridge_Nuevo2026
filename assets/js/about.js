document.addEventListener('DOMContentLoaded', function() {

    // ─── ABOUT US — INTEGRANTES ────────────────────────
    const integrantes = [
        { imagen: '../assets/images/team-1.jpg', nombre: 'John Smith', rol: 'Vocals' },
        { imagen: '../assets/images/team-2.jpg', nombre: 'Josh Roon',  rol: 'Drums' },
        { imagen: '../assets/images/team-3.jpg', nombre: 'Mark Jones', rol: 'Guitar' },
        { imagen: '../assets/images/team-4.jpg', nombre: 'Alex Brown', rol: 'Keyboard' }
    ];

    const contenedor = document.querySelector('.popUpMembers');

    if (contenedor) {
        integrantes.forEach(function(integrante) {
            const card = document.createElement('div');
            card.classList.add('member');

            card.innerHTML =
                '<img src="' + integrante.imagen + '" alt="' + integrante.nombre + '">' +
                '<div class="member-info">' +
                    '<h3>' + integrante.nombre + '</h3>' +
                    '<span>' + integrante.rol + '</span>' +
                    '<div class="socials">' +
                        '<a href="#"><i class="fab fa-instagram"></i></a>' +
                        '<a href="#"><i class="fab fa-twitter"></i></a>' +
                        '<a href="#"><i class="fab fa-facebook-f"></i></a>' +
                    '</div>' +
                '</div>';

            contenedor.appendChild(card);
        });
    }

    // ─── DISCOGRAPHY (preview, 4 + show more) ──────────
    const datosAlbumes = [
        { imagen: '../assets/images/album-1.jpg',  titulo: 'Be-Doo',          subtitulo: 'Caller' },
        { imagen: '../assets/images/album-2.jpg',  titulo: 'Free Spirit',     subtitulo: 'Go Away' },
        { imagen: '../assets/images/album-3.jpg',  titulo: 'Depressed Days',  subtitulo: 'Ritual Spirit' },
        { imagen: '../assets/images/album-4.jpg',  titulo: 'Wrong Motion',    subtitulo: 'Love Hate' },
        { imagen: '../assets/images/album-5.jpg',  titulo: 'Lost Gravity',    subtitulo: 'Fallen' },
        { imagen: '../assets/images/album-6.jpg',  titulo: 'Road Killer',     subtitulo: 'Hater' },
        { imagen: '../assets/images/album-7.jpg',  titulo: 'The Minimalists', subtitulo: 'Windows' },
        { imagen: '../assets/images/album-8.jpg',  titulo: 'Philip Jax',      subtitulo: 'Blame' },
        { imagen: '../assets/images/album-9.jpg',  titulo: 'Bad Habits',      subtitulo: 'Joy' },
        { imagen: '../assets/images/album-10.jpg', titulo: 'Low Distance',    subtitulo: 'Free Your Mind' },
        { imagen: '../assets/images/album-11.jpg', titulo: 'Fast Track',      subtitulo: 'Low Bass' },
        { imagen: '../assets/images/album-12.jpg', titulo: 'Neonium',         subtitulo: 'Neon Dreams' }
    ];

    const discoGrilla = document.getElementById('disco-grilla');
    const discoBotonMas = document.getElementById('disco-boton-mas');
    let albumesMostrados = 0;
    const paso = 4;

    function mostrarAlbumes() {
        for (let i = 0; i < paso; i++) {
            let indice = albumesMostrados % datosAlbumes.length;

            let card = document.createElement('div');
            card.className = 'disco-card';

            let imagen = document.createElement('img');
            imagen.src = datosAlbumes[indice].imagen;
            imagen.alt = datosAlbumes[indice].titulo;

            let overlay = document.createElement('div');
            overlay.className = 'disco-overlay';

            let titulo = document.createElement('h3');
            titulo.textContent = datosAlbumes[indice].titulo;

            let subtitulo = document.createElement('p');
            subtitulo.textContent = datosAlbumes[indice].subtitulo;

            overlay.appendChild(titulo);
            overlay.appendChild(subtitulo);
            card.appendChild(imagen);
            card.appendChild(overlay);
            discoGrilla.appendChild(card);

            albumesMostrados = albumesMostrados + 1;
        }
    }

    if (discoGrilla) {
        mostrarAlbumes();
        if (discoBotonMas) {
            discoBotonMas.addEventListener('click', mostrarAlbumes);
        }
    }

    // ─── SCROLL TO TOP ───────────────────────────────────
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