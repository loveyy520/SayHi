'use client'

import { Message } from '@/types/chat'
import Image from 'next/image'
import { LegacyRef, memo, useRef, useState } from 'react'
// import rehypeMathjax from 'rehype-mathjax';
import { Button } from '@/components/ui/button'
import { getDictionary } from '@/i18n'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
// import { CodeBlock } from '../Markdown/CodeBlock'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { NextPage } from 'next'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MemoizedReactMarkdown } from '../Markdown/MemoizedReactMarkdown'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	message: Message
	messageIndex: number
	onEditMessage: (message: Message, messageIndex: number) => void
}

const userAvatar = 'https://assets.chrisley.site/icons/dst/Willow.png'
const botAvatar = 'https://assets.chrisley.site/icons/dst/Wendy.png'
const avatarSize = 36

const decorations = ['🦋', '🦋', '🍒', '🍒', '🍭', '🍭', '🍷', '🍷']

export const ChatMessage: NextPage<Props> = memo(
    ({ message, messageIndex, onEditMessage, dictionary }) => {
		const [isTyping, setIsTyping] = useState<boolean>(false)
		const [messageContent, setMessageContent] = useState(message.content)
		const [messagedCopied, setMessageCopied] = useState(false)

		const textareaRef = useRef<HTMLTextAreaElement>(null)

		const handleInputChange = (
			event: React.ChangeEvent<HTMLTextAreaElement>
		) => {
			setMessageContent(event.target.value)
			if (textareaRef.current) {
				textareaRef.current.style.height = 'inherit'
				textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
			}
		}

		const handleEditMessage = () => {
			if (message.content != messageContent) {
				onEditMessage({ ...message, content: messageContent }, messageIndex)
			}
		}

		const handlePressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.key === 'Enter' && !isTyping && !e.shiftKey) {
				e.preventDefault()
				handleEditMessage()
			}
		}

		const copyOnClick = () => {
			if (!navigator.clipboard) return

			navigator.clipboard.writeText(message.content).then(() => {
				setMessageCopied(true)
				setTimeout(() => {
					setMessageCopied(false)
				}, 2000)
			})
		}

		return (
			<div
				className={`group text-foreground`}
				style={{ overflowWrap: 'anywhere' }}
			>
				<div
					className={`relative m-auto flex justify-start items-start flex-1 gap-4 py-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl xl:max-w-3xl ${
						message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
					}`}
				>
					{message.role === 'assistant' ? (
						<Image
							className='rounded'
							src={botAvatar}
							alt='Chrior'
							width={avatarSize}
							height={avatarSize}
							typeof='round'
							quality={100}
						/>
					) : (
						<Image
							className='rounded'
							src={userAvatar}
							alt='Me'
							width={avatarSize}
							height={avatarSize}
							quality={100}
						/>
					)}

					<div
						className={`prose dark:prose-invert rounded relative max-w-[calc(100%_-_100px)] px-2 py-1 ${
							message.role === 'assistant'
								? 'bg-accent text-accent-foreground before:absolute before:-left-[13px] before:top-2 before:border-[6px] before:border-transparent before:border-r-8 before:border-r-accent'
								: 'bg-primary text-primary-foreground after:absolute after:-right-[13px] after:top-2 after:border-[6px] after:border-transparent after:border-l-8 after:border-l-primary'
						}`}
					>
						<div
							className={`prose w-full dark:prose-invert rounded overflow-hidden p-1 ${
								message.role === 'assistant'
									? 'message-bubble'
									: 'message-bubble-reverse'
							}`}
						>
							{message.role === 'assistant' && (
								<span className='absolute -bottom-[10px] -right-[10px]'>
									{decorations[messageIndex % 8]}
								</span>
							)}
							{message.role === 'user' ? (
								<div className='flex w-full'>
									<div className='prose whitespace-pre-wrap dark:prose-invert  '>
										{message.content}
									</div>
									<Dialog>
										<DialogTrigger asChild>
											{
												<Button
													size='icon'
													variant='ghost'
													className={`absolute flex translate-x-[1000px] focus:translate-x-0 group-hover:translate-x-0 top-0 right-0`}
													// onClick={toggleEditing}
												>
													<i className='text-lg i-[material-symbols--contract-edit-rounded]'></i>
												</Button>
											}
										</DialogTrigger>
										<DialogContent className='sm:max-w-[425px]'>
											<DialogHeader>
                                                <DialogTitle>{dictionary.chat['Edit message']}</DialogTitle>
												<DialogDescription>
                                                    {dictionary.chat[
														"Make changes to the here. Click Submit when you're done."
                                                    ]}
												</DialogDescription>
											</DialogHeader>
											<Textarea
												ref={textareaRef}
												rows={3}
												className='resize-none max-h-[150px] whitespace-pre-wrap !p-2'
												value={messageContent}
												onChange={handleInputChange}
												onKeyDown={handlePressEnter}
												onCompositionStart={() => setIsTyping(true)}
												onCompositionEnd={() => setIsTyping(false)}
												style={{
													fontFamily: 'inherit',
													fontSize: 'inherit',
													lineHeight: 'inherit',
													padding: '0',
													margin: '0',
													overflow: 'hidden',
												}}
											/>
											<DialogFooter>
                                                {/* <DialogClose>{dictionary.chat['Submit']}</DialogClose>
												<DialogClose>{dictionary.chat['Cancel']}</DialogClose> */}
												<DialogClose>
													<Button
														onClick={handleEditMessage}
														disabled={messageContent.trim().length <= 0}
													>
                                                        {dictionary.chat['Submit']}
													</Button>
												</DialogClose>
												<DialogClose>
                                                    <Button variant={'secondary'}>{dictionary.chat['Cancel']}</Button>
												</DialogClose>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</div>
							) : (
								<>
									<div
										className={`absolute top-0 right-0 ${
											typeof window !== 'undefined' && window.innerWidth < 640
												? ''
												: 'm-0'
										}`}
									>
										{messagedCopied ? (
											<i className='i-[ic--sharp-check] text-xl text-green-500 dark:text-green-400'></i>
										) : (
											<Button
												size='icon'
												variant='ghost'
												className='translate-x-[1000px] focus:translate-x-0 group-hover:translate-x-0'
												onClick={copyOnClick}
											>
												<i className='text-xl i-[ph--copy-simple]'></i>
											</Button>
										)}
									</div>

									<MemoizedReactMarkdown
										className='prose dark:prose-invert '
										remarkPlugins={[remarkGfm, remarkMath]}
										// rehypePlugins={[rehypeMathjax]}
										components={{
											// code({ node, inline, className, children, ...props }) {
											// 	const match = /language-(\w+)/.exec(className || '')

											// 	return !inline ? (
											// 		<CodeBlock
											// 			lang={lang}
											// 			key={Math.random()}
											// 			language={(match && match[1]) || ''}
											// 			value={String(children).replace(/\n$/, '')}
											// 			{...props}
											// 		/>
											// 	) : (
											// 		<code
											// 			className={className}
											// 			{...props}
											// 		>
											// 			{children}
											// 		</code>
											// 	)
											// },
											code(props) {
												const { children, className, node, ref, ...rest } =
													props
												const match = /language-(\w+)/.exec(className || '')
												return match ? (
													<SyntaxHighlighter
														ref={
															ref as LegacyRef<SyntaxHighlighter> | undefined
														}
														{...rest}
														PreTag='div'
														language={match[1]}
														style={dark}
													>
														{String(children).replace(/\n$/, '')}
													</SyntaxHighlighter>
												) : (
													<code
														ref={ref}
														{...rest}
														className={className}
													>
														{children}
													</code>
												)
											},
											table({ children }) {
												return (
													<table className='border-collapse border border-border px-3 py-1'>
														{children}
													</table>
												)
											},
											th({ children }) {
												return (
													<th className='break-words border border-border bg-background px-3 py-1 text-foreground'>
														{children}
													</th>
												)
											},
											td({ children }) {
												return (
													<td className='break-words border border-border px-3 py-1'>
														{children}
													</td>
												)
											},
										}}
									>
										{message.content}
									</MemoizedReactMarkdown>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
)
ChatMessage.displayName = 'ChatMessage'
