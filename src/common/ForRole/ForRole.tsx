import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
	children: ReactNode;
}

const navigateToLogin = <Navigate to={'/login'} />;
const navigateToIndex = <Navigate to={'/'} />;

const ForRole = (children: ReactNode, roles: string[]) =>
	forRoleOrElse(children, roles, navigateToLogin);

const forRoleOrElse = (
	children: ReactNode,
	roles: string[],
	orElse: ReactNode
) => (
	<PrivateRoute roles={roles} orElse={orElse}>
		{children}
	</PrivateRoute>
);

export const forUser: FC = (children: ReactNode) =>
	ForRole(children, ['user', 'admin']);

export const forAdmin: FC = (children: ReactNode) =>
	ForRole(children, ['admin']);

export const forGuest: FC = (children: ReactNode) =>
	forRoleOrElse(children, [''], navigateToIndex);

export const forAdminView: FC = (children: ReactNode) =>
	forRoleOrElse(children, ['admin'], '');

export default ForRole;
