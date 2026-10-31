export const Schema = z.object({
  世界: z.object({
    纪年: z.string(),
    季节: z.enum(['春', '夏', '秋', '冬']),
    节气: z.string(),
    月: z.coerce.number(),
    日: z.coerce.number(),
    时间: z.string(),
    天气: z.string(),
    温度: z.coerce.number(),
    地点: z.object({
      大区: z.string(),
      小区: z.string(),
      所在地: z.string(),
    }),
    当前事件: z.string(),
    灾异预警: z.string(),
    外出: z.object({
      状态: z.enum(['界内', '界外']),
      剩余天数: z.coerce.number(),
    }),
  }),

  仙儿: z.object({
    吐槽: z.string(),
    当前指引: z.string(),
  }),

  主角: z.object({
    姓名: z.string(),
    年龄: z.coerce.number(),
    身份: z.string(),
    当前状态: z.string(),
    当前姿势: z.string(),
    衣着: z.string(),
    系统背包: z.record(
      z.string().describe('物品名'),
      z.object({
        描述: z.string(),
        数量: z.coerce.number(),
      }),
    ),
    妻妾: z.record(
      z.string().describe('妻妾名'),
      z.object({
        年龄: z.coerce.number(),
        身份: z.string(),
        感情: z.string(),
        生育: z.record(
          z.string().describe('子女名'),
          z.object({
            年龄: z.coerce.number(),
            性别: z.string(),
            嫡庶: z.string(),
          }),
        ),
      }),
    ),
  }),

  社稷: z.object({
    领地等级: z.coerce.number(),
    领域半径: z.coerce.number(),
    经验: z.coerce.number(),
    升级所需: z.coerce.number(),
    点数: z.coerce.number(),
  }),

  人口: z.object({
    总数: z.coerce.number(),
    劳力: z.coerce.number(),
    老幼: z.coerce.number(),
    国人: z.coerce.number(),
    野人: z.coerce.number(),
    奴隶: z.coerce.number(),
    流民: z.coerce.number(),
    民心: z.coerce.number().transform(value => _.clamp(value, 0, 100)),
  }),

  资源: z.object({
    粮食: z.coerce.number(),
    木材: z.coerce.number(),
    石料: z.coerce.number(),
    铜: z.coerce.number(),
    铁: z.coerce.number(),
    盐: z.coerce.number(),
    丝: z.coerce.number(),
    牲畜: z.coerce.number(),
  }),

  田亩: z.object({
    垦田总数: z.coerce.number(),
    井田亩数: z.coerce.number(),
    私田亩数: z.coerce.number(),
    水利: z.string(),
    农时: z.string(),
    收成预期: z.string(),
  }),

  建筑: z.object({
    常制: z.record(
      z.string().describe('建筑名'),
      z.object({
        数量: z.coerce.number(),
        等级: z.coerce.number(),
        效果: z.string(),
        进度: z.coerce.number(),
      }),
    ),
    特殊: z.record(
      z.string().describe('特殊建筑名'),
      z.object({
        数量: z.coerce.number(),
        等级: z.coerce.number(),
        效果: z.string(),
        进度: z.coerce.number(),
      }),
    ),
  }),

  法律: z.object({
    法度状态: z.string(),
    司法: z.string(),
    已颁律令: z.record(
      z.string().describe('律令名'),
      z.object({
        条文: z.string(),
        效果: z.string(),
      }),
    ),
  }),

  军事: z.object({
    战车: z.coerce.number(),
    甲士: z.coerce.number(),
    徒兵: z.coerce.number(),
    训练度: z.string(),
    士气: z.string(),
    军粮: z.string(),
    将领: z.record(
      z.string().describe('将领名'),
      z.object({
        专长: z.string(),
        忠心: z.coerce.number().transform(value => _.clamp(value, 0, 100)),
      }),
    ),
  }),

  宗族: z.object({
    本宗: z.object({
      氏: z.string().nullable(),
      等级: z.coerce.number(),
      宗庙等级: z.coerce.number(),
      族谱: z.record(
        z.string().describe('族人名'),
        z.object({
          关系: z.string(),
          年龄: z.coerce.number(),
          身份: z.string(),
          存殁: z.string(),
        }),
      ),
    }),
    诸宗: z.record(
      z.string().describe('宗族氏'),
      z.object({
        族长: z.string(),
        族长年龄: z.coerce.number(),
        继承人: z.string(),
        继承人年龄: z.coerce.number(),
        继承人嫡庶: z.string(),
        直系亲属: z.record(
          z.string().describe('亲属名'),
          z.object({
            年龄: z.coerce.number(),
            身份: z.string(),
            备注: z.string(),
          }),
        ),
        人丁: z.coerce.number(),
        族兵: z.coerce.number(),
        族产: z.coerce.number(),
        实力: z.coerce.number(),
        倾向: z.string(),
        关系: z.string(),
        族史: z.string(),
        俊才: z.string(),
        是否关注: z.boolean(),
        最近动向: z.string(),
      }),
    ),
    灭亡: z.record(
      z.string().describe('灭亡宗族氏'),
      z.object({
        来历: z.string(),
        亡因: z.string(),
        始族: z.object({
          名: z.string(),
          介绍: z.string(),
        }),
        末主: z.object({
          名: z.string(),
          介绍: z.string(),
        }),
        遗民: z.coerce.number(),
        族田: z.coerce.number(),
      }),
    ),
    动态: z.array(z.string()),
  }),

  外交: z.object({
    邻国: z.record(
      z.string().describe('国名'),
      z.object({
        关系: z.string(),
        动向: z.string(),
      }),
    ),
    会盟: z.string(),
    纳贡: z.string(),
    受命进度: z.string(),
  }),

  情报: z.object({
    周边动态: z.string(),
    在野人物: z.record(z.string(), z.string()),
    大事记: z.array(z.string()),
    天下大事: z.object({
      头条: z.string(),
      本土宗族活跃: z.array(z.string()),
    }),
  }),

  名分: z.object({
    身份等级: z.string(),
    受命状态: z.string(),
    礼器规格: z.string(),
    舆服规格: z.string(),
  }),

  商城: z.object({
    上架商品: z.record(
      z.string().describe('商品名'),
      z.object({
        价格: z.coerce.number(),
        描述: z.string(),
        数量: z.coerce.number(),
      }),
    ),
  }),

  任务: z.record(
    z.string().describe('任务名'),
    z.object({
      描述: z.string(),
      进度: z.string(),
      状态: z.string(),
      奖励点数: z.coerce.number(),
      奖励经验: z.coerce.number(),
    }),
  ),
});
export type Schema = z.output<typeof Schema>;
