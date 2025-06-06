'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from '../ui/use-toast';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import React from 'react';
import { loadingSpinner } from '@/lib/icons';
import { NextResponse } from 'next/server';
import { LGA } from '@/lib/const';

const driverFormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: 'Name must be at least 2 characters.',
		})
		.max(30, {
			message: 'Name must not be longer than 30 characters.',
		}),
	email: z
		.string({
			required_error: 'Please enter an email.',
		})
		.email(),
	phone: z.string({
		required_error: 'Please enter phone number.',
	}),
	address: z
		.string({
			required_error: 'Please enter address.',
		})
		.min(3, {
			message: 'Address must be at least 3 characters.',
		}),
	city: z
		.string({
			required_error: 'Please enter city.',
		})
		.min(3, {
			message: 'City must be at least 3 characters.',
		})
		.max(30, {
			message: 'City must not be longer than 30 characters.',
		}),
	lga: z.string().min(5, {
		message: 'lga must be at least 5 characters.',
	}),
	identification_number: z
		.string({
			required_error: 'Please enter identification number.',
		})
		.min(8, {
			message: 'ID number must be at least 8 characters.',
		})
		.max(20, {
			message: 'ID Number must not be longer than 20 characters.',
		}),
	identification_type: z.string({
		required_error: 'Please select a mode of identification',
	}),
	is_active: z.boolean({
		required_error: 'Please enter role.',
	}),
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

export function UpdateDriverForm({ driver }: { driver: IDriver }) {
	const [disabled, setDisabled] = React.useState<boolean>(true);
	// This can come from your database or API.
	const defaultValues: Partial<DriverFormValues> = {
		name: `${driver.firstname} ${driver.lastname}`,
		email: driver.email,
		phone: driver.phone,
		address: driver.address,
		city: driver.city,
		lga: driver.lga,
		identification_type: driver.identification_type,
		identification_number: driver.identification_number,
		is_active: driver.is_active,
	};
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const [openSuccess, setOpenSuccess] = React.useState(false);
	const { toast } = useToast();
	const form = useForm<DriverFormValues>({
		resolver: zodResolver(driverFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	async function onSubmit(data: DriverFormValues) {
		setIsLoading(true);
		try {
			const createDriverResponse = await fetch(
				'/api/create-vehicle/new-driver',
				{
					method: 'PUT',
					body: JSON.stringify({
						name: data.name,
						email: data.email,
						phone: data.phone,
						address: data.address,
						city: data.city,
						lga: data.lga,
						identification_type: data.identification_type,
						identification_number: data.identification_number,
						is_active: data.is_active,
						vehicle_id: driver.vehicle_id,
					}),
				}
			);
			const result = await createDriverResponse.json();
			if (
				createDriverResponse.status > 199 &&
				createDriverResponse.status < 299
			) {
				toast({
					title: 'Driver Created Successfully',
				});
				setIsLoading(false);
				setOpen(true);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'Driver NOT Created',
				});
				return null;
			}
		} catch (error) {
			setIsLoading(false);
		}
	}

	return (
		<div className='mb-20'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex flex-col gap-5 w-full'
				>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
											placeholder='Full Name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='email'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Email Address
									</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
											placeholder='Email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='phone'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
											placeholder='Enter phone number'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='address'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
											placeholder='Address'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='city'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
											placeholder='City'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='lga'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>LGA</FormLabel>
									<Select
										disabled={disabled}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='h-12'>
												<SelectValue placeholder='Choose LGA' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{LGA.map((lga, k) => (
												<SelectItem
													key={k}
													value={lga.toLowerCase()}
												>
													{lga}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='identification_type'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Means of Identification
									</FormLabel>
									<Select
										disabled={disabled}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className='h-12'>
												<SelectValue placeholder='Select a mean of Identification' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value='nin'>
												NIN
											</SelectItem>
											<SelectItem value='bvn'>
												BVN
											</SelectItem>
											<SelectItem value='pvc'>
												Voters Card
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='identification_number'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Identification Number
									</FormLabel>
									<FormControl>
										<Input
											disabled={disabled}
											placeholder='Enter identification number'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
						control={form.control}
						name='is_active'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Postcode</FormLabel>
								<FormControl>
									<Input
											disabled={disabled}
										placeholder='is_active'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					</div>
					<div className=''>
						{!disabled && (
							<Button
								className='w-32'
								type='submit'
							>
								{isLoading
									? loadingSpinner
									: 'Save Changes'}
							</Button>
						)}
					</div>
				</form>
			</Form>
			{disabled && (
				<div className='flex items-center justify-between gap-5'>
					<Button
						className='w-32'
						onClick={() => setDisabled(false)}
						type='button'
					>
						Edit
					</Button>
					{/* <Button className='w-32'>
						<DeleteDriverButton id={driver.driver_id} />
					</Button> */}
				</div>
			)}
		</div>
	);
}
