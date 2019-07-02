# Minions-Real-time-data-streaming-processing-project
Graduation Design Works🌟, using Flume/Kafka/Spark Streaming/React/Ant Design (Pro).

Author Fang Miao IOT-Engineering 2019 HFUT

# context
这是我的本科毕业设计，是一个基于Spark Streaming的音乐网页日志实时流处理，是一个简单的初步的分布式数据处理项目。我在毕业设计的过程中主要学习了运用Scala来使用Spark，以及像Flume、Kafka等工具。

论文地址：[基于Spark Streaming的网站日志实时流处理](https://fangmiao97.github.io/2019/06/01/graduation-design-paper/)

学习Spark的同时完成了关于RDD的论文翻译：[【翻译】弹性分布式数据集：基于内存的集群计算的容错性抽象 ](https://fangmiao97.github.io/2019/04/13/tanslate-Resilient-Distributed-Datasets-A-Fault-Tolerant-Abstraction%E2%80%93for-In-Memory-Cluster-Computing/)

Spark Streaming程序在：[Chaoyue-Spark](https://github.com/fangmiao97/Chaoyue-s-Sparktrain)

# display

![](https://raw.githubusercontent.com/fangmiao97/Minions-Real-time-data-streaming-processing-project/master/%E5%9B%BE%E7%89%871.gif)

* 今日数据概览

今日数据概览页面展示当日实时数据，包括：实时PageView、七日PV走势、今日PV走势，各类目实时访问统计、各类目访问趋势、今日来源网站统计和今日热搜词云。

页面根据维度逐渐细化来布局，从上到下从左到右，首先是PV的总量，然后从一天中的时间为维度和类目为维度细化PV值，再到其他杂项指标。

今日PV走势组件展示了网站访问在一天内的趋势，每30分钟统计30分钟内访问量，可以看出音乐网站的用户群体在中午和傍晚到晚上十分活跃。

类目实时访问统计展示了用户对哪一个子类目更偏爱，哪些类目需要优化。七日PV比较给一周内的PV比较，可以大致看到某一天的网站浏览状况，需要历史日期更细化的数据可以到历史数据查询里查看。

类目访问趋势展示了各类目的今日访问趋势，是前面两个维度的横向和纵向细化，帮助网站运营人员从细节查看网站数据。杂项数据包括来源网站统计和热搜词云，这些展示的是从搜索引擎过来的流量的分析，根据搜索引擎的热搜词，可以帮助网站进行SEO（搜索引擎优化），提高网站排名。

![](https://puui.qpic.cn/fans_admin/0/3_1359855289_1562043107824/0)

![](https://puui.qpic.cn/fans_admin/0/3_1359855289_1562043414146/0)

* 历史数据查询

历史数据查询提供选择日期的组件，可以查看所选日期当天的相关数据。提供30天PV比较，可以看到更长时间区间内网站浏览量的变化，通过这些变化的观察可以对网站的运营策略进行适当的调整。

![](https://puui.qpic.cn/fans_admin/0/3_1359855289_156204344 sru3136/0)

* 音乐网站用户行为模拟

音乐网站行为的模拟，具有典型的歌曲资源位组件，可以模拟的行为有歌曲播放、收藏和评论。点击按钮则会调用后端相关接口，后端通过log4j记录下行为日志数据。一个歌曲资源包括歌名、歌手、专辑、封面地址、音乐资源地址、风格和标签等，使用MySQL保存这些资源信息。

![](https://puui.qpic.cn/fans_admin/0/3_1359855289_1562043479782/0)

* 行为数据分析

页面行为日志数据的实时处理分析展示页面。展示的内容包括，今日歌曲播放一览、近一小时最热播放歌曲、播放歌曲类型统计、今日加权热门歌曲、今日歌曲评论和收藏统计。今日歌曲播放一览展示今日实时的歌曲播放量统计。

近一小时最热播放歌曲展示一小时窗口时间的歌曲播放量排行，是前一个统计维度的子集。

歌曲播放类型统计使用南丁格尔玫瑰花环展示实时歌曲播放不同类型数量的统计，这个维度即是对实时流处理中得到的分析结果进行更高一级的抽象，在可视化的后端将歌曲播放量与歌曲资源进行连接操作得到歌曲类型统计。

今日加权热门歌曲通过将三中行为的统计量进行加权，得到热门歌曲，加权权值为播放0.5：收藏1：评论0.8。另外两个展示的是实时歌曲收藏量与评论量。

![](https://puui.qpic.cn/fans_admin/0/3_1359855289_1562043549502/0)

# archticture

![](https://pic.superbed.cn/item/5cf20d46451253d1785969df.jpg)
