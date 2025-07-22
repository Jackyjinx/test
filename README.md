# Vue.js 待辦事項應用

這是一個使用 Vue.js 3 構建的簡單而完整的待辦事項應用，展示了 Vue.js 的核心功能和最佳實踐。

## 🚀 功能特性

- ✅ **添加待辦事項** - 輸入新的任務並添加到列表
- ✅ **標記完成** - 點擊複選框標記任務為已完成
- ✅ **刪除任務** - 刪除不需要的任務
- ✅ **篩選功能** - 查看全部、待完成或已完成的任務
- ✅ **統計信息** - 顯示總數、待完成數、已完成數和完成率
- ✅ **數據持久化** - 使用 localStorage 保存數據
- ✅ **響應式設計** - 適配桌面和移動設備
- ✅ **美觀的UI** - 現代化的設計風格

## 🛠️ 技術棧

- **Vue.js 3** - 使用 Composition API 和響應式系統
- **原生 JavaScript** - 無需額外構建工具
- **CSS3** - 現代化樣式和動畫效果
- **Font Awesome** - 圖標庫
- **localStorage** - 本地數據存儲

## 📁 文件結構

```
.
├── index.html          # 主HTML文件，包含完整的應用代碼
└── README.md          # 項目說明文件
```

## 🎯 Vue.js 核心概念演示

這個應用展示了以下 Vue.js 核心概念：

### 1. 響應式數據 (Reactive Data)
```javascript
data() {
    return {
        newTodo: '',
        filter: 'all',
        todos: [...]
    }
}
```

### 2. 計算屬性 (Computed Properties)
```javascript
computed: {
    activeTodos() {
        return this.todos.filter(todo => !todo.completed);
    },
    completionPercentage() {
        return Math.round((this.completedTodos.length / this.todos.length) * 100);
    }
}
```

### 3. 方法 (Methods)
```javascript
methods: {
    addTodo() {
        // 添加新任務的邏輯
    },
    deleteTodo(id) {
        // 刪除任務的邏輯
    }
}
```

### 4. 生命週期鉤子 (Lifecycle Hooks)
```javascript
mounted() {
    // 組件掛載後載入保存的數據
    const savedTodos = localStorage.getItem('vue-todos');
    if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
    }
}
```

### 5. 監聽器 (Watchers)
```javascript
watch: {
    todos: {
        handler(newTodos) {
            localStorage.setItem('vue-todos', JSON.stringify(newTodos));
        },
        deep: true
    }
}
```

### 6. 模板語法 (Template Syntax)
- **插值** - `{{ todos.length }}`
- **指令** - `v-model`, `v-for`, `v-if`, `@click`
- **條件渲染** - `v-if="filteredTodos.length === 0"`
- **列表渲染** - `v-for="todo in filteredTodos"`
- **事件處理** - `@click="addTodo"`, `@keyup.enter="addTodo"`

## 🚀 如何運行

1. **直接打開** - 由於使用 CDN 方式引入 Vue.js，直接用瀏覽器打開 `index.html` 即可

2. **本地服務器** (推薦) - 為了更好的開發體驗，可以使用本地服務器：
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx serve .
   
   # 使用 PHP
   php -S localhost:8000
   ```

3. 在瀏覽器中訪問 `http://localhost:8000`

## 💡 學習要點

### Vue.js 基礎概念
- **響應式數據綁定** - 數據變化自動更新UI
- **組件化開發** - 雖然這是單文件應用，但展示了組件的基本結構
- **聲明式渲染** - 描述UI應該是什麼樣子，而不是如何操作DOM

### 最佳實踐
- **數據驅動** - 通過修改數據來驅動UI變化
- **單向數據流** - 數據從父級流向子級
- **事件處理** - 使用 `@` 語法處理用戶交互
- **計算屬性** - 用於派生數據，具有緩存特性

## 🎨 UI 設計特色

- **漸變背景** - 使用 CSS 漸變創建視覺吸引力
- **卡片設計** - 現代化的卡片布局
- **微交互** - 懸停效果和過渡動畫
- **響應式布局** - 適配不同屏幕尺寸
- **圖標支持** - 使用 Font Awesome 圖標

## 🔧 自定義和擴展

你可以輕鬆擴展這個應用：

1. **添加新功能**
   - 任務優先級
   - 到期日期
   - 任務分類
   - 搜索功能

2. **改進UI**
   - 主題切換
   - 自定義顏色
   - 動畫效果
   - 拖拽排序

3. **數據存儲**
   - 連接後端API
   - 使用 IndexedDB
   - 雲端同步

## 📚 學習資源

- [Vue.js 官方文檔](https://vuejs.org/)
- [Vue.js 3 指南](https://v3.vuejs.org/guide/)
- [Vue.js 最佳實踐](https://vuejs.org/guide/best-practices/)

## 📝 許可證

此項目僅用於學習和演示目的。