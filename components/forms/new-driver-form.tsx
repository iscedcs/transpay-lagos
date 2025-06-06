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
import Link from 'next/link';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
} from '../ui/alert-dialog';
import React from 'react';
import { loadingSpinner, successIcon } from '@/lib/icons';
import { NextResponse } from 'next/server';
import { LGA } from '@/lib/const';
import { Dialog, DialogContent } from '../ui/dialog';

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
		.string()
		.email({ message: 'Enter correct email format' })
		.optional(),
	phone: z
		.string({
			required_error: 'Enter owner phone number.',
		})
		.regex(/^\+234[789][01]\d{8}$/, 'Phone format (+2348012345678)'),
	address: z
		.string({
			required_error: 'Please enter address.',
		})
		.min(3, {
			message: 'Address must be at least 3 characters.',
		})
		.optional(),
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
		})
		.optional(),
	identification_type: z
		.string({
			required_error: 'Please select a mode of identification',
		})
		.optional(),
	is_active: z.boolean({
		required_error: 'Select ',
	}),
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<DriverFormValues> = {
	name: '',
	email: '',
	phone: '',
	address: '',
	city: '',
	lga: 'aguata',
	identification_type: 'nin',
	identification_number: '',
	is_active: true,
};

export function DriverForm({ id }: { id: string }) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const [driver, setDriver] = React.useState<string | null>(null);
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
						vehicle_id: id,
					}),
				}
			);
			const result = await createDriverResponse.json();
			if (
				createDriverResponse.status === 200 ||
				createDriverResponse.status === 201
			) {
				form.reset();
				toast({
					title: 'Driver Created Successfully',
				});
				setDriver(result.data.driver_id);
				setIsLoading(false);
				setOpen(true);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: result.error,
				});
				// throw new Error(`Something Went wrong ${result.message}`);
				// return null;
			}
		} catch (error) {
			setIsLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mb-20 flex flex-col gap-5 w-full'
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
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input
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
										placeholder='08012345678'
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
										{/* <SelectItem value='bvn'>
											BVN
										</SelectItem> */}
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
										placeholder='is_active'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
				</div>
				<div className='flex gap-5 justify-center'>
					<Button
						className='w-28 border-primary text-primary'
						variant='outline'
						asChild
					>
						<Link href='/drivers'>Cancel</Link>
					</Button>
					<Button
						className='w-28'
						type='submit'
					>
						{isLoading ? loadingSpinner : 'Add Driver'}
					</Button>
				</div>
				<Dialog
					open={open}
					onOpenChange={setOpen}
				>
					<DialogContent className='bg-secondary'>
						<div className='w-60 mx-auto flex-col'>
							<div className='flex flex-col items-center gap-5 mb-5'>
								<div className='h-20 w-20 text-awesome-foreground'>
									{successIcon}
								</div>
								<div className='text-xl'>
									Driver created successfully
								</div>
							</div>
							<div className='flex flex-col gap-3'>
								<Button
									asChild
									className='rounded-xl'
								>
									<Link href={`/drivers/${driver}`}>
										View Driver
									</Link>
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</form>
		</Form>
	);
}
