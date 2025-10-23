document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

// Modal functionality for projects page
if (document.getElementById('projectModal')) {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalStatement = document.getElementById('modalStatement');
    const externalLinkContainer = document.getElementById('externalLinkContainer');
    const modalExternalLink = document.getElementById('modalExternalLink');
    const additionalImagesContainer = document.getElementById('additionalImagesContainer');
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const image = card.getAttribute('data-image');
            const images = card.getAttribute('data-images');
            const imageTitles = card.getAttribute('data-image-titles');
            const statement = card.getAttribute('data-statement');
            const external = card.getAttribute('data-external');

            modalTitle.textContent = title;
            modalStatement.textContent = statement;

            // Always show the main image
            modalImage.src = image;

            // Clear additional images container
            additionalImagesContainer.innerHTML = '';

            // Handle additional images
            if (images && images.trim() !== '') {
                const imageArray = images.split(',').map(img => img.trim());
                const titleArray = imageTitles ? imageTitles.split(',').map(t => t.trim()) : [];

                const gridDiv = document.createElement('div');
                gridDiv.className = 'modal-images-grid';
                
                // Show ALL images from data-images
                imageArray.forEach((imgSrc, index) => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'modal-series-item';

                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.className = 'modal-series-image';
                    img.alt = titleArray[index] || title;
                    itemDiv.appendChild(img);

                    // Add title if it exists
                    if (titleArray[index]) {
                        const titleElem = document.createElement('div');
                        titleElem.className = 'modal-series-title';
                        titleElem.textContent = titleArray[index];
                        itemDiv.appendChild(titleElem);
                    }

                    gridDiv.appendChild(itemDiv);
                });

                additionalImagesContainer.appendChild(gridDiv);
            }

            // Handle external link
            if (external && external.trim() !== '') {
                externalLinkContainer.style.display = 'block';
                modalExternalLink.href = external;
            } else {
                externalLinkContainer.style.display = 'none';
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}