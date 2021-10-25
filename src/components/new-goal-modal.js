import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Text,
	Button,
	Form,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
} from '@chakra-ui/react';

const NewGoalModal = ({
	onClose,
	isOpen,
	isSubmitting,
	handleSubmit,
	errors,
	register,
}) => (
	<Modal onClose={onClose} size='lg' isOpen={isOpen}>
		<ModalOverlay />
		<ModalContent>
			<ModalHeader>Create a new goal</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<form onSubmit={handleSubmit}>
					<FormControl id='goalName' isInvalid={errors.goalName}>
						<FormLabel>Name</FormLabel>
						<Input
							id='goalName'
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...register('goalName', {
								required: 'You need to set a name for the new goal 🙄',
							})}
						/>
						<FormErrorMessage>
							{errors.goalName && errors.goalName.message}
						</FormErrorMessage>
					</FormControl>

					<Button
						mt={4}
						colorScheme='teal'
						isLoading={isSubmitting}
						type='submit'
					>
						Create
					</Button>
				</form>
			</ModalBody>
			<ModalFooter>
				<Button onClick={onClose}>Close</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
);

export default NewGoalModal;
