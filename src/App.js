import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from './components/nav-bar';
import { Info, Home, GoalDetails, Goals } from './views';
import Loading from './components/loading';
import ProtectedRoute from './auth/protected-route';

const queryClient = new QueryClient();

const App = () => {
	const { isLoading } = useAuth0();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<NavBar />
			<Switch>
				<Route path='/' exact component={Info} />
				<ProtectedRoute path='/home' exact component={Home} />
				<ProtectedRoute path='/goals' exact component={Goals} />
				<ProtectedRoute path='/goals/:goalId' exact component={GoalDetails} />
			</Switch>
		</QueryClientProvider>
	);
};
export default App;
