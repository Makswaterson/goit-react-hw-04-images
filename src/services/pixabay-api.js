import axios from 'axios';

const API_KEY = '33002321-19e26a2e0d80c5887f70d695a';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export async function fetchImages(query, page) {
  const { data } = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
}
