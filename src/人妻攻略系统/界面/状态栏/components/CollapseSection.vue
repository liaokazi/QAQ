<template>
  <section class="collapse-section">
    <button class="collapse-header" :class="{ open: is_open }" type="button" @click="toggle">
      <span v-if="index" class="collapse-index">{{ index }}</span>
      <span class="collapse-icon">{{ icon }}</span>
      <span class="collapse-title">{{ title }}</span>
      <span v-if="badge !== undefined" class="collapse-badge" :class="badge_color ? `badge-${badge_color}` : ''">{{
        badge
      }}</span>
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
    index?: string;
    badge_color?: 'pink' | 'violet' | 'gold' | 'green';
  }>(),
  { icon: '✦', badge: undefined, default_open: false, index: undefined, badge_color: undefined },
);

// 每次加载都默认折叠，不记住上次展开状态
const is_open = ref(!!props.default_open);
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

.collapse-header.open {
  background: linear-gradient(90deg, rgba(255, 45, 120, 0.32), rgba(181, 108, 255, 0.2));
}

.collapse-index {
  color: var(--sys-pink);
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
  text-shadow: 0 0 8px rgba(255, 95, 162, 0.4);
}

.collapse-badge {
  color: #fff;
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 999px;
  white-space: nowrap;
}

/* 徽章配色发光 */
.badge-pink {
  background: var(--sys-pink-deep);
  box-shadow: 0 0 8px rgba(255, 45, 120, 0.7);
}

.badge-violet {
  background: var(--sys-violet);
  box-shadow: 0 0 8px rgba(181, 108, 255, 0.7);
}

.badge-gold {
  background: #b8860b;
  color: #fff;
  box-shadow: 0 0 8px rgba(255, 201, 77, 0.7);
}

.badge-green {
  background: #1e9e63;
  box-shadow: 0 0 8px rgba(95, 215, 160, 0.7);
}

.collapse-chevron {
  color: var(--sys-lilac);
  transition: transform 0.25s;
}

.collapse-chevron.open {
  transform: rotate(180deg);
}

.collapse-body {
  padding: 8px 10px;
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
