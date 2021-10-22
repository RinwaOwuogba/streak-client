import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './components/nav-bar';
import { Info, Home } from './views';
import Loading from './components/loading';
import ProtectedRoute from './auth/protected-route';

const App = () => {
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<NavBar />
			<Switch>
				<Route path='/' exact component={Info} />
				<ProtectedRoute path='/home' component={Home} />
			</Switch>
		</>
	);
};
export default App;
