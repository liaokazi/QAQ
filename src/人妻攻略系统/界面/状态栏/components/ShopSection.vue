<template>
  <div>
    <div class="points">
      <span class="points-label">🪙 系统点数</span>
      <span class="points-value">{{ store.data.商城.点数 }}</span>
    </div>

    <div class="sec-title">🧪 商城道具</div>
    <div v-if="道具为空" class="empty">商城暂未上架道具</div>
    <div v-for="(item, name) in store.data.商城.道具" :key="name" class="shop-row">
      <div class="shop-head">
        <span class="shop-name">{{ name }}</span>
        <span class="shop-price">🪙 {{ item.价格 }}</span>
      </div>
      <div class="shop-desc">{{ item.描述 }}</div>
      <div class="shop-effect">{{ item.效果 }}</div>
      <div class="shop-actions">
        <button class="buy-btn" type="button" :disabled="store.data.商城.点数 < item.价格" @click="购买(name, item)">
          购买
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();
const 道具为空 = computed(() => _.isEmpty(store.data.商城.道具));

function 购买(name: string, item: { 描述: string; 价格: number; 效果: string }) {
  if (store.data.商城.点数 < item.价格) {
    if (typeof toastr !== 'undefined') toastr.warning(`点数不足，还差 ${item.价格 - store.data.商城.点数} 点`);
    return;
  }
  store.data.商城.点数 -= item.价格;
  const 已有 = store.data.背包.随身物品[name];
  if (已有) {
    已有.数量 += 1;
  } else {
    store.data.背包.随身物品[name] = { 描述: item.描述, 数量: 1 };
  }
  delete store.data.商城.道具[name];
  if (typeof toastr !== 'undefined') toastr.success(`已购买「${name}」，花费 ${item.价格} 点数`);
  errorCatched(() => {
    void createChatMessages(
      [{ role: 'user', message: `（宁懂在色欲商城中兑换了「${name}」，点数 -${item.价格}，道具已放入背包）` }],
      { insert_before: 'end' },
    );
  })();
}
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

.shop-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}

.buy-btn {
  background: linear-gradient(90deg, var(--sys-pink-deep), var(--sys-violet));
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 3px 14px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: filter 0.15s;
}

.buy-btn:hover:not(:disabled) {
  filter: brightness(1.2);
}

.buy-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
