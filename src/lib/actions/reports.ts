"use server";

import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { reports } from "@/db/schema";
import { deleteFromCloudinary, uploadRawToCloudinary } from "@/lib/cloudinary";
import { fileToURI } from "@/lib/utils";
import { auth, signOut } from "@/lib/auth";

export async function getReports() {
  try {
    const list = await db
      .select()
      .from(reports)
      .orderBy(desc(reports.createdAt));
    return list;
  } catch (e) {
    console.error("getReports error:", e);
    return [];
  }
}

export async function uploadReport(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) return signOut({ redirectTo: "/admin/signin" });

    const file = formData.get("file") as File;
    const title = (formData.get("title") as string)?.trim() || file?.name || "Report";

    if (!file?.size) return { error: "Please select a PDF file." };
    if (file.type !== "application/pdf")
      return { error: "Only PDF files are allowed." };

    const fileURI = await fileToURI(file);
    const result = await uploadRawToCloudinary(fileURI, "reports");
    const fileUrl = (result as { secure_url?: string })?.secure_url;
    if (!fileUrl) return { error: "Upload failed." };

    await db.insert(reports).values({
      title,
      fileUrl,
    });

    revalidatePath("/admin/reports");
    revalidatePath("/reports");
    return { success: true };
  } catch (e) {
    console.error(e);
    return {
      error: e instanceof Error ? e.message : "Failed to upload report.",
    };
  }
}

export async function deleteReport(id: string) {
  try {
    const session = await auth();
    if (!session?.user) return signOut({ redirectTo: "/admin/signin" });

    const [report] = await db
      .select()
      .from(reports)
      .where(eq(reports.id, id))
      .limit(1);
    if (!report) return { error: "Report not found." };

    await deleteFromCloudinary(report.fileUrl, "raw");
    await db.delete(reports).where(eq(reports.id, id));

    revalidatePath("/admin/reports");
    revalidatePath("/reports");
    return { success: true };
  } catch (e) {
    console.error(e);
    return {
      error: e instanceof Error ? e.message : "Failed to delete report.",
    };
  }
}
