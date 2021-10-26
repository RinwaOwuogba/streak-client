import React from 'react';
import { Chart } from 'react-charts';

const LogEntryChart = ({ data }) => {
	const primaryAxis = React.useMemo(
		() => ({
			getValue: (datum) => datum.date,
		}),

		[]
	);

	const secondaryAxes = React.useMemo(
		() => [
			{
				getValue: (datum) => datum.stars,
			},
		],

		[]
	);

	return (
		<Chart
			options={{
				data,

				primaryAxis,

				secondaryAxes,
			}}
		/>
	);
};

export default LogEntryChart;
