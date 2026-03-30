export interface FlashcardWord {
  id: string;
  spanish: string;
  vietnamese: string;
  phonetic: string;
  emoji: string;
  example: string;
  exampleVi: string;
}

export interface FlashcardCategory {
  name: string;
  emoji: string;
  words: FlashcardWord[];
}

const basic: FlashcardWord[] = [
  { id: 'b1', spanish: 'casa', vietnamese: 'nhà', phonetic: 'ca-xa', emoji: '🏠', example: 'Mi casa es grande.', exampleVi: 'Nhà tôi rất lớn.' },
  { id: 'b2', spanish: 'mesa', vietnamese: 'bàn', phonetic: 'me-xa', emoji: '🪑', example: 'La mesa está limpia.', exampleVi: 'Cái bàn sạch sẽ.' },
  { id: 'b3', spanish: 'silla', vietnamese: 'ghế', phonetic: 'xi-gia', emoji: '🪑', example: 'Siéntate en la silla.', exampleVi: 'Ngồi xuống ghế đi.' },
  { id: 'b4', spanish: 'ventana', vietnamese: 'cửa sổ', phonetic: 'ben-ta-na', emoji: '🪟', example: 'Abre la ventana.', exampleVi: 'Mở cửa sổ ra.' },
  { id: 'b5', spanish: 'puerta', vietnamese: 'cửa', phonetic: 'pu-éc-ta', emoji: '🚪', example: 'Cierra la puerta.', exampleVi: 'Đóng cửa lại.' },
  { id: 'b6', spanish: 'libro', vietnamese: 'sách', phonetic: 'li-bờ-rô', emoji: '📖', example: 'Leo un libro.', exampleVi: 'Tôi đọc một cuốn sách.' },
  { id: 'b7', spanish: 'llave', vietnamese: 'chìa khóa', phonetic: 'gia-ve', emoji: '🔑', example: '¿Dónde está la llave?', exampleVi: 'Chìa khóa ở đâu?' },
  { id: 'b8', spanish: 'reloj', vietnamese: 'đồng hồ', phonetic: 'rê-lô', emoji: '⏰', example: 'El reloj marca las tres.', exampleVi: 'Đồng hồ chỉ ba giờ.' },
  { id: 'b9', spanish: 'teléfono', vietnamese: 'điện thoại', phonetic: 'te-lé-phô-nô', emoji: '📱', example: 'Mi teléfono es nuevo.', exampleVi: 'Điện thoại của tôi mới.' },
  { id: 'b10', spanish: 'coche', vietnamese: 'xe hơi', phonetic: 'cô-chê', emoji: '🚗', example: 'El coche es rojo.', exampleVi: 'Xe hơi màu đỏ.' },
];

const verbs: FlashcardWord[] = [
  { id: 'v1', spanish: 'comer', vietnamese: 'ăn', phonetic: 'cô-me', emoji: '🍽️', example: 'Vamos a comer.', exampleVi: 'Chúng ta đi ăn.' },
  { id: 'v2', spanish: 'beber', vietnamese: 'uống', phonetic: 'be-be', emoji: '🥤', example: '¿Quieres beber algo?', exampleVi: 'Bạn muốn uống gì không?' },
  { id: 'v3', spanish: 'hablar', vietnamese: 'nói', phonetic: 'a-bla', emoji: '💬', example: 'Hablo español.', exampleVi: 'Tôi nói tiếng Tây Ban Nha.' },
  { id: 'v4', spanish: 'caminar', vietnamese: 'đi bộ', phonetic: 'ca-mi-na', emoji: '🚶', example: 'Me gusta caminar.', exampleVi: 'Tôi thích đi bộ.' },
  { id: 'v5', spanish: 'trabajar', vietnamese: 'làm việc', phonetic: 'tra-ba-ha', emoji: '💼', example: 'Trabajo mucho.', exampleVi: 'Tôi làm việc nhiều.' },
  { id: 'v6', spanish: 'dormir', vietnamese: 'ngủ', phonetic: 'đo-mi', emoji: '😴', example: 'Necesito dormir.', exampleVi: 'Tôi cần ngủ.' },
  { id: 'v7', spanish: 'leer', vietnamese: 'đọc', phonetic: 'le-e', emoji: '📚', example: 'Me gusta leer.', exampleVi: 'Tôi thích đọc.' },
  { id: 'v8', spanish: 'escribir', vietnamese: 'viết', phonetic: 'ét-cri-bi', emoji: '✍️', example: 'Escribo una carta.', exampleVi: 'Tôi viết một bức thư.' },
  { id: 'v9', spanish: 'correr', vietnamese: 'chạy', phonetic: 'cô-re', emoji: '🏃', example: 'Corro por la mañana.', exampleVi: 'Tôi chạy vào buổi sáng.' },
  { id: 'v10', spanish: 'cocinar', vietnamese: 'nấu ăn', phonetic: 'cô-xi-na', emoji: '👨‍🍳', example: 'Me encanta cocinar.', exampleVi: 'Tôi rất thích nấu ăn.' },
];

