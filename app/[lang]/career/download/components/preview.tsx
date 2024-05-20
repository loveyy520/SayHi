'use client'

import styleMap, { StylesNames } from '../resume-pdf-styles'
import ResumePdf from './resume-pdf'

import { getDictionary } from '@/i18n'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

const PDFViewer = dynamic(
	() => import('@react-pdf/renderer').then((renderer) => renderer.PDFViewer),
	{
		ssr: false,
	}
)

interface PdfPreviewProps {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
}

const PdfPreview = ({ dictionary }: PdfPreviewProps) => {
	const [currentStyle, setCurrentStyle] = useState<StylesNames>('general')
	const styles = useMemo(() => styleMap[currentStyle], [currentStyle])

	const avatar = '/images/avatar-1.png'

	return (
		<div className='w-1/2 h-full relative flex justify-center items-center bg-slate-300'>
			<div className='absolute right-2 top-2'></div>
			<PDFViewer
				height='100%'
				className='flex justify-center items-center'
			>
				<ResumePdf
					styles={styles}
					avatar={avatar}
					dictionary={dictionary}
				/>
			</PDFViewer>
		</div>
	)
}

export default PdfPreview
