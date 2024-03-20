import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { AWSProvider } from '@edgestore/server/providers/aws';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});
const handler = createEdgeStoreNextHandler({
  provider: AWSProvider({
    accessKeyId: process.env.APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.APP_AWS_SECRET_KEY,
    region: process.env.APP_AWS_REGION,
    bucketName: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
  }),
  router: edgeStoreRouter,
});
export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
