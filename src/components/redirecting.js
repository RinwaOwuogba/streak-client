import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const Redirecting = () => (
	<Flex justifyContent='center' alignItems='center' direction='column'>
		<Spinner mb='5' emptyColor='gray.200' color='red.500' size='xl' />
		<Text fontWeight='bold'>Redirecting..</Text>
	</Flex>
);

export default Redirecting;
