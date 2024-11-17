import AlertDialog from "components/AlertDialog"
import CustomButton from "components/CustomButton"
import CustomText from "components/CustomText"
import { SCREENS } from "navigation/Navigation"
import React, { FC } from "react"
import { Image, StyleSheet, View } from "react-native"
import { Images } from "resources/Images"
import { IContact } from "store/reducers/contactsReducer"
import { ResponsiveSize } from "utils/ResponsiveSize"
interface Props {
    selected: IContact
    navigation: any,
    onDeleteConfirm: () => void,
}
const ContactPressContent: FC<Props> = ({ selected, navigation, onDeleteConfirm }) => {
    const onDetail = () => {
        navigation.navigate(SCREENS.ContactDetailsScreen, { contactId: selected.id })
        AlertDialog.dismiss();
    };
    const onEdit = () => {
        navigation.navigate(SCREENS.EditContactScreen, { contactId: selected.id })
        AlertDialog.dismiss();
    };
    return (
        <View style={styles.w300} >
            <Image source={Images.User} style={styles.user} />
            <CustomText style={styles.title} >{`Employee ID:${selected.id}`}</CustomText>
            <CustomText style={styles.title} >{`Name :${selected.name}`}</CustomText>
            <CustomButton onPress={onDetail} size="large" style={styles.mt10}>View Details</CustomButton>
            <CustomButton onPress={onEdit} size="large" style={styles.mt10} >Edit</CustomButton>
            <CustomButton onPress={onDeleteConfirm} size="large" style={styles.mt10} >Delete Contact</CustomButton>
        </View>
    )
}
export default ContactPressContent;

const styles = StyleSheet.create({
    user: {
        width: ResponsiveSize(100),
        height: ResponsiveSize(100),
        alignSelf: "center",
    },
    w300: {
        width: ResponsiveSize(300),
    },
    mt10: {
        marginTop: ResponsiveSize(10),
        borderRadius: 30,
    },
    title: {
        marginVertical: ResponsiveSize(10),
        textAlign: "center",
        fontSize: 18
    },
});