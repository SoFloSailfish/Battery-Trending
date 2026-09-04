import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, BarChart, Bar, Cell,
} from "recharts";
import {
  Battery, Plus, Download, Upload, ChevronLeft, AlertTriangle,
  Activity, Clock, DollarSign, Gauge, Settings, Trash2, Check,
  FileSpreadsheet, X, Sun, Moon, UploadCloud, Cloud, CloudOff, Key,
} from "lucide-react";

const SEED = [{"name":"Tower Pod","model":"NorthStar SBS190F","ah":190,"load":7.4,"ref":2405,"retail":660,"strings":1,"jarLabels":["Jar1","Jar2","Jar3","Jar4"],"jarCount":4,"conductance":[{"date":"2024-06-20","readings":[1884,1806,1710,1650]},{"date":"2024-12-27","readings":[2466,2370,2310,2160]},{"date":"2026-02-07","readings":[2508,2424,2394,2292]}],"voltage":[{"date":"2024-06-20","readings":[13.61,13.75,13.9,14.086]},{"date":"2024-12-27","readings":[13.624,13.683,13.662,13.987]}],"temperature":[{"date":"2024-06-20","readings":[69.8,69.8,69.8,69.8]},{"date":"2024-12-27","readings":[68,68,68,68]}]},{"name":"Six Mile","model":"DEKA 12AVR100ET","ah":100,"load":8,"ref":1253,"retail":460,"strings":1,"jarLabels":["Jar1","Jar2","Jar3","Jar4"],"jarCount":4,"conductance":[{"date":"2023-09-07","readings":[1140,1236,1146,1116]},{"date":"2024-06-24","readings":[1074,1140,1068,1110]},{"date":"2024-12-26","readings":[714,792,702,756]},{"date":"2026-02-07","readings":[510,588,480,522]}],"voltage":[{"date":"2023-09-07","readings":[12.833,12.804,12.821,12.844]},{"date":"2024-06-24","readings":[12.817,12.754,12.82,12.902]},{"date":"2024-12-26","readings":[12.524,12.46,12.526,12.607]}],"temperature":[{"date":"2023-09-07","readings":[69,69,69,69]},{"date":"2024-06-24","readings":[72,72,72,72]},{"date":"2024-12-26","readings":[72,72,72,72]}]},{"name":"Public Works","model":"DEKA 12AVR150ET","ah":150,"load":82.9,"ref":2049,"retail":520,"strings":6,"jarLabels":["Jar1-1","Jar1-2","Jar1-3","Jar1-4","Jar2-1","Jar2-2","Jar2-3","Jar2-4","Jar3-1","Jar3-2","Jar3-3","Jar3-4","Jar4-1","Jar4-2","Jar4-3","Jar4-4","Jar5-1","Jar5-2","Jar5-3","Jar5-4","Jar6-1","Jar6-2","Jar6-3","Jar6-4"],"jarCount":24,"conductance":[{"date":"2020-02-18","readings":[1986,1962,1956,2022,1920,1926,1938,1962,1980,1956,1962,1974,2004,1968,1962,1968,1986,1992,2046,2070,2034,2016,2070,2088]},{"date":"2023-09-07","readings":[1866,1818,1824,1908,1788,1794,1776,1800,1800,1806,1800,1794,1866,1824,1812,1806,1818,1836,1872,1872,1872,1884,1884,1914]},{"date":"2024-06-25","readings":[1728,1596,1644,1578,1638,1632,1554,1524,1626,1632,1500,1554,1596,1554,1512,1440,1602,1344,1626,1542,1272,1332,1248,1272]},{"date":"2024-12-27","readings":[1692,1560,1602,1560,1590,1578,1494,1482,1566,1566,1440,1506,1578,1518,1458,1428,1530,1302,1584,1494,1410,1794,1698,1662]},{"date":"2026-02-07","readings":[1614,1470,1506,1644,1530,1494,1404,1380,1470,1458,1320,1398,1476,1500,1386,1320,1518,1236,1560,1350,1590,1674,1590,1554]}],"voltage":[{"date":"2020-02-18","readings":[13.59,13.67,13.55,13.62,13.63,13.58,13.64,13.56,13.6,13.6,13.64,13.56,13.6,13.52,13.68,13.6,13.64,13.71,13.51,13.56,13.63,13.55,13.63,13.6]},{"date":"2023-09-07","readings":[13.58,13.723,13.638,13.89,13.64,13.62,13.75,13.85,13.63,13.63,13.779,13.8,13.59,13.51,13.84,13.9,13.61,13.797,13.648,13.83,13.638,13.58,13.76,13.883]},{"date":"2024-06-25","readings":[13.55,13.69,13.61,14.05,13.62,13.6,13.73,13.87,13.6,13.61,13.77,13.82,13.58,12.51,13.85,13.95,13.58,13.76,13.65,13.87,13.61,13.59,13.79,13.91]},{"date":"2024-12-27","readings":[13.553,13.69,13.597,14.013,13.587,13.611,13.721,13.834,13.577,13.625,13.783,13.798,13.575,13.507,13.824,13.965,13.314,13.791,13.664,13.859,13.592,13.573,13.767,13.974]}],"temperature":[{"date":"2020-02-18","readings":[70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5,70.5]},{"date":"2023-09-07","readings":[69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69]},{"date":"2024-06-25","readings":[79,79,79,79,81,81,81,81,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79,79]},{"date":"2024-12-27","readings":[73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73,73]}]},{"name":"Admin East","model":"Enersys SBS190F","ah":190,"load":32,"ref":1918,"retail":null,"strings":2,"jarLabels":["Jar1-1","Jar1-2","Jar1-3","Jar1-4","Jar2-1","Jar2-2","Jar2-3","Jar2-4"],"jarCount":8,"conductance":[{"date":"2025-07-14","readings":[1920,1938,1902,1668,1872,1806,1734,1746]},{"date":"2025-10-03","readings":[2004,2010,1932,1812,2016,1926,1872,1776]}],"voltage":[],"temperature":[]},{"name":"JC Annex","model":"DEKA / NorthStar","ah":170,"load":117.1,"ref":2086,"stringRefs":[2086,2086,2086,2086,2086,2597,2597,2597,2597],"retail":580,"strings":9,"jarLabels":["Jar1-1","Jar1-2","Jar1-3","Jar1-4","Jar2-1","Jar2-2","Jar2-3","Jar2-4","Jar3-1","Jar3-2","Jar3-3","Jar3-4","Jar4-1","Jar4-2","Jar4-3","Jar4-4","Jar5-1","Jar5-2","Jar5-3","Jar5-4","Jar6-1","Jar6-2","Jar6-3","Jar6-4","Jar7-1","Jar7-2","Jar7-3","Jar7-4","Jar8-1","Jar8-2","Jar8-3","Jar8-4","Jar9-1","Jar9-2","Jar9-3","Jar9-4"],"jarCount":36,"conductance":[{"date":"2020-02-19","readings":[2106,2112,2118,2124,2100,2112,2106,2142,2130,2064,2088,2082,2004,2106,2004,2040,2070,2082,2100,2028,2562,2562,2538,2526,2598,2550,2562,2550,2622,2574,2676,2646,2616,2598,2670,2706]},{"date":"2023-09-06","readings":[1770,1320,1782,1794,1782,1782,1770,1752,1806,1752,1764,1776,1710,1776,1692,1740,1740,1764,1770,1746,2292,2298,2286,2004,2316,2238,2298,2265,1542,1806,2214,2010,1950,2376,2430,2436]},{"date":"2024-07-23","readings":[1524,1542,1494,1494,1596,1566,1542,1482,1578,1554,1542,1482,1536,1572,1464,1458,1536,1548,1536,1470,1632,2016,1698,1908,2340,2010,1758,1992,2268,1968,2142,2064,2202,2130,2178,1770]},{"date":"2024-12-27","readings":[1464,1524,1446,1494,1554,1536,1518,1446,1554,1524,1524,1464,1518,1524,1422,1434,1500,1548,1488,1446,1602,1980,2262,2058,2310,2232,1818,1956,1938,2214,2412,1866,2430,2298,2406,2070]}],"voltage":[],"temperature":[]},{"name":"Justice Center","model":"C&D AT-15P","ah":839,"load":150.4,"ref":2231,"retail":null,"strings":1,"jarLabels":["Jar1-1","Jar1-2","Jar1-3","Jar1-4","Jar1-5","Jar1-6","Jar1-7","Jar1-8","Jar1-9","Jar1-10","Jar1-11","Jar1-12","Jar1-13","Jar1-14","Jar1-15","Jar1-16","Jar1-17","Jar1-18","Jar1-19","Jar1-20","Jar1-21","Jar1-22","Jar1-23","Jar1-24"],"jarCount":24,"conductance":[{"date":"2025-07-15","readings":[2204,1992,2371,2164,2361,2174,2246,2218,2139,2143,2615,2213,2324,2296,2132,2073,2077,2064,1929,2210,2404,2185,2277,2284]},{"date":"2025-10-03","readings":[2229,1977,2423,2237,2380,2244,2412,2166,2220,1922,2377,2144,2405,2205,2072,2130,2250,2503,1951,2386,2099,2276,2360,2187]}],"voltage":[],"temperature":[]},{"name":"EOC","model":"Enersys SBS190F","ah":190,"load":55,"ref":2583,"retail":660,"strings":12,"jarLabels":["Jar1-1","Jar1-2","Jar1-3","Jar1-4","Jar2-1","Jar2-2","Jar2-3","Jar2-4","Jar3-1","Jar3-2","Jar3-3","Jar3-4","Jar4-1","Jar4-2","Jar4-3","Jar4-4","Jar5-1","Jar5-2","Jar5-3","Jar5-4","Jar6-1","Jar6-2","Jar6-3","Jar6-4","Jar7-1","Jar7-2","Jar7-3","Jar7-4","Jar8-1","Jar8-2","Jar8-3","Jar8-4","Jar9-1","Jar9-2","Jar9-3","Jar9-4","Jar10-1","Jar10-2","Jar10-3","Jar10-4","Jar11-1","Jar11-2","Jar11-3","Jar11-4","Jar12-1","Jar12-2","Jar12-3","Jar12-4"],"jarCount":48,"conductance":[{"date":"2023-04-26","readings":[2346,2760,2520,2718,2460,2604,2484,2574,2706,2592,2580,2544,2604,2556,2538,2736,2550,2682,2376,2718,2742,2772,2544,2694,2634,2646,2604,2454,2670,2442,2538,2514,2694,2670,2472,2622,2592,2658,2580,2478,2676,2604,2568,2670,2460,2460,2544,2550]},{"date":"2024-06-27","readings":[2082,2334,2040,2214,2154,2214,2124,2124,2178,2184,2148,2130,2142,2112,2100,2172,2082,2214,2016,2172,2262,2280,2106,2196,2130,2052,2202,2124,2178,2058,2136,1908,2232,2040,1914,2016,2094,2166,2286,1908,2190,2184,2178,2112,1938,1902,1908,2082]},{"date":"2024-12-26","readings":[2058,2238,2130,2082,2148,2292,2100,2196,2244,2250,2172,2124,2118,2118,2172,2376,2202,2232,2070,2184,2238,2388,2226,2316,2160,2160,2148,2226,2298,2178,2274,2124,2148,2238,2034,2172,2130,2292,2406,2064,2160,2178,2166,2196,2028,1926,2070,2148]}],"voltage":[],"temperature":[]},{"name":"ADMIN","model":"Enersys SBS190F","ah":190,"load":24.49,"ref":2092,"retail":null,"strings":2,"jarLabels":["Jar1-1","Jar1-2","Jar1-3","Jar1-4","Jar2-1","Jar2-2","Jar2-3","Jar2-4"],"jarCount":8,"conductance":[{"date":"2025-07-15","readings":[2148,2082,2010,1962,2112,2058,2202,2046]},{"date":"2025-10-03","readings":[2280,2142,1980,2010,2004,2130,2034,2160]}],"voltage":[],"temperature":[]},{"name":"TAX","model":"DEKA 12AVR150ET","ah":150,"load":55,"ref":2049,"retail":520,"strings":5,"jarLabels":["Jar1-1","Jar1-2","Jar1-3","Jar1-4","Jar2-1","Jar2-2","Jar2-3","Jar2-4","Jar3-1","Jar3-2","Jar3-3","Jar3-4","Jar4-1","Jar4-2","Jar4-3","Jar4-4","Jar5-1","Jar5-2","Jar5-3","Jar5-4"],"jarCount":20,"conductance":[{"date":"2020-02-18","readings":[1896,1932,1932,1926,1944,1914,1908,1926,1938,1938,1950,1920,1950,1914,1962,1962,1956,1956,1956,1950]},{"date":"2023-09-06","readings":[1506,1602,1602,1620,1572,1524,1470,1608,1590,1512,1560,1602,1530,1578,1568,1626,1434,1608,1608,1620]},{"date":"2024-07-23","readings":[1380,1500,1458,1494,1554,1374,1284,1482,1368,1278,1440,1308,1500,1332,1392,1446,1362,1452,1362,1464]},{"date":"2024-12-26","readings":[1236,1314,1290,1332,1368,1170,1092,1440,1218,1056,1230,1116,1320,1110,1188,1278,1128,1224,1164,1272]}],"voltage":[],"temperature":[]}];

