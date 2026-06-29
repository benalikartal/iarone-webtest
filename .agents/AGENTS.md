# Iarone Web Project Rules

## Translation & i18n
- **No Client-Side Auto-Translation**: Do not add client-side automatic translation for public SEO pages.
- **Static Translations Only**: Keep translations as static `i18n.js` entries for TR, EN, and AR.
- **Future Dynamic Translations**: For future dynamic translation, prepare an optional server-side provider abstraction but do not implement it now.
- **Preferred Provider**: The preferred future provider is Azure Translator F0, due to its generous free tier.
- **Security**: Never expose translation API keys in frontend code.
