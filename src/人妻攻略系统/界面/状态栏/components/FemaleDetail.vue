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
        <div class="private-name">
          <span class="part-dot" :style="{ background: 部位色[partName] || '#ff5fa2' }"></span>{{ partName }}
        </div>
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

    <div class="preg">
      <button class="preg-head" type="button" @click="preg_open = !preg_open">
        <span class="preg-title">🤰 怀孕系统</span>
        <span class="preg-summary">{{ 怀孕摘要 }}</span>
        <span class="chevron" :class="{ open: preg_open }">▾</span>
      </button>
      <div v-show="preg_open" class="preg-body">
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
const 部位色: Record<string, string> = { 奶子: '#ff5fa2', 阴毛: '#5fd7a0', 小穴: '#ff2d78', 肛门: '#b56cff' };

const preg_open = ref(false);
const 怀孕摘要 = computed(() => {
  const p = props.woman.怀孕;
  const 孕周 = p.怀孕状态.孕周 > 0 ? `孕${p.怀孕状态.孕周}周` : '未孕';
  return `${p.子宫.标注 || '—'} · ${孕周} · 内射${p.内射次数}次`;
});
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 6px;
}

.private-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.private-card {
  background: rgba(255, 45, 120, 0.06);
  border: 1px solid rgba(255, 95, 162, 0.25);
  border-radius: 8px;
  padding: 5px 7px;
}

.private-name {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--sys-pink);
  font-size: 13px;
  margin-bottom: 3px;
}

.part-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
}

.private-row {
  display: flex;
  gap: 8px;
  font-size: 13px;
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
  font-size: 12px;
}

.preg {
  margin-top: 6px;
  border: 1px solid rgba(181, 108, 255, 0.35);
  border-radius: 10px;
  background: rgba(181, 108, 255, 0.05);
  overflow: hidden;
}

.preg-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: transparent;
  border: none;
  color: var(--sys-lilac);
  font-family: inherit;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  text-align: left;
}

.preg-title {
  white-space: nowrap;
}

.preg-summary {
  flex: 1;
  color: var(--sys-text-dim);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron {
  color: var(--sys-lilac);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.chevron.open {
  transform: rotate(180deg);
}

.preg-body {
  padding: 6px 10px 8px;
  border-top: 1px dashed rgba(181, 108, 255, 0.3);
}
</style>
