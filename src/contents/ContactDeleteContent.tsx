import AlertDialog from "components/AlertDialog";
import CustomButton from "components/CustomButton";
import CustomText from "components/CustomText";
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { useAppDispatch } from "store/Hooks";
import { deleteContact, IContact } from "store/reducers/contactsReducer";
import { ResponsiveSize } from "utils/ResponsiveSize";
interface Props {
    selected: IContact
}
const ContactDeleteContent: FC<Props> = ({ selected }) => {
    const appDispatch = useAppDispatch();
    const onDelete = () => {
        appDispatch(deleteContact({ id: selected.id }));
        AlertDialog.dismiss();
    };
    return (
        <View style={styles.w300}>
            <CustomText style={styles.title} >Confirmation</CustomText>
            <CustomText style={styles.desc} >Are you sure want to delete this record ?</CustomText>
            <View style={styles.container}>
                <CustomButton size="large" onPress={() => AlertDialog.dismiss()} >Cancel</CustomButton>
                <CustomButton onPress={onDelete} status="danger" size="large" >Delete</CustomButton>
            </View>
        </View >
    )
}
export default ContactDeleteContent;

const styles = StyleSheet.create({
    w300: {
        width: ResponsiveSize(300),
    },
    title: {
        marginTop: ResponsiveSize(10),
        textAlign: "center",
        fontSize: 25,
        fontWeight: "700",
    },
    desc: {
        marginHorizontal: ResponsiveSize(30),
        marginTop: ResponsiveSize(20),
        textAlign: "center",
        fontSize: 18
    },
    container: {
        marginTop: ResponsiveSize(20),
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: ResponsiveSize(10),
    }
});