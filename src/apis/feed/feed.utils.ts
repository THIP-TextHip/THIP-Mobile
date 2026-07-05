import type { IssuePresignedUrlRequest } from "./feed.types";

const IMAGE_EXTENSION_BY_MIME_TYPE: Record<string, string> = {
  "image/heic": "heic",
  "image/heif": "heif",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const normalizeImageExtension = (extension: string) => {
  const normalizedExtension = extension.toLowerCase();

  return normalizedExtension === "jpeg" ? "jpg" : normalizedExtension;
};

const getImageExtensionFromUri = (uri: string) => {
  const uriWithoutQuery = uri.split(/[?#]/)[0];
  const fileName = uriWithoutQuery.slice(uriWithoutQuery.lastIndexOf("/") + 1);
  const extensionIndex = fileName.lastIndexOf(".");

  if (extensionIndex === -1) {
    return "";
  }

  return normalizeImageExtension(fileName.slice(extensionIndex + 1));
};

const getImageExtension = (uri: string, blob: Blob) => {
  const extensionFromUri = getImageExtensionFromUri(uri);

  if (extensionFromUri) {
    return extensionFromUri;
  }

  return IMAGE_EXTENSION_BY_MIME_TYPE[blob.type.toLowerCase()] ?? "";
};

interface FeedImageBlob {
  uri: string;
  blob: Blob;
}

type PresignedImageFetch = (
  url: string,
  init: {
    method: "PUT";
    headers: { "Content-Type": string };
    body: Blob;
  },
) => Promise<Pick<Response, "ok" | "status">>;

interface PresignedImageUpload {
  presignedUrl: string;
  blob: Blob;
}

export const createPresignedImageRequests = (
  images: FeedImageBlob[],
): IssuePresignedUrlRequest =>
  images.map(({ uri, blob }) => {
    const extension = getImageExtension(uri, blob);

    if (!extension) {
      throw new Error("Feed image extension is required.");
    }

    return {
      extension,
      size: blob.size,
    };
  });

export const uploadImageToPresignedUrl = async (
  { presignedUrl, blob }: PresignedImageUpload,
  fetcher: PresignedImageFetch = (url, init) => fetch(url, init),
) => {
  const response = await fetcher(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": blob.type || "application/octet-stream",
    },
    body: blob,
  });

  if (!response.ok) {
    throw new Error(`Feed image upload failed. status: ${response.status}`);
  }
};
