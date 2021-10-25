import React from 'react';
import { MenuItem } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const MenuAuthItem = () => {
	const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

	const handleAuth = () => {
		if (isAuthenticated)
			logout({
				returnTo: window.location.origin,
			});
		else loginWithRedirect();
	};

	return (
		<MenuItem onClick={handleAuth} closeOnSelect={false}>
			{isAuthenticated ? 'Logout' : 'Login'}
		</MenuItem>
	);
};

export default MenuAuthItem;
