import React, { useState } from 'react';
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	Flex,
	Button,
	useToast,
	Text,
	IconButton,
	useBreakpointValue,
} from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { API_URL } from '../config';
import GoalsList from './goals-list';
import NewGoalModal from './new-goal-modal';

const GoalsDrawer = ({
	handleCloseDrawer,
	isOpen,
	drawerSize,
	user = { sub: 'sss' },
}) => {
	const queryClient = useQueryClient();
	const hiddenDrawerNavigation = useBreakpointValue([false, true]);
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

			queryClient.invalidateQueries('goals');
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
		<Drawer
			placement='right'
			onClose={handleCloseDrawer}
			isOpen={isOpen}
			size={drawerSize}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader borderBottomWidth='1px'>
					<Flex alignItems='center'>
						<IconButton
							onClick={handleCloseDrawer}
							variant='ghost'
							icon={<BiArrowBack />}
							w='20px'
							h='20px'
							hidden={hiddenDrawerNavigation}
						/>
						<Text>Goals</Text>
					</Flex>
				</DrawerHeader>
				<DrawerBody pt='5' pl='4' pr='4'>
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
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default GoalsDrawer;
