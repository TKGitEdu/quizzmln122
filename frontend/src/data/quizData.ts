export type QuizQuestion = {
  id: number
  question: string
  options: string[]
  answer: string
  reference: string
}

export const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'Cuộc cách mạng công nghiệp lần thứ nhất bắt đầu từ ngành nào?',
    options: ['Công nghiệp nặng', 'Công nghiệp nhẹ (dệt)', 'Giao thông vận tải', 'Nông nghiệp'],
    answer: 'Công nghiệp nhẹ (dệt)',
    reference: 'Trang 202: Bắt đầu từ ngành công nghiệp nhẹ, trực tiếp là ngành dệt.',
  },
  {
    id: 2,
    question: 'Đặc trưng cơ bản của Cách mạng công nghiệp lần thứ hai là gì?',
    options: [
      'Sử dụng năng lượng hơi nước',
      'Sử dụng năng lượng điện và dây chuyền sản xuất hàng loạt',
      'Công nghệ thông tin và tự động hóa',
      'Trí tuệ nhân tạo',
    ],
    answer: 'Sử dụng năng lượng điện và dây chuyền sản xuất hàng loạt',
    reference:
      'Trang 204: Đặc trưng là sử dụng năng lượng điện và động cơ điện để tạo ra dây chuyền sản xuất hàng loạt.',
  },
  {
    id: 3,
    question: "Theo giáo trình, 'Công nghiệp hóa' là quá trình chuyển đổi căn bản từ:",
    options: [
      'Nông nghiệp sang Dịch vụ',
      'Thủ công sang Máy móc',
      'Lao động thủ công sang lao động bằng máy móc',
      'Kinh tế bao cấp sang kinh tế thị trường',
    ],
    answer: 'Lao động thủ công sang lao động bằng máy móc',
    reference:
      'Trang 211: Là quá trình chuyển đổi từ lao động thủ công sang lao động bằng máy móc nhằm tạo ra năng suất lao động xã hội cao.',
  },
  {
    id: 4,
    question: 'Mô hình công nghiệp hóa của Nhật Bản và các nước NICs là gì?',
    options: [
      'Công nghiệp hóa cổ điển',
      'Công nghiệp hóa kiểu Liên Xô (cũ)',
      'Công nghiệp hóa rút ngắn',
      'Công nghiệp hóa thay thế nhập khẩu',
    ],
    answer: 'Công nghiệp hóa rút ngắn',
    reference: 'Trang 215: Các nước này thực hiện chiến lược công nghiệp hóa rút ngắn, đẩy mạnh xuất khẩu.',
  },
  {
    id: 5,
    question: 'Đặc điểm của công nghiệp hóa, hiện đại hóa ở Việt Nam là gì?',
    options: [
      'Trong điều kiện kinh tế thị trường định hướng XHCN',
      'Vừa mang tính phổ biến, vừa mang tính đặc thù',
      'Gắn với phát triển kinh tế tri thức',
      'Tất cả các đáp án trên',
    ],
    answer: 'Tất cả các đáp án trên',
    reference:
      'Trang 216-218: Việt Nam tiến hành CNH, HDH trong điều kiện kinh tế thị trường, hướng tới kinh tế tri thức.',
  },
  {
    id: 6,
    question: 'Trong Cách mạng công nghiệp 3.0, yếu tố nào đóng vai trò trung tâm?',
    options: [
      'Động cơ hơi nước',
      'Điện khí hóa sản xuất',
      'Điện tử, CNTT và tự động hóa',
      'Blockchain và tiền số',
    ],
    answer: 'Điện tử, CNTT và tự động hóa',
    reference: 'Trang 205-206: CMCN 3.0 gắn với điện tử, công nghệ thông tin và tự động hóa sản xuất.',
  },
  {
    id: 7,
    question: 'Một chỉ dấu quan trọng của công nghiệp hóa thành công là gì?',
    options: [
      'Tỷ trọng nông nghiệp tăng nhanh',
      'Cơ cấu kinh tế chuyển dịch theo hướng công nghiệp - dịch vụ',
      'Giảm năng suất lao động',
      'Phụ thuộc tuyệt đối vào nhập khẩu',
    ],
    answer: 'Cơ cấu kinh tế chuyển dịch theo hướng công nghiệp - dịch vụ',
    reference: 'Trang 212: Công nghiệp hóa gắn với chuyển dịch cơ cấu kinh tế theo hướng hiện đại.',
  },
  {
    id: 8,
    question: 'Vì sao các nước đi sau có thể công nghiệp hóa rút ngắn?',
    options: [
      'Không cần vốn đầu tư',
      'Có thể tiếp thu công nghệ và kinh nghiệm quản trị từ nước đi trước',
      'Không cần nguồn nhân lực chất lượng cao',
      'Không cần hội nhập kinh tế quốc tế',
    ],
    answer: 'Có thể tiếp thu công nghệ và kinh nghiệm quản trị từ nước đi trước',
    reference: 'Trang 214-215: Lợi thế đi sau cho phép tiếp cận nhanh công nghệ, rút ngắn thời gian phát triển.',
  },
  {
    id: 9,
    question: 'Trong định hướng CNH, HĐH ở Việt Nam, yếu tố nào cần đi trước một bước?',
    options: ['Mở rộng khai thác thô', 'Phát triển nguồn nhân lực chất lượng cao', 'Giảm đầu tư giáo dục', 'Giảm số hóa'],
    answer: 'Phát triển nguồn nhân lực chất lượng cao',
    reference: 'Trang 217: Nguồn nhân lực, khoa học - công nghệ là nền tảng của CNH, HĐH.',
  },
  {
    id: 10,
    question: 'Cách mạng công nghiệp 4.0 nhấn mạnh điều gì trong sản xuất?',
    options: ['Sản xuất thủ công', 'Nhà máy thông minh và kết nối số', 'Tách rời dữ liệu khỏi sản xuất', 'Giảm ứng dụng AI'],
    answer: 'Nhà máy thông minh và kết nối số',
    reference: 'Trang 219-220: CMCN 4.0 hướng tới số hóa toàn diện, hệ thống sản xuất thông minh.',
  },
  {
    id: 11,
    question: 'Khác biệt lớn giữa CMCN 3.0 và 4.0 là gì?',
    options: [
      '3.0 không dùng điện',
      '4.0 tích hợp sâu AI, IoT, dữ liệu lớn trong hệ thống vật lý - số',
      '4.0 chỉ thay máy móc bằng lao động thủ công',
      '3.0 đã hoàn toàn tự chủ trí tuệ nhân tạo',
    ],
    answer: '4.0 tích hợp sâu AI, IoT, dữ liệu lớn trong hệ thống vật lý - số',
    reference: 'Trang 219: CMCN 4.0 là sự hợp nhất công nghệ số, vật lý và sinh học ở mức cao.',
  },
  {
    id: 12,
    question: 'Thách thức lớn của Việt Nam khi tận dụng CMCN 4.0 là gì?',
    options: [
      'Thiếu tài nguyên khoáng sản',
      'Nguy cơ tụt hậu về công nghệ và chất lượng nhân lực',
      'Không có thị trường nội địa',
      'Không có doanh nghiệp tư nhân',
    ],
    answer: 'Nguy cơ tụt hậu về công nghệ và chất lượng nhân lực',
    reference: 'Trang 220: Cơ hội đi kèm thách thức về nguồn lực công nghệ và năng lực đổi mới.',
  },
  {
    id: 13,
    question: 'Trong bối cảnh 4.0, phát triển kinh tế tri thức đòi hỏi gì?',
    options: [
      'Giảm đầu tư R&D',
      'Tăng vai trò đổi mới sáng tạo và chuyển đổi số',
      'Ưu tiên lao động giản đơn',
      'Tách rời giáo dục với doanh nghiệp',
    ],
    answer: 'Tăng vai trò đổi mới sáng tạo và chuyển đổi số',
    reference: 'Trang 218-220: Kinh tế tri thức cần đổi mới sáng tạo, công nghệ và dữ liệu làm động lực.',
  },
  {
    id: 14,
    question: 'Nếu một quốc gia chỉ nhập công nghệ nhưng không nâng cấp năng lực nội sinh, hệ quả dễ gặp là gì?',
    options: ['Tự chủ công nghệ cao', 'Phụ thuộc công nghệ kéo dài', 'Năng suất bứt phá bền vững', 'Giảm khoảng cách phát triển'],
    answer: 'Phụ thuộc công nghệ kéo dài',
    reference: 'Trang 214-220: Công nghiệp hóa bền vững phải đi cùng làm chủ công nghệ và năng lực sáng tạo trong nước.',
  },
  {
    id: 15,
    question: '“Hack não” 4.0: Yếu tố nào quyết định lợi thế cạnh tranh dài hạn trong nền kinh tế số?',
    options: [
      'Sở hữu nhiều lao động giá rẻ',
      'Khai thác tài nguyên thô',
      'Dữ liệu, công nghệ lõi và năng lực học hỏi liên tục',
      'Đóng cửa thị trường trong nước',
    ],
    answer: 'Dữ liệu, công nghệ lõi và năng lực học hỏi liên tục',
    reference: 'Tổng hợp trang 219-220: Lợi thế bền vững trong 4.0 đến từ tri thức, dữ liệu và đổi mới liên tục.',
  },
]
