import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const clientId = "23QJDZ";
// const redirectUri = "https://paul-claret.pro/fitviz/callback";
const redirectUri = "http://localhost:3000/callback";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function exchangeCode() {
      const code = searchParams.get("code");
      const codeVerifier = sessionStorage.getItem("code_verifier");

      if (!code || !codeVerifier) {
        alert("Authorization failed: Missing code or verifier");
        return;
      }

      const body = new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      });

      try {
        const res = await fetch("https://api.fitbit.com/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        });

        if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);

        const data = await res.json();
        // Save tokens as needed (e.g., localStorage)
        localStorage.setItem("fitbit_access_token", data.access_token);
        localStorage.setItem("fitbit_refresh_token", data.refresh_token);
        localStorage.setItem("fitbit_user_id", data.user_id);

        // Redirect to home or dashboard
        navigate("/");
      } catch (e) {
        alert((e as Error).message);
      }
    }

    exchangeCode();
  }, [searchParams, navigate]);

  return <div>Authorizing Fitbit user...</div>;
}

