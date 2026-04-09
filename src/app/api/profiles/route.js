
import prisma from '@/lib/prisma'
import { put } from "@vercel/blob";


export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get("title") || "";
    const search = searchParams.get("search") || "";

    const profiles = await prisma.profiles.findMany({
      ...(title ? { where: { title: { contains: title, mode: 'insensitive' } } } : {}),
      ...(search ? { where: { name: { contains: search, mode: 'insensitive' } } } : {})
    });
  
  return Response.json({ data: profiles }, { status: 200 });
}
export async function POST(request) {
  try{
      const newProfile = await request.formData();
      const name = newProfile.get("name");
      const title = newProfile.get("title");
      const email = newProfile.get("email");
      const bio = newProfile.get("bio");
      const image = newProfile.get("img");

    if(!name || name.trim() === ""){
      return Response.json({error: "Name is required"}, {status: 400});
    }else if(!title || title.trim() === ""){
      return Response.json({error: "Title is required"}, {status: 400});
    }else if(!email || !email.includes("@")) {
      return Response.json({error: "Valid email is required"}, {status: 400});
    }else if(!bio || bio.trim() === ""){
      return Response.json({error: "Bio is required"}, {status: 400});
    }else if(!image || image.size === 0 || image.size > 1024 * 1024){
      console.log("Image validation failed. Size:", image.size);
      return Response.json({error: "Image is required and must be less than 1MB"}, {status: 400});
    }
console.log(name)
console.log(image)

    const { url } = await put(name, image, { access: 'public', allowOverwrite: true });

    const newProfileData = {
      name: name.trim(),
      title: title.trim(),
      email: email.trim(),
      bio: bio.trim(),
      image_url: url
    };
    await prisma.profiles.create({
        data: newProfileData
    })

    return Response.json(newProfileData, { status: 201 });
  }catch(error){
    if (error?.code === "P2002") {
      return Response.json({ error: "Email already exists. Please use a different email." }, { status: 409 });
    }
    return Response.json({error: error.message}, {status: 400});
  }
}
