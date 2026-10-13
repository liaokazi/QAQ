<template>
  <div class="female-section">
    <div v-if="isEmpty" class="empty">暂无攻略目标</div>

    <div v-for="(woman, name) in women" :key="name" class="woman-card">
      <button class="woman-row" type="button" @click="toggle(name)">
        <span class="woman-avatar">{{ kind === '人妻' ? '💍' : '👧' }}</span>
        <span class="woman-name">{{ name }}</span>
        <span v-if="isNearby(name)" class="nearby-mark" title="就在附近">📍</span>
        <span v-if="isPregnant(woman)" class="preg-mark" title="怀孕中">🤰</span>
        <span class="woman-meta">{{ woman.年龄 ? `${woman.年龄}岁` : '' }} {{ woman.身高 }}</span>
        <span class="chevron" :class="{ open: isOpen(name) }">▾</span>
      </button>

      <div v-show="isOpen(name)" class="woman-detail">
        <FemaleDetail :kind="kind" :name="name" :woman="woman" :nearby="isNearby(name)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { 女性资料 } from '../../../schema';
import FemaleDetail from './FemaleDetail.vue';
import { useDataStore } from '../store';

const props = defineProps<{ kind: '人妻' | '女性朋友' }>();

const store = useDataStore();
const women = computed<Record<string, 女性资料>>(() => store.data[props.kind]);
const isEmpty = computed(() => _.isEmpty(women.value));
const 附近女性 = computed(() => new Set(store.data.世界.附近女性 || []));
const isNearby = (name: string) => 附近女性.value.has(name);
const isPregnant = (woman: 女性资料) => (woman.怀孕?.怀孕状态?.孕周 ?? 0) > 0;

const opened = ref<string[]>([]);

function isOpen(name: string): boolean {
  return opened.value.includes(name);
}

function toggle(name: string) {
  if (opened.value.includes(name)) {
    opened.value = opened.value.filter(n => n !== name);
  } else {
    opened.value = [...opened.value, name];
  }
}
</script>

<style lang="scss" scoped>
.female-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.woman-card {
  background: var(--sys-panel);
  border: 1px solid rgba(255, 95, 162, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

.woman-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: transparent;
  border: none;
  color: var(--sys-text);
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  transition:
    background 0.15s,
    transform 0.15s;
  text-align: left;
}

.woman-row:hover {
  background: rgba(255, 45, 120, 0.12);
  transform: translateX(2px);
}

.woman-avatar {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: radial-gradient(circle at 30% 30%, rgba(255, 95, 162, 0.35), rgba(181, 108, 255, 0.2));
  border: 1px solid rgba(255, 95, 162, 0.5);
  box-shadow: 0 0 8px rgba(255, 45, 120, 0.4);
}

.woman-name {
  font-weight: 700;
  color: var(--sys-pink);
  text-shadow: 0 0 6px rgba(255, 95, 162, 0.5);
  white-space: nowrap;
}

.nearby-mark {
  font-size: 11px;
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px rgba(255, 95, 162, 0.8));
}

.preg-mark {
  font-size: 11px;
  flex-shrink: 0;
  filter: drop-shadow(0 0 4px rgba(255, 201, 77, 0.9));
}

.woman-meta {
  flex: 1;
  color: var(--sys-lilac);
  font-size: 12px;
  white-space: nowrap;
}

.chevron {
  color: var(--sys-lilac);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.chevron.open {
  transform: rotate(180deg);
}

.woman-detail {
  padding: 0 8px 8px;
  border-top: 1px dashed rgba(181, 108, 255, 0.3);
}
</style>
