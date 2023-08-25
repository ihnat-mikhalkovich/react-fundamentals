import { ChangeEvent } from 'react';

export const onInputChange = (formData, setFormData) => {
	return (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData({
			...formData,
			[id.toLowerCase()]: value,
		});
	};
};

export const onTextareaChange = (formData, setFormData) => {
	return (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		setFormData({
			...formData,
			[id.toLowerCase()]: value,
		});
	};
};

export default { onInputChange, onTextareaChange };
