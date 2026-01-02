import "./style.css";
import { account } from "./appwrite";
import googleLogo from "./src/assets/google2.png";

const app = document.getElementById("app");

// 🔑 Login with Google
const loginSIWG = () => {
  /*account.createOAuth2Token({
    provider: "google",
    success: "https://appwrite-oauth.appwrite.network",
    failure: "https://appwrite-oauth.appwrite.network/fail",
  }); */
  account.createOAuth2Session(
    OAuthProvider.Google,
    "https://appwrite-oauth.appwrite.network",
    "https://appwrite-oauth.appwrite.network/fail"
  );
};

// 🚪 Logout
const logout = async () => {
  try {
    await account.deleteSession(); // ✅ no "current" argument
    console.log("Logged out successfully");
    renderLogin();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// 🖼️ Render login button
const renderLogin = () => {
  app.innerHTML = `
    <button id="btn-siwg">
      <img src="${googleLogo}" alt="Google logo" />
      Sign in with Google
    </button>
  `;
  document.getElementById("btn-siwg").addEventListener("click", loginSIWG);
};

// 🖼️ Render user info
const renderUser = (user) => {
  const displayName = user.name?.trim() ? user.name : "User";
  app.innerHTML = `
    <h3>Hi ${displayName} (${user.email}) 👋</h3>
    <button id="btn-logout">Logout</button>
  `;
  document.getElementById("btn-logout").addEventListener("click", logout);
};

// 🚀 Init app
const init = async () => {
  try {
    const user = await account.get(); // ✅ modern session check
    console.log("Logged in user:", user);
    renderUser(user);
  } catch (error) {
    console.warn("User not logged in:", error);
    renderLogin();
  }
};

init();