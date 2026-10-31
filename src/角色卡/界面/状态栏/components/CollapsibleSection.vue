<template>
  <div class="collapsible" :class="{ open }">
    <button class="collapsible-header" type="button" @click="open = !open">
      <i :class="`fa-solid ${icon}`" class="header-icon"></i>
      <span class="header-title">{{ title }}</span>
      <i :class="open ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'" class="header-chevron"></i>
    </button>
    <div v-if="open" class="collapsible-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string; icon?: string; defaultOpen?: boolean }>();
const open = ref(props.defaultOpen ?? false);
</script>

<style lang="scss" scoped>
.collapsible {
  border-top: 1px solid var(--line-soft);

  &:first-of-type {
    border-top: none;
  }
}

.collapsible-header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 11px 13px;
  border: none;
  border-left: 3px solid transparent;
  background: linear-gradient(90deg, rgba(200, 160, 74, 0.13), rgba(200, 160, 74, 0.02) 75%);
  color: var(--gold-bright);
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: 4px;
  text-align: left;
  transition:
    background 0.25s ease,
    border-color 0.25s ease;

  &:active {
    background: linear-gradient(90deg, rgba(200, 160, 74, 0.22), rgba(200, 160, 74, 0.06) 75%);
  }
}

.collapsible.open .collapsible-header {
  border-left-color: var(--gold);
  background: linear-gradient(90deg, rgba(200, 160, 74, 0.2), rgba(200, 160, 74, 0.04) 75%);
}

.header-icon {
  width: 17px;
  text-align: center;
  font-size: 13px;
  color: var(--gold);
  text-shadow: 0 0 8px rgba(200, 160, 74, 0.5);
}

.header-title {
  flex: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.55);
}

.header-chevron {
  color: var(--text-dim);
  font-size: 12px;
  transition:
    transform 0.25s ease,
    color 0.25s ease;
}

.collapsible.open .header-chevron {
  transform: rotate(180deg);
  color: var(--gold);
}

.collapsible-body {
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
