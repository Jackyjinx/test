<template>
  <div class="article-detail">
    <div class="detail-container" v-if="article">
      <!-- 返回按钮 -->
      <button class="btn back-btn" @click="goBack">
        ← 返回看板
      </button>
      
      <!-- 文章标题 -->
      <h1 class="article-title">{{ article.title }}</h1>
      
      <!-- 文章图片 -->
      <div class="article-image-container">
        <img :src="article.image" :alt="article.title" class="article-image" />
      </div>
      
      <!-- 文章内容 -->
      <div class="article-content">
        <p>{{ article.content }}</p>
        
        <!-- 这里可以添加更多详细内容 -->
        <div class="content-section">
          <h3>深入解读</h3>
          <p>廉洁文化作为中华优秀传统文化的重要组成部分，承载着深厚的历史底蕴和文化内涵。它不仅体现在古代文人墨客的诗词歌赋中，更体现在历代清官廉吏的实际行动中。</p>
          
          <h3>现实意义</h3>
          <p>在新时代背景下，弘扬廉洁文化具有重要的现实意义。它有助于营造风清气正的社会环境，提升全社会的道德水准，为实现中华民族伟大复兴提供强大的精神支撑。</p>
          
          <h3>实践路径</h3>
          <p>传承和发展廉洁文化需要多方面的努力：加强教育引导、完善制度建设、营造良好氛围、注重实践养成。只有全社会共同参与，才能让廉洁文化在新时代焕发出更加绚烂的光彩。</p>
        </div>
      </div>
      
      <!-- 互动区域 -->
      <div class="interaction-area">
        <div class="like-section">
          <button 
            class="btn like-btn" 
            @click="handleLike"
            :class="{ 'liked': isLiked }"
          >
            <span class="like-icon">❤️</span>
            <span class="like-count">{{ article.likes }}</span>
            <div v-if="showLikeAnimation" class="like-animation">+1</div>
          </button>
        </div>
        
        <!-- 评论区域 -->
        <div class="comments-section">
          <h3 class="comments-title">评论区 ({{ article.comments.length }})</h3>
          
          <div class="comment-input">
            <input 
              v-model="newComment" 
              placeholder="写下你的评论..." 
              @keyup.enter="submitComment"
              class="comment-input-field"
            />
            <button @click="submitComment" class="btn submit-btn">发送</button>
          </div>
          
          <div class="comments-list">
            <div v-for="comment in article.comments" :key="comment.id" class="comment-item">
              <div class="comment-header">
                <span class="comment-user">{{ comment.user }}</span>
                <span class="comment-time">{{ comment.time }}</span>
              </div>
              <div class="comment-content">{{ comment.content }}</div>
            </div>
            
            <div v-if="article.comments.length === 0" class="no-comments">
              还没有评论，快来发表第一条评论吧！
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { articleApi } from '../api'

export default {
  name: 'ArticleDetail',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const article = ref(null)
    const newComment = ref('')
    const isLiked = ref(false)
    const showLikeAnimation = ref(false)

    const loadArticle = async () => {
      try {
        const response = await articleApi.getArticleById(route.params.id)
        article.value = response.data
      } catch (error) {
        console.error('加载文章失败:', error)
      }
    }

    const goBack = () => {
      router.push('/')
    }

    const handleLike = async () => {
      if (isLiked.value || !article.value) return
      
      try {
        await articleApi.likeArticle(article.value.id)
        article.value.likes++
        isLiked.value = true
        showLikeAnimation.value = true
        
        setTimeout(() => {
          showLikeAnimation.value = false
        }, 1000)
      } catch (error) {
        console.error('点赞失败:', error)
      }
    }

    const submitComment = async () => {
      if (!newComment.value.trim() || !article.value) return
      
      try {
        const response = await articleApi.addComment(article.value.id, {
          content: newComment.value,
          user: '访客' + Math.floor(Math.random() * 1000)
        })
        article.value.comments.push(response.data)
        newComment.value = ''
      } catch (error) {
        console.error('评论失败:', error)
      }
    }

    onMounted(() => {
      loadArticle()
    })

    return {
      article,
      newComment,
      isLiked,
      showLikeAnimation,
      goBack,
      handleLike,
      submitComment
    }
  }
}
</script>

<style scoped>
.article-detail {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.detail-container {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.8s ease-out;
}

.back-btn {
  background: #6366f1;
  color: white;
  margin-bottom: 2rem;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
}

.back-btn:hover {
  background: #4f46e5;
}

.article-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.2;
}

.article-image-container {
  margin-bottom: 2rem;
  text-align: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.article-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #374151;
  margin-bottom: 3rem;
}

.content-section {
  margin-top: 2rem;
}

.content-section h3 {
  color: #4f46e5;
  font-size: 1.4rem;
  margin: 2rem 0 1rem 0;
  border-left: 4px solid #4f46e5;
  padding-left: 1rem;
}

.content-section p {
  margin-bottom: 1.5rem;
  text-align: justify;
}

.interaction-area {
  border-top: 2px solid #e5e7eb;
  padding-top: 2rem;
}

.like-section {
  text-align: center;
  margin-bottom: 3rem;
}

.like-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  color: #374151;
  position: relative;
  font-size: 1.2rem;
  padding: 1rem 2rem;
}

.like-btn.liked {
  background: #fee2e2;
  color: #dc2626;
  animation: bounce 0.6s ease;
}

.like-btn:hover {
  background: #fee2e2;
  color: #dc2626;
}

.like-animation {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: #dc2626;
  font-weight: bold;
  font-size: 1.5rem;
  animation: likeAnimation 1s ease-out forwards;
  pointer-events: none;
}

.comments-section {
  background: #f9fafb;
  border-radius: 12px;
  padding: 2rem;
}

.comments-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.comment-input {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.comment-input-field {
  flex: 1;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s;
  font-size: 1rem;
}

.comment-input-field:focus {
  border-color: #3b82f6;
}

.submit-btn {
  background: #3b82f6;
  color: white;
  white-space: nowrap;
  font-size: 1rem;
  padding: 1rem 2rem;
}

.submit-btn:hover {
  background: #2563eb;
}

.comments-list {
  space-y: 1rem;
}

.comment-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.comment-user {
  font-weight: 600;
  color: #4f46e5;
}

.comment-time {
  color: #6b7280;
}

.comment-content {
  color: #4b5563;
  line-height: 1.6;
  font-size: 1rem;
}

.no-comments {
  text-align: center;
  color: #9ca3af;
  font-style: italic;
  padding: 2rem;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: white;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-detail {
    padding: 1rem;
  }
  
  .detail-container {
    padding: 2rem 1.5rem;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-content {
    font-size: 1rem;
  }
  
  .comment-input {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .submit-btn {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .detail-container {
    padding: 1.5rem 1rem;
  }
  
  .article-title {
    font-size: 1.5rem;
  }
  
  .content-section h3 {
    font-size: 1.2rem;
  }
}
</style>