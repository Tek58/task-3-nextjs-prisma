import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import * as bcrypt from "bcrypt";

export default async function handle(req, res) {
  const { name, email, password, companyName } = req.body;

  const result = await prisma.company.create({
    data: {
      name: companyName,
    },
  });

  const userData = await createUser(name, email, password, result.id);

  const data = {
    user: userData,
    comany: result,
  };

  res.json(data);
}

async function createUser(name, email, password, companyid) {
  const salt = await bcrypt.genSalt();
  const hashdPass = await bcrypt.hash(password, salt);

  const newUserResult = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashdPass,
      companyId: companyid,
    },
  });

  return newUserResult;
}
