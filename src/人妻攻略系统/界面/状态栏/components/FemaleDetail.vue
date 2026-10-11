<template>
  <div class="detail">
    <div class="kv-grid">
      <div class="kv">
        <span class="k">生日</span>
        <span class="v">{{ woman.生日 || '—' }}</span>
      </div>
      <div class="kv">
        <span class="k">{{ partnerLabel }}</span>
        <span class="v">{{ partnerValue || '—' }}</span>
      </div>
      <div class="kv wide">
        <span class="k">详细当前面貌</span>
        <span class="v">{{ woman.详细当前面貌 || '—' }}</span>
      </div>
      <div class="kv wide">
        <span class="k">详细性格</span>
        <span class="v">{{ woman.详细性格 || '—' }}</span>
      </div>
    </div>

    <div class="sec-title">👗 穿着</div>
    <div class="kv-grid">
      <div v-for="(val, slot) in woman.穿着" :key="slot" class="kv">
        <span class="k">{{ slot }}</span>
        <span class="v">{{ val || '—' }}</span>
      </div>
    </div>

    <div class="sec-title">💕 私密</div>
    <div class="kv-grid">
      <div v-for="(val, slot) in woman.私密" :key="slot" class="kv wide">
        <span class="k">{{ slot }}</span>
        <span class="v">{{ val || '—' }}</span>
      </div>
    </div>

    <div class="sec-title">🤰 怀孕系统</div>
    <div class="kv-grid">
      <div class="kv wide">
        <span class="k">子宫</span>
        <span class="v">
          {{ woman.怀孕.子宫.状态 || '—' }}
          <span v-if="woman.怀孕.子宫.标注" class="tag">{{ woman.怀孕.子宫.标注 }}</span>
        </span>
      </div>
      <div class="kv">
        <span class="k">内射次数</span>
        <span class="v">{{ woman.怀孕.内射次数 }} 次</span>
      </div>
      <div class="kv wide">
        <span class="k">子女血脉</span>
        <span class="v">
          <span v-for="child in woman.怀孕.子女血脉" :key="child.姓名" class="chip child-chip">
            {{ child.姓名 }}（{{ child.年龄 }}岁 · 父：{{ child.亲生父亲 }}）
          </span>
          <span v-if="!woman.怀孕.子女血脉.length">暂无子女</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { 女性资料 } from '../../../schema';

const props = defineProps<{
  kind: '人妻' | '女性朋友';
  name: string;
  woman: 女性资料;
}>();

const partnerLabel = computed(() => (props.kind === '人妻' ? '丈夫' : '男朋友'));
const partnerValue = computed(() => (props.kind === '人妻' ? props.woman.丈夫名字 : props.woman.男朋友));
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 10px;
}

.child-chip {
  margin: 1px 2px 1px 0;
  line-height: 1.8;
}
</style>
