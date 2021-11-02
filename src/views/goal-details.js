import React, { useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { Spinner, Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { format, subDays } from 'date-fns';
import { API_URL } from '../config';
import LoaderError from '../components/loader-error';
import GoalDeleteDialog from '../components/goal-delete-dialog';
import GoalBody from '../components/goal-body';
import GoalBodyHeader from '../components/goal-body-header';
import hasActivityOnDate from '../utils';

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

	const ENTRY_FETCH_LIMIT = 7;

	const { data: chartData, status: chartDataStatus } = useQuery(
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
		try {
			const token = await getAccessTokenSilently();

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

	/**
	 * Create new log entry for current date
	 */
	const handleCreateNewEntry = async () => {
		try {
			const token = await getAccessTokenSilently();

			await axios.post(
				`${API_URL}/api/v1/users/${user.sub}/goals/${goal.id}/log-entries`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			queryClient.invalidateQueries('logEntries/chartData');
			queryClient.invalidateQueries(`goals/${goal.id}`);

			toast({
				title: `New entry!`,
				description: `New "${goal.name}" entry added for today!`,
				status: 'success',
				duration: 1500,
				isClosable: true,
				position: 'bottom',
			});
		} catch (error) {
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
		<Flex padding='5' justifyContent='center'>
			{
				{
					loading: <Spinner emptyColor='gray.200' color='red.500' size='xl' />,
					success: (
						<Flex direction='column' w='100%' maxW='50rem'>
							<GoalBodyHeader
								goalName={goal?.name}
								handleUpdateGoal={handleUpdateGoal}
							/>
							<GoalBody
								goal={goal}
								onDeleteGoal={onOpen}
								chartData={chartData}
								chartDataStatus={chartDataStatus}
								handleCreateNewEntry={handleCreateNewEntry}
							/>
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
