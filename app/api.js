import axios from "axios"

const API_URL = "https://www.themealdb.com/api/json/v1/1/"

export const getMatch = async () => {
    const url = API_URL + "random.php";

    try {
        const response = await axios.get(url);

        // console.log(response.data)
        
        // const mealJson = JSON.parse(response.data);

        // console.log(response.data.meals[0]);

        const resJson = response.data.meals[0];

        const ingredientNames = Object.keys(resJson).filter(v => /^strIngredient/.test(v) && resJson[v].trim() != "");
        const ingredientMeasures = Object.keys(resJson).filter(v => /^strMeasure/.test(v) && resJson[v].trim() != "");

        const mealJson = {
            id: resJson.idMeal,
            name: resJson.strMeal,
            thumbnail: resJson.strMealThumb,
            tags: resJson.strTags ? resJson.strTags.split(",") : [],
            ingredients: ingredientNames.map((name, index) => {
                return {name: resJson[name], measure: resJson[ingredientMeasures[index]]}
            })
        }

        console.log(mealJson);

        return mealJson
    } catch(error) {
        console.log(error);
    }

    return null;
}