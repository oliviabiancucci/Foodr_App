import { Image, Text, View } from "react-native"
import styles from "./styles"

const SplashImage = ({imageUrl}) => {

    return <Image style={styles.splashImage} src={imageUrl}/>

}

export default Recipe = ({recipe}) => {

    return (
        <View style={styles.container}>
            <SplashImage imageUrl={recipe.imageUrl} />
            <Text style={styles.title}>{recipe.recipeName}</Text>
        </View>
    )

}