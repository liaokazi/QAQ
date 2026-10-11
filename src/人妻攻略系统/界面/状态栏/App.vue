<template>
  <div class="sys-app">
    <header class="app-header">
      <div class="app-title">人妻攻略系统</div>
      <div class="app-subtitle">WIFE CONQUEST SYSTEM</div>
    </header>

    <EnvironmentBar />
    <XianErComment />

    <CollapseSection title="主角个人资料" icon="👤" storage_key="protagonist" default_open>
      <ProtagonistSection />
    </CollapseSection>

    <CollapseSection title="人妻攻略" icon="💍" storage_key="renqi" :badge="人妻数量">
      <FemaleSection kind="人妻" />
    </CollapseSection>

    <CollapseSection title="女性朋友" icon="👯" storage_key="female_friends" :badge="女性朋友数量">
      <FemaleSection kind="女性朋友" />
    </CollapseSection>

    <CollapseSection title="背包栏位" icon="🎒" storage_key="inventory">
      <InventorySection />
    </CollapseSection>

    <CollapseSection title="女性心声" icon="💭" storage_key="inner_thoughts">
      <InnerThoughtsSection />
    </CollapseSection>

    <CollapseSection title="色欲商场" icon="🛒" storage_key="shop" :badge="`🪙${store.data.商城.点数}`">
      <ShopSection />
    </CollapseSection>

    <CollapseSection title="任务" icon="📜" storage_key="quests" :badge="store.data.任务.length">
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
}

.app-subtitle {
  font-size: 10px;
  letter-spacing: 3px;
  color: var(--sys-lilac);
  margin-top: 3px;
}
</style>
