import { Styles } from '@react-pdf/renderer'
import { generalStyles } from './general'

type StylesNames = 'general'

const styleMap: Record<StylesNames, Styles> = {
    general: generalStyles
}

export {
    styleMap as default,
    type StylesNames
}