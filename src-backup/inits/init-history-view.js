/** 添加浏览历史 */
export const initHistoryView = async () => {
  const question = 'www.zhihu.com/question/';
  const article = 'zhuanlan.zhihu.com/p/';
  const video = 'www.zhihu.com/zvideo/';
  let name = href;
  setTimeout(() => {
    if (!href.includes(question) && !href.includes(article) && !href.includes(video)) return;
    href.includes(question) && dom('.QuestionPage [itemprop="name"]') && (name = dom('.QuestionPage [itemprop="name"]').content);
    href.includes(article) && dom('.Post-Title') && (name = dom('.Post-Title').innerText);
    href.includes(video) && dom('.ZVideo .ZVideo-title') && (name = dom('.ZVideo .ZVideo-title').innerText);
    const nA = `<a href="${origin + pathname}" target="_blank">${name}</a>`;
    const { view } = pfHistory;
    if (nA !== view[0]) {
      view.unshift(nA);
      pfHistory.view = view.slice(0, SAVE_HISTORY_NUMBER);
      myStorage.set('pfHistory', JSON.stringify(pfHistory));
    }
  }, 100);
};