import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector(`.gallery`)
const imgMarkup = createGallery(galleryItems);
galleryEl.insertAdjacentHTML('beforeend', imgMarkup)

function createGallery(gallery) {
    return gallery.map(({ preview, original, description }) => {
            return `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`;
        })
        .join('')
}

galleryEl.addEventListener(`click`, handleClickOnGalleryEl)

function handleClickOnGalleryEl(e) {
    e.preventDefault()
    if (e.target.nodeName !== 'IMG') {
        return;
    }

    const instance = basicLightbox.create(`
    <div class="modal">
        <img src="${e.target.dataset.source}">
    </div>
    `,{
	onShow: (instance) => { document.addEventListener(`keydown`, escModal) },
	onClose: (instance) => { document.removeEventListener(`keydown`, escModal) }
})
    instance.show();
    
    // document.addEventListener(`keydown`, escModal, {once: true})

    function escModal({ code }) {
            if (code === `Escape`) {
                instance.close();
            }
        }
    
}
