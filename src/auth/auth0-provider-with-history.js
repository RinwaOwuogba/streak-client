import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../config';

const Auth0ProviderWithHistory = ({ children }) => {
	const history = useHistory();

	const onRedirectCallback = (appState) => {
		history.push(appState?.returnTo || '/home');
		//  window.location.pathname);
	};

	return (
		<Auth0Provider
			domain={AUTH0_DOMAIN}
			clientId={AUTH0_CLIENT_ID}
			audience={AUTH0_AUDIENCE}
			redirectUri={window.location.origin}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWithHistory;