const time: FlashcardWord[] = [
  { id: 't1', spanish: 'lunes', vietnamese: 'thứ Hai', phonetic: 'lu-nét', emoji: '📅', example: 'Hoy es lunes.', exampleVi: 'Hôm nay là thứ Hai.' },
  { id: 't2', spanish: 'mañana', vietnamese: 'buổi sáng / ngày mai', phonetic: 'ma-nha-na', emoji: '🌅', example: 'Hasta mañana.', exampleVi: 'Hẹn ngày mai.' },
  { id: 't3', spanish: 'ayer', vietnamese: 'hôm qua', phonetic: 'a-giê', emoji: '⏪', example: 'Ayer fue genial.', exampleVi: 'Hôm qua tuyệt vời.' },
  { id: 't4', spanish: 'semana', vietnamese: 'tuần', phonetic: 'xê-ma-na', emoji: '📆', example: 'La próxima semana.', exampleVi: 'Tuần sau.' },
  { id: 't5', spanish: 'enero', vietnamese: 'tháng Một', phonetic: 'ê-ne-rô', emoji: '❄️', example: 'Enero es frío.', exampleVi: 'Tháng Một lạnh.' },
  { id: 't6', spanish: 'hora', vietnamese: 'giờ', phonetic: 'ô-ra', emoji: '🕐', example: '¿Qué hora es?', exampleVi: 'Mấy giờ rồi?' },
  { id: 't7', spanish: 'hoy', vietnamese: 'hôm nay', phonetic: 'oi', emoji: '📌', example: 'Hoy es un buen día.', exampleVi: 'Hôm nay là ngày đẹp.' },
  { id: 't8', spanish: 'noche', vietnamese: 'đêm', phonetic: 'nô-chê', emoji: '🌙', example: 'Buenas noches.', exampleVi: 'Chúc ngủ ngon.' },
];

const people: FlashcardWord[] = [
  { id: 'p1', spanish: 'familia', vietnamese: 'gia đình', phonetic: 'pha-mi-lia', emoji: '👨‍👩‍👧‍👦', example: 'Mi familia es grande.', exampleVi: 'Gia đình tôi đông.' },
  { id: 'p2', spanish: 'amigo', vietnamese: 'bạn bè', phonetic: 'a-mi-gô', emoji: '🤝', example: 'Él es mi amigo.', exampleVi: 'Anh ấy là bạn tôi.' },
  { id: 'p3', spanish: 'madre', vietnamese: 'mẹ', phonetic: 'ma-đờ-rê', emoji: '👩', example: 'Mi madre cocina bien.', exampleVi: 'Mẹ tôi nấu ăn ngon.' },
  { id: 'p4', spanish: 'padre', vietnamese: 'bố', phonetic: 'pa-đờ-rê', emoji: '👨', example: 'Mi padre trabaja.', exampleVi: 'Bố tôi đi làm.' },
  { id: 'p5', spanish: 'hijo', vietnamese: 'con trai', phonetic: 'i-hô', emoji: '👦', example: 'Mi hijo tiene cinco años.', exampleVi: 'Con trai tôi năm tuổi.' },
  { id: 'p6', spanish: 'hija', vietnamese: 'con gái', phonetic: 'i-ha', emoji: '👧', example: 'Mi hija es inteligente.', exampleVi: 'Con gái tôi thông minh.' },
  { id: 'p7', spanish: 'médico', vietnamese: 'bác sĩ', phonetic: 'mé-đi-cô', emoji: '👨‍⚕️', example: 'El médico me ayudó.', exampleVi: 'Bác sĩ đã giúp tôi.' },
  { id: 'p8', spanish: 'vecino', vietnamese: 'hàng xóm', phonetic: 'be-xi-nô', emoji: '🏘️', example: 'Mi vecino es amable.', exampleVi: 'Hàng xóm tôi thân thiện.' },
];

