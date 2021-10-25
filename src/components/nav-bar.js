import React from 'react';
import { Flex, HStack, useBreakpointValue } from '@chakra-ui/react';
import MainNav from './main-nav';
import MobileMenu from './mobile-menu';
import AuthNav from './auth-nav';
import Logo from '../Logo';

const NavBar = () => {
	const showMobileMenu = useBreakpointValue([true, false]);

	return (
		<Flex as='nav' padding='5' justifyContent='space-between'>
			<Logo />

			{showMobileMenu ? (
				<MobileMenu />
			) : (
				<HStack spacing='10px'>
					<MainNav />
					<AuthNav />
				</HStack>
			)}
		</Flex>
	);
};

export default NavBar;
