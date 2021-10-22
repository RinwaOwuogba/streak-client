/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { BsFillLightningChargeFill } from 'react-icons/bs';

const ActiveStreakLightning = ({ fill }) => (
	<Icon as={BsFillLightningChargeFill} fill={fill} w='200px' h='200px' mb='5' />
);

const StreakCounter = ({
	activeStreaks = [
		{
			name: 'Jogging',
			days: '100',
		},
		{
			name: 'Eating right',
			days: '100',
		},
	],
	longestOngoingStreak = {
		name: 'Jogging',
		days: '100',
	},
}) => {
	if (!longestOngoingStreak)
		return (
			<Flex alignItems='center' padding='5' direction='column'>
				<ActiveStreakLightning fill='gray.200' />
				<Text>You're not currently on any streak</Text>
			</Flex>
		);

	if (longestOngoingStreak && activeStreaks.length === 1)
		return (
			<Flex alignItems='center' padding='5' direction='column'>
				<ActiveStreakLightning fill='red.500' />

				<Text fontWeight='bold'>
					You&apos;re on a{' '}
					<Text fontWeight='bold' fontSize='7xl' wordBreak='break-word'>
						{longestOngoingStreak.days}-day
					</Text>{' '}
					"{longestOngoingStreak.name}" streak{' '}
					<span as='span' role='img' aria-label='three fire emojis'>
						🔥🔥
					</span>
				</Text>
			</Flex>
		);

	return (
		<Flex alignItems='center' padding='5' direction='column'>
			<ActiveStreakLightning fill='red.500' />

			<Text fontWeight='bold'>
				You&apos;re on a{' '}
				<Text fontWeight='bold' fontSize='7xl' wordBreak='break-word'>
					{longestOngoingStreak.days}-day
				</Text>{' '}
				"{longestOngoingStreak.name}" streak and several others!{' '}
				<span as='span' role='img' aria-label='three fire emojis'>
					🔥🔥🔥
				</span>
			</Text>
		</Flex>
	);
};

export default StreakCounter;