/* ---------- GitHub sync ----------
 * The app's shared data lives in the repo at data/battery-data.json.
 * READ: fetched from the public raw URL on startup — no token, every viewer
 *       sees the latest published data automatically.
 * WRITE: pushed via the GitHub Contents API using a personal access token that
 *        the importer enters once (saved in this browser's localStorage).
 */
const GH_OWNER = "SoFloSailfish";
const GH_REPO = "Battery-Trending";
const GH_BRANCH = "main";
const GH_DATA_PATH = "data/battery-data.json";
const GH_TOKEN_KEY = "bt_github_token";

// public raw URL for reading (cache-busted so viewers get fresh data)
function ghRawUrl() {
  return `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/${GH_BRANCH}/${GH_DATA_PATH}?t=${Date.now()}`;
}

function getStoredToken() {
  try { return localStorage.getItem(GH_TOKEN_KEY) || ""; } catch { return ""; }
}
function setStoredToken(t) {
  try { if (t) localStorage.setItem(GH_TOKEN_KEY, t); else localStorage.removeItem(GH_TOKEN_KEY); } catch {}
}

// Read the shared data file. Returns { sites } or null if not present yet.
async function ghFetchData() {
  try {
    const res = await fetch(ghRawUrl(), { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (data && Array.isArray(data.sites)) return data;
    return null;
  } catch {
    return null;
  }
}

// Get the current file's SHA (needed to update an existing file via the API).
async function ghGetSha(token) {
  const url = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_DATA_PATH}?ref=${GH_BRANCH}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
  });
  if (res.status === 404) return null; // file doesn't exist yet
  if (!res.ok) throw new Error(`GitHub read failed (${res.status})`);
  const j = await res.json();
  return j.sha || null;
}

// Publish the current sites to the repo. Returns { ok, error }.
async function ghPublish(sites, token) {
  if (!token) return { ok: false, error: "No token set." };
  try {
    const sha = await ghGetSha(token);
    const body = {
      version: 1,
      updated: new Date().toISOString(),
      sites,
    };
    // base64-encode the JSON (btoa needs binary-safe handling for UTF-8)
    const json = JSON.stringify(body, null, 2);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    const url = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_DATA_PATH}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update battery data ${new Date().toISOString().slice(0, 16).replace("T", " ")}`,
        content: b64,
        branch: GH_BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      if (res.status === 401) return { ok: false, error: "Token rejected (401). Check the token is valid and has 'repo' or 'Contents: write' access." };
      if (res.status === 404) return { ok: false, error: "Repo or path not found (404). Check the token has access to this repository." };
      return { ok: false, error: `Publish failed (${res.status}). ${txt.slice(0, 120)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message || "Network error while publishing." };
  }
}


const EOL = 0.8;            // 80% end-of-life derate
const REPLACE_THRESHOLD = 0.8; // string health % at/under which a string is "due"
const WEAK_JAR_THRESHOLD = 0.6; // any single jar at/under this flags the string regardless of average

// Build jar labels the same way existing sites are labeled:
//  - single string  -> "Jar1", "Jar2", ...
//  - multiple strings -> "Jar1-1".."Jar1-N", "Jar2-1"..  (string-major)
function makeJarLabels(strings, jarsPerString) {
  const s = Math.max(1, strings | 0);
  const j = Math.max(1, jarsPerString | 0);
  const out = [];
  if (s === 1) {
    for (let i = 1; i <= j; i++) out.push(`Jar${i}`);
  } else {
    for (let st = 1; st <= s; st++)
      for (let i = 1; i <= j; i++) out.push(`Jar${st}-${i}`);
  }
  return out;
}

// Create a blank site record with no readings yet.
function makeNewSite({ name, model, ah, load, ref, retail, strings, jarsPerString }) {
  const labels = makeJarLabels(strings, jarsPerString);
  return {
    name: name.trim() || "New Site",
    model: model || "",
    ah: Number(ah) || 0,
    load: Number(load) || 0,
    ref: ref === "" || ref == null ? null : Number(ref),
    retail: retail === "" || retail == null ? null : Number(retail),
    strings: Math.max(1, Number(strings) || 1),
    jarLabels: labels,
    jarCount: labels.length,
    conductance: [],
    voltage: [],
    temperature: [],
  };
}

// Reference conductance: use stored ref, else the highest reading ever seen (baseline).
function refValue(site) {
  if (site.ref != null && site.ref > 0) return site.ref;
  let max = 0;
  site.conductance.forEach((r) =>
    r.readings.forEach((v) => { if (typeof v === "number" && v > max) max = v; })
  );
  return max || null;
}

// jars per string for a site (assumes equal-size strings, which is how labels are built)
function jarsPerString(site) {
  const s = site.strings || 1;
  return Math.max(1, Math.round(site.jarCount / s));
}

// Build a per-jar reference array of length jarCount.
//  - if site.stringRefs is set (one ref per string), each jar uses its string's ref
//  - otherwise every jar uses the site's single reference (stored or derived)
function jarRefs(site) {
  const single = refValue(site);
  const n = site.jarCount;
  if (Array.isArray(site.stringRefs) && site.stringRefs.length) {
    const per = jarsPerString(site);
    const out = [];
    for (let i = 0; i < n; i++) {
      const stringIdx = Math.floor(i / per);
      const r = site.stringRefs[stringIdx];
      out.push(r != null && r > 0 ? r : single);
    }
    return out;
  }
  return new Array(n).fill(single);
}

// latest non-empty conductance record
function latest(records) {
  for (let i = records.length - 1; i >= 0; i--) {
    const r = records[i];
    if (r.readings.some((v) => typeof v === "number" && v > 0)) return r;
  }
  return records[records.length - 1] || null;
}

function jarHealth(reading, ref) {
  if (ref == null || ref === 0 || typeof reading !== "number") return null;
  return reading / ref;
}

// string health = mean of jar conductance % for a record.
// `refs` is either a single number (legacy) or a per-jar array.
function recordHealth(record, refs) {
  if (!record) return null;
  const getRef = (i) => (Array.isArray(refs) ? refs[i] : refs);
  const vals = record.readings
    .map((v, i) => jarHealth(v, getRef(i)))
    .filter((v) => v != null && v > 0);
  if (!vals.length) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

// weakest jar in a record: returns { index, label?, health } or null
function weakestJar(record, refs, jarLabels) {
  if (!record) return null;
  const getRef = (i) => (Array.isArray(refs) ? refs[i] : refs);
  let minIdx = -1, minH = Infinity;
  record.readings.forEach((v, i) => {
    const h = jarHealth(v, getRef(i));
    if (h != null && h > 0 && h < minH) { minH = h; minIdx = i; }
  });
  if (minIdx === -1) return null;
  return {
    index: minIdx,
    label: jarLabels ? jarLabels[minIdx] : `Jar ${minIdx + 1}`,
    health: minH,
  };
}

function siteMetrics(site) {
  const ref = refValue(site);             // single value (for display / legacy)
  const refs = jarRefs(site);             // per-jar array (handles per-string refs)
  const hasPerString = Array.isArray(site.stringRefs) && site.stringRefs.length > 0;
  const rec = latest(site.conductance);
  const health = recordHealth(rec, refs);
  const weak = weakestJar(rec, refs, site.jarLabels);
  const weakFlag = weak != null && weak.health <= WEAK_JAR_THRESHOLD;
  const adjustedAh = health != null ? site.ah * health * EOL : null;
  const strings = site.strings || 1;
  const runtime =
    adjustedAh != null && site.load > 0
      ? (adjustedAh * strings) / site.load
      : null;
  const replaceCost =
    site.retail != null ? site.retail * site.jarCount : null;
  return { ref, refs, hasPerString, rec, health, weak, weakFlag, adjustedAh, runtime, replaceCost, strings };
}

/* ---------- CSV import (Midtronics Celltraq) ---------- */

// split a CSV line respecting simple quoted fields
function splitCSV(line) {
  const out = [];
  let cur = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { q = !q; continue; }
    if (ch === "," && !q) { out.push(cur); cur = ""; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

// Exact header → role map for the Celltraq export. Matched case-insensitively.
// Strap columns and the B/C/D banks are intentionally ignored (single-tap testing).
const HEADER_MAP = {
  "site": "site",
  "string": "string",
  "jar": "jar",
  "cell": "jar",
  "date": "date",
  "time": "time",
  "cond a": "cond",
  "conductance": "cond",
  "volts a": "volt",
  "voltage": "volt",
  "temp": "temp",
  "temperature": "temp",
  "ref.conductance": "ref",
  "ref conductance": "ref",
  "reference": "ref",
};

function mapHeader(h) {
  const k = h.toLowerCase().replace(/[._]+/g, ".").replace(/\s+/g, " ").trim();
  if (HEADER_MAP[k]) return HEADER_MAP[k];
  // tolerate "ref.conductance" written as "ref conductance" etc.
  const k2 = k.replace(/\./g, " ").replace(/\s+/g, " ").trim();
  return HEADER_MAP[k2] || null;
}

function normDate(raw) {
  if (!raw) return null;
  const s = raw.trim();
  const m = s.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
  if (m) {
    let [, mo, da, yr] = m;
    if (yr.length === 2) yr = "20" + yr;
    const dt = new Date(+yr, +mo - 1, +da);
    if (!isNaN(dt)) return dt.toISOString().slice(0, 10);
  }
  let dt = new Date(s);
  if (!isNaN(dt) && s.match(/\d{4}/)) return dt.toISOString().slice(0, 10);
  return null;
}

const num = (v) => {
  if (v == null) return NaN;
  const s = String(v).trim();
  if (s === "" || s.toUpperCase() === "NA") return NaN;
  return parseFloat(s);
};

// parse "HH:MM" or "HH:MM:SS" (optionally with AM/PM) into minutes-since-midnight; NaN if absent
function timeToMinutes(raw) {
  if (!raw) return NaN;
  const s = String(raw).trim();
  const m = s.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AaPp][Mm])?/);
  if (!m) return NaN;
  let h = +m[1];
  const min = +m[2];
  const sec = m[3] ? +m[3] : 0;
  const ap = m[4] ? m[4].toLowerCase() : null;
  if (ap === "pm" && h < 12) h += 12;
  if (ap === "am" && h === 12) h = 0;
  return h * 60 + min + sec / 60;
}

// strip a trailing string-index the tester appends per parallel string:
// "ADMIN EAST2" -> "ADMIN EAST", "ADMIN2" -> "ADMIN". Leaves "JC 6TH FLOOR MDF" alone.
function baseSiteName(raw) {
  if (!raw) return raw;
  return raw.replace(/\s*(\d+)\s*$/, (m, d) => "").trim() || raw.trim();
}

