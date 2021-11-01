import React from 'react';
import {
	Flex,
	Text,
	Button,
	Icon,
	useToast,
	Spinner,
	Box,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useQueryClient } from 'react-query';
import subDays from 'date-fns/subDays';
import isSameDay from 'date-fns/isSameDay';
import format from 'date-fns/format';
import LogEntryChart from './log-entry-chart';
import { API_URL } from '../config';

const hasActivityOnDate = (entries, targetDate) =>
	entries.find((entry) =>
		isSameDay(new Date(entry.createdAt), new Date(targetDate))
	);

const LogEntries = ({ goal }) => {
	const queryClient = useQueryClient();
	const toast = useToast();
	const { user, getAccessTokenSilently } = useAuth0();

	const ENTRY_FETCH_LIMIT = 7;
	const { data: chartData, status } = useQuery(
		'logEntries/chartData',
		async () => {
			const token = await getAccessTokenSilently();

			// fetch recent log entries
			const {
				data: { logEntries },
			} = await axios.get(
				`${API_URL}/api/v1/users/${user.sub}/goals/${goal.id}/log-entries`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						limit: ENTRY_FETCH_LIMIT,
						skip: 0,
						startDate: subDays(new Date(), ENTRY_FETCH_LIMIT),
					},
				}
			);

			// transform into chart data
			return Array.from({ length: ENTRY_FETCH_LIMIT }).map((_, index) => {
				const targetDate = subDays(new Date(), ENTRY_FETCH_LIMIT - (index + 1));

				if (hasActivityOnDate(logEntries, targetDate)) {
					return {
						name: format(targetDate, 'iii, do'),
						// 'did something',
						activity: 100,
					};
				}

				return {
					name: format(targetDate, 'iii, do'),
					// 'did nothing',
					activity: 0,
				};
			});
		}
	);

	const handleCreateNewEntry = async () => {
		try {
			const token = await getAccessTokenSilently();

			await axios.post(
				`${API_URL}/api/v1/users/${user.sub}/goals/log-entries`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			queryClient.invalidateQueries('logEntries/chartData');

			toast({
				title: `New entry!`,
				description: `New "${goal.name}" entry added for today!`,
				status: 'success',
				duration: 1500,
				isClosable: true,
				position: 'bottom',
			});
		} catch (error) {
			console.log(error);
			toast({
				title: `Error adding new entry`,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	return (
		<>
			<Flex direction='column' fontSize='md' fontWeight='bold'>
				<Flex mb='7' justifyContent='space-between' alignItems='center'>
					<Text>Log Entries</Text>

					<Button
						rightIcon={<Icon as={MdAdd} />}
						onClick={handleCreateNewEntry}
						variant='outline'
						fontSize='sm'
					>
						New entry
					</Button>
				</Flex>

				<Flex direction='column' width='100%'>
					{
						{
							// success: <LogEntryChart data={data} />,
							success: (
								<Box overflowX='scroll'>
									<LogEntryChart data={chartData} />
								</Box>
							),
							error: <Text>Error fetching recent log entries</Text>,
							loading: <Spinner />,
						}[status]
					}
				</Flex>
			</Flex>
		</>
	);
};

export default LogEntries;
