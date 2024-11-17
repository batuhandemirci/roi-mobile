import { NavigationProp } from "@react-navigation/native";
import ContactCard from "cards/ContactCard";
import AlertDialog from "components/AlertDialog";
import CustomHeader from "components/CustomHeader";
import CustomInput from "components/CustomInput";
import UserAddImage from "components/UserAddImage";
import { SCREEN_WIDTH } from "constants/Dimension";
import ContactDeleteContent from "contents/ContactDeleteContent";
import ContactPressContent from "contents/ContactPressContent";
import { SCREENS } from "navigation/Navigation";
import React, { FC, useState } from "react"
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "resources/Images";
import { useAppSelector } from "store/Hooks";
import { IContact } from "store/reducers/contactsReducer";
import { ResponsiveSize } from "utils/ResponsiveSize";
interface Props {
    navigation: NavigationProp<any, any>,
}
const HomeScreen: FC<Props> = (props) => {
    const { isVertical } = useAppSelector((state) => state.isVertical);
    const { contacts } = useAppSelector((state) => state.contacts);
    const onPress = (selected: IContact) => {
        AlertDialog.show({
            content: <ContactPressContent navigation={props.navigation} onDeleteConfirm={() => onDeleteConfirm(selected)} selected={selected} />,
            mode: "CENTER",
        })
    };

    const onDeleteConfirm = (selected: IContact) => {
        AlertDialog.show({
            content: <ContactDeleteContent selected={selected} />,
            mode: "CENTER",
        })
    };

    const [search, setSearch] = useState("");
    const filteredDatas = contacts.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <CustomHeader menu title="Contacts" />
            <View style={isVertical ? styles.containerVertical : styles.containerHorizontal}>
                <View style={isVertical ? styles.container1Vertical : styles.container1Horizontal}>
                    <CustomInput
                        title="Search contact"
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search contact"
                        viewStyle={styles.input}
                        personIcon
                    />
                    <ScrollView style={styles.wFull} contentContainerStyle={styles.pv20}>
                        <View style={styles.cardContainer}>
                            {filteredDatas.map((item, index) => {
                                return (
                                    <ContactCard key={index} onPress={() => onPress(item)} text={item.name} />
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                {isVertical ?
                    <View style={styles.verticalContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={Images.Logo} />
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREENS.AddContactScreen)} style={styles.mb20}>
                            <UserAddImage />
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.horizontalContainer}>
                        <TouchableOpacity onPress={() => props.navigation.navigate(SCREENS.AddContactScreen)} style={styles.mb20}>
                            <UserAddImage />
                        </TouchableOpacity>
                        <Image
                            resizeMode="contain"
                            style={{
                                width: ResponsiveSize(130),
                                height: ResponsiveSize(67.8),
                            }}
                            source={Images.Logo}
                        />
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "white",
    },
    containerVertical: {
        flex: 5,
        flexDirection: "column",
        alignItems: "center"
    },
    containerHorizontal: {
        flex: 5,
        flexDirection: "row",
    },
    container1Vertical: {
        flex: 4,
        alignItems: "center",
        width: SCREEN_WIDTH,
    },
    container1Horizontal: {
        flex: 2,
        alignItems: "center",
        width: SCREEN_WIDTH,
    },
    input: {
        marginTop: ResponsiveSize(20),
        width: ResponsiveSize(300),
    },
    w300: {
        width: ResponsiveSize(300),
    },
    pv20: {
        paddingVertical: ResponsiveSize(20),
    },
    wFull: {
        width: SCREEN_WIDTH,
    },
    cardContainer: {
        alignItems: "center",
    },
    verticalContainer: {
        flex: 1,
        width: ResponsiveSize(300),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        backgroundColor: "transparent",
    },
    horizontalContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginHorizontal: ResponsiveSize(20),
    },
    mb20: {
        marginBottom: ResponsiveSize(20),
    },
    logo: {
        width: ResponsiveSize(130),
        height: ResponsiveSize(67.8),
    }


});