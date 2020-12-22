import { refs } from './js/refs';
import apiService from './js/apiService';
import createCardImage from './js/card';
import debounce from 'lodash.debounce';
import 'basiclightbox/dist/basicLightbox.min.css';
import './styles.css';

refs.form.addEventListener('input', debounce(searchImages, 700));
refs.allForm.addEventListener('submit', event => {
  event.preventDefault();
  searchImages();
});

function searchImages() {
  apiService.query = refs.form.value;
  if (apiService.query !== '') {
    apiService.resetPage();
    apiService.fetchImages().then(hits => {
      createCardImage(hits);
      // refs.button.classList.remove('is-hidden');

      InfiniteScroll();
    });
  }
  refs.gallery.innerHTML = '';

  // refs.button.classList.add('is-hidden');
}

// реализация бесконечного скрола
function InfiniteScroll() {
  window.addEventListener('scroll', debounce(scrolling, 500));
  function scrolling() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // console.log({ scrollTop, scrollHeight, clientHeight });

    if (clientHeight + scrollTop >= scrollHeight - 5) {
      // show the loading animation
      showLoading();
    }
  }
  function showLoading() {
    // refs.button.classList.add('is-hidden');
    refs.loadingImg.classList.add('show');
    setTimeout(() => {
      apiService.fetchImages().then(hits => {
        createCardImage(hits);
        refs.loadingImg.classList.remove('show');
      });
    }, 1000);
  }
}
// Реализация кнопки Load More

// refs.button.addEventListener('click', loadMore);

// function loadMore() {
//   apiService.fetchImages().then(hits => {
//     createCardImage(hits);

//     setTimeout(() => {
//       window.scrollBy({
//         top: 3000,
//         left: 100,
//         behavior: 'smooth',
//       });
//     }, 1000);
//   });
// }
