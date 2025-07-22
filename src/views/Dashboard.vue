<template>
  <div class="dashboard">
    <!-- 顶部区域 -->
    <header class="dashboard-header">
      <!-- 左上角标题 -->
      <div class="title-section">
        <h1 class="main-title">廉洁文化教育基地</h1>
      </div>
      
      <!-- 右上角时间显示 -->
      <div class="time-section">
        <TimeDisplay />
      </div>
    </header>
    
    <!-- 主内容区域 -->
    <main class="dashboard-main">
      <div class="content-container">
        <!-- 当前显示的文章 -->
        <div class="current-article" v-if="currentArticle">
          <ArticleCard :article="currentArticle" />
        </div>
        
        <!-- 文章切换指示器 -->
        <div class="article-indicators">
          <button 
            v-for="(article, index) in articles" 
            :key="article.id"
            class="indicator"
            :class="{ 'active': currentIndex === index }"
            @click="switchToArticle(index)"
          >
            {{ index + 1 }}
          </button>
        </div>
        
        <!-- 自动播放控制 -->
        <div class="playback-controls">
          <button 
            class="btn control-btn" 
            @click="toggleAutoPlay"
            :class="{ 'playing': isAutoPlaying }"
          >
            {{ isAutoPlaying ? '⏸️ 暂停' : '▶️ 播放' }}
          </button>
          <button class="btn control-btn" @click="previousArticle">⏮️ 上一篇</button>
          <button class="btn control-btn" @click="nextArticle">⏭️ 下一篇</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import TimeDisplay from '../components/TimeDisplay.vue'
import ArticleCard from '../components/ArticleCard.vue'
import { articleApi } from '../api'

export default {
  name: 'Dashboard',
  components: {
    TimeDisplay,
    ArticleCard
  },
  setup() {
    const articles = ref([])
    const currentIndex = ref(0)
    const isAutoPlaying = ref(true)
    let autoPlayTimer = null

    const currentArticle = computed(() => {
      return articles.value[currentIndex.value]
    })

    const loadArticles = async () => {
      try {
        const response = await articleApi.getArticles()
        articles.value = response.data
      } catch (error) {
        console.error('加载文章失败:', error)
      }
    }

    const nextArticle = () => {
      currentIndex.value = (currentIndex.value + 1) % articles.value.length
    }

    const previousArticle = () => {
      currentIndex.value = currentIndex.value === 0 
        ? articles.value.length - 1 
        : currentIndex.value - 1
    }

    const switchToArticle = (index) => {
      currentIndex.value = index
    }

    const startAutoPlay = () => {
      if (autoPlayTimer) clearInterval(autoPlayTimer)
      autoPlayTimer = setInterval(() => {
        nextArticle()
      }, 8000) // 8秒切换一次
    }

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer)
        autoPlayTimer = null
      }
    }

    const toggleAutoPlay = () => {
      isAutoPlaying.value = !isAutoPlaying.value
      if (isAutoPlaying.value) {
        startAutoPlay()
      } else {
        stopAutoPlay()
      }
    }

    onMounted(() => {
      loadArticles()
      startAutoPlay()
    })

    onUnmounted(() => {
      stopAutoPlay()
    })

    return {
      articles,
      currentArticle,
      currentIndex,
      isAutoPlaying,
      nextArticle,
      previousArticle,
      switchToArticle,
      toggleAutoPlay
    }
  }
}
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2rem 3rem;
  position: relative;
  z-index: 10;
}

.title-section {
  flex: 1;
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
  margin: 0;
  background: linear-gradient(45deg, #fff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.time-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.dashboard-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 3rem;
  position: relative;
}

.content-container {
  width: 100%;
  max-width: 800px;
  position: relative;
}

.current-article {
  margin-bottom: 2rem;
  animation: fadeIn 0.8s ease-out;
}

.article-indicators {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.indicator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.indicator.active {
  background: white;
  color: #4f46e5;
  border-color: white;
  transform: scale(1.2);
}

.playback-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

.control-btn.playing {
  background: rgba(34, 197, 94, 0.3);
  border-color: rgba(34, 197, 94, 0.5);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .dashboard-header {
    padding: 1.5rem 2rem;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .dashboard-main {
    padding: 1.5rem 2rem;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .main-title {
    font-size: 2rem;
    text-align: center;
  }
  
  .time-section {
    justify-content: center;
  }
  
  .dashboard-main {
    padding: 1rem;
  }
  
  .playback-controls {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .control-btn {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.5rem;
  }
  
  .article-indicators {
    gap: 0.5rem;
  }
  
  .indicator {
    width: 35px;
    height: 35px;
  }
}
</style>