import React, { useState, useMemo } from 'react';
import FormGroupView from "../../components/FormGroupView";
import {getUserProfileData} from './helper';
import {READ_CLASS, EDIT_CLASS} from "./constants";
import "./index.css";

type ProfileFormProps = {
  readOnly: boolean,
  user: UserDTO | undefined
}
export default ({readOnly, user}: ProfileFormProps)=> {
  
  const userProfileData = useMemo(() => getUserProfileData(user), [user]);
  const [profileData, setProfileData] = useState(userProfileData);

  const onInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target as HTMLInputElement;
    setProfileData(profileData.map(data => (data.name === name ? ((data.value = value), data) : data)));
  };
  

return <div className={`user-profile__form ${readOnly ? READ_CLASS : EDIT_CLASS}`}>
      {profileData.map((data, i) => (
      <FormGroupView data={data} readOnly={readOnly} key={i} onInputChange={onInputChange} />
    ))}
  </div>
}
