export const ACCEPTED_FILE_TYPES = [".pdf"] as const;
// export const ACCEPTED_FILE_TYPES = [".pdf", ".docx", ".doc"] as const;

export type AcceptedFileType = (typeof ACCEPTED_FILE_TYPES)[number];

const MIME_TYPES: Record<AcceptedFileType, string> = {
  ".pdf": "application/pdf"
  //   ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //   ".doc": "application/msword",
};

export function validateFile(file: File): boolean {
  const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}` as AcceptedFileType;
  return ACCEPTED_FILE_TYPES.includes(fileExtension) && file.type === MIME_TYPES[fileExtension];
}

export function getAcceptedFileTypesString(): string {
  return ACCEPTED_FILE_TYPES.join(",");
}
