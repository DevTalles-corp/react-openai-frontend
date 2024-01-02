import { useEffect, useState } from 'react';
import { GptMessage, MyMessage, TypingLoader, TextMessageBox } from '../../components';
import { createThreadUseCase } from '../../../core/use-cases';

interface Message {
  text: string;
  isGpt: boolean;
}




export const AssistantPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const [threadId, setThreadId] = useState<string>();

  // Obtener el thread, y si no existe, crearlo
  useEffect(() => {
    const threadId = localStorage.getItem('threadId');
    if ( threadId ) {
      setThreadId( threadId );
    } else {
      createThreadUseCase()
        .then( (id) => {
          setThreadId(id);
          localStorage.setItem('threadId', id)
        })
    }
  }, []);


  useEffect(() => {
    if ( threadId ) {
      setMessages( (prev) => [ ...prev, { text: `Número de thread ${ threadId }`, isGpt: true }] )
    }
  }, [threadId])
  
  




  const handlePost = async( text: string ) => {

    setIsLoading(true);
    setMessages( (prev) => [...prev, { text: text, isGpt: false }] );

    //TODO: UseCase
    
    setIsLoading(false);

    // Todo: Añadir el mensaje de isGPT en true


  }



  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Buen día, soy Sam, ¿en qué puedo ayudarte?" />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={ index } text={ message.text } />
                )
                : (
                  <MyMessage key={ index } text={ message.text } />
                )
                
            ))
          }

          
          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }
          

        </div>
      </div>


      <TextMessageBox 
        onSendMessage={ handlePost }
        placeholder='Escribe aquí lo que deseas'
        disableCorrections
      />

    </div>
  );
};
