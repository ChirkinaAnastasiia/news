import fetchRequest from './fetchRequest.js';
import {renderCard} from './renderCard.js';
import {HEADLINES} from './const.js';

export const getData = () => Promise.all([
  fetchRequest(HEADLINES, 'us', '8', {
    callback: renderCard,
  }),
]);
