import { Dimensions } from "react-native";

export const ResponsiveSize = (value: number) => {
    const small = Dimensions.get("window").height < Dimensions.get("window").width ? Dimensions.get("window").height : Dimensions.get("window").width;
    return small / (375 / value)
};
