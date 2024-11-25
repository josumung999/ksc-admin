import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Facture from "@/components/facture/facture";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { client, products, description } = body;

    // Render Facture component to HTML
    const html = Facture(client, products, description);

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `;

    // Generate PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(fullHtml);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=facture.pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse("Error generating PDF", { status: 500 });
  }
}
