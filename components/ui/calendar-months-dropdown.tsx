import { MonthChangeEventHandler, useDayPicker } from 'react-day-picker'
import { isSameYear, setMonth, startOfMonth } from 'date-fns'
import { useCallback } from 'react'
import {
	Select,
	SelectContent,
	SelectGroup,
    SelectItem,
	SelectTrigger,
} from './select'

/** The props for the {@link MonthsDropdown} component. */
export interface MonthsDropdownProps {
	/** The month where the dropdown is displayed. */
	displayMonth: Date
	onChange: MonthChangeEventHandler
}

/** Render the dropdown to navigate between months. */
export default function CalendarMonthsDropdown(
	props: MonthsDropdownProps
): JSX.Element {
	const {
		fromDate,
		toDate,
		styles,
		locale,
		formatters: { formatMonthCaption },
		classNames,
		components,
		labels: { labelMonthDropdown },
	} = useDayPicker()

	// Dropdown should appear only when both from/toDate is set
	if (!fromDate) return <></>
	if (!toDate) return <></>

	const dropdownMonths: Date[] = []

	if (isSameYear(fromDate, toDate)) {
		// only display the months included in the range
		const date = startOfMonth(fromDate)
		for (let month = fromDate.getMonth(); month <= toDate.getMonth(); month++) {
			dropdownMonths.push(setMonth(date, month))
		}
	} else {
		// display all the 12 months
		const date = startOfMonth(new Date()) // Any date should be OK, as we just need the year
		for (let month = 0; month <= 11; month++) {
			dropdownMonths.push(setMonth(date, month))
		}
	}

	const handleChange = useCallback(
		(value: string) => {
			const selectedMonth = Number(value)
			const newMonth = setMonth(startOfMonth(props.displayMonth), selectedMonth)
			props.onChange(newMonth)
		},
		[setMonth, startOfMonth, props.displayMonth, props.onChange]
	)

	return (
		<Select
			aria-label={labelMonthDropdown()}
			value={props.displayMonth.getMonth().toString()}
			onValueChange={handleChange}
		>
			<SelectTrigger className='w-fit border-0 focus:ring-0 px-0'>
				{formatMonthCaption(props.displayMonth, { locale })}
			</SelectTrigger>
			<SelectContent>
                <SelectGroup>
					{dropdownMonths.map((m) => (
						<SelectItem
							key={m.getMonth()}
							value={m.getMonth().toString()}
						>
							{formatMonthCaption(m, { locale })}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
