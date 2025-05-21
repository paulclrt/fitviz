import React from "react";
import { useNavigate } from "react-router-dom";

const clientId = "23QJDZ";
// const redirectUri = "https://paul-claret.pro/fitviz/callback"; // Your registered redirect URI
const redirectUri = "http://localhost:3000/callback"; 
const scopes = [
    "heartrate",
    "cardio_fitness",
    "electrocardiogram",
    "irregular_rhythm_notifications",
    "location",
  "activity",
  "location",
  "nutrition",
  "oxygen_saturation",
  "profile",
  "respiratory_rate",
  "settings",
  "sleep",
  "social",
  "temperature",
  "weight",
].join(" ");

function base64UrlEncode(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}


async function sha256(buffer: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(buffer);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(hash);
}

function generateCodeVerifier() {
  const array = new Uint8Array(96);
  crypto.getRandomValues(array);
  return base64UrlEncode(array.buffer).slice(0, 128);
}

export default function Login() {
  const navigate = useNavigate();

  async function startAuth() {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await sha256(codeVerifier);

    // Save verifier in sessionStorage for later token exchange
    sessionStorage.setItem("code_verifier", codeVerifier);

    const authUrl = new URL("https://www.fitbit.com/oauth2/authorize");
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", scopes);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");

    window.location.href = authUrl.toString();
  }

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Login to Fitbit</h1>
      <button onClick={startAuth} style={{ fontSize: 18, padding: "10px 20px" }}>
        Authorize with Fitbit
      </button>
    </div>
  );
}

