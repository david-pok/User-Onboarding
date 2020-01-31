import React from "react";
import styled from "styled-components";

const MemberList = styled.div`
  display: flex;
`;

const MemberCard = styled.div`
  width: 25%;
  padding: 5px;
  margin: 10px;
  border: 1px solid black;
  word-wrap: break-word;
`;

const Member = props => {
  return (
    <MemberList>
      {props.members.map(member => (
        <MemberCard key={member.email}>
          <h4>Name: {member.name}</h4>
          <p>Email: {member.email}</p>
          <p>Password: {member.password}</p>
          <p>Team: {member.team}</p>
          <p>Additional info: {member.info}</p>
          {/* <button>Edit</button> */}
        </MemberCard>
      ))}
    </MemberList>
  );
};

export default Member;
