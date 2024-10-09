// konektado to sa usermanagment admin

export interface User {
  id?: number; // Optional for new users
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  role: string;
  password: string; // Password field
}
