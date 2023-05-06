import './App.css';
import React,{useState} from 'react';
import Axios from "axios";

function App() {  
  const [fullname, setFullName] = useState("");
  const [pos, setPos] = useState("");
  const [experience, setExperience] = useState("");
  const [listCards, setListCards] = useState([]);
  const [newFullName, setNewFullName] = useState(0);
  const [newPos, setNewPos] = useState(0);
  const [newExperience, setNewExperience] = useState(0);
  
  const createCard = () => {
    Axios.post("http://localhost:3001/create", {
      fullname: fullname,
      pos: pos,
      experience: experience
    }).then(() => {
      getList();
      console.log("Successfully added new card!");
        setListCards([
          ...listCards, {
          fullname: fullname,
          pos: pos,
          experience: experience
        },
      ]);
    });
  };

  const updateList = (id) => {
    Axios.put("http://localhost:3001/update", {
      fullname: newFullName,
      pos: newPos,
      experience: newExperience,
      id: id
    }).then((response) => {
      setListCards(listCards.map((val) => {
        return val.id === id 
        ? {
            fullname: newFullName,
            pos: newPos,
            experience: newExperience,
            id: val.id
          }
        : val;
      }));
    })
  };

  const deleteList = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setListCards(listCards.filter((val) => {
        return val.id !== id;
      }))
    });
  };

  const getList = () => {
    Axios.get("http://localhost:3001/list").then((response) => {
      setListCards(response.data)
    });
  };

  return (
    <div className="App">

      <div className='title'>
        <h1>Create Remove Update Delete</h1>
        <h2>React, Node and MySQL</h2>
        <button onClick={getList}>Show All</button>
      </div>

      <div className='main'>
        <h3>Fill The Fields</h3>
        <div className='createCard'>
          <input
            className='main-input' 
            type='text'
            required
            placeholder='Full Name'
            onChange={(event) => {
            setFullName(event.target.value); 
          }}
          />

          <input
            className='main-input' 
            type='text'
            required
            placeholder='Position'
            onChange={(event) => {
            setPos(event.target.value); 
          }}
          />

          <input
            className='main-input' 
            type='text'
            required
            placeholder='Experience'
            onChange={(event) => {
            setExperience(event.target.value); 
          }}
          />
      
          <button className='addCard' onClick={createCard}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="plusicon" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          </button>
        </div>
            
        {listCards.map((val, idx) => {
          return (
            <div className='content'>
              <div className='contentTitle'>
                <h3>Full Name: {val.fullname}</h3>
                <h3>Position: {val.pos}</h3>
                <h3>Experience: {val.experience}</h3>
              </div>

                <div className='inputs'>
                  <input 
                    className='edit-input' 
                    type='text'
                    placeholder='Edit name'
                    onChange={(event) => {
                      setNewFullName(event.target.value);
                    }}
                  />
                  
                  <input 
                    className='edit-input' 
                    type='text'
                    placeholder='Edit position'
                    onChange={(event) => {
                      setNewPos(event.target.value);
                    }}
                  />

                  <input 
                    className='edit-input' 
                    type='text'
                    placeholder='Edit experience'
                    onChange={(event) => {
                      setNewExperience(event.target.value);
                    }}
                  />

                  <button onClick={() => {
                    updateList(val.id);
                    }
                  }>Update</button>

                  <button onClick={() => {
                    deleteList(val.id);
                    }
                  }>Delete</button>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
