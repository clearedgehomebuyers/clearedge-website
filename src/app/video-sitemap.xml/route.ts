import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://www.clearedgehomebuyers.com'

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${baseUrl}/</loc>
    <video:video>
      <video:thumbnail_loc>https://i.ytimg.com/vi/YS6uDgxIjiI/maxresdefault.jpg</video:thumbnail_loc>
      <video:title>Sell Your House Fast in PA | Clear Edge Home Buyers</video:title>
      <video:description>Learn how to sell your house fast in PA without fees, repairs, or commissions. Local family-owned company buying houses in Scranton, Allentown, and Bethlehem.</video:description>
      <video:content_loc>https://www.youtube.com/watch?v=YS6uDgxIjiI</video:content_loc>
      <video:player_loc>https://www.youtube.com/embed/YS6uDgxIjiI</video:player_loc>
      <video:duration>70</video:duration>
      <video:publication_date>2026-01-27</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
