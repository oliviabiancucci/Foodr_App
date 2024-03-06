import { StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
export default function SingleRecipeRow({title, image}){
    return(
        <View style={styles.row}>
            <Image style={styles.im} source={{uri: image}}></Image>
            <View style={styles.column}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.view}><Text style={styles.tag}>Vegan</Text></View>
                <View style={styles.view}><Text style={styles.tag}> Pasta</Text></View>
            </View>
            <FontAwesome style={styles.calIcon} name="calendar-plus-o" size={48} color="black" />
            {/* <Text>Calendar</Text> */}
        </View>
    )
}
const styles = StyleSheet.create({
    im: {
        width: 75,
        height: 75,
        marginTop: 12.5,
        marginLeft: 12.5,
    },
    row: {
        flexDirection:'row',
        backgroundColor: 'lightgray',
        margin: 20,
        height: 100,
        marginBottom: 0,
        borderRadius: 10,
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
        fontSize: 12,
        textAlign: 'left',
        marginLeft: 10,
        marginRight: 10,
        maxWidth: 150,
    },
    calIcon: {
        //margin:25, 
        position: 'absolute',
        marginLeft: 270,
        marginTop: 25
    }
});