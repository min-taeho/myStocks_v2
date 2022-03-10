//import DashboardLayout from '../layout/DashboardLayout.vue'
import MainLayout from '../layout/MainLayout.vue'
import OauthLayout from '../layout/OauthLayout.vue'

// GeneralViews
import NotFound from '@/pages/NotFoundPage.vue'

import Jwt from "@/common/jwt";

// Admin pages
//import Overview from '@/pages/Overview.vue'
import Portfolio from '@/pages/Portfolio.vue'
import InterestStock from '@/pages/InterestStock.vue'
import TradingNote from '@/pages/TradingNote.vue'

// 네비게이션 가드 적용
const requireOauth = () => (from, to, next) => {
  if (Jwt.getAccessToken()) {
      return next();
  }
  else {
      next("/login");
  }
}

const requireNoOauth = () => (from, to, next) => {
  if ( Jwt.getAccessToken()) {
      next("/");
  }
  else {
      return next();
  }
}

let title = "";

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/main/portfolio',
  },
   // OauthLoyout
  {
    path: "/login",
    name: "Login",
    component: OauthLayout,
    beforeEnter: requireNoOauth(),
  },
  {
    path: '*',
    component: NotFound
  },
  {
    path: '/main',
    component: MainLayout,
    redirect: '/main/portfolio',
    beforeEnter: requireOauth(),
    children: [
      {
        path: 'portfolio',
        name: 'Portfolio',
        component: Portfolio,
        
      },
      {
        path: 'interestStock',
        name: 'interestStock',
        component: InterestStock
      },
      {
        path: 'tradingNote',
        name: 'TradingNote',
        component: TradingNote
      },
      // notice
      {
        path: 'notice',
        name: 'Notice',
        meta: {
          title: "게시판",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("@/pages/Notice.vue"),
        //beforeEnter: requireOauth()
      },
      {
        path: '/notice/edit',
        name: 'NoticeEdit',
        meta: {
          title: "게시판 등록",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("@/pages/notice/NoticeEdit.vue"),
        //beforeEnter: requireOauth()
      },
      {
        path: '/notice/:id',
        name: 'NoticeId',
        meta: {
          title: "게시판 상세조회",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("@/pages/notice/NoticeView.vue"),
        //beforeEnter: requireOauth()
      },
      {
        path: "/notice/edit/:id",
        name: "NoticeEditId",
        meta: {
          title: "게시판 수정",
          breadcrumb: [{ name: "", link: "" }]
        },
        component: () => import("@/pages/notice/NoticeEdit.vue"),
        //beforeEnter: requireOauth()
      },
    ]
  },
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
