function toDate(date) {
  if (!date) {
    date = new Date();
  }
  if (Object.prototype.toString.call(date) == '[object Date]') {
    return date
  } else if (Object.prototype.toString.call(date) == '[object String]') {
    if (!isNaN(date)) {
      return new Date(Number(date))
    } else if (date.includes('T')) {
      return new Date(date)
    } else {
      return new Date(date.replace(/-/ig, '/'))
    }
  } else if (Object.prototype.toString.call(date) == "[object Number]") {
    return new Date(date)
  }
}

function Appendzero(obj) {
  if (obj < 10) {
    return '0' + '' + obj;
  }
  else {
    return obj;
  }
}

function formatDate(date, format = "") {
  date = toDate(date);
  if (!format) {
    format = 'yyyy-MM-dd';
  }
  if (format == 'number') {
    return date.getTime();
  }
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
  return format.replace(/yyyy|yy|MM|M|dd|d|hh|mm|ss|星期|周|www|week/g, function (a) {
    switch (a) {
      case 'yyyy':
        return date.getFullYear();
      case 'yy':
        return (date.getFullYear() + '').slice(2);
      case 'MM':
        return Appendzero(date.getMonth() + 1);
      case 'M':
        return date.getMonth() + 1;
      case 'dd':
        return Appendzero(date.getDate());
      case 'd':
        return date.getDate();
      case 'hh':
        return Appendzero(date.getHours());
      case 'mm':
        return Appendzero(date.getMinutes());
      case 'ss':
        return Appendzero(date.getSeconds());
      case '星期':
        return '星期' + week[date.getDay() + 7];
      case '周':
        return '周' + week[date.getDay() + 7];
      case 'week':
        return week[date.getDay()];
      case 'www':
        return week[date.getDay()].slice(0, 3);
    }
  })
}

