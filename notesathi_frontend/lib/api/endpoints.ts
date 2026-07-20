export const API = {
  AUTH: {
    REGISTER: "/api/users/register",
    LOGIN: "/api/users/login",
    GOOGLE: "/api/users/google",
    WHOAMI: "/api/users/whoami",
    PROFILE: "/api/users/update",
    UPDATE_PASSWORD: "/api/users/change-password",
    FORGOT_PASSWORD: "/api/users/forgot-password",
    RESET_PASSWORD: "/api/users/reset-password",
  },
  NOTE: {
    GET_ALL: "/api/note",
    SEARCH: "/api/note/search",
    CREATE: "/api/note/create",
    GET_BY_ID: (id: string) => `/api/note/${id}`,
    UPDATE: (id: string) => `/api/note/${id}`,
    DELETE: (id: string) => `/api/note/${id}`,
    LIKE: (id: string) => `/api/note/${id}/like`,
    COMMENTS: (id: string) => `/api/note/${id}/comments`,
    QUIZ: (id: string) => `/api/note/${id}/quiz`,
  },
  SUBJECT: {
    GET_ALL: "/api/subjects",
  },
  NOTIFICATION: {
    GET_ALL: "/api/notifications",
    MARK_READ: (id: string) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: "/api/notifications/read-all",
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
