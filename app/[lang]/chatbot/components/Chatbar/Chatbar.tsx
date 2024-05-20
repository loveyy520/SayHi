import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Conversation } from '@/types/chat'
import { KeyValuePair } from '@/types/data'
import { SupportedExportFormats } from '@/types/export'
import { Folder } from '@/types/folder'
import { PluginKey } from '@/types/plugin'
import { FC, useEffect, useState } from 'react'
import { ChatFolders } from '../Folders/Chat/ChatFolders'
import { Search } from '../Sidebar/Search'
import { ChatbarSettings } from './ChatbarSettings'
import { Conversations } from './Conversations'
import { getDictionary } from '@/i18n'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	loading: boolean
	className?: string
	conversations: Conversation[]
	lightMode: 'light' | 'dark'
	selectedConversation: Conversation
	pluginKeys: PluginKey[]
	folders: Folder[]
	onCreateFolder: (name: string) => void
	onDeleteFolder: (folderId: string) => void
	onUpdateFolder: (folderId: string, name: string) => void
	onNewConversation: () => void
	onSelectConversation: (conversation: Conversation) => void
	onDeleteConversation: (conversation: Conversation) => void
	onUpdateConversation: (conversation: Conversation, data: KeyValuePair) => void
	onClearConversations: () => void
	onExportConversations: () => void
	onImportConversations: (data: SupportedExportFormats) => void
}

export const Chatbar: FC<Props> = ({
    dictionary,
	loading,
	className = '',
	conversations,
	lightMode,
	selectedConversation,
	pluginKeys,
	folders,
	onCreateFolder,
	onDeleteFolder,
	onUpdateFolder,
	onNewConversation,
	onSelectConversation,
	onDeleteConversation,
	onUpdateConversation,
	onClearConversations,
	onExportConversations,
	onImportConversations,
}) => {
	const [showChatbar, setShowChatbar] = useState<boolean>(true)
	useEffect(() => {
		if (window.innerWidth < 640) {
			setShowChatbar(false)
		}
	}, [selectedConversation])

	const handleToggleChatbar = () => {
		setShowChatbar(!showChatbar)
		localStorage.setItem('showChatbar', JSON.stringify(!showChatbar))
	}
	useEffect(() => {
		if (window.innerWidth < 640) {
			setShowChatbar(false)
		}

		const showChatbar = localStorage.getItem('showChatbar')
		if (showChatbar) {
			setShowChatbar(showChatbar === 'true')
		}
	}, [])
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [filteredConversations, setFilteredConversations] =
		useState<Conversation[]>(conversations)

	const handleUpdateConversation = (
		conversation: Conversation,
		data: KeyValuePair
	) => {
		onUpdateConversation(conversation, data)
		setSearchTerm('')
	}

	const handleDeleteConversation = (conversation: Conversation) => {
		onDeleteConversation(conversation)
		setSearchTerm('')
	}

	const handleDrop = (e: any) => {
		if (e.dataTransfer) {
			const conversation = JSON.parse(e.dataTransfer.getData('conversation'))
			onUpdateConversation(conversation, { key: 'folderId', value: 0 })

			e.target.style.background = 'none'
		}
	}

	const allowDrop = (e: any) => {
		e.preventDefault()
	}

	const highlightDrop = (e: any) => {
		e.target.style.background = '#343541'
	}

	const removeHighlight = (e: any) => {
		e.target.style.background = 'none'
	}

	useEffect(() => {
		if (searchTerm) {
			setFilteredConversations(
				conversations.filter((conversation) => {
					const searchable =
						conversation.name.toLocaleLowerCase() +
						' ' +
						conversation.messages.map((message) => message.content).join(' ')
					return searchable.toLowerCase().includes(searchTerm.toLowerCase())
				})
			)
		} else {
			setFilteredConversations(conversations)
		}
	}, [searchTerm, conversations])

	return (
		<div
			className={`
				${
					showChatbar ? 'w-[260px] px-2' : 'w-0 px-0'
				} fixed lg:relative overflow-hidden transition-all duration-150
				${className} top-32 sm:top-16 md:top-12 lg:top-0 bottom-0 z-30 flex sm:my-2 flex-none flex-col space-y-2 bg-background transition-[width] md:relative sm:h-full`}
		>
			<Button
				size='icon'
				variant='ghost'
				className={`${
					showChatbar
						? 'left-[243px] sm:left-[300px] md:left-[244px] lg:left-[276px]'
						: 'left-8'
				} transition-[left] duration-150 fixed top-20 z-20`}
				onClick={handleToggleChatbar}
			>
				<i
					className={`
							${
								showChatbar
									? 'i-[ph--caret-circle-double-left-light]'
									: 'i-[ph--caret-circle-double-right-light]'
							}
							text-primary
							text-2xl
						`}
				/>
			</Button>
			<div
				className={`
				${showChatbar ? 'h-screen w-screen' : 'h-0 w-0'}
				fixed left-0 top-0 -z-10
				md:w-0 md:h-0
				bg-accent/50
			`}
			></div>
			<div className='flex items-center justify-between gap-4'>
				<Button
					className='gap-4 flex-1 text-primary-foreground'
					onClick={() => {
						onNewConversation()
						setSearchTerm('')
					}}
				>
					<i className='text-lg i-[material-symbols--add]'></i>
                    {dictionary.chat['New chat']}
				</Button>
				<Button
					size='icon'
                    onClick={() => onCreateFolder(dictionary.chat['New folder'])}
				>
					<i className='text-lg text-primary-foreground i-[bi--folder-plus]'></i>
				</Button>
			</div>

			{conversations.length > 1 && (
				<Search
					placeholder='Search conversations...'
					searchTerm={searchTerm}
					onSearch={setSearchTerm}
				/>
			)}

			<ScrollArea>
				{folders.length > 0 && (
					<div className='flex border-b border-border pb-2'>
						<ChatFolders
							searchTerm={searchTerm}
							conversations={filteredConversations.filter(
								(conversation) => conversation.folderId
							)}
							folders={folders}
							onDeleteFolder={onDeleteFolder}
							onUpdateFolder={onUpdateFolder}
							selectedConversation={selectedConversation}
							loading={loading}
							onSelectConversation={onSelectConversation}
							onDeleteConversation={handleDeleteConversation}
							onUpdateConversation={handleUpdateConversation}
						/>
					</div>
				)}

				{conversations.length > 0 ? (
					<div
						className='pt-2'
						onDrop={(e) => handleDrop(e)}
						onDragOver={allowDrop}
						onDragEnter={highlightDrop}
						onDragLeave={removeHighlight}
					>
						<Conversations
							loading={loading}
							conversations={filteredConversations.filter(
								(conversation) => !conversation.folderId
							)}
							selectedConversation={selectedConversation}
							onSelectConversation={onSelectConversation}
							onDeleteConversation={handleDeleteConversation}
							onUpdateConversation={handleUpdateConversation}
						/>
					</div>
				) : (
					<div className='mt-8 flex flex-col items-center gap-3 text-sm leading-normal text-foreground opacity-50'>
						<i className='i-[tabler--message-off]'></i>
                            {dictionary.chat['No conversations.']}
					</div>
				)}
			</ScrollArea>

			<ChatbarSettings
                dictionary={dictionary}
				lightMode={lightMode}
				pluginKeys={pluginKeys}
				conversationsCount={conversations.length}
				onClearConversations={onClearConversations}
				onExportConversations={onExportConversations}
				onImportConversations={onImportConversations}
			/>
		</div>
	)
}
