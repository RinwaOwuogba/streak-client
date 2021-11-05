import React from 'react';
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	Icon,
	IconButton,
} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import { RiMenu4Line } from 'react-icons/ri';
import MenuAuthItem from './menu-auth-item';

const MobileMenu = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<Menu>
			<MenuButton as={IconButton}>
				<Icon as={RiMenu4Line} width='20px' height='20px' />
			</MenuButton>

			<MenuList>
				{isAuthenticated ? (
					<>
						<MenuItem as={NavLink} to='/' exact>
							About
						</MenuItem>
						<MenuItem as={NavLink} to='/home' exact>
							Home
						</MenuItem>
						<MenuItem as={NavLink} to='/goals' exact>
							Goals
						</MenuItem>
						<MenuDivider />
					</>
				) : null}
				<MenuAuthItem />
			</MenuList>
		</Menu>
	);
};

export default MobileMenu;
