<template>
  <div class="panel-content">
    <div v-if="!_.isEmpty(store.data.任务)" class="sub-list">
      <div v-for="(t, name) in store.data.任务" :key="name" class="task" :class="{ done: t.状态 === '已完成' }">
        <div class="row">
          <span class="task-icon">{{ t.状态 === '已完成' ? '✓' : '▸' }}</span>
          <span class="task-name">{{ name }}</span>
          <span class="task-reward"><i class="fa-solid fa-coins"></i>{{ t.奖励点数 }} <i class="fa-solid fa-bolt"></i>{{ t.奖励经验 }}</span>
        </div>
        <div class="dim small">{{ t.描述 }}</div>
        <div class="row dim small">
          <span>进度：{{ t.进度 }}</span>
          <span v-if="t.状态" class="task-state" :class="{ done: t.状态 === '已完成' }">{{ t.状态 }}</span>
        </div>
      </div>
    </div>
    <div v-else class="empty">暂无任务，仙儿会依剧情生成两条</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sub-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.task {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  background:
    radial-gradient(120% 100% at 0% 0%, rgba(127, 209, 168, 0.09), transparent 55%),
    rgba(236, 224, 194, 0.04);
  border: 1px solid var(--line-soft);
  border-left: 3px solid var(--gold);
  border-radius: 10px;

  &.done {
    border-left-color: var(--jade);
    opacity: 0.75;
  }
}

.task-icon {
  color: var(--gold);
  font-weight: bold;
}

.task-name {
  font-weight: bold;
  color: var(--parchment);
  letter-spacing: 1px;
}

.task-reward {
  margin-left: auto;
  color: var(--jade);
  font-size: 12px;
  font-variant-numeric: tabular-nums;

  i {
    color: var(--gold);
    font-size: 10.5px;
    margin-right: 2px;
  }
}

.task-state {
  margin-left: auto;
  color: var(--gold-bright);
  font-size: 11px;
  padding: 0 7px;
  border: 1px solid var(--line-soft);
  border-radius: 3px;

  &.done {
    color: var(--jade);
    border-color: rgba(127, 209, 168, 0.35);
  }
}
</style>
