<template>
  <div>
    <div class="range-line">🔊 窃听范围：{{ 所在地 || '—' }}</div>
    <div v-if="isEmpty" class="empty">尚未窃听到任何心声</div>
    <div v-for="(thought, name) in store.data.女性心声" :key="name" class="thought-row">
      <span class="thought-name">💭 {{ name }}</span>
      <div class="thought-text">「{{ thought }}」</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const isEmpty = computed(() => _.isEmpty(store.data.女性心声));
const 所在地 = computed(() => store.data.世界.地点.所在地);
</script>

<style lang="scss" scoped>
.range-line {
  color: var(--sys-lilac);
  font-size: 11px;
  margin-bottom: 4px;
  text-shadow: 0 0 6px rgba(181, 108, 255, 0.4);
}

.thought-row {
  background: var(--sys-panel);
  border: 1px solid rgba(181, 108, 255, 0.3);
  border-radius: 10px;
  padding: 6px 8px;
  margin-bottom: 4px;
}

.thought-name {
  display: block;
  font-weight: 700;
  color: var(--sys-violet);
  margin-bottom: 3px;
}

.thought-text {
  color: var(--sys-text);
  font-size: 12px;
  line-height: 1.6;
  word-break: break-word;
  text-shadow: 0 0 6px rgba(181, 108, 255, 0.2);
}
</style>
