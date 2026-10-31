<template>
  <div class="panel-content">
    <div class="row">
      <span class="seal"><i class="fa-solid fa-coins"></i> 点数 {{ store.data.社稷.点数 }}</span>
      <span class="dim small">商品随境况动态刷新</span>
    </div>
    <div v-if="!_.isEmpty(store.data.商城.上架商品)" class="sub-list">
      <div v-for="(item, name) in store.data.商城.上架商品" :key="name" class="goods">
        <div class="row">
          <span class="goods-name">{{ name }}</span>
          <span class="goods-price"><i class="fa-solid fa-coins"></i>{{ item.价格 }}</span>
          <span class="goods-stock">余 {{ item.数量 }}</span>
        </div>
        <div class="dim small">{{ item.描述 }}</div>
      </div>
    </div>
    <div v-else class="empty">暂未上架，仙儿正在补货……</div>
    <div class="dim small tip">兑换方式：对仙儿说「兑换 XX」即可，商品会进入你的系统背包（私有），与领地资源分账。</div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.panel-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.seal i {
  font-size: 11px;
  margin-right: 3px;
}

.sub-list {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.goods {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  background:
    radial-gradient(120% 100% at 100% 0%, rgba(200, 160, 74, 0.1), transparent 60%),
    rgba(236, 224, 194, 0.04);
  border: 1px solid var(--line-soft);
  border-radius: 10px;
}

.goods-name {
  font-weight: bold;
  color: var(--gold-bright);
  letter-spacing: 1px;
}

.goods-price {
  margin-left: auto;
  color: var(--jade);
  font-weight: bold;
  font-variant-numeric: tabular-nums;

  i {
    color: var(--gold);
    font-size: 11px;
    margin-right: 3px;
  }
}

.goods-stock {
  font-size: 11px;
  color: var(--text-dim);
}

.tip {
  color: var(--text-dim);
  border-top: 1px dashed var(--line-soft);
  padding-top: 6px;
}
</style>
