import React from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import MainNav from './main-nav';
import AuthNav from './auth-nav';
import Logo from '../Logo';

const NavBar = () => (
	<Flex as='nav' padding='3' justifyContent='space-between'>
		<Logo />

		<HStack spacing='10px'>
			<MainNav />
			<AuthNav />
		</HStack>
	</Flex>
);

export default NavBar;
