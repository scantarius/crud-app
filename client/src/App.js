import './App.css';
import React, {useState} from 'react';
import Axios from "axios";

function App() {  
  const [fullname, setFullName] = useState("");
  const [pos, setPos] = useState("");
  const [experience, setExperience] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [listCards, setListCards] = useState([]);

  //fix div class za citav sajt

  const onInput = (e) => setNewExperience(e.target.value);

  const createCard = () => {
    Axios.post("http://localhost:3001/create", {
      fullname: fullname,
      pos: pos,
      experience: experience
    }).then(() => {
      getList();
      setFullName("");
      setPos("");
      setExperience("");
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
      experience: newExperience,
      id: id
    }).then(() => {
      setListCards(listCards.map((val) => {
        return val.id === id 
        ? {
            fullname: val.fullname,
            pos: val.pos,
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
        <h2>Created with React, Node and MySQL</h2>
        <button onClick={getList}>Show All Created</button>
      </div>

      <div className='main'>
        <h3>Create New</h3>
        <div className='createCard'>
          <input
            className='main-input' 
            type='text' 
            required 
            placeholder='Full Name'
            value={fullname}
            onChange={(event) => {
            setFullName(event.target.value);
          }}
          />

          <input
            className='main-input' 
            type='text'
            required
            placeholder='Position'
            value={pos}
            onChange={(event) => {
            setPos(event.target.value); 
          }}
          />

          <input
            className='main-input' 
            type='text'
            required
            placeholder='Experience'
            value={experience}
            onChange={(event) => {
            setExperience(event.target.value); 
            }}
          />
      
          <button className='addCard' onClick={createCard}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e0e1dd" className="addCardIcon" viewBox="0 0 16 16">
            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 
            4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
          </button>
        </div>
            
        {listCards.map((val, index) => {
          return (
            <div className='content'>
              <div className='contentTitle'>
                <h3>Full Name: {val.fullname}</h3>
                <h3>Position: {val.pos}</h3>
                <h3>Experience: {val.experience}</h3>
              </div>

              <div className='inputs' key={index}>
                <input
                  className='edit-input'
                  type='text'
                  required
                  placeholder='Edit experience'
                  onInput={onInput}
                  onChange={(event) => {
                    setNewExperience(event.target.value);
                  }}
                />

                <button onClick={() => {
                  updateList(val.id);
                  }
                }>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e0e1dd" className="updateIcon" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                  </svg>
                </button>

                <button className='deleteButton' onClick={() => {
                  deleteList(val.id);
                  }
                }>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#e0e1dd" className="deleteIcon" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 
                    .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 
                    1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
