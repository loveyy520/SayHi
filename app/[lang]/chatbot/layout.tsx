import { Metadata } from 'next/types'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Amber Chatbot',
    description: 'AI tools, chatgpt',
}

const ChatbotLayout = ({ children }: { children: ReactNode }) => {
	return <div className='h-full'>{children}</div>
}

export default ChatbotLayout
