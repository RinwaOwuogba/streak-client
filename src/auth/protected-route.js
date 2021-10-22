import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Redirecting from '../components/redirecting';

const ProtectedRoute = ({ component, ...args }) => (
	<Route
		component={withAuthenticationRequired(component, {
			onRedirecting: () => <Redirecting />,
		})}
		// eslint-disable-next-line react/jsx-props-no-spreading
		{...args}
	/>
);

export default ProtectedRoute;
