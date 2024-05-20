import { Button } from '@/components/ui/button'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { PositionInfoType } from '@/types/resume'
import { zodResolver } from '@hookform/resolvers/zod'
import { NextPage } from 'next'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import SectionTitle from './section-title'
import { getDictionary } from '@/i18n'

interface ExpectedPositionProps extends PositionInfoType {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
    setPositionInfo: (positionInfo: PositionInfoType) => void
}

const ExpectedPosition: NextPage<ExpectedPositionProps> = ({
    positionType,
    position,
    salaryExpectation,
    workingCity,
    dictionary,
    setPositionInfo,
}) => {
    const formattedSalary = useMemo(() => {
        return salaryExpectation < 1000
            ? ` ${salaryExpectation}`
            : ` ${salaryExpectation / 1000}k`
    }, [salaryExpectation])

    const [isEditing, setIsEditing] = useState(false)

    const formSchema = z.object({
        positionType: z.enum(['Part Time', 'Full Time']),
        position: z.string(),
        salaryExpectation: z.number(),
        workingCity: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            positionType: 'Full Time',
            position: 'Front End Engineer',
            salaryExpectation: 3000,
            workingCity: 'Guangzhou',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setPositionInfo(values)
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
                <CardTitle>{dictionary.resume['Edit expected position']}</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-4'>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='grid grid-cols-2 gap-x-8 gap-y-3 mt-5'
                    >
                        <FormField
                            control={form.control}
                            name='position'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['Position']}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={dictionary.resume['position']}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='salaryExpectation'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['Salary Expectation']}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={dictionary.resume['salary expectation']}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='workingCity'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['Working City']}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={dictionary.resume['city']}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='positionType'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{dictionary.resume['Position Type']}</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className='flex items-center gap-8 space-y-1'
                                        >
                                            <FormItem className='flex items-center space-x-2 space-y-0'>
                                                <FormControl>
                                                    <RadioGroupItem value='Full Time' />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
                                                    {dictionary.resume['Full Time']}
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className='flex items-center space-x-2 space-y-0'>
                                                <FormControl>
                                                    <RadioGroupItem value='Part Time' />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
                                                    {dictionary.resume['Part Time']}
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            variant='outline'
                            onClick={handleCancel}
                        >
                            {dictionary.resume['Cancel']}
                        </Button>
                        <Button type='submit'>{dictionary.resume['Finish']}</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    ) : (
        <div
                id='professional-summary'
                className='px-2 md:px-4 pt-4 md:pt-2 pm-3'
        >
            <SectionTitle>{dictionary.resume['Expected Position']}</SectionTitle>
                <div className='hidden md:block text-muted-foreground px-4 py-2 rounded-md'>
                {dictionary.resume[positionType]}
            </div>

            <div
                    className='group relative md:h-10 flex justify-start items-center gap-1 md:gap-4 min-w-8 px-0 md:px-4 py-2 rounded-md shrink hover:bg-accent'
                onClick={() => setIsEditing(true)}
            >
                    <div className='order-0'>{position}</div>
                    <Separator className='order-1' orientation='vertical' />
                    <div className='order-4 md:order-2 ml-auto md:ml-0'>
                        <span className='hidden md:inline'>{dictionary.resume['Salary Expectation']}：</span>
                        <span className='text-primary/80 md:text-card-foreground'>{formattedSalary}</span>
                    </div>
                    <Separator className='order-3' orientation='vertical' />
                    <div className='text-muted-foreground order-2 md:order-4'>{workingCity}</div>
                <Button
                    variant='link'
                        className='absolute right-0 top-0 gap-1 hidden md:group-hover:flex'
                >
                    <i className='i-[material-symbols--edit-square-rounded]'></i>
                    {dictionary.resume['Edit']}
                </Button>
            </div>
        </div>
    )
}

export default ExpectedPosition
