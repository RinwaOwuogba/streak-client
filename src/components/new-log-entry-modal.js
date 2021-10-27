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
			<ModalHeader>Add optional note</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<Text mb='5'>
					New entry created for{' '}
					<Text as='span' fontWeight='bold'>
						{goalName}{' '}
					</Text>
					today! Do you want to add an optional note?
				</Text>

				<form onSubmit={handleSubmit}>
					<FormControl id='entryNote' isRequired>
						<FormLabel>Description</FormLabel>
						<Textarea
							resize='vertical'
							id='entryNote'
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...register('entryNote	')}
						/>
					</FormControl>

					<Button
						mt={4}
						colorScheme='teal'
						isLoading={isSubmitting}
						type='submit'
					>
						Add note
					</Button>
				</form>
			</ModalBody>
			<ModalFooter>
				<Button onClick={onClose}>No</Button>
			</ModalFooter>
		</ModalContent>
	</Modal>
);

export default NewLogEntryModal;
