import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { AWSProvider } from '@edgestore/server/providers/aws';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
});
const handler = createEdgeStoreNextHandler({
  provider: AWSProvider({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
  }),
  router: edgeStoreRouter,
});
export { handler as GET, handler as POST };
export type EdgeStoreRouter = typeof edgeStoreRouter;
