import React from 'react';
import { Text, Spinner, Flex, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const GoalsList = ({ status, goals }) =>
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
				{goals?.length ? (
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
										<Text>{goal.ongoingStreak} day(s)</Text>
									</Flex>
								</Button>
							))}
						</VStack>
					</>
				) : (
					<Text>No goals to display</Text>
				)}
			</>
		),
	}[status]);

export default GoalsList;
