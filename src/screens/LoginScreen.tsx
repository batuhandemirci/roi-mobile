import React, { FC, useState } from "react"
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "components/CustomInput";
import { responsiveHeight } from "constants/Dimension";
import CustomButton from "components/CustomButton";
import { ResponsiveSize } from "utils/ResponsiveSize";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { NavigationProp } from "@react-navigation/native";
import { SCREENS } from "navigation/Navigation";
import { login } from "store/reducers/authReducer";
import { Images } from "resources/Images";
import CustomText from "components/CustomText";
interface Props {
    navigation: NavigationProp<any, any>,
}
const LoginScreen: FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isVertical } = useAppSelector((state) => state.isVertical);
    const store = useAppSelector((state) => state.auth);
    const appDispatch = useAppDispatch();
    const onLogin = () => {
        if (username == store.username && password == store.password) {
            appDispatch(login());
        }
        else {
            Alert.alert("Login Error", "Username or Password is incorrect");
        }
    };
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container} >
                <TouchableOpacity onPress={() => Alert.alert("FAQ", "You can check the technical documention.")} style={styles.faqContainer} >
                    <CustomText style={styles.faqText}>FAQ?</CustomText>
                    <Image source={Images.Faq} resizeMode="contain" style={styles.faqIcon} />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={isVertical ? styles.scrollViewVertical : styles.scrollViewHorizontal} >
                    <Image resizeMode="contain" style={styles.logo} source={Images.Logo} />
                    <CustomInput
                        title="Username"
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        personIcon
                        viewStyle={styles.input}
                    />
                    <CustomInput
                        title="Password"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        type="password"
                        viewStyle={styles.input}
                    />
                    <View style={isVertical ? styles.buttonContainerVertical : styles.buttonContainerHorizontal} >
                        <CustomButton size="large" onPress={onLogin} style={isVertical ? styles.buttonVertical : styles.buttonHorizontal} >Login</CustomButton>
                        <CustomButton size="large" onPress={() => navigation.navigate(SCREENS.ResetPasswordScreen)} style={isVertical ? styles.buttonVertical : styles.buttonHorizontal}                        >Reset Password</CustomButton>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default LoginScreen;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
    },
    faqContainer: {
        position: "absolute",
        zIndex: 1,
        top: ResponsiveSize(10),
        right: ResponsiveSize(20),
        flexDirection: "row",
        alignItems: "center",
    },
    faqText: {
        fontSize: 16,
        marginRight: ResponsiveSize(5),
    },
    faqIcon: {
        height: ResponsiveSize(40),
        width: ResponsiveSize(50),
    },
    scrollViewVertical: {
        paddingTop: responsiveHeight(150),
        justifyContent: "center",
        alignItems: "center",
    },
    scrollViewHorizontal: {
        paddingTop: responsiveHeight(50),
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainerVertical: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainerHorizontal: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: responsiveHeight(20),
    },
    input: {
        marginTop: responsiveHeight(20),
        width: ResponsiveSize(300),
    },
    buttonVertical: {
        marginTop: responsiveHeight(20),
        width: ResponsiveSize(300),
        borderRadius: 100,
    },
    buttonHorizontal: {
        marginTop: responsiveHeight(20),
        width: ResponsiveSize(250),
        borderRadius: 100,
    },
    logo: {
        width: ResponsiveSize(130),
        height: ResponsiveSize(67.8),
    }
});