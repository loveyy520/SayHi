import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getDictionary } from '@/i18n'
import { Prompt } from '@/types/prompt'
import { FC, KeyboardEvent, useCallback, useState } from 'react'

interface PromptModalProps {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	open: boolean
	prompt: Prompt
	onClose: () => void
	onUpdatePrompt: (prompt: Prompt) => void
}

const PromptModal: FC<PromptModalProps> = ({
    dictionary,
	open,
	prompt,
	onClose,
	onUpdatePrompt,
}) => {
	const [name, setName] = useState(prompt?.name ?? '')
	const [description, setDescription] = useState(prompt.description)
	const [content, setContent] = useState(prompt.content)

	const handleEnter = useCallback(
		(e: KeyboardEvent<HTMLDivElement>) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				onUpdatePrompt({
					...prompt,
					name,
					description,
					content: content.trim(),
				})
				onClose()
			}
		},
		[prompt, name, description, content, onClose, onUpdatePrompt]
	)

	const handleOpenChange = useCallback(
		(value: boolean) => {
			!value && onClose()
		},
		[onClose]
	)
	return (
		<Dialog
			open={open}
			onOpenChange={handleOpenChange}
		>
			<DialogTrigger />
			<DialogContent
				className='max-w-screen sm:max-w-[425px] md:max-w-[600px]'
				onKeyDown={handleEnter}
			>
				<DialogHeader>
                    <DialogTitle>{dictionary.chat['Edit Prompt']!}</DialogTitle>
					<DialogDescription>
						{
                            dictionary.chat[
								'Make changes to your prompt here. Click save when you finish it.'
                            ]!
						}
					</DialogDescription>
				</DialogHeader>
				<div className='grid gap-5 py-4'>
					<div className='grid grid-cols-1 items-center gap-2'>
						<Label
							htmlFor='name'
							className='text-left'
						>
                            {dictionary.chat['Name']!}
						</Label>
						<Input
							id='name'
							autoFocus
							defaultValue='Pedro Duarte'
							className='col-span-3'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className='grid grid-cols-1 items-center gap-2'>
						<Label
							htmlFor='description'
							className='text-left'
						>
                            {dictionary.chat['Description']!}
						</Label>
						<Textarea
							id='description'
							defaultValue='@peduarte'
                            placeholder={dictionary.chat['A description for your prompt.']!}
							className='col-span-3 resize-none'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
						/>
					</div>
					<div className='grid grid-cols-1 items-center gap-2'>
						<Label
							htmlFor='content'
							className='text-left'
						>
                            {dictionary.chat['Content']!}
						</Label>
						<Textarea
							id='content'
							defaultValue='@peduarte'
							placeholder={
                                dictionary.chat[
                                'Prompt content. Use {{}} to denote a variable. Ex: {{name}} is a {{adjective}} {{noun}}'
                                ]!
							}
							className='col-span-3 resize-none'
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={5}
						/>
					</div>
				</div>
				<DialogFooter className='gap-2'>
					<Button
						onClick={() => {
							const updatedPrompt = {
								...prompt,
								name,
								description,
								content: content.trim(),
							}

							onUpdatePrompt(updatedPrompt)
							onClose()
						}}
					>
                        {dictionary.chat['Save changes']!}
					</Button>
					<DialogClose>
						<Button
							className='w-full sm:w-fit'
							variant='outline'
							onClick={onClose}
						>
                            {dictionary.chat['Cancel']!}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default PromptModal
