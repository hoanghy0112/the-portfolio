export function languageConvert(language: string) {
	const lowerCasedLanguage = language.toLowerCase();

	if (lowerCasedLanguage === 'c++') return 'cplusplus';
	else return lowerCasedLanguage;
}
