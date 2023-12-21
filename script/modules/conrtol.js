import {
  freshNewsList,
  freshNewsTitle,
  formSelect,
  form,
  searchSection,
  searchNewsList,
  searchNewsTitle} from './getElement.js';
import {getHeadlinesData, getSearchData} from './serviceAPI.js';
import preload from './preload.js';


export const controlForm = () => {
  formSelect.addEventListener('change', () => {
    const country = form.country.value;
    localStorage.setItem('country', country);

    getHeadlinesData(8).then(data => {
      if (data[0]) {
        preload.remove();

        searchSection.style.display = 'none';
        freshNewsList.append(data[0]);
      } else {
        freshNewsTitle.textContent =
        'Что-то пошло не так. Попробуйте чуть позже...';
      }
    });
  });


  form.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.search.value || !(form.search.value.trim())) {
      getHeadlinesData(8).then(data => {
        if (data[0]) {
          preload.remove();

          searchSection.style.display = 'block';
          searchNewsTitle.textContent =
            'Вы отправили пустой запрос. Попробуйте ещё раз!';

          freshNewsList.append(data[0]);
        } else {
          searchSection.style.display = 'none';
          freshNewsTitle.textContent =
            'Что-то пошло не так. Попробуйте чуть позже...';
        }

        form.reset();
      });
    } else if (form.search.value) {
      getSearchData(form.search.value).then(data => {
        preload.remove();

        if (data[0] && data[1]) {
          freshNewsList.append(data[0]);

          searchSection.style.display = 'block';
          searchNewsList.append(data[1]);
        } else {
          searchSection.style.display = 'none';
          freshNewsTitle.textContent =
            'Что-то пошло не так. Попробуйте чуть позже...';
        }

        form.reset();
      });
    }
  });
};

