import { Button, Pressable, SafeAreaView, SectionList, StyleSheet, Text, View } from "react-native";
import styles from "app/styles";
import { useState } from "react";
import { useRouter } from "expo-router";
import filterStore from "app/FilterStore";
const ToggleSwitch = ({title}) => {
    const [isPressed, setPressed] = useState(true);

    const colorStyles = StyleSheet.create({
        color: "white",
        borderColor: isPressed ? "#EB6F6F" : "#AFAFAF",
    })
    const handlePres = () => {
        if(isPressed){
            filterStore.addFilter(title);
        }
        else{
            filterStore.removeFavourite(title);
        }
        
        console.log(filterStore.getFilters());
        setPressed(!isPressed)
    };
    return (
        <Pressable onPress={handlePres}>
            <View style={[colorStyles, {
                borderWidth: 2,
                borderRadius: 30,
                height: 50,
                minWidth: 100,
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isPressed ? "#EB6F6F" : "#AFAFAF"
            }]}>
                <Text style={[colorStyles, {fontWeight: "bold", fontSize: 18, padding: 10}]}>{title}</Text>
            </View>
        </Pressable>
    )
}

export default Page = () => {

    const DATA = [
        {
            title: 'Course',
            data: [
                'Breakfast', 'Starter','Dessert'
            ]
        },
        {
            title: 'Dietary',
            data: [
                'Vegetarian', 'Vegan'
            ]
        },
        {
            title: 'Type',
            data: [
                'Seafood', 'Pasta', 'Beef'
            ]
        }
    ]

    const router = useRouter();

    return (
        <SafeAreaView style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <SectionList
                sections={DATA}
                renderItem={({item}) => (<View style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}><ToggleSwitch title={item.toUpperCase()} /></View>)}
                renderSectionHeader={({section: {title}}) => <Text style={styles.heading}>{title}</Text>}
            />
            <View>
                <Button color={"#EB6F6F"} title="Apply Filters" onPress={() => router.back()} />
            </View>
        </SafeAreaView>
    );
};
