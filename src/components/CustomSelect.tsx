import React, { FC, useState } from "react"
import { FlatList, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { responsiveHeight, responsiveWidth } from "constants/Dimension";
import CustomText from "./CustomText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputTitleText from "./InputTitleText";
import Modal from 'react-native-modal';
import CloseImage from "./CloseImage";
import { ResponsiveSize } from "utils/ResponsiveSize";
import { Icon } from "@ui-kitten/components";

type Props = {
    title?: string
    modalTitle?: string
    placeHolder?: string
    style?: ViewStyle
    inputStyle?: ViewStyle
    disabled?: boolean
    inputTextStyle?: TextStyle
    data: string[]
    value?: string
    onSelect?: (value: string) => void
}

const CustomSelect: FC<Props> = (props) => {
    const { value, onSelect, title, data, modalTitle, placeHolder, style, inputStyle, disabled, inputTextStyle } = props;
    const insets = useSafeAreaInsets();
    const [isVisible, setIsVisible] = useState(false);
    let inputColor = disabled ? "gray" : !props.value ? "gray" : "#000";
    let iconColor = disabled ? "gray" : props.value ? "#000" : "gray";
    return (
        <View style={style}>
            {title && <InputTitleText title={title} />}
            <TouchableOpacity key={"component-item"} disabled={disabled} onPress={() => setIsVisible(true)} style={[styles.input, inputStyle]}>
                <CustomText numberOfLines={1} style={[{
                    width: ResponsiveSize(245),
                    color: inputColor
                }, inputTextStyle]}>{value ? value : placeHolder}</CustomText>
                <View
                    style={{
                        position: "absolute",
                        right: ResponsiveSize(10),
                    }}
                >
                    <Icon
                        name="arrow-ios-downward-outline"
                        style={{
                            height: ResponsiveSize(25),
                            width: ResponsiveSize(25)
                        }}
                        fill={iconColor}
                    />
                </View>
            </TouchableOpacity>
            <Modal
                isVisible={isVisible}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                swipeDirection="down"
                propagateSwipe
                swipeThreshold={50}
                backdropOpacity={0.5}
                onSwipeComplete={() => setIsVisible(false)}
                onBackdropPress={() => {
                    setIsVisible(false)
                }}
                onBackButtonPress={() => setIsVisible(false)}
            >
                <View style={[styles.modalContainer, { paddingBottom: insets.bottom }]}>
                    {modalTitle &&
                        <View style={styles.titleContainer}>
                            <CustomText style={{ fontSize: 20 }}>{modalTitle}</CustomText>
                            <TouchableOpacity
                                onPress={() => {
                                    setIsVisible(false);
                                }}
                                style={{
                                    position: 'absolute',
                                    right: responsiveWidth(20)
                                }}
                            >
                                <CloseImage />
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ paddingTop: !modalTitle ? responsiveHeight(25) : undefined, alignItems: "center", }}>
                        <FlatList
                            style={{ width: "100%" }}
                            data={data}
                            ListFooterComponent={() => <View style={{ height: responsiveHeight(60) }} />}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={[styles.renderItem, { backgroundColor: item === value ? "#CCC" : "white" }]}
                                        onPress={() => {
                                            setIsVisible(false);
                                            onSelect?.(item);
                                        }}>
                                        <CustomText numberOfLines={1} style={styles.renderItemText}>{item}</CustomText>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </View>
            </Modal >
        </View>
    )
}
export default CustomSelect;

const styles = StyleSheet.create({
    input: {
        height: ResponsiveSize(45),
        width: ResponsiveSize(290),
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#E6EBF3",
        backgroundColor: "#F7F9FC",
        paddingLeft: ResponsiveSize(15),
        paddingRight: ResponsiveSize(35),
        flexDirection: "row",
        alignItems: "center",
    },
    modalContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        backgroundColor: "white",
        width: '100%',
        height: "90%",
    },
    titleContainer: {
        height: ResponsiveSize(60),
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#CCC",
        borderBottomWidth: 1,
    },

    renderItem: {
        paddingVertical: ResponsiveSize(10),
        justifyContent: "center",
        borderBottomColor: "#F3F3F3",
        borderBottomWidth: 1,
    },
    renderItemText: {
        textAlign: "left",
        marginLeft: ResponsiveSize(20),
        fontSize: 18,
        fontWeight: "600",
        width: ResponsiveSize(335),
        paddingHorizontal: ResponsiveSize(30),
    }
})