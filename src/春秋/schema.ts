export const Schema = z.object({
  世界: z
    .object({
      纪年: z.string().default(''),
      季节: z.string().default(''),
      节气: z.string().default(''),
      天气: z.string().default(''),
      地点: z
        .object({
          大区: z.string().default(''),
          小区: z.string().default(''),
          所在地: z.string().default(''),
        })
        .prefault({}),
      当前事件: z.string().default(''),
      灾异预警: z.string().default(''),
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
      身份: z.string().default(''),
      当前状态: z.string().default(''),
      当前姿势: z.string().default(''),
      衣着: z.string().default(''),
    })
    .prefault({}),

  社稷: z
    .object({
      领地等级: z.coerce.number().default(1),
      领地半径: z.coerce.number().default(1),
      经验值: z.coerce.number().default(0),
      升级所需: z.coerce.number().default(100),
      点数: z.coerce.number().default(0),
      域内外: z.string().default('域内'),
      外出剩余: z.string().default(''),
    })
    .prefault({}),

  人口: z
    .object({
      男丁: z.coerce.number().default(0),
      女口: z.coerce.number().default(0),
      老: z.coerce.number().default(0),
      少: z.coerce.number().default(0),
      幼: z.coerce.number().default(0),
      奴隶: z.coerce.number().default(0),
      国人: z.coerce.number().default(0),
      野人: z.coerce.number().default(0),
      工匠: z.coerce.number().default(0),
      士: z.coerce.number().default(0),
      流民: z.coerce.number().default(0),
    })
    .prefault({}),

  资源: z
    .object({
      食物: z.record(z.string(), z.coerce.number()).default({}),
      武器: z.record(z.string(), z.coerce.number()).default({}),
      各种: z.record(z.string(), z.coerce.number()).default({}),
    })
    .prefault({}),

  田亩: z
    .object({
      垦田总数: z.coerce.number().default(0),
      井田亩数: z.coerce.number().default(0),
      私田亩数: z.coerce.number().default(0),
      水利: z.string().default(''),
      农时: z.string().default(''),
      收成预期: z.string().default(''),
      荒情: z.string().default(''),
    })
    .prefault({}),

  建筑: z
    .record(
      z.string(),
      z
        .object({
          等级: z.coerce.number().default(1),
          位置: z.string().default(''),
          状态: z.string().default(''),
          功能: z.string().default(''),
        })
        .prefault({}),
    )
    .default({}),

  军事: z
    .object({
      战车: z.coerce.number().default(0),
      甲士: z.coerce.number().default(0),
      徒兵: z.coerce.number().default(0),
      训练度: z.string().default(''),
      士气: z.string().default(''),
      军粮: z.string().default(''),
      将领: z
        .record(
          z.string(),
          z
            .object({
              职位: z.string().default(''),
            })
            .prefault({}),
        )
        .default({}),
    })
    .prefault({}),

  外交: z
    .object({
      邻国: z
        .record(
          z.string(),
          z
            .object({
              关系: z.string().default(''),
              态度: z.string().default(''),
              使节: z.string().default(''),
            })
            .prefault({}),
        )
        .default({}),
      会盟: z.string().default(''),
      纳贡: z.string().default(''),
      受命进度: z.string().default(''),
    })
    .prefault({}),

  情报: z
    .object({
      周边动态: z.string().default(''),
      在野人物: z
        .record(
          z.string(),
          z
            .object({
              身份: z.string().default(''),
              所在地: z.string().default(''),
              才能: z.string().default(''),
            })
            .prefault({}),
        )
        .default({}),
      大事记: z.string().default(''),
    })
    .prefault({}),

  宗族: z
    .object({
      追踪: z.array(z.string()).default([]),
      族: z
        .record(
          z.string(),
          z
            .object({
              口数: z.coerce.number().default(0),
              族长: z.string().default(''),
              宗子: z.string().default(''),
              嫡庶: z.string().default(''),
              凝聚力: z.string().default(''),
              状态: z.string().default(''),
              重要族人: z
                .record(
                  z.string(),
                  z
                    .object({
                      职责: z.string().default(''),
                      才能: z.string().default(''),
                      忠诚: z.string().default(''),
                      关系: z.string().default(''),
                    })
                    .prefault({}),
                )
                .default({}),
              联姻: z.string().default(''),
              祭祀: z.string().default(''),
              加成: z.string().default(''),
              隐患: z.string().default(''),
            })
            .prefault({}),
        )
        .default({}),
      亡族: z
        .record(
          z.string(),
          z
            .object({
              起源: z.string().default(''),
              灭亡: z.string().default(''),
              存在时间: z.string().default(''),
            })
            .prefault({}),
        )
        .default({}),
    })
    .prefault({}),

  法度: z
    .object({
      状态: z.string().default(''),
      法令: z.record(z.string(), z.string()).default({}),
      司法: z.string().default(''),
    })
    .prefault({}),

  名分: z
    .object({
      身份等级: z.string().default(''),
      受命状态: z.string().default(''),
      礼器规格: z.string().default(''),
      舆服规格: z.string().default(''),
    })
    .prefault({}),

  商城: z
    .object({
      上架商品: z
        .record(
          z.string(),
          z
            .object({
              数量: z.coerce.number().default(1),
              档位: z.string().default(''),
              点数: z.coerce.number().default(0),
              理由: z.string().default(''),
            })
            .prefault({}),
        )
        .default({}),
      库存: z
        .record(
          z.string(),
          z
            .object({
              数量: z.coerce.number().default(1),
              档位: z.string().default(''),
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
          进度: z.string().default(''),
          状态: z.string().default('进行中'),
          奖励点数: z.coerce.number().default(0),
          奖励经验: z.coerce.number().default(0),
        })
        .prefault({}),
    )
    .default([]),
});

export type Schema = z.output<typeof Schema>;