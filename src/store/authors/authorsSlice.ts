import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Author from '../../types/Author';
import initStoreState from '../initStoreState';

interface AuthorsState {
	authors: Author[];
}

const initialState: AuthorsState = {
	authors: initStoreState.authors,
};

const authorsSlice = createSlice({
	name: 'authors',
	initialState,
	reducers: {
		addAuthor: (state, action: PayloadAction<Author>) => {
			state.authors.push(action.payload);
		},
		saveAuthors: (state, action: PayloadAction<Author[]>) => {
			state.authors = action.payload;
		},
	},
});

export const { addAuthor, saveAuthors } = authorsSlice.actions;
export default authorsSlice.reducer;
