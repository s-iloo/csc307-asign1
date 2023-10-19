// src/MyApp.js
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    console.log("RIGHT BEFORE");
    fetchUsers()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const users = data;
        console.log(users);
        return users;
      })
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function postUser(person) {
    const promise = await fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })
      .then((res) => (res.status === 201 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          console.log(json);

          setCharacters([...characters, json]);
          console.log("CHARS");
          console.log(characters);
        }
      });

    return promise;
  }

  async function removeOneCharacter(index) {
    const character = characters.filter((character, i) => {
      return i === index;
    });
    console.log("index: " + index);
    console.log(character);
    const cid = character[0]._id;
    console.log("HEREEEEEEBRUOOOO");
    console.log(cid);
    const promise = await fetch(`http://localhost:8000/users/${cid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("index = " + index);
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    console.log("updated");
    console.log(updated);
    setCharacters(updated);
    return promise;
  }

  async function fetchUsers() {
    const promise = await fetch("http://localhost:8000/users");
    return promise;
  }
  function updateList(person) {
    postUser(person).catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
