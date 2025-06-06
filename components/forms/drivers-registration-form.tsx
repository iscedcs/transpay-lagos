'use client';
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const driverFormSchema = z.object({
	name: z
		.string()
		.min(5, { message: 'Name must be at least 5 characters.' })
		.max(50, { message: 'Name must be longer than 50 characters.' }),
	email: z
		.string({
			required_error: 'Please enter a valid email.',
		})
		.email(),
	phoneNumber: z
		.string()
		.min(10, { message: 'Phone number must have at least 10 digits.' }),
	address: z.string({
		description: 'Enter your address.',
	}),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters.' }),
	confirmPassword: z.string().min(6, {
		message: 'Password must be at least 6 characters',
	}),
	meansOfIdentification: z
		.string()
		.refine(
			(value) =>
				[
					'Voters Card',
					'NIN',
					'Passport',
					'Drivers Licenses',
				].includes(value),
			{
				message: 'Invalid means of identification.',
			}
		),
	identificationNumber: z.string(),
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

export default function DriverForm() {
	const form = useForm<DriverFormValues>({
		resolver: zodResolver(driverFormSchema),
		mode: 'onChange',
	});

	const onSubmit = (data: DriverFormValues) => {};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4 '
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						name='name'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Name
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Name'
										required
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='meansOfIdentification'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Means Of Identification
								</FormLabel>

								<Select defaultValue={field.value}>
									<FormControl>
										<SelectTrigger className='relative text-body flex  items-center h-14 rounded-2xl'>
											<SelectValue placeholder='Select a means of identification' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='nin'>
											NIN
										</SelectItem>
										<SelectItem value='passport'>
											Passport
										</SelectItem>
										<SelectItem value='driversLicence'>
											Drivers Licence
										</SelectItem>
										<SelectItem value='votersCard'>
											Voters Card
										</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>

					<FormField
						name='phoneNumber'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Phone Number
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='phone'
										placeholder='Phone Number'
										required
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name='identificationNumber'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Identification Number
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Identification Number'
										required
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						name='email'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Email
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='email'
										placeholder='Email Address'
										required
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						name='address'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Address
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Address'
										required
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						name='password'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Enter Password
								</FormLabel>
								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='password'
										placeholder='Enter Password'
										required
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						name='confirmPassword'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									Confirm Password
								</FormLabel>
								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='password'
										placeholder='Confirm Password'
										required
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className='flex justify-center items-center gap-6 text-title1Bold'>
					<Button
						variant={'outline'}
						size='lg'
						type='button'
						asChild
						className='p-4 py-2 rounded-normal w-28 '
					>
						<Link href={'/vehicles?page=1&limit=15'}>
							Back
						</Link>
					</Button>
					<Button
						variant='default'
						size='lg'
						type='button'
						asChild
						className='p-4 py-2 rounded-normal w-28'
					>
						<Link href={'/vehicles/new-vehicle/plate-info'}>
							Next
						</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
