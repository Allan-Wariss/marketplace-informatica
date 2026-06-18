import { useEffect, useMemo } from "react"
import { Header } from "../../components/Header"
import { useProducts } from "../../hooks/useProducts"
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import './relatorios.css'

ChartJS.register(ArcElement, Tooltip, Legend)

export const Relatorios = () => {
    const {
        categoriasRelatorio,
        loadingRelatorio,
        carregarRelatorio,
    } = useProducts()

    useEffect(() => {
        carregarRelatorio()
    }, [])

    const chartData = useMemo(() => {
        const labels = categoriasRelatorio.map(c => c.nome || '')
        const data = categoriasRelatorio.map(c => Number(c.totais_vendas ?? 0))

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
    }, [categoriasRelatorio])

    return (
        <>
            <Header />

            <section className="container-relatorios">
                <h1>Relatório de Vendas</h1>
                <p className="desc-relatorios">Categorias mais vendidas:</p>

                <div className="chart-container">
                    {loadingRelatorio ? (
                        <p>Carregando relatório...</p>
                    ) : categoriasRelatorio.length === 0 ? (
                        <p>Nenhuma venda finalizada encontrada.</p>
                    ) : (
                        <Doughnut data={chartData} />
                    )}
                </div>
            </section>
        </>
    )
}