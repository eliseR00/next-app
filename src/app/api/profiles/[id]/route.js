import { put } from '@vercel/blob';
import prisma from "@/app/lib/prisma";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET single profile by ID
export async function GET(request, { params }) {
    try {
        // Get the id from params and convert it to a number
        const { id } = await params;
        const profileId = parseInt(id);

        if (isNaN(profileId)) {
            return Response.json({ error: 'Invalid profile ID' }, { status: 400 });
        }

        // TODO: find the matching profile by id DONE
            const profile = await prisma.profiles.findUnique({
                where: { id: profileId },
            });
        // const profile = await prisma.profiles.findUnique();

        if (!profile) {
            return Response.json({ error: 'Profile not found' }, { status: 404 });
        }

        return Response.json({ data: profile }, { status: 200 });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return Response.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

// PUT - Update profile by ID
export async function PUT(request, { params }) {
    try {
        // Get the id from params and convert it to a number
        const { id } = await params;
        const profileId = parseInt(id);

        if (isNaN(profileId)) {
            return Response.json({ error: 'Invalid profile ID' }, { status: 400 });
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const title = formData.get('title');
        const email = formData.get('email');
        const bio = formData.get('bio');
        const imgFile = formData.get('img');
        // TODO: get the existing image URL from formData
        const existingImageUrl = formData.get('existingImageUrl');
        // const existingImageUrl = ;

        if (!name || name.trim() === '') {
            return Response.json({ error: 'Name is required' }, { status: 400 });
        }
        if (!title || title.trim() === '') {
            return Response.json({ error: 'Title is required' }, { status: 400 });
        }
        if (!email || email.trim() === '') {
            return Response.json({ error: 'Email is required' }, { status: 400 });
        }
        if (!bio || bio.trim() === '') {
            return Response.json({ error: 'Bio is required' }, { status: 400 });
        }

        let imageUrl = existingImageUrl;

        if (imgFile && imgFile.size > 0) {
            if (imgFile.size > 1024 * 1024) {
                return Response.json({ error: 'Image must be less than 1MB' }, { status: 400 });
            }

            const blob = await put(imgFile.name, imgFile, {
                access: 'public',
            });

            imageUrl = blob.url;
        }

        // TODO: update the matching profile in the database
        const updated = await prisma.profiles.update({
            where: { id: profileId },
            data: {
                name,
                title,
                email,
                bio,
                img: imageUrl
            }
        });

        return Response.json({ data: updated }, { status: 200 });
    } catch (error) {
        console.error('Error updating profile:', error);

        if (error.code === 'P2002') {
            return Response.json({ error: 'Email already exists' }, { status: 400 });
        }
        if (error.code === 'P2025') {
            return Response.json({ error: 'Profile not found' }, { status: 404 });
        }

        return Response.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}

// DELETE profile by ID
export async function DELETE(request, { params }) {
    try {
        // Get the id from params and convert it to a number
        const { id } = await params;
        const profileId = parseInt(id);

        if (isNaN(profileId)) {
            return Response.json({ error: 'Invalid profile ID' }, { status: 400 });
        }

        // Delete the matching profile by id
        await prisma.profiles.delete({
            where: { id: profileId },
        });

        return Response.json({ message: 'Profile deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting profile:', error);

        if (error.code === 'P2025') {
            return Response.json({ error: 'Profile not found' }, { status: 404 });
        }

        return Response.json({ error: 'Failed to delete profile' }, { status: 500 });
    }
}

