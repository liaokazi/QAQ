<template>
  <div class="top-panel">
    <div class="top-head">
      <span class="top-title">社 稷</span>
      <span class="top-sub">春秋 · 前545年</span>
    </div>

    <div class="world-row">
      <span class="loc">📍 {{ 大区 }} · {{ 小区 }} · {{ 所在地 }}</span>
    </div>
    <div class="world-row">
      <span class="cell">🗓 {{ 纪年 }}</span>
      <span class="cell">🍂 {{ 季节 }}·{{ 节气 }}</span>
      <span class="cell">🌤 {{ 天气 }}</span>
    </div>

    <div v-if="当前事件 || 灾异预警" class="event-row">
      <span v-if="当前事件">⚡ {{ 当前事件 }}</span>
      <span v-if="灾异预警" class="warn">⚠️ {{ 灾异预警 }}</span>
    </div>

    <div class="hero-row">
      <div class="hero-id">
        <span class="hero-name">{{ 主角.姓名 || '—' }}</span>
        <span class="hero-rank">{{ 主角.身份 }}</span>
      </div>
      <div class="hero-stat">
        <div class="hero-line">状态：{{ 主角.当前状态 || '—' }}</div>
        <div class="hero-line">姿势：{{ 主角.当前姿势 || '—' }}</div>
        <div v-if="主角.衣着" class="hero-line dim">衣着：{{ 主角.衣着 }}</div>
      </div>
    </div>

    <div class="sheji-row">
      <span class="lv">Lv.{{ 社稷.领地等级 }}</span>
      <span class="r">半径 {{ 社稷.领地半径 }} 里</span>
      <span class="pts">🪙 {{ 社稷.点数 }}</span>
      <span class="zone" :class="{ out: 社稷.域内外 !== '域内' }">{{ 社稷.域内外 }}</span>
      <span v-if="社稷.外出剩余" class="timelimit">⏳ {{ 社稷.外出剩余 }}</span>
    </div>
    <div class="xp-wrap">
      <div class="xp-bar">
        <div class="xp-fill" :style="{ width: 经验百分比 + '%' }"></div>
      </div>
      <span class="xp-text">功业 {{ 社稷.经验值 }} / {{ 社稷.升级所需 }}</span>
    </div>

    <div class="xianer">
      <div class="xianer-head">
        <span class="xianer-avatar">🧚</span>
        <span class="xianer-name">器灵 · 仙儿</span>
      </div>
      <div class="xianer-bubble">{{ store.data.仙儿.吐槽 || '（仙儿正在暗中观察……）' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const 世界 = computed(() => store.data.世界);
const 主角 = computed(() => store.data.主角);
const 社稷 = computed(() => store.data.社稷);

const 大区 = computed(() => 世界.value.地点.大区);
const 小区 = computed(() => 世界.value.地点.小区);
const 所在地 = computed(() => 世界.value.地点.所在地);
const 纪年 = computed(() => 世界.value.纪年);
const 季节 = computed(() => 世界.value.季节);
const 节气 = computed(() => 世界.value.节气);
const 天气 = computed(() => 世界.value.天气);
const 当前事件 = computed(() => 世界.value.当前事件);
const 灾异预警 = computed(() => 世界.value.灾异预警);

const 经验百分比 = computed(() => {
  const need = 社稷.value.升级所需;
  if (!need) return 0;
  return Math.min(100, Math.max(0, (社稷.value.经验值 / need) * 100));
});
</script>

<style lang="scss" scoped>
.top-panel {
  padding: 10px 14px;
  background: linear-gradient(160deg, rgba(205, 155, 90, 0.16), rgba(20, 16, 9, 0.2));
  border-bottom: 1px solid var(--sys-border);
}

.top-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
}

.top-title {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 6px;
  color: var(--sys-gold);
  text-shadow: 0 0 12px rgba(230, 192, 122, 0.6);
}

.top-sub {
  font-size: 11px;
  color: var(--sys-text-dim);
  letter-spacing: 2px;
}

.world-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 12px;
  margin-bottom: 3px;
  font-size: 13px;
}

.loc {
  font-weight: 700;
  color: var(--sys-text);
}

.cell {
  color: var(--sys-text);
  white-space: nowrap;
}

.event-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 4px 0;
  padding: 5px 8px;
  background: rgba(200, 90, 63, 0.14);
  border: 1px solid rgba(200, 90, 63, 0.45);
  border-radius: 8px;
  font-size: 12px;
}

.warn {
  color: #e4936a;
  font-weight: 700;
}

.hero-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 6px 0;
  padding: 8px 10px;
  background: var(--sys-panel);
  border: 1px solid rgba(205, 155, 90, 0.3);
  border-radius: 10px;
}

.hero-id {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.hero-name {
  font-size: 16px;
  font-weight: 800;
  color: var(--sys-text);
}

.hero-rank {
  font-size: 11px;
  color: #2a1c08;
  background: var(--sys-bronze);
  padding: 1px 8px;
  border-radius: 999px;
  font-weight: 700;
}

.hero-stat {
  font-size: 12px;
  color: var(--sys-text);
}

.hero-line {
  line-height: 1.6;
}

.hero-line.dim {
  color: var(--sys-text-dim);
}

.sheji-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 10px;
  font-size: 13px;
  font-weight: 700;
}

.lv {
  color: var(--sys-gold);
  font-weight: 800;
}

.r {
  color: var(--sys-text);
}

.pts {
  color: var(--sys-gold);
  font-weight: 800;
}

.zone {
  color: var(--sys-green);
}

.zone.out {
  color: var(--sys-cinnabar);
}

.timelimit {
  color: var(--sys-cinnabar);
  font-weight: 800;
}

.xp-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.xp-bar {
  flex: 1;
  height: 8px;
  background: rgba(20, 16, 9, 0.7);
  border: 1px solid rgba(205, 155, 90, 0.4);
  border-radius: 999px;
  overflow: hidden;
}

.xp-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sys-bronze), var(--sys-gold));
  box-shadow: 0 0 8px rgba(230, 192, 122, 0.6);
  transition: width 0.3s;
}

.xp-text {
  font-size: 11px;
  color: var(--sys-text-dim);
  white-space: nowrap;
}

.xianer {
  margin-top: 8px;
  border-top: 1px dashed rgba(205, 155, 90, 0.35);
  padding-top: 8px;
}

.xianer-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 5px;
}

.xianer-avatar {
  font-size: 15px;
}

.xianer-name {
  font-weight: 700;
  color: var(--sys-bronze);
  font-size: 12px;
}

.xianer-bubble {
  position: relative;
  background: var(--sys-panel);
  border: 1px solid rgba(205, 155, 90, 0.35);
  border-radius: 4px 12px 12px 12px;
  padding: 8px 10px;
  color: var(--sys-text);
  font-size: 13px;
  line-height: 1.6;
  word-break: break-word;
}

.xianer-bubble::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 14px;
  border-style: solid;
  border-width: 6px 8px 6px 0;
  border-color: transparent var(--sys-panel) transparent transparent;
  filter: drop-shadow(-1px 0 0 rgba(205, 155, 90, 0.35));
}
</style>