Component({
  properties: {
    //单选时间 传值 也是第一个值
    value: {
      type: [String, Number, Object],
      value: ""
    },
    //时间区间范围设置，
    // 当为string strat&&end start||end 如 2016-02-02&&2016-05-02  && 两个时间内可选，||两个时间外可选
    // 当为string strat> 或<start 前后都可以 如 2016-02-02>  >2016-02-02， 表示大于给定日期之后的日期可选，反之小于也是同理
    // 当为Array ['2016-02-02','2016-02-01'] 指定时间不可选
    // limit="2023-02-07&&2023-02-18" limit="[2023-02-07,2023-02-18]" limit="30"
    limit: {
      type: [String, Number, Array],
      value: "yyyy-MM-dd"
    },
    //多选时间 第二个值
    end: {
      type: [String, Number, Object],
      value: ""
    },
    // 日历标题 是否显示时分秒
    time: {
      type: [Boolean, String],
      value: false
    },
    // 是否可以选择两个时间，开始时间，与结果时间
    more: {
      type: Boolean,
      value: false
    },
    // timestamp或number 时间戳，string:'yyyy-MM-dd hh:mm:ss'  返回的绑定值格式
    format: {
      type: String,
      value: "yyyy-MM-dd"
    },
    // 是否显示
    show: {
      type: Boolean,
      value: false,
      observer: function (v) {
        if (v && this.properties.value) {
          let curr = toDate(this.properties.value);
          this.setData({
            selectDate: curr,
            currYear: curr.getFullYear(),
            currMonth: curr.getMonth()
          })
          if (this.properties.end) {
            this.setData({
              endDate: toDate(this.properties.end)
            })
          }
          if (!this.data.path.length) {
            this.initDate()
          }
        }
      }
    },
  },

  data: {
    path: [],
    currYear: new Date().getFullYear(),
    currMonth: new Date().getMonth() + 1,
    currDay: new Date().getDate(),
    selectDate: null,
    endDate: null,
    week: ["日", "一", "二", "三", "四", "五", "六"],
    timeList: [],
    startTime: [],
    endTime: [],
    startTimeValue: [],
    endTimeValue: [],
  },

  ready() {
    if (this.properties.value) {
      this.setData({
        selectDate: formatDate(this.properties.value, this.properties.format)
      })
    }
    if (this.properties.end && this.properties.more) {
      this.setData({
        endDate: formatDate(this.properties.end, this.properties.format)
      })
    }
    if (this.properties.time) {
      if (typeof this.properties.time == 'boolean') {
        this.setData({
          timeList: [
            Array.from(new Array(24).keys()).map(v => { return v < 10 ? ('0' + v) : v }),
            Array.from(new Array(60).keys()).map(v => { return v < 10 ? ('0' + v) : v }),
            Array.from(new Array(60).keys()).map(v => { return v < 10 ? ('0' + v) : v })
          ]
        })
      } else {
        if (this.properties.time == 'hour') {
          this.setData({
            timeList: [
              Array.from(new Array(24).keys()).map(v => { return v < 10 ? ('0' + v) : v })
            ]
          })
        } else if (this.properties.time == "minute") {
          this.setData({
            timeList: [
              Array.from(new Array(24).keys()).map(v => { return v < 10 ? ('0' + v) : v }),
              Array.from(new Array(60).keys()).map(v => { return v < 10 ? ('0' + v) : v }),
            ]
          })
        } else {
          this.setData({
            timeList: [
              Array.from(new Array(24).keys()).map(v => { return v < 10 ? ('0' + v) : v }),
              Array.from(new Array(60).keys()).map(v => { return v < 10 ? ('0' + v) : v }),
              Array.from(new Array(60).keys()).map(v => { return v < 10 ? ('0' + v) : v })
            ]
          })
        }
      }
    }
    this.setData({
      startTime: this.data.timeList.map((m, i) => {
        if (!i) {
          return m[m.findIndex(f => Number(f) == new Date().getHours())]
        } else if (i == 1) {
          return m[m.findIndex(f => Number(f) == new Date().getMinutes())]
        } else if (i == 2) {
          return m[m.findIndex(f => Number(f) == new Date().getSeconds())]
        }
      }).join(':'),
      startTimeValue: this.data.timeList.map((m, i) => {
        if (!i) {
          return m.findIndex(f => Number(f) == new Date().getHours())
        } else if (i == 1) {
          return m.findIndex(f => Number(f) == new Date().getMinutes())
        } else if (i == 2) {
          return m.findIndex(f => Number(f) == new Date().getSeconds())
        }
      })
    })
    if (this.properties.more) {
      this.setData({
        endTime: this.data.timeList.map((m, i) => {
          if (!i) {
            return m[m.findIndex(f => Number(f) == new Date().getHours())]
          } else if (i == 1) {
            return m[m.findIndex(f => Number(f) == new Date().getMinutes())]
          } else if (i == 2) {
            return m[m.findIndex(f => Number(f) == new Date().getSeconds())]
          }
        }).join(':'),
        endTimeValue: this.data.timeList.map((m, i) => {
          if (!i) {
            return m.findIndex(f => Number(f) == new Date().getHours())
          } else if (i == 1) {
            return m.findIndex(f => Number(f) == new Date().getMinutes())
          } else if (i == 2) {
            return m.findIndex(f => Number(f) == new Date().getSeconds())
          }
        })
      })
    }
    this.initDate()
  },

  methods: {
    changeTimeStart(e) {
      this.setData({
        startTime: e.detail.value.map((m, i) => {
          return this.data.timeList[i][m]
        }).join(':')
      });
    },
    changeTimeEnd(e) {
      this.setData({
        endTime: e.detail.value.map((m, i) => {
          return this.data.timeList[i][m]
        }).join(':')
      });
    },
    initDate() {
      // 本月1号的时间对象
      let currDate = new Date(this.data.currYear, this.data.currMonth - 1, 1);
      // 本月1号星期几
      let week = currDate.getDay();
      // 日历上第一行第一列的开始时间
      let startDay = currDate - week * 60 * 60 * 1000 * 24;
      let list = [];
      let startDate = this.data.selectDate && formatDate(this.data.selectDate) || "";
      let endDate = this.data.endDate && formatDate(this.data.endDate) || "";
      Array.from(new Array(42).keys()).forEach(v => {
        let select = false;
        let time = new Date(startDay + v * 60 * 60 * 1000 * 24);
        let currtime = formatDate(time);
        select = startDate == currtime;
        if (this.properties.more && startDate && endDate) {
          if (currtime > startDate && currtime < endDate) {
            select = true;
          }
        }
        let disable = time.toLocaleDateString().replace(/\/\d+$/g, '') != `${this.data.currYear}/${this.data.currMonth}`;
        if (typeof this.properties.limit == "string" && !this.properties.limit.includes('[')) {
          if (this.properties.limit.includes('&&') && !disable) {
            let currStart = formatDate(this.properties.limit.split('&&')[0]);
            let currEnd = formatDate(this.properties.limit.split('&&')[1]);
            if (currtime > currEnd || currtime < currStart) {
              disable = true;
            }
          }
          if (this.properties.limit.includes('||') && !disable) {
            let currStart = formatDate(this.properties.limit.split('||')[0]);
            let currEnd = formatDate(this.properties.limit.split('||')[1]);
            if (currtime < currEnd && currtime > currStart) {
              disable = true;
            }
          }
          if (this.properties.limit.includes('>') && !disable) {
            let curr = formatDate(this.properties.limit.split('||')[0] || this.properties.limit.split('||')[1]);
            if (currtime < curr) {
              disable = true;
            }
          }
          if (this.properties.limit.includes('<') && !disable) {
            let curr = formatDate(this.properties.limit.split('||')[0] || this.properties.limit.split('||')[1]);
            if (currtime > curr) {
              disable = true;
            }
          }
        } else {
          if (this.properties.limit.length && !disable) {
            if (typeof this.properties.limit == "string") {
              disable = this.properties.limit.replace(/[\[\]]/g, '').split(',').map(m => formatDate(m)).some(m => m == currtime)
            } else {
              disable = this.properties.limit.map(m => formatDate(m)).some(m => m == currtime)
            }
          }
        }
        list.push({
          time,
          label: time.getDate(),
          start: startDate,
          end: endDate,
          value: formatDate(time),
          disable: disable,
          select: select
        })
      })
      this.setData({
        path: list
      })
      // console.log(list)
    },
    onCell(e) {
      let item = e.currentTarget.dataset.item;
      if (item.disable) return;
      if (this.properties.more) {
        if (this.data.selectDate && this.data.endDate) {
          this.setData({
            selectDate: item.value,
            endDate: "",
          })
        } else {
          if (this.data.selectDate > item.value) {
            this.setData({
              selectDate: item.value,
              endDate: this.data.selectDate,
            })
          } else {
            this.setData({ endDate: item.value })
          }
          if (this.properties.time) {
            if (this.data.startTime && this.data.endTime) {
              this.triggerEvent('change', { value: formatDate(this.data.selectDate + ' ' + this.data.startTime, this.properties.format), end: formatDate(this.data.endDate + ' ' + this.data.endTime, this.properties.format) })
            } else {
              wx.showToast({ title: '时间未选择', icon: "none", mask: true, duration: 6000 })
            }
          } else {
            this.triggerEvent('change', { value: formatDate(this.data.selectDate, this.properties.format), end: formatDate(this.data.endDate, this.properties.format) })
          }
        }
      } else {
        this.setData({
          selectDate: item.value
        })
        if (this.properties.time) {
          let values = item.value + ' ' + this.data.startTime;
          if(this.data.startTime){
            this.triggerEvent('change', { value: formatDate(values, this.properties.format) })
          }else{
            wx.showToast({ title: '时间未选择', icon: "none", mask: true, duration: 6000 })
          }
        } else {
          this.triggerEvent('change', { value: formatDate(item.date, this.properties.format) })
        }
      }
      this.initDate()
    },
    changeYearMonth(e) {
      this.setData({
        currYear: e.detail.value.split('-')[0],
        currMonth: Number(e.detail.value.split('-')[1])
      });
      this.initDate();
    },
    closeDate() {
      this.triggerEvent('change', { value: "" })
    },
    toYear(e) {
      if (e.currentTarget.dataset.type == '加') {
        this.setData({
          currYear: Number(this.data.currYear) + 1
        })
      } else {
        this.setData({
          currYear: Number(this.data.currYear) - 1
        })
      }
      this.initDate()
    },
    toMonth(e) {
      if (e.currentTarget.dataset.type == '加') {
        let month = Number(this.data.currMonth) + 1;
        if (month > 12) {
          this.setData({
            currMonth: 1,
            currYear: Number(this.data.currYear) + 1
          })
        } else {
          this.setData({
            currMonth: month
          })
        }
      } else {
        let month = Number(this.data.currMonth) - 1;
        if (month > 0) {
          this.setData({
            currMonth: month
          })
        } else {
          this.setData({
            currMonth: 12,
            currYear: Number(this.data.currYear) - 1
          })
        }
      }
      this.initDate()
    }
  }

});