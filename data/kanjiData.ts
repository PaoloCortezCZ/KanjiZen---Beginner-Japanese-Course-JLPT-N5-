import { KanjiDef } from '../types';

export const kanjiList: KanjiDef[] = [
  // --- Chapter 1: Numbers ---
  { 
    id: '1', character: '一', onyomi: ['ichi'], kunyomi: ['hito(tsu)'], meaning: ['One'], strokes: 1, level: 'N5', example: '一つ (Hitotsu)', category: 'Chapter 1: Numbers',
    sentences: [
      { text: 'リンゴを一つください。', romaji: 'Ringo o hitotsu kudasai.', en: 'Please give me one apple.' },
      { text: '一分待ちます。', romaji: 'Ippun machimasu.', en: 'I will wait for one minute.' }
    ]
  },
  { 
    id: '2', character: '二', onyomi: ['ni'], kunyomi: ['futa(tsu)'], meaning: ['Two'], strokes: 2, level: 'N5', example: '二月 (Nigatsu)', category: 'Chapter 1: Numbers',
    sentences: [
      { text: '二時に会いましょう。', romaji: 'Niji ni aimashou.', en: 'Let\'s meet at 2 o\'clock.' },
      { text: 'これは二千円です。', romaji: 'Kore wa nisen-en desu.', en: 'This is 2000 yen.' }
    ]
  },
  { 
    id: '3', character: '三', onyomi: ['san'], kunyomi: ['mit(tsu)'], meaning: ['Three'], strokes: 3, level: 'N5', example: '三日 (Mikka)', category: 'Chapter 1: Numbers',
    sentences: [
      { text: '三月三日はひな祭りです。', romaji: 'Sangatsu mikka wa hinamatsuri desu.', en: 'March 3rd is the Doll Festival.' }
    ]
  },
  { 
    id: '4', character: '四', onyomi: ['shi'], kunyomi: ['yon', 'yot(tsu)'], meaning: ['Four'], strokes: 5, level: 'N5', example: '四月 (Shigatsu)', category: 'Chapter 1: Numbers',
    sentences: [
      { text: '四人の学生がいます。', romaji: 'Yonin no gakusei ga imasu.', en: 'There are four students.' }
    ]
  },
  { 
    id: '5', character: '五', onyomi: ['go'], kunyomi: ['itsu(tsu)'], meaning: ['Five'], strokes: 4, level: 'N5', example: '五円 (Goen)', category: 'Chapter 1: Numbers',
    sentences: [
        { text: '五つ数えてください。', romaji: 'Itsutsu kazoete kudasai.', en: 'Please count to five.' }
    ]
  },
  { id: '10', character: '十', onyomi: ['juu'], kunyomi: ['tou'], meaning: ['Ten'], strokes: 2, level: 'N5', example: '十 (Juu)', category: 'Chapter 1: Numbers', 
    sentences: [
        { text: '十分休憩しましょう。', romaji: 'Juppun kyuukei shimashou.', en: 'Let\'s take a 10-minute break.' }
    ]
  },

  // --- Chapter 2: Time & Nature ---
  { 
    id: '11', character: '日', onyomi: ['nichi', 'jitsu'], kunyomi: ['hi', 'ka'], meaning: ['Sun', 'Day'], strokes: 4, level: 'N5', example: '日曜日 (Nichiyoubi)', category: 'Chapter 2: Time & Nature',
    sentences: [
      { text: '今日はいい日ですね。', romaji: 'Kyou wa ii hi desu ne.', en: 'Today is a nice day, isn\'t it?' },
      { text: '日曜日にテニスをします。', romaji: 'Nichiyoubi ni tenisu o shimasu.', en: 'I play tennis on Sunday.' }
    ]
  },
  { 
    id: '12', character: '月', onyomi: ['getsu', 'gatsu'], kunyomi: ['tsuki'], meaning: ['Moon', 'Month'], strokes: 4, level: 'N5', example: '月曜日 (Getsuyoubi)', category: 'Chapter 2: Time & Nature',
    sentences: [
      { text: '月が綺麗です。', romaji: 'Tsuki ga kirei desu.', en: 'The moon is beautiful.' },
      { text: '来月、日本へ行きます。', romaji: 'Raigetsu, Nihon e ikimasu.', en: 'I will go to Japan next month.' }
    ]
  },
  { 
    id: '15', character: '木', onyomi: ['moku'], kunyomi: ['ki'], meaning: ['Tree'], strokes: 4, level: 'N5', example: '木曜日 (Mokuyoubi)', category: 'Chapter 2: Time & Nature',
    sentences: [
        { text: '木の下で本を読みます。', romaji: 'Ki no shita de hon o yomimasu.', en: 'I read a book under the tree.' }
    ]
  },
  { 
    id: '18', character: '山', onyomi: ['san'], kunyomi: ['yama'], meaning: ['Mountain'], strokes: 3, level: 'N5', example: '富士山 (Fujisan)', category: 'Chapter 2: Time & Nature',
    sentences: [
        { text: '山登りが好きです。', romaji: 'Yamanobori ga suki desu.', en: 'I like mountain climbing.' }
    ]
  },
  { 
    id: '19', character: '川', onyomi: ['sen'], kunyomi: ['kawa'], meaning: ['River'], strokes: 3, level: 'N5', example: '川 (Kawa)', category: 'Chapter 2: Time & Nature',
    sentences: [
        { text: 'この川は長いです。', romaji: 'Kono kawa wa nagai desu.', en: 'This river is long.' }
    ]
  },

  // --- Chapter 3: Directions ---
  { 
    id: '30', character: '北', onyomi: ['hoku'], kunyomi: ['kita'], meaning: ['North'], strokes: 5, level: 'N5', example: '北 (Kita)', category: 'Chapter 3: Directions',
    sentences: [
        { text: '北風が寒いです。', romaji: 'Kitakaze ga samui desu.', en: 'The north wind is cold.' }
    ]
  },
  { 
    id: '34', character: '上', onyomi: ['jou'], kunyomi: ['ue'], meaning: ['Up', 'Above'], strokes: 3, level: 'N5', example: '上 (Ue)', category: 'Chapter 3: Directions',
    sentences: [
        { text: 'テーブルの上に猫がいます。', romaji: 'Teeburu no ue ni neko ga imasu.', en: 'There is a cat on the table.' }
    ]
  },
  { 
    id: '35', character: '下', onyomi: ['ka', 'ge'], kunyomi: ['shita'], meaning: ['Down', 'Below'], strokes: 3, level: 'N5', example: '下 (Shita)', category: 'Chapter 3: Directions',
    sentences: [
        { text: '椅子の下にカバンがあります。', romaji: 'Isu no shita ni kaban ga arimasu.', en: 'There is a bag under the chair.' }
    ]
  },
  { 
    id: '36', character: '中', onyomi: ['chuu'], kunyomi: ['naka'], meaning: ['Inside', 'Middle'], strokes: 4, level: 'N5', example: '中 (Naka)', category: 'Chapter 3: Directions',
    sentences: [
        { text: '箱の中を見てください。', romaji: 'Hako no naka o mite kudasai.', en: 'Please look inside the box.' },
        { text: '田中さんはいますか。', romaji: 'Tanaka-san wa imasu ka.', en: 'Is Mr. Tanaka here?' }
    ]
  },

  // --- Chapter 4: People & School ---
  { 
    id: '40', character: '人', onyomi: ['jin', 'nin'], kunyomi: ['hito'], meaning: ['Person'], strokes: 2, level: 'N5', example: '日本人 (Nihonjin)', category: 'Chapter 4: People & School',
    sentences: [
        { text: 'あの人は誰ですか。', romaji: 'Ano hito wa dare desu ka.', en: 'Who is that person?' },
        { text: '三人の学生が来ました。', romaji: 'Sannin no gakusei ga kimashita.', en: 'Three students came.' }
    ]
  },
  { 
    id: '44', character: '学', onyomi: ['gaku'], kunyomi: ['mana(bu)'], meaning: ['Study'], strokes: 8, level: 'N5', example: '学生 (Gakusei)', category: 'Chapter 4: People & School',
    sentences: [
        { text: '日本語を学びます。', romaji: 'Nihongo o manabimasu.', en: 'I study Japanese.' },
        { text: '大学へ行きます。', romaji: 'Daigaku e ikimasu.', en: 'I go to university.' }
    ]
  },
  { 
    id: '45', character: '校', onyomi: ['kou'], kunyomi: ['-'], meaning: ['School'], strokes: 10, level: 'N5', example: '学校 (Gakkou)', category: 'Chapter 4: People & School',
    sentences: [
        { text: '学校は八時に始まります。', romaji: 'Gakkou wa hachiji ni hajimarimasu.', en: 'School starts at 8 o\'clock.' }
    ]
  },
  { 
    id: '46', character: '先', onyomi: ['sen'], kunyomi: ['saki'], meaning: ['Before', 'Ahead'], strokes: 6, level: 'N5', example: '先生 (Sensei)', category: 'Chapter 4: People & School',
    sentences: [
        { text: '先生、質問があります。', romaji: 'Sensei, shitsumon ga arimasu.', en: 'Teacher, I have a question.' },
        { text: 'お先に失礼します。', romaji: 'Osaki ni shitsurei shimasu.', en: 'Excuse me for leaving first.' }
    ]
  },
  { 
    id: '48', character: '本', onyomi: ['hon'], kunyomi: ['moto'], meaning: ['Book', 'Origin'], strokes: 5, level: 'N5', example: '日本 (Nihon)', category: 'Chapter 4: People & School',
    sentences: [
        { text: 'これは私の本です。', romaji: 'Kore wa watashi no hon desu.', en: 'This is my book.' },
        { text: '日本に行きたいです。', romaji: 'Nihon ni ikitai desu.', en: 'I want to go to Japan.' }
    ]
  },

  // --- Chapter 5: Verbs ---
  { 
    id: '60', character: '行', onyomi: ['kou'], kunyomi: ['i(ku)'], meaning: ['Go'], strokes: 6, level: 'N5', example: '行きます (Ikimasu)', category: 'Chapter 5: Verbs',
    sentences: [
        { text: '明日、東京へ行きます。', romaji: 'Ashita, Toukyou e ikimasu.', en: 'I will go to Tokyo tomorrow.' }
    ]
  },
  { 
    id: '62', character: '食', onyomi: ['shoku'], kunyomi: ['ta(beru)'], meaning: ['Eat'], strokes: 9, level: 'N5', example: '食べ物 (Tabemono)', category: 'Chapter 5: Verbs',
    sentences: [
        { text: '寿司を食べます。', romaji: 'Sushi o tabemasu.', en: 'I eat sushi.' },
        { text: '食堂はどこですか。', romaji: 'Shokudou wa doko desu ka.', en: 'Where is the cafeteria?' }
    ]
  },
  { 
    id: '63', character: '飲', onyomi: ['in'], kunyomi: ['no(mu)'], meaning: ['Drink'], strokes: 12, level: 'N5', example: '飲みます (Nomimasu)', category: 'Chapter 5: Verbs',
    sentences: [
        { text: '水を飲んでください。', romaji: 'Mizu o nonde kudasai.', en: 'Please drink water.' }
    ]
  },
  { 
    id: '64', character: '見', onyomi: ['ken'], kunyomi: ['mi(ru)'], meaning: ['See'], strokes: 7, level: 'N5', example: '見ます (Mimasu)', category: 'Chapter 5: Verbs',
    sentences: [
        { text: '映画を見ました。', romaji: 'Eiga o mimashita.', en: 'I saw a movie.' }
    ]
  },
];

export const getKanjiById = (id: string) => kanjiList.find(k => k.id === id);