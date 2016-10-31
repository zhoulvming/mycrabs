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

  loadError = false;
  topics: Topic[];
  currentTopic: Topic;

  constructor(
    public appState: AppState,
    public appUtil: AppUtil,
    public topicService: TopicService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    let currentPath = this.appUtil.getCurrentPath(this.route);
    let channel = currentPath.split('/')[2];
    let tab = currentPath.split('/')[3];

    this.getListData(channel, tab);
  }

  getListData(channel, tab) {
    let list_data_key = 'topics_' + channel;
    let topicsInMemory = this.appState.state[list_data_key];
    if (topicsInMemory) {
      console.log('get list data('+ channel +') from cache');
      this.topics = topicsInMemory;
    } else {
      this.topicService.getTopics(channel, tab)
        .then(topics => {
          console.log('get list data from remote server('+ channel +')');
          this.topics = topics;
          this.appState.set(list_data_key, topics);
        })
        .catch(err => this.loadError = true);
    }
  }

  onSelect(topic) {
    this.appState.set('currentTopic', topic);
    let link = ['/topic', topic.id];
    this.router.navigate(link);
  }
}