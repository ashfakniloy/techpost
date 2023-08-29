"use client";

function Log() {
  const css =
    "text-shadow: 1px 1px 2px black, 0 0 1em red, 0 0 0.2em red; font-size: 14px; color: red";

  const env = process.env.NODE_ENV;

  env !== "development" &&
    typeof window !== "undefined" &&
    console.log(
      "%c const developer = {\n     name: 'Ashfak Ahmed Niloy',\n     email: 'ashfakniloy@gmail.com',\n     uploadedAt: '23/06/2023',\n };",

      css
    );

  return <></>;
}

export default Log;
