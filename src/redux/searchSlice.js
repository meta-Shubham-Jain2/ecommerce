import { createSlice } from '@reduxjs/toolkit';

// Initial cart state
const initialState = {
    search: '',
//   search: JSON.parse(localStorage.getItem('search')) || '', // Load cart items from localStorage if available
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchFunc: (state,action) => {
            state.search = action.payload;
            // localStorage.setItem('search', JSON.stringify(state.search))
        }
    }
})

export const { searchFunc } = searchSlice.actions;
export const selectSearch = (state) => state.search.search
export default searchSlice.reducer;