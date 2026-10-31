<template>
  <div class="panel-content">
    <!-- 基本属性 -->
    <div class="identity">
      <div class="row">
        <span class="name">{{ store.data.主角.姓名 }}</span>
        <span class="age dim">{{ store.data.主角.年龄 }}岁</span>
        <span class="id-tag">{{ store.data.主角.身份 }}</span>
      </div>
      <div class="dim small state">{{ store.data.主角.当前状态 }}</div>
      <div class="dim small">衣物装备：{{ store.data.主角.衣着 }}</div>
    </div>

    <!-- 等级与经验 -->
    <div class="level-box">
      <div class="row">
        <span class="seal">Lv.{{ store.data.社稷.领地等级 }} {{ 称号 }}</span>
        <span class="tag">结界 {{ store.data.社稷.领域半径 }} 里</span>
        <span class="points"><i class="fa-solid fa-coins"></i>{{ store.data.社稷.点数 }}</span>
      </div>
      <div class="row">
        <span class="dim small exp-label">经验</span>
        <div class="bar bronze exp">
          <div :style="{ width: 经验百分比 }"></div>
        </div>
        <span class="dim small exp-num">{{ store.data.社稷.经验 }}/{{ store.data.社稷.升级所需 }}</span>
      </div>
    </div>

    <!-- 系统背包(私有) -->
    <div class="sub-title">系统背包 · 私有</div>
    <div v-if="!_.isEmpty(store.data.主角.系统背包)" class="sub-list">
      <div v-for="(item, name) in store.data.主角.系统背包" :key="name" class="list-item bag-item">
        <span class="bag-name">{{ name }}</span>
        <span class="bag-count">×{{ item.数量 }}</span>
        <span class="dim small bag-desc">{{ item.描述 }}</span>
      </div>
    </div>
    <div v-else class="empty">空空如也</div>

    <!-- 妻妾(默认折叠) -->
    <CollapsibleMini title="妻妾" :count="_.size(store.data.主角.妻妾)">
      <div v-if="!_.isEmpty(store.data.主角.妻妾)" class="sub-list">
        <div v-for="(w, name) in store.data.主角.妻妾" :key="name" class="list-item column">
          <div class="row">
            <span class="wife-name">{{ name }}</span>
            <span class="dim small">{{ w.年龄 }}岁 · {{ w.身份 }} · 感情：{{ w.感情 }}</span>
          </div>
          <div v-if="!_.isEmpty(w.生育)" class="dim small">
            生育：
            <span v-for="(c, cname) in w.生育" :key="cname" class="child">
              {{ cname }}（{{ c.性别 }}·{{ c.嫡庶 }}·{{ c.年龄 }}岁）
            </span>
          </div>
        </div>
      </div>
      <div v-else class="empty">暂无妻妾</div>
    </CollapsibleMini>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import CollapsibleMini from './CollapsibleMini.vue';
import { useDataStore, 按等级取表 } from '../store';

const store = useDataStore();

const 称号 = computed(() => 按等级取表(store.data.社稷.领地等级).称号);
const 经验百分比 = computed(() => {
  const need = store.data.社稷.升级所需;
  if (!need) return '0%';
  return `${_.clamp((store.data.社稷.经验 / need) * 100, 0, 100)}%`;
});
</script>

<style lang="scss" scoped>
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.identity {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.name {
  font-size: 17px;
  font-weight: bold;
  color: var(--gold-bright);
  letter-spacing: 2px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.age {
  font-size: 13px;
}

.id-tag {
  font-size: 11.5px;
  color: var(--text-dim);
  background: rgba(236, 224, 194, 0.06);
  border: 1px solid var(--line-soft);
  border-radius: 4px;
  padding: 1px 7px;
}

.state {
  font-style: italic;
  color: var(--text-dim);
}

.level-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 9px 10px;
  background: linear-gradient(135deg, rgba(200, 160, 74, 0.09), rgba(200, 160, 74, 0.02));
  border: 1px solid var(--line-soft);
  border-radius: 10px;
}

.points {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--jade);
  font-weight: bold;
  font-size: 13px;

  i {
    color: var(--gold);
    font-size: 12px;
  }
}

.exp {
  flex: 1;
  min-width: 60px;
}

.exp-label {
  letter-spacing: 2px;
}

.exp-num {
  font-variant-numeric: tabular-nums;
  color: var(--gold-bright);
}

.sub-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bag-item {
  align-items: flex-start;
}

.bag-name {
  font-weight: bold;
  color: var(--parchment);
}

.bag-count {
  color: var(--jade);
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  font-size: 12px;
}

.bag-desc {
  flex-basis: 100%;
}

.column {
  flex-direction: column;
  align-items: flex-start;
}

.wife-name {
  color: var(--cinnabar);
  font-weight: bold;
}

.child {
  margin-right: 7px;
}
</style>
