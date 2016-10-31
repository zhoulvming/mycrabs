var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var superagent = require('superagent');


// for test
var topics_data =   
  [
    {
      "id": "581026cceae2a24f34e67f0a",
      "author_id": "3118295?v=3&amp;s=120",
      "author_name": "i5ting",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/3118295?v=3&amp;s=120",
      "title": "【Node全栈】升级为CNode官方公众号，招收喜欢运营的小伙伴",
      "content_url": "/topic/581026cceae2a24f34e67f0a",
      "created": "33 分钟前",
      "replies_count": "20"
    },
    {
      "id": "580eb6fbb37ee8fb339787b0",
      "author_id": "3538629?v=3&amp;s=120",
      "author_name": "Samurais",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/3538629?v=3&amp;s=120",
      "title": "［ 北京］11月6日 NodeParty@科技寺，报名从速 !",
      "content_url": "/topic/580eb6fbb37ee8fb339787b0",
      "created": "5 小时前",
      "replies_count": "11"
    },
    {
      "id": "57ea257b3670ca3f44c5beb6",
      "author_id": "8791709?v=3&amp;s=120",
      "author_name": "coolfishstudio",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/8791709?v=3&amp;s=120",
      "title": "分享我用cnode社区api做微信小应用的入门过程",
      "content_url": "/topic/57ea257b3670ca3f44c5beb6",
      "created": "2 天前",
      "replies_count": "95"
    },
    {
      "id": "580ddc2eeae2a24f34e67e69",
      "author_id": "1147375?v=3&amp;s=120",
      "author_name": "alsotang",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/1147375?v=3&amp;s=120",
      "title": "这，就是技术人的江湖",
      "content_url": "/topic/580ddc2eeae2a24f34e67e69",
      "created": "2 天前",
      "replies_count": "10"
    },
    {
      "id": "580495a50bab808265185e86",
      "author_id": "d00d8e3461257418a62b1cb7abeea85a?size=48",
      "author_name": "xinyu198736",
      "author_avatar_mini": "//gravatar.com/avatar/d00d8e3461257418a62b1cb7abeea85a?size=48",
      "title": "【杭州】第三期 杭州 Node Party 开始报名啦！嘉宾和奖品非常劲爆额！",
      "content_url": "/topic/580495a50bab808265185e86",
      "created": "4 天前",
      "replies_count": "3"
    },
    {
      "id": "58155ad6cf18d0333412d2ea",
      "author_id": "13959193?v=3&amp;s=120",
      "author_name": "lxz612",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/13959193?v=3&amp;s=120",
      "title": "最近用Express+mysql搭建了一个简单的图书馆流通管理系统",
      "content_url": "/topic/58155ad6cf18d0333412d2ea",
      "created": "5 分钟前",
      "replies_count": "9"
    },
    {
      "id": "5816e7001a9a7d99095312d0",
      "author_id": "20007153?v=3&amp;s=120",
      "author_name": "0xReturn",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/20007153?v=3&amp;s=120",
      "title": "MongoDB连表查询",
      "content_url": "/topic/5816e7001a9a7d99095312d0",
      "created": "7 分钟前",
      "replies_count": "0"
    },
    {
      "id": "5814b654cf18d0333412d2da",
      "author_id": "19383783?v=3&amp;s=120",
      "author_name": "guirenpei",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/19383783?v=3&amp;s=120",
      "title": "如何在爬取到一片文章之后给这段文章分段显示",
      "content_url": "/topic/5814b654cf18d0333412d2da",
      "created": "12 分钟前",
      "replies_count": "7"
    },
    {
      "id": "5816df5ecf18d0333412d337",
      "author_id": "8424643?v=3&amp;s=120",
      "author_name": "1340641314",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/8424643?v=3&amp;s=120",
      "title": "从零构建vue2 + vue-router + vuex 开发环境到入门，实现基本的登录退出功能",
      "content_url": "/topic/5816df5ecf18d0333412d337",
      "created": "40 分钟前",
      "replies_count": "0"
    },
    {
      "id": "54fd8d4a1e9291e16a7b3598",
      "author_id": "11224615?v=3&amp;s=120",
      "author_name": "cstackess",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/11224615?v=3&amp;s=120",
      "title": "实时弹幕系统的设计与实现",
      "content_url": "/topic/54fd8d4a1e9291e16a7b3598",
      "created": "1 小时前",
      "replies_count": "44"
    },
    {
      "id": "55531a00b8ec4ac201f117d6",
      "author_id": "5468564?v=3&amp;s=120",
      "author_name": "flftfqwxf",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/5468564?v=3&amp;s=120",
      "title": "你为什么选择NODEJS？国内目前有哪些用NODEJS的大型项目？",
      "content_url": "/topic/55531a00b8ec4ac201f117d6",
      "created": "1 小时前",
      "replies_count": "57"
    },
    {
      "id": "5812e079b37ee8fb339788c1",
      "author_id": "9349200?v=3&amp;s=120",
      "author_name": "2596887568",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/9349200?v=3&amp;s=120",
      "title": "用hexo搞了个博客，大家没事可以捧捧场看看。",
      "content_url": "/topic/5812e079b37ee8fb339788c1",
      "created": "1 小时前",
      "replies_count": "6"
    },
    {
      "id": "581171e3b37ee8fb3397886e",
      "author_id": "7685948?v=3&amp;s=120",
      "author_name": "einsqing",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/7685948?v=3&amp;s=120",
      "title": "全栈移动商城技术架构分享",
      "content_url": "/topic/581171e3b37ee8fb3397886e",
      "created": "2 小时前",
      "replies_count": "8"
    },
    {
      "id": "5816aabdcf18d0333412d323",
      "author_id": "1522494?v=3&amp;s=120",
      "author_name": "jingsam",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/1522494?v=3&amp;s=120",
      "title": "聊聊 Vue 组件命名那些事",
      "content_url": "/topic/5816aabdcf18d0333412d323",
      "created": "2 小时前",
      "replies_count": "6"
    },
    {
      "id": "5815baf4eae2a24f34e68069",
      "author_id": "2082648?v=3&amp;s=120",
      "author_name": "maclinuxp",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/2082648?v=3&amp;s=120",
      "title": "重新整理CNodejs的api接口，支持在线调试。",
      "content_url": "/topic/5815baf4eae2a24f34e68069",
      "created": "3 小时前",
      "replies_count": "8"
    },
    {
      "id": "5816bfbecf18d0333412d32d",
      "author_id": "2082648?v=3&amp;s=120",
      "author_name": "maclinuxp",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/2082648?v=3&amp;s=120",
      "title": "Api测试创建主题^_^(URLencode 方式提交）",
      "content_url": "/topic/5816bfbecf18d0333412d32d",
      "created": "3 小时前",
      "replies_count": "1"
    },
    {
      "id": "580c9343eae2a24f34e67e05",
      "author_id": "5453359?v=3&amp;s=120",
      "author_name": "xcatliu",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/5453359?v=3&amp;s=120",
      "title": "我来微软这半年",
      "content_url": "/topic/580c9343eae2a24f34e67e05",
      "created": "3 小时前",
      "replies_count": "13"
    },
    {
      "id": "56fa5cd48a612c5559d169ec",
      "author_id": "2720537?v=3&amp;s=120",
      "author_name": "tsj1107",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/2720537?v=3&amp;s=120",
      "title": "如何从头编写你的 Macaca 用例",
      "content_url": "/topic/56fa5cd48a612c5559d169ec",
      "created": "3 小时前",
      "replies_count": "5"
    },
    {
      "id": "58147088cf18d0333412d2ca",
      "author_id": "7995232?v=3&amp;s=120",
      "author_name": "JZLeung",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/7995232?v=3&amp;s=120",
      "title": "问个关于 node 和 mongoose 的查询问题。",
      "content_url": "/topic/58147088cf18d0333412d2ca",
      "created": "3 小时前",
      "replies_count": "3"
    },
    {
      "id": "580da170b37ee8fb33978756",
      "author_id": "3118295?v=3&amp;s=120",
      "author_name": "i5ting",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/3118295?v=3&amp;s=120",
      "title": "转载一个关于vue的讨论",
      "content_url": "/topic/580da170b37ee8fb33978756",
      "created": "4 小时前",
      "replies_count": "87"
    },
    {
      "id": "5814acd9eae2a24f34e68042",
      "author_id": "12539978?v=3&amp;s=120",
      "author_name": "GaryChangCN",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/12539978?v=3&amp;s=120",
      "title": "mongodb $pull 为什么不能删除",
      "content_url": "/topic/5814acd9eae2a24f34e68042",
      "created": "4 小时前",
      "replies_count": "1"
    },
    {
      "id": "57247b375a26c4a841ecbf1b",
      "author_id": "aa92220a867ab0a71192ef9459216685?size=48",
      "author_name": "irou1217",
      "author_avatar_mini": "//gravatar.com/avatar/aa92220a867ab0a71192ef9459216685?size=48",
      "title": "react页面，后端是php，如何做seo？",
      "content_url": "/topic/57247b375a26c4a841ecbf1b",
      "created": "4 小时前",
      "replies_count": "3"
    },
    {
      "id": "5810c110cf18d0333412d1e5",
      "author_id": "28d69c69c1c1a040436124238f7cc937?size=48",
      "author_name": "andyhu",
      "author_avatar_mini": "//gravatar.com/avatar/28d69c69c1c1a040436124238f7cc937?size=48",
      "title": "Node.js 7 的 async await 终于来了，不过怎么觉得没什么用？",
      "content_url": "/topic/5810c110cf18d0333412d1e5",
      "created": "4 小时前",
      "replies_count": "9"
    },
    {
      "id": "58144f81cf18d0333412d2bf",
      "author_id": "7995232?v=3&amp;s=120",
      "author_name": "JZLeung",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/7995232?v=3&amp;s=120",
      "title": "vue 如何和 nodejs 前后端结合？",
      "content_url": "/topic/58144f81cf18d0333412d2bf",
      "created": "4 小时前",
      "replies_count": "12"
    },
    {
      "id": "58146675cf18d0333412d2c8",
      "author_id": "4214942?v=3&amp;s=120",
      "author_name": "p2227",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/4214942?v=3&amp;s=120",
      "title": "大家在用node解释或者封装二进制数据时，一般怎么样可以便捷一点？",
      "content_url": "/topic/58146675cf18d0333412d2c8",
      "created": "5 小时前",
      "replies_count": "7"
    },
    {
      "id": "5816a7b2cf18d0333412d320",
      "author_id": "13572030?v=3&amp;s=120",
      "author_name": "chikara-chen",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/13572030?v=3&amp;s=120",
      "title": "分享一个自己独立开发的React加载进度条组件",
      "content_url": "/topic/5816a7b2cf18d0333412d320",
      "created": "5 小时前",
      "replies_count": "0"
    },
    {
      "id": "58169f93eae2a24f34e68086",
      "author_id": "5440896?v=3&amp;s=120",
      "author_name": "edwardnie",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/5440896?v=3&amp;s=120",
      "title": "有人推荐nodejs的系统一点的书籍么",
      "content_url": "/topic/58169f93eae2a24f34e68086",
      "created": "5 小时前",
      "replies_count": "1"
    },
    {
      "id": "51dccb43d44cbfa3042752c8",
      "author_id": "402cc3c7c3a5dc460cad11107a05c3a3?s=48",
      "author_name": "ldjking",
      "author_avatar_mini": "//gravatar.com/avatar/402cc3c7c3a5dc460cad11107a05c3a3?s=48",
      "title": "Node.js express 跨域问题",
      "content_url": "/topic/51dccb43d44cbfa3042752c8",
      "created": "5 小时前",
      "replies_count": "12"
    },
    {
      "id": "5812f99bb37ee8fb339788c9",
      "author_id": "7677059?v=3&amp;s=120",
      "author_name": "94007boy",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/7677059?v=3&amp;s=120",
      "title": "node岗位减少好多，大java稳坐钓鱼台",
      "content_url": "/topic/5812f99bb37ee8fb339788c9",
      "created": "6 小时前",
      "replies_count": "12"
    },
    {
      "id": "581612ad1a9a7d99095312a0",
      "author_id": "9347370?v=3&amp;s=120",
      "author_name": "zengliqi",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/9347370?v=3&amp;s=120",
      "title": "如何编写开源项目的 README 文档",
      "content_url": "/topic/581612ad1a9a7d99095312a0",
      "created": "6 小时前",
      "replies_count": "2"
    },
    {
      "id": "58149a6acf18d0333412d2d2",
      "author_id": "15938493?v=3&amp;s=120",
      "author_name": "fengyh13",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/15938493?v=3&amp;s=120",
      "title": "升级node到v6.9.1之后, 安装模块时 node-gyp出现编译不过去了，请问各位这问题怎么解决？多谢！",
      "content_url": "/topic/58149a6acf18d0333412d2d2",
      "created": "7 小时前",
      "replies_count": "1"
    },
    {
      "id": "58108b69b37ee8fb33978839",
      "author_id": "4279697?v=3&amp;s=120",
      "author_name": "nswbmw",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/4279697?v=3&amp;s=120",
      "title": "koa-yield-breakpoint——koa@1请求打点工具",
      "content_url": "/topic/58108b69b37ee8fb33978839",
      "created": "14 小时前",
      "replies_count": "2"
    },
    {
      "id": "58159e96b37ee8fb33978940",
      "author_id": "23147203?v=3&amp;s=120",
      "author_name": "studynodecn",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/23147203?v=3&amp;s=120",
      "title": "express 通过 req.session.user 设置权限管理",
      "content_url": "/topic/58159e96b37ee8fb33978940",
      "created": "17 小时前",
      "replies_count": "5"
    },
    {
      "id": "5810631b1a9a7d9909531159",
      "author_id": "15061629?v=3&amp;s=120",
      "author_name": "stardew516",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/15061629?v=3&amp;s=120",
      "title": "webpack + vue 开发涉及到的包",
      "content_url": "/topic/5810631b1a9a7d9909531159",
      "created": "18 小时前",
      "replies_count": "16"
    },
    {
      "id": "5814b478eae2a24f34e68047",
      "author_id": "6591466?v=3&amp;s=120",
      "author_name": "yakczh",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/6591466?v=3&amp;s=120",
      "title": "cluster用了 Sticky session以后进程之间事件通信失效了",
      "content_url": "/topic/5814b478eae2a24f34e68047",
      "created": "20 小时前",
      "replies_count": "4"
    },
    {
      "id": "5814d69eeae2a24f34e6804c",
      "author_id": "1011681?v=3&amp;s=120",
      "author_name": "xudafeng",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/1011681?v=3&amp;s=120",
      "title": "实用的端口检测模块detect-port",
      "content_url": "/topic/5814d69eeae2a24f34e6804c",
      "created": "20 小时前",
      "replies_count": "7"
    },
    {
      "id": "5811c48aeae2a24f34e67fa4",
      "author_id": "6591466?v=3&amp;s=120",
      "author_name": "yakczh",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/6591466?v=3&amp;s=120",
      "title": "用cluster的master可以共享多个worker的全局数据吗？",
      "content_url": "/topic/5811c48aeae2a24f34e67fa4",
      "created": "1 天前",
      "replies_count": "5"
    },
    {
      "id": "580ec010b37ee8fb339787b3",
      "author_id": "16385416?v=3&amp;s=120",
      "author_name": "BubblyPoker",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/16385416?v=3&amp;s=120",
      "title": "学习Vue和webpack的同时，做了一个cnodejs的web端的SPA，欢迎吐口水...",
      "content_url": "/topic/580ec010b37ee8fb339787b3",
      "created": "1 天前",
      "replies_count": "6"
    },
    {
      "id": "5812c17eeae2a24f34e67fea",
      "author_id": "6591466?v=3&amp;s=120",
      "author_name": "yakczh",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/6591466?v=3&amp;s=120",
      "title": "nodejs后端有什么方法可以产生大量socket.io的请求",
      "content_url": "/topic/5812c17eeae2a24f34e67fea",
      "created": "1 天前",
      "replies_count": "7"
    },
    {
      "id": "58149aa01a9a7d9909531254",
      "author_id": "10110507?v=3&amp;s=120",
      "author_name": "icantunderstand",
      "author_avatar_mini": "https://avatars.githubusercontent.com/u/10110507?v=3&amp;s=120",
      "title": "http请求次数问题",
      "content_url": "/topic/58149aa01a9a7d9909531254",
      "created": "1 天前",
      "replies_count": "4"
    }
  ];
