import './modules/choices.js';
import {freshNewsList, freshNewsTitle} from './modules/getElement.js';
import {getHeadlinesData} from './modules/serviceAPI.js';
import {controlForm} from './modules/conrtol.js';
import preload from './modules/preload.js';


getHeadlinesData(8).then(data => {
  if (data[0]) {
    preload.remove();

    freshNewsList.append(data[0]);
  } else {
    freshNewsTitle.textContent =
      'Что-то пошло не так. Попробуйте чуть позже...';
  }
});

controlForm();
