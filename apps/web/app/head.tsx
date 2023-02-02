export default function Head() {
  return (
    <>
      <title>My Page Title</title>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      {/* @todo next/font로 migration */}
      <link
        as="style"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
        rel="stylesheet"
        // @ts-ignore
        precedence="default"
      />
      <link
        as="style"
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendardstatic.css"
        rel="stylesheet"
        // @ts-ignore
        precedence="default"
      />
    </>
  );
}
