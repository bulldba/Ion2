import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Data } from '../../providers/data';
declare var YCQQ, Wechat;
@Component({
  selector: 'page-news-content',
  templateUrl: 'news-content.html'
})
export class NewsContentPage {
  id: String;
  content: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public data: Data, public menuCtrl: MenuController) {
    this.id = this.navParams.get('id');
    this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.swipeEnable(true);
  }

  ionViewDidLoad() {
    this.data.getZhihuContent(this.id).then(res => {
      this.content = res;
    })
  }
  shareContent(type, content) {
    switch (type) {
      case 'QQ':
        let QQ = {
          url: content.share_url,
          title: content.title,
          description: "来自Ion2--基于Ionic2的资讯类APP",
          imageUrl: content.images[0],
          appName: "Ion2"
        };
        YCQQ.shareToQQ(function () {
          alert("share success");
        }, function (failReason) {
          alert(failReason);
        }, QQ);
        break;
      case 'Qzone':
        let Qzone = {
          url: content.share_url,
          title: content.title,
          description: "来自Ion2--基于Ionic2的资讯类APP",
          imageUrl: content.images,
          appName: "Ion2"
        };
        YCQQ.shareToQzone(function () {
          alert("share success");
        }, function (failReason) {
          alert(failReason);
        }, Qzone);
        break;
      case 'weixin':
        Wechat.share({
          message: {
            title: content.title,
            description: "来自Ion2--基于Ionic2的资讯类APP",
            thumb: content.images[0],
            mediaTagName: "TEST-TAG-001",
            messageExt: "这是第三方带的测试字段",
            messageAction: "<action>dotalist</action>",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: content.share_url
            }
          },
          scene: Wechat.Scene.TIMELINE   // share to Timeline
        }, function () {
          alert("Success");
        }, function (reason) {
          alert("Failed: " + reason);
        });
        break;
    }
  }

}