<template>
  <div>
    <div class="sec-title">🎒 随身物品</div>
    <div v-if="随身物品为空" class="empty">背包空空如也</div>
    <div v-for="(item, name) in store.data.背包.随身物品" :key="name" class="item-row">
      <span class="item-name">{{ name }}</span>
      <span class="item-desc">{{ item.描述 }}</span>
      <span class="item-count">x{{ item.数量 }}</span>
    </div>

    <div class="trophy">
      <button class="trophy-head" type="button" @click="trophy_open = !trophy_open">
        <span>💋 女性战利品</span>
        <span class="trophy-count">{{ 女性战利品数量 }}</span>
        <span class="chevron" :class="{ open: trophy_open }">▾</span>
      </button>
      <div v-show="trophy_open" class="trophy-body">
        <div v-if="女性战利品为空" class="empty">暂无战利品，去收集女性的内衣内裤吧</div>
        <div v-for="(t, name) in store.data.背包.女性战利品" :key="name" class="trophy-row">
          <div class="trophy-name">🎀 {{ name }}</div>
          <div class="trophy-desc">{{ t.描述 }}</div>
          <div class="trophy-meta">
            <div class="meta-line">👤 原主人：{{ t.谁的 || '未知' }}</div>
            <div class="meta-line">💦 当前状态：{{ t.当前状态 || '—' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const trophy_open = ref(false);
const 随身物品为空 = computed(() => _.isEmpty(store.data.背包.随身物品));
const 女性战利品为空 = computed(() => _.isEmpty(store.data.背包.女性战利品));
const 女性战利品数量 = computed(() => _.keys(store.data.背包.女性战利品).length);
</script>

<style lang="scss" scoped>
.item-row {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--sys-panel);
  border: 1px solid rgba(181, 108, 255, 0.25);
  border-radius: 8px;
  padding: 6px 8px;
  margin-bottom: 4px;
}

.item-name {
  font-weight: 700;
  color: var(--sys-lilac);
  white-space: nowrap;
}

.item-desc {
  flex: 1;
  color: var(--sys-text-dim);
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-count {
  background: var(--sys-panel-2);
  color: var(--sys-gold);
  border: 1px solid rgba(255, 201, 77, 0.4);
  padding: 0 6px;
  border-radius: 4px;
  font-size: 11px;
  white-space: nowrap;
}

.trophy {
  margin-top: 6px;
  border: 1px solid rgba(255, 45, 120, 0.35);
  border-radius: 10px;
  background: rgba(255, 45, 120, 0.05);
}

.trophy-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  background: transparent;
  border: none;
  color: var(--sys-pink);
  font-family: inherit;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
}

.trophy-head span:first-child {
  flex: 1;
  text-align: left;
}

.trophy-count {
  background: var(--sys-pink-deep);
  color: #fff;
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 999px;
}

.chevron {
  color: var(--sys-pink);
  transition: transform 0.2s;
}

.chevron.open {
  transform: rotate(180deg);
}

.trophy-body {
  padding: 0 10px 10px;
  border-top: 1px dashed rgba(255, 45, 120, 0.3);
}

.trophy-row {
  padding: 6px 0;
  border-bottom: 1px solid rgba(181, 108, 255, 0.15);
}

.trophy-row:last-child {
  border-bottom: none;
}

.trophy-name {
  font-weight: 700;
  color: var(--sys-pink);
  font-size: 12px;
}

.trophy-desc {
  color: var(--sys-text);
  font-size: 12px;
  margin-top: 2px;
  word-break: break-word;
}

.trophy-meta {
  color: var(--sys-text-dim);
  font-size: 11px;
  margin-top: 4px;
}

.meta-line {
  line-height: 1.7;
}
</style>
