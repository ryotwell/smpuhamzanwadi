import { prisma } from "../src/lib/prisma";
import bcrypt from 'bcrypt';

// Simple slugify function
function slugify(str: string) {
    return str
        .toString()
        .toLowerCase()
        .normalize('NFD')                   // split accented letters
        .replace(/[\u0300-\u036f]/g, '')    // remove accents
        .replace(/[^a-z0-9]+/g, '-')        // replace non-alphanumeric with -
        .replace(/^-+|-+$/g, '')            // trim - from start/end
        .replace(/-+/g, '-');               // collapse multiple -
}

async function main() {
    // Seed users
    // const hashedPassword1 = await bcrypt.hash("password", 10);
    // const hashedPassword2 = await bcrypt.hash("securepass456", 10);

    // await prisma.user.createMany({
    //     data: [
    //         {
    //             name: "Ryo Otwell",
    //             email: "ytryo789@gmail.com",
    //             password: hashedPassword1,
    //         },
    //         {
    //             name: "Devin Kusuma",
    //             email: "devin@gmail.com",
    //             password: hashedPassword2,
    //         },
    //     ]
    // });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });