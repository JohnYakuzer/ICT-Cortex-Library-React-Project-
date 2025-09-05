import Header from './header';
import Sidebar from './sidebar';
import './styles/all_rents.css'

const RentalDetails = () => {
    return(
        <>
            <Header />
            <Sidebar />
            <div className="msg_holder">
                <h1>Wasn't able to do rentals on time :(</h1>
                <h1>Have a Kevin pic instead!</h1>
            </div>
            

            <div className="medo_holder">
                <img 
                src="/assets/deep_dark_secret/Kevin.jpg"
                alt="Medo"
                className="Medo_pic" />
            </div>
        </>
        
           
    );
};

export default RentalDetails;