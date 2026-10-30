<template>
  <div>
    <div class="sec-title">🏮 宗族（{{ 可见族.length }} 族）</div>
    <div class="clan-hint">默认显示最大 2 族与最小 2 族；对某族感兴趣可让仙儿追踪</div>
    <div v-if="!可见族.length" class="empty">尚无宗族</div>
    <div v-for="(c, name) in 可见族" :key="name" class="clan-card">
      <button class="clan-head" type="button" @click="toggle(name)">
        <span v-if="被追踪(name)" class="clan-pin">📌</span>
        <span class="clan-name">{{ name }}</span>
        <span class="clan-state" :class="状态类(c.状态)">{{ c.状态 || '存续' }}</span>
        <span class="clan-pop">{{ c.口数 || 0 }} 口</span>
        <span class="clan-chevron" :class="{ open: 展开族 === name }">▾</span>
      </button>
      <div v-show="展开族 === name" class="clan-body">
        <div class="kv"><span class="k">族长</span><span class="v">{{ c.族长 || '—' }}</span></div>
        <div class="kv"><span class="k">宗子</span><span class="v">{{ c.宗子 || '—' }}</span></div>
        <div class="kv"><span class="k">嫡庶</span><span class="v">{{ c.嫡庶 || '—' }}</span></div>
        <div class="kv"><span class="k">凝聚力</span><span class="v">{{ c.凝聚力 || '—' }}</span></div>
        <div v-if="族人(c).length" class="sec-sub">重要族人</div>
        <div v-for="(m, mname) in 族人(c)" :key="mname" class="member">
          <div class="member-head">
            <span class="member-name">{{ mname }}</span>
            <span class="member-role">{{ m.职责 }}</span>
            <span class="member-loyal">忠诚 {{ m.忠诚 }}</span>
          </div>
          <div class="member-sub">{{ m.才能 }}{{ m.关系 ? ` · ${m.关系}` : '' }}</div>
        </div>
        <div class="kv"><span class="k">联姻</span><span class="v">{{ c.联姻 || '—' }}</span></div>
        <div class="kv"><span class="k">祭祀</span><span class="v">{{ c.祭祀 || '—' }}</span></div>
        <div v-if="c.加成" class="clan-buff">📈 {{ c.加成 }}</div>
        <div v-if="c.隐患" class="clan-risk">⚠️ {{ c.隐患 }}</div>
      </div>
    </div>

    <button class="memorial-head" type="button" @click="亡族开 = !亡族开">
      <span>🪦 已亡宗族（{{ 亡族列表.length }}）</span>
      <span class="clan-chevron" :class="{ open: 亡族开 }">▾</span>
    </button>
    <div v-show="亡族开" class="memorial-body">
      <div v-if="!亡族列表.length" class="empty">暂无亡族</div>
      <div v-for="(d, name) in 亡族列表" :key="name" class="memorial">
        <div class="memorial-name">{{ name }}</div>
        <div class="memorial-line">起源：{{ d.起源 }}</div>
        <div class="memorial-line">灭亡：{{ d.灭亡 }}</div>
        <div class="memorial-line">存在时间：{{ d.存在时间 }}</div>
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

const 法度 = computed(() => store.data.法度);
const 名分 = computed(() => store.data.名分);
const 法令 = computed(() => Object.entries(store.data.法度.法令));

const 展开族 = ref('');
const 亡族开 = ref(false);

const 追踪列表 = computed(() => store.data.宗族.追踪 || []);
const 亡族列表 = computed(() => Object.entries(store.data.宗族.亡族));

// 可见宗族 = 仙儿追踪 ∪ 口数最大 2 族 ∪ 口数最小 2 族(去重)
const 可见族 = computed(() => {
  const entries = Object.entries(store.data.宗族.族) as [string, { 口数: number }][];
  const sorted = [...entries].sort((a, b) => (b[1].口数 || 0) - (a[1].口数 || 0));
  const top = sorted.slice(0, 2);
  const bottom = sorted.length > 2 ? sorted.slice(-2) : [];
  const seen = new Set<string>();
  const result: typeof sorted = [];
  const 推入 = (item: (typeof sorted)[number]) => {
    if (!seen.has(item[0])) {
      seen.add(item[0]);
      result.push(item);
    }
  };
  for (const item of sorted) {
    if (追踪列表.value.includes(item[0])) 推入(item);
  }
  top.forEach(推入);
  bottom.forEach(推入);
  return result;
});

