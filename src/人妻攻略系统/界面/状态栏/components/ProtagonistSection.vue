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
      <div class="kv">
        <span class="k">肉棒尺寸</span>
        <span class="v">{{ 主角.肉棒尺寸 || '—' }}</span>
      </div>
      <div class="kv">
        <span class="k">天赋</span>
        <span class="v">
          <span v-for="t in 主角.天赋" :key="t" class="chip talent-chip">{{ t }}</span>
          <span v-if="!主角.天赋.length">—</span>
        </span>
      </div>
    </div>

    <div class="kv wide status-kv">
      <span class="k">当前状态</span>
      <span class="v">{{ 主角.当前状态 || '—' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const 主角 = computed(() => store.data.主角);
</script>

<style lang="scss" scoped>
.talent-chip {
  margin: 1px 2px 1px 0;
}

.status-kv {
  margin-top: 6px;
}
</style>
