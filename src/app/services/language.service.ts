import { Injectable } from '@angular/core';

import { SupportedLanguage } from '../models/supported-language.model'

const supportedLanguages: SupportedLanguage[] = [
  { languageCode: 'na', displayNameEN: 'Turn off', displayNameTH: 'ปิด', displayNameJA: '消す', displayNameZH: '关掉', nativeName: '', sortOrder: 7 },
  { languageCode: 'en', displayNameEN: 'English', displayNameTH: 'อังกฤษ', displayNameJA: '英語', displayNameZH: '英语', nativeName: 'English', sortOrder: 5 },
  { languageCode: 'ja', displayNameEN: 'Japanese', displayNameTH: 'ญี่ปุ่น', displayNameJA: '日本語', displayNameZH: '日语', nativeName: '日本語', sortOrder: 4 },
  { languageCode: 'th', displayNameEN: 'Thai', displayNameTH: 'ไทย', displayNameJA: 'タイ語', displayNameZH: '泰语', nativeName: 'ไทย', sortOrder: 3 },
  { languageCode: 'id', displayNameEN: 'Indonesian', displayNameTH: 'อินโดนีเซีย', displayNameJA: 'インドネシア語', displayNameZH: '印尼语', nativeName: 'Bahasa Indonesia', sortOrder: 2 },
  { languageCode: 'zh-CN', displayNameEN: 'Chinese (Simplified)', displayNameTH: 'จีน (ตัวย่อ)', displayNameJA: '中国語(簡体)', displayNameZH: '中文(简体)', nativeName: '汉语', sortOrder: 1 },
  //{ languageCode: 'jw', displayName: 'Javanese', nativeName: 'Basa Jawa', },
  //{ languageCode: 'su', displayName: 'Sundanese', nativeName: 'Basa Sunda' },
  //{ languageCode: 'ms', displayName: 'Malay', nativeName: 'Bahasa melayu' },
  //{ languageCode: 'vi', displayName: 'Vietnamese', nativeName: 'tiếng việt' },
  //{ languageCode: 'af', displayName: 'Afrikaans', nativeName: 'Afrikaans' },
  //{ languageCode: 'sq', displayName: 'Albanian', nativeName: 'shqip / gjuha shqipe' },
  //{ languageCode: 'am', displayName: 'Amharic', nativeName: 'ኣማርኛ' },
  //{ languageCode: 'ar', displayName: 'Arabic', nativeName: 'العربية' },
  //{ languageCode: 'hy', displayName: 'Armenian', nativeName: 'Հայերէն' },
  //{ languageCode: 'az', displayName: 'Azerbaijani', nativeName: 'Азәрбајҹан дили' },
  //{ languageCode: 'eu', displayName: 'Basque', nativeName: 'euskara' },
  //{ languageCode: 'be', displayName: 'Belarusian', nativeName: 'Беларуская мова' },
  //{ languageCode: 'bn', displayName: 'Bengali', nativeName: 'বাংলা' },
  //{ languageCode: 'bs', displayName: 'Bosnian', nativeName: 'босански' },
  //{ languageCode: 'bg', displayName: 'Bulgarian', nativeName: 'български език' },
  //{ languageCode: 'ca', displayName: 'Catalan', nativeName: 'català' },
  //{ languageCode: 'ceb', displayName: 'Cebuano', nativeName: 'Sinugboanon / Sugboanon' },
  //{ languageCode: 'ny', displayName: 'Chichewa', nativeName: 'Chicheŵa' },
  //{ languageCode: 'zh-TW', displayName: 'Chinese (Traditional)', nativeName: '漢語' },
  //{ languageCode: 'co', displayName: 'Corsican', nativeName: 'corsu' },
  //{ languageCode: 'hr', displayName: 'Croatian', nativeName: 'Hrvatski' },
  //{ languageCode: 'cs', displayName: 'Czech', nativeName: 'český jazyk' },
  //{ languageCode: 'da', displayName: 'danish', nativeName: 'dansk' },
  //{ languageCode: 'nl', displayName: 'dutch', nativeName: 'Nederlands' },
  //{ languageCode: 'eo', displayName: 'Esperanto', nativeName: 'Esperanto' },
  //{ languageCode: 'et', displayName: 'Estonian', nativeName: 'eesti keel' },
  //{ languageCode: 'tl', displayName: 'Filipino', nativeName: 'Tagalog' },
  //{ languageCode: 'fi', displayName: 'Finnish', nativeName: 'suomi / suomen kieli' },
  //{ languageCode: 'fr', displayName: 'French', nativeName: 'français' },
  //{ languageCode: 'fy', displayName: 'Frisian', nativeName: 'Noordfreesk' },
  //{ languageCode: 'gl', displayName: 'Galician', nativeName: 'Galego' },
  //{ languageCode: 'ka', displayName: 'Georgian', nativeName: 'ქართული ენა' },
  //{ languageCode: 'de', displayName: 'German', nativeName: 'Deutsch' },
  //{ languageCode: 'el', displayName: 'Greek', nativeName: 'ελληνικά' },
  //{ languageCode: 'gu', displayName: 'Gujarati', nativeName: 'ગુજરાતી' },
  //{ languageCode: 'ht', displayName: 'Haitian Creole', nativeName: 'Kreyòl ayisyen' },
  //{ languageCode: 'ha', displayName: 'Hausa', nativeName: '(ḥawsa) حَوْسَ' },
  //{ languageCode: 'haw', displayName: 'Hawaiian', nativeName: 'ʻōlelo Hawaiʻi' },
  //{ languageCode: 'iw', displayName: 'Hebrew', nativeName: 'עברית / עִבְרִית' },
  //{ languageCode: 'hi', displayName: 'Hindi', nativeName: 'हिन्दी' },
  //{ languageCode: 'hmn', displayName: 'Hmong', nativeName: '' },
  //{ languageCode: 'hu', displayName: 'Hungarian', nativeName: 'magyar nyelv' },
  //{ languageCode: 'is', displayName: 'Icelandic', nativeName: 'Íslenska' },
  //{ languageCode: 'ig', displayName: 'Igbo', nativeName: 'igbo' },
  //{ languageCode: 'ga', displayName: 'Irish', nativeName: 'Gaeilge' },
  //{ languageCode: 'it', displayName: 'Italian', nativeName: 'italiano' },
  //{ languageCode: 'kn', displayName: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  //{ languageCode: 'kk', displayName: 'Kazakh', nativeName: '	Қазақ тілі' },
  //{ languageCode: 'km', displayName: 'Khmer', nativeName: 'ភាសាខ្មែរ' },
  //{ languageCode: 'rw', displayName: 'Kinyarwanda', nativeName: 'Ikinyarwanda' },
  //{ languageCode: 'ko', displayName: 'Korean', nativeName: '한국어 [韓國語]' },
  //{ languageCode: 'ku', displayName: 'Kurdish (Kurmanji)', nativeName: 'Kurdí' },
  //{ languageCode: 'ky', displayName: 'Kyrgyz', nativeName: 'قىرعىز (kyrgyz) قىرعىز تىلى (kyrgyz tili)' },
  { languageCode: 'lo', displayNameEN: 'Lao', displayNameTH: 'ลาว', displayNameJA: 'ラオ語', displayNameZH: '老挝语', nativeName: 'ພາສາລາວ' },
  //{ languageCode: 'la', displayName: 'latin', nativeName: 'Lingua Latina' },
  //{ languageCode: 'lv', displayName: 'latvian', nativeName: 'latviešu valoda' },
  //{ languageCode: 'lt', displayName: 'lithuanian', nativeName: 'lietuvių kalba' },
  //{ languageCode: 'lb', displayName: 'luxembourgish', nativeName: 'Lëtzebuergesch' },
  //{ languageCode: 'mk', displayName: 'Macedonian', nativeName: 'македонски (Makedonski) македонски јазик (makedonski jazik)' },
  //{ languageCode: 'mg', displayName: 'Malagasy', nativeName: 'Fiteny Malagasy' },
  //{ languageCode: 'ml', displayName: 'Malayalam', nativeName: '	മലയാളം (malayāḷam)' },
  //{ languageCode: 'mt', displayName: 'Maltese', nativeName: 'Malti' },
  //{ languageCode: 'mi', displayName: 'Maori', nativeName: 'te Reo Māori' },
  //{ languageCode: 'mr', displayName: 'Marathi', nativeName: 'मराठी (marāṭhī)' },
  //{ languageCode: 'mn', displayName: 'Mongolian', nativeName: 'монгол (mongol) монгол хэл (mongol hêl)' },
  //{ languageCode: 'my', displayName: 'Myanmar (Burmese)', nativeName: 'ဗမာစကား (bama saka)' },
  //{ languageCode: 'ne', displayName: 'Nepali', nativeName: 'नेपाली (nēpālī)' },
  //{ languageCode: 'no', displayName: 'Norwegian', nativeName: 'Norsk' },
  //{ languageCode: 'or', displayName: 'Odia (Oriya)', nativeName: 'ଓଡ଼ିଆ (ōṛiyā)' },
  //{ languageCode: 'ps', displayName: 'Pashto', nativeName: '(paṧto) پښتو' },
  //{ languageCode: 'fa', displayName: 'Persian', nativeName: '(fārsī) فارسى' },
  //{ languageCode: 'pl', displayName: 'Polish', nativeName: 'polski / język polski / polszczyzna' },
  //{ languageCode: 'pt', displayName: 'Portuguese', nativeName: 'português' },
  //{ languageCode: 'pa', displayName: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ / ﺏﺎﺠﻨﭘ (panjābi)' },
  //{ languageCode: 'ro', displayName: 'Romanian', nativeName: 'limba română / român' },
  //{ languageCode: 'ru', displayName: 'Russian', nativeName: 'Русский язык (Russkij jazyk)' },
  //{ languageCode: 'sm', displayName: 'Samoan', nativeName: 'Gagana Samoa' },
  //{ languageCode: 'gd', displayName: 'Scots Gaelic', nativeName: 'Scoats leid / Lallans' },
  //{ languageCode: 'sr', displayName: 'Serbian', nativeName: 'српски (srpski) српски језик (srpski jezik)' },
  //{ languageCode: 'st', displayName: 'Sesotho', nativeName: 'ᑌᓀ ᒐ (dene tha)' },
  //{ languageCode: 'sn', displayName: 'Shona', nativeName: '' },
  //{ languageCode: 'sd', displayName: 'Sindhi', nativeName: 'سنڌي' },
  //{ languageCode: 'si', displayName: 'Sinhala', nativeName: 'සිංහල' },
  //{ languageCode: 'sk', displayName: 'Slovak', nativeName: 'slovenčina' },
  //{ languageCode: 'sl', displayName: 'Slovenian', nativeName: 'slovenščina' },
  //{ languageCode: 'so', displayName: 'Somali', nativeName: 'af Soomaali' },
  //{ languageCode: 'es', displayName: 'Spanish', nativeName: 'español' },
  //{ languageCode: 'sw', displayName: 'Swahili', nativeName: 'Kiswahili' },
  //{ languageCode: 'sv', displayName: 'Swedish', nativeName: 'Svenska' },
  //{ languageCode: 'tg', displayName: 'Tajik', nativeName: 'тоҷики' },
  //{ languageCode: 'ta', displayName: 'Tamil', nativeName: 'தமிழ்' },
  //{ languageCode: 'tt', displayName: 'Tatar', nativeName: 'татарча' },
  //{ languageCode: 'te', displayName: 'Telugu', nativeName: 'తెలుగు' },
  //{ languageCode: 'tr', displayName: 'Turkish', nativeName: 'Türkçe' },
  //{ languageCode: 'tk', displayName: 'Turkmen', nativeName: 'түркmенче' },
  //{ languageCode: 'uk', displayName: 'Ukrainian', nativeName: 'Українська' },
  //{ languageCode: 'ur', displayName: 'Urdu', nativeName: '(urdū) اردو' },
  //{ languageCode: 'ug', displayName: 'Uyghur', nativeName: '	Уйғур' },
  //{ languageCode: 'uz', displayName: 'Uzbek', nativeName: 'ўзбек тили' },
  //{ languageCode: 'cy', displayName: 'Welsh', nativeName: 'Y Gymraeg' },
  //{ languageCode: 'xh', displayName: 'Xhosa', nativeName: 'isiXhosa' },
  //{ languageCode: 'yi', displayName: 'Yiddish', nativeName: '(Yidish) ײִדיש' },
  //{ languageCode: 'yo', displayName: 'Yoruba', nativeName: 'Yorùbá' },
  //{ languageCode: 'zu', displayName: 'Zulu', nativeName: 'isiZulu' }
];

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  getLanguage(code) {
    return this.getSupportedLanguages(null).find(l => l.languageCode === code);
  }

  getSupportedLanguages(code) {
    let selected = supportedLanguages.find(l => l.languageCode === code);

    // update the sortOrder of selected language so it is at top of the list
    if (selected) selected.sortOrder = 6;

    return supportedLanguages;
  }
}
