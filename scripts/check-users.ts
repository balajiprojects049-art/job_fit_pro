import { prisma } from './app/lib/prisma';

async function checkUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            status: true,
            plan: true,
            hasFullAccess: true
        }
    });

    console.log('Current Users:');
    console.table(users);

    // Update all users to have proper defaults
    for (const user of users) {
        if (user.hasFullAccess === null || user.hasFullAccess === undefined) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    hasFullAccess: false,
                    plan: user.plan || 'NONE'
                }
            });
            console.log(`Updated user: ${user.email}`);
        }
    }

    console.log('\nRefreshing user data...');
    const updatedUsers = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            status: true,
            plan: true,
            hasFullAccess: true
        }
    });
    console.table(updatedUsers);
}

checkUsers()
    .then(() => {
        console.log('\n✅ Users checked and updated!');
        process.exit(0);
    })
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    });
