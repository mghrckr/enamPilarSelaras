import React, { useState } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "selamat sore, ada yang bisa saya bantu?", sender: 'opponent', avatar: "https://media.hitekno.com/thumbs/2022/08/01/12953-dustin-tiffani/730x480-img-12953-dustin-tiffani.jpg" },
    { text: "selamat sore, saya ada beberapa keluhan", sender: 'user', avatar: "https://asset-2.tstatic.net/jatim/foto/bank/images/sosok-dan-profil-Dustin-Tiffani.jpg" },
    { text: "tentu saja, akan saya jabarkan per point", sender: 'opponent', avatar: "https://media.hitekno.com/thumbs/2022/08/01/12953-dustin-tiffani/730x480-img-12953-dustin-tiffani.jpg" },
    { text: "bisa disebutkan?", sender: 'user', avatar: "https://asset-2.tstatic.net/jatim/foto/bank/images/sosok-dan-profil-Dustin-Tiffani.jpg" },
    { text: "produk yang saya beli tidak sesuai dengan yang saya minta, saya cancel transaksi tetapi saldo saya tetap berkurang, transaksi saya belum divalidasi"
    , sender: 'opponent', avatar: "https://media.hitekno.com/thumbs/2022/08/01/12953-dustin-tiffani/730x480-img-12953-dustin-tiffani.jpg" }
  ]); // Example messages
  const [inputValue, setInputValue] = useState(''); // State to handle input value

  // Function to handle message submission
  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user', avatar: "https://via.placeholder.com/40" }]);
      setInputValue(''); // Clear input after submission
    }
  };

  return (
    <div className="chat-box" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="messages" style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`} style={{ marginBottom: '10px', display: 'flex', justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <img src={message.avatar} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} /> {/* Render avatar */}
            <div className="message-bubble" style={{ padding: '8px 12px', borderRadius: '10px', backgroundColor: message.sender === 'user' ? '#dcf8c6' : '#e0e0e0', color: message.sender === 'user' ? '#000000' : '#333333' }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input-area" style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: '8px', borderRadius: '20px', marginRight: '10px', outline: 'none', border: 'none' }}
        />
        <button onClick={handleSubmit} className="send-button" style={{ backgroundColor: '#128c7e', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer', outline: 'none' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
