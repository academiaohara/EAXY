export type ProvisionedStudent = {
  displayName: string;
  username: string;
  password: string;
};

export type ProvisionFailure = {
  displayName: string;
  reason: string;
};

export type ProvisionStudentsResult = {
  succeeded: ProvisionedStudent[];
  failed: ProvisionFailure[];
};

export type ClassroomStudent = {
  studentId: string;
  displayName: string;
  username: string;
};
