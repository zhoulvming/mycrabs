// import { Component, OnInit } from '@angular/core';

import {
  Component,
  Input,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import {MdSidenav, MdDialog, MdDialogConfig} from "@angular/material";

import { ActivatedRoute, Router, Params }   from '@angular/router';
import { TopicService } from '../shared/services/topic.service';
import { Topic } from '../shared/models/topic';

import { AppState, AppUtil } from '../shared/services/app.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
  providers: [
    TopicService
  ],
})

export class TopicListComponent implements OnInit {

  channel = '';
  tab = '';
  loadError = false;
  topics: Topic[];

  constructor(
    public appState: AppState,
    public appUtil: AppUtil,
    public topicService: TopicService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // 当前channel设定
    this.setCurrentChannel();

    // 列表数据获取
    this.getListData();
  }

  private setCurrentChannel() {
    let channelInMemory = this.appState.state['CURRENT_CHANNEL'];
    if (channelInMemory) {
      this.channel = channelInMemory;
    } else {
      let currentPath = this.appUtil.getCurrentPath(this.route);
      this.channel = currentPath.split('/')[2];
      this.tab = currentPath.split('/')[3];
      this.appState.set('CURRENT_CHANNEL', this.channel);
    }
  }

  private getListData() {
    let list_data_key = 'topics_' + this.channel;
    let topicsInMemory = this.appState.state[list_data_key];
    if (topicsInMemory) {
      console.log('get list data('+ this.channel +') from cache');
      this.topics = topicsInMemory;
    } else {
      this.topicService.getTopics(this.channel, this.tab)
        .then(topics => {
          console.log('get list data from remote server('+ this.channel +')');
          this.topics = topics;
          this.appState.set(list_data_key, topics);
        })
        .catch(err => this.loadError = true);
    }
  }

  onSelect(topic) {
    this.appState.set('CURRENT_TOPIC', topic);
    let link = ['/topic_' + this.channel, topic.id];
    this.router.navigate(link);
  }
}