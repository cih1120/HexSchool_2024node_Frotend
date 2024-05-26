import { useSession } from 'next-auth/react'

/**
 * utils.ts
 * 
 * 包含常用的客戶端函數，用於各種前端操作。
 * 
 * 用於：Client 端
 */

export const getSessionUser = () => {
  const { data: session } = useSession()
  return session?.user || null
}