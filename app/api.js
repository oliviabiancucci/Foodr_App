import axios from "axios";
import filterStore from "./FilterStore";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

let prefetchedRecipe = null;
async function getRecipe(url){
    try {
        const response = await axios.get(url);

        // console.log(response.data)
        
        // const mealJson = JSON.parse(response.data);

        // console.log(response.data.meals[0]);
        let resJson;
        //console.log(response.data.meals[0]);
        const currentFilters = filterStore.getFilters();
        if(currentFilters.length== 0){
            resJson = response.data.meals[0];
        }
        else{
            console.log(response.data.meals[0]);
            let index = Math.floor(Math.random() * response.data.meals.length);
            resJson = response.data.meals[index];
            url = API_URL + "lookup.php?i=" + resJson.idMeal;
            const response2 = await axios.get(url);
            resJson = response2.data.meals[0];
        }
        const ingredientNames = Object.keys(resJson).filter(v => /^strIngredient/.test(v) && resJson[v] && resJson[v].trim() != "");
        const ingredientMeasures = Object.keys(resJson).filter(v => /^strMeasure/.test(v) && resJson[v] && resJson[v].trim() != "");

        const mealJson = {
            id: resJson.idMeal,
            name: resJson.strMeal,
            thumbnail: resJson.strMealThumb,
            tags: resJson.strTags ? resJson.strTags.split(",") : [],
            ingredients: ingredientNames.map((name, index) => {
                return {name: resJson[name], measure: resJson[ingredientMeasures[index]]}
            }),
            instructions: resJson.strInstructions
        };

        //console.log(mealJson);

        return mealJson;
    } catch(error) {
        console.log(error);
    }

    return null;
}
async function prefetchRecipe(){
    let url = API_URL + "random.php";
    const currentFilters = filterStore.getFilters();
    if(currentFilters.length != 0){
        console.log('filters applied');
        url = API_URL + "filter.php?c=" + currentFilters[0];
    }
    try {
        prefetchedRecipe = await getRecipe(url);
        console.log('Recipe prefetched successfully');
    } catch (error) {
        console.error('Prefetching failed:', error);
    }
}
export const getMatch = async () => {
    if (prefetchedRecipe) {
        console.log('Serving prefetched recipe');
        const recipeToServe = prefetchedRecipe;
        prefetchedRecipe = null; // Reset prefetch cache
        prefetchRecipe().catch(console.error); // Prefetch next recipe
        return recipeToServe;
    } else {
        console.log('Fetching recipe on demand');
        // Fetch recipe immediately if no prefetched recipe is available
        let url = API_URL + "random.php"; // Or based on filters
        const recipe = await getRecipe(url);
        prefetchRecipe().catch(console.error); // Start prefetching next recipe
        return recipe;
    }


};
