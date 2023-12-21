import {
  searchNewsTitle,
  freshNewsTitle,
  form,
  freshNewsList,
  searchNewsList} from './getElement.js';
import preload from './preload.js';
import declOfNum from './declOfNum.js';


const getImage = url => {
  const image = new Image(270, 200);

  image.src = url || '../../image/noimage.jpg';
  image.classList.add('news__image');

  return image;
};

const getCorrectDate = isoDate => {
  const date = new Date(isoDate);
  const fullDate = date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const fullTime = date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `<span class="news__date">${fullDate}</span>${fullTime}`;
};

export const renderCard = (err, data) => {
  if (err) {
    console.warn(err, data);
    preload.remove();
    return;
  }

  searchNewsList.innerHTML = '';
  freshNewsList.innerHTML = '';

  const count = data.totalResults;
  const findWord = declOfNum(count, ['найден', 'найдено', 'найдено']);
  const resultWord =
    declOfNum(count, ['результат', 'результата', 'результатов']);

  searchNewsTitle.textContent =
    `По вашему запросу “${form.search.value}” ` +
    `${findWord} ${count} ${resultWord}`;

  freshNewsTitle.textContent = 'Свежие новости';

  const template = document.createDocumentFragment();

  const news = data.articles.map(({
    urlToImage, title, url, description, publishedAt, author, source}) => {
    const card = document.createElement('li');
    card.classList.add('news__item');

    const image = getImage(urlToImage);
    card.append(image);

    card.insertAdjacentHTML('beforeend', `
      <h3 class="news__subtitle">
        <a class="news__link" href="${url}" target="_blank">${title || ''}</a>
      </h3>

      <p class="news__description">${description || ''}</p>

      <div class="news__footer">
        <time class="news__datetime" datetime="${publishedAt}">
          ${getCorrectDate(publishedAt)}
        </time>

        <p class="news__author">${author || source.name || ''}</p>
      </div>
    `);

    return card;
  });

  template.append(...news);

  return template;
};
