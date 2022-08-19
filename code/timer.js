/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({} = {}) {
  await AIScheduleAlert({
    titleText: '重要提示', // 标题内容，字体比较大，不传默认为提示
    contentText: ` 晚课开始时间默认为18:00,
    但具体开始时间请自行确认！
    部分课程可能18:30开始上课！
    `, // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试
    confirmText: '确认', // 确认按钮文字，可不传默认为确认
  })
  const sections = [
    {
      section: 1,
      startTime: '08:00',
      endTime: '08:45',
    },
    {
      section: 2,
      startTime: '08:50',
      endTime: '09:35',
    },
    {
      section: 3,
      startTime: '10:05',
      endTime: '10:50',
    },
    {
      section: 4,
      startTime: '10:55',
      endTime: '11:40',
    },
    {
      section: 5,
      startTime: '13:30',
      endTime: '14:15',
    },
    {
      section: 6,
      startTime: '14:20',
      endTime: '15:05',
    },
    {
      section: 7,
      startTime: '15:35',
      endTime: '16:20',
    },
    {
      section: 8,
      startTime: '16:25',
      endTime: '17:10',
    },
    {
      section: 9,
      startTime: '18:00',
      endTime: '18:45',
    },
    {
      section: 10,
      startTime: '18:55',
      endTime: '19:40',
    },
    {
      section: 11,
      startTime: '19:50',
      endTime: '20:35',
    },
    {
      section: 12,
      startTime: '20:45',
      endTime: '21:30',
    },
  ]
  return {
    totalWeek: 18, // 总周数：[1, 30]之间的整数
    startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: true, // 是否显示周末
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 4, // 晚间课程节数：[0, 10]之间的整数
    sections: sections,
  }
}
