/**
 * SSO 构造函数配置选项
 */
export interface SsoOptions {
  /** SSO 登录接口URL，默认值：'/authAdminService/oauth/sso/login' */
  url?: string;
  /** 中断查询参数名称，默认值：'ticket' */
  breakQuery?: string;
  /** 基础URL地址 */
  baseUrl?: string;
  /** 客户端ID */
  clientId?: string;
  /** 授权类型 */
  grantType?: string;
  /** 租户ID */
  tenantId?: string;
  /** 渠道（qq、gitee等） */
  source?: string;
  /** 第三方登录平台的code */
  socialCode?: string;
  /** 第三方登录平台的state */
  socialState?: string;
  /** 配置选项 */
  props?: Record<string, any>;
  /** 登录回调函数 */
  loginCallback?: (res: SsoLoginResponse) => void;
}

/**
 * OAuth SSO 登录参数
 */
export interface OauthSsoLoginParams {
  /** 客户端ID，默认值：'e5cd7e4891bf95d1d19206ce24a7b32e' */
  clientId?: string;
  /** 授权类型，默认值：'social' */
  grantType?: string;
  /** 租户ID */
  tenantId?: string;
  /** 渠道（qq、gitee等） */
  source?: string;
  /** 第三方登录平台的code */
  socialCode?: string;
  /** 第三方登录平台的state */
  socialState?: string;
  /** 其他额外参数 */
  [key: string]: any;
}

/**
 * SSO 登录响应数据
 */
export interface SsoLoginResponse<T = any> {
  /** 响应状态码 */
  code: number;
  /** 响应数据 */
  data?: T;
  /** 响应消息 */
  message?: string;
}

/**
 * 路由对象接口
 */
export interface Router {
  beforeEach: (guard: NavigationGuard) => void;
  [key: string]: any;
}

/**
 * 路由导航守卫
 */
export type NavigationGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => void | Promise<void>;

/**
 * 路由位置标准化对象
 */
export interface RouteLocationNormalized {
  query?: Record<string, any>;
  [key: string]: any;
}

/**
 * 导航守卫next函数
 */
export type NavigationGuardNext = () => void;

/**
 * Vue应用实例接口
 */
export interface App {
  config: {
    globalProperties: Record<string, any>;
  };
  [key: string]: any;
}

/**
 * SSO 类接口
 */
export interface ISso {
  /** SSO 登录接口URL */
  url: string;
  /** 返回的JSON数据 */
  retJSon: any;
  /** 中断查询参数名称 */
  breakQuery: string | null;
  /** 基础URL地址 */
  baseUrl: string | null;

  /**
   * 设置配置选项
   * @param options - 配置选项
   */
  setOptions(options: SsoOptions): void;

  /**
   * OAuth SSO 登录
   * @param params - 登录参数
   * @param coverParams - 是否覆盖参数，默认为 false。如果为 true，则直接使用 params 中的所有参数
   * @returns Promise<SsoLoginResponse>
   */
  oauthSsoLogin(params: OauthSsoLoginParams, coverParams?: boolean): Promise<SsoLoginResponse>;

  /**
   * 路由前置守卫
   * @param to - 目标路由
   * @param from - 来源路由
   * @param next - 继续导航的回调函数
   */
  routerBeforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void>;

  /**
   * 绑定路由
   * @param router - 路由实例
   */
  bindRouter(router: Router): void;

  /**
   * 获取返回的JSON数据
   * @returns 返回的数据
   */
  getResult(): any;

  /**
   * Vue 插件安装方法
   * @param app - Vue 应用实例
   * @param options - 配置选项
   */
  install(app: App, options: SsoOptions): void;
}

