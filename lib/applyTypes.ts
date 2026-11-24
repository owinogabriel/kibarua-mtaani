export type ApplyState = {
  status: "idle" | "success" | "error";
  error?: string; // error code, translated in the form
};