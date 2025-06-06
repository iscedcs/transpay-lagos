'use client';

import {
	Area,
	AreaChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

const data = [
	{
		name: 'Jan',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Feb',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Mar',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Apr',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'May',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Jun',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Jul',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Aug',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Sep',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Oct',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Nov',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Dec',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
];

export const CustomTooltip = ({
	active,
	payload,
	label,
}: {
	active?: string;
	payload?: any;
	label?: string;
}) => {
	if (active && payload && payload.length) {
		return (
			<div className='custom-tooltip'>
				<p className='label'>{`${label} : ${payload[0].value}`}</p>
				<p className='intro'>{label}</p>
				<p className='desc'>
					Anything you want can be displayed here.
				</p>
			</div>
		);
	}

	return null;
};

export function Charts() {
	return (
		<ResponsiveContainer
			width='100%'
			height={350}
		>
			<AreaChart
				width={500}
				height={300}
				data={data}
				margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
			>
				<defs>
					<linearGradient
						id='colorTotal'
						x1='0'
						y1='0'
						x2='0'
						y2='1'
					>
						<stop
							offset='5%'
							stopColor='#CABB33'
							stopOpacity={0.8}
						/>
						<stop
							offset='95%'
							stopColor='#CABB33'
							stopOpacity={0}
						/>
					</linearGradient>
				</defs>
				<XAxis
					dataKey='name'
					stroke='#888888'
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}`}
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `₦${value}`}
				/>
				<Tooltip content={<CustomTooltip />} />
				<Legend />
				<Area
					type='monotone'
					dataKey='total'
					stroke='#4F4700'
					fillOpacity={1}
					strokeWidth={2}
					fill='url(#colorTotal)'
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
