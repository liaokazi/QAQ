const 穿着 = {
  衣服: z.string().default(''),
  内衣: z.string().default(''),
  裤子: z.string().default(''),
  内裤: z.string().default(''),
  袜子: z.string().default(''),
  鞋子: z.string().default(''),
  配饰装饰: z.string().default(''),
};

const 私密部位 = {
  形状: z.string().default(''),
  当前状态: z.string().default(''),
};

const 私密 = {
  奶子: z.object(私密部位).prefault({}),
  阴毛: z.object(私密部位).prefault({}),
  小穴: z.object(私密部位).prefault({}),
  肛门: z.object(私密部位).prefault({}),
};

const 怀孕 = {
  子宫: z
    .object({
      状态: z.string().default(''),
      标注: z.string().default(''),
    })
    .prefault({}),
  生理周期: z
    .object({
      周期: z.string().default(''), // 危险期 / 安全期 / 排卵期 / 月经期
      说明: z.string().default(''), // 周期细节，如「月经刚结束第三天，距排卵还有约五天」
    })
    .prefault({}),
  怀孕状态: z
    .object({
      孕周: z.coerce.number().default(0), // 未怀孕为 0
      胎儿健康: z.string().default(''),
      生父: z.string().default(''), // 未怀孕填「无」
    })
    .prefault({}),
  产后恢复: z
    .object({
      泌乳: z.string().default(''), // 乳房是否泌乳、奶水量
      产道恢复度: z.string().default(''), // 产后产道恢复程度
    })
    .prefault({}),
  精液残留: z
    .object({
      最近内射者: z.string().default(''),
      残留位置: z.string().default(''), // 子宫内 / 阴道内 / 体外等
      残留量: z.string().default(''),
      距上次内射时间: z.string().default(''),
    })
    .prefault({}),
  NTR心理: z
    .object({
      对丈夫的愧疚: z.string().default(''),
      对主角的沉沦: z.string().default(''),
      内心挣扎: z.string().default(''),
    })
    .prefault({}),
  内射次数: z.coerce.number().default(0),
  子女血脉: z
    .array(
      z
        .object({
          姓名: z.string().default(''),
          年龄: z.coerce.number().default(0),
          亲生父亲: z.string().default(''),
        })
        .prefault({}),
    )
    .default([]),
};

// 人妻与女性朋友共用的基础字段
const 女性基础 = {
  年龄: z.coerce.number().default(0),
  身高: z.string().default(''),
  当前状态: z.string().default(''),
  当前姿势: z.string().default(''),
  生日: z.string().default(''),
  详细当前面貌: z.string().default(''),
  详细性格: z.string().default(''),
  穿着: z.object(穿着).prefault({}),
  私密: z.object(私密).prefault({}),
  怀孕: z.object(怀孕).prefault({}),
};

export const Schema = z.object({
  世界: z
    .object({
      地点: z
        .object({
          大区: z.string().default(''),
          小区: z.string().default(''),
          所在地: z.string().default(''),
        })
        .prefault({}),
      当前时间: z.string().default(''),
      天气: z
        .object({
          天气: z.string().default(''),
          温度: z.string().default(''),
        })
        .prefault({}),
      节假日: z
        .array(
          z
            .object({
              名称: z.string().default(''),
              日期: z.string().default(''),
              简介: z.string().default(''),
              放假天数: z.string().default(''),
            })
            .prefault({}),
        )
        .default([]),
    })
    .prefault({}),

  仙儿: z
    .object({
      吐槽: z.string().default(''),
    })
    .prefault({}),

  主角: z
    .object({
      姓名: z.string().default(''),
      年龄: z.coerce.number().default(0),
      生日: z.string().default(''),
      身高: z.string().default(''),
      肉棒尺寸: z.string().default(''),
      当前姿势: z.string().default(''),
      衣着: z.string().default(''),
      天赋: z
        .array(
          z
            .object({
              名称: z.string().default(''),
              介绍: z.string().default(''),
            })
            .prefault({}),
        )
        .default([]),
    })
    .prefault({}),

  人妻: z
    .record(
      z.string(),
      z
        .object({
          ...女性基础,
          丈夫名字: z.string().default(''),
        })
        .prefault({}),
    )
    .default({}),

  女性朋友: z
    .record(
      z.string(),
      z
        .object({
          ...女性基础,
          男朋友: z.string().default(''),
        })
        .prefault({}),
    )
    .default({}),

  背包: z
    .object({
      随身物品: z
        .record(
          z.string(),
          z
            .object({
              描述: z.string().default(''),
              数量: z.coerce.number().default(1),
            })
            .prefault({}),
        )
        .default({}),
      女性战利品: z
        .record(
          z.string(),
          z
            .object({
              描述: z.string().default(''),
              谁的: z.string().default(''),
              当前状态: z.string().default(''),
            })
            .prefault({}),
        )
        .default({}),
    })
    .prefault({}),

  女性心声: z.record(z.string(), z.string()).default({}),

  商城: z
    .object({
      点数: z.coerce.number().default(0),
      道具: z
        .record(
          z.string(),
          z
            .object({
              描述: z.string().default(''),
              价格: z.coerce.number().default(0),
              效果: z.string().default(''),
            })
            .prefault({}),
        )
        .default({}),
    })
    .prefault({}),

  任务: z
    .array(
      z
        .object({
          名称: z.string().default(''),
          描述: z.string().default(''),
          点数: z.coerce.number().default(0),
        })
        .prefault({}),
    )
    .default([]),
});

export type Schema = z.output<typeof Schema>;

// 女性攻略目标（人妻 / 女性朋友）的资料类型，供界面组件使用
export type 女性资料 = {
  年龄: number;
  身高: string;
  当前状态: string;
  当前姿势: string;
  生日: string;
  丈夫名字?: string;
  男朋友?: string;
  详细当前面貌: string;
  详细性格: string;
  穿着: Record<string, string>;
  私密: Record<string, { 形状: string; 当前状态: string }>;
  怀孕: {
    子宫: { 状态: string; 标注: string };
    生理周期: { 周期: string; 说明: string };
    怀孕状态: { 孕周: number; 胎儿健康: string; 生父: string };
    产后恢复: { 泌乳: string; 产道恢复度: string };
    精液残留: { 最近内射者: string; 残留位置: string; 残留量: string; 距上次内射时间: string };
    NTR心理: { 对丈夫的愧疚: string; 对主角的沉沦: string; 内心挣扎: string };
    内射次数: number;
    子女血脉: { 姓名: string; 年龄: number; 亲生父亲: string }[];
  };
};
