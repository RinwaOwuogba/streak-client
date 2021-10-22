import React, { useEffect } from 'react';
import {
	Text,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	Spinner,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { API_URL } from '../config';

const StreakDrawerContent = ({ user }) => {
	const { isLoading, error, data } = useQuery('streaks', async () => {
		const { data: responseData } = await axios.get(
			`https://${API_URL}/api/v1/${user.id}/streaks`
		);

		return responseData.streaks;
	});

	if (error) {
		<DrawerBody>
			<Text> Error fetching streaks</Text>
		</DrawerBody>;
	}

	if (isLoading)
		return (
			<DrawerBody>
				<Spinner />
			</DrawerBody>
		);

	return (
		<DrawerBody>
			{[1, 2, 3].map((_, index) => (
				<p key='index'>Some contents... index</p>
			))}
		</DrawerBody>
	);
};

const StreaksDrawer = ({
	handleCloseDrawer,
	isOpen,
	drawerSize,
	user = { id: 'sss' },
}) => (
	<Drawer
		placement='right'
		onClose={handleCloseDrawer}
		isOpen={isOpen}
		size={drawerSize}
	>
		<DrawerOverlay />
		<DrawerContent>
			<DrawerHeader borderBottomWidth='1px'>All Streaks</DrawerHeader>
			<StreakDrawerContent user={user} />
		</DrawerContent>
	</Drawer>
);

export default StreaksDrawer;
