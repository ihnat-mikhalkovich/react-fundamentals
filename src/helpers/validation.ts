const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const passwordMinLength = 6;

type Validator = (text: string | number | Array<string>) => string;

const isEmpty = (text: string, fieldName: string): string =>
	text.length ? null : `${fieldName} is required.`;

const isEmail = (email: string, fieldName: string): string =>
	emailRegex.test(email) ? null : `${fieldName} should be email.`;

const isLongerOrEqualThan = (
	text: string,
	fieldName: string,
	expectedSize: number
) =>
	text.length >= expectedSize
		? null
		: `${fieldName} should be longer or equal to ${expectedSize}`;

const emailValidationRules: Array<Validator> = [
	(text: string) => isEmpty(text, 'Email'),
	(text: string) => isEmail(text, 'Email'),
];

const passwordValidationRules: Array<Validator> = [
	(pwd: string) => isEmpty(pwd, 'Password'),
	(pwd: string) => isLongerOrEqualThan(pwd, 'Password', passwordMinLength),
];

const userValidationRules = {
	name: [(text: string) => isEmpty(text, 'Name')],
	email: emailValidationRules,
	password: passwordValidationRules,
};

const validate = (rules) => {
	return (formData: Record<string, string | number | Array<string>>) => {
		const errors = {};

		Object.keys(formData).forEach((field) => {
			const messages: string[] = [];
			rules[field]?.forEach((rule: Validator) => {
				const val = formData[field];
				const result = rule(val);
				if (result) messages.push(result);
			});
			if (messages.length) errors[field] = messages;
		});

		return errors;
	};
};

export const validateUser = validate(userValidationRules);

const isPositive = (num: number, field: string) =>
	num > 0 ? null : `${field} should be positive.`;

const isEmptyArray = (arr: string[], field: string) =>
	arr.length ? null : `${field} list should not be empty.`;

const courseValidationRules = {
	title: [(text: string) => isEmpty(text, 'Name')],
	description: [(text: string) => isEmpty(text, 'Description')],
	duration: [(num: number) => isPositive(num, 'Duration')],
	authors: [(authors: string[]) => isEmptyArray(authors, 'Authors')],
};

export const hasErrors = (errors) => {
	return Object.keys(errors).length;
};

export const validateCourse = validate(courseValidationRules);
