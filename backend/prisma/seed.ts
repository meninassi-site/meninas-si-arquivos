import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// The static site's images, reused here so the seeded data renders with real
// photos end-to-end (upload -> BLOB column -> /photo endpoint) instead of
// placeholders.
const staticAssets = path.join(__dirname, "..", "..", "meninas-de-sistemas", "assets", "images");

function readImage(relativePath: string): Buffer | undefined {
  const fullPath = path.join(staticAssets, relativePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  (seed) image not found, skipping: ${relativePath}`);
    return undefined;
  }
  return fs.readFileSync(fullPath);
}

async function main() {
  // Make the script safely re-runnable: clear out this seed's own demo rows
  // first rather than accumulating duplicates on every `npm run seed`.
  await prisma.event.deleteMany();
  await prisma.workshop.deleteMany();
  await prisma.shortCourse.deleteMany();
  await prisma.member.deleteMany();

  const adminPassword = "MeninasSi@123";
  const admin = await prisma.admin.upsert({
    where: { email: "admin@meninasdesistemas.ufpa.br" },
    update: {},
    create: {
      username: "coordenacao",
      email: "admin@meninasdesistemas.ufpa.br",
      password: await bcrypt.hash(adminPassword, 10),
    },
  });

  const adminLink = { admin_id_admin: admin.id_admin };

  const members: Array<Parameters<typeof prisma.member.create>[0]["data"]> = [
    {
      name: "Prof. Dr. Carlos Portela",
      photo: readImage("membros/carlosp.png"),
      biography:
        "Docente do Campus Universitário de Cametá (UFPA) e coordenador do laboratório LA FocA. Atua na coordenação de projetos de pesquisa e extensão, apoiando ações de incentivo e inclusão de mulheres na área de computação.",
      contact_email: "csp@ufpa.br",
      class_name: "Coordenação & Pesquisa",
      ...adminLink,
    },
    {
      name: "Gleyciane Barroso",
      photo: readImage("membros/gleycib.png"),
      biography: "Especialista em Interação Humano-Computador e acessibilidade.",
      class_name: "Mestra em Computação | UI/UX",
      ...adminLink,
    },
    {
      name: "Vitória Peres",
      photo: readImage("membros/vitoria.jpeg"),
      biography: "Scrum Master, Product Owner e mestranda em Computação Aplicada.",
      contact_email: "vitoriaperez6@gmail.com",
      class_name: "Gestão de Projetos | Front-end",
      ...adminLink,
    },
    {
      name: "Lorena Valeska",
      photo: readImage("membros/lorenavaleska.jpeg"),
      biography: "Graduada em Sistemas de Informação, foco em IA aplicada à educação.",
      contact_email: "lrnvaleska@gmail.com",
      class_name: "Inteligência Artificial | UI/UX",
      ...adminLink,
    },
    {
      name: "Milena Brabo",
      photo: readImage("membros/milenabrabo.jpeg"),
      biography: "Graduanda em Sistemas de Informação, desenvolvimento educacional.",
      contact_email: "milenalopesb8@gmail.com",
      class_name: "Full-Stack | Educação",
      ...adminLink,
    },
    {
      name: "Luciele Sanches",
      photo: readImage("membros/lu.jpeg"),
      biography: "Bolsista e gestora do projeto, atua como designer.",
      contact_email: "lucielesanches2@gmail.com",
      class_name: "Engenharia de Software | Front-end",
      ...adminLink,
    },
  ];

  for (const member of members) {
    await prisma.member.create({ data: member });
  }

  await prisma.event.create({
    data: {
      title: "3° Encontro de Mulheres na Computação",
      event_description:
        "Iniciativa idealizada para incentivar a equidade de gênero na área tecnológica, criando um ecossistema seguro e inspirador por meio de diálogos construtivos, trocas de experiências e networking. Faz parte do cronograma do projeto Meninas de Sistemas, em parceria com o programa Meninas Digitais da SBC.",
      organizer: "Meninas de Sistemas",
      location: "Auditório Principal / Formato Híbrido",
      cover_photo: readImage("eventos/3encontro.jpg"),
      data_occurence: new Date("2025-12-01T00:00:00.000Z"),
      time_occurence: new Date("1970-01-01T11:45:00.000Z"),
      ...adminLink,
    },
  });

  await prisma.event.create({
    data: {
      title: "VII Jornada da Computação Tecnologia e Educação",
      event_description:
        "Evento realizado desde 2014 em Cametá, organizado pelos docentes e alunos da Faculdade de Sistemas de Informação da UFPA. Inclui minicursos, mesas-redondas e o painel 'Meninas de Sistemas: O que avançamos em 12 meses de Luta?'.",
      // organizer/location are VARCHAR(45) per the diagram — too narrow for
      // the full "Faculdade de Sistemas de Informação da UFPA Campus
      // Cametá", so the short form goes here and the rest stays in the
      // description above.
      organizer: "Fac. de Sistemas de Informação - UFPA",
      location: "UFPA Campus Cametá",
      cover_photo: readImage("noticias/noticias-atuais/VIIjornada.png"),
      data_occurence: new Date("2023-12-13T00:00:00.000Z"),
      time_occurence: new Date("1970-01-01T11:45:00.000Z"),
      ...adminLink,
    },
  });

  await prisma.event.create({
    data: {
      title: "WIT - Women in Information Technology",
      event_description:
        "Participação da equipe do projeto na apresentação de artigos científicos, painéis de discussão e compartilhamento de metodologias sobre a retenção de mulheres na área de TI, durante o CSBC promovido pela SBC.",
      organizer: "SBC / CSBC",
      cover_photo: readImage("eventos/eventos-proximos/faltade.jpeg"),
      data_occurence: new Date("2025-07-01T00:00:00.000Z"),
      ...adminLink,
    },
  });

  // No workshop/short-course content existed on the static site (RF09/RF10
  // are new requirements), so these two are example records to exercise the
  // admin CRUD and public pages end-to-end.
  await prisma.workshop.create({
    data: {
      title: "Introdução à Programação com Python",
      event_description:
        "Workshop prático de introdução à lógica de programação e à linguagem Python, voltado a estudantes sem experiência prévia.",
      lacturer: "Equipe Meninas de Sistemas",
      location: "Laboratório de Informática - UFPA Cametá",
      lenght_time: 8,
      data_occurence: new Date("2026-11-15T00:00:00.000Z"),
      time_occurence: new Date("1970-01-01T14:00:00.000Z"),
      ...adminLink,
    },
  });

  await prisma.shortCourse.create({
    data: {
      title: "Minicurso de Introdução a Banco de Dados",
      event_description: "Minicurso introdutório sobre modelagem de dados e SQL para iniciantes.",
      lacturer: "Equipe Meninas de Sistemas",
      location: "Laboratório de Informática - UFPA Cametá",
      lenght_time: 4,
      data_occurence: new Date("2026-12-10T00:00:00.000Z"),
      time_occurence: new Date("1970-01-01T09:00:00.000Z"),
      ...adminLink,
    },
  });

  console.log("Seed concluído.");
  console.log(`Admin de acesso: ${admin.email} / senha: ${adminPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
