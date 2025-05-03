import { assignIn } from "lodash";

export const ErrorResponse = (data: {}, status: number = 400, opts = {}) => {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
    ...assignIn(opts, {})
  });
}

export const SuccessResponse = (data: {}, status:number = 200, opts = []) => {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: { 'Content-Type': 'application/json' },
    ...assignIn(opts, {})
  })
}

export const ExtractJSON = async (request: Request) => {
  return await request.json()
}