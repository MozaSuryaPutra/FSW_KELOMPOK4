/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PaymentSuccessImport } from './routes/payment-success'

// Create Virtual Routes

const TestajaLazyImport = createFileRoute('/testaja')()
const PaymentLazyImport = createFileRoute('/payment')()
const OrderHistoryLazyImport = createFileRoute('/orderHistory')()
const NotificationsLazyImport = createFileRoute('/notifications')()
const ChooseReturnLazyImport = createFileRoute('/choose-return')()
const ChooseLazyImport = createFileRoute('/choose')()
const CheckoutSuccessLazyImport = createFileRoute('/checkout-success')()
const CheckoutBiodataLazyImport = createFileRoute('/checkout-biodata')()
const AkunLazyImport = createFileRoute('/akun')()
const IndexLazyImport = createFileRoute('/')()
const PaymentSuccessLazyImport = createFileRoute('/payment/success')()
const PaymentFinishLazyImport = createFileRoute('/payment/finish')()
const AuthRegisterLazyImport = createFileRoute('/auth/register')()
const AuthOtpLazyImport = createFileRoute('/auth/otp')()
const AuthLoginLazyImport = createFileRoute('/auth/login')()
const AuthForgetPassReqLazyImport = createFileRoute('/auth/forget-pass-req')()
const AuthForgetPassLazyImport = createFileRoute('/auth/forget-pass')()

// Create/Update Routes

