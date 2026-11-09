/**
 * GIA SƯ TRỢ LÝ AI LỚP 6 - HỌC TẬP THÔNG MINH
 * Fullstack Frontend SPA Architecture with Vue 3
 * Bám sát chương trình GDPT 2018 (Kết nối tri thức, Cánh diều, Chân trời sáng tạo)
 */

// Sound Synthesizer via Web Audio API (No external sound files required)
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCorrect() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playWrong() {
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(240, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  playFanfare() {
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + i * 0.12;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch (e) {
      console.warn('Fanfare error:', e);
    }
  }
}

const sfx = new SoundEffects();

// FULL 7 SUBJECTS KNOWLEDGE BASE (LỚP 6 - CHUẨN BỘ GD&ĐT)
const SUBJECTS_DATA = [
  {
    id: 'math',
    name: 'Toán Học',
    shortDesc: 'Số học & Hình học',
    icon: 'fa-solid fa-calculator',
    bgGradient: 'bg-gradient-to-tr from-blue-600 to-indigo-600',
    borderColor: 'border-indigo-500',
    shadowColor: 'shadow-indigo-500/20',
    description: 'Khám phá thế giới số nguyên, phân số, hình học trực quan và xác suất thực nghiệm kỳ thú.',
    topics: [
      {
        id: 'math-integers',
        title: 'Tập Hợp Số Nguyên (Z)',
        summary: 'Số nguyên bao gồm số nguyên âm, số 0 và số nguyên dương. Giúp biểu diễn các đại lượng thực tế như nhiệt độ dưới 0°C, độ sâu dưới mực nước biển hay số tiền nợ/lời.',
        flashcards: [
          {
            question: 'Số đối của một số nguyên là gì?',
            answer: 'Hai số đối nhau có cùng khoảng cách đến điểm 0 trên trục số nhưng nằm về hai phía khác nhau. Số đối của a là -a. Ví dụ: số đối của 5 là -5, số đối của -8 là 8, số đối của 0 là 0.'
          },
          {
            question: 'Quy tắc cộng hai số nguyên khác dấu?',
            answer: 'Muốn cộng hai số nguyên khác dấu không đối nhau: Lấy số có phần số tự nhiên lớn hơn trừ đi số có phần số tự nhiên nhỏ hơn, rồi đặt trước kết quả dấu của số có phần số tự nhiên lớn hơn. Ví dụ: (-15) + 9 = -(15 - 9) = -6.'
          },
          {
            question: 'Quy tắc dấu ngoặc trong Toán học?',
            answer: 'Khi bỏ dấu ngoặc có dấu "+" đằng trước, giữ nguyên dấu của các số hạng. Khi bỏ dấu ngoặc có dấu "-" đằng trước, ta phải đổi dấu tất cả các số hạng trong ngoặc (+ thành -, - thành +).'
          }
        ],
        keyPoints: [
          'Tập hợp số nguyên kí hiệu là Z: Z = {..., -3, -2, -1, 0, 1, 2, 3, ...}.',
          'Mọi số nguyên dương đều lớn hơn 0; mọi số nguyên âm đều nhỏ hơn 0.',
          'Trong hai số nguyên âm, số nào có phần số tự nhiên lớn hơn thì số đó bé hơn: Ví dụ -10 < -2.',
          'Nhân hai số nguyên cùng dấu cho kết quả dương; khác dấu cho kết quả âm: (+).(+) = (+), (-).(-) = (+), (+).(-) = (-).'
        ],
        realLife: 'Khi dự báo thời tiết ở Sa Pa mùa đông là -2°C, tức là lạnh hơn mức nước đóng băng 2 độ! Hoặc thợ lặn ở độ sâu -15m nghĩa là đang ở dưới mặt nước biển 15 mét.',
        quizzes: [
          {
            question: 'Kết quả của phép tính (-18) + 25 là bao nhiêu?',
            options: {
              A: '-7',
              B: '7',
              C: '43',
              D: '-43'
            },
            correct: 'B',
            explanation: 'Cộng hai số nguyên khác dấu: Lấy 25 - 18 = 7. Vì 25 có phần số tự nhiên lớn hơn và mang dấu dương nên kết quả mang dấu dương (+7).'
          },
          {
            question: 'Số đối của số nguyên -45 là:',
            options: {
              A: '45',
              B: '-45',
              C: '0',
              D: '1/45'
            },
            correct: 'A',
            explanation: 'Số đối của một số âm là số dương tương ứng. Do đó số đối của -45 là 45.'
          },
          {
            question: 'Nhiệt độ buổi sáng ở Mẫu Sơn là -3°C, đến trưa tăng thêm 5°C. Nhiệt độ buổi trưa là:',
            options: {
              A: '-8°C',
              B: '8°C',
              C: '2°C',
              D: '-2°C'
            },
            correct: 'C',
            explanation: 'Nhiệt độ buổi trưa = (-3) + 5 = 5 - 3 = 2°C.'
          },
          {
            question: 'Tích của (-4) . (-5) bằng:',
            options: {
              A: '-20',
              B: '20',
              C: '-9',
              D: '9'
            },
            correct: 'B',
            explanation: 'Quy tắc nhân hai số nguyên cùng dấu: âm nhân âm ra dương: (-4) . (-5) = 20.'
          }
        ],
        challenges: [
          {
            prompt: 'Tại sao trong kinh doanh buôn bán, người ta lại biểu thị lợi nhuận bằng số dương và thua lỗ bằng số âm? Em hãy nêu một tình huống thực tế của gia đình.',
            aiHint: 'Số dương thể hiện sự gia tăng vốn/tài sản (thu về nhiều hơn chi ra), còn số âm thể hiện sự hao hụt. Ví dụ: Tháng này cửa hàng mẹ bán được lãi 5.000.000đ (+5tr), nhưng tháng trước sửa cửa tiệm mất chi phí lỗ 2.000.000đ (-2tr).',
            studentAnswer: '',
            showHint: false
          },
          {
            prompt: 'Nếu một chiếc tàu ngầm đang ở độ sâu -40m, muốn nổi lên 15m thì vị trí mới sẽ là bao nhiêu? Biểu diễn bằng phép tính số nguyên.',
            aiHint: 'Vị trí mới = Vị trí cũ + Độ dịch chuyển = (-40) + 15 = -25m (vẫn ở dưới mặt nước biển 25m). Phép cộng số nguyên giúp mô tả chuyển động dọc chính xác.',
            studentAnswer: '',
            showHint: false
          }
        ]
      },
      {
        id: 'math-geometry',
        title: 'Hình Học Trực Quan (Hình Có Trục Đối Xứng & Tâm Đối Xứng)',
        summary: 'Khám phá vẻ đẹp cân bằng của các hình phẳng trong tự nhiên: Hình tam giác đều, hình vuông, hình lục giác đều, hình thoi, hình chữ nhật và tính đối xứng kỳ diệu.',
        flashcards: [
          {
            question: 'Hình có trục đối xứng là hình như thế nào?',
            answer: 'Một hình có trục đối xứng nếu khi gấp hình theo đường thẳng trục đó, hai nửa của hình trùng khít lên nhau hoàn toàn. Ví dụ: Trái tim, hình cánh bướm, hình chữ nhật có 2 trục đối xứng.'
          },
          {
            question: 'Tâm đối xứng của một hình là gì?',
            answer: 'Điểm O là tâm đối xứng của một hình nếu khi quay hình đó nửa vòng (180°) quanh điểm O, hình đó trùng khít với chính nó ở vị trí ban đầu. Ví dụ: Tâm của hình bình hành, hình tròn, chong chóng 4 cánh.'
          },
          {
            question: 'Hình lục giác đều có bao nhiêu trục đối xứng?',
            answer: 'Hình lục giác đều có 6 trục đối xứng (3 đường nối các đỉnh đối diện và 3 đường nối trung điểm các cạnh đối diện) và có 1 tâm đối xứng tại tâm của hình.'
          }
        ],
        keyPoints: [
          'Hình vuông có 4 trục đối xứng và 1 tâm đối xứng (giao điểm hai đường chéo).',
          'Hình tròn có vô số trục đối xứng (mọi đường thẳng đi qua tâm) và 1 tâm đối xứng chính là tâm hình tròn.',
          'Tam giác đều có 3 trục đối xứng nhưng KHÔNG có tâm đối xứng.',
          'Tính đối xứng tạo nên sự vững chắc, hài hòa và thẩm mỹ trong kiến trúc và tự nhiên.'
        ],
        realLife: 'Loài ong luôn xây tổ dạng các ống hình lục giác đều vì đây là cấu trúc giúp tiết kiệm sáp ong nhất mà vẫn chứa được lượng mật tối đa và chịu lực cực kỳ bền chắc!',
        quizzes: [
          {
            question: 'Hình nào dưới đây KHÔNG có tâm đối xứng?',
            options: {
              A: 'Hình vuông',
              B: 'Hình bình hành',
              C: 'Tam giác đều',
              D: 'Hình tròn'
            },
            correct: 'C',
            explanation: 'Tam giác đều có 3 trục đối xứng nhưng không có tâm đối xứng (khi quay 180° quanh trọng tâm, đỉnh tam giác sẽ lộn ngược xuống dưới chứ không trùng khít hình ban đầu).'
          },
          {
            question: 'Chữ cái in hoa nào sau đây vừa có trục đối xứng vừa có tâm đối xứng?',
            options: {
              A: 'Chữ H',
              B: 'Chữ A',
              C: 'Chữ M',
              D: 'Chữ N'
            },
            correct: 'A',
            explanation: 'Chữ H có 2 trục đối xứng (ngang và dọc) và có tâm đối xứng tại điểm chính giữa thanh ngang.'
          },
          {
            question: 'Hình thoi có bao nhiêu trục đối xứng?',
            options: {
              A: '1 trục',
              B: '2 trục',
              C: '4 trục',
              D: 'Vô số trục'
            },
            correct: 'B',
            explanation: 'Hình thoi có 2 trục đối xứng chính là hai đường thẳng chứa hai đường chéo của nó.'
          },
          {
            question: 'Hình chữ nhật có độ dài hai cạnh là 6cm và 8cm. Chu vi của hình chữ nhật đó là:',
            options: {
              A: '48 cm',
              B: '28 cm',
              C: '14 cm',
              D: '24 cm'
            },
            correct: 'B',
            explanation: 'Chu vi hình chữ nhật = (Dài + Rộng) x 2 = (6 + 8) x 2 = 14 x 2 = 28 cm.'
          }
        ],
        challenges: [
          {
            prompt: 'Quan sát đồ vật quanh bàn học của em (thước kẻ, mặt bàn, cuốn sách, đồng hồ), đồ vật nào có tính đối xứng và điều đó giúp ích gì cho việc sử dụng?',
            aiHint: 'Mặt bàn hình chữ nhật giúp chia sẻ không gian cân bằng. Chiếc kéo có tính đối xứng giúp lực cắt truyền đều từ hai quai kéo. Đồng hồ tròn giúp kim quay quét đều diện tích mặt số.',
            studentAnswer: '',
            showHint: false
          },
          {
            prompt: 'Tại sao bánh xe các phương tiện giao thông (xe đạp, xe máy, ô tô) luôn có dạng hình tròn mà không phải hình vuông hay hình tam giác?',
            aiHint: 'Hình tròn có tâm đối xứng và khoảng cách từ tâm tới mọi điểm trên viền bánh (bán kính) luôn bằng nhau không đổi. Nhờ đó, trục xe luôn giữ nguyên độ cao so với mặt đường, giúp xe di chuyển êm ái mà không bị xóc.',
            studentAnswer: '',
            showHint: false
          }
        ]
      }
    ]
  },
  {
    id: 'literature',
    name: 'Ngữ Văn',
    shortDesc: 'Đọc hiểu & Tiếng Việt',
    icon: 'fa-solid fa-feather-pointed',
    bgGradient: 'bg-gradient-to-tr from-rose-500 to-pink-600',
    borderColor: 'border-pink-500',
    shadowColor: 'shadow-pink-500/20',
    description: 'Bồi dưỡng tâm hồn qua những câu chuyện truyền thuyết, cổ tích hào hùng và rèn luyện kỹ năng viết tiếng Việt truyền cảm hứng.',
    topics: [
      {
        id: 'literature-legends',
        title: 'Truyện Truyền Thuyết & Chi Tiết Hoang Đường Kì Ảo',
        summary: 'Tìm hiểu thể loại truyện dân gian kể về các nhân vật và sự kiện lịch sử trong quá khứ qua lăng kính tưởng tượng kì ảo của nhân dân, thể hiện thái độ tôn vinh các anh hùng dân tộc.',
        flashcards: [
          {
            question: 'Truyền thuyết là gì?',
            answer: 'Truyền thuyết là loại truyện dân gian kể về các sự kiện và nhân vật có liên quan đến lịch sử thời quá khứ, thường có yếu tố tưởng tượng, kì ảo nhằm thể hiện sự ngưỡng mộ, tôn vinh công lao của nhân dân đối với người anh hùng.'
          },
          {
            question: 'Ý nghĩa của chi tiết Thánh Gióng vươn vai thành tráng sĩ?',
            answer: 'Tượng trưng cho sự lớn mạnh phi thường của tinh thần yêu nước và sức mạnh đoàn kết toàn dân tộc khi đất nước gặp hoạn nạn, giặc ngoại xâm đe dọa.'
          },
          {
            question: 'Vai trò của yếu tố hoang đường kì ảo trong truyện dân gian?',
            answer: 'Làm cho câu chuyện thêm phần hấp dẫn, lung linh, đồng thời thần thánh hóa các nhân vật lịch sử, thể hiện ước mơ của người xưa về công lý và sức mạnh vượt bậc.'
          }
        ],
        keyPoints: [
          'Nhân vật truyền thuyết thường có sự ra đời khác thường, lập chiến công hiển hách.',
          'Kết thúc truyện thường gắn liền với dấu tích lịch sử (đền thờ, tên làng, tên núi, tục lệ cúng lễ).',
          'Truyền thuyết tiêu biểu: Thánh Gióng, Sơn Tinh - Thủy Tinh, Bánh chưng bánh giầy, Sự tích Hồ Gươm.',
          'Bài học nhân văn: Lòng yêu nước, đạo lý uống nước nhớ nguồn, tinh thần chống thiên tai và ngoại xâm.'
        ],
        realLife: 'Mỗi dịp Tết Nguyên Đán, cả gia đình cùng gói bánh chưng bánh giầy là chúng ta đang kế thừa phong tục ngàn đời từ truyền thuyết Lang Liêu thời vua Hùng!',
        quizzes: [
          {
            question: 'Chi tiết nào sau đây trong truyện "Thánh Gióng" mang tính chất hoang đường, kì ảo?',
            options: {
              A: 'Gióng ăn cơm của dân làng gom góp',
              B: 'Gióng cưỡi ngựa sắt phun lửa, bay về trời sau khi thắng giặc',
              C: 'Mẹ Gióng sinh sống ở làng Gióng',
              D: 'Vua Hùng sai sứ giả đi tìm người tài cứu nước'
            },
            correct: 'B',
            explanation: 'Ngựa sắt có thể hí vang và phun ra lửa, sau đó người và ngựa cùng bay thẳng lên mây là chi tiết kì ảo do trí tưởng tượng của nhân dân sáng tạo nhằm bất tử hóa người anh hùng.'
          },
          {
            question: 'Ý nghĩa cốt lõi của hình tượng Sơn Tinh trong truyền thuyết "Sơn Tinh - Thủy Tinh" là gì?',
            options: {
              A: 'Ước mơ chinh phục và chế ngự bão lũ, thiên tai của người Việt cổ',
              B: 'Tình yêu say đắm đối với nàng Mị Nương',
              C: 'Sự giàu có về các sản vật quý trên rừng',
              D: 'Sức mạnh của quân đội thời các vua Hùng'
            },
            correct: 'A',
            explanation: 'Sơn Tinh là biểu tượng của tinh thần quật cường, kiên trì đắp đê ngăn lũ, quyết tâm bảo vệ mùa màng và cuộc sống trước hiểm họa thiên tai lũ lụt.'
          },
          {
            question: 'Biện pháp tu từ nào được sử dụng trong câu: "Bác Hồ là vầng thái dương soi sáng con đường giải phóng dân tộc"?',
            options: {
              A: 'Nhân hóa',
              B: 'So sánh',
              C: 'Ẩn dụ',
              D: 'Hoán dụ'
            },
            correct: 'B',
            explanation: 'Câu văn dùng từ so sánh "là" để đối sánh giữa "Bác Hồ" và "vầng thái dương", làm nổi bật công lao vĩ đại của Người.'
          },
          {
            question: 'Từ ngữ nào sau đây là từ ghép đẳng lập?',
            options: {
              A: 'Quần áo',
              B: 'Xe đạp',
              C: 'Bút chì',
              D: 'Mẹ ruột'
            },
            correct: 'A',
            explanation: '"Quần áo" gồm hai tiếng có nghĩa bình đẳng, không tiếng nào phụ thuộc tiếng nào (quần và áo đều là trang phục).'
          }
        ],
        challenges: [
          {
            prompt: 'Nếu được nhập vai là người dân làng Gióng chứng kiến cảnh tráng sĩ đánh tan giặc Ân bay về trời, em sẽ nói gì với người anh hùng?',
            aiHint: 'Hãy bày tỏ lòng biết ơn sâu sắc, lời hứa sẽ chăm chỉ học tập, giữ gìn bờ cõi non sông mà các bậc tiền nhân đã dùng máu xương bảo vệ.',
            studentAnswer: '',
            showHint: false
          },
          {
            prompt: 'Viết một đoạn văn ngắn (3 - 5 câu) miêu tả cảnh thiên nhiên quê hương em, trong đó có sử dụng ít nhất một biện pháp so sánh hoặc nhân hóa.',
            aiHint: 'Gợi ý: "Những cánh đồng lúa chín vàng ươm trải dài như một tấm thảm khổng lồ. Từng ngọn gió sớm thì thầm đánh thức đàn chim ríu rít ca vang..."',
            studentAnswer: '',
            showHint: false
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    name: 'Khoa Học Tự Nhiên',
    shortDesc: 'Vật chất & Tế bào sống',
    icon: 'fa-solid fa-flask-vial',
    bgGradient: 'bg-gradient-to-tr from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500',
    shadowColor: 'shadow-emerald-500/20',
    description: 'Tìm hiểu bí mật của các chất xung quanh, cấu tạo tế bào sống, lực và chuyển động trong vũ trụ.',
    topics: [
      {
        id: 'science-matter',
        title: 'Các Thể Của Chất & Sự Chuyển Thể (Rắn - Lỏng - Khí)',
        summary: 'Mọi vật chất quanh ta đều tồn tại ở các thể khác nhau. Khi thay đổi nhiệt độ, chất có thể chuyển đổi linh hoạt giữa rắn, lỏng và khí (nóng chảy, đông đặc, bay hơi, ngưng tụ, sôi).',
        flashcards: [
          {
            question: 'Sự ngưng tụ là gì? Nêu ví dụ đời sống?',
            answer: 'Ngưng tụ là quá trình chất chuyển từ thể khí (hơi) sang thể lỏng khi gặp lạnh. Ví dụ: Những giọt sương đọng trên lá cây vào sáng sớm, hoặc giọt nước đọng bên ngoài thành cốc nước đá.'
          },
          {
            question: 'Vì sao chất khí dễ bị nén còn chất rắn thì rất khó bị nén?',
            answer: 'Vì trong chất khí, các hạt phân tử ở rất xa nhau và chuyển động hỗn loạn tự do nên có nhiều khoảng trống. Còn ở chất rắn, các hạt liên kết rất chặt chẽ và sát nhau.'
          },
          {
            question: 'Nước đá có nhiệt độ nóng chảy là bao nhiêu?',
            answer: 'Nước đá tinh khiết nóng chảy ở 0°C (ở áp suất khí quyển tiêu chuẩn). Trong suốt thời gian nóng chảy, nhiệt độ của nước đá không đổi.'
          }
        ],
        keyPoints: [
          'Thể Rắn: Có hình dạng và thể tích xác định, rất khó nén.',
          'Thể Lỏng: Có thể tích xác định nhưng không có hình dạng xác định (phụ thuộc bình chứa), khó nén.',
          'Thể Khí: Không có hình dạng và thể tích xác định, chiếm toàn bộ không gian bình chứa, rất dễ bị nén.',
          'Vòng tuần hoàn của nước trong tự nhiên là minh chứng vĩ đại nhất của sự chuyển thể.'
        ],
        realLife: 'Khi nấu cơm, nắp vung thường đọng rất nhiều giọt nước nhỏ li ti. Đó chính là hơi nước bốc lên từ nồi cơm gặp mặt nắp vung lạnh hơn nên ngưng tụ thành nước lỏng!',
        quizzes: [
          {
            question: 'Hiện tượng nào sau đây là hiện tượng đông đặc?',
            options: {
              A: 'Nước đá để ngoài trời tan thành nước lỏng',
              B: 'Mỡ lỏng để nguội bị đông lại thành khối',
              C: 'Quần áo ướt phơi dưới nắng khô dần',
              D: 'Mặt gương trong phòng tắm bị mờ khi tắm nước nóng'
            },
            correct: 'B',
            explanation: 'Đông đặc là quá trình chuyển từ thể lỏng sang thể rắn khi giảm nhiệt độ (mỡ lỏng hóa rắn khi nguội).'
          },
          {
            question: 'Đơn vị đo khối lượng chuẩn trong hệ thống đo lường quốc tế (SI) là gì?',
            options: {
              A: 'Gam (g)',
              B: 'Tấn (t)',
              C: 'Kilôgam (kg)',
              D: 'Miligam (mg)'
            },
            correct: 'C',
            explanation: 'Kilôgam (kí hiệu: kg) là đơn vị đo khối lượng hợp pháp trong hệ đo lường SI.'
          },
          {
            question: 'Khí nào chiếm thể tích lớn nhất trong thành phần của không khí xung quanh chúng ta?',
            options: {
              A: 'Khí Oxygen (O2)',
              B: 'Khí Nitrogen (N2) - khoảng 78%',
              C: 'Khí Carbon dioxide (CO2)',
              D: 'Hơi nước'
            },
            correct: 'B',
            explanation: 'Khí Nitrogen chiếm khoảng 78% thể tích không khí, Oxygen chiếm khoảng 21%, còn lại là các khí khác (CO2, Argon, hơi nước).'
          },
          {
            question: 'Bộ phận nào được coi là "nhà máy sản xuất năng lượng" của tế bào thực vật và động vật?',
            options: {
              A: 'Màng sinh chất',
              B: 'Ti thể',
              C: 'Nhân tế bào',
              D: 'Không bào'
            },
            correct: 'B',
            explanation: 'Ti thể thực hiện quá trình hô hấp tế bào, phân giải chất hữu cơ để giải phóng năng lượng ATP nuôi sống cơ thể.'
          }
        ],
        challenges: [
          {
            prompt: 'Tại sao khi muốn bảo quản rau củ tươi lâu trong tủ lạnh, ta nên cho rau vào túi zip hoặc hộp kín có nắp thay vì để trần?',
            aiHint: 'Không khí khô lạnh trong tủ lạnh làm nước trong rau nhanh chóng bay hơi khiến rau bị héo úa. Đựng trong túi kín giúp giữ độ ẩm, ngăn cản sự bay hơi của nước từ tế bào rau.',
            studentAnswer: '',
            showHint: false
          },
          {
            prompt: 'Giải thích tại sao cốc trà sữa đá sau một lúc để trên bàn lại có những giọt nước đọng ở mặt ngoài vỏ cốc? Có phải nước trong cốc thấm ra không?',
            aiHint: 'Nước hoàn toàn không thấm qua thành cốc nhựa! Thành cốc bị nước đá bên trong làm lạnh, khiến hơi nước vô hình có sẵn trong không khí xung quanh khi chạm vào thành cốc lạnh bị ngưng tụ thành giọt lỏng.',
            studentAnswer: '',
            showHint: false
          }
        ]
      }
    ]
  },
  {
    id: 'history_geo',
    name: 'Lịch Sử & Địa Lí',
    shortDesc: 'Thời nguyên thủy & Trái Đất',
    icon: 'fa-solid fa-earth-americas',
    bgGradient: 'bg-gradient-to-tr from-amber-500 to-orange-600',
    borderColor: 'border-amber-500',
    shadowColor: 'shadow-amber-500/20',
    description: 'Hành trình khám phá cội nguồn nhân loại, các nền văn minh sông Nin, sông Hằng và quy luật tự quay của Địa Cầu.',
    topics: [
      {
        id: 'geo-earth',
        title: 'Trái Đất Trong Hệ Mặt Trời & Chuyển Động Tự Quay',
        summary: 'Trái Đất là hành tinh thứ 3 tính từ Mặt Trời, có dạng hình cầu hơi dẹt ở hai cực. Chuyển động tự quay quanh trục từ Tây sang Đông sinh ra hiện tượng ngày đêm luân phiên và lực Coriolis.',
        flashcards: [
          {
            question: 'Trái Đất tự quay quanh trục một vòng mất bao lâu?',
            answer: 'Trái Đất tự quay một vòng quanh trục tưởng tượng hết khoảng 24 giờ (1 ngày đêm), theo chiều từ Tây sang Đông.'
          },
          {
            question: 'Vì sao trên Trái Đất có hiện tượng ngày và đêm luân phiên?',
            answer: 'Vì Trái Đất có dạng hình cầu nên Mặt Trời chỉ chiếu sáng được một nửa (ban ngày), nửa còn lại chìm trong bóng tối (ban đêm). Do Trái Đất tự quay liên tục quanh trục nên mọi nơi trên Trái Đất đều lần lượt được chiếu sáng rồi lại vào bóng tối.'
          },
          {
            question: 'Kim tự tháp Ai Cập cổ đại được xây dựng để làm gì?',
            answer: 'Kim tự tháp là lăng mộ khổng lồ chôn cất các Pharaon (vua Ai Cập cổ đại), thể hiện niềm tin vào sự bất tử của linh hồn và tài năng kiến trúc đỉnh cao của người cổ đại.'
          }
        ],
        keyPoints: [
          'Trái Đất là hành tinh duy nhất trong Hệ Mặt Trời hiện biết có sự sống phát triển mạnh mẽ.',
          'Đường Xích đạo là vĩ tuyến lớn nhất chia quả cầu thành Bán cầu Bắc và Bán cầu Nam.',
          'Các nền văn minh cổ đại lớn ở phương Đông đều hình thành bên lưu vực các dòng sông lớn (Sông Nin, Sông Ấn, Sông Hằng, Hoàng Hà).',
          'Người nguyên thủy phát minh ra lửa là bước ngoặt vĩ đại giúp sưởi ấm, nướng chín thức ăn và xua đuổi thú dữ.'
        ],
        realLife: 'Khi chúng ta ở Việt Nam đang học bài lúc 12 giờ trưa thì các bạn nhỏ ở Luân Đôn (Anh) mới chỉ 5 giờ sáng đang ngủ say, vì hai nơi nằm ở các múi giờ khác nhau!',
        quizzes: [
          {
            question: 'Trái Đất tự quay quanh trục tưởng tượng theo hướng nào?',
            options: {
              A: 'Từ Đông sang Tây',
              B: 'Từ Tây sang Đông',
              C: 'Từ Bắc xuống Nam',
              D: 'Từ Nam lên Bắc'
            },
            correct: 'B',
            explanation: 'Trái Đất tự quay từ Tây sang Đông, chính vì vậy mà chúng ta luôn nhìn thấy Mặt Trời mọc ở hướng Đông và lặn ở hướng Tây.'
          },
          {
            question: 'Nền văn minh Ai Cập cổ đại được hình thành bên lưu vực con sông nào?',
            options: {
              A: 'Sông Mê Kông',
              B: 'Sông Hằng',
              C: 'Sông Nin (Nile)',
              D: 'Sông Amazon'
            },
            correct: 'C',
            explanation: 'Nhà sử học Hê-rô-đốt từng nói: "Ai Cập là tặng phẩm của sông Nin" vì dòng sông này mang lại nguồn nước và lớp phù sa màu mỡ nuôi dưỡng nền văn minh.'
          },
          {
            question: 'Kinh tuyến gốc (kinh tuyến 0 độ) đi qua đài thiên văn Greenwich nằm ở quốc gia nào?',
            options: {
              A: 'Nước Pháp',
              B: 'Nước Mỹ',
              C: 'Vương quốc Anh',
              D: 'Nước Nga'
            },
            correct: 'C',
            explanation: 'Đài thiên văn Hoàng gia Greenwich nằm ở thủ đô Luân Đôn của nước Anh, nơi được quy ước làm mốc kinh tuyến 0°.'
          },
          {
            question: 'Việt Nam nằm trong múi giờ số mấy trên bản đồ giờ thế giới (GMT)?',
            options: {
              A: 'Múi giờ số +5',
              B: 'Múi giờ số +7',
              C: 'Múi giờ số +9',
              D: 'Múi giờ số 0'
            },
            correct: 'B',
            explanation: 'Việt Nam nằm hoàn toàn trong múi giờ số 7 (GMT+7).'
          }
        ],
        challenges: [
          {
            prompt: 'Nếu Trái Đất ngừng quay quanh trục thì điều gì khủng khiếp sẽ xảy ra với sự sống?',
            aiHint: 'Một nửa Trái Đất sẽ luôn là ban ngày nắng thiêu đốt nóng hàng trăm độ C, nửa còn lại sẽ là đêm tối vĩnh cửu băng giá đóng băng mọi thứ. Khí hậu biến dạng hủy diệt đa số sinh vật.',
            studentAnswer: '',
            showHint: false
          },
          {
            prompt: 'Tại sao các nền văn minh cổ đại lớn của nhân loại (Ai Cập, Lưỡng Hà, Ấn Độ, Trung Hoa) đều ra đời ven các dòng sông lớn?',
            aiHint: 'Sông ngòi cung cấp nguồn nước ngọt dồi dào cho sinh hoạt và tưới tiêu, bồi đắp phù sa màu mỡ để trồng trọt, đồng thời là tuyến giao thông đường thủy thuận tiện cho giao thương buôn bán.',
            studentAnswer: '',
            showHint: false
          }
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'Tiếng Anh (English 6)',
    shortDesc: 'Vocabulary & Grammar',
    icon: 'fa-solid fa-language',
    bgGradient: 'bg-gradient-to-tr from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500',
    shadowColor: 'shadow-cyan-500/20',
    description: 'Chinh phục tiếng Anh giao tiếp chuẩn Global Success / Friends Plus với Unit 1 My New School, Unit 2 My House.',
    topics: [
      {
        id: 'eng-school',
        title: 'Unit 1: My New School & Present Simple Tense',
        summary: 'Làm quen với trường học mới, các môn học, dụng cụ học tập và làm chủ thì Hiện tại đơn (Present Simple Tense) để nói về thói quen hàng ngày.',
        flashcards: [
          {
            question: 'Cấu trúc thì Hiện tại đơn với động từ thường?',
            answer: 'Khẳng định: S + V(s/es). Phủ định: S + do/does not + V-nguyên thể. Nghi vấn: Do/Does + S + V-nguyên thể? Chú ý: He/She/It đi với động từ thêm "s/es" hoặc trợ động từ "does".'
          },
          {
            question: 'Cách phát âm đuôi "-s/es" sau danh từ hoặc động từ?',
            answer: '1. Phát âm là /s/ sau các âm vô thanh /p/, /t/, /k/, /f/, /θ/.\n2. Phát âm là /ɪz/ sau các âm /s/, /z/, /ʃ/, /tʃ/, /dʒ/.\n3. Phát âm là /z/ với các trường hợp còn lại.'
          },
          {
            question: 'Cách phân biệt "play", "do", "have" với môn học/hoạt động?',
            answer: '- "Play" dùng cho thể thao có bóng hoặc nhạc cụ: play football, play piano.\n- "Do" dùng cho võ thuật, bài tập: do karate, do homework.\n- "Have" dùng cho bữa ăn, bài học: have lunch, have English.'
          }
        ],
        keyPoints: [
          'Từ vựng trường học: calculator (máy tính cầm tay), compass (com-pa), uniform (đồng phục), library (thư viện).',
          'Trạng từ chỉ tần suất: always (luôn luôn) > usually (thường thường) > often (thường) > sometimes (đôi khi) > never (không bao giờ).',
          'Vị trí trạng từ chỉ tần suất: Đứng TRƯỚC động từ thường, đứng SAU động từ To Be.',
          'Ví dụ: "I always wear my uniform on Mondays" / "She is always kind".'
        ],
        realLife: 'Khi gặp một người bạn nước ngoài đến thăm trường, em có thể tự tin giới thiệu: "Welcome to my school! It has a big library and a green playground!"',
        quizzes: [
          {
            question: 'Nam usually __________ football with his classmates after school.',
            options: {
              A: 'play',
              B: 'plays',
              C: 'is playing',
              D: 'played'
            },
            correct: 'B',
            explanation: 'Chủ ngữ "Nam" là ngôi thứ 3 số ít (He) trong thì Hiện tại đơn, có trạng từ "usually", nên động từ "play" phải thêm "s" -> "plays".'
          },
          {
            question: 'Choose the correct sentence:',
            options: {
              A: 'She always is friendly.',
              B: 'She is friendly always.',
              C: 'She is always friendly.',
              D: 'Always she is friendly.'
            },
            correct: 'C',
            explanation: 'Quy tắc vị trí: Trạng từ chỉ tần suất (always) đứng ngay sau động từ to be (is) -> "She is always friendly".'
          },
          {
            question: 'Which word has the underlined part pronounced as /ɪz/?',
            options: {
              A: 'books',
              B: 'pens',
              C: 'watches',
              D: 'cats'
            },
            correct: 'C',
            explanation: 'Từ "watch" tận cùng là âm /tʃ/ nên khi thêm "-es" phát âm thành /wɒtʃɪz/ (/ɪz/).'
          },
          {
            question: 'My brother __________ karate every Tuesday afternoon.',
            options: {
              A: 'plays',
              B: 'does',
              C: 'makes',
              D: 'has'
            },
            correct: 'B',
            explanation: 'Võ thuật cá nhân như karate, judo luôn đi với động từ "do". Với chủ ngữ số ít "My brother" ta dùng "does karate".'
          }
        ],
        challenges: [
          {
            prompt: 'Write 3 English sentences describing your daily morning routine before going to school using Present Simple tense.',
            aiHint: 'Ví dụ mẫu: "1. I get up at 6:00 AM every morning. 2. I brush my teeth and wash my face. 3. I have breakfast with my family at 6:30 AM."',
            studentAnswer: '',
            showHint: false
          },
          {
            prompt: 'Describe your favorite room in your house in 2 sentences in English.',
            aiHint: 'Ví dụ: "My favorite room is my bedroom because it is cozy and quiet. There is a bookshelf and a study desk next to the window."',
            studentAnswer: '',
            showHint: false
          }
        ]
      }
    ]
  },
  {
    id: 'informatics',
    name: 'Tin Học',
    shortDesc: 'Thông tin & Thuật toán',
    icon: 'fa-solid fa-laptop-code',
    bgGradient: 'bg-gradient-to-tr from-purple-600 to-violet-700',
    borderColor: 'border-purple-500',
    shadowColor: 'shadow-purple-500/20',
    description: 'Khám phá thế giới số, bảo vệ an toàn trên Internet và làm quen với tư duy thuật toán sơ đồ khối.',
    topics: [
      {
        id: 'info-data',
        title: 'Thông Tin, Dữ Liệu & Thuật Toán Cơ Bản',
        summary: 'Phân biệt thông tin và dữ liệu, các thao tác xử lý thông tin trong máy tính (thu nhận, lưu trữ, xử lý, truyền đạt) và biểu diễn các bước giải quyết bài toán bằng sơ đồ khối.',
        flashcards: [
          {
            question: 'Phân biệt Thông tin (Information) và Dữ liệu (Data)?',
            answer: 'Dữ liệu là các con số, văn bản, hình ảnh hay âm thanh thu thập được. Khi dữ liệu được xử lý mang lại ý nghĩa hiểu biết cho con người thì trở thành thông tin.'
          },
          {
            question: 'Một byte bằng bao nhiêu bit?',
            answer: '1 Byte = 8 bit. Bit là đơn vị nhỏ nhất để đo lượng thông tin trong máy tính, chỉ nhận một trong hai giá trị 0 hoặc 1.'
          },
          {
            question: 'Thuật toán (Algorithm) là gì?',
            answer: 'Thuật toán là một dãy hữu hạn các chỉ dẫn rõ ràng, được thực hiện theo một trình tự xác định để giải quyết một bài toán cụ thể và cho ra kết quả mong muốn.'
          }
        ],
        keyPoints: [
          '4 bước xử lý thông tin của máy tính: Thu nhận -> Lưu trữ -> Xử lý -> Truyền đạt (xuất).',
          'Đơn vị đo dung lượng thông tin: Bit < Byte < KB < MB < GB < TB (mỗi đơn vị sau gấp 1024 lần đơn vị trước).',
          'Sơ đồ khối dùng: Hình chữ nhật (xử lý/tính toán), hình thoi (kiểm tra điều kiện rẽ nhánh), hình elip (bắt đầu/kết thúc).',
          'Nguyên tắc an toàn Internet: Không chia sẻ mật khẩu cá nhân, không bấm vào link lạ, bảo vệ thông tin gia đình.'
        ],
        realLife: 'Khi đèn tín hiệu giao thông chuyển sang màu đỏ (dữ liệu ánh sáng), mắt em nhìn thấy và não xử lý báo hiệu "nguy hiểm phải dừng lại" (thông tin), tay em lập tức bóp phanh xe!',
        quizzes: [
          {
            question: 'Thiết bị nào sau đây là thiết bị VÀO (Input device) của máy tính?',
            options: {
              A: 'Bàn phím (Keyboard)',
              B: 'Màn hình (Monitor)',
              C: 'Máy in (Printer)',
              D: 'Loa (Speaker)'
            },
            correct: 'A',
            explanation: 'Bàn phím giúp người dùng nhập văn bản và lệnh vào máy tính nên là thiết bị vào. Màn hình, máy in và loa là thiết bị ra (Output).'
          },
          {
            question: '1 Gigabyte (1 GB) xấp xỉ bằng bao nhiêu Megabyte (MB)?',
            options: {
              A: '100 MB',
              B: '1000 MB',
              C: '1024 MB',
              D: '8 MB'
            },
            correct: 'C',
            explanation: 'Trong hệ đo lường máy tính nhị phân, 1 GB = 1024 MB.'
          },
          {
            question: 'Trong sơ đồ khối biểu diễn thuật toán, hình thoi được dùng để làm gì?',
            options: {
              A: 'Bắt đầu hoặc kết thúc thuật toán',
              B: 'Thực hiện phép tính toán bình thường',
              C: 'Kiểm tra điều kiện rẽ nhánh (Đúng / Sai)',
              D: 'Nhập dữ liệu vào'
            },
            correct: 'C',
            explanation: 'Hình thoi dùng để kiểm tra điều kiện: nếu thỏa mãn thì rẽ sang nhánh Đúng, không thỏa mãn thì sang nhánh Sai.'
          },
          {
            question: 'Hành động nào sau đây là AN TOÀN khi sử dụng mạng xã hội và Internet?',
            options: {
              A: 'Gửi mật khẩu tài khoản cho người quen qua tin nhắn lạ',
              B: 'Bấm vào đường link trúng thưởng điện thoại miễn phí',
              C: 'Đặt mật khẩu mạnh gồm chữ hoa, chữ thường, số và kí tự đặc biệt',
              D: 'Công khai địa chỉ nhà và số điện thoại phụ huynh lên mạng'
            },
            correct: 'C',
            explanation: 'Đặt mật khẩu mạnh và không chia sẻ cho ai là nguyên tắc số 1 để bảo vệ an toàn thông tin cá nhân trên môi trường số.'
          }
        ],
        challenges: [
          {
            prompt: 'Em hãy nêu các bước của một thuật toán đơn giản hàng ngày: "Pha một cốc sữa ấm từ sữa đặc có đường".',
            aiHint: 'Bước 1: Lấy cốc sạch và thìa. Bước 2: Rót 3 thìa sữa đặc vào cốc. Bước 3: Rót 150ml nước sôi khoảng 70-80°C vào cốc. Bước 4: Dùng thìa khuấy đều cho sữa tan hết. Bước 5: Thưởng thức cốc sữa ấm thơm ngon.',
            studentAnswer: '',
            showHint: false
          },
          {
            prompt: 'Nếu một người bạn trên mạng mà em chưa từng gặp ngoài đời rủ em gửi hình ảnh thẻ căn cước công dân hoặc địa chỉ nhà, em sẽ xử lý như thế nào?',
            aiHint: 'Tuyệt đối từ chối cung cấp thông tin, dừng trò chuyện ngay lập tức và báo ngay cho cha mẹ hoặc thầy cô giáo để nhận được sự hỗ trợ bảo vệ an toàn.',
            studentAnswer: '',
            showHint: false
          }
        ]
      }
    ]
  },
  {
    id: 'civic',
    name: 'Giáo Dục Công Dân',
    shortDesc: 'Đạo đức & Kỹ năng sống',
    icon: 'fa-solid fa-heart-pulse',
    bgGradient: 'bg-gradient-to-tr from-rose-600 to-red-500',
    borderColor: 'border-rose-500',
    shadowColor: 'shadow-rose-500/20',
    description: 'Xây dựng nhân cách tốt đẹp, lòng tự hào truyền thống quê hương, đức tính siêng năng kiên trì và tiết kiệm.',
    topics: [
      {
        id: 'civic-love',
        title: 'Yêu Thương Con Người & Siêng Năng Kiên Trì',
        summary: 'Yêu thương con người là truyền thống quý báu của dân tộc Việt Nam. Cùng với đức tính siêng năng, kiên trì, đây là chìa khóa vàng giúp học sinh vượt qua khó khăn để chạm đến thành công.',
        flashcards: [
          {
            question: 'Thế nào là tình yêu thương con người?',
            answer: 'Là sự quan tâm, chăm sóc, chia sẻ, đồng cảm với niềm vui nỗi buồn của người khác; sẵn sàng giúp đỡ khi họ gặp khó khăn hoạn nạn mà không vụ lợi tính toán.'
          },
          {
            question: 'Siêng năng và kiên trì khác nhau như thế nào?',
            answer: '- Siêng năng là làm việc tự giác, cần cù, chịu khó thường xuyên.\n- Kiên trì là quyết tâm làm đến cùng dù gặp phải trở ngại khó khăn, không nản lòng bỏ cuộc giữa chừng.'
          },
          {
            question: 'Tại sao cần phải biết tiết kiệm ngay từ khi còn là học sinh?',
            answer: 'Tiết kiệm giúp chúng ta quý trọng mồ hôi công sức của cha mẹ, có sẵn khoản dự phòng khi khẩn cấp và rèn luyện lối sống văn minh, giản dị.'
          }
        ],
        keyPoints: [
          'Biểu hiện yêu thương: Giúp đỡ bạn khuyết tật, quyên góp ủng hộ đồng bào lũ lụt, kính trọng ông bà cha mẹ.',
          'Biểu hiện siêng năng: Tự giác học bài đúng giờ, tích cực làm việc nhà giúp đỡ gia đình, không lười biếng.',
          'Câu ca dao bất hủ: "Bầu ơi thương lấy bí cùng / Tuy rằng khác giống nhưng chung một giàn".',
          'Phương pháp tiết kiệm: Tắt điện khi ra khỏi phòng, giữ gìn sách vở dụng cụ học tập để dùng lâu bền.'
        ],
        realLife: 'Mỗi khi bão lũ đổ bộ vào miền Trung, phong trào "Nuôi heo đất" hoặc ủng hộ tập vở, quần áo ấm của các trường học trên cả nước chính là biểu hiện rực rỡ nhất của tình yêu thương đồng bào!',
        quizzes: [
          {
            question: 'Câu ca dao, tục ngữ nào sau đây nói về truyền thống YÊU THƯƠNG CON NGƯỜI?',
            options: {
              A: 'Có công mài sắt, có ngày nên kim',
              B: 'Lá lành đùm lá rách',
              C: 'Ăn quả nhớ kẻ trồng cây',
              D: 'Học thầy không tày học bạn'
            },
            correct: 'B',
            explanation: '"Lá lành đùm lá rách" khuyên nhủ con người biết đùm bọc, tương trợ, sẻ chia giúp đỡ lẫn nhau khi hoạn nạn thiếu thốn.'
          },
          {
            question: 'Hành vi nào dưới đây thể hiện đức tính KIÊN TRÌ trong học tập?',
            options: {
              A: 'Gặp bài toán khó liền lên mạng chép ngay lời giải để nộp',
              B: 'Tự mình suy nghĩ, đọc lại lý thuyết SGK nhiều lần để tìm cách giải',
              C: 'Bỏ qua không làm những bài tập đòi hỏi suy nghĩ',
              D: 'Nhờ anh chị làm hộ bài văn mẫu'
            },
            correct: 'B',
            explanation: 'Kiên trì là nhẫn nại, nỗ lực tìm tòi giải pháp khi gặp thử thách chứ không đầu hàng hay đi đường tắt gian lận.'
          },
          {
            question: 'Hành vi nào sau đây là hành vi LÃNG PHÍ cần tránh?',
            options: {
              A: 'Tắt vòi nước ngay sau khi rửa tay xong',
              B: 'Bật điều hòa cả ngày khi trong phòng không có ai',
              C: 'Bảo quản sách giáo khoa cẩn thận để tặng lại cho các em lớp dưới',
              D: 'Lập kế hoạch chi tiêu tiền mừng tuổi hợp lý'
            },
            correct: 'B',
            explanation: 'Bật thiết bị điện khi không sử dụng vừa gây lãng phí tiền bạc của gia đình vừa gây hại cho môi trường năng lượng quốc gia.'
          },
          {
            question: 'Khi thấy bạn cùng lớp bị các bạn khác chế giễu vì hoàn cảnh khó khăn, em nên làm gì?',
            options: {
              A: 'Tham gia trêu chọc cùng các bạn cho vui',
              B: 'Đứng ngoài quay video để đăng lên mạng xã hội',
              C: 'Lên tiếng bảo vệ bạn, an ủi bạn và báo cáo với giáo viên chủ nhiệm',
              D: 'Thờ ơ bỏ đi vì không liên quan đến mình'
            },
            correct: 'C',
            explanation: 'Đồng cảm, bảo vệ bạn và báo với thầy cô là hành động thể hiện tình yêu thương văn minh, dũng cảm và đúng chuẩn mực học sinh.'
          }
        ],
        challenges: [
          {
            prompt: 'Em hãy kể lại một việc làm cụ thể trong tuần qua mà em đã giúp đỡ một ai đó (ở trường, ở nhà hoặc ngoài xã hội) và cảm xúc của em lúc đó ra sao?',
            aiHint: 'Ví dụ: "Em đã quét sân giúp bà ngoại và nhổ tóc sâu cho mẹ. Nhìn thấy nụ cười của mẹ, em cảm thấy lòng mình ấm áp và nhận ra việc nhỏ bé cũng đem lại niềm vui lớn."',
            studentAnswer: '',
            showHint: false
          },
          {
            prompt: 'Nếu em có một khoản tiền tiêu vặt hoặc tiền thưởng cuối năm, em sẽ lập kế hoạch phân bổ tiết kiệm như thế nào?',
            aiHint: 'Nguyên tắc 3 hũ: 50% cho nhu cầu học tập (mua sách vở, bút), 30% cho quỹ tiết kiệm tương lai (heo đất), 20% cho việc sẻ chia (mua quà tặng cha mẹ hoặc làm từ thiện).',
            studentAnswer: '',
            showHint: false
          }
        ]
      }
    ]
  }
];

// SYSTEM BADGES DEFINITIONS
const SYSTEM_BADGES = [
  {
    id: 'math_master',
    name: 'Học Giả Toán Học',
    subjectId: 'math',
    description: 'Chinh phục toàn bộ câu hỏi trắc nghiệm Toán học lớp 6 với điểm số cao.',
    icon: '📐',
    bgColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
    unlocked: false
  },
  {
    id: 'literature_master',
    name: 'Cây Bút Tương Lai',
    subjectId: 'literature',
    description: 'Đạt điểm tuyệt đối bài đọc hiểu Ngữ văn và chi tiết kì ảo.',
    icon: '✍️',
    bgColor: 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300',
    unlocked: false
  },
  {
    id: 'science_master',
    name: 'Nhà Thám Hiểm Khoa Học',
    subjectId: 'science',
    description: 'Nắm vững các thể của chất và cấu tạo thế giới tự nhiên.',
    icon: '🔬',
    bgColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    unlocked: false
  },
  {
    id: 'history_master',
    name: 'Nhà Sử Địa Tài Ba',
    subjectId: 'history_geo',
    description: 'Thấu hiểu chuyển động Trái Đất và văn minh nhân loại.',
    icon: '🌍',
    bgColor: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    unlocked: false
  },
  {
    id: 'english_master',
    name: 'Đại Sứ Tiếng Anh',
    subjectId: 'english',
    description: 'Bắn tiếng Anh siêu đỉnh với thì Hiện tại đơn và từ vựng.',
    icon: '🗣️',
    bgColor: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300',
    unlocked: false
  },
  {
    id: 'it_master',
    name: 'Hiệp Sĩ Số 4.0',
    subjectId: 'informatics',
    description: 'Làm chủ thuật toán và an toàn thông tin trên mạng Internet.',
    icon: '💻',
    bgColor: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
    unlocked: false
  },
  {
    id: 'civic_master',
    name: 'Trái Tim Nhân Ái',
    subjectId: 'civic',
    description: 'Lan tỏa tình yêu thương con người và sống tiết kiệm có ích.',
    icon: '💖',
    bgColor: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
    unlocked: false
  },
  {
    id: 'timer_master',
    name: 'Chiến Binh Chăm Chỉ',
    subjectId: null,
    description: 'Duy trì thời gian tập trung học tập trên 15 phút tích cực.',
    icon: '⚡',
    bgColor: 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
    unlocked: false
  }
];

// VUE 3 APPLICATION
const { createApp, ref, computed, onMounted, nextTick } = Vue;

const app = createApp({
  setup() {
    // Theme state
    const isDarkMode = ref(false);
    const soundEnabled = ref(true);

    // Navigation and Subjects state
    const subjects = ref(SUBJECTS_DATA);
    const currentSubjectId = ref('math');
    const activeTopicIndex = ref(0);
    const activeTab = ref('knowledge'); // 'knowledge' | 'quiz' | 'challenge'

    // Flashcard interactive state
    const cardFlipped = ref({});

    // Quiz state
    const currentQuizIndex = ref(0);
    const selectedOption = ref(null);
    const quizAnswered = ref(false);
    const isCorrect = ref(false);
    const quizResults = ref({}); // { [quizIndex]: boolean }
    const showQuizSummaryModal = ref(false);

    // Timer state
    const timerSeconds = ref(0);
    const timerRunning = ref(true);
    let timerInterval = null;

    // Badges & Gamification
    const badges = ref(SYSTEM_BADGES);
    const userStats = ref({
      points: 120,
      quizzesFinished: 0,
      totalStudyTimeMinutes: 0
    });

    // AI Chat Tutor state
    const mobileChatOpen = ref(false);
    const unreadAITips = ref(false);
    const aiTyping = ref(false);
    const inputMessage = ref('');
    const chatContainer = ref(null);
    const showApiModal = ref(false);
    const customApiKey = ref(localStorage.getItem('gemini_api_key') || '');

    const chatMessages = ref([
      {
        sender: 'ai',
        text: 'Xin chào bạn nhỏ lớp 6 yêu quý! 🦉\n\nThầy là Gia Sư Cú Vàng Thông Thái, người bạn đồng hành 24/7 của em. Thầy bám sát chuẩn cả 3 bộ SGK (Kết nối tri thức, Cánh diều, Chân trời sáng tạo).\n\nHôm nay em muốn chinh phục môn học nào? Cứ chọn môn hoặc nhắn tin, Cú sẽ giải thích từng bước thật dễ hiểu nhé! 🚀'
      }
    ]);

    const quickChips = ref([
      { label: '💡 Giảng lại bằng ví dụ vui', prompt: 'Nhờ Cú giảng lại bài học này bằng một ví dụ thật vui nhộn, gần gũi với lứa tuổi học sinh lớp 6 nhé!' },
      { label: '🎵 Làm thơ để nhớ bài', prompt: 'Cú ơi, hãy sáng tác 4 câu thơ lục bát dí dỏm để giúp em dễ thuộc lòng công thức/kiến thức này với!' },
      { label: '🧠 Đố vui môn này', prompt: 'Cho em 1 câu đố mẹo trí tuệ thú vị liên quan đến môn học này xem em trả lời được không nào!' },
      { label: '📝 Cho bài tập tương tự', prompt: 'Hãy cho em một bài tập tương tự có đáp án và lời giải chi tiết để em tự luyện thêm nhé!' },
      { label: '💪 Động viên em học', prompt: 'Hôm nay em hơi mệt, Cú hãy nói một lời động viên truyền cảm hứng học tập cho em nhé!' }
    ]);

    // Computed Properties
    const activeSubject = computed(() => {
      return subjects.value.find(s => s.id === currentSubjectId.value) || subjects.value[0];
    });

    const currentTopic = computed(() => {
      const topics = activeSubject.value.topics;
      return topics[activeTopicIndex.value] || topics[0];
    });

    const currentQuiz = computed(() => {
      return currentTopic.value.quizzes[currentQuizIndex.value] || currentTopic.value.quizzes[0];
    });

    const currentTopicCorrectCount = computed(() => {
      return Object.values(quizResults.value).filter(val => val === true).length;
    });

    const unlockedBadgesCount = computed(() => {
      return badges.value.filter(b => b.unlocked).length;
    });

    const overallProgress = computed(() => {
      const totalPossibleQuizzes = subjects.value.reduce((acc, s) => {
        return acc + s.topics.reduce((tAcc, t) => tAcc + t.quizzes.length, 0);
      }, 0);
      const pointsProgress = Math.min(100, Math.round((userStats.value.points / (totalPossibleQuizzes * 10)) * 100));
      return Math.max(15, pointsProgress);
    });

    // METHODS

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    };

    const toggleTimer = () => {
      timerRunning.value = !timerRunning.value;
    };

    const formatTimer = (totalSeconds) => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const selectSubject = (subId) => {
      currentSubjectId.value = subId;
      activeTopicIndex.value = 0;
      activeTab.value = 'knowledge';
      resetTopicQuiz();
      
      // Auto notification in chat if open
      const sub = subjects.value.find(s => s.id === subId);
      if (sub) {
        addAIMessage(`Bạn nhỏ vừa chuyển sang môn **${sub.name}**! 📚\n${sub.description}\nEm cần Cú hỗ trợ phần nào cứ nhắn nhé!`);
      }
    };

    const resetToHome = () => {
      currentSubjectId.value = 'math';
      activeTopicIndex.value = 0;
      activeTab.value = 'knowledge';
    };

    const toggleFlashcard = (idx) => {
      cardFlipped.value[idx] = !cardFlipped.value[idx];
    };

    // Quiz Navigation & Logic
    const handleSelectOption = (optKey) => {
      if (quizAnswered.value) return;

      selectedOption.value = optKey;
      quizAnswered.value = true;
      const isRight = (optKey === currentQuiz.value.correct);
      isCorrect.value = isRight;
      quizResults.value[currentQuizIndex.value] = isRight;

      if (isRight) {
        userStats.value.points += 10;
        if (soundEnabled.value) sfx.playCorrect();
        triggerConfetti(0.4);

        // Check badge unlock for this subject
        checkBadgesUnlock();
      } else {
        if (soundEnabled.value) sfx.playWrong();
      }

      saveStatsToLocal();
    };

    const getOptionClass = (optKey) => {
      if (!quizAnswered.value) {
        return selectedOption.value === optKey 
          ? 'bg-indigo-50 border-indigo-400 text-indigo-900 dark:bg-indigo-950/60 dark:border-indigo-500 dark:text-white' 
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750';
      }

      if (optKey === currentQuiz.value.correct) {
        return 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/60 dark:border-emerald-500 dark:text-emerald-200 ring-2 ring-emerald-500/30';
      }

      if (selectedOption.value === optKey && optKey !== currentQuiz.value.correct) {
        return 'bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-950/60 dark:border-rose-500 dark:text-rose-200';
      }

      return 'opacity-50 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-500';
    };

    const getOptionBadgeClass = (optKey) => {
      if (!quizAnswered.value) {
        return selectedOption.value === optKey 
          ? 'bg-indigo-600 text-white' 
          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200';
      }

      if (optKey === currentQuiz.value.correct) {
        return 'bg-emerald-500 text-white';
      }

      if (selectedOption.value === optKey && optKey !== currentQuiz.value.correct) {
        return 'bg-rose-500 text-white';
      }

      return 'bg-slate-200 dark:bg-slate-700 text-slate-400';
    };

    const nextQuiz = () => {
      if (currentQuizIndex.value < currentTopic.value.quizzes.length - 1) {
        goToQuiz(currentQuizIndex.value + 1);
      }
    };

    const prevQuiz = () => {
      if (currentQuizIndex.value > 0) {
        goToQuiz(currentQuizIndex.value - 1);
      }
    };

    const goToQuiz = (idx) => {
      currentQuizIndex.value = idx;
      // Load saved state if previously answered
      if (quizResults.value[idx] !== undefined) {
        quizAnswered.value = true;
        isCorrect.value = quizResults.value[idx];
      } else {
        quizAnswered.value = false;
        selectedOption.value = null;
        isCorrect.value = false;
      }
    };

    const resetTopicQuiz = () => {
      currentQuizIndex.value = 0;
      quizAnswered.value = false;
      selectedOption.value = null;
      isCorrect.value = false;
      quizResults.value = {};
    };

    const finishQuizTopic = () => {
      showQuizSummaryModal.value = true;
      if (soundEnabled.value) sfx.playFanfare();
      triggerConfetti(0.8);
      userStats.value.quizzesFinished++;
      saveStatsToLocal();
    };

    const getQuizEncouragementMessage = () => {
      const total = currentTopic.value.quizzes.length;
      const correct = currentTopicCorrectCount.value;
      const ratio = correct / total;

      if (ratio === 1) {
        return '🌟 Xuất sắc 10/10! Bạn nhỏ đã làm chủ hoàn toàn kiến thức bài học này theo chuẩn SGK. Cú rất tự hào về em!';
      } else if (ratio >= 0.75) {
        return '👏 Giỏi lắm bạn nhỏ! Em chỉ nhầm lẫn một chút xíu thôi. Đọc kỹ lại giải thích chi tiết để lần sau đạt điểm tuyệt đối nhé!';
      } else {
        return '💪 Đừng nản lòng nhé bạn nhỏ! "Thất bại là mẹ thành công". Hãy quay lại Trạm Kiến Thức đọc thẻ ghi nhớ rồi làm lại lần nữa nha!';
      }
    };

    // Creative Challenge Hint Toggle
    const toggleChallengeHint = (chIdx) => {
      currentTopic.value.challenges[chIdx].showHint = !currentTopic.value.challenges[chIdx].showHint;
    };

    const discussChallengeWithAI = (chal) => {
      const studentText = chal.studentAnswer.trim();
      const questionText = chal.prompt;
      
      let messageToSend = `Cú ơi, em đang làm thử thách vận dụng:\n"${questionText}"\n`;
      if (studentText) {
        messageToSend += `Suy nghĩ của em là: "${studentText}".\nCú nhận xét và cho em thêm lời khuyên nhé!`;
      } else {
        messageToSend += `Em chưa nghĩ ra câu trả lời, Cú có thể gợi ý hướng tư duy sáng tạo cho em được không?`;
      }

      sendMessageDirectly(messageToSend);
      mobileChatOpen.value = true;
    };

    const askAIAboutTopic = () => {
      const prompt = `Cú ơi, hãy giảng lại cho em thật dễ hiểu bài học "${currentTopic.value.title}" thuộc môn ${activeSubject.value.name} lớp 6 nhé!`;
      sendMessageDirectly(prompt);
      mobileChatOpen.value = true;
    };

    const askAIExplanation = (quiz) => {
      const prompt = `Cú ơi, giải thích kỹ hơn cho em câu hỏi này với:\n"${quiz.question}"\nĐáp án đúng là: ${quiz.correct} - ${quiz.options[quiz.correct]}.\nVì sao lại như vậy hả Cú?`;
      sendMessageDirectly(prompt);
      mobileChatOpen.value = true;
    };

    // Confetti Celebration
    const triggerConfetti = (intensity = 0.5) => {
      if (typeof confetti !== 'function') return;
      confetti({
        particleCount: Math.floor(50 * intensity),
        spread: 70,
        origin: { y: 0.6 }
      });
    };

    // Badges Verification
    const checkBadgesUnlock = () => {
      // Check subject badge
      const subBadge = badges.value.find(b => b.subjectId === currentSubjectId.value);
      if (subBadge && !subBadge.unlocked) {
        if (currentTopicCorrectCount.value >= 3) {
          subBadge.unlocked = true;
          userStats.value.points += 50;
          addAIMessage(`🎉 CHÚC MỪNG BẠN NHỎ! Em vừa xuất sắc mở khóa Huy Hiệu Danh Dự: **${subBadge.name}** (${subBadge.icon})! +50 ⭐`);
          triggerConfetti(1.0);
        }
      }

      // Check timer badge
      if (timerSeconds.value >= 900) { // 15 minutes
        const timerBadge = badges.value.find(b => b.id === 'timer_master');
        if (timerBadge && !timerBadge.unlocked) {
          timerBadge.unlocked = true;
          userStats.value.points += 50;
          addAIMessage(`⚡ Em đã kiên trì tập trung học tập trên 15 phút! Nhận ngay Huy hiệu: **Chiến Binh Chăm Chỉ**!`);
        }
      }

      saveStatsToLocal();
    };

    // AI Chatbox Core Logic
    const toggleChatDrawer = () => {
      mobileChatOpen.value = !mobileChatOpen.value;
      unreadAITips.value = false;
    };

    const clearChat = () => {
      chatMessages.value = [
        {
          sender: 'ai',
          text: 'Thầy Cú Thông Thái đã sẵn sàng cho một phiên học tập mới tinh tươm! Em hãy đặt câu hỏi bất kỳ nhé! 🦉✨'
        }
      ];
    };

    const sendQuickPrompt = (promptText) => {
      sendMessageDirectly(promptText);
    };

    const sendMessageDirectly = (text) => {
      if (!text.trim()) return;
      chatMessages.value.push({ sender: 'user', text });
      scrollChatToBottom();
      triggerAIResponse(text);
    };

    const sendMessage = () => {
      const text = inputMessage.value.trim();
      if (!text || aiTyping.value) return;
      inputMessage.value = '';
      sendMessageDirectly(text);
    };

    const addAIMessage = (text) => {
      chatMessages.value.push({ sender: 'ai', text });
      scrollChatToBottom();
    };

    const scrollChatToBottom = () => {
      nextTick(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
      });
    };

    // AI RESPONSE ENGINE (Local Context-Aware AI + Live Gemini API Integration)
    const triggerAIResponse = async (userPrompt) => {
      aiTyping.value = true;
      scrollChatToBottom();

      const apiKey = customApiKey.value.trim();

      // IF USER PROVIDED REAL GEMINI API KEY, CALL LIVE GOOGLE GEMINI API
      if (apiKey && apiKey.startsWith('AIzaSy')) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
          const systemInstruction = `Bạn là "Gia Sư Cú Vàng Thông Thái", gia sư trợ lý AI chuyên giảng dạy học sinh lớp 6 (11-12 tuổi) tại Việt Nam theo chuẩn 3 bộ SGK (Kết nối tri thức, Cánh diều, Chân trời sáng tạo). Ngôn từ của bạn luôn ấm áp, kiên nhẫn, vui vẻ, xưng "thầy Cú" hoặc "Cú" và gọi học sinh là "bạn nhỏ" hoặc "em". Luôn giải thích từng bước, có ví dụ thực tế hài hước, khen ngợi và động viên học sinh. Môn học hiện tại là: ${activeSubject.value.name}, chủ đề: ${currentTopic.value.title}.`;

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemInstruction}\n\nCâu hỏi của học sinh: ${userPrompt}` }]
                }
              ]
            })
          });

          if (response.ok) {
            const data = await response.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (reply) {
              aiTyping.value = false;
              addAIMessage(reply);
              return;
            }
          }
        } catch (err) {
          console.warn('Gemini Live API fallback to local AI:', err);
        }
      }

      // LOCAL RULE-BASED AI ENGINE (Extremely Intelligent, Fast, Offline-Ready)
      setTimeout(() => {
        aiTyping.value = false;
        const reply = generateLocalAIResponse(userPrompt, activeSubject.value, currentTopic.value);
        addAIMessage(reply);
      }, 750);
    };

    // Local Educational Response Generator
    const generateLocalAIResponse = (prompt, subject, topic) => {
      const p = prompt.toLowerCase();

      // Poem / Rhyme request
      if (p.includes('làm thơ') || p.includes('thơ lục bát') || p.includes('rap')) {
        if (subject.id === 'math') {
          return `🦉 Thầy Cú tặng bạn nhỏ bài thơ 4 câu siêu dễ nhớ này nhé:\n\n"Muốn cộng hai số trái chiều,\nLấy lớn trừ nhỏ nói điều hiển nhiên.\nDấu kia đem lại đặt liền,\nLà dấu số lớn bạn liền khắc ghi!" 🎵\n\nEm thấy bài thơ có dễ thuộc không nào?`;
        } else if (subject.id === 'literature') {
          return `🦉 Thơ tặng cây bút tương lai lớp 6 đây:\n\n"Thánh Gióng phi ngựa lên trời,\nNước non giữ vững muôn đời bình yên.\nBánh chưng bánh giầy thảo hiền,\nLang Liêu hiếu nghĩa vẹn tròn non sông!" 🌾`;
        } else if (subject.id === 'science') {
          return `🦉 Vần thơ khoa học vui nhộn cho em:\n\n"Rắn thì giữ dáng định hình,\nLỏng theo đáy cốc uốn mình trôi nhanh.\nKhí thì bay bổng xung quanh,\nTrời sinh vạn vật mát lành thế gian!" 🔬`;
        } else {
          return `🦉 Vần thơ chăm ngoan Cú tặng bạn nhỏ:\n\n"Sách mở trang mới rạng ngời,\nChăm ngoan học tập rạng danh gia đình.\nGian nan thử thách chớ kinh,\nCó Cú đồng hành tri thức thắp hoa!" 🌟`;
        }
      }

      // Re-explain simply / funny example
      if (p.includes('giải thích lại') || p.includes('ví dụ') || p.includes('giảng')) {
        if (subject.id === 'math') {
          return `🦉 Cú giảng lại siêu dễ hiểu cho bạn nhỏ nhé!\n\nHãy tưởng tượng số nguyên như chiếc thang máy trong tòa nhà:\n- Tầng trệt là số 0.\n- Các tầng phía trên (+1, +2, +3...) là các tầng căn hộ sáng sủa.\n- Tầng hầm gửi xe phía dưới lòng đất là (-1, -2, -3...).\n\nNếu em đang ở tầng hầm -2 mà đi thang máy LÊN 5 tầng, tức là: (-2) + 5 = +3 (em đang ở tầng 3 đấy!). Quá trực quan đúng không nào?`;
        } else if (subject.id === 'science') {
          return `🦉 Thầy Cú lấy ví dụ siêu ngon miệng về 3 thể của chất nhé:\n\n1. Khi cây kem que còn trong tủ đá: Nó ở **Thể Rắn**, cứng cáp và có hình que kem rõ rệt.\n2. Khi để ngoài nắng, kem chảy tèm lem ra tay: Đó là **Thể Lỏng**, chuyển động nhầy nhụa theo ngón tay.\n3. Nếu mẹ đun sôi kem trên bếp, hơi nước bốc lên biến mất: Đó là **Thể Khí**!\n\nEm thấy chất đổi hình dạng có giống như phép thuật biến hình không? 🍦`;
        } else if (subject.id === 'history_geo') {
          return `🦉 Cú giải thích hiện tượng Ngày & Đêm bằng 1 quả cam và cái đèn pin nhé:\n\nQuả cam chính là Trái Đất của chúng ta, còn đèn pin là Mặt Trời. Em chiếu đèn pin vào quả cam, chỉ có MỘT NỬA quả cam được sáng (đó là ban ngày), nửa sau bị che khuất thì tối (đó là ban đêm).\nKhi em xoay tròn quả cam từ từ, các phần trên vỏ cam lần lượt ra sáng rồi lại vào tối. Trái Đất cũng tự xoay như thế suốt 24 giờ mỗi ngày đấy! 🍊`;
        } else {
          return `🦉 Về bài học **${topic.title}** này:\nCốt lõi là chúng ta cần nắm vững các định nghĩa then chốt trong sách giáo khoa, sau đó liên hệ ngay với những tình huống trong gia đình và trường học để nhớ bài thật lâu em nhé!`;
        }
      }

      // Quiz & Trivia Request
      if (p.includes('đố vui') || p.includes('câu đố')) {
        if (subject.id === 'math') {
          return `🦉 Cú đố em câu này:\n"Một con ốc sên rơi xuống đáy giếng sâu 10 mét. Ban ngày nó bò lên được 3 mét, nhưng ban đêm ngủ quên lại bị trượt tụt xuống 2 mét. Hỏi sau bao nhiêu ngày đêm thì ốc sên bò được lên tới miệng giếng?"\n\n(Gợi ý: Cẩn thận bị bẫy ở ngày cuối cùng nhé!) 🐌`;
        } else if (subject.id === 'science') {
          return `🦉 Câu đố khoa học cho nhà thông thái:\n"Cái gì không màu, không mùi, không vị, ở khắp mọi nơi quanh em, em không nhìn thấy được nhưng nếu thiếu nó quá 5 phút thì không ai sống nổi?"\n\nĐố em biết là gì nào? 💨`;
        } else {
          return `🦉 Câu đố mẹo của Cú:\n"Cái gì mà em càng chia sẻ cho bạn bè thì em lại càng có nhiều hơn chứ không hề vơi đi?"\n(Đáp án chính là: Kiến thức và Niềm vui đó bạn nhỏ ơi!) ❤️`;
        }
      }

      // Encouragement
      if (p.includes('động viên') || p.includes('mệt') || p.includes('buồn')) {
        return `🦉 Thương bạn nhỏ của Cú quá! Học tập đôi khi cũng có những lúc căng thẳng mệt mỏi, điều đó hoàn toàn bình thường em nhé.\n\nEm hãy vươn vai thật cao, uống một ngụm nước ấm và hít thở sâu 3 lần nào! Mỗi bài toán em giải được, mỗi từ tiếng Anh em thuộc hôm nay đều là từng viên gạch vững chắc xây nên ước mơ tương lai của em. Cú luôn tin tưởng và đồng hành cùng em 100%! Cố lên nhé bạn nhỏ cừ khôi! 🌟💪`;
      }

      // Similar exercise request
      if (p.includes('bài tập tương tự') || p.includes('cho em bài tập')) {
        return `🦉 Đây là bài tập tương tự cực hay dành cho em:\n\n**Đề bài:** Một kho đông lạnh bảo quản cá đang ở nhiệt độ -12°C. Người quản lý điều chỉnh giảm tiếp 4°C nữa. Hỏi sau khi giảm, nhiệt độ trong kho đông lạnh là bao nhiêu °C?\n\n**Gợi ý lời giải:**\nNhiệt độ mới = (-12) - 4 = (-12) + (-4) = -16°C.\nEm thấy mình có giải ra giống Cú không? Hãy tự tin lên nhé! 🎯`;
      }

      // Default smart educational contextual reply
      return `🦉 Thầy Cú đã lắng nghe câu hỏi của em về bài **"${topic.title}"** thuộc môn **${subject.name}**!\n\nĐể học tốt phần này, em hãy ghi nhớ 3 điều vàng:\n1. Nắm chắc phần tóm tắt ở "Trạm Kiến Thức Cốt Lõi".\n2. Thực hành ngay các câu trắc nghiệm để kiểm tra mức độ hiểu sâu.\n3. Liên hệ với thực tế đời sống hàng ngày.\n\nEm có chỗ nào chưa hiểu rõ, hãy bấm nút "Giảng lại bằng ví dụ vui" phía trên nhé!`;
    };

    const saveApiKey = () => {
      localStorage.setItem('gemini_api_key', customApiKey.value.trim());
      showApiModal.value = false;
      addAIMessage('🦉 Cú đã lưu cấu hình API của em rồi nhé! Giờ đây câu trả lời sẽ thông minh và chi tiết hơn nữa.');
    };

    const saveStatsToLocal = () => {
      try {
        localStorage.setItem('user_stats_grade6', JSON.stringify(userStats.value));
        localStorage.setItem('user_badges_grade6', JSON.stringify(badges.value.map(b => ({ id: b.id, unlocked: b.unlocked }))));
      } catch (e) {
        console.warn('Storage save error:', e);
      }
    };

    const loadStatsFromLocal = () => {
      try {
        const savedStats = localStorage.getItem('user_stats_grade6');
        if (savedStats) {
          userStats.value = Object.assign(userStats.value, JSON.parse(savedStats));
        }

        const savedBadges = localStorage.getItem('user_badges_grade6');
        if (savedBadges) {
          const parsed = JSON.parse(savedBadges);
          badges.value.forEach(b => {
            const found = parsed.find(item => item.id === b.id);
            if (found) b.unlocked = found.unlocked;
          });
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          isDarkMode.value = true;
          document.documentElement.classList.add('dark');
        }
      } catch (e) {
        console.warn('Storage load error:', e);
      }
    };

    // Lifecycle
    onMounted(() => {
      loadStatsFromLocal();

      // Start focus timer
      timerInterval = setInterval(() => {
        if (timerRunning.value) {
          timerSeconds.value++;
          if (timerSeconds.value % 60 === 0) {
            userStats.value.totalStudyTimeMinutes++;
            checkBadgesUnlock();
          }
        }
      }, 1000);
    });

    return {
      isDarkMode,
      soundEnabled,
      subjects,
      currentSubjectId,
      activeTopicIndex,
      activeTab,
      activeSubject,
      currentTopic,
      currentQuiz,
      currentQuizIndex,
      selectedOption,
      quizAnswered,
      isCorrect,
      quizResults,
      currentTopicCorrectCount,
      showQuizSummaryModal,
      cardFlipped,
      timerSeconds,
      timerRunning,
      badges,
      userStats,
      unlockedBadgesCount,
      overallProgress,
      mobileChatOpen,
      unreadAITips,
      aiTyping,
      inputMessage,
      chatMessages,
      chatContainer,
      quickChips,
      showApiModal,
      customApiKey,
      toggleDarkMode,
      toggleTimer,
      formatTimer,
      selectSubject,
      resetToHome,
      toggleFlashcard,
      handleSelectOption,
      getOptionClass,
      getOptionBadgeClass,
      nextQuiz,
      prevQuiz,
      goToQuiz,
      resetTopicQuiz,
      finishQuizTopic,
      getQuizEncouragementMessage,
      toggleChallengeHint,
      discussChallengeWithAI,
      askAIAboutTopic,
      askAIExplanation,
      checkBadgesUnlock,
      toggleChatDrawer,
      clearChat,
      sendQuickPrompt,
      sendMessage,
      saveApiKey
    };
  }
});

app.mount('#app');
