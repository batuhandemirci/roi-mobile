import { responsiveHeight } from "constants/Dimension";
import React, { FC } from "react"
import { Image, ImageStyle, StyleProp, TouchableOpacity, ViewStyle } from "react-native"
import { Images } from "resources/Images";
import { ResponsiveSize } from "utils/ResponsiveSize";
interface Props {
    style?: StyleProp<ImageStyle>
    touchable?: boolean
    onPress?: () => void
    touchableStyle?: StyleProp<ViewStyle>
}
const CloseImage: FC<Props> = (props) => {
    const { style, touchable, onPress, touchableStyle } = props
    return (
        <>
            {touchable ?
                <TouchableOpacity
                    style={[{ height: ResponsiveSize(20), width: ResponsiveSize(20) }, touchableStyle]}
                    onPress={onPress}
                >
                    <Image
                        source={Images.Close}
                        style={[{ height: ResponsiveSize(20), width: ResponsiveSize(20) }, style]}
                    />
                </TouchableOpacity>
                :
                <Image
                    source={Images.Close}
                    style={[{ height: ResponsiveSize(20), width: ResponsiveSize(20) }, style]}
                />
            }
        </>
    )
}
export default CloseImage;