import type { Admin } from "@prisma/client";

export function toPublicAdmin(admin: Admin) {
  return {
    id_admin: admin.id_admin,
    username: admin.username,
    email: admin.email,
    created_time: admin.created_time,
  };
}
