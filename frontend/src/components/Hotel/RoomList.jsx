import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { getRoomsByHotel } from "../../services/roomService";
import { useParams } from "react-router-dom";

export default function RoomList(){
    const {id_hotel} = useParams();
    const [allRoom, setAllRoom] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchRooms = async () => {
            try {
                const response = await getRoomsByHotel(id_hotel);
                console.log("Danh sách phòng: ",response.data);
                setAllRoom(...allRoom,response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách phòng: ",error);
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    },[id_hotel]);

    if(loading)
        return <div className="text-center text-gray-500 py-10">Đang tải room...</div>;
    return(
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allRoom?.map(room => ( 
                    <RoomCard key={room.id} room={room}/>
                ))}
            </div>
        </div>
    );
}