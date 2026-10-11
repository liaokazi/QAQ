<template>
  <div class="xianer">
    <div class="xianer-head">
      <span class="xianer-avatar">🧚</span>
      <span class="xianer-name">器灵 · 仙儿</span>
      <span class="xianer-tag">吐槽中</span>
    </div>
    <div class="xianer-bubble">{{ store.data.仙儿.吐槽 || '（仙儿正在暗中观察你的一举一动……）' }}</div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.xianer {
  padding: 10px 14px;
  border-bottom: 1px dashed rgba(255, 95, 162, 0.4);
  background: rgba(255, 45, 120, 0.06);
}

.xianer-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.xianer-avatar {
  font-size: 16px;
  filter: drop-shadow(0 0 6px rgba(181, 108, 255, 0.8));
}

.xianer-name {
  font-weight: 700;
  color: var(--sys-lilac);
  text-shadow: 0 0 8px rgba(181, 108, 255, 0.6);
}

.xianer-tag {
  font-size: 10px;
  color: var(--sys-pink);
  border: 1px solid var(--sys-pink);
  border-radius: 4px;
  padding: 0 5px;
}

.xianer-bubble {
  background: var(--sys-panel);
  border: 1px solid rgba(255, 95, 162, 0.35);
  border-radius: 4px 12px 12px 12px;
  padding: 8px 10px;
  color: var(--sys-text);
  font-size: 12px;
  line-height: 1.6;
  word-break: break-word;
}
</style>
