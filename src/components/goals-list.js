import React from 'react';
import { Text, Spinner, Flex, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const dummyGoals = [
	{
		id: '123',
		name: 'Jogging',
		ongoingStreak: 100,
	},

	{
		id: '123456',
		name: 'Sleeping in',
		ongoingStreak: 30,
	},
];

const GoalsList = ({ status, goals = dummyGoals }) =>
	({
		loading: (
			<Flex>
				<Spinner />
			</Flex>
		),
		error: (
			<Flex>
				<Text> Error fetching goals</Text>
			</Flex>
		),
		success: (
			<>
				<Flex justifyContent='flex-end' width='100%' fontWeight='bold'>
					<Text>Ongoing streak</Text>
				</Flex>

				<VStack spacing='5px'>
					{goals.map((goal) => (
						<Button
							key={goal.id}
							as={Link}
							to={`/goals/${goal.id}`}
							variant='ghost'
							width='100%'
							pr='2'
							pl='2'
						>
							<Flex
								justifyContent='space-between'
								width='100%'
								fontWeight='medium'
							>
								<Text>{goal.name}</Text>
								<Text>{goal.ongoingStreak} days</Text>
							</Flex>
						</Button>
					))}
				</VStack>
			</>
		),
	}[status]);

export default GoalsList;
