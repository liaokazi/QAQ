<template>
  <section class="collapse-section">
    <button class="collapse-header" type="button" @click="toggle">
      <span class="collapse-icon">{{ icon }}</span>
      <span class="collapse-title">{{ title }}</span>
      <span v-if="badge !== undefined" class="collapse-badge">{{ badge }}</span>
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
    badge?: string | number;
    storage_key: string;
    default_open?: boolean;
  }>(),
  { icon: '✦', badge: undefined, default_open: false },
);

const is_open = useLocalStorage(`renqi_system:${props.storage_key}`, props.default_open);
const toggle = () => (is_open.value = !is_open.value);
</script>

<style lang="scss" scoped>
.collapse-section {
  border-top: 1px solid rgba(181, 108, 255, 0.2);
}

.collapse-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: linear-gradient(90deg, rgba(255, 45, 120, 0.16), rgba(181, 108, 255, 0.08));
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
  background: linear-gradient(90deg, rgba(255, 45, 120, 0.28), rgba(181, 108, 255, 0.16));
}

.collapse-icon {
  font-size: 15px;
}

.collapse-title {
  flex: 1;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(255, 95, 162, 0.4);
}

.collapse-badge {
  background: var(--sys-pink-deep);
  color: #fff;
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

.collapse-chevron {
  color: var(--sys-lilac);
  transition: transform 0.25s;
}

.collapse-chevron.open {
  transform: rotate(180deg);
}

.collapse-body {
  padding: 12px 14px;
  background: rgba(20, 6, 26, 0.4);
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
