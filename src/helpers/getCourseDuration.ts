const getCourseDuration = (duration: number): string => {
	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;
	return toString(hours) + ':' + toString(minutes) + ' hours';
};

const toString = (num: number) => (num < 10 ? '0' + num : num);

export default getCourseDuration;
