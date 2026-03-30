import { Scenario, Category } from './types';

export const EMOJI_OPTIONS = ['😊', '🦊', '🐯', '🌸', '🎨', '🎵', '⚡', '🌈', '🍀', '🦋', '🌺', '🎭'];

export const PROFILE_GRADIENTS = [
  'linear-gradient(135deg, hsl(5 78% 58%), hsl(25 90% 60%))',
  'linear-gradient(135deg, hsl(37 90% 55%), hsl(45 95% 65%))',
  'linear-gradient(135deg, hsl(145 63% 42%), hsl(170 60% 50%))',
  'linear-gradient(135deg, hsl(210 80% 55%), hsl(230 70% 60%))',
  'linear-gradient(135deg, hsl(280 60% 55%), hsl(310 70% 60%))',
];

export const CATEGORIES: { name: Category; emoji: string }[] = [
  { name: 'Ẩm thực', emoji: '🍽️' },
  { name: 'Du lịch', emoji: '✈️' },
  { name: 'Mua sắm', emoji: '🛍️' },
  { name: 'Công việc', emoji: '💼' },
  { name: 'Xã hội', emoji: '👥' },
];

export const SCENARIOS: Scenario[] = [
  // ẨM THỰC
  {
    id: 'restaurant-order',
    category: 'Ẩm thực',
    categoryEmoji: '🍽️',
    title: 'Đặt đồ ăn tại nhà hàng',
    difficulty: 'Dễ',
    xp: 50,
    vocabulary: [
      { id: 'r1', spanish: 'La carta / El menú', vietnamese: 'Thực đơn', phonetic: 'la các-ta / eo mê-nú', example: '¿Puedo ver la carta, por favor?', exampleVi: 'Tôi có thể xem thực đơn được không?' },
      { id: 'r2', spanish: 'Pedir', vietnamese: 'Gọi món', phonetic: 'pê-đia', example: 'Quiero pedir la paella.', exampleVi: 'Tôi muốn gọi món cơm Tây Ban Nha.' },
      { id: 'r3', spanish: 'La cuenta', vietnamese: 'Hóa đơn', phonetic: 'la cu-en-ta', example: 'La cuenta, por favor.', exampleVi: 'Cho tôi hóa đơn.' },
      { id: 'r4', spanish: 'Camarero / Camarera', vietnamese: 'Phục vụ', phonetic: 'ca-ma-rê-rô', example: '¡Camarero! ¿Puede ayudarme?', exampleVi: 'Phục vụ ơi! Bạn có thể giúp tôi không?' },
      { id: 'r5', spanish: 'Reservar una mesa', vietnamese: 'Đặt bàn', phonetic: 'rê-xéc-ba u-na mê-xa', example: 'Quiero reservar una mesa para dos.', exampleVi: 'Tôi muốn đặt bàn cho hai người.' },
      { id: 'r6', spanish: 'De primero / De segundo', vietnamese: 'Món khai vị / Món chính', phonetic: 'đê pri-mê-rô / đê xê-gun-đô', example: 'De primero, quiero la sopa.', exampleVi: 'Món khai vị, tôi muốn súp.' },
      { id: 'r7', spanish: 'El postre', vietnamese: 'Món tráng miệng', phonetic: 'eo pót-trê', example: '¿Qué postres tienen?', exampleVi: 'Quán có những món tráng miệng gì?' },
      { id: 'r8', spanish: 'La propina', vietnamese: 'Tiền boa', phonetic: 'la prô-pi-na', example: 'Voy a dejar propina.', exampleVi: 'Tôi sẽ để tiền boa.' },
      { id: 'r9', spanish: 'Sin gluten', vietnamese: 'Không chứa gluten', phonetic: 'xin glu-ten', example: '¿Tienen opciones sin gluten?', exampleVi: 'Quán có lựa chọn không gluten không?' },
      { id: 'r10', spanish: 'Muy rico', vietnamese: 'Rất ngon', phonetic: 'muy ri-cô', example: '¡Está muy rico!', exampleVi: 'Ngon lắm!' },
      { id: 'r11', spanish: 'Agua con gas / sin gas', vietnamese: 'Nước có ga / không ga', phonetic: 'a-gua con gát / xin gát', example: 'Un agua sin gas, por favor.', exampleVi: 'Một nước không ga, làm ơn.' },
      { id: 'r12', spanish: 'Para llevar', vietnamese: 'Mang đi', phonetic: 'pa-ra giê-ba', example: '¿Puedo pedir para llevar?', exampleVi: 'Tôi có thể gọi mang đi không?' },
    ],
    conversation: [
      { role: 'system', spanish: 'Bạn đang ở nhà hàng Tây Ban Nha. Hãy thực hành đặt món!', vietnamese: '' },
      { role: 'ai', spanish: '¡Buenas tardes! Bienvenido al restaurante. ¿Mesa para cuántos?', vietnamese: 'Chào buổi chiều! Chào mừng đến nhà hàng. Bàn cho mấy người?', tip: '💡 "¿Mesa para cuántos?" là cách hỏi phổ biến khi vào nhà hàng.' },
      { role: 'user', spanish: 'Para dos, por favor.', vietnamese: 'Cho hai người, làm ơn.' },
      { role: 'ai', spanish: 'Perfecto. Aquí tienen la carta. ¿Quieren algo de beber?', vietnamese: 'Tuyệt. Đây là thực đơn. Quý khách muốn uống gì?', tip: '💡 "Algo de beber" = gì đó để uống. Cấu trúc: algo de + động từ.' },
      { role: 'user', spanish: 'Sí, dos aguas sin gas, por favor.', vietnamese: 'Vâng, hai nước không ga, làm ơn.' },
      { role: 'ai', spanish: '¿Ya saben qué van a pedir?', vietnamese: 'Quý khách đã biết muốn gọi gì chưa?', tip: '💡 "¿Ya saben?" = Đã biết chưa? "Ya" thể hiện sự mong đợi.' },
      { role: 'user', spanish: 'De primero, la sopa del día. De segundo, la paella.', vietnamese: 'Khai vị, súp ngày. Món chính, cơm paella.' },
      { role: 'ai', spanish: '¡Excelente elección! La paella es nuestra especialidad. ¿Algo de postre?', vietnamese: 'Lựa chọn tuyệt vời! Paella là đặc sản của chúng tôi. Quý khách muốn tráng miệng gì?', suggestions: ['Sí, ¿qué postres tienen?', 'No, gracias. La cuenta, por favor.', '¿Qué recomienda?'] },
    ],
  },
  // DU LỊCH
  {
    id: 'asking-directions',
    category: 'Du lịch',
    categoryEmoji: '✈️',
    title: 'Hỏi đường',
    difficulty: 'Dễ',
    xp: 40,
    vocabulary: [
      { id: 'd1', spanish: '¿Dónde está...?', vietnamese: '...ở đâu?', phonetic: 'đôn-đê ét-ta', example: '¿Dónde está la estación de metro?', exampleVi: 'Trạm tàu điện ngầm ở đâu?' },
      { id: 'd2', spanish: 'Girar a la derecha', vietnamese: 'Rẽ phải', phonetic: 'hi-ra a la đê-rê-cha', example: 'Gire a la derecha en la esquina.', exampleVi: 'Rẽ phải ở góc đường.' },
      { id: 'd3', spanish: 'Girar a la izquierda', vietnamese: 'Rẽ trái', phonetic: 'hi-ra a la ít-ki-éc-đa', example: 'Gire a la izquierda después del banco.', exampleVi: 'Rẽ trái sau ngân hàng.' },
      { id: 'd4', spanish: 'Seguir recto', vietnamese: 'Đi thẳng', phonetic: 'xê-gia rếch-tô', example: 'Siga recto dos calles.', exampleVi: 'Đi thẳng hai con đường.' },
      { id: 'd5', spanish: 'La esquina', vietnamese: 'Góc đường', phonetic: 'la ét-ki-na', example: 'Está en la esquina.', exampleVi: 'Nó ở góc đường.' },
      { id: 'd6', spanish: 'Cerca / Lejos', vietnamese: 'Gần / Xa', phonetic: 'xéc-ca / lê-hót', example: '¿Está cerca de aquí?', exampleVi: 'Nó gần đây không?' },
      { id: 'd7', spanish: 'La calle', vietnamese: 'Con đường', phonetic: 'la ca-giê', example: 'Es la segunda calle.', exampleVi: 'Là con đường thứ hai.' },
      { id: 'd8', spanish: 'Enfrente de', vietnamese: 'Đối diện', phonetic: 'en-phrên-tê đê', example: 'Está enfrente del parque.', exampleVi: 'Nó đối diện công viên.' },
      { id: 'd9', spanish: 'Al lado de', vietnamese: 'Bên cạnh', phonetic: 'ao la-đô đê', example: 'Está al lado del supermercado.', exampleVi: 'Nó bên cạnh siêu thị.' },
      { id: 'd10', spanish: 'Perdido/a', vietnamese: 'Bị lạc', phonetic: 'péc-đi-đô', example: 'Estoy perdido. ¿Puede ayudarme?', exampleVi: 'Tôi bị lạc. Bạn giúp tôi được không?' },
    ],
    conversation: [
      { role: 'system', spanish: 'Bạn đang đi bộ trên đường phố Madrid và cần hỏi đường.', vietnamese: '' },
      { role: 'ai', spanish: '¡Hola! ¿Necesita ayuda?', vietnamese: 'Xin chào! Bạn cần giúp gì không?', tip: '💡 "¿Necesita ayuda?" là cách lịch sự hỏi ai đó có cần giúp không.' },
      { role: 'user', spanish: 'Sí, estoy perdido. ¿Dónde está el museo?', vietnamese: 'Vâng, tôi bị lạc. Bảo tàng ở đâu?' },
      { role: 'ai', spanish: 'El museo está cerca. Siga recto y gire a la derecha en la segunda calle.', vietnamese: 'Bảo tàng gần đây. Đi thẳng và rẽ phải ở con đường thứ hai.', tip: '💡 Hướng dẫn đường thường theo thứ tự: hướng đi + mốc để rẽ.' },
      { role: 'user', spanish: '¿Está lejos?', vietnamese: 'Xa không?' },
      { role: 'ai', spanish: 'No, está a cinco minutos andando. Está enfrente de un parque grande.', vietnamese: 'Không, cách khoảng 5 phút đi bộ. Nó đối diện một công viên lớn.', suggestions: ['Muchas gracias.', '¿Puede repetir, por favor?', '¿Hay una parada de metro cerca?'] },
    ],
  },
  // CÔNG VIỆC
  {
    id: 'self-introduction',
    category: 'Công việc',
    categoryEmoji: '💼',
    title: 'Giới thiệu bản thân',
    difficulty: 'Dễ',
    xp: 45,
    vocabulary: [
      { id: 'w1', spanish: 'Me llamo...', vietnamese: 'Tôi tên là...', phonetic: 'mê gia-mô', example: 'Me llamo María. Encantada.', exampleVi: 'Tôi tên María. Rất vui được gặp.' },
      { id: 'w2', spanish: 'Soy de...', vietnamese: 'Tôi đến từ...', phonetic: 'xôi đê', example: 'Soy de Vietnam.', exampleVi: 'Tôi đến từ Việt Nam.' },
      { id: 'w3', spanish: 'Tengo... años', vietnamese: 'Tôi... tuổi', phonetic: 'ten-gô... a-nhôt', example: 'Tengo treinta años.', exampleVi: 'Tôi ba mươi tuổi.' },
      { id: 'w4', spanish: 'Trabajo como...', vietnamese: 'Tôi làm nghề...', phonetic: 'tra-ba-hô cô-mô', example: 'Trabajo como ingeniero.', exampleVi: 'Tôi làm kỹ sư.' },
      { id: 'w5', spanish: 'Estudio...', vietnamese: 'Tôi học...', phonetic: 'ét-tu-đi-ô', example: 'Estudio español desde hace un año.', exampleVi: 'Tôi học tiếng Tây Ban Nha được một năm.' },
      { id: 'w6', spanish: 'Me gusta...', vietnamese: 'Tôi thích...', phonetic: 'mê gút-ta', example: 'Me gusta viajar y cocinar.', exampleVi: 'Tôi thích du lịch và nấu ăn.' },
      { id: 'w7', spanish: 'Vivo en...', vietnamese: 'Tôi sống ở...', phonetic: 'bi-bô en', example: 'Vivo en Ciudad Ho Chi Minh.', exampleVi: 'Tôi sống ở Thành phố Hồ Chí Minh.' },
      { id: 'w8', spanish: 'Encantado/a', vietnamese: 'Rất vui được gặp', phonetic: 'en-can-ta-đô', example: '¡Encantado de conocerte!', exampleVi: 'Rất vui được gặp bạn!' },
      { id: 'w9', spanish: 'Mi familia', vietnamese: 'Gia đình tôi', phonetic: 'mi pha-mi-li-a', example: 'Mi familia tiene cuatro personas.', exampleVi: 'Gia đình tôi có bốn người.' },
      { id: 'w10', spanish: 'Mi pasatiempo', vietnamese: 'Sở thích của tôi', phonetic: 'mi pa-xa-ti-em-pô', example: 'Mi pasatiempo es leer.', exampleVi: 'Sở thích của tôi là đọc sách.' },
    ],
    conversation: [
      { role: 'system', spanish: 'Bạn gặp một người mới tại buổi tiệc. Hãy giới thiệu bản thân!', vietnamese: '' },
      { role: 'ai', spanish: '¡Hola! Soy Carlos. ¿Cómo te llamas?', vietnamese: 'Xin chào! Tôi là Carlos. Bạn tên gì?', tip: '💡 "¿Cómo te llamas?" là cách thân mật hỏi tên. Trang trọng hơn: "¿Cómo se llama usted?"' },
      { role: 'user', spanish: '¡Hola! Me llamo Linh. Encantada.', vietnamese: 'Xin chào! Tôi tên Linh. Rất vui được gặp.' },
      { role: 'ai', spanish: '¡Encantado, Linh! ¿De dónde eres?', vietnamese: 'Rất vui, Linh! Bạn đến từ đâu?', tip: '💡 "¿De dónde eres?" = Bạn đến từ đâu? Trả lời: "Soy de..." + tên nước.' },
      { role: 'user', spanish: 'Soy de Vietnam. Vivo en Ciudad Ho Chi Minh.', vietnamese: 'Tôi đến từ Việt Nam. Tôi sống ở TP. Hồ Chí Minh.' },
      { role: 'ai', spanish: '¡Qué interesante! ¿A qué te dedicas?', vietnamese: 'Thú vị quá! Bạn làm nghề gì?', tip: '💡 "¿A qué te dedicas?" là cách phổ biến hỏi nghề nghiệp, tự nhiên hơn "¿Cuál es tu trabajo?"' },
      { role: 'user', spanish: 'Trabajo como diseñadora. Me gusta mucho mi trabajo.', vietnamese: 'Tôi làm thiết kế. Tôi rất thích công việc của mình.' },
      { role: 'ai', spanish: '¡Genial! ¿Y qué haces en tu tiempo libre?', vietnamese: 'Tuyệt! Bạn làm gì trong thời gian rảnh?', suggestions: ['Me gusta viajar y cocinar.', 'Mi pasatiempo es leer libros.', 'Me gusta jugar al fútbol.'] },
    ],
  },
  // Placeholder scenarios (no full content)
  ...generatePlaceholderScenarios(),
];

