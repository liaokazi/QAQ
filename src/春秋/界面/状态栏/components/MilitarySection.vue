<template>
  <div>
    <div class="sec-title">⚔️ 军事</div>
    <div class="chip-grid">
      <span class="chip">战车 <b>{{ 军事.战车 }}</b> 乘</span>
      <span class="chip">甲士 <b>{{ 军事.甲士 }}</b></span>
      <span class="chip">徒兵 <b>{{ 军事.徒兵 }}</b></span>
    </div>
    <div class="kv"><span class="k">训练度</span><span class="v">{{ 军事.训练度 || '—' }}</span></div>
    <div class="kv"><span class="k">士气</span><span class="v">{{ 军事.士气 || '—' }}</span></div>
    <div class="kv"><span class="k">军粮</span><span class="v">{{ 军事.军粮 || '—' }}</span></div>
    <div v-if="将领.length" class="kv"><span class="k">将领</span><span class="v">{{ 将领.map(g => `${g[0]}(${g[1].职位})`).join('、') }}</span></div>

    <div class="sec-title">🕊 外交势力</div>
    <div v-if="!邻国.length" class="empty">尚未与任何势力建交</div>
    <div v-for="(g, name) in 邻国" :key="name" class="row-card">
      <div class="row-head">
        <span class="row-name">{{ name }}</span>
        <span class="row-tag">{{ g.关系 }}</span>
      </div>
      <div class="row-sub">态度：{{ g.态度 }}<span v-if="g.使节"> · 使节：{{ g.使节 }}</span></div>
    </div>
    <div class="kv"><span class="k">会盟</span><span class="v">{{ 外交.会盟 || '—' }}</span></div>
    <div class="kv"><span class="k">纳贡</span><span class="v">{{ 外交.纳贡 || '—' }}</span></div>
    <div class="kv"><span class="k">受命进度</span><span class="v">{{ 外交.受命进度 || '—' }}</span></div>

    <div class="sec-title">🕵 情报</div>
    <div class="kv"><span class="k">周边动态</span><span class="v">{{ 情报.周边动态 || '—' }}</span></div>
    <div v-if="在野人物.length" class="sec-sub">在野可招揽人物</div>
    <div v-for="(p, name) in 在野人物" :key="name" class="row-card">
      <div class="row-head"><span class="row-name">{{ name }}</span><span class="row-tag">{{ p.身份 }}</span></div>
      <div class="row-sub">{{ p.所在地 }} · 才能：{{ p.才能 }}</div>
    </div>
    <div class="kv"><span class="k">大事记</span><span class="v">{{ 情报.大事记 || '—' }}</span></div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const 军事 = computed(() => store.data.军事);
const 外交 = computed(() => store.data.外交);
const 情报 = computed(() => store.data.情报);
const 将领 = computed(() => Object.entries(store.data.军事.将领));
const 邻国 = computed(() => Object.entries(store.data.外交.邻国));
const 在野人物 = computed(() => Object.entries(store.data.情报.在野人物));
</script>

<style lang="scss" scoped>
.sec-sub {
  color: var(--sys-bronze);
  font-size: 12px;
  margin: 4px 0 2px;
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