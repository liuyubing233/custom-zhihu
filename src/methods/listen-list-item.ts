import { fnHidden, fnJustNum } from '../commons/math-for-my-listens';
import { myStorage } from '../commons/storage';
import { createBtnSmallTran, domA, domP } from '../commons/tools';
import { CLASS_NOT_INTERESTED, CLASS_TO_QUESTION, FILTER_FOLLOWER_OPERATE, THEME_CONFIG_DARK, THEME_CONFIG_LIGHT } from '../configs';
import { store } from '../store';
import { EThemeDark, EThemeLight, IZhihuCardContent, IZhihuDataZop } from '../types';
import { isDark } from './background';

/** 监听列表内容 - 过滤  */
export const myListenListItem = {
  index: 0,
  init: async function () {
    const nodes = domA('.TopstoryItem');
    if (this.index + 1 === nodes.length) return;
    const userinfo = store.getUserinfo();
    const pfConfig = await myStorage.getConfig();
    const {
      filterKeywords = [],
      blockWordsAnswer = [],
      removeItemAboutVideo,
      removeItemAboutPin,
      removeItemAboutArticle,
      removeLessVote,
      lessVoteNumber = 0,
      removeItemQuestionAsk,
      removeFollowVoteAnswer,
      removeFollowVoteArticle,
      removeFollowFQuestion,
      listOutPutNotInterested,
      highlightOriginal,
      themeDark = EThemeDark.深色护眼一,
      themeLight = EThemeLight.默认,
      removeMyOperateAtFollow,
      listOutputToQuestion,
      fetchInterceptStatus,
    } = pfConfig;
    const pfHistory = await myStorage.getHistory();
    const historyList = pfHistory.list;
    // 如果 this.index 为 0 则从第 0 位开始
    // 否则则从 this.index + 1 位开始，解决上一次遍历末尾跟这次便利开始重复的问题
    for (let i = this.index === 0 ? 0 : this.index + 1, len = nodes.length; i < len; i++) {
      const nodeItem = nodes[i];
      const nodeItemContent = nodeItem.querySelector('.ContentItem');
      if (!nodeItem.scrollHeight || !nodeItemContent) continue;
      let message = ''; // 屏蔽信息
      let dataZop: IZhihuDataZop = {};
      let cardContent: IZhihuCardContent = {};
      /** 是否视频回答 */
      const isVideo = nodeItemContent.classList.contains('ZVideoItem');
      /** 是否文章 */
      const isArticle = nodeItemContent.classList.contains('ArticleItem');
      /** 是否想法 */
      const isTip = nodeItemContent.classList.contains('PinItem');
      try {
        dataZop = JSON.parse(nodeItemContent.getAttribute('data-zop') || '{}');
        cardContent = JSON.parse(nodeItemContent.getAttribute('data-za-extra-module') || '{}').card.content;
      } catch {}
      const { title = '' } = dataZop || {};
      // 关注列表屏蔽自己的操作
      if (removeMyOperateAtFollow && nodeItem.classList.contains('TopstoryItem-isFollow')) {
        try {
          const findUserId = (nodeItem.querySelector('.UserLink .UserLink-link') as HTMLAnchorElement).href.match(/[^\/]+$/)![0];
          const myUserId = userinfo!.url.match(/[^\/]+$/)![0];
          findUserId === myUserId && (message = '关注列表屏蔽自己的操作');
        } catch {}
      }
      // 列表种类过滤
      if (!message && ((isVideo && removeItemAboutVideo) || (isArticle && removeItemAboutArticle) || (isTip && removeItemAboutPin))) {
        message = `列表种类屏蔽，${nodeItemContent.classList.value}`;
      }
      // 屏蔽低赞内容
      if (!message && removeLessVote && (cardContent['upvote_num'] || 0) < lessVoteNumber) {
        message = `屏蔽低赞内容: ${title}, ${cardContent['upvote_num'] || 0}`;
      }
      // 屏蔽邀请回答
      if (!message && removeItemQuestionAsk && nodeItem.querySelector('.TopstoryQuestionAskItem')) {
        message = '屏蔽邀请回答';
      }
      // 关注列表屏蔽关注人操作
      if (!message && (removeFollowVoteAnswer || removeFollowVoteArticle || removeFollowFQuestion) && nodeItem.classList.contains('TopstoryItem-isFollow')) {
        const nodeFirstLine = nodeItem.querySelector('.FeedSource-firstline') as HTMLElement;
        const textFollowerOperate = nodeFirstLine ? nodeFirstLine.innerText : '';
        for (let itemOperate of FILTER_FOLLOWER_OPERATE) {
          const thisRep = new RegExp(itemOperate.rep);
          if (pfConfig[itemOperate.key] && thisRep.test(textFollowerOperate)) {
            message = `屏蔽关注人操作: ${textFollowerOperate}`;
            break;
          }
        }
      }
      // 标题屏蔽词过滤
      !message && (message = this.replaceBlockWord(title, nodeItemContent, filterKeywords, title, '标题'));
      // 内容屏蔽词过滤
      if (!message) {
        const domRichContent = nodeItem.querySelector('.RichContent');
        const innerText = domRichContent ? (domRichContent as HTMLElement).innerText : '';
        message = this.replaceBlockWord(innerText, nodeItemContent, blockWordsAnswer, title, '内容');
      }

      if (message) {
        // 是否需要隐藏元素
        fnHidden(nodeItem, message);
      } else {
        // 未隐藏的元素需添加的内容
        // 高亮原创
        if (highlightOriginal) {
          const userNameE = nodeItem.querySelector('.FeedSource-firstline .UserLink-link') as HTMLElement;
          const userName = userNameE ? userNameE.innerText : '';
          if (dataZop && dataZop.authorName === userName) {
            const dark = await isDark();
            const highlight = `background: ${
              dark
                ? `${THEME_CONFIG_DARK[themeDark].background2}!important;`
                : +themeLight === EThemeLight.默认
                ? '#fff3d4!important;'
                : `${THEME_CONFIG_LIGHT[themeLight].background}!important;`
            }`;
            const nodeActions = nodeItem.querySelector('.ContentItem-actions') as HTMLElement;
            nodeItem.style.cssText = `${highlight}border: 1px solid #aaa;`;
            nodeActions && (nodeActions.style.cssText = highlight);
          }
        }

        const nodeItemTitle = nodeItem.querySelector('.ContentItem-title');
        if (nodeItemTitle) {
          // 列表外置不感兴趣按钮
          if (listOutPutNotInterested && fetchInterceptStatus && !nodeItem.querySelector(`.${CLASS_NOT_INTERESTED}`)) {
            nodeItemTitle.appendChild(createBtnSmallTran('不感兴趣', CLASS_NOT_INTERESTED, { _params: { id: dataZop.itemId, type: dataZop.type } }));
          }
          // 推荐列表显示「直达问题」按钮
          if (listOutputToQuestion && !isVideo && !isArticle && !isTip && !nodeItem.querySelector(`.${CLASS_TO_QUESTION}`)) {
            const domUrl = nodeItemContent.querySelector('[itemprop="url"]');
            const pathAnswer = domUrl ? domUrl.getAttribute('content') || '' : '';
            nodeItemTitle.appendChild(createBtnSmallTran('直达问题', CLASS_TO_QUESTION, { _params: { path: pathAnswer.replace(/\/answer[\W\w]+/, '') } }));
          }
        }
      }
      // 缓存推荐列表
      if (domP(nodeItem, 'class', 'Topstory-recommend') && nodeItem.querySelector('.ContentItem-title a')) {
        const nodeA = nodeItem.querySelector('.ContentItem-title a') as HTMLAnchorElement;
        if (nodeA) {
          const itemT = isVideo ? RECOMMEND_TYPE.zvideo : isArticle ? RECOMMEND_TYPE.article : isTip ? RECOMMEND_TYPE.pin : RECOMMEND_TYPE.answer;
          historyList.unshift(`<a href="${nodeA.href}" target="_blank"><b style="${itemT.style}">「${itemT.name}」</b>${nodeA.innerText}</a>`);
        }
      }
      fnJustNum(nodeItem);
      if (i === len - 1) {
        this.index = i;
        myStorage.setHistoryItem('list', historyList);
      }
    }
  },
  reset: function () {
    this.index = 0;
  },
  restart: function () {
    this.reset();
    this.init();
  },
  replaceBlockWord: function (innerText: string, nodeItemContent: Element, blockWords: string[], title: string, byWhat: string) {
    if (innerText) {
      let matchedWord = '';
      for (let word of blockWords) {
        const rep = new RegExp(word.toLowerCase());
        if (rep.test(innerText.toLowerCase())) {
          matchedWord += `「${word}」`;
          break;
        }
      }
      if (matchedWord) {
        const elementItemProp = nodeItemContent.querySelector('[itemprop="url"]');
        const routeURL = elementItemProp && elementItemProp.getAttribute('content');
        return `${byWhat}屏蔽词匹配，匹配内容：${matchedWord}，《${title}》，链接：${routeURL}`;
      }
    }
    return '';
  },
};

const RECOMMEND_TYPE = {
  answer: {
    name: '问题',
    style: 'color: #ec7259',
  },
  article: {
    name: '文章',
    style: 'color: #00965e',
  },
  zvideo: {
    name: '视频',
    style: 'color: #12c2e9',
  },
  pin: {
    name: '想法',
    style: 'color: #9c27b0',
  },
};
