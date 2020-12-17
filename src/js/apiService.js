const url = 'https://pixabay.com/api/';
const key = '19522595-24b394bcd15e2754e0ed68cbf';

export default function fetchImages(tag, page = 1) {
  return fetch(
    `${url}?image_type=photo&orientation=horizontal&q=${tag}&page=${page}&per_page=12&key=${key}`,
  ).then(response => response.json());
}
