import { Injectable } from '@angular/core';

import { SupportedLanguage } from '../models/supported-language.model'

const supportedLanguages: SupportedLanguage[] = [
  { languageCode: 'na', displayNameEN: 'Turn off', displayNameTH: 'ปิด', displayNameJA: '消す', displayNameZH: '關閉', nativeName: '', sortOrder: 7 },
  { languageCode: 'en', displayNameEN: 'English', displayNameTH: 'อังกฤษ', displayNameJA: '英語', displayNameZH: '英语', nativeName: 'English', sortOrder: 5 },
  { languageCode: 'ja', displayNameEN: 'Japanese', displayNameTH: 'ญี่ปุ่น', displayNameJA: '日本語', displayNameZH: '日语', nativeName: '日本語', sortOrder: 4 },
  { languageCode: 'th', displayNameEN: 'Thai', displayNameTH: 'ไทย', displayNameJA: 'タイ語', displayNameZH: '泰语', nativeName: 'ไทย', sortOrder: 3 },
  { languageCode: 'id', displayNameEN: 'Indonesian', displayNameTH: 'อินโดนีเซีย', displayNameJA: 'インドネシア語', displayNameZH: '印尼语', nativeName: 'Bahasa Indonesia', sortOrder: 2 },
  { languageCode: 'zh-CN', displayNameEN: 'Chinese(Simp.)', displayNameTH: 'จีน (ตัวย่อ)', displayNameJA: '中国語(簡体)', displayNameZH: '中文(简体)', nativeName: '汉语', sortOrder: 1 },
  { languageCode: 'jw', displayNameEN: 'Javanese', displayNameTH: 'ชวา', displayNameJA: 'ジャワ語', displayNameZH: '印尼爪哇语', nativeName: 'Basa Jawa', },
  { languageCode: 'su', displayNameEN: 'Sundanese', displayNameTH: 'ซุนดา', displayNameJA: 'スンダ語', displayNameZH: '印尼巽他语', nativeName: 'Basa Sunda' },
  { languageCode: 'ms', displayNameEN: 'Malay', displayNameTH: 'มาเลย์', displayNameJA: 'マレー語', displayNameZH: '', nativeName: 'Bahasa melayu' },
  { languageCode: 'vi', displayNameEN: 'Vietnamese', displayNameTH: 'เวียดนาม', displayNameJA: 'ベトナム語', displayNameZH: '马来语', nativeName: 'tiếng việt' },
  { languageCode: 'af', displayNameEN: 'Afrikaans', displayNameTH: 'แอฟริกา', displayNameJA: 'アフリカーンス語', displayNameZH: '布尔语(南非荷兰语)', nativeName: 'Afrikaans' },
  { languageCode: 'sq', displayNameEN: 'Albanian', displayNameTH: 'แอลเบเนีย', displayNameJA: 'アルバニア語', displayNameZH: '阿尔巴尼亚语', nativeName: 'shqip / gjuha shqipe' },
  { languageCode: 'am', displayNameEN: 'Amharic', displayNameTH: 'อัมฮาริก', displayNameJA: 'アムハラ語', displayNameZH: '阿姆哈拉语', nativeName: 'ኣማርኛ' },
  { languageCode: 'ar', displayNameEN: 'Arabic', displayNameTH: 'อาหรับ', displayNameJA: 'アラビア語', displayNameZH: '阿拉伯语', nativeName: 'العربية' },
  { languageCode: 'hy', displayNameEN: 'Armenian', displayNameTH: 'อาร์เมเนีย', displayNameJA: 'アルメニア語', displayNameZH: '亚美尼亚语', nativeName: 'Հայերէն' },
  { languageCode: 'az', displayNameEN: 'Azerbaijani', displayNameTH: 'อาร์เซอร์ไบจัน', displayNameJA: 'アゼルバイジャン語', displayNameZH: '阿塞拜疆语', nativeName: 'Азәрбајҹан дили' },
  { languageCode: 'eu', displayNameEN: 'Basque', displayNameTH: 'บาสก์', displayNameJA: 'バスク語', displayNameZH: '巴斯克语', nativeName: 'euskara' },
  { languageCode: 'be', displayNameEN: 'Belarusian', displayNameTH: 'เบลารุส', displayNameJA: 'ベラルーシ語', displayNameZH: '白俄罗斯语', nativeName: 'Беларуская мова' },
  { languageCode: 'bn', displayNameEN: 'Bengali', displayNameTH: 'เบงกอล', displayNameJA: 'ベンガル語', displayNameZH: '孟加拉语', nativeName: 'বাংলা' },
  { languageCode: 'bs', displayNameEN: 'Bosnian', displayNameTH: 'บอสเนีย', displayNameJA: 'ボスニア語', displayNameZH: '波斯尼亚语', nativeName: 'босански' },
  { languageCode: 'bg', displayNameEN: 'Bulgarian', displayNameTH: 'บัลแกเรีย', displayNameJA: 'ブルガリア語', displayNameZH: '保加利亚语', nativeName: 'български език' },
  { languageCode: 'ca', displayNameEN: 'Catalan', displayNameTH: 'คาตาลัน', displayNameJA: 'カタルーニャ語', displayNameZH: '加泰罗尼亚语', nativeName: 'català' },
  { languageCode: 'ceb', displayNameEN: 'Cebuano', displayNameTH: 'ซีบัวโน', displayNameJA: 'セブアノ語', displayNameZH: '宿务语', nativeName: 'Sinugboanon / Sugboanon' },
  { languageCode: 'ny', displayNameEN: 'Chichewa', displayNameTH: 'ชิเชวา', displayNameJA: 'チェワ語', displayNameZH: '齐切瓦语', nativeName: 'Chicheŵa' },
  { languageCode: 'zh-TW', displayNameEN: 'Chinese (Trad.)', displayNameTH: 'จีน (ตัวเต็ม)', displayNameJA: '中国語(繁体)', displayNameZH: '中文(繁体)',  nativeName: '漢語' },
  { languageCode: 'co', displayNameEN: 'Corsican', displayNameTH: 'คอร์สิกา', displayNameJA: 'コルシカ語', displayNameZH: '科西嘉语', nativeName: 'corsu' },
  { languageCode: 'hr', displayNameEN: 'Croatian', displayNameTH: 'โครเอเชีย', displayNameJA: 'クロアチア語', displayNameZH: '克罗地亚语', nativeName: 'Hrvatski' },
  { languageCode: 'cs', displayNameEN: 'Czech', displayNameTH: 'เช็ก', displayNameJA: 'チェコ語', displayNameZH: '捷克语', nativeName: 'český jazyk' },
  { languageCode: 'da', displayNameEN: 'Danish', displayNameTH: 'เดนมาร์ก', displayNameJA: 'デンマーク語', displayNameZH: '丹麦语', nativeName: 'dansk' },
  { languageCode: 'nl', displayNameEN: 'Dutch', displayNameTH: 'ดัตช์', displayNameJA: 'オランダ語', displayNameZH: '荷兰语', nativeName: 'Nederlands' },
  { languageCode: 'eo', displayNameEN: 'Esperanto', displayNameTH: 'เอสเปอแรนโต', displayNameJA: 'エスペラント語', displayNameZH: '世界语', nativeName: 'Esperanto' },
  { languageCode: 'et', displayNameEN: 'Estonian', displayNameTH: 'เอสโทเนีย', displayNameJA: 'エストニア語', displayNameZH: '爱沙尼亚语', nativeName: 'eesti keel' },
  { languageCode: 'tl', displayNameEN: 'Filipino', displayNameTH: 'ฟิลิปปินส์', displayNameJA: 'タガログ語', displayNameZH: '菲律宾语', nativeName: 'Tagalog' },
  { languageCode: 'fi', displayNameEN: 'Finnish', displayNameTH: 'ฟินแลนด์', displayNameJA: 'フィンランド語', displayNameZH: '芬兰语', nativeName: 'suomi / suomen kieli' },
  { languageCode: 'fr', displayNameEN: 'French', displayNameTH: 'ฝรั่งเศส', displayNameJA: 'フランス語', displayNameZH: '法语', nativeName: 'français' },
  { languageCode: 'fy', displayNameEN: 'Frisian', displayNameTH: 'ฟริเชียน', displayNameJA: 'フリジア語', displayNameZH: '弗里西语', nativeName: 'Noordfreesk' },
  { languageCode: 'gl', displayNameEN: 'Galician', displayNameTH: 'กาลิเชียน', displayNameJA: 'ガリシア語', displayNameZH: '加利西亚语', nativeName: 'Galego' },
  { languageCode: 'ka', displayNameEN: 'Georgian', displayNameTH: 'จอร์เจีย', displayNameJA: 'ジョージア(グルジア)語', displayNameZH: '格鲁吉亚语', nativeName: 'ქართული ენა' },
  { languageCode: 'de', displayNameEN: 'German', displayNameTH: 'เยอรมัน', displayNameJA: 'ドイツ語', displayNameZH: '德语', nativeName: 'Deutsch' },
  { languageCode: 'el', displayNameEN: 'Greek', displayNameTH: 'คุชราต', displayNameJA: 'ギリシャ語', displayNameZH: '希腊语', nativeName: 'ελληνικά' },
  { languageCode: 'gu', displayNameEN: 'Gujarati', displayNameTH: 'คุชราต', displayNameJA: 'グジャラト語', displayNameZH: '古吉拉特语', nativeName: 'ગુજરાતી' },
  { languageCode: 'ht', displayNameEN: 'Haitian Creole', displayNameTH: 'เฮติครีโอล', displayNameJA: 'ハイチ語', displayNameZH: '海地克里奥尔语', nativeName: 'Kreyòl ayisyen' },
  { languageCode: 'ha', displayNameEN: 'Hausa', displayNameTH: 'ฮัวซา', displayNameJA: 'ハウサ語', displayNameZH: '豪萨语', nativeName: '(ḥawsa) حَوْسَ' },
  { languageCode: 'haw', displayNameEN: 'Hawaiian', displayNameTH: 'ฮาวาย', displayNameJA: 'ハワイ語', displayNameZH: '夏威夷语', nativeName: 'ʻōlelo Hawaiʻi' },
  { languageCode: 'iw', displayNameEN: 'Hebrew', displayNameTH: 'ฮีบรู', displayNameJA: 'ヘブライ語', displayNameZH: '希伯来语', nativeName: 'עברית / עִבְרִית' },
  { languageCode: 'hi', displayNameEN: 'Hindi', displayNameTH: 'ฮินดี', displayNameJA: 'ヒンディー語', displayNameZH: '印地语', nativeName: 'हिन्दी' },
  { languageCode: 'hmn', displayNameEN: 'Hmong', displayNameTH: 'ม้ง', displayNameJA: 'モン語', displayNameZH: '苗语', nativeName: '' },
  { languageCode: 'hu', displayNameEN: 'Hungarian', displayNameTH: 'ฮังการี', displayNameJA: 'ハンガリー語', displayNameZH: '匈牙利语', nativeName: 'magyar nyelv' },
  { languageCode: 'is', displayNameEN: 'Icelandic', displayNameTH: 'ไอซ์แลนด์', displayNameJA: 'アイスランド語', displayNameZH: '冰岛语', nativeName: 'Íslenska' },
  { languageCode: 'ig', displayNameEN: 'Igbo', displayNameTH: 'อิกโบ', displayNameJA: 'イボ語', displayNameZH: '伊博语', nativeName: 'igbo' },
  { languageCode: 'ga', displayNameEN: 'Irish', displayNameTH: 'ไอร์แลนด์', displayNameJA: 'アイルランド語', displayNameZH: '爱尔兰语', nativeName: 'Gaeilge' },
  { languageCode: 'it', displayNameEN: 'Italian', displayNameTH: 'อิตาลี', displayNameJA: 'イタリア語', displayNameZH: '意大利语', nativeName: 'italiano' },
  { languageCode: 'kn', displayNameEN: 'Kannada', displayNameTH: 'กันนาดา', displayNameJA: 'カンナダ語', displayNameZH: '卡纳达语', nativeName: 'ಕನ್ನಡ' },
  { languageCode: 'kk', displayNameEN: 'Kazakh', displayNameTH: 'คาซัค', displayNameJA: 'カザフ語', displayNameZH: '哈萨克语', nativeName: '	Қазақ тілі' },
  { languageCode: 'km', displayNameEN: 'Khmer', displayNameTH: 'เขมร', displayNameJA: 'クメール語', displayNameZH: '高棉语', nativeName: 'ភាសាខ្មែរ' },
  { languageCode: 'rw', displayNameEN: 'Kinyarwanda', displayNameTH: 'คินยารวันดา', displayNameJA: 'キニヤルワンダ語', displayNameZH: '卢旺达语', nativeName: 'Ikinyarwanda' },
  { languageCode: 'ko', displayNameEN: 'Korean', displayNameTH: 'เกาหลี', displayNameJA: '韓国語', displayNameZH: '韩语', nativeName: '한국어 [韓國語]' },
  { languageCode: 'ku', displayNameEN: 'Kurdish (Kurmanji)', displayNameTH: 'เคิร์ด', displayNameJA: 'クルド語', displayNameZH: '库尔德语', nativeName: 'Kurdí' },
  { languageCode: 'ky', displayNameEN: 'Kyrgyz', displayNameTH: 'คีร์กิซ', displayNameJA: 'キルギス語', displayNameZH: '吉尔吉斯语', nativeName: 'قىرعىز (kyrgyz) قىرعىز تىلى (kyrgyz tili)' },
  { languageCode: 'lo', displayNameEN: 'Lao', displayNameTH: 'ลาว', displayNameJA: 'ラオ語', displayNameZH: '老挝语', nativeName: 'ພາສາລາວ' },
  { languageCode: 'la', displayNameEN: 'latin', displayNameTH: 'ละติน', displayNameJA: 'ラテン語', displayNameZH: '拉丁语', nativeName: 'Lingua Latina' },
  { languageCode: 'lv', displayNameEN: 'latvian', displayNameTH: 'ลัตเวีย', displayNameJA: 'ラトビア語', displayNameZH: '拉脱维亚语', nativeName: 'latviešu valoda' },
  { languageCode: 'lt', displayNameEN: 'lithuanian', displayNameTH: 'ลิทัวเนีย', displayNameJA: 'リトアニア語', displayNameZH: '意大利语', nativeName: 'lietuvių kalba' },
  { languageCode: 'lb', displayNameEN: 'luxembourgish', displayNameTH: 'ลักเซมเบิร์ก', displayNameJA: 'ルクセンブルク語', displayNameZH: '卢森堡语', nativeName: 'Lëtzebuergesch' },
  { languageCode: 'mk', displayNameEN: 'Macedonian', displayNameTH: 'มาซีโดเนีย', displayNameJA: 'マケドニア語', displayNameZH: '马其顿语', nativeName: 'македонски (Makedonski) македонски јазик (makedonski jazik)' },
  { languageCode: 'mg', displayNameEN: 'Malagasy', displayNameTH: 'มาลากาซี', displayNameJA: 'マラガシ語', displayNameZH: '马尔加什语', nativeName: 'Fiteny Malagasy' },
  { languageCode: 'ml', displayNameEN: 'Malayalam', displayNameTH: 'มาลายาลัม', displayNameJA: 'マラヤーラム語', displayNameZH: '马拉雅拉姆语', nativeName: '	മലയാളം (malayāḷam)' },
  { languageCode: 'mt', displayNameEN: 'Maltese', displayNameTH: 'มัลทีส', displayNameJA: 'マルタ語', displayNameZH: '马耳他语', nativeName: 'Malti' },
  { languageCode: 'mi', displayNameEN: 'Maori', displayNameTH: 'เมารี', displayNameJA: 'マオリ語', displayNameZH: '毛利语', nativeName: 'te Reo Māori' },
  { languageCode: 'mr', displayNameEN: 'Marathi', displayNameTH: 'มาราฐี', displayNameJA: 'マラーティー語', displayNameZH: '马拉地语', nativeName: 'मराठी (marāṭhī)' },
  { languageCode: 'mn', displayNameEN: 'Mongolian', displayNameTH: 'มองโกเลีย', displayNameJA: 'モンゴル語', displayNameZH: '蒙古语', nativeName: 'монгол (mongol) монгол хэл (mongol hêl)' },
  { languageCode: 'my', displayNameEN: 'Myanmar (Burmese)', displayNameTH: 'เมียนมา (พม่า)', displayNameJA: 'ミャンマー語', displayNameZH: '缅甸语', nativeName: 'ဗမာစကား (bama saka)' },
  { languageCode: 'ne', displayNameEN: 'Nepali', displayNameTH: 'เนปาล', displayNameJA: 'ネパール語', displayNameZH: '尼泊尔语', nativeName: 'नेपाली (nēpālī)' },
  { languageCode: 'no', displayNameEN: 'Norwegian', displayNameTH: 'นอร์เวย์', displayNameJA: 'ノルウェー語', displayNameZH: '挪威语', nativeName: 'Norsk' },
  { languageCode: 'or', displayNameEN: 'Odia (Oriya)', displayNameTH: 'โอเดีย (โอริยา)', displayNameJA: 'オリヤ語', displayNameZH: '奥里亚语(奥里亚文)', nativeName: 'ଓଡ଼ିଆ (ōṛiyā)' },
  { languageCode: 'ps', displayNameEN: 'Pashto', displayNameTH: 'พาชตู', displayNameJA: 'パシュト語', displayNameZH: '普什图语', nativeName: '(paṧto) پښتو' },
  { languageCode: 'fa', displayNameEN: 'Persian', displayNameTH: 'เปอร์เซีย', displayNameJA: 'ペルシャ語', displayNameZH: '波斯语', nativeName: '(fārsī) فارسى' },
  { languageCode: 'pl', displayNameEN: 'Polish', displayNameTH: 'โปแลนด์', displayNameJA: 'ポーランド語', displayNameZH: '波兰语', nativeName: 'polski / język polski / polszczyzna' },
  { languageCode: 'pt', displayNameEN: 'Portuguese', displayNameTH: 'โปรตุเกส', displayNameJA: 'ポルトガル語', displayNameZH: '葡萄牙语', nativeName: 'português' },
  { languageCode: 'pa', displayNameEN: 'Punjabi', displayNameTH: 'ปัญจาป', displayNameJA: 'パンジャブ語', displayNameZH: '旁遮普语', nativeName: 'ਪੰਜਾਬੀ / ﺏﺎﺠﻨﭘ (panjābi)' },
  { languageCode: 'ro', displayNameEN: 'Romanian', displayNameTH: 'โรมาเนีย', displayNameJA: 'ルーマニア語', displayNameZH: '罗马尼亚语', nativeName: 'limba română / român' },
  { languageCode: 'ru', displayNameEN: 'Russian', displayNameTH: 'รัสเซีย', displayNameJA: 'ロシア語', displayNameZH: '俄语', nativeName: 'Русский язык (Russkij jazyk)' },
  { languageCode: 'sm', displayNameEN: 'Samoan', displayNameTH: 'ซามัว', displayNameJA: 'サモア語', displayNameZH: '萨摩亚语', nativeName: 'Gagana Samoa' },
  { languageCode: 'gd', displayNameEN: 'Scots Gaelic', displayNameTH: 'เกลิกสกอต', displayNameJA: 'スコットランド ゲール語', displayNameZH: '苏格兰盖尔语', nativeName: 'Scoats leid / Lallans' },
  { languageCode: 'sr', displayNameEN: 'Serbian', displayNameTH: 'เซอร์เบียน', displayNameJA: 'セルビア語', displayNameZH: '塞尔维亚语', nativeName: 'српски (srpski) српски језик (srpski jezik)' },
  { languageCode: 'st', displayNameEN: 'Sesotho', displayNameTH: 'เซโซโท', displayNameJA: 'ソト語', displayNameZH: '塞索托语', nativeName: 'ᑌᓀ ᒐ (dene tha)' },
  { languageCode: 'sn', displayNameEN: 'Shona', displayNameTH: 'โชนา', displayNameJA: 'ショナ語', displayNameZH: '修纳语', nativeName: '' },
  { languageCode: 'sd', displayNameEN: 'Sindhi', displayNameTH: 'สินธี', displayNameJA: 'シンド語', displayNameZH: '信德语', nativeName: 'سنڌي' },
  { languageCode: 'si', displayNameEN: 'Sinhala', displayNameTH: 'สิงหล', displayNameJA: 'シンハラ語', displayNameZH: '僧伽罗语', nativeName: 'සිංහල' },
  { languageCode: 'sk', displayNameEN: 'Slovak', displayNameTH: 'สโลวัก', displayNameJA: 'スロバキア語', displayNameZH: '斯洛伐克语', nativeName: 'slovenčina' },
  { languageCode: 'sl', displayNameEN: 'Slovenian', displayNameTH: 'สโลวีเนีย', displayNameJA: 'スロベニア語', displayNameZH: '斯洛文尼亚语', nativeName: 'slovenščina' },
  { languageCode: 'so', displayNameEN: 'Somali', displayNameTH: 'โซมาลี', displayNameJA: 'ソマリ語', displayNameZH: '索马里语', nativeName: 'af Soomaali' },
  { languageCode: 'es', displayNameEN: 'Spanish', displayNameTH: 'สเปน', displayNameJA: 'スペイン語', displayNameZH: '西班牙语', nativeName: 'español' },
  { languageCode: 'sw', displayNameEN: 'Swahili', displayNameTH: 'สวาฮิลี', displayNameJA: 'スワヒリ語', displayNameZH: '斯瓦希里语', nativeName: 'Kiswahili' },
  { languageCode: 'sv', displayNameEN: 'Swedish', displayNameTH: 'สวีเดน', displayNameJA: 'スウェーデン語', displayNameZH: '瑞典语', nativeName: 'Svenska' },
  { languageCode: 'tg', displayNameEN: 'Tajik', displayNameTH: 'ทาจิก', displayNameJA: 'タジク語', displayNameZH: '塔吉克语', nativeName: 'тоҷики' },
  { languageCode: 'ta', displayNameEN: 'Tamil', displayNameTH: 'ทมิฬ', displayNameJA: 'タミル語', displayNameZH: '泰米尔语', nativeName: 'தமிழ்' },
  { languageCode: 'tt', displayNameEN: 'Tatar', displayNameTH: 'ทาทาร์', displayNameJA: 'タタール語', displayNameZH: '鞑靼语', nativeName: 'татарча' },
  { languageCode: 'te', displayNameEN: 'Telugu', displayNameTH: 'เตลูกู', displayNameJA: 'テルグ語', displayNameZH: '泰卢固语', nativeName: 'తెలుగు' },
  { languageCode: 'tr', displayNameEN: 'Turkish', displayNameTH: 'ตุรกี', displayNameJA: 'トルコ語', displayNameZH: '土耳其语', nativeName: 'Türkçe' },
  { languageCode: 'tk', displayNameEN: 'Turkmen', displayNameTH: 'เติร์กเมน', displayNameJA: 'トルクメン語', displayNameZH: '土库曼语', nativeName: 'түркmенче' },
  { languageCode: 'uk', displayNameEN: 'Ukrainian', displayNameTH: 'ยูเครน', displayNameJA: 'ウクライナ語', displayNameZH: '乌克兰语', nativeName: 'Українська' },
  { languageCode: 'ur', displayNameEN: 'Urdu', displayNameTH: 'อูรดู', displayNameJA: 'ウルドゥ語', displayNameZH: '乌尔都语', nativeName: '(urdū) اردو' },
  { languageCode: 'ug', displayNameEN: 'Uyghur', displayNameTH: 'อุยกูร์', displayNameJA: 'ウイグル語', displayNameZH: '维吾尔语', nativeName: '	Уйғур' },
  { languageCode: 'uz', displayNameEN: 'Uzbek', displayNameTH: 'อุสเบกิสถาน', displayNameJA: 'ウズベク語', displayNameZH: '乌兹别克语', nativeName: 'ўзбек тили' },
  { languageCode: 'cy', displayNameEN: 'Welsh', displayNameTH: 'เวลส์', displayNameJA: 'ウェールズ語', displayNameZH: '威尔士语', nativeName: 'Y Gymraeg' },
  { languageCode: 'xh', displayNameEN: 'Xhosa', displayNameTH: 'โคซา', displayNameJA: 'コーサ語', displayNameZH: '南非科萨语', nativeName: 'isiXhosa' },
  { languageCode: 'yi', displayNameEN: 'Yiddish', displayNameTH: 'ยิดดิช', displayNameJA: 'イディッシュ語', displayNameZH: '意第绪语', nativeName: '(Yidish) ײִדיש' },
  { languageCode: 'yo', displayNameEN: 'Yoruba', displayNameTH: 'โยรูบา', displayNameJA: 'ヨルバ語', displayNameZH: '约鲁巴语', nativeName: 'Yorùbá' },
  { languageCode: 'zu', displayNameEN: 'Zulu', displayNameTH: 'ซูลู', displayNameJA: 'ズールー語', displayNameZH: '南非祖鲁语', nativeName: 'isiZulu' }
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
