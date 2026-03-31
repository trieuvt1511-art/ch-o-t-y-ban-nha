// Daily phrases pool
export const DAILY_PHRASES = [
  { spanish: '¡Buenos días, familia!', vietnamese: 'Chào buổi sáng, gia đình!' },
  { spanish: '¿Cómo estás hoy?', vietnamese: 'Hôm nay bạn khỏe không?' },
  { spanish: 'Te quiero mucho.', vietnamese: 'Yêu bạn rất nhiều.' },
  { spanish: '¡Vamos a estudiar juntos!', vietnamese: 'Cùng nhau học nào!' },
  { spanish: '¿Qué quieres comer?', vietnamese: 'Bạn muốn ăn gì?' },
  { spanish: 'Hoy hace buen tiempo.', vietnamese: 'Hôm nay trời đẹp.' },
  { spanish: '¡Estoy muy contento!', vietnamese: 'Tôi rất vui!' },
  { spanish: 'Vamos al parque.', vietnamese: 'Đi công viên nào.' },
  { spanish: '¿Puedes ayudarme?', vietnamese: 'Giúp tôi được không?' },
  { spanish: '¡Buenas noches!', vietnamese: 'Chúc ngủ ngon!' },
  { spanish: 'Me gusta cocinar contigo.', vietnamese: 'Tôi thích nấu ăn với bạn.' },
  { spanish: '¿Dónde están las llaves?', vietnamese: 'Chìa khóa ở đâu?' },
  { spanish: 'Necesito ir al supermercado.', vietnamese: 'Tôi cần đi siêu thị.' },
  { spanish: '¡Qué rico está!', vietnamese: 'Ngon quá!' },
  { spanish: 'Vamos a pasear al perro.', vietnamese: 'Đi dắt chó đi dạo.' },
  { spanish: '¿Quieres ver una película?', vietnamese: 'Muốn xem phim không?' },
  { spanish: 'Estoy cansado, voy a descansar.', vietnamese: 'Tôi mệt, đi nghỉ.' },
  { spanish: '¡Feliz cumpleaños!', vietnamese: 'Chúc mừng sinh nhật!' },
  { spanish: '¿A qué hora cenamos?', vietnamese: 'Mấy giờ ăn tối?' },
  { spanish: 'El fin de semana vamos a la playa.', vietnamese: 'Cuối tuần đi biển.' },
  { spanish: '¡Ánimo, tú puedes!', vietnamese: 'Cố lên, bạn làm được!' },
  { spanish: 'Hoy es un gran día.', vietnamese: 'Hôm nay là ngày tuyệt vời.' },
  { spanish: '¿Quieres un café?', vietnamese: 'Bạn muốn cà phê không?' },
  { spanish: 'Vamos a jugar juntos.', vietnamese: 'Chơi cùng nhau nào.' },
  { spanish: 'Echo de menos a la abuela.', vietnamese: 'Nhớ bà ngoại quá.' },
  { spanish: '¡Qué bonito día!', vietnamese: 'Ngày đẹp quá!' },
  { spanish: 'Necesito estudiar más.', vietnamese: 'Tôi cần học thêm.' },
  { spanish: '¿Me pasas la sal?', vietnamese: 'Đưa muối giúp tôi?' },
  { spanish: '¡Buen trabajo, familia!', vietnamese: 'Làm tốt lắm, gia đình!' },
  { spanish: 'Mañana tenemos que madrugar.', vietnamese: 'Ngày mai phải dậy sớm.' },
];

export const WEEKLY_QUESTS = [
  { title: 'Cả nhà học 50 từ về đồ ăn 🍕', target: 50, category: 'food' },
  { title: 'Hoàn thành 10 hội thoại mua sắm 🛍️', target: 10, category: 'shopping' },
  { title: 'Luyện phát âm R/RR 30 lần 🔊', target: 30, category: 'pronunciation' },
  { title: 'Xây 20 câu dài cấp Intermediate 📝', target: 20, category: 'grammar' },
  { title: 'Nghe 15 podcast mini 🎙️', target: 15, category: 'listening' },
  { title: 'Học 40 từ về gia đình & nhà cửa 🏠', target: 40, category: 'family' },
  { title: 'Thách đấu 5 trận trong tuần ⚔️', target: 5, category: 'duel' },
  { title: 'Gửi 10 tin nhắn Voice Board 🎤', target: 10, category: 'voice' },
];

