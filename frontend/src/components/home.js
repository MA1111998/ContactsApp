import { getUserID } from "../services/authHandler";
import ContactsTable from "./contactsTable";

const Home = () => {
        return ( 
        <div className="home-content">
            <ContactsTable/>
        </div>
    );
}
 
export default Home;