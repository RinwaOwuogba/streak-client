import { ColorModeScript, ChakraProvider, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<StrictMode>
		<ColorModeScript />
		<BrowserRouter>
			<Auth0ProviderWithHistory>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</Auth0ProviderWithHistory>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
