import formatCreationDate from 'src/helpers/formatCreationDate';
import getCourseDuration from 'src/helpers/getCourseDuration';
import Course from 'src/types/Course';
import Author from '../../types/Author';

// const authorMap: { [key: string]: string } = mockedAuthorsList.reduce(
const createAuthorMap: (authors: Author[]) => { [key: string]: string } = (
	authors
) =>
	authors.reduce((map, item) => {
		map[item.id] = item.name;
		return map;
	}, {});

const mapCoursesToCourseCardProps = (courses: Course[], authors: Author[]) => {
	const authorMap = createAuthorMap(authors);
	return courses.map((course) => ({
		id: course.id,
		title: course.title,
		description: course.description,
		authorsList: course.authors.map((id) => authorMap[id]),
		duration: getCourseDuration(course.duration),
		creationDate: formatCreationDate(course.creationDate),
		onShowCourseClick: () => alert('button not working'),
	}));
};

export const searchByNameOrByIdPredicate = (search: string) => (c) => {
	const isSearchInputInTitle = c.title
		.toLowerCase()
		.includes(search.toLowerCase());
	const isSearchInputEqualsId = c.id === search;
	return isSearchInputInTitle || isSearchInputEqualsId;
};

export default mapCoursesToCourseCardProps;
