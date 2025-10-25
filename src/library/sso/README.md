# SSO 单点登录库

一个用于处理 OAuth SSO（单点登录）的 TypeScript 库，支持 Vue 插件方式集成。

## 安装

```bash
npm install rxhui-library
```

## 快速开始

### 作为 Vue 插件使用

```typescript
// main.ts
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { sso } from 'rxhui-library'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 你的路由配置
  ]
})

// 绑定路由，自动处理登录回调
sso.bindRouter(router)

const app = createApp(App)
app.use(router)

// 安装 SSO 插件
app.use(sso, {
  baseUrl: 'https://your-api-domain.com',
  breakQuery: 'ticket',  // URL 中包含此参数时自动触发登录
  loginCallback: (res) => {
    // 登录成功后的回调
    if (res.code === 200) {
      console.log('登录成功', res.data)
      localStorage.setItem('token', res.data.token)
    }
  }
})

app.mount('#app')
```

## 配置选项

```typescript
interface SsoOptions {
  // API 基础地址
  baseUrl?: string
  
  // SSO 登录接口路径，默认 '/authAdminService/oauth/sso/login'
  url?: string
  
  // 触发登录的 URL 参数名，默认 'ticket'
  breakQuery?: string
  
  // 登录成功回调函数
  loginCallback?: (res: SsoLoginResponse) => void
  
  // 自定义参数字段映射
  props?: {
    clientId?: string      // 默认 'clientId'
    grantType?: string     // 默认 'grantType'
    tenantId?: string      // 默认 'tenantId'
    source?: string        // 默认 'source'
    socialCode?: string    // 默认 'socialCode'
    socialState?: string   // 默认 'socialState'
  }
}
```

## 使用场景示例

### 第三方登录回调

当用户从第三方平台（如 Gitee）授权后，会重定向回你的应用：

```
https://your-app.com/callback?ticket=xxx&source=gitee&socialCode=xxx&socialState=xxx
```

通过 `bindRouter()` 和配置 `loginCallback`，会自动完成登录：

```typescript
app.use(sso, {
  baseUrl: 'https://api.your-app.com',
  breakQuery: 'ticket',
  loginCallback: (res) => {
    if (res.code === 200) {
      localStorage.setItem('token', res.data.token)
      router.push('/dashboard')
    }
  }
})
```

## 许可证

MIT
