import type { Config } from "@netlify/functions";
import ejs from "ejs";
import path from "node:path";
import { eq, sql } from "drizzle-orm";
import { getDb } from "../../db/index.js";
import { mobiles } from "../../db/schema.js";

async function render(view: string, data = {}) {
  const html = await ejs.renderFile(path.join(process.cwd(), "views", `${view}.ejs`), data);
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

function redirect() {
  return new Response(null, { status: 303, headers: { Location: "/getdata" } });
}

export default async (request: Request) => {
  const url = new URL(request.url);
  const route = url.pathname.replace(/\/$/, "") || "/";
  try {
    if (request.method === "GET" && route === "/") return await render("home");
    if (request.method === "GET" && route === "/insertdata") return await render("form");
    if (request.method === "GET" && route === "/getdata") {
      const searchTerm = (url.searchParams.get("brand") || "").trim();
      const db = getDb();
      const allmobiles = await db.select().from(mobiles)
        .where(searchTerm ? sql`strpos(lower(${mobiles.brand}), lower(${searchTerm})) > 0` : undefined)
        .orderBy(mobiles.brand, mobiles.model);
      return await render("mobiles", { allmobiles, searchTerm });
    }
    const match = route.match(/^\/(edit|delete|update)\/(\d+)$/);
    if (match || route === "/createdata") {
      const action = match?.[1] || "create";
      const id = Number(match?.[2]);
      if (match && (!Number.isSafeInteger(id) || id < 1 || id > 2147483647)) return new Response("Mobile not found", { status: 404 });
      const expectedMethod = action === "create" || action === "update" ? "POST" : "GET";
      if (request.method !== expectedMethod) return new Response("Method not allowed", { status: 405, headers: { Allow: expectedMethod } });
      const db = getDb();
      if (action === "edit") {
        const [data] = await db.select().from(mobiles).where(eq(mobiles._id, id));
        return data ? await render("edit", { data }) : new Response("Mobile not found", { status: 404 });
      }
      if (action === "delete") {
        await db.delete(mobiles).where(eq(mobiles._id, id));
        return redirect();
      }
      const form = await request.formData();
      const brand = String(form.get("brand") || "").trim();
      const model = String(form.get("model") || "").trim();
      const ram = Number(form.get("ram"));
      const storage = Number(form.get("storage"));
      const price = Number(form.get("price"));
      if (!brand || !model || !Number.isInteger(ram) || ram < 1 || ram > 2147483647 || !Number.isInteger(storage) || storage < 1 || storage > 2147483647 || !String(form.get("price") || "").trim() || !Number.isFinite(price) || price < 0) {
        return new Response("Enter a brand, model, positive whole-number RAM and storage, and a non-negative price.", { status: 400 });
      }
      const values = { brand, model, ram, storage, price };
      if (action === "create") await db.insert(mobiles).values(values);
      else {
        const updated = await db.update(mobiles).set(values).where(eq(mobiles._id, id)).returning();
        if (!updated.length) return new Response("Mobile not found", { status: 404 });
      }
      return redirect();
    }
    return new Response("Page not found", { status: 404 });
  } catch {
    return new Response("The store is temporarily unavailable. Please try again shortly.", { status: 503 });
  }
};

export const config: Config = {
  path: ["/", "/getdata", "/insertdata", "/createdata", "/edit/:mobileid", "/update/:mobileid", "/delete/:mobileid"],
};
