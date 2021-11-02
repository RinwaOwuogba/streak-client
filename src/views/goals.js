import React, { useState } from 'react';
import { Flex, Button, useToast, Text } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { API_URL } from '../config';
import GoalsList from '../components/goals-list';
import NewGoalModal from '../components/new-goal-modal';

const Goals = () => {
	const { user: authUser } = useAuth0();
	const queryClient = useQueryClient();

	const user = authUser || { id: 'kl' };

	const toast = useToast();
	const [isNewGoalModelOpen, setIsNewGoalModalOpen] = useState(false);
	const { getAccessTokenSilently } = useAuth0();

	const { data: goals, status } = useQuery('goals', async () => {
		const token = await getAccessTokenSilently();

		const { data: responseData } = await axios.get(
			`${API_URL}/api/v1/users/${user.sub}/goals`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return responseData.goals;
	});

	const { register, handleSubmit, formState, clearErrors, reset } = useForm();

	const handleShowNewGoalModal = () => {
		clearErrors();
		setIsNewGoalModalOpen(true);
	};
	const handleCreateNewGoal = async (formData) => {
		try {
			const token = await getAccessTokenSilently();

			const { data } = await axios.post(
				`${API_URL}/api/v1/users/${user.sub}/goals`,
				{
					name: formData.goalName,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			queryClient.invalidateQueries('goals', { exact: true });
			reset();
			setIsNewGoalModalOpen(false);

			toast({
				title: `New goal "${data.goal.name}" added!`,
				status: 'success',
				duration: 3000,
				isClosable: true,
				variant: 'left-accent',
			});
		} catch (error) {
			toast({
				title: `Error adding new goal`,
				status: 'error',
				duration: 3000,
				isClosable: true,
				variant: 'left-accent',
			});
		}
	};

	return (
		<Flex direction='column' padding='5'>
			<Text
				W='100%'
				textAlign='left'
				fontSize='xl'
				fontWeight='medium'
				casing='uppercase'
				mb='5'
			>
				Goals
			</Text>

			<Flex direction='column' width='100%' alignItems='center'>
				<Flex
					maxW='40rem'
					width='100%'
					direction='column'
					border='2px'
					borderColor='gray.100'
					padding='5'
				>
					<GoalsList status={status} goals={goals} />

					{status === 'success' ? (
						<Flex justifyContent='flex-end' mt='10'>
							<Button onClick={handleShowNewGoalModal}>New Goal</Button>
						</Flex>
					) : null}

					<NewGoalModal
						isOpen={isNewGoalModelOpen}
						onClose={() => setIsNewGoalModalOpen(false)}
						handleSubmit={handleSubmit(handleCreateNewGoal)}
						errors={formState.errors}
						register={register}
						isSubmitting={formState.isSubmitting}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Goals;
