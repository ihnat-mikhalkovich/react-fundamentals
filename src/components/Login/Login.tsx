import React, { ChangeEvent, FC, useState } from 'react';
import userService, { LoginData } from '../../services/userService';
import Input from '../../common/Input/Input';
import {
	BUTTON_VALUE_LOGIN,
	REGISTRATION_FORM_EMAIL_LABEL,
	REGISTRATION_FORM_PASSWORD_LABEL,
} from '../../constants';
import Button from '../../common/Button/Button';
import { onInputChange } from '../../helpers/onInputChange';
import { validateUser } from '../../helpers/validation';
import getInputClassName from '../../helpers/getInputClassName';
import ErrorMessagesIfPresent from '../../common/ErrorMessage/ErrorMessagesIfPresent';
import './styles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/user/userSlice';

interface LoginErrors {
	email?: string[];
	password?: string[];
}

const loginDataInitState: LoginData = {
	email: '',
	password: '',
};

const loginErrorsInitState: LoginErrors = {
	email: null,
	password: null,
};

const onClick = (
	formData: LoginData,
	setErrors: (e: LoginErrors) => void
): boolean => {
	const e = validateUser({ ...formData });

	setErrors(e);

	const hasErrorByEmail = (e as LoginErrors).email?.length > 0;
	const hasErrorByPassword = (e as LoginErrors).password?.length > 0;

	return hasErrorByEmail || hasErrorByPassword;
};

const Login: FC = () => {
	const [formData, setFormData] = useState<LoginData>(loginDataInitState);
	const [errors, setErrors] = useState<LoginErrors>(loginErrorsInitState);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		onInputChange(formData, setFormData)(e);
	};

	const handleClick = () => onClick(formData, setErrors);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const hasError = handleClick();
		if (!hasError) {
			const doLogin = async () => {
				try {
					const loggedUser = await userService.login(formData);

					if (loggedUser.isAuth)
						localStorage.setItem('token', loggedUser.token);

					const currentUser = await userService.me();

					dispatch(login(currentUser));

					navigate('/courses');
				} catch (e) {
					alert('backend dont work, error in console');
					console.log(e);
				}
			};
			doLogin();
		}
	};

	return (
		<div className='login-container'>
			<form className='login' onSubmit={onSubmit}>
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
					<Link to={'/registration'}>
						<span>Registration</span>
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
