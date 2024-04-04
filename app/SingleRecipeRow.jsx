import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
export default function SingleRecipeRow({title, image, price, speed}){
    return(
        <View style={styles.row}>
            <Image style={styles.im} source={{uri: image}}></Image>
            <View style={styles.column}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.view}><Text style={styles.tag}>{price}</Text></View>
                <View style={styles.view}><Text style={styles.tag}> {speed}</Text></View>
            </View>
            {/* <FontAwesome style={styles.calIcon} name="calendar-plus-o" size={48} color="black" /> */}
            {/* <Text>Calendar</Text> */}
        </View>
    )
}
const styles = StyleSheet.create({
    im: {
        width: 75,
        height: 75,
        marginTop: 15,
        marginLeft: 15,
    },
    row: {
        flexDirection:'row',
    },
    column: {
        flexDirection: 'column',
        marginLeft: 20,
        width: 150,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    view: {
        backgroundColor: "#EB6F6F", 
        borderRadius: 10,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom:5,
    },
    tag: {
        fontSize: 14,
        textAlign: 'left',
        marginLeft: 10,
        marginRight: 10,
        maxWidth: 150,
    },
    calIcon: {
        //margin:25, 
        position: 'absolute',
        marginLeft: 270,
        marginTop: 25,
    }
});