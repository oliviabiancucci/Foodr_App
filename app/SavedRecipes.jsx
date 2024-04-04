import { makeAutoObservable } from 'mobx';

class SavedRecipes {
  saved = [];

  constructor() {
    makeAutoObservable(this);
  }

  // addFavorite(name, image , speed, price) {
  //   this.saved.push({name: name, image: image, speed: speed, price: price});
  // }
  addFavorite(mealID) {
    this.saved.push(mealID);
  }

  removeFavorite(mealID) {
    
  }

}
const recipeStore = new SavedRecipes();
export default recipeStore;