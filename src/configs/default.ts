import { IConfigFilter, IConfigHidden, IConfigSuspension, IPfConfig } from "../types/variable-configs.type";

/** 隐藏内容模块默认为 true 的配置 */
export const CONFIG_HIDDEN_DEFAULT: IConfigHidden = {
  hiddenAnswerRightFooter: true,
  hiddenReadMoreText: true,
  hiddenAD: true,
  hiddenDetailFollow: true,
  hidden618HongBao: true,
};

/** 屏蔽内容模块默认配置 */
export const CONFIG_FILTER_DEFAULT: IConfigFilter = {
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
  removeMyOperateAtFollow: false,
};

/** 悬浮模块默认配置 */
export const CONFIG_SUSPENSION: IConfigSuspension = {
  suspensionHomeTab: false,
  suspensionHomeTabPo: 'left: 20px; top: 100px;',
  suspensionHomeTabFixed: true,
  suspensionFind: false,
  suspensionFindPo: 'left: 10px; top: 380px;',
  suspensionFindFixed: true,
  suspensionSearch: false,
  suspensionSearchPo: 'left: 10px; top: 400px;',
  suspensionSearchFixed: true,
  suspensionUser: false,
  suspensionUserPo: 'right: 60px; top: 100px;',
  suspensionUserFixed: true,
  suspensionPickUp: true,
};

/** 极简模式配置 */
export const CONFIG_SIMPLE: IPfConfig = {
  hiddenAnswerRightFooter: true,
  hiddenFixedActions: true,
  hiddenLogo: true,
  hiddenHeader: true,
  hiddenHeaderScroll: true,
  hiddenItemActions: true,
  hiddenAnswerText: true,
  hiddenQuestionShare: true,
  hiddenQuestionTag: true,
  hiddenQuestionActions: true,
  hiddenReward: true,
  hiddenZhuanlanTag: true,
  hiddenListImg: true,
  hiddenReadMoreText: true,
  hiddenAD: true,
  hiddenAnswers: true,
  hiddenZhuanlanActions: true,
  hiddenZhuanlanTitleImage: true,
  hiddenHotItemMetrics: true,
  hiddenHotItemIndex: true,
  hiddenHotItemLabel: true,
  hiddenDetailAvatar: true,
  hiddenDetailBadge: true,
  // hiddenDetailVoters: true,
  hiddenWhoVoters: true,
  hiddenDetailName: true,
  hiddenDetailFollow: true,
  hiddenHomeTab: false,
  hiddenQuestionSide: true,
  hiddenQuestionFollowing: true,
  hiddenQuestionAnswer: true,
  hiddenQuestionInvite: true,
  hiddenSearchBoxTopSearch: true,
  hiddenSearchPageTopSearch: true,
  hiddenSearchPageFooter: true,
  hiddenZhuanlanShare: true,
  hiddenZhuanlanVoters: true,
  hiddenListAnswerInPerson: true,
  hiddenFollowAction: true,
  hiddenFollowChooseUser: true,
  hidden618HongBao: true,
  hiddenZhuanlanFollowButton: true,
  hiddenZhuanlanAvatarWrapper: true,
  hiddenZhuanlanAuthorInfoHead: true,
  hiddenZhuanlanAuthorInfoDetail: true,
  hiddenQuestionSpecial: true,
  hiddenListVideoContent: true,
  hiddenHomeCreatorEntrance: true,
  hiddenHomeRecommendFollow: true,
  hiddenHomeCategory: true,
  hiddenHomeCategoryMore: true,
  hiddenHomeFooter: true,
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
  removeItemAboutAD: false,
  removeItemAboutArticle: false,
  removeItemAboutVideo: false,
  removeItemQuestionAsk: false,
  removeLessVote: false,
  lessVoteNumber: 100,
  removeLessVoteDetail: false,
  lessVoteNumberDetail: 100,
  suspensionHomeTab: false,
  suspensionHomeTabPo: 'left: 20px; top: 100px;',
  suspensionHomeTabFixed: true,
  suspensionFind: false,
  suspensionFindPo: 'left: 10px; top: 380px;',
  suspensionFindFixed: true,
  suspensionSearch: true,
  suspensionSearchPo: 'left: 10px; top: 400px;',
  suspensionSearchFixed: true,
  suspensionUser: true,
  suspensionUserPo: 'right: 60px; top: 100px;',
  suspensionUserFixed: true,
  suspensionPickUp: true,
  answerOpen: 'off',
  showBlockUser: false,
  zoomImageType: '2',
  zoomImageSize: '200',
  showGIFinDialog: true,
  questionTitleTag: true,
  listOutPutNotInterested: true,
  fixedListItemMore: true,
  highlightOriginal: true,
  highlightListItem: true,
  listItemCreatedAndModifiedTime: true,
  answerItemCreatedAndModifiedTime: true,
  questionCreatedAndModifiedTime: true,
  articleCreateTimeToTop: true,
  linkShopping: '1',
  hiddenAnswerItemActions: true,
  hiddenAnswerItemTime: true,
  videoUseLink: true,
};

/** 缓存的历史记录数量 */
export const SAVE_HISTORY_NUMBER = 500;
