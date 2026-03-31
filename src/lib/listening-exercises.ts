export interface ListeningDialogue {
  id: string;
  title: string;
  titleVi: string;
  difficulty: string;
  category: string;
  lines: { speaker: string; spanish: string; vietnamese: string }[];
  questions: { question: string; options: string[]; correct: number }[];
  fillBlank?: { sentence: string; answer: string; hint: string };
}

export interface PronunciationDrill {
  id: string;
  title: string;
  description: string;
  emoji: string;
  mouthTip: string;
  words: { spanish: string; phonetic: string; vietnamese: string }[];
}

export interface ShadowExercise {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate';
  sentences: { spanish: string; vietnamese: string }[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  emoji: string;
  difficulty: string;
  lyrics: { spanish: string; vietnamese: string; vocabHighlight?: string[] }[];
}

export interface PodcastEpisode {
  id: string;
  title: string;
  titleVi: string;
  topic: string;
  level: 'Beginner' | 'Intermediate';
  emoji: string;
  script: { spanish: string; vietnamese: string }[];
  questions: { question: string; options: string[]; correct: number }[];
}

// ============================
// 1. DIALOGUES (50+)
// ============================
export const SHORT_DIALOGUES: ListeningDialogue[] = [
  // --- CAFETERÍA ---
  { id: 'd1', title: 'En la cafetería', titleVi: 'Ở quán cà phê', difficulty: 'Dễ', category: '☕ Quán cà phê',
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
    fillBlank: { sentence: 'Un café con ___, por favor.', answer: 'leche', hint: 'Sữa = ?' },
  },
  { id: 'd2', title: 'Pedir un zumo', titleVi: 'Gọi nước ép', difficulty: 'Dễ', category: '☕ Quán cà phê',
    lines: [
      { speaker: '🧑', spanish: '¿Tienen zumo de naranja?', vietnamese: 'Có nước cam ép không?' },
      { speaker: '👩‍🍳', spanish: 'Sí, natural o de botella.', vietnamese: 'Có, tươi hoặc đóng chai.' },
      { speaker: '🧑', spanish: 'Natural, por favor.', vietnamese: 'Tươi, làm ơn.' },
      { speaker: '👩‍🍳', spanish: 'Aquí tiene. Son tres euros.', vietnamese: 'Đây ạ. Ba euro.' },
    ],
    questions: [
      { question: 'Khách gọi gì?', options: ['Cà phê', 'Nước cam', 'Trà', 'Bia'], correct: 1 },
      { question: 'Loại nào?', options: ['Đóng chai', 'Tươi', 'Đóng hộp'], correct: 1 },
    ],
  },
  { id: 'd3', title: 'Desayuno en el hotel', titleVi: 'Ăn sáng khách sạn', difficulty: 'Dễ', category: '☕ Quán cà phê',
    lines: [
      { speaker: '👩‍🍳', spanish: '¿Qué quiere para desayunar?', vietnamese: 'Bạn muốn ăn sáng gì?' },
      { speaker: '🧑', spanish: 'Tostada con jamón y un café.', vietnamese: 'Bánh mì nướng với giăm-bông và cà phê.' },
      { speaker: '👩‍🍳', spanish: '¿Café solo o con leche?', vietnamese: 'Cà phê đen hay sữa?' },
      { speaker: '🧑', spanish: 'Con leche, por favor.', vietnamese: 'Cà phê sữa.' },
    ],
    questions: [
      { question: 'Khách ăn gì?', options: ['Trứng', 'Bánh mì nướng với giăm-bông', 'Salad', 'Cháo'], correct: 1 },
    ],
  },
  // --- SUPERMARKET ---
  { id: 'd4', title: 'En el supermercado', titleVi: 'Ở siêu thị', difficulty: 'Dễ', category: '🛒 Siêu thị',
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
    fillBlank: { sentence: 'El pan está al ___, junto a la panadería.', answer: 'fondo', hint: 'Phía cuối = ?' },
  },
  { id: 'd5', title: 'Comprando fruta', titleVi: 'Mua trái cây', difficulty: 'Dễ', category: '🛒 Siêu thị',
    lines: [
      { speaker: '🧑', spanish: '¿Cuánto cuestan las manzanas?', vietnamese: 'Táo giá bao nhiêu?' },
      { speaker: '👩‍🌾', spanish: 'Un euro el kilo.', vietnamese: 'Một euro một ký.' },
      { speaker: '🧑', spanish: 'Deme dos kilos, por favor.', vietnamese: 'Cho tôi 2 ký, làm ơn.' },
      { speaker: '👩‍🌾', spanish: 'Aquí tiene. ¿Algo más?', vietnamese: 'Đây ạ. Cần gì thêm không?' },
      { speaker: '🧑', spanish: 'No, eso es todo. Gracias.', vietnamese: 'Không, đủ rồi. Cảm ơn.' },
    ],
    questions: [
      { question: 'Giá táo bao nhiêu?', options: ['0.50€/kg', '1€/kg', '1.50€/kg', '2€/kg'], correct: 1 },
      { question: 'Khách mua bao nhiêu?', options: ['1 ký', '2 ký', '3 ký', '5 ký'], correct: 1 },
    ],
  },
  // --- MEDICAL ---
  { id: 'd6', title: 'En el médico', titleVi: 'Ở phòng khám', difficulty: 'Trung bình', category: '🏥 Sức khỏe',
    lines: [
      { speaker: '👨‍⚕️', spanish: 'Buenos días. ¿Qué le pasa?', vietnamese: 'Chào buổi sáng. Bạn bị sao?' },
      { speaker: '🧑', spanish: 'Me duele la cabeza y tengo fiebre.', vietnamese: 'Tôi đau đầu và bị sốt.' },
      { speaker: '👨‍⚕️', spanish: '¿Desde cuándo tiene estos síntomas?', vietnamese: 'Bạn bị từ bao giờ?' },
      { speaker: '🧑', spanish: 'Desde ayer por la noche.', vietnamese: 'Từ tối hôm qua.' },
      { speaker: '👨‍⚕️', spanish: 'Tome estas pastillas dos veces al día.', vietnamese: 'Uống thuốc này 2 lần mỗi ngày.' },
      { speaker: '🧑', spanish: 'Gracias, doctor.', vietnamese: 'Cảm ơn bác sĩ.' },
    ],
    questions: [
      { question: 'Bệnh nhân bị gì?', options: ['Đau bụng', 'Đau đầu và sốt', 'Đau chân', 'Ho'], correct: 1 },
      { question: 'Uống thuốc mấy lần/ngày?', options: ['1 lần', '2 lần', '3 lần', '4 lần'], correct: 1 },
    ],
  },
  { id: 'd7', title: 'En la farmacia', titleVi: 'Ở hiệu thuốc', difficulty: 'Dễ', category: '🏥 Sức khỏe',
    lines: [
      { speaker: '🧑', spanish: '¿Tiene algo para el dolor de cabeza?', vietnamese: 'Có thuốc đau đầu không?' },
      { speaker: '💊', spanish: 'Sí, ¿prefiere pastillas o jarabe?', vietnamese: 'Có, viên nén hay siro?' },
      { speaker: '🧑', spanish: 'Pastillas, por favor.', vietnamese: 'Viên nén, làm ơn.' },
      { speaker: '💊', spanish: 'Tome una cada ocho horas.', vietnamese: 'Uống 1 viên mỗi 8 tiếng.' },
    ],
    questions: [
      { question: 'Khách cần thuốc gì?', options: ['Đau bụng', 'Đau đầu', 'Ho', 'Sốt'], correct: 1 },
    ],
  },
  { id: 'd8', title: 'Llamar a emergencias', titleVi: 'Gọi cấp cứu', difficulty: 'Khó', category: '🏥 Sức khỏe',
    lines: [
      { speaker: '🧑', spanish: '¡Hola! Necesito una ambulancia.', vietnamese: 'Xin chào! Tôi cần xe cấp cứu.' },
      { speaker: '📞', spanish: '¿Cuál es la dirección?', vietnamese: 'Địa chỉ ở đâu?' },
      { speaker: '🧑', spanish: 'Calle Mayor, número quince.', vietnamese: 'Đường Mayor, số 15.' },
      { speaker: '📞', spanish: '¿Qué ha pasado?', vietnamese: 'Chuyện gì đã xảy ra?' },
      { speaker: '🧑', spanish: 'Mi padre se ha caído y no puede moverse.', vietnamese: 'Bố tôi bị ngã và không thể cử động.' },
      { speaker: '📞', spanish: 'La ambulancia llegará en cinco minutos.', vietnamese: 'Xe cấp cứu sẽ đến trong 5 phút.' },
    ],
    questions: [
      { question: 'Chuyện gì xảy ra?', options: ['Tai nạn xe', 'Bố bị ngã', 'Cháy nhà', 'Trộm'], correct: 1 },
      { question: 'Xe cứu thương đến trong bao lâu?', options: ['3 phút', '5 phút', '10 phút', '15 phút'], correct: 1 },
    ],
  },
  // --- HOTEL ---
  { id: 'd9', title: 'En el hotel', titleVi: 'Ở khách sạn', difficulty: 'Trung bình', category: '🏨 Khách sạn',
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
  { id: 'd10', title: 'Problema en la habitación', titleVi: 'Vấn đề phòng ốc', difficulty: 'Trung bình', category: '🏨 Khách sạn',
    lines: [
      { speaker: '🧑', spanish: 'Disculpe, el aire acondicionado no funciona.', vietnamese: 'Xin lỗi, máy lạnh không hoạt động.' },
      { speaker: '👩‍💼', spanish: 'Lo siento mucho. Envío a alguien enseguida.', vietnamese: 'Rất xin lỗi. Tôi gửi người lên ngay.' },
      { speaker: '🧑', spanish: 'Gracias. También necesito toallas extra.', vietnamese: 'Cảm ơn. Tôi cũng cần thêm khăn tắm.' },
      { speaker: '👩‍💼', spanish: 'Por supuesto. Las subiremos en diez minutos.', vietnamese: 'Tất nhiên. Sẽ mang lên trong 10 phút.' },
    ],
    questions: [
      { question: 'Vấn đề là gì?', options: ['Tivi hỏng', 'Máy lạnh hỏng', 'Nước nóng', 'Wifi'], correct: 1 },
    ],
  },
  // --- TRANSPORT ---
  { id: 'd11', title: 'En el taxi', titleVi: 'Đi taxi', difficulty: 'Dễ', category: '🚕 Di chuyển',
    lines: [
      { speaker: '🧑', spanish: '¡Taxi! Al aeropuerto, por favor.', vietnamese: 'Taxi! Đến sân bay, làm ơn.' },
      { speaker: '🚕', spanish: '¿Qué terminal?', vietnamese: 'Sân bay nào?' },
      { speaker: '🧑', spanish: 'Terminal dos.', vietnamese: 'Nhà ga số 2.' },
      { speaker: '🚕', spanish: 'Son unos treinta minutos.', vietnamese: 'Khoảng 30 phút.' },
      { speaker: '🧑', spanish: '¿Cuánto cuesta aproximadamente?', vietnamese: 'Giá khoảng bao nhiêu?' },
      { speaker: '🚕', spanish: 'Unos treinta euros.', vietnamese: 'Khoảng 30 euro.' },
    ],
    questions: [
      { question: 'Khách đi đâu?', options: ['Khách sạn', 'Nhà ga', 'Sân bay', 'Bệnh viện'], correct: 2 },
      { question: 'Mất bao lâu?', options: ['10 phút', '20 phút', '30 phút', '1 giờ'], correct: 2 },
    ],
  },
  { id: 'd12', title: 'En el metro', titleVi: 'Đi tàu điện', difficulty: 'Trung bình', category: '🚕 Di chuyển',
    lines: [
      { speaker: '🧑', spanish: '¿Qué línea va a Sol?', vietnamese: 'Đường nào đi đến Sol?' },
      { speaker: '👩', spanish: 'La línea uno, dirección Pinar de Chamartín.', vietnamese: 'Đường 1, hướng Pinar de Chamartín.' },
      { speaker: '🧑', spanish: '¿Tengo que hacer trasbordo?', vietnamese: 'Tôi có cần chuyển tàu không?' },
      { speaker: '👩', spanish: 'No, es directo. Cuatro paradas.', vietnamese: 'Không, trực tiếp. 4 trạm.' },
    ],
    questions: [
      { question: 'Đường tàu mấy?', options: ['Đường 1', 'Đường 2', 'Đường 3', 'Đường 5'], correct: 0 },
      { question: 'Mấy trạm?', options: ['2', '3', '4', '5'], correct: 2 },
    ],
  },
  { id: 'd13', title: 'Pedir indicaciones', titleVi: 'Hỏi đường', difficulty: 'Dễ', category: '🚕 Di chuyển',
    lines: [
      { speaker: '🧑', spanish: 'Perdone, ¿dónde está la Plaza Mayor?', vietnamese: 'Xin lỗi, Quảng trường Mayor ở đâu?' },
      { speaker: '👩', spanish: 'Siga todo recto dos calles y gire a la izquierda.', vietnamese: 'Đi thẳng 2 đường rồi rẽ trái.' },
      { speaker: '🧑', spanish: '¿Está lejos?', vietnamese: 'Có xa không?' },
      { speaker: '👩', spanish: 'No, a unos diez minutos andando.', vietnamese: 'Không, đi bộ khoảng 10 phút.' },
    ],
    questions: [
      { question: 'Rẽ hướng nào?', options: ['Phải', 'Trái', 'Đi thẳng', 'Quay lại'], correct: 1 },
    ],
  },
  // --- RESTAURANT ---
  { id: 'd14', title: 'Reservar una mesa', titleVi: 'Đặt bàn', difficulty: 'Trung bình', category: '🍽️ Nhà hàng',
    lines: [
      { speaker: '🧑', spanish: 'Buenas noches. ¿Tienen una mesa para cuatro?', vietnamese: 'Chào tối. Có bàn cho 4 người không?' },
      { speaker: '👨‍🍳', spanish: '¿Tiene reserva?', vietnamese: 'Bạn có đặt trước không?' },
      { speaker: '🧑', spanish: 'No, ¿es posible?', vietnamese: 'Không, có được không?' },
      { speaker: '👨‍🍳', spanish: 'Sí, por aquí. ¿Interior o terraza?', vietnamese: 'Được, mời đi. Bên trong hay sân ngoài?' },
      { speaker: '🧑', spanish: 'En la terraza, por favor.', vietnamese: 'Sân ngoài, làm ơn.' },
    ],
    questions: [
      { question: 'Bàn cho mấy người?', options: ['2', '3', '4', '5'], correct: 2 },
      { question: 'Khách chọn ngồi đâu?', options: ['Bên trong', 'Sân ngoài', 'Tầng 2', 'Quầy bar'], correct: 1 },
    ],
  },
  { id: 'd15', title: 'Pedir la comida', titleVi: 'Gọi món', difficulty: 'Trung bình', category: '🍽️ Nhà hàng',
    lines: [
      { speaker: '👨‍🍳', spanish: '¿Ya saben qué van a pedir?', vietnamese: 'Các bạn chọn món chưa?' },
      { speaker: '🧑', spanish: 'Sí, de primero quiero una sopa.', vietnamese: 'Rồi, món đầu tôi muốn súp.' },
      { speaker: '👩', spanish: 'Y yo una ensalada.', vietnamese: 'Còn tôi salad.' },
      { speaker: '👨‍🍳', spanish: '¿Y de segundo?', vietnamese: 'Còn món chính?' },
      { speaker: '🧑', spanish: 'Pollo a la plancha con patatas.', vietnamese: 'Gà nướng với khoai tây.' },
      { speaker: '👩', spanish: 'Para mí, pescado con arroz.', vietnamese: 'Cho tôi cá với cơm.' },
    ],
    questions: [
      { question: 'Người đàn ông gọi món chính gì?', options: ['Cá', 'Gà nướng', 'Bít-tết', 'Pasta'], correct: 1 },
      { question: 'Người phụ nữ gọi gì?', options: ['Gà', 'Thịt bò', 'Cá với cơm', 'Salad'], correct: 2 },
    ],
  },
  // --- SHOPPING ---
  { id: 'd16', title: 'En la tienda de ropa', titleVi: 'Mua quần áo', difficulty: 'Trung bình', category: '🛍️ Mua sắm',
    lines: [
      { speaker: '🧑', spanish: '¿Tiene esta camiseta en talla mediana?', vietnamese: 'Có áo này size vừa không?' },
      { speaker: '👩‍💼', spanish: 'Déjeme comprobar... Sí, aquí tiene.', vietnamese: 'Để tôi kiểm tra... Có, đây ạ.' },
      { speaker: '🧑', spanish: '¿Puedo probarme?', vietnamese: 'Tôi thử được không?' },
      { speaker: '👩‍💼', spanish: 'Claro, los probadores están al fondo.', vietnamese: 'Tất nhiên, phòng thử ở phía cuối.' },
      { speaker: '🧑', spanish: 'Me queda bien. ¿Cuánto cuesta?', vietnamese: 'Vừa lắm. Bao nhiêu tiền?' },
      { speaker: '👩‍💼', spanish: 'Diecinueve noventa y nueve. Hoy hay un veinte por ciento de descuento.', vietnamese: '19.99. Hôm nay giảm 20%.' },
    ],
    questions: [
      { question: 'Khách muốn size gì?', options: ['Nhỏ', 'Vừa', 'Lớn', 'Rất lớn'], correct: 1 },
      { question: 'Giảm giá bao nhiêu?', options: ['10%', '15%', '20%', '30%'], correct: 2 },
    ],
  },
  { id: 'd17', title: 'Devolver un producto', titleVi: 'Đổi trả hàng', difficulty: 'Khó', category: '🛍️ Mua sắm',
    lines: [
      { speaker: '🧑', spanish: 'Quiero devolver estos zapatos.', vietnamese: 'Tôi muốn trả lại giày này.' },
      { speaker: '👩‍💼', spanish: '¿Cuál es el problema?', vietnamese: 'Vấn đề là gì ạ?' },
      { speaker: '🧑', spanish: 'Me quedan pequeños. Necesito una talla más.', vietnamese: 'Chật quá. Cần lớn hơn một size.' },
      { speaker: '👩‍💼', spanish: '¿Tiene el ticket de compra?', vietnamese: 'Bạn có hóa đơn mua hàng không?' },
      { speaker: '🧑', spanish: 'Sí, aquí está.', vietnamese: 'Có, đây ạ.' },
      { speaker: '👩‍💼', spanish: 'Perfecto. Le cambio por una talla más grande.', vietnamese: 'Hoàn hảo. Tôi đổi cho size lớn hơn.' },
    ],
    questions: [
      { question: 'Vấn đề là gì?', options: ['Lỗi', 'Quá nhỏ', 'Không thích', 'Sai màu'], correct: 1 },
    ],
  },
  // --- SOCIAL ---
  { id: 'd18', title: 'Conocer a alguien', titleVi: 'Làm quen', difficulty: 'Dễ', category: '🎉 Xã hội',
    lines: [
      { speaker: '🧑', spanish: '¡Hola! Me llamo Carlos. ¿Y tú?', vietnamese: 'Xin chào! Tôi tên Carlos. Còn bạn?' },
      { speaker: '👩', spanish: 'Hola Carlos, soy María. Encantada.', vietnamese: 'Chào Carlos, tôi là María. Rất vui.' },
      { speaker: '🧑', spanish: '¿De dónde eres?', vietnamese: 'Bạn đến từ đâu?' },
      { speaker: '👩', spanish: 'Soy de Sevilla, pero vivo en Madrid.', vietnamese: 'Tôi từ Sevilla, nhưng sống ở Madrid.' },
      { speaker: '🧑', spanish: '¡Qué interesante! ¿A qué te dedicas?', vietnamese: 'Hay quá! Bạn làm nghề gì?' },
      { speaker: '👩', spanish: 'Soy profesora de español.', vietnamese: 'Tôi là giáo viên tiếng TBN.' },
    ],
    questions: [
      { question: 'María từ đâu?', options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'], correct: 2 },
      { question: 'María làm nghề gì?', options: ['Bác sĩ', 'Giáo viên', 'Kỹ sư', 'Ca sĩ'], correct: 1 },
    ],
  },
  { id: 'd19', title: 'Invitar a una fiesta', titleVi: 'Mời tiệc', difficulty: 'Trung bình', category: '🎉 Xã hội',
    lines: [
      { speaker: '🧑', spanish: 'Oye, el sábado hago una fiesta en mi casa.', vietnamese: 'Này, thứ Bảy tôi tổ chức tiệc ở nhà.' },
      { speaker: '👩', spanish: '¡Genial! ¿A qué hora?', vietnamese: 'Tuyệt! Mấy giờ?' },
      { speaker: '🧑', spanish: 'A las nueve de la noche.', vietnamese: 'Lúc 9 giờ tối.' },
      { speaker: '👩', spanish: '¿Llevo algo?', vietnamese: 'Tôi mang gì đến?' },
      { speaker: '🧑', spanish: 'Si quieres, trae algo para beber.', vietnamese: 'Nếu muốn, mang đồ uống.' },
    ],
    questions: [
      { question: 'Tiệc khi nào?', options: ['Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'], correct: 1 },
      { question: 'Mấy giờ?', options: ['7h tối', '8h tối', '9h tối', '10h tối'], correct: 2 },
    ],
  },
  { id: 'd20', title: 'Hacer planes', titleVi: 'Lên kế hoạch', difficulty: 'Trung bình', category: '🎉 Xã hội',
    lines: [
      { speaker: '🧑', spanish: '¿Quieres ir al cine mañana?', vietnamese: 'Bạn muốn đi xem phim ngày mai không?' },
      { speaker: '👩', spanish: '¡Sí! ¿Qué película?', vietnamese: 'Có! Phim gì?' },
      { speaker: '🧑', spanish: 'Hay una comedia nueva muy buena.', vietnamese: 'Có phim hài mới rất hay.' },
      { speaker: '👩', spanish: 'Perfecto. ¿A qué hora quedamos?', vietnamese: 'Hoàn hảo. Mấy giờ gặp?' },
      { speaker: '🧑', spanish: 'A las siete en la puerta del cine.', vietnamese: 'Lúc 7 giờ ở cửa rạp.' },
    ],
    questions: [
      { question: 'Họ sẽ làm gì?', options: ['Đi ăn', 'Đi xem phim', 'Đi mua sắm', 'Đi công viên'], correct: 1 },
    ],
  },
  // --- WORK ---
  { id: 'd21', title: 'Entrevista de trabajo', titleVi: 'Phỏng vấn xin việc', difficulty: 'Khó', category: '💼 Công việc',
    lines: [
      { speaker: '👔', spanish: 'Cuénteme sobre usted.', vietnamese: 'Kể cho tôi nghe về bạn.' },
      { speaker: '🧑', spanish: 'Soy ingeniero con cinco años de experiencia.', vietnamese: 'Tôi là kỹ sư với 5 năm kinh nghiệm.' },
      { speaker: '👔', spanish: '¿Por qué quiere trabajar aquí?', vietnamese: 'Tại sao muốn làm ở đây?' },
      { speaker: '🧑', spanish: 'Porque es una empresa líder en tecnología.', vietnamese: 'Vì đây là công ty hàng đầu về công nghệ.' },
      { speaker: '👔', spanish: '¿Cuándo podría empezar?', vietnamese: 'Khi nào bạn có thể bắt đầu?' },
      { speaker: '🧑', spanish: 'Puedo empezar el próximo lunes.', vietnamese: 'Tôi có thể bắt đầu thứ Hai tới.' },
    ],
    questions: [
      { question: 'Anh ấy có mấy năm kinh nghiệm?', options: ['3 năm', '5 năm', '7 năm', '10 năm'], correct: 1 },
      { question: 'Khi nào có thể bắt đầu?', options: ['Ngay bây giờ', 'Thứ Hai tới', 'Tháng sau', '2 tuần nữa'], correct: 1 },
    ],
  },
  { id: 'd22', title: 'En la reunión', titleVi: 'Trong cuộc họp', difficulty: 'Khó', category: '💼 Công việc',
    lines: [
      { speaker: '👔', spanish: 'Buenos días a todos. Empecemos la reunión.', vietnamese: 'Chào mọi người. Bắt đầu họp nào.' },
      { speaker: '👩‍💼', spanish: 'Primero, revisemos los resultados del mes pasado.', vietnamese: 'Trước hết, xem kết quả tháng trước.' },
      { speaker: '🧑', spanish: 'Las ventas han aumentado un quince por ciento.', vietnamese: 'Doanh số tăng 15%.' },
      { speaker: '👔', spanish: '¡Excelente! ¿Cuál es el plan para este mes?', vietnamese: 'Tuyệt! Kế hoạch tháng này là gì?' },
    ],
    questions: [
      { question: 'Doanh số tăng bao nhiêu?', options: ['10%', '12%', '15%', '20%'], correct: 2 },
    ],
  },
  // --- FAMILY ---
  { id: 'd23', title: 'Rutina de la mañana', titleVi: 'Thói quen buổi sáng', difficulty: 'Dễ', category: '🏠 Gia đình',
    lines: [
      { speaker: '👩', spanish: '¡Buenos días, hijos! ¡A levantarse!', vietnamese: 'Chào buổi sáng, các con! Dậy thôi!' },
      { speaker: '👦', spanish: 'Cinco minutos más, mamá...', vietnamese: 'Thêm 5 phút nữa, mẹ ơi...' },
      { speaker: '👩', spanish: 'No, ya es tarde. El desayuno está listo.', vietnamese: 'Không, trễ rồi. Bữa sáng sẵn rồi.' },
      { speaker: '👧', spanish: '¿Qué hay para desayunar?', vietnamese: 'Bữa sáng có gì?' },
      { speaker: '👩', spanish: 'Tostadas con mermelada y leche.', vietnamese: 'Bánh mì nướng với mứt và sữa.' },
    ],
    questions: [
      { question: 'Con trai muốn gì?', options: ['Dậy ngay', 'Ngủ thêm 5 phút', 'Ăn sáng', 'Xem TV'], correct: 1 },
    ],
  },
  { id: 'd24', title: 'Cena en familia', titleVi: 'Bữa tối gia đình', difficulty: 'Trung bình', category: '🏠 Gia đình',
    lines: [
      { speaker: '👨', spanish: '¿Cómo ha ido el día en el colegio?', vietnamese: 'Hôm nay ở trường sao rồi?' },
      { speaker: '👦', spanish: 'Bien, papá. Hemos hecho un examen de matemáticas.', vietnamese: 'Tốt bố. Con thi toán.' },
      { speaker: '👩', spanish: '¿Crees que te ha ido bien?', vietnamese: 'Con nghĩ làm bài tốt không?' },
      { speaker: '👦', spanish: 'Sí, era bastante fácil.', vietnamese: 'Có, khá dễ.' },
      { speaker: '👨', spanish: '¡Estupendo! Estamos orgullosos de ti.', vietnamese: 'Tuyệt! Bố mẹ tự hào về con.' },
    ],
    questions: [
      { question: 'Con trai thi môn gì?', options: ['Văn', 'Toán', 'Khoa học', 'Lịch sử'], correct: 1 },
    ],
  },
  // --- TRAVEL ---
  { id: 'd25', title: 'En el aeropuerto', titleVi: 'Ở sân bay', difficulty: 'Trung bình', category: '✈️ Du lịch',
    lines: [
      { speaker: '👩‍✈️', spanish: 'Su pasaporte y tarjeta de embarque, por favor.', vietnamese: 'Hộ chiếu và thẻ lên máy bay, làm ơn.' },
      { speaker: '🧑', spanish: 'Aquí tiene.', vietnamese: 'Đây ạ.' },
      { speaker: '👩‍✈️', spanish: '¿Lleva equipaje de mano?', vietnamese: 'Bạn có hành lý xách tay không?' },
      { speaker: '🧑', spanish: 'Sí, solo esta mochila.', vietnamese: 'Có, chỉ ba lô này.' },
      { speaker: '👩‍✈️', spanish: 'Puerta B12. El embarque empieza en treinta minutos.', vietnamese: 'Cổng B12. Bắt đầu lên máy bay trong 30 phút.' },
    ],
    questions: [
      { question: 'Cổng lên máy bay?', options: ['A5', 'B12', 'C3', 'D8'], correct: 1 },
    ],
  },
  { id: 'd26', title: 'Alquilar un coche', titleVi: 'Thuê xe', difficulty: 'Khó', category: '✈️ Du lịch',
    lines: [
      { speaker: '🧑', spanish: 'Quiero alquilar un coche para cinco días.', vietnamese: 'Tôi muốn thuê xe 5 ngày.' },
      { speaker: '👩‍💼', spanish: '¿Automático o manual?', vietnamese: 'Số tự động hay sàn?' },
      { speaker: '🧑', spanish: 'Automático, por favor.', vietnamese: 'Tự động, làm ơn.' },
      { speaker: '👩‍💼', spanish: 'Tenemos un Seat Ibiza. Cuarenta euros al día.', vietnamese: 'Có Seat Ibiza. 40 euro mỗi ngày.' },
      { speaker: '🧑', spanish: '¿Incluye seguro?', vietnamese: 'Có bảo hiểm không?' },
      { speaker: '👩‍💼', spanish: 'Sí, seguro a todo riesgo.', vietnamese: 'Có, bảo hiểm toàn diện.' },
    ],
    questions: [
      { question: 'Thuê mấy ngày?', options: ['3', '5', '7', '10'], correct: 1 },
      { question: 'Giá bao nhiêu/ngày?', options: ['30€', '35€', '40€', '50€'], correct: 2 },
    ],
  },
  // --- EMERGENCIES ---
  { id: 'd27', title: 'Perder el pasaporte', titleVi: 'Mất hộ chiếu', difficulty: 'Khó', category: '⚠️ Khẩn cấp',
    lines: [
      { speaker: '🧑', spanish: '¡He perdido mi pasaporte!', vietnamese: 'Tôi mất hộ chiếu!' },
      { speaker: '👮', spanish: 'Tranquilo. ¿Dónde lo vio por última vez?', vietnamese: 'Bình tĩnh. Lần cuối thấy ở đâu?' },
      { speaker: '🧑', spanish: 'Creo que en el restaurante donde comimos.', vietnamese: 'Hình như ở nhà hàng nơi ăn.' },
      { speaker: '👮', spanish: 'Vamos a llamar al restaurante primero.', vietnamese: 'Gọi nhà hàng trước đã.' },
    ],
    questions: [
      { question: 'Mất gì?', options: ['Ví', 'Hộ chiếu', 'Điện thoại', 'Chìa khóa'], correct: 1 },
    ],
  },
  // --- MORE DIALOGUES for variety ---
  { id: 'd28', title: 'Pedir disculpas', titleVi: 'Xin lỗi', difficulty: 'Trung bình', category: '🎉 Xã hội',
    lines: [
      { speaker: '🧑', spanish: 'Lo siento mucho, llegué tarde.', vietnamese: 'Xin lỗi, tôi đến trễ.' },
      { speaker: '👩', spanish: 'No te preocupes, acabo de llegar también.', vietnamese: 'Không sao, tôi cũng vừa đến.' },
      { speaker: '🧑', spanish: 'Es que el metro estaba muy lleno.', vietnamese: 'Vì tàu rất đông.' },
      { speaker: '👩', spanish: 'Sí, a esta hora siempre hay mucha gente.', vietnamese: 'Ừ, giờ này luôn đông.' },
    ],
    questions: [
      { question: 'Tại sao đến trễ?', options: ['Ngủ quên', 'Tàu đông', 'Kẹt xe', 'Quên giờ'], correct: 1 },
    ],
  },
  { id: 'd29', title: 'En el banco', titleVi: 'Ở ngân hàng', difficulty: 'Khó', category: '🏦 Dịch vụ',
    lines: [
      { speaker: '🧑', spanish: 'Quiero abrir una cuenta bancaria.', vietnamese: 'Tôi muốn mở tài khoản.' },
      { speaker: '👩‍💼', spanish: '¿Cuenta corriente o de ahorro?', vietnamese: 'Tài khoản vãng lai hay tiết kiệm?' },
      { speaker: '🧑', spanish: 'Corriente, por favor.', vietnamese: 'Vãng lai, làm ơn.' },
      { speaker: '👩‍💼', spanish: 'Necesito su pasaporte y una dirección en España.', vietnamese: 'Cần hộ chiếu và địa chỉ ở TBN.' },
    ],
    questions: [
      { question: 'Khách muốn gì?', options: ['Rút tiền', 'Mở tài khoản', 'Vay tiền', 'Đổi tiền'], correct: 1 },
    ],
  },
  { id: 'd30', title: 'Quejas sobre el ruido', titleVi: 'Phàn nàn tiếng ồn', difficulty: 'Khó', category: '🏠 Gia đình',
    lines: [
      { speaker: '🧑', spanish: 'Disculpe, ¿podría bajar la música?', vietnamese: 'Xin lỗi, bạn hạ nhạc được không?' },
      { speaker: '👩', spanish: 'Oh, lo siento. No sabía que molestaba.', vietnamese: 'Ồ, xin lỗi. Tôi không biết nó phiền.' },
      { speaker: '🧑', spanish: 'Es que mi bebé está durmiendo.', vietnamese: 'Vì em bé đang ngủ.' },
      { speaker: '👩', spanish: 'Claro, la bajo ahora mismo. Perdón.', vietnamese: 'Tất nhiên, tôi hạ ngay. Xin lỗi.' },
    ],
    questions: [
      { question: 'Tại sao phàn nàn?', options: ['Nghe nhạc to', 'Hút thuốc', 'Đỗ xe sai', 'Rác'], correct: 0 },
    ],
  },
  // Fill up to 50+ with more quick dialogues
  { id: 'd31', title: 'Comprar un billete de tren', titleVi: 'Mua vé tàu', difficulty: 'Trung bình', category: '🚕 Di chuyển',
    lines: [
      { speaker: '🧑', spanish: 'Un billete a Barcelona, por favor.', vietnamese: 'Một vé đi Barcelona, làm ơn.' },
      { speaker: '👩‍💼', spanish: '¿Ida o ida y vuelta?', vietnamese: 'Một chiều hay khứ hồi?' },
      { speaker: '🧑', spanish: 'Ida y vuelta. ¿Cuánto cuesta?', vietnamese: 'Khứ hồi. Bao nhiêu tiền?' },
      { speaker: '👩‍💼', spanish: 'Sesenta y cinco euros.', vietnamese: '65 euro.' },
    ],
    questions: [
      { question: 'Đi đâu?', options: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'], correct: 1 },
      { question: 'Loại vé?', options: ['Một chiều', 'Khứ hồi'], correct: 1 },
    ],
  },
  { id: 'd32', title: 'En la peluquería', titleVi: 'Ở tiệm tóc', difficulty: 'Trung bình', category: '🏦 Dịch vụ',
    lines: [
      { speaker: '💇', spanish: '¿Cómo quiere el corte?', vietnamese: 'Bạn muốn cắt kiểu gì?' },
      { speaker: '🧑', spanish: 'Corto por los lados y un poco más largo arriba.', vietnamese: 'Ngắn hai bên, dài hơn trên đỉnh.' },
      { speaker: '💇', spanish: '¿Le lavo el pelo primero?', vietnamese: 'Gội đầu trước nhé?' },
      { speaker: '🧑', spanish: 'Sí, por favor.', vietnamese: 'Vâng, làm ơn.' },
    ],
    questions: [
      { question: 'Khách muốn kiểu tóc nào?', options: ['Cạo đầu', 'Ngắn hai bên', 'Để dài', 'Nhuộm'], correct: 1 },
    ],
  },
  { id: 'd33', title: 'Hablar del tiempo', titleVi: 'Nói về thời tiết', difficulty: 'Dễ', category: '🌤️ Thời tiết',
    lines: [
      { speaker: '🧑', spanish: '¡Qué buen tiempo hace hoy!', vietnamese: 'Thời tiết hôm nay đẹp quá!' },
      { speaker: '👩', spanish: 'Sí, hace sol y no hace frío.', vietnamese: 'Ừ, có nắng và không lạnh.' },
      { speaker: '🧑', spanish: 'Pero dicen que mañana va a llover.', vietnamese: 'Nhưng nói ngày mai sẽ mưa.' },
      { speaker: '👩', spanish: 'Entonces aprovechemos hoy para pasear.', vietnamese: 'Vậy tận dụng hôm nay để đi dạo.' },
    ],
    questions: [
      { question: 'Thời tiết hôm nay?', options: ['Mưa', 'Nắng đẹp', 'Lạnh', 'Có gió'], correct: 1 },
    ],
  },
  { id: 'd34', title: 'Describir a una persona', titleVi: 'Mô tả người', difficulty: 'Trung bình', category: '🎉 Xã hội',
    lines: [
      { speaker: '🧑', spanish: '¿Cómo es tu novio?', vietnamese: 'Bạn trai của bạn trông sao?' },
      { speaker: '👩', spanish: 'Es alto, moreno y tiene los ojos verdes.', vietnamese: 'Cao, da ngăm, mắt xanh lá.' },
      { speaker: '🧑', spanish: '¿Y cómo es de carácter?', vietnamese: 'Tính cách thế nào?' },
      { speaker: '👩', spanish: 'Es muy simpático y divertido.', vietnamese: 'Rất dễ thương và vui tính.' },
    ],
    questions: [
      { question: 'Bạn trai có mắt màu gì?', options: ['Nâu', 'Xanh dương', 'Xanh lá', 'Đen'], correct: 2 },
    ],
  },
  { id: 'd35', title: 'En correos', titleVi: 'Ở bưu điện', difficulty: 'Trung bình', category: '🏦 Dịch vụ',
    lines: [
      { speaker: '🧑', spanish: 'Quiero enviar este paquete a Vietnam.', vietnamese: 'Tôi muốn gửi bưu kiện này đến Việt Nam.' },
      { speaker: '👩‍💼', spanish: '¿Urgente o normal?', vietnamese: 'Nhanh hay thường?' },
      { speaker: '🧑', spanish: 'Normal. ¿Cuánto tarda?', vietnamese: 'Thường. Mất bao lâu?' },
      { speaker: '👩‍💼', spanish: 'Aproximadamente dos semanas.', vietnamese: 'Khoảng 2 tuần.' },
    ],
    questions: [
      { question: 'Gửi đi đâu?', options: ['Trung Quốc', 'Nhật Bản', 'Việt Nam', 'Thái Lan'], correct: 2 },
    ],
  },
  { id: 'd36', title: 'Pedir un favor', titleVi: 'Nhờ giúp đỡ', difficulty: 'Dễ', category: '🎉 Xã hội',
    lines: [
      { speaker: '🧑', spanish: '¿Puedes ayudarme con algo?', vietnamese: 'Bạn giúp tôi được không?' },
      { speaker: '👩', spanish: 'Claro, ¿qué necesitas?', vietnamese: 'Tất nhiên, cần gì?' },
      { speaker: '🧑', spanish: '¿Puedes cuidar a mi gato este fin de semana?', vietnamese: 'Bạn trông mèo giúp tôi cuối tuần này được không?' },
      { speaker: '👩', spanish: '¡Por supuesto! Me encantan los gatos.', vietnamese: 'Tất nhiên! Tôi thích mèo.' },
    ],
    questions: [
      { question: 'Nhờ gì?', options: ['Dọn nhà', 'Trông mèo', 'Nấu ăn', 'Lái xe'], correct: 1 },
    ],
  },
  { id: 'd37', title: 'Quejarse de la comida', titleVi: 'Phàn nàn về đồ ăn', difficulty: 'Khó', category: '🍽️ Nhà hàng',
    lines: [
      { speaker: '🧑', spanish: 'Disculpe, este pollo está frío.', vietnamese: 'Xin lỗi, gà này lạnh rồi.' },
      { speaker: '👨‍🍳', spanish: 'Lo siento mucho. Se lo cambio enseguida.', vietnamese: 'Rất xin lỗi. Tôi đổi ngay.' },
      { speaker: '🧑', spanish: 'Gracias. También la sopa no tiene sal.', vietnamese: 'Cảm ơn. Súp cũng không có muối.' },
      { speaker: '👨‍🍳', spanish: 'Le traigo sal y un plato nuevo ahora mismo.', vietnamese: 'Tôi mang muối và dĩa mới ngay.' },
    ],
    questions: [
      { question: 'Vấn đề với gà?', options: ['Quá mặn', 'Lạnh', 'Sống', 'Ít'], correct: 1 },
    ],
  },
  { id: 'd38', title: 'En la playa', titleVi: 'Ở bãi biển', difficulty: 'Dễ', category: '✈️ Du lịch',
    lines: [
      { speaker: '🧑', spanish: '¿Dónde alquilamos las sombrillas?', vietnamese: 'Thuê dù ở đâu?' },
      { speaker: '👩', spanish: 'Allí, junto al chiringuito.', vietnamese: 'Kia, cạnh quán bar bãi biển.' },
      { speaker: '🧑', spanish: '¿Cuánto cuesta alquilar dos tumbonas?', vietnamese: 'Thuê 2 ghế dài bao nhiêu?' },
      { speaker: '👩‍💼', spanish: 'Doce euros por todo el día.', vietnamese: '12 euro cả ngày.' },
    ],
    questions: [
      { question: 'Giá thuê bao nhiêu?', options: ['8€', '10€', '12€', '15€'], correct: 2 },
    ],
  },
  { id: 'd39', title: 'Visitar un museo', titleVi: 'Tham quan bảo tàng', difficulty: 'Trung bình', category: '✈️ Du lịch',
    lines: [
      { speaker: '🧑', spanish: '¿A qué hora abre el museo?', vietnamese: 'Bảo tàng mở cửa mấy giờ?' },
      { speaker: '👩‍💼', spanish: 'A las diez de la mañana.', vietnamese: '10 giờ sáng.' },
      { speaker: '🧑', spanish: '¿Cuánto cuesta la entrada?', vietnamese: 'Vé bao nhiêu?' },
      { speaker: '👩‍💼', spanish: 'Quince euros. Pero los domingos es gratis.', vietnamese: '15 euro. Nhưng Chủ nhật miễn phí.' },
    ],
    questions: [
      { question: 'Bảo tàng mở lúc?', options: ['9h', '10h', '11h', '12h'], correct: 1 },
      { question: 'Khi nào miễn phí?', options: ['Thứ Bảy', 'Chủ nhật', 'Thứ Hai', 'Mỗi ngày'], correct: 1 },
    ],
  },
  { id: 'd40', title: 'Comprar souvenirs', titleVi: 'Mua quà lưu niệm', difficulty: 'Dễ', category: '🛍️ Mua sắm',
    lines: [
      { speaker: '🧑', spanish: '¿Qué me recomienda como recuerdo?', vietnamese: 'Bạn gợi ý quà lưu niệm gì?' },
      { speaker: '👩‍💼', spanish: 'Los abanicos y los imanes son muy populares.', vietnamese: 'Quạt và nam châm rất phổ biến.' },
      { speaker: '🧑', spanish: '¿Cuánto cuesta este abanico?', vietnamese: 'Quạt này bao nhiêu?' },
      { speaker: '👩‍💼', spanish: 'Diez euros. Si compra dos, le hago descuento.', vietnamese: '10 euro. Mua 2 giảm giá.' },
    ],
    questions: [
      { question: 'Quà nào phổ biến?', options: ['Áo', 'Quạt và nam châm', 'Sách', 'Rượu'], correct: 1 },
    ],
  },
  // 10 more for 50+
  { id: 'd41', title: 'Llamar a recepción', titleVi: 'Gọi lễ tân', difficulty: 'Trung bình', category: '🏨 Khách sạn',
    lines: [
      { speaker: '🧑', spanish: 'Buenas noches. ¿A qué hora es el checkout?', vietnamese: 'Chào tối. Mấy giờ trả phòng?' },
      { speaker: '👩‍💼', spanish: 'A las doce del mediodía.', vietnamese: '12 giờ trưa.' },
      { speaker: '🧑', spanish: '¿Puedo dejar las maletas después?', vietnamese: 'Gửi hành lý sau được không?' },
      { speaker: '👩‍💼', spanish: 'Sí, las guardamos gratis hasta las seis.', vietnamese: 'Được, giữ miễn phí đến 6 giờ.' },
    ],
    questions: [
      { question: 'Checkout mấy giờ?', options: ['10h', '11h', '12h', '14h'], correct: 2 },
    ],
  },
  { id: 'd42', title: 'Hablar por teléfono', titleVi: 'Nói chuyện điện thoại', difficulty: 'Trung bình', category: '💼 Công việc',
    lines: [
      { speaker: '📞', spanish: 'Buenos días, ¿en qué puedo ayudarle?', vietnamese: 'Chào buổi sáng, tôi giúp gì được ạ?' },
      { speaker: '🧑', spanish: 'Quiero hablar con el señor López, por favor.', vietnamese: 'Tôi muốn nói chuyện với ông López.' },
      { speaker: '📞', spanish: 'Un momento. Le paso.', vietnamese: 'Một lát. Tôi chuyển máy.' },
      { speaker: '👔', spanish: 'Hola, soy López. ¿En qué puedo ayudarle?', vietnamese: 'Xin chào, tôi là López. Giúp gì ạ?' },
    ],
    questions: [
      { question: 'Gọi cho ai?', options: ['García', 'López', 'Martínez', 'Rodríguez'], correct: 1 },
    ],
  },
  { id: 'd43', title: 'Celebrar un cumpleaños', titleVi: 'Mừng sinh nhật', difficulty: 'Dễ', category: '🏠 Gia đình',
    lines: [
      { speaker: '👨‍👩‍👧‍👦', spanish: '¡Feliz cumpleaños! ¡Sopla las velas!', vietnamese: 'Chúc mừng sinh nhật! Thổi nến đi!' },
      { speaker: '👧', spanish: '¡Gracias a todos! ¡Voy a pedir un deseo!', vietnamese: 'Cảm ơn mọi người! Tôi sẽ ước!' },
      { speaker: '👩', spanish: 'Ábrelos regalos, cariño.', vietnamese: 'Mở quà đi, con yêu.' },
      { speaker: '👧', spanish: '¡Un peluche! ¡Me encanta!', vietnamese: 'Một con gấu bông! Tôi thích!' },
    ],
    questions: [
      { question: 'Quà là gì?', options: ['Sách', 'Gấu bông', 'Xe đạp', 'Đồ chơi'], correct: 1 },
    ],
  },
  { id: 'd44', title: 'En la gasolinera', titleVi: 'Ở trạm xăng', difficulty: 'Trung bình', category: '🚕 Di chuyển',
    lines: [
      { speaker: '🧑', spanish: 'Lleno, por favor. Diésel.', vietnamese: 'Đổ đầy, làm ơn. Dầu diesel.' },
      { speaker: '⛽', spanish: '¿Algo más? ¿Agua, aceite?', vietnamese: 'Cần thêm gì? Nước, nhớt?' },
      { speaker: '🧑', spanish: 'No, solo gasóleo. ¿Cuánto es?', vietnamese: 'Không, chỉ dầu. Bao nhiêu?' },
      { speaker: '⛽', spanish: 'Sesenta y dos euros.', vietnamese: '62 euro.' },
    ],
    questions: [
      { question: 'Đổ loại gì?', options: ['Xăng 95', 'Xăng 98', 'Diesel', 'Điện'], correct: 2 },
    ],
  },
  { id: 'd45', title: 'Adoptar una mascota', titleVi: 'Nhận nuôi thú cưng', difficulty: 'Trung bình', category: '🏠 Gia đình',
    lines: [
      { speaker: '🧑', spanish: 'Quiero adoptar un perro.', vietnamese: 'Tôi muốn nhận nuôi chó.' },
      { speaker: '👩‍⚕️', spanish: '¿Prefiere cachorro o adulto?', vietnamese: 'Thích con nhỏ hay lớn?' },
      { speaker: '🧑', spanish: 'Un cachorro pequeño. ¿Qué raza tiene?', vietnamese: 'Con nhỏ. Có giống gì?' },
      { speaker: '👩‍⚕️', spanish: 'Este es un mestizo. Es muy cariñoso.', vietnamese: 'Con này lai. Rất tình cảm.' },
    ],
    questions: [
      { question: 'Muốn nuôi gì?', options: ['Mèo', 'Chó', 'Thỏ', 'Chim'], correct: 1 },
    ],
  },
  { id: 'd46', title: 'Llamar al fontanero', titleVi: 'Gọi thợ sửa ống', difficulty: 'Khó', category: '🏠 Gia đình',
    lines: [
      { speaker: '🧑', spanish: 'Hola, tengo una fuga de agua en la cocina.', vietnamese: 'Xin chào, bếp bị rò nước.' },
      { speaker: '🔧', spanish: '¿Es urgente? ¿Hay mucha agua?', vietnamese: 'Khẩn cấp không? Nước nhiều không?' },
      { speaker: '🧑', spanish: 'Sí, bastante. Necesito ayuda ya.', vietnamese: 'Có, khá nhiều. Cần giúp ngay.' },
      { speaker: '🔧', spanish: 'Voy para allá en media hora.', vietnamese: 'Tôi đến trong nửa giờ.' },
    ],
    questions: [
      { question: 'Vấn đề gì?', options: ['Mất điện', 'Rò nước', 'Bếp hỏng', 'Tắc ống'], correct: 1 },
    ],
  },
  { id: 'd47', title: 'Pedir un café para llevar', titleVi: 'Mua cà phê mang đi', difficulty: 'Dễ', category: '☕ Quán cà phê',
    lines: [
      { speaker: '🧑', spanish: 'Un café americano para llevar, por favor.', vietnamese: 'Một cà phê americano mang đi, làm ơn.' },
      { speaker: '👩‍🍳', spanish: '¿Quiere leche?', vietnamese: 'Thêm sữa không?' },
      { speaker: '🧑', spanish: 'Un poco de leche de avena.', vietnamese: 'Ít sữa yến mạch.' },
      { speaker: '👩‍🍳', spanish: 'Son tres euros cincuenta.', vietnamese: '3 euro 50.' },
    ],
    questions: [
      { question: 'Loại sữa?', options: ['Sữa bò', 'Sữa yến mạch', 'Sữa đậu nành', 'Không sữa'], correct: 1 },
    ],
  },
  { id: 'd48', title: 'Gimnasio', titleVi: 'Phòng gym', difficulty: 'Trung bình', category: '🏥 Sức khỏe',
    lines: [
      { speaker: '🧑', spanish: 'Quiero inscribirme en el gimnasio.', vietnamese: 'Tôi muốn đăng ký phòng gym.' },
      { speaker: '💪', spanish: '¿Mensual o anual?', vietnamese: 'Theo tháng hay năm?' },
      { speaker: '🧑', spanish: '¿Cuánto es la cuota mensual?', vietnamese: 'Phí hàng tháng bao nhiêu?' },
      { speaker: '💪', spanish: 'Treinta euros al mes. Incluye todas las clases.', vietnamese: '30 euro mỗi tháng. Gồm tất cả lớp học.' },
    ],
    questions: [
      { question: 'Phí hàng tháng?', options: ['20€', '25€', '30€', '40€'], correct: 2 },
    ],
  },
  { id: 'd49', title: 'Ir al dentista', titleVi: 'Đi nha sĩ', difficulty: 'Trung bình', category: '🏥 Sức khỏe',
    lines: [
      { speaker: '🧑', spanish: 'Me duele esta muela desde hace tres días.', vietnamese: 'Răng này đau 3 ngày rồi.' },
      { speaker: '🦷', spanish: 'Vamos a hacer una radiografía primero.', vietnamese: 'Chụp X-quang trước.' },
      { speaker: '🧑', spanish: '¿Es grave?', vietnamese: 'Có nghiêm trọng không?' },
      { speaker: '🦷', spanish: 'Tiene una caries. Necesitamos un empaste.', vietnamese: 'Bạn bị sâu răng. Cần trám.' },
    ],
    questions: [
      { question: 'Bị gì?', options: ['Viêm lợi', 'Sâu răng', 'Răng khôn', 'Nứt răng'], correct: 1 },
    ],
  },
  { id: 'd50', title: 'Mudarse de casa', titleVi: 'Chuyển nhà', difficulty: 'Khó', category: '🏠 Gia đình',
    lines: [
      { speaker: '🧑', spanish: 'Nos mudamos la semana que viene.', vietnamese: 'Tuần sau chúng tôi chuyển nhà.' },
      { speaker: '👩', spanish: '¿Necesitas ayuda con las cajas?', vietnamese: 'Bạn cần giúp dọn thùng không?' },
      { speaker: '🧑', spanish: 'Sí, tenemos muchas cosas que empaquetar.', vietnamese: 'Có, rất nhiều đồ phải đóng gói.' },
      { speaker: '👩', spanish: 'Yo te ayudo el sábado por la mañana.', vietnamese: 'Tôi giúp bạn sáng thứ Bảy.' },
    ],
    questions: [
      { question: 'Khi nào chuyển nhà?', options: ['Tuần này', 'Tuần sau', 'Tháng sau', 'Ngày mai'], correct: 1 },
    ],
  },
  { id: 'd51', title: 'En la óptica', titleVi: 'Ở tiệm mắt kính', difficulty: 'Trung bình', category: '🏦 Dịch vụ',
    lines: [
      { speaker: '🧑', spanish: 'Necesito unas gafas nuevas.', vietnamese: 'Tôi cần kính mới.' },
      { speaker: '👓', spanish: '¿Para ver de lejos o de cerca?', vietnamese: 'Nhìn xa hay gần?' },
      { speaker: '🧑', spanish: 'De lejos. No veo bien la pizarra.', vietnamese: 'Nhìn xa. Tôi không thấy rõ bảng.' },
      { speaker: '👓', spanish: 'Vamos a hacer un examen de la vista.', vietnamese: 'Kiểm tra mắt nhé.' },
    ],
    questions: [
      { question: 'Vấn đề gì?', options: ['Nhìn gần', 'Nhìn xa', 'Cả hai', 'Đau mắt'], correct: 1 },
    ],
  },
  { id: 'd52', title: 'Quejarse del vecino', titleVi: 'Phàn nàn hàng xóm', difficulty: 'Khó', category: '🏠 Gia đình',
    lines: [
      { speaker: '🧑', spanish: 'Mi vecino tiene fiestas todos los fines de semana.', vietnamese: 'Hàng xóm tổ chức tiệc mỗi cuối tuần.' },
      { speaker: '👩‍💼', spanish: '¿Ha hablado con él?', vietnamese: 'Bạn đã nói với họ chưa?' },
      { speaker: '🧑', spanish: 'Sí, pero no cambia nada.', vietnamese: 'Rồi, nhưng không thay đổi.' },
      { speaker: '👩‍💼', spanish: 'Puede presentar una denuncia formal.', vietnamese: 'Bạn có thể nộp đơn khiếu nại.' },
    ],
    questions: [
      { question: 'Vấn đề?', options: ['Rác', 'Tiệc ồn ào', 'Thú cưng', 'Đỗ xe'], correct: 1 },
    ],
  },
];

// ============================
// 2. SONGS (10)
// ============================
export const SONGS: Song[] = [
  { id: 'sg1', title: 'Despacito (simplified)', artist: 'Luis Fonsi', emoji: '🎶', difficulty: 'Dễ',
    lyrics: [
      { spanish: 'Sí, sabes que ya llevo un rato mirándote.', vietnamese: 'Ừ, em biết anh nhìn em một lúc rồi.', vocabHighlight: ['sabes', 'mirándote'] },
      { spanish: 'Tengo que bailar contigo hoy.', vietnamese: 'Anh phải nhảy với em hôm nay.', vocabHighlight: ['bailar', 'contigo', 'hoy'] },
      { spanish: 'Despacito, quiero respirar tu cuello despacito.', vietnamese: 'Từ từ, anh muốn hít thở trên cổ em từ từ.', vocabHighlight: ['despacito', 'quiero', 'cuello'] },
      { spanish: 'Deja que te diga cosas al oído.', vietnamese: 'Để anh thì thầm bên tai em.', vocabHighlight: ['diga', 'cosas', 'oído'] },
    ],
  },
  { id: 'sg2', title: 'La Bamba', artist: 'Ritchie Valens', emoji: '💃', difficulty: 'Dễ',
    lyrics: [
      { spanish: 'Para bailar la bamba se necesita una poca de gracia.', vietnamese: 'Để nhảy la bamba cần một chút duyên dáng.', vocabHighlight: ['bailar', 'necesita', 'gracia'] },
      { spanish: 'Una poca de gracia para mí, para ti.', vietnamese: 'Một chút duyên dáng cho tôi, cho bạn.', vocabHighlight: ['para', 'mí', 'ti'] },
      { spanish: 'Y arriba y arriba, y arriba iré.', vietnamese: 'Và lên lên, lên nào.', vocabHighlight: ['arriba', 'iré'] },
      { spanish: 'Yo no soy marinero, soy capitán.', vietnamese: 'Tôi không phải thủy thủ, tôi là thuyền trưởng.', vocabHighlight: ['marinero', 'capitán'] },
    ],
  },
  { id: 'sg3', title: 'Cielito Lindo', artist: 'Truyền thống', emoji: '🌙', difficulty: 'Dễ',
    lyrics: [
      { spanish: 'De la Sierra Morena, cielito lindo, vienen bajando.', vietnamese: 'Từ núi Sierra Morena, bé đẹp ơi, đang xuống.', vocabHighlight: ['Sierra', 'bajando'] },
      { spanish: 'Un par de ojitos negros, cielito lindo, de contrabando.', vietnamese: 'Đôi mắt đen, bé đẹp ơi, như hàng lậu.', vocabHighlight: ['ojitos', 'negros'] },
      { spanish: 'Ay, ay, ay, ay, canta y no llores.', vietnamese: 'Ơi ơi ơi, hát lên đừng khóc.', vocabHighlight: ['canta', 'llores'] },
      { spanish: 'Porque cantando se alegran, cielito lindo, los corazones.', vietnamese: 'Vì khi hát, con tim vui lên, bé đẹp ơi.', vocabHighlight: ['cantando', 'corazones'] },
    ],
  },
  { id: 'sg4', title: 'Bésame Mucho', artist: 'Consuelo Velázquez', emoji: '💋', difficulty: 'Trung bình',
    lyrics: [
      { spanish: 'Bésame, bésame mucho.', vietnamese: 'Hôn em đi, hôn em thật nhiều.', vocabHighlight: ['bésame', 'mucho'] },
      { spanish: 'Como si fuera esta noche la última vez.', vietnamese: 'Như thể đêm nay là lần cuối.', vocabHighlight: ['fuera', 'noche', 'última'] },
      { spanish: 'Bésame, bésame mucho.', vietnamese: 'Hôn em đi, hôn em thật nhiều.', vocabHighlight: ['bésame'] },
      { spanish: 'Que tengo miedo perderte, perderte después.', vietnamese: 'Vì em sợ mất anh, mất anh sau này.', vocabHighlight: ['miedo', 'perderte'] },
    ],
  },
  { id: 'sg5', title: 'Guantanamera', artist: 'José Martí', emoji: '🌴', difficulty: 'Dễ',
    lyrics: [
      { spanish: 'Guantanamera, guajira guantanamera.', vietnamese: 'Cô gái Guantanamo, cô gái quê guantanamera.', vocabHighlight: ['guajira'] },
      { spanish: 'Yo soy un hombre sincero, de donde crece la palma.', vietnamese: 'Tôi là người thành thật, nơi cây cọ mọc.', vocabHighlight: ['sincero', 'palma'] },
      { spanish: 'Y antes de morirme, quiero echar mis versos del alma.', vietnamese: 'Trước khi chết, muốn thả thơ từ tâm hồn.', vocabHighlight: ['morirme', 'versos', 'alma'] },
    ],
  },
  { id: 'sg6', title: 'Livin\' la Vida Loca', artist: 'Ricky Martin', emoji: '🎉', difficulty: 'Trung bình',
    lyrics: [
      { spanish: 'Ella es linda, ella es bella.', vietnamese: 'Cô ấy xinh, cô ấy đẹp.', vocabHighlight: ['linda', 'bella'] },
      { spanish: 'Tiene un poco de esa magia negra en ella.', vietnamese: 'Cô ấy có chút phép thuật đen.', vocabHighlight: ['magia', 'negra'] },
      { spanish: 'Upside, inside out, ella vive la vida loca.', vietnamese: 'Trên dưới, cô ấy sống cuộc đời điên.', vocabHighlight: ['vive', 'vida', 'loca'] },
      { spanish: 'She\'ll push and pull you down, viviendo la vida loca.', vietnamese: 'Cô ấy kéo đẩy bạn, sống cuộc đời điên.', vocabHighlight: ['viviendo'] },
    ],
  },
  { id: 'sg7', title: 'Bailando', artist: 'Enrique Iglesias', emoji: '🕺', difficulty: 'Trung bình',
    lyrics: [
      { spanish: 'Yo te miro y se me corta la respiración.', vietnamese: 'Anh nhìn em và ngừng thở.', vocabHighlight: ['miro', 'respiración'] },
      { spanish: 'Cuando tú me miras se me sube el corazón.', vietnamese: 'Khi em nhìn anh, tim anh bay.', vocabHighlight: ['miras', 'corazón'] },
      { spanish: 'Y en silencio, tu mirada dice mil palabras.', vietnamese: 'Trong im lặng, ánh mắt em nói ngàn lời.', vocabHighlight: ['silencio', 'mirada', 'palabras'] },
      { spanish: 'Bailando, bailando, tu cuerpo y el mío.', vietnamese: 'Nhảy, nhảy, thân em và anh.', vocabHighlight: ['bailando', 'cuerpo', 'mío'] },
    ],
  },
  { id: 'sg8', title: 'De Colores', artist: 'Truyền thống', emoji: '🌈', difficulty: 'Dễ',
    lyrics: [
      { spanish: 'De colores, de colores se visten los campos en la primavera.', vietnamese: 'Nhiều màu sắc, cánh đồng mặc màu vào mùa xuân.', vocabHighlight: ['colores', 'campos', 'primavera'] },
      { spanish: 'De colores, de colores son los pajaritos que vienen de afuera.', vietnamese: 'Nhiều màu sắc, chim nhỏ từ ngoài bay đến.', vocabHighlight: ['pajaritos', 'afuera'] },
      { spanish: 'De colores, de colores es el arcoíris que vemos lucir.', vietnamese: 'Nhiều màu sắc, cầu vồng ta thấy tỏa sáng.', vocabHighlight: ['arcoíris', 'lucir'] },
    ],
  },
  { id: 'sg9', title: 'Waka Waka', artist: 'Shakira', emoji: '⚽', difficulty: 'Trung bình',
    lyrics: [
      { spanish: 'Llegó el momento, caen las murallas.', vietnamese: 'Đã đến lúc, tường thành sụp đổ.', vocabHighlight: ['momento', 'murallas'] },
      { spanish: 'Va a empezar la única justa de las justas.', vietnamese: 'Trận chiến duy nhất sắp bắt đầu.', vocabHighlight: ['empezar', 'justa'] },
      { spanish: 'Esto es África. Tsamina mina.', vietnamese: 'Đây là Châu Phi.', vocabHighlight: ['África'] },
    ],
  },
  { id: 'sg10', title: 'Feliz Navidad', artist: 'José Feliciano', emoji: '🎄', difficulty: 'Dễ',
    lyrics: [
      { spanish: 'Feliz Navidad, feliz Navidad.', vietnamese: 'Giáng sinh vui vẻ.', vocabHighlight: ['feliz', 'Navidad'] },
      { spanish: 'Próspero año y felicidad.', vietnamese: 'Năm mới thịnh vượng và hạnh phúc.', vocabHighlight: ['próspero', 'año', 'felicidad'] },
      { spanish: 'I wanna wish you a Merry Christmas from the bottom of my heart.', vietnamese: 'Chúc bạn Giáng sinh vui vẻ từ đáy lòng.', vocabHighlight: ['corazón'] },
    ],
  },
];

// ============================
// 3. PRONUNCIATION DRILLS
// ============================
export const PRONUNCIATION_DRILLS: PronunciationDrill[] = [
  {
    id: 'rr', title: 'Âm R/RR (rung lưỡi)', description: 'Rung đầu lưỡi – âm khó nhất tiếng TBN!', emoji: '🔊',
    mouthTip: '👅 Đặt đầu lưỡi chạm nướu phía sau răng cửa trên. Thở ra nhẹ để lưỡi rung. Bắt đầu với "d-d-d-d" rồi tăng tốc.',
    words: [
      { spanish: 'perro', phonetic: 'pe-rrô', vietnamese: 'con chó' },
      { spanish: 'carro', phonetic: 'ca-rrô', vietnamese: 'xe hơi' },
      { spanish: 'arroz', phonetic: 'a-rrốt', vietnamese: 'cơm' },
      { spanish: 'guitarra', phonetic: 'ghi-ta-rra', vietnamese: 'guitar' },
      { spanish: 'correr', phonetic: 'cô-rrer', vietnamese: 'chạy' },
      { spanish: 'rojo', phonetic: 'rrô-hô', vietnamese: 'đỏ' },
      { spanish: 'reloj', phonetic: 'rrê-lôh', vietnamese: 'đồng hồ' },
      { spanish: 'río', phonetic: 'rrí-ô', vietnamese: 'sông' },
    ],
  },
  {
    id: 'll', title: 'Âm LL và Y', description: 'Phát âm giống "gi" trong tiếng Việt', emoji: '👅',
    mouthTip: '👅 Đặt lưỡi phẳng, phần giữa chạm nhẹ vòm miệng. Giống âm "gi" trong "gia đình".',
    words: [
      { spanish: 'llave', phonetic: 'gia-ve', vietnamese: 'chìa khóa' },
      { spanish: 'calle', phonetic: 'ca-gie', vietnamese: 'đường phố' },
      { spanish: 'pollo', phonetic: 'pô-giô', vietnamese: 'gà' },
      { spanish: 'yo', phonetic: 'giô', vietnamese: 'tôi' },
      { spanish: 'playa', phonetic: 'pla-gia', vietnamese: 'bãi biển' },
      { spanish: 'silla', phonetic: 'xi-gia', vietnamese: 'ghế' },
      { spanish: 'amarillo', phonetic: 'a-ma-ri-giô', vietnamese: 'vàng' },
      { spanish: 'estrella', phonetic: 'ét-trê-gia', vietnamese: 'ngôi sao' },
    ],
  },
  {
    id: 'vowels', title: 'Nguyên âm thuần', description: '5 nguyên âm LUÔN phát âm giống nhau', emoji: '🎵',
    mouthTip: '👅 TBN chỉ có 5 nguyên âm. Mỗi âm luôn phát âm giống nhau, không thay đổi theo ngữ cảnh (khác tiếng Anh!).',
    words: [
      { spanish: 'a - casa, agua, hablar', phonetic: 'a (như "a" tiếng Việt)', vietnamese: 'nhà, nước, nói' },
      { spanish: 'e - mesa, beber, comer', phonetic: 'e (như "ê" tiếng Việt)', vietnamese: 'bàn, uống, ăn' },
      { spanish: 'i - amigo, vivir, escribir', phonetic: 'i (như "i" tiếng Việt)', vietnamese: 'bạn, sống, viết' },
      { spanish: 'o - como, todo, bonito', phonetic: 'o (như "ô" tiếng Việt)', vietnamese: 'ăn, tất cả, đẹp' },
      { spanish: 'u - uno, azul, fruta', phonetic: 'u (như "u" tiếng Việt)', vietnamese: 'một, xanh, trái cây' },
    ],
  },
  {
    id: 'bv', title: 'B vs V', description: 'Trong tiếng TBN, B và V phát âm giống nhau!', emoji: '🤔',
    mouthTip: '👅 Cả B và V đều phát âm bằng 2 môi (bilabial). Đầu câu hoặc sau m/n: B cứng. Giữa câu: B mềm (môi hở nhẹ).',
    words: [
      { spanish: 'vino - bino', phonetic: 'bi-nô', vietnamese: 'rượu vang' },
      { spanish: 'bien - vivir', phonetic: 'bi-en / bi-bir', vietnamese: 'tốt / sống' },
      { spanish: 'beber - ver', phonetic: 'be-ber / ber', vietnamese: 'uống / xem' },
      { spanish: 'volver - buscar', phonetic: 'bol-ber / but-car', vietnamese: 'quay lại / tìm' },
      { spanish: 'vaca - boca', phonetic: 'ba-ca / bô-ca', vietnamese: 'bò / miệng' },
      { spanish: 'viajar - bajar', phonetic: 'bi-a-har / ba-har', vietnamese: 'du lịch / xuống' },
    ],
  },
  {
    id: 'stress', title: 'Trọng âm', description: 'Quy tắc nhấn âm trong tiếng TBN', emoji: '📢',
    mouthTip: '📖 Quy tắc: Từ kết thúc bằng nguyên âm/n/s → nhấn âm áp chót. Từ kết thúc bằng phụ âm khác → nhấn âm cuối. Dấu sắc (´) = ngoại lệ.',
    words: [
      { spanish: 'CA-sa (nhấn áp chót)', phonetic: 'CA-xa', vietnamese: 'nhà' },
      { spanish: 'co-MER (nhấn cuối)', phonetic: 'cô-MER', vietnamese: 'ăn' },
      { spanish: 'te-LÉ-fo-no (có dấu)', phonetic: 'tê-LÉ-phô-nô', vietnamese: 'điện thoại' },
      { spanish: 'mú-SI-ca (có dấu)', phonetic: 'MÚ-xi-ca', vietnamese: 'âm nhạc' },
      { spanish: 'es-PA-ñol (nhấn cuối)', phonetic: 'ét-pa-NHOL', vietnamese: 'tiếng TBN' },
      { spanish: 'á-GUI-la (có dấu)', phonetic: 'Á-ghi-la', vietnamese: 'đại bàng' },
    ],
  },
];

// ============================
// 4. MINI PODCASTS (10)
// ============================
export const PODCAST_EPISODES: PodcastEpisode[] = [
  { id: 'p1', title: 'Mi familia', titleVi: 'Gia đình tôi', topic: 'Gia đình', level: 'Beginner', emoji: '👨‍👩‍👧‍👦',
    script: [
      { spanish: 'Hola, me llamo Ana y hoy quiero hablar de mi familia.', vietnamese: 'Xin chào, tôi tên Ana và hôm nay muốn nói về gia đình.' },
      { spanish: 'Tengo una familia pequeña: mi madre, mi padre y mi hermano.', vietnamese: 'Tôi có gia đình nhỏ: mẹ, bố và anh trai.' },
      { spanish: 'Mi madre se llama Carmen y es profesora.', vietnamese: 'Mẹ tôi tên Carmen, là giáo viên.' },
      { spanish: 'Mi padre, José, trabaja en un hospital. Es enfermero.', vietnamese: 'Bố, José, làm ở bệnh viện. Là y tá.' },
      { spanish: 'Mi hermano Pablo tiene quince años y le gusta el fútbol.', vietnamese: 'Anh Pablo 15 tuổi và thích bóng đá.' },
      { spanish: 'Los domingos comemos juntos en casa de mi abuela.', vietnamese: 'Chủ nhật cả nhà ăn ở nhà bà.' },
    ],
    questions: [
      { question: 'Mẹ Ana làm nghề gì?', options: ['Bác sĩ', 'Giáo viên', 'Y tá', 'Kế toán'], correct: 1 },
      { question: 'Bố làm ở đâu?', options: ['Trường học', 'Bệnh viện', 'Công ty', 'Nhà hàng'], correct: 1 },
      { question: 'Chủ nhật làm gì?', options: ['Đi chơi', 'Ăn ở nhà bà', 'Xem phim', 'Đi mua sắm'], correct: 1 },
    ],
  },
  { id: 'p2', title: 'De compras en Madrid', titleVi: 'Mua sắm ở Madrid', topic: 'Mua sắm', level: 'Beginner', emoji: '🛍️',
    script: [
      { spanish: 'Hoy voy de compras al centro de Madrid.', vietnamese: 'Hôm nay tôi đi mua sắm ở trung tâm Madrid.' },
      { spanish: 'Primero voy a la Gran Vía, la calle más famosa.', vietnamese: 'Trước tiên đến Gran Vía, đường nổi tiếng nhất.' },
      { spanish: 'Quiero comprar un regalo para mi amiga. Su cumpleaños es mañana.', vietnamese: 'Muốn mua quà cho bạn. Sinh nhật bạn ngày mai.' },
      { spanish: 'Entro en una tienda de ropa y veo un vestido bonito.', vietnamese: 'Vào tiệm quần áo và thấy váy đẹp.' },
      { spanish: 'Cuesta treinta euros. ¡Perfecto!', vietnamese: 'Giá 30 euro. Hoàn hảo!' },
      { spanish: 'Después voy a tomar un café en la Plaza Mayor.', vietnamese: 'Sau đó đi uống cà phê ở Plaza Mayor.' },
    ],
    questions: [
      { question: 'Mua quà cho ai?', options: ['Mẹ', 'Bạn gái', 'Chồng', 'Bạn'], correct: 3 },
      { question: 'Quà là gì?', options: ['Giày', 'Váy', 'Túi', 'Sách'], correct: 1 },
      { question: 'Sau đó làm gì?', options: ['Về nhà', 'Uống cà phê', 'Đi xem phim', 'Ăn tối'], correct: 1 },
    ],
  },
  { id: 'p3', title: 'Un día en Barcelona', titleVi: 'Một ngày ở Barcelona', topic: 'Du lịch', level: 'Intermediate', emoji: '🏖️',
    script: [
      { spanish: 'Barcelona es una ciudad increíble junto al mar Mediterráneo.', vietnamese: 'Barcelona là thành phố tuyệt đẹp bên biển Địa Trung Hải.' },
      { spanish: 'Por la mañana visitamos la Sagrada Familia, la iglesia de Gaudí.', vietnamese: 'Buổi sáng tham quan Sagrada Familia, nhà thờ của Gaudí.' },
      { spanish: 'Es impresionante. Gaudí trabajó en ella durante más de cuarenta años.', vietnamese: 'Rất ấn tượng. Gaudí làm việc hơn 40 năm.' },
      { spanish: 'Al mediodía paseamos por Las Ramblas y comemos tapas.', vietnamese: 'Buổi trưa đi dạo Las Ramblas và ăn tapas.' },
      { spanish: 'Por la tarde vamos a la playa de la Barceloneta.', vietnamese: 'Buổi chiều đi biển Barceloneta.' },
      { spanish: 'Es perfecta para descansar después de caminar tanto.', vietnamese: 'Hoàn hảo để nghỉ sau khi đi bộ nhiều.' },
    ],
    questions: [
      { question: 'Ai xây Sagrada Familia?', options: ['Picasso', 'Gaudí', 'Dalí', 'Miró'], correct: 1 },
      { question: 'Buổi trưa ăn gì?', options: ['Paella', 'Tapas', 'Pizza', 'Bánh mì'], correct: 1 },
      { question: 'Buổi chiều đi đâu?', options: ['Bảo tàng', 'Biển', 'Núi', 'Công viên'], correct: 1 },
    ],
  },
  { id: 'p4', title: 'Mi rutina diaria', titleVi: 'Thói quen hàng ngày', topic: 'Sinh hoạt', level: 'Beginner', emoji: '⏰',
    script: [
      { spanish: 'Me levanto a las siete de la mañana.', vietnamese: 'Tôi dậy lúc 7 giờ sáng.' },
      { spanish: 'Primero me ducho y después desayuno.', vietnamese: 'Trước tắm rồi sau đó ăn sáng.' },
      { spanish: 'Normalmente desayuno tostadas con café.', vietnamese: 'Thường ăn sáng bánh mì nướng với cà phê.' },
      { spanish: 'Trabajo desde las nueve hasta las cinco.', vietnamese: 'Làm việc từ 9 giờ đến 5 giờ.' },
      { spanish: 'Después del trabajo voy al gimnasio.', vietnamese: 'Sau khi làm việc đi gym.' },
      { spanish: 'Ceno a las ocho y me acuesto a las once.', vietnamese: 'Ăn tối lúc 8 giờ và đi ngủ lúc 11 giờ.' },
    ],
    questions: [
      { question: 'Dậy mấy giờ?', options: ['6h', '7h', '8h', '9h'], correct: 1 },
      { question: 'Ăn sáng gì?', options: ['Cháo', 'Trứng', 'Bánh mì nướng + cà phê', 'Cereal'], correct: 2 },
      { question: 'Đi ngủ mấy giờ?', options: ['9h', '10h', '11h', '12h'], correct: 2 },
    ],
  },
  { id: 'p5', title: 'La comida española', titleVi: 'Ẩm thực Tây Ban Nha', topic: 'Ẩm thực', level: 'Intermediate', emoji: '🥘',
    script: [
      { spanish: 'La cocina española es famosa en todo el mundo.', vietnamese: 'Ẩm thực TBN nổi tiếng khắp thế giới.' },
      { spanish: 'El plato más conocido es la paella, originaria de Valencia.', vietnamese: 'Món nổi tiếng nhất là paella, từ Valencia.' },
      { spanish: 'Se hace con arroz, azafrán y puede llevar mariscos o pollo.', vietnamese: 'Nấu với cơm, nhụy hoa nghệ tây, có thể thêm hải sản hoặc gà.' },
      { spanish: 'Otro plato típico son las tapas: pequeñas porciones para compartir.', vietnamese: 'Món khác là tapas: phần nhỏ để chia sẻ.' },
      { spanish: 'En España, la cena suele ser a las nueve o diez de la noche.', vietnamese: 'Ở TBN, bữa tối thường lúc 9 hoặc 10 giờ tối.' },
    ],
    questions: [
      { question: 'Paella từ đâu?', options: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'], correct: 2 },
      { question: 'Tapas là gì?', options: ['Món chính', 'Phần nhỏ chia sẻ', 'Tráng miệng', 'Đồ uống'], correct: 1 },
      { question: 'Ăn tối mấy giờ?', options: ['6-7h', '7-8h', '8-9h', '9-10h'], correct: 3 },
    ],
  },
  { id: 'p6', title: 'El fútbol en España', titleVi: 'Bóng đá ở TBN', topic: 'Thể thao', level: 'Intermediate', emoji: '⚽',
    script: [
      { spanish: 'El fútbol es el deporte más popular en España.', vietnamese: 'Bóng đá là môn phổ biến nhất ở TBN.' },
      { spanish: 'Los dos equipos más famosos son el Real Madrid y el Barcelona.', vietnamese: '2 đội nổi tiếng nhất là Real Madrid và Barcelona.' },
      { spanish: 'Cada año juegan el Clásico, el partido más importante.', vietnamese: 'Mỗi năm họ đấu El Clásico, trận quan trọng nhất.' },
      { spanish: 'La selección española ganó el Mundial en dos mil diez.', vietnamese: 'Đội tuyển TBN vô địch World Cup 2010.' },
    ],
    questions: [
      { question: 'El Clásico là gì?', options: ['Giải đấu', 'Trận Real vs Barça', 'Cúp', 'Giải mùa hè'], correct: 1 },
      { question: 'TBN vô địch WC năm nào?', options: ['2006', '2010', '2014', '2018'], correct: 1 },
    ],
  },
  { id: 'p7', title: 'Fiestas españolas', titleVi: 'Lễ hội TBN', topic: 'Văn hóa', level: 'Intermediate', emoji: '🎊',
    script: [
      { spanish: 'España tiene muchas fiestas tradicionales durante todo el año.', vietnamese: 'TBN có nhiều lễ hội truyền thống quanh năm.' },
      { spanish: 'La Tomatina es una fiesta donde la gente se tira tomates.', vietnamese: 'La Tomatina là lễ hội ném cà chua.' },
      { spanish: 'Se celebra en Buñol, Valencia, en agosto.', vietnamese: 'Tổ chức ở Buñol, Valencia, tháng 8.' },
      { spanish: 'San Fermín es famoso por los encierros de toros en Pamplona.', vietnamese: 'San Fermín nổi tiếng với lễ chạy bò ở Pamplona.' },
    ],
    questions: [
      { question: 'La Tomatina ở đâu?', options: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'], correct: 2 },
      { question: 'San Fermín nổi tiếng vì?', options: ['Pháo hoa', 'Chạy bò', 'Nhảy', 'Ăn'], correct: 1 },
    ],
  },
  { id: 'p8', title: 'Viaje en tren', titleVi: 'Đi tàu', topic: 'Di chuyển', level: 'Beginner', emoji: '🚄',
    script: [
      { spanish: 'Hoy voy a viajar en tren de Madrid a Sevilla.', vietnamese: 'Hôm nay đi tàu từ Madrid đến Sevilla.' },
      { spanish: 'El tren AVE es muy rápido. Solo tarda dos horas y media.', vietnamese: 'Tàu AVE rất nhanh. Chỉ mất 2 tiếng rưỡi.' },
      { spanish: 'Mi asiento es el número veintitrés, junto a la ventana.', vietnamese: 'Ghế số 23, cạnh cửa sổ.' },
      { spanish: 'Durante el viaje leo un libro y miro el paisaje.', vietnamese: 'Trong chuyến đi, đọc sách và ngắm phong cảnh.' },
    ],
    questions: [
      { question: 'Đi từ đâu đến đâu?', options: ['Barcelona→Madrid', 'Madrid→Sevilla', 'Sevilla→Barcelona'], correct: 1 },
      { question: 'Mất bao lâu?', options: ['1h', '2h30', '4h', '5h'], correct: 1 },
    ],
  },
  { id: 'p9', title: 'Aprender español', titleVi: 'Học tiếng TBN', topic: 'Học tập', level: 'Beginner', emoji: '📚',
    script: [
      { spanish: 'Aprender español no es difícil si practicas todos los días.', vietnamese: 'Học tiếng TBN không khó nếu luyện tập mỗi ngày.' },
      { spanish: 'Lo más importante es escuchar mucho y hablar sin miedo.', vietnamese: 'Quan trọng nhất là nghe nhiều và nói không sợ.' },
      { spanish: 'Las películas y las canciones en español te ayudan mucho.', vietnamese: 'Phim và bài hát tiếng TBN giúp bạn rất nhiều.' },
      { spanish: 'También es bueno tener amigos que hablen español.', vietnamese: 'Cũng tốt khi có bạn nói tiếng TBN.' },
    ],
    questions: [
      { question: 'Điều quan trọng nhất?', options: ['Đọc sách', 'Nghe nhiều và nói', 'Viết', 'Ngữ pháp'], correct: 1 },
      { question: 'Cái gì giúp học?', options: ['Phim và bài hát', 'Sách giáo khoa', 'Flashcard', 'Thi'], correct: 0 },
    ],
  },
  { id: 'p10', title: 'El clima en España', titleVi: 'Thời tiết ở TBN', topic: 'Thời tiết', level: 'Beginner', emoji: '🌤️',
    script: [
      { spanish: 'España tiene un clima muy variado.', vietnamese: 'TBN có khí hậu rất đa dạng.' },
      { spanish: 'En el sur hace mucho calor en verano. Puede llegar a cuarenta grados.', vietnamese: 'Phía nam rất nóng mùa hè. Có thể lên 40 độ.' },
      { spanish: 'En el norte llueve más y las temperaturas son más suaves.', vietnamese: 'Phía bắc mưa nhiều hơn và nhiệt độ dịu hơn.' },
      { spanish: 'La mejor época para visitar España es la primavera.', vietnamese: 'Thời điểm tốt nhất đến TBN là mùa xuân.' },
    ],
    questions: [
      { question: 'Phía nam mùa hè?', options: ['Mát', 'Rất nóng', 'Mưa', 'Lạnh'], correct: 1 },
      { question: 'Mùa nào tốt nhất?', options: ['Xuân', 'Hè', 'Thu', 'Đông'], correct: 0 },
    ],
  },
];

// ============================
// 5. SHADOWING (expanded)
// ============================
export const SHADOW_EXERCISES: ShadowExercise[] = [
  {
    id: 's1', title: 'Chào hỏi cơ bản', level: 'Beginner',
    sentences: [
      { spanish: 'Hola, ¿cómo estás?', vietnamese: 'Xin chào, bạn khỏe không?' },
      { spanish: 'Estoy bien, gracias. ¿Y tú?', vietnamese: 'Tôi khỏe, cảm ơn. Còn bạn?' },
      { spanish: 'Me llamo María. Encantada.', vietnamese: 'Tôi tên María. Rất vui.' },
      { spanish: 'Soy de Vietnam. Vivo en Madrid.', vietnamese: 'Tôi từ Việt Nam. Sống ở Madrid.' },
      { spanish: '¿Cómo te llamas?', vietnamese: 'Bạn tên gì?' },
      { spanish: 'Mucho gusto en conocerte.', vietnamese: 'Rất vui được gặp bạn.' },
      { spanish: '¿De dónde eres?', vietnamese: 'Bạn từ đâu?' },
      { spanish: 'Hablo un poco de español.', vietnamese: 'Tôi nói ít tiếng TBN.' },
      { spanish: '¿Puedes hablar más despacio?', vietnamese: 'Nói chậm hơn được không?' },
      { spanish: 'No entiendo. ¿Puedes repetir?', vietnamese: 'Tôi không hiểu. Nói lại được không?' },
    ],
  },
  {
    id: 's2', title: 'Gọi đồ ăn', level: 'Beginner',
    sentences: [
      { spanish: 'Quiero una mesa para dos, por favor.', vietnamese: 'Bàn cho 2 người, làm ơn.' },
      { spanish: '¿Qué me recomienda?', vietnamese: 'Bạn gợi ý gì?' },
      { spanish: 'Voy a tomar la paella, por favor.', vietnamese: 'Tôi gọi paella.' },
      { spanish: 'La cuenta, por favor.', vietnamese: 'Tính tiền, làm ơn.' },
      { spanish: '¿Puedo pagar con tarjeta?', vietnamese: 'Trả bằng thẻ được không?' },
      { spanish: '¿Tienen menú del día?', vietnamese: 'Có thực đơn hôm nay không?' },
      { spanish: 'Para beber, agua sin gas.', vietnamese: 'Đồ uống, nước lọc.' },
      { spanish: 'Esto está delicioso.', vietnamese: 'Món này ngon quá.' },
      { spanish: '¿Tienen algo sin gluten?', vietnamese: 'Có món không gluten không?' },
      { spanish: 'La propina está incluida.', vietnamese: 'Tiền boa đã gồm.' },
    ],
  },
  {
    id: 's3', title: 'Hỏi đường', level: 'Beginner',
    sentences: [
      { spanish: 'Perdone, ¿dónde está el metro?', vietnamese: 'Xin lỗi, tàu điện ngầm ở đâu?' },
      { spanish: 'Siga todo recto y gire a la derecha.', vietnamese: 'Đi thẳng rồi rẽ phải.' },
      { spanish: '¿Está lejos de aquí?', vietnamese: 'Có xa đây không?' },
      { spanish: 'No, está a cinco minutos andando.', vietnamese: 'Không, đi bộ 5 phút.' },
      { spanish: '¿Puede mostrarme en el mapa?', vietnamese: 'Chỉ trên bản đồ được không?' },
      { spanish: 'La segunda calle a la izquierda.', vietnamese: 'Đường thứ 2 bên trái.' },
      { spanish: '¿Hay una estación de metro cerca?', vietnamese: 'Có ga tàu gần đây không?' },
      { spanish: 'Está al final de esta calle.', vietnamese: 'Ở cuối đường này.' },
      { spanish: 'Cruce el puente y verá el museo.', vietnamese: 'Qua cầu sẽ thấy bảo tàng.' },
      { spanish: 'Está justo enfrente del parque.', vietnamese: 'Ngay đối diện công viên.' },
    ],
  },
  {
    id: 's4', title: 'Mua sắm & giá cả', level: 'Intermediate',
    sentences: [
      { spanish: '¿Cuánto cuesta esta camiseta?', vietnamese: 'Áo này bao nhiêu?' },
      { spanish: '¿Tiene una talla más grande?', vietnamese: 'Có size lớn hơn không?' },
      { spanish: 'Me lo llevo. ¿Dónde pago?', vietnamese: 'Tôi lấy. Trả tiền ở đâu?' },
      { spanish: 'Es demasiado caro. ¿Hay descuento?', vietnamese: 'Đắt quá. Có giảm giá không?' },
      { spanish: '¿Puedo probármelo?', vietnamese: 'Tôi thử được không?' },
      { spanish: '¿Aceptan pagos con el móvil?', vietnamese: 'Thanh toán bằng điện thoại được không?' },
      { spanish: 'Quiero devolver este artículo.', vietnamese: 'Tôi muốn trả lại sản phẩm này.' },
      { spanish: '¿Tienen este modelo en otro color?', vietnamese: 'Có mẫu này màu khác không?' },
      { spanish: 'Me queda perfecto.', vietnamese: 'Vừa hoàn hảo.' },
      { spanish: '¿La garantía cubre dos años?', vietnamese: 'Bảo hành 2 năm phải không?' },
    ],
  },
  {
    id: 's5', title: 'Công việc & họp hành', level: 'Intermediate',
    sentences: [
      { spanish: 'Buenos días. Tengo una reunión a las diez.', vietnamese: 'Chào buổi sáng. Tôi có họp lúc 10.' },
      { spanish: 'Le envío el informe por correo electrónico.', vietnamese: 'Tôi gửi báo cáo qua email.' },
      { spanish: '¿Podemos programar una reunión para mañana?', vietnamese: 'Lên lịch họp ngày mai được không?' },
      { spanish: 'Necesito más tiempo para terminar el proyecto.', vietnamese: 'Tôi cần thêm thời gian hoàn thành dự án.' },
      { spanish: 'El plazo es el viernes a las cinco.', vietnamese: 'Hạn chót là thứ Sáu lúc 5 giờ.' },
      { spanish: '¿Puede repetir la pregunta, por favor?', vietnamese: 'Lặp lại câu hỏi được không?' },
      { spanish: 'Estoy de acuerdo con su propuesta.', vietnamese: 'Tôi đồng ý với đề xuất.' },
      { spanish: 'Trabajamos en equipo para lograr los objetivos.', vietnamese: 'Chúng tôi làm việc nhóm để đạt mục tiêu.' },
      { spanish: 'La presentación fue muy interesante.', vietnamese: 'Bài thuyết trình rất hay.' },
      { spanish: 'Gracias por su tiempo. Ha sido muy productivo.', vietnamese: 'Cảm ơn thời gian. Rất hiệu quả.' },
    ],
  },
  {
    id: 's6', title: 'Ở bệnh viện', level: 'Intermediate',
    sentences: [
      { spanish: 'Me duele mucho la cabeza.', vietnamese: 'Tôi đau đầu lắm.' },
      { spanish: 'Tengo alergia a la penicilina.', vietnamese: 'Tôi dị ứng penicillin.' },
      { spanish: '¿Necesito una receta médica?', vietnamese: 'Tôi cần đơn thuốc không?' },
      { spanish: 'He tenido fiebre durante tres días.', vietnamese: 'Tôi sốt 3 ngày rồi.' },
      { spanish: 'El médico me dijo que descanse.', vietnamese: 'Bác sĩ bảo tôi nghỉ ngơi.' },
      { spanish: 'Tome este medicamento dos veces al día.', vietnamese: 'Uống thuốc này 2 lần/ngày.' },
      { spanish: '¿Cuándo puedo volver al trabajo?', vietnamese: 'Khi nào đi làm lại được?' },
      { spanish: 'Necesito pedir cita con el especialista.', vietnamese: 'Tôi cần hẹn bác sĩ chuyên khoa.' },
    ],
  },
];
