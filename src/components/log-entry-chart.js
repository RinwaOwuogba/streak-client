import React from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

const LogEntryChart = ({ data }) => (
	<AreaChart
		height={200}
		width={700}
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
		<YAxis tickCount={0} />
		<Tooltip />
		<Area type='monotone' dataKey='activity' stroke='#8884d8' fill='#8884d8' />
	</AreaChart>
);

export default LogEntryChart;
