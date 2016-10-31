import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Topic } from '../shared/models/topic';
import { Reply } from '../shared/models/reply';
import { AppState } from '../shared/services/app.service';

import { TopicReplyComponent } from '../topic-reply';
import { TopicService } from '../shared/services/topic.service';

@Component({
  selector: 'topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css'],
  providers: [
    TopicService
  ],
})
export class TopicDetailComponent implements OnInit {

  loadError = false;
  currentTopic: Topic;
  public replies: Reply[];

  constructor(
    public appState: AppState, 
    private topicService: TopicService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentTopic = this.appState.state['currentTopic'];

    //todo: 先根据route path判断出当前channel
    var channel = 'cnode';
    
    if (this.currentTopic.content) {
      //console.log('has content' + this.currentTopic.content);
    } else {
      //console.log('still not set content');
      this.topicService.getCnodeDetailData(this.currentTopic.id)
        .then(topic => {
          this.currentTopic.content = topic.content;
          this.replies = topic.replies;
        }).catch(err => this.loadError = true);
    }

  }

  gotoBack() {
    window.history.back();
  }

}