// Parse the Celltraq CSV. Returns { sites: [ siteGroup ], error? }
// siteGroup = { rawNames:Set, baseName, date, ref, strings:[{string,jars:[{jar,cond,volt,temp}]}], jarCount }
function parseCelltronCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (!lines.length) return { error: "The file is empty." };

  // header is the first row containing a conductance column
  let headerIdx = -1, roles = null;
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const cells = splitCSV(lines[i]);
    const r = cells.map(mapHeader);
    if (r.includes("cond")) { headerIdx = i; roles = r; break; }
  }
  if (headerIdx === -1)
    return { error: "Couldn't find a conductance column (expected a 'Cond A' header). Check that this is a Celltraq export." };

  const idx = {};
  roles.forEach((role, i) => { if (role && idx[role] == null) idx[role] = i; });
  if (idx.cond == null) return { error: "No conductance column found." };

  // read data rows
  const rows = [];
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const cells = splitCSV(lines[i]);
    const cond = num(cells[idx.cond]);
    if (isNaN(cond)) continue;
    rows.push({
      rawSite: idx.site != null ? cells[idx.site] : "Imported Site",
      string: idx.string != null ? cells[idx.string] : "STRING1",
      jar: idx.jar != null ? cells[idx.jar] : String(rows.length + 1),
      cond,
      volt: idx.volt != null ? num(cells[idx.volt]) : NaN,
      temp: idx.temp != null ? num(cells[idx.temp]) : NaN,
      ref: idx.ref != null ? num(cells[idx.ref]) : NaN,
      date: idx.date != null ? normDate(cells[idx.date]) : null,
      time: idx.time != null ? timeToMinutes(cells[idx.time]) : NaN,
    });
  }
  if (!rows.length) return { error: "No data rows with conductance values were found." };

  // group by base site (trailing string-index stripped)
  const order = [];
  const groups = {};
  rows.forEach((r) => {
    const base = baseSiteName(r.rawSite);
    if (!groups[base]) { groups[base] = { rawNames: new Set(), base, rows: [] }; order.push(base); }
    groups[base].rawNames.add(r.rawSite);
    groups[base].rows.push(r);
  });

  const sites = order.map((base) => {
    const g = groups[base];

    // a site dump can contain multiple test DATES; split them into separate tests.
    const dateOrder = [];
    const byDate = {};
    g.rows.forEach((r) => {
      const d = r.date || "(undated)";
      if (!byDate[d]) { byDate[d] = []; dateOrder.push(d); }
      byDate[d].push(r);
    });

    // build one test per date: { date, strings:[{string,jars}], ref, jarCount }
    const buildTest = (dateRows, dateKey) => {
      const sOrder = [];
      const byString = {};
      dateRows.forEach((r) => {
        const k = r.string || "STRING1";
        if (!byString[k]) { byString[k] = []; sOrder.push(k); }
        byString[k].push(r);
      });
      // Same-day retest handling: within a string, if the same jar position appears
      // more than once, keep the reading with the latest time. Preserve first-seen
      // jar order so the flattened array still lines up with the site's layout.
      let retestSeen = false;
      const strings = sOrder.map((k) => {
        const rowsForString = byString[k];
        const byJar = new Map();      // jar -> chosen row
        const jarOrder = [];
        rowsForString.forEach((r) => {
          const jarKey = r.jar;
          if (!byJar.has(jarKey)) {
            byJar.set(jarKey, r);
            jarOrder.push(jarKey);
          } else {
            retestSeen = true;
            const prev = byJar.get(jarKey);
            const prevT = isNaN(prev.time) ? -Infinity : prev.time;
            const curT = isNaN(r.time) ? -Infinity : r.time;
            // keep the later time; if times are equal/missing, the later row in the file wins
            if (curT >= prevT) byJar.set(jarKey, r);
          }
        });
        return { string: k, jars: jarOrder.map((j) => byJar.get(j)) };
      });
      const refVals = dateRows.map((r) => r.ref).filter((v) => !isNaN(v) && v > 0);
      const jarCount = strings.reduce((n, s) => n + s.jars.length, 0);
      return {
        date: dateKey === "(undated)" ? null : dateKey,
        strings,
        stringCount: strings.length,
        ref: refVals.length ? refVals[0] : null,
        jarCount,
        retest: retestSeen,
      };
    };

    // sort dates chronologically (undated last)
    const sortedDates = dateOrder.slice().sort((a, b) => {
      if (a === "(undated)") return 1;
      if (b === "(undated)") return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    });
    const tests = sortedDates.map((d) => buildTest(byDate[d], d));

    // representative values from the most recent test (for the import card header/preview)
    const latestTest = tests[tests.length - 1];
    return {
      baseName: base,
      rawNames: Array.from(g.rawNames),
      tests,                         // every dated test found for this site
      testCount: tests.length,
      // convenience fields mirror the latest test so existing UI keeps working
      strings: latestTest.strings,
      stringCount: latestTest.stringCount,
      ref: tests.map((t) => t.ref).find((v) => v) || null,
      date: latestTest.date,
      jarCount: latestTest.jarCount,
    };
  });

  return { sites };
}

// Flatten a single dated test's strings into an ordered reading array (string-major, jar order preserved)
function flattenTest(test, field) {
  const out = [];
  test.strings.forEach((s) => s.jars.forEach((j) => out.push(isNaN(j[field]) ? 0 : j[field])));
  return out;
}

// Flatten a site group's LATEST test (back-compat for preview code)
function flattenGroup(group, field) {
  const latest = group.tests ? group.tests[group.tests.length - 1] : group;
  return flattenTest(latest, field);
}

// Known name differences between the tester's site labels and the app's site names.
// Once the test set is renamed to match the app, the direct name match handles it
// and these aliases are just a fallback for the tester's current labels.
const SITE_ALIASES = [
  { app: "Justice Center", match: ["jc 6th floor", "jc 6th", "6th floor mdf"] },
  { app: "JC Annex", match: ["jca", "jc annex"] },
  { app: "Six Mile", match: ["6mile", "6 mile", "six mile", "lcso 6mile"] },
];

// fuzzy match a tester site name to one of our app sites; returns index or -1
function autoMatchSite(parsedName, sites) {
  if (!parsedName) return -1;
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const target = norm(parsedName);
  const lower = parsedName.toLowerCase();

  // explicit alias table first
  for (const a of SITE_ALIASES) {
    if (a.match.some((m) => lower.includes(m))) {
      const i = sites.findIndex((s) => s.name === a.app);
      if (i >= 0) return i;
    }
  }

  let best = -1, bestScore = 0;
  sites.forEach((s, i) => {
    const n = norm(s.name);
    let score = 0;
    if (n === target) score = 100;
    else if (n.includes(target) || target.includes(n)) score = 75;
    else {
      const a = new Set(s.name.toLowerCase().split(/\s+/));
      const b = lower.split(/\s+/);
      const hit = b.filter((t) => a.has(t)).length;
      score = hit * 30;
    }
    if (score > bestScore) { bestScore = score; best = i; }
  });
  return bestScore >= 45 ? best : -1;
}

