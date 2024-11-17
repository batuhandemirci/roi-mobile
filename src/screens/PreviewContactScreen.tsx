import { NavigationProp, RouteProp } from "@react-navigation/native";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import CustomText from "components/CustomText";
import React, { FC } from "react"
import { Image, ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "resources/Images";
import { useAppSelector } from "store/Hooks";
import { ResponsiveSize } from "utils/ResponsiveSize";
type RootStackParamList = {
    ContactDetailsScreen: {
        contactId: number
    };
};
interface Props {
    navigation: NavigationProp<any, any>,
    route: RouteProp<RootStackParamList, 'ContactDetailsScreen'>;
}
const ContactDetailsScreen: FC<any> = (props: Props) => {
    const contactId = props.route.params.contactId;
    const { isVertical } = useAppSelector((state) => state.isVertical);
    const { contacts } = useAppSelector((state) => state.contacts);
    const findedContact = contacts.find((item) => item.id == contactId);

    const onGoBack = () => {
        props.navigation.goBack()
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomHeader title="Contact Details" goBack />
            <View style={isVertical ? styles.containerVertical : styles.containerHorizontal}>
                <View style={isVertical ? styles.subContainerVertical : styles.subContainerHorizontal}>
                    <View style={isVertical ? styles.headerContainerVertical : styles.headerContainerHorizontal}>
                        <Image source={Images.User} style={styles.image} />
                        <Image resizeMode="contain" style={styles.logo} source={Images.Logo} />
                    </View>
                </View>
                <View style={isVertical ? styles.scrollViewContainerVertical : styles.scrollViewContainerHorizontal}>
                    <ScrollView style={isVertical ? styles.scrollViewVertical : styles.scrollViewHorizontal} contentContainerStyle={styles.contentContainerStyle} >
                        <CustomText style={styles.textFirst}><CustomText style={styles.textBold}>Department : </CustomText>{findedContact?.department}</CustomText>
                        <CustomText style={styles.text}><CustomText style={styles.textBold}>Name : </CustomText>{findedContact?.name}</CustomText>
                        <CustomText style={styles.text}><CustomText style={styles.textBold}>Phone Number : </CustomText>{findedContact?.phoneNumber}</CustomText>
                        <CustomText style={styles.text}><CustomText style={styles.textBold}>Address : </CustomText>{findedContact?.address}</CustomText>
                        <CustomText style={styles.text}><CustomText style={styles.textBold}>City : </CustomText>{findedContact?.city}</CustomText>
                        <CustomText style={styles.text}><CustomText style={styles.textBold}>State : </CustomText>{findedContact?.state}</CustomText>
                        <CustomText style={styles.text}><CustomText style={styles.textBold}>Zip Code : </CustomText>{findedContact?.zipCode}</CustomText>
                        <CustomText style={styles.text}><CustomText style={styles.textBold}>Country : </CustomText>{findedContact?.country}</CustomText>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default ContactDetailsScreen;

const styles = StyleSheet.create({
    buttonVertical: {
        width: ResponsiveSize(250),
        borderRadius: 30,
    },
    buttonHorizontal: {
        width: ResponsiveSize(150),
        borderRadius: 30,
    },
    textFirst: {
        width: ResponsiveSize(290),
        fontSize: 18,
    },
    text: {
        width: ResponsiveSize(290),
        marginTop: ResponsiveSize(20),
        fontSize: 18,
    },
    textBold: {
        fontWeight: "600"
    },
    contentContainerStyle: {
        paddingVertical: ResponsiveSize(20),
        alignItems: "center",
    },
    scrollViewVertical: {
        flex: 7,
    },
    scrollViewHorizontal: {
        flex: 5,
    },
    scrollViewContainerVertical: {
        flex: 7,
        marginHorizontal: ResponsiveSize(20),

    },
    scrollViewContainerHorizontal: {
        flex: 2,
        marginHorizontal: ResponsiveSize(20),
    },
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    containerVertical: {
        flex: 1,
        marginTop: ResponsiveSize(20),
        marginHorizontal: ResponsiveSize(20),
        flexDirection: "column"
    },
    containerHorizontal: {
        flex: 1,
        marginTop: ResponsiveSize(20),
        marginHorizontal: ResponsiveSize(20),
        flexDirection: "row",
    },
    subContainerVertical: {
        flex: 2,
    },
    subContainerHorizontal: {
        flex: 1,
    },
    headerContainerVertical: {
        flex: 2,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },

    headerContainerHorizontal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
    },
    buttonContainerVertical: {
        marginTop: ResponsiveSize(20),
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainerHorizontal: {
        marginTop: ResponsiveSize(20),
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: ResponsiveSize(75),
        width: ResponsiveSize(75),
    },
    logo: {
        width: ResponsiveSize(130),
        height: ResponsiveSize(67.8),
    }
});