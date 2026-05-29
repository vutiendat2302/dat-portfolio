# dat-portfolio

```

Profile Website
├── Home / Hero
│   ├── Tên
│   ├── Vai trò mong muốn
│   └── Nút xem CV / liên hệ
│
├── About Me
│   ├── Giới thiệu ngắn
│   ├── Trường học
│   └── Mục tiêu nghề nghiệp
│
├── Skills
│   ├── Programming
│   ├── Data / Backend
│   └── Tools
│
├── Projects
│   ├── Tên project
│   ├── Mô tả
│   ├── Công nghệ dùng
│   └── Link GitHub / Demo
│
├── Education
│
├── Experience / Activities
│
└── Contact
    ├── Email
    ├── GitHub
    ├── LinkedIn
    └── Facebook
    └── Instagram

```


Frontend: React + Vite + TailwindCSS
Backend: NestJS
Database: PostgreSQL 
Image Storage: Cloudinary / Firebase Storage / Supabase Storage
Deploy:
- Frontend: Vercel
- Backend: Spring Boot 
- Database: Supabase / Neon / MongoDB Atlas

1. Public Profile

- Trang chủ
- Giới thiệu bản thân
- Kỹ năng
- Project
- Quá trình học tập
- Blog / Notes
- Gallery ảnh
- Contact

2. Admin Dashboard

- Thêm / sửa / xoá bài học
- Upload ảnh
- Thêm project mới
- Cập nhật kỹ năng
- Viết nhật ký học tập
- Quản lý CV

3. Database



1. Giai đoạn 1: 
- Làm frontend portfolio tĩnh
- Có Home, About, Skills, Projects, Contact

2. Giai đoạn 2: 
- Làm backend Express
- Tạo database
- Làm API cho projects và learning_logs

3. Gia đoạn 3:
- Làm admin dashboard
- Thêm chức năng CRUD
- Đăng nhập admin

4. Giai đoạn 4: 
- Upload ảnh
- Gallery
- Blog / notes
- Deploy

frontend/
│
├── public/
│   ├── favicon.ico
│   └── images/
│       └── default-avatar.png
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── api/
│   │   ├── axiosClient.js
│   │   ├── authApi.js
│   │   ├── projectApi.js
│   │   ├── learningApi.js
│   │   ├── skillApi.js
│   │   └── imageApi.js
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PublicLayout.jsx
│   │   │   └── AdminLayout.jsx
│   │   │
│   │   ├── profile/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── SkillSection.jsx
│   │   │   ├── ProjectSection.jsx
│   │   │   ├── LearningTimeline.jsx
│   │   │   └── ContactSection.jsx
│   │   │
│   │   ├── project/
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectList.jsx
│   │   │   └── ProjectForm.jsx
│   │   │
│   │   ├── learning/
│   │   │   ├── LearningCard.jsx
│   │   │   ├── LearningList.jsx
│   │   │   └── LearningForm.jsx
│   │   │
│   │   └── gallery/
│   │       ├── ImageCard.jsx
│   │       ├── ImageGrid.jsx
│   │       └── ImageUploadForm.jsx
│   │
│   ├── pages/
│   │   ├── public/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProjectsPage.jsx
│   │   │   ├── LearningPage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   └── ContactPage.jsx
│   │   │
│   │   ├── auth/
│   │   │   └── LoginPage.jsx
│   │   │
│   │   └── admin/
│   │       ├── DashboardPage.jsx
│   │       ├── ManageProjectsPage.jsx
│   │       ├── ManageLearningPage.jsx
│   │       ├── ManageSkillsPage.jsx
│   │       └── ManageGalleryPage.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── PublicRoutes.jsx
│   │   └── PrivateRoute.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── useDebounce.js
│   │
│   ├── contexts/
│   │   └── AuthContext.jsx
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── validateForm.js
│   │   └── constants.js
│   │
│   ├── styles/
│   │   └── index.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js


