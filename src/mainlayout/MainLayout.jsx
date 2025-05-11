import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
const Navbar = dynamic(() => import('@/components/Navbar'))
const AttNavbar = dynamic(() => import('@/components/AttNavbar'))


export default function MainLayout ({styled, children, name}) {
    return(
        <>
            {styled ? <AttNavbar name={name}/> : <Navbar/>}
                {children}
            <Footer/>
        </>
    )
}