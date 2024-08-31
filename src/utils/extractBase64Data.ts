function extractBase64Data(base64String: string): {
  inlineData: {
    mimeType: string;
    data: string;
  };
} {
  const match = base64String.match(/^data:(.+);base64,(.+)$/);

  if (!match) {
    throw new Error("Invalid base64 string");
  }

  return {
    inlineData: {
      mimeType: match[1],
      data: match[2],
    },
  };
}

export default extractBase64Data;
