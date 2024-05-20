'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Folder } from '@/types/folder'
import { Prompt } from '@/types/prompt'
import { FC, useEffect, useState } from 'react'
import { PromptFolders } from '../Folders/Prompt/PromptFolders'
import { Search } from '../Sidebar/Search'
import { PromptbarSettings } from './PromptbarSettings'
import { Prompts } from './Prompts'
import { getDictionary } from '@/i18n'

interface Props {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
    prompts: Prompt[]
    folders: Folder[]
    onCreateFolder: (name: string) => void
    onDeleteFolder: (folderId: string) => void
    onUpdateFolder: (folderId: string, name: string) => void
    onCreatePrompt: () => void
    onUpdatePrompt: (prompt: Prompt) => void
    onDeletePrompt: (prompt: Prompt) => void
}

export const Promptbar: FC<Props> = ({
    dictionary,
    folders,
    prompts,
    onCreateFolder,
    onDeleteFolder,
    onUpdateFolder,
    onCreatePrompt,
    onUpdatePrompt,
    onDeletePrompt,
}) => {
    const [showPromptbar, setShowPromptbar] = useState<boolean>(false)
    const handleTogglePromptbar = () => {
        setShowPromptbar(!showPromptbar)
        localStorage.setItem('showPromptbar', JSON.stringify(!showPromptbar))
    }
    useEffect(() => {
        const showPromptbar = localStorage.getItem('showPromptbar')
        if (showPromptbar) {
            setShowPromptbar(showPromptbar === 'true')
        }
    }, [])

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>(prompts)

    const handleUpdatePrompt = (prompt: Prompt) => {
        onUpdatePrompt(prompt)
        setSearchTerm('')
    }

    const handleDeletePrompt = (prompt: Prompt) => {
        onDeletePrompt(prompt)
        setSearchTerm('')
    }

    const handleDrop = (e: any) => {
        if (e.dataTransfer) {
            const prompt = JSON.parse(e.dataTransfer.getData('prompt'))

            const updatedPrompt = {
                ...prompt,
                folderId: e.target.dataset.folderId,
            }

            onUpdatePrompt(updatedPrompt)

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
            setFilteredPrompts(
                prompts.filter((prompt) => {
                    const searchable =
                        prompt.name.toLowerCase() +
                        ' ' +
                        prompt.description.toLowerCase() +
                        ' ' +
                        prompt.content.toLowerCase()
                    return searchable.includes(searchTerm.toLowerCase())
                })
            )
        } else {
            setFilteredPrompts(prompts)
        }
    }, [searchTerm, prompts])

    return (
        <div
            className={`z-50 flex ${showPromptbar ? 'w-[270px] px-2' : 'w-0 px-0'
                } duration-150 top-32 sm:top-16 lg:top-0 right-4 sm:right-0 h-full fixed lg:relative flex-none flex-col sm:my-2 space-y-2 text-sm bg-background transition-[width] overflow-hidden sm:h-inherit`}
        >
            <Button
                size='icon'
                variant='ghost'
                className={`${showPromptbar ? 'right-[278px]' : 'right-8'
                    } z-20 transition-[right] duration-150 fixed top-20`}
                onClick={handleTogglePromptbar}
            >
                <i
                    className={`
							${showPromptbar
                            ? 'i-[ph--caret-circle-double-right-light]'
                            : 'i-[ph--caret-circle-double-left-light]'
                        }
							text-primary
							text-2xl
						`}
                />
            </Button>
            <div
                className={`
				${showPromptbar ? 'h-screen w-screen' : 'h-0 w-0'}
				fixed right-0 top-0 -z-10
				lg:w-0 lg:h-0
				bg-accent/50
			`}
            ></div>
            <div className='flex gap-4 items-center'>
                <Button
                    className='text-primary-foreground w-[190px] flex-shrink-0 select-none items-center gap-3'
                    onClick={() => {
                        onCreatePrompt()
                        setSearchTerm('')
                    }}
                >
                    {/* <IconPlus size={16} /> */}
                    <i className='text-base i-[material-symbols--add]'></i>
                    {dictionary.chat['New prompt']}
                </Button>

                <Button
                    size='icon'
                    onClick={() => onCreateFolder(dictionary.chat['New folder'])}
                >
                    {/* <IconFolderPlus size={16} /> */}
                    <i className='text-base text-primary-foreground i-[tabler--folder-plus]'></i>
                </Button>
            </div>

            {prompts.length > 1 && (
                <Search
                    placeholder={dictionary.chat['Search prompts...'] || ''}
                    searchTerm={searchTerm}
                    onSearch={setSearchTerm}
                />
            )}

            <ScrollArea>
                {folders.length > 0 && (
                    <div className='flex pb-2 border-b border-border'>
                        <PromptFolders
                            dictionary={dictionary}
                            searchTerm={searchTerm}
                            prompts={filteredPrompts}
                            folders={folders}
                            onUpdateFolder={onUpdateFolder}
                            onDeleteFolder={onDeleteFolder}
                            // prompt props
                            onDeletePrompt={handleDeletePrompt}
                            onUpdatePrompt={handleUpdatePrompt}
                        />
                    </div>
                )}

                {prompts.length > 0 ? (
                    <div
                        className='pt-2'
                        onDrop={(e) => handleDrop(e)}
                        onDragOver={allowDrop}
                        onDragEnter={highlightDrop}
                        onDragLeave={removeHighlight}
                    >
                        <Prompts
                            dictionary={dictionary}
                            prompts={filteredPrompts.filter((prompt) => !prompt.folderId)}
                            onUpdatePrompt={handleUpdatePrompt}
                            onDeletePrompt={handleDeletePrompt}
                        />
                    </div>
                ) : (
                    <div className='mt-8 text-center text-foreground opacity-50 select-none'>
                        {/* <IconMistOff className='mx-auto mb-3' /> */}
                        <i className='i-[tabler--mist-off] mx-auto mb-3'></i>
                        <span className='text-[14px] leading-normal'>
                            {dictionary.chat['No prompts.']}
                        </span>
                    </div>
                )}
            </ScrollArea>

            <PromptbarSettings />
        </div>
    )
}
