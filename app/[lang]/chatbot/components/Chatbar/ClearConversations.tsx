'use client'

import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n'
import { FC, useState } from 'react'

interface Props {
	dictionary: Awaited<ReturnType<typeof getDictionary>>
	onClearConversations: () => void
}

export const ClearConversations: FC<Props> = ({
	dictionary,
	onClearConversations,
}) => {
	const [isConfirming, setIsConfirming] = useState<boolean>(false)

	const handleClearConversations = () => {
		onClearConversations()
		setIsConfirming(false)
	}

	return (
		<Button
			className='w-full justify-start gap-4'
			variant='ghost'
			onClick={() => !isConfirming && setIsConfirming(true)}
		>
			<i className='i-[ion--trash-outline] text-lg'></i>

			<div className='flex-1 font-medium text-left text-sm text-foreground'>
				{
					dictionary.chat[
						isConfirming ? 'Are you sure?' : 'Clear conversations'
					]
				}
			</div>

			{isConfirming && (
				<div className='flex w-[40px]'>
					<Button
						variant='ghost'
						size='icon'
						onClick={(e) => {
							e.stopPropagation()
							handleClearConversations()
						}}
					>
						<i className='i-[ic--sharp-check] text-lg'></i>
					</Button>

					<Button
						size='icon'
						variant='ghost'
						onClick={(e) => {
							e.stopPropagation()
							setIsConfirming(false)
						}}
					>
						<i className='i-[octicon--x-16] text-lg'></i>
					</Button>
				</div>
			)}
		</Button>
	)
}
