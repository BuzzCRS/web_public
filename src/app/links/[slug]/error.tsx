"use client";

import ErrorPage from "next/error";

export default function Error({ params }) {
  return <ErrorPage statusCode={404} />;
}
