import { Dimensions } from "react-native";

let stage = "Menu"

export default {
    MAX_WIDTH: Dimensions.get("screen").width - 100,
    MAX_HEIGHT: Dimensions.get("screen").height,
    stage
}