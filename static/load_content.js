document.addEventListener('DOMContentLoaded', async () => {
    try {
        const contentResponse = await fetch('/static/content.json');
        const contentData = await contentResponse.json();

        const serviceTemplate = document.getElementById('service-template');
        const portfolioTemplate = document.getElementById('portfolio-template');

        // Update Company Details
        document.getElementById("footer-company-name").textContent = contentData.company.name
        document.getElementById("phone-number").textContent = contentData.company.phone
        document.getElementById("linkedin-anchor").href = contentData.company.linkedin
        document.getElementById("instagram-anchor").href = contentData.company.instagram

        // Load Services
        const servicesContainer = document.querySelector('#services-container');
        servicesContainer.innerHTML = '';

        contentData.services.items.forEach(service => {
            const serviceItem = serviceTemplate.content.cloneNode(true);
            serviceItem.querySelector('.feature-icon i').className = service.icon;
            serviceItem.querySelector('.service-title').textContent = service.title;
            serviceItem.querySelector('.service-description').textContent = service.description;

            servicesContainer.appendChild(serviceItem);
        });

        // Load Portfolio
        const portfolioContainer = document.querySelector('#portfolio-container');
        portfolioContainer.innerHTML = '';

        contentData.portfolio.items.forEach((project, index) => {
            const portfolioItem = portfolioTemplate.content.cloneNode(true);
            const carouselItem = portfolioItem.querySelector('.carousel-item');

            // Set the first item as active
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            portfolioItem.querySelector('img').src = project.image;
            portfolioItem.querySelector('img').alt = project.title;
            portfolioItem.querySelector('.portfolio-title').textContent = project.title;
            portfolioItem.querySelector('.portfolio-description').textContent = project.description;

            portfolioContainer.appendChild(carouselItem);
        });


        // Set Formspree Info
        const form = document.getElementById("contact-form");
        form.action = `https://formspree.io/f/${contentData.formspree_id}`;

    } catch (error) {
        console.error('Error loading content:', error);
        alert('Something went wrong while loading content. Please try again.');
    }
});
