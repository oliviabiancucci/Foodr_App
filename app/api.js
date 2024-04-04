import axios from "axios"

const API_URL = "https://www.themealdb.com/api/json/v1/1/"

export const getMatch = async () => {
    const url = API_URL + "random.php";

    try {
        const response = await axios.get(url);

        // console.log(response.data)
        
        // const mealJson = JSON.parse(response.data);

        console.log(response.data.meals[0]);

        const resJson = response.data.meals[0];
        const mealJson = {
            id: resJson.idMeal,
            name: resJson.strMeal,
            thumbnail: resJson.strMealThumb,
            tags: resJson.strTags ? resJson.strTags.split(",") : [],

        }

        return mealJson
    } catch(error) {
        console.log(error);
    }

    return null;
}