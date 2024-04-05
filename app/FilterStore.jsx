import { makeAutoObservable } from 'mobx';

class FiltersApplied {
  saved = [];

  constructor() {
    makeAutoObservable(this);
  }

  // addFavorite(name, image , speed, price) {
  //   this.saved.push({name: name, image: image, speed: speed, price: price});
  // }
  addFilter(filter) {
    this.saved.push(filter);
  }

  getFilters() {
    return this.saved
  }
  clearFilters(){
    this.saved = [];
  }

  removeFavourite(f) {
    this.saved = this.saved.filter(filter => filter !== f);
  }

}
const filterStore = new FiltersApplied();
export default filterStore;