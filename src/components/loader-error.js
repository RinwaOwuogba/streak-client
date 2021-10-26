import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { MdOutlineErrorOutline } from 'react-icons/md';

const LoaderError = ({ message = 'An error occurred while fetching data' }) => (
	<Flex w='100%' alignItems='center'>
		<Icon as={MdOutlineErrorOutline} w='30px' h='30px' mr='3' color='red.500' />
		<Text>{message}</Text>
	</Flex>
);

export default LoaderError;
