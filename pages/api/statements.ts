// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import executeQuery from '../../connection';

export async function getStatements() {
  const query = `
  with 
      outcomes as (select SUM(value) as outcome, date_format(date, "%M %y") as date from Statement where type='outcome' and id_user=1 group by YEAR(date), month(date)),
      incomes as (select SUM(value) as income, date_format(date, "%M %y") as date from Statement where type='income' and id_user=1 group by YEAR(date), month(date))
  select incomes.income-outcomes.outcome as balance, outcomes.date from outcomes join incomes where incomes.date = outcomes.date;`;
  const statements = await executeQuery(query);
  return statements;
}

export default async function statement(req: NextApiRequest, res: NextApiResponse) {
  const data = await getStatements();
  res.status(200).json(data);
}
