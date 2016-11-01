import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Topic } from '../shared/models/topic';
import { Reply } from '../shared/models/reply';
import { AppState } from '../shared/services/app.service';

import { TopicReplyComponent } from '../topic-reply';
import { TopicService } from '../shared/services/topic.service';
import { AppUtil } from '../shared/services/app.service';

@Component({
  selector: 'topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [
    TopicService, AppUtil
  ],
})
export class TopicDetailComponent implements OnInit {

  channel = '';
  loadError = false;
  currentTopic: Topic;
  public replies: Reply[];

  constructor(
    public appState: AppState, 
    private topicService: TopicService,
    private appUtil: AppUtil,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // 当前channel设定
    this.setCurrentChannel();

    // 获取详细数据
    this.getDetailData();
  }

  private getDetailData() {

    let topic_id;
    this.currentTopic = this.appState.state['CURRENT_TOPIC'];
    if (this.currentTopic) {
      // 说明是从一栏页面点击过来的
      topic_id = this.currentTopic.id;
    } else {
      // 说明是url地址过来的
      this.route.params.forEach((params: Params) => {
        topic_id = params['id'];
      });
    }

    console.log('current topic id is ' + this.channel + topic_id);
      
    this.topicService.getDetailData(this.channel, topic_id)
      .then(topic => {
        if (!this.currentTopic) {
          // 该场合表示刷新url的场合
          this.currentTopic = new Topic();
          this.currentTopic.id = topic_id;
          this.currentTopic.title = topic.title;
        }
        this.currentTopic.content = topic.content;
        this.replies = topic.replies;
      }).catch(err => this.loadError = true);

  }

  private setCurrentChannel() {
    let channelInMemory = this.appState.state['CURRENT_CHANNEL'];
    if (channelInMemory) {
      this.channel = channelInMemory;
    } else {
      let currentPath = this.appUtil.getCurrentPath(this.route);
      this.channel = currentPath.split('/')[1];
      this.channel = this.channel.split('_')[1];
      this.appState.set('CURRENT_CHANNEL', this.channel);
    }
  }

  gotoBack() {
    window.history.back();
  }

}
