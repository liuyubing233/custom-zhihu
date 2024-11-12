import {
  IContentStorageConfig,
  IFindEvent,
  IFindEventEntries,
  IHomeFetch,
  IHomeFetchContent,
  IKeyofFindEvent,
  IKeyofHomeFetch,
  IKeyofStorageConfig,
  IStorageConfig,
  IZhihuUserinfo,
} from '../types';
import { IZhihuListTargetItem } from '../types/zhihu-list.type';

class Store {
  /** 用户信息 更改prev: userInfo */
  userinfo: IZhihuUserinfo | undefined = undefined;

  findEvent: IFindEvent = {
    header: { fun: null, num: 0, isFind: false },
  };

  /** 脚本内配置缓存 */
  storageConfig: IStorageConfig = {
    cachePfConfig: {},
    cacheTitle: '',
    fetchHeaders: {},
    // heightForList: 0,
    headerDoms: {},
  };

  /** 用户页面列表接口缓存 */
  homeFetch: IHomeFetch = {};
  /** 知乎列表接口或JSON内容缓存 */
  zhihuListTargets: IZhihuListTargetItem[] = [];

  constructor() {
    // to fix this is undefined
    this.setUserinfo = this.setUserinfo.bind(this);
    this.getUserinfo = this.getUserinfo.bind(this);
    this.setFindEvent = this.setFindEvent.bind(this);
    this.setFindEventItem = this.setFindEventItem.bind(this);
    this.getFindEvent = this.getFindEvent.bind(this);
    this.getFindEventItem = this.getFindEventItem.bind(this);
    this.setStorageConfig = this.setStorageConfig.bind(this);
    this.setStorageConfigItem = this.setStorageConfigItem.bind(this);
    this.getStorageConfig = this.getStorageConfig.bind(this);
    this.getStorageConfigItem = this.getStorageConfigItem.bind(this);
    this.getHomeFetch = this.getHomeFetch.bind(this);
    this.setHomeFetch = this.setHomeFetch.bind(this);
    this.setZhihuListTargets = this.setZhihuListTargets.bind(this);
    this.getZhihuListTargets = this.getZhihuListTargets.bind(this);
    this.clearZhihuListTargets = this.clearZhihuListTargets.bind(this);
  }

  setUserinfo(inner: IZhihuUserinfo) {
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
  setStorageConfigItem(key: IKeyofStorageConfig, content: any) {
    (this.storageConfig[key] as IContentStorageConfig) = content;
  }
  getStorageConfig() {
    return this.storageConfig;
  }
  getStorageConfigItem(key: IKeyofStorageConfig): IContentStorageConfig {
    return this.storageConfig[key];
  }

  getHomeFetch(key: IKeyofHomeFetch): IHomeFetchContent | undefined {
    return this.homeFetch[key];
  }
  setHomeFetch(key: IKeyofHomeFetch, content: IHomeFetchContent) {
    this.homeFetch[key] = content;
  }

  setZhihuListTargets(data: IZhihuListTargetItem[]) {
    this.zhihuListTargets = this.zhihuListTargets.concat(data);
  }
  clearZhihuListTargets() {
    this.zhihuListTargets = [];
  }
  getZhihuListTargets() {
    return this.zhihuListTargets;
  }
}

export const store = new Store();
