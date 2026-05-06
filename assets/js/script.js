// Scroll to top button
window.addEventListener('scroll', function() {
    const mayday = document.querySelector('.mayday');
    if (window.scrollY > 300) {
        mayday.classList.add('visible');
    } else {
        mayday.classList.remove('visible');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});