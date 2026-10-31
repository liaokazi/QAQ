<template>
  <div class="clan-card" :class="`tend-${倾向色}`">
    <button class="clan-head" type="button" @click="open = !open">
      <span class="clan-name">{{ 氏 }}氏</span>
      <span class="clan-leader dim">族长 {{ clan.族长 }}</span>
      <div class="bar mini">
        <div :style="{ width: `${_.clamp(clan.实力, 0, 100)}%` }"></div>
      </div>
      <span class="dim small power-num">{{ clan.实力 }}</span>
      <span class="tendency" :class="倾向色">{{ clan.倾向 }}</span>
      <span v-if="clan.是否关注" class="star">⭐</span>
      <i :class="open ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'" class="chevron"></i>
    </button>

    <div v-if="open" class="clan-detail">
      <div class="row dim small">
        <span>族长 {{ clan.族长 }} · {{ clan.族长年龄 }}岁</span>
        <span class="rel">{{ clan.关系 }}</span>
      </div>
      <div class="dim small">继承人：{{ clan.继承人 }}（{{ clan.继承人嫡庶 }}·{{ clan.继承人年龄 }}岁）</div>
      <div v-if="!_.isEmpty(clan.直系亲属)" class="dim small">
        直系：
        <span v-for="(f, name) in clan.直系亲属" :key="name" class="relative">
          {{ name }}（{{ f.身份 }}·{{ f.年龄 }}岁）
        </span>
      </div>
      <div class="dim small">
        人丁 <b class="num">{{ clan.人丁 }}</b> · 族兵 <b class="num">{{ clan.族兵 }}</b> · 族产 <b class="num">{{ clan.族产 }}</b> 亩
      </div>
      <div class="dim small">族史：{{ clan.族史 }}</div>
      <div v-if="clan.俊才" class="dim small talent">俊才：{{ clan.俊才 }}</div>
      <div v-if="clan.最近动向" class="dim small recent">近况：{{ clan.最近动向 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';

const props = defineProps<{ 氏: string; clan: Record<string, any> }>();
const open = ref(false);

const 倾向色 = computed(() => {
  switch (props.clan.倾向) {
    case '拥戴':
      return 'green';
    case '敌对':
      return 'red';
    case '离心':
      return 'orange';
    default:
      return 'gray';
  }
});
</script>

<style lang="scss" scoped>
.clan-card {
  border: 1px solid var(--line-soft);
  border-left: 3px solid var(--text-dim);
  border-radius: 10px;
  overflow: hidden;
  background: rgba(236, 224, 194, 0.04);
  transition: border-color 0.25s ease;

  &.tend-green {
    border-left-color: var(--jade);
  }

  &.tend-red {
    border-left-color: var(--cinnabar);
  }

  &.tend-orange {
    border-left-color: #e0b04a;
  }
}

.clan-head {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: var(--parchment);
  font-family: inherit;
  font-size: 13px;
  cursor: pointer;
  text-align: left;

  &:active {
    background: rgba(255, 255, 255, 0.04);
  }
}

.clan-name {
  font-weight: bold;
  color: var(--gold-bright);
  letter-spacing: 1px;
  white-space: nowrap;
}

.clan-leader {
  white-space: nowrap;
  font-size: 12px;
}

.mini {
  flex: 1;
  min-width: 30px;
}

.power-num {
  font-variant-numeric: tabular-nums;
}

.tendency {
  font-size: 11px;
  white-space: nowrap;
  padding: 0 6px;
  border-radius: 3px;

  &.green {
    color: var(--jade);
    background: rgba(127, 209, 168, 0.1);
  }

  &.red {
    color: #ffb3a2;
    background: rgba(224, 138, 122, 0.1);
  }

  &.orange {
    color: #e0b04a;
    background: rgba(224, 176, 74, 0.1);
  }

  &.gray {
    color: var(--text-dim);
    background: rgba(236, 224, 194, 0.06);
  }
}

.star {
  font-size: 11px;
}

.chevron {
  color: var(--text-dim);
  font-size: 11px;
  transition: transform 0.25s ease;
}

.clan-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px 9px;
  border-top: 1px dashed var(--line-soft);
  background: rgba(0, 0, 0, 0.16);
}

.rel {
  color: var(--gold-bright);
}

.relative {
  margin-right: 7px;
}

.num {
  color: var(--parchment);
  font-variant-numeric: tabular-nums;
}

.talent {
  color: var(--gold-bright);
}

.recent {
  color: var(--jade);
}
</style>
