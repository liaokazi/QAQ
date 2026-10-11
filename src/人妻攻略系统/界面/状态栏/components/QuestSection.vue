<template>
  <div>
    <div v-if="!store.data.任务.length" class="empty">暂无进行中的任务</div>
    <div v-for="(task, i) in store.data.任务" :key="`${task.名称}-${i}`" class="quest-row">
      <div class="quest-head">
        <span class="quest-name">📜 {{ task.名称 }}</span>
        <span class="quest-reward">+{{ task.点数 }} 点数</span>
      </div>
      <div class="quest-desc">{{ task.描述 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.quest-row {
  background: var(--sys-panel);
  border: 1px solid rgba(255, 201, 77, 0.3);
  border-left: 3px solid var(--sys-gold);
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 6px;
}

.quest-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 3px;
}

.quest-name {
  font-weight: 700;
  color: var(--sys-gold);
}

.quest-reward {
  color: var(--sys-gold);
  font-weight: 700;
  font-size: 12px;
  white-space: nowrap;
}

.quest-desc {
  color: var(--sys-text-dim);
  font-size: 12px;
  word-break: break-word;
}
</style>
