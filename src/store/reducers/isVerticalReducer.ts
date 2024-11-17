import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dimensions } from "react-native";
export type IVerticalStore = {
    isVertical: boolean
}
const initialState: IVerticalStore = {
    isVertical: Dimensions.get('window').width < Dimensions.get('window').height,
}
const isVerticalReducer = createSlice({
    name: 'isVerticalReducer',
    initialState,
    reducers: {
        setIsVertical: (state, action: PayloadAction<IVerticalStore>) => {
            state.isVertical = action.payload.isVertical ?? initialState.isVertical
        },
    }
})

export const { setIsVertical } = isVerticalReducer.actions
export default isVerticalReducer.reducer