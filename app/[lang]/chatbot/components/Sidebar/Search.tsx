import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChangeEvent, FC } from 'react'

interface Props {
	placeholder: string
	searchTerm: string
	onSearch: (searchTerm: string) => void
}

export const Search: FC<Props> = ({ placeholder, searchTerm, onSearch }) => {
	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value)
	}

	const clearSearch = () => {
		onSearch('')
	}

	return (
		<div className='relative flex gap-4 items-center'>
			<Input
				className='w-full !h-10 !bg-background'
                placeholder={placeholder || ''}
				value={searchTerm}
				onChange={handleSearchChange}
			/>

			{searchTerm && (
				<Button
					variant='outline'
					className='shrink-0'
					size='icon'
				>
					<i
						className='i-[icon-park-outline--clear]'
						onClick={clearSearch}
					/>
				</Button>
			)}
		</div>
	)
}
