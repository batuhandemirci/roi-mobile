import { NavigationProp, RouteProp } from "@react-navigation/native";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import CustomInput from "components/CustomInput";
import CustomSelect from "components/CustomSelect";
import { Departments, } from "constants/Constants";
import React, { FC, useState } from "react"
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "resources/Images";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { IContact, IDepartment, updateContact } from "store/reducers/contactsReducer";
import { ResponsiveSize } from "utils/ResponsiveSize";
type RootStackParamList = {
    EditContactScreen: {
        contactId: number
    };
};
interface Props {
    navigation: NavigationProp<any, any>,
    route: RouteProp<RootStackParamList, 'EditContactScreen'>;
}
const EditContactScreen: FC<any> = (props: Props) => {
    const contactId = props.route.params.contactId;

    const { isVertical } = useAppSelector((state) => state.isVertical);
    const appDispatch = useAppDispatch();
    const { contacts } = useAppSelector((state) => state.contacts);
    const find = contacts.find((item) => item.id == contactId);
    const [department, setDepartment] = useState(find?.department ?? "");
    const [name, setName] = useState(find?.name ?? "");
    const [phoneNumber, setPhoneNumber] = useState(find?.phoneNumber ?? "");
    const [address, setAddress] = useState(find?.address ?? "");
    const [city, setCity] = useState(find?.city ?? "");
    const [state, setState] = useState(find?.state ?? "");
    const [zipCode, setZipCode] = useState(find?.zipCode ?? "");
    const [country, setCountry] = useState(find?.country ?? "");

    const onUpdate = () => {
        if (department.trim() == "") {
            Alert.alert("Error", "Please select department");
        }
        else if (name.trim() == "") {
            Alert.alert("Error", "Please enter name");
        }
        else if (phoneNumber.trim() == "") {
            Alert.alert("Error", "Please enter phone number");
        }
        else if (address.trim() == "") {
            Alert.alert("Error", "Please enter address");
        }
        else if (city.trim() == "") {
            Alert.alert("Error", "Please enter city");
        }
        else if (state.trim() == "") {
            Alert.alert("Error", "Please enter state");
        }
        else if (zipCode.trim() == "") {
            Alert.alert("Error", "Please enter zip code");
        }
        else if (country.trim() == "") {
            Alert.alert("Error", "Please enter country");
        }
        else {
            Alert.alert("Success", "Contact updated successfully");
            const contact: IContact = {
                id: find?.id ?? -1,
                department: department as IDepartment,
                name: name,
                phoneNumber: phoneNumber,
                address: address,
                city: city,
                state: state,
                zipCode: zipCode,
                country: country,
            }
            appDispatch(updateContact({ contact: contact }))
            props.navigation.goBack();
        }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomHeader title="Update Contact" goBack />
            <View style={isVertical ? styles.containerVertical : styles.containerHorizontal}>
                <View style={isVertical ? styles.subContainerVertical : styles.subContainerHorizontal}>
                    <View style={isVertical ? styles.imageContainerVertical : styles.imageContainerHorizontal}>
                        <Image source={Images.User} style={styles.image} />
                        <Image resizeMode="contain" style={styles.logo} source={Images.Logo} />
                    </View>
                </View>
                <View style={isVertical ? styles.scrollViewContainerVertical : styles.scrollViewContainerHorizontal}>
                    <ScrollView style={isVertical ? styles.scrollViewVertical : styles.scrollViewHorizontal} contentContainerStyle={styles.contentContainerStyle}>
                        <CustomSelect
                            modalTitle="Select Department"
                            title="Select Department"
                            placeHolder="Select Department"
                            value={department}
                            onSelect={setDepartment}
                            data={Departments}
                            inputStyle={styles.input}
                        />
                        <CustomInput
                            value={name}
                            onChangeText={setName}
                            placeholder="Name"
                            viewStyle={styles.input}
                            title="Name"
                        />
                        <CustomInput
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Phone Number"
                            title="Phone Number"
                            viewStyle={styles.input}
                        />
                        <CustomInput
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Address"
                            viewStyle={styles.input}
                            title="Address"
                        />
                        <CustomInput
                            value={city}
                            onChangeText={setCity}
                            placeholder="City"
                            viewStyle={styles.input}
                            title="City"
                        />
                        <CustomInput
                            value={state}
                            onChangeText={setState}
                            viewStyle={styles.input}
                            placeholder="State"
                            title="State"
                        />
                        <CustomInput
                            value={zipCode}
                            onChangeText={setZipCode}
                            viewStyle={styles.input}
                            placeholder="Zip Code"
                            title="Zip Code"
                        />
                        <CustomInput
                            value={country}
                            onChangeText={setCountry}
                            viewStyle={styles.input}
                            placeholder="Country"
                            title="Country"
                        />
                    </ScrollView>
                </View>
                <View style={isVertical ? styles.buttonContainerVertical : styles.buttonContainerHorizontal}>
                    <CustomButton onPress={onUpdate} status="danger" style={styles.button}>Update Contact</CustomButton>
                    <CustomButton onPress={() => props.navigation.goBack()} style={styles.button}>Cancel</CustomButton>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default EditContactScreen;

const styles = StyleSheet.create({
    image: {
        height: ResponsiveSize(75),
        width: ResponsiveSize(75),
    },
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    containerVertical: {
        flex: 1,
        marginTop: ResponsiveSize(20),
        marginHorizontal: ResponsiveSize(20),
        flexDirection: "column",
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
    imageContainerVertical: {
        flex: 2,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    imageContainerHorizontal: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
    },
    scrollViewContainerVertical: {
        flex: 7,
        marginHorizontal: ResponsiveSize(20),
    },
    scrollViewContainerHorizontal: {
        flex: 2,
        marginHorizontal: ResponsiveSize(20),
    },
    scrollViewVertical: {
        flex: 7,
    },
    scrollViewHorizontal: {
        flex: 5,
    },
    contentContainerStyle: {
        paddingVertical: ResponsiveSize(20),
        alignItems: "center",
    },
    input: {
        marginTop: ResponsiveSize(20),
        width: ResponsiveSize(290),
    },
    button: {
        width: ResponsiveSize(160),
        borderRadius: 30,
    },
    buttonContainerVertical: {
        marginTop: ResponsiveSize(20),
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonContainerHorizontal: {
        marginTop: ResponsiveSize(20),
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    logo: {
        width: ResponsiveSize(130),
        height: ResponsiveSize(67.8),
    }
});