'use client'

import { Button } from '@/components/ui/button'
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import dynamic from 'next/dynamic'

const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    }
)

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
})

const PdfWidget = () => {
    // Create Document Component
    const MyDocument = () => (
        <Document>
            <Page
                size='A4'
                style={styles.page}
            >
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )

    return (
        <div className='hidden md:block col-span-1'>
            <PDFDownloadLink
                document={<MyDocument />}
                fileName='somename.pdf'
            >
                {({ blob, url, loading, error }) => (
                    <Button disabled={loading}>Download</Button>
                )}
            </PDFDownloadLink>
            <MyDocument></MyDocument>
        </div>
    )
}

export default PdfWidget