export const DUEL_QUESTIONS = [
  { spanish: '¿Cómo se dice "manzana"?', options: ['Táo', 'Cam', 'Chuối', 'Nho'], correct: 0 },
  { spanish: '¿Qué significa "hermano"?', options: ['Bố', 'Mẹ', 'Anh/Em trai', 'Chị/Em gái'], correct: 2 },
  { spanish: '"Buenos días" nghĩa là gì?', options: ['Chào buổi tối', 'Chào buổi sáng', 'Tạm biệt', 'Cảm ơn'], correct: 1 },
  { spanish: '¿Cómo se dice "agua"?', options: ['Sữa', 'Nước', 'Cà phê', 'Trà'], correct: 1 },
  { spanish: '"Gracias" nghĩa là gì?', options: ['Xin lỗi', 'Xin chào', 'Cảm ơn', 'Tạm biệt'], correct: 2 },
  { spanish: '¿Qué significa "casa"?', options: ['Trường', 'Nhà', 'Công ty', 'Bệnh viện'], correct: 1 },
  { spanish: '"Yo como arroz" nghĩa là?', options: ['Tôi uống nước', 'Tôi ăn cơm', 'Tôi ngủ', 'Tôi chạy'], correct: 1 },
  { spanish: '¿Cómo se dice "perro"?', options: ['Mèo', 'Chó', 'Chim', 'Cá'], correct: 1 },
  { spanish: '"Buenas noches" nghĩa là?', options: ['Chào buổi sáng', 'Chào buổi chiều', 'Chúc ngủ ngon', 'Tạm biệt'], correct: 2 },
  { spanish: '¿Qué significa "grande"?', options: ['Nhỏ', 'Lớn', 'Dài', 'Ngắn'], correct: 1 },
  { spanish: '"Me llamo" nghĩa là?', options: ['Tôi thích', 'Tôi tên là', 'Tôi muốn', 'Tôi cần'], correct: 1 },
  { spanish: '¿Cómo se dice "leche"?', options: ['Nước', 'Sữa', 'Bia', 'Rượu'], correct: 1 },
  { spanish: '"Rojo" là màu gì?', options: ['Xanh', 'Vàng', 'Đỏ', 'Trắng'], correct: 2 },
  { spanish: '¿Qué significa "comer"?', options: ['Uống', 'Ăn', 'Ngủ', 'Chạy'], correct: 1 },
  { spanish: '"La playa" là gì?', options: ['Núi', 'Sông', 'Biển', 'Hồ'], correct: 2 },
  { spanish: '¿Cómo se dice "libro"?', options: ['Bút', 'Sách', 'Bàn', 'Ghế'], correct: 1 },
  { spanish: '"Feliz" nghĩa là?', options: ['Buồn', 'Vui', 'Mệt', 'Giận'], correct: 1 },
  { spanish: '¿Qué significa "trabajar"?', options: ['Chơi', 'Học', 'Làm việc', 'Ngủ'], correct: 2 },
  { spanish: '"El gato" là con gì?', options: ['Chó', 'Mèo', 'Chim', 'Cá'], correct: 1 },
  { spanish: '¿Cómo se dice "sol"?', options: ['Mưa', 'Gió', 'Mặt trời', 'Mây'], correct: 2 },
];

export const MEMBER_COLORS = [
  'hsl(5 78% 57%)',     // red
  'hsl(37 90% 55%)',    // orange  
  'hsl(145 63% 42%)',   // green
  'hsl(210 80% 55%)',   // blue
  'hsl(280 60% 55%)',   // purple
  'hsl(340 70% 55%)',   // pink
];

export const CHEER_OPTIONS = [
  { emoji: '❤️', label: 'Trái tim' },
  { emoji: '🔥', label: 'Tiếp tục' },
  { emoji: '⭐', label: 'Tuyệt vời' },
  { emoji: '💪', label: 'Cố lên' },
];

export const STORY_STARTERS = [
  'Un día, la familia González decidió ir de vacaciones.',
  'Era una mañana de domingo y toda la familia se despertó temprano.',
  'Los niños encontraron un mapa del tesoro en el jardín.',
  'La abuela llamó por teléfono con una sorpresa especial.',
  'El perro de la familia escapó y todos salieron a buscarlo.',
];

export const STORY_SUGGESTIONS = [
  ['Fueron al aeropuerto.', 'Prepararon las maletas.', 'Compraron los billetes.'],
  ['Desayunaron juntos.', 'Hicieron un plan.', 'Salieron de casa.'],
  ['Lo abrieron con cuidado.', 'Llamaron a los amigos.', 'Siguieron las pistas.'],
  ['Era su cumpleaños.', 'Tenía un regalo.', 'Quería visitarlos.'],
  ['Miraron por el parque.', 'Pusieron carteles.', 'Preguntaron a los vecinos.'],
];

export function getTodayPhrase() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return DAILY_PHRASES[dayOfYear % DAILY_PHRASES.length];
}

export function getWeeklyQuest() {
  const weekNum = Math.floor(Date.now() / (7 * 86400000));
  return WEEKLY_QUESTS[weekNum % WEEKLY_QUESTS.length];
}

export function getStoryStarter() {
  const weekNum = Math.floor(Date.now() / (7 * 86400000));
  return {
    starter: STORY_STARTERS[weekNum % STORY_STARTERS.length],
    suggestions: STORY_SUGGESTIONS[weekNum % STORY_SUGGESTIONS.length],
  };
}