personal-profile-web/
│
├── frontend/
│   │
│   ├── public/
│   │   ├── favicon.ico
│   │   └── images/
│   │       └── default-avatar.png
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   │
│   │   ├── api/
│   │   │   ├── axiosClient.js
│   │   │   ├── authApi.js
│   │   │   ├── projectApi.js
│   │   │   ├── learningApi.js
│   │   │   ├── skillApi.js
│   │   │   ├── blogApi.js
│   │   │   └── imageApi.js
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Textarea.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Loading.jsx
│   │   │   │   └── ConfirmDialog.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── PublicLayout.jsx
│   │   │   │   └── AdminLayout.jsx
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── AboutSection.jsx
│   │   │   │   ├── SkillSection.jsx
│   │   │   │   ├── ProjectSection.jsx
│   │   │   │   ├── LearningTimeline.jsx
│   │   │   │   └── ContactSection.jsx
│   │   │   │
│   │   │   ├── project/
│   │   │   │   ├── ProjectCard.jsx
│   │   │   │   ├── ProjectList.jsx
│   │   │   │   └── ProjectForm.jsx
│   │   │   │
│   │   │   ├── learning/
│   │   │   │   ├── LearningCard.jsx
│   │   │   │   ├── LearningList.jsx
│   │   │   │   └── LearningForm.jsx
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── BlogCard.jsx
│   │   │   │   ├── BlogList.jsx
│   │   │   │   └── BlogForm.jsx
│   │   │   │
│   │   │   └── gallery/
│   │   │       ├── ImageCard.jsx
│   │   │       ├── ImageGrid.jsx
│   │   │       └── ImageUploadForm.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── AboutPage.jsx
│   │   │   │   ├── ProjectsPage.jsx
│   │   │   │   ├── LearningPage.jsx
│   │   │   │   ├── BlogPage.jsx
│   │   │   │   ├── BlogDetailPage.jsx
│   │   │   │   ├── GalleryPage.jsx
│   │   │   │   └── ContactPage.jsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   └── LoginPage.jsx
│   │   │   │
│   │   │   └── admin/
│   │   │       ├── DashboardPage.jsx
│   │   │       ├── ManageProjectsPage.jsx
│   │   │       ├── ManageLearningPage.jsx
│   │   │       ├── ManageSkillsPage.jsx
│   │   │       ├── ManageBlogsPage.jsx
│   │   │       ├── ManageGalleryPage.jsx
│   │   │       └── ManageProfilePage.jsx
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   └── PrivateRoute.jsx
│   │   │
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useFetch.js
│   │   │   └── useDebounce.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── formatDate.js
│   │   │   └── validateForm.js
│   │   │
│   │   ├── styles/
│   │   │   └── index.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── cloudinary.js
│   │   │   └── env.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── profile.controller.js
│   │   │   ├── project.controller.js
│   │   │   ├── learning.controller.js
│   │   │   ├── skill.controller.js
│   │   │   ├── blog.controller.js
│   │   │   └── image.controller.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── profile.routes.js
│   │   │   ├── project.routes.js
│   │   │   ├── learning.routes.js
│   │   │   ├── skill.routes.js
│   │   │   ├── blog.routes.js
│   │   │   └── image.routes.js
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   ├── project.service.js
│   │   │   ├── learning.service.js
│   │   │   ├── blog.service.js
│   │   │   └── upload.service.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   ├── upload.middleware.js
│   │   │   └── validate.middleware.js
│   │   │
│   │   ├── validators/
│   │   │   ├── auth.validator.js
│   │   │   ├── project.validator.js
│   │   │   ├── learning.validator.js
│   │   │   └── blog.validator.js
│   │   │
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   ├── hashPassword.js
│   │   │   ├── slugify.js
│   │   │   └── response.js
│   │   │
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── uploads/
│   │   └── .gitkeep
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── docs/
│   ├── database-design.md
│   ├── api-documentation.md
│   ├── deployment.md
│   └── screenshots/
│
├── README.md
├── .gitignore
└── docker-compose.yml