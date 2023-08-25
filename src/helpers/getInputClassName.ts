const getInputClassName = (errorsMessages?: string[]) => {
	if (errorsMessages == null) return '';
	if (errorsMessages.length == 0) return '';
	return 'error';
};

export default getInputClassName;
