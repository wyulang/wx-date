# date-picker
微信小程序自定义日期时间选择器，可限制时间范围，调整时间精度日期或时分秒，


# 使用方法

 #《date-picker show="{{isDate}}" limit=">2023-3-2" more time="minute" end="2023-3-22" value="2023-3-6"></date-picker》

 #《date-picker show="{{isDate}}" limit=">2023-3-2" more time end="2023-3-22" value="2023-3-6"></date-picker》

 《date-picker show="{{isDate}}" limit="<2023-3-2" value="2023-3-6"></date-picker》

 《date-picker show="{{isDate}}" limit="2023-3-2&&2023-3-22" value="2023-3-6"></date-picker》

 《date-picker show="{{isDate}}" limit="2023-3-2||2023-3-22" value="2023-3-6"></date-picker》

 《date-picker show="{{isDate}}" limit="[2023-3-2,2023-3-22]" value="2023-3-6"></date-picker》 

 《date-picker show="{{isDate}}"  value="2023-3-6"></date-picker》
 
 说明
 time ：出现时分秒选择器， 可以直接写 time 显示 叶分秒  也可以 time="hour" 只显示时  time="minute" 显示 时 分 
 more :  more={{true}} 写法一    直一个 more 也是可以的 写法二
 value 绑定值，开始值
 end 绑定值，结束值

 limit：限制值 区间限制
   1。当 2002-03-05&&2002-03-05  这个时间 区间 里的值可能选择
   2。当 2002-03-05||2002-03-05  这个时间 之外 的值可能选择 
   3。当 >2002-03-05  ">"这个号写前写后都可以， 大于这个日期的值可以选择
   4。当 <2002-03-05  "<"这个号写前写后都可以， 小于这个日期的值可以选择
   5。[2002-03-05,2002-03-05,2002-03-05]  指定时间可以选择
 -->


![img](https://github.com/wyulang/wx-date/blob/main/demo-pic/wx1.png)

![img](https://github.com/wyulang/wx-date/blob/main/demo-pic/wx2.png)

![img](https://github.com/wyulang/wx-date/blob/main/demo-pic/wx3.png)

