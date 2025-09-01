import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const generateAudio = async () => {
    setLoading(true);
    setAudioUrl(null);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to generate audio");

      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center", padding: "40px" }}>
      <h1>🗣️ Text to Speech Demo</h1>
      <textarea
        rows="5"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        style={{ padding: "10px", borderRadius: "8px", marginTop: "20px" }}
      />
      <br />
      <button
        onClick={generateAudio}
        disabled={loading || !text}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          background: loading ? "gray" : "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Voice"}
      </button>
      <div style={{ marginTop: "30px" }}>
        {audioUrl && (
          <audio controls src={audioUrl} style={{ marginTop: "20px" }} />
        )}
      </div>
    </div>
  );
}
