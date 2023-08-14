import { mockedAuthorsList } from 'src/constants';
import formatCreationDate from 'src/helpers/formatCreationDate';
import getCourseDuration from 'src/helpers/getCourseDuration';
import Course from 'src/types/Course';

const authorMap: { [key: string]: string } = mockedAuthorsList.reduce(
	(map, item) => {
		map[item.id] = item.name;
		return map;
	},
	{}
);

const mapCoursesToCourseCardProps = (courses: Course[]) =>
	courses.map((course) => {
		return {
			id: course.id,
			title: course.title,
			description: course.description,
			authorsList: course.authors.map((id) => authorMap[id]),
			duration: getCourseDuration(course.duration),
			creationDate: formatCreationDate(course.creationDate),
			onShowCourseClick: () => alert('button not working'),
		};
	});

export default mapCoursesToCourseCardProps;
