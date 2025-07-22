import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
api.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.error('API请求错误:', error)
    return Promise.reject(error)
  }
)

// 模拟数据
const mockArticles = [
  {
    id: 1,
    title: '廉洁文化的历史传承',
    image: 'https://via.placeholder.com/800x600/4f46e5/ffffff?text=廉洁文化历史',
    content: '廉洁文化是中华民族优秀传统文化的重要组成部分，体现了中华民族崇尚清廉、反对腐败的价值追求...',
    likes: 128,
    comments: [
      { id: 1, user: '张三', content: '很有教育意义的文章', time: '2024-01-15 10:30' },
      { id: 2, user: '李四', content: '学习了，受益匪浅', time: '2024-01-15 11:20' }
    ]
  },
  {
    id: 2,
    title: '新时代廉洁教育实践',
    image: 'https://via.placeholder.com/800x600/059669/ffffff?text=廉洁教育实践',
    content: '新时代背景下，廉洁教育要与时俱进，创新教育方式方法，增强教育的针对性和实效性...',
    likes: 95,
    comments: [
      { id: 3, user: '王五', content: '实践性很强', time: '2024-01-15 14:15' }
    ]
  },
  {
    id: 3,
    title: '廉洁从业的职业操守',
    image: 'https://via.placeholder.com/800x600/dc2626/ffffff?text=职业操守',
    content: '廉洁从业是每个职场人员应当遵守的基本职业操守，关系到个人品德和社会风气...',
    likes: 76,
    comments: []
  }
]

// API方法
export const articleApi = {
  // 获取文章列表
  getArticles() {
    return Promise.resolve({
      code: 200,
      data: mockArticles,
      message: '获取成功'
    })
  },

  // 获取文章详情
  getArticleById(id) {
    const article = mockArticles.find(item => item.id == id)
    return Promise.resolve({
      code: 200,
      data: article,
      message: '获取成功'
    })
  },

  // 点赞文章
  likeArticle(id) {
    const article = mockArticles.find(item => item.id == id)
    if (article) {
      article.likes++
    }
    return Promise.resolve({
      code: 200,
      data: { likes: article.likes },
      message: '点赞成功'
    })
  },

  // 添加评论
  addComment(articleId, comment) {
    const article = mockArticles.find(item => item.id == articleId)
    if (article) {
      const newComment = {
        id: Date.now(),
        user: comment.user || '匿名用户',
        content: comment.content,
        time: new Date().toLocaleString('zh-CN')
      }
      article.comments.push(newComment)
      return Promise.resolve({
        code: 200,
        data: newComment,
        message: '评论成功'
      })
    }
    return Promise.reject(new Error('文章不存在'))
  }
}

export default api