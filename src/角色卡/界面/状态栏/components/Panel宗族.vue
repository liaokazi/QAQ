<template>
  <div class="panel-content">
    <!-- 我的本宗 -->
    <div class="clan-box">
      <div class="row">
        <span class="seal">{{ 本宗称号 }}</span>
        <span class="dim small">{{ store.data.宗族.本宗.氏 ? `${store.data.宗族.本宗.氏}氏` : '无氏' }} · 宗庙 Lv.{{ store.data.宗族.本宗.宗庙等级 }}</span>
      </div>
      <div class="dim small genealogy">
        <i class="fa-solid fa-tree"></i>
        族谱：{{ _.keys(store.data.宗族.本宗.族谱).join('、') || '仅你一人' }}
      </div>
    </div>

    <!-- 本土诸宗势力榜 -->
    <div class="sub-title">
      本土宗族 {{ _.size(store.data.宗族.诸宗) }} 支
      <span v-if="其余数量 > 0" class="rest-count">（未展开 {{ 其余数量 }} 支）</span>
    </div>
    <div v-if="_.isEmpty(store.data.宗族.诸宗)" class="empty">暂无本土宗族，招徕流民后自会聚族</div>
    <div v-for="氏 in 展示宗族" :key="氏" class="clan-item">
      <ClanCard :氏="氏" :clan="store.data.宗族.诸宗[氏]" />
    </div>

    <!-- 灭亡宗族 -->
    <CollapsibleMini title="灭亡宗族" :count="_.size(store.data.宗族.灭亡)">
      <div v-if="!_.isEmpty(store.data.宗族.灭亡)" class="sub-list">
        <div v-for="(c, 氏) in store.data.宗族.灭亡" :key="氏" class="list-item column dead-item">
          <span class="dead-name">{{ 氏 }}氏 <span class="dim small">亡因：{{ c.亡因 }}</span></span>
          <span class="dim small">来历：{{ c.来历 }}</span>
          <span class="dim small">始族 {{ c.始族.名 }}：{{ c.始族.介绍 }}</span>
          <span class="dim small">末主 {{ c.末主.名 }}：{{ c.末主.介绍 }}</span>
          <span class="dim small remnant">遗民 {{ c.遗民 }} · 族田 {{ c.族田 }} 亩（可招揽/收田）</span>
        </div>
      </div>
      <div v-else class="empty">尚无灭亡宗族</div>
    </CollapsibleMini>

    <!-- 宗族动态 -->
    <CollapsibleMini title="宗族动态" :count="store.data.宗族.动态.length">
      <div v-if="store.data.宗族.动态.length" class="sub-list">
        <div v-for="(d, i) in store.data.宗族.动态.slice(-5)" :key="i" class="dynamic-item">
          <span class="dyn-dot"></span>
          <span>{{ d }}</span>
        </div>
      </div>
      <div v-else class="empty">近日无事</div>
    </CollapsibleMini>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import ClanCard from './ClanCard.vue';
import CollapsibleMini from './CollapsibleMini.vue';
import { useDataStore } from '../store';

const store = useDataStore();

const 本宗称号 = computed(() => {
  const 等级 = store.data.宗族.本宗.等级;
  return ['无名野人', '得名立户', '受赐氏', '立宗', '著姓大族'][_.clamp(等级, 1, 5) - 1];
});

/** 展示的宗族: 关注置顶 + 实力最强2支 + 最近活跃2支, 去重 */
const 展示宗族 = computed(() => {
  const entries = _.entries(store.data.宗族.诸宗).map(([氏, c]) => ({ 氏, c }));
  const 关注 = entries.filter(e => e.c.是否关注).map(e => e.氏);
  const 按实力 = _.orderBy(entries, e => e.c.实力, 'desc').map(e => e.氏);
  const 活跃 = entries.filter(e => e.c.最近动向).map(e => e.氏);
  const set = new Set([...关注, 按实力[0], 按实力[1], 活跃[0], 活跃[1]].filter(Boolean));
  return [...set].slice(0, 8);
});

const 其余数量 = computed(() => Math.max(0, _.size(store.data.宗族.诸宗) - 展示宗族.value.length));
</script>

<style lang="scss" scoped>
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.clan-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background:
    radial-gradient(130% 100% at 50% 0%, rgba(200, 160, 74, 0.13), transparent 65%),
    rgba(236, 224, 194, 0.04);
  border: 1px solid var(--line-soft);
  border-radius: 11px;
}

.genealogy {
  i {
    color: var(--gold);
    margin-right: 4px;
  }
}

.rest-count {
  font-weight: normal;
  color: var(--text-dim);
  letter-spacing: 0;
}

.clan-item {
  display: contents;
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

.dead-item {
  border-left: 3px solid rgba(200, 85, 61, 0.55);
  background: rgba(200, 85, 61, 0.05);
}

.dead-name {
  color: #e8a48e;
  font-weight: bold;
}

.remnant {
  color: var(--gold-bright);
}

.dynamic-item {
  display: flex;
  gap: 7px;
  align-items: flex-start;
  font-size: 12px;
  color: var(--text-dim);
}

.dyn-dot {
  flex: none;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gold);
  margin-top: 6px;
}
</style>
