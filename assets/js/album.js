document.addEventListener('DOMContentLoaded', function() {
    // ─── CANCIONES ───────────────────────────────────────
    const canciones = [
        { titulo: 'Black Hole Sun',   audio: '../assets/audios/Black-hole-sun.mp3' },
        { titulo: 'Work',             audio: '../assets/audios/Work.mp3' },
        { titulo: 'Lullaby',          audio: '../assets/audios/Lullaby.mp3' },
        { titulo: 'The Passenger',    audio: '../assets/audios/The-Passanger.mp3' },
        { titulo: 'Celebrity Skin',   audio: '../assets/audios/Celebrity-Skin.mp3' },
        { titulo: 'Creep',            audio: '../assets/audios/Creep.mp3' },
        { titulo: 'Epic',             audio: '../assets/audios/Epic.mp3' },
        { titulo: 'Reptilia',         audio: '../assets/audios/Reptilia.mp3' },
        { titulo: 'Go With A Flow',   audio: '../assets/audios/Go-With-a-Flow.mp3' },
        { titulo: 'Electric Version', audio: '../assets/audios/Electric-version.mp3' }
    ];

    let cancionActual = 0;
    let audio = new Audio();
    audio.src = canciones[0].audio;

    // ─── CONTROLES ───────────────────────────────────────
    const contenedorControles = document.getElementById('album-controles');

    let botonAnterior = document.createElement('button');
    botonAnterior.innerHTML = '<i class="fas fa-step-backward"></i>';

    let botonPlay = document.createElement('button');
    botonPlay.innerHTML = '<i class="fas fa-play"></i>';

    let botonSiguiente = document.createElement('button');
    botonSiguiente.innerHTML = '<i class="fas fa-step-forward"></i>';

    contenedorControles.appendChild(botonAnterior);
    contenedorControles.appendChild(botonPlay);
    contenedorControles.appendChild(botonSiguiente);

    // ─── BARRA DE PROGRESO ───────────────────────────────
    const progresoTrack = document.getElementById('album-progreso-track');
    const progresoFill  = document.getElementById('album-progreso-fill');

    // ─── INFO CANCION ACTUAL ─────────────────────────────
    const cancionInfo = document.getElementById('album-cancion-info');

    let infoTitulo = document.createElement('div');
    infoTitulo.className = 'info-titulo';
    infoTitulo.textContent = canciones[0].titulo;

    let infoArtista = document.createElement('div');
    infoArtista.className = 'info-artista';
    infoArtista.textContent = 'Ouia Princess';

    cancionInfo.appendChild(infoTitulo);
    cancionInfo.appendChild(infoArtista);

    // ─── CUANDO APRIETAN PLAY ────────────────────────────
    botonPlay.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            botonPlay.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // ─── CUANDO APRIETAN SIGUIENTE ───────────────────────
    botonSiguiente.addEventListener('click', function() {
        cancionActual = cancionActual + 1;
        if (cancionActual >= canciones.length) {
            cancionActual = 0;
        }
        audio.src = canciones[cancionActual].audio;
        audio.play();
        botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
        infoTitulo.textContent = canciones[cancionActual].titulo;
    });

    // ─── CUANDO APRIETAN ANTERIOR ────────────────────────
    botonAnterior.addEventListener('click', function() {
        cancionActual = cancionActual - 1;
        if (cancionActual < 0) {
            cancionActual = canciones.length - 1;
        }
        audio.src = canciones[cancionActual].audio;
        audio.play();
        botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
        infoTitulo.textContent = canciones[cancionActual].titulo;
    });

    // ─── ACTUALIZAR BARRA MIENTRAS SUENA ─────────────────
    audio.addEventListener('timeupdate', function() {
        if (audio.duration) {
            let porcentaje = (audio.currentTime / audio.duration) * 100;
            progresoFill.style.width = porcentaje + '%';
        }
    });

    // ─── CLIC EN LA BARRA PARA SALTAR ────────────────────
    progresoTrack.addEventListener('click', function(e) {
        if (audio.duration) {
            let rect = progresoTrack.getBoundingClientRect();
            let posicion = e.clientX - rect.left;
            let porcentaje = posicion / rect.width;
            audio.currentTime = porcentaje * audio.duration;
        }
    });

    // ─── CUANDO TERMINA PASA A LA SIGUIENTE ──────────────
    audio.addEventListener('ended', function() {
        cancionActual = cancionActual + 1;
        if (cancionActual >= canciones.length) {
            cancionActual = 0;
        }
        audio.src = canciones[cancionActual].audio;
        audio.play();
        infoTitulo.textContent = canciones[cancionActual].titulo;
    });

    // ─── TRACKLIST ───────────────────────────────────────
    const tracklist = document.getElementById('album-tracklist');

    let titulo = document.createElement('h3');
    titulo.textContent = 'Tracklist';
    tracklist.appendChild(titulo);

    for (let i = 0; i < canciones.length; i++) {

        let fila = document.createElement('div');
        fila.className = 'track-fila';

        let numero = document.createElement('span');
        numero.className = 'track-fila-numero';
        numero.textContent = (i + 1) + '.';

        let nombreCancion = document.createElement('span');
        nombreCancion.className = 'track-fila-titulo';
        nombreCancion.textContent = canciones[i].titulo;

        let comprar = document.createElement('a');
        comprar.className = 'track-fila-comprar';
        comprar.href = '#';
        comprar.textContent = 'buy track';

        fila.appendChild(numero);
        fila.appendChild(nombreCancion);
        fila.appendChild(comprar);

        // Al hacer clic en la fila reproduce esa cancion
        fila.addEventListener('click', function() {
            cancionActual = i;
            audio.src = canciones[i].audio;
            audio.play();
            botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
            infoTitulo.textContent = canciones[i].titulo;
        });

        tracklist.appendChild(fila);
    }

    // ─── LYRICS ACORDEON ─────────────────────────────────
    const letras = [
        {
            titulo: 'Black Hole Sun',
            letra: 'Lorem ipsum dolor sit amet,\nex rebum commodo aliquam sea,\nperpetua mediocrem theophrastus vim ne,\nper facete voluptatum no.\nEum no aeque legendos mnesarchum.'
        },
        {
            titulo: 'Work',
            letra: 'Lorem ipsum dolor sit amet,\nex rebum commodo aliquam sea,\nperpetua mediocrem theophrastus vim ne,\nper facete voluptatum no.\nEum no aeque legendos mnesarchum.'
        },
        {
            titulo: 'Lullaby',
            letra: 'Lorem ipsum dolor sit amet,\nex rebum commodo aliquam sea,\nperpetua mediocrem theophrastus vim ne,\nper facete voluptatum no.\nEum no aeque legendos mnesarchum.'
        },
        {
            titulo: 'The Passenger',
            letra: 'Lorem ipsum dolor sit amet,\nex rebum commodo aliquam sea,\nperpetua mediocrem theophrastus vim ne,\nper facete voluptatum no.\nEum no aeque legendos mnesarchum.'
        }
    ];

    const lyricLista = document.getElementById('lyrics-lista');

    for (let i = 0; i < letras.length; i++) {

        let item = document.createElement('div');
        item.className = 'lyric-item';

        let tituloLyric = document.createElement('div');
        tituloLyric.className = 'lyric-titulo';
        tituloLyric.innerHTML =
            letras[i].titulo +
            '<i class="fas fa-chevron-down"></i>';

        let cuerpo = document.createElement('div');
        cuerpo.className = 'lyric-cuerpo';
        cuerpo.textContent = letras[i].letra;

        // Al hacer clic abre o cierra
        tituloLyric.addEventListener('click', function() {
            let estaAbierto = cuerpo.classList.contains('abierto');

            // Cerrar todos
            let todosLosCuerpos = document.querySelectorAll('.lyric-cuerpo');
            let todosTitulosLyric = document.querySelectorAll('.lyric-titulo');
            for (let j = 0; j < todosLosCuerpos.length; j++) {
                todosLosCuerpos[j].classList.remove('abierto');
                todosTitulosLyric[j].classList.remove('abierto');
            }

            // Si estaba cerrado lo abre
            if (estaAbierto === false) {
                cuerpo.classList.add('abierto');
                tituloLyric.classList.add('abierto');
            }
        });

        item.appendChild(tituloLyric);
        item.appendChild(cuerpo);
        lyricLista.appendChild(item);
    }

    // ─── REVIEWS SLIDER ──────────────────────────────────
    const reviews = [
        {
            texto: '"Lorem ipsum dolor sit amet, est ad graecis principes. Ad visers iisque saperet. Eu eos quod affert. Vim invidunt efficiendi eaers eu eos veniam percipit dignissim."',
            autor: '— Rolling Stone Magazine'
        },
        {
            texto: '"Vim invidunt efficiendi eaers eu eos veniam percipit dignissim, an cum suas laudem. Divi ipsum dolor sit amet, est ad graecis principes. Ad visers iisque saperet."',
            autor: '— Nylon Magazine'
        }
    ];

    const reviewTexto = document.getElementById('review-texto');
    const reviewAutor = document.getElementById('review-autor');
    const reviewPrev  = document.getElementById('review-prev');
    const reviewNext  = document.getElementById('review-next');
    let   reviewActual = 0;
    let   reviewTimer;

    function mostrarReview(i) {
        reviewTexto.textContent = reviews[i].texto;
        reviewAutor.textContent = reviews[i].autor;
    }

    reviewNext.addEventListener('click', function() {
        reviewActual = reviewActual + 1;
        if (reviewActual >= reviews.length) {
            reviewActual = 0;
        }
        mostrarReview(reviewActual);
        clearInterval(reviewTimer);
        reviewTimer = setInterval(function() {
            reviewActual = (reviewActual + 1) % reviews.length;
            mostrarReview(reviewActual);
        }, 5000);
    });

    reviewPrev.addEventListener('click', function() {
        reviewActual = reviewActual - 1;
        if (reviewActual < 0) {
            reviewActual = reviews.length - 1;
        }
        mostrarReview(reviewActual);
        clearInterval(reviewTimer);
        reviewTimer = setInterval(function() {
            reviewActual = (reviewActual + 1) % reviews.length;
            mostrarReview(reviewActual);
        }, 5000);
    });

    mostrarReview(0);
    reviewTimer = setInterval(function() {
        reviewActual = (reviewActual + 1) % reviews.length;
        mostrarReview(reviewActual);
    }, 5000);

    // ─── SCROLL TO TOP ────────────────────────────────────
    const scrollBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > window.innerHeight * 0.5) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});