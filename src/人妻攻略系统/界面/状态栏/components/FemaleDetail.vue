<template>
  <div class="detail">
    <div class="kv-grid">
      <div class="kv">
        <span class="k">生日</span>
        <span class="v">{{ woman.生日 || '—' }}</span>
      </div>
      <div class="kv">
        <span class="k">{{ partnerLabel }}</span>
        <span class="v">{{ partnerValue || '—' }}</span>
      </div>
      <div class="kv wide">
        <span class="k">详细当前面貌</span>
        <span class="v">{{ woman.详细当前面貌 || '—' }}</span>
      </div>
      <div class="kv wide">
        <span class="k">详细性格</span>
        <span class="v">{{ woman.详细性格 || '—' }}</span>
      </div>
    </div>

    <div class="status-banner">
      <span class="status-label">⚡ 当前状态</span>
      <span class="status-value">{{ woman.当前状态 || '—' }}</span>
    </div>

    <div class="sec-title">👗 穿着</div>
    <div class="kv-grid">
      <div v-for="(val, slot) in woman.穿着" :key="slot" class="kv">
        <span class="k">{{ slot }}</span>
        <span class="v">{{ val || '—' }}</span>
      </div>
    </div>

    <div class="sec-title">💕 私密</div>
    <div class="private-list">
      <div v-for="(part, partName) in woman.私密" :key="partName" class="private-card">
        <div class="private-name">{{ partName }}</div>
        <div class="private-row">
          <span class="private-k">形状</span>
          <span class="private-v">{{ part.形状 || '—' }}</span>
        </div>
        <div class="private-row">
          <span class="private-k">状态</span>
          <span class="private-v">{{ part.当前状态 || '—' }}</span>
        </div>
      </div>
    </div>

    <div class="sec-title">🤰 怀孕系统</div>
    <div class="kv-grid">
      <div class="kv wide">
        <span class="k">子宫</span>
        <span class="v">
          {{ woman.怀孕.子宫.状态 || '—' }}
          <span v-if="woman.怀孕.子宫.标注" class="tag">{{ woman.怀孕.子宫.标注 }}</span>
        </span>
      </div>
      <div class="kv">
        <span class="k">内射次数</span>
        <span class="v">{{ woman.怀孕.内射次数 }} 次</span>
      </div>
      <div class="kv wide">
        <span class="k">子女血脉</span>
        <span class="v">
          <span v-for="child in woman.怀孕.子女血脉" :key="child.姓名" class="chip child-chip">
            {{ child.姓名 }}（{{ child.年龄 }}岁 · 父：{{ child.亲生父亲 }}）
          </span>
          <span v-if="!woman.怀孕.子女血脉.length">暂无子女</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { 女性资料 } from '../../../schema';

const props = defineProps<{
  kind: '人妻' | '女性朋友';
  name: string;
  woman: 女性资料;
}>();

const partnerLabel = computed(() => (props.kind === '人妻' ? '丈夫' : '男朋友'));
const partnerValue = computed(() => (props.kind === '人妻' ? props.woman.丈夫名字 : props.woman.男朋友));
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 10px;
}

.status-banner {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 8px;
  padding: 8px 10px;
  background: linear-gradient(90deg, rgba(255, 45, 120, 0.18), rgba(181, 108, 255, 0.12));
  border: 1px solid rgba(255, 95, 162, 0.45);
  border-radius: 8px;
}

.status-label {
  font-weight: 700;
  color: var(--sys-pink);
  white-space: nowrap;
}

.status-value {
  color: var(--sys-text);
  font-size: 12px;
  word-break: break-word;
}

.private-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.private-card {
  background: rgba(255, 45, 120, 0.06);
  border: 1px solid rgba(255, 95, 162, 0.25);
  border-radius: 8px;
  padding: 6px 8px;
}

.private-name {
  font-weight: 700;
  color: var(--sys-pink);
  font-size: 12px;
  margin-bottom: 4px;
}

.private-row {
  display: flex;
  gap: 8px;
  font-size: 12px;
  line-height: 1.6;
}

.private-k {
  flex-shrink: 0;
  color: var(--sys-text-dim);
  min-width: 2.5em;
}

.private-v {
  color: var(--sys-text);
  word-break: break-word;
}

.child-chip {
  margin: 1px 2px 1px 0;
  line-height: 1.8;
}
</style>
