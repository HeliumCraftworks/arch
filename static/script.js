const form = document.getElementById('contact-form');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll(".nav-link");
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector("#navbarNav");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        if (navbarCollapse.classList.contains("show")) {
            navbarToggler.click();
        }
    });
});

var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
        return;
    }
    if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink')
    } else {
        navbarCollapsible.classList.add('navbar-shrink')
    }
};

navbarShrink();
document.addEventListener('scroll', navbarShrink);

overlay.style.display = 'none';

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    setTimeout(function () {
        overlay.style.display = 'flex';
        form.reset();
        setTimeout(function () {
            overlay.style.display = 'none';
        }, 3000);
    }, 500);
});
