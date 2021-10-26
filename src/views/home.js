import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import StreakCounter from '../components/streak-counter';

const Home = () => {
	const { user } = useAuth0();
	const { name } = user || { name: 'Bolarinwa Owuogba' };

	return (
		<Flex direction='column' padding='5'>
			<Text mb='10'>Welcome, {name}</Text>

			<StreakCounter />
		</Flex>
	);
};

export default Home;
