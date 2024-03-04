import { readFileSync } from 'fs';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

export const getContent = async (
  slug: string
): Promise<{ data: any; content: any }> => {
  const fileContents = readFileSync(path.join(`content/${slug}.mdx`), 'utf8');
  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);
  return {
    data,
    content: mdxSource,
  };
};
