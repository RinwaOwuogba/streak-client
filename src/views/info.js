import React from 'react';
import { Center, Flex, Text } from '@chakra-ui/react';

const Info = () => (
	<Center>
		<Flex direction='column' textAlign='center' mt='5' padding='3'>
			<Text fontSize='2xl' fontWeight='bold' mb='7'>
				Welcome to Streak!
			</Text>

			<Text>
				Streak helps track your consistent effort towards your goals. Login to
				get started
			</Text>
		</Flex>
	</Center>
);

export default Info;
