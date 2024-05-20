import { setYear, startOfMonth, startOfYear } from 'date-fns'
import { useCallback } from 'react'
import { MonthChangeEventHandler, useDayPicker } from 'react-day-picker'
import {
	Select,
	SelectContent,
	SelectGroup,
    SelectItem,
	SelectTrigger,
} from './select'

/**
 * The props for the {@link YearsDropdown} component.
 */
export interface YearsDropdownProps {
	/** The month where the drop-down is displayed. */
	displayMonth: Date
	/** Callback to handle the `change` event. */
	onChange: MonthChangeEventHandler
}

/**
 * Render a dropdown to change the year. Take in account the `nav.fromDate` and
 * `toDate` from context.
 */
export function CalendarYearsDropdown(props: YearsDropdownProps): JSX.Element {
	const { displayMonth } = props
	const {
		fromDate,
		toDate,
		locale,
		styles,
		classNames,
		components,
		formatters: { formatYearCaption },
		labels: { labelYearDropdown },
	} = useDayPicker()

	const years: Date[] = []

	// Dropdown should appear only when both from/toDate is set
	if (!fromDate) return <></>
	if (!toDate) return <></>

	const fromYear = fromDate.getFullYear()
	const toYear = toDate.getFullYear()
	for (let year = fromYear; year <= toYear; year++) {
		years.push(setYear(startOfYear(new Date()), year))
	}

	const handleChange = useCallback(
		(value: string) => {
			const newMonth = setYear(startOfMonth(displayMonth), Number(value))
			props.onChange(newMonth)
		},
		[props.onChange, setYear, startOfMonth, displayMonth]
	)

	return (
		<Select
			aria-label={labelYearDropdown()}
			value={props.displayMonth.getFullYear().toString()}
			onValueChange={handleChange}
		>
			<SelectTrigger className='w-fit border-0 focus:ring-0 px-0'>
				{props.displayMonth.getFullYear()}
			</SelectTrigger>
			<SelectContent>
                <SelectGroup>
					{years.map((year) => (
						<SelectItem
							key={year.getFullYear()}
							value={year.getFullYear().toString()}
						>
							{formatYearCaption(year, { locale })}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}
