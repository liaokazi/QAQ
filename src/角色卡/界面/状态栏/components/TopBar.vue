<template>
  <div class="topbar">
    <!-- 系统标题带 -->
    <div class="brand">
      <span class="brand-line"></span>
      <span class="brand-text">社稷系统</span>
      <span class="brand-line"></span>
    </div>

    <!-- 纪年与时钟 -->
    <div class="row meta-line">
      <span class="era">{{ store.data.世界.纪年 }}</span>
      <span class="season dim">{{ store.data.世界.季节 }} · {{ store.data.世界.节气 }}</span>
      <span class="clock">{{ store.data.世界.时间 }}</span>
    </div>

    <!-- 天气温度外出 -->
    <div class="row meta-line dim weather">
      <span><i class="fa-solid fa-cloud-sun weather-icon"></i>{{ store.data.世界.天气 }}</span>
      <span>{{ store.data.世界.温度 }}℃</span>
      <span class="outing" :class="{ outside: store.data.世界.外出.状态 === '界外' }">
        <i :class="store.data.世界.外出.状态 === '界内' ? 'fa-solid fa-shield-halved' : 'fa-solid fa-person-running'"></i>
        <template v-if="store.data.世界.外出.状态 === '界内'">结界内 · 可外出 {{ 外出上限 }} 日</template>
        <template v-else>结界外 · 剩余 {{ store.data.世界.外出.剩余天数 }}/{{ 外出上限 }} 日</template>
      </span>
    </div>

    <!-- 地点与当前事件 -->
    <div class="info-line">
      <i class="fa-solid fa-location-dot"></i>
      <span>{{ store.data.世界.地点.所在地 }}</span>
    </div>
    <div v-if="store.data.世界.当前事件" class="info-line event">
      <i class="fa-solid fa-scroll"></i>
      <span>{{ store.data.世界.当前事件 }}</span>
    </div>
    <div v-if="store.data.世界.灾异预警 && store.data.世界.灾异预警 !== '无'" class="info-line omen">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <span>{{ store.data.世界.灾异预警 }}</span>
    </div>

    <!-- 仙儿吐槽 -->
    <div class="xianer">
      <span class="xianer-avatar">仙</span>
      <span class="xianer-text">{{ store.data.仙儿.吐槽 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore, 按等级取表 } from '../store';

const store = useDataStore();

const 外出上限 = computed(() => 按等级取表(store.data.社稷.领地等级).外出上限);
</script>

<style lang="scss" scoped>
.topbar {
  position: relative;
  padding: 8px 12px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background:
    radial-gradient(130% 80% at 50% 0%, rgba(200, 160, 74, 0.16), transparent 65%),
    linear-gradient(180deg, rgba(200, 160, 74, 0.09), transparent 80%);

  &::after {
    content: '';
    position: absolute;
    left: 14px;
    right: 14px;
    bottom: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--line), transparent);
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 2px 0 3px;
}

.brand-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--line), transparent);
}

.brand-text {
  color: var(--gold);
  font-size: 11px;
  letter-spacing: 6px;
  text-indent: 6px;
  text-shadow: 0 0 10px rgba(200, 160, 74, 0.5);
}

.meta-line {
  row-gap: 6px;
}

.era {
  color: var(--gold-bright);
  font-weight: bold;
  font-size: 12.5px;
  letter-spacing: 1.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.season {
  font-size: 12px;
}

.clock {
  margin-left: auto;
  font-size: 22px;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
  letter-spacing: 1.5px;
  color: var(--jade);
  text-shadow: 0 0 14px rgba(127, 209, 168, 0.45);
}

.weather {
  font-size: 12px;

  .weather-icon {
    color: var(--gold);
    margin-right: 4px;
  }
}

.outing {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 1px 8px;
  border-radius: 20px;
  border: 1px solid rgba(127, 209, 168, 0.35);
  color: var(--jade);
  background: rgba(127, 209, 168, 0.07);
  font-size: 11.5px;

  &.outside {
    color: #ffb3a2;
    border-color: rgba(224, 138, 122, 0.5);
    background: rgba(224, 138, 122, 0.09);
    font-weight: bold;
    animation: pulse 1.6s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(224, 138, 122, 0);
  }

  50% {
    box-shadow: 0 0 8px rgba(224, 138, 122, 0.45);
  }
}

.info-line {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 11.5px;
  color: var(--text-dim);

  i {
    color: var(--gold);
    margin-top: 3px;
    font-size: 10px;
  }

  &.event {
    color: var(--parchment);
    opacity: 0.85;
  }

  &.omen {
    color: #e8a48e;
  }
}

.xianer {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 7px 10px;
  margin-top: 3px;
  background: rgba(127, 209, 168, 0.07);
  border: 1px solid rgba(127, 209, 168, 0.24);
  border-radius: 11px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 18px;
    top: -5px;
    width: 9px;
    height: 9px;
    background: #223228;
    border-left: 1px solid rgba(127, 209, 168, 0.24);
    border-top: 1px solid rgba(127, 209, 168, 0.24);
    transform: rotate(45deg);
  }
}

.xianer-avatar {
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(145deg, var(--jade), var(--jade-deep));
  color: #10301f;
  font-size: 13px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(127, 209, 168, 0.5);
}

.xianer-text {
  flex: 1;
  font-size: 12.5px;
  color: var(--parchment);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
