import { makeAutoObservable } from 'mobx';

class SavedRecipes {
  saved = [];

  constructor() {
    makeAutoObservable(this);
  }

  // addFavorite(name, image , speed, price) {
  //   this.saved.push({name: name, image: image, speed: speed, price: price});
  // }
  addFavorite(meal) {
    this.saved.push(meal);
  }

  getFavoriteById(mealId) {
    return this.saved.find(meal => meal.id == mealId)
  }

  removeFavorite(mealID) {

  }

}
const recipeStore = new SavedRecipes();
export default recipeStore;