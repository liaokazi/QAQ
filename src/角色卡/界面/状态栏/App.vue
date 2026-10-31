<template>
  <div class="panel">
    <TopBar />

    <CollapsibleSection title="主角" icon="fa-user">
      <Panel主角 />
    </CollapsibleSection>

    <CollapsibleSection title="内政" icon="fa-landmark">
      <Panel内政 />
    </CollapsibleSection>

    <CollapsibleSection title="军事" icon="fa-chess-rook">
      <Panel军事 />
    </CollapsibleSection>

    <CollapsibleSection title="宗族" icon="fa-people-roof">
      <Panel宗族 />
    </CollapsibleSection>

    <CollapsibleSection title="商城" icon="fa-store">
      <Panel商城 />
    </CollapsibleSection>

    <CollapsibleSection title="任务" icon="fa-list-check">
      <Panel任务 />
    </CollapsibleSection>
  </div>
</template>

<script setup lang="ts">
import CollapsibleSection from './components/CollapsibleSection.vue';
import Panel主角 from './components/Panel主角.vue';
import Panel内政 from './components/Panel内政.vue';
import Panel军事 from './components/Panel军事.vue';
import Panel宗族 from './components/Panel宗族.vue';
import Panel商城 from './components/Panel商城.vue';
import Panel任务 from './components/Panel任务.vue';
import TopBar from './components/TopBar.vue';
</script>
