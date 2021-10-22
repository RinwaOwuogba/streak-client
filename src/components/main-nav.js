import { NavLink } from 'react-router-dom';
import React from 'react';
import { HStack, Link } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const MainNav = () => {
	const { isAuthenticated } = useAuth0();

	return isAuthenticated ? (
		<HStack spacing='10px'>
			<Link as={NavLink} to='/home' exact>
				Home
			</Link>

			<Link as={NavLink} to='/home/streaks' exact>
				Streaks
			</Link>
		</HStack>
	) : null;
};

export default MainNav;
