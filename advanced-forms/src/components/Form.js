import React, { useState, useEffect } from "react";
import { Formik, withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import roster from "../dummyData";

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

const TeamForm = ({ values, errors, touched, status, addNewMember }) => {
  // console.log('values', resetForm)

  const [members, setMembers] = useState(roster);

  useEffect(() => {
    // console.log("status has changed", status);
    status && setMembers(members => [...members, status]);
  }, [status]);

  // const handleChanges = e => {
  //   setMember({
  //     ...member,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // const submitForm = e => {
  //   e.preventDefault();
  //   props.addNewMember(member);
  //   setMember({ name: "", email: "", role: "" });
  // };

  return (
    <div>
      <Form>
        <div>
          <label htmlFor="name">Name: </label>
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="Enter name here"
          />
          {touched.name && errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="Enter email here"
          />
        </div>

        <div>
          <label>Password: </label>
          <Field
            type="password"
            name="password"
            placeholder="Enter password here"
          />
        </div>

        <div>
          <label htmlFor="tos">
            Terms of Service:
            <Field id="tos" type="checkbox" name="tos" check={values.tos} />
            {touched.tos && errors.tos && <p>{errors.tos}</p>}
          </label>
        </div>

        <div>
          <label htmlFor="team">Team: </label>
          <Field id="team" as="select" name="team">
            <option disabled>Choose an option below</option>
            <option value="DC">DC</option>
            <option value="Marvel">Marvel</option>
            <option value="Other">Other</option>
          </Field>
        </div>

        <div>
          <Field
            as="textarea"
            type="text"
            name="info"
            placeholder="Enter additional info here"
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </Form>

      <MemberList>
        {members.map(member => (
          <MemberCard key={member.email}>
            <h4>Name: {member.name}</h4>
            <p>Email: {member.email}</p>
            <p>Password: {member.password}</p>
            <p>Team: {member.team}</p>
            <p>Additional info: {member.info}</p>
          </MemberCard>
        ))}
      </MemberList>
    </div>
  );
};

const TeamFormik = withFormik({
  mapPropsToValues({
    name,
    email,
    password,
    tos,
    team,
    info,
    addNewMember,
    member,
    setMember
  }) {
    return {
      name: name || "",
      email: email || "",
      password: "",
      tos: tos || false,
      team: "",
      info: ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    tos: Yup.boolean()
      .required("The terms must be accepted")
      .oneOf([true], "The Terms must be accepted")
  }),
  handleSubmit(
    values,
    { setStatus, resetForm },
    formikBag,
    addNewMember,
    setMember
  ) {
    // console.log("submitd", values);
    // addNewMember(values);
    // setMember({ name: "", email: "", password: "", team: "", info: "" });
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        console.log("response", response);
        setStatus(response.data);
        resetForm();
      })
      .catch(error => console.log("error making post", error));
  }
})(TeamForm);
export default TeamFormik;
