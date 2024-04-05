import { makeAutoObservable } from "mobx";

class PlannerStore {
    plan = [];

    constructor() {
        makeAutoObservable(this);
    }

    addRecipe(recipe, date) {
        plannedDay = this.plan.find(
            (p) =>
                p.date.getYear() == date.getYear() &&
                p.date.getMonth() == date.getMonth() &&
                p.date.getDate() == date.getDate()
        );

        if (plannedDay) {
            plannedDay.recipes.push(recipe);
        } else {
            this.plan.push({
                date: date,
                recipes: [recipe],
            });
            this.plan.sort((a, b) => a.date - b.date);
        }
    }

    getPlansBetween(date1, date2) {
        return this.plan.filter((p) => {
            if (date1) {
                // check plan is on or after date 1
                if (
                    p.date.getYear() < date1.getYear() ||
                    p.date.getMonth() < date1.getMonth() ||
                    p.date.getDate() < date1.getDate()
                )
                    return false;
            }
            if (date2) {
                // check plan is before or on date 2
                if (
                    p.date.getYear() > date2.getYear() ||
                    p.date.getMonth() > date2.getMonth() ||
                    p.date.getDate() > date2.getDate()
                )
                    return false;
            }
            return true;
        });
    }

    
}
const plannerStore = new PlannerStore();
export default plannerStore;
