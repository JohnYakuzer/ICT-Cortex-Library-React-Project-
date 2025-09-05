import Header from './header';
import Sidebar from './sidebar';
import './styles/all_rents.css'

const AllRents = () => {
    return(
        <>
            <Header />
            <Sidebar />
            <div className="msg_holder">
                <h1>Wasn't able to do rentals on time :(</h1>
                <h1>Have a Medo pic instead!</h1>
            </div>
            

            <div className="medo_holder">
                <img 
                src="/assets/deep_dark_secret/Medo.jpg"
                alt="Medo"
                className="Medo_pic" />
            </div>
        </>
        
           
    );
};

export default AllRents;