const food: FlashcardWord[] = [
  { id: 'f1', spanish: 'pan', vietnamese: 'bánh mì', phonetic: 'pan', emoji: '🍞', example: 'Quiero pan.', exampleVi: 'Tôi muốn bánh mì.' },
  { id: 'f2', spanish: 'leche', vietnamese: 'sữa', phonetic: 'le-chê', emoji: '🥛', example: 'Bebo leche.', exampleVi: 'Tôi uống sữa.' },
  { id: 'f3', spanish: 'agua', vietnamese: 'nước', phonetic: 'a-gua', emoji: '💧', example: 'Dame agua, por favor.', exampleVi: 'Cho tôi nước, làm ơn.' },
  { id: 'f4', spanish: 'café', vietnamese: 'cà phê', phonetic: 'ca-phê', emoji: '☕', example: 'Un café con leche.', exampleVi: 'Một ly cà phê sữa.' },
  { id: 'f5', spanish: 'arroz', vietnamese: 'cơm / gạo', phonetic: 'a-rrôt', emoji: '🍚', example: 'Como arroz todos los días.', exampleVi: 'Tôi ăn cơm mỗi ngày.' },
  { id: 'f6', spanish: 'pollo', vietnamese: 'gà', phonetic: 'pô-giô', emoji: '🍗', example: 'El pollo está rico.', exampleVi: 'Gà ngon lắm.' },
  { id: 'f7', spanish: 'fruta', vietnamese: 'trái cây', phonetic: 'phờ-ru-ta', emoji: '🍎', example: 'Me gustan las frutas.', exampleVi: 'Tôi thích trái cây.' },
  { id: 'f8', spanish: 'pescado', vietnamese: 'cá', phonetic: 'pét-ca-đô', emoji: '🐟', example: 'El pescado está fresco.', exampleVi: 'Cá rất tươi.' },
];

const colors: FlashcardWord[] = [
  { id: 'c1', spanish: 'rojo', vietnamese: 'đỏ', phonetic: 'rô-hô', emoji: '🔴', example: 'El coche es rojo.', exampleVi: 'Xe hơi màu đỏ.' },
  { id: 'c2', spanish: 'azul', vietnamese: 'xanh dương', phonetic: 'a-xul', emoji: '🔵', example: 'El cielo es azul.', exampleVi: 'Bầu trời màu xanh.' },
  { id: 'c3', spanish: 'verde', vietnamese: 'xanh lá', phonetic: 'be-đê', emoji: '🟢', example: 'La hierba es verde.', exampleVi: 'Cỏ màu xanh lá.' },
  { id: 'c4', spanish: 'grande', vietnamese: 'lớn', phonetic: 'gran-đê', emoji: '📐', example: 'La casa es grande.', exampleVi: 'Ngôi nhà lớn.' },
  { id: 'c5', spanish: 'pequeño', vietnamese: 'nhỏ', phonetic: 'pê-ke-nhô', emoji: '🔹', example: 'Es un perro pequeño.', exampleVi: 'Đó là con chó nhỏ.' },
  { id: 'c6', spanish: 'blanco', vietnamese: 'trắng', phonetic: 'blan-cô', emoji: '⚪', example: 'La nieve es blanca.', exampleVi: 'Tuyết màu trắng.' },
  { id: 'c7', spanish: 'negro', vietnamese: 'đen', phonetic: 'ne-grô', emoji: '⚫', example: 'El gato es negro.', exampleVi: 'Con mèo đen.' },
  { id: 'c8', spanish: 'amarillo', vietnamese: 'vàng', phonetic: 'a-ma-ri-giô', emoji: '🟡', example: 'El sol es amarillo.', exampleVi: 'Mặt trời màu vàng.' },
];

