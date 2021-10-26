import React from 'react';
import {
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from '@chakra-ui/react';

const GoalDeleteDialog = ({
	isOpen,
	cancelRef,
	onClose,
	onDeleteConfirmation,
}) => (
	<AlertDialog
		isOpen={isOpen}
		leastDestructiveRef={cancelRef}
		onClose={onClose}
	>
		<AlertDialogOverlay>
			<AlertDialogContent>
				<AlertDialogHeader fontSize='lg' fontWeight='bold'>
					Delete Goal
				</AlertDialogHeader>

				<AlertDialogBody>
					Are you sure you want to delete this goal? All your entries and
					streaks will be lost
				</AlertDialogBody>

				<AlertDialogFooter>
					<Button ref={cancelRef} onClick={onClose}>
						Cancel
					</Button>
					<Button colorScheme='red' onClick={onDeleteConfirmation} ml={3}>
						Delete
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialogOverlay>
	</AlertDialog>
);

export default GoalDeleteDialog;
