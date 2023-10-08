// src/MyApp.js
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
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
    const cid = character[0]["id"];

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

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
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
