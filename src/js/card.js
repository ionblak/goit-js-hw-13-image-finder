import itemsTemplate from '../templates/card-image.hbs';
import { refs } from './refs';
import * as basicLightbox from 'basiclightbox';

export default function createCardImage(data) {
  const markup = itemsTemplate(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.gallery.addEventListener('click', showModal);
}
function showModal(event) {
  const currentImage = event.target;
  if (currentImage.nodeName !== 'IMG') {
    return;
  }
  const imageUrl = currentImage.dataset.image;
  const instance = basicLightbox.create(`
    <img src="${imageUrl}" width="800" height="600">
`);
  instance.show();
}
