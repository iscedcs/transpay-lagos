import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

export default function ViewAgentDetails() {
	const agentDetails = {
		name: 'enter your name',
		moi: 'select your means of identification',
		phone: 'enter phone number',
		id: 'enter your ID number',
		email: 'enter your email',
		address: 'enter your address',
	};
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label
					htmlFor='name'
					className='text-title2'
				>
					Name
				</Label>
				<Input
					type='name'
					id='name'
					value={agentDetails.name}
				/>
			</div>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label
					htmlFor='moi'
					className='text-title2'
				>
					Means of Identification
				</Label>
				<Select defaultValue={agentDetails.moi}>
					<SelectTrigger className=''>
						<SelectValue placeholder='Select a fruit' />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value='nin'>NIN</SelectItem>
							<SelectItem value='bvn'>BVN</SelectItem>
							<SelectItem value='pvc'>
								Voters Card
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label
					htmlFor='phone'
					className='text-title2'
				>
					Phone Number
				</Label>
				<Input
					type='tel'
					id='phone'
					value={agentDetails.phone}
				/>
			</div>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label
					htmlFor='id'
					className='text-title2'
				>
					Identification Number
				</Label>
				<Input
					type='text'
					id='id'
					value={agentDetails.id}
				/>
			</div>
			<div className='flex flex-col w-full items-start gap-1.5'>
				<Label
					htmlFor='email'
					className='text-title2'
				>
					Email Address
				</Label>
				<Input
					type='email'
					id='email'
					value={agentDetails.email}
				/>
			</div>
			<div className='grid w-full gap-1.5'>
				<Label
					htmlFor='address'
					className='text-title2'
				>
					Address
				</Label>
				<Textarea
					value={agentDetails.address}
					id='address'
				/>
			</div>
		</div>
	);
}
