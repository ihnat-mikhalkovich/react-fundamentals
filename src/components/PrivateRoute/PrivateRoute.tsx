import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootType } from '../../store/rootReducer';

interface PrivateRouteProps {
	children: React.ReactNode;
	roles: string[];
	orElse: React.ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
	children,
	roles,
	orElse,
}: PrivateRouteProps) => {
	const user = useSelector((state: RootType) => state.user);
	const auth = roles.includes(user.role);
	return <>{auth ? children : orElse}</>;
};

export default PrivateRoute;
