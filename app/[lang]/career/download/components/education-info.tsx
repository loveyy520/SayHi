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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { getDictionary } from '@/i18n'
import { EducationType } from '@/types/resume'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EducationInfoProps extends EducationType {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const EducationInfo = ({
	dictionary,
	schoolName,
	educationalSystem,
	degree,
	period,
	major,
	educationExperience,
}: EducationInfoProps) => {
	const formSchema = z.object({
		schoolName: z.string(),
		educationalSystem: z.enum(['Full-time', 'Part-time']),
		degree: z.enum([
			'High School Education',
			'College Degree',
			'Bachelor Degree',
			'Master Degree',
			'Doctorial Degree',
		]),
		period: z.tuple([z.date(), z.date()]),
		major: z.string(),
		educationExperience: z.string(),
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			schoolName,
			educationalSystem,
			degree,
			period,
			major,
			educationExperience,
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
								{schoolName}
							</span>
							<div className='flex flex-row gap-3 items-center'>
								<div>{degree}</div>
								<Separator
									className='h-5'
									orientation='vertical'
								/>
								<div>{major}</div>
								<Separator
									className='h-5'
									orientation='vertical'
								/>
								<span>{`${format(period[0], 'yyyy-MM')} - ${format(
									period[1],
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
										name='schoolName'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													{dictionary.resume['School Name']}
												</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										name='degree'
										render={({ field }) => (
											<FormItem>
												<FormLabel>{dictionary.resume['Degree']}</FormLabel>
												<FormControl>
													<Select {...field}>
														<SelectTrigger className='w-[180px]'>
															<SelectValue placeholder='Select a fruit' />
														</SelectTrigger>
														<SelectContent>
															<SelectGroup>
																<SelectItem value='High School Education'>
																	{dictionary.resume['High School Education']}
																</SelectItem>
																<SelectItem value='College degree'>
																	{dictionary.resume['College Degree']}
																</SelectItem>
																<SelectItem value='Bachelor degree'>
																	{dictionary.resume['Bachelor Degree']}
																</SelectItem>
																<SelectItem value='Master degree'>
																	{dictionary.resume['Master Degree']}
																</SelectItem>
																<SelectItem value='Doctorial Degree'>
																	{dictionary.resume['Doctorial Degree']}
																</SelectItem>
															</SelectGroup>
														</SelectContent>
													</Select>
												</FormControl>
											</FormItem>
										)}
									/>
									<div className='col-span-2'>
										<FormField
											name='period'
											render={({ field }) => {
												return (
													<FormItem>
														<FormLabel>{dictionary.resume['Period']}</FormLabel>
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
											name='educationExperience'
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														{dictionary.resume['Education Experience']}
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

export default EducationInfo
