export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified?: boolean;
  mobile_number: string;
  attributes?: {
    mobile_number?: string[];
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
  realmRole?: string;
}
