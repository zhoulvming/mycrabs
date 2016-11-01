import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Topic } from '../models/topic';
import { Reply } from '../models/reply';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TopicService {
  constructor(public http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An service error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getTopics(channel, tab): Promise<Topic[]> {

    let url = '';
    if (channel == 'cnode') {
      url = 'http://localhost:3000/cnode-api/topics';
    } else if (channel == 'v2ex') {
      url = 'http://localhost:3000/v2exList';
    }

    return this.http.get(url)
      .toPromise()
      .then(response => {
        let topics: Topic[] = [];
        response.json().forEach(item => {
          topics.push({
            id: item.id,
            title: item.title,
            created: item.created,
            author_id: item.author_id,
            author_name: item.author_name,
            author_avatar_mini: item.author_avatar_mini,
            replies_count: item.replies_count,
            content_url: item.content_url,
            content: ''
          });
        });
        return topics;
      })
      .catch(this.handleError);
  }

  getDetailData(channel, id): Promise<any> {
    if (channel == 'cnode') {
      return this.getCnodeDetailData(id);
    } else {
      return this.getCnodeDetailData(id);
    }
  }

  private getCnodeDetailData(id): Promise<any> {
    return this.http.get('http://localhost:3000/cnode-api/topic/'+id).toPromise()
      .then(response => {
        let topic = response.json();
        return topic;
      })
      .catch(this.handleError);
  }

  private getV2exDetailData(id): Promise<any> {
    return null;
  }

  getV2exReplyData(id): Promise<Reply[]> {
    return this.http.get('v2ex_reply?topic_id=' + id).toPromise()
      .then(response => {
        let replies: Reply[] = [];
        response.json().forEach(item => {
          replies.push({
            id: item.id,
            content: item.content_rendered,
            member: {
              id: item.member.id,
              username: item.member.username,
              avatar_mini: item.member.avatar_mini,
              avatar_normal: item.member.avatar_normal,
              avatar_large: item.member.avatar_large
            },
            created: item.created,
            last_modified: item.last_modified
          });
        });
        return replies;
      })
      .catch(this.handleError);
  }

}