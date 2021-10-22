import React from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import Logo from '../Logo';

const Loading = () => (
	<Flex
		height='100vh'
		justifyContent='center'
		alignItems='center'
		direction='column'
	>
		<Box mb='5'>
			<Logo />
		</Box>

		<Spinner emptyColor='gray.200' color='red.500' size='xl' />
	</Flex>
);

export default Loading;
