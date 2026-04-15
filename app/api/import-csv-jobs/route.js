import fs from "fs";
import path from "path";

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current);
  return result;
}

function parseCsv(content) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return row;
  });
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "jobs.csv");
    const csvContent = fs.readFileSync(filePath, "utf8");
    const rows = parseCsv(csvContent);

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://resumefix-auto-finalnew.vercel.app";

    const results = [];

    for (const row of rows) {
      const res = await fetch(`${baseUrl}/api/import-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_name: row.source_name || "CSV Import",
          source_url: row.source_url || "",
          rawText: row.rawText || "",
        }),
      });

      const data = await res.json();
      results.push({
        title: row.title || "",
        source_url: row.source_url || "",
        result: data,
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        imported: results.length,
        results,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error?.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
