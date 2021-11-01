import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Text,
	Textarea,
} from '@chakra-ui/react';

const NewLogEntryModal = ({
	onClose,
	isOpen,
	isSubmitting,
	handleSubmit,
	register,
	goalName,
}) => (
	<Modal onClose={onClose} size='lg' isOpen={isOpen}>
		<ModalOverlay />
		<ModalContent>
			<ModalHeader>New entry</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<Text mb='5'>
					Creating a new entry created for{' '}
					<Text as='span' fontWeight='bold'>
						{goalName}{' '}
					</Text>
					today, do you want to add an optional description?
				</Text>

				<form onSubmit={handleSubmit}>
					<FormControl id='entryDescription'>
						<FormLabel>Description</FormLabel>
						<Textarea
							isRequired
							resize='vertical'
							id='entryDescription'
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...register('entryDescription')}
						/>
					</FormControl>

					<Button
						mt={4}
						colorScheme='teal'
						isLoading={isSubmitting}
						type='submit'
					>
						Create with description
					</Button>
				</form>
			</ModalBody>
			<ModalFooter>
				<Button onClick={onClose}>Create without description</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
);

export default NewLogEntryModal;