function fmtDate(d) {
  if (!d) return "—";
  const dt = new Date(d + "T00:00:00");
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
function fmtDateTime(iso) {
  if (!iso) return "—";
  const dt = new Date(iso);
  if (isNaN(dt)) return "—";
  return dt.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}
function pct(v) { return v == null ? "—" : (v * 100).toFixed(1) + "%"; }
function money(v) { return v == null ? "—" : "$" + Math.round(v).toLocaleString(); }
function hrs(v) { return v == null ? "—" : v.toFixed(1) + " hr"; }

// status tiers driven by string health; weakFlag elevates a string whose
// average looks fine but has at least one jar at/under the weak-jar threshold.
// Bands: >=90 Healthy(green) | >=80 OK(light green) | >=70 Monitor(amber)
//        | >=60 Plan replacement(orange) | <60 Replace now(red)
function tier(health, weakFlag = false) {
  if (health == null) return { key: "none", label: "No data", color: "var(--c-muted)" };
  const base =
    health >= 0.9
      ? { key: "good", label: "Healthy", color: "var(--c-good)" }
      : health >= 0.8
      ? { key: "ok", label: "OK", color: "var(--c-ok)" }
      : health >= 0.7
      ? { key: "watch", label: "Monitor", color: "var(--c-watch)" }
      : health >= 0.6
      ? { key: "due", label: "Plan replacement", color: "var(--c-due)" }
      : { key: "crit", label: "Replace now", color: "var(--c-crit)" };
  // a single failing jar drags the whole series string; never let it read better than "due"
  if (weakFlag && (base.key === "good" || base.key === "ok" || base.key === "watch")) {
    return { key: "due", label: "Weak jar", color: "var(--c-due)" };
  }
  return base;
}

export default function BatteryTrending() {
  const [sites, setSites] = useState(() =>
    SEED.map((s) => ({ ...s, strings: s.strings || 1 }))
  );
  const [view, setView] = useState("fleet"); // fleet | site | entry | config | import | addsite
  const [dark, setDark] = useState(true); // dark mode default
  const [activeIdx, setActiveIdx] = useState(null);
  const [savedTick, setSavedTick] = useState(false);
  const [importData, setImportData] = useState(null); // parsed CSV awaiting confirm
  const [saveFallback, setSaveFallback] = useState(null); // {text, filename} when download is blocked
  const [syncStatus, setSyncStatus] = useState("loading"); // loading | live | offline | local
  const [lastUpdated, setLastUpdated] = useState(null);
  const [tokenModal, setTokenModal] = useState(false);
  const [publishState, setPublishState] = useState(null); // null | "publishing" | "done" | {error}
  const fileRef = useRef(null);
  const csvRef = useRef(null);

  // On startup, load the shared data from the repo. Falls back to SEED if the
  // file doesn't exist yet (first run) or the fetch fails (offline).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await ghFetchData();
      if (cancelled) return;
      if (data && Array.isArray(data.sites)) {
        setSites(data.sites.map((s) => ({ ...s, strings: s.strings || 1 })));
        setLastUpdated(data.updated || null);
        setSyncStatus("live");
      } else {
        // no shared file yet, or offline — keep the built-in seed
        setSyncStatus("offline");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function publishData() {
    const token = getStoredToken();
    if (!token) { setTokenModal(true); return; }
    setPublishState("publishing");
    const result = await ghPublish(sites, token);
    if (result.ok) {
      setPublishState("done");
      setLastUpdated(new Date().toISOString());
      setSyncStatus("live");
      setTimeout(() => setPublishState(null), 2500);
    } else {
      setPublishState({ error: result.error });
    }
  }

  const active = activeIdx != null ? sites[activeIdx] : null;

  /* ---------- save / load ---------- */
  function saveFile() {
    const text = JSON.stringify({ version: 1, sites }, null, 2);
    const filename = `Battery_Trending_${new Date().toISOString().slice(0, 10)}.json`;

    // Try the standard download. In a sandboxed iframe this can be blocked,
    // so we detect failure and fall back to a copy/save panel.
    let triggered = false;
    try {
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      triggered = true;
      // revoke later so the download isn't cancelled prematurely
      setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 4000);
    } catch (e) {
      triggered = false;
    }

    if (triggered) {
      setSavedTick(true);
      setTimeout(() => setSavedTick(false), 1500);
    }
    // Always offer the fallback panel too, so a silently-blocked download
    // (no error thrown, but nothing saved) still has a recovery path.
    setSaveFallback({ text, filename });
  }

  async function copySaveText() {
    if (!saveFallback) return;
    try {
      await navigator.clipboard.writeText(saveFallback.text);
      setSavedTick(true);
      setTimeout(() => setSavedTick(false), 1500);
    } catch {
      // clipboard API may also be blocked; the textarea is the final fallback
    }
  }
  function loadFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (Array.isArray(data.sites)) {
          setSites(data.sites.map((s) => ({ ...s, strings: s.strings || 1 })));
          setView("fleet");
          setActiveIdx(null);
        }
      } catch {
        alert("That file isn't a valid battery data file.");
      }
    };
    reader.readAsText(f);
    e.target.value = "";
  }

  function updateSite(idx, patch) {
    setSites((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  }

  function addSite(spec) {
    const newSite = makeNewSite(spec);
    setSites((prev) => {
      const next = [...prev, newSite];
      // jump into the newly added site
      setActiveIdx(next.length - 1);
      return next;
    });
    setView("site");
  }

  function removeSite(idx) {
    setSites((prev) => prev.filter((_, i) => i !== idx));
    setActiveIdx(null);
    setView("fleet");
  }

  /* ---------- CSV import ---------- */
  function loadCSV(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = parseCelltronCSV(String(reader.result));
      if (parsed.error) { alert(parsed.error); return; }
      // build one import item per parsed site group, with an auto-matched target
      const items = parsed.sites.map((group) => ({
        group,
        targetIdx: autoMatchSite(group.baseName, sites),
        skip: false,
      }));
      setImportData({ items });
      setView("import");
    };
    reader.readAsText(f);
    e.target.value = "";
  }

  // assignments: [{ group, targetIdx, skip, refChoice }]
  function applyImport(assignments) {
    setSites((prev) => {
      let next = [...prev];
      assignments.forEach(({ group, targetIdx, skip, refChoice }) => {
        if (skip || targetIdx == null || targetIdx === "" || targetIdx < 0) return;
        const site = next[targetIdx];

        // existing test dates already in the app for this site
        const haveDates = new Set((site.conductance || []).map((r) => r.date));
        const haveVoltDates = new Set((site.voltage || []).map((r) => r.date));
        const haveTempDates = new Set((site.temperature || []).map((r) => r.date));

        let cond = [...(site.conductance || [])];
        let volt = [...(site.voltage || [])];
        let temp = [...(site.temperature || [])];

        const tests = group.tests || [group];
        tests.forEach((test) => {
          if (!test.date || haveDates.has(test.date)) return; // skip undated or duplicate dates
          cond.push({ date: test.date, readings: flattenTest(test, "cond") });
          const vRead = flattenTest(test, "volt");
          if (vRead.some((v) => v > 0) && !haveVoltDates.has(test.date))
            volt.push({ date: test.date, readings: vRead });
          const tRead = flattenTest(test, "temp");
          if (tRead.some((v) => v > 0) && !haveTempDates.has(test.date))
            temp.push({ date: test.date, readings: tRead });
        });

        // keep all records sorted chronologically
        const byDate = (a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
        cond.sort(byDate); volt.sort(byDate); temp.sort(byDate);

        const patch = { conductance: cond, voltage: volt, temperature: temp };

        // reference handling (uses the group's representative ref):
        const hasStored = site.ref != null && site.ref > 0;
        if (!hasStored && group.ref) patch.ref = group.ref;
        else if (hasStored && group.ref && group.ref !== site.ref && refChoice === "file") patch.ref = group.ref;

        next[targetIdx] = { ...site, ...patch };
      });
      return next;
    });
    setImportData(null);
    setView("fleet");
    setActiveIdx(null);
  }

  /* ---------- fleet roll-ups ---------- */
  const fleet = useMemo(() => {
    const m = sites.map(siteMetrics);
    const tierOf = (x) => tier(x.health, x.weakFlag);
    const dueCount = m.filter((x) => { const k = tierOf(x).key; return k === "due" || k === "crit"; }).length;
    const watchCount = m.filter((x) => tierOf(x).key === "watch").length;
    const weakCount = m.filter((x) => x.weakFlag).length;
    const budget = m.reduce(
      (sum, x) => { const k = tierOf(x).key; return k === "due" || k === "crit" ? sum + (x.replaceCost || 0) : sum; },
      0
    );
    return { m, dueCount, watchCount, weakCount, budget };
  }, [sites]);

  return (
    <div className={"bt-root" + (dark ? " dark" : "")}>
      <style>{CSS}</style>

      <header className="bt-top">
        <div className="bt-brand">
          <div className="bt-mark">
            {/* Drop a logo.svg (or logo.png) into /public to replace the icon automatically. */}
            <img
              src="./logo.png"
              alt="Battery Trending"
              className="bt-logo-img"
              onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
            />
            <span className="bt-logo-fallback"><Battery size={20} strokeWidth={2.4} /></span>
          </div>
          <div>
            <div className="bt-title">Battery Trending</div>
            <div className="bt-sub">Standby Power</div>
          </div>
        </div>
        <div className="bt-actions">
          <span className={"bt-syncpill " + syncStatus} title={
            syncStatus === "live" ? (lastUpdated ? "Showing shared data · updated " + fmtDateTime(lastUpdated) : "Showing shared data")
            : syncStatus === "loading" ? "Loading shared data…"
            : "Showing built-in data (couldn't reach shared file)"
          }>
            {syncStatus === "live" ? <Cloud size={13} /> : syncStatus === "loading" ? <Cloud size={13} /> : <CloudOff size={13} />}
            {syncStatus === "live" ? "Live" : syncStatus === "loading" ? "…" : "Offline"}
          </span>
          <button className="bt-iconbtn-top" onClick={() => setDark((d) => !d)} title={dark ? "Switch to light mode" : "Switch to dark mode"} aria-label="Toggle theme">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="bt-btn ghost" onClick={() => csvRef.current?.click()}>
            <FileSpreadsheet size={15} /> Import test
          </button>
          <button className="bt-btn" onClick={publishData} disabled={publishState === "publishing"} title="Publish current data so the whole team sees it">
            {publishState === "publishing" ? <>Publishing…</>
              : publishState === "done" ? <><Check size={15} /> Published</>
              : <><UploadCloud size={15} /> Publish</>}
          </button>
          <button className="bt-iconbtn-top" onClick={() => setTokenModal(true)} title="Set up publish access (GitHub token)" aria-label="Publish settings">
            <Key size={15} />
          </button>
          <input ref={fileRef} type="file" accept=".json" hidden onChange={loadFile} />
          <input ref={csvRef} type="file" accept=".csv,text/csv" hidden onChange={loadCSV} />
        </div>
      </header>

      {publishState && publishState.error && (
        <div className="bt-publish-error">
          <AlertTriangle size={15} /> {publishState.error}
          <button onClick={() => setPublishState(null)}><X size={14} /></button>
        </div>
      )}

      {view === "fleet" && (
        <FleetView
          sites={sites}
          metrics={fleet}
          onOpen={(i) => { setActiveIdx(i); setView("site"); }}
          onAddSite={() => setView("addsite")}
        />
      )}
      {view === "addsite" && (
        <AddSiteView
          existingNames={sites.map((s) => s.name)}
          onCreate={addSite}
          onCancel={() => setView("fleet")}
        />
      )}
      {view === "site" && active && (
        <SiteView
          site={active}
          onBack={() => { setView("fleet"); setActiveIdx(null); }}
          onEntry={() => setView("entry")}
          onConfig={() => setView("config")}
        />
      )}
      {view === "entry" && active && (
        <EntryView
          site={active}
          idx={activeIdx}
          onSave={(patch) => { updateSite(activeIdx, patch); setView("site"); }}
          onCancel={() => setView("site")}
        />
      )}
      {view === "config" && active && (
        <ConfigView
          site={active}
          idx={activeIdx}
          onSave={(patch) => { updateSite(activeIdx, patch); setView("site"); }}
          onCancel={() => setView("site")}
          onRemove={() => removeSite(activeIdx)}
        />
      )}
      {view === "import" && importData && (
        <ImportView
          items={importData.items}
          sites={sites}
          onConfirm={applyImport}
          onCancel={() => { setImportData(null); setView("fleet"); }}
        />
      )}

      {saveFallback && (
        <div className="bt-modal-back" onClick={() => setSaveFallback(null)}>
          <div className="bt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bt-modal-h">
              <h2>Save your data</h2>
              <button className="bt-iconbtn" onClick={() => setSaveFallback(null)}><X size={18} /></button>
            </div>
            <p className="bt-note">
              A file download should have started as <b>{saveFallback.filename}</b>. If your browser blocked it
              (common when running inside a preview), copy the text below and paste it into a file saved with a
              <b> .json</b> extension. You can reload it later with the Load button.
            </p>
            <div className="bt-modal-actions">
              <button className="bt-btn" onClick={copySaveText}>
                {savedTick ? <><Check size={15} /> Copied</> : <><Download size={15} /> Copy to clipboard</>}
              </button>
            </div>
            <textarea
              className="bt-savearea"
              readOnly
              value={saveFallback.text}
              onFocus={(e) => e.target.select()}
            />
          </div>
        </div>
      )}

      {tokenModal && (
        <TokenModal
          onClose={() => setTokenModal(false)}
          onSaveLocal={saveFile}
          onLoadLocal={() => fileRef.current?.click()}
        />
      )}
    </div>
  );
}

/* ============================================================= TOKEN / SETTINGS MODAL */
function TokenModal({ onClose, onSaveLocal, onLoadLocal }) {
  const [token, setToken] = useState(getStoredToken());
  const [saved, setSaved] = useState(false);
  const hasToken = getStoredToken().length > 0;

  function save() {
    setStoredToken(token.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }
  function clear() {
    setStoredToken("");
    setToken("");
  }

  return (
    <div className="bt-modal-back" onClick={onClose}>
      <div className="bt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bt-modal-h">
          <h2>Publish access</h2>
          <button className="bt-iconbtn" onClick={onClose}><X size={18} /></button>
        </div>
        <p className="bt-note">
          To publish data for the whole team, paste a GitHub <b>personal access token</b> with
          write access to this repository. It's stored only in this browser. Viewers don't need
          one — they always see the latest published data automatically.
        </p>
        <div className="bt-field" style={{ marginTop: 12 }}>
          <label>GitHub token {hasToken && <span className="bt-auto">saved</span>}</label>
          <input
            type="password"
            value={token}
            placeholder="ghp_… or github_pat_…"
            onChange={(e) => setToken(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="bt-modal-actions" style={{ display: "flex", gap: 8 }}>
          <button className="bt-btn" onClick={save} disabled={!token.trim()}>
            {saved ? <><Check size={15} /> Saved</> : <><Key size={15} /> Save token</>}
          </button>
          {hasToken && <button className="bt-btn ghost-dark" onClick={clear}>Remove token</button>}
        </div>

        <div className="bt-modal-divider" />
        <p className="bt-note">
          <b>Local backup (optional).</b> You can also save or load a data file on this computer,
          independent of the shared copy.
        </p>
        <div className="bt-modal-actions" style={{ display: "flex", gap: 8 }}>
          <button className="bt-btn ghost-dark" onClick={() => { onSaveLocal(); }}>
            <Download size={15} /> Save file
          </button>
          <button className="bt-btn ghost-dark" onClick={() => { onClose(); onLoadLocal(); }}>
            <Upload size={15} /> Load file
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================= IMPORT */
function ImportView({ items, sites, onConfirm, onCancel }) {
  // local editable assignment state per parsed group
  const [rows, setRows] = useState(() =>
    items.map((it) => ({
      group: it.group,
      targetIdx: it.targetIdx >= 0 ? it.targetIdx : "",
      autoIdx: it.targetIdx,
      date: it.date,
      skip: false,
      refChoice: "keep", // "keep" stored ref | "file" adopt CSV ref (only matters when they differ)
    }))
  );

  function update(i, patch) {
    setRows((prev) => prev.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }

  const readyCount = rows.filter((r) => !r.skip && r.targetIdx !== "" && r.targetIdx >= 0).length;

  // total NEW dated tests that will actually be added across all assigned rows
  const totalNew = rows.reduce((sum, r) => {
    if (r.skip || r.targetIdx === "" || r.targetIdx < 0) return sum;
    const target = sites[r.targetIdx];
    const have = new Set((target.conductance || []).map((x) => x.date));
    const tests = r.group.tests || [r.group];
    return sum + tests.filter((te) => te.date && !have.has(te.date)).length;
  }, 0);

  return (
    <main className="bt-main">
      <button className="bt-back" onClick={onCancel}><X size={15} /> Cancel import</button>
      <div className="bt-site-h">
        <div>
          <h1 className="bt-site-name">Import test data</h1>
          <div className="bt-site-meta">
            {items.length} site{items.length === 1 ? "" : "s"} found in this file · review each before importing
          </div>
        </div>
      </div>

      {rows.map((r, i) => {
        const g = r.group;
        const target = r.targetIdx !== "" && r.targetIdx >= 0 ? sites[r.targetIdx] : null;
        const storedRef = target ? (target.ref != null && target.ref > 0 ? target.ref : null) : null;
        const fileRef = g.ref || null;
        // does the file disagree with a stored ref? only then do we ask.
        const refConflict = !!(target && storedRef && fileRef && storedRef !== fileRef);
        // effective ref used for the preview:
        //  - no stored ref -> file ref (or derived)
        //  - conflict -> per-site choice
        //  - otherwise -> stored/derived
        const ref = !storedRef
          ? (fileRef || refValue(target))
          : refConflict
          ? (r.refChoice === "file" ? fileRef : storedRef)
          : storedRef;
        const condFlat = flattenGroup(g, "cond");
        const previewHealth = (() => {
          if (!ref) return null;
          const vals = condFlat.map((v) => v / ref).filter((v) => v > 0);
          return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
        })();
        const countMatch = target ? target.jarCount === g.jarCount : null;
        const stringMatch = target ? (target.strings || 1) === g.stringCount : null;
        const t = tier(previewHealth);
        const autoMatched = r.autoIdx >= 0 && r.targetIdx === r.autoIdx;

        // which dated tests in this file are new vs already present in the target
        const tests = g.tests || [g];
        const haveDates = target ? new Set((target.conductance || []).map((x) => x.date)) : new Set();
        const newTests = tests.filter((te) => te.date && !haveDates.has(te.date));
        const dupTests = tests.filter((te) => te.date && haveDates.has(te.date));
        const undated = tests.filter((te) => !te.date);

        return (
          <section className={"bt-card bt-importcard" + (r.skip ? " skipped" : "")} key={i}>
            <div className="bt-card-h">
              <h2>
                {g.baseName}
                {g.rawNames.length > 1 && (
                  <span className="bt-note" style={{ marginLeft: 8 }}>
                    ({g.rawNames.join(", ")})
                  </span>
                )}
              </h2>
              <label className="bt-skip">
                <input type="checkbox" checked={r.skip} onChange={(e) => update(i, { skip: e.target.checked })} />
                Skip
              </label>
            </div>

            {!r.skip && (
              <>
                <div className="bt-field">
                  <label>Apply to site {autoMatched && <em className="bt-auto">auto-matched</em>}</label>
                  <select
                    className="bt-select"
                    value={r.targetIdx}
                    onChange={(e) => update(i, { targetIdx: e.target.value === "" ? "" : Number(e.target.value) })}
                  >
                    <option value="">Choose a site…</option>
                    {sites.map((s, si) => (
                      <option key={si} value={si}>{s.name} ({s.jarCount} jars)</option>
                    ))}
                  </select>
                </div>

                <div className="bt-metricstrip" style={{ marginBottom: 0, marginTop: 12 }}>
                  <Metric icon={<Gauge size={15} />} label="Latest health" value={pct(previewHealth)} sub={`ref ${ref ?? "—"}`} />
                  <Metric icon={<Battery size={15} />} label="Jars per test" value={g.jarCount} sub={target ? `site has ${target.jarCount}` : "—"} accent={target && !countMatch} />
                  <Metric icon={<Activity size={15} />} label="Tests in file" value={tests.length} sub={`${newTests.length} new`} accent={target && newTests.length === 0} />
                  <Metric icon={<Clock size={15} />} label="Will add" value={newTests.length} sub={dupTests.length ? `${dupTests.length} already in app` : "no duplicates"} />
                </div>

                {target && newTests.length === 0 && tests.length > 0 && (
                  <div className="bt-warn soft">
                    <AlertTriangle size={15} />
                    Every test in this file is already recorded for {target.name} — nothing new to import. Skip this one.
                  </div>
                )}

                {target && !countMatch && (
                  <div className="bt-warn">
                    <AlertTriangle size={15} />
                    Jar count in the file ({g.jarCount}) doesn’t match {target.name} ({target.jarCount} jars).
                    This may be the wrong site — check before importing, or pick a different site above.
                  </div>
                )}
                {target && countMatch && !stringMatch && (
                  <div className="bt-warn soft">
                    <AlertTriangle size={15} />
                    The file reports {g.stringCount} parallel strings but {target.name} is set up for {target.strings || 1}.
                    Jar data still imports correctly; update the string count in Site setup so runtime is accurate.
                  </div>
                )}
                {target && refConflict && (
                  <div className="bt-refchoice">
                    <div className="bt-refchoice-h">
                      <AlertTriangle size={15} />
                      Reference mismatch — which value should this site use?
                    </div>
                    <div className="bt-refchoice-opts">
                      <button
                        className={"bt-refopt" + (r.refChoice === "keep" ? " on" : "")}
                        onClick={() => update(i, { refChoice: "keep" })}
                      >
                        <b>Keep {storedRef}</b>
                        <em>app's stored reference</em>
                      </button>
                      <button
                        className={"bt-refopt" + (r.refChoice === "file" ? " on" : "")}
                        onClick={() => update(i, { refChoice: "file" })}
                      >
                        <b>Use {fileRef}</b>
                        <em>from this test file</em>
                      </button>
                    </div>
                    <div className="bt-note">
                      Health preview above uses the selected reference{r.refChoice === "file" ? " and the site's stored reference will be updated to " + fileRef + "." : "; the stored reference stays " + storedRef + "."}
                    </div>
                  </div>
                )}
                {fileRef && !storedRef && (
                  <div className="bt-note" style={{ marginTop: 10 }}>
                    Reference {fileRef} read from file — this site has none stored, so it will be saved.
                  </div>
                )}
                {fileRef && storedRef && !refConflict && (
                  <div className="bt-note" style={{ marginTop: 10 }}>
                    Reference {fileRef} matches the stored value.
                  </div>
                )}

                <details className="bt-rows">
                  <summary>{tests.length} test{tests.length === 1 ? "" : "s"} in file ({g.jarCount} jars each)</summary>
                  <div className="bt-testlist">
                    {tests.map((te, ti) => {
                      const isDup = te.date && haveDates.has(te.date);
                      const isUndated = !te.date;
                      return (
                        <div className={"bt-testrow" + (isDup ? " dup" : "") + (isUndated ? " undated" : "")} key={ti}>
                          <span className="bt-testdate">
                            {te.date ? fmtDate(te.date) : "Undated — skipped"}
                            {te.retest && <span className="bt-retesttag" title="Same-day retest: kept the latest-time reading per jar">latest of retest</span>}
                          </span>
                          <span className="bt-teststatus">
                            {isUndated ? "no date" : isDup ? "already in app" : "new — will add"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </details>
              </>
            )}
          </section>
        );
      })}

      <div className="bt-cta-row sticky">
        <button className="bt-btn wide" disabled={readyCount === 0 || totalNew === 0} onClick={() => onConfirm(rows)}>
          <Check size={16} /> {readyCount === 0 ? "Assign at least one site" : totalNew === 0 ? "No new tests to import" : `Import ${totalNew} new test${totalNew === 1 ? "" : "s"} across ${readyCount} site${readyCount === 1 ? "" : "s"}`}
        </button>
      </div>
    </main>
  );
}

function FleetBarTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ ...tipStyle, padding: "8px 11px", lineHeight: 1.5 }}>
      <div style={{ fontWeight: 700, fontSize: 13 }}>{d.name}</div>
      <div style={{ fontSize: 12 }}>
        <span style={{ color: d.color, fontWeight: 600 }}>{d.health}%</span>
        <span style={{ color: "var(--c-muted)" }}> · {d.status}</span>
      </div>
      <div style={{ fontSize: 11, color: "var(--c-muted)", marginTop: 2 }}>
        Last test {fmtDate(d.lastTest)}
      </div>
    </div>
  );
}

function FleetView({ sites, metrics, onOpen, onAddSite }) {
  const { m, dueCount, watchCount, weakCount, budget } = metrics;
  const sorted = sites
    .map((s, i) => ({ s, i, mx: m[i], t: tier(m[i].health, m[i].weakFlag) }))
    .sort((a, b) => (a.mx.health ?? 99) - (b.mx.health ?? 99));

  const chartData = sorted.map((row) => ({
    name: row.s.name,
    health: row.mx.health != null ? +(row.mx.health * 100).toFixed(1) : 0,
    color: row.t.color,
    lastTest: row.mx.rec?.date || null,
    status: row.t.label,
  }));

  return (
    <main className="bt-main">
      <div className="bt-kpis">
        <Kpi icon={<AlertTriangle size={16} />} label="Replacement due" value={dueCount} accent={dueCount ? "var(--c-due)" : null} />
        <Kpi icon={<Battery size={16} />} label="Weak jar flagged" value={weakCount} accent={weakCount ? "var(--c-crit)" : null} />
        <Kpi icon={<Gauge size={16} />} label="On watch" value={watchCount} accent={watchCount ? "var(--c-watch)" : null} />
        <Kpi icon={<DollarSign size={16} />} label="Replacement budget" value={money(budget)} accent={budget ? "var(--c-due)" : null} />
      </div>

      <section className="bt-card">
        <div className="bt-card-h">
          <h2>String health by site</h2>
          <span className="bt-legend">
            <i style={{ background: "var(--c-good)" }} />Healthy
            <i style={{ background: "var(--c-ok)" }} />OK
            <i style={{ background: "var(--c-watch)" }} />Monitor
            <i style={{ background: "var(--c-due)" }} />Plan
            <i style={{ background: "var(--c-crit)" }} />Replace
          </span>
        </div>
        <ResponsiveContainer width="100%" height={Math.max(180, sites.length * 34)}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 28, top: 4, bottom: 4 }}>
            <CartesianGrid horizontal={false} stroke="var(--c-grid)" />
            <XAxis type="number" domain={[0, 110]} tickFormatter={(v) => v + "%"} stroke="var(--c-muted)" tick={{ fill: "var(--c-muted)" }} fontSize={11} />
            <YAxis type="category" dataKey="name" width={92} stroke="var(--c-line)" tick={{ fill: "var(--c-ink)" }} fontSize={11.5} />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
              contentStyle={tipStyle}
              content={<FleetBarTooltip />}
            />
            <ReferenceLine x={60} stroke="var(--c-crit)" strokeDasharray="4 3" label={{ value: "Replace 60%", position: "top", fill: "var(--c-crit)", fontSize: 9 }} />
            <Bar dataKey="health" radius={[0, 4, 4, 0]} barSize={18}>
              {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="bt-note">Dashed line marks the 60% replace-now threshold.</div>
      </section>

      <section className="bt-list">
        {sorted.map(({ s, i, mx, t }) => (
          <button key={s.name} className="bt-row" onClick={() => onOpen(i)}>
            <span className="bt-dot" style={{ background: t.color }} />
            <span className="bt-row-main">
              <span className="bt-row-name">
                {s.name}
                {mx.weakFlag && (
                  <span className="bt-weakbadge" title={`Weak jar: ${mx.weak.label} at ${pct(mx.weak.health)}`}>
                    <AlertTriangle size={11} /> {mx.weak.label} {pct(mx.weak.health)}
                  </span>
                )}
              </span>
              <span className="bt-row-meta">{s.model} · {s.jarCount} jars{s.strings > 1 ? ` · ${s.strings} strings` : ""}</span>
            </span>
            <span className="bt-row-stats">
              <span className="bt-stat"><b>{pct(mx.health)}</b><em>avg health</em></span>
              <span className="bt-stat"><b>{hrs(mx.runtime)}</b><em>runtime</em></span>
              <span className="bt-chip" style={{ color: t.color, borderColor: t.color }}>{mx.rec ? t.label : "No tests yet"}</span>
            </span>
          </button>
        ))}
        <button className="bt-addrow" onClick={onAddSite}>
          <Plus size={16} /> Add site
        </button>
      </section>
    </main>
  );
}

function Kpi({ icon, label, value, accent }) {
  return (
    <div className="bt-kpi">
      <div className="bt-kpi-ic">{icon}</div>
      <div className="bt-kpi-v" style={accent ? { color: accent } : null}>{value}</div>
      <div className="bt-kpi-l">{label}</div>
    </div>
  );
}

/* ============================================================= SITE */
function SiteView({ site, onBack, onEntry, onConfig }) {
  const mx = siteMetrics(site);
  const t = tier(mx.health, mx.weakFlag);
  const ref = mx.ref;
  const refs = mx.refs; // per-jar reference array

  // trend series: string health over time
  const trend = site.conductance.map((r) => ({
    date: r.date,
    label: fmtDate(r.date),
    health: (() => {
      const h = recordHealth(r, refs);
      return h != null ? +(h * 100).toFixed(1) : null;
    })(),
  }));

  // per-jar current health for the bar strip
  const jarBars = mx.rec
    ? mx.rec.readings.map((v, idx) => {
        const h = jarHealth(v, refs[idx]);
        return {
          label: site.jarLabels[idx],
          health: h != null ? +(h * 100).toFixed(1) : 0,
          weak: h != null && h <= WEAK_JAR_THRESHOLD,
          color: h != null && h <= WEAK_JAR_THRESHOLD ? "var(--c-crit)" : tier(h).color,
        };
      })
    : [];

  return (
    <main className="bt-main">
      <button className="bt-back" onClick={onBack}><ChevronLeft size={16} /> All sites</button>

      <div className="bt-site-h">
        <div>
          <h1 className="bt-site-name">{site.name}</h1>
          <div className="bt-site-meta">{site.model} · {site.ah} Ah · {site.load} A load · {mx.strings} string{mx.strings > 1 ? "s" : ""}</div>
        </div>
        <span className="bt-chip lg" style={{ color: t.color, borderColor: t.color }}>{t.label}</span>
      </div>

      {mx.weakFlag && (
        <div className="bt-weakbanner">
          <AlertTriangle size={17} />
          <div>
            <strong>{mx.weak.label} is at {pct(mx.weak.health)}</strong> — at or below the {Math.round(WEAK_JAR_THRESHOLD * 100)}% weak-jar limit.
            A series string fails at its weakest cell, so this string needs attention even though the average is {pct(mx.health)}.
          </div>
        </div>
      )}

      <div className="bt-metricstrip">
        <Metric icon={<Gauge size={15} />} label="Avg string health" value={pct(mx.health)} sub={mx.hasPerString ? `refs ${Math.min(...site.stringRefs)}–${Math.max(...site.stringRefs)}` : `ref ${ref ?? "—"}`} />
        <Metric icon={<AlertTriangle size={15} />} label="Weakest jar" value={mx.weak ? pct(mx.weak.health) : "—"} sub={mx.weak ? mx.weak.label : "—"} accent={mx.weakFlag} />
        <Metric icon={<Clock size={15} />} label="Est. runtime" value={hrs(mx.runtime)} sub={`at ${site.load} A`} />
        <Metric icon={<DollarSign size={15} />} label="Replace cost" value={money(mx.replaceCost)} sub={`${site.jarCount} jars`} />
      </div>

      <div className="bt-cta-row">
        <button className="bt-btn wide" onClick={onEntry}><Plus size={16} /> Add test reading</button>
        <button className="bt-btn orange" onClick={onConfig}><Settings size={15} /> Site setup</button>
      </div>

      {!mx.rec ? (
        <section className="bt-card bt-empty">
          <Battery size={30} strokeWidth={1.6} />
          <h2>No tests recorded yet</h2>
          <p>
            This site is set up with {site.jarCount} jar{site.jarCount === 1 ? "" : "s"}
            {site.strings > 1 ? ` across ${site.strings} strings` : ""}.
            Add a test reading above, or import a CSV from the test set to populate its first results.
          </p>
        </section>
      ) : (
        <>
          <section className="bt-card">
            <div className="bt-card-h"><h2>Health trend</h2>
              <span className="bt-note">Last test {fmtDate(mx.rec?.date)}</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trend} margin={{ left: 0, right: 16, top: 8, bottom: 4 }}>
                <CartesianGrid stroke="var(--c-grid)" vertical={false} />
                <XAxis dataKey="label" stroke="var(--c-muted)" tick={{ fill: "var(--c-muted)" }} fontSize={11} />
                <YAxis domain={[0, 110]} tickFormatter={(v) => v + "%"} stroke="var(--c-muted)" tick={{ fill: "var(--c-muted)" }} fontSize={11} width={42} />
                <Tooltip formatter={(v) => [v + "%", "String health"]} contentStyle={tipStyle} />
                <ReferenceLine y={90} stroke="var(--c-good)" strokeDasharray="3 3" label={{ value: "90%", position: "right", fill: "var(--c-good)", fontSize: 9 }} />
                <ReferenceLine y={60} stroke="var(--c-crit)" strokeDasharray="4 3" label={{ value: "Replace 60%", position: "right", fill: "var(--c-crit)", fontSize: 10 }} />
                <Line type="monotone" dataKey="health" stroke="var(--c-accent)" strokeWidth={2.4} dot={{ r: 3, fill: "var(--c-accent)" }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </section>

          <section className="bt-card">
            <div className="bt-card-h"><h2>Latest jar readings</h2>
              {mx.weak && <span className="bt-note">Weakest: {mx.weak.label} ({pct(mx.weak.health)})</span>}
            </div>
            <ResponsiveContainer width="100%" height={Math.max(160, jarBars.length * 13)}>
              <BarChart data={jarBars} layout="vertical" margin={{ left: 4, right: 24, top: 2, bottom: 2 }}>
                <CartesianGrid horizontal={false} stroke="var(--c-grid)" />
                <XAxis type="number" domain={[0, 120]} tickFormatter={(v) => v + "%"} stroke="var(--c-muted)" tick={{ fill: "var(--c-muted)" }} fontSize={10} />
                <YAxis type="category" dataKey="label" width={62} stroke="var(--c-line)" tick={{ fill: "var(--c-ink)" }} fontSize={10} interval={0} />
                <Tooltip formatter={(v) => [v + "%", "Health"]} contentStyle={tipStyle} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <ReferenceLine x={60} stroke="var(--c-crit)" strokeDasharray="2 2" label={{ value: "60%", position: "insideBottomLeft", fill: "var(--c-crit)", fontSize: 9 }} />
                <Bar dataKey="health" radius={[0, 3, 3, 0]} barSize={9}>
                  {jarBars.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </section>

          <HistoryTable site={site} refs={refs} />
        </>
      )}
    </main>
  );
}

function Metric({ icon, label, value, sub, accent }) {
  return (
    <div className="bt-metric" style={accent ? { borderColor: "var(--c-crit)", boxShadow: "inset 0 0 0 1px var(--c-crit)" } : null}>
      <div className="bt-metric-top">{icon}<span>{label}</span></div>
      <div className="bt-metric-v" style={accent ? { color: "var(--c-crit)" } : null}>{value}</div>
      <div className="bt-metric-s">{sub}</div>
    </div>
  );
}

function HistoryTable({ site, refs }) {
  const rows = [...site.conductance].reverse();
  return (
    <section className="bt-card">
      <div className="bt-card-h"><h2>Test history</h2></div>
      <div className="bt-tablewrap">
        <table className="bt-table">
          <thead>
            <tr><th>Date</th><th>Avg health</th><th>Weakest jar</th><th>Adj. Ah</th><th>Runtime</th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const h = recordHealth(r, refs);
              const w = weakestJar(r, refs, site.jarLabels);
              const adj = h != null ? site.ah * h * EOL : null;
              const rt = adj != null && site.load > 0 ? (adj * (site.strings || 1)) / site.load : null;
              const wflag = w != null && w.health <= WEAK_JAR_THRESHOLD;
              const t = tier(h, wflag);
              return (
                <tr key={i}>
                  <td>{fmtDate(r.date)}</td>
                  <td><span className="bt-tdot" style={{ background: t.color }} />{pct(h)}</td>
                  <td style={wflag ? { color: "var(--c-crit)", fontWeight: 600 } : null}>
                    {w ? `${w.label} ${pct(w.health)}` : "—"}
                  </td>
                  <td>{adj != null ? adj.toFixed(0) : "—"}</td>
                  <td>{hrs(rt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ============================================================= ENTRY */
function EntryView({ site, onSave, onCancel }) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [cond, setCond] = useState(() => site.jarLabels.map(() => ""));
  const [volt, setVolt] = useState(() => site.jarLabels.map(() => ""));
  const [temp, setTemp] = useState(() => site.jarLabels.map(() => ""));
  const [tab, setTab] = useState("cond");

  function set(arr, setter, idx, val) {
    const next = [...arr]; next[idx] = val; setter(next);
  }
  // fill-down: typing a value and pressing Enter copies to all empty below
  function fillDown(arr, setter, idx) {
    const v = arr[idx];
    if (v === "") return;
    const next = arr.map((x, i) => (i >= idx ? v : x));
    setter(next);
  }

  function commit() {
    const toNums = (a) => a.map((v) => (v === "" ? 0 : Number(v)));
    const patch = {
      conductance: [...site.conductance, { date, readings: toNums(cond) }],
    };
    if (volt.some((v) => v !== "")) patch.voltage = [...(site.voltage || []), { date, readings: toNums(volt) }];
    if (temp.some((v) => v !== "")) patch.temperature = [...(site.temperature || []), { date, readings: toNums(temp) }];
    onSave(patch);
  }

  const active = tab === "cond" ? cond : tab === "volt" ? volt : temp;
  const setter = tab === "cond" ? setCond : tab === "volt" ? setVolt : setTemp;
  const unit = tab === "cond" ? "mho" : tab === "volt" ? "V" : "°F";
  const filled = cond.filter((v) => v !== "").length;

  return (
    <main className="bt-main">
      <button className="bt-back" onClick={onCancel}><ChevronLeft size={16} /> Cancel</button>
      <div className="bt-site-h">
        <div><h1 className="bt-site-name">New test</h1>
          <div className="bt-site-meta">{site.name} · {site.jarCount} jars</div></div>
      </div>

      <div className="bt-entry-date">
        <label>Test date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="bt-tabs">
        <button className={tab === "cond" ? "on" : ""} onClick={() => setTab("cond")}>Conductance <em>{filled}/{site.jarCount}</em></button>
        <button className={tab === "volt" ? "on" : ""} onClick={() => setTab("volt")}>Float volts</button>
        <button className={tab === "temp" ? "on" : ""} onClick={() => setTab("temp")}>Temp</button>
      </div>

      <div className="bt-entry-hint">Type a value and press Enter to copy it to every jar below — handy for temps and floats that read the same.</div>

      <div className="bt-jargrid">
        {site.jarLabels.map((lbl, idx) => (
          <div className="bt-jarcell" key={idx}>
            <label>{lbl}</label>
            <div className="bt-jarinput">
              <input
                inputMode="decimal"
                value={active[idx]}
                placeholder="—"
                onChange={(e) => set(active, setter, idx, e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") fillDown(active, setter, idx); }}
              />
              <span>{unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bt-cta-row sticky">
        <button className="bt-btn wide" onClick={commit} disabled={!filled}>
          <Check size={16} /> Save test ({filled} jar{filled === 1 ? "" : "s"})
        </button>
      </div>
    </main>
  );
}

/* ============================================================= CONFIG */
function ConfigView({ site, onSave, onCancel, onRemove }) {
  const nStrings = Math.max(1, Number(site.strings) || 1);
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [f, setF] = useState({
    name: site.name, model: site.model, ah: site.ah, load: site.load,
    ref: site.ref ?? "", retail: site.retail ?? "", strings: site.strings || 1,
  });
  // per-string reference editing
  const [perString, setPerString] = useState(
    Array.isArray(site.stringRefs) && site.stringRefs.length > 0
  );
  const [stringRefs, setStringRefs] = useState(() => {
    const base = Array.isArray(site.stringRefs) && site.stringRefs.length
      ? site.stringRefs.slice()
      : [];
    // size the array to current string count, filling blanks
    const out = [];
    for (let i = 0; i < nStrings; i++) out.push(base[i] != null ? String(base[i]) : "");
    return out;
  });

  function up(k, v) { setF((p) => ({ ...p, [k]: v })); }
  function upStringRef(i, v) {
    setStringRefs((prev) => prev.map((x, j) => (j === i ? v : x)));
  }
  // keep per-string array length in sync if the user edits the string count
  const editStrings = Math.max(1, Number(f.strings) || 1);
  function syncStringRefsLength() {
    setStringRefs((prev) => {
      const out = [];
      for (let i = 0; i < editStrings; i++) out.push(prev[i] != null ? prev[i] : "");
      return out;
    });
  }

  function commit() {
    const name = f.name.trim();
    const patch = {
      name: name || site.name,
      model: f.model,
      ah: Number(f.ah) || 0,
      load: Number(f.load) || 0,
      retail: f.retail === "" ? null : Number(f.retail),
      strings: editStrings,
    };
    if (perString) {
      // store one ref per string; blanks fall back to the single ref or null
      const single = f.ref === "" ? null : Number(f.ref);
      patch.stringRefs = [];
      for (let i = 0; i < editStrings; i++) {
        const v = stringRefs[i];
        patch.stringRefs.push(v === "" || v == null ? (single ?? null) : Number(v));
      }
      // keep a representative single ref (first string) for legacy display
      patch.ref = patch.stringRefs[0] ?? single;
    } else {
      patch.ref = f.ref === "" ? null : Number(f.ref);
      patch.stringRefs = null; // clear any prior per-string refs
    }
    onSave(patch);
  }

  const derivedRef = refValue(site);
  return (
    <main className="bt-main">
      <button className="bt-back" onClick={onCancel}><ChevronLeft size={16} /> Cancel</button>
      <div className="bt-site-h"><div>
        <h1 className="bt-site-name">Site setup</h1>
        <div className="bt-site-meta">{site.name}</div></div></div>

      <div className="bt-form">
        <Field label="Site name"><input value={f.name} onChange={(e) => up("name", e.target.value)} /></Field>
        <Field label="Battery model"><input value={f.model} onChange={(e) => up("model", e.target.value)} /></Field>
        <div className="bt-form-2">
          <Field label="Nameplate Ah"><input inputMode="decimal" value={f.ah} onChange={(e) => up("ah", e.target.value)} /></Field>
          <Field label="Load (A)"><input inputMode="decimal" value={f.load} onChange={(e) => up("load", e.target.value)} /></Field>
        </div>
        <div className="bt-form-2">
          <Field label="Strings in parallel">
            <input inputMode="numeric" value={f.strings} onChange={(e) => up("strings", e.target.value)} onBlur={syncStringRefsLength} />
          </Field>
          <Field label="Per-jar retail ($)"><input inputMode="decimal" value={f.retail} onChange={(e) => up("retail", e.target.value)} /></Field>
        </div>

        <div className="bt-reftoggle">
          <label className="bt-switch">
            <input type="checkbox" checked={perString} onChange={(e) => { setPerString(e.target.checked); if (e.target.checked) syncStringRefsLength(); }} />
            <span>Different reference per string</span>
          </label>
          <span className="bt-note">Use when strings have different battery types or developed baselines.</span>
        </div>

        {!perString ? (
          <Field label="Reference conductance">
            <input inputMode="decimal" value={f.ref} placeholder={derivedRef ? `${derivedRef} (auto)` : "auto"} onChange={(e) => up("ref", e.target.value)} />
          </Field>
        ) : (
          <div className="bt-stringrefs">
            <label className="bt-stringrefs-lbl">Reference conductance per string</label>
            <div className="bt-stringrefs-grid">
              {stringRefs.map((v, i) => (
                <div className="bt-stringref" key={i}>
                  <span>String {i + 1}</span>
                  <input inputMode="decimal" value={v} placeholder="—" onChange={(e) => upStringRef(i, e.target.value)} />
                </div>
              ))}
            </div>
            <div className="bt-note">Each string's jars are scored against that string's reference. Blank uses the single reference above as a fallback.</div>
          </div>
        )}

        <div className="bt-note">The site name is what the CSV importer auto-matches against — keep it the same as the test set's site label for clean imports. Runtime = adjusted Ah × strings ÷ load. Adjusted Ah = nameplate × health × 80%.</div>
      </div>

      {onRemove && (
        <div className="bt-danger">
          <div className="bt-danger-h">Remove site</div>
          {!confirmRemove ? (
            <>
              <p className="bt-note">
                Use this when the batteries have been pulled from this building. The site and all its
                test history are permanently deleted from the app.
              </p>
              <button className="bt-btn danger-outline" onClick={() => setConfirmRemove(true)}>
                <Trash2 size={15} /> Remove this site
              </button>
            </>
          ) : (
            <>
              <p className="bt-note">
                Permanently delete <b>{site.name}</b> and its {site.conductance.length} recorded
                test{site.conductance.length === 1 ? "" : "s"}? This can't be undone.
                {" "}Save a backup first if you might need the data later.
              </p>
              <div className="bt-danger-confirm">
                <button className="bt-btn ghost-dark" onClick={() => setConfirmRemove(false)}>Cancel</button>
                <button className="bt-btn danger" onClick={onRemove}>
                  <Trash2 size={15} /> Yes, delete {site.name}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="bt-cta-row sticky">
        <button className="bt-btn wide" onClick={commit}><Check size={16} /> Save setup</button>
      </div>
    </main>
  );
}
function Field({ label, children }) {
  return <div className="bt-field"><label>{label}</label>{children}</div>;
}

/* ============================================================= ADD SITE */
function AddSiteView({ existingNames, onCreate, onCancel }) {
  const [f, setF] = useState({
    name: "", model: "", ah: "", load: "",
    ref: "", retail: "", strings: 1, jarsPerString: 4,
  });
  function up(k, v) { setF((p) => ({ ...p, [k]: v })); }

  const strings = Math.max(1, Number(f.strings) || 1);
  const jps = Math.max(1, Number(f.jarsPerString) || 1);
  const totalJars = strings * jps;
  const preview = makeJarLabels(strings, jps);
  const nameTrim = f.name.trim();
  const dupe = existingNames.some((n) => n.toLowerCase() === nameTrim.toLowerCase());
  const canCreate = nameTrim && !dupe && Number(f.ah) > 0 && Number(f.load) > 0 && totalJars > 0;

  return (
    <main className="bt-main">
      <button className="bt-back" onClick={onCancel}><X size={15} /> Cancel</button>
      <div className="bt-site-h"><div>
        <h1 className="bt-site-name">Add site</h1>
        <div className="bt-site-meta">Set up a new battery string to track</div>
      </div></div>

      <div className="bt-form">
        <Field label="Site name">
          <input value={f.name} placeholder="e.g. North Plant MDF" onChange={(e) => up("name", e.target.value)} />
        </Field>
        {dupe && <div className="bt-warn" style={{ marginTop: -4, marginBottom: 12 }}>
          <AlertTriangle size={15} /> A site named “{nameTrim}” already exists. Pick a different name.
        </div>}
        <Field label="Battery model">
          <input value={f.model} placeholder="e.g. Enersys SBS190F" onChange={(e) => up("model", e.target.value)} />
        </Field>
        <div className="bt-form-2">
          <Field label="Strings in parallel">
            <input inputMode="numeric" value={f.strings} onChange={(e) => up("strings", e.target.value)} />
          </Field>
          <Field label="Jars per string">
            <input inputMode="numeric" value={f.jarsPerString} onChange={(e) => up("jarsPerString", e.target.value)} />
          </Field>
        </div>
        <div className="bt-jarcount-note">
          <Battery size={14} /> {totalJars} total jar{totalJars === 1 ? "" : "s"}
          <span>{preview.slice(0, 4).join(", ")}{preview.length > 4 ? ` … ${preview[preview.length - 1]}` : ""}</span>
        </div>
        <div className="bt-form-2">
          <Field label="Nameplate Ah">
            <input inputMode="decimal" value={f.ah} placeholder="190" onChange={(e) => up("ah", e.target.value)} />
          </Field>
          <Field label="Load (A)">
            <input inputMode="decimal" value={f.load} placeholder="32" onChange={(e) => up("load", e.target.value)} />
          </Field>
        </div>
        <div className="bt-form-2">
          <Field label="Reference conductance">
            <input inputMode="decimal" value={f.ref} placeholder="auto from first test" onChange={(e) => up("ref", e.target.value)} />
          </Field>
          <Field label="Per-jar retail ($)">
            <input inputMode="decimal" value={f.retail} placeholder="optional" onChange={(e) => up("retail", e.target.value)} />
          </Field>
        </div>
        <div className="bt-note">
          Jar labels are generated automatically (single string → Jar1, Jar2…; multiple strings → Jar1-1, Jar1-2…).
          Leave reference blank to auto-baseline from the first test. After creating, add readings manually or import a CSV —
          keep the site name matching the test set's label for clean auto-matching.
        </div>
      </div>

      <div className="bt-cta-row sticky">
        <button className="bt-btn wide" disabled={!canCreate} onClick={() => onCreate(f)}>
          <Check size={16} /> {canCreate ? "Create site" : "Fill in name, Ah, load & jars"}
        </button>
      </div>
    </main>
  );
}

const tipStyle = {
  background: "var(--c-surface)",
  border: "1px solid var(--c-line)",
  borderRadius: 8,
  fontSize: 12,
  boxShadow: "0 4px 16px rgba(20,30,40,0.12)",
};

/* ============================================================= STYLES */
const CSS = `
:root{
  --c-bg:#eef1f4; --c-surface:#ffffff; --c-ink:#1b2733; --c-muted:#7c8a99;
  --c-line:#dde3e9; --c-grid:#eef2f6;
  --c-accent:#0e7c86;            /* deep teal — instrument/marine */
  --c-accent-d:#0a5b63;
  --c-good:#1f9d6b; --c-ok:#7cb342; --c-watch:#d9a420; --c-due:#e0732e; --c-crit:#cf3b3b;
  /* themeable surfaces used by warnings/notes (light values) */
  --c-warn-bg:#fdf3e2; --c-warn-line:#f0d9b0; --c-warn-ink:#8a5a1c;
  --c-softwarn-bg:#f3f6e6; --c-softwarn-line:#dde6bf; --c-softwarn-ink:#5d6b2f;
  --c-crit-bg:#fcebea; --c-crit-line:#f3c4c0; --c-crit-ink:#7d2420;
  --c-info-bg:#e7eef0; --c-code-bg:#f7f9fb;
  --c-new-bg:#eef6f0; --c-new-line:#d6e8dc;
  --c-ghost-dark:#eef2f6; --c-ghost-dark-h:#e2e8ee;
}
.bt-root.dark{
  --c-bg:#0e1519; --c-surface:#18232a; --c-ink:#e6edf1; --c-muted:#8ba0ac;
  --c-line:#2a3942; --c-grid:#22303a;
  --c-accent:#2bb3c0; --c-accent-d:#1f8d98;
  --c-good:#2fb47e; --c-ok:#8bc34a; --c-watch:#e0b23a; --c-due:#ee8a4a; --c-crit:#e75c5c;
  --c-warn-bg:#2e2417; --c-warn-line:#5a4a2a; --c-warn-ink:#e0b878;
  --c-softwarn-bg:#242a16; --c-softwarn-line:#3f4a24; --c-softwarn-ink:#bcc98a;
  --c-crit-bg:#2e1a1a; --c-crit-line:#5a3030; --c-crit-ink:#f0b0ac;
  --c-info-bg:#1c2a30; --c-code-bg:#121a1f;
  --c-new-bg:#16241d; --c-new-line:#264a38;
  --c-ghost-dark:#22303a; --c-ghost-dark-h:#2c3d48;
}
*{box-sizing:border-box}
.bt-root{font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  background:var(--c-bg);color:var(--c-ink);min-height:100vh;-webkit-font-smoothing:antialiased;}
.bt-top{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;
  padding:12px 18px;background:linear-gradient(180deg,#102733,#0d2029);color:#eaf2f3;
  border-bottom:2px solid var(--c-accent);}
.bt-brand{display:flex;align-items:center;gap:10px}
.bt-mark{width:38px;height:38px;border-radius:9px;display:grid;place-items:center;overflow:hidden}
.bt-logo-img{width:100%;height:100%;object-fit:contain;display:block}
.bt-logo-fallback{display:none;place-items:center;width:100%;height:100%;
  background:var(--c-accent);color:#fff;border-radius:9px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.15)}
.bt-title{font-weight:700;font-size:15px;letter-spacing:.2px}
.bt-sub{font-size:11px;color:#8fb3b8;margin-top:1px;letter-spacing:.3px;text-transform:uppercase}
.bt-actions{display:flex;gap:8px;align-items:center}
.bt-syncpill{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;
  padding:4px 9px;border-radius:999px;white-space:nowrap;border:1px solid transparent}
.bt-syncpill.live{background:rgba(47,180,126,.15);color:#7fe0b4;border-color:rgba(47,180,126,.3)}
.bt-syncpill.loading{background:rgba(255,255,255,.08);color:#b9c9d0}
.bt-syncpill.offline{background:rgba(224,138,74,.15);color:#f0b088;border-color:rgba(224,138,74,.3)}
.bt-publish-error{display:flex;align-items:center;gap:8px;max-width:860px;margin:10px auto 0;
  padding:10px 14px;background:var(--c-crit-bg);border:1px solid var(--c-crit-line);color:var(--c-crit-ink);
  border-radius:9px;font-size:13px}
.bt-publish-error button{margin-left:auto;background:none;border:none;cursor:pointer;color:var(--c-crit-ink);display:flex}
.bt-modal-divider{height:1px;background:var(--c-line);margin:16px 0}
.bt-iconbtn-top{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;
  border:none;cursor:pointer;background:rgba(255,255,255,.10);color:#dfeef0;border-radius:8px;transition:.13s}
.bt-iconbtn-top:hover{background:rgba(255,255,255,.18)}
.bt-btn{display:inline-flex;align-items:center;gap:6px;border:none;cursor:pointer;
  background:var(--c-accent);color:#fff;font-weight:600;font-size:13px;
  padding:8px 13px;border-radius:8px;transition:.15s;font-family:inherit}
.bt-btn:hover{background:var(--c-accent-d)}
.bt-btn:disabled{opacity:.45;cursor:not-allowed}
.bt-btn.ghost{background:rgba(255,255,255,.10);color:#dfeef0}
.bt-btn.ghost:hover{background:rgba(255,255,255,.18)}
.bt-btn.orange{background:var(--c-due);color:#fff}
.bt-btn.orange:hover{background:#c45f1f}
.bt-btn.danger{background:var(--c-crit);color:#fff}
.bt-btn.danger:hover{background:#b33333}
.bt-btn.danger-outline{background:transparent;color:var(--c-crit);box-shadow:inset 0 0 0 1.5px var(--c-crit)}
.bt-btn.danger-outline:hover{background:rgba(207,59,59,.07)}
.bt-btn.ghost-dark{background:var(--c-grid);color:var(--c-ink)}
.bt-btn.ghost-dark:hover{background:var(--c-ghost-dark-h)}
.bt-danger{border:1px solid var(--c-crit-line);background:var(--c-crit-bg);border-radius:12px;padding:15px;margin-bottom:14px}
.bt-danger-h{font-size:13px;font-weight:700;color:var(--c-crit);margin-bottom:6px}
.bt-danger-confirm{display:flex;gap:9px;flex-wrap:wrap}
.bt-btn.wide{flex:1;justify-content:center;padding:12px}

.bt-main{max-width:860px;margin:0 auto;padding:18px 16px 80px}

.bt-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px}
.bt-kpi{background:var(--c-surface);border:1px solid var(--c-line);border-radius:12px;padding:14px}
.bt-kpi-ic{color:var(--c-accent);margin-bottom:8px}
.bt-kpi-v{font-size:26px;font-weight:750;line-height:1;letter-spacing:-.5px}
.bt-kpi-l{font-size:11px;color:var(--c-muted);margin-top:6px;font-weight:500}

.bt-card{background:var(--c-surface);border:1px solid var(--c-line);border-radius:14px;
  padding:16px;margin-bottom:14px}
.bt-card-h{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px;gap:8px;flex-wrap:wrap}
.bt-card-h h2{font-size:14px;font-weight:680;margin:0;letter-spacing:.1px}
.bt-note{font-size:11px;color:var(--c-muted)}
.bt-legend{display:flex;align-items:center;gap:6px;font-size:10.5px;color:var(--c-muted)}
.bt-legend i{width:9px;height:9px;border-radius:2px;display:inline-block;margin-left:6px}

.bt-list{display:flex;flex-direction:column;gap:8px}
.bt-addrow{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;cursor:pointer;
  background:transparent;border:1.5px dashed var(--c-line);border-radius:12px;padding:14px;
  color:var(--c-accent);font-weight:650;font-size:13.5px;font-family:inherit;transition:.13s;margin-top:2px}
.bt-addrow:hover{border-color:var(--c-accent);background:rgba(14,124,134,.04)}
.bt-empty{text-align:center;padding:34px 20px}
.bt-empty svg{color:var(--c-muted);opacity:.5;margin-bottom:8px}
.bt-empty h2{font-size:15px;margin:0 0 6px}
.bt-empty p{font-size:12.5px;color:var(--c-muted);line-height:1.5;max-width:380px;margin:0 auto}
.bt-jarcount-note{display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;color:var(--c-accent);
  background:var(--c-info-bg);border-radius:9px;padding:9px 12px;margin-bottom:13px}
.bt-jarcount-note svg{flex:none}
.bt-jarcount-note span{color:var(--c-muted);font-weight:500;font-size:11.5px;margin-left:auto;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bt-row{display:flex;align-items:center;gap:12px;width:100%;text-align:left;cursor:pointer;
  background:var(--c-surface);border:1px solid var(--c-line);border-radius:12px;padding:13px 15px;
  transition:.13s;font-family:inherit}
.bt-row:hover{border-color:var(--c-accent);transform:translateY(-1px);box-shadow:0 4px 14px rgba(20,40,50,.07)}
.bt-dot{width:10px;height:10px;border-radius:50%;flex:none}
.bt-row-main{flex:1;min-width:0}
.bt-row-name{display:block;font-weight:650;font-size:14px}
.bt-row-meta{display:block;font-size:11.5px;color:var(--c-muted);margin-top:2px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bt-row-stats{display:flex;align-items:center;gap:16px}
.bt-stat{text-align:right;line-height:1.1}
.bt-stat b{font-size:14px;font-weight:700}
.bt-stat em{display:block;font-style:normal;font-size:10px;color:var(--c-muted);margin-top:2px}
.bt-chip{font-size:11px;font-weight:650;border:1.4px solid;border-radius:999px;padding:3px 10px;white-space:nowrap}
.bt-chip.lg{font-size:12.5px;padding:5px 13px}
.bt-weakbadge{display:inline-flex;align-items:center;gap:3px;margin-left:8px;font-size:10px;font-weight:700;
  color:#fff;background:var(--c-crit);padding:2px 7px 2px 5px;border-radius:999px;vertical-align:middle;
  letter-spacing:.2px;white-space:nowrap}
.bt-weakbadge svg{flex:none}
.bt-weakbanner{display:flex;align-items:flex-start;gap:10px;background:var(--c-crit-bg);border:1px solid var(--c-crit-line);
  border-left:4px solid var(--c-crit);border-radius:10px;padding:12px 14px;margin-bottom:14px;
  font-size:12.5px;line-height:1.5;color:var(--c-crit-ink)}
.bt-weakbanner svg{color:var(--c-crit);flex:none;margin-top:1px}
.bt-weakbanner strong{color:var(--c-crit)}

.bt-back{display:inline-flex;align-items:center;gap:3px;background:none;border:none;cursor:pointer;
  color:var(--c-accent);font-weight:600;font-size:13px;padding:4px 0;margin-bottom:10px;font-family:inherit}
.bt-site-h{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:16px}
.bt-site-name{font-size:24px;font-weight:760;margin:0;letter-spacing:-.6px}
.bt-site-meta{font-size:12.5px;color:var(--c-muted);margin-top:4px}

.bt-metricstrip{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}
.bt-metric{background:var(--c-surface);border:1px solid var(--c-line);border-radius:12px;padding:13px}
.bt-metric-top{display:flex;align-items:center;gap:5px;color:var(--c-muted);font-size:11px;font-weight:600}
.bt-metric-top svg{color:var(--c-accent)}
.bt-metric-v{font-size:22px;font-weight:740;margin-top:7px;letter-spacing:-.4px}
.bt-metric-s{font-size:10.5px;color:var(--c-muted);margin-top:3px}

.bt-cta-row{display:flex;gap:10px;margin-bottom:16px}
.bt-cta-row.sticky{position:sticky;bottom:0;background:linear-gradient(180deg,transparent,var(--c-bg) 32%);
  padding-top:14px;margin:0 -16px;padding-left:16px;padding-right:16px}

.bt-tablewrap{overflow-x:auto}
.bt-table{width:100%;border-collapse:collapse;font-size:13px}
.bt-table th{text-align:left;font-weight:600;color:var(--c-muted);font-size:11px;
  text-transform:uppercase;letter-spacing:.4px;padding:6px 8px;border-bottom:1px solid var(--c-line)}
.bt-table td{padding:9px 8px;border-bottom:1px solid var(--c-grid)}
.bt-table tr:last-child td{border-bottom:none}
.bt-tdot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:7px;vertical-align:middle}

.bt-entry-date{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.bt-entry-date label{font-size:12px;font-weight:600;color:var(--c-muted)}
.bt-entry-date input{border:1px solid var(--c-line);border-radius:8px;padding:8px 10px;font-size:14px;font-family:inherit;background:var(--c-surface)}

.bt-tabs{display:flex;gap:6px;margin-bottom:10px}
.bt-tabs button{flex:1;background:var(--c-surface);border:1px solid var(--c-line);border-radius:9px;
  padding:9px;font-size:12.5px;font-weight:600;color:var(--c-muted);cursor:pointer;font-family:inherit;transition:.13s}
.bt-tabs button.on{background:var(--c-accent);color:#fff;border-color:var(--c-accent)}
.bt-tabs button em{font-style:normal;opacity:.7;margin-left:3px;font-size:11px}
.bt-entry-hint{font-size:11.5px;color:var(--c-muted);background:var(--c-info-bg);border-left:3px solid var(--c-accent);
  padding:8px 11px;border-radius:0 7px 7px 0;margin-bottom:14px}

.bt-jargrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:9px;margin-bottom:8px}
.bt-jarcell label{display:block;font-size:11px;font-weight:600;color:var(--c-muted);margin-bottom:4px}
.bt-jarinput{display:flex;align-items:center;border:1px solid var(--c-line);border-radius:9px;
  background:var(--c-surface);overflow:hidden;transition:.13s}
.bt-jarinput:focus-within{border-color:var(--c-accent);box-shadow:0 0 0 3px rgba(14,124,134,.12)}
.bt-jarinput input{border:none;outline:none;width:100%;padding:10px;font-size:15px;font-family:inherit;
  background:transparent;font-variant-numeric:tabular-nums}
.bt-jarinput span{padding:0 9px;font-size:10.5px;color:var(--c-muted);font-weight:600}

.bt-import-grid{display:grid;grid-template-columns:2fr 1fr;gap:12px;margin-bottom:14px}
.bt-select{width:100%;border:1px solid var(--c-line);border-radius:9px;padding:10px 12px;
  font-size:14px;font-family:inherit;background:var(--c-surface);color:var(--c-ink)}
.bt-select:focus{outline:none;border-color:var(--c-accent);box-shadow:0 0 0 3px rgba(14,124,134,.12)}
.bt-auto{font-style:normal;background:var(--c-good);color:#fff;font-size:9.5px;font-weight:700;
  padding:1px 6px;border-radius:999px;margin-left:6px;text-transform:uppercase;letter-spacing:.3px;vertical-align:middle}
.bt-warn{display:flex;align-items:flex-start;gap:8px;margin-top:13px;font-size:12px;color:var(--c-warn-ink);
  background:var(--c-warn-bg);border:1px solid var(--c-warn-line);border-radius:9px;padding:10px 12px;line-height:1.45}
.bt-warn svg{color:var(--c-due);flex:none;margin-top:1px}
.bt-warn.soft{color:var(--c-softwarn-ink);background:var(--c-softwarn-bg);border-color:var(--c-softwarn-line)}
.bt-warn.soft svg{color:var(--c-watch)}
.bt-refchoice{margin-top:13px;background:var(--c-warn-bg);border:1px solid var(--c-warn-line);border-radius:10px;padding:12px 13px}
.bt-refchoice-h{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:650;color:var(--c-warn-ink);margin-bottom:10px}
.bt-refchoice-h svg{color:var(--c-due);flex:none}
.bt-refchoice-opts{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:9px}
.bt-refopt{display:flex;flex-direction:column;align-items:flex-start;gap:2px;cursor:pointer;text-align:left;
  background:var(--c-surface);border:1.5px solid var(--c-line);border-radius:9px;padding:10px 12px;font-family:inherit;transition:.13s}
.bt-refopt:hover{border-color:var(--c-due)}
.bt-refopt.on{border-color:var(--c-due);background:#fff;box-shadow:inset 0 0 0 1px var(--c-due)}
.bt-refopt b{font-size:14px;font-weight:700;color:var(--c-ink)}
.bt-refopt em{font-style:normal;font-size:10.5px;color:var(--c-muted)}
.bt-refopt.on b{color:var(--c-due)}
.bt-importcard.skipped{opacity:.55}
.bt-skip{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:var(--c-muted);cursor:pointer}
.bt-skip input{width:15px;height:15px;accent-color:var(--c-accent);cursor:pointer}
.bt-rows{margin-top:12px}
.bt-rows summary{cursor:pointer;font-size:12px;font-weight:600;color:var(--c-accent);user-select:none}
.bt-testlist{margin-top:9px;display:flex;flex-direction:column;gap:5px}
.bt-testrow{display:flex;align-items:center;justify-content:space-between;padding:7px 11px;border-radius:7px;
  background:var(--c-new-bg);border:1px solid var(--c-new-line);font-size:12.5px}
.bt-testrow.dup{background:var(--c-grid);border-color:var(--c-line);opacity:.7}
.bt-testrow.undated{background:var(--c-warn-bg);border-color:var(--c-warn-line)}
.bt-testdate{font-weight:600;color:var(--c-ink)}
.bt-teststatus{font-size:11px;font-weight:600;color:var(--c-good)}
.bt-retesttag{display:inline-block;margin-left:8px;font-size:9.5px;font-weight:700;color:#fff;
  background:var(--c-accent);padding:1px 6px;border-radius:999px;vertical-align:middle;letter-spacing:.2px}
.bt-testrow.dup .bt-teststatus{color:var(--c-muted)}
.bt-testrow.undated .bt-teststatus{color:var(--c-due)}

.bt-form{background:var(--c-surface);border:1px solid var(--c-line);border-radius:14px;padding:16px;margin-bottom:14px}
.bt-form-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.bt-reftoggle{display:flex;flex-direction:column;gap:3px;margin:4px 0 13px}
.bt-switch{display:inline-flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;font-weight:600;color:var(--c-ink)}
.bt-switch input{width:16px;height:16px;accent-color:var(--c-accent);cursor:pointer}
.bt-stringrefs{margin-bottom:13px}
.bt-stringrefs-lbl{display:block;font-size:11.5px;font-weight:600;color:var(--c-muted);margin-bottom:7px}
.bt-stringrefs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:9px;margin-bottom:7px}
.bt-stringref{display:flex;flex-direction:column;gap:3px}
.bt-stringref span{font-size:10.5px;font-weight:600;color:var(--c-accent)}
.bt-stringref input{width:100%;border:1px solid var(--c-line);border-radius:8px;padding:9px 10px;
  font-size:14px;font-family:inherit;background:var(--c-surface);font-variant-numeric:tabular-nums}
.bt-stringref input:focus{outline:none;border-color:var(--c-accent);box-shadow:0 0 0 3px rgba(14,124,134,.12)}
.bt-field{margin-bottom:13px}
.bt-field label{display:block;font-size:11.5px;font-weight:600;color:var(--c-muted);margin-bottom:5px}
.bt-field input{width:100%;border:1px solid var(--c-line);border-radius:9px;padding:10px 12px;
  font-size:14px;font-family:inherit;background:var(--c-surface)}
.bt-field input:focus{outline:none;border-color:var(--c-accent);box-shadow:0 0 0 3px rgba(14,124,134,.12)}

.bt-modal-back{position:fixed;inset:0;background:rgba(16,30,40,.55);display:flex;align-items:center;
  justify-content:center;padding:20px;z-index:100}
.bt-modal{background:var(--c-surface);border-radius:14px;width:100%;max-width:560px;max-height:85vh;
  overflow:auto;padding:18px;box-shadow:0 18px 50px rgba(10,20,30,.3)}
.bt-modal-h{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.bt-modal-h h2{font-size:16px;margin:0;font-weight:700}
.bt-iconbtn{background:none;border:none;cursor:pointer;color:var(--c-muted);padding:4px;border-radius:6px;display:flex}
.bt-iconbtn:hover{background:var(--c-grid);color:var(--c-ink)}
.bt-modal-actions{margin:13px 0 10px}
.bt-savearea{width:100%;height:200px;border:1px solid var(--c-line);border-radius:9px;padding:11px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;line-height:1.5;
  background:var(--c-code-bg);color:var(--c-ink);resize:vertical}

@media(max-width:640px){
  .bt-kpis,.bt-metricstrip{grid-template-columns:repeat(2,1fr)}
  .bt-import-grid{grid-template-columns:1fr}
  .bt-refchoice-opts{grid-template-columns:1fr}
  .bt-row-stats{gap:10px}
  .bt-row-stats .bt-stat:nth-child(2){display:none}
  .bt-site-name{font-size:21px}
}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
`;
