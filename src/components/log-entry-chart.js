import React from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

const LogEntryChart = ({ data }) => (
	<ResponsiveContainer height={100} width='100%'>
		<AreaChart
			data={data}
			margin={{
				top: 10,
				right: 30,
				left: 0,
				bottom: 0,
			}}
		>
			<CartesianGrid strokeDasharray='2 3' />
			<XAxis dataKey='name' />
			<YAxis />
			<Tooltip />
			<Area type='monotone' dataKey='pv' stroke='#8884d8' fill='#8884d8' />
		</AreaChart>
	</ResponsiveContainer>
);

export default LogEntryChart;
