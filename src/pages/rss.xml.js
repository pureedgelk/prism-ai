import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : import.meta.env.BASE_URL + '/';

  const tutorials = await getCollection(
    'tutorials',
    (entry) => entry.data.draft !== true,
  );
  const prompts = await getCollection('prompts');

  const tutorialItems = tutorials.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    pubDate: entry.data.date,
    categories: entry.data.tags,
    link: new URL(`${base}tutorials/${entry.id}/`, context.site).href,
  }));

  const promptItems = prompts.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    pubDate: entry.data.date,
    categories: entry.data.tags,
    link: new URL(`${base}prompts/${entry.id}`, context.site).href,
  }));

  // 合并两类内容，按发布日期倒序
  const items = [...tutorialItems, ...promptItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
  );

  return rss({
    title: 'Prism AI 棱镜 · 内容更新',
    description:
      'Prism AI 棱镜：开源、每日更新的 AI 学习站，系统教程与实战提示词，即学即用。',
    site: context.site,
    items,
    customData: '<language>zh-cn</language>',
  });
}