const TestajaLazyRoute = TestajaLazyImport.update({
  id: '/testaja',
  path: '/testaja',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/testaja.lazy').then((d) => d.Route))

const PaymentLazyRoute = PaymentLazyImport.update({
  id: '/payment',
  path: '/payment',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/payment.lazy').then((d) => d.Route))

const OrderHistoryLazyRoute = OrderHistoryLazyImport.update({
  id: '/orderHistory',
  path: '/orderHistory',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/orderHistory.lazy').then((d) => d.Route))

const NotificationsLazyRoute = NotificationsLazyImport.update({
  id: '/notifications',
  path: '/notifications',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/notifications.lazy').then((d) => d.Route))

const ChooseReturnLazyRoute = ChooseReturnLazyImport.update({
  id: '/choose-return',
  path: '/choose-return',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/choose-return.lazy').then((d) => d.Route))

const ChooseLazyRoute = ChooseLazyImport.update({
  id: '/choose',
  path: '/choose',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/choose.lazy').then((d) => d.Route))

const CheckoutSuccessLazyRoute = CheckoutSuccessLazyImport.update({
  id: '/checkout-success',
  path: '/checkout-success',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/checkout-success.lazy').then((d) => d.Route),
)

const CheckoutBiodataLazyRoute = CheckoutBiodataLazyImport.update({
  id: '/checkout-biodata',
  path: '/checkout-biodata',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/checkout-biodata.lazy').then((d) => d.Route),
)

const AkunLazyRoute = AkunLazyImport.update({
  id: '/akun',
  path: '/akun',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/akun.lazy').then((d) => d.Route))

const PaymentSuccessRoute = PaymentSuccessImport.update({
  id: '/payment-success',
  path: '/payment-success',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PaymentSuccessLazyRoute = PaymentSuccessLazyImport.update({
  id: '/success',
  path: '/success',
  getParentRoute: () => PaymentLazyRoute,
} as any).lazy(() =>
  import('./routes/payment/success.lazy').then((d) => d.Route),
)

const PaymentFinishLazyRoute = PaymentFinishLazyImport.update({
  id: '/finish',
  path: '/finish',
  getParentRoute: () => PaymentLazyRoute,
} as any).lazy(() =>
  import('./routes/payment/finish.lazy').then((d) => d.Route),
)

const AuthRegisterLazyRoute = AuthRegisterLazyImport.update({
  id: '/auth/register',
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/register.lazy').then((d) => d.Route))

const AuthOtpLazyRoute = AuthOtpLazyImport.update({
  id: '/auth/otp',
  path: '/auth/otp',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/otp.lazy').then((d) => d.Route))

const AuthLoginLazyRoute = AuthLoginLazyImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/login.lazy').then((d) => d.Route))

const AuthForgetPassReqLazyRoute = AuthForgetPassReqLazyImport.update({
  id: '/auth/forget-pass-req',
  path: '/auth/forget-pass-req',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/forget-pass-req.lazy').then((d) => d.Route),
)

const AuthForgetPassLazyRoute = AuthForgetPassLazyImport.update({
  id: '/auth/forget-pass',
  path: '/auth/forget-pass',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/forget-pass.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/payment-success': {
      id: '/payment-success'
      path: '/payment-success'
      fullPath: '/payment-success'
      preLoaderRoute: typeof PaymentSuccessImport
      parentRoute: typeof rootRoute
    }
    '/akun': {
      id: '/akun'
      path: '/akun'
      fullPath: '/akun'
      preLoaderRoute: typeof AkunLazyImport
      parentRoute: typeof rootRoute
    }
    '/checkout-biodata': {
      id: '/checkout-biodata'
      path: '/checkout-biodata'
      fullPath: '/checkout-biodata'
      preLoaderRoute: typeof CheckoutBiodataLazyImport
      parentRoute: typeof rootRoute
    }
    '/checkout-success': {
      id: '/checkout-success'
      path: '/checkout-success'
      fullPath: '/checkout-success'
      preLoaderRoute: typeof CheckoutSuccessLazyImport
      parentRoute: typeof rootRoute
    }
    '/choose': {
      id: '/choose'
      path: '/choose'
      fullPath: '/choose'
      preLoaderRoute: typeof ChooseLazyImport
      parentRoute: typeof rootRoute
    }
    '/choose-return': {
      id: '/choose-return'
      path: '/choose-return'
      fullPath: '/choose-return'
      preLoaderRoute: typeof ChooseReturnLazyImport
      parentRoute: typeof rootRoute
    }
    '/notifications': {
      id: '/notifications'
      path: '/notifications'
      fullPath: '/notifications'
      preLoaderRoute: typeof NotificationsLazyImport
      parentRoute: typeof rootRoute
    }
    '/orderHistory': {
      id: '/orderHistory'
      path: '/orderHistory'
      fullPath: '/orderHistory'
      preLoaderRoute: typeof OrderHistoryLazyImport
      parentRoute: typeof rootRoute
    }
    '/payment': {
      id: '/payment'
      path: '/payment'
      fullPath: '/payment'
      preLoaderRoute: typeof PaymentLazyImport
      parentRoute: typeof rootRoute
    }
    '/testaja': {
      id: '/testaja'
      path: '/testaja'
      fullPath: '/testaja'
      preLoaderRoute: typeof TestajaLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/forget-pass': {
      id: '/auth/forget-pass'
      path: '/auth/forget-pass'
      fullPath: '/auth/forget-pass'
      preLoaderRoute: typeof AuthForgetPassLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/forget-pass-req': {
      id: '/auth/forget-pass-req'
      path: '/auth/forget-pass-req'
      fullPath: '/auth/forget-pass-req'
      preLoaderRoute: typeof AuthForgetPassReqLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/otp': {
      id: '/auth/otp'
      path: '/auth/otp'
      fullPath: '/auth/otp'
      preLoaderRoute: typeof AuthOtpLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/payment/finish': {
      id: '/payment/finish'
      path: '/finish'
      fullPath: '/payment/finish'
      preLoaderRoute: typeof PaymentFinishLazyImport
      parentRoute: typeof PaymentLazyImport
    }
    '/payment/success': {
      id: '/payment/success'
      path: '/success'
      fullPath: '/payment/success'
      preLoaderRoute: typeof PaymentSuccessLazyImport
      parentRoute: typeof PaymentLazyImport
    }
  }
}

// Create and export the route tree

interface PaymentLazyRouteChildren {
  PaymentFinishLazyRoute: typeof PaymentFinishLazyRoute
  PaymentSuccessLazyRoute: typeof PaymentSuccessLazyRoute
}

const PaymentLazyRouteChildren: PaymentLazyRouteChildren = {
  PaymentFinishLazyRoute: PaymentFinishLazyRoute,
  PaymentSuccessLazyRoute: PaymentSuccessLazyRoute,
}

const PaymentLazyRouteWithChildren = PaymentLazyRoute._addFileChildren(
  PaymentLazyRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/payment-success': typeof PaymentSuccessRoute
  '/akun': typeof AkunLazyRoute
  '/checkout-biodata': typeof CheckoutBiodataLazyRoute
  '/checkout-success': typeof CheckoutSuccessLazyRoute
  '/choose': typeof ChooseLazyRoute
  '/choose-return': typeof ChooseReturnLazyRoute
  '/notifications': typeof NotificationsLazyRoute
  '/orderHistory': typeof OrderHistoryLazyRoute
  '/payment': typeof PaymentLazyRouteWithChildren
  '/testaja': typeof TestajaLazyRoute
  '/auth/forget-pass': typeof AuthForgetPassLazyRoute
  '/auth/forget-pass-req': typeof AuthForgetPassReqLazyRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/auth/otp': typeof AuthOtpLazyRoute
  '/auth/register': typeof AuthRegisterLazyRoute
  '/payment/finish': typeof PaymentFinishLazyRoute
  '/payment/success': typeof PaymentSuccessLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/payment-success': typeof PaymentSuccessRoute
  '/akun': typeof AkunLazyRoute
  '/checkout-biodata': typeof CheckoutBiodataLazyRoute
  '/checkout-success': typeof CheckoutSuccessLazyRoute
  '/choose': typeof ChooseLazyRoute
  '/choose-return': typeof ChooseReturnLazyRoute
  '/notifications': typeof NotificationsLazyRoute
  '/orderHistory': typeof OrderHistoryLazyRoute
  '/payment': typeof PaymentLazyRouteWithChildren
  '/testaja': typeof TestajaLazyRoute
  '/auth/forget-pass': typeof AuthForgetPassLazyRoute
  '/auth/forget-pass-req': typeof AuthForgetPassReqLazyRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/auth/otp': typeof AuthOtpLazyRoute
  '/auth/register': typeof AuthRegisterLazyRoute
  '/payment/finish': typeof PaymentFinishLazyRoute
  '/payment/success': typeof PaymentSuccessLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/payment-success': typeof PaymentSuccessRoute
  '/akun': typeof AkunLazyRoute
  '/checkout-biodata': typeof CheckoutBiodataLazyRoute
  '/checkout-success': typeof CheckoutSuccessLazyRoute
  '/choose': typeof ChooseLazyRoute
  '/choose-return': typeof ChooseReturnLazyRoute
  '/notifications': typeof NotificationsLazyRoute
  '/orderHistory': typeof OrderHistoryLazyRoute
  '/payment': typeof PaymentLazyRouteWithChildren
  '/testaja': typeof TestajaLazyRoute
  '/auth/forget-pass': typeof AuthForgetPassLazyRoute
  '/auth/forget-pass-req': typeof AuthForgetPassReqLazyRoute
  '/auth/login': typeof AuthLoginLazyRoute
  '/auth/otp': typeof AuthOtpLazyRoute
  '/auth/register': typeof AuthRegisterLazyRoute
  '/payment/finish': typeof PaymentFinishLazyRoute
  '/payment/success': typeof PaymentSuccessLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/payment-success'
    | '/akun'
    | '/checkout-biodata'
    | '/checkout-success'
    | '/choose'
    | '/choose-return'
    | '/notifications'
    | '/orderHistory'
    | '/payment'
    | '/testaja'
    | '/auth/forget-pass'
    | '/auth/forget-pass-req'
    | '/auth/login'
    | '/auth/otp'
    | '/auth/register'
    | '/payment/finish'
    | '/payment/success'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/payment-success'
    | '/akun'
    | '/checkout-biodata'
    | '/checkout-success'
    | '/choose'
    | '/choose-return'
    | '/notifications'
    | '/orderHistory'
    | '/payment'
    | '/testaja'
    | '/auth/forget-pass'
    | '/auth/forget-pass-req'
    | '/auth/login'
    | '/auth/otp'
    | '/auth/register'
    | '/payment/finish'
    | '/payment/success'
  id:
    | '__root__'
    | '/'
    | '/payment-success'
    | '/akun'
    | '/checkout-biodata'
    | '/checkout-success'
    | '/choose'
    | '/choose-return'
    | '/notifications'
    | '/orderHistory'
    | '/payment'
    | '/testaja'
    | '/auth/forget-pass'
    | '/auth/forget-pass-req'
    | '/auth/login'
    | '/auth/otp'
    | '/auth/register'
    | '/payment/finish'
    | '/payment/success'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  PaymentSuccessRoute: typeof PaymentSuccessRoute
  AkunLazyRoute: typeof AkunLazyRoute
  CheckoutBiodataLazyRoute: typeof CheckoutBiodataLazyRoute
  CheckoutSuccessLazyRoute: typeof CheckoutSuccessLazyRoute
  ChooseLazyRoute: typeof ChooseLazyRoute
  ChooseReturnLazyRoute: typeof ChooseReturnLazyRoute
  NotificationsLazyRoute: typeof NotificationsLazyRoute
  OrderHistoryLazyRoute: typeof OrderHistoryLazyRoute
  PaymentLazyRoute: typeof PaymentLazyRouteWithChildren
  TestajaLazyRoute: typeof TestajaLazyRoute
  AuthForgetPassLazyRoute: typeof AuthForgetPassLazyRoute
  AuthForgetPassReqLazyRoute: typeof AuthForgetPassReqLazyRoute
  AuthLoginLazyRoute: typeof AuthLoginLazyRoute
  AuthOtpLazyRoute: typeof AuthOtpLazyRoute
  AuthRegisterLazyRoute: typeof AuthRegisterLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  PaymentSuccessRoute: PaymentSuccessRoute,
  AkunLazyRoute: AkunLazyRoute,
  CheckoutBiodataLazyRoute: CheckoutBiodataLazyRoute,
  CheckoutSuccessLazyRoute: CheckoutSuccessLazyRoute,
  ChooseLazyRoute: ChooseLazyRoute,
  ChooseReturnLazyRoute: ChooseReturnLazyRoute,
  NotificationsLazyRoute: NotificationsLazyRoute,
  OrderHistoryLazyRoute: OrderHistoryLazyRoute,
  PaymentLazyRoute: PaymentLazyRouteWithChildren,
  TestajaLazyRoute: TestajaLazyRoute,
  AuthForgetPassLazyRoute: AuthForgetPassLazyRoute,
  AuthForgetPassReqLazyRoute: AuthForgetPassReqLazyRoute,
  AuthLoginLazyRoute: AuthLoginLazyRoute,
  AuthOtpLazyRoute: AuthOtpLazyRoute,
  AuthRegisterLazyRoute: AuthRegisterLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/payment-success",
        "/akun",
        "/checkout-biodata",
        "/checkout-success",
        "/choose",
        "/choose-return",
        "/notifications",
        "/orderHistory",
        "/payment",
        "/testaja",
        "/auth/forget-pass",
        "/auth/forget-pass-req",
        "/auth/login",
        "/auth/otp",
        "/auth/register"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/payment-success": {
      "filePath": "payment-success.jsx"
    },
    "/akun": {
      "filePath": "akun.lazy.jsx"
    },
    "/checkout-biodata": {
      "filePath": "checkout-biodata.lazy.jsx"
    },
    "/checkout-success": {
      "filePath": "checkout-success.lazy.jsx"
    },
    "/choose": {
      "filePath": "choose.lazy.jsx"
    },
    "/choose-return": {
      "filePath": "choose-return.lazy.jsx"
    },
    "/notifications": {
      "filePath": "notifications.lazy.jsx"
    },
    "/orderHistory": {
      "filePath": "orderHistory.lazy.jsx"
    },
    "/payment": {
      "filePath": "payment.lazy.jsx",
      "children": [
        "/payment/finish",
        "/payment/success"
      ]
    },
    "/testaja": {
      "filePath": "testaja.lazy.jsx"
    },
    "/auth/forget-pass": {
      "filePath": "auth/forget-pass.lazy.jsx"
    },
    "/auth/forget-pass-req": {
      "filePath": "auth/forget-pass-req.lazy.jsx"
    },
    "/auth/login": {
      "filePath": "auth/login.lazy.jsx"
    },
    "/auth/otp": {
      "filePath": "auth/otp.lazy.jsx"
    },
    "/auth/register": {
      "filePath": "auth/register.lazy.jsx"
    },
    "/payment/finish": {
      "filePath": "payment/finish.lazy.jsx",
      "parent": "/payment"
    },
    "/payment/success": {
      "filePath": "payment/success.lazy.jsx",
      "parent": "/payment"
    }
  }
}
ROUTE_MANIFEST_END */
