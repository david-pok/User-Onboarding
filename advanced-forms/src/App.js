import React, { useState } from "react";
import "./App.css";
import TeamForm from "./components/Form";
import roster from "./dummyData";
import Member from "./components/Member";

function App() {
  const [team, setTeam] = useState(roster);

  const addNewMember = member => {
    const newMember = {
      id: Date.now(),
      name: member.name,
      email: member.email,
      role: member.role
    };
    setTeam([...team, newMember]);
  };

  return (
    <div className="App">
      {/* <Member members={team} /> */}
      <TeamForm addNewMember={addNewMember} />
    </div>
  );
}

export default App;
