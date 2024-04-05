import React from "react";
import { TouchableOpacity, View, Text, ScrollView, StyleSheet } from "react-native";
import { FloatingButton } from "app/components";
import { useRouter } from "expo-router";
import { observer } from "mobx-react";
import SingleRecipeRow from "app/SingleRecipeRow";
import recipeStore from "../SavedRecipes";
import plannerStore from "app/PlannerStore";
import { FontAwesome } from '@expo/vector-icons';

const PlannerBlock = ({ title, plan }) => {
    const recipes = plan ? plan.recipes : [];

    return (
        <View style={{ marginBottom: 50 }}>
            <Text style={stylesheet.title}>{title}</Text>
            {recipes.length == 0 ? (
                <Text>No recipes planned</Text>
            ) : (
                recipes.map((recipe, index) => (
                    <View key={index}>
                        <SingleRecipeRow
                            title={recipe.name}
                            image={recipe.thumbnail}
                            tags={recipe.tags}
                            id={recipe.id}
                        />
                        {/* <TouchableOpacity onPress={() => removeRecipe(recipe.id)} style={styles.removeButton}>
                            <FontAwesome name="times-circle" size={24} color="#EB6F6F" />
                        </TouchableOpacity> */}
                    </View>
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

    // const handleRemove = (recipeId) => {
    //     plannerStore.removeRecipeFromPlan(recipeId);
    // };

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    <PlannerBlock title="Today" plan={todayPlan[0]}/>
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
                            handleRemove={handleRemove}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const stylesheet = StyleSheet.create({
    title: {
        fontSize: 24,
    },
});

export default Planner;
