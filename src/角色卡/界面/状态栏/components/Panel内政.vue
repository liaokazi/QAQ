<template>
  <div class="panel-content">
    <!-- 领地徽章与沙盘 -->
    <div class="realm">
      <div class="row">
        <span class="seal">{{ 称号 }}</span>
        <span class="dim small">{{ store.data.世界.地点.所在地 }}</span>
      </div>
      <div class="row gains">
        <span v-for="(v, k) in 增益" :key="k" class="gain-chip">⚡{{ k }} +{{ v }}%</span>
      </div>
      <div class="sandbox">
        <div class="sandbox-row">
          <span class="sb-label">封域</span>
          <span class="sb-value">{{ store.data.社稷.领域半径 }} 里</span>
          <span class="sb-label">人口</span>
          <span class="sb-value">{{ store.data.人口.总数 }}</span>
        </div>
        <div class="sandbox-row">
          <span class="sb-label">建筑</span>
          <span class="sb-value">{{ 建筑总数 }}</span>
          <span class="sb-label">垦田</span>
          <span class="sb-value">{{ store.data.田亩.垦田总数 }} 亩</span>
        </div>
      </div>
    </div>

    <!-- 人口 -->
    <CollapsibleMini title="人口" :count="store.data.人口.总数">
      <div class="row pop-row">
        <span class="pop-cell">国人 <b>{{ store.data.人口.国人 }}</b></span>
        <span class="pop-cell">野人 <b>{{ store.data.人口.野人 }}</b></span>
        <span class="pop-cell">奴隶 <b>{{ store.data.人口.奴隶 }}</b></span>
        <span class="pop-cell">流民 <b>{{ store.data.人口.流民 }}</b></span>
        <span class="dim small">劳力 {{ store.data.人口.劳力 }} · 老幼 {{ store.data.人口.老幼 }}</span>
      </div>
      <div class="row">
        <span class="dim small">民心</span>
        <div class="bar">
          <div :style="{ width: `${store.data.人口.民心}%` }"></div>
        </div>
        <span class="dim small">{{ store.data.人口.民心 }}</span>
      </div>
    </CollapsibleMini>

    <!-- 田亩 -->
    <CollapsibleMini title="田亩" :count="store.data.田亩.垦田总数">
      <div class="row dim small">
        <span>井田 {{ store.data.田亩.井田亩数 }}</span>
        <span>私田 {{ store.data.田亩.私田亩数 }}</span>
        <span>水利 {{ store.data.田亩.水利 }}</span>
      </div>
      <div class="dim small">{{ store.data.田亩.农时 }} · 收成：{{ store.data.田亩.收成预期 }}</div>
    </CollapsibleMini>

    <!-- 建筑: 常制 + 特殊 -->
    <CollapsibleMini title="建筑·常制" :count="_.size(store.data.建筑.常制)">
      <div v-if="!_.isEmpty(store.data.建筑.常制)" class="sub-list">
        <div v-for="(b, name) in store.data.建筑.常制" :key="name" class="list-item">
          <span class="bld-name">{{ name }}</span>
          <span class="bld-count">×{{ b.数量 }}</span>
          <span class="bld-level">Lv.{{ b.等级 }}</span>
          <span class="dim small">{{ b.效果 }}</span>
          <template v-if="b.进度 > 0 && b.进度 < 100">
            <div class="bar bronze mini-bar">
              <div :style="{ width: `${b.进度}%` }"></div>
            </div>
            <span class="dim small">{{ b.进度 }}%</span>
          </template>
        </div>
      </div>
      <div v-else class="empty">尚未营造</div>
    </CollapsibleMini>

    <CollapsibleMini title="建筑·特殊（超时代）" :count="_.size(store.data.建筑.特殊)">
      <div v-if="!_.isEmpty(store.data.建筑.特殊)" class="sub-list">
        <div v-for="(b, name) in store.data.建筑.特殊" :key="name" class="list-item special-item">
          <span class="bld-name special-name">{{ name }}</span>
          <span class="bld-count">×{{ b.数量 }}</span>
          <span class="bld-level">Lv.{{ b.等级 }}</span>
          <span class="dim small">{{ b.效果 }}</span>
          <template v-if="b.进度 > 0 && b.进度 < 100">
            <div class="bar bronze mini-bar">
              <div :style="{ width: `${b.进度}%` }"></div>
            </div>
            <span class="dim small">{{ b.进度 }}%</span>
          </template>
        </div>
      </div>
      <div v-else class="empty">后期解锁（发电机、蒸汽机……）</div>
    </CollapsibleMini>

    <!-- 资源 -->
    <CollapsibleMini title="资源 · 公有" :count="资源合计">
      <div class="resource-grid">
        <div v-for="(v, name) in store.data.资源" :key="name" class="resource-cell">
          <span class="resource-name">{{ name }}</span>
          <span class="resource-value">{{ v }}</span>
        </div>
      </div>
    </CollapsibleMini>

    <!-- 法律 -->
    <CollapsibleMini title="法律" :count="_.size(store.data.法律.已颁律令)">
      <div class="row dim small">
        <span>法度：{{ store.data.法律.法度状态 }}</span>
        <span>司法：{{ store.data.法律.司法 }}</span>
      </div>
      <div v-if="!_.isEmpty(store.data.法律.已颁律令)" class="sub-list">
        <div v-for="(l, name) in store.data.法律.已颁律令" :key="name" class="list-item column law-item">
          <span class="law-name">{{ name }} <span class="dim small">—— {{ l.条文 }}</span></span>
          <span class="dim small">效果：{{ l.效果 }}</span>
        </div>
      </div>
      <div v-else class="empty">尚未颁律</div>
    </CollapsibleMini>

    <!-- 天下大事 -->
    <div class="news">
      <div class="sub-title">天下大事</div>
      <div v-if="store.data.情报.天下大事.头条" class="news-headline">
        <span class="news-icon">📜</span>
        <span>{{ store.data.情报.天下大事.头条 }}</span>
      </div>
      <div v-if="本土宗族活跃.length" class="sub-list">
        <div v-for="(n, i) in 本土宗族活跃" :key="i" class="news-local">
          <span class="news-icon">🏘</span>
          <span>{{ n }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import CollapsibleMini from './CollapsibleMini.vue';
import { useDataStore, 按等级取表, 按等级取增益 } from '../store';

const store = useDataStore();

const 称号 = computed(() => 按等级取表(store.data.社稷.领地等级).称号);
const 增益 = computed(() => 按等级取增益(store.data.社稷.领地等级));
const 建筑总数 = computed(() => _.size(store.data.建筑.常制) + _.size(store.data.建筑.特殊));
const 资源合计 = computed(() => _.sum(_.values(store.data.资源)));
const 本土宗族活跃 = computed(() => store.data.情报.天下大事.本土宗族活跃 ?? []);
</script>

<style lang="scss" scoped>
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.realm {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 10px;
  background:
    radial-gradient(130% 100% at 50% 0%, rgba(200, 160, 74, 0.13), transparent 65%),
    rgba(236, 224, 194, 0.04);
  border: 1px solid var(--line-soft);
  border-radius: 11px;
}

.gains {
  gap: 5px;
}

.gain-chip {
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 20px;
  color: var(--jade);
  border: 1px solid rgba(127, 209, 168, 0.3);
  background: rgba(127, 209, 168, 0.07);
}

.sandbox {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 7px 9px;
  border: 1px solid var(--line-soft);
  border-radius: 9px;
  background-image:
    linear-gradient(rgba(200, 160, 74, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200, 160, 74, 0.07) 1px, transparent 1px);
  background-size: 22px 22px;
}

.sandbox-row {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
}

.sb-label {
  color: var(--text-dim);
  font-size: 11.5px;
  letter-spacing: 1px;
}

.sb-value {
  color: var(--gold-bright);
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  margin-right: 8px;
}

.pop-row {
  gap: 8px;
}

.pop-cell {
  font-size: 12px;
  color: var(--text-dim);

  b {
    color: var(--parchment);
    font-variant-numeric: tabular-nums;
  }
}

.bar {
  flex: 1;
  min-width: 60px;
}

.mini-bar {
  min-width: 40px;
  flex: none;
  width: 56px;
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

.bld-name {
  font-weight: bold;
  color: var(--parchment);
}

.bld-count {
  color: var(--jade);
  font-weight: bold;
  font-size: 12px;
}

.bld-level {
  font-size: 11px;
  color: var(--gold-bright);
  border: 1px solid var(--line-soft);
  border-radius: 3px;
  padding: 0 5px;
}

.special-item {
  border-color: rgba(200, 85, 61, 0.35);
  background: rgba(200, 85, 61, 0.06);
}

.special-name {
  color: #e8a48e;
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
  background: linear-gradient(180deg, rgba(236, 224, 194, 0.07), rgba(236, 224, 194, 0.03));
  border: 1px solid var(--line-soft);
  border-top: 2px solid rgba(200, 160, 74, 0.45);
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
  color: var(--gold-bright);
  font-variant-numeric: tabular-nums;
}

.law-item {
  border-left: 3px solid rgba(200, 85, 61, 0.5);
}

.law-name {
  color: var(--gold-bright);
  font-weight: bold;
}

.news {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 9px 10px;
  background:
    radial-gradient(120% 100% at 0% 0%, rgba(127, 209, 168, 0.1), transparent 55%),
    rgba(127, 209, 168, 0.04);
  border: 1px solid rgba(127, 209, 168, 0.22);
  border-radius: 10px;
}

.news-headline {
  display: flex;
  gap: 7px;
  align-items: flex-start;
  font-size: 12.5px;
  color: var(--parchment);
}

.news-local {
  display: flex;
  gap: 7px;
  align-items: flex-start;
  font-size: 12px;
  padding: 5px 8px;
  background: rgba(236, 224, 194, 0.05);
  border: 1px dashed var(--line-soft);
  border-radius: 7px;
}

.news-icon {
  flex: none;
}
</style>
