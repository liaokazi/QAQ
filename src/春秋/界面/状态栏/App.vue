<template>
  <div class="sys-app">
    <TopPanel />

    <CollapseSection title="内政" icon="🌾" index="01" default_open>
      <内政Section />
    </CollapseSection>

    <CollapseSection title="军政" icon="⚔️" index="02">
      <军政Section />
    </CollapseSection>

    <CollapseSection title="制度" icon="🏮" index="03">
      <制度Section />
    </CollapseSection>

    <CollapseSection title="商城" icon="🛒" index="04" :badge="`🪙${store.data.社稷.点数}`">
      <商城Section />
    </CollapseSection>

    <CollapseSection title="任务" icon="📜" index="05" :badge="store.data.任务.length">
      <任务Section />
    </CollapseSection>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import CollapseSection from './components/CollapseSection.vue';
import TopPanel from './components/TopPanel.vue';
import 内政Section from './components/内政Section.vue';
import 军政Section from './components/军政Section.vue';
import 制度Section from './components/制度Section.vue';
import 商城Section from './components/商城Section.vue';
import 任务Section from './components/任务Section.vue';

const store = useDataStore();
</script>