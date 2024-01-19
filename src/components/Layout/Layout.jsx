import Header from "./Header/Header"
import Map from "./Map/Map"
import Calendar from "./Calendar/Calendar"
import Footer from "./Footer/Footer"

const Layout = () => {
    return (
    <div>
        <Header />
        <div className="left">
            <Map />
            <Calendar />
        </div>
        <Footer />
    </div>
    )
}

export default Layout