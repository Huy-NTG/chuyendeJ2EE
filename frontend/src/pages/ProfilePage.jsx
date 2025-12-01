import Footer from "../components/Global/Footer";
import Header from "../components/Global/Header";
import PersonalInformation from "../components/Profile/PersonalInformation ";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ProfilePage(){
    const { currentUser } = useCurrentUser();
        
    return (
        <div>
            <Header></Header>
            <div className="main flex justify-center items-center p-5">
                <div className="main--wrapper w-10/12">
                    <div className="header p-5 justify-center items-center">
                        <div className="header--wrapper">
                            <div className="title">
                                <h2 className="flex justify-center items-center font-bold text-4xl text-blue-800">THÔNG TIN KHÁCH HÀNG</h2>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <PersonalInformation user={currentUser}/>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}