<template>
  <section class="collapse-section">
    <button class="collapse-header" :class="{ open: is_open }" type="button" @click="toggle">
      <span v-if="index" class="collapse-index">{{ index }}</span>
      <span class="collapse-icon">{{ icon }}</span>
      <span class="collapse-title">{{ title }}</span>
      <span v-if="badge !== undefined && badge !== null" class="collapse-badge">{{ badge }}</span>
      <span class="collapse-chevron" :class="{ open: is_open }">▾</span>
    </button>
    <div v-show="is_open" class="collapse-body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    icon?: string;
    badge?: string | number | null;
    storage_key?: string;
    default_open?: boolean;
    index?: string;
  }>(),
  { icon: '✦', badge: null, storage_key: '', default_open: false, index: undefined },
);

// 每次加载都默认折叠，不记住上次展开状态
const is_open = ref(!!props.default_open);
const toggle = () => (is_open.value = !is_open.value);
</script>

<style lang="scss" scoped>
.collapse-section {
  border-top: 1px solid rgba(205, 155, 90, 0.25);
}

.collapse-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(90deg, rgba(205, 155, 90, 0.14), rgba(205, 155, 90, 0.05));
  border: none;
  color: var(--sys-text);
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  text-align: left;
}

.collapse-header:hover {
  background: linear-gradient(90deg, rgba(205, 155, 90, 0.24), rgba(205, 155, 90, 0.1));
}

.collapse-header.open {
  background: linear-gradient(90deg, rgba(205, 155, 90, 0.3), rgba(205, 155, 90, 0.14));
}

.collapse-index {
  color: var(--sys-bronze);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  opacity: 0.85;
}

.collapse-icon {
  font-size: 15px;
}

.collapse-title {
  flex: 1;
  letter-spacing: 1px;
}

.collapse-badge {
  color: #2a1c08;
  background: var(--sys-gold);
  font-size: 11px;
  font-weight: 800;
  padding: 1px 8px;
  border-radius: 999px;
  white-space: nowrap;
  box-shadow: 0 0 8px rgba(230, 192, 122, 0.6);
}

.collapse-chevron {
  color: var(--sys-bronze);
  transition: transform 0.25s;
}

.collapse-chevron.open {
  transform: rotate(180deg);
}

.collapse-body {
  padding: 8px 10px;
  background: rgba(28, 22, 16, 0.5);
  animation: fade-in 0.25s ease;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>