import { refs } from './js/refs';
import fetchImages from './js/apiService';
import createCardImage from './js/card';
import debounce from 'lodash.debounce';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './styles.css';

refs.form.addEventListener('input', debounce(searchImages, 700));

function searchImages() {
  const currentSearch = refs.form.value;
  if (currentSearch !== '') {
    fetchImages(currentSearch).then(data => {
      if (!data) {
        return;
      }
      createCardImage(data.hits);
    });
  }
  refs.gallery.innerHTML = '';
}
