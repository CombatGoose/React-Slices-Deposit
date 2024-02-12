import { configureStore } from "@reduxjs/toolkit";

import usersSlice from './user/usersSlice';

const store = configureStore({
    reducer: {
        users: usersSlice
    }
});

export default store;