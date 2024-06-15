import { NextResponse } from "next/server";
import { db } from '@/app/utils/firebase';
import { get, ref } from 'firebase/database';
import { BanType } from "@/app/types/BanType";

export async function GET(req: Request, { params }: { params: { period: string; nickname: string } }) {
    try {
        // const { userId } = auth();
        // if (!userId)
        // return NextResponse.json({ error: "Unauthorized", status: 401 });
        const { nickname, period } = params;
        console.log(nickname);
        const adminRef = ref(db, `admins/playtime/${period}/${nickname}`);
        const adminSnapshot = await get(adminRef);
        if (adminSnapshot.exists()) {
            // const adminData = adminSnapshot.val();
            const adminObject: Record<string, BanType> = adminSnapshot.val();
            const adminArray = Object.entries(adminObject).map(([id, data]) => ({
                id,
                ...data,
            }));
            return NextResponse.json(adminArray);
        } else {
            return NextResponse.json({ error: "No admin found", status: 404 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error while getting admin", status: 500 });
    }
}

