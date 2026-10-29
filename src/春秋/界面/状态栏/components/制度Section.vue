<template>
  <div>
    <div class="sec-title">🏮 宗族</div>
    <div class="chip-grid">
      <span class="chip">氏族 <b>{{ 宗族.氏族 || '无' }}</b></span>
      <span class="chip">族长 <b>{{ 宗族.族长 || '无' }}</b></span>
      <span class="chip">大宗 <b>{{ 宗族.大宗 || '无' }}</b></span>
      <span class="chip">小宗 <b>{{ 宗族.小宗 || '无' }}</b></span>
    </div>
    <div class="kv"><span class="k">嫡庶</span><span class="v">{{ 宗族.嫡庶 || '—' }}</span></div>
    <div class="kv"><span class="k">联姻</span><span class="v">{{ 宗族.联姻 || '—' }}</span></div>
    <div v-if="成员.length">
      <div class="sec-sub">成员</div>
      <div v-for="(m, name) in 成员" :key="name" class="row-card">
        <div class="row-head"><span class="row-name">{{ name }}</span><span class="row-tag">{{ m.辈分 }} · {{ m.在否 }}</span></div>
        <div class="row-sub">{{ m.身份 }}{{ m.关系 ? ` · ${m.关系}` : '' }}{{ m.职务 ? ` · ${m.职务}` : '' }}</div>
      </div>
    </div>

    <div class="sec-title">⚖️ 法度</div>
    <div class="kv"><span class="k">状态</span><span class="v">{{ 法度.状态 || '无' }}</span></div>
    <div v-if="法令.length" class="sec-sub">法令</div>
    <div v-for="(v, k) in 法令" :key="k" class="kv"><span class="k">{{ k }}</span><span class="v">{{ v }}</span></div>
    <div class="kv"><span class="k">司法</span><span class="v">{{ 法度.司法 || '—' }}</span></div>

    <div class="sec-title">🎖 名分礼制</div>
    <div class="chip-grid">
      <span class="chip">身份 <b>{{ 名分.身份等级 || '野人' }}</b></span>
      <span class="chip">受命 <b>{{ 名分.受命状态 || '未受命' }}</b></span>
    </div>
    <div class="kv"><span class="k">礼器</span><span class="v">{{ 名分.礼器规格 || '—' }}</span></div>
    <div class="kv"><span class="k">舆服</span><span class="v">{{ 名分.舆服规格 || '—' }}</span></div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const 宗族 = computed(() => store.data.宗族);
const 法度 = computed(() => store.data.法度);
const 名分 = computed(() => store.data.名分);
const 成员 = computed(() => Object.entries(store.data.宗族.成员));
const 法令 = computed(() => Object.entries(store.data.法度.法令));
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