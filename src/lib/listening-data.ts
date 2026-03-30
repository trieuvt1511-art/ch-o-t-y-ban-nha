export interface ListeningVideo {
  id: string;
  title: string;
  titleVi: string;
  youtubeId: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  duration: string;
  description: string;
  questions: ListeningQuestion[];
}

export interface ListeningQuestion {
  id: string;
  question: string;
  questionVi: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FilmExcerpt {
  id: string;
  filmTitle: string;
  filmTitleVi: string;
  scene: string;
  sceneVi: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó';
  dialogue: { speaker: string; spanish: string; vietnamese: string }[];
  fillBlanks: FillBlankExercise[];
}

export interface FillBlankExercise {
  id: string;
  sentence: string; // with ___ for blank
  answer: string;
  hint: string;
}

export const LISTENING_VIDEOS: ListeningVideo[] = [
  {
    id: 'v1',
    title: 'Español para principiantes',
    titleVi: 'Tiếng TBN cho người mới',
    youtubeId: 'DAp_v7EH9AA',
    difficulty: 'Dễ',
    duration: '10:23',
    description: 'Video cơ bản với phụ đề, giới thiệu các câu hội thoại hàng ngày.',
    questions: [
      { id: 'q1', question: '¿Cómo se dice "xin chào" en español?', questionVi: '"Xin chào" trong tiếng TBN là gì?', options: ['Hola', 'Adiós', 'Gracias', 'Buenos'], correctIndex: 0, explanation: '"Hola" là cách nói "xin chào" phổ biến nhất.' },
      { id: 'q2', question: '¿Qué significa "gracias"?', questionVi: '"Gracias" có nghĩa là gì?', options: ['Xin lỗi', 'Cảm ơn', 'Tạm biệt', 'Xin chào'], correctIndex: 1, explanation: '"Gracias" = cảm ơn, từ rất quan trọng trong giao tiếp.' },
    ],
  },
  {
    id: 'v2',
    title: 'Conversaciones en el restaurante',
    titleVi: 'Hội thoại trong nhà hàng',
    youtubeId: 'LIQsyHoLudQ',
    difficulty: 'Trung bình',
    duration: '8:45',
    description: 'Nghe hội thoại thực tế khi đi ăn nhà hàng tại Tây Ban Nha.',
    questions: [
      { id: 'q3', question: '¿Qué pide el cliente primero?', questionVi: 'Khách hàng gọi gì đầu tiên?', options: ['La cuenta', 'Una bebida', 'El postre', 'Pan'], correctIndex: 1, explanation: 'Thường thì khách sẽ gọi đồ uống trước khi xem menu.' },
      { id: 'q4', question: '¿Cómo se pide la cuenta?', questionVi: 'Làm sao để xin hóa đơn?', options: ['¿Cuánto vale?', 'La cuenta, por favor', '¿Tiene cambio?', 'Quiero pagar'], correctIndex: 1, explanation: '"La cuenta, por favor" là cách lịch sự nhất để xin hóa đơn.' },
    ],
  },
  {
    id: 'v3',
    title: 'Viaje por España',
    titleVi: 'Du lịch Tây Ban Nha',
    youtubeId: 'q6bJkJxmEqk',
    difficulty: 'Khó',
    duration: '12:30',
    description: 'Vlog du lịch Tây Ban Nha với giọng nói tự nhiên, tốc độ bình thường.',
    questions: [
      { id: 'q5', question: '¿Cuál es la capital de España?', questionVi: 'Thủ đô của TBN là gì?', options: ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'], correctIndex: 1, explanation: 'Madrid là thủ đô của Tây Ban Nha từ năm 1561.' },
      { id: 'q6', question: '¿Qué es la paella?', questionVi: 'Paella là gì?', options: ['Một điệu nhảy', 'Món cơm truyền thống', 'Loại rượu', 'Nhạc cụ'], correctIndex: 1, explanation: 'Paella là món cơm truyền thống nổi tiếng của vùng Valencia.' },
    ],
  },
];

export const FILM_EXCERPTS: FilmExcerpt[] = [
  {
    id: 'f1',
    filmTitle: 'El secreto de sus ojos',
    filmTitleVi: 'Bí mật trong mắt',
    scene: 'Escena del café',
    sceneVi: 'Cảnh quán cafe',
    difficulty: 'Trung bình',
    dialogue: [
      { speaker: 'Benjamín', spanish: '¿Puedo hacerte una pregunta?', vietnamese: 'Tôi có thể hỏi bạn một câu không?' },
      { speaker: 'Irene', spanish: 'Claro, dime.', vietnamese: 'Tất nhiên, nói đi.' },
      { speaker: 'Benjamín', spanish: '¿Alguna vez pensaste en lo que podría haber sido?', vietnamese: 'Bạn đã bao giờ nghĩ về những gì có thể đã xảy ra chưa?' },
      { speaker: 'Irene', spanish: 'Todos los días de mi vida.', vietnamese: 'Mỗi ngày trong đời tôi.' },
    ],
    fillBlanks: [
      { id: 'fb1', sentence: '¿Puedo ___ una pregunta?', answer: 'hacerte', hint: 'Động từ "hacer" + "te" (cho bạn)' },
      { id: 'fb2', sentence: '¿Alguna vez ___ en lo que podría haber sido?', answer: 'pensaste', hint: 'Động từ "pensar" chia ở thì quá khứ (tú)' },
    ],
  },
  {
    id: 'f2',
    filmTitle: 'Coco (Pixar)',
    filmTitleVi: 'Coco - Hội Ngộ Diệu Kỳ',
    scene: 'Miguel canta "Recuérdame"',
    sceneVi: 'Miguel hát "Hãy nhớ tôi"',
    difficulty: 'Dễ',
    dialogue: [
      { speaker: 'Miguel', spanish: 'Recuérdame, hoy me tengo que ir, mi amor.', vietnamese: 'Hãy nhớ tôi, hôm nay tôi phải đi, tình yêu ơi.' },
      { speaker: 'Miguel', spanish: 'Recuérdame, no llores por favor.', vietnamese: 'Hãy nhớ tôi, đừng khóc nhé.' },
      { speaker: 'Mamá Coco', spanish: '¿Eres tú, Héctor?', vietnamese: 'Có phải con là Héctor không?' },
      { speaker: 'Miguel', spanish: 'Soy Miguel, tu bisnieto.', vietnamese: 'Con là Miguel, chắt của bà.' },
    ],
    fillBlanks: [
      { id: 'fb3', sentence: 'Recuérdame, hoy me ___ que ir.', answer: 'tengo', hint: 'Động từ "tener" chia ở ngôi thứ nhất (yo)' },
      { id: 'fb4', sentence: 'Recuérdame, no ___ por favor.', answer: 'llores', hint: 'Động từ "llorar" ở dạng mệnh lệnh phủ định (tú)' },
    ],
  },
  {
    id: 'f3',
    filmTitle: 'La Casa de Papel',
    filmTitleVi: 'Phi Vụ Triệu Đô',
    scene: 'El Profesor explica el plan',
    sceneVi: 'Giáo sư giải thích kế hoạch',
    difficulty: 'Khó',
    dialogue: [
      { speaker: 'Profesor', spanish: 'Vamos a entrar en la Fábrica Nacional de Moneda y Timbre.', vietnamese: 'Chúng ta sẽ vào Nhà máy in tiền quốc gia.' },
      { speaker: 'Tokio', spanish: '¿Estás loco? Eso es imposible.', vietnamese: 'Ông điên à? Điều đó bất khả thi.' },
      { speaker: 'Profesor', spanish: 'No vamos a robar a nadie. Vamos a imprimir nuestro propio dinero.', vietnamese: 'Chúng ta không cướp ai cả. Chúng ta sẽ in tiền của riêng mình.' },
      { speaker: 'Berlín', spanish: 'Genial. Me gusta el plan.', vietnamese: 'Tuyệt. Tôi thích kế hoạch này.' },
    ],
    fillBlanks: [
      { id: 'fb5', sentence: 'Vamos a ___ en la Fábrica Nacional.', answer: 'entrar', hint: 'Động từ nguyên mẫu nghĩa là "vào"' },
      { id: 'fb6', sentence: 'No vamos a ___ a nadie.', answer: 'robar', hint: 'Động từ nguyên mẫu nghĩa là "cướp/ăn trộm"' },
    ],
  },
];
