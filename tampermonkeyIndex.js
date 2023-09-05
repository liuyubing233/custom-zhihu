"use strict";
(() => {
  // src/variable/configs.ts
  var CONFIG_HIDDEN_DEFAULT = {
    hiddenAnswerRightFooter: true,
    hiddenReadMoreText: true,
    hiddenAD: true,
    hiddenDetailFollow: true,
    hidden618HongBao: true
  };
  var CONFIG_FILTER_DEFAULT = {
    removeZhihuOfficial: false,
    removeStoryAnswer: true,
    removeYanxuanAnswer: true,
    removeYanxuanRecommend: true,
    removeYanxuanCPRecommend: true,
    removeFromYanxuan: true,
    removeUnrealAnswer: false,
    removeFollowVoteAnswer: false,
    removeFollowVoteArticle: false,
    removeFollowFQuestion: false,
    removeBlockUserContent: true,
    removeBlockUserContentList: [],
    removeItemAboutAD: false,
    removeItemAboutArticle: false,
    removeItemAboutVideo: false,
    removeItemQuestionAsk: false,
    removeLessVote: false,
    lessVoteNumber: 100,
    removeLessVoteDetail: false,
    lessVoteNumberDetail: 100,
    removeAnonymousAnswer: false,
    removeMyOperateAtFollow: false
  };
  var CONFIG_SUSPENSION = {
    suspensionHomeTab: false,
    suspensionHomeTabPo: "left: 20px; top: 100px;",
    suspensionHomeTabFixed: true,
    suspensionFind: false,
    suspensionFindPo: "left: 10px; top: 380px;",
    suspensionFindFixed: true,
    suspensionSearch: false,
    suspensionSearchPo: "left: 10px; top: 400px;",
    suspensionSearchFixed: true,
    suspensionUser: false,
    suspensionUserPo: "right: 60px; top: 100px;",
    suspensionUserFixed: true,
    suspensionPickUp: true
  };
  var pfConfig = {
    ...CONFIG_HIDDEN_DEFAULT,
    ...CONFIG_FILTER_DEFAULT,
    ...CONFIG_SUSPENSION,
    customizeCss: "",
    answerOpen: "",
    filterKeywords: [],
    showBlockUser: true,
    colorBackground: "#ffffff",
    versionHome: "1000",
    versionAnswer: "1000",
    versionArticle: "690",
    zoomImageType: "0",
    zoomImageSize: "600",
    showGIFinDialog: true,
    globalTitle: "",
    titleIco: "",
    questionTitleTag: true,
    listOutPutNotInterested: false,
    fixedListItemMore: false,
    highlightOriginal: true,
    highlightListItem: false,
    listItemCreatedAndModifiedTime: true,
    answerItemCreatedAndModifiedTime: true,
    questionCreatedAndModifiedTime: true,
    articleCreateTimeToTop: true,
    linkShopping: "0",
    linkAnswerVideo: "0",
    fontSizeForList: 15,
    fontSizeForAnswer: 15,
    fontSizeForArticle: 16,
    zoomListVideoType: "0",
    zoomListVideoSize: "500",
    hotKey: true
  };

  // src/web-resources.ts
  var INNER_HTML = `<div id="CTZ_DIALOG_MAIN" style="display: none"><div class="ctz-header"><span>修改器</span><span class="ctz-version"></span><i id="CTZ_CLOSE_DIALOG" class="ctz-icon">&#xe602;</i></div><div class="ctz-menu-top"><a href="#CTZ_BASIS">基础设置</a><a href="#CTZ_LIST">首页列表</a><a href="#CTZ_ANSWER">回答详情</a><a href="#CTZ_ARTICLE">文章专栏</a><a href="#CTZ_HISTORY">历史记录</a><a href="#CTZ_BLACKLIST">黑名单设置</a></div><div class="ctz-content"><div id="CTZ_BASIS" style="display: none"><div class="ctz-content-left"><a href="#CTZ_BASIS_DEFAULT">基本设置</a><a href="#CTZ_BASIS_FLOAT">悬浮模块</a><a href="#CTZ_BASIS_HIDDEN">通用模块隐藏</a><a href="#CTZ_BASIS_COLOR">颜色设置</a><a href="#CTZ_BASIS_CONFIG">配置操作</a><a href="#CTZ_BASIS_MORE">默认功能</a></div><div class="ctz-content-right"><div class="ctz-commit-top">当前设置为通用设置，设置完成后在所有页面生效</div><div id="CTZ_BASIS_DEFAULT"><div class="ctz-set-title"><span>基本设置</span></div><div class="ctz-set-content"><div><label><span class="ctz-label">不显示修改器唤醒图标<span class="ctz-icon" style="margin: 0 6px">&#xe603;</span></span><input class="ctz-i" name="hiddenOpenButton" type="checkbox" value="on" /></label></div><div><label><span class="ctz-label">快捷键唤起编辑器<span class="key-shadow">></span>(<span class="key-shadow">Shift</span>+<span class="key-shadow">.</span>)</span><input class="ctz-i" name="hotKey" type="checkbox" value="on" /></label></div><div><div class="ctz-label">全局修改网页标题</div><div class="ctz-flex-wrap"><input type="text" name="globalTitle" style="width: 250px" /><button class="ctz-button" name="buttonConfirmTitle" style="margin: 0 4px">确认</button><button class="ctz-button" name="buttonResetTitle">还原</button></div></div><div><div class="ctz-label">全局修改网页标题图片（图标可能会因为网络问题丢失）</div><div class="ctz-flex-wrap" id="CTZ_TITLE_ICO"></div></div><div><div class="ctz-flex-wrap"><div class="ctz-label">回答和文章图片尺寸</div><label><input class="ctz-i" name="zoomImageType" type="radio" value="0" />默认</label><label><input class="ctz-i" name="zoomImageType" type="radio" value="1" />原图</label><label><input class="ctz-i" name="zoomImageType" type="radio" value="2" />自定义</label></div><div id="CTZ_IMAGE_SIZE_CUSTOM" style="display: none"><div class="ctz-flex-wrap"><div class="ctz-label">自定义图片尺寸</div><input class="ctz-i" type="range" min="0" max="1000" name="zoomImageSize" style="width: 300px" /><span id="zoomImageSize" style="margin-left: 8px">0</span></div><div class="ctz-commit">滚动条范围: 0 ~ 1000</div></div></div><div class="ctz-flex-wrap"><span class="ctz-label">使用弹窗打开动图</span><input class="ctz-i" name="showGIFinDialog" type="checkbox" value="on" /></div></div></div><div id="CTZ_BASIS_FLOAT"><div class="ctz-set-title"><span>悬浮模块</span></div><div class="ctz-set-content"><div class="ctz-flex-wrap"><label><span class="ctz-label">回答内容「收起」按钮悬浮</span><input class="ctz-i" name="suspensionPickUp" type="checkbox" value="on" /></label></div><div><div class="ctz-label">信息模块悬浮</div><div class="ctz-commit">拖动悬浮模块定位位置</div><div class="ctz-commit">鼠标放置显示解锁按钮解锁即可拖动<i class="ctz-icon" style="margin-left: 4px">&#xe688;</i></div><div class="ctz-flex-wrap"><label><input class="ctz-i" name="suspensionHomeTab" type="checkbox" value="on" />首页列表切换</label><label><input class="ctz-i" name="suspensionFind" type="checkbox" value="on" />顶部发现模块</label><label><input class="ctz-i" name="suspensionUser" type="checkbox" value="on" />个人中心模块</label><label><input class="ctz-i" name="suspensionSearch" type="checkbox" value="on" />搜索栏模块</label></div></div></div></div><div id="CTZ_BASIS_HIDDEN"><div class="ctz-set-title"><span>通用模块隐藏<span class="ctz-desc">勾选隐藏相应模块内容</span></span></div><div class="ctz-set-content ctz-flex-wrap"></div></div><div id="CTZ_BASIS_COLOR"><div class="ctz-set-title"><span>颜色设置</span></div><div class="ctz-set-content"><div class="ctz-set-background"><div id="CTZ_BACKGROUND"></div></div></div></div><div id="CTZ_BASIS_CONFIG"><div class="ctz-set-title"><span>配置操作</span></div><div class="ctz-set-content"><div class="ctz-flex-wrap"><button class="ctz-button" name="useSimple">启用极简模式</button></div><div class="ctz-config-import-export"><div class="ctz-label">配置导出导入</div><div class="ctz-config-buttons"><button class="ctz-button" name="configExport">导出配置</button><button class="ctz-button" name="configReset">恢复默认配置</button></div><div class="ctz-content"><textarea name="textConfigImport" placeholder="配置可参考导出格式"></textarea><button class="ctz-button" name="configImport">导 入</button></div></div><div class="ctz-customize-css"><div class="ctz-label">自定义样式</div><div class="ctz-content"><textarea name="textStyleCustom" placeholder="格式为CSS"></textarea><button class="ctz-button" name="styleCustom">确 定</button></div></div></div></div><div id="CTZ_BASIS_MORE"><div class="ctz-set-title"><span>默认功能<span class="ctz-desc">此部分功能为编辑器默认功能，不需要额外开启</span></span></div><div class="ctz-set-content"><div id="CTZ_DEFAULT_SELF"></div><div class="ctz-zhihu-self"><div class="ctz-zhihu-key"><div>更加方便的浏览，按<span class="key-shadow">?</span>（<span class="key-shadow">Shift</span>+<span class="key-shadow">/</span>） 查看所有快捷键</div><a href="/settings/preference" target="_blank">前往开启快捷键功能</a></div></div></div></div></div></div><div id="CTZ_LIST" style="display: none"><div class="ctz-content-left"><a href="#CTZ_LIST_DEFAULT">基础设置</a><a href="#CTZ_LIST_FILTER">屏蔽内容</a><a href="#CTZ_LIST_HIDDEN">隐藏模块</a></div><div class="ctz-content-right"><div class="ctz-commit-top">当前设置完成后在问题列表、关注列表、热搜列表、搜索列表页面生效</div><div id="CTZ_LIST_DEFAULT"><div class="ctz-set-title"><span>基础设置</span></div><div class="ctz-set-content"><div><div class="ctz-flex-wrap"><div class="ctz-label">列表版心宽度</div><input class="ctz-i" type="range" min="600" max="1500" name="versionHome" style="width: 300px" /><span id="versionHome" style="margin-left: 8px">0</span></div><div class="ctz-commit">滚动条范围: 600 ~ 1500</div></div><div class="ctz-flex-wrap"><label><span class="ctz-label">内容标题添加类别显示<span class="ctz-label-tag ctz-label-tag-Answer">问答</span><span class="ctz-label-tag ctz-label-tag-Article">文章</span><span class="ctz-label-tag ctz-label-tag-ZVideo">视频</span></span><input class="ctz-i" name="questionTitleTag" type="checkbox" value="on" /></label></div><div class="ctz-flex-wrap"><label><span class="ctz-label">推荐列表显示「不感兴趣」按钮</span><input class="ctz-i" name="listOutPutNotInterested" type="checkbox" value="on" /></label></div><div class="ctz-flex-wrap"><label><span class="ctz-label">列表更多「···」按钮移动到题目右侧</span><input class="ctz-i" name="fixedListItemMore" type="checkbox" value="on" /></label></div><div class="ctz-flex-wrap"><label><span class="ctz-label">关注列表高亮原创内容</span><input type="checkbox" name="highlightOriginal" class="ctz-i" value="on" /></label></div><div class="ctz-flex-wrap"><label><span class="ctz-label">列表内容点击高亮边框</span><input type="checkbox" name="highlightListItem" class="ctz-i" value="on" /></label></div><div class="ctz-flex-wrap"><label><span class="ctz-label">列表内容显示发布时间和最后修改时间</span><input type="checkbox" name="listItemCreatedAndModifiedTime" class="ctz-i" value="on" /></label></div><div class="ctz-flex-wrap"><span class="ctz-label">列表内容标准文字大小</span><input type="number" name="fontSizeForList" class="ctz-i-change" /></div><div><div class="ctz-flex-wrap"><div class="ctz-label">列表视频回答内容尺寸</div><label><input class="ctz-i" name="zoomListVideoType" type="radio" value="0" />默认</label><label><input class="ctz-i" name="zoomListVideoType" type="radio" value="2" />自定义</label></div><div id="CTZ_LIST_VIDEO_SIZE_CUSTOM"><div class="ctz-flex-wrap"><input class="ctz-i" type="range" min="0" max="1000" name="zoomListVideoSize" style="width: 300px" /><span id="zoomListVideoSize" style="margin-left: 8px">0</span></div><div class="ctz-commit">滚动条范围: 0 ~ 1000</div></div></div></div></div><div id="CTZ_LIST_FILTER" class="ctz-filter-block"><div class="ctz-set-title"><span>屏蔽内容<span class="ctz-desc" style="color: red">此部分更改后请重新刷新页面</span></span></div><div class="ctz-set-content"><div class="ctz-filter-follow"><div class="ctz-label">关注列表关注人操作屏蔽</div><div class="ctz-flex-wrap"><label><input class="ctz-i" name="removeFollowVoteAnswer" type="checkbox" value="on" />赞同回答</label><label><input class="ctz-i" name="removeFollowVoteArticle" type="checkbox" value="on" />赞同文章</label><label><input class="ctz-i" name="removeFollowFQuestion" type="checkbox" value="on" />关注问题</label></div></div><div class="ctz-filter-me"><label style="display: flex; align-items: center"><span class="ctz-label">关注列表屏蔽自己的操作</span><input class="ctz-i" name="removeMyOperateAtFollow" type="checkbox" value="on" /></label></div><div class="ctz-filter-type"><div class="ctz-label">列表类别屏蔽</div><div class="ctz-commit" style="line-height: 22px">勾选后「关注、推荐、搜索」将屏蔽所勾选的类别内容</div><div class="ctz-flex-wrap"><label><input class="ctz-i" name="removeItemQuestionAsk" type="checkbox" value="on" />邀请回答</label><label><input class="ctz-i" name="removeItemAboutAD" type="checkbox" value="on" />商业推广</label><label><input class="ctz-i" name="removeItemAboutArticle" type="checkbox" value="on" />文章</label><label><input class="ctz-i" name="removeItemAboutVideo" type="checkbox" value="on" />视频</label></div></div><div class="ctz-filter-list-vote"><label style="display: flex; align-items: center"><span class="ctz-label">列表低赞内容屏蔽</span><input class="ctz-i" name="removeLessVote" type="checkbox" value="on" /></label><div style="font-size: 12px; color: #999; line-height: 22px">勾选后「关注、推荐、搜索」列表屏蔽点赞量少于<input name="lessVoteNumber" class="ctz-i-change" type="number" style="width: 50px" />的内容</div></div><div class="ctz-filter-word"><div class="ctz-label">列表屏蔽词，[关注、推荐]将屏蔽包含题目屏蔽词的内容</div><input name="inputFilterWord" type="text" placeholder="输入后回车或失去焦点（不区分大小写）" /><div id="CTZ_FILTER_WORDS"></div></div></div></div><div id="CTZ_LIST_HIDDEN"><div class="ctz-set-title"><span>隐藏模块<span class="ctz-desc">勾选隐藏相应模块内容</span></span></div><div class="ctz-set-content ctz-flex-wrap"></div></div></div></div><div id="CTZ_ANSWER" style="display: none"><div class="ctz-content-left"><a href="#CTZ_ANSWER_DEFAULT">基础设置</a><a href="#CTZ_ANSWER_FILTER">屏蔽内容</a><a href="#CTZ_ANSWER_HIDDEN">隐藏模块</a><a href="#CTZ_ANSWER_OPEN">回答展开收起</a></div><div class="ctz-content-right"><div class="ctz-commit-top">当前设置完成后问答内容页面生效</div><div id="CTZ_ANSWER_DEFAULT"><div class="ctz-set-title"><span>基础设置</span></div><div class="ctz-set-content"><div><div class="ctz-flex-wrap"><div class="ctz-label">回答版心宽度</div><input class="ctz-i" type="range" min="600" max="1500" name="versionAnswer" style="width: 300px" /><span id="versionAnswer" style="margin-left: 8px">0</span></div><div class="ctz-commit">滚动条范围: 600 ~ 1500</div></div><div class="ctz-flex-wrap"><label><span class="ctz-label">问题详情显示创建时间和最后修改时间</span><input type="checkbox" name="questionCreatedAndModifiedTime" class="ctz-i" value="on" /></label></div><div class="ctz-flex-wrap"><label><span class="ctz-label">回答内容显示创建时间与最后修改时间</span><input type="checkbox" name="answerItemCreatedAndModifiedTime" class="ctz-i" value="on" /></label></div><div class="ctz-flex-wrap"><span class="ctz-label">购物链接显示设置</span><label><input class="ctz-i" name="linkShopping" type="radio" value="0" />默认</label><label><input class="ctz-i" name="linkShopping" type="radio" value="1" />仅文字</label><label><input class="ctz-i" name="linkShopping" type="radio" value="2" />隐藏</label></div><div class="ctz-flex-wrap"><span class="ctz-label">回答视频显示设置</span><label><input class="ctz-i" name="linkAnswerVideo" type="radio" value="0" />默认</label><label><input class="ctz-i" name="linkAnswerVideo" type="radio" value="1" />仅链接</label><label><input class="ctz-i" name="linkAnswerVideo" type="radio" value="2" />隐藏</label></div><div class="ctz-flex-wrap"><span class="ctz-label">回答内容标准文字大小</span><input type="number" name="fontSizeForAnswer" class="ctz-i-change" /></div></div></div><div id="CTZ_ANSWER_FILTER" class="ctz-filter-block"><div class="ctz-set-title"><span>屏蔽内容 <span class="ctz-desc" style="color: red">此部分更改后请重新刷新页面</span></span></div><div class="ctz-set-content"><div class="ctz-filter-defail-who"><div class="ctz-label">屏蔽以下官方账号的回答</div><div style="margin-bottom: 8px; border-bottom: 1px solid #ebebeb; padding-bottom: 4px"><label><input class="ctz-i" name="removeZhihuOfficial" type="checkbox" value="on" />所有知乎官方账号</label></div><div class="ctz-flex-wrap"><label><input class="ctz-i" name="removeStoryAnswer" type="checkbox" value="on" />故事档案局</label><label><input class="ctz-i" name="removeYanxuanAnswer" type="checkbox" value="on" />盐选科普</label><label><input class="ctz-i" name="removeYanxuanRecommend" type="checkbox" value="on" />盐选推荐</label><label><input class="ctz-i" name="removeYanxuanCPRecommend" type="checkbox" value="on" />盐选测评室</label></div></div><div class="ctz-flex-wrap"><label><span class="ctz-label">屏蔽「匿名用户」回答</span><input class="ctz-i" name="removeAnonymousAnswer" type="checkbox" value="on" /></label></div><div class="ctz-filter-defail-tag"><div class="ctz-label">屏蔽带有以下标签的回答</div><div class="ctz-flex-wrap"><label><input class="ctz-i" name="removeFromYanxuan" type="checkbox" value="on" />选自盐选专栏</label><label><input class="ctz-i" name="removeUnrealAnswer" type="checkbox" value="on" />带有虚构创作</label></div></div><div class="ctz-filter-detail-vote"><label style="display: flex; align-items: center"><span class="ctz-label">详情低赞回答屏蔽</span><input class="ctz-i" name="removeLessVoteDetail" type="checkbox" value="on" /></label><div style="font-size: 12px; color: #999; line-height: 22px">勾选后问题详情页将屏蔽点赞量少于<input name="lessVoteNumberDetail" class="ctz-i-change" type="number" style="width: 50px" />的回答</div></div></div></div><div id="CTZ_ANSWER_HIDDEN"><div class="ctz-set-title"><span>隐藏模块<span class="ctz-desc">勾选隐藏相应模块内容</span></span></div><div class="ctz-set-content ctz-flex-wrap"></div></div><div id="CTZ_ANSWER_OPEN"><div class="ctz-set-title"><span>回答展开收起</span></div><div class="ctz-set-content ctz-flex-wrap"><label><input class="ctz-i" type="radio" name="answerOpen" value="" />知乎默认</label><label><input class="ctz-i" type="radio" name="answerOpen" value="on" />自动展开所有回答</label><label><input class="ctz-i" type="radio" name="answerOpen" value="off" />默认收起所有长回答</label></div></div></div></div><div id="CTZ_ARTICLE" style="display: none"><div class="ctz-content-left"><a href="#CTZ_ARTICLE_DEFAULT">基础设置</a><a href="#CTZ_ARTICLE_HIDDEN">隐藏模块</a></div><div class="ctz-content-right"><div class="ctz-commit-top">当前设置完成后在专栏文章页面生效</div><div id="CTZ_ARTICLE_DEFAULT"><div class="ctz-set-title"><span>基础设置</span></div><div class="ctz-set-content"><div><div class="ctz-flex-wrap"><div class="ctz-label">文章版心宽度</div><input class="ctz-i" type="range" min="600" max="1500" name="versionArticle" style="width: 300px" /><span id="versionArticle" style="margin-left: 8px">0</span></div><div class="ctz-commit">滚动条范围: 600 ~ 1500</div></div><div class="ctz-flex-wrap"><label><span class="ctz-label">文章发布时间置顶</span><input type="checkbox" name="articleCreateTimeToTop" class="ctz-i" value="on" /></label></div><div class="ctz-flex-wrap"><span class="ctz-label">文章内容标准文字大小</span><input type="number" name="fontSizeForArticle" class="ctz-i-change" /></div></div></div><div id="CTZ_ARTICLE_HIDDEN"><div class="ctz-set-title"><span>隐藏模块<span class="ctz-desc">勾选隐藏相应模块内容</span></span></div><div class="ctz-set-content ctz-flex-wrap"></div></div></div></div><div id="CTZ_HISTORY" style="display: none"><div class="ctz-content-left"><a href="#CTZ_HISTORY_LIST">推荐列表缓存</a><a href="#CTZ_HISTORY_VIEW">浏览历史记录</a></div><div class="ctz-content-right"><div id="CTZ_HISTORY_LIST"><div class="ctz-set-title"><span>推荐列表缓存<span class="ctz-desc">最多缓存500条，包含已过滤项</span></span></div><button class="ctz-button" name="button_history_clear" data-id="list">清空推荐列表缓存</button><div class="ctz-set-content"></div></div><div id="CTZ_HISTORY_VIEW"><div class="ctz-set-title"><span>浏览历史记录<span class="ctz-desc">最多缓存500条</span></span></div><button class="ctz-button" name="button_history_clear" data-id="view">清空浏览历史记录</button><div class="ctz-set-content"></div></div></div></div><div id="CTZ_BLACKLIST" style="display: none"><div class="ctz-content-left"><a href="#CTZ_BASIS_BLOCK">黑名单设置</a></div><div class="ctz-content-right"><div id="CTZ_BASIS_BLOCK"><div class="ctz-set-title"><span>黑名单设置</span></div><div class="ctz-set-content"><button id="CTZ-BUTTON-SYNC-BLOCK" name="syncBlack" class="ctz-button">同步黑名单</button><div class="ctz-flex-wrap"><label><span class="ctz-label">回答列表用户名后显示「屏蔽用户」按钮</span><input class="ctz-i" name="showBlockUser" type="checkbox" value="on" /></label></div><div class="ctz-flex-wrap"><label><span class="ctz-label">屏蔽黑名单用户发布的内容</span><input class="ctz-i" name="removeBlockUserContent" type="checkbox" value="on" /></label></div><div><div class="ctz-label">黑名单列表</div><div id="CTZ-BLOCK-LIST"></div></div></div></div></div></div></div><div class="ctz-footer"></div></div><div id="CTZ_OPEN_BUTTON" class="ctz-icon">&#xe603;</div><div style="display: none" class="ctz-preview" id="CTZ_PREVIEW_IMAGE"><div><img src="" /></div></div><div style="display: none" class="ctz-preview" id="CTZ_PREVIEW_VIDEO"><div><video src="" autoplay loop></video></div></div><iframe class="ctz-pdf-box-content" style="display: none"></iframe>`;

  // src/index.ts
  console.log("hahahah-----");
  console.log(INNER_HTML);
  var str = "";
  str = "哈哈哈哈";
  console.log(str);
  console.log(pfConfig);
})();
