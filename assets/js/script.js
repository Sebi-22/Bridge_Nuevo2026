document.addEventListener('DOMContentLoaded', function() {

    // ─── PLAYER BAR ───────────────────────────────────────
    const canciones = [
        { titulo: 'Black Hole Sun',   audio: 'assets/audios/Black-hole-sun.mp3' },
        { titulo: 'Work',             audio: 'assets/audios/Work.mp3' },
        { titulo: 'Lullaby',          audio: 'assets/audios/Lullaby.mp3' },
        { titulo: 'The Passenger',    audio: 'assets/audios/The-Passanger.mp3' },
        { titulo: 'Celebrity Skin',   audio: 'assets/audios/Celebrity-Skin.mp3' },
        { titulo: 'Creep',            audio: 'assets/audios/Creep.mp3' },
        { titulo: 'Epic',             audio: 'assets/audios/Epic.mp3' },
        { titulo: 'Reptilia',         audio: 'assets/audios/Reptilia.mp3' },
        { titulo: 'Go With A Flow',   audio: 'assets/audios/Go-With-a-Flow.mp3' },
        { titulo: 'Electric Version', audio: 'assets/audios/Electric-version.mp3' }
    ];

    let cancionActual = 0;
    let audio = document.createElement('audio');
    audio.src = canciones[0].audio;

    let playerBar = document.getElementById('player-bar');

    if (playerBar) {
        let portada = document.createElement('img');
        portada.className = 'player-cover';
        portada.src = 'assets/images/album-16-150x150.jpg';
        portada.alt = 'Portada';

        let info = document.createElement('div');
        info.className = 'player-info';

        let titulo = document.createElement('div');
        titulo.className = 'player-title';
        titulo.textContent = canciones[0].titulo;

        let artista = document.createElement('div');
        artista.className = 'player-artist';
        artista.textContent = 'Terrible';

        info.appendChild(titulo);
        info.appendChild(artista);

        let controles = document.createElement('div');
        controles.className = 'player-controls';

        let botonAnterior = document.createElement('button');
        botonAnterior.innerHTML = '<i class="fas fa-step-backward"></i>';

        let botonPlay = document.createElement('button');
        botonPlay.innerHTML = '<i class="fas fa-play"></i>';

        let botonSiguiente = document.createElement('button');
        botonSiguiente.innerHTML = '<i class="fas fa-step-forward"></i>';

        controles.appendChild(botonAnterior);
        controles.appendChild(botonPlay);
        controles.appendChild(botonSiguiente);

        let progreso = document.createElement('div');
        progreso.className = 'player-progress';

        let barraProgreso = document.createElement('div');
        barraProgreso.className = 'progress-track';

        let rellenoBarra = document.createElement('div');
        rellenoBarra.className = 'progress-fill';

        barraProgreso.appendChild(rellenoBarra);

        let tiempo = document.createElement('span');
        tiempo.className = 'player-time';
        tiempo.textContent = '0:00 / 0:00';

        progreso.appendChild(barraProgreso);
        progreso.appendChild(tiempo);

        let volumen = document.createElement('div');
        volumen.className = 'player-volume';

        let iconoVolumen = document.createElement('i');
        iconoVolumen.className = 'fas fa-volume-up';

        let barraVolumen = document.createElement('div');
        barraVolumen.className = 'vol-track';

        let rellenovolumen = document.createElement('div');
        rellenovolumen.className = 'vol-fill';

        barraVolumen.appendChild(rellenovolumen);
        volumen.appendChild(iconoVolumen);
        volumen.appendChild(barraVolumen);

        playerBar.appendChild(portada);
        playerBar.appendChild(info);
        playerBar.appendChild(controles);
        playerBar.appendChild(progreso);
        playerBar.appendChild(volumen);
        playerBar.appendChild(audio);

        botonPlay.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                botonPlay.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        botonSiguiente.addEventListener('click', function() {
            cancionActual = cancionActual + 1;
            if (cancionActual >= canciones.length) { cancionActual = 0; }
            audio.src = canciones[cancionActual].audio;
            titulo.textContent = canciones[cancionActual].titulo;
            audio.play();
            botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
        });

        botonAnterior.addEventListener('click', function() {
            cancionActual = cancionActual - 1;
            if (cancionActual < 0) { cancionActual = canciones.length - 1; }
            audio.src = canciones[cancionActual].audio;
            titulo.textContent = canciones[cancionActual].titulo;
            audio.play();
            botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
        });

        audio.addEventListener('timeupdate', function() {
            if (audio.duration) {
                let porcentaje = (audio.currentTime / audio.duration) * 100;
                rellenoBarra.style.width = porcentaje + '%';
                let minActual = Math.floor(audio.currentTime / 60);
                let segActual = Math.floor(audio.currentTime % 60);
                if (segActual < 10) { segActual = '0' + segActual; }
                let minTotal = Math.floor(audio.duration / 60);
                let segTotal = Math.floor(audio.duration % 60);
                if (segTotal < 10) { segTotal = '0' + segTotal; }
                tiempo.textContent = minActual + ':' + segActual + ' / ' + minTotal + ':' + segTotal;
            }
        });

        barraProgreso.addEventListener('click', function(e) {
            if (audio.duration) {
                let ancho = barraProgreso.getBoundingClientRect();
                audio.currentTime = ((e.clientX - ancho.left) / ancho.width) * audio.duration;
            }
        });

        audio.addEventListener('ended', function() {
            cancionActual = cancionActual + 1;
            if (cancionActual >= canciones.length) { cancionActual = 0; }
            audio.src = canciones[cancionActual].audio;
            titulo.textContent = canciones[cancionActual].titulo;
            audio.play();
        });
    }

    // ─── LISTA DE CANCIONES ───────────────────────────────
    const datosCanciones = [
        { numero: '1.',  titulo: 'Black Hole Sun',   duracion: '0:32', audio: 'assets/audios/Black-hole-sun.mp3' },
        { numero: '2.',  titulo: 'Work',             duracion: '0:27', audio: 'assets/audios/Work.mp3' },
        { numero: '3.',  titulo: 'Lullaby',          duracion: '0:30', audio: 'assets/audios/Lullaby.mp3' },
        { numero: '4.',  titulo: 'The Passenger',    duracion: '0:30', audio: 'assets/audios/The-Passanger.mp3' },
        { numero: '5.',  titulo: 'Celebrity Skin',   duracion: '0:32', audio: 'assets/audios/Celebrity-Skin.mp3' },
        { numero: '6.',  titulo: 'Creep',            duracion: '0:30', audio: 'assets/audios/Creep.mp3' },
        { numero: '7.',  titulo: 'Epic',             duracion: '0:30', audio: 'assets/audios/Epic.mp3' },
        { numero: '8.',  titulo: 'Reptilia',         duracion: '0:30', audio: 'assets/audios/Reptilia.mp3' },
        { numero: '9.',  titulo: 'Go With A Flow',   duracion: '0:30', audio: 'assets/audios/Go-With-a-Flow.mp3' },
        { numero: '10.', titulo: 'Electric Version', duracion: '0:31', audio: 'assets/audios/Electric-version.mp3' }
    ];

    let audioCancion = new Audio();
    const listaCanciones = document.getElementById('lista-canciones');
    const modalVideo = document.getElementById('modal-video');
    const videoFrame = document.getElementById('video-frame');
    const botonCerrar = document.getElementById('modal-cerrar');

    if (modalVideo && botonCerrar) {
        botonCerrar.addEventListener('click', function() {
            modalVideo.classList.remove('activo');
            videoFrame.src = '';
        });
        modalVideo.addEventListener('click', function(e) {
            if (e.target === modalVideo) {
                modalVideo.classList.remove('activo');
                videoFrame.src = '';
            }
        });
    }

    if (listaCanciones) {
        for (let i = 0; i < datosCanciones.length; i++) {
            let cancion = document.createElement('div');
            cancion.className = 'cancion';

            let numero = document.createElement('span');
            numero.className = 'cancion-numero';
            numero.textContent = datosCanciones[i].numero;

            let tituloCancion = document.createElement('span');
            tituloCancion.className = 'cancion-titulo';
            tituloCancion.textContent = datosCanciones[i].titulo;

            let duracion = document.createElement('span');
            duracion.className = 'cancion-duracion';
            duracion.textContent = datosCanciones[i].duracion;

            let botonesCancion = document.createElement('div');
            botonesCancion.className = 'cancion-botones';

            let botonAudio = document.createElement('button');
            botonAudio.innerHTML = '<i class="fas fa-play"></i>';

            let botonVideo = document.createElement('button');
            botonVideo.innerHTML = '<i class="fas fa-video"></i>';

            botonAudio.addEventListener('click', function() {
                if (audioCancion.src.includes(datosCanciones[i].audio) && !audioCancion.paused) {
                    audioCancion.pause();
                    botonAudio.innerHTML = '<i class="fas fa-play"></i>';
                } else {
                    audioCancion.pause();
                    document.querySelectorAll('.cancion-botones button:first-child').forEach(function(b) {
                        b.innerHTML = '<i class="fas fa-play"></i>';
                    });
                    audioCancion.src = datosCanciones[i].audio;
                    audioCancion.play();
                    botonAudio.innerHTML = '<i class="fas fa-pause"></i>';
                }
            });

            if (modalVideo && videoFrame) {
                botonVideo.addEventListener('click', function() {
                    videoFrame.src = 'https://player.vimeo.com/video/33730560?autoplay=1';
                    modalVideo.classList.add('activo');
                });
            }

            botonesCancion.appendChild(botonAudio);
            botonesCancion.appendChild(botonVideo);
            cancion.appendChild(numero);
            cancion.appendChild(tituloCancion);
            cancion.appendChild(duracion);
            cancion.appendChild(botonesCancion);
            listaCanciones.appendChild(cancion);
        }
    }

    // ─── GALERIA ──────────────────────────────────────────
    const fotosGaleria = [
        'assets/images/h1-img-1.jpg',
        'assets/images/h1-img-2.jpg',
        'assets/images/h1-img-3.jpg',
        'assets/images/h1-img-4.jpg',
        'assets/images/h1-img-5.jpg',
        'assets/images/h1-img-6.jpg'
    ];

    const grilla = document.getElementById('galeria-grilla');
    const lightbox = document.getElementById('lightbox');
    const lightboxFoto = document.getElementById('lightbox-foto');
    const lightboxContador = document.getElementById('lightbox-contador');
    const botonCerrarLb = document.getElementById('lightbox-cerrar');
    const botonAnteriorLb = document.getElementById('lightbox-anterior');
    const botonSiguienteLb = document.getElementById('lightbox-siguiente');
    let fotoActual = 0;

    if (grilla) {
        fotosGaleria.forEach(function(ruta, i) {
            let foto = document.createElement('img');
            foto.src = ruta;
            foto.alt = 'Foto ' + (i + 1);
            foto.addEventListener('click', function() {
                fotoActual = i;
                lightboxFoto.src = fotosGaleria[fotoActual];
                lightboxContador.textContent = (fotoActual + 1) + ' / ' + fotosGaleria.length;
                lightbox.classList.add('activo');
            });
            grilla.appendChild(foto);
        });

        botonCerrarLb.addEventListener('click', function() { lightbox.classList.remove('activo'); });
        lightbox.addEventListener('click', function(e) { if (e.target === lightbox) lightbox.classList.remove('activo'); });
        botonSiguienteLb.addEventListener('click', function() {
            fotoActual = (fotoActual + 1) % fotosGaleria.length;
            lightboxFoto.src = fotosGaleria[fotoActual];
            lightboxContador.textContent = (fotoActual + 1) + ' / ' + fotosGaleria.length;
        });
        botonAnteriorLb.addEventListener('click', function() {
            fotoActual = (fotoActual - 1 + fotosGaleria.length) % fotosGaleria.length;
            lightboxFoto.src = fotosGaleria[fotoActual];
            lightboxContador.textContent = (fotoActual + 1) + ' / ' + fotosGaleria.length;
        });
        window.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('activo')) return;
            if (e.key === 'Escape') lightbox.classList.remove('activo');
            if (e.key === 'ArrowRight') botonSiguienteLb.click();
            if (e.key === 'ArrowLeft') botonAnteriorLb.click();
        });
    }

    // ─── FECHAS ───────────────────────────────────────────
    const datosFechas = [
        { dia: '10', mes: 'Jun', diaNombre: 'Sun', lugar: 'Gärdet Open Air Stockholm – Sweden' },
        { dia: '12', mes: 'Jun', diaNombre: 'Tue', lugar: 'Helsinki, Finland – Hartwall Arena' },
        { dia: '14', mes: 'Jun', diaNombre: 'Thu', lugar: 'Riga, Latvia – Riga Arena' },
        { dia: '15', mes: 'Jun', diaNombre: 'Fri', lugar: 'Kaunas, Lithuania – Žalgirio Arena' },
        { dia: '18', mes: 'Jun', diaNombre: 'Mon', lugar: 'Moscow, Russia – Olimpiski' },
        { dia: '19', mes: 'Jun', diaNombre: 'Tue', lugar: 'Pilton, England – Glastonbury' },
        { dia: '22', mes: 'Jun', diaNombre: 'Fri', lugar: 'London, England – O2 Arena' },
        { dia: '27', mes: 'Jun', diaNombre: 'Wed', lugar: 'Rome, Italy – Cola Arena' },
        { dia: '29', mes: 'Jun', diaNombre: 'Fri', lugar: 'Athens, Greece – PAOK Stadium' },
        { dia: '03', mes: 'Jul', diaNombre: 'Tue', lugar: 'Budapest, Hungary – Nagy Arena' }
    ];

    const listaFechas = document.getElementById('lista-fechas');
    const botonVerTodas = document.getElementById('boton-ver-todas');
    const Fechas_Visibles = 6;
    let fechasExtras = [];
    let extrasVisibles = false;

    if (listaFechas) {
        for (let i = 0; i < datosFechas.length; i++) {
            let item = document.createElement('li');
            item.className = 'fecha-item';

            let numero = document.createElement('span');
            numero.className = 'fecha-numero';
            numero.textContent = datosFechas[i].dia;

            let mes = document.createElement('span');
            mes.className = 'fecha-mes';
            mes.innerHTML = datosFechas[i].mes + '<br>' + datosFechas[i].diaNombre;

            let lugar = document.createElement('div');
            lugar.className = 'fecha-lugar';
            lugar.textContent = datosFechas[i].lugar;

            let tickets = document.createElement('button');
            tickets.className = 'fecha-tickets';
            tickets.textContent = 'Buy Tickets';

            item.appendChild(numero);
            item.appendChild(mes);
            item.appendChild(lugar);
            item.appendChild(tickets);

            if (i >= Fechas_Visibles) {
                item.style.display = 'none';
                fechasExtras.push(item);
            }
            listaFechas.appendChild(item);
        }

        if (botonVerTodas) {
            botonVerTodas.addEventListener('click', function() {
                if (extrasVisibles === false) {
                    fechasExtras.forEach(function(li) { li.style.display = ''; });
                    botonVerTodas.textContent = 'Show Less';
                    extrasVisibles = true;
                } else {
                    fechasExtras.forEach(function(li) { li.style.display = 'none'; });
                    botonVerTodas.textContent = 'View All';
                    extrasVisibles = false;
                }
            });
        }
    }

    // ─── BLOG ─────────────────────────────────────────────
    const datosPosts = [
        { imagen: 'assets/images/blog-post-1.jpg', titulo: 'The Best Night In Baltimore', fecha: '10 April, 2018' },
        { imagen: 'assets/images/blog-post-2.jpg', titulo: 'The Best Night In Detroit',   fecha: '10 April, 2018' },
        { imagen: 'assets/images/blog-post-3.jpg', titulo: 'The Best Night In New York',  fecha: '10 April, 2018' }
    ];

    const blogGrilla = document.getElementById('blog-grilla');

    if (blogGrilla) {
        for (let i = 0; i < datosPosts.length; i++) {
            let post = document.createElement('article');
            post.className = 'blog-post';

            let imagen = document.createElement('img');
            imagen.src = datosPosts[i].imagen;
            imagen.alt = datosPosts[i].titulo;

            let tituloPost = document.createElement('p');
            tituloPost.className = 'blog-post-titulo';

            let link = document.createElement('a');
            link.href = '#';
            link.textContent = datosPosts[i].titulo;
            tituloPost.appendChild(link);

            let fecha = document.createElement('p');
            fecha.className = 'blog-post-fecha';
            fecha.textContent = datosPosts[i].fecha;

            post.appendChild(imagen);
            post.appendChild(tituloPost);
            post.appendChild(fecha);
            blogGrilla.appendChild(post);
        }
    }

    // ─── VIDEO ────────────────────────────────────────────
    const videoBotonPlay = document.getElementById('video-boton-play');
    const videoLightbox = document.getElementById('video-lightbox');
    const videoLightboxCerrar = document.getElementById('video-lightbox-cerrar');
    const videoPrincipal = document.getElementById('video-principal');

    if (videoBotonPlay) {
        videoBotonPlay.addEventListener('click', function() {
            videoLightbox.classList.add('activo');
            videoPrincipal.play();
        });
        videoLightboxCerrar.addEventListener('click', function() {
            videoLightbox.classList.remove('activo');
            videoPrincipal.pause();
            videoPrincipal.currentTime = 0;
        });
        videoLightbox.addEventListener('click', function(e) {
            if (e.target === videoLightbox) {
                videoLightbox.classList.remove('activo');
                videoPrincipal.pause();
                videoPrincipal.currentTime = 0;
            }
        });
    }

    // ─── DISCOGRAPHY ──────────────────────────────────────
    const datosAlbumes = [
        { imagen: 'assets/images/album-1.jpg',  titulo: 'Be-Doo',          subtitulo: 'Caller' },
        { imagen: 'assets/images/album-2.jpg',  titulo: 'Free Spirit',     subtitulo: 'Go Away' },
        { imagen: 'assets/images/album-3.jpg',  titulo: 'Depressed Days',  subtitulo: 'Ritual Spirit' },
        { imagen: 'assets/images/album-4.jpg',  titulo: 'Wrong Motion',    subtitulo: 'Love Hate' },
        { imagen: 'assets/images/album-5.jpg',  titulo: 'Lost Gravity',    subtitulo: 'Fallen' },
        { imagen: 'assets/images/album-6.jpg',  titulo: 'Road Killer',     subtitulo: 'Hater' },
        { imagen: 'assets/images/album-7.jpg',  titulo: 'The Minimalists', subtitulo: 'Windows' },
        { imagen: 'assets/images/album-8.jpg',  titulo: 'Philip Jax',      subtitulo: 'Blame' },
        { imagen: 'assets/images/album-9.jpg',  titulo: 'Bad Habits',      subtitulo: 'Joy' },
        { imagen: 'assets/images/album-10.jpg', titulo: 'Low Distance',    subtitulo: 'Free Your Mind' },
        { imagen: 'assets/images/album-11.jpg', titulo: 'Fast Track',      subtitulo: 'Low Bass' },
        { imagen: 'assets/images/album-12.jpg', titulo: 'Neonium',         subtitulo: 'Neon Dreams' }
    ];

    const discoGrilla = document.getElementById('disco-grilla');
    const discoBotonMas = document.getElementById('disco-boton-mas');
    let albumesMostrados = 0;
    const PASO = 4;

    function mostrarAlbumes() {
        for (let i = 0; i < PASO; i++) {
            let indice = albumesMostrados % datosAlbumes.length;
            let card = document.createElement('div');
            card.className = 'disco-card';

            let imagen = document.createElement('img');
            imagen.src = datosAlbumes[indice].imagen;
            imagen.alt = datosAlbumes[indice].titulo;

            let overlay = document.createElement('div');
            overlay.className = 'disco-overlay';

            let tituloAlbum = document.createElement('h3');
            tituloAlbum.textContent = datosAlbumes[indice].titulo;

            let subtitulo = document.createElement('p');
            subtitulo.textContent = datosAlbumes[indice].subtitulo;

            overlay.appendChild(tituloAlbum);
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