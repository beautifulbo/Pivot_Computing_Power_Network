import config from '@/../package.json'

const login = {
  "login.email": { cn: "邮箱", en: "Email", },
  "login.username": { cn: "用户名", en: "Username", },
  "login.pwd": { cn: "密码", en: "Password", },
  "login.login": { cn: "登录", en: "Login", },
  "login.signup": { cn: "注册", en: "Sign Up", },
  "login.email.required.msg": { cn: "请输入邮箱地址", en: "Please input your email", },
  "login.username.required.msg": { cn: "请输入用户名", en: "Please input your username", },
  "login.pwd.required.msg": { cn: "请输入密码", en: "Please input your password", },
  "login.forget": { cn: "忘记密码？", en: "Forget Password?", },
  "login.login.success": { cn: "登录成功", en: "Login Success!", },
  "login.login.fail": { cn: "用户名或密码错误", en: "Invalid username or password", },
  "login.form.title": { cn: "欢迎登录", en: `Welcome to ${config.displayName}`, },
  "login.email.placeholder": { cn: "请输入邮箱", en: "Please input your email", },
  "login.username.placeholder": { cn: "请输入用户名", en: "Please input your username", },
  "login.pwd.placeholder": { cn: "请输入密码", en: "Please input your password", },
}

export default login
