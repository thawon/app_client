export const supportedLanguages: any = {  
  english: { key: 'en', display: 'English', path: '/assets/images/flags/United-Kingdom.png', sortOrder: 1 },
  thai: { key: 'th', display: 'Thai', path: '/assets/images/flags/Thailand.png', sortOrder: 2 },
  chineseSimplified: { key: 'zh-CN', display: 'Chinese Simplified', path: '/assets/images/flags/China.png', sortOrder: 3 },
  notSpecified: { key: 'na', display: 'not specifiled', path: '/assets/images/flags/not-specified.png', sortOrder: 4 }
};

export function getLanguage(languageCode) {
  return supportedLanguages[Object.keys(supportedLanguages).find(key => supportedLanguages[key].key === languageCode)];
}
