<template>
  <div class="panel-content">
    <!-- 军力总览 -->
    <div class="military-box">
      <div class="row">
        <span class="seal">{{ 军势称号 }}</span>
        <span class="dim small">{{ 战车 }} 乘 · 甲士 {{ store.data.军事.甲士 }} · 徒兵 {{ store.data.军事.徒兵 }}</span>
      </div>
      <div class="chariots">
        <template v-if="store.data.军事.战车 > 0">
          <i v-for="i in Math.min(store.data.军事.战车, 50)" :key="i" class="fa-solid fa-chess-rook chariot"></i>
          <span v-if="store.data.军事.战车 > 50" class="dim small">…共 {{ store.data.军事.战车 }} 乘</span>
        </template>
        <span v-else class="empty">无兵无车</span>
      </div>
      <div class="row dim small military-meta">
        <span>训练度 {{ store.data.军事.训练度 }}</span>
        <span class="dot">·</span>
        <span>士气 {{ store.data.军事.士气 }}</span>
        <span class="dot">·</span>
        <span>军粮 {{ store.data.军事.军粮 }}</span>
      </div>
    </div>

    <!-- 将领 -->
    <CollapsibleMini title="将领" :count="_.size(store.data.军事.将领)">
      <div v-if="!_.isEmpty(store.data.军事.将领)" class="sub-list">
        <div v-for="(g, name) in store.data.军事.将领" :key="name" class="list-item">
          <span class="general-name">{{ name }}</span>
          <span class="dim small">{{ g.专长 }}</span>
          <span class="loyalty">忠心 {{ g.忠心 }}</span>
        </div>
      </div>
      <div v-else class="empty">尚无将领，可从宗族俊才或流民中招揽</div>
    </CollapsibleMini>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import CollapsibleMini from './CollapsibleMini.vue';
import { useDataStore } from '../store';

const store = useDataStore();

const 战车 = computed(() => store.data.军事.战车);
const 军势称号 = computed(() => {
  const n = store.data.军事.战车;
  if (n >= 10000) return '万乘之主';
  if (n >= 1000) return '千乘之国';
  if (n >= 100) return '百乘之家';
  if (n >= 10) return '十乘之家';
  return '无兵之民';
});
</script>

<style lang="scss" scoped>
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.military-box {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px;
  background:
    radial-gradient(130% 100% at 50% 0%, rgba(200, 85, 61, 0.12), transparent 65%),
    rgba(236, 224, 194, 0.04);
  border: 1px solid var(--line-soft);
  border-radius: 11px;
}

.chariots {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  padding: 7px 9px;
  border: 1px dashed rgba(200, 160, 74, 0.3);
  border-radius: 9px;
  background: rgba(0, 0, 0, 0.2);
}

.chariot {
  color: var(--gold);
  font-size: 15px;
  filter: drop-shadow(0 0 4px rgba(200, 160, 74, 0.5));
}

.military-meta {
  color: var(--text-dim);

  .dot {
    color: var(--gold-deep);
  }
}

.sub-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.general-name {
  font-weight: bold;
  color: var(--gold-bright);
}

.loyalty {
  margin-left: auto;
  font-size: 11.5px;
  color: var(--jade);
}
</style>
