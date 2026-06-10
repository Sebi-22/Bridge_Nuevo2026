document.addEventListener('DOMContentLoaded', function() {
    // ─── CANCIONES ───────────────────────────────────────
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

    // ─── CREAR EL AUDIO ──────────────────────────────────
    let audio = document.createElement('audio');
    audio.src = canciones[0].audio;

    // ─── AGARRAR EL CONTENEDOR ───────────────────────────
    let playerBar = document.getElementById('player-bar');

    // ─── CREAR LA PORTADA ────────────────────────────────
    let portada = document.createElement('img');
    portada.className = 'player-cover';
    portada.src = 'assets/images/album-16-150x150.jpg';
    portada.alt = 'Portada';

    // ─── CREAR LA INFO (titulo y artista) ────────────────
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

    // ─── CREAR LOS BOTONES ───────────────────────────────
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

    // ─── CREAR LA BARRA DE PROGRESO ──────────────────────
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

    // ─── CREAR EL VOLUMEN ────────────────────────────────
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

    // ─── PONER TODO EN EL PLAYER BAR ─────────────────────
    playerBar.appendChild(portada);
    playerBar.appendChild(info);
    playerBar.appendChild(controles);
    playerBar.appendChild(progreso);
    playerBar.appendChild(volumen);
    playerBar.appendChild(audio);

    // ─── CUANDO APRIETAN PLAY/PAUSE ──────────────────────
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
        titulo.textContent = canciones[cancionActual].titulo;
        audio.play();
        botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
    });

    // ─── CUANDO APRIETAN ANTERIOR ────────────────────────
    botonAnterior.addEventListener('click', function() {
        cancionActual = cancionActual - 1;
        if (cancionActual < 0) {
            cancionActual = canciones.length - 1;
        }
        audio.src = canciones[cancionActual].audio;
        titulo.textContent = canciones[cancionActual].titulo;
        audio.play();
        botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
    });

    // ─── ACTUALIZAR LA BARRA MIENTRAS SUENA ──────────────
    audio.addEventListener('timeupdate', function() {
        if (audio.duration) {
            var porcentaje = (audio.currentTime / audio.duration) * 100;
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

    // ─── CLIC EN LA BARRA PARA SALTAR ────────────────────
    barraProgreso.addEventListener('click', function(e) {
        if (audio.duration) {
            let ancho = barraProgreso.getBoundingClientRect();
            let posicion = e.clientX - ancho.left;
            let porcentaje = posicion / ancho.width;
            audio.currentTime = porcentaje * audio.duration;
        }
    });

    // ─── CUANDO TERMINA LA CANCION PASA A LA SIGUIENTE ───
    audio.addEventListener('ended', function() {
        cancionActual = cancionActual + 1;
        if (cancionActual >= canciones.length) {
            cancionActual = 0;
        }
        audio.src = canciones[cancionActual].audio;
        titulo.textContent = canciones[cancionActual].titulo;
        audio.play();
    });

}); 

document.addEventListener('DOMContentLoaded', function() {

    // ─── CANCIONES ───────────────────────────────────────
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

    // ─── AUDIO PARA LA LISTA DE CANCIONES ────────────────
    let audioCancion = new Audio();

    // ─── MODAL DE VIDEO ──────────────────────────────────
    const modalVideo = document.getElementById('modal-video');
    const videoFrame = document.getElementById('video-frame');
    const botonCerrar = document.getElementById('modal-cerrar');

    // Cerrar modal con el botón ✕
    botonCerrar.addEventListener('click', function() {
        modalVideo.classList.remove('activo');
        videoFrame.src = '';
    });

    // Cerrar modal haciendo clic afuera
    modalVideo.addEventListener('click', function(e) {
        if (e.target === modalVideo) {
            modalVideo.classList.remove('activo');
            videoFrame.src = '';
        }
    });

    // ─── CREAR CADA CANCION EN LA LISTA ──────────────────
    const listaCanciones = document.getElementById('lista-canciones');

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

        // ─── LOGICA DEL BOTON PLAY ────────────────────────
        botonAudio.addEventListener('click', function() {

            // Si esta cancion ya esta sonando la pausamos
            if (audioCancion.src.includes(datosCanciones[i].audio) && !audioCancion.paused) {
                audioCancion.pause();
                botonAudio.innerHTML = '<i class="fas fa-play"></i>';

            } else {
                // Parar lo que estaba sonando
                audioCancion.pause();

                // Resetear todos los iconos a play
                let todosLosBotones = document.querySelectorAll('.cancion-botones button:first-child');
                for (let j = 0; j < todosLosBotones.length; j++) {
                    todosLosBotones[j].innerHTML = '<i class="fas fa-play"></i>';
                }

                // Poner la cancion nueva y reproducir
                audioCancion.src = datosCanciones[i].audio;
                audioCancion.play();
                botonAudio.innerHTML = '<i class="fas fa-pause"></i>';
            }
        });

        // ─── LOGICA DEL BOTON VIDEO ───────────────────────
        botonVideo.addEventListener('click', function() {
            videoFrame.src = 'https://player.vimeo.com/video/33730560?autoplay=1';
            modalVideo.classList.add('activo');
        });

        botonesCancion.appendChild(botonAudio);
        botonesCancion.appendChild(botonVideo);

        cancion.appendChild(numero);
        cancion.appendChild(tituloCancion);
        cancion.appendChild(duracion);
        cancion.appendChild(botonesCancion);

        listaCanciones.appendChild(cancion);
    }

}); 

