export function formatPhone(value: string): string {
  // Extrai apenas dígitos e limita a 11 caracteres (DDD + 9 dígitos)
  const numbers = value.replace(/\D/g, '').slice(0, 11)

  if (!numbers) return ''
  if (numbers.length < 2) return numbers

  const area = numbers.slice(0, 2)
  const local = numbers.slice(2)

  if (!local) return `(${area})`
  if (local.length <= 1) return `(${area}) ${local}`
  if (local.length <= 4) return `(${area}) ${local.slice(0, 1)}.${local.slice(1)}`

  const prefix = local.slice(0, 1)
  const middle = local.slice(1, 5)
  const suffix = local.slice(5)

  return suffix
    ? `(${area}) ${prefix}.${middle}-${suffix}`
    : `(${area}) ${prefix}.${middle}`
}
