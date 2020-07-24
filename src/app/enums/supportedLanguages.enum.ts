//import { en_supportedLanguages } from '../languages/language.en'

//export const supportedLanguages: any = {  
//  english: { key: 'en', display: 'English', path: '/assets/images/flags/United-Kingdom.png', selectionName:'English - en', sortOrder: 1 },
//  thai: { key: 'th', display: 'Thai', path: '/assets/images/flags/Thailand.png', selectionName: 'ไทย - th', sortOrder: 2 },
//  chineseSimplified: { key: 'zh-CN', display: 'Chinese Simplified', path: '/assets/images/flags/China.png', selectionName: '简体中文 - zh-CN', sortOrder: 3 },
//  notSpecified: { key: 'na', display: 'not specifiled', path: '/assets/images/flags/not-specified.png', sortOrder: 4 }
//};

//export function getLanguage(userLanguageCode, languageCode) {
//  return getSupportedLanguages(userLanguageCode, null).find(l => l.languageCode === languageCode);
//}

//export function getSupportedLanguages(userLanguageCode, selectedLanguageCode) {
//  let selected = en_supportedLanguages.find(l => l.languageCode === selectedLanguageCode);

//  // update the sortOrder of selected language so it is at top of the list
//  if (selected) selected.sortOrder = 6;  

//  return en_supportedLanguages;
//}