function generatePlaceholderScenarios(): Scenario[] {
  const placeholders: { title: string; category: Category; emoji: string; difficulty: 'Dễ' | 'Trung bình' | 'Khó'; xp: number }[] = [
    { title: 'Gọi đồ uống tại cafe', category: 'Ẩm thực', emoji: '🍽️', difficulty: 'Dễ', xp: 35 },
    { title: 'Mua đồ ở chợ', category: 'Ẩm thực', emoji: '🍽️', difficulty: 'Trung bình', xp: 55 },
    { title: 'Nấu ăn cùng bạn bè', category: 'Ẩm thực', emoji: '🍽️', difficulty: 'Trung bình', xp: 60 },
    { title: 'Đặt pizza qua điện thoại', category: 'Ẩm thực', emoji: '🍽️', difficulty: 'Khó', xp: 70 },
    { title: 'Đặt phòng khách sạn', category: 'Du lịch', emoji: '✈️', difficulty: 'Trung bình', xp: 55 },
    { title: 'Mua vé xe buýt/tàu', category: 'Du lịch', emoji: '✈️', difficulty: 'Dễ', xp: 40 },
    { title: 'Check-in sân bay', category: 'Du lịch', emoji: '✈️', difficulty: 'Trung bình', xp: 60 },
    { title: 'Tham quan bảo tàng', category: 'Du lịch', emoji: '✈️', difficulty: 'Khó', xp: 65 },
    { title: 'Mua quần áo', category: 'Mua sắm', emoji: '🛍️', difficulty: 'Dễ', xp: 40 },
    { title: 'Hỏi giá cả', category: 'Mua sắm', emoji: '🛍️', difficulty: 'Dễ', xp: 35 },
    { title: 'Đổi/trả hàng', category: 'Mua sắm', emoji: '🛍️', difficulty: 'Trung bình', xp: 55 },
    { title: 'Tìm đường trong siêu thị', category: 'Mua sắm', emoji: '🛍️', difficulty: 'Dễ', xp: 40 },
    { title: 'Mua thuốc ở hiệu thuốc', category: 'Mua sắm', emoji: '🛍️', difficulty: 'Khó', xp: 70 },
    { title: 'Phỏng vấn xin việc', category: 'Công việc', emoji: '💼', difficulty: 'Khó', xp: 80 },
    { title: 'Họp nhóm', category: 'Công việc', emoji: '💼', difficulty: 'Khó', xp: 75 },
    { title: 'Gọi điện cho đối tác', category: 'Công việc', emoji: '💼', difficulty: 'Trung bình', xp: 60 },
    { title: 'Email công việc', category: 'Công việc', emoji: '💼', difficulty: 'Trung bình', xp: 55 },
    { title: 'Kết bạn mới', category: 'Xã hội', emoji: '👥', difficulty: 'Dễ', xp: 40 },
    { title: 'Hẹn hò', category: 'Xã hội', emoji: '👥', difficulty: 'Trung bình', xp: 55 },
    { title: 'Nói về gia đình', category: 'Xã hội', emoji: '👥', difficulty: 'Dễ', xp: 40 },
    { title: 'Thảo luận sở thích', category: 'Xã hội', emoji: '👥', difficulty: 'Dễ', xp: 40 },
    { title: 'Đặt bàn sinh nhật', category: 'Xã hội', emoji: '👥', difficulty: 'Trung bình', xp: 55 },
  ];

  return placeholders.map((p) => ({
    id: p.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    category: p.category,
    categoryEmoji: p.emoji,
    title: p.title,
    difficulty: p.difficulty,
    xp: p.xp,
    vocabulary: [],
    conversation: [],
  }));
}
