import { Component, Input, OnInit } from '@angular/core';
import { TopicService } from '../shared/services/topic.service';
import { Reply } from '../shared/models/reply';

@Component({
  selector: 'topic-reply',
  templateUrl: './topic-reply.component.html',
  styleUrls: ['./topic-reply.component.css']
})
export class TopicReplyComponent implements OnInit {

  @Input()
  replies: Reply[];

  constructor(
    public topicService: TopicService) { }

  ngOnInit() {
    
  }

  private getV2exReplies() {

  }


}
