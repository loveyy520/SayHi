import { ReactNode } from 'react'

interface SectionTitleProps {
    className?: string
	children: ReactNode
}

const SectionTitle = ({ className = '', children }: SectionTitleProps) => {
	return (
		<h3
			className={`
            flex
            flex-row
            items-center
            mb-3
            gap-3
            text-xl
            tracking-wide
            before:block
            before:w-1
            before:h-5
            before:bg-primary/80
            ${className}
        `}
		>
			{children}
		</h3>
	)
}

export default SectionTitle
