// import { forgetPwd } from "@/services/user";
import {Request,Response} from "express";

export enum STATES {
  REGISTERED = 1,
  ACTIVE = 2,
  DECLINED = 3,
  DEACTIVED = 4,
}

export enum loginSTATES {
  FIRST = 1,
  logined = 2,
  overtime = 3,
}
// 模拟用户数据
const userData = [
  { username: 'dml', email:'847168580@qq.com', password: '12345678' },
  { username: 'hi', email:'847168580@qq.com', password: '11111111' },
];

const loginList = async (req:Request,res:Response)=>{
  const { username, password} = req.body;
    const user = userData.find((u) => u.username === username && u.password === password);
    if (user) {
      return res.json({ code: 0, data: {username, password} });
    } else {
      return res.json({ code: 1});
    }
}

const signList = async (req:Request,res:Response)=>{
    const { username, email, password} = req.body;
    // const userExists = userData.some((u) => u.username === username);
    const userExists = userData.find((u) => u.username === username);
    if (!userExists) {
        // 创建新用户
        const newUser = { username, email, password };
        userData.push(newUser);
        return res.json({ state:STATES.ACTIVE, code: 0, access_token: '注册成功' });
    } else {
        return res.json({ state:STATES.REGISTERED, code: -1, message: '用户名已存在' });
    }
}

const forgetPwd = async (req:Request,res:Response)=>{
  const email = req.body;
  //模拟发送邮件
  if (true) {
      // 创建新用户
      return res.json({ state:STATES.ACTIVE, code: 0, message: '注册成功' });
  } else {
      return res.json({ state:STATES.REGISTERED, code: -1, message: '用户名已存在' });
  }
}

const logined = async (req:Request,res:Response)=>{
  return res.json({ logined: 1});
}

const getuserinfo = async (req:Request,res:Response)=>{
  return res.json({ ok:1,code: 0, msg:"登陆成功", data:{username: 'dml', email:'847168580@qq.com', password: '12345678'}});
}

export default {
    'POST /api/signup':signList,
    'POST /api/login':loginList,
    'POST /api/password-recovery':forgetPwd,
    'GET /user/getuserlogined':logined,
    'GET /user/me':getuserinfo
}