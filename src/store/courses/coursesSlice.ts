import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initStoreState from '../initStoreState';
import Course from '../../types/Course';

interface CoursesState {
	courses: Course[];
}

const initialState: CoursesState = {
	courses: initStoreState.courses,
};

const coursesSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		saveCourses: (state, action: PayloadAction<Course[]>) => {
			state.courses = action.payload;
		},
		addCourse: (state, action: PayloadAction<Course>) => {
			state.courses.push(action.payload);
		},
		deleteCourse: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			state.courses = state.courses.filter((course) => course.id !== id);
		},
	},
});

export const { addCourse, saveCourses, deleteCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
