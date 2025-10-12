import React from "react";
import { FaceStyle, Hand } from "./MetaClock.styles";

function Face({ angles }: { angles: number[] }) {
  return (
    <FaceStyle>
      <Hand angle={angles[0]} />
      <Hand angle={angles[1]} />
    </FaceStyle>
  );
}

export default Face;
