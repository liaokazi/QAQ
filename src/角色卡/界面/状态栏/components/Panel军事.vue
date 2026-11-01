<template>
  <div class="panel-content">
    <!-- 军力总览 -->
    <div class="military-box">
      <div class="row">
        <span class="seal">{{ 军势称号 }}</span>
        <span class="total-army">总兵力 {{ 总兵力 }} 人</span>
      </div>
      <div class="row dim small">
        <span>{{ 战车 }} 乘</span>
        <span class="dot">·</span>
        <span>甲士 {{ store.data.军事.甲士 }}</span>
        <span class="dot">·</span>
        <span>徒兵 {{ store.data.军事.徒兵 }}</span>
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
      </div>
    </div>

    <!-- 军备资源 -->
    <CollapsibleMini title="军备资源" :count="_.size(store.data.军事.资源)">
      <div v-if="!_.isEmpty(store.data.军事.资源)" class="resource-grid">
        <div v-for="(v, name) in store.data.军事.资源" :key="name" class="resource-cell">
          <span class="resource-name">{{ name }}</span>
          <span class="resource-value">{{ v }}</span>
        </div>
      </div>
      <div v-else class="empty">暂无军备，戈矛弓甲皆缺</div>
    </CollapsibleMini>

    <!-- 将领 -->
    <CollapsibleMini title="将领" :count="_.size(store.data.军事.将领)">
      <div v-if="!_.isEmpty(store.data.军事.将领)" class="sub-list">
        <div v-for="(g, name) in store.data.军事.将领" :key="name" class="list-item column">
          <div class="row">
            <span class="general-name">{{ name }}</span>
            <span class="dim small">{{ g.性别 }} · {{ g.年龄 }}岁</span>
            <span class="dim small">{{ g.专长 }}</span>
          </div>
          <div class="row dim small">
            <span class="loyalty">忠心 {{ g.忠心 }}</span>
            <span class="command">统兵 {{ g.统兵 }} 人</span>
          </div>
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
const 总兵力 = computed(() => store.data.军事.甲士 + store.data.军事.徒兵);
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

.total-army {
  margin-left: auto;
  font-size: 14px;
  font-weight: bold;
  color: var(--parchment);
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
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

.resource-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.resource-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 7px 2px 6px;
  background: linear-gradient(180deg, rgba(200, 85, 61, 0.1), rgba(200, 85, 61, 0.03));
  border: 1px solid rgba(200, 85, 61, 0.25);
  border-top: 2px solid rgba(200, 85, 61, 0.5);
  border-radius: 7px;
}

.resource-name {
  font-size: 11px;
  color: var(--text-dim);
  letter-spacing: 1px;
}

.resource-value {
  font-size: 15px;
  font-weight: bold;
  color: #e8a48e;
  font-variant-numeric: tabular-nums;
}

.sub-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.column {
  flex-direction: column;
  align-items: flex-start;
}

.general-name {
  font-weight: bold;
  color: var(--gold-bright);
}

.loyalty {
  color: var(--jade);
}

.command {
  margin-left: auto;
  color: var(--gold-bright);
}
</style>
