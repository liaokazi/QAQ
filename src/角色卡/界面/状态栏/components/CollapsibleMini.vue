<template>
  <div class="collapsible-mini" :class="{ open }">
    <button class="mini-header" type="button" @click="open = !open">
      <span class="mini-title">{{ title }}<span v-if="count" class="mini-count">（{{ count }}）</span></span>
      <i :class="open ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'" class="mini-chevron"></i>
    </button>
    <div v-if="open" class="mini-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; count?: number }>();
const open = ref(false);
</script>

<style lang="scss" scoped>
.collapsible-mini {
  border: 1px solid var(--line-soft);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(236, 224, 194, 0.025);
  transition: border-color 0.25s ease;

  &.open {
    border-color: var(--line);
  }
}

.mini-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 7px 10px;
  border: none;
  background: linear-gradient(90deg, rgba(127, 209, 168, 0.08), transparent 70%);
  color: var(--parchment);
  font-family: inherit;
  font-size: 12.5px;
  cursor: pointer;
  text-align: left;

  &:active {
    background: linear-gradient(90deg, rgba(127, 209, 168, 0.14), transparent 70%);
  }
}

.mini-title {
  color: var(--gold-bright);
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.mini-count {
  color: var(--text-dim);
  letter-spacing: 0;
}

.mini-chevron {
  color: var(--text-dim);
  font-size: 11px;
  transition: transform 0.25s ease;
}

.collapsible-mini.open .mini-chevron {
  transform: rotate(180deg);
  color: var(--jade);
}

.mini-body {
  padding: 8px 9px 9px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px solid var(--line-soft);
}
</style>
