const fs = require('fs').promises;
import path from 'path';
import { writeLocal } from './get-all-trans';

const handler = async (req, res) => {
  await findDataFiles("data")
}

export default handler;

const findDataFiles = async (folderName) => {
  const dataFiles = await fs.readdir(folderName);
  console.log(dataFiles);
}