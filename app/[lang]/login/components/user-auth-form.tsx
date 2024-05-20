'use client'

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
import { getDictionary } from '@/i18n'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { type BuiltInProviderType } from 'next-auth/providers/index'
import { signIn, type LiteralUnion } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { HTMLAttributes, Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
    dictionary: Awaited<ReturnType<typeof getDictionary>>
}

declare global {
    var WxLogin: any
}

function AuthForm({ className, dictionary, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const formSchema = z.object({
        email: z.string().email({
            message: dictionary.auth['Invalid email'],
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
            password: '',
        },
    })

    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams()
    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)
            // await axios.post('/api/register', data)
            const resp = await signIn('credentials', {
                ...data,
                redirect: false,
            })

            if (!resp?.ok) {
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description: resp?.error,
                    duration: 3000,
                })
            } else {
                toast({
                    description: dictionary.auth['Login Success!'],
                })
                const redirectUrl = searchParams.get('redirect')
                router.push(redirectUrl ?? '/')
            }
        } catch (e: any) {
            toast({
                variant: 'destructive',
                description: e.message || e,
                duration: 3000,
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

    // const wxLogin = new WxLogin({
    // 	self_redirect: true,
    // 	id: 'login-qr-container',
    // 	appid: process.env.WX_APP_ID,
    // 	scope: 'snsapi_login',
    // 	redirect_uri: process.env.WX_REDIRECT_URL,
    // 	state: Date.now(),
    // 	style: 'white', // black, white
    // 	href: '', // custom style link
    // })

    // console.log('wx-login:', wxLogin)

    return (
        <div
            className={cn('grid gap-6', className)}
            {...props}
        >
            <Script src='http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js' />
            <Script
                type='text/javascript'
                src='http://connect.qq.com/qc_jssdk.js'
                data-appid='APPID'
                data-redirecturi='REDIRECTURI'
            ></Script>
            <div id='login-qr-container'></div>
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
										-translate-y-2
										scale-75
										peer-placeholder-shown:scale-100
										peer-placeholder-shown:translate-y-1
										peer-focus:scale-75
										peer-focus:-translate-y-2
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
										-translate-y-2
										scale-75
										peer-placeholder-shown:translate-y-1
										peer-placeholder-shown:scale-100
										peer-focus:-translate-y-2
										peer-focus:scale-75
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
                        {dictionary.auth['Login with Email']}
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
                        <i className='i-[fa6-brands--qq] text-blue-700 h-4 w-4 mr-2'></i>
                    )}
                    {dictionary.auth['QQ']}
                </Button>
            </div>
        </div>
    )
}

const UserAuthForm = (props: UserAuthFormProps) => (
    <Suspense>
        <AuthForm {...props} />
    </Suspense>
)

export {
    UserAuthForm as default
}
