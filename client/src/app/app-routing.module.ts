import { NgModule } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { HomeComponent } from './home';
import { TopicListComponent } from './topic-list';
import { TopicDetailComponent } from './topic-detail';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'topics/v2ex/:tab', component: TopicListComponent },
    { path: 'topics/cnode/:tab', component: TopicListComponent },
    { path: 'topic_cnode/:id', component: TopicDetailComponent },
    { path: 'topic_v2ex/:id', component: TopicDetailComponent }
];

/**
 * { useHash: true } 设置的作用是避免与node服务的url冲突，导致刷新时候不走angular的路由
 * 
 * @export
 * @class AppRoutingModule
 */
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule { }
