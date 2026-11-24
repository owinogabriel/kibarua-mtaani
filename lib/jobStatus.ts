export const jobStatuses = ["open", "assigned", "done", "cancelled"] as const;
export type JobStatus = (typeof jobStatuses)[number];

// Status change a job owner may make
export const allowedNext: Record<JobStatus, JobStatus[]> = {
  open: ["assigned", "cancelled"],
  assigned: ["done", "open"],
  done: [],
  cancelled: ["open"],
};
