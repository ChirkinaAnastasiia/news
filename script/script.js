import './modules/choices.js';
import {freshNewsList} from './modules/getElement.js';
import {getData} from './modules/serviceAPI.js';


getData().then(data => {
  console.log(data);
  console.log(data[0]);
  console.log(freshNewsList);
  freshNewsList.append(data[0]);
});