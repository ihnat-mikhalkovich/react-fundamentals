import React from 'react';

const ErrorMessage = (message: string) => (
	<span className='error'>{message}</span>
);

const ErrorMessagesIfPresent = (messages?: string[]) =>
	messages && (
		<div className={'error-messages'}>{messages?.map(ErrorMessage)}</div>
	);

export default ErrorMessagesIfPresent;
