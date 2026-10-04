import type { Member } from "@prisma/client";

export function toPublicMember(member: Member) {
  return {
    id_member: member.id_member,
    name: member.name,
    biography: member.biography,
    contact_email: member.contact_email,
    class_name: member.class_name,
    lattes: member.lattes,
    linkedin: member.linkedin,
    admin_id_admin: member.admin_id_admin,
    photo_url: member.photo ? `/api/members/${member.id_member}/photo` : null,
  };
}
