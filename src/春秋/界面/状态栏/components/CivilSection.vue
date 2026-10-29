<template>
  <div>
    <div class="sec-title">👥 人口</div>
    <div class="chip-grid">
      <span v-for="(v, k) in 人口" :key="k" class="chip">{{ k }} <b>{{ v }}</b></span>
    </div>

    <div class="sec-title">🌾 资源</div>
    <div class="res-group">
      <div class="res-name">食物</div>
      <div class="chip-grid">
        <span v-for="(v, k) in 食物" :key="k" class="chip">{{ k }} <b>{{ v }}</b></span>
      </div>
    </div>
    <div class="res-group">
      <div class="res-name">武器</div>
      <div class="chip-grid">
        <span v-for="(v, k) in 武器" :key="k" class="chip">{{ k }} <b>{{ v }}</b></span>
      </div>
    </div>
    <div class="res-group">
      <div class="res-name">各种资源</div>
      <div class="chip-grid">
        <span v-for="(v, k) in 各种" :key="k" class="chip">{{ k }} <b>{{ v }}</b></span>
      </div>
    </div>

    <div class="sec-title">🌱 田亩水利</div>
    <div class="kv"><span class="k">垦田</span><span class="v">{{ 田亩.垦田总数 }} 亩（井田 {{ 田亩.井田亩数 }} / 私田 {{ 田亩.私田亩数 }}）</span></div>
    <div class="kv"><span class="k">水利</span><span class="v">{{ 田亩.水利 || '—' }}</span></div>
    <div class="kv"><span class="k">农时</span><span class="v">{{ 田亩.农时 || '—' }}</span></div>
    <div class="kv"><span class="k">收成</span><span class="v">{{ 田亩.收成预期 || '—' }}</span></div>
    <div class="kv"><span class="k">荒情</span><span class="v">{{ 田亩.荒情 || '—' }}</span></div>

    <div class="sec-title">🏗 建筑</div>
    <div v-if="!建筑.length" class="empty">暂无建筑</div>
    <div v-for="(b, name) in 建筑" :key="name" class="row-card">
      <div class="row-head">
        <span class="row-name">{{ name }}</span>
        <span class="row-tag">Lv.{{ b.等级 }} · {{ b.状态 }}</span>
      </div>
      <div class="row-sub">{{ b.位置 }}</div>
      <div class="row-sub">{{ b.功能 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const 人口 = computed(() => Object.entries(store.data.人口));
const 食物 = computed(() => Object.entries(store.data.资源.食物));
const 武器 = computed(() => Object.entries(store.data.资源.武器));
const 各种 = computed(() => Object.entries(store.data.资源.各种));
const 田亩 = computed(() => store.data.田亩);
const 建筑 = computed(() => Object.entries(store.data.建筑));
</script>

<style lang="scss" scoped>
.res-group {
  margin-bottom: 2px;
}

.res-name {
  color: var(--sys-bronze);
  font-size: 12px;
  margin: 3px 0 2px;
}

.row-card {
  background: var(--sys-panel);
  border: 1px solid rgba(205, 155, 90, 0.28);
  border-radius: 8px;
  padding: 6px 10px;
  margin-bottom: 5px;
}

.row-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 8px;
}

.row-name {
  font-weight: 700;
  color: var(--sys-text);
}

.row-tag {
  font-size: 11px;
  color: var(--sys-gold);
  white-space: nowrap;
}

.row-sub {
  color: var(--sys-text-dim);
  font-size: 12px;
  margin-top: 1px;
}
</style>
