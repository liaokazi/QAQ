<template>
  <div>
    <div class="points">
      <span class="points-label">🪙 系统点数</span>
      <span class="points-value">{{ store.data.商城.点数 }}</span>
    </div>

    <div class="sec-title">🧪 商城道具</div>
    <div v-if="_.isEmpty(store.data.商城.道具)" class="empty">商城暂未上架道具</div>
    <div v-for="(item, name) in store.data.商城.道具" :key="name" class="shop-row">
      <div class="shop-head">
        <span class="shop-name">{{ name }}</span>
        <span class="shop-price">🪙 {{ item.价格 }}</span>
      </div>
      <div class="shop-desc">{{ item.描述 }}</div>
      <div class="shop-effect">{{ item.效果 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.points {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(90deg, rgba(255, 201, 77, 0.15), rgba(255, 45, 120, 0.08));
  border: 1px solid rgba(255, 201, 77, 0.5);
  border-radius: 10px;
  padding: 8px 12px;
}

.points-label {
  font-weight: 700;
  color: var(--sys-gold);
}

.points-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--sys-gold);
  text-shadow: 0 0 10px rgba(255, 201, 77, 0.7);
}

.shop-row {
  background: var(--sys-panel);
  border: 1px solid rgba(255, 95, 162, 0.3);
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 6px;
}

.shop-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3px;
}

.shop-name {
  font-weight: 700;
  color: var(--sys-pink);
}

.shop-price {
  color: var(--sys-gold);
  font-weight: 700;
  font-size: 12px;
}

.shop-desc {
  color: var(--sys-text);
  font-size: 12px;
}

.shop-effect {
  color: var(--sys-green);
  font-size: 11px;
  margin-top: 2px;
}
</style>
