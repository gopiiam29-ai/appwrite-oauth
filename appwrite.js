import { Client, Account } from "appwrite";

const { VITE_PROJECT_ID, VITE_ENDPOINT } = import.meta.env;
console.log(VITE_PROJECT_ID, VITE_ENDPOINT);

const client = new Client();
    client.setEndpoint(import.meta.env.VITE_ENDPOINT);
    client.setProject(import.meta.env.VITE_PROJECT_ID);
    //client.setSession();
const account = new Account(client);

export { account };