router.get('/topics_test', function(req, res, next){
  res.send(topics_data);
});


// list
router.get('/topics', function (req, res, next) {
  //允许所有域名访问
  res.setHeader("Access-Control-Allow-Origin", "*")
  
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      if (err) { return next(err); }

      // 此处添加load函数的第二个参数的目的是为了元素方法.html()取得的中文内容避免出现utf8编码
      var $ = cheerio.load(sres.text, {decodeEntities: false});
      var items = [];

      $('#topic_list .cell').each(function (idx, element) {
        var $element = $(element);
        var $topic_title = $element.find('.topic_title');
        var $user_avatar = $element.find('.user_avatar');
        var $reply_count = $element.find('.reply_count').children('.count_of_replies');
        var $last_time = $element.find('.last_time');
        var rps = $reply_count.html();
        items.push({
        	id: $topic_title.attr('href').split('/')[2],
        	author_id: $user_avatar.children('img').attr('src').split('/')[4],
        	author_name: $user_avatar.attr('href').split('/')[2],
        	author_avatar_mini: $user_avatar.children('img').attr('src'),
          title: $topic_title.attr('title'),
          content_url: $topic_title.attr('href'),
          created: $last_time.children('.last_active_time').html(),
          replies_count: rps.replace(/\s+/g, '')
        });
      });
      res.send(items);
    });
});

// detail
router.get('/topic/:id', function(req, res, next){
    //允许所有域名访问
  res.setHeader("Access-Control-Allow-Origin", "*")

  var url = 'https://cnodejs.org/topic/' + req.params.id;
  var topic = {};
  superagent.get(url).end(function(err, sres){
    if(err){return next(err);}
    var $ = cheerio.load(sres.text, {decodeEntities: false});
    $('#content').each(function(idx, element){
      var $element = $(element);
      var $topic_content = $element.find('.topic_content');
      var $topic_replay = $element.find('.reply_item');
      var replies = [];
      $topic_replay.each(function(jdx, replyItem){
        replies.push({
          id: $(replyItem).attr('reply_id'),
          content: $(replyItem).find('.reply_content').html()
        });
      });
      topic = {
        content: $topic_content.html(),
        replies: replies
      }
    });
    res.send(topic);
  });

});

module.exports = router;