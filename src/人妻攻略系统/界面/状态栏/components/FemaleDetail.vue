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

    <div class="status-banner">
      <span class="status-label">🧎 当前姿势</span>
      <span class="status-value">{{ woman.当前姿势 || '—' }}</span>
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
      <div class="kv wide">
        <span class="k">生理周期</span>
        <span class="v">
          {{ woman.怀孕.生理周期.周期 || '—' }}
          <span v-if="woman.怀孕.生理周期.说明" class="cycle-note">（{{ woman.怀孕.生理周期.说明 }}）</span>
        </span>
      </div>
      <div class="kv">
        <span class="k">孕周</span>
        <span class="v">{{ woman.怀孕.怀孕状态.孕周 > 0 ? `${woman.怀孕.怀孕状态.孕周} 周` : '未孕' }}</span>
      </div>
      <div class="kv">
        <span class="k">胎儿健康</span>
        <span class="v">{{ woman.怀孕.怀孕状态.胎儿健康 || '—' }}</span>
      </div>
      <div class="kv">
        <span class="k">生父</span>
        <span class="v">{{ woman.怀孕.怀孕状态.生父 || '—' }}</span>
      </div>
      <div class="kv wide">
        <span class="k">产后恢复</span>
        <span class="v">泌乳：{{ woman.怀孕.产后恢复.泌乳 || '—' }}｜产道：{{ woman.怀孕.产后恢复.产道恢复度 || '—' }}</span>
      </div>
      <div class="kv wide">
        <span class="k">精液残留</span>
        <span v-if="woman.怀孕.精液残留.最近内射者 && woman.怀孕.精液残留.最近内射者 !== '无'" class="v">
          {{ woman.怀孕.精液残留.最近内射者 }}（{{ woman.怀孕.精液残留.距上次内射时间 || '—' }}）· {{ woman.怀孕.精液残留.残留位置 || '—' }} · {{ woman.怀孕.精液残留.残留量 || '—' }}
        </span>
        <span v-else class="v">无残留</span>
      </div>
      <div class="kv wide">
        <span class="k">{{ 愧疚Label }}</span>
        <span class="v">{{ woman.怀孕.NTR心理.对丈夫的愧疚 || '—' }}</span>
      </div>
      <div class="kv wide">
        <span class="k">对主角的沉沦</span>
        <span class="v">{{ woman.怀孕.NTR心理.对主角的沉沦 || '—' }}</span>
      </div>
      <div class="kv wide">
        <span class="k">内心挣扎</span>
        <span class="v">{{ woman.怀孕.NTR心理.内心挣扎 || '—' }}</span>
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
const 愧疚Label = computed(() => (props.kind === '人妻' ? '对丈夫的愧疚' : '对男友的愧疚'));
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

.cycle-note {
  color: var(--sys-text-dim);
  font-size: 11px;
}
</style>
