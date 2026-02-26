export async function uploadFile(
    file: File,
    signature: string,
    timestamp: number,
    setProgress?: (progress: number) => void
  ): Promise<string> {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp.toString());
      formData.append('folder', 'reposage');
  
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('POST', `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`);
          
          xhr.upload.onprogress = (event) => {
              if (event.lengthComputable && setProgress) {
                  const progress = Math.round((event.loaded / event.total) * 100);
                  setProgress(progress);
              }
          };
          
          xhr.onload = function() {
              if (xhr.status === 200) {
                  const response = JSON.parse(xhr.responseText);
                  resolve(response.secure_url);
              } else {
                  reject(new Error('Upload failed'));
              }
          };
          
          xhr.onerror = () => reject(new Error('Upload failed'));
          xhr.send(formData);
      });
  }