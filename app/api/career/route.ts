import ReactPDF from '@react-pdf/renderer'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async(req: NextRequest) => {
    const body = await req.json()
    const { data } = body
    const stream = await ReactPDF.renderToStream(data)
    const blob = new Blob([stream.read()])
    const res =  new NextResponse(blob)
    res.blob()
}