export interface ListeningDialogue {
  id: string;
  title: string;
  titleVi: string;
  difficulty: string;
  lines: { speaker: string; spanish: string; vietnamese: string }[];
  questions: { question: string; options: string[]; correct: number }[];
}

export interface PronunciationDrill {
  id: string;
  title: string;
  description: string;
  emoji: string;
  words: { spanish: string; phonetic: string; vietnamese: string }[];
}

export interface ShadowExercise {
  id: string;
  title: string;
  sentences: { spanish: string; vietnamese: string }[];
}

export const SHORT_DIALOGUES: ListeningDialogue[] = [
  {
    id: 'd1', title: 'En la cafetería', titleVi: 'Ở quán cà phê', difficulty: 'Dễ',
    lines: [
      { speaker: '👩‍🍳', spanish: 'Buenos días, ¿qué desea?', vietnamese: 'Chào buổi sáng, bạn muốn gì?' },
      { speaker: '🧑', spanish: 'Un café con leche, por favor.', vietnamese: 'Một ly cà phê sữa, làm ơn.' },
      { speaker: '👩‍🍳', spanish: '¿Grande o pequeño?', vietnamese: 'Lớn hay nhỏ?' },
      { speaker: '🧑', spanish: 'Grande, por favor. ¿Cuánto es?', vietnamese: 'Lớn, làm ơn. Bao nhiêu tiền?' },
      { speaker: '👩‍🍳', spanish: 'Son dos euros con cincuenta.', vietnamese: 'Hai euro năm mươi.' },
      { speaker: '🧑', spanish: 'Aquí tiene. Gracias.', vietnamese: 'Đây ạ. Cảm ơn.' },
    ],
    questions: [
      { question: 'Khách gọi gì?', options: ['Trà', 'Cà phê sữa', 'Nước cam', 'Bia'], correct: 1 },
      { question: 'Khách chọn size nào?', options: ['Nhỏ', 'Vừa', 'Lớn'], correct: 2 },
      { question: 'Giá bao nhiêu?', options: ['1.50€', '2.00€', '2.50€', '3.00€'], correct: 2 },
    ],
  },
  {
    id: 'd2', title: 'En el supermercado', titleVi: 'Ở siêu thị', difficulty: 'Dễ',
    lines: [
      { speaker: '🧑', spanish: 'Perdone, ¿dónde está la leche?', vietnamese: 'Xin lỗi, sữa ở đâu?' },
      { speaker: '👩‍💼', spanish: 'Está en el pasillo tres, a la derecha.', vietnamese: 'Ở lối đi số 3, bên phải.' },
      { speaker: '🧑', spanish: 'Gracias. ¿Y el pan?', vietnamese: 'Cảm ơn. Còn bánh mì?' },
      { speaker: '👩‍💼', spanish: 'El pan está al fondo, junto a la panadería.', vietnamese: 'Bánh mì ở phía cuối, cạnh tiệm bánh.' },
      { speaker: '🧑', spanish: 'Muchas gracias por su ayuda.', vietnamese: 'Cảm ơn sự giúp đỡ của bạn.' },
    ],
    questions: [
      { question: 'Sữa ở lối đi mấy?', options: ['Lối 1', 'Lối 2', 'Lối 3', 'Lối 4'], correct: 2 },
      { question: 'Bánh mì ở đâu?', options: ['Bên trái', 'Phía cuối', 'Tầng 2', 'Ngoài cửa'], correct: 1 },
    ],
  },
  {
    id: 'd3', title: 'En el médico', titleVi: 'Ở phòng khám', difficulty: 'Trung bình',
    lines: [
      { speaker: '👨‍⚕️', spanish: 'Buenos días. ¿Qué le pasa?', vietnamese: 'Chào buổi sáng. Bạn bị sao?' },
      { speaker: '🧑', spanish: 'Me duele la cabeza y tengo fiebre.', vietnamese: 'Tôi đau đầu và bị sốt.' },
      { speaker: '👨‍⚕️', spanish: '¿Desde cuándo tiene estos síntomas?', vietnamese: 'Bạn bị triệu chứng này từ bao giờ?' },
      { speaker: '🧑', spanish: 'Desde ayer por la noche.', vietnamese: 'Từ tối hôm qua.' },
      { speaker: '👨‍⚕️', spanish: 'Tome estas pastillas dos veces al día.', vietnamese: 'Uống thuốc này hai lần mỗi ngày.' },
      { speaker: '🧑', spanish: 'Gracias, doctor.', vietnamese: 'Cảm ơn bác sĩ.' },
    ],
    questions: [
      { question: 'Bệnh nhân bị gì?', options: ['Đau bụng', 'Đau đầu và sốt', 'Đau chân', 'Ho'], correct: 1 },
      { question: 'Uống thuốc mấy lần/ngày?', options: ['1 lần', '2 lần', '3 lần', '4 lần'], correct: 1 },
    ],
  },
  {
    id: 'd4', title: 'En el hotel', titleVi: 'Ở khách sạn', difficulty: 'Trung bình',
    lines: [
      { speaker: '🧑', spanish: 'Buenas tardes. Tengo una reserva.', vietnamese: 'Chào buổi chiều. Tôi có đặt phòng.' },
      { speaker: '👩‍💼', spanish: '¿A nombre de quién?', vietnamese: 'Đặt dưới tên gì ạ?' },
      { speaker: '🧑', spanish: 'A nombre de García.', vietnamese: 'Tên García.' },
      { speaker: '👩‍💼', spanish: 'Sí, una habitación doble para tres noches.', vietnamese: 'Vâng, phòng đôi cho 3 đêm.' },
      { speaker: '🧑', spanish: '¿El desayuno está incluido?', vietnamese: 'Có bao gồm bữa sáng không?' },
      { speaker: '👩‍💼', spanish: 'Sí, de siete a diez de la mañana.', vietnamese: 'Có, từ 7 đến 10 giờ sáng.' },
    ],
    questions: [
      { question: 'Loại phòng nào?', options: ['Phòng đơn', 'Phòng đôi', 'Suite', 'Phòng gia đình'], correct: 1 },
      { question: 'Ở mấy đêm?', options: ['1 đêm', '2 đêm', '3 đêm', '5 đêm'], correct: 2 },
    ],
  },
  {
    id: 'd5', title: 'En la fiesta', titleVi: 'Ở buổi tiệc', difficulty: 'Khó',
    lines: [
      { speaker: '🧑', spanish: '¡Hola! Me llamo Carlos. ¿Y tú?', vietnamese: 'Xin chào! Tôi tên Carlos. Còn bạn?' },
      { speaker: '👩', spanish: 'Hola Carlos, soy María. Encantada.', vietnamese: 'Chào Carlos, tôi là María. Rất vui.' },
      { speaker: '🧑', spanish: '¿De dónde eres, María?', vietnamese: 'Bạn đến từ đâu, María?' },
      { speaker: '👩', spanish: 'Soy de Sevilla, pero ahora vivo en Madrid.', vietnamese: 'Tôi từ Sevilla, nhưng hiện sống ở Madrid.' },
      { speaker: '🧑', spanish: '¡Qué interesante! ¿A qué te dedicas?', vietnamese: 'Hay quá! Bạn làm nghề gì?' },
      { speaker: '👩', spanish: 'Soy profesora de español. ¿Y tú?', vietnamese: 'Tôi là giáo viên tiếng TBN. Còn bạn?' },
    ],
    questions: [
      { question: 'María từ đâu?', options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'], correct: 2 },
      { question: 'María làm nghề gì?', options: ['Bác sĩ', 'Giáo viên', 'Kỹ sư', 'Ca sĩ'], correct: 1 },
    ],
  },
];

export const PRONUNCIATION_DRILLS: PronunciationDrill[] = [
  {
    id: 'rr', title: 'Âm RR (rung lưỡi)', description: 'Âm khó nhất! Rung đầu lưỡi', emoji: '🔊',
    words: [
      { spanish: 'perro', phonetic: 'pe-rrô', vietnamese: 'con chó' },
      { spanish: 'carro', phonetic: 'ca-rrô', vietnamese: 'xe hơi' },
      { spanish: 'arroz', phonetic: 'a-rrôt', vietnamese: 'cơm' },
      { spanish: 'guitarra', phonetic: 'ghi-ta-rra', vietnamese: 'guitar' },
      { spanish: 'correr', phonetic: 'cô-rre', vietnamese: 'chạy' },
    ],
  },
  {
    id: 'll', title: 'Âm LL và Y', description: 'Phát âm giống "gi" trong tiếng Việt', emoji: '👅',
    words: [
      { spanish: 'llave', phonetic: 'gia-ve', vietnamese: 'chìa khóa' },
      { spanish: 'calle', phonetic: 'ca-gie', vietnamese: 'đường phố' },
      { spanish: 'pollo', phonetic: 'pô-giô', vietnamese: 'gà' },
      { spanish: 'yo', phonetic: 'giô', vietnamese: 'tôi' },
      { spanish: 'playa', phonetic: 'pla-gia', vietnamese: 'bãi biển' },
    ],
  },
  {
    id: 'bv', title: 'B vs V', description: 'Trong tiếng TBN, B và V phát âm giống nhau!', emoji: '🤔',
    words: [
      { spanish: 'vino', phonetic: 'bi-nô', vietnamese: 'rượu vang' },
      { spanish: 'bien', phonetic: 'bi-en', vietnamese: 'tốt' },
      { spanish: 'beber', phonetic: 'be-be', vietnamese: 'uống' },
      { spanish: 'vivir', phonetic: 'bi-bi', vietnamese: 'sống' },
      { spanish: 'volver', phonetic: 'bol-be', vietnamese: 'quay lại' },
    ],
  },
  {
    id: 'vowels', title: 'Nguyên âm thuần', description: '5 nguyên âm luôn phát âm giống nhau', emoji: '🎵',
    words: [
      { spanish: 'a - casa', phonetic: 'a (như "a" tiếng Việt)', vietnamese: 'nhà' },
      { spanish: 'e - mesa', phonetic: 'e (như "ê" tiếng Việt)', vietnamese: 'bàn' },
      { spanish: 'i - amigo', phonetic: 'i (như "i" tiếng Việt)', vietnamese: 'bạn' },
      { spanish: 'o - como', phonetic: 'o (như "ô" tiếng Việt)', vietnamese: 'ăn' },
      { spanish: 'u - uno', phonetic: 'u (như "u" tiếng Việt)', vietnamese: 'một' },
    ],
  },
];

export const SHADOW_EXERCISES: ShadowExercise[] = [
  {
    id: 's1', title: 'Chào hỏi cơ bản',
    sentences: [
      { spanish: 'Hola, ¿cómo estás?', vietnamese: 'Xin chào, bạn khỏe không?' },
      { spanish: 'Estoy bien, gracias. ¿Y tú?', vietnamese: 'Tôi khỏe, cảm ơn. Còn bạn?' },
      { spanish: 'Me llamo María. Encantada.', vietnamese: 'Tôi tên María. Rất vui.' },
      { spanish: 'Soy de Vietnam.', vietnamese: 'Tôi từ Việt Nam.' },
    ],
  },
  {
    id: 's2', title: 'Gọi đồ ăn',
    sentences: [
      { spanish: 'Quiero una mesa para dos, por favor.', vietnamese: 'Tôi muốn bàn cho 2 người, làm ơn.' },
      { spanish: '¿Qué me recomienda?', vietnamese: 'Bạn gợi ý gì cho tôi?' },
      { spanish: 'Voy a tomar la paella, por favor.', vietnamese: 'Tôi sẽ gọi paella, làm ơn.' },
      { spanish: 'La cuenta, por favor.', vietnamese: 'Tính tiền, làm ơn.' },
    ],
  },
  {
    id: 's3', title: 'Hỏi đường',
    sentences: [
      { spanish: 'Perdone, ¿dónde está el metro?', vietnamese: 'Xin lỗi, tàu điện ngầm ở đâu?' },
      { spanish: 'Siga todo recto y gire a la derecha.', vietnamese: 'Đi thẳng rồi rẽ phải.' },
      { spanish: '¿Está lejos de aquí?', vietnamese: 'Có xa đây không?' },
      { spanish: 'No, está a cinco minutos andando.', vietnamese: 'Không, đi bộ 5 phút.' },
    ],
  },
];
