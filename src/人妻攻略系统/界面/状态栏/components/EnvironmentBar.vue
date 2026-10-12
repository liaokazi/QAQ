<template>
  <div class="env-bar">
    <div class="env-loc">
      <span class="env-emoji">📍</span>
      <span class="env-loc-text">{{ 大区 }} · {{ 小区 }} · {{ 所在地 }}</span>
    </div>

    <div class="env-grid">
      <div class="env-cell">
        <span class="env-k">📅 日期</span>
        <span class="env-v">{{ 日期 || '—' }}</span>
      </div>
      <div class="env-cell">
        <span class="env-k">🕒 时间</span>
        <span class="env-v">{{ 时分 || '—' }}</span>
      </div>
      <div class="env-cell">
        <span class="env-k">📆 星期</span>
        <span class="env-v">{{ 星期 || '—' }}</span>
      </div>
      <div class="env-cell">
        <span class="env-k">🌤 天气</span>
        <span class="env-v">{{ 天气 }} {{ 温度 }}</span>
      </div>
    </div>

    <div v-if="节日列表.length" class="env-festival">
      <div v-for="f in 节日列表" :key="f.日期" class="festival-item">
        <div class="festival-head">
          <span class="festival-name">🎉 {{ f.名称 }}</span>
          <span class="festival-date">{{ f.日期 }}<span v-if="距今(f)" class="festival-countdown"> · {{ 距今(f) }}</span></span>
        </div>
        <div class="festival-desc">{{ f.简介 }}</div>
        <div class="festival-off">🛋 {{ f.放假天数 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const 大区 = computed(() => store.data.世界.地点.大区);
const 小区 = computed(() => store.data.世界.地点.小区);
const 所在地 = computed(() => store.data.世界.地点.所在地);
const 天气 = computed(() => store.data.世界.天气.天气);
const 温度 = computed(() => store.data.世界.天气.温度);

const 日期 = computed(() => {
  const m = store.data.世界.当前时间.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
  return m ? `${m[1]}年${Number(m[2])}月${Number(m[3])}日` : '';
});

const 时分 = computed(() => {
  const m = store.data.世界.当前时间.match(/(\d{1,2}):(\d{2})/);
  return m ? `${m[1]}:${m[2]}` : '';
});

const 星期 = computed(() => {
  const m = store.data.世界.当前时间.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
  if (!m) {
    return '';
  }
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const names = ['日', '一', '二', '三', '四', '五', '六'];
  return `星期${names[d.getDay()]}`;
});

// 节假日由 AI 维护（世界.节假日），这里只显示最近的 2 个
const 节日列表 = computed(() => (store.data.世界.节假日 || []).slice(0, 2));

// 计算节日距今还有多少天
const 距今 = (f: { 日期: string }) => {
  const m = store.data.世界.当前时间.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
  const d = f.日期.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
  if (!m || !d) {
    return '';
  }
  const now = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const target = new Date(Number(d[1]), Number(d[2]) - 1, Number(d[3]));
  const diff = Math.round((target.getTime() - now.getTime()) / 86400000);
  if (diff === 0) {
    return '就是今天';
  }
  if (diff === 1) {
    return '明天';
  }
  return diff > 0 ? `距今 ${diff} 天` : '';
};
</script>

<style lang="scss" scoped>
.env-bar {
  padding: 8px 12px;
  background: linear-gradient(135deg, rgba(255, 95, 162, 0.16), rgba(181, 108, 255, 0.12));
  border-bottom: 1px solid var(--sys-border);
}

.env-loc {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 6px;
  color: var(--sys-text);
  text-shadow: 0 0 8px rgba(255, 95, 162, 0.5);
}

.env-emoji {
  font-size: 14px;
}

.env-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px 12px;
}

.env-cell {
  display: flex;
  align-items: baseline;
  gap: 4px;
  min-width: 0;
}

.env-k {
  color: var(--sys-lilac);
  font-size: 12px;
  white-space: nowrap;
}

.env-v {
  color: var(--sys-text);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.env-festival {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

.festival-item {
  background: rgba(255, 201, 77, 0.08);
  border: 1px solid rgba(255, 201, 77, 0.35);
  border-radius: 8px;
  padding: 4px 8px;
}

.festival-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.festival-name {
  color: var(--sys-gold);
  font-weight: 700;
  font-size: 13px;
  text-shadow: 0 0 8px rgba(255, 201, 77, 0.5);
}

.festival-date {
  color: var(--sys-text-dim);
  font-size: 11px;
  white-space: nowrap;
}

.festival-countdown {
  color: var(--sys-gold);
  font-weight: 700;
}

.festival-desc {
  color: var(--sys-text);
  font-size: 12px;
  line-height: 1.5;
  margin-top: 1px;
}

.festival-off {
  color: var(--sys-green);
  font-size: 11px;
  margin-top: 1px;
}

@media (max-width: 460px) {
  .env-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
