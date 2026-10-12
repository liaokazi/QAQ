<template>
  <div class="sys-app">
    <header class="app-header">
      <div class="app-title">人妻攻略系统</div>
      <div class="app-subtitle">WIFE CONQUEST SYSTEM</div>
    </header>

    <EnvironmentBar />
    <XianErComment />

    <CollapseSection title="主角个人资料" icon="👤" storage_key="protagonist" index="01">
      <ProtagonistSection />
    </CollapseSection>

    <CollapseSection title="人妻攻略" icon="💍" storage_key="renqi" index="02" :badge="人妻数量" badge_color="pink">
      <FemaleSection kind="人妻" />
    </CollapseSection>

    <CollapseSection title="女性朋友" icon="👯" storage_key="female_friends" index="03" :badge="女性朋友数量" badge_color="violet">
      <FemaleSection kind="女性朋友" />
    </CollapseSection>

    <CollapseSection title="背包栏位" icon="🎒" storage_key="inventory" index="04" :badge="背包数量" badge_color="gold">
      <InventorySection />
    </CollapseSection>

    <CollapseSection title="女性心声" icon="💭" storage_key="inner_thoughts" index="05" :badge="女性心声数量" badge_color="violet">
      <InnerThoughtsSection />
    </CollapseSection>

    <CollapseSection title="色欲商场" icon="🛒" storage_key="shop" index="06" :badge="`🪙${store.data.商城.点数}`" badge_color="green">
      <ShopSection />
    </CollapseSection>

    <CollapseSection title="任务" icon="📜" storage_key="quests" index="07" :badge="store.data.任务.length" badge_color="pink">
      <QuestSection />
    </CollapseSection>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import CollapseSection from './components/CollapseSection.vue';
import EnvironmentBar from './components/EnvironmentBar.vue';
import FemaleSection from './components/FemaleSection.vue';
import InnerThoughtsSection from './components/InnerThoughtsSection.vue';
import InventorySection from './components/InventorySection.vue';
import ProtagonistSection from './components/ProtagonistSection.vue';
import QuestSection from './components/QuestSection.vue';
import ShopSection from './components/ShopSection.vue';
import XianErComment from './components/XianErComment.vue';

const store = useDataStore();

const 人妻数量 = computed(() => _.keys(store.data.人妻).length);
const 女性朋友数量 = computed(() => _.keys(store.data.女性朋友).length);
const 背包数量 = computed(
  () => _.keys(store.data.背包.随身物品).length + _.keys(store.data.背包.女性战利品).length,
);
const 女性心声数量 = computed(() => _.keys(store.data.女性心声).length);
</script>

<style lang="scss" scoped>
.app-header {
  padding: 14px 16px 12px;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 45, 120, 0.35), rgba(181, 108, 255, 0.3));
  border-bottom: 1px solid var(--sys-border);
}

.app-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 4px;
  color: #fff;
  text-shadow:
    0 0 10px rgba(255, 45, 120, 0.9),
    0 0 24px rgba(181, 108, 255, 0.7);
  animation: title-breathe 3s ease-in-out infinite;
}

@keyframes title-breathe {
  0%,
  100% {
    text-shadow:
      0 0 10px rgba(255, 45, 120, 0.9),
      0 0 24px rgba(181, 108, 255, 0.7);
  }

  50% {
    text-shadow:
      0 0 16px rgba(255, 45, 120, 1),
      0 0 36px rgba(181, 108, 255, 0.95),
      0 0 52px rgba(255, 95, 162, 0.6);
  }
}

.app-subtitle {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--sys-lilac);
  margin-top: 3px;
}
</style>
