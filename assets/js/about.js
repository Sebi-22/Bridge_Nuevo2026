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