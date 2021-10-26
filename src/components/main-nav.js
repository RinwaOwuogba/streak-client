import { NavLink } from 'react-router-dom';
import React from 'react';
import { Link } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const MainNav = () => {
	const { isAuthenticated } = useAuth0();

	return isAuthenticated ? (
		<>
			<Link as={NavLink} to='/home' exact>
				Home
			</Link>

			<Link as={NavLink} to='/goals' exact>
				Goals
			</Link>
		</>
	) : null;
};

export default MainNav;
