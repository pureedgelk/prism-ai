import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const tutorials = (
    await getCollection('tutorials', (entry) => entry.data.draft !== true)
  ).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + '/';

  const items = tutorials.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    pubDate: entry.data.date,
    categories: entry.data.tags,
    // 显式带上 base 路径，生成可访问的绝对链接字符串（schema 要求 link 为 string）
    link: new URL(`${base}tutorials/${entry.id}/`, context.site).href,
  }));

  return rss({
    title: 'Prism AI 棱镜 · 教程更新',
    description:
      'Prism AI 棱镜：开源、每日更新的 AI 学习站，系统教程与实战指南，即学即用。',
    site: context.site,
    items,
    customData: '<language>zh-cn</language>',
  });
}
