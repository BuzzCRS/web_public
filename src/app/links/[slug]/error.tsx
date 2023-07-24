"use client";

import ErrorPage from "next/error";

export default function Links({ params }) {
  return <ErrorPage statusCode={404} />;
}
