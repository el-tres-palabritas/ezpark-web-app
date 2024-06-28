import { createRouter, createWebHistory } from 'vue-router'

import LandingPage from '@/landing-page/pages/index.page.vue'

import FindYourParkPage from '@/public/pages/find-your-park.page.vue'
import RegisterPark from '@/public/pages/register-park.page.vue'
import YourGaragesPage from '@/public/pages/your-garages.page.vue'
import NotFoundPage from '@/public/pages/not-found.page.vue'

import ParkingDetailPage from '@/parkings/pages/parking-detail.page.vue'
import ParkingReviewPage from '@/parkings/pages/parking-reviews.page.vue'

import LogInPage from '@/auth/pages/login-page.component.vue'
import SignUpPage from '@/auth/pages/signup-page.component.vue'
import RecoveryPage from '@/auth/pages/recovery.page.vue'

import useAuth from '@/store/useAuth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/find-your-park'
    },
    {
      path: '/landing-page',
      component: LandingPage,
      meta: {
        auth: false
      }
    },
    {
      path: '/login',
      component: LogInPage,
      meta: {
        auth: false,
        canOmitAuth: true
      }
    },
    {
      path: '/signup',
      component: SignUpPage,
      meta: {
        auth: false,
        canOmitAuth: true
      }
    },
    {
      path: '/recovery',
      component: RecoveryPage,
      meta: {
        auth: false,
        canOmitAuth: true
      }
    },
    {
      path: '/find-your-park',
      component: FindYourParkPage,
      meta: {
        auth: true
      }
    },
    {
      path: '/find-your-park/parking/:id',
      component: ParkingDetailPage,
      meta: {
        auth: true
      }
    },
    {
      path: '/find-your-park/parking/:id/reviews',
      component: ParkingReviewPage,
      meta: {
        auth: true
      }
    },
    {
      path: '/register-park',
      component: RegisterPark,
      meta: {
        auth: true
      }
    },
    {
      path: '/your-garages',
      component: YourGaragesPage,
      meta: {
        auth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, _from, next) => {
  if (to.meta.canOmitAuth && useAuth().isLoggedIn) {
    next('/find-your-park')
    return
  }
  if (to.meta.auth && !useAuth().isLoggedIn) {
    next('/login')
  }
  next()
})

export default router
