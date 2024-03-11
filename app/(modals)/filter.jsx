import { Button, Pressable, SafeAreaView, SectionList, StyleSheet, Text, View } from "react-native";
import styles from "app/styles";
import { useState } from "react";
import { useRouter } from "expo-router";

const ToggleSwitch = ({title}) => {
    const [isPressed, setPressed] = useState(true);

    const colorStyles = StyleSheet.create({
        color: "white",
        borderColor: isPressed ? "#EB6F6F" : "#AFAFAF",
    })

    return (
        <Pressable onPress={() => {setPressed(!isPressed)}}>
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
            title: 'Cost',
            data: [
                'Cheap', 'Expensive'
            ]
        },
        {
            title: 'Dietary',
            data: [
                'Vegetarian', 'Meat'
            ]
        },
        {
            title: 'Difficulty',
            data: [
                'Easy'
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
                renderItem={({item}) => (<View style={{display: "flex", flexDirection: "row"}}><ToggleSwitch title={item} /></View>)}
                renderSectionHeader={({section: {title}}) => <Text style={styles.heading}>{title}</Text>}
            />
            <View>
                <Button color={"#EB6F6F"} title="Apply Filters" onPress={() => router.back()} />
            </View>
        </SafeAreaView>
    );
};
