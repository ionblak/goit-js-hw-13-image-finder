import { refs } from './js/refs';
import apiService from './js/apiService';
import createCardImage from './js/card';
import debounce from 'lodash.debounce';
import InfiniteScroll from '../node_modules/infinite-scroll';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './styles.css';

refs.form.addEventListener('input', debounce(searchImages, 700));

function searchImages() {
  apiService.query = refs.form.value;
  if (apiService.query !== '') {
    apiService.resetPage();
    apiService.fetchImages().then(hits => {
      createCardImage(hits);
      refs.button.classList.remove('is-hidden');
      scroll(apiService.query);
    });
  }
  refs.gallery.innerHTML = '';
}

refs.button.addEventListener('click', loadMore);

function loadMore() {
  apiService.fetchImages().then(hits => {
    createCardImage(hits);

    setTimeout(() => {
      window.scrollBy({
        top: 3000,
        left: 100,
        behavior: 'smooth',
      });
    }, 1000);
  });
}

function scroll() {
  const infScroll = new InfiniteScroll(refs.gallery, {
    path: `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${apiService.query}&page={{#}}&per_page=12&key=19522595-24b394bcd15e2754e0ed68cbf`,
    append: false,
    responseType: 'text',
  });
  infScroll.on('load.infiniteScroll', function (event, response) {
    const data = JSON.parse(response);

    createCardImage(data.hits);
  });
}
