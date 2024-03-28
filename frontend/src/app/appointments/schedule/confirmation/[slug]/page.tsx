"use client";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  // Decode the URL-encoded string
  const decodedSlug = decodeURIComponent(params.slug);

  // Parse the parameters from the decoded string
  const paramsArray = decodedSlug.split("&");
  const parsedParams: { [key: string]: string } = {};
  paramsArray.forEach((param) => {
    const [key, value] = param.split("=");
    parsedParams[key] = value;
  });

  // Extract date, time, and doctorId from parsedParams
  const { date, startTime, endTime, doctorId } = parsedParams;

  return (
    <div>
      <div>Date: {date}</div>
      <div>startTime: {startTime}</div>
      <div>endTime: {endTime}</div>
      <div>Doctor ID: {doctorId}</div>
    </div>
  );
}
