import React, { useState } from "react";

function Chatbot({ apiKey, weather }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // ✨ Function to generate smart chatbot responses
  const getChatbotResponse = async (userMessage) => {
    const msg = userMessage.toLowerCase();

    // 1️⃣ Greetings
    if (msg.includes("hi") || msg.includes("hello")) {
      return "Hello! 👋 How are you today?";
    }

    // 2️⃣ Thank you
    if (msg.includes("thank")) {
      return "You're very welcome! 😊 Stay safe!";
    }

    // 3️⃣ Help / About
    if (msg.includes("help") || msg.includes("what can you do")) {
      return "I can tell you the weather 🌦️ and give smart recommendations ☔🧥!";
    }

    // 4️⃣ Recommendations based on live weather
    if (msg.includes("recommend") || msg.includes("suggest")) {
      if (!weather) {
        return "Please check the weather first so I can suggest better! 🌍";
      }

      const condition = weather.weather[0].main.toLowerCase();
      if (condition.includes("rain")) return "☔ It's rainy — carry an umbrella and wear waterproof shoes!";
      if (condition.includes("clear")) return "😎 It's sunny — wear sunglasses and stay hydrated!";
      if (condition.includes("cloud")) return "☁️ Cloudy skies — maybe a light jacket!";
      if (condition.includes("snow")) return "❄️ It's snowy — bundle up and stay warm!";
      if (condition.includes("drizzle")) return "🌦️ Light drizzle — take an umbrella!";
      if (condition.includes("mist")) return "🌫️ Misty weather — drive slowly and use fog lights!";
      return "🌍 Stay prepared for any weather!";
    }

    // 5️⃣ Weather in [city]
    const cityMatch = msg.match(/weather in ([a-zA-Z\s]+)/i);
    if (cityMatch) {
      const city = cityMatch[1].trim();

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();

        if (data.cod === 200) {
          return `🌤️ Weather in ${data.name}: ${data.main.temp}°C, ${data.weather[0].main}`;
        } else {
          return `Sorry, I couldn't find weather for ${city}. 😕`;
        }
      } catch (err) {
        console.error(err);
        return "Error fetching weather data. Please try again later.";
      }
    }

    // 6️⃣ Default fallback
    return "I'm still learning 🤖. Try 'weather in Hyderabad' or 'recommend something'.";
  };

  // 🪄 When user clicks send or presses Enter
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botReply = await getChatbotResponse(input);
    const botMessage = { sender: "bot", text: botReply };

    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // 💬 UI Layout
  return (
    <div className="chatbot-container">
      <h3>Weather Chatbot</h3>
      <div className="chat-log">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "chat-user" : "chat-bot"}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me about weather or say hi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
