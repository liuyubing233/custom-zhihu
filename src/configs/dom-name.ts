import { IFontSizeSetOption, IRangeItem } from '../types';

export const HTML_HOOTS = ['www.zhihu.com', 'zhuanlan.zhihu.com'];
/** class: INPUT 点击元素类名 */
export const CLASS_INPUT_CLICK = 'ctz-i';
/** class: INPUT 修改操作元素类名 */
export const CLASS_INPUT_CHANGE = 'ctz-i-change';
/** class: 不感兴趣外置按钮 */
export const CLASS_NOT_INTERESTED = 'ctz-not-interested';
/** class: 推荐列表显示「直达问题」按钮 */
export const CLASS_TO_QUESTION = 'ctz-to-question';
/** class: 自定义的时间元素名称 */
export const CLASS_TIME_ITEM = 'ctz-list-item-time';

/** class: 消息提示弹窗 */
export const CLASS_MESSAGE = 'ctz-message';
export const ID_MESSAGE_BOX = 'CTZ_MESSAGE_BOX';

/** 回答收起展开插入的类名 */
export const OB_CLASS_FOLD = {
  on: 'ctz-fold-open',
  off: 'ctz-fold-close',
};

/** html 添加额外的类名 */
export const EXTRA_CLASS_HTML: Record<string, string> = {
  'zhuanlan.zhihu.com': 'zhuanlan',
  'www.zhihu.com': 'zhihu',
};

export const HEADER = [
  { href: '#CTZ_BASIS', value: '基础设置' },
  { href: '#CTZ_HIDDEN', value: '隐藏模块设置' },
  { href: '#CTZ_FILTER', value: '屏蔽内容设置' },
  { href: '#CTZ_BLOCK_WORD', value: '屏蔽词设置' },
  { href: '#CTZ_BLACKLIST', value: '黑名单设置' },
  { href: '#CTZ_HISTORY', value: '历史记录' },
  { href: '#CTZ_DEFAULT', value: '默认功能' },
];

export const FONT_SIZE_INPUT: IFontSizeSetOption[][] = [
  [
    { value: 'fontSizeForListTitle', label: '列表标题文字大小', reset: 'reset-fontSizeForListTitle' },
    { value: 'fontSizeForList', label: '列表内容文字大小', reset: 'reset-fontSizeForList' },
  ],
  [
    { value: 'fontSizeForAnswerTitle', label: '回答标题文字大小', reset: 'reset-fontSizeForAnswerTitle' },
    { value: 'fontSizeForAnswer', label: '回答内容文字大小', reset: 'reset-fontSizeForAnswer' },
  ],
  [
    { value: 'fontSizeForArticleTitle', label: '文章标题文字大小', reset: 'reset-fontSizeForArticleTitle' },
    { value: 'fontSizeForArticle', label: '文章内容文字大小', reset: 'reset-fontSizeForArticle' },
  ],
  [{ value: 'contentLineHeight', label: '内容行高', reset: 'reset-contentLineHeight' }],
];

/** 版心最小宽度 */
export const VERSION_MIN_WIDTH = 600;
export const VERSION_RANGE: IRangeItem[] = [
  {
    label: '列表内容宽度',
    value: 'versionHome',
    min: VERSION_MIN_WIDTH,
    max: 1500,
    percentChooseValue: 'versionHomeIsPercent',
    percentChooseLabel: '使用百分比设置',
    desc: '最小显示宽度为600',
    percentMin: 20,
    percentMax: 100,
    percentLabel: '列表内容宽度（百分比）',
    percentValue: 'versionHomePercent',
  },
  {
    label: '回答内容宽度',
    value: 'versionAnswer',
    min: VERSION_MIN_WIDTH,
    max: 1500,
    percentChooseValue: 'versionAnswerIsPercent',
    percentChooseLabel: '使用百分比设置',
    desc: '最小显示宽度为600',
    percentMin: 20,
    percentMax: 100,
    percentLabel: '回答内容宽度（百分比）',
    percentValue: 'versionAnswerPercent',
  },
  {
    label: '文章内容宽度',
    value: 'versionArticle',
    min: VERSION_MIN_WIDTH,
    max: 1500,
    percentChooseValue: 'versionArticleIsPercent',
    percentChooseLabel: '使用百分比设置',
    desc: '最小显示宽度为600',
    percentMin: 20,
    percentMax: 100,
    percentLabel: '文章内容宽度（百分比）',
    percentValue: 'versionArticlePercent',
  },
];
