import React from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';

const GoalLoadSuccess = ({ goal, onDeleteGoal }) => (
	<Flex direction='column'>
		<Text fontSize='xl'>{goal.name} </Text>

		<Text as='i' color='gray.400'>
			Started: {new Date(goal.createdAt).toDateString()}{' '}
		</Text>
		<Text>
			<pre>{JSON.stringify(goal, null, 4)}</pre>
		</Text>

		<Button colorScheme='red' variant='outline' onClick={onDeleteGoal}>
			Delete goal
		</Button>
	</Flex>
);

export default GoalLoadSuccess;
