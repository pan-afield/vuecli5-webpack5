const appConfig = {
  countries: {
    US: { name: "美国", currency: "$" },
    UK: { name: "英国", currency: "￡" },
    DE: { name: "德国", currency: "€" },
    FR: { name: "法国", currency: "€" },
    IT: { name: "意大利", currency: "€" },
    ES: { name: "西班牙", currency: "€" },
  },
  timeZone: {
    "Asia/Shanghai": "北京、珀斯、新加坡、香港、台北",
    "US/Hawaii": "夏威夷标准时间",
    "US/Alaska": "阿拉斯加标准时间",
    "America/Los_Angeles": "太平洋标准时间",
    "America/Denver": "山地标准时间",
    "America/Chicago": "中部标准时间",
    "America/New_York": "东部标准时间",
    "Europe/London": "格林威治时间",
    "Europe/Paris": "欧洲中部时间",
  },
};

export default {
  ...appConfig,
};
