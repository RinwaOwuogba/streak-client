import React, { useEffect } from 'react';
import {
	Flex,
	Text,
	useDisclosure,
	useBreakpointValue,
} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import StreakCounter from '../components/streakCounter';
import StreaksDrawer from '../components/streaksDrawer';

const Home = () => {
	const history = useHistory();
	const match = useRouteMatch('/home/:action');

	const { isOpen, onOpen, onClose } = useDisclosure();
	const drawerSize = useBreakpointValue(['xs', 'sm']);

	const { user } = useAuth0();
	const { name } = user || { name: 'Bolarinwa Owuogba' };

	useEffect(() => {
		if (match?.params?.action === 'streaks') {
			onOpen();
		}

		onOpen();
	}, [match]);

	const handleCloseDrawer = () => {
		history.push('/home');
		onClose();
	};

	return (
		<Flex direction='column' padding='3'>
			<Text mb='10'>Welcome, {name}</Text>

			<StreakCounter />

			<StreaksDrawer
				drawerSize={drawerSize}
				isOpen={isOpen}
				handleCloseDrawer={handleCloseDrawer}
			/>
		</Flex>
	);
};

export default Home;
