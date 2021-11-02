import React from 'react';
import { Flex, Text, Spinner } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import axios from 'axios';
import StreakCounter from '../components/streak-counter';
import LoaderError from '../components/loader-error';
import { API_URL } from '../config';

const Home = () => {
	const { user, getAccessTokenSilently } = useAuth0();
	const { name } = user || { name: 'Bolarinwa Owuogba' };
	const { data: goalsWithStreaks, status } = useQuery(
		'goalsWithStreaks',
		async () => {
			const token = await getAccessTokenSilently();

			const { data: responseData } = await axios.get(
				`${API_URL}/api/v1/users/${user.sub}/goals`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						ongoingStreak: true,
					},
				}
			);

			return responseData.goals;
		}
	);

	return (
		<Flex direction='column' padding='5'>
			<Text mb='10'>Welcome, {name}</Text>

			{
				{
					loading: <Spinner />,
					error: <LoaderError />,
					success: (
						<StreakCounter
							activeStreaks={goalsWithStreaks}
							longestOngoingStreak={goalsWithStreaks?.[0]}
						/>
					),
				}[status]
			}
		</Flex>
	);
};

export default Home;
