'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const image =
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1280&q=70'

export function AuthView({ mode }: { mode: 'login' | 'register' }) {
  const router = useRouter()
  const isLogin = mode === 'login'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!isLogin && name.trim().length < 2) nextErrors.name = 'Informe seu nome'
    if (!email.includes('@')) nextErrors.email = 'E-mail inválido'
    if (password.length < 6) nextErrors.password = 'A senha precisa ter ao menos 6 caracteres'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    toast.success(isLogin ? 'Login realizado' : 'Conta criada com sucesso')
    router.push('/')
  }

  return (
    <div className="grid min-h-[calc(100svh-5rem)] lg:grid-cols-2">
      <div className="relative hidden min-h-[420px] lg:block">
        <Image src={image} alt="" fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-black/30" />
        <p className="absolute bottom-10 left-10 max-w-sm font-heading text-4xl text-white">
          {isLogin ? 'Bom te ver de novo.' : 'Comece pelo essencial.'}
        </p>
      </div>
      <div className="flex items-center px-5 py-16 md:px-16">
        <div className="w-full max-w-md animate-fadeInUp">
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">
            {isLogin ? 'Conta' : 'Cadastro'}
          </p>
          <h1 className="mt-3 text-4xl">{isLogin ? 'Entrar' : 'Criar conta'}</h1>
          <p className="mt-3 text-sm text-muted">Demonstração local. Nenhum dado é enviado.</p>
          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            {isLogin ? null : (
              <Input label="Nome" value={name} onChange={(event) => setName(event.target.value)} error={errors.name} />
            )}
            <Input
              label="E-mail"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
            />
            <Input
              label="Senha"
              type="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
            />
            <Button type="submit" fullWidth>
              {isLogin ? 'Entrar' : 'Criar conta'}
            </Button>
          </form>
          <p className="mt-6 text-sm text-muted">
            {isLogin ? 'Ainda não tem conta?' : 'Já tem uma conta?'}{' '}
            <Link href={isLogin ? '/register' : '/login'} className="text-foreground underline underline-offset-4">
              {isLogin ? 'Cadastre-se' : 'Entrar'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
