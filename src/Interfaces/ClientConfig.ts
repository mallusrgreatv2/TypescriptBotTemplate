export default interface ClientConfig {
  TOKEN: string;
  GUILD_ID: number;
  COMMANDS_GUILD_ONLY: "true" | "false";
  MONGODB_ENABLED: "true" | "false";
  MONGODB_CONNECTION_STRING: string;
}
