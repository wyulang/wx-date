# date-picker
微信小程序自定义日期时间选择器，可限制时间范围，调整时间精度日期或时分秒，


# 参数说明
## API

### date-picker【props 】

| 名称         | 描述                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| `value`       | [说明]：开始时间 ，日期选择期中默认选择的时间，如未传，默认选中当前时间                                                   |
| `end` | [说明]：结束时间|
| `time` | [说明]：时分秒显示，当为true--00:00:00、  当为hour--00 、当为minute -- 00:00|
| `more` | [说明]：是否可以选择两个时间为，开始时间，与结果时间,选择完两个时间后触发change事件|
| `button` | [说明]：是否显示确定按钮，当为true 显示文案为 “确定” 也可以自定义 button="关闭"|
| `format` | [说明]：取值格式化 yyyy-MM-dd hh:mm:ss ，为number时返加时间戳|
| `message` | [说明]：当存在button时 未选择时间时提示文案，为true 提示时间未选择完， 也可自定义 message="请选择时间" |
| `show` | [说明]：显示与关闭|
| `end` | [说明]：结束时间|

# limit：限制值 区间限制
| 名称         | 描述                                                                                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| `&&` | [说明]：2002-03-05&&2002-03-05  这两个时间 区间 里的值可以选择|
| `ll` | [说明]：2002-03-05ll2002-03-05  这两个时间 之外 的值可以选择|
| `>` | [说明]：当 >2002-03-05  ">"这个号写前写后都可以， 大于这个日期的值可以选择|
| `<` | [说明]：当 <2002-03-05  "<"这个号写前写后都可以， 小于这个日期的值可以选择|
| `[]` | [说明]：[2002-03-05,2002-03-05,2002-03-05]  指定时间可以选择|


列：\<date-picker limit="2002-03-05&&2002-03-05">
<br><br>

# 返回值
 change="changeDa"
 
e.detail={value:时间或开始时间,end:结束时间}
<br>
当value 值为空时，表示点击了 关闭按钮

关闭事件：在触发changeDate时，根据需要业务端关闭

<br><br><br>
  


![img](https://github.com/wyulang/wx-date/blob/main/demo-pic/date1.png)
<br><br>
![img](https://github.com/wyulang/wx-date/blob/main/demo-pic/date3.png)
<br><br>
![img](https://github.com/wyulang/wx-date/blob/main/demo-pic/date4.png)
<br><br>
![img](https://github.com/wyulang/wx-date/blob/main/demo-pic/date5.png)
<br><br>
![img](https://github.com/wyulang/wx-date/blob/main/demo-pic/date6.png)

