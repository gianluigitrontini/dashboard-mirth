'use server'

import { getDataV2 } from "@/services/data.service";


export async function refreshData() {
    const res: any = await getDataV2("all");
    return res._template || [];
}