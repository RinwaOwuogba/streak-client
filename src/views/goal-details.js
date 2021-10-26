import React, { useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Spinner, Flex, useDisclosure } from '@chakra-ui/react';
import { API_URL } from '../config';
import LoaderError from '../components/loader-error';
import GoalDeleteDialog from '../components/goal-delete-dialog';
import GoalLoadSuccess from '../components/goal-load-success';

const GoalDetails = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelDeleteRef = useRef();

	const { user, getAccessTokenSilently } = useAuth0();

	const match = useRouteMatch('/goals/:goalId');
	const goalId = match?.params?.goalId || '';

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

	const handleDeleteConfirmation = () => {
		alert('no!!!!!!!!');
	};

	return (
		<Flex padding='5' justifyContent='center'>
			{
				{
					loading: <Spinner emptyColor='gray.200' color='red.500' size='xl' />,
					success: (
						<>
							<GoalLoadSuccess goal={goal} onDeleteGoal={onOpen} />
							<GoalDeleteDialog
								isOpen={isOpen}
								onClose={onClose}
								onDeleteConfirmation={handleDeleteConfirmation}
								cancelRef={cancelDeleteRef}
							/>
						</>
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
