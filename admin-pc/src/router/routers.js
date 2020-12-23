import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/manage-match',
    name: '赛事信息',
    meta: {
      icon: 'md-menu',
      title: '赛事信息'
    },
    component: Main,
    children: [
      {
        path: 'brief',
        name: '赛事简介',
        meta: {
          icon: 'md-funnel',
          title: '赛事简介'
        },
        component: () => import('@/view/manage-match/brief.vue')
      },
      {
        path: 'trend',
        name: '赛事动态',
        meta: {
          icon: 'ios-baseball',
          title: '赛事动态'
        },
        component: () => import('@/view/manage-match/trend.vue')
      },
      {
        path: 'notice',
        name: '消息通知',
        meta: {
          icon: 'md-alert',
          title: '消息通知'
        },
        component: () => import('@/view/manage-match/notice.vue')
      },
      {
        path: 'info',
        name: '赛场信息',
        meta: {
          icon: 'ios-bowtie',
          title: '赛场信息'
        },
        component: () => import('@/view/manage-match/info.vue')
      },
      {
        path: 'type',
        name: '赛事类型',
        meta: {
          icon: 'md-keypad',
          title: '赛事类型'
        },
        component: () => import('@/view/manage-match/type.vue')
      }
    ]
  },
  {
    path: '/manage-sign',
    name: '报名管理',
    meta: {
      icon: 'ios-bulb',
      title: '报名管理'
    },
    component: Main,
    children: [
      {
        path: 'sign',
        name: '报名列表',
        meta: {
          icon: 'ios-cube',
          title: '报名列表'
        },
        component: () => import('@/view/manage-sign/sign.vue')
      }
    ]
  },
  {
    path: '/manage-grade',
    name: '成绩管理',
    meta: {
      icon: 'ios-albums',
      title: '成绩管理'
    },
    component: Main,
    children: [
      {
        path: 'gradelists',
        name: '成绩列表',
        meta: {
          icon: 'ios-ionic',
          title: '成绩列表'
        },
        component: () => import('@/view/manage-grade/gradelists.vue')
      },
      {
        path: 'award',
        name: '获奖公布',
        meta: {
          icon: 'ios-ribbon',
          title: '获奖公布'
        },
        component: () => import('@/view/manage-grade/award.vue')
      }
    ]
  },
  {
    path: '/manage-user',
    name: '用户管理',
    meta: {
      icon: 'ios-barcode',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: 'manager',
        name: '系统管理员',
        meta: {
          icon: 'ios-man',
          title: '系统管理员'
        },
        component: () => import('@/view/manage-user/manager.vue')
      },
      {
        path: 'user',
        name: '公众号用户',
        meta: {
          icon: 'ios-people',
          title: '公众号用户'
        },
        component: () => import('@/view/manage-user/user.vue')
      }
    ]
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
