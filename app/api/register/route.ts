import bcrypt from 'bcrypt'

import client from '@/lib/prismadb'
import { ErrorResponse, ExtractJSON, SuccessResponse } from '@/lib/response'

export async function POST(request: Request) {
  const { email, username, name, password }  = await ExtractJSON(request)

  try {
    const existingUser = await client.user.findFirst({
      where: {
        email,
      }
    })

    if(existingUser) {
      return ErrorResponse({ error: "Email Tailk!" })
    }
  
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await client.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
      }
    });

    return SuccessResponse(user);
  } catch (e: any) {
    return ErrorResponse(e)
  }
}