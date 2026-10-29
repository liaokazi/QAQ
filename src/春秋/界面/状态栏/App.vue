<template>
  <div class="sys-app">
    <TopPanel />

    <CollapseSection title="内政" icon="🌾" index="01" default_open>
      <CivilSection />
    </CollapseSection>

    <CollapseSection title="军政" icon="⚔️" index="02">
      <MilitarySection />
    </CollapseSection>

    <CollapseSection title="制度" icon="🏮" index="03">
      <InstitutionSection />
    </CollapseSection>

    <CollapseSection title="商城" icon="🛒" index="04" :badge="`🪙${store.data.社稷.点数}`">
      <ShopSection />
    </CollapseSection>

    <CollapseSection title="任务" icon="📜" index="05" :badge="store.data.任务.length">
      <QuestSection />
    </CollapseSection>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import CollapseSection from './components/CollapseSection.vue';
import TopPanel from './components/TopPanel.vue';
import CivilSection from './components/CivilSection.vue';
import MilitarySection from './components/MilitarySection.vue';
import InstitutionSection from './components/InstitutionSection.vue';
import ShopSection from './components/ShopSection.vue';
import QuestSection from './components/QuestSection.vue';

const store = useDataStore();
</script>