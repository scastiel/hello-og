/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'experimental-edge',
}

const handle = (req: NextRequest) => {
  const { searchParams, host, protocol } = new URL(req.url)
  const title = searchParams.get('title') || 'No post title'
  const author = searchParams.get('author') || 'Anonymous'
  const date = new Date(searchParams.get('date') || '2022-11-05T12:00:00.000Z')
  const cover = `${protocol}//${host}${
    searchParams.get('cover') || '/cover.jpg'
  }`

  return new ImageResponse(
    (
      <div tw="flex w-full h-full flex-col justify-end bg-slate-200 items-stretch">
        <img
          src={cover}
          alt=""
          tw="flex-1 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div tw="flex flex-col bg-white p-8 border-t-8 border-slate-600">
          <div tw="text-5xl mb-4">{title}</div>
          <div tw="text-2xl">
            {author +
              ' – ' +
              date.toLocaleDateString('en-US', { dateStyle: 'long' })}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 628 }
  )
}

export default handle
