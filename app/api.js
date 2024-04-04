import axios from "axios"

const API_URL = "https://www.themealdb.com/api/json/v1/1/"

export const getMatch = async () => {
    const url = API_URL + "random.php";

    try {
        const response = await axios.get(url);

        // console.log(response.data)
        
        // const mealJson = JSON.parse(response.data);

        console.log(response.data.meals[0]);

        return response.data.meals[0];
    } catch(error) {
        console.log(error);
    }

    return null;
}