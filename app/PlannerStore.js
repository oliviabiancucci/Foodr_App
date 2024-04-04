import { makeAutoObservable } from 'mobx';

class PlannerStore {
  plan = [];

  constructor() {
    makeAutoObservable(this);
  }

  addRecipe(recipe, date) {
    plannedDay = this.plan.find(p => (p.date.getYear() == date.getYear() && p.date.getMonth() == date.getMonth() && p.date.getDate() == date.getDate()));

    if(plannedDay) {
        plannedDay.recipes.push(recipe);
    }
    else {
        this.plan.push({
            date: date,
            recipes: [recipe]
        })
        this.plan.sort((a, b) => a.date - b.date);
    }

  }

}
const plannerStore = new PlannerStore();
export default plannerStore;