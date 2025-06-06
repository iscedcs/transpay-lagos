'use client';
import { loadingSpinner, successIcon } from '@/lib/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

const bitsFormSchema = z.object({
	name: z
		.string({ required_error: 'Enter bit name' })
		.min(2, {
			message: 'Name must be at least 2 characters.',
		})
		.max(30, {
			message: 'Name must not be longer than 30 characters.',
		}),
	description: z.string({
		required_error: 'Please enter an description.',
	}),
	value: z.string({
		required_error: 'Please enter a value.',
	}),
});

type BitsFormValues = z.infer<typeof bitsFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<BitsFormValues> = {
	name: '',
	description: '',
	value: '',
};
export function BitsForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const { toast } = useToast();
	const form = useForm<BitsFormValues>({
		resolver: zodResolver(bitsFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	async function onSubmit(data: BitsFormValues) {
		setIsLoading(true);
		try {
			const createBitsResponse = await fetch(
				'/api/create-bits',
				{
					method: 'POST',
					body: JSON.stringify({
						name: data.name,
						description: data.description,
						value: data.value,
					}),
				}
			);
			const result = await createBitsResponse.json();
			if (
				createBitsResponse.status > 199 &&
				createBitsResponse.status < 299
			) {
				toast({
					title: 'Bits Created Successfully',
				});
				setIsLoading(false);
				setOpen(true);
				form.reset();
				router.refresh();
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'Bits NOT Created',
				});
				return null;
			}
		} catch (error) {
			setIsLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-5'
			>
				<div className='grid grid-cols-1 gap-5 mb-10'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder='Bits Name'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='value'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Value</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter Value'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Enter bits description'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid'>
					<Button
						className=''
						type='submit'
					>
						{isLoading ? loadingSpinner : 'Add Bits'}
					</Button>
				</div>
				<Dialog
					open={open}
					onOpenChange={setOpen}
				>
					<DialogContent className='bg-secondary'>
						<div className='mx-auto flex-col'>
							<div className='flex flex-col items-center gap-5 mb-5'>
								<div className='h-20 w-20 text-awesome-foreground'>
									{successIcon}
								</div>
								<div className='text-xl'>
									Bits Created Successfully
								</div>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</form>
		</Form>
	);
}
