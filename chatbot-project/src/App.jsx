import { useState, useEffect, useRef } from 'react'
import {Chatbot} from 'supersimpledev';
import RobotProfileImage from './assets/robot.png';
import UserProfileImage from './assets/user.png';
import RobotLoadingSpinner from './assets/loading-spinner.gif'
import './App.css'

function ChatInput({chatMessages, setChatMessages}){
            const [inputText, setInputText] = useState('');
            const [isLoading, setIsLoading] = useState(false);

            function saveInputText(event){
                setInputText(event.target.value);
            }

            async function sendMessage(){
                if(isLoading || inputText === ''){
                    return ;
                }

                // Set isLoading to true at the start, and set it to
                // false after everything is done.
                setIsLoading(true);

                setInputText('');
                const newChatMessages = [
                    ...chatMessages,
                    {
                        message: inputText,
                        sender: 'user',
                        id: crypto.randomUUID()
                    }
                ]
                setChatMessages([
                    ...newChatMessages,
                    // This creates a temporary Loading... message.
                    // Because we don't save this message in newChatMessages,
                    // it will be remove later, when we add the response.
                    {
                    message: <img src={RobotLoadingSpinner} className="loading-spinner" />,
                    sender: 'robot',
                    id: crypto.randomUUID()
                    }
                ]);

                const response = await Chatbot.getResponseAsync(inputText);
                setChatMessages([
                    ...newChatMessages,
                    {
                        message: response,
                        sender: 'robot',
                        id: crypto.randomUUID()
                    }
                ]);

                // Set isLoading to false after everything is done.
                 setIsLoading(false);
               
            }

            function handleKeyDown(event){
                if(event.key === 'Enter'){
                    sendMessage();
                } else if(event.key === 'Escape'){
                    setInputText('');
                }

            }
        

            return(
                <div className='chat-input-container'>
                    <input 
                        placeholder="Send a message to chatbot" 
                        size="30"
                        onChange={saveInputText}
                        onKeyDown={handleKeyDown}
                        value={inputText}
                        className='chat-input'
                    />
                    <button 
                        onClick={sendMessage} 
                        className="send-button">Send</button>
                </div>
            );
        }

        function ChatMessage({message,sender}){
            //const message = props.message;
            //const sender = props.sender;

            //const {message, sender} = props;

            /*
            if (sender === 'robot'){
                return (
                <div>
                    <img src="robot.png" width="50"/>
                    {message}
                </div>
                );
            }*/

            return (
                <div className={
                    sender === 'user' 
                        ? 'chat-message-user' 
                        : 'chat-message-robot'
                }>
                    {sender === 'robot' && 
                        (<img src={RobotProfileImage} className='chat-message-profile'/>
                    )}
                    <div className='chat-message-text'>
                        {message}
                    </div>
                    {sender === 'user' && 
                        (<img src={UserProfileImage} className='chat-message-profile'/>
                    )}
                </div>
            );
        }

        function useAutoScroll(dependencies){
            const containerRef = useRef(null);

            useEffect(() => {
                const containerElem = containerRef.current;
                if(containerElem){
                    containerElem.scrollTop = containerElem.scrollHeight;
                }
            },[dependencies]);

            return containerRef;
        }

        function ChatMessages({chatMessages}){
            const chatMessagesRef = useAutoScroll([chatMessages]);
            return (
                <div 
                    className='chat-messages-container' 
                    ref={chatMessagesRef}
                > 
                    {chatMessages.map((chatMessage) => {
                        return(
                            <ChatMessage
                                message={chatMessage.message}
                                sender={chatMessage.sender}
                                key={chatMessage.id}
                            />
                        );
                    })}
                </div>
            );
        }

function App(){
      const [chatMessages, setChatMessages] = useState([]);
      // const [chatMessages, setChatMessages] = array;

      // const chatMessages = array[0]; //currentData
      //const setChatMessages = array[1]; //updaterFunction

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
