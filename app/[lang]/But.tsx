'use client'

import { Button } from '@/components/ui/button'
import { start } from '@/utils/chat'
export default function But() {
	return <Button onClick={start}>开始测试</Button>
}
