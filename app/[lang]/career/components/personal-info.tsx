import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { Gender, type PersonalInfoType } from '@/types/resume'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { NextPage } from 'next/types'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { format } from 'date-fns'
import { getDictionary } from '@/i18n'

interface PersonalInfoProps extends PersonalInfoType {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
    setPersonalInfo: (personalInfo: PersonalInfoType) => void
}

const PersonalInfo: NextPage<PersonalInfoProps> = ({
    name,
    gender,
    birth,
    degree,
    careerStartDate,
    email,
    jobStatus,
    phone,
    wechatAccount,
    dictionary,
    setPersonalInfo,
}) => {
    const workedYears = 5
    const picture = ''
    const [isEditing, setIsEditing] = useState(false)

    const formSchema = z.object({
        name: z.string().min(2).max(50),
        gender: z.string(),
        birth: z.date({
            required_error: 'A date of birth is required.',
        }),
        degree: z.enum([
            'High School Education',
            'College Degree',
            'Bachelor Degree',
            'Master Degree',
            'Doctorial Degree'
        ]),
        careerStartDate: z.date({
            required_error: 'A date of birth is required.',
        }),
        email: z.string().optional(),
        jobStatus: z.enum(['On the stuff', 'Resigned']),
        phone: z.string(),
        wechatAccount: z.string().optional(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name,
            gender,
            birth: new Date(birth),
            degree,
            careerStartDate: new Date(careerStartDate),
            email,
            jobStatus,
            phone,
            wechatAccount,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setPersonalInfo({
            ...values,
            gender: values.gender as Gender,
            birth: values.birth.toLocaleString(),
            careerStartDate: values.careerStartDate.toLocaleString(),
        })
        setIsEditing(false)
    }

    const handleCancel = useCallback(() => {
        setIsEditing(false)
        form.reset()
    }, [setIsEditing])

    return isEditing ? (
        <Card
            id='personal-information'
            className={'col-span-1'}
        >
            <CardHeader className='bg-primary/5'>
                <CardTitle>{dictionary.resume['Edit personal information']}</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-4'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='grid grid-cols-2 gap-x-8 gap-y-4 mt-5'
                    >
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['Name']}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={dictionary.resume['name']}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='gender'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['Gender']}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className='flex items-center gap-8 space-y-1'
                                        >
                                            <FormItem className='flex items-center space-x-2 space-y-0'>
                                                <FormControl>
                                                    <RadioGroupItem value='male' />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
                                                    {dictionary.resume['Male']}
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className='flex items-center space-x-2 space-y-0'>
                                                <FormControl>
                                                    <RadioGroupItem value='female' />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
                                                    {dictionary.resume['Female']}
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='birth'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>{dictionary.resume['Birth']}</FormLabel>
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
														${!field.value && 'text-muted-foreground'}
                                                    `}
                                                >
                                                    {field.value ? (
                                                        format(field.value, 'yyyy-MM-dd')
                                                    ) : (
                                                        <span>{dictionary.resume['Pick a date']}</span>
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
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date('1950-01-01')
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='careerStartDate'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>{dictionary.resume['CareerStartDate']}</FormLabel>
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
														${!field.value && 'text-muted-foreground'}
                                                    `}
                                                >
                                                    {field.value ? (
                                                        format(field.value, 'yyyy-MM-dd')
                                                    ) : (
                                                        <span>{dictionary.resume['Pick a date']}</span>
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
                                                fromYear={1990}
                                                toYear={2150}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date('1900-01-01')
                                                }
                                                initialFocus
                                                components={{
                                                    Caption: CalendarCaption,
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='jobStatus'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['jobStatus']}</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={dictionary.resume['Select a job status']} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='On the stuff'>
                                                {dictionary.resume['On the stuff']}
                                            </SelectItem>
                                            <SelectItem value='Resigned'>{dictionary.resume['Resigned']}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['Email']}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={dictionary.resume['email (not required)']}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['Phone']}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={dictionary.resume['phone']}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='wechatAccount'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['WeChat']}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={dictionary.resume['Wechat (not required)']}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='col-span-2 flex justify-end gap-4 items-center'>
                            <Button
                                variant='outline'
                                onClick={handleCancel}
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
            id='personal-information'
                className='max-w-full md:h-32 pt-2 pm-3 px-2 md:px-4 flex justify-between items-center gap-2 md:gap-4'
        >
            <div
                    className='group px-2 py-2 rounded-md shrink hover:bg-accent'
                onClick={() => setIsEditing(true)}
            >
                <header className='h-10 flex justify-between items-center'>
                        <span className='text-2xl font-bold md:font-normal'>{name}</span>
                    <Button
                        variant='link'
                        className='gap-1 hidden group-hover:flex'
                    >
                        <i className='i-[material-symbols--edit-square-rounded]'></i>
                        {dictionary.resume['Edit']}
                    </Button>
                </header>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-4 mt-2'>
                        <span className='col-span-1 flex items-center gap-1'>
                        <i className='i-[ic--baseline-work-history] text-primary/80'></i>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span>{`${workedYears} ${dictionary.resume['years']}`}</span>
                                </TooltipTrigger>
                                <TooltipContent>{`${workedYears}${dictionary.resume[
                                    'years'
                                ]}`}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                        <span className='col-span-1 flex items-center gap-1'>
                        <i className='i-[tdesign--education] text-primary/80'></i>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                        <span>{dictionary.resume[degree]}</span>
                                </TooltipTrigger>
                                    <TooltipContent>{dictionary.resume[degree]}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                        <span className='col-span-2 md:col-span-1 flex items-center gap-1'>
                        <i className='i-[material-symbols--workspace-premium] text-primary/80'></i>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span>{dictionary.resume[jobStatus]}</span>
                                </TooltipTrigger>
                                <TooltipContent>{dictionary.resume[jobStatus]}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                        <span className='hidden md:flex items-center gap-1'>
                        <i className='i-[solar--phone-rounded-bold] text-primary/80'></i>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span>{phone}</span>
                                </TooltipTrigger>
                                <TooltipContent>{phone}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                        <span className='hidden md:flex items-center gap-1'>
                        <i className='i-[ion--logo-wechat] text-primary/80'></i>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span>{wechatAccount}</span>
                                </TooltipTrigger>
                                <TooltipContent>{wechatAccount}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                        <span className='hidden md:flex items-center gap-1'>
                        <i className='i-[fluent--mail-24-filled] text-primary/80'></i>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className='max-w-32 overflow-hidden text-ellipsis'>
                                    <span>{email}</span>
                                </TooltipTrigger>
                                <TooltipContent>{email}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                </div>
            </div>
                <Avatar className='shrink-0 h-20 w-20'>
                <AvatarImage
                    src={picture}
                    alt='Avatar'
                />
                <AvatarFallback>
                    <Image
                            src='/images/avatar-1.png'
                            alt='Default avatar'
                            width={80}
                            height={80}
                        ></Image>
                        {/* <Image
                            className='md:hidden'
                            src='/images/avatar-1.png'
                            alt='Default avatar'
                            width={48}
                            height={48}
                    ></Image> */}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

export default PersonalInfo
