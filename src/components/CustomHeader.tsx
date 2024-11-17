import React, { FC } from "react"
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Icon } from "@ui-kitten/components";
import CustomText from "./CustomText";
import { ResponsiveSize } from "utils/ResponsiveSize";
import AlertDialog from "./AlertDialog";
import CustomButton from "./CustomButton";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { logout } from "store/reducers/authReducer";
import { Images } from "resources/Images";
interface Props {
    goBack?: boolean
    title?: string
    menu?: boolean
}
const CustomHeader: FC<Props> = (props) => {
    const navigation: NavigationProp<any, any> = useNavigation();

    const appDispatch = useAppDispatch();
    const onAlert = () => {
        AlertDialog.show({
            content: <View
                style={{
                    width: ResponsiveSize(200),
                }}
            >
                <CustomButton
                    onPress={onPrint}
                    size="large"
                    accessoryLeft={() => <Icon name="printer-outline" fill="white" style={styles.icon20} />}
                    style={styles.mv10}>Print</CustomButton>
                <CustomButton
                    onPress={() => {
                        appDispatch(logout())
                        AlertDialog.dismiss();
                    }}
                    size="large"
                    accessoryLeft={() => <Icon name="log-out-outline" fill="white" style={styles.icon20} />}
                    style={styles.mv10}
                >Logout</CustomButton>
            </View>
            ,
            mode: "CENTER"
        })
    }


    const { contacts } = useAppSelector((state) => state.contacts);
    const onPrint = () => {
        AlertDialog.show({
            content: <View style={styles.w300}>
                <ScrollView>
                    <CustomText style={styles.title}>Contacts</CustomText>
                    <CustomText style={styles.fz16}>{`ID - Name`}</CustomText>
                    {contacts.map((item, index) => {
                        return (
                            <View key={index} style={styles.userContainer}>
                                <Image source={Images.User} style={styles.user} />
                                <CustomText style={styles.fz16}>{`${item.id} - ${item.name}`}</CustomText>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>,
            mode: "CENTER"
        })
    };

    return (
        <View>
            {props.menu &&
                <TouchableOpacity onPress={onAlert} style={styles.menuStyle} >
                    <Icon fill="black" style={styles.icon45} name='menu-outline' />
                </TouchableOpacity>
            }
            {props.goBack &&
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.menuStyle} >
                    <Icon fill="black" style={styles.icon45} name='arrow-ios-back-outline' />
                </TouchableOpacity>
            }
            <View style={styles.textContainer}>
                <CustomText style={styles.text}>{props.title ? props.title : "Başlık"}</CustomText>
            </View>
        </View>
    )
}
export default CustomHeader;
const styles = StyleSheet.create({
    icon20: {
        height: ResponsiveSize(20),
        width: ResponsiveSize(20),
    },
    mv10: {
        marginVertical: ResponsiveSize(10),
        borderRadius: 30,
    },
    fz16: {
        fontSize: 16,
        fontWeight: "600",
        marginVertical: ResponsiveSize(5),
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
    },
    w300: {
        width: ResponsiveSize(300),
    },
    icon45: {
        height: ResponsiveSize(45),
        width: ResponsiveSize(45),
    },
    menuStyle: {
        zIndex: 2,
        left: ResponsiveSize(3),
        position: "absolute",
    },
    textContainer: {
        height: ResponsiveSize(50),
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        fontWeight: "600"
    },
    user: {
        width: ResponsiveSize(40),
        height: ResponsiveSize(40),
        marginVertical: ResponsiveSize(5),
        marginRight: ResponsiveSize(10),
    },
    userContainer: {
        flexDirection: "row",
        alignItems: "center",
    }

});