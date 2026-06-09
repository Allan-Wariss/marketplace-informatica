import { useSearchParams } from 'react-router-dom'
import './FilterChips.css'

type FilterOption = 'todos' | 'meus'

const CHIPS: { label: string; value: FilterOption }[] = [
    { label: 'Todos', value: 'todos' },
    { label: 'Meus', value: 'meus' },
]

export const FilterChips = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const active = (searchParams.get('filter') ?? 'todos') as FilterOption

    const handleSelect = (value: FilterOption) => {
        const next = new URLSearchParams(searchParams)
        next.set('filter', value)
        next.set('page', '0')
        setSearchParams(next, { replace: true })
    }

    return (
        <div className="filter-chips">
            {CHIPS.map((chip) => (
                <button
                    key={chip.value}
                    className={`filter-chips__btn${active === chip.value ? ' filter-chips__btn--active' : ''}`}
                    onClick={() => handleSelect(chip.value)}
                >
                    {chip.label}
                </button>
            ))}
        </div>
    )
}
