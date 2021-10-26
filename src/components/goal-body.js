import React from 'react';
import { Text, Button } from '@chakra-ui/react';
import LogEntryChart from './log-entry-chart';

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
			<Text as='i' color='gray.400'>
				Started: {new Date(goal.createdAt).toDateString()}{' '}
			</Text>
			<Text>
				<pre>{JSON.stringify(goal, null, 4)}</pre>
			</Text>

			<LogEntryChart data={data} />

			<Button colorScheme='red' variant='outline' onClick={onDeleteGoal}>
				Delete goal
			</Button>
		</>
	);
};

export default GoalBody;
