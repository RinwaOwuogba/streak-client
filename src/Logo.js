import React from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsLightningCharge } from 'react-icons/bs';

const Logo = () => (
	<Flex alignItems='center' cursor='pointer'>
		<Icon
			as={BsLightningCharge}
			mr='2'
			w={['5', '7']}
			h={['5', '7']}
			fill='red.500'
		/>
		<Link to='/'>
			<Text
				margin='0'
				color='red.500'
				fontWeight='medium'
				fontSize={['xl', '2xl']}
			>
				Streak
			</Text>
		</Link>
	</Flex>
);

export default Logo;
