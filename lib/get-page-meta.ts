import { Metadata } from 'next';

export default function getPageMeta(pageTitle: string, description: string) {
  return {
    title: `${pageTitle ? `${pageTitle} | ` : ''}Yo Tours`,
    description: description ? description : 'Your travel plans made easier!',
  } as Metadata;
}
