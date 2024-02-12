import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = ({
    list: [
        {
            id: 0,
            login: 'User1',
            password: '123qwe',
            deposits: [
                {
                    id: 0,
                    depositName: 'testDeposit',
                    depositSum: 5000,
                    depositPeriod: 100
                }
            ]
        },
        {
            id: 1,
            login: 'User2',
            password: '123qwe',
            deposits: [
                {
                    id: 1,
                    depositName: 'testDeposit',
                    depositSum: 3000,
                    depositPeriod: 28
                }
            ]
        },
        {
            id: 2,
            login: 'User3',
            password: '123qwe',
            deposits: [
                {
                    id: 2,
                    depositName: 'testDeposit',
                    depositSum: 12000,
                    depositPeriod: 12
                }
            ]
        },
    ]
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        auth: (state, action) => state,
        createNewDeposit: (state, action) => {
            const { id, depositName, depositSum, depositPeriod } = action.payload;

            state.list = state.list.map(user => {
                if (user.id === id) {
                    return {
                        ...user,
                        deposits: [
                            ...user.deposits,
                            {
                                id: nanoid(),
                                depositName,
                                depositSum,
                                depositPeriod
                            }
                        ]
                    };
                }
                return user;
            });
        }
    }
});

export const { auth, createNewDeposit } = usersSlice.actions;

export default usersSlice.reducer;