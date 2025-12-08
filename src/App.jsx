import { useEffect, useState } from 'react'
import {Chatbot} from 'supersimpledev'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'

function App(){
      const [chatMessages, setChatMessages] = useState([]);
      // const [chatMessages, setChatMessages] = array;

      // const chatMessages = array[0]; //currentData
      //const setChatMessages = array[1]; //updaterFunction

    useEffect(() => {
        Chatbot.addResponses({
            'goodbye':'Goodbye, have a nice day.',
            'give me an unique id': function(){
                return `Sure. Here it is an unique ID ${crypto.randomUUID()}`;
            }
        });
    },[]);

      return (
          <div className='app-container'>
              {chatMessages.length === 0 && (
                  <p className='welcome-message'>
                      Welcome to the chatbot project! Send a message using the textbox below.
                  </p>
              )}
              <ChatMessages 
                  chatMessages={chatMessages}
              />
              <ChatInput 
                  chatMessages={chatMessages}
                  setChatMessages={setChatMessages}
              />
          </div>
      );
      }

export default App
