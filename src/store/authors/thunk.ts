import authorService from '../../services/authorService';
import { addAuthor, saveAuthors } from './authorsSlice';

export const getAuthors = () => async (dispatch) => {
	const authors = await authorService.findAll();
	dispatch(saveAuthors(authors));
};

export const createAuthorThunk = (authorName: string) => async (dispatch) => {
	const author = await authorService.createAuthor(authorName);
	dispatch(addAuthor(author));
};
