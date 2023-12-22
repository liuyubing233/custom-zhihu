import { fetchGetUserinfo } from './commons/fetch';
import { fnJustNum } from './commons/math-for-my-listens';
import { myStorage } from './commons/storage';
import { dom, domA, domById, fnInitDomStyle, fnLog, pathnameHasFn, throttle } from './commons/tools';
import { CONFIG_SIMPLE } from './configs';
import { EXTRA_CLASS_HTML, HTML_HOOTS, ID_DIALOG } from './configs/dom-name';
import { initBlockWords } from './init/init-block-words';
import { initData } from './init/init-data';
import { initHistoryView } from './init/init-history-view';
import { initHTML } from './init/init-html';
import { initInviteOnce } from './init/init-invite-once';
import { initResizeObserver } from './init/init-observer-resize';
import { initOperate } from './init/init-operate';
import { onInitStyleExtra } from './init/init-style-extra';
import { needRedirect } from './init/redirect';
import { loadBackground, myCustomStyle } from './methods/background';
import { myCtzTypeOperation } from './methods/ctz-type-operate';
import { myDialog } from './methods/dialog-open-close';
import { addBtnForExportPeopleAnswer, addBtnForExportPeopleArticles, addButtonForArticleExportPDF, myCollectionExport } from './methods/export-PDF';
import { myFollowRemove } from './methods/follow-remove';
import { echoHistory } from './methods/history';
import { keydownNextImage } from './methods/image';
import { myListenAnswerItem } from './methods/listen-answer-item';
import { myListenListItem } from './methods/listen-list-item';
import { myListenSearchListItem } from './methods/listen-search-list-item';
import { doEventClickElement } from './methods/mouse-events';
import { myPageFilterSetting } from './methods/page-filter-setting';
import { suspensionPackUp } from './methods/suspension';
import { addArticleCreateTimeToTop, addQuestionCreatedAndModifiedTime } from './methods/time';
import { myVersion } from './methods/version';
import { fixVideoAutoPlay, initVideoDownload } from './methods/video';
import { store } from './store';
import { INNER_CSS } from './web-resources';

