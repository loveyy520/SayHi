import QuillEditor from '@/components/editors/quill-editor'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import CalendarCaption from '@/components/ui/calendar-caption'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { getDictionary } from '@/i18n'
import { EmploymentHistoryType } from '@/types/resume'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EmploymentHistoryProps extends EmploymentHistoryType {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const EmploymentInfo = ({
	companyName,
	position,
	startAndEndDate,
	workContent,
	workAchievements,
	dictionary,
}: EmploymentHistoryProps) => {
	const formSchema = z.object({
		companyName: z.string(),
		startAndEndDate: z.tuple([z.date(), z.date()]),
		position: z.string(),
		workContent: z.string(),
		workAchievements: z.string(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			companyName,
			startAndEndDate,
			position,
			workContent,
			workAchievements,
		},
	})

	return (
		<Card className='group'>
			<Accordion
				type='single'
				collapsible
				className='w-full'
			>
				<AccordionItem value='item-1'>
					<AccordionTrigger className='p-6 items-start'>
						<div className='flex flex-col gap-3 items-start'>
							<span className='text-left text-xl font-bold group-hover:text-primary/80'>
								{companyName}
							</span>
							<div className='flex flex-row gap-3 items-center'>
								<div>{position}</div>
								<Separator
									className='h-5'
									orientation='vertical'
								/>
								<span>{`${format(startAndEndDate[0], 'yyyy-MM')} - ${format(
									startAndEndDate[1],
									'yyyy-MM'
								)}`}</span>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<CardContent>
							<Form {...form}>
								<form className='grid grid-cols-2 gap-8'>
									<FormField
										name='companyName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{dictionary.resume['Company Name']}
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										name='position'
										render={({ field }) => (
											<FormItem>
												<FormLabel>{dictionary.resume['Position']}</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<div className='col-span-2'>
										<FormField
											name='startAndEndDate'
											render={({ field }) => {
												return (
													<FormItem>
														<FormLabel>
															{dictionary.resume['Start And End Date']}
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
													</FormItem>
												)
											}}
										/>
									</div>
									<div className='col-span-2'>
										<FormField
											name='workContent'
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														{dictionary.resume['Work Content']}
													</FormLabel>
													<FormControl>
														<QuillEditor
															className='small-editor'
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
									<div className='col-span-2'>
										<FormField
											name='workAchievements'
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														{dictionary.resume['Work Achievements (Optional)']}
													</FormLabel>
													<FormControl>
														<QuillEditor
															className='small-editor'
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>
								</form>
							</Form>
						</CardContent>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</Card>
	)
}

export default EmploymentInfo
