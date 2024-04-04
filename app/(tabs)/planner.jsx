import { FloatingButton } from "app/components";
import styles from "app/styles";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { View, Text, ScrollView, StyleSheet } = require("react-native");

import plannerStore from "app/PlannerStore";
import SingleRecipeRow from "app/SingleRecipeRow";
import { observer } from "mobx-react";

const PlannerBlock = ({ title, plan }) => {
    const recipes = plan ? plan.recipes : [];

    return (
        <View style={{ marginBottom: 50 }}>
            <Text style={stylesheet.title}>{title}</Text>
            {recipes.length == 0 ? (
                <Text>No recipes planned</Text>
            ) : (
                recipes.map((recipe, index) => (
                    <SingleRecipeRow
                        key={index}
                        title={recipe.name}
                        image={recipe.thumbnail}
                    />
                ))
            )}
        </View>
    );
};

const Planner = observer(() => {
    const router = useRouter();

    const date = new Date();
    const todayPlan = plannerStore.getPlansBetween(date, date);

    date.setDate(date.getDate() + 1);
    const tmrwPlan = plannerStore.getPlansBetween(date, date);

    date.setDate(date.getDate() + 1);
    const futurePlan = plannerStore.getPlansBetween(date, null);

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <PlannerBlock title="Today" plan={todayPlan[0]} />
                    <PlannerBlock title="Tomorrow" plan={tmrwPlan[0]} />
                    {futurePlan.map((p, idx) => {
                        return <PlannerBlock
                            key={idx}
                            title={p.date.toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                            plan={p}
                        />;
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

const stylesheet = StyleSheet.create({
    title: {
        fontSize: 24,
    },
});

export default Planner;
