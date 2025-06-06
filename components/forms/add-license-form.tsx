'use client';
import React from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';
import { loadingSpinner, successIcon } from '@/lib/icons';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
} from '../ui/alert-dialog';
import { NextResponse } from 'next/server';

const licenseFormSchema = z.object({
	license_name: z
		.string({
			required_error: 'Please enter a valid license name.',
		})
		.min(3, { message: 'License names have at least three characters.' }),
	license_number: z
		.string({
			required_error: 'Enter your license number.',
		})
		.min(5, {
			message: 'License numbers have at least five(5) characters.',
		})
		.max(30, {
			message: 'License numbers have at most thirty(30) characters.',
		}),
	license_expiry: z.string({
		required_error: 'Enter license expiry date',
	}),
});

type LicenseFormValues = z.infer<typeof licenseFormSchema>;

const defaultValues: Partial<LicenseFormValues> = {
	license_name: '',
	license_number: '',
	license_expiry: '',
};

export default function AddLicenseForm({ id }: { id: string }) {
	// const [newLicenseId, setNewLicenseId] = React.useState<string>('');
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const form = useForm<LicenseFormValues>({
		resolver: zodResolver(licenseFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	const onSubmit = async (data: LicenseFormValues) => {
		setIsLoading(true);
		try {
			const addLicenseResponse = await fetch('/api/add-license', {
				method: 'PUT',
				body: JSON.stringify({
					license_name: data.license_name,
					license_number: data.license_number,
					license_expiry: data.license_expiry,
					driver_id: id,
				}),
			});
			const result = await addLicenseResponse.json();
			if (
				addLicenseResponse.status > 199 &&
				addLicenseResponse.status < 299
			) {
				toast({
					title: 'License Added Successfully',
				});
				setIsLoading(false);
				setOpen(true);
				form.reset();
				// setNewLicenseId(result.data.license_id);
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'License NOT Created',
				});
				return NextResponse.json(result);
			}
		} catch (error) {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4 '
			>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<FormField
						name='license_name'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									License Name
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='Enter license name'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='license_number'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									License Number
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='text'
										placeholder='License Number'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name='license_expiry'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-title1Bold pl-4'>
									License Expiry Date
								</FormLabel>

								<FormControl>
									<Input
										className='relative text-body flex  items-center h-14 rounded-2xl'
										{...field}
										type='date'
										placeholder='License Number'
									/>
								</FormControl>
								<FormMessage />
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
						<Link href={'/licenses'}>Back</Link>
					</Button>
					<Button
						variant='default'
						size='lg'
						type='submit'
						className='p-4 py-2 rounded-normal w-28'
					>
						{isLoading ? loadingSpinner : 'Add License'}
					</Button>
				</div>
			</form>
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
			>
				<AlertDialogContent className='bg-secondary'>
					<div className='w-60 mx-auto flex-col'>
						<div className='flex flex-col items-center gap-5 mb-5'>
							<div className='h-20 w-20 text-awesome-foreground'>
								{successIcon}
							</div>
							<div className='text-xl'>
								License Added succesfully
							</div>
						</div>
						<div className='flex flex-col text-left whitespace-nowrap  mb-5'>
							<div className=''>
								Name: {form.getValues().license_name}
							</div>
							<div className=''>
								License Number:{' '}
								{form.getValues().license_number}
							</div>
							<div className=''>
								Expiry Date:{' '}
								{form.getValues().license_expiry}
							</div>
						</div>
						<div className='flex flex-col gap-3'>
							<AlertDialogAction
								asChild
								className='rounded-xl'
							>
								<Link href={`/drivers/${id}/`}>
									All Licenses
								</Link>
							</AlertDialogAction>
						</div>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</Form>
	);
}
