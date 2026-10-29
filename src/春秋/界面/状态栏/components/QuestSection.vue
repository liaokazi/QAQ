<template>
  <div>
    <div v-if="!任务.length" class="empty">暂无任务</div>
    <div v-for="(t, i) in 任务" :key="i" class="task-card">
      <div class="task-head">
        <span class="task-name">{{ t.名称 }}</span>
        <span class="task-state">{{ t.状态 }}</span>
      </div>
      <div class="task-desc">{{ t.描述 }}</div>
      <div class="task-progress">进度：{{ t.进度 || '未开始' }}</div>
      <div class="task-reward">🎁 +{{ t.奖励点数 }} 点数 · +{{ t.奖励经验 }} 经验</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const 任务 = computed(() => store.data.任务);
</script>

<style lang="scss" scoped>
.task-card {
  background: var(--sys-panel);
  border: 1px solid rgba(205, 155, 90, 0.3);
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 6px;
}

.task-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 3px;
}

.task-name {
  font-weight: 700;
  color: var(--sys-gold);
}

.task-state {
  font-size: 11px;
  color: var(--sys-green);
  white-space: nowrap;
}

.task-desc {
  color: var(--sys-text);
  font-size: 13px;
}

.task-progress {
  color: var(--sys-text-dim);
  font-size: 12px;
  margin-top: 2px;
}

.task-reward {
  color: var(--sys-gold);
  font-size: 12px;
  margin-top: 2px;
}
</style>
