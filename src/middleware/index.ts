import { defineMiddleware } from "astro:middleware";
import { getSession } from 'auth-astro/server';

const PUBLIC_ROUTES = [
  '/'
]

const AUTH_ROUTES = [
  '/login'
]

const API_AUTH_PREFIX = '/api/auth';
const API_TODOS_PREFIX = '/api/todos';

const DEFAULT_REDIRECT = '/todos'

export const onRequest = defineMiddleware(async ({ request, redirect }, next) => {

  const isLoggedIn = !!(await getSession(request))
  
  const pathname = new URL(request.url).pathname
  
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const isApiRoute = pathname.startsWith(API_AUTH_PREFIX);
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isApiTodoRoute = pathname.startsWith(API_TODOS_PREFIX)

  if (isApiRoute) return await next();

  if (isApiTodoRoute) {
    if (isLoggedIn) return await next();
    return new Response(JSON.stringify({
      message: 'Unauthorized'
    }), {
      status: 401
    })
  }

  if (isAuthRoute) {
    if (isLoggedIn) return redirect(DEFAULT_REDIRECT)
    return await next();
  }

  if (!isLoggedIn && !isPublicRoute) { // Estás parado en una ruta que requiere de autenticación
    return redirect('/')
  }

  return await next()
})