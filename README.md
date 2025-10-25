# RxHui Library

一个用于复用常用方法的 TypeScript 库，通过库的方式发布，在多个项目中复用。

## 安装

```bash
npm install rxhui-library
```

## 组件列表

### SSO 单点登录
- **功能**: 处理 OAuth SSO（单点登录），支持第三方平台登录回调
- **用途**: 简化单点登录流程，自动处理登录回调
- **详细文档**: [src/library/sso/README.md](./src/library/sso/README.md)

## 快速开始

### SSO 单点登录

```typescript
import { sso } from 'rxhui-library'

// 作为 Vue 插件使用
app.use(sso, {
  baseUrl: 'https://your-api-domain.com',
  breakQuery: 'ticket',
  loginCallback: (res) => {
    if (res.code === 200) {
      localStorage.setItem('token', res.data.token)
    }
  }
})
```

## 版本

当前版本: 0.0.5

## 许可证

MIT
