import { request } from 'alita';
import { CapacitorHttp } from '@capacitor/core';

export async function query(data: any): Promise<any> {
  const options = {
    url: 'https://zhiwu.market.alicloudapi.com/do',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // @ts-ignore
      Authorization: `APPCODE ${APPCODE}`,
    },
  };

  return CapacitorHttp.post(options);
}
// export async function query(data: any): Promise<any> {
//   return request('https://zhiwu.market.alicloudapi.com/do', {
//     method: 'post',
//     data,
//     headers: {
//       accept: 'application/x-www-form-urlencoded; charset=UTF-8',
//       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//        // @ts-ignore
      // Authorization: `APPCODE ${APPCODE}`,
//     },
//     // credentials: 'include',
//   });
// }
