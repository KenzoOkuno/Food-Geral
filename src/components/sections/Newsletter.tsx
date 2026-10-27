'use client'

import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function Newsletter() {
  const [email, setEmail] = useState('')

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!email.includes('@')) {
      toast.error('Informe um e-mail válido')
      return
    }
    toast.success('Inscrição confirmada — novidades doces a caminho')
    setEmail('')
  }

  return (
    <section className="bg-bg-alt">
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-accent">Novidades</p>
          <h2 className="mt-3 font-heading text-3xl md:text-5xl">Receba inspirações de mesa e sabores</h2>
          <p className="mt-4 text-sm text-muted">
            Ideias de bolo, doces da estação e lembretes para não deixar o orçamento para a última hora.
          </p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu melhor e-mail"
              className="h-12 flex-1 rounded-theme border border-border bg-surface px-4 text-sm outline-none ring-accent focus:ring-2"
              aria-label="E-mail"
            />
            <Button type="submit" size="lg">
              Quero receber
            </Button>
          </form>
        </div>
      </Container>
    </section>
  )
}
