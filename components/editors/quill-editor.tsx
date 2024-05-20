'use client'

import dynamic from 'next/dynamic'
import { NextPage } from 'next/types'
import 'react-quill/dist/quill.snow.css'
import './styles/quill-editor.css'

const ReactQuill = dynamic(() => import('react-quill'), {
	ssr: false,
})

interface QuillEditorProps {
	value: string
	onChange: (value: string) => void
	className?: string
	placeholder?: string
}

const QuillEditor: NextPage<QuillEditorProps> = ({
	value,
	onChange,
	className = '',
	placeholder = '',
}) => {
	return (
		<ReactQuill
			className={className}
			theme='snow'
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		>
			{/* <div className={`ql-editor min-h-64 max-h-[500px]`}></div> */}
		</ReactQuill>
	)
}

export default QuillEditor
