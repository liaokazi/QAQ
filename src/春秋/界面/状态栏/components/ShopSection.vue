<template>
  <div>
    <div class="points">
      <span class="points-label">🪙 点数</span>
      <span class="points-value">{{ store.data.社稷.点数 }}</span>
    </div>

    <div class="sec-title">🧺 上架商品（跟随正文动态生成）</div>
    <div v-if="!上架商品.length" class="empty">商城暂未上架商品</div>
    <div v-for="(item, name) in 上架商品" :key="name" class="shop-row">
      <div class="shop-head">
        <span class="shop-name">{{ name }}</span>
        <span class="shop-tier" :class="档位类(item.档位)">{{ item.档位 }}</span>
      </div>
      <div class="shop-quantity">数量 ×{{ item.数量 }}</div>
      <div v-if="item.理由" class="shop-reason">{{ item.理由 }}</div>
      <div class="shop-actions">
        <span class="shop-price">🪙 {{ item.点数 }}</span>
        <button class="buy-btn" type="button" :disabled="store.data.社稷.点数 < item.点数" @click="购买(name, item)">
          购买
        </button>
      </div>
    </div>

    <div class="sec-title">📦 库存</div>
    <div v-if="!库存.length" class="empty">暂无库存</div>
    <div v-for="(item, name) in 库存" :key="name" class="stock-row">
      <span class="stock-name">{{ name }}</span>
      <span class="stock-tier" :class="档位类(item.档位)">{{ item.档位 }}</span>
      <span class="stock-qty">×{{ item.数量 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const 上架商品 = computed(() => Object.entries(store.data.商城.上架商品));
const 库存 = computed(() => Object.entries(store.data.商城.库存));

function 档位类(档位: string) {
  if (档位 === '春秋') return 'tier-spring';
  if (档位 === '近代') return 'tier-modern';
  return 'tier-contemporary';
}

function 购买(name: string, item: { 数量: number; 档位: string; 点数: number; 理由: string }) {
  if (store.data.社稷.点数 < item.点数) {
    if (typeof toastr !== 'undefined') toastr.warning(`点数不足，还差 ${item.点数 - store.data.社稷.点数} 点`);
    return;
  }
  store.data.社稷.点数 -= item.点数;
  const 已有 = store.data.商城.库存[name];
  if (已有) {
    已有.数量 += item.数量;
  } else {
    store.data.商城.库存[name] = { 数量: item.数量, 档位: item.档位 };
  }
  delete store.data.商城.上架商品[name];
  if (typeof toastr !== 'undefined') toastr.success(`已购买「${name}」×${item.数量}，花费 ${item.点数} 点数`);
  errorCatched(() => {
    void createChatMessages(
      [{ role: 'user', message: `（主角在商城里兑换了「${name}」×${item.数量}，花费点数 ${item.点数}，已放入库存）` }],
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
  background: linear-gradient(90deg, rgba(230, 192, 122, 0.14), rgba(205, 155, 90, 0.08));
  border: 1px solid rgba(230, 192, 122, 0.5);
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
  text-shadow: 0 0 10px rgba(230, 192, 122, 0.7);
}

.shop-row {
  background: var(--sys-panel);
  border: 1px solid rgba(205, 155, 90, 0.3);
  border-radius: 10px;
  padding: 8px 10px;
  margin-bottom: 6px;
}

.shop-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 3px;
}

.shop-name {
  font-weight: 700;
  color: var(--sys-text);
}

.shop-tier {
  font-size: 11px;
  padding: 0 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.tier-spring {
  color: var(--sys-green);
  border: 1px solid var(--sys-green);
}

.tier-modern {
  color: var(--sys-bronze);
  border: 1px solid var(--sys-bronze);
}

.tier-contemporary {
  color: var(--sys-cinnabar);
  border: 1px solid var(--sys-cinnabar);
}

.shop-quantity {
  color: var(--sys-gold);
  font-size: 12px;
}

.shop-reason {
  color: var(--sys-text-dim);
  font-size: 12px;
  margin-top: 2px;
}

.shop-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 4px;
}

.shop-price {
  color: var(--sys-gold);
  font-weight: 700;
  font-size: 13px;
}

.buy-btn {
  background: linear-gradient(90deg, var(--sys-bronze), var(--sys-gold));
  color: #2a1c08;
  border: none;
  border-radius: 999px;
  padding: 3px 16px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: filter 0.15s;
}

.buy-btn:hover:not(:disabled) {
  filter: brightness(1.12);
}

.buy-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.stock-row {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px dashed rgba(205, 155, 90, 0.18);
  padding: 4px 0;
  font-size: 13px;
}

.stock-name {
  flex: 1;
  color: var(--sys-text);
}

.stock-tier {
  font-size: 11px;
  padding: 0 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.stock-qty {
  color: var(--sys-gold);
  font-weight: 700;
}
</style>
