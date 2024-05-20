'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
// import { Icons } from "@/components/icons"
import Spinner from '@/components/icons/spinner'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { type BuiltInProviderType } from 'next-auth/providers/index'
import { signIn, type LiteralUnion } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { getDictionary } from '@/i18n'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}

function UserAuthForm({ className, dictionary, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const formSchema = z.object({
        email: z.string().email({
            message: dictionary.auth['Email is required.'],
        }),
        name: z
            .string()
            .min(8, {
                message: dictionary.auth['At least 8 characters.'],
            })
            .max(20, {
                message: dictionary.auth['No more than 20 characters.'],
            }),
        password: z
            .string()
            .min(8, {
                message: dictionary.auth['At least 8 characters.'],
            })
            .max(16, {
                message: dictionary.auth['No more than 16 characters.'],
            }),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            name: '',
            password: '',
        },
    })

    const { toast } = useToast()
    const router = useRouter()
    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)
            await axios.post('/api/register', data)
            toast({
                description: dictionary.auth['Success'],
            })
            router.push('/login')
        } catch (e: any) {
            toast({
                description: e.message || e,
            })
        } finally {
            setIsLoading(false)
        }
    }

    const signInWith = async (provider: LiteralUnion<BuiltInProviderType>) => {
        setIsLoading(true)
        await signIn(provider)
        setIsLoading(false)
    }

    return (
        <div
            className={cn('grid gap-6', className)}
            {...props}
        >
            <Form {...form}>
                <form
                    className='flex flex-col gap-4'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormControl>
                                    <Input
                                        className='peer'
                                        placeholder=' '
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormLabel
                                    className='
										absolute
										top-0
										left-3
										transform
										origin-top-left
										duration-300
										-translate-y-1
										scale-[0.6]
										peer-placeholder-shown:scale-100
										peer-placeholder-shown:translate-y-1
										peer-focus:scale-[0.6]
										peer-focus:-translate-y-1
									'
                                >
                                    {dictionary.auth['Email']}
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormControl>
                                    <Input
                                        className='peer'
                                        placeholder=' '
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormLabel
                                    className='
										absolute
										top-0
										left-3
										duration-300
										transform
										origin-top-left
										-translate-y-1
										scale-[0.6]
										peer-placeholder-shown:translate-y-1
										peer-placeholder-shown:scale-100
										peer-focus:-translate-y-1
										peer-focus:scale-[0.6]
									'
                                >
                                    {dictionary.auth['Name']}
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormControl>
                                    <Input
                                        className='peer'
                                        placeholder=' '
                                        type='password'
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormLabel
                                    className='
										absolute
										top-0
										left-3
										duration-300
										transform
										origin-top-left
										-translate-y-1
										scale-[0.6]
										peer-placeholder-shown:translate-y-1
										peer-placeholder-shown:scale-100
										peer-focus:-translate-y-1
										peer-focus:scale-[0.6]
									'
                                >
                                    {dictionary.auth['Password']}
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={isLoading}
                        type='submit'
                    >
                        {isLoading && <Spinner className='mr-2' />}
                        {dictionary.auth['Sign Up with Email']}
                    </Button>
                </form>
            </Form>
            <div className='flex flex-row justify-between items-center'>
                <Separator className='flex-1 w-fit' />
                <div className='text-muted-foreground mx-2'>
                    {dictionary.auth['or continue with']}
                </div>
                <Separator className='flex-1 w-fit' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <Button
                    variant='outline'
                    type='button'
                    disabled={isLoading}
                    onClick={() => signInWith('google')}
                >
                    {isLoading ? (
                        <Spinner className='mr-2' />
                    ) : (
                        <i className='i-[logos--google-icon] h-4 w-4 mr-2'></i>
                    )}
                    {dictionary.auth['Google']}
                </Button>
                <Button
                    variant='outline'
                    type='button'
                    disabled={isLoading}
                    onClick={() => signInWith('github')}
                >
                    {isLoading ? (
                        <Spinner className='mr-2' />
                    ) : (
                        <i className='i-[tabler--brand-github-filled] h-4 w-4 mr-2'></i>
                    )}
                    {dictionary.auth['GitHub']}
                </Button>
                <Button
                    variant='outline'
                    type='button'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Spinner className='mr-2' />
                    ) : (
                        <i className='i-[bi--wechat] text-green-500 h-4 w-4 mr-2'></i>
                    )}
                    {dictionary.auth['WeChat']}
                </Button>
                <Button
                    variant='outline'
                    type='button'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Spinner className='mr-2' />
                    ) : (
                        //   <Icons.gitHub className="mr-2 h-4 w-4" />
                        <i className='i-[fa6-brands--qq] text-blue-700 h-4 w-4 mr-2'></i>
                    )}
                    {dictionary.auth['QQ']}
                </Button>
            </div>
        </div>
    )
}

export {
    UserAuthForm as default
}
