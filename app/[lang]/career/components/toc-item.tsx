'use client'

interface TocItemProps {
	id: string
	title: string
}

const TocItem = ({ id, title }: TocItemProps) => {
	const handleContentClick = () => {
		const el = document.getElementById(id)
		el?.scrollIntoView({ behavior: 'smooth' })
	}

	return (
		<li
			className='h-10 px-4 py-2 rounded-md cursor-pointer hover:text-primary hover:bg-accent'
			onClick={handleContentClick}
		>
			{title}
		</li>
	)
}

export default TocItem
