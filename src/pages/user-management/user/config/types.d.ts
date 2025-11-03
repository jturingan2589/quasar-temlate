export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  attributes?: {
    mobile?: string[];
    mobileNumber?: string[];
    [key: string]: unknown;
  };
  enabled: boolean;
  totp?: boolean;
  disableableCredentialTypes?: string[];
  requiredActions?: string[];
  notBefore?: number;
  access?: {
    manage?: boolean;
    [key: string]: boolean;
  };
}
