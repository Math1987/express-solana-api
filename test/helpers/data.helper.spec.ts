import { init as initDatas, reset as resetDatas } from "../../src/datas/index.data" ;
/** 
 * Reset Database before all tests
 */
before( async () => {
    console.log('Reset db before test.')
    await resetDatas();
    console.log('Done');
});