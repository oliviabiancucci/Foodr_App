import { FloatingButton } from "app/components";
import styles from "app/styles";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { View, Text, ScrollView } = require("react-native");

import plannerStore from "app/PlannerStore";
import SingleRecipeRow from "app/SingleRecipeRow";
import { observer } from "mobx-react";

const Planner = observer(() => {
    const router = useRouter();

    plannerStore.plan.forEach((v) => {
        console.log(v.recipes);
    });

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    {plannerStore.plan.map((dayPlan, index) => {
                        return (
                            <>
                                <Text>{dayPlan.date.toDateString()}</Text>
                                {dayPlan.recipes.map((recipe, index) => {
                                    return (
                                        <SingleRecipeRow
                                            key={index}
                                            title={recipe.name}
                                            image={recipe.thumbnail}
                                        />
                                    );
                                })}
                            </>
                        );
                    })}
                </ScrollView>
            </View>
            <FloatingButton
                icon="plus"
                color="#EB6F6F"
                size={60}
                style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                }}
                onPress={() => router.push("recipe/picker")}
            />
        </>
    );
});

export default Planner;
