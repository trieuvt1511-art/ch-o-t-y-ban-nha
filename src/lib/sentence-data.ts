export interface SentenceExercise {
  id: string;
  instruction: string;
  slots: { label: string; options: string[]; correct: string }[];
  translation: string;
  tip?: string;
}

export interface SentenceLevel {
  id: string;
  name: string;
  description: string;
  pattern: string;
  emoji: string;
  gradient: string;
  exercises: SentenceExercise[];
}

export const SENTENCE_LEVELS: SentenceLevel[] = [
  {
    id: 'beginner',
    name: 'Người mới',
    description: 'Chủ ngữ + Động từ',
    pattern: 'S + V',
    emoji: '🌱',
    gradient: 'gradient-success',
    exercises: [
      { id: 'b1', instruction: 'Ghép câu: "Tôi ăn"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Yo' }, { label: 'Động từ', options: ['como', 'hablas', 'bebe'], correct: 'como' }], translation: 'Yo como. = Tôi ăn.', tip: '"Yo" = Tôi. "Comer" chia với "yo" → "como"' },
      { id: 'b2', instruction: 'Ghép câu: "Bạn nói"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Ella'], correct: 'Tú' }, { label: 'Động từ', options: ['como', 'hablas', 'bebe'], correct: 'hablas' }], translation: 'Tú hablas. = Bạn nói.', tip: '"Tú" = Bạn. "Hablar" → "hablas"' },
      { id: 'b3', instruction: 'Ghép câu: "Anh ấy uống"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Él' }, { label: 'Động từ', options: ['como', 'hablas', 'bebe'], correct: 'bebe' }], translation: 'Él bebe. = Anh ấy uống.', tip: '"Él" = Anh ấy. "Beber" → "bebe"' },
      { id: 'b4', instruction: 'Ghép câu: "Cô ấy ngủ"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Ella', 'Nosotros'], correct: 'Ella' }, { label: 'Động từ', options: ['duermo', 'duerme', 'dormimos'], correct: 'duerme' }], translation: 'Ella duerme. = Cô ấy ngủ.' },
      { id: 'b5', instruction: 'Ghép câu: "Chúng tôi chạy"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Nosotros'], correct: 'Nosotros' }, { label: 'Động từ', options: ['corro', 'corres', 'corremos'], correct: 'corremos' }], translation: 'Nosotros corremos. = Chúng tôi chạy.' },
      { id: 'b6', instruction: 'Ghép câu: "Tôi đọc"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Yo' }, { label: 'Động từ', options: ['leo', 'lees', 'lee'], correct: 'leo' }], translation: 'Yo leo. = Tôi đọc.' },
    ],
  },
  {
    id: 'elementary',
    name: 'Sơ cấp',
    description: 'Chủ ngữ + Động từ + Tân ngữ',
    pattern: 'S + V + O',
    emoji: '🌿',
    gradient: 'gradient-travel',
    exercises: [
      { id: 'e1', instruction: 'Ghép câu: "Tôi ăn cơm"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Ella'], correct: 'Yo' }, { label: 'Động từ', options: ['como', 'comes', 'come'], correct: 'como' }, { label: 'Tân ngữ', options: ['arroz', 'café', 'agua'], correct: 'arroz' }], translation: 'Yo como arroz. = Tôi ăn cơm.', tip: 'Tân ngữ đặt sau động từ: como + arroz' },
      { id: 'e2', instruction: 'Ghép câu: "Cô ấy uống cà phê"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Ella', 'Nosotros'], correct: 'Ella' }, { label: 'Động từ', options: ['bebo', 'bebes', 'bebe'], correct: 'bebe' }, { label: 'Tân ngữ', options: ['arroz', 'café', 'leche'], correct: 'café' }], translation: 'Ella bebe café. = Cô ấy uống cà phê.' },
      { id: 'e3', instruction: 'Ghép câu: "Bạn đọc sách"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Tú' }, { label: 'Động từ', options: ['leo', 'lees', 'lee'], correct: 'lees' }, { label: 'Tân ngữ', options: ['un libro', 'una carta', 'el periódico'], correct: 'un libro' }], translation: 'Tú lees un libro. = Bạn đọc sách.', tip: '"un libro" = một cuốn sách' },
      { id: 'e4', instruction: 'Ghép câu: "Chúng tôi nấu gà"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Nosotros', 'Ellos'], correct: 'Nosotros' }, { label: 'Động từ', options: ['cocino', 'cocinamos', 'cocinan'], correct: 'cocinamos' }, { label: 'Tân ngữ', options: ['pollo', 'pescado', 'arroz'], correct: 'pollo' }], translation: 'Nosotros cocinamos pollo. = Chúng tôi nấu gà.' },
      { id: 'e5', instruction: 'Ghép câu: "Anh ấy viết thư"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Él' }, { label: 'Động từ', options: ['escribo', 'escribes', 'escribe'], correct: 'escribe' }, { label: 'Tân ngữ', options: ['una carta', 'un libro', 'un email'], correct: 'una carta' }], translation: 'Él escribe una carta. = Anh ấy viết thư.' },
      { id: 'e6', instruction: 'Ghép câu: "Tôi uống nước"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Ella'], correct: 'Yo' }, { label: 'Động từ', options: ['bebo', 'bebes', 'bebe'], correct: 'bebo' }, { label: 'Tân ngữ', options: ['agua', 'leche', 'café'], correct: 'agua' }], translation: 'Yo bebo agua. = Tôi uống nước.' },
    ],
  },
  {
    id: 'intermediate',
    name: 'Trung cấp',
    description: 'Thêm thời gian + địa điểm',
    pattern: 'S + V + O + Time + Place',
    emoji: '🌳',
    gradient: 'gradient-shopping',
    exercises: [
      { id: 'i1', instruction: '"Tôi ăn cơm ở nhà buổi sáng"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Ella'], correct: 'Yo' }, { label: 'Động từ', options: ['como', 'comes', 'come'], correct: 'como' }, { label: 'Tân ngữ', options: ['arroz', 'pan', 'fruta'], correct: 'arroz' }, { label: 'Địa điểm', options: ['en casa', 'en el parque', 'en la oficina'], correct: 'en casa' }, { label: 'Thời gian', options: ['por la mañana', 'por la noche', 'por la tarde'], correct: 'por la mañana' }], translation: 'Yo como arroz en casa por la mañana.', tip: '"en casa" = ở nhà. "por la mañana" = vào buổi sáng. Thời gian thường đặt cuối câu.' },
      { id: 'i2', instruction: '"Cô ấy học tiếng TBN ở trường buổi chiều"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Ella', 'Nosotros'], correct: 'Ella' }, { label: 'Động từ', options: ['estudio', 'estudia', 'estudiamos'], correct: 'estudia' }, { label: 'Tân ngữ', options: ['español', 'inglés', 'matemáticas'], correct: 'español' }, { label: 'Địa điểm', options: ['en la escuela', 'en casa', 'en el parque'], correct: 'en la escuela' }, { label: 'Thời gian', options: ['por la mañana', 'por la tarde', 'por la noche'], correct: 'por la tarde' }], translation: 'Ella estudia español en la escuela por la tarde.', tip: '"en la escuela" = ở trường. "por la tarde" = buổi chiều.' },
      { id: 'i3', instruction: '"Chúng tôi uống cà phê ở quán buổi sáng"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Nosotros', 'Ellos'], correct: 'Nosotros' }, { label: 'Động từ', options: ['bebo', 'bebemos', 'beben'], correct: 'bebemos' }, { label: 'Tân ngữ', options: ['café', 'té', 'agua'], correct: 'café' }, { label: 'Địa điểm', options: ['en la cafetería', 'en casa', 'en el trabajo'], correct: 'en la cafetería' }, { label: 'Thời gian', options: ['por la mañana', 'a las ocho', 'todos los días'], correct: 'por la mañana' }], translation: 'Nosotros bebemos café en la cafetería por la mañana.' },
      { id: 'i4', instruction: '"Bạn làm việc ở văn phòng hàng ngày"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Él'], correct: 'Tú' }, { label: 'Động từ', options: ['trabajo', 'trabajas', 'trabaja'], correct: 'trabajas' }, { label: 'Địa điểm', options: ['en la oficina', 'en casa', 'en la tienda'], correct: 'en la oficina' }, { label: 'Thời gian', options: ['todos los días', 'los lunes', 'a veces'], correct: 'todos los días' }], translation: 'Tú trabajas en la oficina todos los días.', tip: '"todos los días" = hàng ngày' },
      { id: 'i5', instruction: '"Tôi chạy bộ ở công viên buổi tối"', slots: [{ label: 'Chủ ngữ', options: ['Yo', 'Tú', 'Ella'], correct: 'Yo' }, { label: 'Động từ', options: ['corro', 'corres', 'corre'], correct: 'corro' }, { label: 'Địa điểm', options: ['en el parque', 'en la calle', 'en el gimnasio'], correct: 'en el parque' }, { label: 'Thời gian', options: ['por la mañana', 'por la noche', 'los fines de semana'], correct: 'por la noche' }], translation: 'Yo corro en el parque por la noche.' },
    ],
  },
  {
    id: 'advanced',
    name: 'Nâng cao',
    description: 'Câu phức với liên từ',
    pattern: 'Clause + Connector + Clause',
    emoji: '🌲',
    gradient: 'gradient-work',
    exercises: [
      { id: 'a1', instruction: '"Tôi học tiếng TBN vì tôi muốn đi du lịch"', slots: [{ label: 'Mệnh đề 1', options: ['Yo estudio español', 'Yo como arroz', 'Yo trabajo mucho'], correct: 'Yo estudio español' }, { label: 'Liên từ', options: ['porque', 'pero', 'cuando'], correct: 'porque' }, { label: 'Mệnh đề 2', options: ['quiero viajar', 'tengo hambre', 'estoy cansado'], correct: 'quiero viajar' }], translation: 'Yo estudio español porque quiero viajar.', tip: '"porque" = bởi vì. Dùng để giải thích lý do.' },
      { id: 'a2', instruction: '"Tôi mệt nhưng tôi phải làm việc"', slots: [{ label: 'Mệnh đề 1', options: ['Estoy cansado', 'Estoy feliz', 'Estoy enfermo'], correct: 'Estoy cansado' }, { label: 'Liên từ', options: ['porque', 'pero', 'si'], correct: 'pero' }, { label: 'Mệnh đề 2', options: ['tengo que trabajar', 'quiero dormir', 'voy al parque'], correct: 'tengo que trabajar' }], translation: 'Estoy cansado pero tengo que trabajar.', tip: '"pero" = nhưng. Dùng để nối hai ý trái ngược.' },
      { id: 'a3', instruction: '"Khi trời mưa, tôi ở nhà"', slots: [{ label: 'Liên từ', options: ['Cuando', 'Porque', 'Si'], correct: 'Cuando' }, { label: 'Điều kiện', options: ['llueve', 'hace sol', 'hace frío'], correct: 'llueve' }, { label: 'Kết quả', options: ['me quedo en casa', 'voy al parque', 'como helado'], correct: 'me quedo en casa' }], translation: 'Cuando llueve, me quedo en casa.', tip: '"cuando" = khi. Đặt ở đầu câu, theo sau là dấu phẩy.' },
      { id: 'a4', instruction: '"Nếu bạn muốn, chúng ta đi ăn"', slots: [{ label: 'Liên từ', options: ['Si', 'Cuando', 'Aunque'], correct: 'Si' }, { label: 'Điều kiện', options: ['tú quieres', 'tú puedes', 'tú vienes'], correct: 'tú quieres' }, { label: 'Kết quả', options: ['vamos a comer', 'vamos al cine', 'vamos a casa'], correct: 'vamos a comer' }], translation: 'Si tú quieres, vamos a comer.', tip: '"si" = nếu. Dùng cho câu điều kiện.' },
      { id: 'a5', instruction: '"Tôi thích TBN và tôi cũng thích Ý"', slots: [{ label: 'Mệnh đề 1', options: ['Me gusta España', 'Me gusta Francia', 'Me gusta Japón'], correct: 'Me gusta España' }, { label: 'Liên từ', options: ['y', 'pero', 'o'], correct: 'y' }, { label: 'Mệnh đề 2', options: ['también me gusta Italia', 'no me gusta Italia', 'quiero viajar'], correct: 'también me gusta Italia' }], translation: 'Me gusta España y también me gusta Italia.', tip: '"y" = và, "también" = cũng. "Y" nối hai ý giống nhau.' },
      { id: 'a6', instruction: '"Mặc dù trời lạnh, tôi vẫn chạy bộ"', slots: [{ label: 'Liên từ', options: ['Aunque', 'Porque', 'Cuando'], correct: 'Aunque' }, { label: 'Điều kiện', options: ['hace frío', 'llueve', 'es tarde'], correct: 'hace frío' }, { label: 'Kết quả', options: ['salgo a correr', 'me quedo en casa', 'duermo'], correct: 'salgo a correr' }], translation: 'Aunque hace frío, salgo a correr.', tip: '"aunque" = mặc dù. Diễn tả sự tương phản.' },
    ],
  },
];

