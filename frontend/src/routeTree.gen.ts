/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutPublicImport } from './routes/_layout-public'
import { Route as LayoutHomeImport } from './routes/_layout-home'
import { Route as LayoutDashboardImport } from './routes/_layout-dashboard'
import { Route as LayoutDashboardIndexImport } from './routes/_layout-dashboard/index'
import { Route as LayoutPublicSignupImport } from './routes/_layout-public/signup'
import { Route as LayoutPublicResetPasswordImport } from './routes/_layout-public/reset-password'
import { Route as LayoutPublicRecoverPasswordImport } from './routes/_layout-public/recover-password'
import { Route as LayoutPublicQuizImport } from './routes/_layout-public/quiz'
import { Route as LayoutPublicLoginImport } from './routes/_layout-public/login'
import { Route as LayoutHomeHomeImport } from './routes/_layout-home/home'
import { Route as LayoutDashboardSurveysImport } from './routes/_layout-dashboard/surveys'
import { Route as LayoutDashboardListImport } from './routes/_layout-dashboard/list'

// Create/Update Routes

const LayoutPublicRoute = LayoutPublicImport.update({
  id: '/_layout-public',
  getParentRoute: () => rootRoute,
} as any)

const LayoutHomeRoute = LayoutHomeImport.update({
  id: '/_layout-home',
  getParentRoute: () => rootRoute,
} as any)

const LayoutDashboardRoute = LayoutDashboardImport.update({
  id: '/_layout-dashboard',
  getParentRoute: () => rootRoute,
} as any)

const LayoutDashboardIndexRoute = LayoutDashboardIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutDashboardRoute,
} as any)

const LayoutPublicSignupRoute = LayoutPublicSignupImport.update({
  path: '/signup',
  getParentRoute: () => LayoutPublicRoute,
} as any)

const LayoutPublicResetPasswordRoute = LayoutPublicResetPasswordImport.update({
  path: '/reset-password',
  getParentRoute: () => LayoutPublicRoute,
} as any)

const LayoutPublicRecoverPasswordRoute =
  LayoutPublicRecoverPasswordImport.update({
    path: '/recover-password',
    getParentRoute: () => LayoutPublicRoute,
  } as any)

const LayoutPublicQuizRoute = LayoutPublicQuizImport.update({
  path: '/quiz',
  getParentRoute: () => LayoutPublicRoute,
} as any)

const LayoutPublicLoginRoute = LayoutPublicLoginImport.update({
  path: '/login',
  getParentRoute: () => LayoutPublicRoute,
} as any)

const LayoutHomeHomeRoute = LayoutHomeHomeImport.update({
  path: '/home',
  getParentRoute: () => LayoutHomeRoute,
} as any)

const LayoutDashboardSurveysRoute = LayoutDashboardSurveysImport.update({
  path: '/surveys',
  getParentRoute: () => LayoutDashboardRoute,
} as any)

const LayoutDashboardListRoute = LayoutDashboardListImport.update({
  path: '/list',
  getParentRoute: () => LayoutDashboardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout-dashboard': {
      preLoaderRoute: typeof LayoutDashboardImport
      parentRoute: typeof rootRoute
    }
    '/_layout-home': {
      preLoaderRoute: typeof LayoutHomeImport
      parentRoute: typeof rootRoute
    }
    '/_layout-public': {
      preLoaderRoute: typeof LayoutPublicImport
      parentRoute: typeof rootRoute
    }
    '/_layout-dashboard/list': {
      preLoaderRoute: typeof LayoutDashboardListImport
      parentRoute: typeof LayoutDashboardImport
    }
    '/_layout-dashboard/surveys': {
      preLoaderRoute: typeof LayoutDashboardSurveysImport
      parentRoute: typeof LayoutDashboardImport
    }
    '/_layout-home/home': {
      preLoaderRoute: typeof LayoutHomeHomeImport
      parentRoute: typeof LayoutHomeImport
    }
    '/_layout-public/login': {
      preLoaderRoute: typeof LayoutPublicLoginImport
      parentRoute: typeof LayoutPublicImport
    }
    '/_layout-public/quiz': {
      preLoaderRoute: typeof LayoutPublicQuizImport
      parentRoute: typeof LayoutPublicImport
    }
    '/_layout-public/recover-password': {
      preLoaderRoute: typeof LayoutPublicRecoverPasswordImport
      parentRoute: typeof LayoutPublicImport
    }
    '/_layout-public/reset-password': {
      preLoaderRoute: typeof LayoutPublicResetPasswordImport
      parentRoute: typeof LayoutPublicImport
    }
    '/_layout-public/signup': {
      preLoaderRoute: typeof LayoutPublicSignupImport
      parentRoute: typeof LayoutPublicImport
    }
    '/_layout-dashboard/': {
      preLoaderRoute: typeof LayoutDashboardIndexImport
      parentRoute: typeof LayoutDashboardImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  LayoutDashboardRoute.addChildren([
    LayoutDashboardListRoute,
    LayoutDashboardSurveysRoute,
    LayoutDashboardIndexRoute,
  ]),
  LayoutHomeRoute.addChildren([LayoutHomeHomeRoute]),
  LayoutPublicRoute.addChildren([
    LayoutPublicLoginRoute,
    LayoutPublicQuizRoute,
    LayoutPublicRecoverPasswordRoute,
    LayoutPublicResetPasswordRoute,
    LayoutPublicSignupRoute,
  ]),
])

/* prettier-ignore-end */