import { NextResponse } from "next/server";
import { db } from '@/app/utils/firebase';
import { get, ref } from 'firebase/database';

export async function GET(req: Request) {
    try {
        // const { userId } = auth();
        // if (!userId)
        // return NextResponse.json({ error: "Unauthorized", status: 401 });
        const adminRef = ref(db, 'admins/newbansdd2');
        const adminSnapshot = await get(adminRef);
        if (adminSnapshot.exists()) {
            const adminsData = adminSnapshot.val();
            return NextResponse.json(adminsData);
        } else {
            return NextResponse.json({ error: "No admins found", status: 404 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error while getting admins", status: 500 });
    }
}

