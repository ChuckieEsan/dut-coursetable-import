async function scheduleHtmlProvider(
  iframeContent = '',
  frameContent = '',
  dom = document
) {
  await loadTool('AIScheduleTools')

  await AIScheduleAlert({
    titleText: '导入流程', // 标题内容，字体比较大，不传默认为提示
    contentText: 
    `请确保当前处于校园门户首页后再开始导入！
    若导入出错请发邮件至 liuchenyu222@163.com

    若对前端技术感兴趣，欢迎加入
    校团委比特网络工作室、
    校融媒体中心技术部
    `, // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试
    confirmText: '确认', // 确认按钮文字，可不传默认为确认
  })
  
  let courseInfos = []
  // 先获取学期ID
  await fetch('https://portal.dlut.edu.cn/tp/up/widgets/getClassbyUserInfo', {
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'zh-CN,zh;q=0.9',
      'content-type': 'application/json;charset=UTF-8',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-requested-with': 'XMLHttpRequest',
    },
    referrer: 'https://portal.dlut.edu.cn/tp/view?m=up',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: '{"schoolYear":"2021-2022","semester":"3","learnWeek":"2"}',
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  })
    .then((v) => v.json())
    .then((v) => {
      courseInfos = v
    })
  function getWeeks(weekString) {
    let result = []
    for (let i = 0; i < weekString.length; i++) {
      if (weekString[i] == '1') {
        result.push(i + 1)
      }
    }
    return result
  }
  function getSections(sectionString, durationString) {
    let beginSection = parseInt(sectionString)
    let duration = parseInt(durationString)
    let result = []
    for (let i = beginSection; i < beginSection + duration; i++) {
      result.push(i)
    }
    return result
  }

  let yearList = []
  courseInfos.forEach((course) => {
    yearList.push(course.KKXND)
  })
  let pureYearList = yearList.filter((year, index) => {
    return yearList.indexOf(year) === index
  })
  const year = await AIScheduleSelect({
    contentText: '请选择学年', // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
    selectList: pureYearList,
  })
  const term = await AIScheduleSelect({
    contentText: `请选择学期
    1 表示 第一学期
    2 表示 第二学期
    3 表示 第三学期
    `, // 提示信息，字体稍小，支持使用``达到换行效果，具体使用效果建议真机测试，为必传，不传显示版本号
    selectList: [1, 2, 3],
  })
  let courseList = []
  courseInfos.forEach((course) => {
    if (course.KKXND == year && course.KKXQM == parseInt(term)) {
      courseList.push({
        name: course.KCMC,
        position: course.JXDD,
        teacher: course.JSXM,
        weeks: getWeeks(course.SKZC),
        day: course.SKXQ,
        sections: getSections(course.SKJC, course.CXJC),
      })
    }
  })
  return JSON.stringify(courseList)
}