const feelings: FlashcardWord[] = [
  { id: 'fe1', spanish: 'feliz', vietnamese: 'hạnh phúc', phonetic: 'phê-lít', emoji: '😊', example: 'Estoy feliz.', exampleVi: 'Tôi hạnh phúc.' },
  { id: 'fe2', spanish: 'triste', vietnamese: 'buồn', phonetic: 'trít-tê', emoji: '😢', example: 'Estoy triste.', exampleVi: 'Tôi buồn.' },
  { id: 'fe3', spanish: 'cansado', vietnamese: 'mệt', phonetic: 'can-xa-đô', emoji: '😫', example: 'Estoy cansado.', exampleVi: 'Tôi mệt.' },
  { id: 'fe4', spanish: 'emocionado', vietnamese: 'hào hứng', phonetic: 'ê-mô-xiô-na-đô', emoji: '🤩', example: 'Estoy emocionado.', exampleVi: 'Tôi rất hào hứng.' },
  { id: 'fe5', spanish: 'nervioso', vietnamese: 'lo lắng', phonetic: 'ne-bi-ô-xô', emoji: '😰', example: 'Estoy nervioso.', exampleVi: 'Tôi lo lắng.' },
  { id: 'fe6', spanish: 'enfadado', vietnamese: 'tức giận', phonetic: 'en-pha-đa-đô', emoji: '😠', example: 'No estés enfadado.', exampleVi: 'Đừng tức giận.' },
  { id: 'fe7', spanish: 'sorprendido', vietnamese: 'ngạc nhiên', phonetic: 'xo-pren-đi-đô', emoji: '😲', example: 'Estoy sorprendido.', exampleVi: 'Tôi ngạc nhiên.' },
  { id: 'fe8', spanish: 'tranquilo', vietnamese: 'bình tĩnh', phonetic: 'tran-ki-lô', emoji: '😌', example: 'Estoy tranquilo.', exampleVi: 'Tôi bình tĩnh.' },
];

const numbers: FlashcardWord[] = [
  { id: 'n1', spanish: 'uno', vietnamese: 'một', phonetic: 'u-nô', emoji: '1️⃣', example: 'Tengo uno.', exampleVi: 'Tôi có một.' },
  { id: 'n2', spanish: 'cien', vietnamese: 'một trăm', phonetic: 'xiên', emoji: '💯', example: 'Cuesta cien euros.', exampleVi: 'Giá một trăm euro.' },
  { id: 'n3', spanish: 'precio', vietnamese: 'giá', phonetic: 'pre-xiô', emoji: '💰', example: '¿Cuál es el precio?', exampleVi: 'Giá bao nhiêu?' },
  { id: 'n4', spanish: 'barato', vietnamese: 'rẻ', phonetic: 'ba-ra-tô', emoji: '🏷️', example: 'Es muy barato.', exampleVi: 'Rẻ lắm.' },
  { id: 'n5', spanish: 'caro', vietnamese: 'đắt', phonetic: 'ca-rô', emoji: '💎', example: 'Es muy caro.', exampleVi: 'Đắt lắm.' },
  { id: 'n6', spanish: 'dinero', vietnamese: 'tiền', phonetic: 'đi-ne-rô', emoji: '💵', example: 'No tengo dinero.', exampleVi: 'Tôi không có tiền.' },
  { id: 'n7', spanish: 'diez', vietnamese: 'mười', phonetic: 'đi-ết', emoji: '🔟', example: 'Son las diez.', exampleVi: 'Mười giờ rồi.' },
  { id: 'n8', spanish: 'mil', vietnamese: 'một ngàn', phonetic: 'mil', emoji: '🔢', example: 'Cuesta mil pesos.', exampleVi: 'Giá một ngàn peso.' },
];

