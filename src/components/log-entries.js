import React from 'react';
import { Flex, Text, Button, Icon, Spinner, Box } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import LogEntryChart from './log-entry-chart';

const LogEntries = ({ chartData, chartDataStatus, handleCreateNewEntry }) => (
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
						success: (
							<Box overflowX='scroll'>
								<LogEntryChart data={chartData} />
							</Box>
						),
						error: <Text>Error fetching recent log entries</Text>,
						loading: <Spinner />,
					}[chartDataStatus]
				}
			</Flex>
		</Flex>
	</>
);

export default LogEntries;
