import { useEffect, useMemo, useState } from "react"
import { Header } from "../../components/Header"
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import CategoriesApi from '../../api/categories/api'
import type { ICategory } from '../../types/ICategory'
import './relatorios.css'

ChartJS.register(ArcElement, Tooltip, Legend)

export const Relatorios = () => {
    const [categorias, setCategorias] = useState<ICategory[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function carregarRelatorio() {
            try {
                const data = await CategoriesApi.getVendasPorCategoria()

                const categoriasComVenda = data.filter(
                    (categoria) => Number(categoria.totais_vendas) > 0
                )

                setCategorias(categoriasComVenda)
            } catch (error) {
                console.error('Erro ao carregar relatório:', error)
            } finally {
                setLoading(false)
            }
        }

        carregarRelatorio()
    }, [])

    const chartData = useMemo(() => {
        const labels = categorias.map(c => c.nome || '')
        const data = categorias.map(c => Number(c.totais_vendas ?? 0))

        const palette = [
            '#007BFF',
            '#005FCC',
            '#00A3FF',
            '#6BC4B8',
            '#FF8A3D',
            '#b3b3b3',
            '#2F3A4A',
        ]

        const backgroundColor = labels.map((_, i) => palette[i % palette.length])

        return {
            labels,
            datasets: [
                {
                    label: 'Vendas por categoria',
                    data,
                    backgroundColor,
                },
            ],
        }
    }, [categorias])

    return (
        <>
            <Header />

            <section className="container-relatorios">
                <h1>Relatório de Vendas</h1>
                <p className="desc-relatorios">Categorias mais vendidas:</p>

                <div className="chart-container">
                    {loading ? (
                        <p>Carregando relatório...</p>
                    ) : categorias.length === 0 ? (
                        <p>Nenhuma venda finalizada encontrada.</p>
                    ) : (
                        <Doughnut data={chartData} />
                    )}
                </div>
            </section>
        </>
    )
}