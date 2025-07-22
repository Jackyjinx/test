# 廉洁文化教育基地看板系统

基于Vue3开发的16:9比例看板展示系统，用于廉洁文化教育内容的展示和互动。

## 功能特性

- 🎨 **16:9宽屏设计** - 适配大屏显示设备
- 🏛️ **固定标题显示** - 左上角"廉洁文化教育基地"标题
- ⏰ **实时时间显示** - 右上角显示实时时分秒、日期和星期
- 🖼️ **图片轮播展示** - 中央区域占三分之二的图片展示
- 👍 **点赞功能** - 带有+1动画效果的点赞交互
- 💬 **评论功能** - 点击展开的下拉评论区域
- 📄 **文章详情** - 点击图片跳转到详细文章页面
- 🎯 **自动播放** - 支持自动轮播和手动控制
- 📱 **响应式设计** - 适配不同屏幕尺寸

## 项目结构

```
├── public/
│   └── index.html          # HTML入口文件
├── src/
│   ├── api/
│   │   └── index.js        # API接口配置和模拟数据
│   ├── assets/
│   │   └── css/
│   │       └── global.css  # 全局样式
│   ├── components/
│   │   ├── TimeDisplay.vue     # 时间显示组件
│   │   └── ArticleCard.vue     # 文章卡片组件
│   ├── router/
│   │   └── index.js        # 路由配置
│   ├── utils/
│   │   └── index.js        # 工具函数
│   ├── views/
│   │   ├── Dashboard.vue       # 主看板页面
│   │   └── ArticleDetail.vue   # 文章详情页面
│   ├── App.vue             # 根组件
│   └── main.js             # 应用入口
├── package.json            # 项目依赖配置
├── vite.config.js         # Vite构建配置
└── README.md              # 项目说明文档
```

## 安装和运行

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 安装依赖
```bash
npm install
# 或
yarn install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

项目将在 `http://localhost:3000` 启动

### 构建生产版本
```bash
npm run build
# 或
yarn build
```

### 预览生产版本
```bash
npm run preview
# 或
yarn preview
```

## 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **Vue Router 4** - 官方路由管理器
- **Vite** - 下一代前端构建工具
- **Axios** - HTTP客户端库
- **CSS3** - 现代CSS特性和动画

## 主要功能说明

### 1. 看板展示
- 16:9宽屏布局，适配大屏显示
- 左上角固定显示"廉洁文化教育基地"标题
- 右上角实时显示时间、日期和星期

### 2. 文章展示
- 中央区域展示文章图片和标题
- 支持自动轮播（8秒间隔）和手动控制
- 底部指示器显示当前文章位置

### 3. 交互功能
- **点赞**：点击心形按钮，显示+1动画效果
- **评论**：点击评论按钮展开评论区域
- **详情**：点击图片跳转到文章详情页面

### 4. 响应式设计
- 支持桌面端、平板和移动设备
- 自适应布局和字体大小调整

## 自定义配置

### 修改文章数据
编辑 `src/api/index.js` 文件中的 `mockArticles` 数组：

```javascript
const mockArticles = [
  {
    id: 1,
    title: '文章标题',
    image: '图片URL',
    content: '文章内容...',
    likes: 点赞数,
    comments: [评论数组]
  }
]
```

### 调整自动播放间隔
在 `src/views/Dashboard.vue` 中修改：

```javascript
autoPlayTimer = setInterval(() => {
  nextArticle()
}, 8000) // 修改这里的数值（毫秒）
```

### 自定义样式
- 全局样式：编辑 `src/assets/css/global.css`
- 组件样式：在对应的 `.vue` 文件中修改 `<style>` 部分

## 浏览器支持

- Chrome 85+
- Firefox 78+
- Safari 14+
- Edge 85+

## 许可证

MIT License