import React from 'react';
import { Flex, Text, Button, Icon, useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import LogEntryChart from './log-entry-chart';
import NewLogEntryModal from './new-log-entry-modal';

const LogEntries = ({ goal }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { handleSubmit, register, formState, reset } = useForm();

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

	const handleCreateNewEntry = (formData) => {
		console.log(formData);
		// make API request

		// show modal

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
						onClick={handleCreateNewEntry}
						variant='outline'
						fontSize='sm'
					>
						New entry
					</Button>
				</Flex>

				<Flex direction='column'>
					<LogEntryChart data={data} />

					<Button mt='7' variant='outline' width='max-content'>
						Browse log entries
					</Button>
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
