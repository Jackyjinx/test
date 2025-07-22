<template>
  <div class="article-card card">
    <div class="image-container" @click="goToDetail">
      <img :src="article.image" :alt="article.title" class="article-image" />
      <div class="image-overlay">
        <h3 class="article-title">{{ article.title }}</h3>
      </div>
    </div>
    
    <div class="card-actions">
      <button 
        class="btn like-btn" 
        @click="handleLike"
        :class="{ 'liked': isLiked }"
      >
        <span class="like-icon">❤️</span>
        <span class="like-count">{{ article.likes }}</span>
        <div v-if="showLikeAnimation" class="like-animation">+1</div>
      </button>
      
      <button class="btn comment-btn" @click="toggleComments">
        <span class="comment-icon">💬</span>
        <span class="comment-count">{{ article.comments.length }}</span>
      </button>
    </div>
    
    <!-- 评论区域 -->
    <div v-if="showComments" class="comments-section">
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
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { articleApi } from '../api'

export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const showComments = ref(false)
    const newComment = ref('')
    const isLiked = ref(false)
    const showLikeAnimation = ref(false)

    const goToDetail = () => {
      router.push(`/article/${props.article.id}`)
    }

    const handleLike = async () => {
      if (isLiked.value) return
      
      try {
        await articleApi.likeArticle(props.article.id)
        isLiked.value = true
        showLikeAnimation.value = true
        
        // 动画结束后隐藏
        setTimeout(() => {
          showLikeAnimation.value = false
        }, 1000)
      } catch (error) {
        console.error('点赞失败:', error)
      }
    }

    const toggleComments = () => {
      showComments.value = !showComments.value
    }

    const submitComment = async () => {
      if (!newComment.value.trim()) return
      
      try {
        await articleApi.addComment(props.article.id, {
          content: newComment.value,
          user: '访客' + Math.floor(Math.random() * 1000)
        })
        newComment.value = ''
      } catch (error) {
        console.error('评论失败:', error)
      }
    }

    return {
      showComments,
      newComment,
      isLiked,
      showLikeAnimation,
      goToDetail,
      handleLike,
      toggleComments,
      submitComment
    }
  }
}
</script>

<style scoped>
.article-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  animation: fadeIn 0.6s ease-out;
}

.article-card:hover {
  transform: translateY(-5px);
}

.image-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.article-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container:hover .article-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem 1.5rem 1rem;
}

.article-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.card-actions {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: white;
}

.like-btn, .comment-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f3f4f6;
  color: #374151;
  position: relative;
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

.comment-btn:hover {
  background: #dbeafe;
  color: #2563eb;
}

.like-animation {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  color: #dc2626;
  font-weight: bold;
  font-size: 1.2rem;
  animation: likeAnimation 1s ease-out forwards;
  pointer-events: none;
}

.comments-section {
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  animation: slideDown 0.3s ease-out;
  max-height: 300px;
  overflow-y: auto;
}

.comment-input {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.comment-input-field {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}

.comment-input-field:focus {
  border-color: #3b82f6;
}

.submit-btn {
  background: #3b82f6;
  color: white;
  white-space: nowrap;
}

.submit-btn:hover {
  background: #2563eb;
}

.comments-list {
  padding: 0 1rem 1rem;
}

.comment-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.comment-user {
  font-weight: 600;
  color: #374151;
}

.comment-time {
  color: #6b7280;
}

.comment-content {
  color: #4b5563;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 1.2rem;
  }
  
  .card-actions {
    padding: 0.75rem 1rem;
  }
  
  .article-image {
    height: 200px;
  }
}
</style>