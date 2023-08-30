import React, { ChangeEvent, FC, useState } from 'react';
import Input from '../../common/Input/Input';
import {
	BUTTON_VALUE_LOGIN,
	REGISTRATION_FORM_EMAIL_LABEL,
	REGISTRATION_FORM_NAME_LABEL,
	REGISTRATION_FORM_PASSWORD_LABEL,
} from '../../constants';
import Button from '../../common/Button/Button';
import './styles.scss';
import userService from 'src/services/userService';
import getInputClassName from '../../helpers/getInputClassName';
import ErrorMessagesIfPresent from '../../common/ErrorMessage/ErrorMessagesIfPresent';
import { validateUser } from '../../helpers/validation';
import { onInputChange } from '../../helpers/onInputChange';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
	name: string;
	email: string;
	password: string;
}

interface FormErrors {
	name?: string[];
	email?: string[];
	password?: string[];
}

const fromDataInitState = {
	name: '',
	email: '',
	password: '',
};

const errorsInitState: FormErrors = {
	name: null,
	email: null,
	password: null,
};

const onClick = (
	formData: FormData,
	setErrors: (e: FormErrors) => void
): boolean => {
	const e = validateUser({ ...formData });

	setErrors(e);

	const hasErrorByName = (e as FormErrors).name?.length > 0;
	const hasErrorByEmail = (e as FormErrors).email?.length > 0;
	const hasErrorByPassword = (e as FormErrors).password?.length > 0;

	return hasErrorByName || hasErrorByEmail || hasErrorByPassword;
};

const Registration: FC = () => {
	const [formData, setFormData] = useState<FormData>(fromDataInitState);
	const [errors, setErrors] = useState<FormErrors>(errorsInitState);
	const navigate = useNavigate();

	const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		onInputChange(formData, setFormData)(e);
	};

	const handleClick = () => onClick(formData, setErrors);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const hasError = handleClick();
		if (hasError) return;
		const doRegistration = async () => {
			try {
				await userService.register({ ...formData });
				navigate('/login');
			} catch (e) {
				console.log(e);
				alert('backend dont, u can find the error in console');
			}
		};
		doRegistration();
	};

	return (
		<div className='registration-container'>
			<form className='registration' onSubmit={onSubmit}>
				<Input
					type='text'
					label={REGISTRATION_FORM_NAME_LABEL}
					value={formData.name}
					onChange={handleFieldChange}
					className={getInputClassName(errors.name)}
				/>
				{ErrorMessagesIfPresent(errors.name)}
				<Input
					type='email'
					label={REGISTRATION_FORM_EMAIL_LABEL}
					value={formData.email}
					onChange={handleFieldChange}
					className={getInputClassName(errors.email)}
				/>
				{ErrorMessagesIfPresent(errors.email)}
				<Input
					type='password'
					label={REGISTRATION_FORM_PASSWORD_LABEL}
					value={formData.password}
					onChange={handleFieldChange}
					className={getInputClassName(errors.password)}
				/>
				{ErrorMessagesIfPresent(errors.password)}
				<Button component={BUTTON_VALUE_LOGIN} onClick={handleClick} />
				<p>
					If you have an account you may{' '}
					<Link to={'/login'}>
						<span>Login</span>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Registration;
