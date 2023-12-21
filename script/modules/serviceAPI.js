import fetchRequest from './fetchRequest.js';
import {renderCard} from './renderCard.js';
import {API_KEY, HEADLINES, SEARCH} from './const.js';
import choices from './choices.js';
import preload from './preload.js';


export const getHeadlinesData = (number) => {
  const country = localStorage.getItem('country') || 'ru';
  choices.setChoiceByValue(country);

  preload.show();

  return Promise.all([
    fetchRequest(HEADLINES, country, number, {
      headers: {
        'X-Api-Key': API_KEY,
      },
      callback: renderCard,
    }),
  ]);
};

export const getSearchData = (search) => {
  const country = localStorage.getItem('country') || 'ru';
  choices.setChoiceByValue(country);

  preload.show();

  return Promise.all([
    fetchRequest(HEADLINES, country, 4, {
      headers: {
        'X-Api-Key': API_KEY,
      },
      callback: renderCard,
    }),
    fetchRequest(SEARCH, search, 8, {
      headers: {
        'X-Api-Key': API_KEY,
      },
      callback: renderCard,
    }),
  ]);
};