// Grammar reference data
export interface GrammarTopic {
  id: string;
  title: string;
  emoji: string;
  gradient: string;
  sections: GrammarSection[];
}

export interface GrammarSection {
  title: string;
  content: string;
  table?: { headers: string[]; rows: string[][] };
  examples?: { spanish: string; vietnamese: string }[];
  memoryTrick?: string;
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'present-tense', title: 'Chia động từ hiện tại', emoji: '🔤', gradient: 'gradient-food',
    sections: [
      {
        title: 'Nhóm -AR (hablar, comer...)',
        content: 'Hầu hết động từ tiếng TBN kết thúc bằng -AR. Bỏ -AR, thêm đuôi:',
        table: {
          headers: ['Chủ ngữ', 'Đuôi', 'Ví dụ (hablar)'],
          rows: [['Yo', '-o', 'hablo'], ['Tú', '-as', 'hablas'], ['Él/Ella', '-a', 'habla'], ['Nosotros', '-amos', 'hablamos'], ['Ellos', '-an', 'hablan']],
        },
        examples: [{ spanish: 'Yo hablo español.', vietnamese: 'Tôi nói tiếng TBN.' }, { spanish: 'Ella habla bien.', vietnamese: 'Cô ấy nói giỏi.' }],
        memoryTrick: '🧠 Nhớ: -AR → o, as, a, amos, an. Giống như đếm "ô-át-a-a-mốt-an"!',
      },
      {
        title: 'Nhóm -ER (comer, beber...)',
        content: 'Động từ kết thúc bằng -ER:',
        table: {
          headers: ['Chủ ngữ', 'Đuôi', 'Ví dụ (comer)'],
          rows: [['Yo', '-o', 'como'], ['Tú', '-es', 'comes'], ['Él/Ella', '-e', 'come'], ['Nosotros', '-emos', 'comemos'], ['Ellos', '-en', 'comen']],
        },
      },
      {
        title: 'Nhóm -IR (vivir, escribir...)',
        content: 'Động từ kết thúc bằng -IR (gần giống -ER):',
        table: {
          headers: ['Chủ ngữ', 'Đuôi', 'Ví dụ (vivir)'],
          rows: [['Yo', '-o', 'vivo'], ['Tú', '-es', 'vives'], ['Él/Ella', '-e', 'vive'], ['Nosotros', '-imos', 'vivimos'], ['Ellos', '-en', 'viven']],
        },
      },
    ],
  },
  {
    id: 'ser-estar', title: 'Ser vs Estar', emoji: '⚖️', gradient: 'gradient-travel',
    sections: [
      {
        title: 'Khi nào dùng SER?',
        content: 'SER = bản chất, đặc điểm cố định. Nhớ: DOCTOR (Description, Occupation, Characteristic, Time, Origin, Relationship)',
        examples: [
          { spanish: 'Yo soy vietnamita.', vietnamese: 'Tôi là người Việt. (quốc tịch = cố định)' },
          { spanish: 'Ella es médica.', vietnamese: 'Cô ấy là bác sĩ. (nghề nghiệp)' },
          { spanish: 'Son las tres.', vietnamese: 'Ba giờ rồi. (thời gian)' },
        ],
        memoryTrick: '🧠 SER = "Sẽ luôn là" — dùng cho thứ không đổi!',
      },
      {
        title: 'Khi nào dùng ESTAR?',
        content: 'ESTAR = trạng thái tạm thời, vị trí. Nhớ: PLACE (Position, Location, Action, Condition, Emotion)',
        examples: [
          { spanish: 'Estoy cansado.', vietnamese: 'Tôi mệt. (cảm giác tạm thời)' },
          { spanish: 'El libro está en la mesa.', vietnamese: 'Cuốn sách ở trên bàn. (vị trí)' },
          { spanish: 'Estamos en Madrid.', vietnamese: 'Chúng tôi đang ở Madrid. (địa điểm)' },
        ],
        memoryTrick: '🧠 ESTAR = "Đang ở trạng thái" — dùng cho thứ thay đổi được!',
      },
      {
        title: 'Chia SER & ESTAR',
        content: '',
        table: {
          headers: ['', 'SER', 'ESTAR'],
          rows: [['Yo', 'soy', 'estoy'], ['Tú', 'eres', 'estás'], ['Él/Ella', 'es', 'está'], ['Nosotros', 'somos', 'estamos'], ['Ellos', 'son', 'están']],
        },
      },
    ],
  },
  {
    id: 'reflexive', title: 'Động từ phản thân', emoji: '🪞', gradient: 'gradient-home',
    sections: [
      {
        title: 'Động từ phản thân là gì?',
        content: 'Hành động tự làm cho mình. Luôn có "se" ở cuối dạng nguyên thể: levantarse, ducharse, acostarse...',
        examples: [
          { spanish: 'Me levanto a las siete.', vietnamese: 'Tôi thức dậy lúc 7 giờ.' },
          { spanish: 'Ella se ducha por la mañana.', vietnamese: 'Cô ấy tắm buổi sáng.' },
          { spanish: 'Nos acostamos a las diez.', vietnamese: 'Chúng tôi đi ngủ lúc 10 giờ.' },
        ],
        memoryTrick: '🧠 Đại từ phản thân: me, te, se, nos, se — đặt TRƯỚC động từ!',
      },
      {
        title: 'Bảng chia: Levantarse (Thức dậy)',
        content: '',
        table: {
          headers: ['Chủ ngữ', 'Đại từ', 'Chia', 'Câu đầy đủ'],
          rows: [['Yo', 'me', 'levanto', 'Me levanto'], ['Tú', 'te', 'levantas', 'Te levantas'], ['Él/Ella', 'se', 'levanta', 'Se levanta'], ['Nosotros', 'nos', 'levantamos', 'Nos levantamos'], ['Ellos', 'se', 'levantan', 'Se levantan']],
        },
      },
    ],
  },
  {
    id: 'past-tense', title: 'Thì quá khứ', emoji: '⏪', gradient: 'gradient-shopping',
    sections: [
      {
        title: 'Pretérito Perfecto (Đã + vẫn liên quan)',
        content: 'Dùng cho hành động vừa xảy ra hoặc còn liên quan đến hiện tại. Công thức: haber + participio',
        table: {
          headers: ['Chủ ngữ', 'Haber', 'Ví dụ'],
          rows: [['Yo', 'he', 'he comido (tôi đã ăn)'], ['Tú', 'has', 'has hablado (bạn đã nói)'], ['Él/Ella', 'ha', 'ha bebido (anh ấy đã uống)'], ['Nosotros', 'hemos', 'hemos vivido (chúng tôi đã sống)']],
        },
        memoryTrick: '🧠 Participio: -AR → -ado, -ER/-IR → -ido. Ví dụ: hablado, comido, vivido',
      },
      {
        title: 'Pretérito Indefinido (Đã + xong rồi)',
        content: 'Dùng cho hành động đã hoàn tất, không liên quan hiện tại.',
        examples: [
          { spanish: 'Ayer comí arroz.', vietnamese: 'Hôm qua tôi đã ăn cơm.' },
          { spanish: 'El año pasado viajé a España.', vietnamese: 'Năm ngoái tôi đã đi TBN.' },
        ],
      },
    ],
  },
  {
    id: 'future', title: 'Thì tương lai', emoji: '🔮', gradient: 'gradient-social',
    sections: [
      {
        title: 'Ir a + Infinitivo (Sắp / Sẽ)',
        content: 'Cách đơn giản nhất nói về tương lai. Dùng "voy a", "vas a", "va a"...',
        table: {
          headers: ['Chủ ngữ', 'Ir', 'Ví dụ'],
          rows: [['Yo', 'voy a', 'Voy a comer. (Tôi sắp ăn)'], ['Tú', 'vas a', 'Vas a estudiar. (Bạn sắp học)'], ['Él/Ella', 'va a', 'Va a dormir. (Anh ấy sắp ngủ)'], ['Nosotros', 'vamos a', 'Vamos a viajar. (Chúng ta sắp đi)']],
        },
        memoryTrick: '🧠 Giống tiếng Anh "going to"! Voy a = I\'m going to',
        examples: [
          { spanish: 'Mañana voy a estudiar español.', vietnamese: 'Ngày mai tôi sẽ học tiếng TBN.' },
          { spanish: '¿Qué vas a hacer este fin de semana?', vietnamese: 'Cuối tuần bạn sẽ làm gì?' },
        ],
      },
    ],
  },
  {
    id: 'connectors', title: 'Liên từ phổ biến', emoji: '🔗', gradient: 'gradient-tech',
    sections: [
      {
        title: 'Các liên từ thường dùng',
        content: 'Liên từ giúp nối các câu lại thành câu dài, tự nhiên hơn.',
        table: {
          headers: ['Tiếng TBN', 'Tiếng Việt', 'Ví dụ'],
          rows: [
            ['porque', 'bởi vì', 'Estudio porque quiero aprender.'],
            ['pero', 'nhưng', 'Quiero ir pero no puedo.'],
            ['aunque', 'mặc dù', 'Aunque llueve, salgo.'],
            ['cuando', 'khi', 'Cuando llego, como.'],
            ['si', 'nếu', 'Si quieres, vamos.'],
            ['que', 'rằng/mà', 'Creo que es verdad.'],
            ['también', 'cũng', 'Yo también quiero ir.'],
            ['además', 'ngoài ra', 'Además, es barato.'],
            ['y', 'và', 'Como arroz y pollo.'],
            ['o', 'hoặc', '¿Café o té?'],
          ],
        },
      },
    ],
  },
];
