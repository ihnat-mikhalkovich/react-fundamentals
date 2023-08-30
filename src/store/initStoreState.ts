import Course from '../types/Course';
import Author from '../types/Author';
import User from '../types/User';

interface Store {
	user: User;
	courses: Course[];
	authors: Author[];
}

const initStoreState: Store = {
	user: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
		role: '',
	},
	courses: [],
	authors: [],
};

export default initStoreState;
