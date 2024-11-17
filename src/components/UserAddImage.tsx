import React, { FC } from "react"
import { Image, View } from "react-native"
import { Images } from "resources/Images";
import { ResponsiveSize } from "utils/ResponsiveSize";
interface Props {
}
const UserAddImage: FC<Props> = (props) => {
    return (
        <Image
            tintColor="#595959"
            source={Images.Add}
            style={{
                height: ResponsiveSize(75),
                width: ResponsiveSize(75),
            }}
        />
    )
}
export default UserAddImage;