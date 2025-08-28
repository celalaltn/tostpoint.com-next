document.addEventListener('DOMContentLoaded', function () {
    const url = 'franchaise2.pdf';
    const flipbookEl = document.getElementById('flipbook');
    const pageIndicator = document.getElementById('page-indicator');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loading-indicator';
    loadingIndicator.textContent = 'Katalog Yükleniyor...';
    document.body.appendChild(loadingIndicator);

    async function renderPdfToFlipbook() {
        try {
            const pdf = await pdfjsLib.getDocument(url).promise;
            const numPages = pdf.numPages;
            const container = document.querySelector('.container');
            const isMobile = window.innerWidth < 768;
            let bookWidth, bookHeight;

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });

                if (i === 1) {
                    const aspectRatio = viewport.height / viewport.width;
                    if (isMobile) {
                        bookWidth = container.clientWidth;
                    } else {
                        bookWidth = container.clientWidth / 2;
                    }
                    bookHeight = bookWidth * aspectRatio;
                }

                const pageElement = document.createElement('div');
                pageElement.classList.add('page');

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport: viewport }).promise;
                
                pageElement.appendChild(canvas);
                flipbookEl.appendChild(pageElement);
            }

            document.body.removeChild(loadingIndicator);

            const flipbook = new St.PageFlip(flipbookEl, {
                width: bookWidth,
                height: bookHeight,
                showCover: true
            });

            flipbook.loadFromHTML(document.querySelectorAll('.page'));

            function updatePageIndicator() {
                const currentPage = flipbook.getCurrentPageIndex();
                const totalPages = flipbook.getPageCount();
                const isMobile = window.innerWidth < 768;

                if (isMobile) {
                    pageIndicator.textContent = `${currentPage + 1} / ${totalPages}`;
                } else {
                    const startPage = currentPage * 2 + 1;
                    const endPage = Math.min(startPage + 1, totalPages);
                    pageIndicator.textContent = `${startPage} - ${endPage} / ${totalPages}`;
                }
            }

            flipbook.on('flip', () => updatePageIndicator());
            prevButton.addEventListener('click', () => flipbook.flipPrev());
            nextButton.addEventListener('click', () => flipbook.flipNext());

            updatePageIndicator();
        } catch (error) {
            console.error('Error loading or rendering PDF:', error);
            loadingIndicator.textContent = 'Katalog yüklenemedi.';
        }
    }

    renderPdfToFlipbook();
});
