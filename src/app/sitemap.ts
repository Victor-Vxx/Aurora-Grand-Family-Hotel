import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Substitua pela URL oficial do seu site quando houver o domínio definitivo.
  const baseUrl = 'https://aurora-grand-website.vercel.app/'

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Se você tiver outras páginas no futuro (ex: /sobre, /contato), adicione-as aqui:
    // {
    //   url: `${baseUrl}/sobre`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}
