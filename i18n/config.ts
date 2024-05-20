
const i18n = {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
  } as const;
  
type Locale = (typeof i18n)['locales'][number];

export {
    i18n,
    type Locale
}