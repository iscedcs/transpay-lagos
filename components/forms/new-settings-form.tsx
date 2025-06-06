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
import { Button } from '../ui/button';
import Link from 'next/link';
import { Dialog, DialogContent } from '../ui/dialog';
import React from 'react';
import { loadingSpinner, successIcon } from '@/lib/icons';
import { NextResponse } from 'next/server';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';

const settingsFormSchema = z.object({
	name: z
		.string({ required_error: 'Enter setting name' })
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

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<SettingsFormValues> = {
	name: '',
	description: '',
	value: '',
};
export function SettingsForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [open, setOpen] = React.useState(false);
	const { toast } = useToast();
	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(settingsFormSchema),
		defaultValues,
		mode: 'onChange',
	});

	async function onSubmit(data: SettingsFormValues) {
		setIsLoading(true);
		try {
			const createSettingsResponse = await fetch(
				'/api/create-settings',
				{
					method: 'POST',
					body: JSON.stringify({
						name: data.name,
						description: data.description,
						value: data.value,
					}),
				}
			);
			const result = await createSettingsResponse.json();
			if (
				createSettingsResponse.status > 199 &&
				createSettingsResponse.status < 299
			) {
				toast({
					title: 'Settings Created Successfully',
				});
				setIsLoading(false);
				setOpen(true);
				form.reset();
				router.refresh();
				return NextResponse.json(result);
			} else {
				setIsLoading(false);
				toast({
					title: 'Settings NOT Created',
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
										placeholder='Settings Name'
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
										placeholder='Enter settings description'
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
						{isLoading ? loadingSpinner : 'Add Settings'}
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
									Settings Created Successfully
								</div>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</form>
		</Form>
	);
}
