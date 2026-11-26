export type ResetState = {
  status: "idle" | "done" | "error";
  tempPassword?: string;
};
