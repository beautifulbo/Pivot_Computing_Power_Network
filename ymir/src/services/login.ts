import {request} from "umi";
// import request from '@/utils/request'
// import request from 'umi-request';


export async function signList(params:{username:string, email:string, password:string}){
    // return request('/api/signup', params);
    return request('/api/signup', {
        method: 'POST',
        data: params,
        requestType:"form"
      });
    
}

export async function loginList(params:{username:string, password:string}){
    // return axios.post('/fsys/auth/token',{params})/api/login
    return request('/api/login', {
        method: 'POST',
        data: params
      });
    // return request.post('http://119.91.26.81/fsys/auth/token', params);
    // return request('http://119.91.26.81/fsys/auth/token', {
    //     method: 'POST',
    //     data: params,
    //     requestType:"form",
    //     getResponse:true
    //   });
}

export async function forgetPwd(email: string) {
    return request('/api/password-recovery', {
        method: 'POST',
        data: email,
        requestType:"form"
      });
  }

export async function getuserlogined() {
    return request('/user/getuserlogined');
  }

export async function getuserinfo() {
    return request('/user/me');
  }

  // export async function getuserinfo() {
  //   return request('http://119.91.26.81/fsys/users/me', {
  //       method: 'GET',
  //       requestType:"form",
  //     });
  // }


  