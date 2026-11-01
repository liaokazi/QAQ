<template>
  <div class="panel-content">
    <!-- 领地徽章与封域风貌 -->
    <div class="realm">
      <div class="row">
        <span class="seal">{{ 称号 }}</span>
        <span class="dim small">{{ store.data.世界.地点.所在地 }}</span>
      </div>
      <div class="row gains">
        <span v-for="(v, k) in 增益" :key="k" class="gain-chip">⚡{{ k }} +{{ v }}%</span>
      </div>
      <div class="realm-stats">
        <span class="rs">封域 <b>{{ store.data.社稷.领域半径 }} 里</b></span>
        <span class="rs">人口 <b>{{ store.data.人口.总数 }}</b></span>
        <span class="rs">建筑 <b>{{ 建筑总数 }}</b></span>
        <span class="rs">垦田 <b>{{ store.data.田亩.垦田总数 }} 亩</b></span>
      </div>
      <div class="scenery">{{ store.data.社稷.封域风貌 }}</div>
    </div>

    <!-- 人口 -->
    <CollapsibleMini title="人口" :count="store.data.人口.总数">
      <div class="row pop-row">
        <span class="pop-cell">国人 <b>{{ store.data.人口.国人 }}</b></span>
        <span class="pop-cell">野人 <b>{{ store.data.人口.野人 }}</b></span>
        <span class="pop-cell">奴隶 <b>{{ store.data.人口.奴隶 }}</b></span>
        <span class="pop-cell">流民 <b>{{ store.data.人口.流民 }}</b></span>
      </div>
      <div class="row pop-row">
        <span class="pop-cell">劳力 <b>{{ store.data.人口.劳力 }}</b></span>
        <span class="pop-cell">老 <b>{{ store.data.人口.老 }}</b></span>
        <span class="pop-cell">幼 <b>{{ store.data.人口.幼 }}</b></span>
        <span class="pop-cell">女 <b>{{ store.data.人口.女 }}</b></span>
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

    <!-- 资源: 粮食固定 + 其他动态 -->
    <CollapsibleMini title="资源 · 公有" :count="资源种类数">
      <div class="grain-cell" :class="{ famine: 粮食 <= 0 }">
        <span class="grain-name">🌾 粮食</span>
        <span class="grain-value">{{ 格式石(粮食) }}</span>
        <span class="grain-days" :class="{ famine: 粮食 <= 0 }">{{ 可吃天数 }}</span>
      </div>
      <div v-if="其他资源.length" class="resource-grid">
        <div v-for="([name, v]) in 其他资源" :key="name" class="resource-cell">
          <span class="resource-name">{{ name }}</span>
          <span class="resource-value">{{ v }}</span>
        </div>
      </div>
      <div v-else class="empty">暂无其他公物</div>
    </CollapsibleMini>

    <!-- 文官 -->
    <CollapsibleMini title="文官" :count="_.size(store.data.文官)">
      <div v-if="!_.isEmpty(store.data.文官)" class="sub-list">
        <div v-for="(o, name) in store.data.文官" :key="name" class="list-item column">
          <div class="row">
            <span class="official-name">{{ name }}</span>
            <span class="dim small">{{ o.性别 }} · {{ o.年龄 }}岁</span>
            <span class="duty">{{ o.职掌 }}</span>
          </div>
          <div class="row dim small">
            <span>才能 {{ o.才能 }}</span>
            <span>忠心 {{ o.忠心 }}</span>
          </div>
        </div>
      </div>
      <div v-else class="empty">尚无文官，可从流民士人中举荐</div>
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
const 本土宗族活跃 = computed(() => store.data.情报.天下大事.本土宗族活跃 ?? []);

const 资源列表 = computed(() => _.entries(store.data.资源));
const 粮食 = computed(() => _.get(store.data.资源, '粮食', 0));
const 其他资源 = computed(() => 资源列表.value.filter(([name]) => name !== '粮食'));
const 资源种类数 = computed(() => 资源列表.value.length);

const 格式石 = (n: number) => {
  if (!n) return '0石';
  return n >= 10000 ? `${(n / 10000).toFixed(1)}万石` : `${Math.round(n)}石`;
};

const 可吃天数 = computed(() => {
  const 人口 = store.data.人口.总数;
  if (!人口) return '—';
  if (粮食.value <= 0) return '断粮！';
  const 天数 = Math.floor(粮食.value / (人口 * 0.05));
  return `可吃 ${天数} 日`;
});
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

.realm-stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 5px 9px;
  border: 1px solid var(--line-soft);
  border-radius: 9px;
  background-image:
    linear-gradient(rgba(200, 160, 74, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(200, 160, 74, 0.07) 1px, transparent 1px);
  background-size: 22px 22px;
}

.rs {
  color: var(--text-dim);
  font-size: 11.5px;
  letter-spacing: 1px;

  b {
    color: var(--gold-bright);
    font-variant-numeric: tabular-nums;
  }
}

.scenery {
  padding: 7px 9px;
  font-size: 12.5px;
  line-height: 1.65;
  color: var(--parchment);
  opacity: 0.92;
  border-left: 3px solid var(--gold);
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.18);
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

.grain-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: linear-gradient(90deg, rgba(127, 209, 168, 0.1), rgba(127, 209, 168, 0.03));
  border: 1px solid rgba(127, 209, 168, 0.28);
  border-radius: 8px;

  &.famine {
    background: linear-gradient(90deg, rgba(224, 138, 122, 0.12), rgba(224, 138, 122, 0.03));
    border-color: rgba(224, 138, 122, 0.4);
  }
}

.grain-name {
  font-weight: bold;
  color: var(--gold-bright);
}

.grain-value {
  font-size: 15px;
  font-weight: bold;
  color: var(--parchment);
  font-variant-numeric: tabular-nums;
}

.grain-days {
  margin-left: auto;
  color: var(--jade);
  font-size: 12px;
  font-weight: bold;

  &.famine {
    color: var(--danger);
  }
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-top: 6px;
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

.official-name {
  font-weight: bold;
  color: var(--parchment);
}

.duty {
  font-size: 11.5px;
  color: var(--gold-bright);
  background: rgba(200, 160, 74, 0.09);
  border: 1px solid var(--line-soft);
  border-radius: 4px;
  padding: 0 6px;
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
