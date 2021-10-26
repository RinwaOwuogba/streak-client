import React from 'react';
import {
	Text,
	Flex,
	Button,
	Icon,
	IconButton,
	Tooltip,
	useDisclosure,
	Input,
	FormControl,
	HStack,
	Box,
} from '@chakra-ui/react';
import { FiEdit2 } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

const GoalBodyHeader = ({ goalName, handleUpdateGoal }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { register, handleSubmit, reset } = useForm();

	const handleNewNameSubmit = async (formData) => {
		await handleUpdateGoal(formData);
		onClose();
		reset();
	};

	if (isOpen)
		return (
			<Flex alignItems='center' direction='column' mb='5'>
				<Box
					as='form'
					alignSelf='flex-start'
					onSubmit={handleSubmit(handleNewNameSubmit)}
				>
					<FormControl id='newName' isRequired mr='3'>
						<Input
							id='newName'
							placeholder={goalName}
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...register('newName')}
						/>
					</FormControl>

					<HStack spacing='5px' w='100%' pt='3'>
						<Button type='submit' w='max-content'>
							Save
						</Button>
						<Button onClick={onClose} colorScheme='red' w='max-content'>
							Cancel
						</Button>
					</HStack>
				</Box>
			</Flex>
		);

	return (
		<Flex alignItems='center' mb='5'>
			<Text fontSize='xl' mr='3'>
				{goalName}
			</Text>
			<Tooltip label='Edit goal name' aria-label='A tooltip'>
				<IconButton
					icon={<Icon as={FiEdit2} />}
					onClick={onOpen}
					variant='outline'
				/>
			</Tooltip>
		</Flex>
	);
};

export default GoalBodyHeader;
