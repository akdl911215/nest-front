export function ErrorHandling({
  text,
  error,
}: {
  readonly text: string;
  readonly error: Error;
}) {
  console.log(text, " error : ", error);
  throw new Error(`${error}`);
}
