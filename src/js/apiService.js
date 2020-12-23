export default {
  tag: '',
  page: 1,
  fetchImages() {
    const key = '19522595-24b394bcd15e2754e0ed68cbf';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${key}`;

    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.page += 1;
        return hits;
      })
      .catch(error => console.log(error));
  },
  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.tag;
  },

  set query(value) {
    this.tag = value;
  },
};
