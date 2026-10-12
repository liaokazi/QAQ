<template>
  <div>
    <div class="kv-grid">
      <div class="kv">
        <span class="k">姓名</span>
        <span class="v">{{ 主角.姓名 || '—' }}</span>
      </div>
      <div class="kv">
        <span class="k">年龄</span>
        <span class="v">{{ 主角.年龄 ? `${主角.年龄} 岁` : '—' }}</span>
      </div>
      <div class="kv">
        <span class="k">生日</span>
        <span class="v">{{ 主角.生日 || '—' }}</span>
      </div>
      <div class="kv">
        <span class="k">身高</span>
        <span class="v">{{ 主角.身高 || '—' }}</span>
      </div>
      <div class="kv wide">
        <span class="k">肉棒</span>
        <span class="v">{{ 主角.肉棒尺寸 || '—' }}</span>
      </div>
    </div>

    <div class="talent">
      <button class="talent-head" type="button" @click="talent_open = !talent_open">
        <span class="talent-title">✨ 天赋</span>
        <span class="talent-count">{{ 主角.天赋.length }}</span>
        <span class="chevron" :class="{ open: talent_open }">▾</span>
      </button>
      <div v-show="talent_open" class="talent-body">
        <div v-if="!主角.天赋.length" class="empty">暂无天赋</div>
        <div v-for="t in 主角.天赋" :key="t.名称" class="talent-item">
          <div class="talent-name">{{ t.名称 }}</div>
          <div class="talent-desc">{{ t.介绍 }}</div>
        </div>
      </div>
    </div>

    <div class="kv wide status-kv">
      <span class="k">当前姿势</span>
      <span class="v">{{ 主角.当前姿势 || '—' }}</span>
    </div>
    <div class="kv wide status-kv">
      <span class="k">衣着</span>
      <span class="v">{{ 主角.衣着 || '—' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const 主角 = computed(() => store.data.主角);
const talent_open = ref(false);
</script>

<style lang="scss" scoped>
.status-kv {
  margin-top: 4px;
}

.talent {
  margin-top: 4px;
  border: 1px solid rgba(255, 201, 77, 0.35);
  border-radius: 10px;
  background: rgba(255, 201, 77, 0.05);
  overflow: hidden;
}

.talent-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  background: transparent;
  border: none;
  color: var(--sys-gold);
  font-family: inherit;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  text-align: left;
}

.talent-title {
  flex: 1;
  white-space: nowrap;
}

.talent-count {
  background: var(--sys-gold);
  color: #5a3b00;
  font-size: 11px;
  padding: 0 8px;
  border-radius: 999px;
}

.chevron {
  color: var(--sys-gold);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.chevron.open {
  transform: rotate(180deg);
}

.talent-body {
  padding: 4px 10px 6px;
  border-top: 1px dashed rgba(255, 201, 77, 0.3);
}

.talent-item {
  padding: 3px 0;
  border-bottom: 1px solid rgba(255, 201, 77, 0.15);
}

.talent-item:last-child {
  border-bottom: none;
}

.talent-name {
  font-weight: 700;
  color: var(--sys-gold);
  font-size: 12px;
}

.talent-desc {
  color: var(--sys-text-dim);
  font-size: 11px;
  line-height: 1.6;
  margin-top: 1px;
}
</style>
