import { useEffect, useState } from "react";
import { getMissions } from "../services/missionService";

export default function Missions(){

  const [missions,setMissions] = useState<any[]>([]);

  useEffect(()=>{

    const fetchData = async () => {

      const data = await getMissions();

      setMissions(data.data);

    };

    fetchData();

  },[]);

  return(

    <div>

      <h1>Missões</h1>

      {missions.map((mission)=>(
        <div key={mission.id}>
            <span>

                {mission.title}
            </span>
        </div>
      ))}

    </div>

  )

}