document.addEventListener("DOMContentLoaded", function() {
    // Rutas de tus imágenes (asegúrate de que coincidan con tus archivos)
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

    // Actualiza la imagen y el contador del lightbox
    function actualizarLightbox() {
        lightboxFoto.src = fotosGaleria[fotoActual];
        lightboxContador.textContent = (fotoActual + 1) + ' / ' + fotosGaleria.length;
    }

    // ─── CREAR LAS FOTOS EN LA GRILLA ────────────────────
    fotosGaleria.forEach((ruta, i) => {
        let foto = document.createElement('img');
        foto.src = ruta;
        foto.alt = 'Foto ' + (i + 1);

        // Al hacer clic abre el lightbox
        foto.addEventListener('click', function() {
            fotoActual = i;
            actualizarLightbox();
            lightbox.classList.add('activo');
        });

        grilla.appendChild(foto);
    });

    // ─── BOTON CERRAR LIGHTBOX ────────────────────────────
    botonCerrarLb.addEventListener('click', function() {
        lightbox.classList.remove('activo');
    });

    // ─── CERRAR AL HACER CLIC AFUERA ─────────────────────
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('activo');
        }
    });

    // ─── BOTON SIGUIENTE ──────────────────────────────────
    botonSiguienteLb.addEventListener('click', function() {
        fotoActual = (fotoActual + 1) % fotosGaleria.length; // Ciclo infinito simplificado
        actualizarLightbox();
    });

    // ─── BOTON ANTERIOR ───────────────────────────────────
    botonAnteriorLb.addEventListener('click', function() {
        fotoActual = (fotoActual - 1 + fotosGaleria.length) % fotosGaleria.length; // Ciclo infinito inverso simplificado
        actualizarLightbox();
    });

    // OPCIONAL: Cerrar con la tecla Escape y navegar con flechas del teclado
    window.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('activo')) return;
        if (e.key === 'Escape') lightbox.classList.remove('activo');
        if (e.key === 'ArrowRight') botonSiguienteLb.click();
        if (e.key === 'ArrowLeft') botonAnteriorLb.click();
    });
});

    // ─── FECHAS DE CONCIERTOS ─────────────────────────────
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
    const FECHAS_VISIBLES = 6;
    let fechasExtras = [];
    let extrasVisibles = false;

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

        // Las primeras 6 se muestran, el resto se oculta
        if (i >= FECHAS_VISIBLES) {
            item.style.display = 'none';
            fechasExtras.push(item);
        }

        listaFechas.appendChild(item);
    }

    // ─── BOTON VER TODAS ──────────────────────────────────
    botonVerTodas.addEventListener('click', function() {

        if (extrasVisibles === false) {
            for (let i = 0; i < fechasExtras.length; i++) {
                fechasExtras[i].style.display = '';
            }
            botonVerTodas.textContent = 'Show Less';
            extrasVisibles = true;

        } else {
            for (let i = 0; i < fechasExtras.length; i++) {
                fechasExtras[i].style.display = 'none';
            }
            botonVerTodas.textContent = 'View All';
            extrasVisibles = false;
        }
    });

    // ─── BLOG POSTS ───────────────────────────────────────
    const datosPosts = [
        { imagen: 'assets/images/blog-post-1.jpg', titulo: 'The Best Night In Baltimore', fecha: '10 April, 2018' },
        { imagen: 'assets/images/blog-post-2.jpg', titulo: 'The Best Night In Detroit',   fecha: '10 April, 2018' },
        { imagen: 'assets/images/blog-post-3.jpg', titulo: 'The Best Night In New York',  fecha: '10 April, 2018' }
    ];

    const blogGrilla = document.getElementById('blog-grilla');

    for (let i = 0; i < datosPosts.length; i++) {

        let post = document.createElement('article');
        post.className = 'blog-post';

        let imagen = document.createElement('img');
        imagen.src = datosPosts[i].imagen;
        imagen.alt = datosPosts[i].titulo;

        let titulo = document.createElement('p');
        titulo.className = 'blog-post-titulo';

        let link = document.createElement('a');
        link.href = '#';
        link.textContent = datosPosts[i].titulo;

        titulo.appendChild(link);

        let fecha = document.createElement('p');
        fecha.className = 'blog-post-fecha';
        fecha.textContent = datosPosts[i].fecha;

        post.appendChild(imagen);
        post.appendChild(titulo);
        post.appendChild(fecha);

        blogGrilla.appendChild(post);
    }

    // ─── VIDEO SECTION ────────────────────────────────────
    const videoBotonPlay = document.getElementById('video-boton-play');
    const videoLightbox = document.getElementById('video-lightbox');
    const videoLightboxCerrar = document.getElementById('video-lightbox-cerrar');
    const videoPrincipal = document.getElementById('video-principal');

    // Abrir el lightbox
    videoBotonPlay.addEventListener('click', function() {
        videoLightbox.classList.add('activo');
        videoPrincipal.play();
    });

    // Cerrar con el boton X
    videoLightboxCerrar.addEventListener('click', function() {
        videoLightbox.classList.remove('activo');
        videoPrincipal.pause();
        videoPrincipal.currentTime = 0;
    });

    // Cerrar haciendo clic afuera
    videoLightbox.addEventListener('click', function(e) {
        if (e.target === videoLightbox) {
            videoLightbox.classList.remove('activo');
            videoPrincipal.pause();
            videoPrincipal.currentTime = 0;
        }
    });

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

    // Funcion que repite los albumes infinitamente
    function mostrarAlbumes() {

        for (let i = 0; i < PASO; i++) {

            // Cuando llega al final vuelve al principio
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

    // Primera fila al cargar
    mostrarAlbumes();

    // Cada clic agrega 4 mas, siempre
    discoBotonMas.addEventListener('click', function() {
        mostrarAlbumes();
    });

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

    document.addEventListener('DOMContentLoaded', function() {

    const campoNombre  = document.getElementById('campo-nombre');
    const campoEmail   = document.getElementById('campo-email');
    const campoMensaje = document.getElementById('campo-mensaje');
    const botonEnviar  = document.getElementById('boton-enviar');
    const formMensaje  = document.getElementById('form-mensaje');

    botonEnviar.addEventListener('click', function() {

        const nombre  = campoNombre.value.trim();
        const email   = campoEmail.value.trim();
        const mensaje = campoMensaje.value.trim();

        // ─── VALIDACION ───────────────────────────────────
        if (nombre === '' || email === '' || mensaje === '') {
            formMensaje.textContent = 'Please fill in all fields.';
            formMensaje.className = 'contact-form-mensaje mensaje-error';
            return;
        }

        if (email.includes('@') === false || email.includes('.') === false) {
            formMensaje.textContent = 'Please enter a valid email.';
            formMensaje.className = 'contact-form-mensaje mensaje-error';
            return;
        }

        // ─── EXITO ────────────────────────────────────────
        formMensaje.textContent = 'Thank you! Your message has been sent.';
        formMensaje.className = 'contact-form-mensaje mensaje-ok';

        campoNombre.value  = '';
        campoEmail.value   = '';
        campoMensaje.value = '';
    });

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