const 被追踪 = (name: string) => 追踪列表.value.includes(name);

const toggle = (name: string) => {
  展开族.value = 展开族.value === name ? '' : name;
};

const 状态类 = (s: string) => {
  if (s === '坐大') return 'state-rise';
  if (s === '式微') return 'state-decline';
  return 'state-alive';
};

const 族人 = (c: { 重要族人: Record<string, unknown> }) => Object.entries(c.重要族人 || {}) as [string, { 职责: string; 才能: string; 忠诚: string; 关系: string }][];
</script>

<style lang="scss" scoped>
.clan-hint {
  color: var(--sys-text-dim);
  font-size: 11px;
  margin: 2px 0 6px;
}

.clan-card {
  border: 1px solid rgba(205, 155, 90, 0.28);
  border-radius: 8px;
  margin-bottom: 5px;
  overflow: hidden;
  background: var(--sys-panel);
}

.clan-head {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  padding: 7px 10px;
  background: transparent;
  border: none;
  color: var(--sys-text);
  font-family: inherit;
  cursor: pointer;
  text-align: left;
}

.clan-pin {
  font-size: 12px;
}

.clan-name {
  font-weight: 700;
  color: var(--sys-text);
}

.clan-state {
  font-size: 11px;
  padding: 0 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.state-rise {
  color: var(--sys-cinnabar);
  border: 1px solid var(--sys-cinnabar);
}

.state-decline {
  color: var(--sys-text-dim);
  border: 1px solid var(--sys-text-dim);
}

.state-alive {
  color: var(--sys-green);
  border: 1px solid var(--sys-green);
}

.clan-pop {
  margin-left: auto;
  font-size: 12px;
  color: var(--sys-gold);
  white-space: nowrap;
}

.clan-chevron {
  color: var(--sys-bronze);
  transition: transform 0.2s;
}

.clan-chevron.open {
  transform: rotate(180deg);
}

.clan-body {
  padding: 4px 10px 8px;
  border-top: 1px dashed rgba(205, 155, 90, 0.25);
}

.sec-sub {
  color: var(--sys-bronze);
  font-size: 12px;
  margin: 4px 0 2px;
}

.member {
  padding: 4px 0;
  border-bottom: 1px dashed rgba(205, 155, 90, 0.15);
}

.member-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.member-name {
  font-weight: 700;
  color: var(--sys-text);
}

.member-role {
  font-size: 11px;
  color: var(--sys-bronze);
}

.member-loyal {
  font-size: 11px;
  color: var(--sys-gold);
}

.member-sub {
  color: var(--sys-text-dim);
  font-size: 12px;
  margin-top: 1px;
}

.clan-buff {
  color: var(--sys-green);
  font-size: 12px;
  margin-top: 4px;
}

.clan-risk {
  color: var(--sys-cinnabar);
  font-size: 12px;
  margin-top: 2px;
}

.memorial-head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  margin-top: 6px;
  background: rgba(20, 16, 9, 0.5);
  border: 1px solid rgba(205, 155, 90, 0.22);
  border-radius: 8px;
  color: var(--sys-text-dim);
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
}

.memorial-body {
  padding: 6px 2px 2px;
}

.memorial {
  border-left: 2px solid rgba(205, 155, 90, 0.35);
  background: rgba(20, 16, 9, 0.35);
  border-radius: 4px;
  padding: 6px 10px;
  margin-bottom: 5px;
}

.memorial-name {
  font-weight: 700;
  color: var(--sys-bronze);
}

.memorial-line {
  color: var(--sys-text-dim);
  font-size: 12px;
  line-height: 1.6;
}
</style>