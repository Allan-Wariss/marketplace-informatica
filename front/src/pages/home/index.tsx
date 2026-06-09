import { Header } from "../../components/Header"
import { FilterChips } from "../../components/FilterChips"
import { ListProducts } from "../../components/ListProducts"



export const Home = () => {

    return(
        <>
        <Header />
        <FilterChips />
        <ListProducts/>
        </>
    )
}