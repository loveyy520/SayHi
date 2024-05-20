
import { StyleSheet } from '@react-pdf/renderer'

const fontFamily = 'Helvetica'

// Create styles
const generalStyles = StyleSheet.create({
    page: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '25px 20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
    },
    personalInfoSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // backgroundColor: 'yellow'
    },
    personalInfoDesc: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '12px',
        flex: 1
    },
    personalInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: '8px'
    },
    secondaryInfo: {
        color: 'pink',
        fontFamily,
    },
    rightLine: {
        borderRight: '1px solid #ccc',
        paddingRight: '8px'
    },
    name: {
        fontWeight: 700,
        fontSize: '22px'
    },
    avatar: {
        margin: 'auto'
    },
    section: {
        height: '100px',
        width: '100%'
    },
    sectionTitle: {
        padding: '8px 0',
        borderBottom: '1px solid slate',
        width: '100%',
        fontWeight: 600
    },
})

export {
    generalStyles
}
