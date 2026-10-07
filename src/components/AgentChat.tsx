import { useEffect } from "react";

const AgentChat = () => {
  useEffect(() => {
    const w = window as any
    if (w.ASK_MY_RESUME?.__loaded || document.getElementById("ask-my-resume-sdk")) return;

    w.ASK_MY_RESUME = w.ASK_MY_RESUME || [];
    w.ASK_MY_RESUME.push(["init", {
      sourceUrl: "https://hieu-tn.netlify.app/api/content",
      title: "Ask about Hieu",
    }]);

    const s = document.createElement("script");
    s.id = "ask-my-resume-sdk";
    s.async = true;
    s.src = "http://localhost:8000/ask-my-resume.js";
    document.body.appendChild(s);
  }, []);

  return null
}

export default AgentChat
