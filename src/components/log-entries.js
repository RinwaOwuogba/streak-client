import React, { useState } from 'react';
import { Flex, Text, Button, Icon, useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import LogEntryChart from './log-entry-chart';
import NewLogEntryModal from './new-log-entry-modal';
import { API_URL } from '../config';

const LogEntries = ({ goal }) => {
	const { user, getAccessTokenSilently } = useAuth0();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const ENTRY_FETCH_LIMIT = 7;

	const { handleSubmit, register, formState, reset } = useForm();
	const { data: logEntries, status } = useQuery(
		'logEntries/recent',
		async () => {
			const token = await getAccessTokenSilently();

			const { data: responseData } = await axios.get(
				`${API_URL}/api/v1/users/${user.sub}/goals/${goal.id}/log-entries`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						limit: ENTRY_FETCH_LIMIT,
						skip: 0,
					},
				}
			);

			return responseData.logEntries;
		}
	);

	const data = [
		{
			name: 'Page A',
			uv: 4000,
			pv: 2400,
			amt: 2400,
		},
		{
			name: 'Page B',
			uv: 3000,
			pv: 1398,
			amt: 2210,
		},
		{
			name: 'Page C',
			uv: 2000,
			pv: 9800,
			amt: 2290,
		},
		{
			name: 'Page D',
			uv: 2780,
			pv: 3908,
			amt: 2000,
		},
		{
			name: 'Page E',
			uv: 1890,
			pv: 4800,
			amt: 2181,
		},
		{
			name: 'Page F',
			uv: 2390,
			pv: 3800,
			amt: 2500,
		},
		{
			name: 'Page G',
			uv: 3490,
			pv: 4300,
			amt: 2100,
		},
	];

	const handleCreateNewEntry = async (formData) => {
		const token = await getAccessTokenSilently();

		await axios.post(
			`${API_URL}/api/v1/users/${user.sub}/goals/log-entries`,
			{
				description: formData.entryDescription,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		onOpen();
	};

	const handleCloseNewEntryModal = () => {
		reset();
		onClose();
	};

	return (
		<>
			<Flex direction='column' fontSize='md' fontWeight='bold'>
				<Flex mb='7' justifyContent='space-between' alignItems='center'>
					<Text>Log Entries</Text>

					<Button
						rightIcon={<Icon as={MdAdd} />}
						onClick={onOpen}
						variant='outline'
						fontSize='sm'
					>
						New entry
					</Button>
				</Flex>

				<Flex direction='column' width='100%'>
					<LogEntryChart data={data} />
				</Flex>
			</Flex>

			<NewLogEntryModal
				onClose={handleCloseNewEntryModal}
				isOpen={isOpen}
				isSubmitting={formState.isSubmitting}
				handleSubmit={handleSubmit(handleCreateNewEntry)}
				register={register}
				goalName={goal.name}
			/>
		</>
	);
};

export default LogEntries;
