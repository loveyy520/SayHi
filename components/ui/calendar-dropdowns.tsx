import { addMonths } from 'date-fns'
import {
	CaptionProps,
	MonthChangeEventHandler,
	useDayPicker,
	useNavigation,
} from 'react-day-picker'
import CalendarMonthsDropdown from './calendar-months-dropdown'
import { CalendarYearsDropdown } from './calendar-years-dropdown'

/**
 * Render a caption with the dropdowns to navigate between months and years.
 */
export function CalendarCaptionDropdowns(props: CaptionProps): JSX.Element {
	const { classNames, styles, components } = useDayPicker()
	const { goToMonth } = useNavigation()

	const handleMonthChange: MonthChangeEventHandler = (newMonth) => {
		goToMonth(addMonths(newMonth, props.displayIndex ? -props.displayIndex : 0))
	}

	return (
		<div
			className={`${classNames.caption_dropdowns} flex flex-row items-center gap-3`}
			style={styles.caption_dropdowns}
		>
			<CalendarMonthsDropdown
				onChange={handleMonthChange}
				displayMonth={props.displayMonth}
			/>
			<CalendarYearsDropdown
				onChange={handleMonthChange}
				displayMonth={props.displayMonth}
			/>
		</div>
	)
}
