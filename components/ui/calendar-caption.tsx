import {
	// CaptionDropdowns,
	CaptionLabel,
	CaptionNavigation,
	CaptionProps,
	useDayPicker,
} from 'react-day-picker'
import { CalendarCaptionDropdowns } from './calendar-dropdowns'

/**
 * Render the caption of a month. The caption has a different layout when
 * setting the {@link DayPickerBase.captionLayout} prop.
 */
export default function CalendarCaption(props: CaptionProps): JSX.Element {
	const { classNames, disableNavigation, styles, captionLayout, components } =
		useDayPicker()

	const CaptionLabelComponent = components?.CaptionLabel ?? CaptionLabel

	let caption: JSX.Element
	if (disableNavigation) {
		caption = (
			<CaptionLabelComponent
				id={props.id}
				displayMonth={props.displayMonth}
			/>
		)
	} else if (captionLayout === 'dropdown') {
		caption = (
			<CalendarCaptionDropdowns
				displayMonth={props.displayMonth}
				id={props.id}
			/>
		)
	} else if (captionLayout === 'dropdown-buttons') {
		caption = (
			<>
				<CalendarCaptionDropdowns
					displayMonth={props.displayMonth}
					displayIndex={props.displayIndex}
					id={props.id}
				/>
				<CaptionNavigation
					displayMonth={props.displayMonth}
					displayIndex={props.displayIndex}
					id={props.id}
				/>
			</>
		)
	} else {
		caption = (
			<>
				<CaptionLabelComponent
					id={props.id}
					displayMonth={props.displayMonth}
					displayIndex={props.displayIndex}
				/>
				<CaptionNavigation
					displayMonth={props.displayMonth}
					id={props.id}
				/>
			</>
		)
	}

	return (
		<div
			className={classNames.caption}
			style={styles.caption}
		>
			{caption}
		</div>
	)
}
