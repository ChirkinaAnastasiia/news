import fetchRequest from './fetchRequest.js';
import {renderCard} from './renderCard.js';
import {API_KEY, HEADLINES} from './const.js';

export const getData = () => Promise.all([
  fetchRequest(HEADLINES, 'us', '8', {
    headers: {
      'X-Api-Key': API_KEY,
    },
    callback: renderCard,
  }),
]);

