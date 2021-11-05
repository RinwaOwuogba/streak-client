import React from 'react';
import { Center, Flex, Text } from '@chakra-ui/react';

const Info = () => (
	<Center>
		<Flex direction='column' textAlign='center' mt='5' padding='3' maxW='50rem'>
			<Text fontSize='2xl' fontWeight='bold' mb='7'>
				Welcome to Streak!
			</Text>

			<Text mb='10'>
				Streak helps track your consistent effort towards your goals. Login to
				get started
			</Text>

			<Text>
				Users can create goals and create daily entries for each goal
				representing that the user has taken an action towards that goal for
				that day. Key is consistency
			</Text>
		</Flex>
	</Center>
);

export default Info;
