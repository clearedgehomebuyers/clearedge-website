import { readFileSync } from "fs";
const raw = readFileSync("lh-homepage-deep.json", "utf8");
const lhr = JSON.parse(raw);
const audits = lhr.audits;