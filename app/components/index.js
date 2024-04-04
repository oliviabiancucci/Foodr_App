import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProfileImage from "./ProfileImage";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export { ProfileImage };

export function FloatingButton({
    icon,
    onPress,
    size,
    color = "lightblue",
    style,
}) {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: color,
            borderRadius: size,
            width: size,
            height: size,
        },
    });

    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <View>
                <MaterialCommunityIcons size={size} name={icon} color="white" />
            </View>
        </TouchableOpacity>
    );
}

export function Checkbox({
    color = "#EB6F6F",
    size = 18,
    onCheck = () => {},
    onUncheck = () => {},
    isChecked = false,
    checkedIcon = "checkbox-outline",
    unCheckedIcon = "checkbox-blank-outline",
}) {
    const [checked, setChecked] = useState(isChecked);

    const handlePress = (newState) => {
        if(newState) {
            onCheck()
        }
        else {
            onUncheck()
        }
        setChecked(newState);
    }

    return (
        <TouchableOpacity onPress={() => handlePress(!checked)}>
            <MaterialCommunityIcons
                size={size}
                name={checked ? checkedIcon : unCheckedIcon}
                color={color}
            />
        </TouchableOpacity>
    );
}

export function Button({
    title,
    titleStyle = {},
    buttonStyle = {},
    onPress,
    disabled = false,
}) {
    return (
        <TouchableOpacity
            style={[
                {
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: 1,
                    width: "100%",
                    backgroundColor: disabled ? "lightgray" : "#EB6F6F",
                    minHeight: 50,
                    maxHeight: 50,
                },
                buttonStyle,
            ]}
            disabled={disabled}
            onPress={onPress}
        >
            <Text
                style={[
                    {
                        fontSize: 24,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        textAlign: "center",
                        color: "white",
                    },
                    titleStyle,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}
