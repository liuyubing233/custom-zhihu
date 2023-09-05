import { IFindEvent, IFindEventEntries, IHeaderDoms, IPfHistory, IStorageConfig, IUserinfo } from "../types/variable-cache";
import { IPfConfig } from "../types/variable-configs";
import { CONFIG_FILTER_DEFAULT, CONFIG_HIDDEN_DEFAULT, CONFIG_SUSPENSION } from "../variable/configs";

type IKeyofHistory = keyof IPfHistory;
type IKeyofFindEvent = keyof IFindEvent;
type IKeyofStorageConfig = keyof IStorageConfig;
type IContentStorageConfig = string | number | IPfConfig | HeadersInit | IHeaderDoms;

class Store {
  /** 修改器配置 */
  pfConfig: IPfConfig = {
    ...CONFIG_HIDDEN_DEFAULT,
    ...CONFIG_FILTER_DEFAULT,
    ...CONFIG_SUSPENSION,
    customizeCss: '',
    answerOpen: '',
    filterKeywords: [],
    showBlockUser: true,
    colorBackground: '#ffffff',
    versionHome: '1000',
    versionAnswer: '1000',
    versionArticle: '690',
    zoomImageType: '0',
    zoomImageSize: '600',
    showGIFinDialog: true,
    globalTitle: '',
    titleIco: '',
    questionTitleTag: true,
    listOutPutNotInterested: false,
    fixedListItemMore: false,
    highlightOriginal: true,
    highlightListItem: false,
    listItemCreatedAndModifiedTime: true,
    answerItemCreatedAndModifiedTime: true,
    questionCreatedAndModifiedTime: true,
    articleCreateTimeToTop: true,
    linkShopping: '0',
    linkAnswerVideo: '0',
    fontSizeForList: 15,
    fontSizeForAnswer: 15,
    fontSizeForArticle: 16,
    zoomListVideoType: '0',
    zoomListVideoSize: '500',
    hotKey: true,
  };

  /** 缓存浏览历史记录 */
  pfHistory: IPfHistory = {
    view: [],
    list: [],
  };

  /** 用户信息 更改prev: userInfo */
  userinfo: IUserinfo | undefined = undefined;

  findEvent: IFindEvent = {
    header: { fun: null, num: 0, isFind: false },
  };

  /** 脚本内配置缓存 */
  storageConfig: IStorageConfig = {
    cachePfConfig: {},
    cacheTitle: '',
    fetchHeaders: {},
    heightForList: 0,
    headerDoms: {},
  };

  constructor() {}

  setConfig(inner: IPfConfig) {
    this.pfConfig = inner;
  }
  getConfig() {
    return this.pfConfig;
  }

  setHistory(inner: IPfHistory) {
    this.pfHistory = inner;
  }
  setHistoryItem(key: IKeyofHistory, content: string[]) {
    this.pfHistory[key] = content;
  }
  getHistory() {
    return this.pfHistory;
  }
  getHistoryItem(key: IKeyofHistory) {
    return this.pfHistory[key];
  }

  setUserinfo(inner: IUserinfo) {
    this.userinfo = inner;
  }
  getUserinfo() {
    return this.userinfo;
  }

  setFindEvent(inner: IFindEvent) {
    this.findEvent = inner;
  }
  setFindEventItem(key: IKeyofFindEvent, content: IFindEventEntries) {
    this.findEvent[key] = content;
  }
  getFindEvent() {
    return this.findEvent;
  }
  getFindEventItem(key: IKeyofFindEvent) {
    return this.findEvent[key];
  }

  setStorageConfig(inner: IStorageConfig) {
    this.storageConfig = inner;
  }
  setStorageConfigItem(key: IKeyofStorageConfig, content: IContentStorageConfig) {
    (this.storageConfig[key] as IContentStorageConfig) = content;
  }
  getStorageConfig() {
    return this.storageConfig;
  }
  getStorageConfigItem(key: IKeyofStorageConfig): IContentStorageConfig {
    return this.storageConfig[key];
  }
}

export const store = new Store();
