import React, { useEffect } from 'react'
import { history } from 'umi'

const mockUsers = [
  { id: 1, username: 'mock_user_1', email: 'mock1@example.com', role: 'admin' },
  { id: 2, username: 'mock_user_2', email: 'mock2@example.com', role: 'member' },
  { id: 3, username: 'mock_user_3', email: 'mock3@example.com', role: 'guest' },
]

const storageKeys = ['token', 'user', 'userInfo', 'currentUser']

export default function MockAutoLogin() {
  useEffect(() => {
    const mock = mockUsers[Math.floor(Math.random() * mockUsers.length)]
    const token = `mock-token-${Date.now()}`
    try {
      // 常见的本地存储键名，如果你们项目使用别名，请告知以便替换
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(mock))
      localStorage.setItem('userInfo', JSON.stringify(mock))
      localStorage.setItem('currentUser', JSON.stringify({ ...mock, token }))
    } catch (e) {
      // 忽略存储异常
    }
    // 设置好信息后直接进入首页（受保护路由）
    history.push('/home/portal')
  }, [])

  return null
}