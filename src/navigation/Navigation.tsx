import React, { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";
import { Dimensions, ScaledSize } from "react-native";
import { useAppDispatch, useAppSelector } from "store/Hooks";
import { setIsVertical } from "store/reducers/isVerticalReducer";
import ResetPasswordScreen from "screens/ResetPasswordScreen";
import AddContactScreen from "screens/AddContactScreen";
import EditContactScreen from "screens/EditContactScreen";
import ContactDetailsScreen from "screens/PreviewContactScreen";
const Stack = createNativeStackNavigator();
const Navigation = () => {
    const appDispatch = useAppDispatch();
    useEffect(() => {
        const handleOrientationChange = ({ window }: { window: ScaledSize }) => {
            appDispatch(setIsVertical({ isVertical: window.width < window.height }));
        };
        Dimensions.addEventListener('change', handleOrientationChange);
    }, []);

    const { isLogin } = useAppSelector((state) => state.auth);
    return (
        <NavigationContainer>
            {isLogin ? <RootStack /> : <AuthStack />}
        </NavigationContainer>
    )
}
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
            <Stack.Screen name={SCREENS.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={SCREENS.ResetPasswordScreen} component={ResetPasswordScreen} />
        </Stack.Navigator>
    )
}
const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerBackTitleVisible: false, headerShown: false }}>
            <Stack.Screen name={SCREENS.HomeScreen} component={HomeScreen} />
            <Stack.Screen name={SCREENS.AddContactScreen} component={AddContactScreen} />
            <Stack.Screen name={SCREENS.EditContactScreen} component={EditContactScreen} />
            <Stack.Screen name={SCREENS.ContactDetailsScreen} component={ContactDetailsScreen} />
        </Stack.Navigator>
    )
}
export const SCREENS = {
    LoginScreen: "LoginScreen",
    ResetPasswordScreen: "ResetPasswordScreen",
    HomeScreen: "HomeScreen",
    AddContactScreen: "AddContactScreen",
    EditContactScreen: "EditContactScreen",
    ContactDetailsScreen: "ContactDetailsScreen",
}
export default Navigation;