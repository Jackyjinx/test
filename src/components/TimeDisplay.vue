<template>
  <div class="time-display">
    <div class="time">{{ currentTime }}</div>
    <div class="date">{{ currentDate }} {{ currentWeekday }}</div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { formatDateTime, getWeekday } from '../utils'

export default {
  name: 'TimeDisplay',
  setup() {
    const currentTime = ref('')
    const currentDate = ref('')
    const currentWeekday = ref('')
    let timer = null

    const updateTime = () => {
      const now = new Date()
      const { date, time } = formatDateTime(now)
      const weekday = getWeekday(now)
      
      currentTime.value = time
      currentDate.value = date
      currentWeekday.value = weekday
    }

    onMounted(() => {
      updateTime()
      timer = setInterval(updateTime, 1000)
    })

    onUnmounted(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    return {
      currentTime,
      currentDate,
      currentWeekday
    }
  }
}
</script>

<style scoped>
.time-display {
  text-align: right;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.time {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}

.date {
  font-size: 1.2rem;
  font-weight: 500;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .time {
    font-size: 1.8rem;
  }
  .date {
    font-size: 1rem;
  }
}
</style>