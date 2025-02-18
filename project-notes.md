## QUY TẮT KHI CODE TRONG DỰ ÁN!

### 1. Tuân theo Module-based Structure

```
📁 src/
├── components/
│   ├── Button.tsx
│   └── Form.tsx
├── pages/
│   ├── Login.tsx
│   └── Dashboard.tsx
├── services/
│   └── api.ts
├── hooks/
│   └── useAuth.ts
└── utils/
    └── helpers.ts
```

### 2. Các quy tắc khi đặt tên file hoặc folder

#### 2.1 Folders
    - Luôn sử dụng kebab-case (feature-name)
	- Feature modules nên có tên rõ ràng (user-management)

#### 2.2 Files
	- Components: PascalCase (UserProfile.jsx)
	- Hooks: camelCase (useAuth.js) with prefix `use`
	- Services: camelCase (authService.js) with suffix `Service`
	- Providers/Contexts: PascalCase (AuthProvider.jsx) with suffix `Provider` or `Context`
    - Utils/Helpers: camelCase (formatDate.js)
    - Constants: 
        - SCREAMING_SNAKE_CASE for values.
        - camelCase (apiConstants.js) with suffix `Constants`.
    - Constants: PascalCase (MainLayout.jsx) with suffix `Layout`
    - Pages/Views: PascalCase (HomePage.jsx)