const body: FlashcardWord[] = [
  { id: 'bo1', spanish: 'cabeza', vietnamese: 'đầu', phonetic: 'ca-be-xa', emoji: '🗣️', example: 'Me duele la cabeza.', exampleVi: 'Tôi đau đầu.' },
  { id: 'bo2', spanish: 'mano', vietnamese: 'tay', phonetic: 'ma-nô', emoji: '🤚', example: 'Dame la mano.', exampleVi: 'Đưa tay đây.' },
  { id: 'bo3', spanish: 'corazón', vietnamese: 'trái tim', phonetic: 'cô-ra-xôn', emoji: '❤️', example: 'Mi corazón late fuerte.', exampleVi: 'Tim tôi đập mạnh.' },
  { id: 'bo4', spanish: 'enfermo', vietnamese: 'ốm', phonetic: 'en-phe-mô', emoji: '🤒', example: 'Estoy enfermo.', exampleVi: 'Tôi bị ốm.' },
  { id: 'bo5', spanish: 'medicina', vietnamese: 'thuốc', phonetic: 'me-đi-xi-na', emoji: '💊', example: 'Necesito medicina.', exampleVi: 'Tôi cần thuốc.' },
  { id: 'bo6', spanish: 'ojo', vietnamese: 'mắt', phonetic: 'ô-hô', emoji: '👁️', example: 'Tienes ojos bonitos.', exampleVi: 'Bạn có đôi mắt đẹp.' },
  { id: 'bo7', spanish: 'pie', vietnamese: 'chân', phonetic: 'pi-ê', emoji: '🦶', example: 'Me duele el pie.', exampleVi: 'Tôi đau chân.' },
  { id: 'bo8', spanish: 'estómago', vietnamese: 'bụng / dạ dày', phonetic: 'ét-tô-ma-gô', emoji: '🤢', example: 'Me duele el estómago.', exampleVi: 'Tôi đau bụng.' },
];

const nature: FlashcardWord[] = [
  { id: 'na1', spanish: 'sol', vietnamese: 'mặt trời', phonetic: 'xol', emoji: '☀️', example: 'Hace sol hoy.', exampleVi: 'Hôm nay có nắng.' },
  { id: 'na2', spanish: 'lluvia', vietnamese: 'mưa', phonetic: 'giu-bia', emoji: '🌧️', example: 'Hay lluvia.', exampleVi: 'Trời mưa.' },
  { id: 'na3', spanish: 'árbol', vietnamese: 'cây', phonetic: 'a-bol', emoji: '🌳', example: 'El árbol es alto.', exampleVi: 'Cái cây cao.' },
  { id: 'na4', spanish: 'playa', vietnamese: 'bãi biển', phonetic: 'pla-gia', emoji: '🏖️', example: 'Vamos a la playa.', exampleVi: 'Đi biển thôi.' },
  { id: 'na5', spanish: 'montaña', vietnamese: 'núi', phonetic: 'mon-ta-nha', emoji: '⛰️', example: 'La montaña es hermosa.', exampleVi: 'Ngọn núi rất đẹp.' },
  { id: 'na6', spanish: 'mar', vietnamese: 'biển', phonetic: 'ma', emoji: '🌊', example: 'El mar es azul.', exampleVi: 'Biển xanh.' },
  { id: 'na7', spanish: 'flor', vietnamese: 'hoa', phonetic: 'phlo', emoji: '🌸', example: 'Las flores son bonitas.', exampleVi: 'Những bông hoa đẹp.' },
  { id: 'na8', spanish: 'cielo', vietnamese: 'bầu trời', phonetic: 'xi-ê-lô', emoji: '🌤️', example: 'El cielo está despejado.', exampleVi: 'Bầu trời trong xanh.' },
];

export const FLASHCARD_CATEGORIES: FlashcardCategory[] = [
  { name: 'Đồ vật', emoji: '🏠', words: basic },
  { name: 'Hành động', emoji: '🏃', words: verbs },
  { name: 'Thời gian', emoji: '⏰', words: time },
  { name: 'Con người', emoji: '👨‍👩‍👧‍👦', words: people },
  { name: 'Ẩm thực', emoji: '🍽️', words: food },
  { name: 'Màu sắc', emoji: '🎨', words: colors },
  { name: 'Cảm xúc', emoji: '😊', words: feelings },
  { name: 'Số & Tiền', emoji: '💰', words: numbers },
  { name: 'Cơ thể', emoji: '🏥', words: body },
  { name: 'Thiên nhiên', emoji: '🌳', words: nature },
];
