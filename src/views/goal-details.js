import React, { useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { Spinner, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { API_URL } from '../config';
import LoaderError from '../components/loader-error';
import GoalDeleteDialog from '../components/goal-delete-dialog';
import GoalBody from '../components/goal-body';
import GoalBodyHeader from '../components/goal-body-header';

const GoalDetails = () => {
	const queryClient = useQueryClient();
	const toast = useToast();
	const history = useHistory();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelDeleteRef = useRef();

	const { user, getAccessTokenSilently } = useAuth0();

	const { goalId } = useParams();

	const { data: goal, status } = useQuery(`goals/${goalId}`, async () => {
		const token = await getAccessTokenSilently();

		const { data: responseData } = await axios.get(
			`${API_URL}/api/v1/users/${user.sub}/goals/${goalId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return responseData.goal;
	});

	/**
	 * Handles user confirmed goal deletion
	 */
	const handleDeleteConfirmation = async () => {
		const token = await getAccessTokenSilently();

		try {
			await axios.delete(
				`${API_URL}/api/v1/users/${user.sub}/goals/${goalId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast({
				title: `Goal deleted`,
				status: 'success',
				duration: 1500,
				isClosable: true,
				position: 'bottom',
				onCloseComplete: () => {
					queryClient.invalidateQueries(`goals`);
					history.push('/goals');
				},
			});
		} catch (error) {
			toast({
				title: `Error deleting goal`,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
		} finally {
			onClose();
		}
	};

	/**
	 * Handles updating goal details
	 * @param {*} formData
	 */
	const handleUpdateGoal = async (formData) => {
		const token = await getAccessTokenSilently();

		try {
			await axios.put(
				`${API_URL}/api/v1/users/${user.sub}/goals/${goalId}`,
				{ name: formData.newName },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			queryClient.invalidateQueries(`goals/${goalId}`);

			toast({
				title: `Goal name updated!`,
				status: 'success',
				duration: 1500,
				isClosable: true,
				position: 'bottom',
			});
		} catch (error) {
			toast({
				title: `Error updating goal`,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'bottom',
			});
		}
	};

	return (
		<Flex padding='5' justifyContent='center'>
			{
				{
					loading: <Spinner emptyColor='gray.200' color='red.500' size='xl' />,
					success: (
						<Flex direction='column' w='100%' maxW='40rem'>
							<GoalBodyHeader
								goalName={goal?.name}
								handleUpdateGoal={handleUpdateGoal}
							/>
							<GoalBody goal={goal} onDeleteGoal={onOpen} />
							<GoalDeleteDialog
								isOpen={isOpen}
								onClose={onClose}
								onDeleteConfirmation={handleDeleteConfirmation}
								cancelRef={cancelDeleteRef}
							/>
						</Flex>
					),
					error: (
						<LoaderError message='An error occurred while fetching goal data, try reloading the page' />
					),
				}[status]
			}
		</Flex>
	);
};

export default GoalDetails;
