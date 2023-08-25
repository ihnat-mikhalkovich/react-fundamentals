import React from 'react';

const errorMessage = (message: string) => (
	<span className='error'>{message}</span>
);

const errorMessagesIfPresent = (messages?: string[]) =>
	messages && (
		<div className={'error-messages'}>{messages?.map(errorMessage)}</div>
	);

export default errorMessagesIfPresent;
