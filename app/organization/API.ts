import { revalidateTag } from "next/cache";
import { toast } from "react-toastify";

export const getOrganization = async (): Promise<Array<iOrganization>> => {
  return await fetch("http://localhost:4000/data", {
    next: { tags: ["members"] },
    cache: "no-store",
  })
    .then((res: Response) => res.json())
    .then((res) => {
      return res;
    });
};

export const updateMember = async (
  ID: number,
  name: FormDataEntryValue,
  body: BodyInit
) => {
  try {
    const Doc: any = document;
    const res = await fetch(`http://localhost:4000/data/${ID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: body!,
      //   next: { tags: ["members"] },
    });

    if (res.ok) {
      //   revalidateTag("members");
      toast(`${name} added to organization created successfully`);
      Doc.getElementById("addMember")?.close();
    } else {
      toast(`Error encountered creating organization`);
    }
  } catch (error: any) {
    toast(`Error encountered creating organization: ${error.message}`);
  }
};
