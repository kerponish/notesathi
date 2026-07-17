export const API = {
  AUTH: {
    REGISTER: "/api/users/register",
    LOGIN: "/api/users/login",
    WHOAMI: "/api/users/whoami",
    PROFILE: "/api/users/update",
    UPDATE_PASSWORD: "/api/users/update-password",
  },
  NOTE: {
    GET_ALL: "/api/note",
    SEARCH: "/api/note/search",
    CREATE: "/api/note/create",
    GET_BY_ID: (id: string) => `/api/note/${id}`,
    LIKE: (id: string) => `/api/note/${id}/like`,
    COMMENTS: (id: string) => `/api/note/${id}/comments`,
  },
  SUBJECT: {
    GET_ALL: "/api/subjects",
  },
  ADMIN: {
    USERS: {
      GET_ALL: "/api/admin/users",
      GET_BY_ID: (id: string) => `/api/admin/users/${id}`,
      CREATE: "/api/admin/users",
      UPDATE: (id: string) => `/api/admin/users/${id}`,
      UPDATE_PASSWORD: (id: string) => `/api/admin/users/${id}/password`,
      DELETE: (id: string) => `/api/admin/users/${id}`,
    },
  },
};
