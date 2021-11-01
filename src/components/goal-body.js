import React from 'react';
import { Text, Button, Box } from '@chakra-ui/react';
import LogEntries from './log-entries';

const GoalBody = ({ goal, onDeleteGoal }) => {
	const data = [
		{
			label: 'React Charts',
			data: [
				{
					date: new Date(),
					stars: 202123,
				},

				// ...
			],
		},
		{
			label: 'React Query',
			data: [
				{
					date: new Date(),
					stars: 10234230,
				},
				// ...
			],
		},
	];

	return (
		<>
			<Text as='i' color='gray.400' mb='10'>
				Started: {new Date(goal.createdAt).toDateString()}{' '}
			</Text>
			<Text>{/* <pre>{JSON.stringify(goal, null, 4)}</pre> */}</Text>

			<Box mb='20' w='100%'>
				<LogEntries goal={goal} />
			</Box>

			<Button
				pt='7'
				pb='7'
				colorScheme='red'
				variant='outline'
				onClick={onDeleteGoal}
			>
				Delete goal
			</Button>
		</>
	);
};

export default GoalBody;
