import { Locale } from '@/i18n/config'

export interface LangParams {
    params: {
        lang: Locale
    }
}

export type NS = string | string[]