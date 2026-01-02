import "./style.css";
import { account } from "./appwrite";
import { OAuthProvider } from "appwrite";
import googleLogo from "./src/assets/google2.png";



const app = document.getElementById("app");

const loginSIWG = async () => {
  account.createOAuth2Session(
    OAuthProvider.Google,
    "http://localhost:5173",
    "http://localhost:5173/fail"
  );
};

const logout = async () => {
  try {
    await account.deleteSession("current"); // end current session
    console.log("Logged out successfully");
    renderLogin(); // show login button again
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const renderLogin = () => {
  app.innerHTML = `
    <button id="btn-siwg">
      <img src="${googleLogo}" alt="Google logo" />
      Sign in with Google
    </button>
  `;
  document.getElementById("btn-siwg").addEventListener("click", loginSIWG);
};

const renderUser = (user) => {
  const displayName =
    user.name && user.name.trim() !== "" ? user.name : "User";

  app.innerHTML = `
    <h3>Hi ${displayName} (${user.email}) 👋</h3>
    <button id="btn-logout">Logout</button>
  `;
  document.getElementById("btn-logout").addEventListener("click", logout);
};

const init = async () => {
  try {
    const session = await account.getSession("current");
    const user = await account.get();
    console.log("Logged in user:", user);
    renderUser(user);
  } catch (error) {
    console.warn("User not logged in:", error);
    renderLogin();  // no session, show login
  }
};

init();