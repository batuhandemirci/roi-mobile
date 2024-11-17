import { NavigationProp } from "@react-navigation/native";
import CustomButton from "components/CustomButton";
import CustomHeader from "components/CustomHeader";
import CustomInput from "components/CustomInput";
import { responsiveHeight } from "constants/Dimension";
import React, { FC, useState } from "react"
import { Alert, ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { updatePassword } from "store/reducers/authReducer";
import { ResponsiveSize } from "utils/ResponsiveSize";
interface Props {
    navigation: NavigationProp<any, any>,
}
const ResetPasswordScreen: FC<Props> = (props) => {
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [privateKeyword, setPrivateKeyword] = useState("");
    const store = useAppSelector((state) => state.auth);
    const appDispatch = useAppDispatch();
    const onReset = () => {
        if (username == store.username && privateKeyword == store.privateKeyword) {
            if (newPassword.length >= 6) {
                appDispatch(updatePassword({ password: newPassword }))
                Alert.alert("Success", "Password has been changed");
                props.navigation.goBack();
            }
            else {
                Alert.alert("Error", "Password must be at least 6 characters");
            }
        }
        else {
            Alert.alert("Error", "Username or Private Keyword is incorrect");
        }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomHeader title="Reset Password" goBack />
            <ScrollView>
                <View style={styles.container}>
                    <CustomInput
                        title="Username"
                        personIcon
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        viewStyle={styles.input}
                    />
                    <CustomInput
                        title="New Password"
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        type="password"
                        viewStyle={styles.input}
                    />
                    <CustomInput
                        title="Private Keyword"
                        placeholder="Private Keyword"
                        value={privateKeyword}
                        onChangeText={setPrivateKeyword}
                        viewStyle={styles.input}
                    />
                    <CustomButton size="large" onPress={onReset} style={styles.button} >Reset Password</CustomButton>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default ResetPasswordScreen;

const styles = StyleSheet.create({
    button: {
        marginTop: responsiveHeight(20),
        width: ResponsiveSize(300),
        borderRadius: 30,
    },
    input: {
        marginTop: responsiveHeight(20),
        width: ResponsiveSize(300),
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    }
});