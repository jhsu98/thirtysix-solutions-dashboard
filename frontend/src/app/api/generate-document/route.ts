import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { Buffer } from "buffer";

// Types
interface RequestBody {
  template: string;
  data: Record<string, unknown>;
  recipient: string;
}

const SUPABASE_URL = process.env.ECOCENTRIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.ECOCENTRIC_SUPABASE_SERVICE_ROLE_KEY!;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "no-reply@ecocentricnv.com";

export async function POST(request: Request) {
  console.log("In function...");
  try {
    // Verify API secret key
    // const authHeader = request.headers.get("authorization");
    // if (!authHeader?.startsWith("Bearer ") || authHeader.split(" ")[1] !== process.env.API_SECRET_KEY) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Parse request body
    const body = (await request.json()) as RequestBody;
    const { template, data, recipient } = body;
    console.log(`template: ${template}`);
    console.log(`recipient: ${recipient}`);
    console.log(`data: ${JSON.stringify(data)}`);

    // Validate required fields
    if (!template || !data || !recipient) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Download template from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase
      .storage
      .from('report-word-templates')
      .download(template);

    if (downloadError) {
      console.error('Template download error:', downloadError);
      return NextResponse.json(
        { error: `Failed to download template: ${downloadError.message}` },
        { status: 500 }
      );
    }

    console.log(`Document template retrieved`);
    console.log(fileData);

    // Process document with docxtemplater
    const buffer = await fileData.arrayBuffer();
    const zip = new PizZip(buffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Render template with data
    doc.render(data);

    // Generate document
    const generatedDoc = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE"
    });

    // Create a unique filename
    const timestamp = new Date().getTime();
    const filename = `${template.replace('.docx', '')}_${timestamp}.docx`;

    // Convert to base64 for email attachment
    const base64Doc = Buffer.from(generatedDoc).toString('base64');

    // Send email via SendGrid
    const emailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ 
          to: [{ email: recipient }],
          subject: "Your Requested Document"
        }],
        from: { email: FROM_EMAIL },
        content: [{ 
          type: "text/plain", 
          value: "Please find your requested document attached." 
        }],
        attachments: [{
          content: base64Doc,
          filename,
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          disposition: "attachment"
        }]
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('SendGrid error:', errorText);
      return NextResponse.json(
        { error: `Failed to send email: ${errorText}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Document generated and sent successfully"
    });

  } catch (error) {
    console.error('Document generation error:', error);
    console.error((error as any).properties.errors);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "An unknown error occurred" 
      },
      { status: 500 }
    );
  }
} 