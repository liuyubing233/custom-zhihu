import { myScroll } from '../commons/scroll-stop-on';
import { domById } from '../commons/tools';
import { ID_DIALOG } from '../configs';
import { echoData } from './echo-data';
import { echoHistory } from './history';

/** 编辑器弹窗打开关闭方法 */
export const myDialog = {
  open: async () => {
    const nodeDialog = domById(ID_DIALOG);
    nodeDialog && (nodeDialog.style.display = 'flex');
    myScroll.stop();
    echoData();
    echoHistory()
  },
  hide: () => {
    const nodeDialog = domById(ID_DIALOG);
    nodeDialog && (nodeDialog.style.display = 'none');
    myScroll.on();
  },
};
