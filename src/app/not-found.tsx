import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-24">
      <p className="text-[11px] uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="mt-3 text-4xl md:text-6xl">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-muted">
        Esse endereço não faz parte do cardápio. Volte ao início e continue explorando.
      </p>
      <Button href="/" className="mt-8">
        Voltar ao início
      </Button>
    </Container>
  )
}
