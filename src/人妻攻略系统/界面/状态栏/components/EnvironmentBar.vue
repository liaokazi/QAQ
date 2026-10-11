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
      <span class="env-emoji">🎉</span>
      <span v-for="f in 节日列表" :key="f" class="festival-chip">{{ f }}</span>
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

// 固定日期的阳历节日（农历节日由 AI 写入 世界.节日）
const 阳历节日: Record<string, string> = {
  '1/1': '元旦',
  '2/14': '情人节',
  '3/8': '妇女节',
  '3/14': '白色情人节',
  '4/1': '愚人节',
  '5/1': '劳动节',
  '5/20': '520情人节',
  '6/1': '儿童节',
  '9/10': '教师节',
  '10/1': '国庆节',
  '10/31': '万圣节',
  '11/11': '光棍节',
  '12/24': '平安夜',
  '12/25': '圣诞节',
  '12/31': '跨年夜',
};

const 节日列表 = computed(() => {
  const list: string[] = [];
  const m = store.data.世界.当前时间.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
  if (m) {
    const md = `${Number(m[2])}/${Number(m[3])}`;
    if (阳历节日[md]) {
      list.push(阳历节日[md]);
    }
  }
  if (store.data.世界.节日) {
    list.push(store.data.世界.节日);
  }
  return list;
});
</script>

<style lang="scss" scoped>
.env-bar {
  padding: 10px 14px;
  background: linear-gradient(135deg, rgba(255, 95, 162, 0.16), rgba(181, 108, 255, 0.12));
  border-bottom: 1px solid var(--sys-border);
}

.env-loc {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 8px;
  color: var(--sys-text);
  text-shadow: 0 0 8px rgba(255, 95, 162, 0.5);
}

.env-emoji {
  font-size: 14px;
}

.env-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.env-cell {
  background: var(--sys-panel);
  border: 1px solid rgba(181, 108, 255, 0.25);
  border-radius: 8px;
  padding: 5px 7px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.env-k {
  color: var(--sys-lilac);
  font-size: 10px;
}

.env-v {
  color: var(--sys-text);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.env-festival {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.festival-chip {
  background: var(--sys-gold);
  color: #5a3b00;
  font-weight: 700;
  font-size: 11px;
  border-radius: 999px;
  padding: 1px 10px;
  box-shadow: 0 0 8px rgba(255, 201, 77, 0.5);
}

@media (max-width: 460px) {
  .env-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
