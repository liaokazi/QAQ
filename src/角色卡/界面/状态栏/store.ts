import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

export const useDataStore = defineMvuDataStore(Schema, { type: 'message', message_id: getCurrentMessageId() });

/** 等级对照表: 称号 / 领域半径(里) / 外出上限(日) / 升到下一级所需经验(封顶为 -1) */
export const 等级表 = [
  { 等级: 1, 称号: '废邑野人', 半径: 1, 外出上限: 0, 升级所需: 300 },
  { 等级: 2, 称号: '聚落之主', 半径: 2, 外出上限: 0, 升级所需: 600 },
  { 等级: 3, 称号: '立社之民', 半径: 3, 外出上限: 1, 升级所需: 1200 },
  { 等级: 4, 称号: '邑大夫', 半径: 5, 外出上限: 3, 升级所需: 2400 },
  { 等级: 5, 称号: '城邑之主', 半径: 8, 外出上限: 5, 升级所需: 4800 },
  { 等级: 6, 称号: '都之君', 半径: 12, 外出上限: 8, 升级所需: 9000 },
  { 等级: 7, 称号: '千乘之基', 半径: 18, 外出上限: 12, 升级所需: 16000 },
  { 等级: 8, 称号: '受命之卿', 半径: 25, 外出上限: 17, 升级所需: 30000 },
  { 等级: 9, 称号: '邦国之君', 半径: 35, 外出上限: 22, 升级所需: 55000 },
  { 等级: 10, 称号: '百里之君', 半径: 50, 外出上限: 30, 升级所需: -1 },
];

export function 按等级取表(等级: number) {
  return 等级表[_.clamp(等级, 1, 10) - 1];
}

/** 结界增益随等级: 沃土/筑速/安民/愈疾 (%) */
export function 按等级取增益(等级: number) {
  const lv = _.clamp(等级, 1, 10);
  const step = (lv - 1) / 9;
  return {
    沃土: Math.round(30 + step * 50),
    筑速: Math.round(20 + step * 25),
    安民: Math.round(20 + step * 30),
    愈疾: Math.round(30 + step * 30),
  };
}
