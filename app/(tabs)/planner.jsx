import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { FloatingButton } from "app/components";
import { useRouter, Link } from "expo-router";
import { observer } from "mobx-react";
import SingleRecipeRow from "app/SingleRecipeRow";
import recipeStore from "../SavedRecipes";
import plannerStore from "app/PlannerStore";
import { FontAwesome } from "@expo/vector-icons";

const PlannerBlock = observer(({ title, plan }) => {
    const recipes = plan ? plan.recipes : [];

    const promptRemove = (index, name) => {
        Alert.alert("Remove Recipe", `Are you sure you want to remove ${name}?`, [{text: "Remove", onPress: () => {handleRemove(index)}}, {text: "Cancel", onPress: ()=>{}}])
    }

    const handleRemove = (index) => {
        // plan.recipes = plan.recipes.splice(index, index);
        plannerStore.removeRecipeByIndex(plan, index)
    }

    return (
        <View style={{ marginBottom: 50 }}>
            <Text style={stylesheet.title}>{title}</Text>
            {recipes.length == 0 ? (
                <Text>No recipes planned</Text>
            ) : (
                recipes.map((recipe, index) => (
                    <View key={index} style={{flexDirection: "row", flex: 1}}>
                        <Link
                            href={{
                                pathname: "recipe/[id]",
                                params: { id: recipe.id },
                            }}
                        >
                            <SingleRecipeRow
                                title={recipe.name}
                                image={recipe.thumbnail}
                                tags={recipe.tags}
                                id={recipe.id}
                            />
                        </Link>
                        <TouchableOpacity style={{margin: 10, alignSelf: "center"}}
                            onPress={() => promptRemove(index, recipe.name)}
                        >
                            <FontAwesome
                                name="times-circle"
                                size={40}
                                color="#EB6F6F"
                            />
                        </TouchableOpacity>
                    </View>
                ))
            )}
        </View>
    );
});

const Planner = observer(() => {
    const router = useRouter();
    const date = new Date();
    const plans = [];

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(date);
        currentDate.setDate(date.getDate() + i);
        const plan = plannerStore.getPlansBetween(currentDate, currentDate);
        plans.push({ date: currentDate, plan: plan[0] });
    }

    return (
        <>
            <View style={styles.container}>
                <ScrollView>
                    {plans.map((p, idx) => {
                        let title = p.date.toLocaleDateString(undefined, {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                        });
                        if (idx === 0) {
                            title = "Today";
                        } else if (idx === 1) {
                            title = "Tomorrow";
                        }
                        return (
                            <PlannerBlock
                                key={idx}
                                title={title}
                                plan={p.plan}
                            />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
});

const stylesheet = StyleSheet.create({
    title: {
        fontSize: 24,
    },
});

export default Planner;
