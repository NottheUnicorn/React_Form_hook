import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Home(props) {
    const { setLogin } = props;
  const { register, errors, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    //console.log("RESULT", data);
    //alert(JSON.stringify(data));
    setLogin(true);
    navigate("/inventory");
  };
  console.log(errors);

  console.log("props", props);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Car Inventorry Sign In</h1>
      <label>First name</label>
      <input
        type="text"
        {...register("First name", { required: true, maxLength: 80 })}
      />
      <label>Last name</label>
      <input
        type="text"
        {...register("Last name", { required: true, maxLength: 100 })}
      />
      <label>Email</label>
      <input
        type="text"
        {...register("Email", {
          required: true,
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
      />

      <input type="submit" />
    </form>
  );
}

export default Home;
