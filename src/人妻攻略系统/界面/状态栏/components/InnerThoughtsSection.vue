<template>
  <div>
    <div v-if="_.isEmpty(store.data.女性心声)" class="empty">尚未窃听到任何心声</div>
    <div v-for="(thought, name) in store.data.女性心声" :key="name" class="thought-row">
      <span class="thought-name">💭 {{ name }}</span>
      <div class="thought-text">「{{ thought }}」</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.thought-row {
  background: var(--sys-panel);
  border: 1px solid rgba(181, 108, 255, 0.3);
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 6px;
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
