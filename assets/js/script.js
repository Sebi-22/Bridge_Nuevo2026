document.addEventListener('DOMContentLoaded', function () {

    // ─── PLAYER BAR (Home) ────────────────────────────────
    {
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

            botonPlay.addEventListener('click', function () {
                if (audio.paused) {
                    audio.play();
                    botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    audio.pause();
                    botonPlay.innerHTML = '<i class="fas fa-play"></i>';
                }
            });

            botonSiguiente.addEventListener('click', function () {
                cancionActual = cancionActual + 1;
                if (cancionActual >= canciones.length) { cancionActual = 0; }
                audio.src = canciones[cancionActual].audio;
                titulo.textContent = canciones[cancionActual].titulo;
                audio.play();
                botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
            });

            botonAnterior.addEventListener('click', function () {
                cancionActual = cancionActual - 1;
                if (cancionActual < 0) { cancionActual = canciones.length - 1; }
                audio.src = canciones[cancionActual].audio;
                titulo.textContent = canciones[cancionActual].titulo;
                audio.play();
                botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
            });

            audio.addEventListener('timeupdate', function () {
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

            barraProgreso.addEventListener('click', function (e) {
                if (audio.duration) {
                    let ancho = barraProgreso.getBoundingClientRect();
                    audio.currentTime = ((e.clientX - ancho.left) / ancho.width) * audio.duration;
                }
            });

            audio.addEventListener('ended', function () {
                cancionActual = cancionActual + 1;
                if (cancionActual >= canciones.length) { cancionActual = 0; }
                audio.src = canciones[cancionActual].audio;
                titulo.textContent = canciones[cancionActual].titulo;
                audio.play();
            });
        }
    }

    // ─── THE KNOWING — INFO DE ALBUM (Home) ───────────────
    {
        const datosAlbumHome = {
            imagen: 'assets/images/home2.jpg',
            titulo: 'The Knowing – 2018.',
            descripcion: 'Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei.',
            botones: [
                { href: '#', imagen: 'assets/images/slider-img-2.png', alt: 'App Store' },
                { href: '#', imagen: 'assets/images/slider-img-3.png', alt: 'Google Play' }
            ]
        };

        const contenedorAlbumHome = document.getElementById('album-izquierda');

        if (contenedorAlbumHome) {
            let portadaAlbum = document.createElement('img');
            portadaAlbum.className = 'album-portada';
            portadaAlbum.src = datosAlbumHome.imagen;
            portadaAlbum.alt = datosAlbumHome.titulo;

            let tituloAlbum = document.createElement('h2');
            tituloAlbum.textContent = datosAlbumHome.titulo;

            let descripcion = document.createElement('p');
            descripcion.textContent = datosAlbumHome.descripcion;

            let contenedorBotones = document.createElement('div');
            contenedorBotones.className = 'album-botones';

            for (let i = 0; i < datosAlbumHome.botones.length; i++) {
                let enlace = document.createElement('a');
                enlace.href = datosAlbumHome.botones[i].href;
                enlace.target = '_blank';

                let imagenBoton = document.createElement('img');
                imagenBoton.src = datosAlbumHome.botones[i].imagen;
                imagenBoton.alt = datosAlbumHome.botones[i].alt;

                enlace.appendChild(imagenBoton);
                contenedorBotones.appendChild(enlace);
            }

            contenedorAlbumHome.appendChild(portadaAlbum);
            contenedorAlbumHome.appendChild(tituloAlbum);
            contenedorAlbumHome.appendChild(descripcion);
            contenedorAlbumHome.appendChild(contenedorBotones);
        }
    }

    // ─── LISTA DE CANCIONES + MODAL DE VIDEO (Home) ───────
    {
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
            botonCerrar.addEventListener('click', function () {
                modalVideo.classList.remove('activo');
                videoFrame.src = '';
            });
            modalVideo.addEventListener('click', function (e) {
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

                botonAudio.addEventListener('click', function () {
                    if (audioCancion.src.includes(datosCanciones[i].audio) && !audioCancion.paused) {
                        audioCancion.pause();
                        botonAudio.innerHTML = '<i class="fas fa-play"></i>';
                    } else {
                        audioCancion.pause();
                        document.querySelectorAll('.cancion-botones button:first-child').forEach(function (b) {
                            b.innerHTML = '<i class="fas fa-play"></i>';
                        });
                        audioCancion.src = datosCanciones[i].audio;
                        audioCancion.play();
                        botonAudio.innerHTML = '<i class="fas fa-pause"></i>';
                    }
                });

                if (modalVideo && videoFrame) {
                    botonVideo.addEventListener('click', function () {
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
    }

    // ─── GALERIA + LIGHTBOX (Home) ────────────────────────
    {
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
            fotosGaleria.forEach(function (ruta, i) {
                let foto = document.createElement('img');
                foto.src = ruta;
                foto.alt = 'Foto ' + (i + 1);
                foto.addEventListener('click', function () {
                    fotoActual = i;
                    lightboxFoto.src = fotosGaleria[fotoActual];
                    lightboxContador.textContent = (fotoActual + 1) + ' / ' + fotosGaleria.length;
                    lightbox.classList.add('activo');
                });
                grilla.appendChild(foto);
            });

            botonCerrarLb.addEventListener('click', function () { lightbox.classList.remove('activo'); });
            lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.classList.remove('activo'); });
            botonSiguienteLb.addEventListener('click', function () {
                fotoActual = (fotoActual + 1) % fotosGaleria.length;
                lightboxFoto.src = fotosGaleria[fotoActual];
                lightboxContador.textContent = (fotoActual + 1) + ' / ' + fotosGaleria.length;
            });
            botonAnteriorLb.addEventListener('click', function () {
                fotoActual = (fotoActual - 1 + fotosGaleria.length) % fotosGaleria.length;
                lightboxFoto.src = fotosGaleria[fotoActual];
                lightboxContador.textContent = (fotoActual + 1) + ' / ' + fotosGaleria.length;
            });
            window.addEventListener('keydown', function (e) {
                if (!lightbox.classList.contains('activo')) return;
                if (e.key === 'Escape') lightbox.classList.remove('activo');
                if (e.key === 'ArrowRight') botonSiguienteLb.click();
                if (e.key === 'ArrowLeft') botonAnteriorLb.click();
            });
        }
    }

    // ─── FECHAS DE TOUR (Home & Tour) ─────────────────────
    {
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
        const fechas_visibles = 6;
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

                if (i >= fechas_visible) {
                    item.style.display = 'none';
                    fechasExtras.push(item);
                }
                listaFechas.appendChild(item);
            }

            if (botonVerTodas) {
                botonVerTodas.addEventListener('click', function () {
                    if (extrasVisibles === false) {
                        fechasExtras.forEach(function (li) { li.style.display = ''; });
                        botonVerTodas.textContent = 'Show Less';
                        extrasVisibles = true;
                    } else {
                        fechasExtras.forEach(function (li) { li.style.display = 'none'; });
                        botonVerTodas.textContent = 'View All';
                        extrasVisibles = false;
                    }
                });
            }
        }
    }

    // ─── BLOG (Home) ───────────────────────────────────────
    {
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
    }
    // ─── VIDEO DESTACADO ) ────────────────────────────
    {
        const videoBotonPlay = document.getElementById('video-boton-play');
        const videoLightbox = document.getElementById('video-lightbox');
        const videoLightboxCerrar = document.getElementById('video-lightbox-cerrar');
        const videoPrincipal = document.getElementById('video-principal');

        if (videoBotonPlay) {
            videoBotonPlay.addEventListener('click', function () {
                videoLightbox.classList.add('activo');
                videoPrincipal.play();
            });
            videoLightboxCerrar.addEventListener('click', function () {
                videoLightbox.classList.remove('activo');
                videoPrincipal.pause();
                videoPrincipal.currentTime = 0;
            });
            videoLightbox.addEventListener('click', function (e) {
                if (e.target === videoLightbox) {
                    videoLightbox.classList.remove('activo');
                    videoPrincipal.pause();
                    videoPrincipal.currentTime = 0;
                }
            });
        }
    }
    // ─── DISCOGRAFIA ───────────
    {
        const datosAlbumes = [
            { imagen: 'assets/images/album-1.jpg',  titulo: 'Be-Doo',          subtitulo: 'Caller' },
            { imagen: 'assets/images/album-2.jpg',  titulo: 'Free Spirit',     subtitulo: 'Go Away' },
            { imagen: 'assets/images/album-3.jpg',  titulo: 'Depressed Days',  subtitulo: 'Ritual Spirit' },
            { imagen: 'assets/images/album-4.jpg',  titulo: 'Wrong Motion',    subtitulo: 'Love Hate' },
            { imagen: 'assets/images/album-5.jpg',  titulo: 'Lost Gravity',    subtitulo: 'Fallen' },
            { imagen: 'assets/images/album-6.jpg',  titulo: 'Road Killer',     subtitulo: 'Hater' },
            { imagen: 'assets/images/album-7.jpg',  titulo: 'The Minimalists', subtitulo: 'Windows' },
            { imagen: 'assets/images/album-8.jpg',  titulo: 'Philip Jax',      subtitulo: 'Blame' },
            { imagen: 'assets/images/album-9.jpg',  titulo: 'Sadie Maxwell',   subtitulo: 'Firewall' },
            { imagen: 'assets/images/album-10.jpg', titulo: 'Bad Habits',      subtitulo: 'Joy' },
            { imagen: 'assets/images/album-11.jpg', titulo: 'Low Distance',    subtitulo: 'Free Your Mind' },
            { imagen: 'assets/images/album-12.jpg', titulo: 'Fast Track',      subtitulo: 'Low Bass' },
            { imagen: 'assets/images/album-13.jpg', titulo: 'Neonium',         subtitulo: 'Neon Dreams' },
            { imagen: 'assets/images/album-14.jpg', titulo: 'Blue Pistol',     subtitulo: 'Velvet Nights' },
            { imagen: 'assets/images/album-15.jpg', titulo: 'Geo Werk',        subtitulo: 'Green Greed' },
            { imagen: 'assets/images/album-16-150x150.jpg', titulo: 'Bad Hood', subtitulo: 'Bad Day' }
        ];

        const discoGrilla = document.getElementById('disco-grilla');
        const discoBotonMas = document.getElementById('disco-boton-mas');

        function crearCardAlbum(datos) {
            let card = document.createElement('div');
            card.className = 'disco-card';

            let imagen = document.createElement('img');
            imagen.src = datos.imagen;
            imagen.alt = datos.titulo;

            let overlay = document.createElement('div');
            overlay.className = 'disco-overlay';

            let titulo = document.createElement('h3');
            titulo.textContent = datos.titulo;

            let subtitulo = document.createElement('p');
            subtitulo.textContent = datos.subtitulo;

            overlay.appendChild(titulo);
            overlay.appendChild(subtitulo);
            card.appendChild(imagen);
            card.appendChild(overlay);
            return card;
        }

        if (discoGrilla) {
            if (discoBotonMas) {
                // (Home / About): 4 discos por vez, en loop
                let albumesMostrados = 0;
                const paso = 4;

                function mostrarAlbumes() {
                    for (let i = 0; i < paso; i++) {
                        let indice = albumesMostrados % datosAlbumes.length;
                        discoGrilla.appendChild(crearCardAlbum(datosAlbumes[indice]));
                        albumesMostrados = albumesMostrados + 1;
                    }
                }

                mostrarAlbumes();
                discoBotonMas.addEventListener('click', mostrarAlbumes);
            } else {
                // Modo completo 
                for (let i = 0; i < datosAlbumes.length; i++) {
                    discoGrilla.appendChild(crearCardAlbum(datosAlbumes[i]));
                }
            }
        }
    }

    // ─── DETALLE DE EVENTO (Event) ─────────────────────────
    {
        const datosEvento = {
            imagen: '../assets/images/tour-single-1.jpg',
            mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d130266.40107923658!2d17.8419701!3d59.3260668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f763119640bcb%3A0xa80d27d3679d7766!2sStockholm%2C%20Suecia!5e0!3m2!1ses!2sar!4v0000000000000',
            detalles: [
                { etiqueta: 'Time',         valor: 'June 10, 2018 from 07 to 11pm',    link: null },
                { etiqueta: 'Location',     valor: 'Stockholm, Sweden',                link: null },
                { etiqueta: 'Website',      valor: 'www.bridge217.qodeinteractive.com', link: '#' },
                { etiqueta: 'Event Type',   valor: 'concert, tour',                    link: null },
                { etiqueta: 'Organized By', valor: 'Mark Jones',                       link: null }
            ],
            aboutTour: 'Lorem ipsum dolor sit amet, est ad graecis principes. Ad vis iisque saperet. Eu eos quod affert. Vim invidunt efficiendi ea, eu eos veniam percipit dignissim, an cum suas laudem. Eum eu ipsum mentitum delectus. Te vix solet consulatu expetendis. Dictas elige ndi antiopam has ne, admodum hendrerit eu vis, sit nonumy operere eu. Ei qui solet offendit. Ius no graeco possim aeterno, eam at omnium diceret accumsan. Eu nec iisque utroque, ad qui veniam hendrerit.',
            redes: [
                { href: 'https://x.com/',             icono: 'fab fa-twitter' },
                { href: 'https://www.instagram.com/', icono: 'fab fa-instagram' },
                { href: 'https://www.vimeo.com',      icono: 'fab fa-vimeo-v' },
                { href: 'https://www.tumblr.com',     icono: 'fab fa-tumblr' },
                { href: 'https://www.youtube.com/',   icono: 'fab fa-youtube' },
                { href: 'https://www.facebook.com/',  icono: 'fab fa-facebook-f' },
                { href: 'https://www.pinterest.com/', icono: 'fab fa-pinterest-p' }
            ]
        };

        const eventContenido = document.getElementById('event-contenido');

        if (eventContenido) {

            let filaTop = document.createElement('div');
            filaTop.className = 'event-fila-top';

            let contenedorImagen = document.createElement('div');
            contenedorImagen.className = 'event-imagen';

            let imagenEvento = document.createElement('img');
            imagenEvento.src = datosEvento.imagen;
            imagenEvento.alt = 'Event';
            contenedorImagen.appendChild(imagenEvento);

            let contenedorMapa = document.createElement('div');
            contenedorMapa.className = 'event-mapa';

            let mapa = document.createElement('iframe');
            mapa.src = datosEvento.mapa;
            mapa.allowFullscreen = true;
            mapa.loading = 'lazy';
            contenedorMapa.appendChild(mapa);

            filaTop.appendChild(contenedorImagen);
            filaTop.appendChild(contenedorMapa);

            let filaMedio = document.createElement('div');
            filaMedio.className = 'event-fila-medio';

            let columnaDetalles = document.createElement('div');
            columnaDetalles.className = 'event-detalles';

            let tituloDetalles = document.createElement('h2');
            tituloDetalles.textContent = 'Details';

            let listaDetalles = document.createElement('ul');
            listaDetalles.className = 'event-info';

            for (let i = 0; i < datosEvento.detalles.length; i++) {
                let item = document.createElement('li');
                let etiqueta = document.createElement('span');
                etiqueta.textContent = datosEvento.detalles[i].etiqueta + ':';
                item.appendChild(etiqueta);

                if (datosEvento.detalles[i].link) {
                    let enlace = document.createElement('a');
                    enlace.href = datosEvento.detalles[i].link;
                    enlace.textContent = ' ' + datosEvento.detalles[i].valor;
                    item.appendChild(enlace);
                } else {
                    let valor = document.createElement('span');
                    valor.textContent = ' ' + datosEvento.detalles[i].valor;
                    item.appendChild(valor);
                }
                listaDetalles.appendChild(item);
            }

            let botonTickets = document.createElement('button');
            botonTickets.className = 'event-tickets-btn';
            botonTickets.textContent = 'Buy Tickets';

            columnaDetalles.appendChild(tituloDetalles);
            columnaDetalles.appendChild(listaDetalles);
            columnaDetalles.appendChild(botonTickets);

            let columnaDerecha = document.createElement('div');
            columnaDerecha.className = 'event-derecha';

            let seccionAbout = document.createElement('div');
            seccionAbout.className = 'event-about';

            let tituloAbout = document.createElement('h2');
            tituloAbout.textContent = 'About Tour';

            let textoAbout = document.createElement('p');
            textoAbout.textContent = datosEvento.aboutTour;

            seccionAbout.appendChild(tituloAbout);
            seccionAbout.appendChild(textoAbout);

            let seccionRedes = document.createElement('div');
            seccionRedes.className = 'event-redes';

            let tituloRedes = document.createElement('h2');
            tituloRedes.textContent = 'Follow And Share:';

            let iconosRedes = document.createElement('div');
            iconosRedes.className = 'event-redes-iconos';

            for (let i = 0; i < datosEvento.redes.length; i++) {
                let enlace = document.createElement('a');
                enlace.href = datosEvento.redes[i].href;
                enlace.target = '_blank';

                let icono = document.createElement('i');
                icono.className = datosEvento.redes[i].icono;

                enlace.appendChild(icono);
                iconosRedes.appendChild(enlace);
            }

            seccionRedes.appendChild(tituloRedes);
            seccionRedes.appendChild(iconosRedes);

            columnaDerecha.appendChild(seccionAbout);
            columnaDerecha.appendChild(seccionRedes);

            filaMedio.appendChild(columnaDetalles);
            filaMedio.appendChild(columnaDerecha);

            eventContenido.appendChild(filaTop);
            eventContenido.appendChild(filaMedio);
        }
    }

    // ─── CONTACTO — COLUMNAS DE INFO (Contact) ────────────
    {
        const datosContactoInfo = [
            { titulo: 'Press',      email: 'youremail@yourdomain.com', telefono: '+88 (0) 101 0000 000' },
            { titulo: 'Management', email: 'youremail@yourdomain.com', telefono: '+88 (0) 101 0000 000' },
            { titulo: 'Booking',    email: 'youremail@yourdomain.com', telefono: '+88 (0) 101 0000 000' },
            { titulo: 'Label',      email: 'youremail@yourdomain.com', telefono: '+88 (0) 101 0000 000' }
        ];

        const contactoInfoGrilla = document.getElementById('contact-info-grilla');

        if (contactoInfoGrilla) {
            datosContactoInfo.forEach(function (item) {
                const col = document.createElement('div');
                col.className = 'contact-info-col';

                col.innerHTML =
                    '<h3>' + item.titulo + '</h3>' +
                    '<p>' + item.email + '</p>' +
                    '<p>' + item.telefono + '</p>';

                contactoInfoGrilla.appendChild(col);
            });
        }
    }

    // ─── CONTACTO — CIUDADES (Contact) ─────────────────────
    {
        const datosCiudades = [
            {
                nombre: 'Barcelona',
                direccion: '198 West 21th Street, Suite 721',
                ciudadCP: 'Barcelona 20020',
                email: 'youremail@yourdomain.com',
                telefono: '+88 (0) 101 0000 000'
            },
            {
                nombre: 'New York',
                direccion: '198 West 21th Street, Suite 521',
                ciudadCP: 'New York 20020',
                email: 'youremail@yourdomain.com',
                telefono: '+88 (0) 101 0000 000'
            }
        ];

        const contactoCiudades = document.getElementById('contact-ciudades');

        if (contactoCiudades) {
            datosCiudades.forEach(function (ciudad) {
                const bloque = document.createElement('div');
                bloque.className = 'contact-ciudad';

                bloque.innerHTML =
                    '<h4>' + ciudad.nombre + '</h4>' +
                    '<p>' + ciudad.direccion + '</p>' +
                    '<p>' + ciudad.ciudadCP + '</p>' +
                    '<p>Email: ' + ciudad.email + '</p>' +
                    '<p>Phone: ' + ciudad.telefono + '</p>';

                contactoCiudades.appendChild(bloque);
            });
        }
    }

    // ─── CONTACTO — VALIDACION DE FORMULARIO (Contact) ─────
    {
        const campoNombre  = document.getElementById('campo-nombre');
        const campoEmail   = document.getElementById('campo-email');
        const campoMensaje = document.getElementById('campo-mensaje');
        const formMensaje  = document.getElementById('form-mensaje');
        const botonEnviar  = document.getElementById('boton-enviar');

        if (botonEnviar) {
            botonEnviar.addEventListener('click', function (e) {
                e.preventDefault();

                const nombre  = campoNombre.value.trim();
                const email   = campoEmail.value.trim();
                const mensaje = campoMensaje.value.trim();

                let tieneArroba = false;
                let tienePunto = false;

                for (let i = 0; i < email.length; i++) {
                    if (email[i] === '@') {
                        tieneArroba = true;
                    }
                    if (email[i] === '.') {
                        tienePunto = true;
                    }
                }

                if (nombre === '') {
                    formMensaje.textContent = 'Por favor completá tu nombre.';
                    formMensaje.className = 'contact-form-mensaje mensaje-error';
                    return;
                }

                if (email === '' || !tieneArroba || !tienePunto) {
                    formMensaje.textContent = 'Ingresá un email válido.';
                    formMensaje.className = 'contact-form-mensaje mensaje-error';
                    return;
                }

                if (mensaje === '') {
                    formMensaje.textContent = 'Por favor escribí tu mensaje.';
                    formMensaje.className = 'contact-form-mensaje mensaje-error';
                    return;
                }

                formMensaje.textContent = '¡Mensaje enviado con éxito!';
                formMensaje.className = 'contact-form-mensaje mensaje-ok';

                campoNombre.value = '';
                campoEmail.value = '';
                campoMensaje.value = '';
            });
        }
    }

    // ─── ABOUT US — INTEGRANTES  ────────────────────
    {
        const integrantes = [
            { imagen: '../assets/images/team-1.jpg', nombre: 'John Smith', rol: 'Vocals' },
            { imagen: '../assets/images/team-2.jpg', nombre: 'Josh Roon',  rol: 'Drums' },
            { imagen: '../assets/images/team-3.jpg', nombre: 'Mark Jones', rol: 'Guitar' },
            { imagen: '../assets/images/team-4.jpg', nombre: 'Alex Brown', rol: 'Keyboard' }
        ];

        const contenedor = document.querySelector('.popUpMembers');

        if (contenedor) {
            integrantes.forEach(function (integrante) {
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
    }

    // ─── ALBUM — REPRODUCTOR (Album) ───────────────────────
    {
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

        const contenedorControles = document.getElementById('album-controles');

        if (contenedorControles) {

            let cancionActual = 0;
            let audio = new Audio();
            audio.src = canciones[0].audio;

            let botonAnterior = document.createElement('button');
            botonAnterior.innerHTML = '<i class="fas fa-step-backward"></i>';

            let botonPlay = document.createElement('button');
            botonPlay.innerHTML = '<i class="fas fa-play"></i>';

            let botonSiguiente = document.createElement('button');
            botonSiguiente.innerHTML = '<i class="fas fa-step-forward"></i>';

            contenedorControles.appendChild(botonAnterior);
            contenedorControles.appendChild(botonPlay);
            contenedorControles.appendChild(botonSiguiente);

            const progresoTrack = document.getElementById('album-progreso-track');
            const progresoFill  = document.getElementById('album-progreso-fill');

            const cancionInfo = document.getElementById('album-cancion-info');

            let infoTitulo = document.createElement('div');
            infoTitulo.className = 'info-titulo';
            infoTitulo.textContent = canciones[0].titulo;

            let infoArtista = document.createElement('div');
            infoArtista.className = 'info-artista';
            infoArtista.textContent = 'Ouia Princess';

            cancionInfo.appendChild(infoTitulo);
            cancionInfo.appendChild(infoArtista);

            botonPlay.addEventListener('click', function () {
                if (audio.paused) {
                    audio.play();
                    botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    audio.pause();
                    botonPlay.innerHTML = '<i class="fas fa-play"></i>';
                }
            });

            botonSiguiente.addEventListener('click', function () {
                cancionActual = cancionActual + 1;
                if (cancionActual >= canciones.length) {
                    cancionActual = 0;
                }
                audio.src = canciones[cancionActual].audio;
                audio.play();
                botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
                infoTitulo.textContent = canciones[cancionActual].titulo;
            });

            botonAnterior.addEventListener('click', function () {
                cancionActual = cancionActual - 1;
                if (cancionActual < 0) {
                    cancionActual = canciones.length - 1;
                }
                audio.src = canciones[cancionActual].audio;
                audio.play();
                botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
                infoTitulo.textContent = canciones[cancionActual].titulo;
            });

            audio.addEventListener('timeupdate', function () {
                if (audio.duration) {
                    let porcentaje = (audio.currentTime / audio.duration) * 100;
                    progresoFill.style.width = porcentaje + '%';
                }
            });

            progresoTrack.addEventListener('click', function (e) {
                if (audio.duration) {
                    let rect = progresoTrack.getBoundingClientRect();
                    let posicion = e.clientX - rect.left;
                    let porcentaje = posicion / rect.width;
                    audio.currentTime = porcentaje * audio.duration;
                }
            });

            audio.addEventListener('ended', function () {
                cancionActual = cancionActual + 1;
                if (cancionActual >= canciones.length) {
                    cancionActual = 0;
                }
                audio.src = canciones[cancionActual].audio;
                audio.play();
                infoTitulo.textContent = canciones[cancionActual].titulo;
            });

            const tracklist = document.getElementById('album-tracklist');

            let tituloTracklist = document.createElement('h3');
            tituloTracklist.textContent = 'Tracklist';
            tracklist.appendChild(tituloTracklist);

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

                fila.addEventListener('click', function () {
                    cancionActual = i;
                    audio.src = canciones[i].audio;
                    audio.play();
                    botonPlay.innerHTML = '<i class="fas fa-pause"></i>';
                    infoTitulo.textContent = canciones[i].titulo;
                });

                tracklist.appendChild(fila);
            }
        }
    }

    // ─── ALBUM — LETRAS (ACORDEON) (Album) ─────────────────
    {
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

        if (lyricLista) {
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

                tituloLyric.addEventListener('click', function () {
                    let estaAbierto = cuerpo.classList.contains('abierto');

                    let todosLosCuerpos = document.querySelectorAll('.lyric-cuerpo');
                    let todosTitulosLyric = document.querySelectorAll('.lyric-titulo');
                    for (let j = 0; j < todosLosCuerpos.length; j++) {
                        todosLosCuerpos[j].classList.remove('abierto');
                        todosTitulosLyric[j].classList.remove('abierto');
                    }

                    if (estaAbierto === false) {
                        cuerpo.classList.add('abierto');
                        tituloLyric.classList.add('abierto');
                    }
                });

                item.appendChild(tituloLyric);
                item.appendChild(cuerpo);
                lyricLista.appendChild(item);
            }
        }
    }

    // ─── ALBUM — REVIEWS SLIDER (Album) ────────────────────
    {
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

        if (reviewTexto && reviewAutor && reviewPrev && reviewNext) {

            let reviewActual = 0;
            let reviewTimer;

            function mostrarReview(i) {
                reviewTexto.textContent = reviews[i].texto;
                reviewAutor.textContent = reviews[i].autor;
            }

            reviewNext.addEventListener('click', function () {
                reviewActual = reviewActual + 1;
                if (reviewActual >= reviews.length) {
                    reviewActual = 0;
                }
                mostrarReview(reviewActual);
                clearInterval(reviewTimer);
                reviewTimer = setInterval(function () {
                    reviewActual = (reviewActual + 1) % reviews.length;
                    mostrarReview(reviewActual);
                }, 5000);
            });

            reviewPrev.addEventListener('click', function () {
                reviewActual = reviewActual - 1;
                if (reviewActual < 0) {
                    reviewActual = reviews.length - 1;
                }
                mostrarReview(reviewActual);
                clearInterval(reviewTimer);
                reviewTimer = setInterval(function () {
                    reviewActual = (reviewActual + 1) % reviews.length;
                    mostrarReview(reviewActual);
                }, 5000);
            });

            mostrarReview(0);
            reviewTimer = setInterval(function () {
                reviewActual = (reviewActual + 1) % reviews.length;
                mostrarReview(reviewActual);
            }, 5000);
        }
    }

    // ─── ALBUM — ABOUT ALBUM (Album) ───────────────────────
    {
        const datosAbout = {
            titulo: 'About Album',
            descripcion: 'This is Photoshop\'s version of Lorem Ipsum. Proin gravida nibh vel velia uctor erecs aliquenean sollicitudiem quis bibendum auctor, nisi elit consequat ipsutis sem nibh idelit.',
            meta: [
                { etiqueta: 'Artist',       valor: 'Ouia Princess' },
                { etiqueta: 'Label',        valor: 'Island' },
                { etiqueta: 'Release Date', valor: 'April 29, 2018' },
                { etiqueta: 'People',       valor: 'Jack Jones, Madonna, Rout, DJ Sample' }
            ]
        };

        const contenedorAbout = document.getElementById('album-about');

        if (contenedorAbout) {

            let tituloAbout = document.createElement('h2');
            tituloAbout.textContent = datosAbout.titulo;

            let descripcionAbout = document.createElement('p');
            descripcionAbout.textContent = datosAbout.descripcion;

            let lista = document.createElement('ul');
            lista.className = 'album-meta';

            for (let i = 0; i < datosAbout.meta.length; i++) {
                let item = document.createElement('li');

                let etiqueta = document.createElement('span');
                etiqueta.textContent = datosAbout.meta[i].etiqueta + ':';

                let valor = document.createElement('span');
                valor.textContent = ' ' + datosAbout.meta[i].valor;

                item.appendChild(etiqueta);
                item.appendChild(valor);

                lista.appendChild(item);
            }

            contenedorAbout.appendChild(tituloAbout);
            contenedorAbout.appendChild(descripcionAbout);
            contenedorAbout.appendChild(lista);
        }
    }

   // ─── MODO CLARO / OSCURO  ──
{
    const html = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');

    if (localStorage.temaSitio === 'light') {
        html.setAttribute('data-theme', 'light');
    }

    if (toggleBtn) {
        const actualizarEstado = function () {
            const esClaro = html.getAttribute('data-theme') === 'light';

            if (esClaro) {
                toggleBtn.setAttribute('aria-pressed', 'true');
                toggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
            } else {
                toggleBtn.setAttribute('aria-pressed', 'false');
                toggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
            }
        };

        actualizarEstado();

        toggleBtn.addEventListener('click', function () {
            const esClaroAhora = html.getAttribute('data-theme') === 'light';

            if (esClaroAhora) {
                html.setAttribute('data-theme', 'dark');
                localStorage.temaSitio = 'dark';
            } else {
                html.setAttribute('data-theme', 'light');
                localStorage.temaSitio = 'light';
            }

            actualizarEstado();
        });
    }
}

   // ─── MENÚ HAMBURGUESA (todas las páginas) ──
{
    const menuBtn = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');
    let menuAbierto = false; 

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function () {
            if (menuAbierto === false) {
                nav.classList.add('abierto');
                menuBtn.setAttribute('aria-expanded', 'true');
                menuAbierto = true;
            } else {
                nav.classList.remove('abierto');// Remove borra el nombre de esa clase 
                menuBtn.setAttribute('aria-expanded', 'false');
                menuAbierto = false;
            }
        });
    }
} 
    // ─── SCROLL TO TOP ( ──
    {
        const scrollBtn = document.getElementById('scroll-top');

        if (scrollBtn) {
            window.addEventListener('scroll', function () {
                const paginaBajada = window.scrollY > window.innerHeight * 0.5;

                if (paginaBajada) {
                    scrollBtn.classList.add('visible');
                } else {
                   
                    scrollBtn.classList.remove('visible');
                }
            });

            scrollBtn.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

});