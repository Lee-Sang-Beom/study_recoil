import axios from "axios";
import { useEffect } from "react";
import Todolist from "../../components/Todolist/Todolist";

function Home() {

  async function fetch(){
    const res = await axios.get("http://localhost:3001/todos");
    console.log(res.data);
  }
  useEffect(()=>{
    fetch();
  }, []);
  
  return (
    <div className="container">
      <Todolist />
    </div>
  );
}

export default Home;
