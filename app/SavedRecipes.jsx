import { makeAutoObservable } from 'mobx';

class SavedRecipes {
  saved = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFavorite(name, image , speed, price) {
    this.saved.push({name: name, image: image, speed: speed, price: price});
  }

}
const stringStore = new SavedRecipes();
export default stringStore;