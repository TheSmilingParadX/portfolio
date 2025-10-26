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
    const modalVideoContainer = document.getElementById('modalVideoContainer');
    const modalVideo = document.getElementById('modalVideo');
    const modalVideoSource = document.getElementById('modalVideoSource');
    const modalTitle = document.getElementById('modalTitle');
    const modalMeta = document.getElementById('modalMeta');
    const modalStatement = document.getElementById('modalStatement');
    const externalLinkContainer = document.getElementById('externalLinkContainer');
    const modalExternalLink = document.getElementById('modalExternalLink');
    const additionalImagesContainer = document.getElementById('additionalImagesContainer');
    const projectCards = document.querySelectorAll('.project-card');

    // Function to open a specific project modal
    function openProjectModal(card) {
        const title = card.getAttribute('data-title');
        const year = card.getAttribute('data-year');
        const software = card.getAttribute('data-software');
        const image = card.getAttribute('data-image');
        const video = card.getAttribute('data-video');
        const images = card.getAttribute('data-images');
        const imageTitles = card.getAttribute('data-image-titles');
        const statement = card.getAttribute('data-statement');
        const external = card.getAttribute('data-external');

        modalTitle.textContent = title;
        modalStatement.textContent = statement;

        // Build metadata section
        modalMeta.innerHTML = '';
        if (year || software) {
            if (year) {
                const yearDiv = document.createElement('div');
                yearDiv.className = 'modal-meta-item';
                yearDiv.innerHTML = `
                    <div class="modal-meta-label">Date</div>
                    <div class="modal-meta-value">${year}</div>
                `;
                modalMeta.appendChild(yearDiv);
            }
            
            if (software) {
                const softwareDiv = document.createElement('div');
                softwareDiv.className = 'modal-meta-item';
                softwareDiv.innerHTML = `
                    <div class="modal-meta-label">Software</div>
                    <div class="modal-meta-value">${software}</div>
                `;
                modalMeta.appendChild(softwareDiv);
            }
        }

        // Check if project has video
        if (video && video.trim() !== '') {
            modalImage.style.display = 'none';
            modalVideoContainer.style.display = 'block';
            modalVideoSource.src = video;
            modalVideo.load();
        } else {
            modalImage.style.display = 'block';
            modalVideoContainer.style.display = 'none';
            modalImage.src = image;
        }

        // Clear additional images container
        additionalImagesContainer.innerHTML = '';

        // Handle additional images
        if (images && images.trim() !== '') {
            const imageArray = images.split(',').map(img => img.trim());
            const titleArray = imageTitles ? imageTitles.split(',').map(t => t.trim()) : [];
            
            const gridDiv = document.createElement('div');
            gridDiv.className = 'modal-images-grid';
            
            imageArray.forEach((imgSrc, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'modal-series-item';

                const img = document.createElement('img');
                img.src = imgSrc;
                img.className = 'modal-series-image';
                img.alt = titleArray[index] || title;
                itemDiv.appendChild(img);

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
    }

    // Add click handlers to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            openProjectModal(card);
        });
    });

    // Check URL for project parameter and auto-open modal
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    if (projectId) {
        const targetCard = document.getElementById(projectId);
        if (targetCard) {
            // Small delay to ensure page is fully loaded
            setTimeout(() => {
                openProjectModal(targetCard);
            }, 100);
        }
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        if (modalVideo) {
            modalVideo.pause();
        }
        // Remove project parameter from URL when closing
        const url = new URL(window.location);
        url.searchParams.delete('project');
        window.history.replaceState({}, '', url);
    }

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
