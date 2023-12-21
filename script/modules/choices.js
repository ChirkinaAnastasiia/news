const choicesElement = document.querySelector('.header__js-choice');

const choices = new Choices(choicesElement, {
  searchEnabled: false,
  itemSelectText: '',
  // shouldSort: false,
});


export default choices;
