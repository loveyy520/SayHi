'use client'

import { getDictionary } from '@/i18n'
import { SafeUser } from '@/types'
import { NextPage } from 'next'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import MenuItemLogin from './menu-item-login'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label'
import GloabalAvatar from '../global-avatar'

interface UserProps {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
	currentUser: SafeUser | null
}

const User: NextPage<UserProps> = ({ dictionary, currentUser }) => {
	return (
        <Sheet>
            <SheetTrigger className='flex justify-center items-center h-10 w-10'>
                <GloabalAvatar src={currentUser?.image!} alt={dictionary.menu['Avatar']} />
            </SheetTrigger>
            <SheetContent className="w-[320px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>
                        <GloabalAvatar src={currentUser?.image!} alt={dictionary.menu['Avatar']} /><span>{currentUser?.name}</span>
                    </SheetTitle>
                    <SheetDescription>
                        {dictionary.menu['Try everything you like!']}
                    </SheetDescription>
                </SheetHeader>

                <div className='py-5 flex flex-col gap-2'>
                    {!currentUser ? (
                        <>
                            <div>
                                <MenuItemLogin dictionary={dictionary} />
                            </div>
                            <div>
                                <Link
                                    href='/register'
                                    className='flex w-full items-center'
                                >
                                    <i className='i-[ph--trademark-registered] mr-2 h-4 w-4'></i>
                                    <span>{dictionary.menu['Sign up for free']}</span>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <Label>
                                        {currentUser?.name ?? dictionary.menu['My Account']}
                                </Label>
                                <Separator />
                                <div>
                                        {/* <User className='mr-2 h-4 w-4' /> */}
                                        <span>{dictionary.menu['Profile']}</span>
                                    <div>⇧⌘P</div>
                                </div>
                                <div>
                                        {/* <Users className='mr-2 h-4 w-4' /> */}
                                        <span>Team</span>
                                </div>
                                <div>
                                    <div>
                                            {/* <UserPlus className='mr-2 h-4 w-4' /> */}
                                            <span>Invite users</span>
                                    </div>
                                    <div>
                                        <div>
                                            <div>
                                                    {/* <Mail className='mr-2 h-4 w-4' /> */}
                                                    <span>Email</span>
                                            </div>
                                            <div>
                                                    {/* <MessageSquare className='mr-2 h-4 w-4' /> */}
                                                    <span>Message</span>
                                            </div>
                                            <Separator />
                                            <div>
                                                    {/* <PlusCircle className='mr-2 h-4 w-4' /> */}
                                                    <span>More...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                        {/* <Plus className='mr-2 h-4 w-4' /> */}
                                        <span>New Team</span>
                                    <div>⌘+T</div>
                                </div>
                            </div>
                            <Separator />
                            <div onClick={() => signOut()}>
                                    {/* <LogOut className='mr-2 h-4 w-4' /> */}
                                    <i className='i-[lets-icons--sign-out-circle-duotone-line] mr-2 h-4 w-4 text-red-300'></i>
                                    <span className='text-red-300'>{dictionary.menu['Log out']}</span>
                                <div>⇧⌘Q</div>
                            </div>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
	)
}

export default User
