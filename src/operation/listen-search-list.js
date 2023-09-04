import { pfConfig } from '../variable/configs';
import { fnHiddenDom, fnIndexMath, fnJustNum } from './listen-math';

/** 监听搜索列表 - 过滤  */
export const myListenSearchListItem = {
  index: 0,
  init: function () {
    const { removeItemAboutVideo, removeItemAboutArticle, removeItemAboutAD, removeLessVote, lessVoteNumber } = pfConfig;
    const elements = domA('.SearchResult-Card[role="listitem"]');
    let lessNum = 0;
    for (let i = this.index, len = elements.length; i < len; i++) {
      let message = ''; // 屏蔽信息
      const elementThis = elements[i];
      if (!elementThis) continue;
      // FIRST
      // 列表种类屏蔽
      const haveAD = removeItemAboutAD && elementThis.querySelector('.KfeCollection-PcCollegeCard-root');
      const haveArticle = removeItemAboutArticle && elementThis.querySelector('.ArticleItem');
      const haveVideo = removeItemAboutVideo && elementThis.querySelector('.ZvideoItem');
      (haveAD || haveArticle || haveVideo) && (message = '列表种类屏蔽');
      // 低赞内容过滤
      if (removeLessVote && !message) {
        const elementUpvote = elementThis.querySelector('.ContentItem-actions .VoteButton--up');
        const ariaLabel = elementUpvote ? elementUpvote.getAttribute('aria-label') : '';
        const upvoteText = ariaLabel ? ariaLabel.trim().replace(/\W+/, '') : '0';
        const upvote = upvoteText.includes('万') ? upvoteText.replace('万', '').trim() * 10000 : +upvoteText;
        if (upvote > -1 && upvote < lessVoteNumber) {
          message = `屏蔽低赞内容: ${upvote}赞`;
        }
      }
      fnJustNum(elementThis);
      // 最后信息 & 起点位置处理
      message && (lessNum = fnHiddenDom(lessNum, elementThis, message));
      this.index = fnIndexMath(this.index, i, len, lessNum);
    }
  },
  reset: function () {
    this.index = 0;
  },
  restart: function () {
    this.reset();
    this.init();
  },
};
