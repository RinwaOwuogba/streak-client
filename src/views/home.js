import React, { useEffect } from 'react';
import {
	Flex,
	Text,
	useDisclosure,
	useBreakpointValue,
} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import StreakCounter from '../components/streak-counter';
import GoalsDrawer from '../components/goals-drawer';

const Home = () => {
	const history = useHistory();
	const match = useRouteMatch('/home/:action');

	const { isOpen, onOpen, onClose } = useDisclosure();
	const drawerSize = useBreakpointValue(['xs', 'sm']);

	const { user } = useAuth0();
	const { name } = user || { name: 'Bolarinwa Owuogba' };

	useEffect(() => {
		if (match?.params?.action === 'goals') {
			onOpen();
		}

		// onOpen();
	}, [match]);

	const handleCloseDrawer = () => {
		history.push('/home');
		onClose();
	};

	return (
		<Flex direction='column' padding='5'>
			<Text mb='10'>Welcome, {name}</Text>

			<StreakCounter />

			<GoalsDrawer
				drawerSize={drawerSize}
				isOpen={isOpen}
				handleCloseDrawer={handleCloseDrawer}
				user={user}
			/>
		</Flex>
	);
};

export default Home;
