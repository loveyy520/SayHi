'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Conversation } from '@/types/chat'
import { KeyValuePair } from '@/types/data'
import {
	DragEvent,
	FC,
	FocusEvent,
	HTMLAttributes,
	KeyboardEvent,
	SyntheticEvent,
	useCallback,
	useEffect,
	useState,
} from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {
	selectedConversation: Conversation
	conversation: Conversation
	loading: boolean
	onSelectConversation: (conversation: Conversation) => void
	onDeleteConversation: (conversation: Conversation) => void
	onUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void
}

export const ConversationComponent: FC<Props> = ({
	className,
	selectedConversation,
	conversation,
	loading,
	onSelectConversation,
	onDeleteConversation,
	onUpdateConversation,
}) => {
	const [isDeleting, setIsDeleting] = useState(false)
	const [isRenaming, setIsRenaming] = useState(false)
	const [renameValue, setRenameValue] = useState('')

	const handleEnterDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleRename(selectedConversation)
		}
	}

	const handleDragStart = (
		e: DragEvent<HTMLDivElement>,
		conversation: Conversation
	) => {
		if (e.dataTransfer) {
			e.dataTransfer.setData('conversation', JSON.stringify(conversation))
		}
	}

	const handleRename = (conversation: Conversation) => {
		if (renameValue.trim().length > 0) {
			onUpdateConversation(conversation, { key: 'name', value: renameValue })
			setRenameValue('')
			setIsRenaming(false)
		}
	}

	useEffect(() => {
		if (isRenaming) {
			setIsDeleting(false)
		} else if (isDeleting) {
			setIsRenaming(false)
		}
	}, [isRenaming, isDeleting])

	const saveName = useCallback(
		<T extends SyntheticEvent>(event: T) => {
			event?.stopPropagation?.()
			if (isDeleting) {
				onDeleteConversation(conversation)
			} else if (isRenaming) {
				handleRename(conversation)
			}
			setIsDeleting(false)
			setIsRenaming(false)
		},
		[
			isDeleting,
			isRenaming,
			onDeleteConversation,
			handleRename,
			setIsDeleting,
			setIsRenaming,
		]
	)

	return (
		<Button
			variant='ghost'
			className={`gap-4 active:scale-1 justify-start group ${
				loading ? 'pointer-events-none' : ''
			} ${className} ${
				selectedConversation.id === conversation.id
					? 'bg-accent text-accent-foreground'
					: ''
			}`}
			onClick={() => onSelectConversation(conversation)}
		>
			{isRenaming ? (
				<>
					<i className='text-lg shrink-0 i-[material-symbols-light--mark-unread-chat-alt-outline-sharp]'></i>
					<Input
						className='!h-7 w-[120px] flex-shrink'
						value={renameValue}
						onChange={(e) => setRenameValue(e.target.value)}
						onKeyDown={handleEnterDown}
						autoFocus
						onBlur={(e) => saveName<FocusEvent<HTMLInputElement, Element>>(e)}
					></Input>
				</>
			) : (
				<>
					<i className='text-lg shrink-0 i-[material-symbols-light--mark-unread-chat-alt-outline-sharp]'></i>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div
									draggable
									onDragStart={(e) => handleDragStart(e, conversation)}
									className={`relative max-w-[120px] max-h-5 overflow-hidden text-ellipsis whitespace-nowrap break-all`}
								>
									{conversation.name}
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>{conversation.name}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</>
			)}

			{(isDeleting || isRenaming) && (
				<div className='flex items-center gap-2 p-0 text-foreground ml-auto'>
					<Button
						className='!w-4 !h-4'
						size='icon'
						variant='ghost'
						onClick={(e) =>
							saveName<React.MouseEvent<HTMLButtonElement, MouseEvent>>(e)
						}
					>
						<i className='i-[ic--sharp-check] text-lg text-green-500 dark:text-green-400'></i>
					</Button>
					<Button
						className='!w-4 !h-4'
						size='icon'
						variant='ghost'
						onClick={(e) => {
							e.stopPropagation()
							setIsDeleting(false)
							setIsRenaming(false)
						}}
					>
						<i className='text-lg i-[ph--x-bold]'></i>
					</Button>
				</div>
			)}

			{!isDeleting && !isRenaming && (
				<div className='flex lg:hidden group-hover:flex items-center p-0 gap-2 text-foreground ml-auto'>
					<Button
						className='!w-4 !h-4'
						size='icon'
						variant='ghost'
						onClick={(e) => {
							e.stopPropagation()
							setIsRenaming(true)
							setRenameValue(conversation.name)
						}}
					>
						<i className='text-lg i-[jam--pencil-f] text-primary'></i>
					</Button>
					<Button
						className='!w-4 !h-4'
						size='icon'
						variant='ghost'
						onClick={(e) => {
							e.stopPropagation()
							setIsDeleting(true)
						}}
					>
						<i className='i-[ion--trash-outline] text-lg text-red-400'></i>
					</Button>
				</div>
			)}
		</Button>
	)
}
