import { myStorage } from '../commons/storage';
import { dom, domById, domC, fnDomReplace, fnReturnStr } from '../commons/tools';
import { store } from '../store';
import { IBlockUserItem, IZhihuCardContent } from '../types';

/** id: 同步黑名单按钮 */
const ID_BUTTON_SYNC_BLOCK = 'CTZ-BUTTON-SYNC-BLOCK';
/** class: 黑名单元素删除按钮类名 */
const CLASS_REMOVE_BLOCK = 'ctz-remove-block';
/** id: 黑名单列表 */
const ID_BLOCK_LIST = 'CTZ-BLOCK-LIST';

/** 黑名单用户操作方法 */
export const myBlack = {
  messageCancel: '取消屏蔽之后，对方将可以：关注你、给你发私信、向你提问、评论你的答案、邀请你回答问题。',
  /** 初始化黑名单列表 */
  init: async function () {
    const me = this;
    const nodeBlank = domById(ID_BLOCK_LIST);
    if (!nodeBlank) return;
    const { removeBlockUserContentList = [] } = await myStorage.getConfig();
    nodeBlank.innerHTML = removeBlockUserContentList.map((i) => this.createItem(i)).join('');
    nodeBlank.onclick = (event) => {
      const target = event.target as HTMLElement;
      if (!target || !target.classList.contains(CLASS_REMOVE_BLOCK)) return;
      const item = target.parentElement as HTMLElement;
      const info = item.dataset.info ? JSON.parse(item.dataset.info) : {};
      confirm(me.messageCancel) && me.serviceRemove(info);
    };
  },
  /** 黑名单元素 */
  createItem: function (info: IBlockUserItem) {
    return `<div class="ctz-black-item ctz-black-id-${info.id}" data-info='${JSON.stringify(info)}'>${this.createItemContent(info)}</div>`;
  },
  createItemContent: ({ id, name }: IBlockUserItem) => {
    return `<a href="https://www.zhihu.com/people/${id}" target="_blank">${name}</a><i class="${CLASS_REMOVE_BLOCK}" style="margin-left:4px;cursor:pointer;">✗</i>`;
  },
  /** 添加「屏蔽用户」按钮，第二个参数为监听方法对象 */
  addButton: async function (event: HTMLElement, objMy?: any) {
    const me = this;
    const classBox = 'ctz-block-box';
    const nodeBlockBox = event.querySelector(`.${classBox}`);
    if (nodeBlockBox) return;
    const nodeUser = event.querySelector('.AnswerItem-authorInfo>.AuthorInfo') as HTMLElement;
    if (!nodeUser || !nodeUser.offsetHeight) return;
    const userUrl = (nodeUser.querySelector('meta[itemprop="url"]') as HTMLMetaElement).content;
    const userName = (nodeUser.querySelector('meta[itemprop="name"]') as HTMLMetaElement).content;
    const nodeAnswerItem = event.querySelector('.AnswerItem');
    const mo = nodeAnswerItem ? nodeAnswerItem.getAttribute('data-za-extra-module') || '{}' : '{}';
    if (!JSON.parse(mo).card) return;
    const aContent: IZhihuCardContent = JSON.parse(mo).card.content;
    const userId = aContent.author_member_hash_id || '';
    if (!userUrl.replace(/https:\/\/www.zhihu.com\/people\//, '')) return;
    const { removeBlockUserContentList = [] } = await myStorage.getConfig();
    const isAlreadyBlack = removeBlockUserContentList.findIndex((i) => i.id === userId) >= 0;
    const message = `是否要屏蔽${userName}？\n屏蔽后，对方将不能关注你、向你发私信、评论你的实名回答、使用「@」提及你、邀请你回答问题，但仍然可以查看你的公开信息。\n如果开启了「不再显示已屏蔽用户发布的内容」那么也不会看到对方发布的回答`;
    const classBlack = 'ctz-black';
    const classBlackRemove = 'ctz-black-remove';
    const classBlackFilter = 'ctz-black-filter';
    const classJustFilter = 'ctz-just-filter';
    const createClass = (value?: string) => `${value} ctz-button ctz-button-small ctz-button-transparent`;
    const innerHTML = isAlreadyBlack
      ? `<button class="${createClass(classBlackRemove)}">解除屏蔽</button>` + fnReturnStr(`<button class="${createClass(classJustFilter)}">隐藏该回答</button>`, !!objMy)
      : `<button class="${createClass(classBlack)}">屏蔽用户</button>` + fnReturnStr(`<button class="${createClass(classBlackFilter)}">屏蔽用户并隐藏该回答</button>`, !!objMy);
    const nodeBox = domC('div', { className: classBox, innerHTML });
    nodeBox.onclick = function (ev) {
      const target = ev.target as HTMLElement;
      const matched = userUrl.match(/(?<=people\/)[\w\W]+/);
      const urlToken = matched ? matched[0] : '';
      // 屏蔽用户
      if (target.classList.contains(classBlack)) {
        if (!confirm(message)) return;
        me.serviceAdd(urlToken, userName, userId);
        fnDomReplace((this as HTMLElement).querySelector(`.${classBlackFilter}`), { className: createClass(classJustFilter), innerText: '隐藏该回答' });
        fnDomReplace(target, { className: createClass(classBlackRemove), innerText: '解除屏蔽' });
        return;
      }
      // 解除屏蔽
      if (target.classList.contains(classBlackRemove)) {
        if (!confirm(me.messageCancel)) return;
        me.serviceRemove({ urlToken, id: userId, name: userName });
        fnDomReplace(target, { className: createClass(classBlack), innerText: '屏蔽用户' });
        fnDomReplace((this as HTMLElement).querySelector(`.${classJustFilter}`), {
          className: createClass(classBlackFilter),
          innerText: '屏蔽用户并隐藏该回答',
        });
        return;
      }
      // 屏蔽并隐藏回答
      if (target.classList.contains(classBlackFilter) || target.classList.contains(classJustFilter)) {
        if (target.classList.contains(classBlackFilter)) {
          if (!confirm(message)) return;
          me.serviceAdd(urlToken, userName, userId);
        }
        event.style.display = 'none';
        if (objMy) {
          objMy.index = objMy.index - 1 > 0 ? objMy.index - 1 : 0;
        }
        return;
      }
    };
    nodeUser.appendChild(nodeBox);
  },
  /** 添加屏蔽用户 */
  addBlackItem: async function (info: IBlockUserItem) {
    const pfConfig = await myStorage.getConfig();
    const nL = pfConfig.removeBlockUserContentList || [];
    nL.push(info);
    myStorage.updateConfigItem('removeBlockUserContentList', nL);
    const nodeBlackItem = domC('div', { className: `ctz-black-item ctz-black-id-${info.id}`, innerHTML: this.createItemContent(info) });
    nodeBlackItem.dataset.info = JSON.stringify(info);
    domById(ID_BLOCK_LIST)!.appendChild(nodeBlackItem);
  },
  /** 调用「屏蔽用户」接口 */
  serviceAdd: function (urlToken: string, userName: string, userId: string) {
    const me = this;
    const headers = this.getHeaders();
    fetch(`https://www.zhihu.com/api/v4/members/${urlToken}/actions/block`, {
      method: 'POST',
      headers: new Headers({
        ...headers,
        'x-xsrftoken': document.cookie.match(/(?<=_xsrf=)[\w-]+(?=;)/)![0] || '',
      }),
      credentials: 'include',
    }).then(() => {
      me.addBlackItem({ id: userId, name: userName, userType: 'people', urlToken });
    });
  },
  /** 解除拉黑用户接口 */
  serviceRemove: function (info: IBlockUserItem) {
    const { urlToken, id } = info;
    const headers = this.getHeaders();
    fetch(`https://www.zhihu.com/api/v4/members/${urlToken}/actions/block`, {
      method: 'DELETE',
      headers: new Headers({
        ...headers,
        'x-xsrftoken': document.cookie.match(/(?<=_xsrf=)[\w-]+(?=;)/)![0] || '',
      }),
      credentials: 'include',
    }).then(async () => {
      const pfConfig = await myStorage.getConfig();
      const nL = pfConfig.removeBlockUserContentList || [];
      const itemIndex = nL.findIndex((i) => i.id === info.id);
      if (itemIndex >= 0) {
        nL.splice(itemIndex, 1);
        const removeItem = dom(`.ctz-black-id-${id}`);
        removeItem && removeItem.remove();
        myStorage.updateConfigItem('removeBlockUserContentList', nL);
      }
    });
  },
  /** 同步黑名单列表 */
  sync: function (offset = 0, l: IBlockUserItem[] = []) {
    const nodeList = domById(ID_BLOCK_LIST);
    !l.length && nodeList && (nodeList.innerHTML = '');
    fnDomReplace(domById(ID_BUTTON_SYNC_BLOCK), { innerHTML: '<i class="ctz-loading">↻</i>', disabled: true });
    const limit = 20;
    const headers = this.getHeaders();
    fetch(`https://www.zhihu.com/api/v3/settings/blocked_users?offset=${offset}&limit=${limit}`, {
      method: 'GET',
      headers: new Headers(headers),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(({ data, paging }: { data: any[]; paging: any }) => {
        data.forEach(({ id, name, user_type, url_token }) => {
          l.push({ id, name, userType: user_type, urlToken: url_token });
        });
        if (!paging.is_end) {
          this.sync(offset + limit, l);
        } else {
          myStorage.updateConfigItem('removeBlockUserContentList', l);
          myBlack.init();
          fnDomReplace(domById(ID_BUTTON_SYNC_BLOCK), { innerHTML: '同步黑名单', disabled: false });
        }
      });
  },
  getHeaders: () => store.getStorageConfigItem('fetchHeaders') as HeadersInit,
};
