import { Button } from '@/components/ui/button'
import { SupportedExportFormats } from '@/types/export'
import { FC, useRef } from 'react'
import { TextReader } from './TextReader'
import { getDictionary } from '@/i18n'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	onImport: (data: SupportedExportFormats) => void
}

export const Import: FC<Props> = ({ dictionary, onImport }) => {
	const textReaderRef = useRef<HTMLInputElement>(null)

	function handleClick() {
		textReaderRef.current?.click()
	}
	return (
		<>
			<TextReader
				ref={textReaderRef}
				onImport={onImport}
			/>
			<Button
				className='w-full justify-start gap-4'
				variant='ghost'
				onClick={handleClick}
			>
				<i className='text-lg i-[tabler--file-import]' />
                {dictionary.chat['Import data']!}
			</Button>
		</>
	)
}
