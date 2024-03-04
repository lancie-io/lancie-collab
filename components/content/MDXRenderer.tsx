'use client';
import { MDXRemote } from 'next-mdx-remote';

const MDXRenderer = ({ content }: { content: any }) => {
  if (!content) return null;
  return (
    <div className="prose dark:prose-invert max-w-none w-full">
      <MDXRemote {...content} />
    </div>
  );
};

export default MDXRenderer;
