import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IDepartment = "General" | "Information Communications Technology" | "Finance" | "Marketing" | "Human Resources"
export type IContact = {
    id: number
    department: IDepartment
    name: string
    phoneNumber: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
}
export type IContactStore = {
    contacts: IContact[]
    nextId: number
}
const initialState: IContactStore = {
    contacts: [
        {
            id: 1,
            name: "John Smith",
            phoneNumber: "0299882211",
            department: "Information Communications Technology",
            address: "1 Code Lane",
            city: "Javaville",
            state: "NSW",
            zipCode: "0100",
            country: "Australia",
        },
        {
            id: 2,
            name: "Sue White",
            phoneNumber: "0388992255",
            department: "Finance",
            address: "16 Bit Way",
            city: "Byte Cove",
            state: "QLD",
            zipCode: "1101",
            country: "Australia",
        },
        {
            id: 3,
            name: "Bob O’Bits",
            phoneNumber: "0577882255",
            department: "Marketing",
            address: "8 Silicon Road",
            city: "Cloud Hills",
            state: "VIC",
            zipCode: "1001",
            country: "Australia",
        },
        {
            id: 4,
            name: "Mary Blue",
            phoneNumber: "0644559988",
            department: "Finance",
            address: "4 Processor Boulevard",
            city: "Appletson",
            state: "NT",
            zipCode: "1010",
            country: "Australia",
        },

        {
            id: 5,
            name: "Nick Green",
            phoneNumber: "0299881122",
            department: "Marketing",
            address: "700 Bandwidth Street",
            city: "Bufferland",
            state: "NSW",
            zipCode: "0110",
            country: "Australia",
        },
    ],
    nextId: 6,
}
const contactsReducer = createSlice({
    name: 'contactsReducer',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<{ concact: IContact }>) => {
            state.contacts = [...state.contacts, action.payload.concact]
            state.nextId += 1
        },
        deleteContact: (state, action: PayloadAction<{ id: number }>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id)
        },
        updateContact: (state, action: PayloadAction<{ contact: IContact }>) => {
            const newContacts = state.contacts.map(item => {
                if (item.id == action.payload.contact.id) {
                    return action.payload.contact
                }
                return item
            })
            state.contacts = newContacts;
        }
    }
})

export const { addContact, deleteContact, updateContact } = contactsReducer.actions
export default contactsReducer.reducer