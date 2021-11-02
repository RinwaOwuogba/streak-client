import React from 'react';
import { Text, Button, Box } from '@chakra-ui/react';
import LogEntries from './log-entries';

const GoalBody = ({ goal, onDeleteGoal, chartData, chartDataStatus }) => (
	<>
		<Text as='i' color='gray.400' mb='10'>
			Started: {new Date(goal.createdAt).toDateString()}{' '}
		</Text>
		{goal.ongoingStreak > 0 ? (
			<Text mb='5'>
				You&apos;re on a {goal.ongoingStreak} day(s) streak!! Let&apos;s go! 🤩
			</Text>
		) : (
			<Text mb='5' as='i' fontWeight='light'>
				You&apos;re not currently on a streak, why don&apos;t we do something
				about that?
			</Text>
		)}

		<Box mb='20' w='100%'>
			<LogEntries
				goal={goal}
				chartData={chartData}
				chartDataStatus={chartDataStatus}
			/>
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

export default GoalBody;
