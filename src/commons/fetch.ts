import { store } from '../store';
import { IZhihuUserinfo } from '../types';
import { IZhihuListTargetItem } from '../types/zhihu-list.type';
import { fnLog } from './tools';

/** 调用「不感兴趣」接口 */
export const doFetchNotInterested = ({ id, type }: { id: string; type: string }) => {
  const nHeader = store.getStorageConfigItem('fetchHeaders') as Record<string, string>;
  delete nHeader['vod-authorization'];
  delete nHeader['content-encoding'];
  delete nHeader['Content-Type'];
  delete nHeader['content-type'];
  const idToNum = +id;
  if (String(idToNum) === 'NaN') {
    fnLog(`调用不感兴趣接口错误，id为NaN, 原ID：${id}`);
    return;
  }
  fetch('/api/v3/feed/topstory/uninterestv2', {
    body: `item_brief=${encodeURIComponent(JSON.stringify({ source: 'TS', type: type, id: idToNum }))}`,
    method: 'POST',
    headers: new Headers({
      ...nHeader,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }),
  }).then((res) => res.json());
};

/** 获取用户信息 */
export const fetchGetUserinfo = (): Promise<IZhihuUserinfo> => {
  const headers = store.getStorageConfigItem('fetchHeaders') as HeadersInit;
  return new Promise((resolve) => {
    fetch(
      `https://www.zhihu.com/api/v4/me?include=is_realname%2Cad_type%2Cavailable_message_types%2Cdefault_notifications_count%2Cfollow_notifications_count%2Cvote_thank_notifications_count%2Cmessages_count%2Cemail%2Caccount_status%2Cis_bind_phone%2Cfollowing_question_count%2Cis_force_renamed%2Crenamed_fullname%2Cis_destroy_waiting`,
      {
        method: 'GET',
        headers: new Headers(headers),
        credentials: 'include',
      }
    )
      .then((response) => response.json())
      .then((res: IZhihuUserinfo) => {
        resolve(res);
      });
  });
};

/** 知乎列表内容接口 */
export const REG_URL_FOR_ZHIHU_LIST = /\/api\/v3\/feed\/topstory\/recommend/;
export const fetchSelf = (url: string, headers?: HeadersInit) => {
  fetch(url, {
    method: 'GET',
    headers: new Headers(headers),
  })
    .then((response) => response.json())
    .then((res: any) => {
      if (REG_URL_FOR_ZHIHU_LIST.test(url)) {
        const nTargets = res.data.map((i: any) => i.target);
        store.setZhihuListTargets(nTargets as IZhihuListTargetItem[]);
      }
    });
};
