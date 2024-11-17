import CustomText from "components/CustomText";
import Colors from "constants/Colors";
import React, { FC } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Images } from "resources/Images";
import { ResponsiveSize } from "utils/ResponsiveSize";
interface Props {
    onPress: () => void;
    text: string
}
const ContactCard: FC<Props> = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.card}>
            <Image source={Images.User} style={styles.user} />
            <CustomText style={styles.cardText}>{props.text}</CustomText>
        </TouchableOpacity>
    )
}
export default ContactCard;
const styles = StyleSheet.create({
    card: {
        width: ResponsiveSize(300),
        backgroundColor: "#F7F9FA",
        height: ResponsiveSize(60),
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        marginVertical: ResponsiveSize(5),
        flexDirection: "row",
        alignItems: "center",
    },
    cardText: {
        fontSize: 22,
        paddingHorizontal: ResponsiveSize(10),
        fontWeight: "600",
        color: Colors["color-primary-600"],
    },
    user: {

        width: ResponsiveSize(40),
        height: ResponsiveSize(40),
        marginVertical: ResponsiveSize(5),
        marginLeft: ResponsiveSize(10),
        marginRight: ResponsiveSize(5),
    }
});