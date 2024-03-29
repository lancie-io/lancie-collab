'use client';

import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';

const UploadTrigger = () => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files?.[0]);
        }}
      />
      <button
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log('File Res: ', res);
          }
        }}
      >
        Upload Edgestore
      </button>
    </div>
  );
};

export default UploadTrigger;