(function () {
  if (needRedirect()) return;
  const T0 = performance.now();
  const { pathname, hostname, host, search } = location;
  const { setStorageConfigItem, getStorageConfigItem, getConfig, setConfig, setHistory, setUserinfo, setHomeFetch } = store;

  /** 挂载脚本时 document.head 是否渲染 */
  let isHaveHeadWhenInit = true;

  /** 在启动时注入的内容 */
  async function onDocumentStart() {
    if (!HTML_HOOTS.includes(hostname) || window.frameElement) return;
    if (!document.head) {
      fnLog('not find document.head, waiting for reload...');
      isHaveHeadWhenInit = false;
      return;
    }

    fixVideoAutoPlay();
    fnInitDomStyle('CTZ_STYLE', INNER_CSS);
    const config = getConfig();
    setStorageConfigItem('cachePfConfig', config);
    setConfig(await myStorage.initConfig());
    setHistory(await myStorage.initHistory());
    initHistoryView();
    onInitStyleExtra();
    EXTRA_CLASS_HTML[host] && dom('html')!.classList.add(EXTRA_CLASS_HTML[host]);

    const prevHeaders = getStorageConfigItem('fetchHeaders') as HeadersInit;

    // 拦截 fetch 方法，获取接口内容，唯一
    const originFetch = fetch;
    unsafeWindow.fetch = (url: any, opt) => {
      // if (/\/v4\/questions\?/.test(url) && (myListenSelect.keySort === 'vote' || myListenSelect.keySort === 'comment') && myListenSelect.isSortFirst) {
      //   // 如果是自定义排序则回答页码增加到20条
      //   url = url.replace(/(?<=limit=)\d+(?=&)/, '20');
      // }
      // 缓存 header
      if (opt && opt.headers) {
        setStorageConfigItem('fetchHeaders', {
          ...prevHeaders,
          ...opt.headers,
        });

        if (/\/api\/v4\/members\/[\w\W]+\/answers/.test(url)) {
          // 如果为用户页面的 回答栏
          setHomeFetch('answer', { url, header: opt.headers });
        }

        if (/\/api\/v4\/members\/[\w\W]+\/articles/.test(url)) {
          // 如果为用户页面的 文章栏
          setHomeFetch('articles', { url, header: opt.headers });
        }

        // if (REG_URL_FOR_ZHIHU_LIST.test(url)) {
        //   fetchSelf(url, opt!.headers!);
        // }
      }

      return originFetch(url, opt);
    };

    // const matched = search.match(/(?<=sort=)\w+/);
    // if (/\/question/.test(pathname) && matched) {
    //   myListenSelect.keySort = matched[0];
    // }
    setUserinfo(await fetchGetUserinfo());
  }
  onDocumentStart();

  /** 页面加载完成（不包含资源） */
  window.addEventListener(
    'DOMContentLoaded',
    async () => {
      myListenListItem.getScriptData();
      // 如果脚本注入时 document.head 未加载完成则在页面渲染后重新进行加载
      if (!isHaveHeadWhenInit) {
        await onDocumentStart();
      }

      if (HTML_HOOTS.includes(hostname) && !window.frameElement) {
        const { removeTopAD } = getConfig();
        // 不考虑在 iframe 中的情况
        initHTML();
        initOperate();
        initData();
        // 页面加载完成后再进行加载背景色, 解决存在顶部推广的 header 颜色
        loadBackground();
        myVersion.initAfterLoad();
        myCustomStyle.init();
        initBlockWords();
        initResizeObserver();
        myCtzTypeOperation.init();
        echoHistory();

        dom('[name="useSimple"]')!.onclick = async function () {
          const isUse = confirm('是否启用极简模式？\n该功能会覆盖当前配置，建议先将配置导出保存');
          if (!isUse) return;
          myStorage.configUpdate({
            ...getConfig(),
            ...CONFIG_SIMPLE,
          });
          onDocumentStart();
          initData();
        };

        if (removeTopAD) {
          // 模拟鼠标点击顶部活动推广关闭按钮
          doEventClickElement(dom('svg.css-1p094v5'));
        }
      }

      pathnameHasFn({
        question: () => {
          // myListenSelect.init();
          addQuestionCreatedAndModifiedTime();
          const nodeQuestionAnswer = dom('.QuestionAnswer-content');
          nodeQuestionAnswer && fnJustNum(nodeQuestionAnswer);
          initInviteOnce();
        },
        filter: () => myPageFilterSetting.init(),
        collection: () => myCollectionExport.init(),
        following: () => myFollowRemove.init(),
        answers: () => addBtnForExportPeopleAnswer(),
        posts: () => addBtnForExportPeopleArticles(),
      });

      if (host === 'zhuanlan.zhihu.com') {
        addArticleCreateTimeToTop();
        const nodeArticle = dom('.Post-content');
        if (nodeArticle) {
          addButtonForArticleExportPDF(nodeArticle);
          initVideoDownload(nodeArticle);
        }
      }
      fnLog(
        `加载完毕, 加载时长: ${
          Math.floor((performance.now() - T0) / 10) / 100
        }s, 可使用 shift + . 或点击左侧眼睛按钮唤起修改器弹窗，如果快捷键不生效可以在控制台使用 window.openCtz() 唤起`
      );
    },
    false
  );

  /** 页面路由变化, 部分操作方法 */
  const changeHistory = () => {
    pathnameHasFn({
      filter: () => myPageFilterSetting.init(),
      following: () => myFollowRemove.init(),
      answers: throttle(addBtnForExportPeopleAnswer),
      posts: throttle(addBtnForExportPeopleArticles),
    });
    // 重置监听起点
    myListenListItem.reset();
    myListenSearchListItem.reset();
    myListenAnswerItem.reset();
  };
  /** history 变化 */
  window.addEventListener('popstate', changeHistory);
  window.addEventListener('pushState', changeHistory);

  /** 页面资源加载完成 */
  window.addEventListener('load', () => {
    // 如果存在登录弹窗则移除
    const nodeSignModal = dom('.signFlowModal');
    const nodeSignClose = nodeSignModal && (nodeSignModal.querySelector('.Modal-closeButton') as HTMLButtonElement);
    nodeSignClose && nodeSignClose.click();

    if (host === 'zhuanlan.zhihu.com') {
      const nodeArticle = dom('.Post-content');
      if (nodeArticle) {
        initVideoDownload(nodeArticle);
      }
    }

    pathnameHasFn({
      zvideo: () => {
        const domFind = dom('.ZVideo-mainColumn');
        domFind && initVideoDownload(domFind);
      },
    });
  });

  window.addEventListener('keydown', (event) => {
    const { hotKey } = getConfig();
    if (hotKey) {
      // shift + . 唤醒关闭修改器弹窗
      if (event.key === '>' || event.key === '》') {
        const nodeDialog = domById(ID_DIALOG);
        nodeDialog && nodeDialog.style.display === 'none' ? myDialog.open() : myDialog.hide();
      }
    }
    // esc 关闭弹窗
    if (event.key === 'Escape') {
      myDialog.hide();
    }

    keydownNextImage(event);
  });
  unsafeWindow.openCtz = myDialog.open;

  // 复制代码块删除版权信息
  document.addEventListener('copy', function (event) {
    // @ts-ignore window.clipboardData 是存在于IE中
    let clipboardData = event.clipboardData || window.clipboardData;
    if (!clipboardData) return;
    const selection = window.getSelection();
    let text = selection ? selection.toString() : '';
    if (text) {
      event.preventDefault();
      clipboardData.setData('text/plain', text);
    }
  });

  /** 页面滚动方法 */
  window.addEventListener(
    'scroll',
    throttle(() => {
      const { suspensionPickUp } = getConfig();
      if (suspensionPickUp) {
        suspensionPackUp(domA('.List-item'));
        suspensionPackUp(domA('.TopstoryItem'));
        suspensionPackUp(domA('.AnswerCard'));
      }
    }, 100),
    false
  );
})();
