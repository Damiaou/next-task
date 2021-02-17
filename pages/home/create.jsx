import React, { useState } from "react";
import axios from "axios";
import Card from "components/Card";
import Button from "components/Button";
import Layout from "components/Layout";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";

const create = () => {
  const [homeStored, setHomeStored] = useLocalStorage("home");
  const [homeLabel, setHomeLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (loading && homeLabel) {
    axios
      .post(`https://young-ravine-65632.herokuapp.com/home`, {
        label: homeLabel,
      })
      .then((res) => {
        // store in localstorage
        setLoading(false);
        console.info(res);
        setHomeStored(res.data);
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Layout>
      <Card>
        <form onSubmit={(e) => handleSubmit(e)}>
          <fieldset className="p-4">
            <legend className="text-lg">
              Please, enter your informations below
            </legend>
            <div className="form-group">
              <label htmlFor="email" className="mr-2">
                Home label
              </label>
              <input
                value={homeLabel}
                onChange={(e) => setHomeLabel(e.target.value)}
                type="label"
                name="label"
                id="label"
                placeholder="My beautiful house"
                className="bg-transparent focus:border-pink-200 outline-none text-center border-b-2 border-green-200  placeholder-green-300"
              />
              <Button
                className="ml-2"
                submit={true}
                disabled={loading}
                loading={loading}
              >
                Save
              </Button>
            </div>
          </fieldset>
        </form>
      </Card>
    </Layout>
  );
};

export default create;
