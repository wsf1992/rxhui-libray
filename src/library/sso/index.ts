import type {
    ISso,
    SsoOptions,
    OauthSsoLoginParams,
    SsoLoginResponse,
    Router,
    RouteLocationNormalized,
    App
} from './types'

class Sso implements ISso {
    url: string
    retJSon: any
    breakQuery: string | null
    baseUrl: string | null
    clientId: string 
    grantType: string 
    tenantId: string
    source: string 
    socialCode: string 
    socialState: string
    loginCallback: ((res: SsoLoginResponse) => void) | null

    constructor() {
        this.retJSon = null
        this.breakQuery = null
        this.url = ''
        this.baseUrl = null
        this.clientId = 'clientId'
        this.grantType = 'grantType'
        this.tenantId = 'tenantId'
        this.source = 'source'
        this.socialCode = 'socialCode'
        this.socialState = 'socialState'
        this.loginCallback = null
    }

    setOptions(options: SsoOptions) {
        this.url = options.url || '/authAdminService/oauth/sso/login'
        this.breakQuery = options.breakQuery || 'ticket'
        this.baseUrl = options.baseUrl || ''
        if(options.props) {
            if('clientId' in options.props) {
                this.clientId = options.props.clientId
            }
            if('grantType' in options.props) {
                this.grantType = options.props.grantType
            }
            if('tenantId' in options.props) {
                this.tenantId = options.props.tenantId
            }
            if('source' in options.props) {
                this.source = options.props.source
            }
            if('socialCode' in options.props) {
                this.socialCode = options.props.socialCode
            }
            if('socialState' in options.props) {
                this.socialState = options.props.socialState
            }
        }
        this.loginCallback = options.loginCallback || null
    }

    oauthSsoLogin(params: OauthSsoLoginParams, coverParams = false): Promise<SsoLoginResponse> {
        let postParams: Record<string, any> = {
            clientId: params[this.clientId] || 'e5cd7e4891bf95d1d19206ce24a7b32e',
            grantType: params[this.grantType] || 'social', // 授权类型，默认值（social）
            tenantId: params[this.tenantId],
            source: params[this.source], // 渠道（qq、gitee）
            socialCode: params[this.socialCode], // 第三方登录平台[code]
            socialState: params[this.socialState]
        }
        if (coverParams) {
            postParams = { ...params }
        }
        return fetch(this.baseUrl + this.url, {
            method: 'POST',
            body: JSON.stringify(postParams),
            headers: {
                'bizCode': 'llm',
                'clientid': 'e5cd7e4891bf95d1d19206ce24a7b32e',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        })
    }

    async routerBeforeEach(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: () => void): Promise<void> {
        if (to?.query && this.breakQuery && to.query[this.breakQuery]) {
            const res = await this.oauthSsoLogin(to.query)
            this.loginCallback && this.loginCallback(res)
        }
        next()
    }

    bindRouter(router: Router): void {
        router.beforeEach(this.routerBeforeEach.bind(this))
    }
    getResult(): any {
        return this.retJSon
    }

    // 绑定毁掉函数，登出接口调用之后
    bindLoginCallback(fn: () => void) {
        this.loginCallback = fn
    }

    install(app: App, options: SsoOptions) {
        // 配置此应用
        this.setOptions(options)
        app.config.globalProperties.$sso = this
    }

}

// 导出单例实例
export const sso = new Sso()
