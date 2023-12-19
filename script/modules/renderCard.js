import {freshNewsTitle} from './getElement.js';

const getImage = url => new Promise(resolve => {
  const image = new Image(270, 200);

  image.addEventListener('load', () => {
    resolve(image);
  });

  image.addEventListener('error', () => {
    image.src = '../../image/noimage.jpg';
    resolve(image);
  });

  image.src = url || '../../image/noimage.jpg';
  image.classList.add('news__image');

  return image;
});

export const renderCard = (err, data) => {
  if (err) {
    console.warn(err, data);
    freshNewsTitle.textContent = 'Что-то пошло не так. Попробуйте чуть позже...';
    return;
  }

  const template = document.createDocumentFragment();
  // newsList.textContent = '';

  const news = data.articles.map(async ({urlToImage, title, url, description, publishedAt, author, source}) => {
    const card = document.createElement('li');
    card.classList.add('news__item');

    const image = await getImage(urlToImage);
    image.alt = title || '';
    card.append(image);

    card.insertAdjacentHTML('beforeend', `
      <h3 class="news__subtitle">
        <a class="news__link" href="${url}" target="_blank">${title || ''}</a>
      </h3>

      <p class="news__description">${description || ''}</p>

      <div class="news__footer">
        <time class="news__datetime" datetime="${publishedAt}">
          <span class="news__date">16/03/2022</span>11:06
        </time>

        <p class="news__author">${author || source.name || ''}</p>
      </div>
    `);

    return card;
  });

  Promise.all(news).then(data => {
    return template.append(...data);
  });

  console.log(template);
  return template;
};