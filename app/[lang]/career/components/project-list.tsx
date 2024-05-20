import QuillEditor from '@/components/editors/quill-editor'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CalendarCaption from '@/components/ui/calendar-caption'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { getDictionary } from '@/i18n'
import { ProjectListItemType } from '@/types/resume'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ProjectExperienceBox from './project-list-item'
import SectionTitle from './section-title'

interface ProjectListProps {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
	data: ProjectListItemType[]
	setData: (data: ProjectListItemType[]) => void
}

const defaultValues: ProjectListItemType = {
	projectName: '',
	role: '',
	projectLink: '',
	projectStartTime: [new Date(), new Date()],
	projectDescription: '',
	projectResult: '',
}

const ProjectList: NextPage<ProjectListProps> = ({
	dictionary,
	data,
	setData,
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const formSchema = z.object({
		projectName: z.string().min(1, {
			message: dictionary.resume['Project name is required.'],
		}),
		role: z.string(),
		projectLink: z.string().optional(),
		projectStartTime: z.tuple([z.date(), z.date()]),
		projectDescription: z.string().min(1, {
			message: dictionary.resume['Project description is required.'],
		}),
		projectResult: z.string().optional(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		currentEditingIndex > -1
			? setData(data.toSpliced(currentEditingIndex, 1, values))
			: setData([...data, values])
		setIsEditing(false)
	}

	const [currentEditingIndex, setCurrentEditingIndex] = useState(-1)

	const handleAddClick = useCallback(() => {
		setCurrentEditingIndex(-1)
		form.reset(defaultValues)
		setIsEditing(true)
	}, [setCurrentEditingIndex, setIsEditing])

	const onEdit = useCallback(
		(index: number) => {
			setCurrentEditingIndex(index)
			form.reset(data[index])
			setIsEditing(true)
		},
		[form, data, setCurrentEditingIndex, setIsEditing]
	)

	const onDelete = useCallback(
		(index: number) => setData(data.toSpliced(index, 1)),
		[data, setData]
	)

	return isEditing ? (
		<Card
			id='personal-information'
			className={'col-span-1'}
		>
			<CardHeader className='bg-primary/5'>
				<CardTitle>
					{currentEditingIndex > -1
						? dictionary.resume['Edit project experience']
						: dictionary.resume['Add project experience']}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className='grid grid-cols-2 gap-x-8 gap-y-4 mt-5'
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							name='projectName'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>{dictionary.resume['Project Name']}</FormLabel>
										<FormControl>
											<Input
												placeholder={dictionary.resume['Project name']}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							name='role'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>{dictionary.resume['Role']}</FormLabel>
										<FormControl>
											<Input
												placeholder={dictionary.resume['Your role']}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<FormField
							name='projectLink'
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>
											{dictionary.resume['Project link (Optional)']}
										</FormLabel>
										<FormControl>
											<Input
												placeholder={
													dictionary.resume['Project link (Optional)']
												}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
						<div className='col-span-2'>
							<FormField
								name='projectStartTime'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>
												{dictionary.resume['Project Start Time']}
											</FormLabel>
											<FormControl>
												<div>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={'outline'}
																	className={`
                                                                    pl-3
                                                                    text-left
                                                                    font-normal
                                                                    active:scale-100
                                                                    ${
																																			!field.value &&
																																			'text-muted-foreground'
																																		}
                                                                `}
																>
																	{field.value ? (
																		format(field.value[0], 'yyyy-MM-dd')
																	) : (
																		<span>
																			{dictionary.resume['Pick a date']}
																		</span>
																	)}
																	<i className='i-[material-symbols--calendar-month-rounded] ml-auto h-4 w-4 text-primary/80' />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className='w-auto p-0'
															align='start'
														>
															<Calendar
																mode='single'
																captionLayout='dropdown-buttons'
																selected={field.value[0]}
																onSelect={(val) =>
																	field.onChange([val, field.value[1]])
																}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date('1950-01-01')
																}
																initialFocus
																fromYear={1950}
																toYear={2150}
																components={{
																	Caption: CalendarCaption,
																}}
															/>
														</PopoverContent>
													</Popover>
													<span className='mx-4'>
														{dictionary.resume['to']}
													</span>
													<Popover>
														<PopoverTrigger asChild>
															<FormControl>
																<Button
																	variant={'outline'}
																	className={`
                                                                    pl-3
                                                                    text-left
                                                                    font-normal
                                                                    active:scale-100
                                                                    ${
																																			!field.value &&
																																			'text-muted-foreground'
																																		}
                                                                `}
																>
																	{field.value ? (
																		format(field.value[1], 'yyyy-MM-dd')
																	) : (
																		<span>
																			{dictionary.resume['Pick a date']}
																		</span>
																	)}
																	<i className='i-[material-symbols--calendar-month-rounded] ml-auto h-4 w-4 text-primary/80' />
																</Button>
															</FormControl>
														</PopoverTrigger>
														<PopoverContent
															className='w-auto p-0'
															align='start'
														>
															<Calendar
																mode='single'
																captionLayout='dropdown-buttons'
																selected={field.value[1]}
																onSelect={(val) =>
																	field.onChange([field.value[0], val])
																}
																disabled={(date) =>
																	date > new Date() ||
																	date < new Date('1950-01-01')
																}
																initialFocus
																fromYear={1950}
																toYear={2150}
																components={{
																	Caption: CalendarCaption,
																}}
															/>
														</PopoverContent>
													</Popover>
												</div>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='col-span-2'>
							<FormField
								name='projectDescription'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>
												{dictionary.resume['Project Description']}
											</FormLabel>
											<FormControl>
												<QuillEditor
													className='small-editor'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='col-span-2'>
							<FormField
								name='projectResult'
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>
												{dictionary.resume['Project performance (Optional)']}
											</FormLabel>
											<FormControl>
												<QuillEditor
													className='small-editor'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
						<div className='col-span-2 flex flex-row justify-end gap-4 items-center'>
							<Button
								variant='outline'
								onClick={() => setIsEditing(false)}
							>
								{dictionary.resume['Cancel']}
							</Button>
							<Button type='submit'>{dictionary.resume['Finish']}</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	) : (
		<div
			id='work-experience'
			className='px-2 md:px-4 pt-4 md:pt-2 pm-3 group'
		>
			<SectionTitle>
				<div className='flex justify-between items-center w-full'>
					<span>{dictionary.resume['Project List']}</span>
					<Button
						variant='link'
						size='sm'
						className='hidden group-hover:flex h-7 py-1'
						onClick={handleAddClick}
					>
						<i className='i-[material-symbols--add-circle] text-lg text-primary/50'></i>
						{dictionary.resume['Add']}
					</Button>
				</div>
			</SectionTitle>
			{data.map((item, index) => (
				<ProjectExperienceBox
					dictionary={dictionary}
					{...item}
					onEdit={() => onEdit(index)}
					onDelete={() => onDelete(index)}
				/>
			))}
		</div>
	)
}

export default ProjectList
